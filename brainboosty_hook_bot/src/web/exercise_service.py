"""Загрузка упражнений для веб-аппа."""

from __future__ import annotations

from typing import Any

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from brainboosty_hook_bot.src.database.models import Exercise, User
from brainboosty_hook_bot.src.locale import normalize_lang
from brainboosty_hook_bot.src.services.brain_region_keys import REGION_KEYS
from brainboosty_hook_bot.src.services.subscription_service import user_has_paid_access

_VALID = frozenset(REGION_KEYS)


def _pick_lang(user_lang: str, ru: str, en: str | None) -> str:
    lg = normalize_lang(user_lang)
    if lg == "en" and en and en.strip():
        return en.strip()
    return (ru or "").strip()


def exercise_to_api(ex: Exercise, lang: str) -> dict[str, Any]:
    """Локализованный JSON для клиента."""
    lg = normalize_lang(lang)
    raw_regions = ex.regions_json or []
    regions = [r for r in raw_regions if isinstance(r, str) and r in _VALID]
    pr = ex.primary_region if ex.primary_region in _VALID else None
    if pr is None and regions:
        pr = regions[0]
    elif pr and pr not in regions:
        regions = [*regions, pr] if pr in _VALID else regions

    research: list[dict[str, str]] = []
    for item in ex.research_links_json or []:
        if not isinstance(item, dict):
            continue
        url = str(item.get("url") or "").strip()
        if not url:
            continue
        en_lab = str(item.get("label_en") or "").strip()
        label = _pick_lang(lg, str(item.get("label_ru") or url), en_lab or None)
        research.append({"url": url, "label": label})

    return {
        "id": ex.id,
        "emoji": ex.emoji or "",
        "title": _pick_lang(lg, ex.title_ru, ex.title_en),
        "shortDescription": _pick_lang(lg, ex.short_description_ru, ex.short_description_en),
        "regions": regions,
        "primaryRegion": pr or ex.primary_region,
        "difficulty": max(0, min(100, int(ex.difficulty))),
        "effectiveness": max(1, min(5, int(ex.effectiveness))),
        "instruction": _pick_lang(lg, ex.instruction_ru, ex.instruction_en),
        "instructionImageUrl": ex.instruction_image_url,
        "forWho": _pick_lang(lg, ex.for_who_ru, ex.for_who_en),
        "firstResultDays": int(ex.first_result_days),
        "researchLinks": research,
        "amplify": _pick_lang(lg, ex.amplify_ru, ex.amplify_en),
        "expectedResults": _pick_lang(lg, ex.expected_results_ru, ex.expected_results_en),
    }


async def get_exercise_by_id(session: AsyncSession, exercise_id: int) -> Exercise | None:
    row = await session.execute(select(Exercise).where(Exercise.id == exercise_id))
    return row.scalar_one_or_none()


async def fetch_exercise_for_user(
    session: AsyncSession,
    user: User,
    exercise_id: int,
    lang: str,
) -> dict[str, Any]:
    if not user_has_paid_access(user):
        raise PermissionError("premium_required")
    ex = await get_exercise_by_id(session, exercise_id)
    if ex is None or not ex.is_published:
        raise LookupError("not_found")
    return exercise_to_api(ex, lang)
