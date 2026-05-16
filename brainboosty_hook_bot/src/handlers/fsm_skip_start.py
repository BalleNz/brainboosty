"""FSM не должен съедать /start (deep-link вход с сайта: /start site_<token>)."""

from __future__ import annotations

from aiogram.filters import BaseFilter
from aiogram.types import Message


class SkipIfStartCommand(BaseFilter):
    """Вернуть True только если сообщение — не команда /start (тогда обработает start.router)."""

    async def __call__(self, message: Message) -> bool:
        t = (message.text or "").strip()
        return not t.startswith("/start")
