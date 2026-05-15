"""Анкета пользователя (FSM)."""

from __future__ import annotations

from typing import Any

from aiogram import F, Router
from aiogram.exceptions import TelegramBadRequest
from aiogram.fsm.context import FSMContext
from aiogram.fsm.state import State, StatesGroup
from aiogram.types import CallbackQuery, Message
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from brainboosty_hook_bot.src.database.models import User
from brainboosty_hook_bot.src.handlers.cognitive import prompt_test_style_choice
from brainboosty_hook_bot.src.keyboards.inline import (
    QUEST_LANG_PREFIX,
    QUEST_SKILL_KEY_SET,
    SKILL_CALLBACK_PREFIX,
    SKILL_DONE_CALLBACK,
    TIME_CALLBACK_PREFIX,
    questionnaire_skill_kb,
    questionnaire_time_kb,
    start_lang_pick_kb,
)
from brainboosty_hook_bot.src.keyboards.reply import main_reply_kb
from brainboosty_hook_bot.src.locale import question_skill_message, t
from brainboosty_hook_bot.src.services import subscription_service
from brainboosty_hook_bot.src.services.subscription_service import user_has_paid_access
from brainboosty_hook_bot.src.utils.flow_chat import flow_remember, flow_wipe, remove_reply_keyboard, try_delete_user_message

router = Router(name="questionnaire")


class QuestStates(StatesGroup):
    language = State()
    skill = State()
    age = State()
    time = State()


def skill_keys_for_resume(data: dict[str, Any]) -> list[str] | None:
    """Навыки из FSM-данных для /start (resume)."""
    sk = data.get("skill_keys")
    if isinstance(sk, list):
        out = [str(x) for x in sk if isinstance(x, str) and x in QUEST_SKILL_KEY_SET]
        if out:
            return out[:2]
    legacy = data.get("skill_key")
    if isinstance(legacy, str) and legacy in QUEST_SKILL_KEY_SET:
        return [legacy]
    return None


def goals_to_prefill_skill_keys(goals: Any) -> list[str]:
    """Текущие цели пользователя → до двух ключей для клавиатуры /skills."""
    if not isinstance(goals, list):
        return []
    return _normalize_skill_keys_list([g for g in goals if isinstance(g, str)])


def _normalize_skill_keys_list(raw: Any) -> list[str]:
    if not isinstance(raw, list):
        return []
    out: list[str] = []
    seen: set[str] = set()
    for x in raw:
        if not isinstance(x, str) or x not in QUEST_SKILL_KEY_SET or x in seen:
            continue
        out.append(x)
        seen.add(x)
        if len(out) >= 2:
            break
    return out


async def _quest_lang(state: FSMContext, fallback: str) -> str:
    data = await state.get_data()
    q = data.get("quest_lang")
    if q in {"ru", "en"}:
        return str(q)
    return fallback if fallback in {"ru", "en"} else "ru"


def _parse_age_years(text: str | None) -> int | None:
    """Только целые цифры 0–9, возраст 5–120; иначе None."""
    if text is None:
        return None
    raw = text.strip()
    if not raw or not raw.isdigit():
        return None
    age = int(raw)
    if age < 5 or age > 120:
        return None
    return age


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

    await state.update_data(quest_lang=code, skill_keys=[], skills_edit_only=False)
    await state.set_state(QuestStates.skill)
    name = callback.from_user.first_name or ("friend" if code == "en" else "друг")
    m1 = await bot.send_message(chat_id, t(code, "START_NEW_INTRO", name=name), parse_mode="HTML")
    m2 = await bot.send_message(
        chat_id,
        question_skill_message(code, selected_count=0),
        reply_markup=questionnaire_skill_kb(code, selected=()),
        parse_mode="HTML",
    )
    await flow_remember(state, m1.message_id, m2.message_id)
    await callback.answer()


@router.message(QuestStates.language)
async def quest_language_stray(message: Message, state: FSMContext, locale: str) -> None:
    await try_delete_user_message(message)
    sent = await message.answer(
        t(locale, "LANG_PROMPT"),
        reply_markup=start_lang_pick_kb(),
        parse_mode="HTML",
    )
    await flow_remember(state, sent.message_id)


@router.callback_query(QuestStates.skill, F.data.startswith(SKILL_CALLBACK_PREFIX))
async def quest_skill_interaction(
    callback: CallbackQuery,
    state: FSMContext,
    session: AsyncSession,
    locale: str,
) -> None:
    if callback.from_user is None or callback.message is None or callback.data is None:
        await callback.answer()
        return

    lang = await _quest_lang(state, locale)
    data = await state.get_data()
    skill_keys = _normalize_skill_keys_list(data.get("skill_keys"))

    if callback.data == SKILL_DONE_CALLBACK:
        if not skill_keys:
            await callback.answer(t(lang, "SKILLS_NEED_ONE"), show_alert=True)
            return

        if data.get("skills_edit_only"):
            user = await _fetch_user_by_tg(session, callback.from_user.id)
            if user is None:
                await callback.answer(t(lang, "NOT_REGISTERED"), show_alert=True)
                await state.clear()
                return
            user.goals = list(skill_keys)
            await state.clear()
            await callback.answer()
            try:
                await callback.message.edit_reply_markup(reply_markup=None)
            except TelegramBadRequest:
                pass
            u_lang = user.locale if user.locale in {"ru", "en"} else lang
            await callback.message.answer(
                t(u_lang, "SKILLS_UPDATED"),
                reply_markup=main_reply_kb(
                    u_lang,
                    paid_access=user_has_paid_access(user),
                    show_retest=user_has_paid_access(user),
                ),
            )
            return

        bot = callback.bot
        chat_id = callback.message.chat.id
        await flow_wipe(bot, chat_id, state, extra_ids=(callback.message.message_id,))
        await state.update_data(skill_keys=list(skill_keys))
        await state.set_state(QuestStates.age)
        sent = await bot.send_message(
            chat_id,
            t(lang, "QUESTION_AGE"),
            parse_mode="HTML",
        )
        await flow_remember(state, sent.message_id)
        await callback.answer()
        return

    key = callback.data.removeprefix(SKILL_CALLBACK_PREFIX)
    if key not in QUEST_SKILL_KEY_SET:
        await callback.answer(t(lang, "ERR_UNKNOWN_OPTION"), show_alert=True)
        return

    edit_only = bool(data.get("skills_edit_only"))
    max_skills = 2 if edit_only else 1

    if key in skill_keys:
        skill_keys = [k for k in skill_keys if k != key]
    elif len(skill_keys) >= max_skills:
        if max_skills == 1:
            skill_keys = [key]
        else:
            await callback.answer(t(lang, "SKILLS_MAX_TWO"), show_alert=True)
            return
    else:
        skill_keys = [*skill_keys, key]

    await state.update_data(skill_keys=skill_keys)
    if not edit_only and len(skill_keys) == 1:
        bot = callback.bot
        chat_id = callback.message.chat.id
        await flow_wipe(bot, chat_id, state, extra_ids=(callback.message.message_id,))
        await state.set_state(QuestStates.age)
        sent = await bot.send_message(
            chat_id,
            t(lang, "QUESTION_AGE"),
            parse_mode="HTML",
        )
        await flow_remember(state, sent.message_id)
        await callback.answer()
        return

    try:
        await callback.message.edit_text(
            question_skill_message(lang, selected_count=len(skill_keys), max_skills=max_skills),
            reply_markup=questionnaire_skill_kb(
                lang,
                selected=tuple(skill_keys),
                show_done_button=edit_only,
            ),
            parse_mode="HTML",
        )
    except TelegramBadRequest:
        pass
    await callback.answer()


@router.message(QuestStates.skill)
async def quest_skill_text_instead_of_button(message: Message, state: FSMContext, locale: str) -> None:
    lang = await _quest_lang(state, locale)
    await try_delete_user_message(message)
    data = await state.get_data()
    sel = tuple(_normalize_skill_keys_list(data.get("skill_keys")))
    sent = await message.answer(
        t(lang, "QUEST_STAY_ON_STEP"),
        reply_markup=questionnaire_skill_kb(
            lang,
            selected=sel,
            show_done_button=bool(data.get("skills_edit_only")),
        ),
    )
    await flow_remember(state, sent.message_id)


@router.message(QuestStates.age)
async def quest_age_entered(message: Message, state: FSMContext, locale: str) -> None:
    lang = await _quest_lang(state, locale)
    age = _parse_age_years(message.text)

    if age is None:
        await try_delete_user_message(message)
        sent = await message.answer(
            f"{t(lang, 'AGE_INVALID')}",
        )
        await flow_remember(state, sent.message_id)
        return

    await try_delete_user_message(message)

    bot = message.bot
    chat_id = message.chat.id
    await flow_wipe(bot, chat_id, state)

    await state.update_data(age=age)
    await state.set_state(QuestStates.time)
    sent = await bot.send_message(
        chat_id,
        t(lang, "QUESTION_TIME"),
        reply_markup=questionnaire_time_kb(lang),
        parse_mode="HTML",
    )
    await flow_remember(state, sent.message_id)


@router.message(QuestStates.time)
async def quest_time_stray(message: Message, state: FSMContext, locale: str) -> None:
    lang = await _quest_lang(state, locale)
    await try_delete_user_message(message)
    sent = await message.answer(
        t(lang, "QUEST_STAY_ON_STEP"),
        reply_markup=questionnaire_time_kb(lang),
    )
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
    age = data.get("age")
    skill_keys = _normalize_skill_keys_list(data.get("skill_keys"))
    if not skill_keys or not isinstance(age, int):
        await callback.answer(t(lang, "ERR_QUEST_RESET"), show_alert=True)
        await state.clear()
        return

    goals = list(skill_keys)
    tg_id = callback.from_user.id
    existing = await _fetch_user_by_tg(session, tg_id)
    if existing is not None:
        existing.username = callback.from_user.username
        existing.first_name = callback.from_user.first_name or existing.first_name or "User"
        existing.goals = goals
        existing.age = age
        existing.daily_time = token
        existing.locale = lang
        existing.cognitive_completed = False
        target_user = existing
    else:
        new_user = User(
            tg_id=tg_id,
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
        target_user = new_user

    if isinstance(pending_ref_tg, int) and pending_ref_tg != tg_id:
        if target_user.referrer_id is None:
            referrer = await _fetch_user_by_tg(session, pending_ref_tg)
            if referrer is not None:
                target_user.referrer_id = referrer.id
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
