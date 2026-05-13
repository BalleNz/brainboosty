"""
Асинхронный вызов OpenAI для расчёта профиля отделов мозга + локальный fallback.

Два варианта опросника по 7 вопросов: «сексуальная карта» и «развитие отделов».
Структура весов по зонам для обоих вариантов совпадает (одинаковая нумерация 1–7).
"""

from __future__ import annotations

import json
import logging
import re
from typing import Literal

from openai import APIError, AsyncOpenAI

from brainboosty_hook_bot.src.config.config import settings

logger = logging.getLogger(__name__)

TestVariant = Literal["sexual", "development"]

REGION_KEYS: tuple[str, ...] = (
    "prefrontal_cortex",
    "brain_lobes",
    "insular_cortex",
    "temporoparietal_junction",
    "amygdala",
    "frontal_gyrus",
)

COGNITIVE_NUM_QUESTIONS = 7

# Общие правила для 7 вопросов (оба варианта):
# 1 → ПФК; 2 → амигдала; 3 → островковая; 4 → TPJ; 5 → лобная извилина; 6 → доли; 7 → ПФК + амигдала

BRAIN_REGION_SYSTEM_PROMPT_7_SEXUAL = """Ты — высококвалифицированный нейропсихолог и эксперт по когнитивным функциям мозга.

У тебя есть результаты теста из 7 вопросов (стилистика «сексуальная карта мозга»). Каждый ответ — A, B, C или D.

Вопросы и зоны:
1. Планирование секса → ПФК
2. Реакция на отказ или неудачу в сексе → Амигдала
3. Чувствование тела во время секса → Островковая кора
4. Чтение желаний партнёра → Височно-теменной узел (TPJ)
5. Проговаривание своих желаний → Лобная извилина
6. Визуализация секса → Доли мозга
7. Контроль возбуждения и импульсов → ПФК + Амигдала

Правила оценки:
- A = 95.0
- B = 75.0
- C = 50.0
- D = 25.0

Для каждой зоны посчитай **средневзвешенный процент** (float с одним знаком после запятой).

Веса вопросов:
- prefrontal_cortex — вопросы 1 и 7 (и частично 5: половинный вес)
- brain_lobes — вопрос 6
- insular_cortex — вопрос 3
- temporoparietal_junction — вопрос 4
- amygdala — вопросы 2 и 7
- frontal_gyrus — вопросы 1 и 5

Твоя задача: вернуть **СТРОГО ТОЛЬКО JSON** (без markdown, без пояснений):

{
  "prefrontal_cortex": float_от_0_до_100,
  "brain_lobes": float_от_0_до_100,
  "insular_cortex": float_от_0_до_100,
  "temporoparietal_junction": float_от_0_до_100,
  "amygdala": float_от_0_до_100,
  "frontal_gyrus": float_от_0_до_100
}"""


BRAIN_REGION_SYSTEM_PROMPT_7_DEVELOPMENT = """Ты — высококвалифицированный нейропсихолог и эксперт по когнитивным функциям мозга.

У тебя есть результаты теста из 7 вопросов (стилистика «развитие отделов мозга»). Каждый ответ — A, B, C или D.

Вопросы и зоны:
1. Планирование жизни и дел → ПФК
2. Реакция на стресс → Амигдала
3. Осознание телесных ощущений → Островковая кора
4. Понимание других людей → Височно-теменной узел (TPJ)
5. Умение выражать свои мысли → Лобная извилина
6. Пространственное мышление и визуализация → Доли мозга
7. Самоконтроль и импульсивность → ПФК + Амигдала

Правила оценки:
- A = 95.0
- B = 75.0
- C = 50.0
- D = 25.0

Для каждой зоны посчитай **средневзвешенный процент** (float с одним знаком после запятой).

Веса вопросов:
- prefrontal_cortex — вопросы 1 и 7 (и частично 5: половинный вес)
- brain_lobes — вопрос 6
- insular_cortex — вопрос 3
- temporoparietal_junction — вопрос 4
- amygdala — вопросы 2 и 7
- frontal_gyrus — вопросы 1 и 5

Твоя задача: вернуть **СТРОГО ТОЛЬКО JSON** (без markdown, без пояснений):

{
  "prefrontal_cortex": float_от_0_до_100,
  "brain_lobes": float_от_0_до_100,
  "insular_cortex": float_от_0_до_100,
  "temporoparietal_junction": float_от_0_до_100,
  "amygdala": float_от_0_до_100,
  "frontal_gyrus": float_от_0_до_100
}"""


def system_prompt_for_variant(variant: TestVariant) -> str:
    return BRAIN_REGION_SYSTEM_PROMPT_7_SEXUAL if variant == "sexual" else BRAIN_REGION_SYSTEM_PROMPT_7_DEVELOPMENT


def format_user_answers_block(answers: dict[int, str], *, n: int = COGNITIVE_NUM_QUESTIONS) -> str:
    lines = [f"{i}: {answers[i].strip().upper()}" for i in range(1, n + 1)]
    return "\n".join(lines)


def letter_to_score(letter: str) -> float:
    mapping = {"A": 95.0, "B": 75.0, "C": 50.0, "D": 25.0}
    key = letter.strip().upper()
    if key not in mapping:
        raise ValueError(f"Недопустимый ответ: {letter!r}")
    return mapping[key]


def _round_one_dec(x: float) -> float:
    return round(x + 1e-9, 1)


def fallback_region_scores_7(answers: dict[int, str]) -> dict[str, float]:
    """Локальный расчёт для 7 вопросов (одинаковая схема весов для обеих стилистик)."""

    def v(idx: int) -> float:
        return letter_to_score(answers[idx])

    prefrontal_cortex = (v(1) + v(7) + 0.5 * v(5)) / 2.5
    frontal_gyrus = (v(1) + v(5)) / 2.0
    brain_lobes = v(6)
    insular_cortex = v(3)
    temporoparietal_junction = v(4)
    amygdala = (v(2) + v(7)) / 2.0

    raw = {
        "prefrontal_cortex": prefrontal_cortex,
        "brain_lobes": brain_lobes,
        "insular_cortex": insular_cortex,
        "temporoparietal_junction": temporoparietal_junction,
        "amygdala": amygdala,
        "frontal_gyrus": frontal_gyrus,
    }
    return {k: _round_one_dec(min(100.0, max(0.0, raw[k]))) for k in REGION_KEYS}


def _strip_json_fence(text: str) -> str:
    t = text.strip()
    if t.startswith("```"):
        lines = t.splitlines()
        if lines:
            lines = lines[1:]
        if lines and lines[-1].strip().startswith("```"):
            lines = lines[:-1]
        t = "\n".join(lines).strip()
    t = re.sub(r"^json\s*", "", t.strip(), flags=re.IGNORECASE)
    return t.strip()


def _parse_scores_json(content: str) -> dict[str, float]:
    cleaned = _strip_json_fence(content)
    data = json.loads(cleaned)
    if not isinstance(data, dict):
        raise ValueError("JSON не является объектом")
    out: dict[str, float] = {}
    for key in REGION_KEYS:
        if key not in data:
            raise ValueError(f"Нет ключа {key}")
        val = float(data[key])
        out[key] = _round_one_dec(min(100.0, max(0.0, val)))
    return out


async def _openai_compute_scores(answers_block: str, variant: TestVariant) -> dict[str, float]:
    client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)
    completion = await client.chat.completions.create(
        model=settings.OPENAI_MODEL,
        temperature=0.2,
        messages=[
            {"role": "system", "content": system_prompt_for_variant(variant)},
            {"role": "user", "content": f"Ответ пользователя:\n\n{answers_block}"},
        ],
    )
    choice = completion.choices[0].message.content
    if not choice:
        raise ValueError("Пустой ответ модели")
    return _parse_scores_json(choice)


async def compute_region_scores(
    answers: dict[int, str],
    variant: TestVariant,
) -> tuple[dict[str, float], Literal["openai", "fallback"]]:
    """Подсчёт по 7 ответам и выбранной стилистике."""
    answers_block = format_user_answers_block(answers)
    if not settings.OPENAI_API_KEY.strip():
        return fallback_region_scores_7(answers), "fallback"

    try:
        scores = await _openai_compute_scores(answers_block, variant)
        return scores, "openai"
    except (APIError, json.JSONDecodeError, ValueError, KeyError, TypeError) as exc:
        logger.warning("OpenAI brain-region scoring failed, using fallback: %s", exc)
        return fallback_region_scores_7(answers), "fallback"
