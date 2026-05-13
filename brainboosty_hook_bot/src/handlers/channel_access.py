"""Проверка подписки на канал и краткий полный доступ после теста."""

from __future__ import annotations

import asyncio
import logging
import time

from aiogram import F, Router
from aiogram.types import CallbackQuery
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from brainboosty_hook_bot.src.database.models import User
from brainboosty_hook_bot.src.keyboards.inline import CHECK_CHANNEL_SUB_CB, post_teaser_kb
from brainboosty_hook_bot.src.locale import t
from brainboosty_hook_bot.src.services import subscription_service
from brainboosty_hook_bot.src.services.brain_result_delivery import (
    schedule_delete_messages,
    send_full_brain_result_pack,
)
from brainboosty_hook_bot.src.services.channel_membership import user_is_channel_member

logger = logging.getLogger(__name__)

router = Router(name="channel_access")

_PACK_DEBOUNCE_SEC = 75.0
_last_trial_pack_mono: dict[int, float] = {}


@router.callback_query(F.data == CHECK_CHANNEL_SUB_CB)
async def verify_channel_subscription(
    callback: CallbackQuery,
    session: AsyncSession,
    locale: str,
) -> None:
    if callback.from_user is None or callback.message is None:
        await callback.answer()
        return

    result = await session.execute(select(User).where(User.tg_id == callback.from_user.id))
    user = result.scalar_one_or_none()
    if user is None:
        await callback.answer(t(locale, "NOT_REGISTERED"), show_alert=True)
        return

    lang = user.locale if user.locale in {"ru", "en"} else locale

    if user.lifetime_subscription or subscription_service.user_has_paid_access(user):
        await callback.answer(t(lang, "CHANNEL_TRIAL_ALREADY_FULL_ACCESS"), show_alert=False)
        return

    if not await user_is_channel_member(callback.bot, callback.from_user.id):
        await callback.answer(t(lang, "CHANNEL_SUB_NOT_MEMBER"), show_alert=True)
        return

    uid = callback.from_user.id
    now_m = time.monotonic()
    prev = _last_trial_pack_mono.get(uid)
    if prev is not None and now_m - prev < _PACK_DEBOUNCE_SEC:
        await callback.answer(t(lang, "CHANNEL_TRIAL_DEBOUNCE"), show_alert=False)
        return

    try:
        ids = await send_full_brain_result_pack(
            callback.bot,
            callback.message.chat.id,
            session,
            user,
            lang,
            reply_markup=post_teaser_kb(lang),
        )
    except ValueError as exc:
        logger.warning("channel trial pack: %s", exc)
        await callback.answer(t(lang, "NO_BRAIN_MAP_YET"), show_alert=True)
        return

    subscription_service.add_premium_delta(user, subscription_service.CHANNEL_TRIAL_DELTA)
    _last_trial_pack_mono[uid] = now_m

    tip = await callback.bot.send_message(callback.message.chat.id, t(lang, "CHANNEL_TRIAL_UNLOCKED"))
    ids.append(tip.message_id)

    delay = subscription_service.CHANNEL_TRIAL_DELTA.total_seconds()
    asyncio.create_task(
        schedule_delete_messages(callback.bot, callback.message.chat.id, ids, delay),
    )

    await callback.answer(t(lang, "CHANNEL_SUB_OK"), show_alert=False)
