import { openBrainZoneDrawer } from "../components/brain-zone-drawer.js";
import { coverSectionHtml } from "../components/cover.js";
import { regionCardHtml } from "../components/region-card.js";
import { REGION_KEYS } from "../data/regions.js";
import { getStrings } from "../i18n/index.js";
import { hapticLight } from "../telegram.js";

/**
 * @param {HTMLElement} root
 * @param {import('../api.js').normalizeProfile extends (x:any)=>infer P ? P : never} profile
 * @param {{ params: URLSearchParams }} [route]
 */
export function renderBrainMap(root, profile, route) {
  const t = getStrings(profile.lang);
  const displayName = profile.userDisplayName || (profile.lang === "en" ? "Guest" : "Гость");

  const sections = [
    coverSectionHtml(t, {
      displayName,
      neuroScore: profile.neuroScore,
      connectivity: profile.connectivity,
    }),
    ...REGION_KEYS.map((key) =>
      regionCardHtml(t, key, {
        main: profile.scores[key],
        bullets: profile.regions[key]?.bullets ?? [],
        submetrics: profile.regions[key]?.submetrics ?? [],
      }),
    ),
  ];

  root.innerHTML = sections.join("\n");
  setupRevealAnimations(root);
  animateNeuroScore(root);
  animateBars(root);
  setupRegionIllustrationOpeners(root, profile, route);
}

/**
 * Клик по иллюстрации отдела в карточке зоны открывает тот же drawer, что и раньше с «карты».
 * @param {HTMLElement} root
 * @param {import('../api.js').normalizeProfile extends (x:any)=>infer P ? P : never} profile
 * @param {{ params: URLSearchParams } | undefined} route
 */
function setupRegionIllustrationOpeners(root, profile, route) {
  const openers = root.querySelectorAll("[data-open-zone]");
  if (!openers.length) return;

  const setHot = (key) => {
    root.querySelectorAll(".bb-region").forEach((sec) => {
      const id = sec.dataset.region;
      sec.classList.toggle("is-zone-hot", Boolean(key) && id === key);
    });
  };

  const openZone = (key) => {
    if (!key || !REGION_KEYS.includes(key)) return;
    setHot(key);
    openBrainZoneDrawer(profile, key, {
      onClose: () => setHot(null),
    });
  };

  openers.forEach((btn) => {
    btn.addEventListener("pointerenter", () => setHot(btn.getAttribute("data-open-zone") || ""));
    btn.addEventListener("pointerleave", (e) => {
      const next = e.relatedTarget;
      if (next instanceof Node && root.contains(next) && next.closest("[data-open-zone]")) return;
      setHot(null);
    });
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const key = btn.getAttribute("data-open-zone");
      if (!key) return;
      hapticLight();
      openZone(key);
    });
  });

  const dz = route?.params?.get?.("zone");
  if (dz && REGION_KEYS.includes(dz)) {
    requestAnimationFrame(() => openZone(dz));
  }
}

function setupRevealAnimations(root) {
  const sections = root.querySelectorAll(".bb-section");
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }
    },
    { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
  );
  sections.forEach((el) => observer.observe(el));
}

function animateNeuroScore(root) {
  const el = root.querySelector("[data-neuro-score]");
  if (!el) return;
  const target = parseFloat(el.textContent || "0");
  const duration = 1200;
  const start = performance.now();
  const tick = (now) => {
    const p = Math.min(1, (now - start) / duration);
    const eased = 1 - (1 - p) ** 3;
    el.textContent = (target * eased).toFixed(1);
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

function animateBars(root) {
  const bars = root.querySelectorAll("[data-bar-value]");
  const barObs = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const wrap = entry.target;
        const target = parseFloat(wrap.getAttribute("data-bar-value") || "0");
        const fill = wrap.querySelector(".pdf-bar-gradient");
        if (fill) {
          fill.style.clipPath = "inset(0 100% 0 0)";
          requestAnimationFrame(() => {
            fill.style.clipPath = `inset(0 ${Math.max(0, 100 - target).toFixed(2)}% 0 0)`;
          });
        }
        barObs.unobserve(wrap);
      }
    },
    { threshold: 0.2 },
  );
  bars.forEach((b) => barObs.observe(b));
}
