"""Загрузка настроек окружения (Pydantic Settings)."""

from __future__ import annotations

from functools import lru_cache
from pathlib import Path

from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict

# Корень проекта: brainboosty_hook_bot/
_PROJECT_ROOT = Path(__file__).resolve().parents[2]


class Settings(BaseSettings):
    """Конфигурация бота и инфраструктуры."""

    model_config = SettingsConfigDict(
        env_file=_PROJECT_ROOT / ".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    BOT_TOKEN: str = Field(
        default="",
        description="Токен Telegram-бота (@BotFather). Пустой допустим только для alembic без polling.",
    )
    TELEGRAM_PROXY_URL: str = Field(
        default="",
        description=(
            "Прокси до api.telegram.org, если VPS не достучался (таймаут). "
            "Примеры: socks5://127.0.0.1:1080  http://user:pass@host:3128"
        ),
    )
    TELEGRAM_REQUEST_TIMEOUT: float = Field(
        default=90.0,
        ge=15.0,
        le=300.0,
        description="Таймаут HTTP-запросов к Telegram API (сек.)",
    )
    TELEGRAM_UPDATE_MODE: str = Field(
        default="webhook",
        description="webhook (рекомендуется на VPS/РФ) или polling (только локальная отладка)",
    )
    TELEGRAM_WEBHOOK_PATH: str = Field(
        default="/",
        description=(
            "POST-путь вебхука на FastAPI. По умолчанию «/»: тот же URL что и главная "
            "(GET / → редирект в Web App, POST / — только Telegram). Иначе задайте, напр. /telegram/webhook."
        ),
    )
    TELEGRAM_WEBHOOK_SECRET: str = Field(
        default="",
        description="Секрет X-Telegram-Bot-Api-Secret-Token (задайте случайную строку)",
    )
    TELEGRAM_WEBHOOK_URL: str = Field(
        default="",
        description="Полный URL вебхука; пусто → {WEBAPP_PUBLIC_URL}{TELEGRAM_WEBHOOK_PATH}",
    )
    BOT_USERNAME: str = Field(
        default="BrainBoostyHookBot",
        description="Username бота без @ (для реферальных ссылок)",
    )
    ADMIN_USERNAME: str = Field(default="yeasex", description="Telegram username админа без @")

    DATABASE_URL: str = Field(
        default="sqlite+aiosqlite:///./brainboosty.db",
        description="Async SQLAlchemy URL (Docker: postgresql+asyncpg://user:pass@postgres:5432/db)",
    )

    # --- Redis: FSM (анкета, когнитивный тест: cq, answers, quest_lang и т.д.) ---
    REDIS_URL: str = Field(
        default="",
        description="redis://host:6379/0 — FSM в Redis; пусто → MemoryStorage (один процесс, без персистентности)",
    )
    REDIS_FSM_STATE_TTL_SECONDS: int = Field(
        default=0,
        ge=0,
        description="TTL FSM-state в секундах; 0 = без TTL (удобно «продолжить тест» после рестарта бота)",
    )
    REDIS_FSM_DATA_TTL_SECONDS: int = Field(
        default=0,
        ge=0,
        description="TTL FSM-data в секундах; 0 = без TTL",
    )

    # --- HTTP API (отдельный контейнер `api`, Uvicorn) — только для справки в .env ---
    API_HOST: str = Field(default="0.0.0.0", description="Хост bind для uvicorn (см. docker-compose)")
    API_PORT: int = Field(default=8000, ge=1, le=65535, description="Порт uvicorn внутри контейнера api")

    WEBAPP_PUBLIC_URL: str = Field(
        default="",
        description=(
            "Публичный HTTPS URL API без слэша на конце (например https://api.example.com). "
            "Публичный URL сайта и Web App: {WEBAPP_PUBLIC_URL}/"
        ),
    )

    WEBAPP_SITE_SESSION_SECRET: str = Field(
        default="",
        description=(
            "Секрет подписи браузерных сессий (Neural Map Hub в браузере) и OIDC state. "
            "Пусто — ключ выводится из BOT_TOKEN."
        ),
    )

    TELEGRAM_OIDC_CLIENT_ID: str = Field(
        default="",
        description="Client ID из BotFather → Bot Settings → Web Login (Telegram Login OIDC).",
    )
    TELEGRAM_OIDC_CLIENT_SECRET: str = Field(
        default="",
        description="Client Secret из BotFather → Web Login.",
    )
    TELEGRAM_OIDC_REDIRECT_URI: str = Field(
        default="",
        description=(
            "Redirect URI для OIDC callback; должен быть в Allowed URLs у BotFather. "
            "Пусто → {WEBAPP_PUBLIC_URL}/api/webapp/auth/oidc/callback"
        ),
    )
    TELEGRAM_OIDC_SCOPES: str = Field(
        default="openid profile",
        description="Пробел-разделённые scope (openid обязателен).",
    )

    DAILY_HOOK_HOUR: int = Field(default=10, ge=0, le=23)
    DAILY_HOOK_MINUTE: int = Field(default=0, ge=0, le=59)

    # Антифлуд: минимальный интервал между сообщениями одного пользователя (сек.)
    THROTTLE_SECONDS: float = Field(default=0.7, ge=0.1)

    OPENAI_API_KEY: str = Field(
        default="",
        description="Ключ API: OpenAI (platform.openai.com) или другого OpenAI-совместимого хоста (см. OPENAI_BASE_URL). Пусто → локальный fallback.",
    )
    OPENAI_BASE_URL: str = Field(
        default="",
        description=(
            "Базовый URL OpenAI-совместимого API без /v1 (добавится автоматически). "
            "Пусто → api.openai.com, кроме случая когда в OPENAI_MODEL есть «deepseek» — тогда https://api.deepseek.com. "
            "Явный URL всегда имеет приоритет."
        ),
    )
    OPENAI_MODEL: str = Field(
        default="gpt-4o-mini",
        description=(
            "Идентификатор модели на выбранном API (для OpenAI по умолчанию — gpt-4o-mini). "
            "Если в имени есть «deepseek», а OPENAI_BASE_URL пуст — используется https://api.deepseek.com."
        ),
    )

    @field_validator("OPENAI_API_KEY", mode="before")
    @classmethod
    def _normalize_openai_api_key(cls, v: object) -> object:
        if v is None:
            return ""
        if not isinstance(v, str):
            return v
        s = v.strip().lstrip("\ufeff")
        if len(s) >= 2 and s[0] == s[-1] and s[0] in "\"'":
            s = s[1:-1].strip()
        return s

    @field_validator("OPENAI_BASE_URL", mode="before")
    @classmethod
    def _normalize_openai_base_url(cls, v: object) -> object:
        if v is None:
            return ""
        if not isinstance(v, str):
            return v
        return v.strip().rstrip("/")

    # Tribute: подпись вебхука (HMAC-SHA256 тела, заголовок trbt-signature)
    TRIBUTE_WEBHOOK_SECRET: str = Field(default="", description="Секрет/API key для проверки trbt-signature")
    TRIBUTE_WEBHOOK_HOST: str = Field(
        default="0.0.0.0",
        description="Только для встроенного aiohttp (TRIBUTE_WEBHOOK_PORT>0); в Docker см. сервис api",
    )
    TRIBUTE_WEBHOOK_PORT: int = Field(
        default=0,
        ge=0,
        le=65535,
        description=">0 — поднять встроенный aiohttp в процессе бота; в Docker оставьте 0 (вебхук на FastAPI в `api`)",
    )
    TRIBUTE_WEBHOOK_PATH: str = Field(
        default="/tribute/webhook",
        description="Путь POST для Tribute (тот же в FastAPI-сервисе api)",
    )
    TRIBUTE_PRODUCT_ID_MONTH: str = Field(default="", description="Опционально: id продукта «месяц» в JSON вебхука")
    TRIBUTE_PRODUCT_ID_FOREVER: str = Field(default="", description="Опционально: id продукта «навсегда» в JSON вебхука")

    TRIBUTE_APP_URL: str = Field(
        default="https://t.me/tribute/app?startapp=sUmL",
        description="Tribute Mini App — основная витрина/оплата",
    )
    TRIBUTE_APP_URL_PROMO_15: str = Field(
        default="https://t.me/tribute/app?startapp=sUmL_pc_BRAINBOOST",
        description="Tribute с промокодом −15% на пробный месяц",
    )
    TRIBUTE_APP_URL_FOREVER_DISC: str = Field(
        default="https://t.me/tribute/app?startapp=sUmL_pc_32R2RCUK15",
        description="Tribute Forever 2490 ₽ (вместо 3990); кнопка «Купить в Трибьют» при активном окне скидки после теста",
    )
    TRIBUTE_PAY_URL_MONTH: str = Field(default="", description="Устарело: используйте TRIBUTE_APP_URL")
    TRIBUTE_PAY_URL_FOREVER: str = Field(default="", description="Устарело")
    TRIBUTE_PAY_URL_FOREVER_DISCOUNT: str = Field(default="", description="Устарело")

    ABOUT_PHOTO_PATH: str = Field(
        default="",
        description=(
            "Фото для «О проекте» и лендинга: абсолютный путь или относительно корня проекта. "
            "Пусто — ищем assets/author.webp,jpg,png … затем images/author.*"
        ),
    )

    PREMIUM_CHANNEL_USERNAME: str = Field(
        default="androgenautist",
        description="Публичный username канала без @ (проверка подписки и ссылка t.me)",
    )

    VIP_PRIVATE_CHANNEL_CHAT_ID: str = Field(
        default="",
        description=(
            "Числовой ID приватного канала/чата (-100…), куда бот шлёт одноразовую invite после оплаты Stars "
            "(Forever). Бот — админ канала с правом создавать пригласительные ссылки."
        ),
    )
    STARS_FOREVER_FULL: int = Field(
        default=3900,
        ge=1,
        description="Цена Forever в Telegram Stars (полная), валюта XTR, 1 = 1 ⭐",
    )
    STARS_FOREVER_DISCOUNT: int = Field(
        default=2490,
        ge=1,
        description="Цена Forever в Stars при активном окне скидки после теста (как для Tribute)",
    )

    def _with_v1_suffix(self, base: str) -> str:
        u = base.rstrip("/")
        return u if u.endswith("/v1") else f"{u}/v1"

    @property
    def openai_base_url_resolved(self) -> str | None:
        """Полный base_url для AsyncOpenAI (с суффиксом /v1) или None — тогда клиент берёт дефолт platform.openai.com."""
        raw = (self.OPENAI_BASE_URL or "").strip()
        if raw:
            return self._with_v1_suffix(raw)
        # Без явного URL ключ DeepSeek уходит на OpenAI → 401. Совместимые хосты по имени модели:
        model = (self.OPENAI_MODEL or "").strip().lower()
        if "deepseek" in model:
            return self._with_v1_suffix("https://api.deepseek.com")
        return None

    @property
    def uses_telegram_webhook(self) -> bool:
        return (self.TELEGRAM_UPDATE_MODE or "webhook").strip().lower() == "webhook"

    @property
    def telegram_webhook_url(self) -> str:
        explicit = (self.TELEGRAM_WEBHOOK_URL or "").strip().rstrip("/")
        if explicit:
            return explicit
        base = (self.WEBAPP_PUBLIC_URL or "").strip().rstrip("/")
        path = (self.TELEGRAM_WEBHOOK_PATH or "/").strip()
        if not path:
            path = "/"
        if not path.startswith("/"):
            path = f"/{path}"
        return f"{base}{path}"

    @property
    def telegram_oidc_redirect_uri(self) -> str:
        explicit = (self.TELEGRAM_OIDC_REDIRECT_URI or "").strip().rstrip("/")
        if explicit:
            return explicit
        base = (self.WEBAPP_PUBLIC_URL or "").strip().rstrip("/")
        if not base:
            return ""
        return f"{base}/api/webapp/auth/oidc/callback"

    @property
    def telegram_oidc_scopes(self) -> str:
        raw = (self.TELEGRAM_OIDC_SCOPES or "openid profile").strip()
        parts = [p for p in raw.split() if p]
        if "openid" not in parts:
            parts.insert(0, "openid")
        return " ".join(parts)

    @property
    def premium_channel_url(self) -> str:
        name = self.PREMIUM_CHANNEL_USERNAME.strip().lstrip("@")
        return f"https://t.me/{name}" if name else "https://t.me/androgenautist"

    @property
    def premium_channel_chat_id(self) -> str:
        """Идентификатор чата для getChatMember (@username)."""
        name = self.PREMIUM_CHANNEL_USERNAME.strip().lstrip("@")
        return f"@{name}" if name else "@androgenautist"

    @property
    def database_url_sync(self) -> str:
        """URL для Alembic и синхронных операций миграций."""
        url = self.DATABASE_URL
        if url.startswith("postgresql+asyncpg"):
            return url.replace("postgresql+asyncpg", "postgresql+psycopg2", 1)
        if url.startswith("sqlite+aiosqlite"):
            return url.replace("sqlite+aiosqlite", "sqlite", 1)
        return url


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
