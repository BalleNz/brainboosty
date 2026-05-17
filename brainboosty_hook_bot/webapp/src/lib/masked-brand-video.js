import {
  BRAND_LOGO_SRC,
  BRAND_VIDEO_ALPHA_SRC,
  BRAND_VIDEO_COLOR_SRC,
} from "../data/brand.js";

/** Макс. сторона canvas по контексту */
export const MASKED_LOGO_MAX_EDGE = {
  header: 128,
  exercise: 120,
  gate: 220,
  footer: 180,
  cover: 300,
  hero: 640,
};

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * color.mp4 + alpha.mp4 → canvas без фона.
 * @param {HTMLElement} container
 * @param {{ variant?: string, showPoster?: boolean }} [opts]
 * @returns {() => void} destroy
 */
export function mountMaskedBrandLogo(container, { variant = "cover", showPoster = true } = {}) {
  if (!container) return () => {};

  const destroyPrevious = container._bbMaskedDestroy;
  if (typeof destroyPrevious === "function") {
    destroyPrevious();
  }

  container.replaceChildren();
  container.classList.add("bb-masked-logo-root", `bb-masked-logo-root--${variant}`);
  container.dataset.maskedMounted = "1";

  if (prefersReducedMotion()) {
    const img = document.createElement("img");
    img.src = BRAND_LOGO_SRC;
    img.alt = "brainboosty";
    img.className = "bb-masked-logo-fallback";
    img.decoding = "async";
    container.appendChild(img);
    const destroy = () => {
      container.replaceChildren();
      container.classList.remove("bb-masked-logo-root", `bb-masked-logo-root--${variant}`);
      delete container.dataset.maskedMounted;
      delete container._bbMaskedDestroy;
    };
    container._bbMaskedDestroy = destroy;
    return destroy;
  }

  let posterEl = null;
  if (showPoster) {
    posterEl = document.createElement("img");
    posterEl.src = BRAND_LOGO_SRC;
    posterEl.alt = "";
    posterEl.className = "bb-masked-logo-poster";
    posterEl.setAttribute("aria-hidden", "true");
    posterEl.decoding = "async";
    container.appendChild(posterEl);
  }

  const canvas = document.createElement("canvas");
  canvas.className = "bb-masked-logo-canvas";
  container.appendChild(canvas);

  const maxEdge = MASKED_LOGO_MAX_EDGE[variant] ?? 320;
  const color = document.createElement("video");
  const alpha = document.createElement("video");
  const common = { muted: true, loop: true, playsInline: true, preload: "auto" };
  Object.assign(color, common, { src: BRAND_VIDEO_COLOR_SRC });
  Object.assign(alpha, common, { src: BRAND_VIDEO_ALPHA_SRC });

  const ctx = canvas.getContext("2d", { alpha: true });
  const offAlpha = document.createElement("canvas");
  const offCtx = offAlpha.getContext("2d", { willReadFrequently: true });

  let raf = 0;
  let running = true;
  let started = false;
  let framesDrawn = 0;

  const hidePoster = () => {
    if (posterEl) posterEl.classList.add("is-hidden");
  };

  const syncTime = () => {
    if (Math.abs(color.currentTime - alpha.currentTime) > 0.04) {
      alpha.currentTime = color.currentTime;
    }
  };

  const drawFrame = () => {
    if (!running || !ctx || color.readyState < 2 || alpha.readyState < 2) return;

    const vw = color.videoWidth;
    const vh = color.videoHeight;
    if (!vw || !vh) return;

    const scale = Math.min(1, maxEdge / vw);
    const w = Math.max(1, Math.round(vw * scale));
    const h = Math.max(1, Math.round(vh * scale));

    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
    if (offAlpha.width !== w || offAlpha.height !== h) {
      offAlpha.width = w;
      offAlpha.height = h;
    }

    syncTime();
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(color, 0, 0, w, h);
    const image = ctx.getImageData(0, 0, w, h);
    offCtx.clearRect(0, 0, w, h);
    offCtx.drawImage(alpha, 0, 0, w, h);
    const matte = offCtx.getImageData(0, 0, w, h);
    const px = image.data;
    const ma = matte.data;
    for (let i = 0; i < px.length; i += 4) {
      px[i + 3] = ma[i];
    }
    ctx.putImageData(image, 0, 0);
    framesDrawn += 1;
    if (framesDrawn > 2) hidePoster();
  };

  const tick = () => {
    if (!running) return;
    drawFrame();
    raf = requestAnimationFrame(tick);
  };

  const startPlayback = async () => {
    if (started) return;
    started = true;
    try {
      color.currentTime = 0;
      alpha.currentTime = 0;
      await Promise.all([color.play(), alpha.play()]);
    } catch {
      /* autoplay */
    }
    tick();
  };

  const onReady = () => {
    if (color.readyState >= 2 && alpha.readyState >= 2) startPlayback();
  };

  color.addEventListener("loadeddata", onReady);
  alpha.addEventListener("loadeddata", onReady);
  color.load();
  alpha.load();

  const destroy = () => {
    running = false;
    cancelAnimationFrame(raf);
    color.pause();
    alpha.pause();
    color.removeAttribute("src");
    alpha.removeAttribute("src");
    container.replaceChildren();
    container.classList.remove("bb-masked-logo-root", `bb-masked-logo-root--${variant}`);
    delete container.dataset.maskedMounted;
    delete container._bbMaskedDestroy;
  };

  container._bbMaskedDestroy = destroy;
  return destroy;
}

/** Монтирует все [data-masked-logo] внутри root */
export function mountMaskedLogosIn(root = document) {
  const mounts = root.querySelectorAll("[data-masked-logo]");
  const cleanups = [];
  mounts.forEach((el) => {
    const variant = el.getAttribute("data-masked-logo") || "cover";
    cleanups.push(mountMaskedBrandLogo(el, { variant }));
  });
  return () => cleanups.forEach((fn) => fn());
}
