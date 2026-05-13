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
