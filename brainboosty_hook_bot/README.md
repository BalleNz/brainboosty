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
- **Оплата:** кнопка **«Купить в Трибьют»** ведёт в Mini App: `TRIBUTE_APP_URL` (обычно), при активном окне скидки после теста — `TRIBUTE_APP_URL_FOREVER_DISC` (Forever 2490 ₽ вместо 3990). Для −15% на месяц после канала — `TRIBUTE_APP_URL_PROMO_15`. Значения по умолчанию в `config.py`, при необходимости переопределите в `.env`.
- **Вебхук Tribute** (выдача доступа после оплаты в Tribute): Tribute шлёт POST на ваш URL. Он должен быть **доступен из интернета по HTTPS** (или HTTP с туннелем, если так допускает Tribute). На **чистом localhost без туннеля** вебхук **не дойдёт**. Обычно: **VDS/VPS** с белым IP и nginx + TLS, либо **ngrok / Cloudflare Tunnel** на машине разработчика. В `.env`: `TRIBUTE_WEBHOOK_SECRET`, `TRIBUTE_WEBHOOK_PORT` (>0), при необходимости `TRIBUTE_WEBHOOK_HOST` / `TRIBUTE_WEBHOOK_PATH`. Пока `TRIBUTE_WEBHOOK_PORT=0` или пустой секрет — HTTP-сервер вебхука **не поднимается**; **автоматическая выдача после Tribute** — только если вебхук реально принимает запросы.
- После прохождения теста на **24 часа** открывается окно скидки Forever (**2 490 ₽** вместо **3 990 ₽**); кнопка «Купить в Трибьют» ведёт на `TRIBUTE_APP_URL_FOREVER_DISC`.

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

- FSM-хранилище — **RedisStorage** (`REDIS_URL` в `.env`, в Docker: `redis://redis:6379/0`).
- Поле `premium_until` продлевается на **24 часа** за каждые **3** успешные регистрации по реферальной ссылке.
- «Карта мозга» — эвристическая модель для UX, не является медицинской диагностикой.
