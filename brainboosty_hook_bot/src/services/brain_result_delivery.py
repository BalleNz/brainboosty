"""Отправка полной «карты мозга» (фото + текст), как для платного доступа."""

from __future__ import annotations

import asyncio
import logging

from aiogram import Bot
from aiogram.types import BufferedInputFile, InlineKeyboardMarkup
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from brainboosty_hook_bot.src.database.models import BrainRegionSnapshot, User
from brainboosty_hook_bot.src.locale import t
from brainboosty_hook_bot.src.services.brain_map_image import build_brain_map_infographic_png
from brainboosty_hook_bot.src.services.brain_regions_display import format_brain_map_with_comparison, snapshot_to_scores
from brainboosty_hook_bot.src.utils.flow_chat import delete_one

logger = logging.getLogger(__name__)


def _brain_title(lang: str, variant: str) -> str:
    if variant == "sexual":
        return t(lang, "BRAIN_MAP_TITLE_SEXUAL_BLOCK")
    return t(lang, "BRAIN_MAP_TITLE_DEVELOPMENT_BLOCK")


async def _fetch_latest_two_snapshots(
    session: AsyncSession,
    user_id: int,
) -> tuple[BrainRegionSnapshot, BrainRegionSnapshot | None]:
    stmt = (
        select(BrainRegionSnapshot)
        .where(BrainRegionSnapshot.user_id == user_id)
        .order_by(BrainRegionSnapshot.created_at.desc())
        .limit(2)
    )
    rows = list((await session.execute(stmt)).scalars().all())
    if not rows:
        raise ValueError("no brain snapshots for user")
    return rows[0], rows[1] if len(rows) > 1 else None


async def send_full_brain_result_pack(
    bot: Bot,
    chat_id: int,
    session: AsyncSession,
    user: User,
    lang: str,
    *,
    reply_markup: InlineKeyboardMarkup | None = None,
) -> list[int]:
    """Фото (полная версия) + карточка сравнения. Возвращает id сообщений для отложенного удаления."""
    latest, previous = await _fetch_latest_two_snapshots(session, user.id)
    v = latest.test_variant if latest.test_variant in ("sexual", "development") else "development"
    scores = snapshot_to_scores(latest)
    previous_scores = snapshot_to_scores(previous) if previous is not None else None
    title = _brain_title(lang, v)
    ids: list[int] = []
    try:
        png = build_brain_map_infographic_png(scores, lang, paid=True, test_variant=v)
        cap = t(lang, "BRAIN_MAP_PHOTO_CAPTION_PAID")
        msg = await bot.send_photo(
            chat_id,
            BufferedInputFile(png, filename="brain-map.png"),
            caption=cap,
        )
        ids.append(msg.message_id)
    except Exception as exc:  # noqa: BLE001
        logger.warning("Brain map infographic failed: %s", exc)
    card = format_brain_map_with_comparison(scores, previous_scores, title=title, lang=lang)
    msg2 = await bot.send_message(chat_id, card, reply_markup=reply_markup)
    ids.append(msg2.message_id)
    return ids


async def schedule_delete_messages(bot: Bot, chat_id: int, message_ids: list[int], delay_sec: float) -> None:
    await asyncio.sleep(delay_sec)
    for mid in message_ids:
        await delete_one(bot, chat_id, mid)
