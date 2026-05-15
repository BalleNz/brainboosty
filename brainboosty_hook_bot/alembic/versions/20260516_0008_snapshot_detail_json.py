"""Добавление detail_json к снимкам зон (расширенный вывод модели для PDF)."""

from __future__ import annotations

import sqlalchemy as sa
from alembic import op

revision: str = "20260516_0008"
down_revision: str = "20260515_0007"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column(
        "brain_region_snapshots",
        sa.Column("detail_json", sa.JSON(), nullable=True),
    )


def downgrade() -> None:
    op.drop_column("brain_region_snapshots", "detail_json")
