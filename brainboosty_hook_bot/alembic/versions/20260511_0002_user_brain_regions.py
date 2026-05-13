"""Таблица профиля отделов мозга (нейропрофиль по опроснику).

Revision ID: 20260511_0002
Revises: 20260510_0001
Create Date: 2026-05-11

"""

from __future__ import annotations

from alembic import op
import sqlalchemy as sa


revision: str = "20260511_0002"
down_revision: str | None = "20260510_0001"
branch_labels: str | None = None
depends_on: str | None = None


def upgrade() -> None:
    op.create_table(
        "user_brain_regions",
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.Column("prefrontal_cortex", sa.Float(), nullable=False),
        sa.Column("brain_lobes", sa.Float(), nullable=False),
        sa.Column("insular_cortex", sa.Float(), nullable=False),
        sa.Column("temporoparietal_junction", sa.Float(), nullable=False),
        sa.Column("amygdala", sa.Float(), nullable=False),
        sa.Column("frontal_gyrus", sa.Float(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"], name="fk_user_brain_regions_user_id_users", ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("user_id"),
    )


def downgrade() -> None:
    op.drop_table("user_brain_regions")
