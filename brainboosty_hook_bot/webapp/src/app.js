import logoSvg from "@bb-assets/pdf/logo.svg?raw";
import { fetchBrainProfile } from "./api.js";
import { getStrings } from "./i18n/index.js";
import { getRoute, navigate, onRouteChange, startRouter } from "./router.js";
import { initTelegramWebApp, hapticLight } from "./telegram.js";
import { renderBrainMap } from "./views/brain-map.js";
import { renderHistory } from "./views/history.js";
import { renderPremium } from "./views/premium.js";
import { renderTest } from "./views/test.js";

let appCtx = null;
let profileCache = null;

function setActiveNav(routeName) {
  const nav = document.getElementById("bb-nav");
  if (!nav) return;
  nav.querySelectorAll(".bb-nav__btn").forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.route === routeName);
  });
}

function setupPremiumFab(profile) {
  document.querySelector(".bb-premium-fab")?.remove();
  if (profile.paid || !profile.tributeUrl) return;
  const t = getStrings(profile.lang);
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "bb-premium-fab";
  btn.textContent = t.premiumCta;
  btn.addEventListener("click", () => {
    hapticLight();
    navigate("premium");
  });
  document.body.appendChild(btn);
}

function setupNav(lang) {
  const nav = document.getElementById("bb-nav");
  if (!nav) return;
  const t = getStrings(lang);
  nav.hidden = false;
  nav.innerHTML = `
    <button type="button" class="bb-nav__btn" data-route="map">${t.navMap}</button>
    <button type="button" class="bb-nav__btn" data-route="history">${t.navHistory}</button>
    <button type="button" class="bb-nav__btn" data-route="test">${t.navTest}</button>
    <button type="button" class="bb-nav__btn" data-route="premium">${t.navPremium}</button>
  `;
  nav.querySelectorAll(".bb-nav__btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      hapticLight();
      navigate(btn.dataset.route || "map");
    });
  });
}

async function renderRoute(route) {
  const root = document.getElementById("bb-root");
  if (!root || !appCtx) return;

  setActiveNav(route.name);

  if (route.name === "premium") {
    if (!profileCache) profileCache = await fetchBrainProfile(appCtx);
    renderPremium(root, profileCache);
    return;
  }

  if (route.name === "test") {
    if (!profileCache) profileCache = await fetchBrainProfile(appCtx);
    await renderTest(root, appCtx, profileCache, {
      onProfile: (p) => {
        profileCache = p;
      },
    });
    return;
  }

  if (route.name === "history") {
    if (!profileCache) profileCache = await fetchBrainProfile(appCtx);
    await renderHistory(root, appCtx, profileCache);
    return;
  }

  if (!profileCache) {
    const t = getStrings(appCtx.lang);
    root.innerHTML = `
      <div class="bb-loading">
        <div class="bb-loading__pulse"></div>
        <p class="text-sm text-cyan-200/80">${t.loading}</p>
      </div>`;
    try {
      profileCache = await fetchBrainProfile(appCtx);
      if (appCtx.user?.first_name && !profileCache.userDisplayName) {
        profileCache.userDisplayName = [appCtx.user.first_name, appCtx.user.last_name]
          .filter(Boolean)
          .join(" ");
      }
    } catch (e) {
      const msg =
        e?.status === 403
          ? t.notRegistered
          : e?.status === 401
            ? t.authError
            : t.errorLoad;
      root.innerHTML = `<p class="bb-error">${msg}</p>`;
      return;
    }
  }

  if (!profileCache.hasMap && route.name === "map") {
    navigate("test");
    return;
  }

  renderBrainMap(root, profileCache);
  setupPremiumFab(profileCache);
}

export async function bootApp(ctx) {
  appCtx = ctx;
  profileCache = null;

  document.body.classList.add("bb-app--telegram");

  const root = document.getElementById("bb-root");
  if (!root) return;

  root.classList.add("bb-root--spa");

  const t0 = getStrings(ctx.lang);
  const header = document.getElementById("bb-header");
  const headerWordmark = document.getElementById("bb-header-wordmark");
  const headerTitle = document.getElementById("bb-header-title");
  const headerLogo = document.getElementById("bb-header-logo");
  if (headerWordmark) headerWordmark.textContent = t0.appBrandName;
  if (headerTitle) headerTitle.textContent = t0.appHeaderTitle;
  if (headerLogo) headerLogo.innerHTML = logoSvg;
  if (header) {
    header.hidden = false;
    header.classList.add("is-visible");
  }

  setupNav(ctx.lang);
  onRouteChange((route) => {
    renderRoute(route).catch(() => {});
  });
  startRouter();

  const route = getRoute();
  if (!window.location.hash) {
    navigate("map");
  } else {
    await renderRoute(route);
  }
}
