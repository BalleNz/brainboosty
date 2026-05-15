import { getStrings } from "../i18n/index.js";
import { fetchTestQuestions, submitTest } from "../api.js";
import { navigate } from "../router.js";
import { hapticLight } from "../telegram.js";

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function renderTest(root, ctx, profile, { onProfile } = {}) {
  const t = getStrings(profile.lang);
  const state = {
    variant: profile.testVariant || "development",
    questions: [],
    answers: {},
    step: 0,
  };

  const wrap = document.createElement("section");
  wrap.className = "bb-section is-visible bb-test";
  root.replaceChildren(wrap);

  async function loadQuestions() {
    wrap.innerHTML = `<p class="text-cyan-200/80 text-sm">${esc(t.loading)}</p>`;
    try {
      const data = await fetchTestQuestions(ctx, state.variant);
      state.questions = data.questions ?? [];
      state.step = 0;
      state.answers = {};
      renderStep();
    } catch {
      wrap.innerHTML = `<p class="bb-error">${esc(t.errorLoad)}</p>`;
    }
  }

  function renderVariantPick() {
    wrap.innerHTML = `
      <h2 class="bb-page-title neon-zone-title">${esc(t.testTitle)}</h2>
      <p class="bb-page-sub text-slate-300/90 text-sm mb-4">${esc(t.testPickVariant)}</p>
      <div class="grid gap-3">
        <button type="button" class="bb-btn-primary" data-variant="development">${esc(t.variantDev)}</button>
        <button type="button" class="bb-btn-ghost" data-variant="sexual">${esc(t.variantSex)}</button>
      </div>
    `;
    wrap.querySelectorAll("[data-variant]").forEach((btn) => {
      btn.addEventListener("click", () => {
        hapticLight();
        state.variant = btn.getAttribute("data-variant") || "development";
        loadQuestions();
      });
    });
  }

  function renderStep() {
    const q = state.questions[state.step];
    if (!q) {
      renderVariantPick();
      return;
    }
    const total = state.questions.length;
    const progress = ((state.step + 1) / total) * 100;

    wrap.innerHTML = `
      <div class="bb-test-progress mb-4">
        <div class="flex justify-between text-xs text-cyan-200/80 mb-1">
          <span>${esc(t.questionProgress(state.step + 1, total))}</span>
          <span>${Math.round(progress)}%</span>
        </div>
        <div class="pdf-bar-track"><div class="pdf-bar-gradient pdf-bar-gradient--main" style="clip-path: inset(0 ${(100 - progress).toFixed(1)}% 0 0)"></div></div>
      </div>
      <h2 class="text-lg font-bold text-cyan-100 mb-2">${esc(q.topic)}</h2>
      <p class="text-slate-200 mb-4 leading-relaxed">${esc(q.text)}</p>
      <div class="grid gap-2 bb-test-options" id="bb-test-options"></div>
    `;

    const opts = wrap.querySelector("#bb-test-options");
    for (const opt of q.options ?? []) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "bb-test-option";
      btn.innerHTML = `<span class="bb-test-option-key">${esc(opt.key)}</span><span>${esc(opt.label)}</span>`;
      btn.addEventListener("click", () => onAnswer(opt.key));
      opts.appendChild(btn);
    }
  }

  async function onAnswer(key) {
    hapticLight();
    const q = state.questions[state.step];
    state.answers[q.id] = key;
    if (state.step + 1 < state.questions.length) {
      state.step += 1;
      renderStep();
      return;
    }
    wrap.innerHTML = `
      <div class="bb-loading">
        <div class="bb-loading__pulse"></div>
        <p class="text-sm text-cyan-200/80">${esc(t.computing)}</p>
      </div>`;
    try {
      const answersPayload = {};
      for (const [k, v] of Object.entries(state.answers)) {
        answersPayload[String(k)] = v;
      }
      const newProfile = await submitTest(ctx, {
        variant: state.variant,
        answers: answersPayload,
      });
      if (onProfile) onProfile(newProfile);
      navigate("map");
    } catch {
      wrap.innerHTML = `<p class="bb-error">${esc(t.errorLoad)}</p>`;
    }
  }

  renderVariantPick();
}
