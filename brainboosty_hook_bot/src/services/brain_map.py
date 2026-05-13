"""
Сервис «карты развития мозга».

Простой детерминированный алгоритм по анкете: базовый уровень + поправки
по возрасту, целям и времени. Эвристика, не медицинская диагностика.
"""

from __future__ import annotations

from dataclasses import dataclass

from brainboosty_hook_bot.src.locale import t


@dataclass(frozen=True)
class BrainDomainScores:
    """Проценты «зрелости/ресурса» по когнитивным доменам (0–100)."""

    attention: int
    memory: int
    thinking_speed: int
    focus: int
    creativity: int


def _clamp_pct(value: float) -> int:
    return max(5, min(99, int(round(value))))


def _stable_jitter(seed: int, salt: int) -> float:
    x = (seed * 92837111 + salt * 689287499) & 0xFFFFFFFF
    return (x % 10000) / 10000.0


# Цель анкеты → домены, куда добавляем бонус (суммарно ~12 п.п. на цель)
_GOAL_DOMAINS: dict[str, tuple[str, ...]] = {
    "attention": ("attention",),
    "speed": ("thinking_speed",),
    "focus": ("focus",),
    "creativity": ("creativity",),
    "sexual_diversity": ("creativity", "memory"),
    "self_control": ("focus", "thinking_speed"),
    "sociability": ("attention", "creativity"),
    "speech": ("focus", "creativity"),
    "reduce_anxiety": ("attention", "focus"),
    "all": ("attention", "memory", "thinking_speed", "focus", "creativity"),
}


def recommendation_for_goals(lang: str, goal_keys: list[str]) -> str:
    if not goal_keys:
        return t(lang, "GOAL_REC_default")
    if "all" in goal_keys:
        return t(lang, "GOAL_REC_default")
    first = str(goal_keys[0])
    key = f"GOAL_REC_{first}"
    line = t(lang, key)
    if line == key:
        return t(lang, "GOAL_REC_default")
    return line


def compute_brain_map(
    *,
    tg_id: int,
    age: int,
    goals: list[str],
    daily_time: str,
) -> BrainDomainScores:
    """goals — ключи анкеты; daily_time: «1-5», «5-15», «15+»."""
    goal_set = {str(g) for g in goals}
    if "all" in goal_set:
        goal_set.update(_GOAL_DOMAINS["all"])

    age_factor = 1.0
    if age < 18:
        age_factor = 1.05
    elif age > 55:
        age_factor = 0.92
    elif age > 40:
        age_factor = 0.97

    time_bonus = {"1-5": -4.0, "5-15": 2.0, "15+": 6.0}.get(daily_time, 0.0)

    def base(domain: str) -> float:
        b = 58.0 + _stable_jitter(tg_id, hash(domain) % 9973) * 22.0
        b += time_bonus
        b *= age_factor
        if domain == "memory" and age > 50:
            b -= 5
        if domain == "thinking_speed" and age < 25:
            b += 4
        return b

    scores: dict[str, float] = {
        "attention": base("attention"),
        "memory": base("memory"),
        "thinking_speed": base("thinking_speed"),
        "focus": base("focus"),
        "creativity": base("creativity"),
    }

    for g in goal_set:
        domains = _GOAL_DOMAINS.get(g)
        if not domains:
            continue
        step = 12.0 / len(domains)
        for dk in domains:
            scores[dk] += step

    specific = goal_set - {"all"}
    if len(specific) == 1:
        only = next(iter(specific))
        mapped = _GOAL_DOMAINS.get(only)
        if mapped and len(mapped) == 1:
            key = mapped[0]
            for k in scores:
                if k != key:
                    scores[k] -= 3.0

    return BrainDomainScores(
        attention=_clamp_pct(scores["attention"]),
        memory=_clamp_pct(scores["memory"]),
        thinking_speed=_clamp_pct(scores["thinking_speed"]),
        focus=_clamp_pct(scores["focus"]),
        creativity=_clamp_pct(scores["creativity"]),
    )


def format_brain_map_message(scores: BrainDomainScores, *, lang: str, goal_keys: list[str]) -> str:
    lines: list[str] = [t(lang, "BRAIN_MAP_TITLE")]

    def line(domain_key: str, value: int, *, is_goal: bool) -> str:
        label = t(lang, f"DOMAIN_{domain_key}")
        mark = ""
        if value >= 75:
            mark = " ✅"
        elif value <= 45:
            mark = " ❌"
        if is_goal:
            mark += t(lang, "GOAL_FOCUS_SUFFIX")
        return f"• {label}: {value}%{mark}"

    goal_set = set(goal_keys)
    mapping: list[tuple[str, int]] = [
        ("attention", scores.attention),
        ("memory", scores.memory),
        ("thinking_speed", scores.thinking_speed),
        ("focus", scores.focus),
        ("creativity", scores.creativity),
    ]
    for goal_key, val in mapping:
        is_goal = goal_key in goal_set or "all" in goal_set
        lines.append(line(goal_key, val, is_goal=is_goal))

    lines.append("")
    lines.append(recommendation_for_goals(lang, goal_keys))
    return "\n".join(lines)
