"""Оплата через Tribute (Mini App), скидки по каналу и реферальные сценарии."""

from __future__ import annotations

import logging
from datetime import datetime, timedelta, timezone

from aiogram import Bot, F, Router
from aiogram.enums import ContentType
from aiogram.exceptions import TelegramBadRequest
from aiogram.types import CallbackQuery, InlineKeyboardMarkup, LabeledPrice, Message, PreCheckoutQuery
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from brainboosty_hook_bot.src.config.config import settings
from brainboosty_hook_bot.src.database.models import User
from brainboosty_hook_bot.src.keyboards.inline import (
    ACCESS_CHANNEL_15_PITCH_CB,
    ACCESS_CH15_NO_CB,
    ACCESS_CH15_YES_CB,
    ACCESS_NOT_READY_CB,
    ACCESS_SHOW_REF_CB,
    PAY_BACK_TARIFF_CB,
    PAY_PLAN_PREFIX,
    PAY_STARS_FOREVER_CB,
    SUB_OFFER_CB,
    VERIFY_CH_PROMO_CB,
    access_postpone_discount_kb,
    access_show_ref_kb,
    access_tariff_choice_kb,
    access_tribute_buy_step_kb,
    access_verify_promo_kb,
)
from brainboosty_hook_bot.src.locale import t
from brainboosty_hook_bot.src.services import subscription_service
from brainboosty_hook_bot.src.services.channel_membership import user_is_channel_member
from brainboosty_hook_bot.src.utils.helpers import build_ref_link

logger = logging.getLogger(__name__)

router = Router(name="payments")

STARS_INVOICE_PAYLOAD_PREFIX = "bbfs"


def _forever_stars_amount(user: User) -> int:
    if subscription_service.discount_active(user):
        return int(settings.STARS_FOREVER_DISCOUNT)
    return int(settings.STARS_FOREVER_FULL)


def _stars_invoice_payload(user: User, amount: int) -> str:
    return f"{STARS_INVOICE_PAYLOAD_PREFIX}:{user.id}:{amount}"


def _parse_stars_payload(payload: str) -> tuple[int, int] | None:
    parts = (payload or "").split(":")
    if len(parts) != 3 or parts[0] != STARS_INVOICE_PAYLOAD_PREFIX:
        return None
    try:
        return int(parts[1]), int(parts[2])
    except ValueError:
        return None


def _vip_channel_id() -> int | None:
    raw = (settings.VIP_PRIVATE_CHANNEL_CHAT_ID or "").strip()
    if not raw:
        return None
    try:
        return int(raw)
    except ValueError:
        return None


async def _vip_invite_block_html(bot: Bot, lang: str) -> str:
    cid = _vip_channel_id()
    if cid is None:
        return t(lang, "STARS_VIP_SKIP_CONFIGURE_HTML")
    try:
        link = await bot.create_chat_invite_link(
            chat_id=cid,
            name=f"stars-{datetime.now(timezone.utc).timestamp():.0f}",
            member_limit=1,
            expire_date=datetime.now(timezone.utc) + timedelta(days=7),
        )
        return t(lang, "STARS_VIP_INVITE_HTML", url=link.invite_link)
    except Exception as exc:  # noqa: BLE001
        logger.warning("create_chat_invite_link VIP channel: %s", exc)
        return t(lang, "STARS_VIP_INVITE_FAILED_HTML")


def access_pricing_html(lang: str, user: User) -> str:
    lg = lang if lang in {"ru", "en"} else (user.locale if user.locale in {"ru", "en"} else "ru")
    if subscription_service.discount_active(user):
        tl = subscription_service.test_discount_time_left_phrase(lg, user)
        if tl is None:
            body = t(lg, "ACCESS_PRICING_BODY")
        else:
            body = t(lg, "ACCESS_PRICING_BODY_FOREVER_DISC", time_left=tl)
    else:
        body = t(lg, "ACCESS_PRICING_BODY")
    return body


def _show_channel_15_offer(user: User) -> bool:
    """Пока нет активного −15% на месяц — снова показываем путь к промо (в т.ч. после «Пока не готов»)."""
    if user.lifetime_subscription or subscription_service.user_has_paid_access(user):
        return False
    return not subscription_service.channel_month_15_discount_active(user)


async def _edit_payment_flow_message(
    message: Message | None,
    *,
    lang: str,
    text: str,
    reply_markup: InlineKeyboardMarkup | None,
) -> bool:
    """Один и тот же апдейт воронки оплаты — без лишних сообщений в чате."""
    if message is None:
        return False
    try:
        await message.edit_text(text=text, reply_markup=reply_markup, parse_mode="HTML")
        return True
    except TelegramBadRequest as exc:
        if "message is not modified" in str(exc).lower():
            return True
        logger.warning("payment flow edit_text: %s", exc)
    except Exception as exc:  # noqa: BLE001
        logger.warning("payment flow edit_text: %s", exc)
    try:
        await message.answer(text=text, reply_markup=reply_markup, parse_mode="HTML")
    except Exception as exc:  # noqa: BLE001
        logger.warning("payment flow answer fallback: %s", exc)
        return False
    return True


def _referral_followup_text(user: User, lang: str, tg_id: int) -> str:
    ref_link = build_ref_link(tg_id)
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
    return "\n".join(
        [
            t(lang, "REFERRAL_STATS", count=count),
            "",
            premium_line,
            "",
            t(lang, "REF_LINK_LABEL") + "\n" + ref_link,
        ],
    )


def _plan_tribute_checkout(user: User, lang: str, plan: str) -> tuple[str, str, str]:
    """URL Tribute, подпись цены для кнопки и HTML второго шага (month|forever)."""
    base = (settings.TRIBUTE_APP_URL or "").strip()
    if plan == "month":
        promo = (settings.TRIBUTE_APP_URL_PROMO_15 or "").strip()
        if subscription_service.channel_month_15_discount_active(user) and promo:
            url, price = promo, t(lang, "PAY_PRICE_MONTH_PROMO")
        else:
            url, price = base or promo, t(lang, "PAY_PRICE_MONTH_FULL")
        intro = t(lang, "PAY_STEP2_MONTH_INTRO_HTML")
        return url, price, intro
    if plan == "forever":
        disc = (settings.TRIBUTE_APP_URL_FOREVER_DISC or "").strip()
        if subscription_service.discount_active(user) and disc:
            url, price = disc, t(lang, "PAY_PRICE_FOREVER_DISC")
            tl = subscription_service.test_discount_time_left_phrase(lang, user)
            if tl is None:
                intro = t(lang, "PAY_STEP2_FOREVER_INTRO_HTML")
            else:
                intro = t(lang, "PAY_STEP2_FOREVER_INTRO_DISC_HTML", time_left=tl)
        else:
            url, price = base or disc, t(lang, "PAY_PRICE_FOREVER_FULL")
            intro = t(lang, "PAY_STEP2_FOREVER_INTRO_HTML")
        return url, price, intro
    return base, "", ""


async def send_subscription_offer(
    bot: Bot,
    chat_id: int,
    session: AsyncSession,
    user: User,
    lang: str,
) -> None:
    """Сообщение с ценами: шаг 1 — «Пробный период» / «Навсегда» / «Пока не готов»."""
    _ = session
    lg = lang if lang in {"ru", "en"} else (user.locale if user.locale in {"ru", "en"} else "ru")
    try:
        await bot.send_message(
            chat_id=chat_id,
            text=access_pricing_html(lg, user),
            reply_markup=access_tariff_choice_kb(lg),
            parse_mode="HTML",
        )
    except Exception as exc:  # noqa: BLE001
        logger.warning("send_subscription_offer failed: %s", exc)


@router.callback_query(F.data == SUB_OFFER_CB)
async def subscription_inline_offer(
    callback: CallbackQuery,
    session: AsyncSession,
    locale: str,
) -> None:
    if callback.from_user is None:
        await callback.answer()
        return
    result = await session.execute(select(User).where(User.tg_id == callback.from_user.id))
    user = result.scalar_one_or_none()
    if user is None:
        await callback.answer(t(locale, "NOT_REGISTERED"), show_alert=True)
        return
    lang = user.locale if user.locale in {"ru", "en"} else locale
    await send_subscription_offer(callback.bot, callback.from_user.id, session, user, lang)
    await callback.answer()


@router.callback_query(F.data.startswith(PAY_PLAN_PREFIX))
async def access_plan_selected_handler(
    callback: CallbackQuery,
    session: AsyncSession,
    locale: str,
) -> None:
    if callback.from_user is None or callback.message is None:
        await callback.answer()
        return
    plan = callback.data[len(PAY_PLAN_PREFIX) :] if callback.data else ""
    if plan not in ("month", "forever"):
        await callback.answer()
        return
    result = await session.execute(select(User).where(User.tg_id == callback.from_user.id))
    user = result.scalar_one_or_none()
    if user is None:
        await callback.answer(t(locale, "NOT_REGISTERED"), show_alert=True)
        return
    lang = user.locale if user.locale in {"ru", "en"} else locale
    url, price, intro_html = _plan_tribute_checkout(user, lang, plan)
    stars_amt = _forever_stars_amount(user) if plan == "forever" else None
    await _edit_payment_flow_message(
        callback.message,
        lang=lang,
        text=intro_html,
        reply_markup=access_tribute_buy_step_kb(
            lang,
            buy_url=url,
            price_display=price,
            plan=plan,
            forever_stars_amount=stars_amt,
        ),
    )
    await callback.answer()


@router.callback_query(F.data == PAY_BACK_TARIFF_CB)
async def pay_back_tariff_handler(
    callback: CallbackQuery,
    session: AsyncSession,
    locale: str,
) -> None:
    if callback.from_user is None or callback.message is None:
        await callback.answer()
        return
    result = await session.execute(select(User).where(User.tg_id == callback.from_user.id))
    user = result.scalar_one_or_none()
    if user is None:
        await callback.answer(t(locale, "NOT_REGISTERED"), show_alert=True)
        return
    lang = user.locale if user.locale in {"ru", "en"} else locale
    await _edit_payment_flow_message(
        callback.message,
        lang=lang,
        text=access_pricing_html(lang, user),
        reply_markup=access_tariff_choice_kb(lang),
    )
    await callback.answer()


@router.callback_query(F.data == ACCESS_NOT_READY_CB)
async def access_not_ready_handler(
    callback: CallbackQuery,
    session: AsyncSession,
    locale: str,
) -> None:
    if callback.from_user is None or callback.message is None:
        await callback.answer()
        return
    result = await session.execute(select(User).where(User.tg_id == callback.from_user.id))
    user = result.scalar_one_or_none()
    if user is None:
        await callback.answer(t(locale, "NOT_REGISTERED"), show_alert=True)
        return
    lang = user.locale if user.locale in {"ru", "en"} else locale
    await _edit_payment_flow_message(
        callback.message,
        lang=lang,
        text=t(lang, "ACCESS_POSTPONE_DISCOUNT_PITCH"),
        reply_markup=access_postpone_discount_kb(lang),
    )
    await callback.answer()


@router.callback_query(F.data == ACCESS_CHANNEL_15_PITCH_CB)
async def access_channel_15_pitch_handler(
    callback: CallbackQuery,
    session: AsyncSession,
    locale: str,
) -> None:
    """Старые сообщения с кнопкой −15% / канал; для новых воронок кнопка не показывается."""
    if callback.from_user is None or callback.message is None:
        await callback.answer()
        return
    result = await session.execute(select(User).where(User.tg_id == callback.from_user.id))
    user = result.scalar_one_or_none()
    if user is None:
        await callback.answer(t(locale, "NOT_REGISTERED"), show_alert=True)
        return
    lang = user.locale if user.locale in {"ru", "en"} else locale
    if not _show_channel_15_offer(user):
        await callback.answer()
        return
    await _edit_payment_flow_message(
        callback.message,
        lang=lang,
        text=t(lang, "ACCESS_POSTPONE_DISCOUNT_PITCH"),
        reply_markup=access_postpone_discount_kb(lang),
    )
    await callback.answer()


@router.callback_query(F.data == ACCESS_CH15_YES_CB)
async def access_ch15_yes_handler(
    callback: CallbackQuery,
    session: AsyncSession,
    locale: str,
) -> None:
    if callback.from_user is None or callback.message is None:
        await callback.answer()
        return
    result = await session.execute(select(User).where(User.tg_id == callback.from_user.id))
    user = result.scalar_one_or_none()
    if user is None:
        await callback.answer(t(locale, "NOT_REGISTERED"), show_alert=True)
        return
    lang = user.locale if user.locale in {"ru", "en"} else locale
    await _edit_payment_flow_message(
        callback.message,
        lang=lang,
        text=t(lang, "ACCESS_SUBSCRIBE_FOR_PROMO"),
        reply_markup=access_verify_promo_kb(lang, settings.premium_channel_url),
    )
    await callback.answer()


@router.callback_query(F.data == ACCESS_CH15_NO_CB)
async def access_ch15_no_handler(
    callback: CallbackQuery,
    session: AsyncSession,
    locale: str,
) -> None:
    if callback.from_user is None or callback.message is None:
        await callback.answer()
        return
    result = await session.execute(select(User).where(User.tg_id == callback.from_user.id))
    user = result.scalar_one_or_none()
    if user is None:
        await callback.answer(t(locale, "NOT_REGISTERED"), show_alert=True)
        return
    lang = user.locale if user.locale in {"ru", "en"} else locale
    await _edit_payment_flow_message(
        callback.message,
        lang=lang,
        text=t(lang, "ACCESS_REF_AFTER_NO_HTML"),
        reply_markup=access_show_ref_kb(lang),
    )
    await callback.answer()


@router.callback_query(F.data == VERIFY_CH_PROMO_CB)
async def verify_ch_promo_handler(
    callback: CallbackQuery,
    session: AsyncSession,
    locale: str,
) -> None:
    if callback.from_user is None or callback.message is None:
        await callback.answer()
        return
    result = await session.execute(select(User).where(User.tg_id == callback.from_user.id))
    user = result.scalar_one_or_none()
    if user is None:
        await callback.answer(t(locale, "NOT_REGISTERED"), show_alert=True)
        return
    lang = user.locale if user.locale in {"ru", "en"} else locale
    if not await user_is_channel_member(callback.bot, callback.from_user.id):
        await callback.answer(t(lang, "CHANNEL_SUB_NOT_MEMBER"), show_alert=True)
        return
    code = subscription_service.grant_channel_month_15_promo(user)
    await _edit_payment_flow_message(
        callback.message,
        lang=lang,
        text=t(lang, "ACCESS_PROMO_GRANTED", code=code),
        reply_markup=None,
    )
    await callback.answer()


@router.callback_query(F.data == ACCESS_SHOW_REF_CB)
async def access_show_ref_handler(
    callback: CallbackQuery,
    session: AsyncSession,
    locale: str,
) -> None:
    if callback.from_user is None or callback.message is None:
        await callback.answer()
        return
    result = await session.execute(select(User).where(User.tg_id == callback.from_user.id))
    user = result.scalar_one_or_none()
    if user is None:
        await callback.answer(t(locale, "NOT_REGISTERED"), show_alert=True)
        return
    lang = user.locale if user.locale in {"ru", "en"} else locale
    await _edit_payment_flow_message(
        callback.message,
        lang=lang,
        text=_referral_followup_text(user, lang, callback.from_user.id),
        reply_markup=None,
    )
    await callback.answer()


@router.callback_query(F.data == PAY_STARS_FOREVER_CB)
async def pay_stars_forever_handler(
    callback: CallbackQuery,
    session: AsyncSession,
    locale: str,
) -> None:
    if callback.from_user is None:
        await callback.answer()
        return
    result = await session.execute(select(User).where(User.tg_id == callback.from_user.id))
    user = result.scalar_one_or_none()
    if user is None:
        await callback.answer(t(locale, "NOT_REGISTERED"), show_alert=True)
        return
    lang = user.locale if user.locale in {"ru", "en"} else locale
    if user.lifetime_subscription:
        await callback.answer(t(lang, "STARS_PAY_ALREADY_LIFETIME"), show_alert=True)
        return
    amt = _forever_stars_amount(user)
    payload = _stars_invoice_payload(user, amt)
    try:
        await callback.bot.send_invoice(
            chat_id=callback.from_user.id,
            title=t(lang, "INV_STARS_FOREVER_TITLE"),
            description=t(lang, "INV_STARS_FOREVER_DESC"),
            payload=payload,
            currency="XTR",
            prices=[LabeledPrice(label=t(lang, "INV_STARS_FOREVER_PRICE_LABEL"), amount=amt)],
            provider_token="",
        )
    except Exception as exc:  # noqa: BLE001
        logger.warning("send_invoice Stars Forever: %s", exc)
        await callback.bot.send_message(callback.from_user.id, t(lang, "STARS_INVOICE_SEND_FAIL"))
    await callback.answer()


@router.pre_checkout_query()
async def stars_forever_pre_checkout(
    pre_checkout_query: PreCheckoutQuery,
    session: AsyncSession,
    locale: str,
) -> None:
    _ = locale
    if pre_checkout_query.from_user is None:
        await pre_checkout_query.answer(ok=False, error_message=t("ru", "STARS_PRECHECK_FAIL")[:250])
        return
    parsed = _parse_stars_payload(pre_checkout_query.invoice_payload or "")
    if parsed is None:
        await pre_checkout_query.answer(ok=False, error_message=t("ru", "STARS_PRECHECK_FAIL")[:250])
        return
    uid_int, claimed_amt = parsed
    result = await session.execute(select(User).where(User.id == uid_int))
    user = result.scalar_one_or_none()
    if user is None or user.tg_id != pre_checkout_query.from_user.id:
        await pre_checkout_query.answer(ok=False, error_message=t("ru", "STARS_PRECHECK_FAIL")[:250])
        return
    lg = user.locale if user.locale in {"ru", "en"} else "ru"
    expected = _forever_stars_amount(user)
    if claimed_amt != expected or pre_checkout_query.total_amount != expected:
        await pre_checkout_query.answer(ok=False, error_message=t(lg, "STARS_PRECHECK_FAIL")[:250])
        return
    if user.lifetime_subscription:
        await pre_checkout_query.answer(
            ok=False,
            error_message=t(lg, "STARS_PAY_ALREADY_LIFETIME")[:250],
        )
        return
    if (pre_checkout_query.currency or "").upper() != "XTR":
        await pre_checkout_query.answer(ok=False, error_message=t(lg, "STARS_PRECHECK_FAIL")[:250])
        return
    await pre_checkout_query.answer(ok=True)


@router.message(F.content_type == ContentType.SUCCESSFUL_PAYMENT)
async def stars_forever_successful_payment(
    message: Message,
    session: AsyncSession,
    locale: str,
) -> None:
    _ = locale
    if message.from_user is None or message.successful_payment is None:
        return
    sp = message.successful_payment
    if (sp.currency or "").upper() != "XTR":
        return
    parsed = _parse_stars_payload(sp.invoice_payload or "")
    if parsed is None:
        return
    uid_int, claimed_amt = parsed
    result = await session.execute(select(User).where(User.id == uid_int))
    user = result.scalar_one_or_none()
    if user is None or user.tg_id != message.from_user.id:
        return
    if claimed_amt != sp.total_amount:
        return
    allowed = {int(settings.STARS_FOREVER_FULL), int(settings.STARS_FOREVER_DISCOUNT)}
    if claimed_amt not in allowed:
        return
    lang = user.locale if user.locale in {"ru", "en"} else "ru"
    if not user.lifetime_subscription:
        subscription_service.grant_lifetime(user)
    vip_block = await _vip_invite_block_html(message.bot, lang)
    await message.answer(
        t(lang, "PAYMENT_STARS_FOREVER_OK", vip_block=vip_block),
        parse_mode="HTML",
    )
