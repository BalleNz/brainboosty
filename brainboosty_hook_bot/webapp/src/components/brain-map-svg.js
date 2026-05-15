import { REGION_KEYS } from "../data/regions.js";

/**
 * Schematic dorsal-view brain regions for hit targets (educational diagram).
 * Order: back-to-front for paint; DOM order reversed so smaller zones stack on top.
 */
const ZONE_PATHS = {
  brain_lobes:
    "M200 78c-68 8-118 58-124 128-4 48 12 92 44 118 26 22 62 34 100 34s74-12 100-34c32-26 48-70 44-118-6-70-56-120-124-128-12-1-26-1-40 0z M72 210c-22 18-34 46-28 76 8 38 42 62 82 58 8-1 15-3 22-6-24-20-40-52-44-88-2-18 0-36 6-52-14 4-28 8-38 14z M328 210c10 6 24 10 38 14 6 16 8 34 6 52-4 36-20 68-44 88 7 3 14 5 22 6 40 4 74-20 82-58 6-30-6-58-28-76-10-6-24-10-38-14z",
  temporoparietal_junction:
    "M116 152c-8 28-10 58-4 88 10 52 42 88 76 96 18-24 28-54 30-86 2-36-8-70-26-96-22 8-48 6-76-2z M284 152c28-8 54-10 76 2-18 26-28 60-26 96 2 32 12 62 30 86 34-8 66-44 76-96 6-30 4-60-4-88-28 8-54 10-76 2z",
  prefrontal_cortex:
    "M200 52c-56 4-102 34-124 78 32-10 66-12 100-6 34-6 68-4 100 6-22-44-68-74-124-78-18-1-36-1-52 0h-24z",
  frontal_gyrus:
    "M88 138c-6 16-10 34-10 54 0 42 16 78 42 102 20-34 50-58 88-68-8-26-10-54-4-82-36-14-74-16-116-6z M312 138c42-10 80-8 116 6 6 28 4 56-4 82 38 10 68 34 88 68 26-24 42-60 42-102 0-20-4-38-10-54-36-10-74-12-116-2-6 24-8 48-4 72 4-24 12-46 24-66-30-6-60-4-88 4-28-8-58-10-88-4 12 20 20 42 24 66 4-24 2-48-4-72z",
  insular_cortex:
    "M200 196c-22 0-42 10-54 28-8 12-12 28-10 44 4 32 28 56 58 60 8 1 16 1 24 0 30-4 54-28 58-60 2-16-2-32-10-44-12-18-32-28-54-28h-12z",
  amygdala:
    "M152 268c-8 12-10 28-4 42 8 20 28 32 48 30 10-1 18-5 24-12-18-14-30-36-34-60-10 4-22 6-34 0z M248 268c-12 6-24 4-34 0-4 24-16 46-34 60 6 7 14 11 24 12 20 2 40-10 48-30 6-14 4-30-4-42z",
};

/** Topmost first = wins hit-test */
const PATH_ORDER = [
  "amygdala",
  "insular_cortex",
  "frontal_gyrus",
  "prefrontal_cortex",
  "temporoparietal_junction",
  "brain_lobes",
];

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function assertKeys() {
  for (const k of REGION_KEYS) {
    if (!ZONE_PATHS[k]) throw new Error(`brain-map-svg: missing path for ${k}`);
  }
}
assertKeys();

/**
 * @param {ReturnType<import('../i18n/index.js').getStrings>} t
 */
export function brainInteractiveSectionHtml(t) {
  const zones = PATH_ORDER.filter((k) => ZONE_PATHS[k])
    .map((key) => {
      const label = t.regions[key] ?? key;
      const d = ZONE_PATHS[key];
      return `
    <path
      class="bb-brain-zone"
      data-region="${key}"
      d="${d}"
      aria-label="${esc(label)}"
      role="button"
      tabindex="0"
    />`;
    })
    .join("\n");

  return `
<section class="bb-section bb-interactive-brain" data-section="interactive-brain" id="interactive-brain">
  <div class="bb-interactive-brain__head">
    <p class="bb-interactive-brain__kicker">${esc(t.interactiveBrainKicker)}</p>
    <p class="bb-interactive-brain__hint">${esc(t.interactiveBrainHint)}</p>
  </div>
  <div class="bb-interactive-brain__frame glass">
    <svg
      class="bb-interactive-brain__svg"
      viewBox="0 0 400 460"
      width="360"
      height="414"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="${esc(t.interactiveBrainAria)}"
    >
      <defs>
        <linearGradient id="bbBrainBase" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#22d3ee" stop-opacity="0.14" />
          <stop offset="45%" stop-color="#818cf8" stop-opacity="0.1" />
          <stop offset="100%" stop-color="#c084fc" stop-opacity="0.12" />
        </linearGradient>
        <radialGradient id="bbBrainShine" cx="35%" cy="28%" r="55%">
          <stop offset="0%" stop-color="#ecfeff" stop-opacity="0.22" />
          <stop offset="55%" stop-color="#22d3ee" stop-opacity="0.06" />
          <stop offset="100%" stop-color="#010108" stop-opacity="0" />
        </radialGradient>
        <filter id="bbZoneGlow" x="-40%" y="-40%" width="180%" height="180%" color-interpolation-filters="sRGB">
          <feGaussianBlur stdDeviation="2.2" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="0 0 0 0 0.4   0 0 0 0 0.95   0 0 0 0 1   0 0 0 0.55 0"
            result="cyanBlur"
          />
          <feMerge>
            <feMergeNode in="cyanBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="bbZoneGlowStrong" x="-50%" y="-50%" width="200%" height="200%" color-interpolation-filters="sRGB">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="0 0 0 0 0.65   0 0 0 0 0.85   0 0 0 0 1   0 0 0 0.75 0"
            result="glow"
          />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <ellipse cx="200" cy="232" rx="138" ry="168" fill="url(#bbBrainBase)" class="bb-brain-silhouette" />
      <ellipse cx="200" cy="232" rx="138" ry="168" fill="url(#bbBrainShine)" />
      <g class="bb-brain-zones">
        ${zones}
      </g>
    </svg>
  </div>
</section>`;
}
