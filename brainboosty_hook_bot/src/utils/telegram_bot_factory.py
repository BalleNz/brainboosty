"""Bot с опциональным прокси / увеличенным таймаутом до api.telegram.org."""

from __future__ import annotations

import logging

from aiogram import Bot
from aiogram.client.session.aiohttp import AiohttpSession

from brainboosty_hook_bot.src.config.config import settings

logger = logging.getLogger(__name__)


def create_telegram_bot(token: str) -> Bot:
    proxy = (settings.TELEGRAM_PROXY_URL or "").strip() or None
    timeout = float(settings.TELEGRAM_REQUEST_TIMEOUT)

    session = AiohttpSession(proxy=proxy, timeout=timeout)
    if proxy:
        # Не логируем логин/пароль прокси
        safe = proxy.split("@")[-1] if "@" in proxy else proxy
        logger.info("Telegram API: proxy=%s timeout=%ss", safe, timeout)
    else:
        logger.info("Telegram API: direct, timeout=%ss", timeout)

    return Bot(token=token, session=session)
