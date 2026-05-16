import { createRoot } from "react-dom/client";
import { useCallback, useEffect, useState } from "react";
import { fetchLandingMeta } from "../api.js";
import { getStrings } from "../i18n/index.js";
import { LangGate } from "./components/LangGate.jsx";
import { LandingPage } from "./LandingPage.jsx";

const LANDING_LANG_KEY = "bb-landing-lang";

const OIDC_ERROR_KEYS = {
  not_registered: "landingHubErrorNotRegistered",
  oidc_not_configured: "landingHubErrorNotConfigured",
  token_exchange_failed: "landingHubErrorOidc",
  invalid_state: "landingHubErrorOidc",
  state_expired: "landingHubErrorOidc",
  missing_code: "landingHubErrorOidc",
};

const DEFAULT_META = {
  botUrl: "https://t.me/brainboosty?start=webapp",
  channelUrl: "https://t.me/androgenautist",
  oidcLoginUrl: "/api/webapp/auth/oidc/start",
  oidcConfigured: false,
};

function getStoredLandingLang() {
  try {
    const v = localStorage.getItem(LANDING_LANG_KEY);
    if (v === "en" || v === "ru") return v;
  } catch {
    /* private mode */
  }
  return null;
}

function parseHubLoginError() {
  const path = (window.location.pathname || "").replace(/\/+$/, "") || "/";
  if (path === "/hub-login") {
    return new URLSearchParams(window.location.search).get("error");
  }
  const hash = (window.location.hash || "").replace(/^#/, "");
  if (!hash.startsWith("hub-login")) return null;
  const q = hash.includes("?") ? hash.slice(hash.indexOf("?") + 1) : "";
  return new URLSearchParams(q).get("error");
}

function shouldScrollToHubLogin() {
  const path = (window.location.pathname || "").replace(/\/+$/, "") || "/";
  return path === "/hub-login";
}

function hubLoginErrorMessage(t, code) {
  const key = OIDC_ERROR_KEYS[code];
  if (key && t[key]) return t[key];
  return t.landingHubErrorOidc;
}

function LandingApp() {
  const [lang, setLang] = useState(() => getStoredLandingLang());
  const [meta, setMeta] = useState(DEFAULT_META);
  const [hubError, setHubError] = useState("");
  const [hubStatus, setHubStatus] = useState("");

  useEffect(() => {
    if (!lang) return;
    document.documentElement.lang = lang;
    document.body.classList.add("bb-landing-active");
    return () => document.body.classList.remove("bb-landing-active");
  }, [lang]);

  useEffect(() => {
    if (!lang) return;
    fetchLandingMeta()
      .then((m) => setMeta((prev) => ({ ...prev, ...m })))
      .catch(() => {});
  }, [lang]);

  useEffect(() => {
    if (!lang) return;
    const t = getStrings(lang);
    const code = parseHubLoginError();
    if (code) {
      setHubError(hubLoginErrorMessage(t, code));
      if (shouldScrollToHubLogin() && window.location.search) {
        history.replaceState(null, "", "/hub-login");
      }
      requestAnimationFrame(() => {
        document.getElementById("hub-login")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    } else if (shouldScrollToHubLogin()) {
      requestAnimationFrame(() => {
        document.getElementById("hub-login")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, [lang]);

  const onChooseLang = useCallback((next) => {
    try {
      localStorage.setItem(LANDING_LANG_KEY, next);
    } catch {
      /* ignore */
    }
    setLang(next);
  }, []);

  const onLogin = useCallback(() => {
    const t = getStrings(lang || "ru");
    document.getElementById("hub-login")?.scrollIntoView({ behavior: "smooth", block: "start" });
    if (!meta.oidcConfigured) {
      setHubError(t.landingHubErrorNotConfigured);
      return;
    }
    setHubError("");
    setHubStatus(t.landingHubStartLogin);
    window.location.href = meta.oidcLoginUrl || "/api/webapp/auth/oidc/start";
  }, [lang, meta]);

  const onCtaBot = useCallback(() => {
    window.open(meta.botUrl, "_blank", "noopener,noreferrer");
  }, [meta.botUrl]);

  const onCtaLogin = useCallback(() => {
    document.getElementById("hub-login")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  if (!lang) {
    return <LangGate onChoose={onChooseLang} />;
  }

  return (
    <LandingPage
      lang={lang}
      meta={meta}
      hubStatus={hubStatus}
      hubError={hubError}
      onLogin={onLogin}
      onCtaBot={onCtaBot}
      onCtaLogin={onCtaLogin}
    />
  );
}

/** Монтирует React-лендинг в #bb-root */
export function mountReactLanding() {
  const header = document.getElementById("bb-header");
  const nav = document.getElementById("bb-nav");
  if (header) header.hidden = true;
  if (nav) nav.hidden = true;

  const rootEl = document.getElementById("bb-root");
  if (!rootEl) return;

  rootEl.className = "bb-root bb-root--landing";
  rootEl.innerHTML = "";

  const root = createRoot(rootEl);
  root.render(<LandingApp />);
}
