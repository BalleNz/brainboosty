import { motion } from "framer-motion";

/**
 * Карточка зоны мозга: неон pink glow, золотые частицы на hover
 */
export function BrainCard({ zone, lang, index }) {
  const title = zone.title[lang] || zone.title.ru;
  const tag = zone.tag[lang] || zone.tag.ru;

  return (
    <motion.article
      className="group relative overflow-hidden rounded-2xl lux-glass p-4"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      whileHover={{ scale: 1.03 }}
    >
      <motion.div
        className="pointer-events-none absolute -inset-1 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, rgba(255,20,147,0.35), transparent 65%)",
          boxShadow: "0 0 40px rgba(255,20,147,0.45)",
        }}
      />
      <motion.span
        className="pointer-events-none absolute right-3 top-3 h-1.5 w-1.5 rounded-full bg-neon-gold opacity-0 group-hover:opacity-100"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
      />
      <div className="relative aspect-square overflow-hidden rounded-xl border border-neon-pink/20 bg-black/40">
        <img
          src={zone.image}
          alt=""
          className="h-full w-full object-contain p-2 transition duration-500 group-hover:scale-105"
          style={{
            filter:
              "drop-shadow(0 0 18px rgba(255,20,147,0.55)) drop-shadow(0 0 32px rgba(255,0,170,0.25))",
          }}
          loading="lazy"
          decoding="async"
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-60 mix-blend-screen"
          style={{
            background:
              "linear-gradient(180deg, transparent 40%, rgba(255,20,147,0.25) 100%)",
          }}
        />
      </div>
      <h3 className="relative mt-3 font-display text-sm font-semibold text-white sm:text-base">{title}</h3>
      <p className="relative mt-1 text-xs text-neon-cyan/80">{tag}</p>
    </motion.article>
  );
}
