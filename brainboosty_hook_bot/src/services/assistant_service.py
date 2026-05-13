"""
Асинхронный вызов OpenAI для расчёта профиля отделов мозга + локальный fallback.

Два варианта опросника по 7 вопросов: «сексуальная карта» и «развитие отделов».
Структура весов по зонам для обоих вариантов совпадает (одинаковая нумерация 1–7).
"""

from __future__ import annotations

import json
import logging
import re
from typing import Any, Literal

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


def _openai_client() -> AsyncOpenAI:
    api_key = settings.OPENAI_API_KEY.strip()
    base = settings.openai_base_url_resolved
    if base:
        return AsyncOpenAI(api_key=api_key, base_url=base)
    return AsyncOpenAI(api_key=api_key)


async def _openai_compute_scores(answers_block: str, variant: TestVariant) -> dict[str, float]:
    client = _openai_client()
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


GENERATE_SHARED_DAILY_SYSTEM = """Ты составляешь короткий ежедневный когнитивный мини-тест для приложения про мозг и привычки.

Требования:
- Ровно от 4 до 7 вопросов (включительно).
- У каждого вопроса ровно 4 варианта ответа с ключами A, B, C, D.
- Тексты на двух языках: text_ru и text_en у вопроса и у каждого варианта (поля text_ru, text_en внутри каждого option).
- Вопросы разнообразные, без токсичности, без медицинских диагнозов; образовательный тон.
- Варианты A–D — разные стили поведения/мышления (не «правильный/неправильный»).

Верни СТРОГО один JSON-объект (без markdown, без комментариев) вида:
{
  "questions": [
    {
      "id": 1,
      "text_ru": "...",
      "text_en": "...",
      "options": [
        {"key": "A", "text_ru": "...", "text_en": "..."},
        {"key": "B", "text_ru": "...", "text_en": "..."},
        {"key": "C", "text_ru": "...", "text_en": "..."},
        {"key": "D", "text_ru": "...", "text_en": "..."}
      ]
    }
  ]
}"""


GENERATE_SHARED_WEEKLY_SYSTEM = """Ты составляешь расширенный недельный когнитивный тест для приложения про мозг и саморегуляцию.

Требования:
- Ровно от 10 до 15 вопросов (включительно).
- У каждого вопроса ровно 4 варианта ответа с ключами A, B, C, D.
- Тексты на двух языках: text_ru и text_en у вопроса и у каждого варианта.
- Вопросы глубже и разнообразнее, чем в ежедневном мини-тесте; без токсичности и без медицинских диагнозов.
- Варианты A–D отражают разные стили мышления и поведения.

Верни СТРОГО один JSON-объект (без markdown, без комментариев) вида:
{
  "questions": [
    {
      "id": 1,
      "text_ru": "...",
      "text_en": "...",
      "options": [
        {"key": "A", "text_ru": "...", "text_en": "..."},
        {"key": "B", "text_ru": "...", "text_en": "..."},
        {"key": "C", "text_ru": "...", "text_en": "..."},
        {"key": "D", "text_ru": "...", "text_en": "..."}
      ]
    }
  ]
}"""


DYNAMIC_REGION_SCORE_SYSTEM = """Ты — нейропсихолог. По полному тексту теста и ответам пользователя (буквы A–D) оцени активацию/развитие шести зон (проценты 0–100).

Зоны (ключи JSON):
- prefrontal_cortex — префронтальная кора (планирование, контроль)
- brain_lobes — доли мозга (образность, пространство)
- insular_cortex — островковая кора (интероцепция, телесность)
- temporoparietal_junction — височно-теменной узел (понимание других)
- amygdala — амигдала (стресс, эмоциональные реакции)
- frontal_gyrus — лобные извилины (выражение, артикуляция мыслей)

Учитывай смысл вопросов и выбранных ответов; взвесь зоны по релевантности вопросов.

Верни СТРОГО ТОЛЬКО JSON (без markdown):
{
  "prefrontal_cortex": float,
  "brain_lobes": float,
  "insular_cortex": float,
  "temporoparietal_junction": float,
  "amygdala": float,
  "frontal_gyrus": float
}"""


def validate_shared_questions(kind: str, data: Any) -> list[dict[str, Any]]:
    if kind not in {"daily", "weekly"}:
        raise ValueError("bad kind")
    if not isinstance(data, dict):
        raise ValueError("root must be object")
    qs = data.get("questions")
    if not isinstance(qs, list):
        raise ValueError("questions must be list")
    lo, hi = (4, 7) if kind == "daily" else (10, 15)
    if not lo <= len(qs) <= hi:
        raise ValueError(f"question count {len(qs)} not in [{lo},{hi}]")
    keys_needed = {"A", "B", "C", "D"}
    for i, q in enumerate(qs, start=1):
        if not isinstance(q, dict):
            raise ValueError("question not object")
        if not isinstance(q.get("text_ru"), str) or not isinstance(q.get("text_en"), str):
            raise ValueError("missing text_ru/text_en")
        opts = q.get("options")
        if not isinstance(opts, list) or len(opts) != 4:
            raise ValueError("options must be list of 4")
        seen: set[str] = set()
        for o in opts:
            if not isinstance(o, dict):
                raise ValueError("option not object")
            k = str(o.get("key", "")).strip().upper()
            if k not in keys_needed:
                raise ValueError("bad option key")
            if not isinstance(o.get("text_ru"), str) or not isinstance(o.get("text_en"), str):
                raise ValueError("option missing texts")
            seen.add(k)
        if seen != keys_needed:
            raise ValueError("need keys A-D")
        q["id"] = i
    return qs


def format_dynamic_qa_block(questions: list[dict[str, Any]], answers: dict[int, str], *, lang: str) -> str:
    """Текстовый блок вопрос–ответ для модели."""
    lg = lang if lang in {"ru", "en"} else "ru"
    text_key = "text_ru" if lg == "ru" else "text_en"
    opt_key = "text_ru" if lg == "ru" else "text_en"
    lines: list[str] = []
    for q in questions:
        qid = int(q["id"])
        lines.append(f"Вопрос {qid}: {q[text_key]}")
        for o in q["options"]:
            lines.append(f"  {o['key']}: {o[opt_key]}")
        lines.append(f"Ответ пользователя: {answers[qid].strip().upper()}")
        lines.append("")
    return "\n".join(lines).strip()


def fallback_region_scores_n(answers: dict[int, str], n: int) -> dict[str, float]:
    """Равномерное усреднение буквенных баллов по всем зонам (если модель недоступна)."""
    vals = [letter_to_score(answers[i]) for i in range(1, n + 1)]
    mean = sum(vals) / max(len(vals), 1)
    raw = {k: mean for k in REGION_KEYS}
    return {k: _round_one_dec(min(100.0, max(0.0, raw[k]))) for k in REGION_KEYS}


async def _openai_dynamic_scores(qa_block: str) -> dict[str, float]:
    client = _openai_client()
    completion = await client.chat.completions.create(
        model=settings.OPENAI_MODEL,
        temperature=0.2,
        messages=[
            {"role": "system", "content": DYNAMIC_REGION_SCORE_SYSTEM},
            {"role": "user", "content": qa_block},
        ],
    )
    choice = completion.choices[0].message.content
    if not choice:
        raise ValueError("Пустой ответ модели")
    return _parse_scores_json(choice)


async def compute_region_scores_dynamic(
    questions: list[dict[str, Any]],
    answers: dict[int, str],
    *,
    lang: str,
) -> tuple[dict[str, float], Literal["openai", "fallback"]]:
    n = len(questions)
    if set(answers.keys()) != set(range(1, n + 1)):
        raise ValueError("incomplete answers")
    qa_block = format_dynamic_qa_block(questions, answers, lang=lang)
    if not settings.OPENAI_API_KEY.strip():
        return fallback_region_scores_n(answers, n), "fallback"
    try:
        scores = await _openai_dynamic_scores(qa_block)
        return scores, "openai"
    except (APIError, json.JSONDecodeError, ValueError, KeyError, TypeError) as exc:
        logger.warning("OpenAI dynamic scoring failed, using fallback: %s", exc)
        return fallback_region_scores_n(answers, n), "fallback"


async def _openai_generate_test(system: str, user_msg: str, *, max_tokens: int) -> dict[str, Any]:
    client = _openai_client()
    completion = await client.chat.completions.create(
        model=settings.OPENAI_MODEL,
        temperature=0.75,
        max_tokens=max_tokens,
        messages=[
            {"role": "system", "content": system},
            {"role": "user", "content": user_msg},
        ],
    )
    choice = completion.choices[0].message.content
    if not choice:
        raise ValueError("Пустой ответ модели")
    cleaned = _strip_json_fence(choice)
    return json.loads(cleaned)


async def generate_shared_test_json(kind: Literal["daily", "weekly"]) -> dict[str, Any]:
    """Генерация JSON теста (daily 4–7, weekly 10–15 вопросов)."""
    if kind == "daily":
        system = GENERATE_SHARED_DAILY_SYSTEM
        max_tokens = 4500
        hint = "Сгенерируй новый ежедневный мини-тест (4–7 вопросов)."
    else:
        system = GENERATE_SHARED_WEEKLY_SYSTEM
        max_tokens = 14000
        hint = "Сгенерируй новый недельный тест (10–15 вопросов)."
    data = await _openai_generate_test(system, hint, max_tokens=max_tokens)
    validate_shared_questions(kind, data)
    return data
