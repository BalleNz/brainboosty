"""Асинхронный движок SQLAlchemy и фабрика сессий."""

from __future__ import annotations

from collections.abc import AsyncGenerator

from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine

from brainboosty_hook_bot.src.config.config import settings
from brainboosty_hook_bot.src.database.base import Base

engine = create_async_engine(
    settings.DATABASE_URL,
    echo=False,
    pool_pre_ping=True,
)

async_session_maker = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autoflush=False,
)


async def init_db() -> None:
    """Создаёт таблицы при старте (для dev); в проде используйте Alembic."""
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


async def get_session() -> AsyncGenerator[AsyncSession, None]:
    """Dependency-style генератор сессии для хендлеров."""
    async with async_session_maker() as session:
        yield session
