"""Копирайт тизера карты мозга: инсайты по зоне × режим (sex/gen) × уровню (low/med/high)."""

from __future__ import annotations

# area → sex|gen → low|med|high → ru|en
INSIGHTS: dict[str, dict[str, dict[str, dict[str, str]]]] = {
    "brain_lobes": {
        "sex": {
            "low": {
                "ru": (
                    "Сейчас фантазии бледные. После прокачки сможешь ярко представлять любые сцены "
                    "и сильно возбуждаться даже в одиночестве."
                ),
                "en": (
                    "Fantasies feel muted now. With training you’ll picture vivid scenes and get "
                    "strongly aroused even on your own."
                ),
            },
            "med": {
                "ru": (
                    "Уже есть зацепки. Дальше — больше яркости и контроля образа: сцены станут "
                    "«как в кино», а возбуждение — предсказуемым."
                ),
                "en": (
                    "You already have hooks. Next: brighter, controllable imagery — scenes feel "
                    "more cinematic and arousal more predictable."
                ),
            },
            "high": {
                "ru": (
                    "Сильная визуализация — твой козырь. Можно тонко направлять фантазию и быстрее "
                    "входить в нужное состояние."
                ),
                "en": (
                    "Strong visualization is your edge. You can steer fantasy and reach desired states faster."
                ),
            },
        },
        "gen": {
            "low": {
                "ru": (
                    "Образы пока тусклые. После прокачки проще удерживать картинку задачи в голове "
                    "и доводить дела до конца."
                ),
                "en": (
                    "Mental images feel dim. Training makes it easier to hold a task picture in mind "
                    "and finish what you start."
                ),
            },
            "med": {
                "ru": (
                    "База есть. Дальше — чётче детали и последовательность: меньше «размытости» "
                    "в планах и решениях."
                ),
                "en": (
                    "You have a base. Next: sharper detail and sequence — less blur in plans and decisions."
                ),
            },
            "high": {
                "ru": (
                    "Отличное воображение. Можно использовать для учёбы, спорта и сложных проектов "
                    "без перегруза."
                ),
                "en": (
                    "Great imagery. You can leverage it for study, sport, and complex projects without overload."
                ),
            },
        },
    },
    "insular_cortex": {
        "sex": {
            "low": {
                "ru": (
                    "Ты часто «выпадаешь» из тела. После прокачки будешь чувствовать каждое прикосновение "
                    "и приближение оргазма в разы острее."
                ),
                "en": (
                    "You often leave your body. With training you’ll feel every touch and orgasm build "
                    "much more sharply."
                ),
            },
            "med": {
                "ru": (
                    "Телесность уже ощущается. Дальше — глубже интероцепция: меньше отключений, "
                    "больше удовольствия в моменте."
                ),
                "en": (
                    "Embodiment is showing up. Next: deeper interoception — fewer checkouts, more pleasure now."
                ),
            },
            "high": {
                "ru": (
                    "Тело «на связи». Легче ловить волну возбуждения и тонко регулировать темп."
                ),
                "en": (
                    "Body is online. Easier to ride arousal and fine-tune pacing."
                ),
            },
        },
        "gen": {
            "low": {
                "ru": (
                    "Сигналы тела легко теряются. После прокачки проще замечать усталость, стресс "
                    "и восстанавливаться вовремя."
                ),
                "en": (
                    "Body signals get lost. Training helps you notice fatigue and stress and recover in time."
                ),
            },
            "med": {
                "ru": (
                    "Иногда чувствуешь тело, иногда нет. Дальше — стабильнее: меньше автопилота, "
                    "больше осознанности."
                ),
                "en": (
                    "Sometimes embodied, sometimes not. Next: more stability — less autopilot, more awareness."
                ),
            },
            "high": {
                "ru": (
                    "Хорошая связь с телом. Можно опираться на неё в нагрузке и принятии решений."
                ),
                "en": (
                    "Solid body awareness. You can lean on it under load and when deciding."
                ),
            },
        },
    },
    "temporoparietal_junction": {
        "sex": {
            "low": {
                "ru": (
                    "Часто не понимаешь, чего хочет партнёр. После прокачки будешь угадывать желания "
                    "и дарить невероятное удовольствие."
                ),
                "en": (
                    "It’s hard to read a partner’s wants. Training helps you infer desires and deliver "
                    "strong pleasure."
                ),
            },
            "med": {
                "ru": (
                    "Интуиция по партнёру уже есть. Дальше — точнее догадки и меньше неловких пауз."
                ),
                "en": (
                    "Partner intuition is forming. Next: sharper reads and fewer awkward pauses."
                ),
            },
            "high": {
                "ru": (
                    "Тонко читаешь контекст. Можно усиливать доверие и сценарии без слов."
                ),
                "en": (
                    "You read context well. You can deepen trust and nonverbal scenarios."
                ),
            },
        },
        "gen": {
            "low": {
                "ru": (
                    "Намерения других ускользают. После прокачки проще улавливать тон разговора "
                    "и договариваться без конфликта."
                ),
                "en": (
                    "Others’ intentions slip away. Training makes tone and agreements easier without conflict."
                ),
            },
            "med": {
                "ru": (
                    "Иногда попадаешь в контекст. Дальше — стабильнее: меньше недопониманий в работе и быту."
                ),
                "en": (
                    "Sometimes you nail context. Next: fewer misunderstandings at work and daily life."
                ),
            },
            "high": {
                "ru": (
                    "Сильная социальная интуиция. Можно использовать в переговорах и командной работе."
                ),
                "en": (
                    "Strong social intuition. Useful in negotiations and teamwork."
                ),
            },
        },
    },
    "amygdala": {
        "sex": {
            "low": {
                "ru": (
                    "Эмоции и возбуждение скачут. После прокачки проще входить в состояние желания "
                    "и не срываться на тревогу."
                ),
                "en": (
                    "Emotions and arousal swing. Training makes desire easier to enter without anxiety spikes."
                ),
            },
            "med": {
                "ru": (
                    "Уже неплохо. Дальше будет легче входить в глубокое возбуждение и управлять эмоциями."
                ),
                "en": (
                    "Already solid. Next: easier deep arousal and cleaner emotion regulation."
                ),
            },
            "high": {
                "ru": (
                    "Эмоциональная гибкость в плюсе. Можно тонко накручивать и сбрасывать интенсивность."
                ),
                "en": (
                    "Emotional flexibility is a strength. You can ramp intensity up and down smoothly."
                ),
            },
        },
        "gen": {
            "low": {
                "ru": (
                    "Стресс легко захватывает. После прокачки проще возвращаться в спокойствие "
                    "и не «залипать» в тревоге."
                ),
                "en": (
                    "Stress grabs you fast. Training makes calm return easier without getting stuck anxious."
                ),
            },
            "med": {
                "ru": (
                    "Регуляция на среднем уровне. Дальше — быстрее восстановление после напряжённых дней."
                ),
                "en": (
                    "Regulation is mid-level. Next: faster recovery after intense days."
                ),
            },
            "high": {
                "ru": (
                    "Хороший эмоциональный контроль. Можно опираться на него в кризисах и дедлайнах."
                ),
                "en": (
                    "Good emotional control. Lean on it in crises and deadlines."
                ),
            },
        },
    },
    "prefrontal_cortex": {
        "sex": {
            "low": {
                "ru": (
                    "Сложно держать рамку и тормозить импульс. После прокачки проще планировать близость "
                    "и не терять контроль в ключевой момент."
                ),
                "en": (
                    "Hard to hold boundaries and brake impulses. Training helps plan intimacy and stay "
                    "in control when it matters."
                ),
            },
            "med": {
                "ru": (
                    "Контроль уже заметен. Дальше — меньше срывов и больше уверенности в сценарии."
                ),
                "en": (
                    "Control is visible. Next: fewer slips, more confidence in your script."
                ),
            },
            "high": {
                "ru": (
                    "Сильная префронтальная опора. Можно строить доверие и эксперименты безопасно."
                ),
                "en": (
                    "Strong prefrontal support. Build trust and experiments safely."
                ),
            },
        },
        "gen": {
            "low": {
                "ru": (
                    "Импульсы и отвлечения рулят. После прокачки проще доводить задачи до конца "
                    "и не срываться на откладывание."
                ),
                "en": (
                    "Impulses and distraction rule. Training helps finish tasks and beat procrastination."
                ),
            },
            "med": {
                "ru": (
                    "Самоконтроль на среднем уровне. Дальше — стабильнее фокус в течение дня."
                ),
                "en": (
                    "Self-control is mid. Next: steadier focus across the day."
                ),
            },
            "high": {
                "ru": (
                    "Хорошее планирование и тормоз. Можно тянуть сложные проекты без выгорания."
                ),
                "en": (
                    "Good planning and brakes. You can carry complex projects without burning out."
                ),
            },
        },
    },
    "frontal_gyrus": {
        "sex": {
            "low": {
                "ru": (
                    "Сложно говорить о желаниях вслух. После прокачки проще формулировать просьбы "
                    "и получать то, что хочется."
                ),
                "en": (
                    "Hard to voice desires. Training makes requests clearer so you get what you want."
                ),
            },
            "med": {
                "ru": (
                    "Речь о желаниях уже лучше. Дальше — меньше стеснения и больше ясности для партнёра."
                ),
                "en": (
                    "Desire talk is improving. Next: less shame, more clarity for your partner."
                ),
            },
            "high": {
                "ru": (
                    "Уверенная вербализация. Можно строить честный диалог о границах и фантазиях."
                ),
                "en": (
                    "Confident verbalization. Honest talk about boundaries and fantasies gets easier."
                ),
            },
        },
        "gen": {
            "low": {
                "ru": (
                    "Сложно выразить мысль вслух. После прокачки проще объяснять идеи коллегам "
                    "и спорить без конфликта."
                ),
                "en": (
                    "Hard to speak thoughts aloud. Training helps explain ideas and disagree cleanly."
                ),
            },
            "med": {
                "ru": (
                    "Речь уже неплохая. Дальше — структурнее изложение и меньше «ну типа»."
                ),
                "en": (
                    "Speech is decent. Next: clearer structure, fewer fillers."
                ),
            },
            "high": {
                "ru": (
                    "Сильная речевая подача. Можно использовать в презентациях и сложных разговорах."
                ),
                "en": (
                    "Strong delivery. Use it in presentations and tough conversations."
                ),
            },
        },
    },
}
