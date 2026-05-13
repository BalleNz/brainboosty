"""Основная reply-клавиатура."""

from __future__ import annotations

from aiogram.types import KeyboardButton, ReplyKeyboardMarkup

from brainboosty_hook_bot.src.locale import t


def main_reply_kb(lang: str, *, show_retest: bool = True, resize_keyboard: bool = True) -> ReplyKeyboardMarkup:
    """Постоянное нижнее меню после регистрации."""
    rows: list[list[KeyboardButton]] = [
        [KeyboardButton(text=t(lang, "REPLY_BRAIN_MAP"))],
        [
            KeyboardButton(text=t(lang, "REPLY_GET_ACCESS")),
            KeyboardButton(text=t(lang, "REPLY_ABOUT")),
        ],
    ]
    if show_retest:
        rows.append([KeyboardButton(text=t(lang, "REPLY_RETAKE_TEST"))])
    return ReplyKeyboardMarkup(keyboard=rows, resize_keyboard=resize_keyboard)
