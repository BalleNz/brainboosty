"""Анкета пользователя (FSM)."""

from __future__ import annotations

from aiogram import F, Router
from aiogram.fsm.context import FSMContext
from aiogram.fsm.state import State, StatesGroup
from aiogram.types import CallbackQuery, Message
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from brainboosty_hook_bot.src.database.models import User
from brainboosty_hook_bot.src.handlers.cognitive import prompt_test_style_choice
from brainboosty_hook_bot.src.services import subscription_service
from brainboosty_hook_bot.src.keyboards.inline import (
    QUEST_LANG_PREFIX,
    SKILL_CALLBACK_PREFIX,
    TIME_CALLBACK_PREFIX,
    questionnaire_skill_kb,
    questionnaire_time_kb,
)
from brainboosty_hook_bot.src.locale import t
from brainboosty_hook_bot.src.utils.flow_chat import flow_remember, flow_wipe, remove_reply_keyboard

router = Router(name="questionnaire")

_ALLOWED_SKILLS = frozenset(
    {
        "sexual_diversity",
        "self_control",
        "sociability",
        "memory",
        "speech",
        "reduce_anxiety",
        "empathy",
    },
)


async def _quest_lang(state: FSMContext, fallback: str) -> str:
    data = await state.get_data()
    q = data.get("quest_lang")
    if q in {"ru", "en"}:
        return str(q)
    return fallback if fallback in {"ru", "en"} else "ru"


class QuestStates(StatesGroup):
    language = State()
    skill = State()
    age = State()
    time = State()


def _goals_from_skill_key(key: str) -> list[str]:
    return [key]


async def _fetch_user_by_tg(session: AsyncSession, tg_id: int) -> User | None:
    result = await session.execute(select(User).where(User.tg_id == tg_id))
    return result.scalar_one_or_none()


@router.callback_query(QuestStates.language, F.data.startswith(QUEST_LANG_PREFIX))
async def quest_language_chosen(callback: CallbackQuery, state: FSMContext) -> None:
    if callback.from_user is None or callback.message is None or callback.data is None:
        await callback.answer()
        return

    code = callback.data.removeprefix(QUEST_LANG_PREFIX)
    if code not in {"ru", "en"}:
        await callback.answer()
        return

    bot = callback.bot
    chat_id = callback.message.chat.id
    await flow_wipe(bot, chat_id, state, extra_ids=(callback.message.message_id,))

    await state.update_data(quest_lang=code)
    await state.set_state(QuestStates.skill)
    name = callback.from_user.first_name or ("friend" if code == "en" else "друг")
    m1 = await bot.send_message(chat_id, t(code, "START_NEW_INTRO", name=name))
    m2 = await bot.send_message(
        chat_id,
        t(code, "QUESTION_SKILL"),
        reply_markup=questionnaire_skill_kb(code),
    )
    await flow_remember(state, m1.message_id, m2.message_id)
    await callback.answer()


@router.callback_query(QuestStates.skill, F.data.startswith(SKILL_CALLBACK_PREFIX))
async def quest_skill_chosen(
    callback: CallbackQuery,
    state: FSMContext,
    locale: str,
) -> None:
    if callback.from_user is None or callback.message is None or callback.data is None:
        return

    lang = await _quest_lang(state, locale)
    key = callback.data.removeprefix(SKILL_CALLBACK_PREFIX)
    if key not in _ALLOWED_SKILLS:
        await callback.answer(t(lang, "ERR_UNKNOWN_OPTION"), show_alert=True)
        return

    bot = callback.bot
    chat_id = callback.message.chat.id
    await flow_wipe(bot, chat_id, state, extra_ids=(callback.message.message_id,))

    await state.update_data(skill_key=key)
    await state.set_state(QuestStates.age)
    sent = await bot.send_message(chat_id, t(lang, "QUESTION_AGE"))
    await flow_remember(state, sent.message_id)
    await callback.answer()


@router.message(QuestStates.age, F.text)
async def quest_age_entered(message: Message, state: FSMContext, locale: str) -> None:
    lang = await _quest_lang(state, locale)
    raw = (message.text or "").strip()

    if not raw.isdigit():
        try:
            await message.delete()
        except Exception:
            pass
        await message.answer(t(lang, "AGE_INVALID"))
        return

    age = int(raw)
    if age < 5 or age > 120:
        try:
            await message.delete()
        except Exception:
            pass
        await message.answer(t(lang, "AGE_INVALID"))
        return

    try:
        await message.delete()
    except Exception:
        pass

    bot = message.bot
    chat_id = message.chat.id
    await flow_wipe(bot, chat_id, state)

    await state.update_data(age=age)
    await state.set_state(QuestStates.time)
    sent = await bot.send_message(chat_id, t(lang, "QUESTION_TIME"), reply_markup=questionnaire_time_kb(lang))
    await flow_remember(state, sent.message_id)


@router.callback_query(QuestStates.time, F.data.startswith(TIME_CALLBACK_PREFIX))
async def quest_time_chosen(
    callback: CallbackQuery,
    state: FSMContext,
    session: AsyncSession,
    locale: str,
) -> None:
    if callback.from_user is None or callback.message is None or callback.data is None:
        return

    token = callback.data.removeprefix(TIME_CALLBACK_PREFIX)
    lang = await _quest_lang(state, locale)
    if token not in {"1-5", "5-15", "15+"}:
        await callback.answer(t(lang, "ERR_UNKNOWN_OPTION"), show_alert=True)
        return

    data = await state.get_data()
    pending_ref_tg = data.get("pending_referrer_tg_id")
    skill_key = data.get("skill_key")
    age = data.get("age")
    if not isinstance(skill_key, str) or not isinstance(age, int):
        await callback.answer(t(lang, "ERR_QUEST_RESET"), show_alert=True)
        await state.clear()
        return

    goals = _goals_from_skill_key(skill_key)

    new_user = User(
        tg_id=callback.from_user.id,
        username=callback.from_user.username,
        first_name=callback.from_user.first_name or "User",
        goals=goals,
        age=age,
        daily_time=token,
        premium_until=None,
        referrer_id=None,
        referral_count=0,
        locale=lang,
    )
    session.add(new_user)
    await session.flush()

    if isinstance(pending_ref_tg, int) and pending_ref_tg != callback.from_user.id:
        referrer = await _fetch_user_by_tg(session, pending_ref_tg)
        if referrer is not None:
            new_user.referrer_id = referrer.id
            referrer.referral_count += 1
            subscription_service.add_premium_delta(referrer, subscription_service.REFERRAL_BONUS_DELTA)
            rlang = referrer.locale if referrer.locale in {"ru", "en"} else "ru"
            await callback.bot.send_message(
                chat_id=referrer.tg_id,
                text=t(rlang, "REFERRAL_BONUS_GRANTED"),
            )

    bot = callback.bot
    chat_id = callback.message.chat.id
    await flow_wipe(bot, chat_id, state, extra_ids=(callback.message.message_id,))

    await remove_reply_keyboard(bot, chat_id)
    await prompt_test_style_choice(state, lang, bot=bot, chat_id=chat_id)
    await callback.answer()
