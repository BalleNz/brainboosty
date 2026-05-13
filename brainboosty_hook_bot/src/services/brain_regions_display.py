"""
Отображение «карты мозга»: проценты по регионам и сравнение с прошлым тестом (стрелки).

Стрелки отражают величину изменения в процентных пунктах (не процент от процентов).
"""

from __future__ import annotations

from brainboosty_hook_bot.src.database.models import BrainRegionSnapshot
from brainboosty_hook_bot.src.locale import t
from brainboosty_hook_bot.src.services import assistant_service


def snapshot_to_scores(snapshot: BrainRegionSnapshot) -> dict[str, float]:
    return {key: float(getattr(snapshot, key)) for key in assistant_service.REGION_KEYS}


def _delta_arrows(delta: float) -> str:
    if delta >= 12:
        return " ↑↑↑"
    if delta >= 8:
        return " ↑↑"
    if delta >= 3:
        return " ↑"
    if delta <= -12:
        return " ↓↓↓"
    if delta <= -8:
        return " ↓↓"
    if delta <= -3:
        return " ↓"
    return ""


def format_brain_map_with_comparison(
    current: dict[str, float],
    previous: dict[str, float] | None,
    *,
    title: str | None = None,
    lang: str = "ru",
) -> str:
    """Текст блока карты мозга; подписи зон по locale."""
    header = title or t(lang, "BRAIN_MAP_TITLE_DEVELOPMENT_BLOCK")
    lines = [header, ""]
    for key in assistant_service.REGION_KEYS:
        label = t(lang, f"BRAIN_RL_{key}")
        val = current[key]
        suffix = ""
        if previous is not None:
            suffix = _delta_arrows(val - previous[key])
        lines.append(f"{label}: {val:.1f}%{suffix}")
    lines.append("")
    lines.append(
        t(lang, "BRAIN_MAP_COMPARISON_FOOTER") if previous is not None else t(lang, "BRAIN_MAP_FIRST_FOOTER"),
    )
    return "\n".join(lines)
