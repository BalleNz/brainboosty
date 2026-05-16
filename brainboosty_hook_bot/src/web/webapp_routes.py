"""Telegram Web App: static bundle + JSON API."""

from __future__ import annotations

import logging
from pathlib import Path
from typing import Annotated, Any

from fastapi import APIRouter, Depends, Header, HTTPException, Query, Request
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field
from sqlalchemy.ext.asyncio import AsyncSession

from brainboosty_hook_bot.src.config.config import settings
from brainboosty_hook_bot.src.database.session import get_session
from brainboosty_hook_bot.src.locale import normalize_lang
from brainboosty_hook_bot.src.services.about_photo import (
    resolve_about_photo_path,
    resolve_channel_avatar_path,
)
from brainboosty_hook_bot.src.web.webapp_auth import (
    WebAppAuthError,
    tg_user_id_from_init,
    validate_init_data,
    validate_telegram_login_widget_payload,
)
from brainboosty_hook_bot.src.web.exercise_service import fetch_exercise_for_user
from brainboosty_hook_bot.src.web.site_login_challenge import (
    CHALLENGE_TTL_SEC,
    create_site_login_challenge,
    poll_site_login_challenge,
)
from brainboosty_hook_bot.src.web.site_session import mint_site_access_token, verify_site_access_token
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
            "/",
            StaticFiles(directory=str(dist), html=True),
            name="brainboosty_webapp",
        )
        logger.info("Web App SPA mounted at / from %s", dist)
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
    authorization: str | None = None,
) -> tuple[Any, str]:
    bearer = ""
    if authorization:
        auth = authorization.strip()
        low = auth.lower()
        if low.startswith("bearer "):
            bearer = auth[7:].strip()
    if bearer:
        tg_id = verify_site_access_token(bearer)
        if tg_id is None:
            raise HTTPException(status_code=401, detail="invalid_site_token")
        user = await get_user_by_tg_id(session, tg_id)
        if user is None:
            raise HTTPException(status_code=403, detail="not_registered")
        lang = normalize_lang(user.locale or "ru")
        return user, lang

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

    lang = normalize_lang(user.locale or "ru")

    return user, lang


@router.get("/config")
async def webapp_config() -> dict[str, str]:
    return {"webappUrl": webapp_public_url()}


@router.get("/landing")
async def webapp_landing() -> dict[str, str | bool]:
    """Публичные ссылки для лендинга (без Telegram initData)."""
    bot = settings.BOT_USERNAME.strip().lstrip("@")
    base = (settings.WEBAPP_PUBLIC_URL or "").strip().rstrip("/")
    hub_entry = f"{base}/#hub-login" if base else "/#hub-login"
    return {
        "botUrl": f"https://t.me/{bot}?start=site",
        "webappEntryUrl": f"https://t.me/{bot}?start=webapp",
        "botUsername": bot,
        "channelUrl": settings.premium_channel_url,
        "hasAuthorPhoto": resolve_about_photo_path() is not None,
        "hasChannelAvatar": resolve_channel_avatar_path() is not None,
        "webappUrl": webapp_public_url(),
        "neuralMapHubUrl": hub_entry,
        "hubHostDisplay": "neuralmap.brainboosty.app",
    }


@router.post("/auth/site")
async def webapp_auth_site(
    body: dict[str, Any],
    session: Annotated[AsyncSession, Depends(get_session)],
) -> JSONResponse:
    """Вход с сайта: тело = объект из Telegram Login Widget (onTelegramAuth)."""
    try:
        tg_id = validate_telegram_login_widget_payload(body)
    except WebAppAuthError as exc:
        raise HTTPException(status_code=401, detail=exc.code) from exc
    user = await get_user_by_tg_id(session, tg_id)
    if user is None:
        raise HTTPException(status_code=403, detail="not_registered")
    lang = normalize_lang(user.locale or "ru")
    token = mint_site_access_token(tg_id)
    return JSONResponse(
        {
            "accessToken": token,
            "lang": lang,
            "user": {"first_name": user.first_name, "last_name": ""},
        }
    )


@router.post("/auth/site/link")
async def webapp_auth_site_link(
    session: Annotated[AsyncSession, Depends(get_session)],
) -> JSONResponse:
    """Создать одноразовый токен: пользователь открывает telegramLink и жмёт Start в боте."""
    login_token, telegram_link = await create_site_login_challenge(session)
    await session.commit()
    return JSONResponse(
        {
            "loginToken": login_token,
            "telegramLink": telegram_link,
            "expiresInSec": CHALLENGE_TTL_SEC,
        }
    )


@router.get("/auth/site/poll")
async def webapp_auth_site_poll(
    session: Annotated[AsyncSession, Depends(get_session)],
    token: Annotated[str, Query(min_length=1)],
) -> JSONResponse:
    raw = token.strip().lower()
    data = await poll_site_login_challenge(session, raw)
    await session.commit()
    return JSONResponse(data)


@router.get("/landing/photo")
async def webapp_landing_photo() -> FileResponse:
    path = resolve_about_photo_path()
    if path is None:
        raise HTTPException(status_code=404, detail="photo_not_found")
    suffix = path.suffix.lower()
    if suffix in {".jpg", ".jpeg"}:
        media = "image/jpeg"
    elif suffix == ".webp":
        media = "image/webp"
    else:
        media = "image/png"
    return FileResponse(path, media_type=media)


@router.get("/landing/channel-avatar")
async def webapp_landing_channel_avatar() -> FileResponse:
    path = resolve_channel_avatar_path()
    if path is None:
        raise HTTPException(status_code=404, detail="channel_avatar_not_found")
    suffix = path.suffix.lower()
    if suffix in {".jpg", ".jpeg"}:
        media = "image/jpeg"
    elif suffix == ".webp":
        media = "image/webp"
    else:
        media = "image/png"
    return FileResponse(path, media_type=media)


@router.get("/exercises/{exercise_id}")
async def webapp_exercise(
    exercise_id: int,
    session: Annotated[AsyncSession, Depends(get_session)],
    x_telegram_init_data: str | None = Header(default=None, alias="X-Telegram-Init-Data"),
    authorization: str | None = Header(default=None),
) -> JSONResponse:
    user, lang = await _resolve_user(session, x_telegram_init_data, authorization)
    try:
        payload = await fetch_exercise_for_user(session, user, exercise_id, lang)
    except PermissionError:
        raise HTTPException(status_code=403, detail="premium_required") from None
    except LookupError:
        raise HTTPException(status_code=404, detail="exercise_not_found") from None
    return JSONResponse(payload)


@router.get("/profile")
async def webapp_profile(
    session: Annotated[AsyncSession, Depends(get_session)],
    x_telegram_init_data: str | None = Header(default=None, alias="X-Telegram-Init-Data"),
    authorization: str | None = Header(default=None),
) -> JSONResponse:
    user, lang = await _resolve_user(session, x_telegram_init_data, authorization)
    snap = await latest_snapshot(session, user.id)
    return JSONResponse(profile_from_snapshot(user, snap, lang=lang))


@router.get("/history")
async def webapp_history(
    session: Annotated[AsyncSession, Depends(get_session)],
    x_telegram_init_data: str | None = Header(default=None, alias="X-Telegram-Init-Data"),
    authorization: str | None = Header(default=None),
) -> JSONResponse:
    user, lang = await _resolve_user(session, x_telegram_init_data, authorization)
    snaps = await list_snapshots(session, user.id)
    return JSONResponse(history_payload(snaps, lang=lang))


@router.get("/test/questions")
async def webapp_test_questions(
    session: Annotated[AsyncSession, Depends(get_session)],
    variant: str = "development",
    x_telegram_init_data: str | None = Header(default=None, alias="X-Telegram-Init-Data"),
    authorization: str | None = Header(default=None),
) -> JSONResponse:
    user, lang = await _resolve_user(session, x_telegram_init_data, authorization)
    v = variant if variant in ("sexual", "development") else (user.test_variant or "development")
    if v not in ("sexual", "development"):
        v = "development"
    return JSONResponse(cognitive_questions_payload(lang, v))


@router.post("/test/submit")
async def webapp_test_submit(
    body: TestSubmitBody,
    session: Annotated[AsyncSession, Depends(get_session)],
    x_telegram_init_data: str | None = Header(default=None, alias="X-Telegram-Init-Data"),
    authorization: str | None = Header(default=None),
) -> JSONResponse:
    user, lang = await _resolve_user(session, x_telegram_init_data, authorization)
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
async def webapp_health(request: Request) -> dict[str, str | int]:
    dist = webapp_dist_dir()
    built = dist.is_dir() and (dist / "index.html").is_file()
    tg = getattr(request.app.state, "tg_webhook", None) or {}
    secret_on = bool((settings.TELEGRAM_WEBHOOK_SECRET or "").strip())
    return {
        "status": "ok",
        "dist_built": str(built).lower(),
        "webapp_dist_built": int(built),
        "webapp_url": webapp_public_url(),
        "telegram_mode": "webhook",
        "telegram_webhook_secret_configured": int(secret_on),
        "telegram_webhook_url": str(tg.get("url", "") or ""),
        "telegram_webhook_pending_updates": int(tg.get("pending_updates", 0) or 0),
        "telegram_webhook_last_error": str(tg.get("last_error", "") or ""),
    }
