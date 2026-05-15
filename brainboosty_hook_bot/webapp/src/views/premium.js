import { getStrings } from "../i18n/index.js";
import { openTributeLink, hapticLight } from "../telegram.js";

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function renderPremium(root, profile) {
  const t = getStrings(profile.lang);
  root.innerHTML = `
    <section class="bb-section is-visible bb-premium">
      <div class="mb-3 rounded-full px-5 py-1.5 border border-cyan-400/30 bg-cyan-500/10 text-xs font-bold uppercase tracking-[0.35em] text-cyan-100 text-center bb-type-display">
        ${esc(t.premiumBadge)}
      </div>
      <h2 class="text-3xl font-black text-center bg-gradient-to-r from-cyan-100 via-violet-200 to-fuchsia-300 bg-clip-text text-transparent mb-4 neon-cta-title">
        ${esc(t.premiumTitle)}
      </h2>
      <p class="text-slate-200 text-center text-sm leading-relaxed mb-6">${esc(t.premiumSub)}</p>
      <ul class="bb-premium-list glass rounded-2xl p-5 mb-6 space-y-3 text-sm text-slate-200">
        ${t.premiumBullets.map((b) => `<li>${esc(b)}</li>`).join("")}
      </ul>
      <button type="button" class="bb-btn-primary w-full" id="bb-premium-buy">${esc(t.premiumCta)}</button>
    </section>
  `;
  root.querySelector("#bb-premium-buy")?.addEventListener("click", () => {
    hapticLight();
    if (profile.tributeUrl) openTributeLink(profile.tributeUrl);
  });
}
