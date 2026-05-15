import { COVER_HERO_IMAGE } from "../data/regions.js";
import logoSvg from "@bb-assets/pdf/logo.svg?raw";

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * @param {import('../i18n/index.js').getStrings extends (l:string)=>infer S ? S : never} t
 * @param {{ displayName: string, neuroScore: number, connectivity: string[] }} data
 */
export function coverSectionHtml(t, { displayName, neuroScore, connectivity }) {
  const connHtml =
    connectivity?.length > 0
      ? `
    <div class="bb-connectivity glass rounded-2xl p-4 mt-5">
      <p class="bb-connectivity__title">${esc(t.connectivityTitle)}</p>
      ${connectivity.map((line) => `<p>• ${esc(line)}</p>`).join("\n      ")}
    </div>`
      : "";

  return `
<section class="bb-section bb-cover" data-section="cover">
  <div class="bb-cover__logo">${logoSvg}</div>
  <img src="${COVER_HERO_IMAGE}" alt="" class="cover-full-brain-hero mb-4" width="360" height="260" decoding="async" />
  <div class="glass rounded-3xl p-6 sm:p-8 cover-neon-card border border-cyan-500/20">
    <p class="text-center text-sm uppercase tracking-[0.35em] text-cyan-200 mt-1 font-semibold drop-shadow-[0_0_16px_rgba(34,211,238,0.55)] bb-cover__kicker">
      ${esc(t.heroBrain)}
    </p>
    <h1 class="text-center text-2xl sm:text-3xl font-bold mt-5 text-white drop-shadow-[0_0_20px_rgba(167,139,250,0.25)] neon-zone-title">
      ${esc(displayName)}
    </h1>
    <p class="text-center text-slate-300/95 mt-3 text-[15px] leading-relaxed max-w-md mx-auto tracking-wide px-2">
      ${esc(t.coverLine)}
    </p>
    <div class="mt-8 flex flex-col items-center justify-center">
      <p class="bb-cover__score-label text-cyan-100/90 text-sm mb-2 font-medium tracking-wide drop-shadow-[0_0_10px_rgba(34,211,238,0.35)]">
        ${esc(t.scoreLabel)}
      </p>
      <div class="text-6xl sm:text-7xl font-black bg-gradient-to-r from-cyan-200 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent neon-score-cover" data-neuro-score>
        ${Number(neuroScore).toFixed(1)}
      </div>
    </div>
    ${connHtml}
  </div>
  <p class="text-center text-[11px] text-slate-500 mt-6">${esc(t.footer)}</p>
</section>`;
}
