# Web App на VPS

## Идеальный запуск

1. VPS (Ubuntu), Docker + Compose, порты **80** и **443** открыты.
2. DNS: **A** `@` и `www` → IP VPS.
3. `.env` из `.env.example` (см. `WEBAPP_PUBLIC_URL`, `ACME_EMAIL`, `BOT_TOKEN`, …).
4. Один раз:

```bash
cd brainboosty_hook_bot
chmod +x scripts/dev-up.sh
./scripts/dev-up.sh
```

Скрипт: собирает `webapp/dist` → `docker compose` (postgres, redis, api, bot, **caddy**) → ждёт API → сверяет DNS с IP VPS → проверяет `https://…/api/webapp/health`.

5. BotFather → домен `brainboosty.ai` (как `WEBAPP_DOMAIN`).
6. Tribute → вебхук `https://brainboosty.ai/tribute/webhook`, `TRIBUTE_WEBHOOK_PORT=0`.

Повторный деплой без пересборки фронта:

```bash
SKIP_BUILD=1 ./scripts/dev-up.sh
```

## Локальный Mac (без Telegram)

```bash
sudo sh -c 'echo "127.0.0.1 brainboosty.ai" >> /etc/hosts'
./scripts/dev-up.sh local
```

## Telegram: режим webhook (по умолчанию)

Апдейты приходят **на ваш сервер** (`POST /telegram/webhook`), а не через long polling.

В `.env`:

```env
TELEGRAM_UPDATE_MODE=webhook
TELEGRAM_WEBHOOK_SECRET=случайная_длинная_строка
WEBAPP_PUBLIC_URL=https://brainboosty.ai
```

Запуск **без** контейнера `bot`:

```bash
docker compose -f docker-compose.yml -f docker-compose.caddy.yml up -d api
```

При старте `api` один раз вызывает `setWebhook` (нужен доступ к api.telegram.org или `TELEGRAM_PROXY_URL`). Дальше бот работает на входящих HTTPS-запросах от Telegram.

Локальный polling (редко): `TELEGRAM_UPDATE_MODE=polling` и `docker compose --profile polling up bot`.

## Бот: `TelegramNetworkError: Request timeout`

На части VPS (РФ, некоторые ДЦ) **api.telegram.org** недоступен или режется.

На сервере:

```bash
curl -4 -v --max-time 15 https://api.telegram.org
```

- **Таймаут / нет ответа** → VPS в **EU** (Hetzner, DigitalOcean Amsterdam и т.п.) **или** прокси в `.env`:

  ```env
  TELEGRAM_PROXY_URL=socks5://host:port
  TELEGRAM_REQUEST_TIMEOUT=90
  ```

  Пересборка: `docker compose -f docker-compose.yml -f docker-compose.caddy.yml up -d --build bot api`

- **Ответ 200/302** → смотрите `BOT_TOKEN`, логи `docker compose logs bot`.

## Логи и остановка

```bash
docker compose -f docker-compose.yml -f docker-compose.caddy.yml logs -f caddy
docker compose -f docker-compose.yml -f docker-compose.caddy.yml down
```
