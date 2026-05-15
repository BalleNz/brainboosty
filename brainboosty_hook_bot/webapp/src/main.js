import "./styles/cyber-neon.css";
import "./styles/exercise-lux.css";
import { SITE_SESSION_STORAGE_KEY, SITE_USER_STORAGE_KEY } from "./api.js";
import { bootApp } from "./app.js";
import { bootLanding } from "./views/landing.js";
import { initTelegramWebApp } from "./telegram.js";

function isTelegramWebApp() {
  const tg = window.Telegram?.WebApp;
  if (!tg) return false;
  const init = (tg.initData || "").trim();
  return init.length > 0;
}

function getSiteToken() {
  try {
    return localStorage.getItem(SITE_SESSION_STORAGE_KEY)?.trim() || "";
  } catch {
    return "";
  }
}

function readSiteUserHint() {
  try {
    const raw = localStorage.getItem(SITE_USER_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

const { initData, user, lang } = initTelegramWebApp();

if (isTelegramWebApp()) {
  bootApp({ initData, user, lang, siteToken: "" });
} else {
  const siteToken = getSiteToken();
  if (siteToken) {
    const hint = readSiteUserHint();
    const siteLang =
      hint?.language_code === "en" || hint?.language_code?.startsWith?.("en")
        ? "en"
        : lang === "en"
          ? "en"
          : "ru";
    bootApp({
      initData: "",
      user: hint
        ? {
            first_name: hint.first_name,
            last_name: hint.last_name,
            language_code: hint.language_code,
          }
        : null,
      lang: siteLang,
      siteToken,
    });
  } else {
    bootLanding();
  }
}
