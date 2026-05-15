import "./styles/cyber-neon.css";
import "./styles/exercise-lux.css";
import { bootApp } from "./app.js";
import { bootLanding } from "./views/landing.js";
import { initTelegramWebApp } from "./telegram.js";

function isTelegramWebApp() {
  const tg = window.Telegram?.WebApp;
  if (!tg) return false;
  const init = (tg.initData || "").trim();
  return init.length > 0;
}

const { initData, user, lang } = initTelegramWebApp();

if (isTelegramWebApp()) {
  bootApp({ initData, user, lang });
} else {
  bootLanding();
}
