"""HTTP API: Web App, Tribute, Telegram Bot webhook (без polling)."""

from __future__ import annotations

import logging
from contextlib import asynccontextmanager

from aiogram.types import Update
from fastapi import FastAPI, Request, Response
from fastapi.responses import RedirectResponse

from brainboosty_hook_bot.src.bot_runtime import (
    BotRuntime,
    create_bot_runtime,
    install_telegram_webhook,
    read_webhook_diagnostics,
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
        logger.info("Telegram webhook OK")
    except Exception:
        logger.exception(
            "setWebhook не удался (api.telegram.org / TELEGRAM_PROXY_URL). "
            "Web App и /health всё равно работают; бот не получит апдейты, пока не почините."
        )

    try:
        app.state.tg_webhook = await read_webhook_diagnostics(_runtime.bot)
    except Exception:
        app.state.tg_webhook = {"url": "", "pending_updates": -1, "last_error": "n/a"}

    logger.info("BrainBoosty API ready")
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


@app.get("/health")
async def health(request: Request) -> dict[str, str | int]:
    from brainboosty_hook_bot.src.web.webapp_routes import webapp_dist_dir

    dist = webapp_dist_dir()
    built = dist.is_dir() and (dist / "index.html").is_file()
    tg = getattr(request.app.state, "tg_webhook", None) or {}
    secret_on = bool((settings.TELEGRAM_WEBHOOK_SECRET or "").strip())
    return {
        "status": "ok",
        "telegram_mode": "webhook",
        "webapp_dist_built": int(built),
        "telegram_webhook_secret_configured": int(secret_on),
        "telegram_webhook_url": tg.get("url", ""),
        "telegram_webhook_pending_updates": int(tg.get("pending_updates", 0) or 0),
        "telegram_webhook_last_error": str(tg.get("last_error", "") or ""),
    }


@app.get("/webapp")
@app.get("/webapp/")
async def legacy_webapp_path_redirect() -> RedirectResponse:
    """Старые закладки и ссылки с /webapp/ → корень домена."""
    return RedirectResponse(url="/", status_code=301)


@app.post(settings.TELEGRAM_WEBHOOK_PATH)
async def telegram_webhook_route(request: Request) -> Response:
    """Входящие апдейты от Telegram (без long polling)."""
    if _runtime is None:
        return Response(status_code=503)

    secret = (settings.TELEGRAM_WEBHOOK_SECRET or "").strip()
    if secret:
        header = request.headers.get("X-Telegram-Bot-Api-Secret-Token", "")
        if header != secret:
            logger.warning(
                "Telegram webhook 403: secret token mismatch "
                "(header_sent=%s, TELEGRAM_WEBHOOK_SECRET is set=%s)",
                bool(header),
                bool(secret),
            )
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


mount_webapp_static(app)
