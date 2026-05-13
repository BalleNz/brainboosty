"""Утилиты для фильтров aiogram (оба языка)."""

from __future__ import annotations

from brainboosty_hook_bot.src.locale.catalog import TRANSLATIONS


def all_lang(key: str) -> frozenset[str]:
    """Значения ключа для ru и en (для F.text.in_(...))."""
    ru = TRANSLATIONS["ru"].get(key)
    en = TRANSLATIONS["en"].get(key, ru)
    if ru is None:
        return frozenset()
    if en is None or en == ru:
        return frozenset({ru})
    return frozenset({ru, en})
