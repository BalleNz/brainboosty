"""Общие ежедневные/недельные тесты (подписка) + PDF истории."""

from __future__ import annotations

import logging
from typing import cast

from aiogram import Bot, F, Router
from aiogram.fsm.context import FSMContext
from aiogram.fsm.state import State, StatesGroup
from aiogram.types import BufferedInputFile, CallbackQuery, Message
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from brainboosty_hook_bot.src.database.models import BrainRegionSnapshot, SharedTest, User, UserTestCompletion
from brainboosty_hook_bot.src.handlers.cognitive import normalize_user_lang
from brainboosty_hook_bot.src.keyboards.inline import (
    STEST_ANS_PREFIX,
    STEST_HUB_PREFIX,
    scheduled_test_answer_kb,
    tests_hub_inline_kb,
)
from brainboosty_hook_bot.src.keyboards.reply import main_reply_kb
from brainboosty_hook_bot.src.locale import t
from brainboosty_hook_bot.src.locale.filters import all_lang
from brainboosty_hook_bot.src.services import assistant_service
from brainboosty_hook_bot.src.services.pdf_report import build_shared_test_history_pdf
from brainboosty_hook_bot.src.services.shared_test_service import (
    Kind,
    fetch_history_pdf_context,
    get_or_create_shared_test,
    question_body_html,
    questions_list,
    snapshot_test_variant,
    test_pack_intro_html,
    user_completed_shared,
)
from brainboosty_hook_bot.src.services.subscription_service import user_has_paid_access
from brainboosty_hook_bot.src.utils.flow_chat import delete_one, flow_remember, flow_wipe, try_delete_user_message

logger = logging.getLogger(__name__)

router = Router(name="scheduled_tests")


class ScheduledTestStates(StatesGroup):
    running = State()


def _parse_scheduled_answer_cb(data: str) -> tuple[int, int, str] | None:
    if not data.startswith(STEST_ANS_PREFIX):
        return None
    rest = data.removeprefix(STEST_ANS_PREFIX)
    parts = rest.split(":")
    if len(parts) != 3:
        return None
    try:
        sid = int(parts[0])
        qn = int(parts[1])
    except ValueError:
        return None
    letter = parts[2].strip().upper()
    if letter not in {"A", "B", "C", "D"}:
        return None
    return sid, qn, letter


@router.message(F.text.in_(all_lang("REPLY_TESTS")))
async def tests_reply_entry(message: Message, session: AsyncSession, locale: str) -> None:
    if message.from_user is None:
        return
    user = (await session.execute(select(User).where(User.tg_id == message.from_user.id))).scalar_one_or_none()
    if user is None:
        await message.answer(t(locale, "NOT_REGISTERED"))
        return
    lang = normalize_user_lang(user, locale)
    paid = user_has_paid_access(user)
    hub_text = t(lang, "TESTS_HUB_TEXT") if paid else t(lang, "TESTS_HUB_TEXT_FREE")
    await message.answer(hub_text, reply_markup=tests_hub_inline_kb(lang, paid_access=paid))


@router.callback_query(F.data.startswith(STEST_HUB_PREFIX))
async def tests_hub_callback(
    callback: CallbackQuery,
    state: FSMContext,
    session: AsyncSession,
    locale: str,
) -> None:
    if callback.from_user is None or callback.message is None or callback.data is None:
        await callback.answer()
        return

    user = (await session.execute(select(User).where(User.tg_id == callback.from_user.id))).scalar_one_or_none()
    if user is None:
        await callback.answer(t(locale, "NOT_REGISTERED"), show_alert=True)
        return
    lang = normalize_user_lang(user, locale)
    paid = user_has_paid_access(user)

    suffix = callback.data.removeprefix(STEST_HUB_PREFIX)
    if suffix == "day" and not paid:
        await callback.answer(t(lang, "TESTS_DAILY_PREMIUM"), show_alert=True)
        return

    if suffix == "pdf" and not paid:
        await callback.answer(t(lang, "TESTS_PDF_PREMIUM"), show_alert=True)
        return

    if suffix == "pdf":
        await callback.answer()
        await callback.message.answer(t(lang, "PDF_GENERATING"))
        rows = await fetch_history_pdf_context(session, user.id, limit=30)
        pdf_bytes = build_shared_test_history_pdf(lang=lang, rows=rows)
        await callback.message.answer_document(
            BufferedInputFile(pdf_bytes, filename="brainboosty-test-history.pdf"),
            caption=t(lang, "PDF_HISTORY_CAPTION"),
        )
        return

    if suffix not in ("day", "week"):
        await callback.answer()
        return

    kind: Kind = "daily" if suffix == "day" else "weekly"
    st = await get_or_create_shared_test(session, kind)
    if await user_completed_shared(session, user.id, st.id):
        await callback.answer(t(lang, "TESTS_ALREADY_DONE"), show_alert=True)
        return

    qs = questions_list(st.content_json)
    if not qs:
        await callback.answer(t(lang, "TESTS_ERR"), show_alert=True)
        return

    await callback.answer()
    bot = callback.bot
    chat_id = callback.message.chat.id
    await flow_wipe(bot, chat_id, state, extra_ids=(callback.message.message_id,))

    gen = await bot.send_message(chat_id, t(lang, "TESTS_GENERATING"))
    await delete_one(bot, chat_id, gen.message_id)

    await state.set_state(ScheduledTestStates.running)
    await state.update_data(
        st_sid=st.id,
        st_kind=kind,
        st_cq=1,
        st_answers={},
        st_nq=len(qs),
        st_lang=lang,
    )
    intro = test_pack_intro_html(st.content_json, lang)
    qbody = question_body_html(qs[0], lang)
    first_text = f"{intro}\n\n{qbody}" if intro else qbody
    sent = await bot.send_message(
        chat_id,
        first_text,
        reply_markup=scheduled_test_answer_kb(lang, st.id, 1),
        parse_mode="HTML",
    )
    await flow_remember(state, sent.message_id)


async def _finalize_scheduled_test(
    bot: Bot,
    chat_id: int,
    session: AsyncSession,
    user: User,
    lang: str,
    shared_test_id: int,
    kind: Kind,
    answers: dict[int, str],
) -> None:
    st = (await session.execute(select(SharedTest).where(SharedTest.id == shared_test_id))).scalar_one_or_none()
    if st is None:
        await bot.send_message(chat_id, t(lang, "TESTS_ERR"))
        return
    qs = questions_list(st.content_json)
    n = len(qs)
    if set(answers.keys()) != set(range(1, n + 1)):
        await bot.send_message(chat_id, t(lang, "TESTS_ERR"))
        return

    computing = await bot.send_message(chat_id, t(lang, "TESTS_COMPUTING"))
    meta_block = st.content_json.get("meta") if isinstance(st.content_json, dict) else None
    try:
        raw_scores, source, score_detail = await assistant_service.compute_region_scores_dynamic(
            qs,
            answers,
            lang=lang,
            test_meta=meta_block if isinstance(meta_block, dict) else None,
        )
    except Exception as exc:  # noqa: BLE001
        logger.exception("scheduled test scoring: %s", exc)
        raw_scores = assistant_service.fallback_region_scores_n(answers, n)
        source = "fallback"
        score_detail = None

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

    scores = assistant_service.merge_scheduled_into_profile(previous_scores, raw_scores, kind=kind)

    detail_out: dict | None = None
    if isinstance(score_detail, dict) and score_detail:
        detail_out = {"shared_score": score_detail}
    if isinstance(meta_block, dict):
        detail_out = {**(detail_out or {}), "shared_test_meta": meta_block}

    tv = snapshot_test_variant(kind, st.period_key)
    if len(tv) > 32:
        tv = tv[:32]

    snap = BrainRegionSnapshot(
        user_id=user.id,
        test_variant=tv,
        prefrontal_cortex=scores["prefrontal_cortex"],
        brain_lobes=scores["brain_lobes"],
        insular_cortex=scores["insular_cortex"],
        temporoparietal_junction=scores["temporoparietal_junction"],
        amygdala=scores["amygdala"],
        frontal_gyrus=scores["frontal_gyrus"],
        detail_json=detail_out,
    )
    session.add(snap)
    await session.flush()

    session.add(
        UserTestCompletion(
            user_id=user.id,
            shared_test_id=st.id,
            answers_json={str(k): answers[k] for k in sorted(answers)},
            snapshot_id=snap.id,
            score_source=source,
        ),
    )
    await session.flush()

    await delete_one(bot, chat_id, computing.message_id)

    lines: list[str] = [t(lang, "TESTS_DONE"), ""]
    for key in assistant_service.REGION_KEYS:
        name = t(lang, f"BRAIN_RL_{key}")
        v = scores[key]
        if previous_scores is not None:
            d = v - previous_scores[key]
            lines.append(f"{name}: {v:.1f}% ({d:+.1f})")
        else:
            lines.append(f"{name}: {v:.1f}%")
    lines.append("")
    lines.append(t(lang, "TEST_RESULT_MODEL_DISCLAIMER"))

    await bot.send_message(
        chat_id,
        "\n".join(lines),
        reply_markup=main_reply_kb(lang, paid_access=user_has_paid_access(user), show_retest=True),
        parse_mode="HTML",
    )


async def _scheduled_test_go_back(
    callback: CallbackQuery,
    state: FSMContext,
    session: AsyncSession,
    locale: str,
    *,
    sid_back: int,
) -> None:
    if callback.message is None or callback.from_user is None:
        await callback.answer()
        return

    data = await state.get_data()
    if int(data.get("st_sid") or 0) != sid_back:
        await callback.answer(t(locale, "ERR_START_OVER"), show_alert=True)
        await state.clear()
        return

    cq = data.get("st_cq")
    st_kind = data.get("st_kind")
    answers_obj = data.get("st_answers") or {}
    if not isinstance(cq, int) or st_kind not in ("daily", "weekly"):
        await callback.answer(t(locale, "ERR_START_OVER"), show_alert=True)
        await state.clear()
        return

    user = (await session.execute(select(User).where(User.tg_id == callback.from_user.id))).scalar_one_or_none()
    if user is None:
        await callback.answer(t(locale, "NOT_REGISTERED"), show_alert=True)
        return
    lang = str(data.get("st_lang") or normalize_user_lang(user, locale))

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
        await state.clear()
        paid = user_has_paid_access(user)
        hub_text = t(lang, "TESTS_HUB_TEXT") if paid else t(lang, "TESTS_HUB_TEXT_FREE")
        await bot.send_message(chat_id, hub_text, reply_markup=tests_hub_inline_kb(lang, paid_access=paid))
        return

    prev = cq - 1
    answers.pop(prev, None)
    await state.update_data(
        st_cq=prev,
        st_answers={str(i): answers[i] for i in sorted(answers)},
    )
    await callback.answer()
    await delete_one(bot, chat_id, question_mid)
    await flow_wipe(bot, chat_id, state, extra_ids=(question_mid,))

    st_row = (await session.execute(select(SharedTest).where(SharedTest.id == sid_back))).scalar_one_or_none()
    if st_row is None:
        await state.clear()
        await bot.send_message(chat_id, t(lang, "TESTS_ERR"))
        return
    qs = questions_list(st_row.content_json)
    if prev < 1 or prev > len(qs):
        await state.clear()
        await bot.send_message(chat_id, t(lang, "TESTS_ERR"))
        return
    sent = await bot.send_message(
        chat_id,
        question_body_html(qs[prev - 1], lang),
        reply_markup=scheduled_test_answer_kb(lang, sid_back, prev),
        parse_mode="HTML",
    )
    await flow_remember(state, sent.message_id)


@router.callback_query(ScheduledTestStates.running, F.data.startswith(STEST_ANS_PREFIX))
async def scheduled_test_answer_step(
    callback: CallbackQuery,
    state: FSMContext,
    session: AsyncSession,
    locale: str,
) -> None:
    if callback.from_user is None or callback.message is None or callback.data is None:
        await callback.answer()
        return

    if callback.data.startswith(STEST_ANS_PREFIX) and callback.data.endswith(":back"):
        rest = callback.data.removeprefix(STEST_ANS_PREFIX)
        parts = rest.split(":")
        if len(parts) == 2 and parts[1] == "back" and parts[0].isdigit():
            await _scheduled_test_go_back(callback, state, session, locale, sid_back=int(parts[0]))
            return

    parsed = _parse_scheduled_answer_cb(callback.data)
    if parsed is None:
        await callback.answer()
        return
    sid, q_num, letter = parsed

    data = await state.get_data()
    if int(data.get("st_sid") or 0) != sid:
        await callback.answer(t(locale, "ERR_START_OVER"), show_alert=True)
        await state.clear()
        return

    cq = data.get("st_cq")
    nq = data.get("st_nq")
    st_kind = data.get("st_kind")
    answers_obj = data.get("st_answers") or {}
    if not isinstance(cq, int) or not isinstance(nq, int) or cq != q_num or st_kind not in ("daily", "weekly"):
        await callback.answer(t(locale, "ERR_START_OVER"), show_alert=True)
        await state.clear()
        return

    user = (await session.execute(select(User).where(User.tg_id == callback.from_user.id))).scalar_one_or_none()
    if user is None:
        await callback.answer(t(locale, "NOT_REGISTERED"), show_alert=True)
        return
    lang = str(data.get("st_lang") or normalize_user_lang(user, locale))

    answers: dict[int, str] = {}
    for k, v in answers_obj.items():
        try:
            ki = int(k) if isinstance(k, str) and k.isdigit() else int(k)
            if isinstance(v, str):
                answers[ki] = v
        except (TypeError, ValueError):
            continue
    answers[q_num] = letter

    bot = callback.bot
    chat_id = callback.message.chat.id
    question_mid = callback.message.message_id

    await callback.answer()
    await delete_one(bot, chat_id, question_mid)
    await flow_wipe(bot, chat_id, state, extra_ids=(question_mid,))

    if q_num < nq:
        nxt = q_num + 1
        await state.update_data(
            st_cq=nxt,
            st_answers={str(i): answers[i] for i in sorted(answers)},
        )
        st_row = (await session.execute(select(SharedTest).where(SharedTest.id == sid))).scalar_one_or_none()
        if st_row is None:
            await state.clear()
            await bot.send_message(chat_id, t(lang, "TESTS_ERR"))
            return
        qs2 = questions_list(st_row.content_json)
        sent = await bot.send_message(
            chat_id,
            question_body_html(qs2[nxt - 1], lang),
            reply_markup=scheduled_test_answer_kb(lang, sid, nxt),
            parse_mode="HTML",
        )
        await flow_remember(state, sent.message_id)
        return

    await state.update_data(st_answers={str(i): answers[i] for i in sorted(answers)})
    await _finalize_scheduled_test(
        bot,
        chat_id,
        session,
        user,
        lang,
        sid,
        cast(Kind, st_kind),
        answers,
    )
    await state.clear()


@router.message(ScheduledTestStates.running)
async def scheduled_test_stray(message: Message, state: FSMContext, session: AsyncSession, locale: str) -> None:
    if message.from_user is None:
        return
    await try_delete_user_message(message)
    user = (await session.execute(select(User).where(User.tg_id == message.from_user.id))).scalar_one_or_none()
    lang = normalize_user_lang(user, locale)
    await message.answer(t(lang, "COGNITIVE_STAY_ON_STEP"))
