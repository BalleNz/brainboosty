"""Отправка PDF карты мозга в чат (без инфографики — только документ)."""

from __future__ import annotations

import asyncio
import logging
import re

from aiogram import Bot
from aiogram.types import BufferedInputFile, InlineKeyboardMarkup
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession
from unidecode import unidecode

from brainboosty_hook_bot.src.database.models import BrainRegionSnapshot, User
from brainboosty_hook_bot.src.locale import t
from brainboosty_hook_bot.src.services.pdf_report import build_brain_map_pdf
from brainboosty_hook_bot.src.services.brain_regions_display import snapshot_to_scores
from brainboosty_hook_bot.src.utils.flow_chat import delete_one

logger = logging.getLogger(__name__)


async def _fetch_latest_snapshot(session: AsyncSession, user_id: int) -> BrainRegionSnapshot | None:
    stmt = (
        select(BrainRegionSnapshot)
        .where(BrainRegionSnapshot.user_id == user_id)
        .order_by(BrainRegionSnapshot.created_at.desc())
        .limit(1)
    )
    return (await session.execute(stmt)).scalar_one_or_none()


async def _count_snapshots(session: AsyncSession, user_id: int) -> int:
    q = await session.execute(
        select(func.count()).select_from(BrainRegionSnapshot).where(BrainRegionSnapshot.user_id == user_id),
    )
    return int(q.scalar_one() or 0)


def _pdf_filename_slug(user: User) -> str:
    raw = (user.username or "").strip().lstrip("@") or (user.first_name or "").strip() or "user"
    slug = unidecode(raw).lower()
    slug = re.sub(r"[^a-z0-9._-]+", "_", slug).strip("._-")[:48]
    return slug or "user"


async def deliver_brain_map_pdf(
    bot: Bot,
    chat_id: int,
    session: AsyncSession,
    user: User,
    lang: str,
    *,
    scores: dict[str, float],
    test_variant: str,
    paid: bool,
    reply_markup: InlineKeyboardMarkup | None = None,
    detail_json: dict | None = None,
) -> list[int]:
    """Сообщение о генерации → PDF с именем `{slug}_brainmap_{n}.pdf` → удаление статуса. Возвращает id для trial-delete."""
    status_msg = await bot.send_message(chat_id, t(lang, "PDF_BRAIN_MAP_GENERATING"))
    status_id = status_msg.message_id
    gen = await _count_snapshots(session, user.id)
    slug = _pdf_filename_slug(user)
    fname = f"{slug}_brainmap_{gen}.pdf"
    goal_keys = list(user.goals) if isinstance(user.goals, list) else []
    try:
        pdf_bytes = await build_brain_map_pdf(
            lang=lang,
            scores=scores,
            test_variant=test_variant,
            goal_keys=goal_keys,
            paid=paid,
            user_display_name=user.first_name,
            detail_json=detail_json,
        )
        doc = await bot.send_document(
            chat_id,
            BufferedInputFile(pdf_bytes, filename=fname),
            caption=t(lang, "PDF_CAPTION"),
            reply_markup=reply_markup,
        )
        try:
            await bot.delete_message(chat_id, status_id)
        except Exception as exc:  # noqa: BLE001
            logger.debug("delete PDF status message: %s", exc)
        return [doc.message_id]
    except Exception as exc:  # noqa: BLE001
        logger.warning("Brain map PDF failed: %s", exc)
        return [status_id]


async def send_full_brain_result_pack(
    bot: Bot,
    chat_id: int,
    session: AsyncSession,
    user: User,
    lang: str,
    *,
    reply_markup: InlineKeyboardMarkup | None = None,
) -> list[int]:
    """Только PDF (инфографика и текстовая карточка не отправляются)."""
    latest = await _fetch_latest_snapshot(session, user.id)
    if latest is None:
        raise ValueError("no brain snapshots for user")
    v = latest.test_variant if latest.test_variant in ("sexual", "development") else "development"
    scores = snapshot_to_scores(latest)
    detail = latest.detail_json if isinstance(latest.detail_json, dict) else None
    return await deliver_brain_map_pdf(
        bot,
        chat_id,
        session,
        user,
        lang,
        scores=scores,
        test_variant=v,
        paid=True,
        reply_markup=reply_markup,
        detail_json=detail,
    )


async def schedule_delete_messages(bot: Bot, chat_id: int, message_ids: list[int], delay_sec: float) -> None:
    await asyncio.sleep(delay_sec)
    for mid in message_ids:
        await delete_one(bot, chat_id, mid)
