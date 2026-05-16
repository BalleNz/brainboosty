import { motion } from "framer-motion";
import { PRICING_TIERS } from "../data/brainZones.js";

export function Pricing({ lang, meta, onLogin, onAccess }) {
  const isRu = lang === "ru";

  const handleTier = (tier) => {
    if (tier.href === "bot" && meta?.botUrl) {
      window.open(meta.botUrl, "_blank", "noopener,noreferrer");
      return;
    }
    if (tier.href === "login") onLogin();
    if (tier.href === "access") onAccess();
  };

  return (
    <section id="pricing" className="px-5 py-20">
      <motion.div
        className="mx-auto max-w-5xl text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="lux-heading text-3xl sm:text-4xl">{isRu ? "Тарифы" : "Plans"}</h2>
        <p className="mt-4 text-white/65">
          {isRu ? "Начните бесплатно — масштабируйте, когда карта заговорит." : "Start free—scale when the map speaks."}
        </p>
      </motion.div>
      <motion.div
        className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {PRICING_TIERS.map((tier) => (
          <article
            key={tier.id}
            className={`relative flex flex-col rounded-2xl p-6 ${
              tier.highlight
                ? "border border-neon-pink/50 bg-gradient-to-b from-neon-pink/15 to-transparent shadow-neon-pink"
                : "lux-glass"
            }`}
          >
            {tier.highlight && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-neon-pink px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                {isRu ? "Популярно" : "Popular"}
              </span>
            )}
            <p className="text-xs uppercase tracking-widest text-neon-cyan">{tier.price[lang] || tier.price.ru}</p>
            <h3 className="mt-2 font-display text-xl font-bold">{tier.title[lang] || tier.title.ru}</h3>
            <ul className="mt-4 flex-1 space-y-2 text-sm text-white/75">
              {(tier.features[lang] || tier.features.ru).map((f) => (
                <li key={f} className="flex gap-2">
                  <span className="text-neon-gold">✦</span>
                  {f}
                </li>
              ))}
            </ul>
            <button
              type="button"
              className={tier.highlight ? "lux-btn-primary mt-6 w-full" : "lux-btn-ghost mt-6 w-full"}
              onClick={() => handleTier(tier)}
            >
              {tier.cta[lang] || tier.cta.ru}
            </button>
          </article>
        ))}
      </motion.div>
    </section>
  );
}
