"""Inline-клавиатуры."""

from __future__ import annotations

from aiogram.types import InlineKeyboardButton, InlineKeyboardMarkup

from brainboosty_hook_bot.src.locale import t

# --- Анкета: цели (callback_data = qs:<key>) ---
SKILL_CALLBACK_PREFIX = "qs:"

_SKILL_KEYS = (
    "self_control",
    "sociability",
    "speech",
    "reduce_anxiety",
    "sexual_diversity",
)

SUB_OFFER_CB = "sub:offer"
PDF_CB_PREFIX = "pdf:"
CHECK_CHANNEL_SUB_CB = "ch:verify"
RESUME_COGNITIVE_CB = "resume:cog"
ACCESS_NOT_READY_CB = "acc:nr"
ACCESS_CH15_YES_CB = "acc:y15"
ACCESS_CH15_NO_CB = "acc:n15"
VERIFY_CH_PROMO_CB = "acc:chp"
ACCESS_SHOW_REF_CB = "acc:ref"
LANG_PREFIX = "lang:"
QUEST_LANG_PREFIX = "qlang:"


def questionnaire_skill_kb(lang: str) -> InlineKeyboardMarkup:
    rows: list[list[InlineKeyboardButton]] = []
    keys = list(_SKILL_KEYS)
    for i in range(0, len(keys), 2):
        chunk = keys[i : i + 2]
        rows.append(
            [
                InlineKeyboardButton(text=t(lang, f"SKILL_{k}"), callback_data=f"{SKILL_CALLBACK_PREFIX}{k}")
                for k in chunk
            ],
        )
    return InlineKeyboardMarkup(inline_keyboard=rows)


TIME_CALLBACK_PREFIX = "qt:"


def questionnaire_time_kb(lang: str) -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(text=t(lang, "QUEST_TIME_1_5"), callback_data=f"{TIME_CALLBACK_PREFIX}1-5"),
                InlineKeyboardButton(text=t(lang, "QUEST_TIME_5_15"), callback_data=f"{TIME_CALLBACK_PREFIX}5-15"),
                InlineKeyboardButton(text=t(lang, "QUEST_TIME_15P"), callback_data=f"{TIME_CALLBACK_PREFIX}15+"),
            ],
        ],
    )


# --- Админ-панель ---
ADMIN_CB_ALL = "adm_bc_all"
ADMIN_CB_PREMIUM = "adm_bc_prm"
ADMIN_CB_STATS = "adm_stats"

ADMIN_CONFIRM_YES = "adm_cf_y"
ADMIN_CONFIRM_NO = "adm_cf_n"


def admin_panel_kb(lang: str) -> InlineKeyboardMarkup:
    ru_admin = lang != "en"
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(
                    text="📣 Рассылка всем" if ru_admin else "📣 Broadcast all",
                    callback_data=ADMIN_CB_ALL,
                ),
            ],
            [
                InlineKeyboardButton(
                    text="⭐ Рассылка премиум" if ru_admin else "⭐ Broadcast premium",
                    callback_data=ADMIN_CB_PREMIUM,
                ),
            ],
            [
                InlineKeyboardButton(
                    text="📊 Статистика" if ru_admin else "📊 Stats",
                    callback_data=ADMIN_CB_STATS,
                ),
            ],
        ],
    )


# --- Расширенный опросник: ответы A–D (callback_data = cg:<n>:<A-D>) ---
COGNITIVE_CB_PREFIX = "cg:"


# --- Выбор стилистики теста (callback_data = tv:sexual | tv:development) ---
TEST_VARIANT_PREFIX = "tv:"


def test_variant_choice_kb(lang: str) -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [InlineKeyboardButton(text=t(lang, "TEST_STYLE_SEXUAL_BTN"), callback_data=f"{TEST_VARIANT_PREFIX}sexual")],
            [InlineKeyboardButton(text=t(lang, "TEST_STYLE_DEV_BTN"), callback_data=f"{TEST_VARIANT_PREFIX}development")],
        ],
    )


def cognitive_answer_kb(question_num: int) -> InlineKeyboardMarkup:
    prefix = COGNITIVE_CB_PREFIX
    row = [
        InlineKeyboardButton(text="A", callback_data=f"{prefix}{question_num}:A"),
        InlineKeyboardButton(text="B", callback_data=f"{prefix}{question_num}:B"),
        InlineKeyboardButton(text="C", callback_data=f"{prefix}{question_num}:C"),
        InlineKeyboardButton(text="D", callback_data=f"{prefix}{question_num}:D"),
    ]
    return InlineKeyboardMarkup(inline_keyboard=[row])


def admin_confirm_broadcast_kb(lang: str) -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(text=t(lang, "BROADCAST_CONFIRM_YES"), callback_data=ADMIN_CONFIRM_YES),
                InlineKeyboardButton(text=t(lang, "BROADCAST_CONFIRM_NO"), callback_data=ADMIN_CONFIRM_NO),
            ],
        ],
    )


def access_postpone_discount_kb(lang: str) -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [InlineKeyboardButton(text=t(lang, "BTN_ACCESS_CH15_YES"), callback_data=ACCESS_CH15_YES_CB)],
            [InlineKeyboardButton(text=t(lang, "BTN_ACCESS_CH15_NO"), callback_data=ACCESS_CH15_NO_CB)],
        ],
    )


def access_verify_promo_kb(lang: str, channel_url: str) -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [InlineKeyboardButton(text=t(lang, "BTN_OPEN_PREMIUM_CHANNEL"), url=channel_url)],
            [InlineKeyboardButton(text=t(lang, "BTN_VERIFY_CH_PROMO"), callback_data=VERIFY_CH_PROMO_CB)],
        ],
    )


def access_show_ref_kb(lang: str) -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [InlineKeyboardButton(text=t(lang, "BTN_ACCESS_SHOW_REF"), callback_data=ACCESS_SHOW_REF_CB)],
        ],
    )


def post_teaser_kb(lang: str) -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(text=t(lang, "BTN_GET_PDF"), callback_data=f"{PDF_CB_PREFIX}last"),
                InlineKeyboardButton(text=t(lang, "BTN_UNLOCK_FULL"), callback_data=SUB_OFFER_CB),
            ],
        ],
    )


def cognitive_resume_kb(lang: str) -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [InlineKeyboardButton(text=t(lang, "BTN_RESUME_TEST"), callback_data=RESUME_COGNITIVE_CB)],
        ],
    )


def channel_trial_cta_kb(lang: str, channel_url: str) -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [InlineKeyboardButton(text=t(lang, "BTN_OPEN_PREMIUM_CHANNEL"), url=channel_url)],
            [InlineKeyboardButton(text=t(lang, "BTN_CHECK_CHANNEL_SUB"), callback_data=CHECK_CHANNEL_SUB_CB)],
        ],
    )


def lang_pick_kb(lang: str) -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(text=t(lang, "LANG_RU"), callback_data=f"{LANG_PREFIX}ru"),
                InlineKeyboardButton(text=t(lang, "LANG_EN"), callback_data=f"{LANG_PREFIX}en"),
            ],
        ],
    )


def start_lang_pick_kb() -> InlineKeyboardMarkup:
    """Первый шаг онбординга: подписи на русском (интерфейс по умолчанию — RU)."""
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(text=t("ru", "LANG_RU"), callback_data=f"{QUEST_LANG_PREFIX}ru"),
                InlineKeyboardButton(text=t("ru", "LANG_EN"), callback_data=f"{QUEST_LANG_PREFIX}en"),
            ],
        ],
    )
