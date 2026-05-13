"""Реферальная статистика (/referral)."""

from __future__ import annotations

from datetime import datetime, timezone

from aiogram import Router
from aiogram.filters import Command
from aiogram.types import Message
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from brainboosty_hook_bot.src.database.models import User
from brainboosty_hook_bot.src.locale import t
from brainboosty_hook_bot.src.utils.helpers import build_ref_link

router = Router(name="referral")


async def _fetch_user(session: AsyncSession, tg_id: int) -> User | None:
    result = await session.execute(select(User).where(User.tg_id == tg_id))
    return result.scalar_one_or_none()


@router.message(Command("referral"))
async def cmd_referral(message: Message, session: AsyncSession, locale: str) -> None:
    if message.from_user is None:
        return

    user = await _fetch_user(session, message.from_user.id)
    if user is None:
        await message.answer(t(locale, "NOT_REGISTERED"))
        return

    lang = user.locale if user.locale in {"ru", "en"} else locale

    ref_link = build_ref_link(message.from_user.id)
    count = user.referral_count

    premium_line = t(lang, "PREMIUM_NONE")
    if user.lifetime_subscription:
        premium_line = t(lang, "PREMIUM_LIFETIME")
    elif user.premium_until is not None:
        pu = user.premium_until
        if pu.tzinfo is None:
            pu = pu.replace(tzinfo=timezone.utc)
        if pu > datetime.now(timezone.utc):
            premium_line = t(
                lang,
                "PREMIUM_ACTIVE",
                until=pu.astimezone(timezone.utc).strftime("%d.%m.%Y %H:%M UTC"),
            )

    text = "\n".join(
        [
            t(lang, "REFERRAL_STATS", count=count),
            "",
            premium_line,
            "",
            t(lang, "REF_LINK_LABEL") + "\n" + ref_link,
        ],
    )
    await message.answer(text)
