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

function barRow() {
  return `
    <div class="bb-zone-drawer__bar-track">
      <div class="bb-zone-drawer__bar-fill" style="width: 0%"></div>
    </div>`;
}

/**
 * @param {import('../api.js').normalizeProfile extends (x:any)=>infer P ? P : never} profile
 * @param {string} regionKey
 * @param {{ onClose?: () => void }} [opts]
 */
export function openBrainZoneDrawer(profile, regionKey, opts = {}) {
  const t = getStrings(profile.lang);
  const title = t.regions[regionKey] ?? regionKey;
  const why = t.zoneWhy?.[regionKey] ?? "";
  const pct = Number(profile.scores?.[regionKey] ?? 0).toFixed(1);
  const exercises = t.zoneExercises?.[regionKey] ?? [];
  const exerciseItemsHtml =
    exercises.length > 0
      ? exercises
          .map(
            (ex) => `
                  <li class="bb-zone-drawer__exercise">
                    <p class="bb-zone-drawer__exercise-title">${esc(ex.title)}</p>
                    <p class="bb-zone-drawer__exercise-body">${esc(ex.body)}</p>
                    ${
                      ex.exerciseId != null
                        ? `<button type="button" class="bb-zone-drawer__ex-open" data-open-exercise="${Number(ex.exerciseId)}">${esc(t.zoneOpenFullExercise)}</button>`
                        : ""
                    }
                  </li>`,
          )
          .join("")
      : `<li class="bb-zone-drawer__exercise"><p class="bb-zone-drawer__exercise-body">${esc(t.zoneExercisePlaceholder)}</p></li>`;

  const host = document.createElement("div");
  host.className = "bb-zone-drawer-host";
  host.innerHTML = `
    <div class="bb-zone-drawer-backdrop" data-close="1" aria-hidden="true"></div>
    <aside class="bb-zone-drawer glass" role="dialog" aria-modal="true" aria-labelledby="bb-zone-drawer-title">
      <header class="bb-zone-drawer__header">
        <div>
          <p class="bb-zone-drawer__eyebrow">${esc(t.interactiveBrainKicker)}</p>
          <h2 id="bb-zone-drawer-title" class="bb-zone-drawer__title">${esc(title)}</h2>
        </div>
        <button type="button" class="bb-zone-drawer__close" data-close="1" aria-label="${esc(t.zoneDrawerCloseAria)}">
          <span aria-hidden="true">×</span>
        </button>
      </header>
      <div class="bb-zone-drawer__body">
        <div class="bb-zone-drawer__meter">
          <div class="bb-zone-drawer__meter-row">
            <span class="bb-zone-drawer__meter-label">${esc(t.zoneCurrentLevel)}</span>
            <span class="bb-zone-drawer__meter-value">${esc(pct)}%</span>
          </div>
          ${barRow()}
        </div>
        <div class="bb-zone-drawer__why">
          <p class="bb-zone-drawer__why-title">${esc(t.zoneWhyTitle)}</p>
          <p class="bb-zone-drawer__why-text">${esc(why)}</p>
        </div>
        <div class="bb-zone-drawer__actions" data-paid-block="${profile.paid ? "1" : "0"}">
          ${
            profile.paid
              ? `
            <div class="bb-zone-drawer__paid-menu">
              <button type="button" class="bb-zone-drawer__btn bb-zone-drawer__btn--ghost" data-go="history">
                ${esc(t.zoneOpenHistory)}
              </button>
              <button type="button" class="bb-zone-drawer__btn bb-zone-drawer__btn--ghost" data-toggle="exercises">
                ${esc(t.zoneExercisesHeading)}
              </button>
            </div>
            <div class="bb-zone-drawer__exercises" data-exercises hidden>
              <p class="bb-zone-drawer__exercises-cap">${esc(t.zoneExerciseListCap)}</p>
              <ul class="bb-zone-drawer__exercise-list">
                ${exerciseItemsHtml}
              </ul>
            </div>
            <p class="bb-zone-drawer__paid-hint">${esc(t.zonePaidHint)}</p>
            <button type="button" class="bb-zone-drawer__btn bb-zone-drawer__btn--ghost bb-zone-drawer__btn--compact" data-scroll-zone="${regionKey}">
              ${esc(t.zoneReadMoreDetail)}
            </button>`
              : `
            <p class="bb-zone-drawer__lock-note">${esc(t.zoneUnlockNote)}</p>
            <button type="button" class="bb-zone-drawer__btn bb-zone-drawer__btn--primary" data-go="boost">
              ${esc(t.zoneBoostCta)}
            </button>
            <button type="button" class="bb-zone-drawer__btn bb-zone-drawer__btn--ghost bb-zone-drawer__btn--compact" data-scroll-zone="${regionKey}">
              ${esc(t.zoneReadMoreDetail)}
            </button>`
          }
        </div>
      </div>
    </aside>
  `;

  document.body.appendChild(host);
  document.body.classList.add("bb-zone-drawer-open");

  const drawer = host.querySelector(".bb-zone-drawer");
  const exBlock = host.querySelector("[data-exercises]");
  const backdrop = host.querySelector(".bb-zone-drawer-backdrop");
  const fillEl = host.querySelector(".bb-zone-drawer__bar-fill");

  const close = () => {
    document.removeEventListener("keydown", onKey);
    document.body.classList.remove("bb-zone-drawer-open");
    host.remove();
    opts.onClose?.();
  };

  const onKey = (e) => {
    if (e.key === "Escape") close();
  };
  document.addEventListener("keydown", onKey);

  host.querySelectorAll("[data-close]").forEach((el) => {
    el.addEventListener("click", () => {
      hapticLight();
      close();
    });
  });

  host.querySelector('[data-go="boost"]')?.addEventListener("click", () => {
    hapticLight();
    if (profile.tributeUrl) openTributeLink(profile.tributeUrl);
    else navigate("premium");
    close();
  });

  host.querySelector('[data-go="history"]')?.addEventListener("click", () => {
    hapticLight();
    navigate("history", { zone: regionKey });
    close();
  });

  host.querySelector('[data-toggle="exercises"]')?.addEventListener("click", () => {
    hapticLight();
    if (!exBlock) return;
    const open = exBlock.hasAttribute("hidden");
    if (open) exBlock.removeAttribute("hidden");
    else exBlock.setAttribute("hidden", "");
  });

  host.querySelectorAll("[data-scroll-zone]").forEach((btn) => {
    btn.addEventListener("click", () => {
      hapticLight();
      const z = btn.getAttribute("data-scroll-zone") || regionKey;
      close();
      requestAnimationFrame(() => {
        document.getElementById(`zone-${z}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  });

  host.querySelectorAll("[data-open-exercise]").forEach((btn) => {
    btn.addEventListener("click", () => {
      hapticLight();
      const id = btn.getAttribute("data-open-exercise") || "1";
      close();
      navigate("exercise", { id });
    });
  });

  requestAnimationFrame(() => {
    drawer?.classList.add("is-open");
    backdrop?.classList.add("is-open");
    if (fillEl) {
      const w = Math.max(0, Math.min(100, Number(pct) || 0));
      fillEl.style.width = "0%";
      requestAnimationFrame(() => {
        fillEl.style.width = `${w.toFixed(1)}%`;
      });
    }
  });

  return {
    close: () => {
      close();
    },
  };
}
