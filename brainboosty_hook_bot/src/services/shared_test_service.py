"""Общие ежедневные/недельные тесты: период, lazy-создание, разбор JSON."""

from __future__ import annotations

import logging
from datetime import date
from typing import Any, Literal

from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from brainboosty_hook_bot.src.config.config import settings
from brainboosty_hook_bot.src.database.models import (
    BrainRegionSnapshot,
    SharedTest,
    User,
    UserTestCompletion,
)
from brainboosty_hook_bot.src.services import assistant_service
from brainboosty_hook_bot.src.services.subscription_service import now_utc

logger = logging.getLogger(__name__)

Kind = Literal["daily", "weekly"]

_FALLBACK_DAILY: dict[str, Any] = {
    "questions": [
        {
            "id": 1,
            "text_ru": "Когда нужно сосредоточиться на рутине, что ближе?",
            "text_en": "When you need to focus on routine work, what fits best?",
            "options": [
                {"key": "A", "text_ru": "Составляю короткий план и тайм-боксы", "text_en": "I make a short plan and time-boxes"},
                {"key": "B", "text_ru": "Сразу начинаю и подстраиваюсь по ходу", "text_en": "I start immediately and adjust on the go"},
                {"key": "C", "text_ru": "Ищу внешний дедлайн или напоминание", "text_en": "I look for an external deadline or reminder"},
                {"key": "D", "text_ru": "Откладываю до «идеального настроя»", "text_en": "I wait until I feel «in the mood»"},
            ],
        },
        {
            "id": 2,
            "text_ru": "Новая неопределённость (сроки/люди неясны). Первая реакция?",
            "text_en": "New uncertainty (unclear timelines/people). Your first reaction?",
            "options": [
                {"key": "A", "text_ru": "Собираю факты и уточняю вопросы", "text_en": "I gather facts and ask clarifying questions"},
                {"key": "B", "text_ru": "Делаю хоть маленький шаг вперёд", "text_en": "I take even a small step forward"},
                {"key": "C", "text_ru": "Ищу поддержку или совета", "text_en": "I seek support or advice"},
                {"key": "D", "text_ru": "Замираю и откладываю", "text_en": "I freeze and postpone"},
            ],
        },
        {
            "id": 3,
            "text_ru": "Как вы замечаете усталость?",
            "text_en": "How do you notice tiredness?",
            "options": [
                {"key": "A", "text_ru": "По телу: тяжесть, дыхание, напряжение", "text_en": "Body signals: heaviness, breathing, tension"},
                {"key": "B", "text_ru": "По мыслям: всё кажется сложнее", "text_en": "Thoughts: everything feels harder"},
                {"key": "C", "text_ru": "По настроению и раздражению", "text_en": "Mood and irritability"},
                {"key": "D", "text_ru": "Замечаю поздно, уже «выжат»", "text_en": "I notice late, already drained"},
            ],
        },
        {
            "id": 4,
            "text_ru": "Спорная обратная связь. Что ближе?",
            "text_en": "Controversial feedback. What fits best?",
            "options": [
                {"key": "A", "text_ru": "Разбираю по фактам, без ярлыков", "text_en": "I parse facts without labels"},
                {"key": "B", "text_ru": "Спрашиваю примеры и контекст", "text_en": "I ask for examples and context"},
                {"key": "C", "text_ru": "Сначала эмоционально, потом остываю", "text_en": "Emotional first, then I cool down"},
                {"key": "D", "text_ru": "Закрываюсь и избегаю темы", "text_en": "I shut down and avoid the topic"},
            ],
        },
    ],
}

_FALLBACK_WEEKLY: dict[str, Any] = {
    "questions": [
        {
            "id": i,
            "text_ru": f"Недельный вопрос {i} (заглушка): как вы подходите к новой задаче?",
            "text_en": f"Weekly question {i} (fallback): how do you approach a new task?",
            "options": [
                {"key": "A", "text_ru": "План и шаги", "text_en": "Plan and steps"},
                {"key": "B", "text_ru": "Быстрый старт", "text_en": "Quick start"},
                {"key": "C", "text_ru": "Совет других", "text_en": "Ask others"},
                {"key": "D", "text_ru": "Жду вдохновения", "text_en": "Wait for inspiration"},
            ],
        }
        for i in range(1, 11)
    ],
}
def period_key_daily(d: date | None = None) -> str:
    day = d or now_utc().date()
    return day.isoformat()


def period_key_weekly(d: date | None = None) -> str:
    day = d or now_utc().date()
    y, w, _ = day.isocalendar()
    return f"{y}-W{w:02d}"


def period_key_for_kind(kind: Kind) -> str:
    return period_key_daily() if kind == "daily" else period_key_weekly()


def snapshot_test_variant(kind: Kind, period_key: str) -> str:
    prefix = "daily" if kind == "daily" else "weekly"
    return f"{prefix}_{period_key}"


async def _build_new_content_json(kind: Kind) -> dict[str, Any]:
    if not settings.OPENAI_API_KEY.strip():
        raw = _FALLBACK_DAILY if kind == "daily" else _FALLBACK_WEEKLY
        assistant_service.validate_shared_questions(kind, raw)
        return raw
    try:
        data = await assistant_service.generate_shared_test_json(kind)
        return {"questions": data["questions"]}
    except Exception as exc:  # noqa: BLE001
        logger.warning("Shared test generation failed, using fallback: %s", exc)
        raw = _FALLBACK_DAILY if kind == "daily" else _FALLBACK_WEEKLY
        assistant_service.validate_shared_questions(kind, raw)
        return raw


async def get_or_create_shared_test(session: AsyncSession, kind: Kind) -> SharedTest:
    pk = period_key_for_kind(kind)
    stmt = select(SharedTest).where(SharedTest.kind == kind, SharedTest.period_key == pk)
    existing = (await session.execute(stmt)).scalar_one_or_none()
    if existing is not None:
        return existing

    content = await _build_new_content_json(kind)
    row = SharedTest(kind=kind, period_key=pk, content_json=content)
    try:
        async with session.begin_nested():
            session.add(row)
            await session.flush()
    except IntegrityError:
        await session.expunge(row)
        again = (await session.execute(stmt)).scalar_one_or_none()
        if again is None:
            raise
        return again
    return row


def questions_list(content_json: dict[str, Any]) -> list[dict[str, Any]]:
    qs = content_json.get("questions")
    if not isinstance(qs, list):
        return []
    return qs


def question_body_html(q: dict[str, Any], lang: str) -> str:
    lg = lang if lang in {"ru", "en"} else "ru"
    tk = "text_ru" if lg == "ru" else "text_en"
    opt_k = "text_ru" if lg == "ru" else "text_en"
    lines = [f"<b>Вопрос {q['id']}</b>" if lg == "ru" else f"<b>Question {q['id']}</b>", "", q[tk], ""]
    for o in q["options"]:
        lines.append(f"{o['key']}) {o[opt_k]}")
    return "\n".join(lines)


async def user_completed_shared(session: AsyncSession, user_id: int, shared_test_id: int) -> bool:
    stmt = select(UserTestCompletion.id).where(
        UserTestCompletion.user_id == user_id,
        UserTestCompletion.shared_test_id == shared_test_id,
    )
    return (await session.execute(stmt)).scalar_one_or_none() is not None


async def fetch_history_pdf_context(
    session: AsyncSession,
    user_id: int,
    *,
    limit: int = 25,
) -> list[dict[str, Any]]:
    """Строки для PDF: дата, тип периода, баллы и дельты к предыдущему снимку."""
    stmt = (
        select(UserTestCompletion)
        .options(
            selectinload(UserTestCompletion.snapshot),
            selectinload(UserTestCompletion.shared_test),
        )
        .where(UserTestCompletion.user_id == user_id)
        .order_by(UserTestCompletion.completed_at.desc())
        .limit(limit)
    )
    completions = list((await session.execute(stmt)).scalars().all())
    out: list[dict[str, Any]] = []
    for c in completions:
        st = c.shared_test
        snap = c.snapshot
        scores = {k: float(getattr(snap, k)) for k in assistant_service.REGION_KEYS}
        prev_stmt = (
            select(BrainRegionSnapshot)
            .where(
                BrainRegionSnapshot.user_id == user_id,
                BrainRegionSnapshot.created_at < snap.created_at,
            )
            .order_by(BrainRegionSnapshot.created_at.desc())
            .limit(1)
        )
        prev = (await session.execute(prev_stmt)).scalar_one_or_none()
        prev_scores = {k: float(getattr(prev, k)) for k in assistant_service.REGION_KEYS} if prev else None
        deltas = (
            {k: round(scores[k] - prev_scores[k], 1) for k in assistant_service.REGION_KEYS}
            if prev_scores
            else None
        )
        out.append(
            {
                "completed_at": c.completed_at,
                "kind": st.kind,
                "period_key": st.period_key,
                "scores": scores,
                "deltas": deltas,
            },
        )
    return out
