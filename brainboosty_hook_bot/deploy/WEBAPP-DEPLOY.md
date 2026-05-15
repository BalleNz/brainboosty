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

## Логи и остановка

```bash
docker compose -f docker-compose.yml -f docker-compose.caddy.yml logs -f caddy
docker compose -f docker-compose.yml -f docker-compose.caddy.yml down
```
