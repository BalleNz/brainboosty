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


_SITE_LOGIN_TOKEN_PATTERN = re.compile(r"^site_([a-f0-9]{32})$", re.IGNORECASE)


def parse_site_login_token(payload: str | None) -> str | None:
    """
    Токен входа с сайта: deep-link /start site_<32 hex>.

    Возвращает сырое hex (32 символа) без префикса site_, либо None.
    """
    if not payload:
        return None
    raw = unquote(payload.strip().replace("+", " "))
    m = _SITE_LOGIN_TOKEN_PATTERN.match(raw.strip())
    if not m:
        return None
    return m.group(1).lower()
