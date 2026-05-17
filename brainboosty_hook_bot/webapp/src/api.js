import { REGION_KEYS } from "./data/regions.js";
import { computeNeuroScore } from "./data/demo-profile.js";

export const SITE_SESSION_STORAGE_KEY = "bb-site-session";
export const SITE_USER_STORAGE_KEY = "bb-site-user";

export function formatApiError(err, fallback = "") {
  const d = err?.detail;
  if (typeof d === "string" && d.trim()) return d.trim();
  if (Array.isArray(d) && d.length) {
    return d
      .map((x) => (typeof x === "object" && x?.msg ? x.msg : String(x)))
      .filter(Boolean)
      .join("; ");
  }
  return fallback || err?.message || "";
}

function headers(initData, siteToken, { jsonBody = false } = {}) {
  const h = {};
  if (jsonBody) {
    h["Content-Type"] = "application/json";
  }
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
  let res;
  try {
    res = await fetch(`/api/webapp${path}`, {
      method,
      headers: headers(initData, siteToken, { jsonBody: Boolean(body) }),
      body: body ? JSON.stringify(body) : undefined,
      cache: "no-store",
    });
  } catch {
    const err = new Error("network");
    err.code = "network";
    throw err;
  }

  const contentType = res.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");

  if (!res.ok) {
    const err = new Error(`HTTP ${res.status}`);
    err.status = res.status;
    if (isJson) {
      try {
        const payload = await res.json();
        err.detail = payload.detail ?? payload.message;
      } catch {
        /* ignore */
      }
    } else if (res.status >= 502 && res.status <= 504) {
      err.code = "upstream";
      err.detail = "server_unavailable";
    }
    throw err;
  }

  if (!isJson) {
    const err = new Error("invalid_response");
    err.code = "invalid_response";
    err.status = res.status;
    throw err;
  }

  try {
    return await res.json();
  } catch {
    const err = new Error("invalid_json");
    err.code = "invalid_response";
    throw err;
  }
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

/** Публичная конфигурация Telegram Login OIDC. */
export async function fetchOidcConfig() {
  return apiFetch("/auth/oidc/config", { initData: "", siteToken: "" });
}
