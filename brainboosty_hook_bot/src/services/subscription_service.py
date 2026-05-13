"""Логика подписки (месяц / навсегда) и окна скидки после теста."""

from __future__ import annotations

import logging
import secrets
from datetime import datetime, timedelta, timezone

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from brainboosty_hook_bot.src.database.models import User

logger = logging.getLogger(__name__)

MONTH_DELTA = timedelta(days=30)
CHANNEL_TRIAL_DELTA = timedelta(minutes=15)
REFERRAL_BONUS_DELTA = timedelta(hours=1)


def now_utc() -> datetime:
    return datetime.now(timezone.utc)


def user_has_paid_access(user: User) -> bool:
    """Полный доступ: пожизненная подписка или активный premium_until."""
    if user.lifetime_subscription:
        return True
    if user.premium_until is None:
        return False
    pu = user.premium_until
    if pu.tzinfo is None:
        pu = pu.replace(tzinfo=timezone.utc)
    return pu > now_utc()


def discount_active(user: User) -> bool:
    """Скидка Forever после прохождения теста (48 ч)."""
    if user.test_discount_until is None:
        return False
    du = user.test_discount_until
    if du.tzinfo is None:
        du = du.replace(tzinfo=timezone.utc)
    return du > now_utc()


def open_discount_window(user: User) -> None:
    """Вызывать после каждого завершения когнитивного теста."""
    user.test_discount_until = now_utc() + timedelta(hours=48)


def add_premium_delta(user: User, delta: timedelta) -> None:
    """Продлевает premium_until от max(сейчас, текущий premium_until)."""
    n = now_utc()
    pu = user.premium_until
    if pu is not None and pu.tzinfo is None:
        pu = pu.replace(tzinfo=timezone.utc)
    base = max(n, pu or n)
    user.premium_until = base + delta


def channel_month_15_discount_active(user: User) -> bool:
    """Скидка 15% на месяц после подтверждения канала (окно 7 дней)."""
    if user.channel_month_15_discount_until is None:
        return False
    du = user.channel_month_15_discount_until
    if du.tzinfo is None:
        du = du.replace(tzinfo=timezone.utc)
    return du > now_utc()


def grant_channel_month_15_promo(user: User) -> str:
    """Выдать окно скидки и стабильный промокод (для сайта / сообщения)."""
    user.channel_month_15_discount_until = now_utc() + timedelta(days=7)
    if not user.month_promo_code:
        user.month_promo_code = f"BB15-{secrets.token_hex(3).upper()}"
    return user.month_promo_code


def grant_monthly(user: User) -> None:
    n = now_utc()
    pu = user.premium_until
    if pu is not None and pu.tzinfo is None:
        pu = pu.replace(tzinfo=timezone.utc)
    base = max(n, pu or n)
    user.premium_until = base + MONTH_DELTA


def grant_lifetime(user: User) -> None:
    user.lifetime_subscription = True


async def get_user_by_tg(session: AsyncSession, tg_id: int) -> User | None:
    result = await session.execute(select(User).where(User.tg_id == tg_id))
    return result.scalar_one_or_none()
