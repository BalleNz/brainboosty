"""Подписанные токены для входа с сайта (браузер) после Telegram Login Widget."""

from __future__ import annotations

import base64
import hashlib
import hmac
import json
import time
from typing import Any

from brainboosty_hook_bot.src.config.config import settings


def _signing_key() -> bytes:
    raw = (settings.WEBAPP_SITE_SESSION_SECRET or "").strip()
    if raw:
        return hashlib.sha256(raw.encode("utf-8")).digest()
    tok = (settings.BOT_TOKEN or "").strip()
    if not tok:
        return hashlib.sha256(b"bb-site-session-dev-fallback").digest()
    return hashlib.sha256(b"bb-site-session-v1|" + tok.encode("utf-8")).digest()


def mint_site_access_token(tg_id: int, *, ttl_seconds: int = 1_209_600) -> str:
    """JWT-подобный stateless токен (14 суток по умолчанию)."""
    now = int(time.time())
    exp = now + ttl_seconds
    payload_obj: dict[str, Any] = {"tg_id": int(tg_id), "iat": now, "exp": exp}
    payload_json = json.dumps(payload_obj, separators=(",", ":")).encode("utf-8")
    payload_b64 = base64.urlsafe_b64encode(payload_json).decode("ascii").rstrip("=")
    sig = hmac.new(_signing_key(), payload_b64.encode("ascii"), hashlib.sha256).hexdigest()
    return f"{payload_b64}.{sig}"


def verify_site_access_token(token: str) -> int | None:
    raw = (token or "").strip()
    if not raw or "." not in raw:
        return None
    payload_b64, sig = raw.rsplit(".", 1)
    if not sig or len(sig) != 64:
        return None
    expected = hmac.new(_signing_key(), payload_b64.encode("ascii"), hashlib.sha256).hexdigest()
    if not hmac.compare_digest(expected, sig):
        return None
    pad = "=" * ((4 - len(payload_b64) % 4) % 4)
    try:
        obj: dict[str, Any] = json.loads(base64.urlsafe_b64decode(payload_b64 + pad).decode("utf-8"))
    except (ValueError, json.JSONDecodeError):
        return None
    tg_id = obj.get("tg_id")
    exp = int(obj.get("exp") or 0)
    if not isinstance(tg_id, int) or tg_id <= 0:
        return None
    if int(time.time()) > exp:
        return None
    return tg_id
