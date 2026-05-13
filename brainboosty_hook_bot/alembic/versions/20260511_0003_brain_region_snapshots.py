"""История прохождений теста: brain_region_snapshots вместо одной строки user_brain_regions.

Revision ID: 20260511_0003
Revises: 20260511_0002
Create Date: 2026-05-11

"""

from __future__ import annotations

from alembic import op
import sqlalchemy as sa


revision: str = "20260511_0003"
down_revision: str | None = "20260511_0002"
branch_labels: str | None = None
depends_on: str | None = None


def upgrade() -> None:
    op.create_table(
        "brain_region_snapshots",
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("prefrontal_cortex", sa.Float(), nullable=False),
        sa.Column("brain_lobes", sa.Float(), nullable=False),
        sa.Column("insular_cortex", sa.Float(), nullable=False),
        sa.Column("temporoparietal_junction", sa.Float(), nullable=False),
        sa.Column("amygdala", sa.Float(), nullable=False),
        sa.Column("frontal_gyrus", sa.Float(), nullable=False),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"], name="fk_brain_snapshots_user_id_users", ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index("ix_brain_region_snapshots_user_id", "brain_region_snapshots", ["user_id"])

    bind = op.get_bind()
    inspector = sa.inspect(bind)
    if "user_brain_regions" in inspector.get_table_names():
        cols = [
            "user_id",
            "prefrontal_cortex",
            "brain_lobes",
            "insular_cortex",
            "temporoparietal_junction",
            "amygdala",
            "frontal_gyrus",
        ]
        col_list = ", ".join(cols)
        op.execute(
            sa.text(
                f"""
                INSERT INTO brain_region_snapshots ({col_list}, created_at)
                SELECT {col_list}, updated_at FROM user_brain_regions
                """,
            ),
        )
        op.drop_table("user_brain_regions")


def downgrade() -> None:
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

    op.execute(
        sa.text(
            """
            INSERT INTO user_brain_regions (
                user_id, prefrontal_cortex, brain_lobes, insular_cortex,
                temporoparietal_junction, amygdala, frontal_gyrus, updated_at
            )
            SELECT s.user_id, s.prefrontal_cortex, s.brain_lobes, s.insular_cortex,
                   s.temporoparietal_junction, s.amygdala, s.frontal_gyrus, s.created_at
            FROM brain_region_snapshots s
            INNER JOIN (
                SELECT user_id, MAX(id) AS mid FROM brain_region_snapshots GROUP BY user_id
            ) t ON s.user_id = t.user_id AND s.id = t.mid
            """,
        ),
    )

    op.drop_index("ix_brain_region_snapshots_user_id", table_name="brain_region_snapshots")
    op.drop_table("brain_region_snapshots")
