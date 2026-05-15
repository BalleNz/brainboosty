"""Общие команды (/cancel, /language)."""

from __future__ import annotations

from aiogram import F, Router
from aiogram.filters import Command
from aiogram.fsm.context import FSMContext
from aiogram.types import CallbackQuery, Message
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from brainboosty_hook_bot.src.database.models import User
from brainboosty_hook_bot.src.handlers.questionnaire import QuestStates, goals_to_prefill_skill_keys
from brainboosty_hook_bot.src.keyboards.inline import LANG_PREFIX, RESET_ACCOUNT_CONFIRM_CB, lang_pick_kb, questionnaire_skill_kb, reset_account_confirm_kb
from brainboosty_hook_bot.src.keyboards.reply import main_reply_kb
from brainboosty_hook_bot.src.locale import t
from brainboosty_hook_bot.src.services.subscription_service import user_has_paid_access
from brainboosty_hook_bot.src.services.user_account_reset import wipe_user_profile_keep_subscription
from brainboosty_hook_bot.src.utils.flow_chat import flow_remember

router = Router(name="common")


@router.message(Command("cancel"))
async def cmd_cancel(message: Message, state: FSMContext, locale: str) -> None:
    await state.clear()
    await message.answer(t(locale, "CANCELLED"))


@router.message(Command("language"))
async def cmd_language(message: Message, locale: str) -> None:
    await message.answer(t(locale, "LANG_PROMPT"), reply_markup=lang_pick_kb(locale), parse_mode="HTML")


@router.message(Command("skills"))
async def cmd_skills(message: Message, state: FSMContext, session: AsyncSession, locale: str) -> None:
    if message.from_user is None:
        return
    st = await state.get_state()
    if st and "CognitiveStates" in str(st):
        await message.answer(t(locale, "SKILLS_FINISH_COGNITIVE_FIRST"))
        return

    user = (await session.execute(select(User).where(User.tg_id == message.from_user.id))).scalar_one_or_none()
    if user is None:
        await message.answer(t(locale, "NOT_REGISTERED"))
        return

    lang = user.locale if user.locale in {"ru", "en"} else locale
    pref = goals_to_prefill_skill_keys(user.goals)
    await state.update_data(
        quest_lang=lang,
        skill_keys=list(pref),
        skills_edit_only=True,
    )
    await state.set_state(QuestStates.skill)
    sent = await message.answer(
        t(lang, "SKILLS_REPICK_INTRO"),
        reply_markup=questionnaire_skill_kb(lang, selected=tuple(pref), show_done_button=True),
    )
    await flow_remember(state, sent.message_id)


@router.message(Command("reset"))
async def cmd_reset(message: Message, session: AsyncSession, locale: str) -> None:
    if message.from_user is None:
        return
    r = await session.execute(select(User).where(User.tg_id == message.from_user.id))
    user = r.scalar_one_or_none()
    lg = user.locale if user and user.locale in {"ru", "en"} else locale
    if user is None:
        await message.answer(t(lg, "RESET_NO_ACCOUNT"))
        return
    await message.answer(t(lg, "RESET_CONFIRM_TEXT"), reply_markup=reset_account_confirm_kb(lg))


@router.callback_query(F.data == RESET_ACCOUNT_CONFIRM_CB)
async def reset_account_confirm_callback(
    callback: CallbackQuery,
    session: AsyncSession,
    state: FSMContext,
    locale: str,
) -> None:
    if callback.from_user is None:
        await callback.answer()
        return
    r = await session.execute(select(User).where(User.tg_id == callback.from_user.id))
    user = r.scalar_one_or_none()
    lg = user.locale if user and user.locale in {"ru", "en"} else locale
    if user is None:
        await callback.answer(t(locale, "RESET_NO_ACCOUNT"), show_alert=True)
        return
    user.username = callback.from_user.username
    user.first_name = callback.from_user.first_name or user.first_name
    await wipe_user_profile_keep_subscription(session, user)
    await state.clear()
    await callback.answer()
    if callback.message is not None:
        try:
            await callback.message.edit_text(t(lg, "RESET_DELETED_DONE"))
        except Exception:  # noqa: BLE001
            await callback.message.answer(t(lg, "RESET_DELETED_DONE"))


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
                reply_markup=main_reply_kb(
                    code,
                    paid_access=user_has_paid_access(user),
                    show_retest=user_has_paid_access(user),
                ),
            )
        else:
            await callback.message.answer(t(code, "LANG_UPDATED", choice=label))
    await callback.answer()
