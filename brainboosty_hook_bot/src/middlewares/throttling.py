"""
Middleware слой.

ThrottlingMiddleware — защита от спама (минимальный интервал между апдейтами пользователя).
DatabaseSessionMiddleware — одна SQLAlchemy-сессия на апдейт с коммитом после успешной обработки.
"""

from __future__ import annotations

import time
from typing import Any, Awaitable, Callable

from aiogram import BaseMiddleware
from aiogram.types import CallbackQuery, Message, TelegramObject

from brainboosty_hook_bot.src.config.config import settings
from brainboosty_hook_bot.src.locale import t
from brainboosty_hook_bot.src.database.session import async_session_maker


class ThrottlingMiddleware(BaseMiddleware):
    """Ограничивает частоту сообщений и колбэков по пользователю."""

    def __init__(self, *, rate_seconds: float | None = None) -> None:
        super().__init__()
        self.rate_seconds = rate_seconds or settings.THROTTLE_SECONDS
        self._last_ts: dict[int, float] = {}

    @staticmethod
    def _user_id(event: TelegramObject) -> int | None:
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
        uid = self._user_id(event)
        if uid is None:
            return await handler(event, data)

        now = time.monotonic()
        prev = self._last_ts.get(uid)
        if prev is not None and now - prev < self.rate_seconds:
            warn = t("ru", "THROTTLE_WARNING")
            if isinstance(event, Message):
                await event.answer(warn)
            elif isinstance(event, CallbackQuery):
                await event.answer(warn, show_alert=False)
            return None

        self._last_ts[uid] = now
        return await handler(event, data)


class DatabaseSessionMiddleware(BaseMiddleware):
    """Открывает AsyncSession на время обработки апдейта."""

    async def __call__(
        self,
        handler: Callable[[TelegramObject, dict[str, Any]], Awaitable[Any]],
        event: TelegramObject,
        data: dict[str, Any],
    ) -> Any:
        async with async_session_maker() as session:
            data["session"] = session
            try:
                result = await handler(event, data)
                await session.commit()
                return result
            except Exception:
                await session.rollback()
                raise
