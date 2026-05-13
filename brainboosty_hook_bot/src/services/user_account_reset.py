"""Сброс данных профиля с сохранением идентификатора Telegram и подписки."""

from __future__ import annotations

from sqlalchemy import delete, update
from sqlalchemy.ext.asyncio import AsyncSession

from brainboosty_hook_bot.src.database.models import BrainRegionSnapshot, User

# Плейсхолдеры до повторного прохождения анкеты (поля в БД NOT NULL).
_PLACEHOLDER_AGE = 5
_PLACEHOLDER_DAILY_TIME = "1-5"


async def wipe_user_profile_keep_subscription(session: AsyncSession, user: User) -> None:
    """Удаляет снимки теста и сбрасывает анкету/когнитив/реферальные поля; подписка и tg_id не трогаются."""
    await session.execute(delete(BrainRegionSnapshot).where(BrainRegionSnapshot.user_id == user.id))
    await session.execute(update(User).where(User.referrer_id == user.id).values(referrer_id=None))

    user.goals = []
    user.age = _PLACEHOLDER_AGE
    user.daily_time = _PLACEHOLDER_DAILY_TIME
    user.cognitive_completed = False
    user.referrer_id = None
    user.referral_count = 0
