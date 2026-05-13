"""Вебхук Tribute: проверка trbt-signature и выдача подписки (общая логика для aiohttp / FastAPI)."""

from __future__ import annotations

import json
import logging

from aiohttp import web
from aiogram import Bot

from brainboosty_hook_bot.src.config.config import settings
from brainboosty_hook_bot.src.database.session import async_session_maker
from brainboosty_hook_bot.src.locale import normalize_lang, t
from brainboosty_hook_bot.src.services import subscription_service
from brainboosty_hook_bot.src.services.tribute_webhook import parse_tribute_grant_kind, verify_tribute_signature

logger = logging.getLogger(__name__)


async def process_tribute_webhook(raw: bytes, signature: str | None, bot: Bot | None) -> tuple[int, str]:
    """
    Обработка тела вебхука Tribute.
    Возвращает (HTTP status, plain text body).
    """
    secret = settings.TRIBUTE_WEBHOOK_SECRET.strip()
    if not secret or not verify_tribute_signature(raw, secret, signature):
        logger.warning("Tribute webhook: bad signature or empty secret")
        return 403, "forbidden"

    try:
        data = json.loads(raw.decode("utf-8"))
    except (UnicodeDecodeError, json.JSONDecodeError):
        return 400, "bad json"

    if not isinstance(data, dict):
        return 400, "json object expected"

    tg_id, kind = parse_tribute_grant_kind(
        data,
        product_id_month=settings.TRIBUTE_PRODUCT_ID_MONTH,
        product_id_forever=settings.TRIBUTE_PRODUCT_ID_FOREVER,
    )
    if tg_id is None or kind is None:
        logger.info("Tribute webhook: skip grant (tg_id=%s kind=%s)", tg_id, kind)
        return 200, "ok"

    user_lang = "ru"
    async with async_session_maker() as session:
        user = await subscription_service.get_user_by_tg(session, tg_id)
        if user is None:
            logger.warning("Tribute: unknown tg_id=%s", tg_id)
            return 200, "ok"
        user_lang = normalize_lang(user.locale)
        if kind == "month":
            subscription_service.grant_monthly(user)
        else:
            subscription_service.grant_lifetime(user)
        await session.commit()

    if bot is not None:
        try:
            await bot.send_message(
                chat_id=tg_id,
                text=t(user_lang, "PAYMENT_TRIBUTE_SUCCESS"),
            )
        except Exception as exc:  # noqa: BLE001
            logger.warning("Notify user after Tribute payment failed: %s", exc)

    return 200, "ok"


async def tribute_webhook_handler(request: web.Request) -> web.Response:
    raw = await request.read()
    sig = request.headers.get("trbt-signature") or request.headers.get("Trbt-Signature")
    bot: Bot | None = request.app.get("bot")
    status, body = await process_tribute_webhook(raw, sig, bot)
    return web.Response(status=status, text=body)


async def start_tribute_server(bot: Bot) -> web.AppRunner | None:
    """Стартует встроенный aiohttp-сайт (legacy); в Docker вебхук обычно на FastAPI-сервисе `api`."""
    if settings.TRIBUTE_WEBHOOK_PORT <= 0:
        return None
    if not settings.TRIBUTE_WEBHOOK_SECRET.strip():
        logger.warning("TRIBUTE_WEBHOOK_PORT>0 но TRIBUTE_WEBHOOK_SECRET пуст — сервер не поднимаем")
        return None

    app = web.Application()
    app["bot"] = bot
    app.router.add_post(settings.TRIBUTE_WEBHOOK_PATH, tribute_webhook_handler)
    runner = web.AppRunner(app)
    await runner.setup()
    site = web.TCPSite(runner, settings.TRIBUTE_WEBHOOK_HOST, settings.TRIBUTE_WEBHOOK_PORT)
    await site.start()
    logger.info(
        "Tribute webhook listening http://%s:%s%s",
        settings.TRIBUTE_WEBHOOK_HOST,
        settings.TRIBUTE_WEBHOOK_PORT,
        settings.TRIBUTE_WEBHOOK_PATH,
    )
    return runner
