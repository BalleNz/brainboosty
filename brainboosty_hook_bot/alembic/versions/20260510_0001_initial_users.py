"""Начальная схема: пользователи Telegram и реферальные связи.

Revision ID: 20260510_0001
Revises:
Create Date: 2026-05-10

"""

from __future__ import annotations

from alembic import op
import sqlalchemy as sa


revision: str = "20260510_0001"
down_revision: str | None = None
branch_labels: str | None = None
depends_on: str | None = None


def upgrade() -> None:
    op.create_table(
        "users",
        sa.Column("id", sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column("tg_id", sa.BigInteger(), nullable=False),
        sa.Column("username", sa.String(length=255), nullable=True),
        sa.Column("first_name", sa.String(length=255), nullable=False),
        sa.Column("goals", sa.JSON(), nullable=False),
        sa.Column("age", sa.Integer(), nullable=False),
        sa.Column("daily_time", sa.String(length=32), nullable=False),
        sa.Column("premium_until", sa.DateTime(timezone=True), nullable=True),
        sa.Column("referrer_id", sa.Integer(), nullable=True),
        sa.Column("referral_count", sa.Integer(), nullable=False, server_default=sa.text("0")),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.ForeignKeyConstraint(["referrer_id"], ["users.id"], name="fk_users_referrer_id_users"),
    )
    op.create_index("ix_users_tg_id", "users", ["tg_id"], unique=True)


def downgrade() -> None:
    op.drop_index("ix_users_tg_id", table_name="users")
    op.drop_table("users")
