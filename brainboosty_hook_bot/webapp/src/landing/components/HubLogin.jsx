import { motion } from "framer-motion";

/** Блок входа в Neural Map Hub (OIDC) */
export function HubLogin({ lang, status, error, onLogin, oidcConfigured }) {
  const isRu = lang === "ru";
  return (
    <section id="hub-login" className="px-5 py-20">
      <motion.div
        className="mx-auto max-w-xl lux-glass p-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="text-xs uppercase tracking-[0.3em] text-pink-300">Neural Map Hub ♥</p>
        <h2 className="lux-heading mt-3 text-2xl sm:text-3xl">
          {isRu ? "Вход в браузере" : "Browser sign-in"}
        </h2>
        <p className="mt-4 text-sm text-white/70">
          {isRu
            ? "Нужен профиль после анкеты в боте. Вход через официальный Telegram Login."
            : "Complete bot onboarding first. Sign in with official Telegram Login."}
        </p>
        {status && <p className="mt-4 text-sm text-pink-300">{status}</p>}
        {error && <p className="mt-4 text-sm text-neon-pink">{error}</p>}
        <button
          type="button"
          className="lux-btn-primary mt-8 w-full"
          disabled={!oidcConfigured}
          onClick={onLogin}
        >
          {isRu ? "Войти через Telegram" : "Log in with Telegram"}
        </button>
        {!oidcConfigured && (
          <p className="mt-3 text-xs text-white/45">
            {isRu ? "OIDC не настроен на сервере" : "OIDC not configured on server"}
          </p>
        )}
      </motion.div>
    </section>
  );
}
