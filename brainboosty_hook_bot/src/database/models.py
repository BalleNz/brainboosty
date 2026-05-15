"""ORM-модели."""

from __future__ import annotations

from datetime import datetime
from typing import Any

from sqlalchemy import BigInteger, Boolean, DateTime, Float, ForeignKey, Integer, JSON, String, Text, UniqueConstraint, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from brainboosty_hook_bot.src.database.base import Base


class User(Base):
    """Пользователь Telegram после прохождения анкеты."""

    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    tg_id: Mapped[int] = mapped_column(BigInteger, unique=True, index=True, nullable=False)
    username: Mapped[str | None] = mapped_column(String(255), nullable=True)
    first_name: Mapped[str] = mapped_column(String(255), nullable=False)

    # Список строк целей (например ["speech", "reduce_anxiety"])
    goals: Mapped[list[Any]] = mapped_column(JSON, nullable=False)

    age: Mapped[int] = mapped_column(Integer, nullable=False)
    daily_time: Mapped[str] = mapped_column(String(32), nullable=False)

    premium_until: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    lifetime_subscription: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    test_discount_until: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)

    channel_month_15_discount_until: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )
    month_promo_code: Mapped[str | None] = mapped_column(String(32), nullable=True)

    referrer_id: Mapped[int | None] = mapped_column(ForeignKey("users.id"), nullable=True)
    referral_count: Mapped[int] = mapped_column(Integer, nullable=False, default=0)

    locale: Mapped[str] = mapped_column(String(8), nullable=False, default="ru")
    cognitive_completed: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    referrer: Mapped[User | None] = relationship(
        "User",
        remote_side=[id],
        foreign_keys=[referrer_id],
        backref="referrals",
    )

    brain_snapshots: Mapped[list["BrainRegionSnapshot"]] = relationship(
        "BrainRegionSnapshot",
        back_populates="user",
        cascade="all, delete-orphan",
    )
    test_completions: Mapped[list["UserTestCompletion"]] = relationship(
        "UserTestCompletion",
        back_populates="user",
        cascade="all, delete-orphan",
    )


class BrainRegionSnapshot(Base):
    """Один проход теста: снимок показателей по отделам мозга (история для сравнений)."""

    __tablename__ = "brain_region_snapshots"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
        index=True,
        nullable=False,
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    test_variant: Mapped[str] = mapped_column(String(32), nullable=False, default="development")

    prefrontal_cortex: Mapped[float] = mapped_column(Float, nullable=False)
    brain_lobes: Mapped[float] = mapped_column(Float, nullable=False)
    insular_cortex: Mapped[float] = mapped_column(Float, nullable=False)
    temporoparietal_junction: Mapped[float] = mapped_column(Float, nullable=False)
    amygdala: Mapped[float] = mapped_column(Float, nullable=False)
    frontal_gyrus: Mapped[float] = mapped_column(Float, nullable=False)

    # Расширенный профиль от модели (связи зон, буллеты, субметрики) — для PDF; при null — шаблоны из brain_pdf_content.
    detail_json: Mapped[dict[str, Any] | None] = mapped_column(JSON, nullable=True)

    user: Mapped[User] = relationship("User", back_populates="brain_snapshots")
    test_completion: Mapped["UserTestCompletion | None"] = relationship(
        "UserTestCompletion",
        back_populates="snapshot",
        uselist=False,
    )


class SharedTest(Base):
    """Общий набор вопросов на день или неделю (один для всех пользователей)."""

    __tablename__ = "shared_tests"
    __table_args__ = (UniqueConstraint("kind", "period_key", name="uq_shared_tests_kind_period"),)

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    kind: Mapped[str] = mapped_column(String(16), nullable=False, index=True)
    period_key: Mapped[str] = mapped_column(String(32), nullable=False, index=True)
    content_json: Mapped[dict[str, Any]] = mapped_column(JSON, nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    completions: Mapped[list["UserTestCompletion"]] = relationship(
        "UserTestCompletion",
        back_populates="shared_test",
    )


class UserTestCompletion(Base):
    """Факт прохождения пользователем общего теста + ссылка на снимок зон."""

    __tablename__ = "user_test_completions"
    __table_args__ = (UniqueConstraint("user_id", "shared_test_id", name="uq_completion_user_shared"),)

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), index=True, nullable=False)
    shared_test_id: Mapped[int] = mapped_column(ForeignKey("shared_tests.id"), index=True, nullable=False)
    answers_json: Mapped[dict[str, Any]] = mapped_column(JSON, nullable=False)
    snapshot_id: Mapped[int] = mapped_column(
        ForeignKey("brain_region_snapshots.id", ondelete="CASCADE"),
        unique=True,
        nullable=False,
    )
    score_source: Mapped[str] = mapped_column(String(16), nullable=False, default="fallback")
    completed_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    user: Mapped[User] = relationship("User", back_populates="test_completions")
    shared_test: Mapped[SharedTest] = relationship("SharedTest", back_populates="completions")
    snapshot: Mapped[BrainRegionSnapshot] = relationship("BrainRegionSnapshot", back_populates="test_completion")


class Exercise(Base):
    """Упражнение из закрытого канала (персональные протоколы по зонам мозга)."""

    __tablename__ = "exercises"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    slug: Mapped[str | None] = mapped_column(String(96), nullable=True, unique=True)

    emoji: Mapped[str | None] = mapped_column(String(16), nullable=True)
    title_ru: Mapped[str] = mapped_column(String(512), nullable=False)
    title_en: Mapped[str | None] = mapped_column(String(512), nullable=True)
    short_description_ru: Mapped[str] = mapped_column(String(1024), nullable=False)
    short_description_en: Mapped[str | None] = mapped_column(String(1024), nullable=True)

    # Список ключей из REGION_KEYS (ровно те же строки, что в brain_region_keys).
    regions_json: Mapped[list[Any]] = mapped_column(JSON, nullable=False)
    primary_region: Mapped[str] = mapped_column(String(64), nullable=False)
    difficulty: Mapped[int] = mapped_column(Integer, nullable=False, default=50)
    effectiveness: Mapped[int] = mapped_column(Integer, nullable=False, default=3)

    instruction_ru: Mapped[str] = mapped_column(Text, nullable=False)
    instruction_en: Mapped[str | None] = mapped_column(Text, nullable=True)
    instruction_image_url: Mapped[str | None] = mapped_column(String(2048), nullable=True)

    for_who_ru: Mapped[str] = mapped_column(String(512), nullable=False)
    for_who_en: Mapped[str | None] = mapped_column(String(512), nullable=True)
    first_result_days: Mapped[int] = mapped_column(Integer, nullable=False, default=7)

    research_links_json: Mapped[list[Any]] = mapped_column(JSON, nullable=False, default=lambda: [])

    amplify_ru: Mapped[str] = mapped_column(Text, nullable=False, default="")
    amplify_en: Mapped[str | None] = mapped_column(Text, nullable=True)
    expected_results_ru: Mapped[str] = mapped_column(Text, nullable=False, default="")
    expected_results_en: Mapped[str | None] = mapped_column(Text, nullable=True)

    is_published: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)
    sort_order: Mapped[int] = mapped_column(Integer, nullable=False, default=0)

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )


class SharedTest(Base):