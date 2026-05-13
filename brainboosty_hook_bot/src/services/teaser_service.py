"""Тизер результата теста: частичный показ зон + мягкий оффер."""

from __future__ import annotations

from brainboosty_hook_bot.src.locale import t

# Контекст строки под зоной
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
            "ru": "Чувствование тела и ощущений во время секса",
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
            "ru": "5 минут визуализируйте желаемую сексуальную сцену в ярких деталях",
            "en": "5 minutes: visualize a desired sexual scene in rich detail",
        },
        "gen": {
            "ru": "5 минут визуализируйте цель или ситуацию в деталях",
            "en": "5 minutes: visualize a goal or situation in detail",
        },
    },
    "insular_cortex": {
        "sex": {
            "ru": "Практика body scan — сосредоточьтесь на ощущениях тела во время возбуждения",
            "en": "Body scan — focus on sensations in the body during arousal",
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


def _status(lang: str, score: float) -> str:
    if score >= 80:
        return t(lang, "STATUS_HIGH")
    if score >= 55:
        return t(lang, "STATUS_MED")
    return t(lang, "STATUS_LOW")


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


def generate_teaser_recommendations(
    lang: str,
    scores: dict[str, float],
    *,
    is_sexual: bool,
    price: int = 2490,
) -> str:
    """HTML-тизер: до 4 зон подробно, остальные — LOCKED_LINE; 2 слабые зоны с советами."""
    sorted_areas = sorted(scores.items(), key=lambda x: x[1])
    free_n = 4

    detailed: list[str] = [t(lang, "TEASER_HEADER"), ""]
    weak_z: list[tuple[str, float]] = []

    for i, (area_key, score) in enumerate(sorted_areas):
        name = t(lang, f"BRAIN_RL_{area_key}")
        if score < 55:
            weak_z.append((area_key, score))
        if i < free_n:
            st = _status(lang, score)
            ctx = _ctx_line(lang, area_key, is_sexual)
            detailed.append(f"<b>{name}</b> — {score:.1f}%  {st}")
            detailed.append(f"   ↳ {ctx}")
        else:
            detailed.append(t(lang, "LOCKED_LINE", name=name))

    if weak_z:
        detailed.append("")
        detailed.append(t(lang, "TEASER_GROWTH"))
        for area_key, score in weak_z[:2]:
            name = t(lang, f"BRAIN_RL_{area_key}")
            tip = _tip(lang, area_key, is_sexual)
            detailed.append(f"🔴 <b>{name}</b> ({score:.1f}%)")
            detailed.append(f"   → {tip}")

    detailed.append(t(lang, "TEASER_PREMIUM_ZONES"))
    detailed.append(t(lang, "TEASER_SELL", price=price))
    return "\n".join(detailed)
