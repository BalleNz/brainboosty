import { motion } from "framer-motion";
import heroBrain from "@bb-assets/full-glowing-brain.png";
import { BrandLogo } from "../../components/BrandLogo.jsx";

export function Hero({ lang, onCtaBot, onCtaLogin }) {
  const isRu = lang === "ru";
  const slogan = isRu ? "Мозг — главный сексуальный орган" : "The brain is the main sexual organ";
  const sub = isRu
    ? "Neural Map · нейробиология удовольствия без воды. Карта, тест и практики — в Telegram и браузере."
    : "Neural Map · neuroscience of pleasure, no fluff. Map, test, and practices—in Telegram and your browser.";

  return (
    <section className="relative flex min-h-[92vh] flex-col items-center justify-center px-5 pb-16 pt-10 text-center">
      <motion.div
        className="relative mx-auto max-w-lg"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.img
          src={heroBrain}
          alt=""
          className="mx-auto w-[min(100%,320px)] animate-pulse-neon animate-float"
          width={320}
          height={320}
          decoding="async"
        />
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-full"
          animate={{ opacity: [0.4, 0.75, 0.4] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{
            background:
              "radial-gradient(circle, rgba(255,20,147,0.35) 0%, rgba(0,240,255,0.08) 45%, transparent 70%)",
          }}
        />
      </motion.div>

      <motion.div
        className="mt-8 flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <BrandLogo className="bb-brand-logo bb-brand-logo--hero" />
      </motion.div>

      <motion.h1
        className="lux-heading mt-4 max-w-2xl text-3xl leading-tight sm:text-4xl md:text-5xl"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
      >
        <span className="bg-gradient-to-r from-neon-pink via-white to-amber-200 bg-clip-text text-transparent">
          {slogan}
        </span>
      </motion.h1>

      <motion.p
        className="mt-5 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {sub}
      </motion.p>

      <motion.div
        className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75 }}
      >
        <button type="button" className="lux-btn-primary" onClick={onCtaBot}>
          {isRu ? "Прокачать мозг в боте" : "Boost in Telegram"}
        </button>
        <button type="button" className="lux-btn-ghost" onClick={onCtaLogin}>
          {isRu ? "Neural Map Hub" : "Neural Map Hub"}
        </button>
      </motion.div>
    </section>
  );
}
