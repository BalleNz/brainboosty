"""Тексты и числа для cyber-PDF карты мозга (без HTML)."""

from __future__ import annotations

import hashlib
import re
from typing import Any

from brainboosty_hook_bot.src.locale import t
from brainboosty_hook_bot.src.services.brain_region_keys import REGION_KEYS
from brainboosty_hook_bot.src.services.brain_map import recommendation_for_goals
from brainboosty_hook_bot.src.services.teaser_map_insights import INSIGHTS
from brainboosty_hook_bot.src.services.teaser_service import TIPS


def inter_region_connectivity_lines(lang: str, detail_json: dict[str, Any] | None) -> list[str]:
    """Краткие связи между зонами из ответа модели (для обложки PDF)."""
    if not isinstance(detail_json, dict):
        return []
    links = detail_json.get("inter_region_links")
    if not isinstance(links, list):
        return []
    lg = lang == "en"
    out: list[str] = []
    for item in links[:6]:
        if not isinstance(item, dict):
            continue
        pair = item.get("pair_en" if lg else "pair_ru") or item.get("pair_ru")
        note = item.get("note_en" if lg else "note_ru") or item.get("note_ru")
        if not isinstance(note, str) or not note.strip():
            continue
        p = str(pair).strip() if isinstance(pair, str) else ""
        prefix = f"{p}: " if p else ""
        out.append(prefix + note.strip())
    return out


def neuro_score(scores: dict[str, float]) -> float:
    keys = REGION_KEYS
    vals = [float(scores.get(k, 0.0)) for k in keys]
    return round(sum(vals) / max(len(vals), 1), 1)


def _tier_band(score: float) -> str:
    if score >= 80:
        return "high"
    if score >= 55:
        return "med"
    return "low"


def _insight_paragraphs(lang: str, area_key: str, is_sexual: bool, score: float) -> list[str]:
    mode = "sex" if is_sexual else "gen"
    band = _tier_band(score)
    lg = "en" if lang == "en" else "ru"
    raw = (
        INSIGHTS.get(area_key, {})
        .get(mode, {})
        .get(band, {})
        .get(lg, "")
    )
    if not raw:
        return []
    parts = re.split(r"(?<=[.!?])\s+", raw.strip())
    return [p.strip() for p in parts if p.strip()]


def region_recommendation_bullets(
    lang: str,
    area_key: str,
    is_sexual: bool,
    score: float,
    *,
    paid: bool,
    detail_json: dict[str, Any] | None = None,
) -> list[str]:
    """3–4 пункта для блока «Рекомендации» на странице отдела (с продающим открытием)."""
    regions = (detail_json or {}).get("regions") if isinstance(detail_json, dict) else None
    if isinstance(regions, dict):
        block = regions.get(area_key)
        if isinstance(block, dict):
            key = "bullets_en" if lang == "en" else "bullets_ru"
            alt = "bullets_ru" if lang == "en" else "bullets_en"
            raw = block.get(key) or block.get(alt)
            if isinstance(raw, list):
                bs = [str(x).strip() for x in raw if isinstance(x, str) and str(x).strip()]
                if len(bs) >= 3:
                    if not paid and len(bs) > 2:
                        return [bs[0], bs[1], t(lang, "PDF_BRAIN_REC_UNLOCK")][:4]
                    return bs[:4]
    lg = "en" if lang == "en" else "ru"
    mode = "sex" if is_sexual else "gen"
    tip = (TIPS.get(area_key, {}) or {}).get(mode, {}).get(lg, "")
    paras = _insight_paragraphs(lang, area_key, is_sexual, score)
    hook = t(lang, f"PDF_BRAIN_SELL_{area_key}")
    out: list[str] = []
    if hook and not hook.startswith("PDF_BRAIN_SELL_"):
        out.append(hook if hook.endswith((".", "!", "?")) else f"{hook}.")
    for p in paras[:2]:
        out.append(p if p.endswith((".", "!", "?")) else f"{p}.")
    if tip and len(out) < 4:
        out.append(tip)
    while len(out) < 3:
        out.append(t(lang, "PDF_BRAIN_REC_FALLBACK"))
    if not paid and len(out) > 2:
        # Эмоциональный крючок + один инсайт + оффер
        out = [out[0], out[1], t(lang, "PDF_BRAIN_REC_UNLOCK")]
    return out[:4]


def submetrics_for_region(
    lang: str, area_key: str, main: float, *, detail_json: dict[str, Any] | None = None
) -> list[tuple[str, float]]:
    """4 «метрики» для малых баров: из detail_json модели или детерминированный fallback."""
    regions = (detail_json or {}).get("regions") if isinstance(detail_json, dict) else None
    if isinstance(regions, dict):
        block = regions.get(area_key)
        if isinstance(block, dict):
            sm = block.get("submetrics")
            if isinstance(sm, list) and len(sm) >= 4:
                out: list[tuple[str, float]] = []
                label_k = "label_en" if lang == "en" else "label_ru"
                alt_k = "label_ru" if lang == "en" else "label_en"
                for item in sm[:4]:
                    if not isinstance(item, dict):
                        continue
                    lab = str(item.get(label_k) or item.get(alt_k) or "").strip()
                    if not lab:
                        continue
                    try:
                        val = float(item.get("value", main))
                    except (TypeError, ValueError):
                        val = main
                    val = max(5.0, min(100.0, val))
                    out.append((lab, round(val, 1)))
                if len(out) == 4:
                    return out
    h = int(hashlib.md5(area_key.encode(), usedforsecurity=False).hexdigest()[:6], 16)
    deltas = [(h >> i) % 13 - 6 for i in (0, 7, 14, 21)]
    keys = ("PDF_BRAIN_M1", "PDF_BRAIN_M2", "PDF_BRAIN_M3", "PDF_BRAIN_M4")
    out: list[tuple[str, float]] = []
    for i, lk in enumerate(keys):
        v = max(5.0, min(100.0, main + deltas[i % len(deltas)] * (0.4 + 0.1 * i)))
        out.append((t(lang, lk), round(v, 1)))
    return out


def global_recommendation_blurb(lang: str, goal_keys: list[str], *, paid: bool) -> str:
    if paid:
        return recommendation_for_goals(lang, goal_keys)
    return t(lang, "BRAIN_MAP_PHOTO_TEASER_HINT")
