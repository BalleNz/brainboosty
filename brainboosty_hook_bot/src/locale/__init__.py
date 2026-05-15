"""Локализация (ru / en)."""

from __future__ import annotations

from brainboosty_hook_bot.src.locale.catalog import TRANSLATIONS

LANG_RU = "ru"
LANG_EN = "en"


def normalize_lang(code: str | None) -> str:
    if not code:
        return LANG_RU
    c = code.lower().strip()
    if c.startswith("en"):
        return LANG_EN
    return LANG_RU


def t(lang: str, key: str, **kwargs: object) -> str:
    """Строка по ключу; EN падает на RU, если ключа нет."""
    lg = normalize_lang(lang)
    ru_bucket = TRANSLATIONS.get(LANG_RU, {})
    template = ru_bucket.get(key, key)
    if lg != LANG_RU:
        template = TRANSLATIONS.get(lg, {}).get(key, template)
    if kwargs:
        return str(template).format(**kwargs)
    return str(template)


def question_skill_message(lang: str, *, selected_count: int, max_skills: int = 1) -> str:
    """Текст шага выбора навыков: онбординг — 1, /skills — до 2."""
    cap = max(1, min(2, max_skills))
    lead_key = "QUESTION_SKILL_LEAD_CMD" if cap >= 2 else "QUESTION_SKILL_LEAD"
    lead = t(lang, lead_key)
    if cap == 1 and selected_count == 0:
        return lead
    return f"{lead}\n\n{t(lang, 'QUESTION_SKILL_COUNT', n=selected_count, max=cap)}"
