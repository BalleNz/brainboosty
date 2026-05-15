import { REGION_KEYS } from "./regions.js";

/** Demo payload until backend wires Telegram initData → DB snapshot. */
export const DEMO_PROFILE = {
  lang: "ru",
  userDisplayName: "Алекс",
  paid: false,
  testVariant: "development",
  tributeUrl: "https://t.me/tribute/app?startapp=sUmL",
  neuroScore: 68.4,
  scores: {
    prefrontal_cortex: 72.5,
    brain_lobes: 65.0,
    insular_cortex: 58.3,
    temporoparietal_junction: 71.2,
    amygdala: 54.8,
    frontal_gyrus: 88.1,
  },
  connectivity: [
    "Префронтальная кора → Амигдала: сильный тормоз импульса снижает эмоциональный шум.",
    "Островковая кора ↔ TPJ: телесная осознанность усиливает социальную синхронизацию.",
  ],
  regions: {
    prefrontal_cortex: {
      bullets: [
        "Здесь решается, кто ведёт игру: импульс или ты. Прокачай зону — и близость станет спокойнее.",
        "3× в неделю — 8 минут «стоп-кадр» перед важным разговором: назови цель одной фразой.",
        "Полная программа и все рекомендации — в платной версии.",
      ],
      submetrics: [
        { label: "Связность зоны", value: 74 },
        { label: "Ритм", value: 68 },
        { label: "Устойчивость", value: 71 },
        { label: "Потенциал роста", value: 77 },
      ],
    },
    brain_lobes: {
      bullets: [
        "Картинка в голове — половина сцены. Чем ярче образ, тем увереннее ты задаёшь темп.",
        "Перед сном — 2 минуты визуализации желаемого сценария без телефона.",
        "Полная программа и все рекомендации — в платной версии.",
      ],
      submetrics: [
        { label: "Связность зоны", value: 62 },
        { label: "Ритм", value: 66 },
        { label: "Устойчивость", value: 59 },
        { label: "Потенциал роста", value: 73 },
      ],
    },
    insular_cortex: {
      bullets: [
        "Тело не врёт: островок переводит сенсации в ясность.",
        "Дыхание 4-4-6 утром — 5 циклов, фокус на груди и животе.",
        "Полная программа и все рекомендации — в платной версии.",
      ],
      submetrics: [
        { label: "Связность зоны", value: 55 },
        { label: "Ритм", value: 52 },
        { label: "Устойчивость", value: 61 },
        { label: "Потенциал роста", value: 64 },
      ],
    },
    temporoparietal_junction: {
      bullets: [
        "Социальный радар: темп, намёки, паузы. Когда он точный — остаётся синхрон.",
        "После диалога — одна фраза: «что партнёр почувствовал?» без оценки.",
        "Полная программа и все рекомендации — в платной версии.",
      ],
      submetrics: [
        { label: "Связность зоны", value: 70 },
        { label: "Ритм", value: 69 },
        { label: "Устойчивость", value: 72 },
        { label: "Потенциал роста", value: 74 },
      ],
    },
    amygdala: {
      bullets: [
        "Триггеры режут глубину. Спокойная амигдала — смелость в желаниях без срывов.",
        "При раздражении — 90 секунд ходьбы или вода, до ответа.",
        "Полная программа и все рекомендации — в платной версии.",
      ],
      submetrics: [
        { label: "Связность зоны", value: 48 },
        { label: "Ритм", value: 51 },
        { label: "Устойчивость", value: 56 },
        { label: "Потенциал роста", value: 63 },
      ],
    },
    frontal_gyrus: {
      bullets: [
        "Слова — интерфейс к удовольствию. Чёткая формулировка делает отклик мягче.",
        "Раз в день — одно желание письменно, без оправданий.",
        "Полная программа и все рекомендации — в платной версии.",
      ],
      submetrics: [
        { label: "Связность зоны", value: 86 },
        { label: "Ритм", value: 84 },
        { label: "Устойчивость", value: 89 },
        { label: "Потенциал роста", value: 91 },
      ],
    },
  },
};

export function computeNeuroScore(scores) {
  const vals = REGION_KEYS.map((k) => Number(scores[k] ?? 0));
  const sum = vals.reduce((a, b) => a + b, 0);
  return Math.round((sum / Math.max(vals.length, 1)) * 10) / 10;
}
