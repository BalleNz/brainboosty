"""Сообщение в чат с кнопкой открытия Web App."""

from __future__ import annotations

from aiogram import Bot
from aiogram.types import Message

from brainboosty_hook_bot.src.keyboards.inline import webapp_entry_kb
from brainboosty_hook_bot.src.locale import t
from brainboosty_hook_bot.src.web.webapp_service import webapp_public_url


async def send_webapp_link_to_chat(bot: Bot, chat_id: int, lang: str) -> None:
    url = webapp_public_url()
    if not url:
        return
    await bot.send_message(
        chat_id,
        t(lang, "WEBAPP_OPEN_HINT"),
        reply_markup=webapp_entry_kb(lang, url),
        parse_mode="HTML",
    )


async def send_webapp_link(message: Message, lang: str) -> None:
    if message.bot is None:
        return
    await send_webapp_link_to_chat(message.bot, message.chat.id, lang)
