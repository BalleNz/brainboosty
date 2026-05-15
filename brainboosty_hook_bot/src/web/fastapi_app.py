"""HTTP API: вебхуки (Tribute) на FastAPI + Uvicorn — отдельный процесс от polling-бота."""

from __future__ import annotations

import json
import logging
from contextlib import asynccontextmanager

from aiogram import Bot
from fastapi import FastAPI, Request, Response

from brainboosty_hook_bot.src.config.config import settings
from brainboosty_hook_bot.src.web.tribute_app import process_tribute_webhook
from brainboosty_hook_bot.src.web.webapp_routes import mount_webapp_static, router as webapp_router

logger = logging.getLogger(__name__)

_bot: Bot | None = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    global _bot
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s %(levelname)s [%(name)s] %(message)s",
    )
    if not (settings.BOT_TOKEN or "").strip():
        raise RuntimeError("BOT_TOKEN is not set — required for payment notifications")
    _bot = Bot(settings.BOT_TOKEN)
    yield
    if _bot is not None:
        await _bot.session.close()
        _bot = None


app = FastAPI(title="BrainBoosty Hook API", lifespan=lifespan)
app.include_router(webapp_router)
mount_webapp_static(app)


@app.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post(settings.TRIBUTE_WEBHOOK_PATH)
async def tribute_webhook_route(request: Request) -> Response:
    raw = await request.body()
    sig = request.headers.get("trbt-signature") or request.headers.get("Trbt-Signature")
    status, body = await process_tribute_webhook(raw, sig, _bot)
    return Response(content=body, status_code=status, media_type="text/plain")
