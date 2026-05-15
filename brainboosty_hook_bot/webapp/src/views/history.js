import { REGION_KEYS } from "../data/regions.js";
import { getStrings } from "../i18n/index.js";
import { fetchHistory } from "../api.js";
import { navigate } from "../router.js";

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function formatDate(iso, lang) {
  if (!iso) return "—";
  try {
    const d = new Date(iso);
    return d.toLocaleString(lang === "en" ? "en-GB" : "ru-RU", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export async function renderHistory(root, ctx, profile) {
  const t = getStrings(profile.lang);
  const wrap = document.createElement("section");
  wrap.className = "bb-section is-visible bb-history";
  wrap.innerHTML = `
    <h2 class="bb-page-title neon-zone-title">${esc(t.historyTitle)}</h2>
    <p class="bb-page-sub text-slate-300/90 text-sm mb-4">${esc(t.historySub)}</p>
  `;
  const list = document.createElement("div");
  list.className = "space-y-3";
  list.textContent = t.loading;
  wrap.appendChild(list);
  root.replaceChildren(wrap);

  let data;
  try {
    data = await fetchHistory(ctx);
  } catch {
    list.innerHTML = `<p class="bb-error">${esc(t.errorLoad)}</p>`;
    return;
  }

  const items = data.items ?? [];
  list.replaceChildren();

  if (!items.length) {
    const empty = document.createElement("div");
    empty.className = "glass rounded-2xl p-5 text-center";
    const p = document.createElement("p");
    p.className = "text-slate-200 mb-4";
    p.textContent = t.historyEmpty;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "bb-btn-primary";
    btn.textContent = t.startTest;
    btn.addEventListener("click", () => navigate("test"));
    empty.append(p, btn);
    list.appendChild(empty);
    return;
  }

  for (const [idx, item] of items.entries()) {
    const card = document.createElement("article");
    card.className = `glass rounded-2xl p-4 bb-history-card${idx === 0 ? " is-active" : ""}`;

    const head = document.createElement("div");
    head.className = "flex justify-between items-start gap-2 mb-2";
    const left = document.createElement("div");
    left.innerHTML = `
      <p class="text-xs text-cyan-200/80 uppercase tracking-wide">${esc(formatDate(item.createdAt, profile.lang))}</p>
      <p class="text-lg font-bold text-white mt-1 bb-type-display">NeuroScore <span class="text-cyan-200">${Number(item.neuroScore).toFixed(1)}</span></p>
    `;
    head.appendChild(left);
    if (idx === 0) {
      const badge = document.createElement("span");
      badge.className = "bb-badge";
      badge.textContent = t.latest;
      head.appendChild(badge);
    }
    card.appendChild(head);

    const deltas = document.createElement("div");
    deltas.className = "bb-history-deltas";
    for (const key of REGION_KEYS) {
      const label = t.regions[key] ?? key;
      const val = Number(item.scores?.[key] ?? 0).toFixed(1);
      const delta = item.isFirst ? "—" : item.deltas?.[key] ?? "·";
      const row = document.createElement("div");
      row.className = "bb-history-row";
      const s1 = document.createElement("span");
      s1.textContent = label;
      const s2 = document.createElement("span");
      s2.textContent = `${val}%`;
      const s3 = document.createElement("span");
      s3.textContent = delta;
      if (typeof delta === "string" && delta.includes("↑")) s3.className = "bb-delta-up";
      if (typeof delta === "string" && delta.includes("↓")) s3.className = "bb-delta-down";
      row.append(s1, s2, s3);
      deltas.appendChild(row);
    }
    card.appendChild(deltas);

    const openBtn = document.createElement("button");
    openBtn.type = "button";
    openBtn.className = "bb-btn-ghost mt-3 w-full";
    openBtn.textContent = t.openThisMap;
    openBtn.addEventListener("click", () => navigate("map"));
    card.appendChild(openBtn);

    list.appendChild(card);
  }
}
