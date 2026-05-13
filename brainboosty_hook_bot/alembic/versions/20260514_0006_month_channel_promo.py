"""Скидка 15% на месяц после подписки на канал + промокод."""

from __future__ import annotations

import sqlalchemy as sa
from alembic import op

revision: str = "20260514_0006"
down_revision: str = "20260513_0005"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column(
        "users",
        sa.Column("channel_month_15_discount_until", sa.DateTime(timezone=True), nullable=True),
    )
    op.add_column(
        "users",
        sa.Column("month_promo_code", sa.String(length=32), nullable=True),
    )


def downgrade() -> None:
    op.drop_column("users", "month_promo_code")
    op.drop_column("users", "channel_month_15_discount_until")
