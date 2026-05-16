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

  lockMiniAppSurfaceDark();
  tg.onEvent("themeChanged", lockMiniAppSurfaceDark);

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

/** Всегда тёмный cyber-neon: не тянем светлый bg_color/text_color из Telegram themeParams. */
function lockMiniAppSurfaceDark() {
  const root = document.documentElement;
  root.style.setProperty("--bb-tg-bg", "#0a0a0a");
  root.style.setProperty("--bb-tg-text", "#f1f5f9");
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
