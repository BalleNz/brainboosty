import brainImg from "@bb-assets/full-glowing-brain.png";
import logoSvg from "@bb-assets/pdf/logo.svg?raw";
import { fetchLandingMeta } from "../api.js";
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
    botUrl: "https://t.me/BRAINBOOSTY?start=site",
    webappEntryUrl: "https://t.me/BRAINBOOSTY?start=webapp",
    channelUrl: "https://t.me/androgenautist",
    hasAuthorPhoto: false,
    hasChannelAvatar: false,
  };
  try {
    meta = { ...meta, ...(await fetchLandingMeta()) };
  } catch {
    /* defaults */
  }

  const photoSrc = "/api/webapp/landing/photo";
  const channelAvatarSrc = "/api/webapp/landing/channel-avatar";
  const channelNavInner = meta.hasChannelAvatar
    ? `<img class="bb-landing-nav__channel-img" src="${channelAvatarSrc}" alt="" width="38" height="38" loading="lazy" />`
    : `<span class="bb-landing-nav__channel-fallback" aria-hidden="true">TG</span>`;

  const features = t.landingFeatures.map((f) => `<li>${esc(f)}</li>`).join("");

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  root.innerHTML = `
    <div class="bb-landing">
      <nav class="bb-landing-nav glass bb-landing-reveal bb-landing-reveal--fade-only" aria-label="Menu">
        <a href="#top" class="bb-landing-nav__logo">${logoSvg}</a>
        <div class="bb-landing-nav__tail">
          <div class="bb-landing-nav__links">
            <a href="#about">${esc(t.landingNavAbout)}</a>
            <a href="#project">${esc(t.landingNavProject)}</a>
            <a href="#start" class="bb-landing-nav__cta">${esc(t.landingNavCta)}</a>
          </div>
          <div class="bb-landing-nav__extras">
            <a class="bb-landing-nav__channel" href="${esc(meta.channelUrl)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(t.landingChannelAria)}">
              ${channelNavInner}
            </a>
            <a class="bb-landing-nav__login" href="${esc(meta.webappEntryUrl)}" rel="noopener noreferrer">${esc(t.landingLoginTelegram)}</a>
          </div>
        </div>
      </nav>

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
          <a class="bb-landing-cta-secondary" href="${esc(meta.webappEntryUrl)}" rel="noopener noreferrer">
            ${esc(t.landingLoginTelegram)}
          </a>
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

  root.querySelectorAll(".bb-landing-nav__channel-img").forEach((img) => {
    img.addEventListener("error", () => {
      const wrap = img.closest(".bb-landing-nav__channel");
      if (!wrap) return;
      wrap.innerHTML = `<span class="bb-landing-nav__channel-fallback" aria-hidden="true">TG</span>`;
    });
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

  const onPageHide = () => {
    stopReveal();
    stopHero();
    window.removeEventListener("pagehide", onPageHide);
  };
  window.addEventListener("pagehide", onPageHide);
}
