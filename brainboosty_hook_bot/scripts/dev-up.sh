#!/usr/bin/env bash
# Деплой BrainBoosty на VPS (по умолчанию) или локальная отладка.
#
# Идеальный сценарий на VPS:
#   1) DNS A (@ и www) → IP этого сервера, порты 80/443 открыты в firewall
#   2) .env заполнен (BOT_TOKEN, DATABASE_URL, WEBAPP_PUBLIC_URL, ACME_EMAIL, …)
#   3) ./scripts/dev-up.sh
#   4) Caddy получает Let's Encrypt, API/Web App доступны по HTTPS
#   5) BotFather: домен = WEBAPP_DOMAIN; Tribute: POST …/tribute/webhook
#
# Использование:
#   ./scripts/dev-up.sh              # VPS / production (Caddy + Let's Encrypt)
#   ./scripts/dev-up.sh vps            # то же
#   ./scripts/dev-up.sh local          # Mac: /etc/hosts + самоподписанный TLS
#   ./scripts/dev-up.sh vps --skip-build   # без npm (если webapp/dist уже есть)
#   SKIP_BUILD=1 ./scripts/dev-up.sh

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

MODE="vps"
SKIP_BUILD="${SKIP_BUILD:-0}"
for arg in "$@"; do
  case "$arg" in
    vps|prod|public|local) MODE="$arg" ;;
    --skip-build) SKIP_BUILD=1 ;;
    -h|--help)
      sed -n '2,16p' "$0" | sed 's/^# \{0,1\}//'
      exit 0
      ;;
    *)
      echo "Неизвестный аргумент: $arg (см. $0 --help)"
      exit 1
      ;;
  esac
done

# public = alias vps
[[ "$MODE" == "public" || "$MODE" == "prod" ]] && MODE="vps"

if [[ -f .env ]]; then
  set -a
  # shellcheck disable=SC1091
  source .env
  set +a
fi

DOMAIN="${WEBAPP_DOMAIN:-brainboosty.ai}"
PUBLIC_URL="${WEBAPP_PUBLIC_URL:-https://${DOMAIN}}"
PUBLIC_URL="${PUBLIC_URL%/}"
API_PORT="${API_PUBLISH_PORT:-8000}"
WEBHOOK_PATH="${TRIBUTE_WEBHOOK_PATH:-/tribute/webhook}"

COMPOSE=(docker compose -f docker-compose.yml)
COMPOSE_LABEL="docker-compose.yml + docker-compose.caddy.yml"

if [[ "$MODE" == "vps" ]]; then
  COMPOSE+=(-f docker-compose.caddy.yml)
elif [[ "$MODE" == "local" ]]; then
  COMPOSE+=(-f docker-compose.caddy.local.yml)
  COMPOSE_LABEL="docker-compose.yml + docker-compose.caddy.local.yml"
else
  echo "Режим: vps (по умолчанию) | local"
  exit 1
fi

need_cmd() {
  command -v "$1" >/dev/null 2>&1 || {
    echo "Ошибка: не найдено «$1»"
    exit 1
  }
}

need_cmd docker
docker compose version >/dev/null 2>&1 || {
  echo "Ошибка: нужен Docker Compose v2 (docker compose)"
  exit 1
}

if [[ -z "${BOT_TOKEN:-}" ]]; then
  echo "Предупреждение: BOT_TOKEN пуст в .env — бот и проверка initData Web App не заработают"
fi

if [[ "$MODE" == "vps" && -z "${WEBAPP_PUBLIC_URL:-}" ]]; then
  echo "Предупреждение: задайте WEBAPP_PUBLIC_URL=https://${DOMAIN} в .env"
fi

build_webapp() {
  if [[ "$SKIP_BUILD" == "1" && -f webapp/dist/index.html ]]; then
    echo "==> Webapp: пропуск сборки (--skip-build, dist на месте)"
    return
  fi
  need_cmd npm
  echo "==> Webapp: npm ci && npm run build"
  (cd webapp && npm ci && npm run build)
}

server_ipv4() {
  local ip=""
  if [[ "$(uname -s)" == "Linux" ]]; then
    ip="$(hostname -I 2>/dev/null | awk '{for(i=1;i<=NF;i++) if ($i ~ /^[0-9]+\./) {print $i; exit}}')"
  fi
  if [[ -z "$ip" ]]; then
    for url in https://api4.ipify.org https://ipv4.icanhazip.com https://checkip.amazonaws.com; do
      ip="$(curl -4 -fsS --max-time 6 "$url" 2>/dev/null | tr -d '[:space:]')" && break
    done
  fi
  if [[ "$ip" =~ ^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    echo "$ip"
  fi
}

dns_a_record() {
  local host="$1"
  if command -v dig >/dev/null 2>&1; then
    dig +short "$host" A 2>/dev/null | grep -E '^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+$' | head -1
    return
  fi
  if command -v host >/dev/null 2>&1; then
    host -t A "$host" 2>/dev/null | awk '/has address/ {print $4; exit}'
  fi
}

wait_http() {
  local url="$1" tries="${2:-30}" i
  for ((i = 1; i <= tries; i++)); do
    if curl -fsS --max-time 5 "$url" >/dev/null 2>&1; then
      return 0
    fi
    sleep 2
  done
  return 1
}

echo "==> Режим: $MODE"
echo "==> Домен: $DOMAIN"
echo "==> URL:   $PUBLIC_URL"

build_webapp

echo "==> Docker: ${COMPOSE[*]} up --build -d api"
"${COMPOSE[@]}" up --build -d api

echo ""
echo "==> Ожидание API (http://127.0.0.1:${API_PORT}/health)…"
if wait_http "http://127.0.0.1:${API_PORT}/health" 40; then
  curl -fsS "http://127.0.0.1:${API_PORT}/health" && echo ""
  echo "--- webapp bundle ---"
  curl -fsS "http://127.0.0.1:${API_PORT}/api/webapp/health" && echo "" || true
else
  echo "    API не ответил — смотрите: ${COMPOSE[*]} logs api"
fi

echo ""
echo "==> Контейнеры:"
"${COMPOSE[@]}" ps

if [[ "$MODE" == "vps" ]]; then
  SERVER_IP="$(server_ipv4 || true)"
  DNS_IP="$(dns_a_record "$DOMAIN" || true)"

  echo ""
  echo "==> DNS (перед HTTPS)"
  if [[ -n "$SERVER_IP" ]]; then
    echo "    IP этого VPS:     ${SERVER_IP}"
    echo "    DNS A ${DOMAIN}:  ${DNS_IP:-не удалось проверить (установите dig)}"
    if [[ -n "$DNS_IP" && "$DNS_IP" != "$SERVER_IP" ]]; then
      echo "    ⚠ A-запись не совпадает с IP VPS — Let's Encrypt может не выдать сертификат"
    elif [[ -n "$DNS_IP" ]]; then
      echo "    ✓ DNS указывает на этот сервер"
    fi
    echo "    В панели домена:  A  @  →  ${SERVER_IP}"
    echo "                      A  www  →  ${SERVER_IP}"
  else
    echo "    Узнайте IP VPS: hostname -I  или панель хостинга"
  fi

  HEALTH_URL="${PUBLIC_URL}/api/webapp/health"
  echo ""
  echo "==> HTTPS (Caddy + Let's Encrypt, до ~2 мин)…"
  if wait_http "$HEALTH_URL" 25; then
    curl -fsS "$HEALTH_URL" && echo ""
    echo "    ✓ ${HEALTH_URL}"
  else
    echo "    ⚠ Пока нет ответа по HTTPS"
    echo "      firewall: ufw allow 80,443  (или откройте в панели VPS)"
    echo "      логи: ${COMPOSE[*]} logs -f caddy"
  fi
fi

echo ""
echo "==> Готово — проверьте вручную"
echo "    Web App:    ${PUBLIC_URL}/webapp/"
echo "    Tribute:    POST ${PUBLIC_URL}${WEBHOOK_PATH}"
echo "    BotFather:  домен бота → ${DOMAIN}"
echo "    Telegram:   webhook ${PUBLIC_URL}${TELEGRAM_WEBHOOK_PATH:-/telegram/webhook}"
echo "                /start → «Открыть Neural Map» (контейнер api, не bot)"
echo ""
echo "    Логи:  ${COMPOSE[*]} logs -f caddy"
echo "    Стоп:  ${COMPOSE[*]} down"

if [[ "$MODE" == "local" ]]; then
  echo ""
  echo "==> Режим local: добавьте в /etc/hosts на Mac:"
  echo "    127.0.0.1 ${DOMAIN} www.${DOMAIN}"
  echo "    Откройте: ${PUBLIC_URL}/webapp/ (самоподписанный сертификат)"
fi
