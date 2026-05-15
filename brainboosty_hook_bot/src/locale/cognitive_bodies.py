"""Тексты вопросов когнитивного теста (7 шт.) на ru/en."""

from __future__ import annotations

import html

RU_SEXUAL = [
    "1. Планирование секса\nКак ты обычно подходишь к сексуальной жизни?\nA) Заранее продумываю всё: когда, где, какие фантазии, игрушки\nB) В общих чертах знаю, чего хочу, но гибко\nC) Планирую только если очень сильно тянет\nD) Полностью спонтанно, без планов",
    "2. Реакция на отказ или неудачу в сексе\nКогда партнёр отказывает или секс идёт не так:\nA) Сильная эмоциональная реакция (обида, злость, резкое падение возбуждения)\nB) Заметно расстраиваюсь, но быстро отпускаю\nC) Реагирую умеренно\nD) Почти не задевает, остаюсь спокойным",
    "3. Чувствование тела во время секса\nНасколько хорошо ты чувствуешь свои телесные ощущения в процессе?\nA) Отлично — каждое сокращение, тепло, приближение оргазма\nB) Обычно хорошо замечаю\nC) Замечаю только очень яркие ощущения\nD) Плохо чувствую, что происходит внутри тела",
    "4. Чтение желаний партнёра\nНасколько точно ты понимаешь, чего хочет партнёр в постели (даже если он/она молчит)?\nA) Почти всегда угадываю желания и границы\nB) Хорошо чувствую\nC) Средне, иногда ошибаюсь\nD) Часто не понимаю, чего он/она хочет",
    "5. Проговаривание своих желаний\nНасколько легко ты словами описываешь свои сексуальные фантазии и желания?\nA) Легко и подробно, даже самые грязные\nB) Обычно могу нормально сказать\nC) Иногда сложно подобрать слова\nD) Мысли путаются, стыдно или не получается",
    "6. Визуализация секса\nНасколько ярко ты можешь представлять сексуальные позы, движения и сцены?\nA) Супер-чётко, как в 4K, в 3D\nB) Довольно ярко и детально\nC) Смутно, общими образами\nD) С трудом представляю визуально",
    "7. Контроль возбуждения и импульсов\nНасколько легко ты можешь сдерживать себя в сексе (отложить, остановиться на краю, не сорваться)?\nA) Часто срываюсь и действую импульсивно\nB) Иногда не могу удержаться\nC) Обычно контролирую\nD) Легко контролирую возбуждение и порывы",
]

EN_SEXUAL = [
    "1. Sex planning\nHow do you usually approach your sex life?\nA) I plan everything in advance: when, where, fantasies, toys\nB) I roughly know what I want but stay flexible\nC) I only plan when I feel a strong urge\nD) Fully spontaneous, no plans",
    "2. Reaction to rejection or failed sex\nWhen a partner refuses or sex does not go well:\nA) Strong emotional reaction (hurt, anger, arousal drops sharply)\nB) I feel upset but let go quickly\nC) Moderate reaction\nD) Almost does not affect me, I stay calm",
    "3. Body awareness during sex\nHow well do you feel bodily sensations during sex?\nA) Excellent — every contraction, warmth, approaching orgasm\nB) Usually notice well\nC) Only very intense sensations\nD) Poor sense of what happens inside the body",
    "4. Reading a partner’s desires\nHow accurately do you understand what your partner wants in bed (even if they stay silent)?\nA) Almost always guess wishes and boundaries\nB) Sense well\nC) Average, sometimes wrong\nD) Often do not understand what they want",
    "5. Putting desires into words\nHow easily do you verbally describe your sexual fantasies and wishes?\nA) Easily and in detail, even the “dirtiest”\nB) Usually can say it fine\nC) Sometimes hard to find words\nD) Thoughts tangle, shame or cannot say",
    "6. Visualizing sex\nHow vividly can you imagine sexual positions, movements and scenes?\nA) Super clear, like 4K in 3D\nB) Quite vivid and detailed\nC) Vague, general images\nD) Hard to visualize",
    "7. Arousal and impulse control\nHow easily can you hold back during sex (delay, stop on the edge, not rush)?\nA) Often act impulsively\nB) Sometimes cannot hold back\nC) Usually in control\nD) Easily control arousal and urges",
]

RU_DEV = [
    "1. Планирование жизни и дел (ПФК)\nКак ты обычно подходишь к своим делам и целям?\nA) Заранее составляю подробные планы и придерживаюсь их\nB) Планирую в общих чертах, но гибко\nC) Планирую только самое важное\nD) Предпочитаю жить спонтанно, без жёстких планов",
    "2. Реакция на стресс (амигдала)\nКогда происходит что-то неприятное или стрессовое:\nA) Реакция очень сильная и быстрая (сердце колотится, эмоции зашкаливают)\nB) Заметно реагирую, но быстро успокаиваюсь\nC) Реакция умеренная\nD) Реагирую спокойно, эмоции не захватывают",
    "3. Осознание телесных ощущений (островковая кора)\nНасколько хорошо ты чувствуешь сигналы своего тела (напряжение, сердцебиение, усталость)?\nA) Отлично, замечаю даже лёгкие сигналы\nB) Обычно хорошо замечаю\nC) Замечаю только сильные ощущения\nD) Плохо чувствую, что происходит в теле",
    "4. Понимание других людей (височно-теменной узел)\nНасколько точно ты понимаешь, что думает и чувствует другой человек (даже если он не говорит)?\nA) Почти всегда точно считываю\nB) Хорошо понимаю\nC) Средне\nD) Часто не понимаю, почему люди ведут себя так",
    "5. Умение выражать свои мысли (лобная извилина)\nНасколько легко ты формулируешь и проговариваешь сложные мысли и идеи?\nA) Легко и точно, даже самые запутанные\nB) Обычно формулирую хорошо\nC) Иногда сложно подобрать слова\nD) Мысли путаются при попытке высказать",
    "6. Пространственное мышление и визуализация (доли мозга)\nНасколько хорошо ты ориентируешься в пространстве и представляешь объекты/ситуации в 3D?\nA) Отлично, легко представляю\nB) Довольно хорошо\nC) Средне\nD) С трудом представляю",
    "7. Самоконтроль и импульсивность (ПФК + амигдала)\nНасколько легко ты сдерживаешь импульсы и контролируешь свои порывы?\nA) Часто действую импульсивно, потом жалею\nB) Иногда не могу удержаться\nC) Обычно контролирую\nD) Легко контролирую себя",
]

EN_DEV = [
    "1. Life and task planning (PFC)\nHow do you usually approach your tasks and goals?\nA) I make detailed plans in advance and follow them\nB) I plan roughly but stay flexible\nC) I plan only what matters most\nD) I prefer spontaneity without rigid plans",
    "2. Stress reaction (amygdala)\nWhen something unpleasant or stressful happens:\nA) Very strong fast reaction (heart racing, emotions spike)\nB) I react noticeably but calm down quickly\nC) Moderate reaction\nD) I stay calm, emotions do not take over",
    "3. Interoception (insula)\nHow well do you notice your body signals (tension, heartbeat, fatigue)?\nA) Excellent, even subtle signals\nB) Usually notice well\nC) Only strong sensations\nD) Poor sense of what happens in the body",
    "4. Understanding others (TPJ)\nHow accurately do you understand what another person thinks and feels (even if they do not say it)?\nA) Almost always read it accurately\nB) Understand well\nC) Average\nD) Often do not understand why people behave as they do",
    "5. Expressing thoughts (frontal gyrus)\nHow easily do you formulate and say complex thoughts and ideas?\nA) Easily and precisely, even tangled ones\nB) Usually formulate well\nC) Sometimes hard to find words\nD) Thoughts tangle when I try to speak",
    "6. Spatial thinking and visualization (brain lobes)\nHow well do you navigate space and imagine objects/situations in 3D?\nA) Excellent, easy to imagine\nB) Quite well\nC) Average\nD) Hard to imagine",
    "7. Self-control and impulsivity (PFC + amygdala)\nHow easily do you restrain impulses and control urges?\nA) Often act impulsively and regret later\nB) Sometimes cannot hold back\nC) Usually in control\nD) Easily control myself",
]

NUM = 7

_SEXUAL_Q_EMOJI = ("🔥", "💥", "🌡️", "👀", "💬", "🌌", "⚡")
_DEV_Q_EMOJI = ("🎯", "💥", "🫀", "👥", "💬", "🌐", "⚖️")


def _question_emoji(variant: str, q_index_1_based: int) -> str:
    i = q_index_1_based - 1
    row = _SEXUAL_Q_EMOJI if variant == "sexual" else _DEV_Q_EMOJI
    return row[i]


def _format_options_html(options_block: str) -> str:
    """Каждая строка «A) …» → «<b>A)</b> …»."""
    lines_out: list[str] = []
    for raw in options_block.strip().split("\n"):
        line = raw.strip()
        if len(line) >= 2 and line[0] in "ABCD" and line[1] == ")":
            paren = line.index(")") + 1
            prefix = line[:paren]
            rest = line[paren:].lstrip()
            lines_out.append(f"<b>{html.escape(prefix)}</b> {html.escape(rest)}")
        else:
            lines_out.append(html.escape(line))
    return "\n".join(lines_out)


def _split_topic_question_options(legacy_block: str) -> tuple[str, str, str]:
    """Из строки «1. Тема\\nВопрос?\\nA)…» — тема без номера, строка вопроса, блок вариантов."""
    head, question, opts = legacy_block.split("\n", 2)
    topic = head.split(". ", 1)[1]
    return topic.strip(), question.strip(), opts.strip()


def cognitive_question_body(lang: str, variant: str, q_index_1_based: int) -> str:
    lg = "en" if lang == "en" else "ru"
    idx = q_index_1_based - 1
    if variant == "sexual":
        legacy = (EN_SEXUAL if lg == "en" else RU_SEXUAL)[idx]
    else:
        legacy = (EN_DEV if lg == "en" else RU_DEV)[idx]
    topic, question, options = _split_topic_question_options(legacy)
    header_plain = f"Вопрос {q_index_1_based}/{NUM}" if lg == "ru" else f"Question {q_index_1_based}/{NUM}"
    header = f"🧠 <b>{html.escape(header_plain)}</b>"
    emoji = _question_emoji(variant, q_index_1_based)
    topic_line = f"{emoji} <b>{html.escape(topic)}</b>"
    options_html = _format_options_html(options)
    q_html = html.escape(question)
    return f"{header}\n\n{topic_line}\n\n{q_html}\n\n{options_html}"
