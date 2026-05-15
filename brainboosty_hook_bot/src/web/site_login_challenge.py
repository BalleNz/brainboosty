"""Вход с сайта через deep-link /start site_<token> и поллинг."""

from __future__ import annotations

import secrets
from datetime import datetime, timedelta, timezone
from typing import Any, Literal

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from brainboosty_hook_bot.src.database.models import SiteLoginChallenge
from brainboosty_hook_bot.src.locale import normalize_lang
from brainboosty_hook_bot.src.web.site_session import mint_site_access_token
from brainboosty_hook_bot.src.web.webapp_service import get_user_by_tg_id

CHALLENGE_TTL_SEC = 900

AttachResult = Literal["ok", "not_registered", "invalid"]


def _utcnow() -> datetime:
    return datetime.now(timezone.utc)


async def create_site_login_challenge(session: AsyncSession) -> tuple[str, str]:
    """
    Создаёт запись и возвращает (token_hex, deep_link).

    Вызывающий обязан session.commit().
    """
    token = secrets.token_hex(16)
    exp = _utcnow() + timedelta(seconds=CHALLENGE_TTL_SEC)
    session.add(SiteLoginChallenge(token=token, expires_at=exp, tg_id=None))
    await session.flush()
    from brainboosty_hook_bot.src.config.config import settings

    bot = settings.BOT_USERNAME.strip().lstrip("@")
    link = f"https://t.me/{bot}?start=site_{token}"
    return token, link


async def attach_site_login_challenge(session: AsyncSession, tg_id: int, token: str) -> AttachResult:
    """
    Вызывается из хендлера /start. Без commit — его делает DatabaseSessionMiddleware.
    """
    user = await get_user_by_tg_id(session, tg_id)
    if user is None:
        return "not_registered"

    stmt = select(SiteLoginChallenge).where(SiteLoginChallenge.token == token)
    row = (await session.execute(stmt)).scalar_one_or_none()
    now = _utcnow()
    if row is None:
        return "invalid"
    if row.expires_at <= now:
        await session.delete(row)
        return "invalid"
    if row.tg_id is not None:
        if row.tg_id == tg_id:
            return "ok"
        return "invalid"

    row.tg_id = tg_id
    session.add(row)
    return "ok"


async def poll_site_login_challenge(session: AsyncSession, token: str) -> dict[str, Any]:
    """Публичный поллинг. При ready удаляет challenge и требует commit от вызывающего."""
    stmt = select(SiteLoginChallenge).where(SiteLoginChallenge.token == token)
    row = (await session.execute(stmt)).scalar_one_or_none()
    now = _utcnow()

    if row is None:
        return {"status": "not_found"}

    if row.expires_at <= now:
        await session.delete(row)
        return {"status": "expired"}

    if row.tg_id is None:
        return {"status": "pending"}

    tg_id = row.tg_id
    user = await get_user_by_tg_id(session, tg_id)
    await session.delete(row)
    await session.flush()

    if user is None:
        return {"status": "error", "detail": "user_missing"}

    lang = normalize_lang(user.locale or "ru")
    access = mint_site_access_token(tg_id)
    return {
        "status": "ready",
        "accessToken": access,
        "lang": lang,
        "user": {"first_name": user.first_name, "last_name": ""},
    }
