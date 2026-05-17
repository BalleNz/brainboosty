import { maskedLogoMountHtml } from "./brand-logo-html.js";

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
export function coverSectionHtml(t, { displayName, neuroScore, connectivity }, { showLogo = true } = {}) {
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
  ${showLogo ? `<div class="bb-cover__logo mb-6">${maskedLogoMountHtml("cover")}</div>` : ""}
  <div class="glass rounded-3xl p-6 sm:p-8 cover-neon-card border border-pink-500/30">
    <p class="text-center text-sm uppercase tracking-[0.35em] text-pink-200 mt-1 font-semibold drop-shadow-[0_0_16px_rgba(255,20,147,0.55)] bb-cover__kicker">
      ${esc(t.heroBrain)}
    </p>
    <h1 class="text-center text-2xl sm:text-3xl font-bold mt-5 text-white drop-shadow-[0_0_20px_rgba(255,20,147,0.35)] neon-zone-title">
      ${esc(displayName)}
    </h1>
    <p class="text-center text-slate-300/95 mt-3 text-[15px] leading-relaxed max-w-md mx-auto tracking-wide px-2">
      ${esc(t.coverLine)}
    </p>
    <div class="mt-8 flex flex-col items-center justify-center">
      <p class="bb-cover__score-label text-pink-100/90 text-sm mb-2 font-medium tracking-wide drop-shadow-[0_0_10px_rgba(255,20,147,0.4)]">
        ${esc(t.scoreLabel)}
      </p>
      <div class="text-6xl sm:text-7xl font-black bg-gradient-to-r from-pink-200 via-fuchsia-300 to-amber-200 bg-clip-text text-transparent neon-score-cover" data-neuro-score>
        ${Number(neuroScore).toFixed(1)}
      </div>
    </div>
    ${connHtml}
  </div>
  <p class="text-center text-[11px] text-slate-500 mt-6">${esc(t.footer)}</p>
</section>`;
}
