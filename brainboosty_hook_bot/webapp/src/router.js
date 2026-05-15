const listeners = new Set();

export function getRoute() {
  const hash = (window.location.hash || "#map").replace(/^#/, "");
  const [name, query] = hash.split("?");
  return { name: name || "map", params: new URLSearchParams(query || "") };
}

export function navigate(name, params = {}) {
  const qs = params.toString?.() || new URLSearchParams(params).toString();
  window.location.hash = qs ? `${name}?${qs}` : name;
}

export function onRouteChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function notify() {
  const route = getRoute();
  for (const fn of listeners) {
    fn(route);
  }
}

window.addEventListener("hashchange", notify);

export function startRouter() {
  notify();
}
