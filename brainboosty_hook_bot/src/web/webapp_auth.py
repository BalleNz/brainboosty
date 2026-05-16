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

