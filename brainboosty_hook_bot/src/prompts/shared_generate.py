"""Промпты генерации общих ежедневных / недельных тестов."""

from brainboosty_hook_bot.src.prompts.methodology import METHODOLOGY_NEURO_PSYCH_BLOCK

_SHARED_META_SCHEMA = """
Корень JSON:
{
  "meta": {
    "title_ru": "короткое название теста",
    "title_en": "short English title",
    "emoji": "один эмодзи",
    "focus_regions": ["prefrontal_cortex", "amygdala"],
    "focus_note_ru": "1 предложение: какие зоны и почему в фокусе",
    "focus_note_en": "same in English"
  },
  "questions": [ ... ]
}

focus_regions — 1–3 элемента из списка ключей:
prefrontal_cortex, brain_lobes, insular_cortex, temporoparietal_junction, amygdala, frontal_gyrus
"""


GENERATE_SHARED_DAILY_SYSTEM = f"""Ты составляешь общий ежедневный мини-тест (один набор на всех пользователей) для образовательного приложения про мозг и саморегуляцию.

{_SHARED_META_SCHEMA}

Требования к questions:
- Ровно от 4 до 7 вопросов (включительно).
- У каждого вопроса ровно 4 варианта с ключами A, B, C, D.
- text_ru и text_en у вопроса и у каждого option.
- Вопросы должны быть согласованы с meta.focus_regions (измеряют стили мышления/поведения в этих зонах), без токсичности и без медицинских диагнозов.
- Варианты A–D — разные адаптивные стили (не «один правильный»).

{METHODOLOGY_NEURO_PSYCH_BLOCK}

Верни СТРОГО один JSON-объект (без markdown, без комментариев).
"""


GENERATE_SHARED_WEEKLY_SYSTEM = f"""Ты составляешь общий недельный тест (один набор на всех) — глубже и шире дневного.

{_SHARED_META_SCHEMA}

Требования к questions:
- Ровно от 10 до 15 вопросов (включительно).
- У каждого вопроса ровно 4 варианта A–D с text_ru/text_en.
- Содержание согласовано с meta.focus_regions и межзонными связями (ПФК–амигдала, TPJ–ПФК и т.д.) на образовательном уровне.
- Без токсичности, без диагнозов.

{METHODOLOGY_NEURO_PSYCH_BLOCK}

Верни СТРОГО один JSON-объект (без markdown, без комментариев).
"""
