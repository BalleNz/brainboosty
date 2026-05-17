import "./styles/tailwind.css";
import "./styles/cyber-neon.css";
import "./styles/lux-pink-global.css";
import "./styles/exercise-lux.css";
import { SITE_SESSION_STORAGE_KEY, SITE_USER_STORAGE_KEY } from "./api.js";
import { bootApp } from "./app.js";
import { mountReactLanding } from "./landing/mountLanding.jsx";
import { initTelegramWebApp } from "./telegram.js";
import { isAppDeepLinkWithoutSession, migrateLegacyUrl } from "./router.js";

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

async function consumeOidcHandoffFromQuery() {
  const params = new URLSearchParams(window.location.search);
  const code = (params.get("oidc_handoff") || params.get("code") || "").trim();
  if (!code) return false;

  try {
    const qs = new URLSearchParams({ oidc_handoff: code });
    const res = await fetch(`/api/webapp/auth/oidc/handoff?${qs}`, { cache: "no-store" });
    if (!res.ok) {
      window.location.replace("/hub-login?error=handoff_failed");
      return true;
    }
    const data = await res.json();
    const token = data?.accessToken?.trim();
    if (!token) {
      window.location.replace("/hub-login?error=handoff_failed");
      return true;
    }

    const lang = data.lang === "en" ? "en" : "ru";
    localStorage.setItem(SITE_SESSION_STORAGE_KEY, token);
    localStorage.setItem(
      SITE_USER_STORAGE_KEY,
      JSON.stringify({
        first_name: data.user?.first_name ?? "",
        last_name: data.user?.last_name ?? "",
        language_code: data.user?.language_code === "en" ? "en" : lang,
      }),
    );
    window.location.replace("/");
    return true;
  } catch {
    window.location.replace("/hub-login?error=handoff_failed");
    return true;
  }
}

function consumeOidcAuthCallback() {
  const raw = (window.location.hash || "").replace(/^#/, "");
  if (!raw.startsWith("auth/callback")) return false;

  const q = raw.includes("?") ? raw.slice(raw.indexOf("?") + 1) : "";
  const params = new URLSearchParams(q);
  const token = params.get("access_token")?.trim();
  if (!token) return false;

  const lang = params.get("lang") === "en" ? "en" : "ru";
  try {
    localStorage.setItem(SITE_SESSION_STORAGE_KEY, token);
    localStorage.setItem(
      SITE_USER_STORAGE_KEY,
      JSON.stringify({
        first_name: params.get("first_name") || "",
        last_name: "",
        language_code: lang,
      }),
    );
  } catch {
    return false;
  }

  window.location.replace("/");
  return true;
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
  document.body.classList.add("bb-theme-lux");
  migrateLegacyUrl();

  if (await consumeOidcHandoffFromQuery()) {
    return;
  }
  if (consumeOidcAuthCallback()) {
    return;
  }

  if (isAppDeepLinkWithoutSession()) {
    window.location.replace("/");
    return;
  }

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
      mountReactLanding();
    }
  }
}

bootstrap().catch(() => {});
