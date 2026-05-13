"""Точка входа /start."""

from __future__ import annotations

from aiogram import Router
from aiogram.filters import CommandStart
from aiogram.fsm.context import FSMContext
from aiogram.types import Message
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from brainboosty_hook_bot.src.database.models import User
from brainboosty_hook_bot.src.handlers.questionnaire import QuestStates
from brainboosty_hook_bot.src.keyboards.inline import cognitive_resume_kb, start_lang_pick_kb
from brainboosty_hook_bot.src.keyboards.reply import main_reply_kb
from brainboosty_hook_bot.src.locale import t
from brainboosty_hook_bot.src.services.subscription_service import user_has_paid_access
from brainboosty_hook_bot.src.utils.flow_chat import flow_remember
from brainboosty_hook_bot.src.utils.helpers import build_ref_link, parse_start_payload

router = Router(name="start")


async def _get_user(session: AsyncSession, tg_id: int) -> User | None:
    result = await session.execute(select(User).where(User.tg_id == tg_id))
    return result.scalar_one_or_none()


@router.message(CommandStart())
async def cmd_start(message: Message, state: FSMContext, session: AsyncSession, locale: str) -> None:
    if message.from_user is None:
        return

    parts = (message.text or "").split(maxsplit=1)
    payload = parts[1].strip() if len(parts) > 1 else None
    pending_ref = parse_start_payload(payload)

    user = await _get_user(session, message.from_user.id)
    cur = await state.get_state()
    cur_s = str(cur) if cur else ""
    in_cognitive_fsm = "CognitiveStates" in cur_s

    if user is not None and not user.cognitive_completed:
        await state.update_data(pending_referrer_tg_id=pending_ref)
        lang = user.locale if user.locale in {"ru", "en"} else locale
        if in_cognitive_fsm:
            await message.answer(t(lang, "START_UNFINISHED_TEST"), reply_markup=cognitive_resume_kb(lang))
            return
        await state.clear()
        await state.update_data(pending_referrer_tg_id=pending_ref)
        await message.answer(t(lang, "START_UNFINISHED_TEST"), reply_markup=cognitive_resume_kb(lang))
        return

    await state.clear()
    await state.update_data(pending_referrer_tg_id=pending_ref)

    if user:
        ref_link = build_ref_link(message.from_user.id)
        lang = user.locale if user.locale in {"ru", "en"} else locale
        await message.answer(
            t(lang, "START_ALREADY", name=user.first_name, ref_link=ref_link),
            reply_markup=main_reply_kb(lang, show_retest=user_has_paid_access(user)),
        )
        return

    await state.set_state(QuestStates.language)
    try:
        await message.delete()
    except Exception:
        pass
    sent = await message.answer(t("ru", "LANG_PROMPT"), reply_markup=start_lang_pick_kb())
    await flow_remember(state, sent.message_id)
