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
        description="Базовый URL OpenAI-совместимого API без /v1 (добавится автоматически). Пусто → api.openai.com. Пример DeepSeek: https://api.deepseek.com",
    )
    OPENAI_MODEL: str = Field(
        default="gpt-4o-mini",
        description="Идентификатор модели на выбранном API (для OpenAI по умолчанию — gpt-4o-mini)",
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
    TRIBUTE_PAY_URL_MONTH: str = Field(default="", description="Устарело: используйте TRIBUTE_APP_URL")
    TRIBUTE_PAY_URL_FOREVER: str = Field(default="", description="Устарело")
    TRIBUTE_PAY_URL_FOREVER_DISCOUNT: str = Field(default="", description="Устарело")

    ABOUT_PHOTO_PATH: str = Field(
        default="",
        description="Фото для «О проекте»: абсолютный путь или относительно корня проекта (рядом с src/). Пусто — авто images/author.JPG",
    )

    PREMIUM_CHANNEL_USERNAME: str = Field(
        default="androgenautist",
        description="Публичный username канала без @ (проверка подписки и ссылка t.me)",
    )

    @property
    def openai_base_url_resolved(self) -> str | None:
        """Полный base_url для AsyncOpenAI (с суффиксом /v1) или None — тогда клиент берёт дефолт platform.openai.com."""
        raw = (self.OPENAI_BASE_URL or "").strip()
        if not raw:
            return None
        u = raw.rstrip("/")
        if not u.endswith("/v1"):
            return f"{u}/v1"
        return u

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
