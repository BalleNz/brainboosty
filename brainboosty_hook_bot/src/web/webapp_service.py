"""Данные Web App: профиль, история, тест."""

from __future__ import annotations

import re
from datetime import datetime
from typing import Any, cast

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from brainboosty_hook_bot.src.config.config import settings
from brainboosty_hook_bot.src.database.models import BrainRegionSnapshot, User
from brainboosty_hook_bot.src.locale.cognitive_bodies import EN_DEV, EN_SEXUAL, NUM, RU_DEV, RU_SEXUAL
from brainboosty_hook_bot.src.services import assistant_service
from brainboosty_hook_bot.src.services.assistant_service import TestVariant
from brainboosty_hook_bot.src.services.brain_pdf_content import (
    inter_region_connectivity_lines,
    neuro_score,
    region_recommendation_bullets,
    submetrics_for_region,
)
from brainboosty_hook_bot.src.services.brain_region_keys import REGION_KEYS
from brainboosty_hook_bot.src.services.brain_regions_display import snapshot_to_scores
from brainboosty_hook_bot.src.services.subscription_service import discount_active, open_discount_window, user_has_paid_access


def webapp_public_url() -> str:
    url = (settings.WEBAPP_PUBLIC_URL or "").strip().rstrip("/")
    if url:
        return f"{url}/"
    return ""


def tribute_url_for_user(user: User) -> str:
    base = (settings.TRIBUTE_APP_URL or "").strip()
    disc = (settings.TRIBUTE_APP_URL_FOREVER_DISC or "").strip()
    if discount_active(user) and disc:
        return disc
    return base or "https://t.me/tribute/app?startapp=sUmL"


def _parse_legacy_question(block: str) -> dict[str, Any]:
    lines = block.strip().split("\n")
    head, question, opts_text = lines[0], lines[1], "\n".join(lines[2:])
    topic = head.split(". ", 1)[-1].strip() if ". " in head else head
    options: list[dict[str, str]] = []
    for raw in opts_text.strip().split("\n"):
        line = raw.strip()
        m = re.match(r"^([ABCD])\)\s*(.+)$", line)
        if m:
            options.append({"key": m.group(1), "label": m.group(2).strip()})
    return {"topic": topic, "text": question.strip(), "options": options}


def cognitive_questions_payload(lang: str, variant: str) -> dict[str, Any]:
    lg = "en" if lang == "en" else "ru"
    v = variant if variant in ("sexual", "development") else "development"
    blocks = (EN_SEXUAL if lg == "en" else RU_SEXUAL) if v == "sexual" else (EN_DEV if lg == "en" else RU_DEV)
    questions = []
    for i, block in enumerate(blocks[:NUM], start=1):
        parsed = _parse_legacy_question(block)
        questions.append({"id": i, **parsed})
    return {"variant": v, "numQuestions": NUM, "questions": questions}


def _region_blocks(
    lang: str,
    scores: dict[str, float],
    *,
    test_variant: str,
    paid: bool,
    detail_json: dict[str, Any] | None,
) -> dict[str, dict[str, Any]]:
    is_sexual = test_variant == "sexual"
    out: dict[str, dict[str, Any]] = {}
    for key in REGION_KEYS:
        main = float(scores.get(key, 0.0))
        bullets = region_recommendation_bullets(
            lang, key, is_sexual, main, paid=paid, detail_json=detail_json
        )
        subs = submetrics_for_region(lang, key, main, detail_json=detail_json)
        out[key] = {
            "main": main,
            "bullets": bullets,
            "submetrics": [{"label": lab, "value": val} for lab, val in subs],
        }
    return out


def profile_from_snapshot(
    user: User,
    snap: BrainRegionSnapshot | None,
    *,
    lang: str,
) -> dict[str, Any]:
    paid = user_has_paid_access(user)
    if snap is None:
        return {
            "lang": lang,
            "userDisplayName": user.first_name or "Guest",
            "paid": paid,
            "hasMap": False,
            "testVariant": "development",
            "tributeUrl": tribute_url_for_user(user),
            "neuroScore": 0.0,
            "scores": {k: 0.0 for k in REGION_KEYS},
            "connectivity": [],
            "regions": {},
            "snapshotId": None,
            "createdAt": None,
        }

    scores = snapshot_to_scores(snap)
    detail = snap.detail_json if isinstance(snap.detail_json, dict) else None
    return {
        "lang": lang,
        "userDisplayName": user.first_name or "Guest",
        "paid": paid,
        "hasMap": True,
        "testVariant": snap.test_variant,
        "tributeUrl": tribute_url_for_user(user),
        "neuroScore": neuro_score(scores),
        "scores": scores,
        "connectivity": inter_region_connectivity_lines(lang, detail),
        "regions": _region_blocks(lang, scores, test_variant=snap.test_variant, paid=paid, detail_json=detail),
        "snapshotId": snap.id,
        "createdAt": snap.created_at.isoformat() if snap.created_at else None,
    }


def _delta_label(delta: float, lang: str) -> str:
    if abs(delta) < 0.05:
        return "·"
    arrow = "↑" if delta > 0 else "↓"
    return f"{arrow}{abs(delta):.1f}%"


def history_payload(
    snapshots: list[BrainRegionSnapshot],
    *,
    lang: str,
) -> dict[str, Any]:
    items: list[dict[str, Any]] = []
    prev_scores: dict[str, float] | None = None
    for snap in snapshots:
        scores = snapshot_to_scores(snap)
        ns = neuro_score(scores)
        deltas: dict[str, str] = {}
        if prev_scores is not None:
            for k in REGION_KEYS:
                d = scores[k] - prev_scores[k]
                deltas[k] = _delta_label(d, lang)
        items.append(
            {
                "id": snap.id,
                "createdAt": snap.created_at.isoformat() if snap.created_at else None,
                "testVariant": snap.test_variant,
                "neuroScore": ns,
                "scores": scores,
                "deltas": deltas,
                "isFirst": prev_scores is None,
            }
        )
        prev_scores = scores

    return {"items": items}


async def get_user_by_tg_id(session: AsyncSession, tg_id: int) -> User | None:
    r = await session.execute(select(User).where(User.tg_id == tg_id))
    return r.scalar_one_or_none()


async def latest_snapshot(session: AsyncSession, user_id: int) -> BrainRegionSnapshot | None:
    r = await session.execute(
        select(BrainRegionSnapshot)
        .where(BrainRegionSnapshot.user_id == user_id)
        .order_by(BrainRegionSnapshot.created_at.desc())
        .limit(1)
    )
    return r.scalar_one_or_none()


async def list_snapshots(session: AsyncSession, user_id: int, *, limit: int = 30) -> list[BrainRegionSnapshot]:
    r = await session.execute(
        select(BrainRegionSnapshot)
        .where(BrainRegionSnapshot.user_id == user_id)
        .order_by(BrainRegionSnapshot.created_at.desc())
        .limit(limit)
    )
    return list(r.scalars().all())


async def submit_cognitive_test(
    session: AsyncSession,
    user: User,
    *,
    answers: dict[int, str],
    variant: str,
    lang: str,
) -> dict[str, Any]:
    nq = assistant_service.COGNITIVE_NUM_QUESTIONS
    if set(answers.keys()) != set(range(1, nq + 1)):
        raise ValueError("incomplete_answers")

    v = cast(TestVariant, variant if variant in ("sexual", "development") else "development")
    try:
        scores, _source, detail = await assistant_service.compute_region_scores(answers, v)
    except Exception:
        scores = assistant_service.fallback_region_scores_7(answers)
        detail = None

    open_discount_window(user)
    snap = BrainRegionSnapshot(
        user_id=user.id,
        test_variant=v,
        prefrontal_cortex=scores["prefrontal_cortex"],
        brain_lobes=scores["brain_lobes"],
        insular_cortex=scores["insular_cortex"],
        temporoparietal_junction=scores["temporoparietal_junction"],
        amygdala=scores["amygdala"],
        frontal_gyrus=scores["frontal_gyrus"],
        detail_json=detail,
    )
    session.add(snap)
    user.cognitive_completed = True
    await session.flush()
    await session.refresh(snap)

    return profile_from_snapshot(user, snap, lang=lang)
