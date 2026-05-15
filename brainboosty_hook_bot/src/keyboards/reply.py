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
    """Нижнее меню: «Тесты» для всех (без подписки в хабе только недельный общий тест).

    По одной кнопке в строке + resize — в клиенте кнопки одной ширины (на всю полосу).
    """
    access_row = [KeyboardButton(text=t(lang, "REPLY_GET_ACCESS"))]
    about_row = [KeyboardButton(text=t(lang, "REPLY_ABOUT"))]
    rows: list[list[KeyboardButton]] = [
        [KeyboardButton(text=t(lang, "REPLY_BRAIN_MAP"))],
        [KeyboardButton(text=t(lang, "REPLY_TESTS"))],
        access_row,
        about_row,
    ]
    if show_retest:
        rows.append([KeyboardButton(text=t(lang, "REPLY_RETAKE_TEST"))])
    return ReplyKeyboardMarkup(keyboard=rows, resize_keyboard=resize_keyboard)
