# Web App: Caddy + brainboosty.ai

## DNS: какой IP в A-запись

Вставьте **публичный IPv4 интернета** машины, где крутится Docker + Caddy — **не** `127.0.0.1` и **не** `192.168.x.x`.

Узнать IP (если `ifconfig.me` висит за VPN или даёт 403 — используйте другой способ):

```bash
curl -4 https://api4.ipify.org
curl -4 https://ipv4.icanhazip.com
curl -4 https://checkip.amazonaws.com
curl -4 https://1.1.1.1/cdn-cgi/trace | grep '^ip='
```

В браузере **без VPN**: откройте https://api4.ipify.org или https://ipv4.icanhazip.com — покажет одну строку с IP.

Или: панель роутера → «WAN» / «Интернет» → «Внешний IP».

Запуск `./scripts/dev-up.sh public` тоже пробует несколько сервисов подряд.

| Запись | Тип | Имя | Значение |
|--------|-----|-----|----------|
| Корень домена | **A** | `@` | ваш публичный IPv4 |
| www (опционально) | **A** | `www` | тот же IPv4 |

Пока DNS не обновился (до 24 ч), тест из Telegram не заработает.

**Роутер:** проброс **TCP 80** и **443** на IP вашего Mac в локальной сети (см. настройки Port Forwarding / NAT).

**macOS:** Системные настройки → Сеть → Файрвол — разрешить входящие для Docker/Caddy или временно отключить для теста.

---

## Быстрый старт (реальный HTTPS, Telegram)

1. `.env`:

   ```env
   WEBAPP_PUBLIC_URL=https://brainboosty.ai
   WEBAPP_DOMAIN=brainboosty.ai
   ACME_EMAIL=you@example.com
   ```

2. BotFather → домен бота: `brainboosty.ai`

3. Запуск:

   ```bash
   cd brainboosty_hook_bot
   chmod +x scripts/dev-up.sh
   ./scripts/dev-up.sh public
   ```

4. Проверки:

   - https://brainboosty.ai/health
   - https://brainboosty.ai/api/webapp/health → `"dist_built": "true"`
   - В боте кнопка «Открыть Neural Map»

---

## Только браузер на этом Mac (без DNS)

Telegram с телефона **не** подойдёт (нужен доверенный сертификат и публичный IP).

```bash
sudo sh -c 'echo "127.0.0.1 brainboosty.ai www.brainboosty.ai" >> /etc/hosts'
./scripts/dev-up.sh local
```

Откройте https://brainboosty.ai/webapp/ и примите предупреждение о сертификате.

---

## Остановка

```bash
docker compose -f docker-compose.yml -f docker-compose.caddy.yml down
# или для local:
docker compose -f docker-compose.yml -f docker-compose.caddy.local.yml down
```

## Логи Caddy

```bash
docker compose -f docker-compose.yml -f docker-compose.caddy.yml logs -f caddy
```

Если Let's Encrypt не выдаёт сертификат: проверьте DNS (`dig brainboosty.ai +short`), порты 80/443 снаружи, что A-запись указывает на этот же IP, что `curl ifconfig.me`.
