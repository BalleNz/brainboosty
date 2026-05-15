"""Тизер результата теста: частичный показ зон + мягкий оффер."""

from __future__ import annotations

from brainboosty_hook_bot.src.locale import t
from brainboosty_hook_bot.src.services.teaser_map_insights import INSIGHTS

# Контекст строки под зоной (стрелка «→»)
CTX: dict[str, dict[str, dict[str, str]]] = {
    "prefrontal_cortex": {
        "sex": {
            "ru": "Планирование секса и контроль возбуждения",
            "en": "Sex planning and arousal control",
        },
        "gen": {
            "ru": "Планирование дня и контроль импульсов",
            "en": "Daily planning and impulse control",
        },
    },
    "brain_lobes": {
        "sex": {
            "ru": "Яркость сексуальных фантазий и визуализация",
            "en": "Vivid sexual fantasies and visualization",
        },
        "gen": {
            "ru": "Визуализация и пространственные образы",
            "en": "Visualization and spatial imagery",
        },
    },
    "insular_cortex": {
        "sex": {
            "ru": "Чувствование тела во время секса",
            "en": "Body sensations during sex",
        },
        "gen": {
            "ru": "Интероцепция и сигналы тела",
            "en": "Interoception and body signals",
        },
    },
    "temporoparietal_junction": {
        "sex": {
            "ru": "Чтение желаний партнёра",
            "en": "Reading a partner’s desires",
        },
        "gen": {
            "ru": "Понимание намерений других",
            "en": "Understanding others’ intentions",
        },
    },
    "amygdala": {
        "sex": {
            "ru": "Эмоциональная реакция и возбуждение",
            "en": "Emotional reaction and arousal",
        },
        "gen": {
            "ru": "Стресс и эмоциональная регуляция",
            "en": "Stress and emotional regulation",
        },
    },
    "frontal_gyrus": {
        "sex": {
            "ru": "Проговаривание своих желаний",
            "en": "Putting desires into words",
        },
        "gen": {
            "ru": "Формулировка и выражение мыслей",
            "en": "Formulating and expressing thoughts",
        },
    },
}

TIPS: dict[str, dict[str, dict[str, str]]] = {
    "prefrontal_cortex": {
        "sex": {
            "ru": "Попробуйте 5-минутное планирование свидания или секса заранее",
            "en": "Try 5 minutes planning a date or sex in advance",
        },
        "gen": {
            "ru": "Попробуйте 5-минутное планирование на день утром",
            "en": "Try 5 minutes of morning day-planning",
        },
    },
    "brain_lobes": {
        "sex": {
            "ru": "5 минут ярко визуализируйте желаемую сексуальную сцену",
            "en": "5 minutes: vividly visualize a desired sexual scene",
        },
        "gen": {
            "ru": "5 минут визуализируйте цель или ситуацию в деталях",
            "en": "5 minutes: visualize a goal or situation in detail",
        },
    },
    "insular_cortex": {
        "sex": {
            "ru": "Практика body scan — почувствуйте тело во время возбуждения",
            "en": "Body scan — feel your body during arousal",
        },
        "gen": {
            "ru": "Практика body scan — 3 минуты почувствуйте сигналы тела",
            "en": "Body scan — 3 minutes noticing body signals",
        },
    },
    "temporoparietal_junction": {
        "sex": {
            "ru": "Спросите партнёра: «Что тебе сейчас больше всего нравится?»",
            "en": "Ask your partner: “What do you enjoy most right now?”",
        },
        "gen": {
            "ru": "Попробуйте угадать, что чувствует собеседник до того, как он скажет",
            "en": "Guess what your counterpart feels before they say it",
        },
    },
    "amygdala": {
        "sex": {
            "ru": "Дыхание 4-7-8 при сильном возбуждении или отказе",
            "en": "4-7-8 breathing during intense arousal or rejection",
        },
        "gen": {
            "ru": "Дыхание 4-7-8 при стрессе или сильных эмоциях",
            "en": "4-7-8 breathing during stress or strong emotions",
        },
    },
    "frontal_gyrus": {
        "sex": {
            "ru": "Опишите вслух одно своё сексуальное желание (даже для себя)",
            "en": "Say aloud one sexual desire (even just for yourself)",
        },
        "gen": {
            "ru": "Опишите вслух одну сложную мысль (даже если только для себя)",
            "en": "Say aloud one complex thought (even just for yourself)",
        },
    },
}

# Короткие подписи зон в блоке «Открытые зоны» (остальные — из BRAIN_RL_*)
OPEN_ZONE_TITLE: dict[str, dict[str, str]] = {
    "temporoparietal_junction": {
        "ru": "Височно-теменной узел",
        "en": "Temporoparietal junction",
    },
}


def _tier_band(score: float) -> str:
    if score >= 80:
        return "high"
    if score >= 55:
        return "med"
    return "low"


def _tier_emoji(score: float) -> str:
    if score >= 80:
        return "🟢"
    if score >= 55:
        return "🟡"
    return "🔴"


def _open_zone_title(lang: str, area_key: str) -> str:
    lg = "en" if lang == "en" else "ru"
    row = OPEN_ZONE_TITLE.get(area_key)
    if row:
        return row[lg]
    return t(lang, f"BRAIN_RL_{area_key}")


def _insight_text(lang: str, area_key: str, is_sexual: bool, score: float) -> str:
    mode = "sex" if is_sexual else "gen"
    band = _tier_band(score)
    lg = "en" if lang == "en" else "ru"
    return (
        INSIGHTS.get(area_key, {})
        .get(mode, {})
        .get(band, {})
        .get(lg, "")
    )


def _locked_zone_label(lang: str, area_key: str) -> str:
    k = f"TEASER_LOCKED_RL_{area_key}"
    label = t(lang, k)
    if label == k:
        return t(lang, f"BRAIN_RL_{area_key}")
    return label


def _ctx_line(lang: str, area_key: str, is_sexual: bool) -> str:
    lg = "en" if lang == "en" else "ru"
    mode = "sex" if is_sexual else "gen"
    block = CTX.get(area_key)
    if not block:
        return ""
    return block[mode][lg]


def _tip(lang: str, area_key: str, is_sexual: bool) -> str:
    lg = "en" if lang == "en" else "ru"
    mode = "sex" if is_sexual else "gen"
    block = TIPS.get(area_key)
    if not block:
        return ""
    return block[mode][lg]


def _teaser_closer_lines(lang: str, *, is_sexual: bool) -> list[str]:
    tracker_key = "TEASER_CLOSER_ITEM_TRACKER_SEX" if is_sexual else "TEASER_CLOSER_ITEM_TRACKER_GEN"
    channel_key = "TEASER_CLOSER_ITEM_CHANNEL_SEX" if is_sexual else "TEASER_CLOSER_ITEM_CHANNEL_GEN"
    return [
        t(lang, "TEASER_CLOSER_TAGLINE"),
        "",
        t(lang, "TEASER_CLOSER_GET_HEADER"),
        t(lang, "TEASER_CLOSER_ITEM_PLAN"),
        t(lang, tracker_key),
        t(lang, "TEASER_CLOSER_ITEM_EXERCISES"),
        t(lang, channel_key),
    ]


def generate_teaser_recommendations(
    lang: str,
    scores: dict[str, float],
    *,
    is_sexual: bool,
    price: int = 2490,
) -> str:
    """HTML-тизер: заголовок, открытые зоны (уровень + стрелка + курсив), закрытые зоны, оффер."""
    sorted_areas = sorted(scores.items(), key=lambda x: x[1])
    free_n = 4

    title_key = "TEASER_TITLE_SEXUAL_HTML" if is_sexual else "TEASER_TITLE_GENERAL_HTML"
    lines: list[str] = [
        t(lang, title_key),
        "",
        t(lang, "TEASER_OPEN_ZONES_HEADER"),
        "",
    ]
    weak_z: list[tuple[str, float]] = []

    for i, (area_key, score) in enumerate(sorted_areas):
        if score < 55:
            weak_z.append((area_key, score))
        if i < free_n:
            emoji = _tier_emoji(score)
            title = _open_zone_title(lang, area_key)
            ctx = _ctx_line(lang, area_key, is_sexual)
            insight = _insight_text(lang, area_key, is_sexual, score)
            lines.append(f"{emoji} <b>{title}</b> — {score:.1f}%")
            lines.append(f"   → {ctx}")
            if insight:
                lines.append(f"   <i>{insight}</i>")
            if i < free_n - 1:
                lines.append("")
        else:
            if i == free_n:
                lines.append("")
            elif i > free_n:
                lines.append("")
            lock_name = _locked_zone_label(lang, area_key)
            lines.append(f"<tg-spoiler><b>🔒 {lock_name} — ???%</b></tg-spoiler>")

    if weak_z:
        lines.append("")
        lines.append(t(lang, "TEASER_GROWTH_HEADER"))
        lines.append("")
        tips = weak_z[:2]
        for j, (area_key, _score) in enumerate(tips):
            tip = _tip(lang, area_key, is_sexual)
            lines.append(f"• {tip}")
            if j == 0 and len(tips) > 1:
                lines.append("")

    lines.append("")
    lines.extend(_teaser_closer_lines(lang, is_sexual=is_sexual))
    lines.append("")
    lines.append(t(lang, "TEASER_LIFETIME_SPOILER", price=price))
    lines.append("")
    lines.append(t(lang, "TEASER_REFUND_LINE"))
    lines.append("")
    lines.append(t(lang, "TEASER_CTA_ACCESS"))
    lines.append("")
    lines.append(t(lang, "TEST_RESULT_MODEL_DISCLAIMER"))
    return "\n".join(lines)
