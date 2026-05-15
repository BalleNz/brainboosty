"""Проверка, подписан ли пользователь на публичный канал (getChatMember)."""

from __future__ import annotations

import logging

from aiogram import Bot
from aiogram.enums import ChatMemberStatus
from aiogram.exceptions import TelegramBadRequest

from brainboosty_hook_bot.src.config.config import settings

logger = logging.getLogger(__name__)


async def user_is_channel_member(bot: Bot, user_id: int) -> bool:
    chat_id = settings.premium_channel_chat_id
    try:
        m = await bot.get_chat_member(chat_id=chat_id, user_id=user_id)
    except TelegramBadRequest as exc:
        logger.debug("get_chat_member %s: %s", chat_id, exc)
        return False
    if m.status in (ChatMemberStatus.LEFT, ChatMemberStatus.KICKED):
        return False
    if m.status == ChatMemberStatus.RESTRICTED:
        return bool(getattr(m, "is_member", False))
    return m.status in (
        ChatMemberStatus.MEMBER,
        ChatMemberStatus.ADMINISTRATOR,
        ChatMemberStatus.CREATOR,
    )
