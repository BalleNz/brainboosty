"""
Точка входа BrainBoosty Hook Bot.

Запуск из корня проекта:

    cd brainboosty_hook_bot
    python -m src.main
"""

from __future__ import annotations

import asyncio
import logging
from datetime import date, timezone

from aiogram import Bot, Dispatcher
from aiogram.fsm.storage.memory import MemoryStorage
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.cron import CronTrigger
from sqlalchemy import select

from brainboosty_hook_bot.src.config.config import settings
from brainboosty_hook_bot.src.locale import normalize_lang, t
from brainboosty_hook_bot.src.database.models import User
from brainboosty_hook_bot.src.database.session import async_session_maker, init_db
from brainboosty_hook_bot.src.handlers import register_handlers
from brainboosty_hook_bot.src.middlewares.throttling import DatabaseSessionMiddleware, ThrottlingMiddleware
from brainboosty_hook_bot.src.middlewares.user_locale import UserLocaleMiddleware
from brainboosty_hook_bot.src.web.tribute_app import start_tribute_server

logger = logging.getLogger(__name__)

_tribute_runner = None


async def send_daily_hooks(bot: Bot) -> None:
    """Ежедневная рассылка «хуков» всем зарегистрированным пользователям."""
    idx = date.today().toordinal() % 4
    hook_key = f"DAILY_HOOK_{idx}"

    async with async_session_maker() as session:
        result = await session.execute(select(User.tg_id, User.locale))
        rows = list(result.all())

    for tg_id, loc in rows:
        lang = normalize_lang(loc)
        body = t(lang, hook_key)
        text = t(lang, "DAILY_HOOK_TEMPLATE", body=body)
        try:
            await bot.send_message(chat_id=tg_id, text=text)
            await asyncio.sleep(0.035)
        except Exception as exc:  # noqa: BLE001
            logger.warning("Daily hook failed for %s: %s", tg_id, exc)


async def main() -> None:
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s %(levelname)s [%(name)s] %(message)s",
    )

    bot = Bot(settings.BOT_TOKEN)
    dp = Dispatcher(storage=MemoryStorage())

    # Сначала антиспам (ранний выход), затем сессия БД вокруг хендлера.
    dp.update.middleware(ThrottlingMiddleware())
    dp.update.middleware(DatabaseSessionMiddleware())
    dp.update.middleware(UserLocaleMiddleware())

    register_handlers(dp)

    scheduler = AsyncIOScheduler(timezone=timezone.utc)
    scheduler.add_job(
        send_daily_hooks,
        CronTrigger(hour=settings.DAILY_HOOK_HOUR, minute=settings.DAILY_HOOK_MINUTE),
        kwargs={"bot": bot},
        id="daily_hooks",
        replace_existing=True,
        max_instances=1,
        coalesce=True,
    )

    async def on_startup() -> None:
        global _tribute_runner
        logger.info("Starting BrainBoosty Hook Bot")
        await init_db()
        scheduler.start()
        _tribute_runner = await start_tribute_server(bot)

    async def on_shutdown() -> None:
        global _tribute_runner
        scheduler.shutdown(wait=False)
        if _tribute_runner is not None:
            await _tribute_runner.cleanup()
            _tribute_runner = None

    dp.startup.register(on_startup)
    dp.shutdown.register(on_shutdown)

    await dp.start_polling(bot, allowed_updates=dp.resolve_used_update_types())


if __name__ == "__main__":
    asyncio.run(main())
