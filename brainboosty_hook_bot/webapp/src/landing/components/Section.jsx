import { motion } from "framer-motion";

/** Тематическая секция с glass + неон */
export function Section({ section, lang, index }) {
  const title = section.title[lang] || section.title.ru;
  const body = section.body[lang] || section.body.ru;
  const flip = index % 2 === 1;

  return (
    <motion.section
      className={`lux-glass mx-auto flex max-w-5xl flex-col gap-6 p-8 md:p-10 ${
        flip ? "md:flex-row-reverse" : "md:flex-row"
      } items-center`}
      initial={{ opacity: 0, x: flip ? 24 : -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55 }}
    >
      <div
        className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-neon-pink/30 text-2xl text-neon-gold"
        style={{ boxShadow: "0 0 24px rgba(255,20,147,0.35)" }}
      >
        {section.icon}
      </div>
      <motion.div>
        <h2 className="lux-heading text-2xl sm:text-3xl">{title}</h2>
        <p className="mt-3 text-sm leading-relaxed text-white/75 sm:text-base">{body}</p>
      </motion.div>
    </motion.section>
  );
}
