import { motion } from "framer-motion";
import { BrandLogo } from "../../components/BrandLogo.jsx";

/** Кликабельный анимированный логотип на лендинге */
export function HeroVideo({ onClick, lang }) {
  const isRu = lang === "ru";
  return (
    <motion.button
      type="button"
      className="bb-hero-video-hit group relative mx-auto mt-12 block max-w-lg"
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.85, duration: 0.65 }}
      aria-label={isRu ? "Открыть Neural Map" : "Open Neural Map"}
    >
      <span className="pointer-events-none absolute -inset-2 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
        <span
          className="absolute inset-0 rounded-3xl"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(255,20,147,0.35), transparent 70%)",
            boxShadow: "0 0 48px rgba(255,20,147,0.45)",
          }}
        />
      </span>

      <BrandLogo variant="hero" className="bb-hero-video-stage mx-auto w-[min(100%,320px)]" />

      <span className="mt-3 block text-xs uppercase tracking-[0.28em] text-pink-300/80">
        {isRu ? "Нажми · Neural Map" : "Tap · Neural Map"}
      </span>
    </motion.button>
  );
}
