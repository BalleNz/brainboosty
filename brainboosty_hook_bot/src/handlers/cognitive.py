"""Опросник из 7 вопросов (две стилистики) и сохранение нейропрофиля."""

from __future__ import annotations

import logging
from typing import cast

from aiogram import Bot, F, Router
from aiogram.fsm.context import FSMContext
from aiogram.fsm.state import State, StatesGroup
from aiogram.types import CallbackQuery, Message
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from brainboosty_hook_bot.src.config.config import settings
from brainboosty_hook_bot.src.database.models import BrainRegionSnapshot, User
from brainboosty_hook_bot.src.keyboards.inline import (
    COGNITIVE_BACK_CALLBACK,
    COGNITIVE_CB_PREFIX,
    RESUME_COGNITIVE_CB,
    TEST_VARIANT_PREFIX,
    channel_trial_cta_kb,
    cognitive_answer_kb,
    test_variant_choice_kb,
)
from brainboosty_hook_bot.src.keyboards.reply import main_reply_kb
from brainboosty_hook_bot.src.locale import t
from brainboosty_hook_bot.src.locale.cognitive_bodies import cognitive_question_body
from brainboosty_hook_bot.src.services import assistant_service
from brainboosty_hook_bot.src.services.assistant_service import TestVariant
from brainboosty_hook_bot.src.services.brain_result_delivery import deliver_brain_map_pdf, send_full_brain_result_pack
from brainboosty_hook_bot.src.services.subscription_service import open_discount_window, user_has_paid_access
from brainboosty_hook_bot.src.utils.flow_chat import delete_one, flow_remember, flow_wipe, try_delete_user_message
from brainboosty_hook_bot.src.utils.helpers import build_ref_link
from brainboosty_hook_bot.src.web.webapp_link import send_webapp_link_to_chat

logger = logging.getLogger(__name__)

router = Router(name="cognitive")


class CognitiveStates(StatesGroup):
    choose_style = State()
    testing = State()


async def prompt_test_style_choice(
    state: FSMContext,
    lang: str,
    *,
    message: Message | None = None,
    bot: Bot | None = None,
    chat_id: int | None = None,
) -> None:
    await state.set_state(CognitiveStates.choose_style)
    await state.update_data(cq=0, answers={}, test_variant=None)
    if message is not None:
        sent = await message.answer(
            t(lang, "COGNITIVE_STYLE_PROMPT"),
            reply_markup=test_variant_choice_kb(lang),
        )
    else:
        if bot is None or chat_id is None:
            raise ValueError("prompt_test_style_choice: need message or (bot, chat_id)")
        sent = await bot.send_message(
            chat_id,
            t(lang, "COGNITIVE_STYLE_PROMPT"),
            reply_markup=test_variant_choice_kb(lang),
        )
    await flow_remember(state, sent.message_id)


@router.callback_query(CognitiveStates.choose_style, F.data.startswith(TEST_VARIANT_PREFIX))
async def cognitive_variant_chosen(
    callback: CallbackQuery,
    state: FSMContext,
    session: AsyncSession,
    locale: str,
) -> None:
    if callback.message is None or callback.from_user is None:
        await callback.answer()
        return

    if callback.data is None:
        await callback.answer()
        return

    raw = callback.data.removeprefix(TEST_VARIANT_PREFIX)
    if raw not in {"sexual", "development"}:
        await callback.answer(t(locale, "ERR_COGNITIVE_VARIANT"), show_alert=True)
        return

    r = await session.execute(select(User).where(User.tg_id == callback.from_user.id))
    user = r.scalar_one_or_none()
    if user is None:
        await callback.answer(t(locale, "NOT_REGISTERED"), show_alert=True)
        return

    chat_id = callback.message.chat.id
    bot = callback.bot
    await flow_wipe(bot, chat_id, state, extra_ids=(callback.message.message_id,))

    lang = normalize_user_lang(user, locale)

    await state.update_data(test_variant=raw, cq=1, answers={})
    await state.set_state(CognitiveStates.testing)
    sent = await bot.send_message(
        chat_id,
        cognitive_question_body(lang, raw, 1),
        reply_markup=cognitive_answer_kb(lang, 1),
        parse_mode="HTML",
    )
    await flow_remember(state, sent.message_id)
    await callback.answer()


def normalize_user_lang(user: User | None, fallback: str) -> str:
    if user is not None and user.locale in {"ru", "en"}:
        return user.locale
    return fallback if fallback in {"ru", "en"} else "ru"


@router.callback_query(F.data == RESUME_COGNITIVE_CB)
async def cognitive_resume(
    callback: CallbackQuery,
    state: FSMContext,
    session: AsyncSession,
    locale: str,
) -> None:
    if callback.from_user is None or callback.message is None:
        await callback.answer()
        return

    r = await session.execute(select(User).where(User.tg_id == callback.from_user.id))
    user = r.scalar_one_or_none()
    if user is None:
        await callback.answer(t(locale, "NOT_REGISTERED"), show_alert=True)
        return
    if user.cognitive_completed:
        await callback.answer(t(locale, "ERR_UNKNOWN_OPTION"), show_alert=True)
        return

    lang = normalize_user_lang(user, locale)
    bot = callback.bot
    chat_id = callback.message.chat.id
    st = await state.get_state()
    nq = assistant_service.COGNITIVE_NUM_QUESTIONS

    if st is not None and str(st).endswith(":testing"):
        data = await state.get_data()
        cq = data.get("cq")
        variant = data.get("test_variant")
        if not isinstance(cq, int) or variant not in ("sexual", "development") or cq < 1 or cq > nq:
            await flow_wipe(bot, chat_id, state, extra_ids=(callback.message.message_id,))
            await prompt_test_style_choice(state, lang, message=callback.message)
            await callback.answer()
            return
        await flow_wipe(bot, chat_id, state, extra_ids=(callback.message.message_id,))
        sent = await bot.send_message(
            chat_id,
            cognitive_question_body(lang, variant, cq),
            reply_markup=cognitive_answer_kb(lang, cq),
            parse_mode="HTML",
        )
        await flow_remember(state, sent.message_id)
        await callback.answer()
        return

    await flow_wipe(bot, chat_id, state, extra_ids=(callback.message.message_id,))
    await prompt_test_style_choice(state, lang, message=callback.message)
    await callback.answer()


@router.callback_query(CognitiveStates.testing, F.data == COGNITIVE_BACK_CALLBACK)
async def cognitive_go_back(
    callback: CallbackQuery,
    state: FSMContext,
    session: AsyncSession,
    locale: str,
) -> None:
    if callback.from_user is None or callback.message is None:
        await callback.answer()
        return

    data = await state.get_data()
    cq = data.get("cq")
    variant = data.get("test_variant")
    answers_obj = data.get("answers") or {}

    if not isinstance(cq, int) or variant not in ("sexual", "development"):
        await callback.answer(t(locale, "ERR_START_OVER"), show_alert=True)
        await state.clear()
        return

    ur = await session.execute(select(User).where(User.tg_id == callback.from_user.id))
    user = ur.scalar_one_or_none()
    if user is None:
        await callback.answer(t(locale, "NOT_REGISTERED"), show_alert=True)
        return
    lang = normalize_user_lang(user, locale)

    answers: dict[int, str] = {}
    for k, v in answers_obj.items():
        try:
            ki = int(k) if isinstance(k, str) and k.isdigit() else int(k)
            if isinstance(v, str):
                answers[ki] = v
        except (TypeError, ValueError):
            continue

    bot = callback.bot
    chat_id = callback.message.chat.id
    question_mid = callback.message.message_id

    if cq == 1:
        await callback.answer()
        await delete_one(bot, chat_id, question_mid)
        await flow_wipe(bot, chat_id, state, extra_ids=(question_mid,))
        await prompt_test_style_choice(state, lang, bot=bot, chat_id=chat_id)
        return

    prev = cq - 1
    answers.pop(prev, None)
    await state.update_data(cq=prev, answers={str(i): answers[i] for i in sorted(answers)})
    await callback.answer()
    await delete_one(bot, chat_id, question_mid)
    await flow_wipe(bot, chat_id, state, extra_ids=(question_mid,))
    sent = await bot.send_message(
        chat_id,
        cognitive_question_body(lang, variant, prev),
        reply_markup=cognitive_answer_kb(lang, prev),
        parse_mode="HTML",
    )
    await flow_remember(state, sent.message_id)


@router.callback_query(
    CognitiveStates.testing,
    F.data.startswith(COGNITIVE_CB_PREFIX) & (F.data != COGNITIVE_BACK_CALLBACK),
)
async def cognitive_answer_step(
    callback: CallbackQuery,
    state: FSMContext,
    session: AsyncSession,
    locale: str,
) -> None:
    if callback.from_user is None or callback.message is None or callback.data is None:
        return

    nq = assistant_service.COGNITIVE_NUM_QUESTIONS

    payload = callback.data.removeprefix(COGNITIVE_CB_PREFIX)
    parts = payload.split(":", maxsplit=1)
    if len(parts) != 2:
        await callback.answer()
        return

    try:
        q_num = int(parts[0])
    except ValueError:
        await callback.answer()
        return

    letter = parts[1].strip().upper()
    if letter not in {"A", "B", "C", "D"}:
        await callback.answer()
        return

    data = await state.get_data()
    cq = data.get("cq")
    variant = data.get("test_variant")
    answers_obj = data.get("answers") or {}
    if not isinstance(cq, int) or cq != q_num or variant not in {"sexual", "development"}:
        await callback.answer(t(locale, "ERR_START_OVER"), show_alert=True)
        await state.clear()
        return

    ur = await session.execute(select(User).where(User.tg_id == callback.from_user.id))
    user = ur.scalar_one_or_none()
    if user is None:
        await callback.answer(t(locale, "NOT_REGISTERED"), show_alert=True)
        return
    lang = normalize_user_lang(user, locale)

    answers: dict[int, str] = {}
    for k, v in answers_obj.items():
        try:
            ki = int(k) if isinstance(k, str) and k.isdigit() else int(k)
            if isinstance(v, str):
                answers[ki] = v
        except (TypeError, ValueError):
            continue

    answers[q_num] = letter

    chat_id = callback.message.chat.id
    bot = callback.bot
    question_mid = callback.message.message_id

    await callback.answer()
    await delete_one(bot, chat_id, question_mid)
    await flow_wipe(bot, chat_id, state, extra_ids=(question_mid,))

    if q_num < nq:
        nxt = q_num + 1
        await state.update_data(cq=nxt, answers={str(i): answers[i] for i in sorted(answers)})
        sent = await bot.send_message(
            chat_id,
            cognitive_question_body(lang, variant, nxt),
            reply_markup=cognitive_answer_kb(lang, nxt),
            parse_mode="HTML",
        )
        await flow_remember(state, sent.message_id)
        return

    await state.update_data(cq=nq + 1, answers={str(i): answers[i] for i in sorted(answers)})
    await _finalize(bot, chat_id, callback.from_user.id, session, answers, variant, lang, user)
    await state.clear()


@router.message(CognitiveStates.choose_style)
async def cognitive_choose_style_stray(
    message: Message,
    state: FSMContext,
    session: AsyncSession,
    locale: str,
) -> None:
    if message.from_user is None:
        return
    await try_delete_user_message(message)
    ur = await session.execute(select(User).where(User.tg_id == message.from_user.id))
    user = ur.scalar_one_or_none()
    lang = normalize_user_lang(user, locale)
    bot = message.bot
    chat_id = message.chat.id
    await flow_wipe(bot, chat_id, state)
    await prompt_test_style_choice(state, lang, bot=bot, chat_id=chat_id)


@router.message(CognitiveStates.testing)
async def cognitive_testing_stray(
    message: Message,
    state: FSMContext,
    session: AsyncSession,
    locale: str,
) -> None:
    if message.from_user is None:
        return
    await try_delete_user_message(message)
    data = await state.get_data()
    cq = data.get("cq")
    variant = data.get("test_variant")
    nq = assistant_service.COGNITIVE_NUM_QUESTIONS

    ur = await session.execute(select(User).where(User.tg_id == message.from_user.id))
    user = ur.scalar_one_or_none()
    if user is None:
        await message.answer(t(locale, "NOT_REGISTERED"))
        return
    lang = normalize_user_lang(user, locale)

    bot = message.bot
    chat_id = message.chat.id

    if not isinstance(cq, int) or variant not in ("sexual", "development") or cq < 1 or cq > nq:
        await flow_wipe(bot, chat_id, state)
        await prompt_test_style_choice(state, lang, bot=bot, chat_id=chat_id)
        return

    await flow_wipe(bot, chat_id, state)
    text = f"{t(lang, 'COGNITIVE_STAY_ON_STEP')}\n\n{cognitive_question_body(lang, variant, cq)}"
    sent = await bot.send_message(
        chat_id,
        text,
        reply_markup=cognitive_answer_kb(lang, cq),
        parse_mode="HTML",
    )
    await flow_remember(state, sent.message_id)


async def _finalize(
    bot: Bot,
    chat_id: int,
    from_user_id: int,
    session: AsyncSession,
    answers: dict[int, str],
    variant: str,
    lang: str,
    user: User | None,
) -> None:
    nq = assistant_service.COGNITIVE_NUM_QUESTIONS
    if set(answers.keys()) != set(range(1, nq + 1)):
        logger.error("Incomplete cognitive answers: %s", answers)
        await bot.send_message(chat_id, t(lang, "COGNITIVE_DATA_ERROR"))
        return

    if user is None:
        await bot.send_message(chat_id, t(lang, "NOT_REGISTERED"))
        return

    computing = await bot.send_message(chat_id, t(lang, "COGNITIVE_COMPUTING"))

    v = variant if variant in ("sexual", "development") else "development"
    try:
        scores, source, detail = await assistant_service.compute_region_scores(answers, cast(TestVariant, v))
    except Exception as exc:  # noqa: BLE001
        logger.exception("Unexpected scoring failure: %s", exc)
        scores = assistant_service.fallback_region_scores_7(answers)
        source = "fallback"
        detail = None

    open_discount_window(user)
    await session.flush()

    prev_stmt = (
        select(BrainRegionSnapshot)
        .where(BrainRegionSnapshot.user_id == user.id)
        .order_by(BrainRegionSnapshot.created_at.desc())
        .limit(1)
    )
    prev_snapshot = (await session.execute(prev_stmt)).scalar_one_or_none()
    previous_scores = (
        {key: float(getattr(prev_snapshot, key)) for key in assistant_service.REGION_KEYS}
        if prev_snapshot is not None
        else None
    )

    session.add(
        BrainRegionSnapshot(
            user_id=user.id,
            test_variant=v,
            prefrontal_cortex=scores["prefrontal_cortex"],
            brain_lobes=scores["brain_lobes"],
            insular_cortex=scores["insular_cortex"],
            temporoparietal_junction=scores["temporoparietal_junction"],
            amygdala=scores["amygdala"],
            frontal_gyrus=scores["frontal_gyrus"],
            detail_json=detail,
        ),
    )
    user.cognitive_completed = True
    await session.flush()

    await delete_one(bot, chat_id, computing.message_id)

    paid = user_has_paid_access(user)
    if paid:
        try:
            await send_full_brain_result_pack(bot, chat_id, session, user, lang, reply_markup=None)
        except ValueError as exc:
            logger.warning("full brain pack after test: %s", exc)
    else:
        await deliver_brain_map_pdf(
            bot,
            chat_id,
            session,
            user,
            lang,
            scores=scores,
            test_variant=v,
            paid=False,
            reply_markup=None,
            detail_json=detail,
        )
        await bot.send_message(
            chat_id,
            t(lang, "CHANNEL_TRIAL_CTA"),
            reply_markup=channel_trial_cta_kb(lang, settings.premium_channel_url),
        )
        await bot.send_message(chat_id, t(lang, "TEST_RESULT_MODEL_DISCLAIMER"), parse_mode="HTML")

    if source == "fallback":
        await bot.send_message(chat_id, t(lang, "COGNITIVE_DONE_FALLBACK"))

    ref_link = build_ref_link(from_user_id)
    show_retest = paid
    if previous_scores is None:
        await bot.send_message(
            chat_id,
            t(lang, "WELCOME_AFTER_QUEST", ref_link=ref_link),
            reply_markup=main_reply_kb(lang, paid_access=paid, show_retest=show_retest),
        )
    else:
        await bot.send_message(
            chat_id,
            f"{t(lang, 'RETEST_SAVED')}\n\n{t(lang, 'REF_LINK_LABEL')}\n{ref_link}",
            reply_markup=main_reply_kb(lang, paid_access=paid, show_retest=show_retest),
        )
    await send_webapp_link_to_chat(bot, chat_id, lang)
