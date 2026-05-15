"""Таблица упражнений (приватный канал / премиум-вебапп)."""

from __future__ import annotations

import sqlalchemy as sa
from alembic import op

revision: str = "20260517_0009"
down_revision: str = "20260516_0008"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "exercises",
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("slug", sa.String(length=96), nullable=True),
        sa.Column("emoji", sa.String(length=16), nullable=True),
        sa.Column("title_ru", sa.String(length=512), nullable=False),
        sa.Column("title_en", sa.String(length=512), nullable=True),
        sa.Column("short_description_ru", sa.String(length=1024), nullable=False),
        sa.Column("short_description_en", sa.String(length=1024), nullable=True),
        sa.Column("regions_json", sa.JSON(), nullable=False),
        sa.Column("primary_region", sa.String(length=64), nullable=False),
        sa.Column("difficulty", sa.Integer(), nullable=False, server_default="50"),
        sa.Column("effectiveness", sa.Integer(), nullable=False, server_default="3"),
        sa.Column("instruction_ru", sa.Text(), nullable=False),
        sa.Column("instruction_en", sa.Text(), nullable=True),
        sa.Column("instruction_image_url", sa.String(length=2048), nullable=True),
        sa.Column("for_who_ru", sa.String(length=512), nullable=False),
        sa.Column("for_who_en", sa.String(length=512), nullable=True),
        sa.Column("first_result_days", sa.Integer(), nullable=False, server_default="7"),
        sa.Column("research_links_json", sa.JSON(), nullable=False),
        sa.Column("amplify_ru", sa.Text(), nullable=False, server_default=""),
        sa.Column("amplify_en", sa.Text(), nullable=True),
        sa.Column("expected_results_ru", sa.Text(), nullable=False, server_default=""),
        sa.Column("expected_results_en", sa.Text(), nullable=True),
        sa.Column("is_published", sa.Boolean(), nullable=False, server_default=sa.text("true")),
        sa.Column("sort_order", sa.Integer(), nullable=False, server_default="0"),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.Column(
            "updated_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("slug", name="uq_exercises_slug"),
    )
    op.create_index("ix_exercises_is_published", "exercises", ["is_published"], unique=False)
    op.create_index("ix_exercises_sort_order", "exercises", ["sort_order"], unique=False)

    exercises = sa.table(
        "exercises",
        sa.column("emoji", sa.String),
        sa.column("title_ru", sa.String),
        sa.column("title_en", sa.String),
        sa.column("short_description_ru", sa.String),
        sa.column("short_description_en", sa.String),
        sa.column("regions_json", sa.JSON),
        sa.column("primary_region", sa.String),
        sa.column("difficulty", sa.Integer),
        sa.column("effectiveness", sa.Integer),
        sa.column("instruction_ru", sa.Text),
        sa.column("instruction_en", sa.Text),
        sa.column("instruction_image_url", sa.String),
        sa.column("for_who_ru", sa.String),
        sa.column("for_who_en", sa.String),
        sa.column("first_result_days", sa.Integer),
        sa.column("research_links_json", sa.JSON),
        sa.column("amplify_ru", sa.Text),
        sa.column("amplify_en", sa.Text),
        sa.column("expected_results_ru", sa.Text),
        sa.column("expected_results_en", sa.Text),
        sa.column("is_published", sa.Boolean),
        sa.column("sort_order", sa.Integer),
    )
    op.bulk_insert(
        exercises,
        [
            {
                "emoji": "🌬",
                "title_ru": "Дыхательный сетап на якорь спокойствия",
                "title_en": "Breath setup: calm anchor",
                "short_description_ru": "Три цикла — снижаем залп симпатики и возвращаем ПФК в игру.",
                "short_description_en": "Three cycles—ease sympathetic spike and bring PFC back online.",
                "regions_json": ["prefrontal_cortex", "insular_cortex", "amygdala"],
                "primary_region": "insular_cortex",
                "difficulty": 35,
                "effectiveness": 4,
                "instruction_ru": (
                    "1. Сядь прямо, стопы на полу. Плечи мягко опущены.\n"
                    "2. Вдох через нос 4 счёта — короткая пауза — выдох через рот 6 счётов.\n"
                    "3. На выдохе мысленно «расширяй» рёбра, без силового втягивания живота.\n"
                    "4. Повтори 4 полных цикла. На последнем только наблюдай дыхание, без оценки.\n"
                    "5. Заверши фразой «Состояние зафиксировано» и короткой пометкой во времени."
                ),
                "instruction_en": (
                    "1. Sit tall, feet grounded. Shoulders soft.\n"
                    "2. Inhale through the nose 4 beats—brief pause—exhale through the mouth 6.\n"
                    "3. On exhale, think ribcage widening, not forcing the belly in.\n"
                    "4. Four full cycles; on the last, observe the breath without judging.\n"
                    "5. Close with “State logged” and a quick time note."
                ),
                "instruction_image_url": None,
                "for_who_ru": "Тревожный фон, гонка мыслей, ощущение «вылетаю из тела».",
                "for_who_en": 'Anxious baseline, racing thoughts, feeling "out of body."',
                "first_result_days": 5,
                "research_links_json": [
                    {
                        "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6189422/",
                        "label_ru": "Обзор: дыхательные практики и автономная нервная система",
                        "label_en": "Review: breathing practices and autonomic balance",
                    },
                ],
                "amplify_ru": (
                    "Фиксируй одно окно дня для практики; сразу после — 60 секунд без экрана. "
                    "Усиление: добавь один цикл, но не ужимай выдох силой."
                ),
                "amplify_en": (
                    "Same daily window; post-practice 60s screen-free. To intensify—one extra cycle only; "
                    "never force the exhale."
                ),
                "expected_results_ru": (
                    "За несколько дней может стать спокойнее вечером и проще выдержать паузу перед ответом."
                ),
                "expected_results_en": (
                    "Within days: calmer evenings and an easier pause before you react."
                ),
                "is_published": True,
                "sort_order": 0,
            },
        ],
    )


def downgrade() -> None:
    op.drop_index("ix_exercises_sort_order", table_name="exercises")
    op.drop_index("ix_exercises_is_published", table_name="exercises")
    op.drop_table("exercises")
