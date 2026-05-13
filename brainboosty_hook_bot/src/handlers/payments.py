"""Оплата Telegram Stars и кнопки на Tribute; выдача подписки."""

from __future__ import annotations

import logging
from datetime import datetime, timezone

from aiogram import Bot, F, Router
from aiogram.exceptions import TelegramBadRequest
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
from brainboosty_hook_bot.src.keyboards.reply import main_reply_kb
from brainboosty_hook_bot.src.keyboards.inline import (
    ACCESS_CHANNEL_15_PITCH_CB,
    ACCESS_CH15_NO_CB,
    ACCESS_CH15_YES_CB,
    ACCESS_NOT_READY_CB,
    ACCESS_SHOW_REF_CB,
    PAY_BACK_TARIFF_CB,
    PAY_PLAN_PREFIX,
    PAY_STARS_PREFIX,
    SUB_OFFER_CB,
    VERIFY_CH_PROMO_CB,
    access_postpone_discount_kb,
    access_show_ref_kb,
    access_tariff_choice_kb,
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


PAYLOAD_XTR_MONTH = "bb_xtr_m790"
PAYLOAD_XTR_MONTH_DISC = "bb_xtr_m672"
PAYLOAD_XTR_FOREVER_FULL = "bb_xtr_f3900"
PAYLOAD_XTR_FOREVER_DISC = "bb_xtr_f2490"


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


def build_access_payment_method_keyboard(user: User, lang: str, plan: str) -> InlineKeyboardMarkup:
    """Шаг 2: Stars, Tribute, опционально −15% / канал, назад к тарифам."""
    rows: list[list[InlineKeyboardButton]] = []
    if plan == "month":
        rows.append(
            [InlineKeyboardButton(text=t(lang, "BTN_STARS_MONTH"), callback_data=f"{PAY_STARS_PREFIX}month")],
        )
    elif plan == "forever":
        rows.append(
            [InlineKeyboardButton(text=t(lang, "BTN_STARS_FOREVER"), callback_data=f"{PAY_STARS_PREFIX}forever")],
        )
    app = settings.TRIBUTE_APP_URL.strip()
    if app:
        rows.append([InlineKeyboardButton(text=t(lang, "BTN_TRIBUTE_APP"), url=app)])
    if plan == "month" and settings.TRIBUTE_APP_URL_PROMO_15.strip():
        rows.append(
            [
                InlineKeyboardButton(
                    text=t(lang, "BTN_TRIBUTE_MONTH_15"),
                    url=settings.TRIBUTE_APP_URL_PROMO_15.strip(),
                ),
            ],
        )
    if plan == "month" and _show_channel_15_offer(user):
        rows.append(
            [
                InlineKeyboardButton(
                    text=t(lang, "BTN_ACCESS_CHANNEL_15_OFFER"),
                    callback_data=ACCESS_CHANNEL_15_PITCH_CB,
                ),
            ],
        )
    rows.append([InlineKeyboardButton(text=t(lang, "BTN_PAY_STEP_BACK"), callback_data=PAY_BACK_TARIFF_CB)])
    return InlineKeyboardMarkup(inline_keyboard=rows)


def access_payment_step_html(lang: str, user: User, plan: str) -> str:
    lg = lang if lang in {"ru", "en"} else (user.locale if user.locale in {"ru", "en"} else "ru")
    if plan == "month":
        body = t(lg, "PAY_STEP2_MONTH_INTRO_HTML")
        return body
    if plan == "forever":
        if subscription_service.discount_active(user):
            tl = subscription_service.test_discount_time_left_phrase(lg, user)
            return t(lg, "PAY_STEP2_FOREVER_INTRO_DISC_HTML", time_left=tl or "—")
        return t(lg, "PAY_STEP2_FOREVER_INTRO_HTML")
    return t(lg, "ACCESS_PRICING_BODY")


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
    plan = callback.data.removeprefix(PAY_PLAN_PREFIX)
    if plan not in ("month", "forever"):
        await callback.answer()
        return
    result = await session.execute(select(User).where(User.tg_id == callback.from_user.id))
    user = result.scalar_one_or_none()
    if user is None:
        await callback.answer(t(locale, "NOT_REGISTERED"), show_alert=True)
        return
    lang = user.locale if user.locale in {"ru", "en"} else locale
    text = access_payment_step_html(lang, user, plan)
    kb = build_access_payment_method_keyboard(user, lang, plan)
    await _edit_payment_flow_message(callback.message, lang=lang, text=text, reply_markup=kb)
    await callback.answer()


@router.callback_query(F.data == PAY_BACK_TARIFF_CB)
async def access_pay_back_tariff_handler(
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
    lg = lang if lang in {"ru", "en"} else (user.locale if user.locale in {"ru", "en"} else "ru")
    text = access_pricing_html(lg, user)
    await _edit_payment_flow_message(
        callback.message,
        lang=lang,
        text=text,
        reply_markup=access_tariff_choice_kb(lg),
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
    """Повторно открыть сценарий −15% на месяц (как после «Пока не готов»), если промо ещё не активировано."""
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
            tl = subscription_service.test_discount_time_left_phrase(lang, user)
            desc = t(lang, "INV_FOREVER_DISC_DESC", time_left=tl or "—")
            await callback.bot.send_invoice(
                chat_id=callback.from_user.id,
                title=t(lang, "INV_FOREVER_DISC_TITLE"),
                description=desc,
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

    try:
        await callback.message.edit_reply_markup(reply_markup=None)
    except Exception as exc:  # noqa: BLE001
        logger.debug("clear payment inline kb: %s", exc)

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

    paid = subscription_service.user_has_paid_access(user)
    await message.answer(
        t(lang, "PAYMENT_SUCCESS"),
        reply_markup=main_reply_kb(lang, paid_access=paid, show_retest=paid),
    )
