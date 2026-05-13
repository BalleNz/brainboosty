"""Основная reply-клавиатура."""

from __future__ import annotations

from aiogram.types import KeyboardButton, ReplyKeyboardMarkup

from brainboosty_hook_bot.src.locale import t


def main_reply_kb(
    lang: str,
    *,
    paid_access: bool = False,
    show_retest: bool = True,
    resize_keyboard: bool = True,
) -> ReplyKeyboardMarkup:
    """Нижнее меню: при активной подписке — ряд «Тесты» (ежедневные/недельные общие тесты)."""
    access_about = [
        KeyboardButton(text=t(lang, "REPLY_GET_ACCESS")),
        KeyboardButton(text=t(lang, "REPLY_ABOUT")),
    ]
    if paid_access:
        rows: list[list[KeyboardButton]] = [
            [KeyboardButton(text=t(lang, "REPLY_BRAIN_MAP"))],
            [KeyboardButton(text=t(lang, "REPLY_TESTS"))],
            access_about,
        ]
    else:
        rows = [
            [KeyboardButton(text=t(lang, "REPLY_BRAIN_MAP"))],
            access_about,
        ]
    if show_retest:
        rows.append([KeyboardButton(text=t(lang, "REPLY_RETAKE_TEST"))])
    return ReplyKeyboardMarkup(keyboard=rows, resize_keyboard=resize_keyboard)
