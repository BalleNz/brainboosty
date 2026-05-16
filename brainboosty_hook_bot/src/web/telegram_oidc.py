"""Telegram Login OpenID Connect (Authorization Code + PKCE)."""

from __future__ import annotations

import asyncio
import base64
import hashlib
import hmac
import html as html_module
import json
import logging
import secrets
import time
from typing import TYPE_CHECKING, Any

if TYPE_CHECKING:
    from sqlalchemy.ext.asyncio import AsyncSession
from urllib.parse import urlencode

import aiohttp
import jwt
from fastapi.responses import HTMLResponse
from jwt import PyJWKClient

from brainboosty_hook_bot.src.config.config import settings
from brainboosty_hook_bot.src.web.site_session import mint_site_access_token

logger = logging.getLogger(__name__)

OIDC_ISSUER = "https://oauth.telegram.org"
OIDC_AUTH_URL = "https://oauth.telegram.org/auth"
OIDC_TOKEN_URL = "https://oauth.telegram.org/token"
OIDC_JWKS_URL = "https://oauth.telegram.org/.well-known/jwks.json"

_jwks_client: PyJWKClient | None = None


class TelegramOidcError(Exception):
    def __init__(self, code: str, message: str = "") -> None:
        self.code = code
        super().__init__(message or code)


def oidc_configured() -> bool:
    return bool(
        (settings.TELEGRAM_OIDC_CLIENT_ID or "").strip()
        and (settings.TELEGRAM_OIDC_CLIENT_SECRET or "").strip()
        and (settings.telegram_oidc_redirect_uri or "").strip()
    )


def _state_signing_key() -> bytes:
    raw = (settings.WEBAPP_SITE_SESSION_SECRET or "").strip()
    if raw:
        return hashlib.sha256(raw.encode("utf-8")).digest()
    tok = (settings.BOT_TOKEN or "").strip()
    if tok:
        return hashlib.sha256(b"bb-oidc-state-v1|" + tok.encode("utf-8")).digest()
    return hashlib.sha256(b"bb-oidc-state-dev").digest()


def generate_pkce_pair() -> tuple[str, str]:
    verifier = secrets.token_urlsafe(48)[:128]
    digest = hashlib.sha256(verifier.encode("ascii")).digest()
    challenge = base64.urlsafe_b64encode(digest).decode("ascii").rstrip("=")
    return verifier, challenge


def build_oidc_state(code_verifier: str, *, return_path: str = "") -> str:
    payload = {
        "v": code_verifier,
        "r": (return_path or "")[:200],
        "exp": int(time.time()) + 600,
        "n": secrets.token_urlsafe(12),
    }
    raw = base64.urlsafe_b64encode(json.dumps(payload, separators=(",", ":")).encode()).decode().rstrip("=")
    sig = hmac.new(_state_signing_key(), raw.encode("ascii"), hashlib.sha256).hexdigest()
    return f"{raw}.{sig}"


def parse_oidc_state(state: str) -> tuple[str, str]:
    raw_state = (state or "").strip()
    if "." not in raw_state:
        raise TelegramOidcError("invalid_state")
    body, sig = raw_state.rsplit(".", 1)
    expected = hmac.new(_state_signing_key(), body.encode("ascii"), hashlib.sha256).hexdigest()
    if not hmac.compare_digest(expected, sig):
        raise TelegramOidcError("invalid_state")

    pad = "=" * ((4 - len(body) % 4) % 4)
    try:
        payload: dict[str, Any] = json.loads(base64.urlsafe_b64decode(body + pad).decode("utf-8"))
    except (ValueError, json.JSONDecodeError) as exc:
        raise TelegramOidcError("invalid_state") from exc

    if int(payload.get("exp") or 0) < int(time.time()):
        raise TelegramOidcError("state_expired")

    verifier = payload.get("v")
    if not isinstance(verifier, str) or len(verifier) < 43:
        raise TelegramOidcError("invalid_state")

    return_path = payload.get("r")
    if not isinstance(return_path, str):
        return_path = ""
    return verifier, return_path


def build_authorization_url(*, return_path: str = "") -> str:
    if not oidc_configured():
        raise TelegramOidcError("oidc_not_configured")

    verifier, challenge = generate_pkce_pair()
    state = build_oidc_state(verifier, return_path=return_path)
    params = {
        "client_id": settings.TELEGRAM_OIDC_CLIENT_ID.strip(),
        "redirect_uri": settings.telegram_oidc_redirect_uri,
        "response_type": "code",
        "scope": settings.telegram_oidc_scopes,
        "state": state,
        "code_challenge": challenge,
        "code_challenge_method": "S256",
    }
    return f"{OIDC_AUTH_URL}?{urlencode(params)}"


def _jwks() -> PyJWKClient:
    global _jwks_client
    if _jwks_client is None:
        _jwks_client = PyJWKClient(OIDC_JWKS_URL, cache_keys=True)
    return _jwks_client


def validate_id_token(id_token: str) -> dict[str, Any]:
    client_id = settings.TELEGRAM_OIDC_CLIENT_ID.strip()
    signing_key = _jwks().get_signing_key_from_jwt(id_token)
    algs = [signing_key.algorithm_name] if signing_key.algorithm_name else ["RS256", "ES256"]
    audiences: list[str | int] = [client_id]
    if client_id.isdigit():
        audiences.append(int(client_id))
    claims = jwt.decode(
        id_token,
        signing_key.key,
        algorithms=algs,
        audience=audiences,
        issuer=OIDC_ISSUER,
        options={"require": ["exp", "iat", "sub"]},
    )
    return claims


def telegram_user_id_from_claims(claims: dict[str, Any]) -> int:
    if claims.get("id") is not None:
        return int(claims["id"])
    sub = claims.get("sub")
    if sub is None:
        raise TelegramOidcError("no_user_id")
    return int(sub)


async def exchange_authorization_code(code: str, code_verifier: str) -> dict[str, Any]:
    if not oidc_configured():
        raise TelegramOidcError("oidc_not_configured")

    client_id = settings.TELEGRAM_OIDC_CLIENT_ID.strip()
    client_secret = settings.TELEGRAM_OIDC_CLIENT_SECRET.strip()
    redirect_uri = settings.telegram_oidc_redirect_uri
    basic = base64.b64encode(f"{client_id}:{client_secret}".encode()).decode("ascii")
    body = urlencode(
        {
            "grant_type": "authorization_code",
            "code": code.strip(),
            "redirect_uri": redirect_uri,
            "client_id": client_id,
            "code_verifier": code_verifier,
        }
    )

    timeout = aiohttp.ClientTimeout(total=30)
    async with aiohttp.ClientSession(timeout=timeout) as session:
        async with session.post(
            OIDC_TOKEN_URL,
            data=body,
            headers={
                "Authorization": f"Basic {basic}",
                "Content-Type": "application/x-www-form-urlencoded",
            },
        ) as resp:
            raw = await resp.text()
            if resp.status >= 400:
                logger.warning("Telegram OIDC token error %s: %s", resp.status, raw[:500])
                raise TelegramOidcError("token_exchange_failed")
            try:
                data = json.loads(raw)
            except json.JSONDecodeError as exc:
                raise TelegramOidcError("token_exchange_failed") from exc

    id_token = data.get("id_token")
    if not isinstance(id_token, str) or not id_token:
        raise TelegramOidcError("missing_id_token")
    return data


def mint_oidc_handoff(access: str, lang: str, hint: dict[str, str]) -> str:
    """Короткий одноразовый код (2 мин) — обмен на токен с главной страницы (мобильные WebView)."""
    payload = {
        "a": access,
        "l": lang,
        "u": hint,
        "exp": int(time.time()) + 120,
        "n": secrets.token_urlsafe(8),
    }
    raw = base64.urlsafe_b64encode(json.dumps(payload, separators=(",", ":")).encode()).decode().rstrip("=")
    sig = hmac.new(_state_signing_key(), raw.encode("ascii"), hashlib.sha256).hexdigest()
    return f"{raw}.{sig}"


def redeem_oidc_handoff(code: str) -> tuple[str, str, dict[str, str]] | None:
    raw_code = (code or "").strip()
    if "." not in raw_code:
        return None
    body, sig = raw_code.rsplit(".", 1)
    expected = hmac.new(_state_signing_key(), body.encode("ascii"), hashlib.sha256).hexdigest()
    if not hmac.compare_digest(expected, sig):
        return None
    pad = "=" * ((4 - len(body) % 4) % 4)
    try:
        payload: dict[str, Any] = json.loads(base64.urlsafe_b64decode(body + pad).decode("utf-8"))
    except (ValueError, json.JSONDecodeError):
        return None
    if int(payload.get("exp") or 0) < int(time.time()):
        return None
    access = payload.get("a")
    lang = payload.get("l")
    hint = payload.get("u")
    if not isinstance(access, str) or not access:
        return None
    if not isinstance(lang, str):
        lang = "ru"
    if not isinstance(hint, dict):
        hint = {}
    return access, lang, hint


def _public_origin_from_request(request: Any) -> str:
    """Тот же хост, что у пользователя (важно для mobile и нескольких доменов за Caddy)."""
    if request is not None:
        fwd_proto = (request.headers.get("x-forwarded-proto") or "").split(",")[0].strip()
        fwd_host = (request.headers.get("x-forwarded-host") or request.headers.get("host") or "").split(",")[
            0
        ].strip()
        if fwd_host:
            scheme = fwd_proto or getattr(request.url, "scheme", "https")
            return f"{scheme}://{fwd_host}".rstrip("/")
    base = (settings.WEBAPP_PUBLIC_URL or "").strip().rstrip("/")
    return base


def render_oidc_finish_page(*, origin: str, handoff: str, error: str = "") -> HTMLResponse:
    """
    HTML вместо 302+#hash: мобильные браузеры и WebView после oauth.telegram.org
    надёжнее открывают страницу с коротким ?oidc_handoff=.
    """
    if error:
        target = f"{origin}/hub-login?error={error}" if origin else f"/hub-login?error={error}"
        safe_target = html_module.escape(target)
        body = f"""<!DOCTYPE html>
<html lang="ru"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>BrainBoosty</title>
<meta http-equiv="refresh" content="0;url={safe_target}">
</head><body>
<p>Вход не выполнен. <a href="{safe_target}">Вернуться на сайт</a></p>
<script>location.replace({json.dumps(target)});</script>
</body></html>"""
        return HTMLResponse(content=body, status_code=200)

    q = urlencode({"oidc_handoff": handoff})
    target = f"{origin}/?{q}" if origin else f"/?{q}"
    safe_target = html_module.escape(target)
    body = f"""<!DOCTYPE html>
<html lang="ru"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>BrainBoosty</title>
<meta http-equiv="refresh" content="0;url={safe_target}">
</head><body>
<p>Вход выполнен, открываем Neural Map…</p>
<p><a href="{safe_target}">Нажмите здесь, если страница не перешла сама</a></p>
<script>location.replace({json.dumps(target)});</script>
</body></html>"""
    return HTMLResponse(content=body, status_code=200)


async def complete_oidc_login(
    session: "AsyncSession",
    code: str,
    state: str,
) -> tuple[str, str, dict[str, str]]:
    """Обмен code → id_token, проверка JWT, выпуск site access token."""
    from brainboosty_hook_bot.src.locale import normalize_lang
    from brainboosty_hook_bot.src.web.webapp_service import get_user_by_tg_id

    verifier, _return_path = parse_oidc_state(state)
    token_response = await exchange_authorization_code(code, verifier)
    claims = await asyncio.to_thread(validate_id_token, str(token_response["id_token"]))
    tg_id = telegram_user_id_from_claims(claims)

    user = await get_user_by_tg_id(session, tg_id)
    if user is None:
        raise TelegramOidcError("not_registered")
    lang = normalize_lang(user.locale or "ru")
    access = mint_site_access_token(tg_id)
    name = (user.first_name or "").strip() or str(claims.get("name") or "")
    hint = {
        "first_name": name,
        "last_name": "",
        "language_code": "en" if lang == "en" else "ru",
    }
    return access, lang, hint
