"""Точка входа /start."""

from __future__ import annotations

from aiogram import Router
from aiogram.filters import CommandStart
from aiogram.fsm.context import FSMContext
from aiogram.types import Message
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from brainboosty_hook_bot.src.database.models import User
from brainboosty_hook_bot.src.handlers.questionnaire import QuestStates, skill_keys_for_resume
from brainboosty_hook_bot.src.keyboards.inline import (
    cognitive_resume_kb,
    questionnaire_skill_kb,
    questionnaire_time_kb,
    start_lang_pick_kb,
)
from brainboosty_hook_bot.src.keyboards.reply import main_reply_kb
from brainboosty_hook_bot.src.locale import t
from brainboosty_hook_bot.src.services.subscription_service import user_has_paid_access
from brainboosty_hook_bot.src.utils.flow_chat import flow_remember
from brainboosty_hook_bot.src.utils.helpers import build_ref_link, parse_start_payload

router = Router(name="start")


def _quest_fsm_leaf(state_id: str | None) -> str | None:
    """Суффикс шага анкеты из строки FSM (например …:time → time)."""
    if not state_id or "QuestStates" not in state_id:
        return None
    return state_id.rsplit(":", maxsplit=1)[-1]


async def _send_skill_step_after_intro(message: Message, state: FSMContext, lang: str) -> None:
    """Интро + вопрос навыка (как после выбора языка в анкете)."""
    user = message.from_user
    if user is None:
        return
    await state.update_data(quest_lang=lang, skill_keys=[], skills_edit_only=False)
    await state.set_state(QuestStates.skill)
    name = user.first_name or ("friend" if lang == "en" else "друг")
    m1 = await message.answer(t(lang, "START_NEW_INTRO", name=name))
    m2 = await message.answer(
        t(lang, "QUESTION_SKILL"),
        reply_markup=questionnaire_skill_kb(lang, selected=()),
    )
    await flow_remember(state, m1.message_id, m2.message_id)


async def _resume_questionnaire_if_possible(
    message: Message,
    state: FSMContext,
    *,
    state_before: str | None,
    data_before: dict,
) -> bool:
    """Продолжить анкету после /start, если язык/шаг уже были (User в БД ещё не создан)."""
    if message.from_user is None:
        return False

    lang = data_before.get("quest_lang")
    if lang not in {"ru", "en"}:
        lang = None
    skill_keys = skill_keys_for_resume(data_before)
    age = data_before.get("age")
    if not isinstance(age, int):
        age = None

    leaf = _quest_fsm_leaf(state_before)

    if lang and skill_keys and age is not None and leaf == "time":
        await state.update_data(quest_lang=lang, skill_keys=skill_keys, age=age)
        await state.set_state(QuestStates.time)
        sent = await message.answer(t(lang, "QUESTION_TIME"), reply_markup=questionnaire_time_kb(lang))
        await flow_remember(state, sent.message_id)
        return True

    if lang and skill_keys and leaf == "age":
        await state.update_data(quest_lang=lang, skill_keys=skill_keys)
        await state.set_state(QuestStates.age)
        sent = await message.answer(t(lang, "QUESTION_AGE"))
        await flow_remember(state, sent.message_id)
        return True

    if lang and leaf in ("skill", "language", None):
        await _send_skill_step_after_intro(message, state, lang)
        return True

    if lang and leaf == "age" and skill_keys is None:
        await _send_skill_step_after_intro(message, state, lang)
        return True

    if lang and leaf == "time" and (skill_keys is None or age is None):
        if skill_keys is None:
            await _send_skill_step_after_intro(message, state, lang)
            return True
        await state.update_data(quest_lang=lang, skill_keys=skill_keys)
        await state.set_state(QuestStates.age)
        sent = await message.answer(t(lang, "QUESTION_AGE"))
        await flow_remember(state, sent.message_id)
        return True

    return False


async def _get_user(session: AsyncSession, tg_id: int) -> User | None:
    result = await session.execute(select(User).where(User.tg_id == tg_id))
    return result.scalar_one_or_none()


@router.message(CommandStart())
async def cmd_start(message: Message, state: FSMContext, session: AsyncSession, locale: str) -> None:
    if message.from_user is None:
        return

    parts = (message.text or "").split(maxsplit=1)
    payload = parts[1].strip() if len(parts) > 1 else None
    pending_ref = parse_start_payload(payload)

    data_before = await state.get_data()
    state_before = await state.get_state()

    user = await _get_user(session, message.from_user.id)
    cur_s = str(state_before) if state_before else ""
    in_cognitive_fsm = "CognitiveStates" in cur_s

    if user is not None and not user.goals:
        await state.clear()
        await state.update_data(pending_referrer_tg_id=pending_ref)
        await state.set_state(QuestStates.language)
        try:
            await message.delete()
        except Exception:
            pass
        lang = user.locale if user.locale in {"ru", "en"} else locale
        sent = await message.answer(t(lang, "LANG_PROMPT"), reply_markup=start_lang_pick_kb())
        await flow_remember(state, sent.message_id)
        return

    if user is not None and not user.cognitive_completed:
        await state.update_data(pending_referrer_tg_id=pending_ref)
        lang = user.locale if user.locale in {"ru", "en"} else locale
        if in_cognitive_fsm:
            await message.answer(t(lang, "START_UNFINISHED_TEST"), reply_markup=cognitive_resume_kb(lang))
            return
        await state.clear()
        await state.update_data(pending_referrer_tg_id=pending_ref)
        await message.answer(t(lang, "START_UNFINISHED_TEST"), reply_markup=cognitive_resume_kb(lang))
        return

    await state.clear()
    await state.update_data(pending_referrer_tg_id=pending_ref)

    if user:
        ref_link = build_ref_link(message.from_user.id)
        lang = user.locale if user.locale in {"ru", "en"} else locale
        await message.answer(
            t(lang, "START_ALREADY", name=user.first_name, ref_link=ref_link),
            reply_markup=main_reply_kb(
                lang,
                paid_access=user_has_paid_access(user),
                show_retest=user_has_paid_access(user),
            ),
        )
        return

    if await _resume_questionnaire_if_possible(
        message,
        state,
        state_before=state_before,
        data_before=data_before,
    ):
        return

    await state.set_state(QuestStates.language)
    try:
        await message.delete()
    except Exception:
        pass
    sent = await message.answer(t("ru", "LANG_PROMPT"), reply_markup=start_lang_pick_kb())
    await flow_remember(state, sent.message_id)
