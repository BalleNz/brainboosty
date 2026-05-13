"""locale, cognitive_completed (блок повторного теста).

Revision ID: 20260513_0005
Revises: 20260512_0004
Create Date: 2026-05-13

"""

from __future__ import annotations

from alembic import op
import sqlalchemy as sa


revision: str = "20260513_0005"
down_revision: str | None = "20260512_0004"
branch_labels: str | None = None
depends_on: str | None = None


def upgrade() -> None:
    op.add_column(
        "users",
        sa.Column("locale", sa.String(length=8), nullable=False, server_default="ru"),
    )
    op.add_column(
        "users",
        sa.Column("cognitive_completed", sa.Boolean(), nullable=False, server_default=sa.text("0")),
    )


def downgrade() -> None:
    op.drop_column("users", "cognitive_completed")
    op.drop_column("users", "locale")
