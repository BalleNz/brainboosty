"""Проверка Telegram Web App initData (HMAC-SHA256)."""

from __future__ import annotations

import hashlib
import hmac
import json
import time
from typing import Any
from urllib.parse import parse_qsl

from brainboosty_hook_bot.src.config.config import settings


class WebAppAuthError(Exception):
    def __init__(self, code: str, message: str = "") -> None:
        self.code = code
        super().__init__(message or code)


def validate_init_data(init_data: str, *, max_age_sec: int = 86400) -> dict[str, Any]:
    """Разбор и проверка initData. Возвращает поля (в т.ч. user как dict)."""
    raw = (init_data or "").strip()
    if not raw:
        raise WebAppAuthError("missing_init_data")

    token = (settings.BOT_TOKEN or "").strip()
    if not token:
        raise WebAppAuthError("bot_token_missing")

    parsed = dict(parse_qsl(raw, keep_blank_values=True))
    received_hash = parsed.pop("hash", None)
    if not received_hash:
        raise WebAppAuthError("missing_hash")

    data_check = "\n".join(f"{k}={v}" for k, v in sorted(parsed.items()))
    secret = hmac.new(b"WebAppData", token.encode(), hashlib.sha256).digest()
    expected = hmac.new(secret, data_check.encode(), hashlib.sha256).hexdigest()
    if not hmac.compare_digest(expected, received_hash):
        raise WebAppAuthError("invalid_signature")

    auth_date = int(parsed.get("auth_date", "0") or "0")
    if auth_date and max_age_sec > 0:
        if time.time() - auth_date > max_age_sec:
            raise WebAppAuthError("expired")

    user_raw = parsed.get("user")
    if user_raw:
        try:
            parsed["user"] = json.loads(user_raw)
        except json.JSONDecodeError as exc:
            raise WebAppAuthError("invalid_user_json") from exc

    return parsed


def tg_user_id_from_init(parsed: dict[str, Any]) -> int | None:
    user = parsed.get("user")
    if isinstance(user, dict) and user.get("id") is not None:
        try:
            return int(user["id"])
        except (TypeError, ValueError):
            return None
    return None


def validate_telegram_login_widget_payload(data: dict[str, Any], *, max_age_sec: int = 86400) -> int:
    """Проверка подписи Telegram Login Widget (callback onTelegramAuth), не Mini App initData."""
    if not data:
        raise WebAppAuthError("empty_body")
    check_hash = data.get("hash")
    if not check_hash or not isinstance(check_hash, str):
        raise WebAppAuthError("missing_hash")

    try:
        auth_date = int(data.get("auth_date") or 0)
    except (TypeError, ValueError) as exc:
        raise WebAppAuthError("missing_auth_date") from exc
    if not auth_date:
        raise WebAppAuthError("missing_auth_date")
    if max_age_sec > 0 and time.time() - auth_date > max_age_sec:
        raise WebAppAuthError("expired")

    token = (settings.BOT_TOKEN or "").strip()
    if not token:
        raise WebAppAuthError("bot_token_missing")

    parts: list[str] = []
    for key in sorted(data.keys()):
        if key == "hash":
            continue
        val = data[key]
        if val is None:
            continue
        parts.append(f"{key}={val}")

    data_check_string = "\n".join(parts)
    secret_key = hashlib.sha256(token.encode("utf-8")).digest()
    calculated = hmac.new(secret_key, data_check_string.encode("utf-8"), hashlib.sha256).hexdigest()
    if not hmac.compare_digest(calculated, check_hash):
        raise WebAppAuthError("invalid_signature")

    try:
        return int(data["id"])
    except (KeyError, TypeError, ValueError) as exc:
        raise WebAppAuthError("no_user_id") from exc
