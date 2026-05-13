"""Удаление цепочки сообщений бота во время анкеты/теста (чистый чат)."""

from __future__ import annotations

import logging

from aiogram import Bot
from aiogram.fsm.context import FSMContext
from aiogram.types import Message, ReplyKeyboardRemove

logger = logging.getLogger(__name__)

FLOW_MSG_IDS = "flow_msg_ids"


async def flow_remember(state: FSMContext, *message_ids: int) -> None:
    data = await state.get_data()
    cur: list[int] = list(data.get(FLOW_MSG_IDS) or [])
    for mid in message_ids:
        if mid and mid not in cur:
            cur.append(mid)
    await state.update_data(flow_msg_ids=cur)


async def flow_wipe(
    bot: Bot,
    chat_id: int,
    state: FSMContext,
    *,
    extra_ids: tuple[int, ...] = (),
) -> None:
    data = await state.get_data()
    ids: list[int] = list(data.get(FLOW_MSG_IDS) or [])
    for e in extra_ids:
        if e and e not in ids:
            ids.append(e)
    for mid in ids:
        try:
            await bot.delete_message(chat_id, mid)
        except Exception as exc:  # noqa: BLE001
            logger.debug("delete_message %s: %s", mid, exc)
    await state.update_data(flow_msg_ids=[])


async def remove_reply_keyboard(bot: Bot, chat_id: int) -> None:
    """Снять reply-клавиатуру без видимого текста (inline+remove в одном сообщении недоступны)."""
    sent = await bot.send_message(chat_id, "\u2060", reply_markup=ReplyKeyboardRemove())
    await delete_one(bot, chat_id, sent.message_id)


async def delete_one(bot: Bot, chat_id: int, message_id: int | None) -> None:
    if message_id is None:
        return
    try:
        await bot.delete_message(chat_id, message_id)
    except Exception as exc:  # noqa: BLE001
        logger.debug("delete_one %s: %s", message_id, exc)


async def try_delete_user_message(message: Message) -> None:
    """Удалить сообщение пользователя (в личке обычно доступно; иначе тихо игнорируем)."""
    if message.chat is None:
        return
    await delete_one(message.bot, message.chat.id, message.message_id)
