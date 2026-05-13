"""Подписка (lifetime, окно скидки) и стилистика снимка теста.

Revision ID: 20260512_0004
Revises: 20260511_0003
Create Date: 2026-05-12

"""

from __future__ import annotations

from alembic import op
import sqlalchemy as sa
from sqlalchemy import false as sql_false


revision: str = "20260512_0004"
down_revision: str | None = "20260511_0003"
branch_labels: str | None = None
depends_on: str | None = None


def upgrade() -> None:
    op.add_column(
        "users",
        sa.Column("lifetime_subscription", sa.Boolean(), nullable=False, server_default=sql_false()),
    )
    op.add_column("users", sa.Column("test_discount_until", sa.DateTime(timezone=True), nullable=True))
    op.add_column(
        "brain_region_snapshots",
        sa.Column("test_variant", sa.String(length=32), nullable=False, server_default="development"),
    )


def downgrade() -> None:
    op.drop_column("brain_region_snapshots", "test_variant")
    op.drop_column("users", "test_discount_until")
    op.drop_column("users", "lifetime_subscription")
