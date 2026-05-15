import { REGION_KEYS, REGION_IMAGES } from "../data/regions.js";

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Кликабельные зоны — те же иллюстрации, что и в карточках отделов (PNG).
 * @param {ReturnType<import('../i18n/index.js').getStrings>} t
 */
export function brainInteractiveSectionHtml(t) {
  const tiles = REGION_KEYS.map((key) => {
    const label = t.regions[key] ?? key;
    const src = REGION_IMAGES[key];
    return `
    <button
      type="button"
      class="bb-brain-zone"
      data-region="${key}"
      aria-label="${esc(label)}"
    >
      <span class="bb-brain-zone__img-wrap">
        <img src="${src}" alt="" width="200" height="138" loading="lazy" decoding="async" />
      </span>
      <span class="bb-brain-zone__name">${esc(label)}</span>
    </button>`;
  }).join("\n");

  return `
<section class="bb-section bb-interactive-brain" data-section="interactive-brain" id="interactive-brain">
  <div class="bb-interactive-brain__head">
    <p class="bb-interactive-brain__kicker">${esc(t.interactiveBrainKicker)}</p>
    <p class="bb-interactive-brain__hint">${esc(t.interactiveBrainHint)}</p>
  </div>
  <div class="bb-interactive-brain__frame glass">
    <div class="bb-interactive-brain__grid" role="group" aria-label="${esc(t.interactiveBrainAria)}">
      ${tiles}
    </div>
  </div>
</section>`;
}
