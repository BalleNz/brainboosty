/** History API router (clean URLs, без #hash). */

const listeners = new Set();

/** Внутренние имена маршрутов */
export const ROUTE = {
  map: "map",
  test: "test",
  history: "history",
  access: "access",
  exercise: "exercise",
};

const RESERVED = new Set([
  "api",
  "health",
  "webapp",
  "tribute",
  "fonts",
  "assets",
  "auth",
]);

function normalizePathname(path) {
  const p = (path || "/").replace(/\/+/g, "/");
  if (p.length > 1 && p.endsWith("/")) return p.slice(0, -1);
  return p || "/";
}

function pathname() {
  return normalizePathname(window.location.pathname);
}

function searchParams() {
  return new URLSearchParams(window.location.search);
}

/** premium → access (старый код и hash) */
export function normalizeRouteName(name) {
  if (name === "premium") return ROUTE.access;
  return name || ROUTE.map;
}

function buildUrl(name, params = new URLSearchParams()) {
  const route = normalizeRouteName(name);
  const p = new URLSearchParams(params);

  if (route === ROUTE.exercise) {
    const id = parseInt(p.get("id") || "0", 10);
    p.delete("id");
    const rest = p.toString();
    return `/exercise/${id}${rest ? `?${rest}` : ""}`;
  }

  if (route === ROUTE.map) {
    const qs = p.toString();
    return qs ? `/?${qs}` : "/";
  }

  const qs = p.toString();
  const base = `/${route}`;
  return qs ? `${base}?${qs}` : base;
}

function parseExercisePath(path) {
  const m = path.match(/^\/exercise\/(\d+)\/?$/);
  if (!m) return null;
  const params = searchParams();
  params.set("id", m[1]);
  return { name: ROUTE.exercise, params };
}

/**
 * @returns {{ name: string, params: URLSearchParams }}
 */
export function getRoute() {
  const path = pathname();

  const ex = parseExercisePath(path);
  if (ex) return ex;

  const params = searchParams();

  if (path === "/test") return { name: ROUTE.test, params };
  if (path === "/history") return { name: ROUTE.history, params };
  if (path === "/access" || path === "/premium") return { name: ROUTE.access, params };
  if (path === "/") return { name: ROUTE.map, params };

  return { name: ROUTE.map, params };
}

function notifyListeners() {
  const route = getRoute();
  for (const fn of listeners) {
    fn(route);
  }
}

export function navigate(name, params = {}) {
  const p = params instanceof URLSearchParams ? new URLSearchParams(params) : new URLSearchParams(params);
  const url = buildUrl(name, p);
  const current = `${pathname()}${window.location.search}`;
  if (current !== url) {
    history.pushState(null, "", url);
  }
  notifyListeners();
}

export function replaceRoute(name, params = {}) {
  const p = params instanceof URLSearchParams ? new URLSearchParams(params) : new URLSearchParams(params);
  history.replaceState(null, "", buildUrl(name, p));
  notifyListeners();
}

export function onRouteChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

window.addEventListener("popstate", () => notifyListeners());

export function startRouter() {
  notifyListeners();
}

/** Старые #/hash и /premium → clean URLs. Возвращает true, если был редирект (нужен reload/повторный boot). */
export function migrateLegacyUrl() {
  const hash = window.location.hash.replace(/^#/, "").trim();
  if (hash) {
    const [h, q] = hash.split("?");
    const params = new URLSearchParams(q || "");
    const name = normalizeRouteName(h);

    if (name === "auth" || h.startsWith("auth/")) {
      return false;
    }

    if (h === "hub-login") {
      const qs = params.toString();
      history.replaceState(null, "", qs ? `/hub-login?${qs}` : "/hub-login");
      window.location.hash = "";
      return false;
    }

    if ([ROUTE.map, ROUTE.test, ROUTE.history, ROUTE.access, ROUTE.exercise, "premium"].includes(h)) {
      history.replaceState(null, "", buildUrl(name, params));
      window.location.hash = "";
      notifyListeners();
      return false;
    }
  }

  if (pathname() === "/premium") {
    history.replaceState(null, "", buildUrl(ROUTE.access, searchParams()));
    notifyListeners();
    return false;
  }

  return false;
}

/** Лендинг: /hub-login. SPA без сессии на /test и т.п. → /. */
export function isLandingPath() {
  const p = pathname();
  return p === "/" || p === "/hub-login";
}

export function isAppDeepLinkWithoutSession() {
  const p = pathname();
  if (p === "/" || p === "/hub-login") return false;
  if (p.startsWith("/api") || RESERVED.has(p.split("/")[1])) return false;
  return /^\/(test|history|access|premium|exercise\/\d+)\/?$/.test(p);
}
