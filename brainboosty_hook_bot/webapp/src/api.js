import { REGION_KEYS } from "./data/regions.js";
import { computeNeuroScore } from "./data/demo-profile.js";

export const SITE_SESSION_STORAGE_KEY = "bb-site-session";
export const SITE_USER_STORAGE_KEY = "bb-site-user";

function headers(initData, siteToken) {
  const h = { "Content-Type": "application/json" };
  if (initData) {
    h["X-Telegram-Init-Data"] = initData;
  }
  const st = (siteToken || "").trim();
  if (st) {
    h.Authorization = `Bearer ${st}`;
  }
  return h;
}

async function apiFetch(path, { initData = "", siteToken = "", method = "GET", body } = {}) {
  const res = await fetch(`/api/webapp${path}`, {
    method,
    headers: headers(initData, siteToken),
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const err = new Error(`HTTP ${res.status}`);
    err.status = res.status;
    try {
      err.detail = (await res.json()).detail;
    } catch {
      /* ignore */
    }
    throw err;
  }
  return res.json();
}

function normalizeProfile(raw) {
  const lang = raw.lang === "en" ? "en" : "ru";
  const scores = {};
  for (const k of REGION_KEYS) {
    scores[k] = Number(raw.scores?.[k] ?? 0);
  }
  const regions = {};
  for (const k of REGION_KEYS) {
    const block = raw.regions?.[k] ?? {};
    regions[k] = {
      main: Number(block.main ?? scores[k]),
      bullets: block.bullets ?? [],
      submetrics: (block.submetrics ?? []).map((sm) => ({
        label: sm.label ?? sm.label_ru ?? "",
        value: Number(sm.value ?? scores[k]),
      })),
    };
  }
  return {
    lang,
    userDisplayName: raw.userDisplayName ?? raw.user_display_name ?? "Guest",
    paid: Boolean(raw.paid),
    hasMap: Boolean(raw.hasMap ?? raw.has_map ?? Object.keys(raw.scores || {}).length),
    testVariant: raw.testVariant ?? raw.test_variant ?? "development",
    tributeUrl: raw.tributeUrl ?? raw.tribute_url ?? "",
    neuroScore:
      raw.neuroScore != null ? Number(raw.neuroScore) : computeNeuroScore(scores),
    scores,
    connectivity: raw.connectivity ?? [],
    regions,
    snapshotId: raw.snapshotId ?? raw.snapshot_id ?? null,
    createdAt: raw.createdAt ?? raw.created_at ?? null,
  };
}

export async function fetchLandingMeta() {
  return apiFetch("/landing", { initData: "", siteToken: "" });
}

export async function fetchBrainProfile(ctx) {
  const data = await apiFetch("/profile", {
    initData: ctx.initData ?? "",
    siteToken: ctx.siteToken ?? "",
  });
  return normalizeProfile(data);
}

export async function fetchHistory(ctx) {
  return apiFetch("/history", {
    initData: ctx.initData ?? "",
    siteToken: ctx.siteToken ?? "",
  });
}

export async function fetchTestQuestions(ctx, variant = "development") {
  return apiFetch(`/test/questions?variant=${encodeURIComponent(variant)}`, {
    initData: ctx.initData ?? "",
    siteToken: ctx.siteToken ?? "",
  });
}

export async function submitTest(ctx, { variant, answers }) {
  const payload = { variant, answers };
  const data = await apiFetch("/test/submit", {
    initData: ctx.initData ?? "",
    siteToken: ctx.siteToken ?? "",
    method: "POST",
    body: payload,
  });
  return normalizeProfile(data.profile);
}

export async function fetchExercise(ctx, exerciseId) {
  return apiFetch(`/exercises/${encodeURIComponent(String(exerciseId))}`, {
    initData: ctx.initData ?? "",
    siteToken: ctx.siteToken ?? "",
  });
}
