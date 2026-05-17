import { motion } from "framer-motion";
import { useMaskedVideoCanvas } from "../hooks/useMaskedVideoCanvas.js";

/** Кликабельный логотип: color.mp4 + alpha.mp4 → canvas без фона */
export function HeroVideo({ onClick, lang }) {
  const isRu = lang === "ru";
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const { canvasRef, posterSrc } = useMaskedVideoCanvas({ enabled: !reducedMotion });

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

      <div className="bb-hero-video-stage relative mx-auto w-[min(100%,320px)]">
        {reducedMotion ? (
          <img
            src={posterSrc}
            alt=""
            className="bb-hero-video bb-hero-video--static mx-auto block w-full"
            width={320}
            height={320}
            decoding="async"
          />
        ) : (
          <>
            <img
              src={posterSrc}
              alt=""
              className="bb-hero-video bb-hero-video--poster absolute inset-0 mx-auto h-full w-full object-contain"
              aria-hidden
              decoding="async"
            />
            <canvas ref={canvasRef} className="bb-hero-video bb-hero-video--masked relative z-[1] mx-auto block w-full" />
          </>
        )}
      </div>

      <span className="mt-3 block text-xs uppercase tracking-[0.28em] text-pink-300/80">
        {isRu ? "Нажми · Neural Map" : "Tap · Neural Map"}
      </span>
    </motion.button>
  );
}
