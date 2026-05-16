import { motion } from "framer-motion";
import { TESTIMONIALS } from "../data/brainZones.js";

export function Testimonials({ lang }) {
  const isRu = lang === "ru";
  return (
    <section id="reviews" className="px-5 py-20">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="lux-heading text-3xl sm:text-4xl">{isRu ? "Отзывы" : "Stories"}</h2>
      </div>
      <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <motion.blockquote
            key={t.name}
            className="lux-glass flex flex-col p-6 text-left"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <p className="text-sm leading-relaxed text-white/80">
              «{t.quote[lang] || t.quote.ru}»
            </p>
            <footer className="mt-4 border-t border-white/10 pt-4">
              <cite className="not-italic font-display font-semibold text-neon-pink">{t.name}</cite>
              <p className="text-xs text-white/50">{t.meta[lang] || t.meta.ru}</p>
            </footer>
          </motion.blockquote>
        ))}
      </div>
    </section>
  );
}
