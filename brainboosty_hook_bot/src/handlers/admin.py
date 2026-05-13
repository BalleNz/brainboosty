"""Админ-панель и рассылки."""

from __future__ import annotations

import asyncio
import logging
from datetime import datetime, timezone
from typing import Any

from aiogram import F, Router
from aiogram.filters import BaseFilter, Command
from aiogram.fsm.context import FSMContext
from aiogram.fsm.state import State, StatesGroup
from aiogram.types import CallbackQuery, Message
from sqlalchemy import and_, func, or_, select
from sqlalchemy.ext.asyncio import AsyncSession

from brainboosty_hook_bot.src.database.models import User
from brainboosty_hook_bot.src.keyboards.inline import (
    ADMIN_CB_ALL,
    ADMIN_CB_PREMIUM,
    ADMIN_CB_STATS,
    ADMIN_CONFIRM_NO,
    ADMIN_CONFIRM_YES,
    admin_confirm_broadcast_kb,
    admin_panel_kb,
)
from brainboosty_hook_bot.src.locale import t
from brainboosty_hook_bot.src.utils.helpers import is_admin_user

logger = logging.getLogger(__name__)

router = Router(name="admin")


class _AdminFilter(BaseFilter):
    async def __call__(self, event: Message | CallbackQuery) -> bool:
        user = event.from_user
        return is_admin_user(user)


admin_only = _AdminFilter()


class AdminStates(StatesGroup):
    wait_broadcast_content = State()


@router.message(Command("admin"))
async def cmd_admin(message: Message, locale: str) -> None:
    if not is_admin_user(message.from_user):
        await message.answer(t(locale, "ADMIN_ONLY"))
        return
    await message.answer(t(locale, "ADMIN_PANEL"), reply_markup=admin_panel_kb(locale))


@router.callback_query(F.data == ADMIN_CB_STATS, admin_only)
async def admin_stats(callback: CallbackQuery, session: AsyncSession, locale: str) -> None:
    total = await session.scalar(select(func.count()).select_from(User))
    now = datetime.now(timezone.utc)
    premium_now = await session.scalar(
        select(func.count())
        .select_from(User)
        .where(
            or_(
                User.lifetime_subscription.is_(True),
                and_(User.premium_until.is_not(None), User.premium_until > now),
            ),
        ),
    )

    await callback.message.answer(
        t(locale, "ADMIN_STATS", total=int(total or 0), premium_now=int(premium_now or 0)),
    )
    await callback.answer()


@router.callback_query(F.data.in_({ADMIN_CB_ALL, ADMIN_CB_PREMIUM}), admin_only)
async def admin_broadcast_start(callback: CallbackQuery, state: FSMContext, locale: str) -> None:
    scope = "all" if callback.data == ADMIN_CB_ALL else "premium"
    await state.set_state(AdminStates.wait_broadcast_content)
    await state.update_data(broadcast_scope=scope)
    await callback.message.answer(t(locale, "ADMIN_WAIT_BROADCAST"))
    await callback.answer()


@router.message(AdminStates.wait_broadcast_content, admin_only)
async def admin_broadcast_collect(message: Message, state: FSMContext, locale: str) -> None:
    await state.update_data(
        broadcast_chat_id=message.chat.id,
        broadcast_message_id=message.message_id,
    )
    await message.answer(t(locale, "ADMIN_CONFIRM"), reply_markup=admin_confirm_broadcast_kb(locale))


@router.callback_query(F.data.in_({ADMIN_CONFIRM_YES, ADMIN_CONFIRM_NO}), admin_only)
async def admin_broadcast_confirm(
    callback: CallbackQuery,
    state: FSMContext,
    session: AsyncSession,
    locale: str,
) -> None:
    if callback.message is None:
        await callback.answer()
        return

    if callback.data == ADMIN_CONFIRM_NO:
        await state.clear()
        await callback.message.answer(t(locale, "CANCELLED"))
        await callback.answer()
        return

    data: dict[str, Any] = await state.get_data()
    scope = data.get("broadcast_scope")
    chat_id = data.get("broadcast_chat_id")
    message_id = data.get("broadcast_message_id")

    if scope not in {"all", "premium"} or not isinstance(chat_id, int) or not isinstance(message_id, int):
        await state.clear()
        await callback.message.answer(t(locale, "ADMIN_BROADCAST_NO_DATA"))
        await callback.answer()
        return

    stmt = select(User.tg_id)
    if scope == "premium":
        now = datetime.now(timezone.utc)
        stmt = stmt.where(
            or_(
                User.lifetime_subscription.is_(True),
                and_(User.premium_until.is_not(None), User.premium_until > now),
            ),
        )

    rows = await session.execute(stmt)
    targets = list(rows.scalars().all())

    ok = 0
    fail = 0
    bot = callback.bot

    for tg_id in targets:
        try:
            await bot.copy_message(chat_id=tg_id, from_chat_id=chat_id, message_id=message_id)
            ok += 1
            await asyncio.sleep(0.035)
        except Exception as exc:  # noqa: BLE001
            fail += 1
            logger.warning("Broadcast failed for %s: %s", tg_id, exc)

    await state.clear()
    await callback.message.answer(t(locale, "ADMIN_SENT", ok=ok, fail=fail))
    await callback.answer()
