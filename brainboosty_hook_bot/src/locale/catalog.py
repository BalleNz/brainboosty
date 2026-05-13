"""Плоский каталог строк ru/en. Ключи — UPPER_SNAKE."""

from __future__ import annotations

RU: dict[str, str] = {
    "THROTTLE_WARNING": "⏳ Слишком часто. Подождите секунду.",
    "CANCELLED": "❌ Действие отменено.",
    "NOT_REGISTERED": "Сначала завершите регистрацию: /start",
    "START_ALREADY": "👋 С возвращением, {name}!\n\nЯ продолжу присылать «хуки» для мозга 🧠✨\nТвоя ссылка:\n{ref_link}",
    "START_UNFINISHED_TEST": "Тест ещё не завершён. Нажми «Продолжить тест» — вернёмся к вопросам (если сессия ещё в памяти бота) или к выбору стиля.",
    "BTN_RESUME_TEST": "▶️ Продолжить тест",
    "START_NEW_INTRO": "🧠 Привет, {name}! Я — BrainBoosty Hook Bot.\n\nКаждый день — короткие практики и инсайты. Сначала анкета, затем тест из 7 вопросов (на выбор стилистика).",
    "QUESTION_SKILL": "🎯 Шаг 1/3. Что хочешь прокачать в первую очередь?",
    "QUESTION_AGE": "🎂 Шаг 2/3. Сколько полных лет? Числом (например, 24).",
    "QUESTION_TIME": "⏱ Шаг 3/3. Сколько минут в день готов уделять?",
    "QUEST_TIME_1_5": "1–5 мин",
    "QUEST_TIME_5_15": "5–15 мин",
    "QUEST_TIME_15P": "15+ мин",
    "AGE_INVALID": "Введи возраст числом от 5 до 120.",
    "QUEST_STAY_ON_STEP": "Продолжаем анкету 😊",
    "COGNITIVE_STAY_ON_STEP": "Продолжаем тест 😊",
    "WELCOME_AFTER_QUEST": "✨ Добро пожаловать!\n\nТеперь я знаю твой фокус. Ожидай ежедневные хуки.\n\n📎 Ссылка для друзей:\n{ref_link}\n\n🎁 За каждого друга с регистрацией — +1 ч полного доступа.",
    "REFERRAL_STATS": "👥 Друзей с регистрацией: {count}\n💎 За каждого — +1 ч полного доступа (время суммируется).",
    "PREMIUM_ACTIVE": "⭐ Премиум до: {until}",
    "PREMIUM_NONE": "Премиум не активен.",
    "PREMIUM_LIFETIME": "♾️ Пожизненный доступ (Forever).",
    "REFERRAL_BONUS_GRANTED": "🎉 Друг зарегистрировался по твоей ссылке — +1 ч полного доступа!",
    "REPLY_BRAIN_MAP": "🗺 Карта мозга",
    "REPLY_GET_ACCESS": "⭐ Доступ",
    "REPLY_ABOUT": "ℹ️ О проекте",
    "REPLY_RETAKE_TEST": "🔄 Перепройти тест",
    "COGNITIVE_STYLE_PROMPT": "Отлично! Теперь выбери стиль первого теста (7 вопросов):",
    "TEST_STYLE_SEXUAL_BTN": "🔥 Сексуальная карта мозга",
    "TEST_STYLE_DEV_BTN": "🧠 Развитие отделов мозга",
    "COGNITIVE_COMPUTING": "⏳ Считаю профиль по зонам…",
    "COGNITIVE_DATA_ERROR": "Не удалось собрать ответы. Начни снова: /start",
    "COGNITIVE_DONE_FALLBACK": "⚠️ Нет связи с AI — показан локальный расчёт.",
    "NO_BRAIN_MAP_YET": "Карты ещё нет. Заверши регистрацию: /start",
    "ABOUT_PROJECT": (
        "<b>Кто я</b>\n\n"
        "Привет, я @androgenautist — <u>автор</u> проекта.\n\n"
        "Я сам прошёл путь от <u>тревожного</u> и <u>зажатого</u> человека с туманом в голове — до того, кто сейчас помогает людям возвращать ясность ума, внутреннюю силу, уверенность и сексуальность.\n\n"
        "<blockquote>@androgenautist — я тут делюсь самыми рабочими инсайтами по нейробиологии, гормонам и развитию мозга (и не только.)</blockquote>\n\n"
        "Если ты здесь — значит, ты уже на шаг ближе к своей лучшей версии."
    ),
    "GET_ACCESS_HEADER": "⭐ <b>Доступ</b>\n\nРефералы: за каждого зарегистрированного друга — +1 ч полного доступа.",
    "ACCESS_PRICING_BODY": (
        "<b>⭐ Выбери свой доступ к Brainboosty</b>\n\n"
        "Не понравится — верну деньги в течение 7 дней\n\n"
        "<b>1. Пробный месяц — 790 ₽</b>\n"
        "• Полный доступ ко всем тестам и результатам\n"
        "• Персональные рекомендации\n\n"
        "<b>2. Forever (навсегда) — 3990 ₽</b>\n"
        "• Пожизненный доступ + все будущие тесты\n"
        "• Самый выгодный вариант"
    ),
    "BTN_ACCESS_NOT_READY": "Пока не готов",
    "ACCESS_ALREADY_PREMIUM": "У тебя уже есть полный доступ. Пользуйся кнопками меню ниже 👇",
    "ACCESS_POSTPONE_DISCOUNT_PITCH": (
        "Понял 👍\n\n"
        "Я не буду тебя торопить.\n\n"
        "Но если хочешь получить скидку 15% на пробный месяц (790 ₽ → 672 ₽) — просто подпишись на канал @androgenautist.\n\n"
        "После подписки я сразу пришлю тебе промокод.\n\n"
        "Хочешь скидку 15%?"
    ),
    "BTN_ACCESS_CH15_YES": "Да, хочу скидку 15%",
    "BTN_ACCESS_CH15_NO": "Не надо",
    "ACCESS_SUBSCRIBE_FOR_PROMO": (
        "Отлично.\n\n"
        "Подпишись на канал @androgenautist и нажми «Проверить подписку» — тогда откроется скидка 15% на месяц (672 ⭐) на 7 дней, пока ты остаёшься подписчиком."
    ),
    "BTN_VERIFY_CH_PROMO": "✅ Проверить подписку",
    "ACCESS_PROMO_GRANTED": (
        "Готово.\n\n"
        "Твой промокод: <b>{code}</b>\n\n"
        "Скидка 15% на пробный месяц действует <b>7 дней</b> и при оплате через Stars уже учтена в цене 672. "
        "Если оплачиваешь на сайте — введи этот промокод при оформлении месяца.\n\n"
        "Если отпишешься от канала до оплаты — скидка сбросится."
    ),
    "ACCESS_REF_AFTER_NO_HTML": (
        "Понял.\n\n"
        "Хочешь получать часы полного доступа <b>бесплатно</b>?\n\n"
        "Пригласи друзей — за каждого зарегистрированного друга я начислю тебе +1 час премиума.\n\n"
        "Многие уже так делают и пользуются ботом намного дольше.\n\n"
        "Показать твою реферальную ссылку?"
    ),
    "BTN_ACCESS_SHOW_REF": "Да, показать ссылку",
    "INV_MONTH_DISC_TITLE": "Brainboosty — месяц (−15%)",
    "INV_MONTH_DISC_DESC": "Пробный месяц полного доступа по промокоду канала (672 ⭐).",
    "INV_MONTH_LABEL_DISC": "Месяц 672 ⭐",
    "BRAIN_MAP_TITLE_SEXUAL_BLOCK": "СЕКСУАЛЬНАЯ КАРТА МОЗГА:",
    "BRAIN_MAP_TITLE_DEVELOPMENT_BLOCK": "РАЗВИТИЕ ОТДЕЛОВ МОЗГА:",
    "BRAIN_MAP_FIRST_FOOTER": "Не медицинское заключение.",
    "BRAIN_MAP_COMPARISON_FOOTER": "Стрелки — изменение к прошлому прохождению (п.п.).",
    "RETEST_INTRO": "Выбери стилистику — 7 вопросов. Сравним с прошлым результатом.",
    "RETEST_SAVED": "✅ Результат сохранён. Стрелки — к прошлому прохождению.",
    "RETEST_LOCKED": "Повторное прохождение теста доступно с полной подпиской. Открой «⭐ Доступ».",
    "ADMIN_ONLY": "⛔ Только для администратора.",
    "ADMIN_PANEL": "🛠 Админ-панель",
    "ADMIN_WAIT_BROADCAST": "Отправь текст/фото/видео для рассылки. /cancel — отмена.",
    "ADMIN_CONFIRM": "Подтвердите рассылку:",
    "ADMIN_SENT": "✅ Рассылка: ок {ok}, ошибок {fail}",
    "ADMIN_STATS": "📊 Всего: {total}\nС доступом: {premium_now}",
    "BROADCAST_CONFIRM_YES": "✅ Отправить",
    "BROADCAST_CONFIRM_NO": "❌ Отмена",
    "DAILY_HOOK_TEMPLATE": "🧠 Ежедневный хук\n\n{body}\n\nМаленький шаг каждый день.",
    "DAILY_HOOK_0": "60 с: назови 10 объектов по кругу — фокус.",
    "DAILY_HOOK_1": "2 мин: список покупок без телефона — память.",
    "DAILY_HOOK_2": "90 с: примеры на сложение — рабочая память.",
    "DAILY_HOOK_3": "10 циклов дыхания — внимание.",
    "SUBSCRIPTION_HEADER_HTML": "<b>💎 Подписка BrainBoosty</b>",
    "SUBSCRIPTION_DISCOUNT_NOTE_HTML": "<i>Скидка Forever — 48 ч после теста.</i>",
    "SUBSCRIPTION_REFUND_BLOCKQUOTE_HTML": "<blockquote>Не понравится — верну деньги в течение 7 дней</blockquote>",
    "FOREVER_DISCOUNT_LINE": "🔥 Только для вас: Forever <b>2 490 ₽</b> вместо <b>3 990 ₽</b> — скидка сгорит через <b>48 часов</b>.",
    "BTN_GET_PDF": "📄 Получить PDF",
    "BTN_UNLOCK_FULL": "🔓 Полная карта и план",
    "CHANNEL_TRIAL_CTA": "🔥 Хочешь увидеть полные результаты теста прямо сейчас?\n\nПодпишись на мой закрытый канал — и я сразу открою тебе 15 минут полного доступа к «Сексуальной карте мозга» (или выбранному тесту).",
    "BTN_OPEN_PREMIUM_CHANNEL": "📢 Перейти в канал",
    "BTN_CHECK_CHANNEL_SUB": "✅ Я подписался — проверить",
    "CHANNEL_SUB_OK": "Доступ на 15 минут открыт — смотри сообщения выше.",
    "CHANNEL_SUB_NOT_MEMBER": "Подписка не видна. Зайди в канал и нажми «Подписаться», затем снова проверь.",
    "CHANNEL_TRIAL_UNLOCKED": "⏱ Выше — полная карта и кнопка PDF. Эти сообщения исчезнут через 15 минут. Успей скачать PDF.",
    "CHANNEL_TRIAL_DEBOUNCE": "Уже отправил полный доступ — загляни выше.",
    "CHANNEL_TRIAL_ALREADY_FULL_ACCESS": "У тебя уже полный доступ.",
    "PDF_NEED_SUBSCRIPTION": "PDF доступен при полной подписке или в 15-минутном окне после подписки на канал (кнопка после теста).",
    "LANG_SWITCH": "🌐 Язык: {lang}",
    "LANG_PROMPT": "Выберите язык / Choose language:",
    "LANG_RU": "🇷🇺 Русский",
    "LANG_EN": "🇬🇧 English",
    "PDF_GENERATING": "📄 Готовлю PDF…",
    "PDF_CAPTION": "Ваша карта мозга (PDF). Можно сохранить или переслать.",
    "TEASER_PREMIUM_ZONES": "\n🔒 <b>Премиум-зоны:</b> персональные рекомендации по прокачке + 30-дневный план — после оплаты.",
    "BRAIN_RL_prefrontal_cortex": "Префронтальная кора (личность)",
    "BRAIN_RL_brain_lobes": "Доли мозга (образы)",
    "BRAIN_RL_insular_cortex": "Островковая кора",
    "BRAIN_RL_temporoparietal_junction": "Височно-теменной узел (социальность)",
    "BRAIN_RL_amygdala": "Амигдала (эмоции)",
    "BRAIN_RL_frontal_gyrus": "Лобная извилина (речь)",
    "LOCKED_LINE": "🔒 {name} — в полной версии",
    "TEASER_HEADER": "🧠 <b>Ваша карта развития мозга готова</b>",
    "TEASER_GROWTH": "📌 <b>Зоны роста (фрагмент):</b>",
    "TEASER_SELL": "\n💡 Хотите <b>полную программу</b> под ваши зоны?\n• Трекер прогресса\n• Канал с 50+ упражнениями для мозга\n• Канал для сексуального развития\n• Персональный 30-дневный план\n\nПожизненный доступ — <b>{price} ₽</b>\n\n👇 Ниже — оплата.",
    "STATUS_HIGH": "🟢 высокий",
    "STATUS_MED": "🟡 средний",
    "STATUS_LOW": "🔴 зона роста",
    "REF_LINK_LABEL": "📎 Ссылка для друзей:",
    "SKILL_sexual_diversity": "🔞 СЕКС РАЗВИТИЕ",
    "SKILL_self_control": "Уверенность",
    "SKILL_sociability": "Социальность",
    "SKILL_speech": "Речь",
    "SKILL_reduce_anxiety": "Убрать тревогу",
    "GOAL_REC_sexual_diversity": "💡 Фокус: разнообразие и телесность — чередуйте ритуалы и честный диалог о желаниях.",
    "GOAL_REC_self_control": "💡 Фокус: саморегуляция — дыхание перед ответом и один «стоп-сигнал» в день.",
    "GOAL_REC_sociability": "💡 Фокус: социальность — 1 микро-шаг к контакту в день без давления.",
    "GOAL_REC_speech": "💡 Фокус: речь — 3 минуты «объяснить вслух» сложную мысль.",
    "GOAL_REC_reduce_anxiety": "💡 Фокус: тревога — якорь на дыхание и ограничение новостей вечером.",
    "GOAL_REC_default": "💡 Маленький ежедневный шаг — стабильный прогресс без перегруза.",
    "BRAIN_MAP_TITLE": "🗺 Карта развития мозга\n\nИндекс профиля по анкете (не диагноз).",
    "DOMAIN_attention": "Внимание",
    "DOMAIN_memory": "Память",
    "DOMAIN_thinking_speed": "Скорость мышления",
    "DOMAIN_focus": "Фокус",
    "DOMAIN_creativity": "Креативность",
    "GOAL_FOCUS_SUFFIX": " · (ваш фокус)",
    "SUB_TRIAL_TITLE_HTML": "<b>1) Пробный доступ — 1 месяц</b>",
    "SUB_TRIAL_RATES": "790 ₽ (Tribute) или <b>790 ⭐</b>",
    "SUB_FOREVER_TITLE_HTML": "<b>2) Forever</b>",
    "SUB_FOREVER_DISC_LINES": "После теста: <s>3 990 ₽</s> → <b>2 490 ₽</b> <i>(−1 500 ₽)</i>\nЗвёзды: <s>3 900 ⭐</s> → <b>2 490 ⭐</b>",
    "SUB_FOREVER_FULL_LINE": "<b>3 990 ₽</b> / <b>3 900 ⭐</b>",
    "BTN_STARS_MONTH": "⭐ 790 — Пробный месяц",
    "BTN_STARS_FOREVER": "⭐ Forever (Stars)",
    "BTN_TRIBUTE_MONTH": "💳 790 ₽ Tribute — месяц",
    "BTN_TRIBUTE_APP": "💳 Оплата в Tribute",
    "BTN_TRIBUTE_MONTH_15": "💳 Месяц −15% (672 ₽) — Tribute",
    "BTN_TRIBUTE_FOREVER_DISC": "💳 2 490 ₽ Tribute — Forever",
    "BTN_TRIBUTE_FOREVER_FULL": "💳 3 990 ₽ Tribute — Forever",
    "INV_MONTH_TITLE": "Пробный доступ — 1 месяц",
    "INV_MONTH_DESC": "Премиум BrainBoosty на 30 дней.",
    "INV_MONTH_LABEL": "Пробный доступ",
    "INV_FOREVER_DISC_TITLE": "Forever (скидка после теста)",
    "INV_FOREVER_DISC_DESC": "Пожизненный доступ по цене после теста (48 ч).",
    "INV_FOREVER_TITLE": "Forever",
    "INV_FOREVER_DESC": "Пожизненный доступ BrainBoosty.",
    "INV_FOREVER_LABEL": "Forever",
    "PAYMENT_SUCCESS": "✅ Оплата принята! Доступ активирован.",
    "PAYMENT_TRIBUTE_SUCCESS": "✅ Оплата через Tribute получена! Доступ активирован.",
    "PAYMENT_UNKNOWN": "Неизвестный тип платежа. Напишите в поддержку.",
    "ERR_UNKNOWN_OPTION": "Неизвестный вариант.",
    "ERR_QUEST_RESET": "Анкета сброшена. Нажми /start",
    "ERR_COGNITIVE_VARIANT": "Выбери вариант из кнопок.",
    "ERR_START_OVER": "Начни снова: /start",
    "ADMIN_BROADCAST_NO_DATA": "Нет данных рассылки. Начни заново: /admin",
    "LANG_UPDATED": "Язык сохранён: {choice}",
    "PDF_DOC_TITLE": "BrainBoosty — карта мозга",
    "PDF_HEADER": "BrainBoosty — карта по зонам",
    "PDF_VARIANT": "Стиль теста: {variant}",
    "PDF_SECTION_ZONES": "Шесть зон (%)",
    "PDF_SECTION_REC": "Рекомендации (фрагмент)",
    "PDF_FOOTER": "Образовательная модель, не медицинское заключение.",
    "BRAIN_MAP_PHOTO_TITLE": "Карта мозга — зоны",
    "BRAIN_MAP_PHOTO_LOCKED": "🔒 полная версия",
    "BRAIN_MAP_PHOTO_TEASER_HINT": "Персональные рекомендации и 30-дневный план — после оплаты.",
    "BRAIN_MAP_PHOTO_CAPTION_PAID": "🗺 Инфографика по вашим зонам (полная версия).",
    "BRAIN_MAP_PHOTO_CAPTION_FREE": "🗺 Инфографика: часть зон — в полной версии после оплаты.",
}

EN: dict[str, str] = {
    "THROTTLE_WARNING": "⏳ Too fast. Please wait a moment.",
    "CANCELLED": "❌ Cancelled.",
    "NOT_REGISTERED": "Please finish registration: /start",
    "START_ALREADY": "👋 Welcome back, {name}!\n\nDaily brain hooks 🧠✨\nYour link:\n{ref_link}",
    "START_UNFINISHED_TEST": "Your test isn’t finished yet. Tap “Continue test” — we’ll return to the questions (if the bot still has your session) or to style selection.",
    "BTN_RESUME_TEST": "▶️ Continue test",
    "START_NEW_INTRO": "🧠 Hi, {name}! I’m BrainBoosty Hook Bot.\n\nShort daily practices. First a quick profile, then a 7-question test (pick a style).",
    "QUESTION_SKILL": "🎯 Step 1/3. What do you want to train first?",
    "QUESTION_AGE": "🎂 Step 2/3. Your age in full years (e.g. 24).",
    "QUESTION_TIME": "⏱ Step 3/3. Minutes per day you can spend?",
    "QUEST_TIME_1_5": "1–5 min",
    "QUEST_TIME_5_15": "5–15 min",
    "QUEST_TIME_15P": "15+ min",
    "AGE_INVALID": "Please enter an age between 5 and 120.",
    "QUEST_STAY_ON_STEP": "Let's continue the profile 😊",
    "COGNITIVE_STAY_ON_STEP": "Let's continue the test 😊",
    "WELCOME_AFTER_QUEST": "✨ Welcome!\n\nI’ll tune daily hooks to you.\n\n📎 Invite link:\n{ref_link}\n\n🎁 Each registered friend → +1h full access.",
    "REFERRAL_STATS": "👥 Friends registered: {count}\n💎 +1h full access each (time stacks).",
    "PREMIUM_ACTIVE": "⭐ Premium until: {until}",
    "PREMIUM_NONE": "Premium inactive.",
    "PREMIUM_LIFETIME": "♾️ Lifetime (Forever) access.",
    "REFERRAL_BONUS_GRANTED": "🎉 A friend registered via your link — +1h full access!",
    "REPLY_BRAIN_MAP": "🗺 Brain map",
    "REPLY_GET_ACCESS": "⭐ Get access",
    "REPLY_ABOUT": "ℹ️ About",
    "REPLY_RETAKE_TEST": "🔄 Retake test",
    "COGNITIVE_STYLE_PROMPT": "Great! Now pick the style for the first test (7 questions):",
    "TEST_STYLE_SEXUAL_BTN": "🔥 Sexual brain map",
    "TEST_STYLE_DEV_BTN": "🧠 Brain regions growth",
    "COGNITIVE_COMPUTING": "⏳ Scoring your brain profile…",
    "COGNITIVE_DATA_ERROR": "Could not collect answers. Start again: /start",
    "COGNITIVE_DONE_FALLBACK": "⚠️ AI unavailable — local scoring shown.",
    "NO_BRAIN_MAP_YET": "No map yet. Finish onboarding: /start",
    "ABOUT_PROJECT": (
        "Who I am\n\n"
        "Hi, I'm @androgenautist — the author of this project.\n\n"
        "I've gone from an anxious, tense guy with low testosterone and brain fog to someone who now helps thousands of men reclaim strength, clarity, and sexuality.\n\n"
        "My channel @androgenautist is where I share the most actionable insights on neurobiology, hormones, and men's development — no marketing fluff or rose-tinted glasses.\n\n"
        "If you're here, you're already one step closer to your best self."
    ),
    "GET_ACCESS_HEADER": "⭐ Access\n\nReferrals: +1h full access for each registered friend.",
    "ACCESS_PRICING_BODY": (
        "<b>⭐ Choose your Brainboosty access</b>\n\n"
        "Not happy — money back within 7 days\n\n"
        "<b>1. Trial month — 790 ₽</b>\n"
        "• Full access to all tests and results\n"
        "• Personal recommendations\n\n"
        "<b>2. Forever — 3,990 ₽</b>\n"
        "• Lifetime access + all future tests\n"
        "• Best value"
    ),
    "BTN_ACCESS_NOT_READY": "Not ready yet",
    "ACCESS_ALREADY_PREMIUM": "You already have full access. Use the menu below 👇",
    "ACCESS_POSTPONE_DISCOUNT_PITCH": (
        "Got it 👍\n\n"
        "I won’t rush you.\n\n"
        "If you want 15% off the trial month (790 ₽ → 672 ₽), just subscribe to @androgenautist.\n\n"
        "After you subscribe I’ll send you a promo code right away.\n\n"
        "Want 15% off?"
    ),
    "BTN_ACCESS_CH15_YES": "Yes, I want 15% off",
    "BTN_ACCESS_CH15_NO": "No thanks",
    "ACCESS_SUBSCRIBE_FOR_PROMO": (
        "Great.\n\n"
        "Subscribe to @androgenautist and tap “Verify subscription” — you’ll unlock 15% off the month (672 ⭐) for 7 days while you stay subscribed."
    ),
    "BTN_VERIFY_CH_PROMO": "✅ Verify subscription",
    "ACCESS_PROMO_GRANTED": (
        "Done.\n\n"
        "Your promo code: <b>{code}</b>\n\n"
        "The 15% trial discount lasts <b>7 days</b>. Stars checkout already uses 672 ⭐. "
        "If you pay on the website, enter this code for the monthly plan.\n\n"
        "If you leave the channel before paying, the discount resets."
    ),
    "ACCESS_REF_AFTER_NO_HTML": (
        "Understood.\n\n"
        "Want to earn full-access hours <b>for free</b>?\n\n"
        "Invite friends — for each registered friend I’ll add +1 hour of premium.\n\n"
        "Many people already do this and use the bot much longer.\n\n"
        "Show your referral link?"
    ),
    "BTN_ACCESS_SHOW_REF": "Yes, show my link",
    "INV_MONTH_DISC_TITLE": "Brainboosty — month (−15%)",
    "INV_MONTH_DISC_DESC": "Trial month with channel promo (672 ⭐).",
    "INV_MONTH_LABEL_DISC": "Month 672 ⭐",
    "BRAIN_MAP_TITLE_SEXUAL_BLOCK": "SEXUAL BRAIN MAP:",
    "BRAIN_MAP_TITLE_DEVELOPMENT_BLOCK": "BRAIN REGION DEVELOPMENT:",
    "BRAIN_MAP_FIRST_FOOTER": "Not medical advice.",
    "BRAIN_MAP_COMPARISON_FOOTER": "Arrows = change vs last run (percentage points).",
    "RETEST_INTRO": "Pick a style — 7 questions. We’ll compare with your last run.",
    "RETEST_SAVED": "✅ Saved. Arrows compare to the previous run.",
    "RETEST_LOCKED": "Retaking the test requires full access. Open “⭐ Get access”.",
    "ADMIN_ONLY": "⛔ Admin only.",
    "ADMIN_PANEL": "🛠 Admin panel",
    "ADMIN_WAIT_BROADCAST": "Send text/photo/video for broadcast. /cancel to abort.",
    "ADMIN_CONFIRM": "Confirm broadcast?",
    "ADMIN_SENT": "✅ Broadcast: ok {ok}, failed {fail}",
    "ADMIN_STATS": "📊 Total users: {total}\nWith access: {premium_now}",
    "BROADCAST_CONFIRM_YES": "✅ Send",
    "BROADCAST_CONFIRM_NO": "❌ Cancel",
    "DAILY_HOOK_TEMPLATE": "🧠 Daily hook\n\n{body}\n\nSmall steps daily.",
    "DAILY_HOOK_0": "60s: name 10 objects around you — focus.",
    "DAILY_HOOK_1": "2 min: shopping list from memory.",
    "DAILY_HOOK_2": "90s: quick addition drills — working memory.",
    "DAILY_HOOK_3": "10 breath cycles — attention.",
    "SUBSCRIPTION_HEADER_HTML": "<b>💎 BrainBoosty subscription</b>",
    "SUBSCRIPTION_DISCOUNT_NOTE_HTML": "<i>Forever discount — 48h after the test.</i>",
    "SUBSCRIPTION_REFUND_BLOCKQUOTE_HTML": "<blockquote>Not happy — money back within 7 days</blockquote>",
    "FOREVER_DISCOUNT_LINE": "🔥 Only for you: Forever <b>2,490 ₽</b> instead of <b>3,990 ₽</b> — offer ends in <b>48 hours</b>.",
    "BTN_GET_PDF": "📄 Get PDF",
    "BTN_UNLOCK_FULL": "🔓 Full map & plan",
    "CHANNEL_TRIAL_CTA": "🔥 Want to see your full test results right now?\n\nSubscribe to my private channel — I’ll unlock 15 minutes of full access to the “Sexual brain map” (or the test style you picked).",
    "BTN_OPEN_PREMIUM_CHANNEL": "📢 Open channel",
    "BTN_CHECK_CHANNEL_SUB": "✅ I subscribed — verify",
    "CHANNEL_SUB_OK": "15 minutes unlocked — see the messages above.",
    "CHANNEL_SUB_NOT_MEMBER": "Subscription not detected. Join the channel, tap Subscribe, then verify again.",
    "CHANNEL_TRIAL_UNLOCKED": "⏱ Full map and PDF are in the messages above — they auto-delete in 15 minutes. Download in time.",
    "CHANNEL_TRIAL_DEBOUNCE": "Full access was already sent — scroll up.",
    "CHANNEL_TRIAL_ALREADY_FULL_ACCESS": "You already have full access.",
    "PDF_NEED_SUBSCRIPTION": "PDF is available with full subscription or in the 15-minute window after channel subscribe (button after the test).",
    "LANG_SWITCH": "🌐 Language: {lang}",
    "LANG_PROMPT": "Choose language / Выберите язык:",
    "LANG_RU": "🇷🇺 Русский",
    "LANG_EN": "🇬🇧 English",
    "PDF_GENERATING": "📄 Preparing your PDF…",
    "PDF_CAPTION": "Your brain map (PDF). Save or forward.",
    "TEASER_PREMIUM_ZONES": "\n🔒 <b>Premium:</b> targeted training tips + 30-day plan — after payment.",
    "BRAIN_RL_prefrontal_cortex": "Prefrontal cortex (personality)",
    "BRAIN_RL_brain_lobes": "Brain lobes (imagery)",
    "BRAIN_RL_insular_cortex": "Insular cortex",
    "BRAIN_RL_temporoparietal_junction": "Temporoparietal junction (social)",
    "BRAIN_RL_amygdala": "Amygdala (emotion)",
    "BRAIN_RL_frontal_gyrus": "Frontal gyrus (speech)",
    "LOCKED_LINE": "🔒 {name} — in full version",
    "TEASER_HEADER": "🧠 <b>Your brain map is ready</b>",
    "TEASER_GROWTH": "📌 <b>Growth zones (preview):</b>",
    "TEASER_SELL": "\n💡 Want the <b>full program</b> for your profile?\n• Progress tracker\n• Channel with 50+ brain drills\n• Channel for sexual wellness drills\n• Personal 30-day plan\n\nLifetime — <b>{price} ₽</b>\n\n👇 Pay below.",
    "STATUS_HIGH": "🟢 high",
    "STATUS_MED": "🟡 medium",
    "STATUS_LOW": "🔴 growth zone",
    "REF_LINK_LABEL": "📎 Invite link:",
    "SKILL_sexual_diversity": "Sexual variety / sexuality",
    "SKILL_self_control": "Self-control & confidence",
    "SKILL_sociability": "Sociability",
    "SKILL_speech": "Speech",
    "SKILL_reduce_anxiety": "Reduce anxiety",
    "GOAL_REC_sexual_diversity": "💡 Focus: variety & embodiment — small rituals + honest desire talk.",
    "GOAL_REC_self_control": "💡 Focus: regulation — breathe before you answer + one daily pause cue.",
    "GOAL_REC_sociability": "💡 Focus: social contact — one micro-step toward connection daily.",
    "GOAL_REC_speech": "💡 Focus: speech — 3 minutes to explain a complex idea aloud.",
    "GOAL_REC_reduce_anxiety": "💡 Focus: anxiety — breath anchor + less news before sleep.",
    "GOAL_REC_default": "💡 Small daily steps beat occasional overload.",
    "BRAIN_MAP_TITLE": "🗺 Your brain map\n\nProfile index from the questionnaire (not a diagnosis).",
    "DOMAIN_attention": "Attention",
    "DOMAIN_memory": "Memory",
    "DOMAIN_thinking_speed": "Thinking speed",
    "DOMAIN_focus": "Focus",
    "DOMAIN_creativity": "Creativity",
    "GOAL_FOCUS_SUFFIX": " · (your focus)",
    "SUB_TRIAL_TITLE_HTML": "<b>1) Trial — 1 month</b>",
    "SUB_TRIAL_RATES": "790 ₽ (Tribute) or <b>790 ⭐</b>",
    "SUB_FOREVER_TITLE_HTML": "<b>2) Forever</b>",
    "SUB_FOREVER_DISC_LINES": "After the test: <s>3,990 ₽</s> → <b>2,490 ₽</b> <i>(save 1,500 ₽)</i>\nStars: <s>3,900 ⭐</s> → <b>2,490 ⭐</b>",
    "SUB_FOREVER_FULL_LINE": "<b>3,990 ₽</b> / <b>3,900 ⭐</b>",
    "BTN_STARS_MONTH": "⭐ 790 — Trial month",
    "BTN_STARS_FOREVER": "⭐ Forever (Stars)",
    "BTN_TRIBUTE_MONTH": "💳 790 ₽ Tribute — month",
    "BTN_TRIBUTE_APP": "💳 Pay in Tribute",
    "BTN_TRIBUTE_MONTH_15": "💳 Month −15% (672 ₽) — Tribute",
    "BTN_TRIBUTE_FOREVER_DISC": "💳 2,490 ₽ Tribute — Forever",
    "BTN_TRIBUTE_FOREVER_FULL": "💳 3,990 ₽ Tribute — Forever",
    "INV_MONTH_TITLE": "Trial access — 1 month",
    "INV_MONTH_DESC": "BrainBoosty premium for 30 days.",
    "INV_MONTH_LABEL": "Trial access",
    "INV_FOREVER_DISC_TITLE": "Forever (post-test discount)",
    "INV_FOREVER_DISC_DESC": "Lifetime access at the post-test price (48h window).",
    "INV_FOREVER_TITLE": "Forever",
    "INV_FOREVER_DESC": "Lifetime BrainBoosty access.",
    "INV_FOREVER_LABEL": "Forever",
    "PAYMENT_SUCCESS": "✅ Payment received! Access is active.",
    "PAYMENT_TRIBUTE_SUCCESS": "✅ Tribute payment received! Access is active.",
    "PAYMENT_UNKNOWN": "Unknown payment type. Please contact support.",
    "ERR_UNKNOWN_OPTION": "Unknown option.",
    "ERR_QUEST_RESET": "Profile reset. Tap /start",
    "ERR_COGNITIVE_VARIANT": "Pick an option from the buttons.",
    "ERR_START_OVER": "Start again: /start",
    "ADMIN_BROADCAST_NO_DATA": "No broadcast data. Start over: /admin",
    "LANG_UPDATED": "Language saved: {choice}",
    "PDF_DOC_TITLE": "BrainBoosty — brain map",
    "PDF_HEADER": "BrainBoosty — regional map",
    "PDF_VARIANT": "Test style: {variant}",
    "PDF_SECTION_ZONES": "Six zones (%)",
    "PDF_SECTION_REC": "Recommendations (excerpt)",
    "PDF_FOOTER": "Educational model, not medical advice.",
    "BRAIN_MAP_PHOTO_TITLE": "Brain map — regions",
    "BRAIN_MAP_PHOTO_LOCKED": "🔒 full version",
    "BRAIN_MAP_PHOTO_TEASER_HINT": "Personal tips and a 30-day plan — after payment.",
    "BRAIN_MAP_PHOTO_CAPTION_PAID": "🗺 Your brain zones (full).",
    "BRAIN_MAP_PHOTO_CAPTION_FREE": "🗺 Infographic: some zones unlock after payment.",
}

TRANSLATIONS: dict[str, dict[str, str]] = {"ru": RU, "en": EN}
