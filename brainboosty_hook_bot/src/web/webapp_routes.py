"""Telegram Web App: static bundle + JSON API."""

from __future__ import annotations

import logging
from pathlib import Path
from typing import Annotated, Any

from fastapi import APIRouter, Depends, Header, HTTPException
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field
from sqlalchemy.ext.asyncio import AsyncSession

from brainboosty_hook_bot.src.config.config import settings
from brainboosty_hook_bot.src.database.session import get_session
from brainboosty_hook_bot.src.locale import normalize_lang
from brainboosty_hook_bot.src.web.webapp_auth import WebAppAuthError, tg_user_id_from_init, validate_init_data
from brainboosty_hook_bot.src.web.webapp_service import (
    cognitive_questions_payload,
    get_user_by_tg_id,
    history_payload,
    latest_snapshot,
    list_snapshots,
    profile_from_snapshot,
    submit_cognitive_test,
    webapp_public_url,
)

logger = logging.getLogger(__name__)

_package_root = Path(__file__).resolve().parents[2]
_webapp_dist = _package_root / "webapp" / "dist"

router = APIRouter(prefix="/api/webapp", tags=["webapp"])


def webapp_dist_dir() -> Path:
    return _webapp_dist


def mount_webapp_static(app) -> None:
    dist = webapp_dist_dir()
    if dist.is_dir() and (dist / "index.html").is_file():
        app.mount(
            "/webapp",
            StaticFiles(directory=str(dist), html=True),
            name="brainboosty_webapp",
        )
        logger.info("Web App static files mounted at /webapp/ from %s", dist)
    else:
        logger.warning(
            "Web App dist not found at %s — run: cd webapp && npm install && npm run build",
            dist,
        )


class TestSubmitBody(BaseModel):
    variant: str = Field(default="development")
    answers: dict[str, str] = Field(default_factory=dict)


async def _resolve_user(
    session: AsyncSession,
    x_telegram_init_data: str | None,
) -> tuple[Any, str]:
    try:
        parsed = validate_init_data(x_telegram_init_data or "")
    except WebAppAuthError as exc:
        raise HTTPException(status_code=401, detail=exc.code) from exc

    tg_id = tg_user_id_from_init(parsed)
    if tg_id is None:
        raise HTTPException(status_code=401, detail="no_user_id")

    user = await get_user_by_tg_id(session, tg_id)
    if user is None:
        raise HTTPException(status_code=403, detail="not_registered")

    user_obj = parsed.get("user")
    lang = normalize_lang(user.locale or "ru")
    if isinstance(user_obj, dict) and user_obj.get("language_code"):
        lc = str(user_obj["language_code"])
        if lc.startswith("en"):
            lang = "en"

    return user, lang


@router.get("/config")
async def webapp_config() -> dict[str, str]:
    return {"webappUrl": webapp_public_url()}


@router.get("/profile")
async def webapp_profile(
    session: Annotated[AsyncSession, Depends(get_session)],
    x_telegram_init_data: str | None = Header(default=None, alias="X-Telegram-Init-Data"),
) -> JSONResponse:
    user, lang = await _resolve_user(session, x_telegram_init_data)
    snap = await latest_snapshot(session, user.id)
    return JSONResponse(profile_from_snapshot(user, snap, lang=lang))


@router.get("/history")
async def webapp_history(
    session: Annotated[AsyncSession, Depends(get_session)],
    x_telegram_init_data: str | None = Header(default=None, alias="X-Telegram-Init-Data"),
) -> JSONResponse:
    user, lang = await _resolve_user(session, x_telegram_init_data)
    snaps = await list_snapshots(session, user.id)
    return JSONResponse(history_payload(snaps, lang=lang))


@router.get("/test/questions")
async def webapp_test_questions(
    session: Annotated[AsyncSession, Depends(get_session)],
    variant: str = "development",
    x_telegram_init_data: str | None = Header(default=None, alias="X-Telegram-Init-Data"),
) -> JSONResponse:
    user, lang = await _resolve_user(session, x_telegram_init_data)
    v = variant if variant in ("sexual", "development") else (user.test_variant or "development")
    if v not in ("sexual", "development"):
        v = "development"
    return JSONResponse(cognitive_questions_payload(lang, v))


@router.post("/test/submit")
async def webapp_test_submit(
    body: TestSubmitBody,
    session: Annotated[AsyncSession, Depends(get_session)],
    x_telegram_init_data: str | None = Header(default=None, alias="X-Telegram-Init-Data"),
) -> JSONResponse:
    user, lang = await _resolve_user(session, x_telegram_init_data)
    answers: dict[int, str] = {}
    for k, v in body.answers.items():
        try:
            qi = int(k)
            letter = str(v).strip().upper()
            if letter in {"A", "B", "C", "D"}:
                answers[qi] = letter
        except (TypeError, ValueError):
            continue
    try:
        profile = await submit_cognitive_test(
            session,
            user,
            answers=answers,
            variant=body.variant,
            lang=lang,
        )
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    await session.commit()
    return JSONResponse({"profile": profile})


@router.get("/health")
async def webapp_health() -> dict[str, str]:
    dist = webapp_dist_dir()
    built = dist.is_dir() and (dist / "index.html").is_file()
    return {
        "status": "ok",
        "dist_built": str(built).lower(),
        "webapp_url": webapp_public_url(),
    }
