"""Обработчики reply-меню (главная клавиатура)."""

from __future__ import annotations

import logging

from aiogram import F, Router
from aiogram.fsm.context import FSMContext
from aiogram.types import BufferedInputFile, CallbackQuery, Message, ReplyKeyboardRemove
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from brainboosty_hook_bot.src.config.config import settings
from brainboosty_hook_bot.src.database.models import BrainRegionSnapshot, User
from brainboosty_hook_bot.src.handlers.cognitive import prompt_test_style_choice
from brainboosty_hook_bot.src.handlers.payments import send_subscription_offer
from brainboosty_hook_bot.src.keyboards.inline import PDF_CB_PREFIX, post_teaser_kb
from brainboosty_hook_bot.src.keyboards.reply import main_reply_kb
from brainboosty_hook_bot.src.locale import t
from brainboosty_hook_bot.src.locale.filters import all_lang
from brainboosty_hook_bot.src.services.about_photo import resolve_about_photo_path
from brainboosty_hook_bot.src.services.brain_regions_display import (
    format_brain_map_with_comparison,
    snapshot_to_scores,
)
from brainboosty_hook_bot.src.services.brain_result_delivery import deliver_brain_map_pdf
from brainboosty_hook_bot.src.services.subscription_service import user_has_paid_access
from brainboosty_hook_bot.src.services.teaser_service import generate_teaser_recommendations
from brainboosty_hook_bot.src.utils.flow_chat import flow_remember

router = Router(name="menu")
logger = logging.getLogger(__name__)


async def _fetch_user(session: AsyncSession, tg_id: int) -> User | None:
    result = await session.execute(select(User).where(User.tg_id == tg_id))
    return result.scalar_one_or_none()


async def _fetch_last_snapshots(
    session: AsyncSession,
    user_id: int,
    *,
    limit: int,
) -> list[BrainRegionSnapshot]:
    stmt = (
        select(BrainRegionSnapshot)
        .where(BrainRegionSnapshot.user_id == user_id)
        .order_by(BrainRegionSnapshot.created_at.desc())
        .limit(limit)
    )
    result = await session.execute(stmt)
    return list(result.scalars().all())


def _brain_title(lang: str, variant: str) -> str:
    if variant == "sexual":
        return t(lang, "BRAIN_MAP_TITLE_SEXUAL_BLOCK")
    return t(lang, "BRAIN_MAP_TITLE_DEVELOPMENT_BLOCK")


@router.message(F.text.in_(all_lang("REPLY_BRAIN_MAP")))
async def menu_brain_map(message: Message, session: AsyncSession, locale: str) -> None:
    if message.from_user is None:
        return

    user = await _fetch_user(session, message.from_user.id)
    if user is None:
        await message.answer(t(locale, "NOT_REGISTERED"))
        return

    lang = user.locale if user.locale in {"ru", "en"} else locale

    snaps = await _fetch_last_snapshots(session, user.id, limit=2)
    if not snaps:
        await message.answer(t(lang, "NO_BRAIN_MAP_YET"))
        return

    latest = snaps[0]
    previous = snaps[1] if len(snaps) > 1 else None
    title = _brain_title(lang, latest.test_variant)
    scores = snapshot_to_scores(latest)

    if user_has_paid_access(user):
        text = format_brain_map_with_comparison(
            scores,
            snapshot_to_scores(previous) if previous is not None else None,
            title=title,
            lang=lang,
        )
    else:
        text = generate_teaser_recommendations(
            lang,
            scores,
            is_sexual=(latest.test_variant == "sexual"),
            price=2490,
        )
        await message.answer(
            text,
            parse_mode="HTML",
            reply_markup=post_teaser_kb(lang),
        )
        return

    await message.answer(
        text,
        parse_mode="HTML",
        reply_markup=main_reply_kb(
            lang,
            paid_access=user_has_paid_access(user),
            show_retest=user_has_paid_access(user),
        ),
    )


@router.message(F.text.in_(all_lang("REPLY_RETAKE_TEST")))
async def menu_retake_test(message: Message, state: FSMContext, session: AsyncSession, locale: str) -> None:
    if message.from_user is None:
        return

    user = await _fetch_user(session, message.from_user.id)
    if user is None:
        await message.answer(t(locale, "NOT_REGISTERED"))
        return

    lang = user.locale if user.locale in {"ru", "en"} else locale

    if not user_has_paid_access(user):
        await message.answer(t(lang, "RETEST_LOCKED"))
        return

    snaps = await _fetch_last_snapshots(session, user.id, limit=1)
    if not snaps:
        await message.answer(t(lang, "NO_BRAIN_MAP_YET"))
        return

    m_intro = await message.answer(t(lang, "RETEST_INTRO"), reply_markup=ReplyKeyboardRemove())
    await flow_remember(state, m_intro.message_id)
    await prompt_test_style_choice(state, lang, message=message)


@router.message(F.text.in_(all_lang("REPLY_GET_ACCESS")))
async def menu_get_access(message: Message, session: AsyncSession, locale: str) -> None:
    if message.from_user is None:
        return

    user = await _fetch_user(session, message.from_user.id)
    if user is None:
        await message.answer(t(locale, "NOT_REGISTERED"))
        return

    lang = user.locale if user.locale in {"ru", "en"} else locale

    if user.lifetime_subscription or user_has_paid_access(user):
        await message.answer(
            t(lang, "ACCESS_ALREADY_PREMIUM"),
            reply_markup=main_reply_kb(
                lang,
                paid_access=user_has_paid_access(user),
                show_retest=user_has_paid_access(user),
            ),
        )
        return

    await send_subscription_offer(message.bot, message.chat.id, session, user, lang)


@router.message(F.text.in_(all_lang("REPLY_ABOUT")))
async def menu_about(message: Message, session: AsyncSession, locale: str) -> None:
    _ = session
    if message.from_user is None:
        return
    user = await _fetch_user(session, message.from_user.id)
    lang = user.locale if user and user.locale in {"ru", "en"} else locale
    show_re = bool(user and user_has_paid_access(user))

    photo_path = resolve_about_photo_path()
    kb = main_reply_kb(lang, paid_access=show_re, show_retest=show_re)
    caption = t(lang, "ABOUT_PROJECT")

    if photo_path is not None:
        try:
            raw = photo_path.read_bytes()
        except OSError as exc:
            logger.warning("About photo unreadable %s: %s", photo_path, exc)
            await message.answer(caption, reply_markup=kb, parse_mode="HTML")
            return
        await message.reply_photo(
            photo=BufferedInputFile(raw, filename=photo_path.name),
            caption=caption,
            reply_markup=kb,
            parse_mode="HTML",
        )
    else:
        logger.warning(
            "About photo not found. Add assets/author.jpg (or set ABOUT_PHOTO_PATH in .env).",
        )
        await message.answer(caption, reply_markup=kb, parse_mode="HTML")


@router.callback_query(F.data == f"{PDF_CB_PREFIX}last")
async def menu_pdf_last(callback: CallbackQuery, session: AsyncSession, locale: str) -> None:
    if callback.from_user is None or callback.message is None:
        await callback.answer()
        return

    user = await _fetch_user(session, callback.from_user.id)
    if user is None:
        await callback.answer(t(locale, "NOT_REGISTERED"), show_alert=True)
        return

    lang = user.locale if user.locale in {"ru", "en"} else locale
    paid = user_has_paid_access(user)

    stmt = (
        select(BrainRegionSnapshot)
        .where(BrainRegionSnapshot.user_id == user.id)
        .order_by(BrainRegionSnapshot.created_at.desc())
        .limit(1)
    )
    snap = (await session.execute(stmt)).scalar_one_or_none()
    if snap is None:
        await callback.answer(t(lang, "NO_BRAIN_MAP_YET"), show_alert=True)
        return

    await callback.answer()
    await deliver_brain_map_pdf(
        callback.message.bot,
        callback.message.chat.id,
        session,
        user,
        lang,
        scores=snapshot_to_scores(snap),
        test_variant=snap.test_variant,
        paid=paid,
        reply_markup=None,
        detail_json=snap.detail_json if isinstance(snap.detail_json, dict) else None,
    )
