"""Сборка Bot + Dispatcher + планировщик (webhook на FastAPI или polling в main)."""

from __future__ import annotations

import asyncio
import logging
from dataclasses import dataclass
from datetime import date, timedelta, timezone

from aiogram import Bot, Dispatcher
from aiogram.fsm.storage.memory import MemoryStorage
from aiogram.fsm.storage.redis import RedisStorage
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.cron import CronTrigger
from sqlalchemy import select

from brainboosty_hook_bot.src.config.config import settings
from brainboosty_hook_bot.src.database.models import User
from brainboosty_hook_bot.src.database.session import async_session_maker, init_db
from brainboosty_hook_bot.src.handlers import register_handlers
from brainboosty_hook_bot.src.locale import normalize_lang, t
from brainboosty_hook_bot.src.middlewares.throttling import DatabaseSessionMiddleware, ThrottlingMiddleware
from brainboosty_hook_bot.src.middlewares.user_locale import UserLocaleMiddleware
from brainboosty_hook_bot.src.utils.telegram_bot_factory import create_telegram_bot
from brainboosty_hook_bot.src.web.tribute_app import start_tribute_server

logger = logging.getLogger(__name__)


@dataclass
class BotRuntime:
    bot: Bot
    dp: Dispatcher
    scheduler: AsyncIOScheduler
    tribute_runner: object | None = None


def build_fsm_storage() -> MemoryStorage | RedisStorage:
    url = (settings.REDIS_URL or "").strip()
    if not url:
        return MemoryStorage()
    kwargs: dict = {}
    if settings.REDIS_FSM_STATE_TTL_SECONDS > 0:
        kwargs["state_ttl"] = timedelta(seconds=settings.REDIS_FSM_STATE_TTL_SECONDS)
    if settings.REDIS_FSM_DATA_TTL_SECONDS > 0:
        kwargs["data_ttl"] = timedelta(seconds=settings.REDIS_FSM_DATA_TTL_SECONDS)
    return RedisStorage.from_url(url, **kwargs)


async def send_daily_hooks(bot: Bot) -> None:
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


def create_bot_runtime() -> BotRuntime:
    if not (settings.BOT_TOKEN or "").strip():
        raise RuntimeError("BOT_TOKEN is not set")

    bot = create_telegram_bot(settings.BOT_TOKEN)
    dp = Dispatcher(storage=build_fsm_storage())
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
    return BotRuntime(bot=bot, dp=dp, scheduler=scheduler)


async def start_bot_runtime(runtime: BotRuntime) -> None:
    if (settings.REDIS_URL or "").strip():
        logger.info("FSM storage: Redis")
    else:
        logger.info("FSM storage: in-memory")
    await init_db()
    runtime.scheduler.start()
    runtime.tribute_runner = await start_tribute_server(runtime.bot)


async def stop_bot_runtime(runtime: BotRuntime) -> None:
    runtime.scheduler.shutdown(wait=False)
    if runtime.tribute_runner is not None:
        await runtime.tribute_runner.cleanup()
        runtime.tribute_runner = None
    await runtime.bot.session.close()


async def read_webhook_diagnostics(bot: Bot) -> dict[str, str | int]:
    """Снимок getWebhookInfo для /health (диагностика: вебхук не установлен / секрет / локальный запуск)."""
    try:
        info = await bot.get_webhook_info()
        return {
            "url": (info.url or "").strip(),
            "pending_updates": int(info.pending_update_count or 0),
            "last_error": (info.last_error_message or "").strip(),
        }
    except Exception as exc:  # noqa: BLE001
        logger.warning("getWebhookInfo failed: %s", exc)
        return {"url": "", "pending_updates": -1, "last_error": str(exc)}


async def install_telegram_webhook(runtime: BotRuntime) -> None:
    url = settings.telegram_webhook_url
    if not url.startswith("https://"):
        raise RuntimeError(
            f"Telegram webhook URL must be HTTPS, got: {url!r}. "
            "Set WEBAPP_PUBLIC_URL=https://your-domain"
        )
    secret = (settings.TELEGRAM_WEBHOOK_SECRET or "").strip() or None
    allowed = runtime.dp.resolve_used_update_types()
    await runtime.bot.set_webhook(
        url=url,
        secret_token=secret,
        allowed_updates=allowed,
        drop_pending_updates=True,
    )
    logger.info("Telegram webhook registered: %s", url)
    try:
        snap = await read_webhook_diagnostics(runtime.bot)
        logger.info(
            "Telegram getWebhookInfo: url=%r pending=%s last_error=%r",
            snap["url"],
            snap["pending_updates"],
            snap["last_error"] or "-",
        )
        if not snap["url"]:
            logger.warning(
                "У Telegram пустой webhook url — бот не получит /start и вход с сайта не заработает. "
                "Нужен публичный HTTPS (VPS/ngrok/cloudflared) и успешный setWebhook."
            )
    except Exception:
        logger.exception("post-setWebhook getWebhookInfo")


async def remove_telegram_webhook(runtime: BotRuntime) -> None:
    await runtime.bot.delete_webhook(drop_pending_updates=False)
    logger.info("Telegram webhook removed")
