"""Подмешивает locale пользователя в data для хендлеров."""

from __future__ import annotations

from typing import Any, Awaitable, Callable

from aiogram import BaseMiddleware
from aiogram.types import CallbackQuery, Message, TelegramObject
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from brainboosty_hook_bot.src.database.models import User
from brainboosty_hook_bot.src.locale import normalize_lang


class UserLocaleMiddleware(BaseMiddleware):
    """После DatabaseSessionMiddleware: data['locale'] = ru|en."""

    @staticmethod
    def _tg_id(event: TelegramObject) -> int | None:
        if isinstance(event, Message) and event.from_user:
            return event.from_user.id
        if isinstance(event, CallbackQuery) and event.from_user:
            return event.from_user.id
        return None

    async def __call__(
        self,
        handler: Callable[[TelegramObject, dict[str, Any]], Awaitable[Any]],
        event: TelegramObject,
        data: dict[str, Any],
    ) -> Any:
        session = data.get("session")
        uid = self._tg_id(event)
        # До регистрации интерфейс по умолчанию — русский; после — locale из БД.
        lang = "ru"
        if isinstance(session, AsyncSession) and uid is not None:
            res = await session.execute(select(User.locale).where(User.tg_id == uid))
            row = res.scalar_one_or_none()
            if row:
                lang = normalize_lang(row)
        data["locale"] = lang
        return await handler(event, data)
