"""Логика подписки (месяц / навсегда) и окна скидки после теста."""

from __future__ import annotations

import logging
import secrets
from datetime import datetime, timedelta, timezone

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from brainboosty_hook_bot.src.database.models import User
from brainboosty_hook_bot.src.locale import normalize_lang, t

logger = logging.getLogger(__name__)

MONTH_DELTA = timedelta(days=30)
CHANNEL_TRIAL_DELTA = timedelta(minutes=15)
REFERRAL_BONUS_DELTA = timedelta(hours=1)
TEST_FOREVER_DISCOUNT_WINDOW = timedelta(hours=24)


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
    """Скидка Forever после прохождения теста (окно TEST_FOREVER_DISCOUNT_WINDOW)."""
    if user.test_discount_until is None:
        return False
    du = user.test_discount_until
    if du.tzinfo is None:
        du = du.replace(tzinfo=timezone.utc)
    return du > now_utc()


def test_discount_time_left_phrase(lang: str, user: User) -> str | None:
    """
    Человекочитаемый остаток до конца окна Forever (полные часы; <1 ч — «менее часа»).
    None, если окно не задано или уже истекло.
    """
    if user.test_discount_until is None:
        return None
    du = user.test_discount_until
    if du.tzinfo is None:
        du = du.replace(tzinfo=timezone.utc)
    sec = int((du - now_utc()).total_seconds())
    if sec <= 0:
        return None
    lg = normalize_lang(lang)
    if sec < 3600:
        return t(lg, "DISCOUNT_LEFT_LT_HOUR")
    hours = sec // 3600
    if lg == "en":
        if hours == 1:
            return t(lg, "DISCOUNT_LEFT_ONE_HOUR_EN")
        return t(lg, "DISCOUNT_LEFT_N_HOURS_EN", n=hours)
    if 11 <= (hours % 100) <= 14:
        return t(lg, "DISCOUNT_LEFT_HOURS_RU_MANY", n=hours)
    mod10 = hours % 10
    if mod10 == 1:
        return t(lg, "DISCOUNT_LEFT_HOURS_RU_ONE", n=hours)
    if mod10 in (2, 3, 4):
        return t(lg, "DISCOUNT_LEFT_HOURS_RU_FEW", n=hours)
    return t(lg, "DISCOUNT_LEFT_HOURS_RU_MANY", n=hours)


def open_discount_window(user: User) -> None:
    """Вызывать после каждого завершения когнитивного теста."""
    user.test_discount_until = now_utc() + TEST_FOREVER_DISCOUNT_WINDOW


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
