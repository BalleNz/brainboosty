"""Общие команды (/cancel, /lang)."""

from __future__ import annotations

from aiogram import F, Router
from aiogram.filters import Command
from aiogram.fsm.context import FSMContext
from aiogram.types import CallbackQuery, Message
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from brainboosty_hook_bot.src.database.models import User
from brainboosty_hook_bot.src.keyboards.inline import LANG_PREFIX, lang_pick_kb
from brainboosty_hook_bot.src.keyboards.reply import main_reply_kb
from brainboosty_hook_bot.src.locale import t
from brainboosty_hook_bot.src.services.subscription_service import user_has_paid_access

router = Router(name="common")


@router.message(Command("cancel"))
async def cmd_cancel(message: Message, state: FSMContext, locale: str) -> None:
    await state.clear()
    await message.answer(t(locale, "CANCELLED"))


@router.message(Command("lang"))
async def cmd_lang(message: Message, locale: str) -> None:
    await message.answer(t(locale, "LANG_PROMPT"), reply_markup=lang_pick_kb(locale))


@router.callback_query(F.data.startswith(LANG_PREFIX))
async def lang_callback(
    callback: CallbackQuery,
    session: AsyncSession,
    state: FSMContext,
    locale: str,
) -> None:
    if callback.from_user is None or callback.data is None:
        await callback.answer()
        return

    code = callback.data.removeprefix(LANG_PREFIX)
    if code not in {"ru", "en"}:
        await callback.answer()
        return

    r = await session.execute(select(User).where(User.tg_id == callback.from_user.id))
    user = r.scalar_one_or_none()
    if user is not None:
        user.locale = code
    await state.update_data(quest_lang=code)

    label = t(code, "LANG_RU") if code == "ru" else t(code, "LANG_EN")
    if callback.message:
        if user is not None:
            await callback.message.answer(
                t(code, "LANG_UPDATED", choice=label),
                reply_markup=main_reply_kb(code, show_retest=user_has_paid_access(user)),
            )
        else:
            await callback.message.answer(t(code, "LANG_UPDATED", choice=label))
    await callback.answer()
