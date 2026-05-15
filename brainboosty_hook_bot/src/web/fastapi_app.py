"""HTTP API: Web App, Tribute, Telegram Bot webhook (без polling)."""

from __future__ import annotations

import logging
from contextlib import asynccontextmanager

from aiogram.types import Update
from fastapi import FastAPI, Request, Response

from brainboosty_hook_bot.src.bot_runtime import (
    BotRuntime,
    create_bot_runtime,
    install_telegram_webhook,
    remove_telegram_webhook,
    start_bot_runtime,
    stop_bot_runtime,
)
from brainboosty_hook_bot.src.config.config import settings
from brainboosty_hook_bot.src.web.tribute_app import process_tribute_webhook
from brainboosty_hook_bot.src.web.webapp_routes import mount_webapp_static, router as webapp_router

logger = logging.getLogger(__name__)

_runtime: BotRuntime | None = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    global _runtime
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s %(levelname)s [%(name)s] %(message)s",
    )

    if not settings.uses_telegram_webhook:
        raise RuntimeError(
            "FastAPI запущен в режиме polling — используйте сервис bot / python -m ...main. "
            "Для VPS: TELEGRAM_UPDATE_MODE=webhook в .env"
        )

    _runtime = create_bot_runtime()
    await start_bot_runtime(_runtime)
    try:
        await install_telegram_webhook(_runtime)
    except Exception:
        logger.exception(
            "Не удалось зарегистрировать webhook (нужен один запрос к api.telegram.org; "
            "при блокировке задайте TELEGRAM_PROXY_URL)"
        )
        raise

    logger.info("BrainBoosty API + Telegram webhook ready")
    yield

    if _runtime is not None:
        try:
            await remove_telegram_webhook(_runtime)
        except Exception:
            logger.warning("delete_webhook failed", exc_info=True)
        await stop_bot_runtime(_runtime)
        _runtime = None


app = FastAPI(title="BrainBoosty Hook API", lifespan=lifespan)
app.include_router(webapp_router)
mount_webapp_static(app)


@app.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok", "telegram_mode": "webhook"}


@app.post(settings.TELEGRAM_WEBHOOK_PATH)
async def telegram_webhook_route(request: Request) -> Response:
    """Входящие апдейты от Telegram (без long polling)."""
    if _runtime is None:
        return Response(status_code=503)

    secret = (settings.TELEGRAM_WEBHOOK_SECRET or "").strip()
    if secret:
        header = request.headers.get("X-Telegram-Bot-Api-Secret-Token", "")
        if header != secret:
            return Response(status_code=403)

    try:
        body = await request.json()
        update = Update.model_validate(body)
    except Exception:
        logger.warning("Invalid Telegram webhook payload", exc_info=True)
        return Response(status_code=400)

    await _runtime.dp.feed_update(_runtime.bot, update)
    return Response(status_code=200)


@app.post(settings.TRIBUTE_WEBHOOK_PATH)
async def tribute_webhook_route(request: Request) -> Response:
    raw = await request.body()
    sig = request.headers.get("trbt-signature") or request.headers.get("Trbt-Signature")
    bot = _runtime.bot if _runtime else None
    status, body = await process_tribute_webhook(raw, sig, bot)
    return Response(content=body, status_code=status, media_type="text/plain")
