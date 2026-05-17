import { motion } from "framer-motion";
import { BrandLogo } from "../../components/BrandLogo.jsx";

/** Кликабельный анимированный логотип на лендинге */
export function HeroVideo({ onClick, lang }) {
  const isRu = lang === "ru";
  return (
    <motion.button
      type="button"
      className="bb-hero-video-hit relative mx-auto mt-12 block max-w-lg"
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.85, duration: 0.65 }}
      aria-label={isRu ? "Открой свою карту мозга" : "Open your brain map"}
    >
      <BrandLogo variant="hero" className="bb-hero-video-stage mx-auto w-[min(100%,320px)]" />

      <span className="mt-3 block text-sm text-pink-300/90">
        {isRu ? "Открой свою карту мозга" : "Open your brain map"}
      </span>
    </motion.button>
  );
}
