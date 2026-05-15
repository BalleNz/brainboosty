/** Telegram Web App bootstrap — theme sync + MainButton helpers. */

export function initTelegramWebApp() {
  const tg = window.Telegram?.WebApp;
  if (!tg) {
    return { tg: null, initData: "", user: null, lang: "ru" };
  }

  tg.ready();
  tg.expand();
  tg.enableClosingConfirmation();
  if (tg.disableVerticalSwipes) {
    tg.disableVerticalSwipes();
  }

  applyThemeParams(tg.themeParams);
  tg.onEvent("themeChanged", () => applyThemeParams(tg.themeParams));

  const user = tg.initDataUnsafe?.user ?? null;
  const lang =
    user?.language_code === "en"
      ? "en"
      : user?.language_code?.startsWith("en")
        ? "en"
        : "ru";

  if (tg.setHeaderColor) {
    tg.setHeaderColor("#010108");
  }
  if (tg.setBackgroundColor) {
    tg.setBackgroundColor("#010108");
  }

  return { tg, initData: tg.initData || "", user, lang };
}

function applyThemeParams(params = {}) {
  const root = document.documentElement;
  if (params.bg_color) {
    root.style.setProperty("--bb-tg-bg", params.bg_color);
  }
  if (params.text_color) {
    root.style.setProperty("--bb-tg-text", params.text_color);
  }
}

export function openTributeLink(url) {
  const tg = window.Telegram?.WebApp;
  if (tg?.openTelegramLink && url.includes("t.me/")) {
    tg.openTelegramLink(url);
    return;
  }
  if (tg?.openLink) {
    tg.openLink(url);
    return;
  }
  window.open(url, "_blank", "noopener,noreferrer");
}

export function hapticLight() {
  window.Telegram?.WebApp?.HapticFeedback?.impactOccurred?.("light");
}
