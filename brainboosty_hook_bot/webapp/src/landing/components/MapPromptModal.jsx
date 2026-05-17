import { motion, AnimatePresence } from "framer-motion";

/** Нет карты — предложить бот / Hub / тест */
export function MapPromptModal({ lang, open, onClose, onBot, onHub, onTest }) {
  const isRu = lang === "ru";
  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-5 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        role="presentation"
      >
        <motion.div
          className="lux-glass w-full max-w-sm p-8 text-center"
          initial={{ opacity: 0, scale: 0.94, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94 }}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
        >
          <p className="text-2xl" aria-hidden>
            ♥
          </p>
          <h2 className="lux-heading mt-3 text-xl">
            {isRu ? "Сначала — анкета и тест" : "Start with onboarding & test"}
          </h2>
          <p className="mt-3 text-sm text-white/75">
            {isRu
              ? "Neural Map появится после анкеты в боте и первого теста. Или войди в Hub, если уже проходил."
              : "Your Neural Map unlocks after bot onboarding and your first test—or sign in to Hub if you already did."}
          </p>
          <div className="mt-8 flex flex-col gap-3">
            <button type="button" className="lux-btn-primary" onClick={onBot}>
              {isRu ? "Прокачать мозг в боте" : "Boost in Telegram"}
            </button>
            {onTest && (
              <button type="button" className="lux-btn-ghost" onClick={onTest}>
                {isRu ? "Пройти тест" : "Take the test"}
              </button>
            )}
            <button type="button" className="lux-btn-ghost" onClick={onHub}>
              {isRu ? "Neural Map Hub" : "Neural Map Hub"}
            </button>
            <button type="button" className="mt-2 text-xs text-white/45 hover:text-white/70" onClick={onClose}>
              {isRu ? "Закрыть" : "Close"}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
