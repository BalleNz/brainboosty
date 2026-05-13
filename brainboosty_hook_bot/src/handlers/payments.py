"""Оплата Telegram Stars и кнопки на Tribute; выдача подписки."""

from __future__ import annotations

import logging
from datetime import datetime, timezone

from aiogram import Bot, F, Router
from aiogram.filters import BaseFilter
from aiogram.types import (
    CallbackQuery,
    InlineKeyboardButton,
    InlineKeyboardMarkup,
    LabeledPrice,
    Message,
    PreCheckoutQuery,
)
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from brainboosty_hook_bot.src.config.config import settings
from brainboosty_hook_bot.src.database.models import User
from brainboosty_hook_bot.src.keyboards.inline import (
    ACCESS_CH15_NO_CB,
    ACCESS_CH15_YES_CB,
    ACCESS_NOT_READY_CB,
    ACCESS_SHOW_REF_CB,
    SUB_OFFER_CB,
    VERIFY_CH_PROMO_CB,
    access_postpone_discount_kb,
    access_show_ref_kb,
    access_verify_promo_kb,
)
from brainboosty_hook_bot.src.locale import t
from brainboosty_hook_bot.src.services import subscription_service
from brainboosty_hook_bot.src.services.channel_membership import user_is_channel_member
from brainboosty_hook_bot.src.utils.helpers import build_ref_link

logger = logging.getLogger(__name__)

router = Router(name="payments")


class _HasSuccessfulPayment(BaseFilter):
    async def __call__(self, message: Message) -> bool:
        return message.successful_payment is not None


PAY_STARS_PREFIX = "pay_st:"

PAYLOAD_XTR_MONTH = "bb_xtr_m790"
PAYLOAD_XTR_MONTH_DISC = "bb_xtr_m672"
PAYLOAD_XTR_FOREVER_FULL = "bb_xtr_f3900"
PAYLOAD_XTR_FOREVER_DISC = "bb_xtr_f2490"


def access_pricing_html(lang: str) -> str:
    return t(lang, "ACCESS_PRICING_BODY")


def build_access_pricing_keyboard(user: User, lang: str) -> InlineKeyboardMarkup:
    rows: list[list[InlineKeyboardButton]] = [
        [
            InlineKeyboardButton(
                text=t(lang, "BTN_STARS_MONTH"),
                callback_data=f"{PAY_STARS_PREFIX}month",
            ),
        ],
        [
            InlineKeyboardButton(
                text=t(lang, "BTN_STARS_FOREVER"),
                callback_data=f"{PAY_STARS_PREFIX}forever",
            ),
        ],
    ]
    if settings.TRIBUTE_APP_URL.strip():
        rows.append(
            [InlineKeyboardButton(text=t(lang, "BTN_TRIBUTE_APP"), url=settings.TRIBUTE_APP_URL.strip())],
        )
    if settings.TRIBUTE_APP_URL_PROMO_15.strip():
        rows.append(
            [
                InlineKeyboardButton(
                    text=t(lang, "BTN_TRIBUTE_MONTH_15"),
                    url=settings.TRIBUTE_APP_URL_PROMO_15.strip(),
                ),
            ],
        )
    rows.append(
        [InlineKeyboardButton(text=t(lang, "BTN_ACCESS_NOT_READY"), callback_data=ACCESS_NOT_READY_CB)],
    )
    return InlineKeyboardMarkup(inline_keyboard=rows)


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


async def send_subscription_offer(
    bot: Bot,
    chat_id: int,
    session: AsyncSession,
    user: User,
    lang: str,
) -> None:
    """Одно сообщение с тарифами (кнопка «Доступ», после теста, из тизера)."""
    _ = session
    lg = lang if lang in {"ru", "en"} else (user.locale if user.locale in {"ru", "en"} else "ru")
    try:
        await bot.send_message(
            chat_id=chat_id,
            text=access_pricing_html(lg),
            reply_markup=build_access_pricing_keyboard(user, lg),
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
    await callback.message.answer(
        t(lang, "ACCESS_POSTPONE_DISCOUNT_PITCH"),
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
    await callback.message.answer(
        t(lang, "ACCESS_SUBSCRIBE_FOR_PROMO"),
        reply_markup=access_verify_promo_kb(lang, settings.premium_channel_url),
        parse_mode="HTML",
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
    await callback.message.answer(
        t(lang, "ACCESS_REF_AFTER_NO_HTML"),
        reply_markup=access_show_ref_kb(lang),
        parse_mode="HTML",
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
    await callback.message.answer(
        t(lang, "ACCESS_PROMO_GRANTED", code=code),
        parse_mode="HTML",
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
    await callback.message.answer(
        _referral_followup_text(user, lang, callback.from_user.id),
        parse_mode="HTML",
    )
    await callback.answer()


@router.callback_query(F.data.startswith(PAY_STARS_PREFIX))
async def stars_pay_callback(callback: CallbackQuery, session: AsyncSession, locale: str) -> None:
    if callback.from_user is None or callback.message is None:
        await callback.answer()
        return

    kind = callback.data.removeprefix(PAY_STARS_PREFIX)
    result = await session.execute(select(User).where(User.tg_id == callback.from_user.id))
    user = result.scalar_one_or_none()
    if user is None:
        await callback.answer(t(locale, "NOT_REGISTERED"), show_alert=True)
        return

    lang = user.locale if user.locale in {"ru", "en"} else locale

    if kind == "month":
        use_disc = subscription_service.channel_month_15_discount_active(user) and await user_is_channel_member(
            callback.bot,
            callback.from_user.id,
        )
        if use_disc:
            await callback.bot.send_invoice(
                chat_id=callback.from_user.id,
                title=t(lang, "INV_MONTH_DISC_TITLE"),
                description=t(lang, "INV_MONTH_DISC_DESC"),
                payload=PAYLOAD_XTR_MONTH_DISC,
                provider_token="",
                currency="XTR",
                prices=[LabeledPrice(label=t(lang, "INV_MONTH_LABEL_DISC"), amount=672)],
            )
        else:
            await callback.bot.send_invoice(
                chat_id=callback.from_user.id,
                title=t(lang, "INV_MONTH_TITLE"),
                description=t(lang, "INV_MONTH_DESC"),
                payload=PAYLOAD_XTR_MONTH,
                provider_token="",
                currency="XTR",
                prices=[LabeledPrice(label=t(lang, "INV_MONTH_LABEL"), amount=790)],
            )
    elif kind == "forever":
        disc = subscription_service.discount_active(user)
        if disc:
            await callback.bot.send_invoice(
                chat_id=callback.from_user.id,
                title=t(lang, "INV_FOREVER_DISC_TITLE"),
                description=t(lang, "INV_FOREVER_DISC_DESC"),
                payload=PAYLOAD_XTR_FOREVER_DISC,
                provider_token="",
                currency="XTR",
                prices=[LabeledPrice(label=t(lang, "INV_FOREVER_LABEL"), amount=2490)],
            )
        else:
            await callback.bot.send_invoice(
                chat_id=callback.from_user.id,
                title=t(lang, "INV_FOREVER_TITLE"),
                description=t(lang, "INV_FOREVER_DESC"),
                payload=PAYLOAD_XTR_FOREVER_FULL,
                provider_token="",
                currency="XTR",
                prices=[LabeledPrice(label=t(lang, "INV_FOREVER_LABEL"), amount=3900)],
            )
    else:
        await callback.answer()
        return

    await callback.answer()


@router.pre_checkout_query()
async def pre_checkout_handler(pre_checkout_query: PreCheckoutQuery) -> None:
    await pre_checkout_query.answer(ok=True)


@router.message(_HasSuccessfulPayment())
async def successful_payment_handler(message: Message, session: AsyncSession, locale: str) -> None:
    if message.from_user is None or message.successful_payment is None:
        return

    pay = message.successful_payment
    payload = pay.invoice_payload

    result = await session.execute(select(User).where(User.tg_id == message.from_user.id))
    user = result.scalar_one_or_none()
    if user is None:
        await message.answer(t(locale, "NOT_REGISTERED"))
        return

    lang = user.locale if user.locale in {"ru", "en"} else locale

    if payload in (PAYLOAD_XTR_MONTH, PAYLOAD_XTR_MONTH_DISC):
        subscription_service.grant_monthly(user)
    elif payload in (PAYLOAD_XTR_FOREVER_FULL, PAYLOAD_XTR_FOREVER_DISC):
        subscription_service.grant_lifetime(user)
    else:
        logger.warning("Unknown payment payload: %s", payload)
        await message.answer(t(lang, "PAYMENT_UNKNOWN"))
        return

    await message.answer(t(lang, "PAYMENT_SUCCESS"))
