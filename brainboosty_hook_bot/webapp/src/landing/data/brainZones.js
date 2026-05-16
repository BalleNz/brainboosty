import frontalGyrus from "@bb-assets/brain-sections/frontal-gyrus.png";
import tpj from "@bb-assets/brain-sections/tpj.png";
import insula from "@bb-assets/brain-sections/insula.png";
import lobes from "@bb-assets/brain-sections/lobes.png";
import amygdala from "@bb-assets/brain-sections/amygdala.png";
import pfc from "@bb-assets/brain-sections/pfc.png";

/** 6 ключевых зон для сетки лендинга */
export const BRAIN_ZONES = [
  {
    id: "prefrontal_cortex",
    image: pfc,
    title: { ru: "Префронтальная кора", en: "Prefrontal cortex" },
    tag: { ru: "Контроль · желание", en: "Control · desire" },
  },
  {
    id: "frontal_gyrus",
    image: frontalGyrus,
    title: { ru: "Лобная извилина", en: "Frontal gyrus" },
    tag: { ru: "Мотивация · фокус", en: "Motivation · focus" },
  },
  {
    id: "insula",
    image: insula,
    title: { ru: "Островковая кора", en: "Insula" },
    tag: { ru: "Тело · удовольствие", en: "Body · pleasure" },
  },
  {
    id: "amygdala",
    image: amygdala,
    title: { ru: "Миндалина", en: "Amygdala" },
    tag: { ru: "Страсть · импульс", en: "Passion · impulse" },
  },
  {
    id: "brain_lobes",
    image: lobes,
    title: { ru: "Доли мозга", en: "Brain lobes" },
    tag: { ru: "Интеграция", en: "Integration" },
  },
  {
    id: "temporoparietal_junction",
    image: tpj,
    title: { ru: "Височно-теменной узел", en: "TPJ" },
    tag: { ru: "Эмпатия · связь", en: "Empathy · connection" },
  },
];

export const THEME_SECTIONS = [
  {
    id: "sex",
    icon: "◈",
    title: { ru: "Секс через мозг", en: "Sex through the brain" },
    body: {
      ru: "Либидо, возбуждение и близость — это нейрохимия. Мы показываем, какие зоны дают рычаг, а не «советы из журнала».",
      en: "Libido, arousal, and intimacy are neurochemistry. We show which zones are levers—not magazine tips.",
    },
  },
  {
    id: "psychology",
    icon: "◎",
    title: { ru: "Психология удовольствия", en: "Psychology of pleasure" },
    body: {
      ru: "Дофамин, окситоцин, предвкушение — в одной карте. Понимание паттернов снижает тревогу и усиливает контакт.",
      en: "Dopamine, oxytocin, anticipation—on one map. Understanding patterns reduces anxiety and deepens contact.",
    },
  },
  {
    id: "practice",
    icon: "✦",
    title: { ru: "Практики", en: "Practices" },
    body: {
      ru: "Микро-ритуалы и упражнения под ваш профиль — из бота и Neural Map Hub, без перегруза теорией.",
      en: "Micro-rituals and exercises for your profile—from the bot and Hub, without theory overload.",
    },
  },
  {
    id: "results",
    icon: "⬡",
    title: { ru: "Результаты", en: "Results" },
    body: {
      ru: "NeuroScore, динамика зон и история тестов — видите прогресс в цифрах и визуале, а не «на ощущениях».",
      en: "NeuroScore, zone trends, and test history—progress in numbers and visuals, not just feelings.",
    },
  },
];

export const TESTIMONIALS = [
  {
    quote: {
      ru: "Впервые увидел, почему «в голове» блокирует тело. Карта + бот — это другой уровень осознанности.",
      en: "First time I saw why 'in my head' blocks my body. The map + bot is another level of awareness.",
    },
    name: "Алексей",
    meta: { ru: "34 · предприниматель", en: "34 · founder" },
  },
  {
    quote: {
      ru: "Розовая карта — не маркетинг, а реально цепляет. Через неделю практик из Hub стало спокойнее в близости.",
      en: "The pink map isn't marketing—it hits. After a week of Hub practices, intimacy felt calmer.",
    },
    name: "Марина",
    meta: { ru: "29 · психолог", en: "29 · therapist" },
  },
  {
    quote: {
      ru: "Neural Map в браузере после теста в Telegram — бесшовно. Оплатил доступ, не жалею.",
      en: "Neural Map in the browser after the Telegram test—seamless. Paid for access, no regrets.",
    },
    name: "Damian",
    meta: { ru: "автор проекта", en: "project author" },
  },
];

export const PRICING_TIERS = [
  {
    id: "start",
    highlight: false,
    price: { ru: "Бесплатно", en: "Free" },
    title: { ru: "Старт в боте", en: "Bot start" },
    features: {
      ru: ["Анкета и первый тест", "Базовая Neural Map", "Вход через Telegram"],
      en: ["Onboarding & first test", "Basic Neural Map", "Telegram login"],
    },
    cta: { ru: "Открыть бота", en: "Open bot" },
    href: "bot",
  },
  {
    id: "hub",
    highlight: true,
    price: { ru: "Hub", en: "Hub" },
    title: { ru: "Neural Map Hub", en: "Neural Map Hub" },
    features: {
      ru: ["Полная карта в браузере", "История и повторные тесты", "Упражнения под профиль"],
      en: ["Full map in browser", "History & retests", "Profile-based exercises"],
    },
    cta: { ru: "Войти через Telegram", en: "Log in with Telegram" },
    href: "login",
  },
  {
    id: "access",
    highlight: false,
    price: { ru: "Premium", en: "Premium" },
    title: { ru: "Полный доступ", en: "Full access" },
    features: {
      ru: ["Все рекомендации по зонам", "Закрытый канал", "Приоритетные практики"],
      en: ["All zone insights", "Private channel", "Priority practices"],
    },
    cta: { ru: "Тарифы", en: "Plans" },
    href: "access",
  },
];
