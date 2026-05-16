import { motion } from "framer-motion";
import { BRAIN_ZONES } from "../data/brainZones.js";
import { BrainCard } from "./BrainCard.jsx";

export function BrainZonesGrid({ lang }) {
  const isRu = lang === "ru";
  return (
    <section id="zones" className="px-5 py-20">
      <motion.div
        className="mx-auto max-w-5xl text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-pink-300/90">
          {isRu ? "Neural Map" : "Neural Map"}
        </p>
        <h2 className="lux-heading mt-3 text-3xl sm:text-4xl">
          {isRu ? "Ключевые зоны мозга" : "Key brain zones"}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-white/65 sm:text-base">
          {isRu
            ? "Шесть рычагов удовольствия — в вашей персональной карте после теста."
            : "Six pleasure levers—in your personal map after the test."}
        </p>
      </motion.div>
      <motion.div
        className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-4 md:gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.08 } },
        }}
      >
        {BRAIN_ZONES.map((zone, i) => (
          <BrainCard key={zone.id} zone={zone} lang={lang} index={i} />
        ))}
      </motion.div>
    </section>
  );
}
