/**
 * Premium exercise detail (private channel). Vanilla accordions — no React.
 */

import { fetchExercise } from "../api.js";
import { getStrings } from "../i18n/index.js";
import { navigate } from "../router.js";
import { hapticLight, openTributeLink } from "../telegram.js";

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function iconLines() {
  return {
    instruction: `<svg class="ex-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>`,
    research: `<svg class="ex-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3M11 8v6M8 11h6"/></svg>`,
    amplify: `<svg class="ex-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true"><path d="M12 3l1.8 5.5h5.7l-4.6 3.4 1.8 5.5-4.7-3.4-4.7 3.4 1.8-5.5-4.6-3.4h5.7L12 3z"/></svg>`,
    results: `<svg class="ex-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true"><path d="M4 19V5M9 19v-6M14 19V9M19 19v-9"/><path d="M4 19h16" stroke-linecap="round"/></svg>`,
  };
}

function formatInstructionBody(text) {
  const lines = String(text || "").split("\n");
  return lines.map((line) => `<p>${esc(line)}</p>`).join("");
}

function setupAccordions(root) {
  root.querySelectorAll(".ex-acc").forEach((acc) => {
    const btn = acc.querySelector(".ex-acc__trigger");
    if (!btn) return;
    btn.addEventListener("click", () => {
      const open = acc.getAttribute("data-open") === "true";
      const next = !open;
      acc.setAttribute("data-open", String(next));
      btn.setAttribute("aria-expanded", String(next));
      hapticLight();
    });
  });
}

function animateEntrance(root) {
  requestAnimationFrame(() => {
    root.querySelector(".ex-lux")?.classList.add("is-visible");
  });
}

/**
 * @param {HTMLElement} root
 * @param {{ initData: string, siteToken?: string }} ctx
 * @param {import('../api.js').normalizeProfile extends (x:any)=>infer P ? P : never} profile
 * @param {number} exerciseId
 */
export async function renderExerciseDetail(root, ctx, profile, exerciseId) {
  const t = getStrings(profile.lang);
  const ic = iconLines();

  root.className = "bb-root bb-root--spa bb-root--exercise";
  root.innerHTML = `
    <div class="ex-lux">
      <div class="ex-lux__grid-bg" aria-hidden="true"></div>
      <header class="ex-lux__top">
        <button type="button" class="ex-lux__back" id="ex-back" aria-label="${esc(t.exerciseBackAria)}">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M15 6l-6 6 6 6"/></svg>
        </button>
      </header>
      <div class="ex-lux__scroll">
        <div class="ex-lux__inner">
          <div class="ex-lux__loading">
            <div class="ex-lux__pulse"></div>
            <p>${esc(t.exerciseLoading)}</p>
          </div>
        </div>
      </div>
      <div class="ex-lux__cta-bar">
        <button type="button" class="ex-lux__cta" id="ex-cta">${esc(t.exerciseCtaPrimary)}</button>
      </div>
    </div>`;

  const back = root.querySelector("#ex-back");
  back?.addEventListener("click", () => {
    hapticLight();
    navigate("map");
  });

  if (!Number.isFinite(exerciseId) || exerciseId < 1) {
    const inner = root.querySelector(".ex-lux__scroll .ex-lux__inner");
    if (inner) {
      inner.innerHTML = `<p class="ex-lux__err">${esc(t.exerciseNotFound)}</p>`;
    }
    animateEntrance(root);
    return;
  }

  if (!profile.paid) {
    root.querySelector(".ex-lux__scroll .ex-lux__inner").innerHTML = `
      <div class="ex-lux__hero">
        <p class="ex-lux__lock-title">${esc(t.exercisePremiumTitle)}</p>
        <p class="ex-lux__lock-text">${esc(t.exercisePremiumText)}</p>
        <button type="button" class="ex-lux__cta ex-lux__cta--inline" id="ex-unlock">${esc(t.premiumCta)}</button>
      </div>`;
    root.querySelector("#ex-unlock")?.addEventListener("click", () => {
      hapticLight();
      if (profile.tributeUrl) openTributeLink(profile.tributeUrl);
      else navigate("premium");
    });
    root.querySelector("#ex-cta").textContent = t.premiumCta;
    root.querySelector("#ex-cta")?.addEventListener("click", () => {
      hapticLight();
      if (profile.tributeUrl) openTributeLink(profile.tributeUrl);
      else navigate("premium");
    });
    animateEntrance(root);
    return;
  }

  let data;
  try {
    data = await fetchExercise(ctx, exerciseId);
  } catch (e) {
    const inner = root.querySelector(".ex-lux__scroll .ex-lux__inner");
    const msg =
      e?.status === 403
        ? t.exercisePremiumTitle
        : e?.status === 404
          ? t.exerciseNotFound
          : t.errorLoad;
    if (inner) {
      inner.innerHTML = `<p class="ex-lux__err">${esc(msg)}</p>`;
    }
    animateEntrance(root);
    return;
  }

  const effIdx = Math.max(0, Math.min(4, (data.effectiveness || 3) - 1));
  const effLabel = t.exerciseEfficiencyLabels[effIdx] ?? "—";
  const regionPills = (data.regions || [])
    .map((k) => `<span class="ex-lux__pill">${esc(t.regions[k] ?? k)}</span>`)
    .join("");

  const researchHtml = (data.researchLinks || [])
    .map(
      (item) =>
        `<a class="ex-lux__link" href="${esc(item.url)}" target="_blank" rel="noopener noreferrer">${esc(item.label || item.url)}</a>`,
    )
    .join("");

  const imgHtml = data.instructionImageUrl
    ? `<figure class="ex-lux__figure"><img src="${esc(data.instructionImageUrl)}" alt="" loading="lazy" decoding="async" /></figure>`
    : "";

  root.querySelector(".ex-lux__scroll .ex-lux__inner").innerHTML = `
    <div class="ex-lux__hero">
      <div class="ex-lux__emoji" aria-hidden="true">${esc(data.emoji || "◆")}</div>
      <h1 class="ex-lux__title">${esc(data.title)}</h1>
      <p class="ex-lux__lede">${esc(data.shortDescription)}</p>
      <div class="ex-lux__tags">
        <span class="ex-lux__tag"><span class="ex-lux__tag-k">${esc(t.exerciseTagForWho)}</span>${esc(data.forWho)}</span>
        <span class="ex-lux__tag"><span class="ex-lux__tag-k">${esc(t.exerciseTagEfficiency)}</span>${esc(effLabel)}</span>
        <span class="ex-lux__tag"><span class="ex-lux__tag-k">${esc(t.exerciseTagFirstResult)}</span>${esc(t.exerciseFirstResultDays(data.firstResultDays))}</span>
      </div>
      <div class="ex-lux__meta-row">
        <div class="ex-lux__diff">
          <span class="ex-lux__diff-label">${esc(t.exerciseDifficulty)}</span>
          <div class="ex-lux__diff-track"><span class="ex-lux__diff-fill" style="width: ${Number(data.difficulty || 0)}%"></span></div>
          <span class="ex-lux__diff-num">${esc(Number(data.difficulty || 0))}</span>
        </div>
      </div>
      <div class="ex-lux__pills">${regionPills}</div>
      ${imgHtml}
    </div>

    <div class="ex-lux__accords">
      <div class="ex-acc" data-open="true">
        <button type="button" class="ex-acc__trigger" aria-expanded="true">
          <span class="ex-acc__ic">${ic.instruction}</span>
          <span class="ex-acc__label">${esc(t.exerciseAccInstruction)}</span>
          <span class="ex-acc__chev" aria-hidden="true"></span>
        </button>
        <div class="ex-acc__panel">
          <div class="ex-acc__panel-inner ex-lux__prose">${formatInstructionBody(data.instruction)}</div>
        </div>
      </div>
      <div class="ex-acc" data-open="false">
        <button type="button" class="ex-acc__trigger" aria-expanded="false">
          <span class="ex-acc__ic">${ic.research}</span>
          <span class="ex-acc__label">${esc(t.exerciseAccResearch)}</span>
          <span class="ex-acc__chev" aria-hidden="true"></span>
        </button>
        <div class="ex-acc__panel">
          <div class="ex-acc__panel-inner ex-lux__prose ex-lux__links">${researchHtml || `<p>${esc(t.exerciseNoResearch)}</p>`}</div>
        </div>
      </div>
      <div class="ex-acc" data-open="false">
        <button type="button" class="ex-acc__trigger" aria-expanded="false">
          <span class="ex-acc__ic">${ic.amplify}</span>
          <span class="ex-acc__label">${esc(t.exerciseAccAmplify)}</span>
          <span class="ex-acc__chev" aria-hidden="true"></span>
        </button>
        <div class="ex-acc__panel">
          <div class="ex-acc__panel-inner ex-lux__prose">${formatInstructionBody(data.amplify)}</div>
        </div>
      </div>
      <div class="ex-acc" data-open="false">
        <button type="button" class="ex-acc__trigger" aria-expanded="false">
          <span class="ex-acc__ic">${ic.results}</span>
          <span class="ex-acc__label">${esc(t.exerciseAccResults)}</span>
          <span class="ex-acc__chev" aria-hidden="true"></span>
        </button>
        <div class="ex-acc__panel">
          <div class="ex-acc__panel-inner ex-lux__prose">${formatInstructionBody(data.expectedResults)}</div>
        </div>
      </div>
    </div>
    <div class="ex-lux__scroll-pad"></div>`;

  setupAccordions(root);

  const cta = root.querySelector("#ex-cta");
  cta?.addEventListener("click", () => {
    hapticLight();
    window.Telegram?.WebApp?.showAlert?.(t.exerciseCtaMessage);
  });

  animateEntrance(root);
}
