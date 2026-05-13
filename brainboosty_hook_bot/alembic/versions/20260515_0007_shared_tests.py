"""Общие ежедневные/недельные тесты и прохождения пользователей."""

from __future__ import annotations

import sqlalchemy as sa
from alembic import op

revision: str = "20260515_0007"
down_revision: str = "20260514_0006"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "shared_tests",
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("kind", sa.String(length=16), nullable=False),
        sa.Column("period_key", sa.String(length=32), nullable=False),
        sa.Column("content_json", sa.JSON(), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("kind", "period_key", name="uq_shared_tests_kind_period"),
    )
    op.create_index("ix_shared_tests_kind", "shared_tests", ["kind"], unique=False)
    op.create_index("ix_shared_tests_period_key", "shared_tests", ["period_key"], unique=False)

    op.create_table(
        "user_test_completions",
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.Column("shared_test_id", sa.Integer(), nullable=False),
        sa.Column("answers_json", sa.JSON(), nullable=False),
        sa.Column("snapshot_id", sa.Integer(), nullable=False),
        sa.Column("score_source", sa.String(length=16), nullable=False, server_default="fallback"),
        sa.Column("completed_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(["shared_test_id"], ["shared_tests.id"]),
        sa.ForeignKeyConstraint(["snapshot_id"], ["brain_region_snapshots.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("user_id", "shared_test_id", name="uq_completion_user_shared"),
        sa.UniqueConstraint("snapshot_id", name="uq_completion_snapshot"),
    )
    op.create_index("ix_user_test_completions_user_id", "user_test_completions", ["user_id"], unique=False)
    op.create_index("ix_user_test_completions_shared_test_id", "user_test_completions", ["shared_test_id"], unique=False)


def downgrade() -> None:
    op.drop_index("ix_user_test_completions_shared_test_id", table_name="user_test_completions")
    op.drop_index("ix_user_test_completions_user_id", table_name="user_test_completions")
    op.drop_table("user_test_completions")
    op.drop_index("ix_shared_tests_period_key", table_name="shared_tests")
    op.drop_index("ix_shared_tests_kind", table_name="shared_tests")
    op.drop_table("shared_tests")
