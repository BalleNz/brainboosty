"""Плоский каталог строк ru/en. Ключи — UPPER_SNAKE."""

from __future__ import annotations

RU: dict[str, str] = {
    "THROTTLE_WARNING": "⏳ Слишком часто. Подождите секунду.",
    "CANCELLED": "❌ Действие отменено.",
    "RESET_NO_ACCOUNT": "Учётная запись не найдена. Начни с /start.",
    "RESET_CONFIRM_TEXT": "Сбросить анкету, результаты теста и реферальную статистику? Подписка и Telegram-профиль останутся.",
    "BTN_RESET_CONFIRM": "Да, сбросить",
    "RESET_DELETED_DONE": "Данные профиля очищены (подписка сохранена). Заново пройди анкету: /start",
    "SKILLS_BTN_DONE": "➡️ Далее",
    "SKILLS_MAX_TWO": "Можно выбрать не больше двух навыков.",
    "SKILLS_NEED_ONE": "Выбери хотя бы один навык.",

    "SKILLS_UPDATED": "Навыки обновлены.",
    "SKILLS_REPICK_INTRO": "Выбери до двух навыков (⮕ у выбранных) и нажми «Далее», чтобы сохранить.",
    "SKILLS_FINISH_COGNITIVE_FIRST": "Сначала заверши тест в боте, затем снова отправь /skills.",
    "NOT_REGISTERED": "Сначала завершите регистрацию: /start",
    "START_ALREADY": "👋 С возвращением, {name}!\n\nЯ продолжу присылать «хуки» для мозга 🧠✨\nТвоя ссылка:\n{ref_link}",
    "WEBAPP_OPEN_HINT": "🧠 <b>Neural Map</b> — карта мозга, история прогресса и тест из 7 вопросов прямо в приложении:",
    "BTN_OPEN_WEBAPP": "🚀 Открыть Neural Map",
    "SITE_LOGIN_OK": "✅ Вход с сайта подтверждён. Вернись в браузер — страница подхватит сессию сама.",
    "SITE_LOGIN_BAD_TOKEN": "Ссылка для входа с сайта недействительна или устарела. Запроси новую на странице Neural Map Hub.",
    "SITE_LOGIN_NOT_REGISTERED": "Сначала пройди анкету в этом боте (отправь /start без ссылки), затем снова нажми «Войти» на сайте.",
    "START_UNFINISHED_TEST": "Тест ещё не завершён. Нажми «Продолжить тест» — вернёмся к вопросам (если сессия ещё в памяти бота) или к выбору стиля.",
    "BTN_RESUME_TEST": "▶️ Продолжить тест",
    "BTN_TEST_BACK": "Назад",
    "START_NEW_INTRO": (
        "🧠 <b>Привет!</b>\n\n"
        "Я Андрогенный Аутист. Помогаю вернуть ясность ума, уверенность и силу; делюсь инсайтами по нейробиологии, "
        'гормонам и развитию мозга — больше <a href="https://t.me/androgenautist">в канале</a>.\n\n'
        "Пройдём быстрый тест из 7 вопросов — и ты получишь реальную карту своего мозга: где ты <u>уже сильный</u>, "
        "а где скрыт огромный <u>потенциал для роста</u>.\n\n"
        "Хочешь посмотреть, что покажет твой мозг?"
    ),
    "QUESTION_SKILL_LEAD": "🧠 Выбери навык, который хочешь прокачать в первую очередь",
    "QUESTION_SKILL_LEAD_CMD": "🧠 Выбери до двух навыков для прокачки",
    "QUESTION_SKILL_COUNT": "Выбрано: {n} из {max}",
    "QUESTION_AGE": (
        "🎂 <b>Подскажи, сколько тебе полных лет?</b>\n\n"
        "<blockquote>Это поможет мне сделать рекомендации по прокачке максимально персональными для твоего возраста.</blockquote>"
    ),
    "QUESTION_TIME": (
        "⏰ Чтобы я подобрал тебе индивидуальный план — сколько минут в день ты <u>реально</u> можешь уделять?"
    ),
    "QUEST_TIME_1_5": "🕒 1–5 минут",
    "QUEST_TIME_5_15": "⏳ 5–15 минут",
    "QUEST_TIME_15P": "🔥 15+ минут",
    "AGE_INVALID": "Введи возраст числом от 5 до 120.",
    "QUEST_STAY_ON_STEP": "Продолжаем анкету 😊",
    "COGNITIVE_STAY_ON_STEP": "Продолжаем тест 😊",
    "WELCOME_AFTER_QUEST": "✨ Добро пожаловать!\n\nТеперь я знаю твой фокус. Ожидай ежедневные хуки.\n\n📎 Ссылка для друзей:\n{ref_link}\n\n🎁 За каждого друга с регистрацией — +1 ч полного доступа.",
    "REFERRAL_STATS": "👥 Друзей с регистрацией: {count}\n💎 За каждого — +1 ч полного доступа (время суммируется).",
    "PREMIUM_ACTIVE": "⭐ Премиум до: {until}",
    "PREMIUM_NONE": "Премиум не активен.",
    "PREMIUM_LIFETIME": "♾️ Пожизненный доступ.",
    "REFERRAL_BONUS_GRANTED": "🎉 Друг зарегистрировался по твоей ссылке — +1 ч полного доступа!",
    "REPLY_BRAIN_MAP": "🗺 Карта мозга",
    "REPLY_GET_ACCESS": "⭐ Доступ",
    "REPLY_ABOUT": "ℹ️ О проекте",
    "REPLY_RETAKE_TEST": "🔄 Перепройти тест",
    "REPLY_TESTS": "📋 Тесты",
    "TESTS_HUB_TEXT": "Общие тесты: один набор вопросов на всех на сегодня или на календарную неделю. История и влияние на зоны — в PDF.",
    "TESTS_HUB_TEXT_FREE": "Общие тесты: без подписки доступен только недельный набор (обновляется раз в неделю). Ежедневный тест и PDF истории — с подпиской.",
    "TESTS_DAILY_PREMIUM": "Ежедневный тест доступен с активной подпиской.",
    "TESTS_PDF_PREMIUM": "PDF истории тестов — с активной подпиской.",
    "TESTS_BTN_DAILY": "▶️ Сегодняшний тест",
    "TESTS_BTN_WEEKLY": "▶️ Недельный тест",
    "TESTS_BTN_HISTORY_PDF": "📄 История тестов (PDF)",
    "TESTS_LOCKED": "Тесты по расписанию доступны с активной подпиской.",
    "TESTS_ALREADY_DONE": "Этот тест уже пройден. Новый будет доступен позже.",
    "TESTS_GENERATING": "⏳ Генерируем набор вопросов…",
    "TESTS_COMPUTING": "⏳ Считаем профиль по зонам…",
    "TESTS_DONE": "✅ Тест сохранён. Снимок зон обновлён.",
    "TESTS_ERR": "Не удалось продолжить тест. Попробуй снова из меню «Тесты».",
    "TESTS_HISTORY_EMPTY": "Пока нет завершённых общих тестов.",
    "PDF_HISTORY_TITLE": "История общих тестов и зоны мозга",
    "PDF_HISTORY_PERIOD": "Период: {period} ({kind})",
    "PDF_HISTORY_KIND_DAILY": "день",
    "PDF_HISTORY_KIND_WEEKLY": "неделя",
    "PDF_HISTORY_SCORE_LINE": "{name}: {value:.1f}% (изм. {delta:+.1f})",
    "PDF_HISTORY_SCORE_LINE_FIRST": "{name}: {value:.1f}%",
    "PDF_HISTORY_CAPTION": "История прохождения общих тестов",
    "COGNITIVE_STYLE_PROMPT": "Отлично! Теперь выбери стиль первого теста (7 вопросов):",
    "TEST_STYLE_SEXUAL_BTN": "🔥 Сексуальная карта мозга",
    "TEST_STYLE_DEV_BTN": "🧠 Развитие отделов мозга",
    "COGNITIVE_COMPUTING": "⏳ Считаю профиль по зонам…",
    "COGNITIVE_DATA_ERROR": "Не удалось собрать ответы. Начни снова: /start",
    "COGNITIVE_DONE_FALLBACK": "⚠️ Нет связи с AI — показан локальный расчёт.",
    "NO_BRAIN_MAP_YET": "Карты ещё нет. Заверши регистрацию: /start",
    "ABOUT_PROJECT": (
        "<b>Кто я</b>\n\n"
        "Привет, я Дамиан — <u>автор</u> проекта.\n\n"
        "Я сам прошёл путь от <u>тревожного</u> и <u>зажатого</u> человека с туманом в голове — до того, кто сейчас помогает людям возвращать ясность ума, внутреннюю силу, уверенность и сексуальность.\n\n"
        "<blockquote>@androgenautist — я тут делюсь самыми рабочими инсайтами по нейробиологии, гормонам и развитию мозга (и не только.)</blockquote>\n\n"
        "Если ты здесь — значит, ты уже на шаг ближе к своей лучшей версии."
    ),
    "GET_ACCESS_HEADER": "⭐ <b>Доступ</b>\n\nРефералы: за каждого зарегистрированного друга — +1 ч полного доступа.",
    "ACCESS_PRICING_BODY": (
        "<b>⭐ Выбери свой доступ к Брейнбусти</b>\n\n"
        "Не понравится — верну деньги в течение 7 дней\n\n"
        "<blockquote>"
        "<b>1. Пробный месяц — 790 ₽</b>\n"
        "• Полный доступ ко всем тестам и картам мозга\n"
        "• Персональные рекомендации\n"
        "• Бот для отслеживания прогресса\n\n"
        "<b>2. Навсегда</b> — <s>3 990 ₽</s> → <b>2 490 ₽</b>\n"
        "• Пожизненный доступ + все будущие тесты\n"
        "• Бот трекинга прогресса навсегда\n"
        "• Закрытый канал с упражнениями\n"
        "• Самый выгодный вариант (экономия 1 500 ₽)"
        "</blockquote>\n\n"
        "Навсегда — гораздо дешевле в пересчёте"
    ),
    "ACCESS_PRICING_BODY_FOREVER_DISC": (
        "<b>⭐ Выбери доступ к Брейнбусти</b>\n\n"
        "<blockquote>"
        "<b>1. Пробный месяц — 790 ₽</b>\n"
        "• Полный доступ ко всем тестам и картам мозга\n"
        "• Персональные рекомендации\n"
        "• Бот для отслеживания прогресса\n\n"
        "<b>2. Навсегда</b> — <s>3 990 ₽</s> → <b>2 490 ₽</b>\n"
        "• Пожизненный доступ + все будущие тесты\n"
        "• Бот трекинга прогресса навсегда\n"
        "• Закрытый канал с упражнениями\n"
        "• Самый выгодный вариант (экономия 1 500 ₽)"
        "</blockquote>\n\n"
        "<tg-spoiler>Не понравится — верну <b>100% денег</b> в течение 7 дней</tg-spoiler>\n\n"
        '🔥 До конца скидки: <b>{time_left}</b>\n\n'
    ),
    "BTN_ACCESS_CHANNEL_15_OFFER": "получить −15%",
    "BTN_ACCESS_NOT_READY": "Пока не готов",
    "BTN_BUY_IN_TRIBUTE": "Купить в Трибьют",
    "BTN_BUY_FOR": "Купить за {price}",
    "BTN_ACCESS_PLAN_MONTH": "Пробный период",
    "BTN_ACCESS_PLAN_FOREVER": "Навсегда",
    "BTN_PAY_STEP_BACK": "← Тарифы",
    "PAY_PRICE_MONTH_FULL": "790 ₽",
    "PAY_PRICE_MONTH_PROMO": "672 ₽",
    "PAY_PRICE_FOREVER_FULL": "3 990 ₽",
    "PAY_PRICE_FOREVER_DISC": "2 490 ₽",
    "PAY_STEP2_MONTH_INTRO_HTML": (
        "<b>Пробный период</b> — оплата в Tribute.\n\n"
        "Если активна скидка канала (−15%), откроется ссылка с промокодом и цена на кнопке будет ниже.\n\n"
        "Нажми кнопку ниже:"
    ),
    "PAY_STEP2_FOREVER_INTRO_HTML": (
        "<b>Навсегда</b> — полная цена 3 990 ₽, оплата в Tribute.\n\n"
        "Нажми кнопку ниже:"
    ),
    "PAY_STEP2_FOREVER_INTRO_DISC_HTML": (
        "<b>Навсегда со скидкой после теста</b> — до конца: <b>{time_left}</b>.\n"
        "2 490 ₽ вместо 3 990.\n\n"
        "Нажми кнопку ниже:"
    ),
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
        "<b>Отлично.</b>\n\n"
        "Подпишись на канал @androgenautist и нажми «Проверить подписку» — тогда откроется скидка на пробный период — 15% на 7 дней, пока ты остаёшься подписчиком."
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
    "BRAIN_MAP_TITLE_SEXUAL_BLOCK": "Сексуальная карта мозга:",
    "BRAIN_MAP_TITLE_DEVELOPMENT_BLOCK": "РАЗВИТИЕ ОТДЕЛОВ МОЗГА:",
    "BRAIN_MAP_FIRST_FOOTER": "Не медицинское заключение.",
    "BRAIN_MAP_COMPARISON_FOOTER": "Стрелки — изменение к прошлому прохождению (п.п.).",
    "TEST_RESULT_MODEL_DISCLAIMER": (
        "<tg-spoiler>Это упрощённая практическая модель. В реальности все зоны мозга работают как единая сеть.</tg-spoiler>"
    ),
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
    "SUBSCRIPTION_DISCOUNT_NOTE_HTML": "<i>Скидка Forever — осталось: <b>{time_left}</b>.</i>",
    "SUBSCRIPTION_REFUND_BLOCKQUOTE_HTML": "<blockquote>Не понравится — верну деньги в течение 7 дней</blockquote>",
    "FOREVER_DISCOUNT_LINE": "🔥 Только для вас: Forever <b>2 490 ₽</b> вместо <b>3 990 ₽</b> — до конца скидки: <b>{time_left}</b>.",
    "DISCOUNT_LEFT_LT_HOUR": "менее часа",
    "DISCOUNT_LEFT_HOURS_RU_ONE": "{n} час",
    "DISCOUNT_LEFT_HOURS_RU_FEW": "{n} часа",
    "DISCOUNT_LEFT_HOURS_RU_MANY": "{n} часов",
    "BTN_GET_PDF": "📄 Получить PDF",
    "BTN_UNLOCK_FULL": "🔓 Полная карта и план",
    "CHANNEL_TRIAL_CTA": "🔥 Хочешь увидеть полные результаты теста прямо сейчас?\n\nПодпишись на мой закрытый канал — и я сразу открою тебе 15 минут полного доступа к «Сексуальной карте мозга» (или выбранному тесту).",
    "BTN_OPEN_PREMIUM_CHANNEL": "📢 Перейти в канал",
    "BTN_CHECK_CHANNEL_SUB": "✅ Я подписался — проверить",
    "CHANNEL_SUB_OK": "Доступ на 15 минут открыт — смотри сообщения выше.",
    "CHANNEL_SUB_NOT_MEMBER": "Подписка не видна. Зайди в канал и нажми «Подписаться», затем снова проверь.",
    "CHANNEL_TRIAL_UNLOCKED": "⏱ Выше — PDF с картой мозга. Сообщение исчезнет через 15 минут — успей скачать.",
    "CHANNEL_TRIAL_DEBOUNCE": "Уже отправил полный доступ — загляни выше.",
    "CHANNEL_TRIAL_ALREADY_FULL_ACCESS": "У тебя уже полный доступ.",
    "PDF_NEED_SUBSCRIPTION": "PDF доступен при полной подписке или в 15-минутном окне после подписки на канал (кнопка после теста).",
    "LANG_SWITCH": "🌐 Язык: {lang}",
    "LANG_PROMPT": (
        "👋 <b>Чтобы я мог общаться с тобой максимально комфортно, выбери язык:</b>\n\n"
        "🇷🇺 Русский\n"
        "🇬🇧 English"
    ),
    "LANG_RU": "🇷🇺 Русский",
    "LANG_EN": "🇬🇧 English",
    "PDF_GENERATING": "📄 Готовлю PDF…",
    "PDF_BRAIN_MAP_GENERATING": "Генерация PDF файла с картой твоего мозга…",
    "PDF_CAPTION": "Ваша карта мозга (PDF). Можно сохранить или переслать.",
    "TEASER_TITLE_SEXUAL_HTML": "🧠 <b>Твоя сексуальная карта мозга готова</b>",
    "TEASER_TITLE_GENERAL_HTML": "🧠 <b>Твоя карта мозга готова</b>",
    "TEASER_OPEN_ZONES_HEADER": "<b>Открытые зоны:</b>",
    "TEASER_GROWTH_HEADER": "📌 <b>Зоны роста (что можно прокачать уже сейчас):</b>",
    "TEASER_CLOSER_TAGLINE": "<b>Я сделаю тебя лучше.</b>",
    "TEASER_CLOSER_GET_HEADER": "<b>Получи:</b>",
    "TEASER_CLOSER_ITEM_PLAN": "• Персональный 30-дневный план прокачки именно <u>твоих</u> слабых зон",
    "TEASER_CLOSER_ITEM_TRACKER_SEX": "• Трекер прогресса мозга и сексуальности",
    "TEASER_CLOSER_ITEM_TRACKER_GEN": "• Трекер прогресса мозга и когнитивных навыков",
    "TEASER_CLOSER_ITEM_EXERCISES": "• 50+ проверенных упражнений",
    "TEASER_CLOSER_ITEM_CHANNEL_SEX": "• Закрытый канал для сексуального развития",
    "TEASER_CLOSER_ITEM_CHANNEL_GEN": "• Закрытый канал для развития всех отделов мозга",
    "TEASER_LIFETIME_SPOILER": "<tg-spoiler><b>⭐ Пожизненный доступ — всего {price} ₽</b></tg-spoiler>",
    "TEASER_REFUND_LINE": "<i>Не понравится — верну 100% денег в течение 7 дней</i>",
    "TEASER_CTA_ACCESS": "👇 <b>Выбрать доступ и открыть все зоны</b>",
    "TEASER_LOCKED_RL_prefrontal_cortex": "Префронтальная кора (контроль + личность)",
    "TEASER_LOCKED_RL_frontal_gyrus": "Лобная извилина (уверенность в словах)",
    "BRAIN_RL_prefrontal_cortex": "Префронтальная кора (личность)",
    "BRAIN_RL_brain_lobes": "Доли мозга (образы)",
    "BRAIN_RL_insular_cortex": "Островковая кора",
    "BRAIN_RL_temporoparietal_junction": "Височно-теменной узел (социальность)",
    "BRAIN_RL_amygdala": "Амигдала (эмоции)",
    "BRAIN_RL_frontal_gyrus": "Лобная извилина (речь)",
    "LOCKED_LINE": "🔒 {name} — в полной версии",
    "STATUS_HIGH": "🟢 высокий",
    "STATUS_MED": "🟡 средний",
    "STATUS_LOW": "🔴 зона роста",
    "REF_LINK_LABEL": "📎 Ссылка для друзей:",
    "SKILL_sexual_diversity": "Сексуальное развитие",
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
    "BTN_STARS_MONTH": "⭐ Оплатить старсами",
    "BTN_STARS_FOREVER": "⭐ Оплатить старсами",
    "BTN_STARS_FOREVER_AMOUNT": "Купить за звезды",
    "INV_STARS_FOREVER_TITLE": "BrainBoosty — Forever",
    "INV_STARS_FOREVER_DESC": "Пожизненный доступ: карты, тесты, план и закрытые материалы (оплата Telegram Stars).",
    "INV_STARS_FOREVER_PRICE_LABEL": "Forever",
    "STARS_INVOICE_SEND_FAIL": "Не удалось выставить счёт в Stars. Попробуйте позже или оплатите в Tribute.",
    "STARS_PRECHECK_FAIL": "Платёж недоступен. Обновите экран и попробуйте снова.",
    "STARS_PAY_ALREADY_LIFETIME": "У вас уже пожизненный доступ.",
    "PAYMENT_STARS_FOREVER_OK": "✅ Оплата Stars получена. <b>Forever</b> активирован.\n\n{vip_block}",
    "STARS_VIP_INVITE_HTML": "<b>Вход в закрытый канал:</b>\n{url}\n\n<i>Ссылка одноразовая — не пересылайте.</i>",
    "STARS_VIP_SKIP_CONFIGURE_HTML": "<i>Закрытый канал: ссылку пришлёт поддержка (для бота не задан VIP_PRIVATE_CHANNEL_CHAT_ID).</i>",
    "STARS_VIP_INVITE_FAILED_HTML": "<i>Не удалось создать приглашение в канал — напишите в поддержку, приложив скрин оплаты.</i>",
    "BTN_TRIBUTE_MONTH": "💳 790 ₽ Tribute — месяц",
    "BTN_TRIBUTE_APP": "💳 Оплата в Трибьют",
    "BTN_TRIBUTE_MONTH_15": "💳 Месяц −15% (672 ₽) — Tribute",
    "BTN_TRIBUTE_FOREVER_DISC": "💳 2 490 ₽ Tribute — Forever",
    "BTN_TRIBUTE_FOREVER_FULL": "💳 3 990 ₽ Tribute — Forever",
    "INV_MONTH_TITLE": "Пробный доступ — 1 месяц",
    "INV_MONTH_DESC": "Премиум BrainBoosty на 30 дней.",
    "INV_MONTH_LABEL": "Пробный доступ",
    "INV_FOREVER_DISC_TITLE": "Forever (скидка после теста)",
    "INV_FOREVER_DISC_DESC": "Пожизненный доступ по цене после теста. До конца скидки: {time_left}.",
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
    "PDF_BRAIN_SCORE_LABEL": "NeuroScore",
    "PDF_BRAIN_COVER_LINE": "Шесть зон · один профиль. Цифры, акценты и ясная картина без лишнего шума.",
    "PDF_BRAIN_PROGRESS_MAIN": "Твой прогресс {pct}%",
    "PDF_BRAIN_ZONE_LEVEL": "Интегральный уровень зоны",
    "PDF_BRAIN_REC_TITLE": "Почему эта зона — твой главный рычаг удовольствия",
    "PDF_BRAIN_CONNECTIVITY_TITLE": "Связность зон (образовательная модель)",
    "PDF_BRAIN_M1": "Связность зоны",
    "PDF_BRAIN_M2": "Ритм",
    "PDF_BRAIN_M3": "Устойчивость",
    "PDF_BRAIN_M4": "Потенциал роста",
    "PDF_BRAIN_REC_FALLBACK": "Маленькие ежедневные шаги дают устойчивый рост без перегруза.",
    "PDF_BRAIN_REC_UNLOCK": "Полная программа и все рекомендации — в платной версии.",
    "PDF_BRAIN_CTA_BADGE": "ПОЛНЫЙ ДОСТУП",
    "PDF_BRAIN_CTA_TITLE": "Забери полный доступ — сегодня",
    "PDF_BRAIN_CTA_SUB": "Персональный план на 30 дней, трекер прогресса, упражнения под твой профиль и закрытый канал — без лишних слов, сразу в действие.",
    "PDF_BRAIN_CTA_SCAN": "Наведи камеру — оплата за секунды в Tribute. Полная витрина и мгновенный доступ.",
    "PDF_BRAIN_CTA_URL": "Ссылка:",
    "PDF_BRAIN_HERO_BRAIN": "NEURAL MAP",
    "PDF_BRAIN_SELL_prefrontal_cortex": "Здесь решается, кто ведёт игру: импульс или ты. Прокачай зону — и близость станет спокойнее, глубже и «дороже» по ощущениям, без лишней драмы.",
    "PDF_BRAIN_SELL_brain_lobes": "Картинка в голове — это половина сцены. Чем ярче и честнее образ, тем увереннее ты задаёшь темп и получаешь отклик — иногда даже без слов.",
    "PDF_BRAIN_SELL_insular_cortex": "Тело не врёт: островок переводит сенсации в ясность. Меньше тревожного шума — больше контакта «здесь и сейчас», когда хочется не отвлекаться ни на что.",
    "PDF_BRAIN_SELL_temporoparietal_junction": "Это твой социальный радар: темп, намёки, паузы. Когда он точный, исчезают неловкие недопонимания — остаётся синхрон и доверие.",
    "PDF_BRAIN_SELL_amygdala": "Триггеры режут глубину. Спокойная амигдала — это смелость в желаниях и честность в постели без срывов и обидных «автопилотов».",
    "PDF_BRAIN_SELL_frontal_gyrus": "Слова — это интерфейс к удовольствию. Чёткая формулировка желаний делает отклик мягче и увереннее: меньше намёков в пустоту — больше «да» в реальности.",
    "PDF_BRAIN_PAGE_prefrontal_cortex": "Префронтальная кора",
    "PDF_BRAIN_PAGE_brain_lobes": "Доли мозга · образы",
    "PDF_BRAIN_PAGE_insular_cortex": "Островковая кора",
    "PDF_BRAIN_PAGE_temporoparietal_junction": "Височно-теменной узел",
    "PDF_BRAIN_PAGE_amygdala": "Амигдала",
    "PDF_BRAIN_PAGE_frontal_gyrus": "Лобная извилина",
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
    "RESET_NO_ACCOUNT": "No account found. Start with /start.",
    "RESET_CONFIRM_TEXT": "Reset your profile, test results, and referral stats? Your subscription and Telegram identity stay.",
    "BTN_RESET_CONFIRM": "Yes, reset",
    "RESET_DELETED_DONE": "Profile data cleared (subscription kept). Run through the profile again: /start",
    "SKILLS_BTN_DONE": "➡️ Next",
    "SKILLS_MAX_TWO": "You can pick at most two skills.",
    "SKILLS_NEED_ONE": "Pick at least one skill.",
    "SKILLS_UPDATED": "Skills updated.",
    "SKILLS_REPICK_INTRO": "Pick up to two skills (⮕ marks selected), then tap «Next» to save.",
    "SKILLS_FINISH_COGNITIVE_FIRST": "Finish the in-bot test first, then send /skills again.",
    "NOT_REGISTERED": "Please finish registration: /start",
    "START_ALREADY": "👋 Welcome back, {name}!\n\nDaily brain hooks 🧠✨\nYour link:\n{ref_link}",
    "WEBAPP_OPEN_HINT": "🧠 <b>Neural Map</b> — brain map, progress history, and the 7-question test in the app:",
    "BTN_OPEN_WEBAPP": "🚀 Open Neural Map",
    "SITE_LOGIN_OK": "✅ Browser sign-in confirmed. Return to the site—the page will continue automatically.",
    "SITE_LOGIN_BAD_TOKEN": "That browser sign-in link is invalid or expired. Start again from the Neural Map Hub page.",
    "SITE_LOGIN_NOT_REGISTERED": "Finish onboarding in this bot first (send /start without a link), then try signing in on the site again.",
    "START_UNFINISHED_TEST": "Your test isn’t finished yet. Tap “Continue test” — we’ll return to the questions (if the bot still has your session) or to style selection.",
    "BTN_RESUME_TEST": "▶️ Continue test",
    "BTN_TEST_BACK": "Back",
    "START_NEW_INTRO": (
        "🧠 <b>Hi!</b>\n\n"
        "I'm Androgen Autist. I help you regain mental clarity, confidence, and strength; I share insights on "
        'neurobiology, hormones, and brain growth — more <a href="https://t.me/androgenautist">on Telegram</a>.\n\n'
        "We'll go through a quick 7-question test — and you'll get a real map of your brain: where you're "
        "<u>already strong</u>, and where there's huge <u>room to grow</u>.\n\n"
        "Want to see what your brain will show?"
    ),
    "QUESTION_SKILL_LEAD": "🧠 Pick one skill you want to level up first",
    "QUESTION_SKILL_LEAD_CMD": "🧠 Pick up to two skills to level up",
    "QUESTION_SKILL_COUNT": "Selected: {n} of {max}",
    "QUESTION_AGE": (
        "🎂 <b>How old are you in full years?</b>\n\n"
        "<blockquote>That helps me make your training recommendations as personal as possible for your age.</blockquote>"
    ),
    "QUESTION_TIME": (
        "⏰ So I can build a personalized plan for you — how many minutes a day can you <u>really</u> spend?"
    ),
    "QUEST_TIME_1_5": "🕒 1–5 minutes",
    "QUEST_TIME_5_15": "⏳ 5–15 minutes",
    "QUEST_TIME_15P": "🔥 15+ minutes",
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
    "REPLY_TESTS": "📋 Tests",
    "TESTS_HUB_TEXT": "Shared tests: the same questions for everyone for today or for the calendar week. History and impact on brain regions — PDF.",
    "TESTS_HUB_TEXT_FREE": "Shared tests: without a subscription only the weekly set is available (refreshes each ISO week). Daily test and test-history PDF require a subscription.",
    "TESTS_DAILY_PREMIUM": "The daily test requires an active subscription.",
    "TESTS_PDF_PREMIUM": "Test history PDF requires an active subscription.",
    "TESTS_BTN_DAILY": "▶️ Today’s test",
    "TESTS_BTN_WEEKLY": "▶️ Weekly test",
    "TESTS_BTN_HISTORY_PDF": "📄 Test history (PDF)",
    "TESTS_LOCKED": "Scheduled tests require an active subscription.",
    "TESTS_ALREADY_DONE": "You already completed this test. A new one will be available later.",
    "TESTS_GENERATING": "⏳ Generating questions…",
    "TESTS_COMPUTING": "⏳ Computing brain-region profile…",
    "TESTS_DONE": "✅ Test saved. Your brain map snapshot is updated.",
    "TESTS_ERR": "Could not continue the test. Try again from «Tests».",
    "TESTS_HISTORY_EMPTY": "No completed shared tests yet.",
    "PDF_HISTORY_TITLE": "Shared test history and brain regions",
    "PDF_HISTORY_PERIOD": "Period: {period} ({kind})",
    "PDF_HISTORY_KIND_DAILY": "day",
    "PDF_HISTORY_KIND_WEEKLY": "week",
    "PDF_HISTORY_SCORE_LINE": "{name}: {value:.1f}% (Δ {delta:+.1f})",
    "PDF_HISTORY_SCORE_LINE_FIRST": "{name}: {value:.1f}%",
    "PDF_HISTORY_CAPTION": "Shared tests completion history",
    "COGNITIVE_STYLE_PROMPT": "Great! Now pick the style for the first test (7 questions):",
    "TEST_STYLE_SEXUAL_BTN": "🔥 Sexual brain map",
    "TEST_STYLE_DEV_BTN": "🧠 Brain regions growth",
    "COGNITIVE_COMPUTING": "⏳ Scoring your brain profile…",
    "COGNITIVE_DATA_ERROR": "Could not collect answers. Start again: /start",
    "COGNITIVE_DONE_FALLBACK": "⚠️ AI unavailable — local scoring shown.",
    "NO_BRAIN_MAP_YET": "No map yet. Finish onboarding: /start",
    "ABOUT_PROJECT": (
        "Who I am\n\n"
        "Hi, I'm Damian — the author of this project.\n\n"
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
    "ACCESS_PRICING_BODY_FOREVER_DISC": (
        "<b>⭐ Choose BrainBoosty access</b>\n\n"
        "<blockquote>"
        "<b>1. Trial month — 790 ₽</b>\n"
        "• Full access to all tests and brain maps\n"
        "• Personal recommendations\n"
        "• Progress-tracking bot\n\n"
        "<b>2. Lifetime</b> — <s>3,990 ₽</s> → <b>2,490 ₽</b>\n"
        "• Lifetime access + all future tests\n"
        "• Progress bot forever\n"
        "• Private channel with drills\n"
        "• Best value (save 1,500 ₽)"
        "</blockquote>\n\n"
        "<tg-spoiler>Not happy — I’ll refund <b>100% of your money</b> within 7 days.</tg-spoiler>\n\n"
        "🔥 Discount ends in: <b>{time_left}</b>\n\n"
    ),
    "BTN_ACCESS_CHANNEL_15_OFFER": "−15% on month (channel)",
    "BTN_ACCESS_NOT_READY": "Not ready yet",
    "BTN_BUY_IN_TRIBUTE": "Buy in Tribute",
    "BTN_BUY_FOR": "Buy for {price}",
    "BTN_ACCESS_PLAN_MONTH": "Trial period",
    "BTN_ACCESS_PLAN_FOREVER": "Forever",
    "BTN_PAY_STEP_BACK": "← Plans",
    "PAY_PRICE_MONTH_FULL": "790 ₽",
    "PAY_PRICE_MONTH_PROMO": "672 ₽",
    "PAY_PRICE_FOREVER_FULL": "3,990 ₽",
    "PAY_PRICE_FOREVER_DISC": "2,490 ₽",
    "PAY_STEP2_MONTH_INTRO_HTML": (
        "<b>Trial period</b> — pay in Tribute.\n\n"
        "If the channel discount (−15%) is active, you’ll get the promo link and a lower price on the button.\n\n"
        "Tap the button below:"
    ),
    "PAY_STEP2_FOREVER_INTRO_HTML": (
        "<b>Forever</b> — full price 3,990 ₽, pay in Tribute.\n\n"
        "Tap the button below:"
    ),
    "PAY_STEP2_FOREVER_INTRO_DISC_HTML": (
        "<b>Forever — post-test discount</b>, time left: <b>{time_left}</b>.\n"
        "2,490 ₽ instead of 3,990.\n\n"
        "Tap the button below:"
    ),
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
    "TEST_RESULT_MODEL_DISCLAIMER": (
        "<tg-spoiler>This is a simplified practical model. In reality, all brain regions work together as one network.</tg-spoiler>"
    ),
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
    "SUBSCRIPTION_DISCOUNT_NOTE_HTML": "<i>Forever discount — time left: <b>{time_left}</b>.</i>",
    "SUBSCRIPTION_REFUND_BLOCKQUOTE_HTML": "<blockquote>Not happy — money back within 7 days</blockquote>",
    "FOREVER_DISCOUNT_LINE": "🔥 Only for you: Forever <b>2,490 ₽</b> instead of <b>3,990 ₽</b> — discount ends in: <b>{time_left}</b>.",
    "DISCOUNT_LEFT_LT_HOUR": "less than an hour",
    "DISCOUNT_LEFT_ONE_HOUR_EN": "1 hour",
    "DISCOUNT_LEFT_N_HOURS_EN": "{n} hours",
    "BTN_GET_PDF": "📄 Get PDF",
    "BTN_UNLOCK_FULL": "🔓 Full map & plan",
    "CHANNEL_TRIAL_CTA": "🔥 Want to see your full test results right now?\n\nSubscribe to my private channel — I’ll unlock 15 minutes of full access to the “Sexual brain map” (or the test style you picked).",
    "BTN_OPEN_PREMIUM_CHANNEL": "📢 Open channel",
    "BTN_CHECK_CHANNEL_SUB": "✅ I subscribed — verify",
    "CHANNEL_SUB_OK": "15 minutes unlocked — see the messages above.",
    "CHANNEL_SUB_NOT_MEMBER": "Subscription not detected. Join the channel, tap Subscribe, then verify again.",
    "CHANNEL_TRIAL_UNLOCKED": "⏱ Your brain map PDF is above — it auto-deletes in 15 minutes. Download in time.",
    "CHANNEL_TRIAL_DEBOUNCE": "Full access was already sent — scroll up.",
    "CHANNEL_TRIAL_ALREADY_FULL_ACCESS": "You already have full access.",
    "PDF_NEED_SUBSCRIPTION": "PDF is available with full subscription or in the 15-minute window after channel subscribe (button after the test).",
    "LANG_SWITCH": "🌐 Language: {lang}",
    "LANG_PROMPT": (
        "👋 <b>Choose a language so we can chat in the way that’s most comfortable for you:</b>\n\n"
        "🇷🇺 Русский\n"
        "🇬🇧 English"
    ),
    "LANG_RU": "🇷🇺 Русский",
    "LANG_EN": "🇬🇧 English",
    "PDF_GENERATING": "📄 Preparing your PDF…",
    "PDF_BRAIN_MAP_GENERATING": "Generating your brain map PDF…",
    "PDF_CAPTION": "Your brain map (PDF). Save or forward.",
    "TEASER_TITLE_SEXUAL_HTML": "🧠 <b>Your sexual brain map is ready</b>",
    "TEASER_TITLE_GENERAL_HTML": "🧠 <b>Your brain map is ready</b>",
    "TEASER_OPEN_ZONES_HEADER": "<b>Open zones:</b>",
    "TEASER_GROWTH_HEADER": "📌 <b>Growth zones (you can train these now):</b>",
    "TEASER_CLOSER_TAGLINE": "<b>I'll make you better.</b>",
    "TEASER_CLOSER_GET_HEADER": "<b>You get:</b>",
    "TEASER_CLOSER_ITEM_PLAN": "• A personal 30-day plan targeting your <u>weakest</u> zones",
    "TEASER_CLOSER_ITEM_TRACKER_SEX": "• Progress tracker for brain and sexuality",
    "TEASER_CLOSER_ITEM_TRACKER_GEN": "• Progress tracker for brain regions and skills",
    "TEASER_CLOSER_ITEM_EXERCISES": "• 50+ proven drills",
    "TEASER_CLOSER_ITEM_CHANNEL_SEX": "• Private channel for sexual development",
    "TEASER_CLOSER_ITEM_CHANNEL_GEN": "• Private channel for developing all brain regions",
    "TEASER_LIFETIME_SPOILER": "<tg-spoiler><b>⭐ Lifetime access — from {price} ₽</b></tg-spoiler>",
    "TEASER_REFUND_LINE": "<i>Not happy — I’ll refund 100% within 7 days</i>",
    "TEASER_CTA_ACCESS": "👇 <b>Choose access and unlock all zones</b>",
    "TEASER_LOCKED_RL_prefrontal_cortex": "Prefrontal cortex (control + personality)",
    "TEASER_LOCKED_RL_frontal_gyrus": "Frontal gyrus (confidence in words)",
    "BRAIN_RL_prefrontal_cortex": "Prefrontal cortex (personality)",
    "BRAIN_RL_brain_lobes": "Brain lobes (imagery)",
    "BRAIN_RL_insular_cortex": "Insular cortex",
    "BRAIN_RL_temporoparietal_junction": "Temporoparietal junction (social)",
    "BRAIN_RL_amygdala": "Amygdala (emotion)",
    "BRAIN_RL_frontal_gyrus": "Frontal gyrus (speech)",
    "LOCKED_LINE": "🔒 {name} — in full version",
    "STATUS_HIGH": "🟢 high",
    "STATUS_MED": "🟡 medium",
    "STATUS_LOW": "🔴 growth zone",
    "REF_LINK_LABEL": "📎 Invite link:",
    "SKILL_sexual_diversity": "Sexual variety / sexuality",
    "SKILL_self_control": "Confidence",
    "SKILL_sociability": "Sociability",
    "SKILL_speech": "Speech",
    "SKILL_reduce_anxiety": "Ease anxiety",
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
    "BTN_STARS_MONTH": "⭐ Pay with Stars",
    "BTN_STARS_FOREVER": "⭐ Pay with Stars",
    "BTN_STARS_FOREVER_AMOUNT": "Buy with Stars",
    "INV_STARS_FOREVER_TITLE": "BrainBoosty — Forever",
    "INV_STARS_FOREVER_DESC": "Lifetime access: maps, tests, plan, and members-only content (Telegram Stars).",
    "INV_STARS_FOREVER_PRICE_LABEL": "Forever",
    "STARS_INVOICE_SEND_FAIL": "Couldn’t create a Stars invoice. Try again later or pay via Tribute.",
    "STARS_PRECHECK_FAIL": "Payment unavailable. Refresh and try again.",
    "STARS_PAY_ALREADY_LIFETIME": "You already have lifetime access.",
    "PAYMENT_STARS_FOREVER_OK": "✅ Stars payment received. <b>Forever</b> is active.\n\n{vip_block}",
    "STARS_VIP_INVITE_HTML": "<b>Your private channel link:</b>\n{url}\n\n<i>Single-use link — don’t forward it.</i>",
    "STARS_VIP_SKIP_CONFIGURE_HTML": "<i>Private channel: support will send a link (VIP_PRIVATE_CHANNEL_CHAT_ID is not set for the bot).</i>",
    "STARS_VIP_INVITE_FAILED_HTML": "<i>Couldn’t create a channel invite — contact support with a payment screenshot.</i>",
    "BTN_TRIBUTE_MONTH": "💳 790 ₽ Tribute — month",
    "BTN_TRIBUTE_APP": "💳 Pay in Tribute",
    "BTN_TRIBUTE_MONTH_15": "💳 Month −15% (672 ₽) — Tribute",
    "BTN_TRIBUTE_FOREVER_DISC": "💳 2,490 ₽ Tribute — Forever",
    "BTN_TRIBUTE_FOREVER_FULL": "💳 3,990 ₽ Tribute — Forever",
    "INV_MONTH_TITLE": "Trial access — 1 month",
    "INV_MONTH_DESC": "BrainBoosty premium for 30 days.",
    "INV_MONTH_LABEL": "Trial access",
    "INV_FOREVER_DISC_TITLE": "Forever (post-test discount)",
    "INV_FOREVER_DISC_DESC": "Lifetime access at the post-test price. Time left: {time_left}.",
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
    "PDF_BRAIN_SCORE_LABEL": "NeuroScore",
    "PDF_BRAIN_COVER_LINE": "Six zones · one profile. Numbers, focus, and a clear read—no clutter.",
    "PDF_BRAIN_PROGRESS_MAIN": "Your progress {pct}%",
    "PDF_BRAIN_ZONE_LEVEL": "Integrated zone level",
    "PDF_BRAIN_REC_TITLE": "Why this zone is your biggest pleasure lever",
    "PDF_BRAIN_CONNECTIVITY_TITLE": "Inter-region links (educational model)",
    "PDF_BRAIN_M1": "Regional coherence",
    "PDF_BRAIN_M2": "Rhythm",
    "PDF_BRAIN_M3": "Stability",
    "PDF_BRAIN_M4": "Growth headroom",
    "PDF_BRAIN_REC_FALLBACK": "Small daily steps build steady progress without overload.",
    "PDF_BRAIN_REC_UNLOCK": "Full program and all recommendations are in the paid version.",
    "PDF_BRAIN_CTA_BADGE": "FULL UNLOCK",
    "PDF_BRAIN_CTA_TITLE": "Claim full access — today",
    "PDF_BRAIN_CTA_SUB": "A 30-day plan tuned to your profile, a progress tracker, targeted drills, and a private channel — less theory, more reps.",
    "PDF_BRAIN_CTA_SCAN": "Point your camera — pay in seconds via Tribute. Full storefront, instant unlock.",
    "PDF_BRAIN_CTA_URL": "Link:",
    "PDF_BRAIN_HERO_BRAIN": "NEURAL MAP",
    "PDF_BRAIN_SELL_prefrontal_cortex": "This is who runs the scene: impulse or you. Level it up and intimacy feels calmer, deeper, and more premium—without extra drama.",
    "PDF_BRAIN_SELL_brain_lobes": "Your inner picture is half the scene. Sharper, truer imagery means you set the pace and get response—sometimes without a single word.",
    "PDF_BRAIN_SELL_insular_cortex": "The body doesn’t lie: the insula turns sensation into clarity. Less anxious noise—more full-contact presence when you don’t want to drift away.",
    "PDF_BRAIN_SELL_temporoparietal_junction": "Your social radar for timing, cues, and pauses. When it’s accurate, awkward misunderstandings fade—what remains is sync and trust.",
    "PDF_BRAIN_SELL_amygdala": "Triggers cut depth. A steadier amygdala means braver desire and honest bedroom talk—without snaps and autopilot resentment.",
    "PDF_BRAIN_SELL_frontal_gyrus": "Words are the UI of pleasure. Clear asks land softer and stronger: fewer hints into the void—more real-world yes.",
    "PDF_BRAIN_PAGE_prefrontal_cortex": "Prefrontal cortex",
    "PDF_BRAIN_PAGE_brain_lobes": "Brain lobes · imagery",
    "PDF_BRAIN_PAGE_insular_cortex": "Insular cortex",
    "PDF_BRAIN_PAGE_temporoparietal_junction": "Temporoparietal junction",
    "PDF_BRAIN_PAGE_amygdala": "Amygdala",
    "PDF_BRAIN_PAGE_frontal_gyrus": "Frontal gyrus",
    "PDF_FOOTER": "Educational model, not medical advice.",
    "BRAIN_MAP_PHOTO_TITLE": "Brain map — regions",
    "BRAIN_MAP_PHOTO_LOCKED": "🔒 full version",
    "BRAIN_MAP_PHOTO_TEASER_HINT": "Personal tips and a 30-day plan — after payment.",
    "BRAIN_MAP_PHOTO_CAPTION_PAID": "🗺 Your brain zones (full).",
    "BRAIN_MAP_PHOTO_CAPTION_FREE": "🗺 Infographic: some zones unlock after payment.",
}

TRANSLATIONS: dict[str, dict[str, str]] = {"ru": RU, "en": EN}
