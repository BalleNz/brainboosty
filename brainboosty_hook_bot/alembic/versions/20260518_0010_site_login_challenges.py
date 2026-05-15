"""Таблица одноразовых токенов входа с сайта (poll после /start site_...)."""

from __future__ import annotations

import sqlalchemy as sa
from alembic import op

revision: str = "20260518_0010"
down_revision: str = "20260517_0009"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "site_login_challenges",
        sa.Column("token", sa.String(length=64), nullable=False),
        sa.Column("expires_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("tg_id", sa.BigInteger(), nullable=True),
        sa.PrimaryKeyConstraint("token", name="pk_site_login_challenges"),
    )
    op.create_index("ix_site_login_challenges_expires_at", "site_login_challenges", ["expires_at"])
    op.create_index("ix_site_login_challenges_tg_id", "site_login_challenges", ["tg_id"])


def downgrade() -> None:
    op.drop_index("ix_site_login_challenges_tg_id", table_name="site_login_challenges")
    op.drop_index("ix_site_login_challenges_expires_at", table_name="site_login_challenges")
    op.drop_table("site_login_challenges")
