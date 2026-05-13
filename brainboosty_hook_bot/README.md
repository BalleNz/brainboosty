# BrainBoosty Hook Bot

Telegram-бот на **aiogram 3.x**, **SQLAlchemy 2.0 (async)** и **Alembic**. Ежедневные «хуки» для тренировки когнитивных навыков, анкета, персональная «карта мозга», реферальная программа и админ-рассылки.

## Быстрый старт

Рекомендуется **Python 3.11–3.13**. На **Python 3.14** сборка `pydantic-core` (зависимость `aiogram`/`pydantic`) может быть недоступна до выхода колёс под вашу платформу — используйте 3.13 или ниже.

1. Создайте виртуальное окружение и установите зависимости:

```bash
cd brainboosty_hook_bot
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

2. Заполните `.env`:

- `BOT_TOKEN` — токен у [@BotFather](https://t.me/BotFather)
- `BOT_USERNAME` — username бота **без** `@` (для реферальных ссылок)
- `ADMIN_USERNAME` — админ без `@` (по умолчанию `yeasex`)
- `DATABASE_URL` — например `sqlite+aiosqlite:///./brainboosty.db` или строка Postgres с `postgresql+asyncpg://...`
- `OPENAI_API_KEY` — ключ для расчёта нейропрофиля по расширенному опроснику (если пусто, используется локальный fallback по тем же правилам)
- `OPENAI_MODEL` — например `gpt-4o-mini`
- **Оплата:** Stars выставляются из бота (`provider_token=""`, валюта `XTR`). Для **Tribute** задайте `TRIBUTE_WEBHOOK_SECRET` и при необходимости `TRIBUTE_WEBHOOK_PORT` + публичный HTTPS URL на `TRIBUTE_WEBHOOK_PATH`. Подпись запроса — заголовок `trbt-signature` (HMAC-SHA256 тела, [документация](https://wiki.tribute.tg/for-content-creators/api-documentation/webhooks)). В кабинете Tribute укажите ссылки продуктов в `TRIBUTE_PAY_URL_*`.
- После прохождения теста на **48 часов** открывается окно скидки Forever (2 490 ₽ / 2 490 ⭐ вместо 3 990 ₽ / 3 900 ⭐).

3. Примените миграции (включая историю прохождений теста `brain_region_snapshots`):

```bash
alembic upgrade head
```

4. Запустите бота:

```bash
python -m src.main
```

Время ежедневной рассылки задаётся `DAILY_HOOK_HOUR` / `DAILY_HOOK_MINUTE` (UTC).

## Структура

См. дерево каталогов в репозитории: `src/` (handlers, services, database, middlewares), `alembic/` (миграции).

## Примечания

- FSM-хранилище по умолчанию — **MemoryStorage**. Для нескольких процессов используйте Redis и `RedisStorage`.
- Поле `premium_until` продлевается на **24 часа** за каждые **3** успешные регистрации по реферальной ссылке.
- «Карта мозга» — эвристическая модель для UX, не является медицинской диагностикой.
