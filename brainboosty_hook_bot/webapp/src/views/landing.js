import brainImg from "@bb-assets/full-glowing-brain.png";
import {
  fetchLandingMeta,
  fetchSiteLoginLink,
  fetchSiteLoginPoll,
  SITE_SESSION_STORAGE_KEY,
  SITE_USER_STORAGE_KEY,
  formatApiError,
  SITE_LOGIN_POLL_STATE_KEY,
} from "../api.js";
import { initLandingHeroMotion } from "../lib/landing-hero-motion.js";
import { initLandingReveal } from "../lib/landing-reveal.js";
import { getStrings } from "../i18n/index.js";

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

const LANDING_LANG_KEY = "bb-landing-lang";
const SITE_POLL_MAX_MS = 16 * 60 * 1000;

function readSitePollState() {
  try {
    const raw = sessionStorage.getItem(SITE_LOGIN_POLL_STATE_KEY);
    if (!raw) return null;
    const o = JSON.parse(raw);
    if (!o?.loginToken || typeof o.loginToken !== "string") return null;
    if (typeof o.startedAt !== "number") return null;
    if (o.lang !== "en" && o.lang !== "ru") return null;
    return o;
  } catch {
    return null;
  }
}

function writeSitePollState(state) {
  try {
    sessionStorage.setItem(SITE_LOGIN_POLL_STATE_KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
}

function clearSitePollState() {
  try {
    sessionStorage.removeItem(SITE_LOGIN_POLL_STATE_KEY);
  } catch {
    /* ignore */
  }
}

function getStoredLandingLang() {
  try {
    const v = localStorage.getItem(LANDING_LANG_KEY);
    if (v === "en" || v === "ru") return v;
  } catch {
    /* private mode */
  }
  return null;
}

function showLanguageGate(onChoose) {
  document.body.classList.add("bb-lang-gate-open");

  const gate = document.createElement("div");
  gate.className = "bb-lang-gate";
  gate.setAttribute("role", "dialog");
  gate.setAttribute("aria-modal", "true");
  gate.setAttribute("aria-labelledby", "bb-lang-gate-title");

  gate.innerHTML = `
    <div class="bb-lang-gate__backdrop" aria-hidden="true"></div>
    <div class="bb-lang-gate__dialog glass">
      <p id="bb-lang-gate-title" class="bb-lang-gate__title">BrainBoosty</p>
      <p class="bb-lang-gate__sub">Выберите язык · Choose language</p>
      <div class="bb-lang-gate__choices">
        <button type="button" class="bb-lang-gate__btn" data-lang="ru">
          <span class="bb-lang-gate__flag" aria-hidden="true">🇷🇺</span>
          <span>Русский</span>
        </button>
        <button type="button" class="bb-lang-gate__btn" data-lang="en">
          <span class="bb-lang-gate__flag" aria-hidden="true">🇬🇧</span>
          <span>English</span>
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(gate);

  const finish = (lang) => {
    try {
      localStorage.setItem(LANDING_LANG_KEY, lang);
    } catch {
      /* ignore */
    }
    document.body.classList.remove("bb-lang-gate-open");
    gate.remove();
    onChoose(lang);
  };

  gate.querySelectorAll("[data-lang]").forEach((btn) => {
    btn.addEventListener("click", () => finish(btn.getAttribute("data-lang") || "ru"));
  });

  requestAnimationFrame(() => {
    gate.querySelector(".bb-lang-gate__btn")?.focus();
  });
}

export async function bootLanding() {
  const header = document.getElementById("bb-header");
  const nav = document.getElementById("bb-nav");
  if (header) header.hidden = true;
  if (nav) nav.hidden = true;

  const root = document.getElementById("bb-root");
  if (!root) return;

  const saved = getStoredLandingLang();
  if (!saved) {
    root.className = "bb-root";
    root.innerHTML = "";
    showLanguageGate((lang) => {
      runLanding(lang).catch(() => {});
    });
    return;
  }

  await runLanding(saved);
}

async function runLanding(lang) {
  const t = getStrings(lang);
  document.documentElement.lang = lang;

  const root = document.getElementById("bb-root");
  if (!root) return;

  root.className = "bb-root bb-root--landing";
  root.innerHTML = `
    <div class="bb-loading">
      <div class="bb-loading__pulse"></div>
    </div>`;

  let meta = {
    botUrl: "https://t.me/brainboosty?start=site",
    webappEntryUrl: "https://t.me/brainboosty?start=webapp",
    channelUrl: "https://t.me/androgenautist",
    hasAuthorPhoto: false,
    hasChannelAvatar: false,
    neuralMapHubUrl: "/#hub-login",
    hubHostDisplay: "neuralmap.brainboosty.app",
  };
  try {
    meta = { ...meta, ...(await fetchLandingMeta()) };
  } catch {
    /* defaults */
  }

  const photoSrc = "/api/webapp/landing/photo";

  const features = t.landingFeatures.map((f) => `<li>${esc(f)}</li>`).join("");

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  root.innerHTML = `
    <div class="bb-landing">
      <header id="top" class="bb-landing-hero">
        <div class="bb-landing-hero__visual-anchor">
          <div class="bb-landing-hero__glow" aria-hidden="true" data-parallax-glow></div>
          <div class="bb-landing-hero__brain-layer" data-parallax-brain>
            <img class="bb-landing-hero__brain" src="${brainImg}" alt="" width="280" height="280" decoding="async" />
          </div>
        </div>
        <div class="bb-landing-hero__copy bb-landing-reveal">
        <p class="bb-landing-kicker">${esc(t.landingKicker)}</p>
        <h1 class="bb-landing-title neon-zone-title">${esc(t.landingTitle)}</h1>
        <p class="bb-landing-tagline">${esc(t.landingTagline)}</p>
        <div class="bb-landing-hero__ctas">
          <a class="bb-landing-cta-primary" href="${esc(meta.botUrl)}" rel="noopener noreferrer">
            ${esc(t.landingCta)}
          </a>
          <button type="button" class="bb-landing-cta-secondary" data-start-site-login>
            ${esc(t.landingLoginTelegram)}
          </button>
        </div>
        <p class="bb-landing-cta-sub">${esc(t.landingCtaSub)}</p>
        </div>
      </header>

      <section id="about" class="bb-landing-section bb-landing-reveal">
        <h2 class="bb-landing-section__title">${esc(t.landingAboutTitle)}</h2>
        <article class="bb-landing-about glass bb-landing-hover-rise">
          <div class="bb-landing-about__photo-wrap">
            <img class="bb-landing-about__photo" src="${photoSrc}" alt="" width="320" height="320" loading="lazy" data-fallback-src="${brainImg}" />
            <div class="bb-landing-about__ring" aria-hidden="true"></div>
          </div>
          <div class="bb-landing-about__text">
            ${t.landingAboutParagraphs.map((p) => `<p>${esc(p)}</p>`).join("")}
            <a class="bb-landing-link" href="${esc(meta.channelUrl)}" target="_blank" rel="noopener noreferrer">
              ${esc(t.landingChannelLink)}
            </a>
          </div>
        </article>
      </section>

      <section id="project" class="bb-landing-section bb-landing-reveal">
        <h2 class="bb-landing-section__title">${esc(t.landingProjectTitle)}</h2>
        <ul class="bb-landing-features">${features}</ul>
        <p class="bb-landing-disclaimer">${esc(t.footer)}</p>
      </section>

      <section id="hub-login" class="bb-landing-section bb-landing-hub bb-landing-reveal">
        <p class="bb-landing-hub__domain" translate="no">${esc(meta.hubHostDisplay)}</p>
        <h2 class="bb-landing-section__title bb-landing-hub__title">${esc(t.landingHubTitle)}</h2>
        <p class="bb-landing-hub__lead">${esc(t.landingHubLead)}</p>
        <p class="bb-landing-hub__hint">${esc(t.landingHubHint)}</p>
        <div class="bb-landing-hub__card glass bb-landing-hover-rise">
          <button type="button" class="bb-landing-hub__start" data-start-site-login>${esc(t.landingHubStartLogin)}</button>
          <p class="bb-landing-hub__status" hidden></p>
        </div>
      </section>

      <section id="start" class="bb-landing-section bb-landing-final bb-landing-reveal">
        <div class="glass bb-landing-final__card bb-landing-hover-rise">
          <h2 class="bb-landing-final__title">${esc(t.landingFinalTitle)}</h2>
          <p class="bb-landing-final__sub">${esc(t.landingFinalSub)}</p>
          <a class="bb-landing-cta-primary bb-landing-cta-primary--lg" href="${esc(meta.botUrl)}" rel="noopener noreferrer">
            ${esc(t.landingCta)}
          </a>
        </div>
      </section>

      <footer class="bb-landing-footer">
        <span>BrainBoosty · Neural Map</span>
      </footer>
    </div>
  `;

  root.querySelectorAll(".bb-landing-about__photo").forEach((img) => {
    const fb = img.getAttribute("data-fallback-src");
    if (fb) {
      img.addEventListener("error", () => {
        img.removeAttribute("data-fallback-src");
        img.src = fb;
      });
    }
  });

  root.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href")?.slice(1);
      if (!id) return;
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  const landingEl = root.querySelector(".bb-landing");
  const stopReveal = initLandingReveal(landingEl || root, { reducedMotion });
  const heroEl = root.querySelector(".bb-landing-hero");
  const stopHero = heroEl ? initLandingHeroMotion(heroEl) : () => {};

  let sitePollTimer = null;
  let telegramLoginPopup = null;

  const TG_LOGIN_WIN = "bb_tg_site_login";
  const TG_LOGIN_FEATURES =
    "width=440,height=720,left=100,top=80,scrollbars=yes,resizable=yes,toolbar=no,menubar=no,location=no,status=no,directories=no";

  const closeTelegramLoginPopup = () => {
    try {
      if (telegramLoginPopup && !telegramLoginPopup.closed) {
        telegramLoginPopup.close();
      }
    } catch {
      /* ignore */
    }
    telegramLoginPopup = null;
  };

  const clearSitePoll = () => {
    if (sitePollTimer != null) {
      clearInterval(sitePollTimer);
      sitePollTimer = null;
    }
  };

  const onPageHide = () => {
    stopReveal();
    stopHero();
    window.removeEventListener("pagehide", onPageHide);
  };
  window.addEventListener("pagehide", onPageHide);

  const startBtns = root.querySelectorAll("[data-start-site-login]");
  const statusEl = root.querySelector(".bb-landing-hub__status");

  const setStartBtnsDisabled = (disabled) => {
    startBtns.forEach((b) => {
      b.disabled = disabled;
    });
  };

  const setHubStatusSimple = (text) => {
    if (!statusEl) return;
    statusEl.replaceChildren();
    if (!text) return;
    const p = document.createElement("p");
    p.className = "bb-landing-hub__status-line";
    p.textContent = text;
    statusEl.appendChild(p);
  };

  const showHubStatusPopupBlockedWithButton = (telegramLink, tloc) => {
    if (!statusEl) return;
    statusEl.hidden = false;
    statusEl.replaceChildren();
    const p = document.createElement("p");
    p.className = "bb-landing-hub__status-line";
    p.textContent = tloc.landingHubPopupBlocked;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "bb-landing-hub__manual-popup";
    btn.textContent = tloc.landingHubTryOpenWindow;
    btn.addEventListener("click", () => {
      const w = window.open(telegramLink, TG_LOGIN_WIN, TG_LOGIN_FEATURES);
      if (w) {
        telegramLoginPopup = w;
        setHubStatusSimple(tloc.landingHubPolling);
      }
    });
    statusEl.appendChild(p);
    statusEl.appendChild(btn);
  };

  const beginSiteLoginPoll = (loginToken, tloc) => {
    clearSitePoll();
    const tick = async () => {
      try {
        const r = await fetchSiteLoginPoll(loginToken);
        if (r.status === "ready") {
          clearSitePoll();
          clearSitePollState();
          closeTelegramLoginPopup();
          localStorage.setItem(SITE_SESSION_STORAGE_KEY, r.accessToken);
          localStorage.setItem(
            SITE_USER_STORAGE_KEY,
            JSON.stringify({
              first_name: r.user?.first_name ?? "",
              last_name: r.user?.last_name ?? "",
              language_code: r.lang === "en" ? "en" : "ru",
            }),
          );
          window.location.replace("/#map");
          window.location.reload();
          return;
        }
        if (r.status === "expired" || r.status === "not_found") {
          clearSitePoll();
          clearSitePollState();
          closeTelegramLoginPopup();
          setStartBtnsDisabled(false);
          setHubStatusSimple(tloc.landingHubExpired);
        }
      } catch {
        /* продолжаем опрос до истечения */
      }
    };
    sitePollTimer = setInterval(tick, 2000);
    tick();
  };

  startBtns.forEach((startBtn) => {
    startBtn.addEventListener("click", async () => {
      const tloc = getStrings(lang);
      clearSitePoll();
      clearSitePollState();
      document.getElementById("hub-login")?.scrollIntoView({ behavior: "smooth", block: "start" });
      setStartBtnsDisabled(true);
      if (statusEl) {
        statusEl.hidden = false;
        setHubStatusSimple(tloc.landingHubPrepare);
      }

      closeTelegramLoginPopup();
      const popup = window.open("about:blank", TG_LOGIN_WIN, TG_LOGIN_FEATURES);
      telegramLoginPopup = popup;

      try {
        const linkData = await fetchSiteLoginLink();
        const loginToken = linkData?.loginToken;
        const telegramLink = linkData?.telegramLink;
        if (!loginToken || !telegramLink) {
          throw new Error(tloc.errorLoad);
        }
        writeSitePollState({ loginToken, lang, startedAt: Date.now() });

        if (telegramLoginPopup && !telegramLoginPopup.closed) {
          try {
            telegramLoginPopup.location.href = telegramLink;
          } catch {
            /* ignore */
          }
          try {
            telegramLoginPopup.focus();
          } catch {
            /* ignore */
          }
          setHubStatusSimple(tloc.landingHubPolling);
          beginSiteLoginPoll(loginToken, tloc);
          return;
        }

        closeTelegramLoginPopup();
        showHubStatusPopupBlockedWithButton(telegramLink, tloc);
        beginSiteLoginPoll(loginToken, tloc);
        setStartBtnsDisabled(false);
      } catch (e) {
        clearSitePoll();
        clearSitePollState();
        closeTelegramLoginPopup();
        setStartBtnsDisabled(false);
        if (statusEl) {
          statusEl.hidden = false;
          setHubStatusSimple(formatApiError(e, tloc.errorLoad));
        }
      }
    });
  });

  const pending = readSitePollState();
  if (pending && pending.lang === lang && Date.now() - pending.startedAt < SITE_POLL_MAX_MS) {
    document.getElementById("hub-login")?.scrollIntoView({ behavior: "smooth", block: "start" });
    setStartBtnsDisabled(true);
    if (statusEl) {
      statusEl.hidden = false;
      setHubStatusSimple(t.landingHubPolling);
    }
    beginSiteLoginPoll(pending.loginToken, t);
  } else if (pending) {
    clearSitePollState();
  }
}
