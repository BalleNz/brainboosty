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

_SKILL_BTN_EMOJI: dict[str, str] = {
    "self_control": "💪",
    "sociability": "👥",
    "speech": "🗣️",
    "reduce_anxiety": "😌",
    "sexual_diversity": "🔞",
}

QUEST_SKILL_KEY_SET: frozenset[str] = frozenset(_SKILL_KEYS)

SUB_OFFER_CB = "sub:offer"
PDF_CB_PREFIX = "pdf:"
STEST_HUB_PREFIX = "sth:"
STEST_ANS_PREFIX = "sta:"
CHECK_CHANNEL_SUB_CB = "ch:verify"
RESUME_COGNITIVE_CB = "resume:cog"
RESET_ACCOUNT_CONFIRM_CB = "reset:yes"
ACCESS_NOT_READY_CB = "acc:nr"
ACCESS_CHANNEL_15_PITCH_CB = "acc:p15"
ACCESS_CH15_YES_CB = "acc:y15"
ACCESS_CH15_NO_CB = "acc:n15"
VERIFY_CH_PROMO_CB = "acc:chp"
ACCESS_SHOW_REF_CB = "acc:ref"
PAY_PLAN_PREFIX = "pay:pl:"
PAY_BACK_TARIFF_CB = "pay:back"
PAY_STARS_FOREVER_CB = "pay:sf"
LANG_PREFIX = "lang:"
QUEST_LANG_PREFIX = "qlang:"


SKILL_DONE_CALLBACK = f"{SKILL_CALLBACK_PREFIX}__done__"


def questionnaire_skill_kb(
    lang: str,
    *,
    selected: tuple[str, ...] | list[str] = (),
    show_done_button: bool = False,
) -> InlineKeyboardMarkup:
    """Выбранные — префикс ⮕. Онбординг: 1 навык; /skills — до 2. «Далее» — только show_done_button."""
    sel_tuple = tuple(selected) if isinstance(selected, list) else selected
    sel_set = frozenset(sel_tuple)

    def _label(key: str) -> str:
        em = _SKILL_BTN_EMOJI.get(key, "")
        base = t(lang, f"SKILL_{key}")
        line = f"{em} {base}" if em else base
        return f"⮕ {line}" if key in sel_set else line

    def _btn(key: str) -> InlineKeyboardButton:
        return InlineKeyboardButton(text=_label(key), callback_data=f"{SKILL_CALLBACK_PREFIX}{key}")

    keys = list(_SKILL_KEYS)
    # порядок _SKILL_KEYS: 2 + 2 + 1
    rows: list[list[InlineKeyboardButton]] = [
        [_btn(keys[0]), _btn(keys[1])],
        [_btn(keys[2]), _btn(keys[3])],
        [_btn(keys[4])],
    ]
    if show_done_button:
        rows.append([InlineKeyboardButton(text=t(lang, "SKILLS_BTN_DONE"), callback_data=SKILL_DONE_CALLBACK)])
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


# --- Расширенный опросник: ответы A–D (callback_data = cg:<n>:<A-D>), назад: cg:back ---
COGNITIVE_CB_PREFIX = "cg:"
COGNITIVE_BACK_CALLBACK = f"{COGNITIVE_CB_PREFIX}back"


# --- Выбор стилистики теста (callback_data = tv:sexual | tv:development) ---
TEST_VARIANT_PREFIX = "tv:"


def test_variant_choice_kb(lang: str) -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [InlineKeyboardButton(text=t(lang, "TEST_STYLE_SEXUAL_BTN"), callback_data=f"{TEST_VARIANT_PREFIX}sexual")],
            [InlineKeyboardButton(text=t(lang, "TEST_STYLE_DEV_BTN"), callback_data=f"{TEST_VARIANT_PREFIX}development")],
        ],
    )


def cognitive_answer_kb(lang: str, question_num: int) -> InlineKeyboardMarkup:
    prefix = COGNITIVE_CB_PREFIX
    rows: list[list[InlineKeyboardButton]] = [
        [
            InlineKeyboardButton(text="A", callback_data=f"{prefix}{question_num}:A"),
            InlineKeyboardButton(text="B", callback_data=f"{prefix}{question_num}:B"),
            InlineKeyboardButton(text="C", callback_data=f"{prefix}{question_num}:C"),
            InlineKeyboardButton(text="D", callback_data=f"{prefix}{question_num}:D"),
        ],
        [InlineKeyboardButton(text=t(lang, "BTN_TEST_BACK"), callback_data=COGNITIVE_BACK_CALLBACK)],
    ]
    return InlineKeyboardMarkup(inline_keyboard=rows)


def tests_hub_inline_kb(lang: str, *, paid_access: bool = True) -> InlineKeyboardMarkup:
    rows: list[list[InlineKeyboardButton]] = []
    if paid_access:
        rows.append([InlineKeyboardButton(text=t(lang, "TESTS_BTN_DAILY"), callback_data=f"{STEST_HUB_PREFIX}day")])
    rows.append([InlineKeyboardButton(text=t(lang, "TESTS_BTN_WEEKLY"), callback_data=f"{STEST_HUB_PREFIX}week")])
    if paid_access:
        rows.append(
            [InlineKeyboardButton(text=t(lang, "TESTS_BTN_HISTORY_PDF"), callback_data=f"{STEST_HUB_PREFIX}pdf")],
        )
    return InlineKeyboardMarkup(inline_keyboard=rows)


def scheduled_test_answer_kb(lang: str, shared_test_id: int, question_num: int) -> InlineKeyboardMarkup:
    p = STEST_ANS_PREFIX
    rows: list[list[InlineKeyboardButton]] = [
        [
            InlineKeyboardButton(text="A", callback_data=f"{p}{shared_test_id}:{question_num}:A"),
            InlineKeyboardButton(text="B", callback_data=f"{p}{shared_test_id}:{question_num}:B"),
            InlineKeyboardButton(text="C", callback_data=f"{p}{shared_test_id}:{question_num}:C"),
            InlineKeyboardButton(text="D", callback_data=f"{p}{shared_test_id}:{question_num}:D"),
        ],
        [InlineKeyboardButton(text=t(lang, "BTN_TEST_BACK"), callback_data=f"{p}{shared_test_id}:back")],
    ]
    return InlineKeyboardMarkup(inline_keyboard=rows)


def admin_confirm_broadcast_kb(lang: str) -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [InlineKeyboardButton(text=t(lang, "BROADCAST_CONFIRM_YES"), callback_data=ADMIN_CONFIRM_YES)],
            [InlineKeyboardButton(text=t(lang, "BROADCAST_CONFIRM_NO"), callback_data=ADMIN_CONFIRM_NO)],
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


def reset_account_confirm_kb(lang: str) -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [InlineKeyboardButton(text=t(lang, "BTN_RESET_CONFIRM"), callback_data=RESET_ACCOUNT_CONFIRM_CB)],
        ],
    )


def access_tariff_choice_kb(lang: str) -> InlineKeyboardMarkup:
    """Шаг 1: пробный период / навсегда / «Пока не готов»."""
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(
                    text=t(lang, "BTN_ACCESS_PLAN_MONTH"),
                    callback_data=f"{PAY_PLAN_PREFIX}month",
                ),
            ],
            [
                InlineKeyboardButton(
                    text=t(lang, "BTN_ACCESS_PLAN_FOREVER"),
                    callback_data=f"{PAY_PLAN_PREFIX}forever",
                ),
            ],
            [InlineKeyboardButton(text=t(lang, "BTN_ACCESS_NOT_READY"), callback_data=ACCESS_NOT_READY_CB)],
        ],
    )


def access_tribute_buy_step_kb(
    lang: str,
    *,
    buy_url: str,
    price_display: str,
    plan: str,
    forever_stars_amount: int | None = None,
) -> InlineKeyboardMarkup:
    """Шаг 2: Tribute + (только forever) Stars + «← Тарифы»."""
    rows: list[list[InlineKeyboardButton]] = []
    u = buy_url.strip()
    if u:
        rows.append(
            [InlineKeyboardButton(text=t(lang, "BTN_BUY_FOR", price=price_display), url=u)],
        )
    if plan == "forever" and forever_stars_amount is not None and forever_stars_amount > 0:
        rows.append(
            [
                InlineKeyboardButton(
                    text=t(lang, "BTN_STARS_FOREVER_AMOUNT", stars=forever_stars_amount),
                    callback_data=PAY_STARS_FOREVER_CB,
                ),
            ],
        )
    rows.append([InlineKeyboardButton(text=t(lang, "BTN_PAY_STEP_BACK"), callback_data=PAY_BACK_TARIFF_CB)])
    return InlineKeyboardMarkup(inline_keyboard=rows)


def post_teaser_kb(lang: str) -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [InlineKeyboardButton(text=t(lang, "BTN_GET_PDF"), callback_data=f"{PDF_CB_PREFIX}last")],
            [InlineKeyboardButton(text=t(lang, "BTN_UNLOCK_FULL"), callback_data=SUB_OFFER_CB)],
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
            [InlineKeyboardButton(text=t(lang, "LANG_RU"), callback_data=f"{LANG_PREFIX}ru")],
            [InlineKeyboardButton(text=t(lang, "LANG_EN"), callback_data=f"{LANG_PREFIX}en")],
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
