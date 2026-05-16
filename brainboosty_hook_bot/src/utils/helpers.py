"""Вспомогательные функции (ссылки, права, deep-link)."""

from __future__ import annotations

import re
from urllib.parse import quote, unquote

from aiogram.types import User as TgUser

from brainboosty_hook_bot.src.config.config import settings


def normalize_username(username: str | None) -> str | None:
    """Приводит username к нижнему регистру без символа @."""
    if not username:
        return None
    return username.lstrip("@").lower()


def is_admin_user(user: TgUser | None) -> bool:
    """Проверка, что пользователь — администратор по username из конфига."""
    if user is None or not user.username:
        return False
    admin = normalize_username(settings.ADMIN_USERNAME)
    return normalize_username(user.username) == admin


_START_PAYLOAD_PATTERN = re.compile(r"^ref_(\d+)$", re.IGNORECASE)


def parse_start_payload(payload: str | None) -> int | None:
    """
    Извлекает Telegram ID пригласившего из deep-link `/start ref_<tg_id>`.

    Возвращает None, если payload не реферальный или некорректен.
    """
    if not payload:
        return None
    payload = payload.strip()
    match = _START_PAYLOAD_PATTERN.match(payload)
    if not match:
        return None
    return int(match.group(1))


def build_ref_link(inviter_tg_id: int) -> str:
    """Формирует реферальную ссылку для пользователя."""
    bot = settings.BOT_USERNAME.lstrip("@")
    payload = quote(f"ref_{inviter_tg_id}")
    return f"https://t.me/{bot}?start={payload}"

