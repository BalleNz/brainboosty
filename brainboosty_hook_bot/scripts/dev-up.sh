#!/usr/bin/env bash
# Сборка webapp + Docker (api, bot, postgres, redis) + Caddy.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

MODE="${1:-public}"

echo "==> Building webapp (Vite)…"
if ! command -v npm >/dev/null 2>&1; then
  echo "npm not found. Install Node.js or build webapp manually: cd webapp && npm ci && npm run build"
  exit 1
fi
(cd webapp && npm ci && npm run build)

COMPOSE=(docker compose -f docker-compose.yml)
if [[ "$MODE" == "local" ]]; then
  COMPOSE+=(-f docker-compose.caddy.local.yml)
  echo "==> Starting stack (local Caddy, tls internal)…"
elif [[ "$MODE" == "public" ]]; then
  COMPOSE+=(-f docker-compose.caddy.yml)
  echo "==> Starting stack (Caddy + Let's Encrypt)…"
else
  echo "Usage: $0 [public|local]"
  echo "  public — Caddy + real HTTPS (нужен DNS A на этот компьютер)"
  echo "  local  — Caddy + /etc/hosts (только браузер на этой машине)"
  exit 1
fi

"${COMPOSE[@]}" up --build -d

echo ""
echo "==> Health (direct API on :8000):"
sleep 3
curl -sf "http://127.0.0.1:${API_PUBLISH_PORT:-8000}/health" && echo "" || echo "(api not ready yet)"

if [[ "$MODE" == "public" ]]; then
  echo ""
  echo "==> Ваш публичный IPv4 для DNS A-записи brainboosty.ai:"
  # Несколько сервисов: ifconfig.me часто даёт 403 или висит за VPN.
  for url in \
    "https://api4.ipify.org" \
    "https://ipv4.icanhazip.com" \
    "https://checkip.amazonaws.com" \
    "https://1.1.1.1/cdn-cgi/trace" \
    ; do
    if [[ "$url" == *"cloudflare"* ]]; then
      ip="$(curl -4 -fsS --max-time 8 "$url" 2>/dev/null | sed -n 's/^ip=//p' | head -1)"
    else
      ip="$(curl -4 -fsS --max-time 8 "$url" 2>/dev/null | tr -d '[:space:]')"
    fi
    if [[ "$ip" =~ ^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
      echo "    $ip   (via $url)"
      echo ""
      echo "    DNS:  A   @   →   $ip"
      echo "    (опционально)  A   www   →   $ip"
      echo ""
      echo "    Роутер: проброс TCP 80 и 443 на этот Mac/PC."
      echo "    Проверка: https://brainboosty.ai/api/webapp/health"
      exit 0
    fi
  done
  echo "    (не удалось — VPN/файрвол; IP для DNS вы уже могли прописать вручную)"
fi

echo ""
echo "==> Дальше (Web App уже поднят, если контейнеры running):"
echo "    1) docker compose -f docker-compose.yml -f docker-compose.caddy.yml ps"
echo "    2) Роутер: проброс TCP 80 и 443 → IP этого Mac в LAN"
echo "    3) https://brainboosty.ai/api/webapp/health  (dist_built: true)"
echo "    4) https://brainboosty.ai/webapp/"
echo "    5) BotFather → домен бота: brainboosty.ai"
echo "    6) В Telegram: /start → «Открыть Neural Map»"
echo ""
echo "    Логи Caddy (сертификат): docker compose -f docker-compose.yml -f docker-compose.caddy.yml logs -f caddy"

if [[ "$MODE" == "local" ]]; then
  echo ""
  echo "==> Локально: добавьте в /etc/hosts:"
  echo "    127.0.0.1 brainboosty.ai www.brainboosty.ai"
  echo "    Откройте: https://brainboosty.ai/webapp/ (примите самоподписанный сертификат)"
  echo "    Telegram Web App с телефона: используйте режим public + DNS A на публичный IP."
fi
