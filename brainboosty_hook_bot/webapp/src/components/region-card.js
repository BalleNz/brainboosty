import { REGION_IMAGES } from "../data/regions.js";
import { progressBarHtml } from "./progress-bar.js";

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * @param {ReturnType<import('../i18n/index.js').getStrings>} t
 * @param {string} regionKey
 * @param {{ main: number, bullets: string[], submetrics: {label:string,value:number}[] }} region
 */
export function regionCardHtml(t, regionKey, region) {
  const title = t.regions[regionKey] ?? regionKey;
  const img = REGION_IMAGES[regionKey];
  const main = Number(region.main ?? 0);
  const pctLabel = t.progressMain(`${main.toFixed(1)}`);

  const bars = [
    progressBarHtml({ label: t.zoneLevel, value: main, glow: true }),
    ...(region.submetrics ?? []).map((sm) =>
      progressBarHtml({ label: sm.label, value: sm.value, glow: false }),
    ),
  ].join("\n");

  const bullets = (region.bullets ?? [])
    .map((b) => `<li>${esc(b)}</li>`)
    .join("\n        ");

  return `
<section class="bb-section bb-region" data-section="region" data-region="${regionKey}" id="zone-${regionKey}">
  <img src="${img}" alt="" class="brain-float-top mb-3" width="320" height="220" loading="lazy" decoding="async" />
  <h2 class="bb-region__title neon-zone-title px-2">${esc(title)}</h2>
  <p class="bb-region__progress-label">${esc(pctLabel)}</p>
  <div class="glass rounded-2xl p-4 max-w-xl mx-auto w-full">
    ${bars}
  </div>
  <div class="glass rounded-2xl p-4 mt-4 max-w-xl mx-auto w-full">
    <p class="bb-rec-title">${esc(t.recTitle)}</p>
    <ul class="bb-rec-list">
        ${bullets}
    </ul>
  </div>
</section>`;
}
