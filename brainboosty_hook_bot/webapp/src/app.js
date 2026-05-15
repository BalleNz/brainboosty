import { fetchBrainProfile } from "./api.js";
import { getStrings } from "./i18n/index.js";
import { getRoute, navigate, onRouteChange, startRouter } from "./router.js";
import { initTelegramWebApp, hapticLight } from "./telegram.js";
import { renderBrainMap } from "./views/brain-map.js";
import { renderExerciseDetail } from "./views/exercise-detail.js";
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

function applyAppLang(lang) {
  if (!appCtx) return;
  const next = lang === "en" ? "en" : "ru";
  if (appCtx.lang === next) return;
  appCtx.lang = next;
  document.documentElement.lang = next;
  const t = getStrings(next);
  const wordmark = document.getElementById("bb-header-wordmark");
  if (wordmark) wordmark.textContent = t.appBrandName;
  setupNav(next);
}

function syncLangFromProfile(profile) {
  if (profile?.lang) applyAppLang(profile.lang);
}

function setupPremiumFab(profile) {
  document.querySelector(".bb-premium-fab")?.remove();
  if (profile.paid || !profile.tributeUrl) return;
  const t = getStrings(appCtx?.lang || profile.lang);
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

  const header = document.getElementById("bb-header");
  const nav = document.getElementById("bb-nav");
  const isExercise = route.name === "exercise";
  document.body.classList.toggle("bb-route-exercise", isExercise);
  if (header) header.hidden = isExercise;
  if (nav) nav.hidden = isExercise;

  if (!isExercise) {
    setActiveNav(route.name);
  }

  if (route.name !== "map") {
    document.querySelector(".bb-premium-fab")?.remove();
  }

  if (route.name === "premium") {
    if (!profileCache) {
      profileCache = await fetchBrainProfile(appCtx);
      syncLangFromProfile(profileCache);
    }
    renderPremium(root, profileCache);
    return;
  }

  if (route.name === "test") {
    if (!profileCache) {
      profileCache = await fetchBrainProfile(appCtx);
      syncLangFromProfile(profileCache);
    }
    await renderTest(root, appCtx, profileCache, {
      onProfile: (p) => {
        profileCache = p;
        syncLangFromProfile(p);
      },
    });
    return;
  }

  if (route.name === "history") {
    if (!profileCache) {
      profileCache = await fetchBrainProfile(appCtx);
      syncLangFromProfile(profileCache);
    }
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
      syncLangFromProfile(profileCache);
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

  if (route.name === "exercise") {
    const id = parseInt(route.params.get("id") || "0", 10);
    await renderExerciseDetail(root, appCtx, profileCache, id);
    return;
  }

  if (!profileCache.hasMap && route.name === "map") {
    navigate("test");
    return;
  }

  renderBrainMap(root, profileCache, route);
  setupPremiumFab(profileCache);
}

export async function bootApp(ctx) {
  appCtx = { ...ctx, lang: "ru" };
  profileCache = null;

  document.body.classList.add("bb-app--telegram");

  const root = document.getElementById("bb-root");
  if (!root) return;

  root.classList.add("bb-root--spa");

  const t0 = getStrings(appCtx.lang);
  const header = document.getElementById("bb-header");
  const headerWordmark = document.getElementById("bb-header-wordmark");
  if (headerWordmark) headerWordmark.textContent = t0.appBrandName;
  if (header) {
    header.hidden = false;
    header.classList.add("is-visible");
  }

  setupNav(appCtx.lang);
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
