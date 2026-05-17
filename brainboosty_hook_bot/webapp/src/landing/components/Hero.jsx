import { motion } from "framer-motion";
import { HeroVideo } from "./HeroVideo.jsx";

export function Hero({ lang, onCtaBot, onCtaLogin, onHeroVideoClick }) {
  const isRu = lang === "ru";
  const slogan = isRu ? "Мозг — главный сексуальный орган" : "The brain is the main sexual organ";
  const sub = isRu
    ? "Neural Map · нейробиология удовольствия без воды. Карта, тест и практики — в Telegram и браузере."
    : "Neural Map · neuroscience of pleasure, no fluff. Map, test, and practices—in Telegram and your browser.";

  return (
    <section className="relative flex min-h-[88vh] flex-col items-center justify-center px-5 pb-12 pt-10 text-center">
      <motion.h1
        className="lux-heading max-w-2xl text-3xl leading-tight sm:text-4xl md:text-5xl"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
      >
        <span className="bg-gradient-to-r from-neon-pink via-white to-amber-200 bg-clip-text text-transparent">
          {slogan}
        </span>
      </motion.h1>

      <motion.p
        className="mt-5 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
      >
        {sub}
      </motion.p>

      <motion.div
        className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <button type="button" className="lux-btn-primary" onClick={onCtaBot}>
          {isRu ? "Прокачать мозг в боте" : "Boost in Telegram"}
        </button>
        <button type="button" className="lux-btn-ghost" onClick={onCtaLogin}>
          {isRu ? "Neural Map Hub" : "Neural Map Hub"}
        </button>
      </motion.div>

      <HeroVideo lang={lang} onClick={onHeroVideoClick} />
    </section>
  );
}
