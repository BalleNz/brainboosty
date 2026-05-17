import { motion } from "framer-motion";
import { BrandLogo } from "../../components/BrandLogo.jsx";

export function LangGate({ onChoose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-void/95 px-5 backdrop-blur-md">
      <motion.div
        className="lux-glass w-full max-w-sm p-8 text-center"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <BrandLogo variant="gate" className="mx-auto" />
        <p className="mt-4 text-sm text-white/70">Выберите язык · Choose language</p>
        <motion.div className="mt-8 flex flex-col gap-3">
          <button type="button" className="lux-btn-primary" onClick={() => onChoose("ru")}>
            🇷🇺 Русский
          </button>
          <button type="button" className="lux-btn-ghost" onClick={() => onChoose("en")}>
            🇬🇧 English
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
