import "./styles/cyber-neon.css";
import "./styles/exercise-lux.css";
import { SITE_SESSION_STORAGE_KEY, SITE_USER_STORAGE_KEY } from "./api.js";
import { bootApp } from "./app.js";
import { bootLanding } from "./views/landing.js";
import { initTelegramWebApp } from "./telegram.js";

function isLikelyTelegramWebAppContext() {
  try {
    const ua = navigator.userAgent || "";
    if (/Telegram/i.test(ua)) return true;
    const q = `${window.location.hash || ""}${window.location.search || ""}`;
    if (/tgWebAppPlatform|tgWebAppData|tgWebAppVersion/i.test(q)) return true;
  } catch {
    /* ignore */
  }
  return false;
}

function loadTelegramWebAppScript() {
  if (window.Telegram?.WebApp) return Promise.resolve();
  return new Promise((resolve) => {
    const s = document.createElement("script");
    s.src = "https://telegram.org/js/telegram-web-app.js";
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => resolve();
    document.head.appendChild(s);
  });
}

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

async function bootstrap() {
  if (isLikelyTelegramWebAppContext()) {
    await loadTelegramWebAppScript();
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
}

bootstrap().catch(() => {});
