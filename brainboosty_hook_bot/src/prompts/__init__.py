"""Промпты для LLM (когнитивный тест, общие тесты, оценка зон)."""

from brainboosty_hook_bot.src.prompts.cognitive_seven import (
    BRAIN_REGION_SYSTEM_PROMPT_7_DEVELOPMENT,
    BRAIN_REGION_SYSTEM_PROMPT_7_SEXUAL,
)
from brainboosty_hook_bot.src.prompts.shared_generate import (
    GENERATE_SHARED_DAILY_SYSTEM,
    GENERATE_SHARED_WEEKLY_SYSTEM,
)
from brainboosty_hook_bot.src.prompts.shared_score import DYNAMIC_REGION_SCORE_SYSTEM

__all__ = (
    "BRAIN_REGION_SYSTEM_PROMPT_7_DEVELOPMENT",
    "BRAIN_REGION_SYSTEM_PROMPT_7_SEXUAL",
    "DYNAMIC_REGION_SCORE_SYSTEM",
    "GENERATE_SHARED_DAILY_SYSTEM",
    "GENERATE_SHARED_WEEKLY_SYSTEM",
)
