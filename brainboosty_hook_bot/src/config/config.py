"""Загрузка настроек окружения (Pydantic Settings)."""

from __future__ import annotations

from functools import lru_cache
from pathlib import Path

from pydantic import Field
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

    BOT_TOKEN: str = Field(..., description="Токен Telegram-бота")
    BOT_USERNAME: str = Field(
        default="BrainBoostyHookBot",
        description="Username бота без @ (для реферальных ссылок)",
    )
    ADMIN_USERNAME: str = Field(default="yeasex", description="Telegram username админа без @")

    DATABASE_URL: str = Field(
        default="sqlite+aiosqlite:///./brainboosty.db",
        description="Async SQLAlchemy URL",
    )

    DAILY_HOOK_HOUR: int = Field(default=10, ge=0, le=23)
    DAILY_HOOK_MINUTE: int = Field(default=0, ge=0, le=59)

    # Антифлуд: минимальный интервал между сообщениями одного пользователя (сек.)
    THROTTLE_SECONDS: float = Field(default=0.7, ge=0.1)

    OPENAI_API_KEY: str = Field(default="", description="Ключ OpenAI API (пусто → только локальный fallback)")
    OPENAI_MODEL: str = Field(default="gpt-4o-mini", description="Модель для расчёта нейропрофиля")

    # Tribute: подпись вебхука (HMAC-SHA256 тела, заголовок trbt-signature)
    TRIBUTE_WEBHOOK_SECRET: str = Field(default="", description="Секрет/API key для проверки trbt-signature")
    TRIBUTE_WEBHOOK_HOST: str = Field(default="0.0.0.0")
    TRIBUTE_WEBHOOK_PORT: int = Field(default=0, ge=0, le=65535, description="0 — не поднимать HTTP-сервер")
    TRIBUTE_WEBHOOK_PATH: str = Field(default="/tribute/webhook")
    TRIBUTE_PRODUCT_ID_MONTH: str = Field(default="", description="Опционально: id продукта «месяц» в JSON вебхука")
    TRIBUTE_PRODUCT_ID_FOREVER: str = Field(default="", description="Опционально: id продукта «навсегда»")

    TRIBUTE_PAY_URL_MONTH: str = Field(default="", description="Ссылка на оплату месяца в Tribute (кнопка в боте)")
    TRIBUTE_PAY_URL_FOREVER: str = Field(default="", description="Ссылка Forever по полной цене")
    TRIBUTE_PAY_URL_FOREVER_DISCOUNT: str = Field(default="", description="Ссылка Forever со скидкой (после теста)")

    PREMIUM_CHANNEL_USERNAME: str = Field(
        default="androgenautist",
        description="Публичный username канала без @ (проверка подписки и ссылка t.me)",
    )

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
