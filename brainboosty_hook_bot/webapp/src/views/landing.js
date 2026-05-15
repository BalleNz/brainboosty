import brainImg from "@bb-assets/full-glowing-brain.png";
import logoSvg from "@bb-assets/pdf/logo.svg?raw";
import { fetchLandingMeta } from "../api.js";
import { getStrings } from "../i18n/index.js";

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function detectLang() {
  const nav = (navigator.language || "ru").toLowerCase();
  return nav.startsWith("en") ? "en" : "ru";
}

export async function bootLanding() {
  const lang = detectLang();
  const t = getStrings(lang);
  document.documentElement.lang = lang;

  const header = document.getElementById("bb-header");
  const nav = document.getElementById("bb-nav");
  if (header) header.hidden = true;
  if (nav) nav.hidden = true;

  const root = document.getElementById("bb-root");
  if (!root) return;

  root.className = "bb-root bb-root--landing";
  root.innerHTML = `
    <div class="bb-loading">
      <div class="bb-loading__pulse"></div>
    </div>`;

  let meta = {
    botUrl: "https://t.me/BRAINBOOSTY?start=site",
    channelUrl: "https://t.me/androgenautist",
    hasAuthorPhoto: false,
  };
  try {
    meta = await fetchLandingMeta();
  } catch {
    /* defaults */
  }

  const photoSrc = "/api/webapp/landing/photo";
  const features = t.landingFeatures.map((f) => `<li>${esc(f)}</li>`).join("");

  root.innerHTML = `
    <div class="bb-landing">
      <nav class="bb-landing-nav glass" aria-label="Menu">
        <a href="#top" class="bb-landing-nav__logo">${logoSvg}</a>
        <div class="bb-landing-nav__links">
          <a href="#about">${esc(t.landingNavAbout)}</a>
          <a href="#project">${esc(t.landingNavProject)}</a>
          <a href="#start" class="bb-landing-nav__cta">${esc(t.landingNavCta)}</a>
        </div>
      </nav>

      <header id="top" class="bb-landing-hero">
        <div class="bb-landing-hero__glow" aria-hidden="true"></div>
        <img class="bb-landing-hero__brain" src="${brainImg}" alt="" width="280" height="280" />
        <p class="bb-landing-kicker">${esc(t.landingKicker)}</p>
        <h1 class="bb-landing-title neon-zone-title">${esc(t.landingTitle)}</h1>
        <p class="bb-landing-tagline">${esc(t.landingTagline)}</p>
        <a class="bb-landing-cta-primary" href="${esc(meta.botUrl)}" rel="noopener noreferrer">
          ${esc(t.landingCta)}
        </a>
        <p class="bb-landing-cta-sub">${esc(t.landingCtaSub)}</p>
      </header>

      <section id="about" class="bb-landing-section">
        <h2 class="bb-landing-section__title">${esc(t.landingAboutTitle)}</h2>
        <article class="bb-landing-about glass">
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

      <section id="project" class="bb-landing-section">
        <h2 class="bb-landing-section__title">${esc(t.landingProjectTitle)}</h2>
        <ul class="bb-landing-features">${features}</ul>
        <p class="bb-landing-disclaimer">${esc(t.footer)}</p>
      </section>

      <section id="start" class="bb-landing-section bb-landing-final">
        <div class="glass bb-landing-final__card">
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
}
