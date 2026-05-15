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
from brainboosty_hook_bot.src.prompts.cognitive_seven import (
    BRAIN_REGION_SYSTEM_PROMPT_7_DEVELOPMENT,
    BRAIN_REGION_SYSTEM_PROMPT_7_SEXUAL,
)
from brainboosty_hook_bot.src.prompts.shared_generate import (
    GENERATE_SHARED_DAILY_SYSTEM,
    GENERATE_SHARED_WEEKLY_SYSTEM,
)
from brainboosty_hook_bot.src.prompts.shared_score import DYNAMIC_REGION_SCORE_SYSTEM
from brainboosty_hook_bot.src.services.brain_region_keys import REGION_KEYS

logger = logging.getLogger(__name__)

TestVariant = Literal["sexual", "development"]

COGNITIVE_NUM_QUESTIONS = 7

# Общие правила для 7 вопросов (оба варианта):
# 1 → ПФК; 2 → амигдала; 3 → островковая; 4 → TPJ; 5 → лобная извилина; 6 → доли; 7 → ПФК + амигдала


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


def _load_json_object(content: str) -> dict[str, Any]:
    """Парсит JSON-объект; при REASONING перед JSON берёт последний валидный объект."""
    cleaned = _strip_json_fence(content)
    try:
        data = json.loads(cleaned)
    except json.JSONDecodeError:
        data = None
        pos = len(cleaned)
        while pos > 0:
            pos = cleaned.rfind("{", 0, pos)
            if pos < 0:
                break
            try:
                candidate = json.loads(cleaned[pos:])
            except json.JSONDecodeError:
                continue
            if isinstance(candidate, dict):
                data = candidate
                break
        if data is None:
            raise
    if not isinstance(data, dict):
        raise ValueError("JSON не является объектом")
    return data


def _parse_scores_json(content: str) -> dict[str, float]:
    data = _load_json_object(content)
    out: dict[str, float] = {}
    for key in REGION_KEYS:
        if key not in data:
            raise ValueError(f"Нет ключа {key}")
        val = float(data[key])
        out[key] = _round_one_dec(min(100.0, max(0.0, val)))
    return out


def _parse_scores_object(data: dict[str, Any]) -> dict[str, float]:
    out: dict[str, float] = {}
    for key in REGION_KEYS:
        if key not in data:
            raise ValueError(f"Нет ключа {key}")
        val = float(data[key])
        out[key] = _round_one_dec(min(100.0, max(0.0, val)))
    return out


def _parse_cognitive_scores_and_detail(content: str) -> tuple[dict[str, float], dict[str, Any] | None]:
    """Новый формат: scores + regions + inter_region_links; старый — плоский объект из шести ключей."""
    data = _load_json_object(content)
    if "scores" in data and isinstance(data["scores"], dict):
        scores = _parse_scores_object(data["scores"])
        detail: dict[str, Any] = {}
        links = data.get("inter_region_links")
        if isinstance(links, list) and links:
            detail["inter_region_links"] = links
        regions = data.get("regions")
        if isinstance(regions, dict) and regions:
            detail["regions"] = regions
        return scores, detail if detail else None
    scores = _parse_scores_json(content)
    return scores, None


def _parse_dynamic_scores_and_detail(content: str) -> tuple[dict[str, float], dict[str, Any] | None]:
    data = _load_json_object(content)
    if "scores" in data and isinstance(data["scores"], dict):
        scores = _parse_scores_object(data["scores"])
        rat: dict[str, Any] = {}
        if isinstance(data.get("rationale_ru"), str):
            rat["rationale_ru"] = str(data["rationale_ru"])
        if isinstance(data.get("rationale_en"), str):
            rat["rationale_en"] = str(data["rationale_en"])
        return scores, rat if rat else None
    return _parse_scores_json(content), None


def merge_scheduled_into_profile(
    previous: dict[str, float] | None,
    raw_test_scores: dict[str, float],
    *,
    kind: Literal["daily", "weekly"],
) -> dict[str, float]:
    """Сглаженное обновление профиля после общего теста (ежедневный слабее влияет, чем недельный)."""
    if previous is None:
        return raw_test_scores
    w = 0.42 if kind == "daily" else 0.58
    return {
        k: _round_one_dec(min(100.0, max(0.0, w * raw_test_scores[k] + (1.0 - w) * previous[k])))
        for k in REGION_KEYS
    }


_REGION_KEY_SET = frozenset(REGION_KEYS)


def validate_shared_meta(meta: Any) -> dict[str, Any]:
    if not isinstance(meta, dict):
        raise ValueError("meta must be object")
    for field in ("title_ru", "title_en", "emoji", "focus_regions", "focus_note_ru", "focus_note_en"):
        if field not in meta:
            raise ValueError(f"meta missing {field}")
    if not all(isinstance(meta.get(f), str) and str(meta.get(f)).strip() for f in ("title_ru", "title_en", "focus_note_ru", "focus_note_en")):
        raise ValueError("meta text fields must be non-empty strings")
    emoji = str(meta["emoji"]).strip()
    if not emoji:
        raise ValueError("meta.emoji empty")
    fr = meta["focus_regions"]
    if not isinstance(fr, list) or not 1 <= len(fr) <= 3:
        raise ValueError("meta.focus_regions must be list length 1..3")
    for x in fr:
        if not isinstance(x, str) or x not in _REGION_KEY_SET:
            raise ValueError("meta.focus_regions bad key")
    return meta


def _openai_client() -> AsyncOpenAI:
    api_key = settings.OPENAI_API_KEY.strip()
    base = settings.openai_base_url_resolved
    if base:
        return AsyncOpenAI(api_key=api_key, base_url=base)
    return AsyncOpenAI(api_key=api_key)


async def _openai_compute_scores(answers_block: str, variant: TestVariant) -> tuple[dict[str, float], dict[str, Any] | None]:
    client = _openai_client()
    completion = await client.chat.completions.create(
        model=settings.OPENAI_MODEL,
        temperature=0.2,
        max_tokens=6000,
        messages=[
            {"role": "system", "content": system_prompt_for_variant(variant)},
            {"role": "user", "content": f"Ответ пользователя:\n\n{answers_block}"},
        ],
    )
    choice = completion.choices[0].message.content
    if not choice:
        raise ValueError("Пустой ответ модели")
    return _parse_cognitive_scores_and_detail(choice)


async def compute_region_scores(
    answers: dict[int, str],
    variant: TestVariant,
) -> tuple[dict[str, float], Literal["openai", "fallback"], dict[str, Any] | None]:
    """Подсчёт по 7 ответам; третий элемент — детализация для PDF (связи зон, буллеты, субметрики)."""
    answers_block = format_user_answers_block(answers)
    if not settings.OPENAI_API_KEY.strip():
        return fallback_region_scores_7(answers), "fallback", None

    try:
        scores, detail = await _openai_compute_scores(answers_block, variant)
        return scores, "openai", detail
    except (APIError, json.JSONDecodeError, ValueError, KeyError, TypeError) as exc:
        logger.warning("OpenAI brain-region scoring failed, using fallback: %s", exc)
        return fallback_region_scores_7(answers), "fallback", None


def validate_shared_questions(kind: str, data: Any) -> list[dict[str, Any]]:
    if kind not in {"daily", "weekly"}:
        raise ValueError("bad kind")
    if not isinstance(data, dict):
        raise ValueError("root must be object")
    meta = data.get("meta")
    validate_shared_meta(meta)
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


def format_dynamic_qa_block(
    questions: list[dict[str, Any]],
    answers: dict[int, str],
    *,
    lang: str,
    test_meta: dict[str, Any] | None = None,
) -> str:
    """Текстовый блок вопрос–ответ для модели."""
    lg = lang if lang in {"ru", "en"} else "ru"
    text_key = "text_ru" if lg == "ru" else "text_en"
    opt_key = "text_ru" if lg == "ru" else "text_en"
    lines: list[str] = []
    if isinstance(test_meta, dict):
        title = test_meta.get("title_ru" if lg == "ru" else "title_en", "")
        fr = test_meta.get("focus_regions")
        fn = test_meta.get("focus_note_ru" if lg == "ru" else "focus_note_en", "")
        if isinstance(title, str) and title.strip():
            lines.append(f"Тест: {title.strip()}" if lg == "ru" else f"Test: {title.strip()}")
        if isinstance(fr, list) and fr:
            lines.append(f"Фокус зон: {', '.join(str(x) for x in fr)}" if lg == "ru" else f"Focus regions: {', '.join(str(x) for x in fr)}")
        if isinstance(fn, str) and fn.strip():
            lines.append(fn.strip())
        lines.append("")
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


async def _openai_dynamic_scores(qa_block: str) -> tuple[dict[str, float], dict[str, Any] | None]:
    client = _openai_client()
    completion = await client.chat.completions.create(
        model=settings.OPENAI_MODEL,
        temperature=0.2,
        max_tokens=4500,
        messages=[
            {"role": "system", "content": DYNAMIC_REGION_SCORE_SYSTEM},
            {"role": "user", "content": qa_block},
        ],
    )
    choice = completion.choices[0].message.content
    if not choice:
        raise ValueError("Пустой ответ модели")
    return _parse_dynamic_scores_and_detail(choice)


async def compute_region_scores_dynamic(
    questions: list[dict[str, Any]],
    answers: dict[int, str],
    *,
    lang: str,
    test_meta: dict[str, Any] | None = None,
) -> tuple[dict[str, float], Literal["openai", "fallback"], dict[str, Any] | None]:
    n = len(questions)
    if set(answers.keys()) != set(range(1, n + 1)):
        raise ValueError("incomplete answers")
    qa_block = format_dynamic_qa_block(questions, answers, lang=lang, test_meta=test_meta)
    if not settings.OPENAI_API_KEY.strip():
        return fallback_region_scores_n(answers, n), "fallback", None
    try:
        scores, detail = await _openai_dynamic_scores(qa_block)
        return scores, "openai", detail
    except (APIError, json.JSONDecodeError, ValueError, KeyError, TypeError) as exc:
        logger.warning("OpenAI dynamic scoring failed, using fallback: %s", exc)
        return fallback_region_scores_n(answers, n), "fallback", None


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
    return {"meta": data["meta"], "questions": data["questions"]}
