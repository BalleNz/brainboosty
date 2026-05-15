/**
 * Premium, subtle hero motion: pointer parallax + optional device tilt.
 * Respects prefers-reduced-motion.
 */

const LERP = 0.088;
const MAX_OFFSET = 15;
const MAX_ROT = 2;
const GLOW_PARALLAX = 0.4;

function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n));
}

function prefersReducedMotion() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

function normFromHero(hero, clientX, clientY) {
  const rect = hero.getBoundingClientRect();
  const pad = 80;
  const w = Math.max(rect.width + pad * 2, 1);
  const h = Math.max(rect.height + pad * 2, 1);
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  return {
    nx: clamp((clientX - cx) / (w * 0.5), -1, 1),
    ny: clamp((clientY - cy) / (h * 0.5), -1, 1),
  };
}

/**
 * @param {HTMLElement} hero
 * @returns {() => void}
 */
export function initLandingHeroMotion(hero) {
  if (prefersReducedMotion()) {
    return () => {};
  }

  const brainLayer = hero.querySelector("[data-parallax-brain]");
  const glow = hero.querySelector("[data-parallax-glow]");
  if (!brainLayer) {
    return () => {};
  }

  let mouseN = { nx: 0, ny: 0 };
  let hasPointerInHero = false;
  let orientN = { nx: 0, ny: 0 };
  let hasOrient = false;

  let smoothX = 0;
  let smoothY = 0;
  let raf = 0;

  const coarsePointer = window.matchMedia?.("(pointer: coarse)")?.matches ?? false;

  const targetFromInputs = () => {
    if (hasPointerInHero) {
      return { tx: mouseN.nx, ty: mouseN.ny };
    }
    if (hasOrient) {
      return { tx: orientN.nx * 0.62, ty: orientN.ny * 0.62 };
    }
    return { tx: 0, ty: 0 };
  };

  const tick = () => {
    raf = 0;
    const { tx, ty } = targetFromInputs();
    smoothX += (tx - smoothX) * LERP;
    smoothY += (ty - smoothY) * LERP;

    const ox = smoothX * MAX_OFFSET;
    const oy = smoothY * MAX_OFFSET;
    const rx = smoothY * -MAX_ROT;
    const ry = smoothX * MAX_ROT;

    brainLayer.style.transform = `translate3d(${ox}px, ${oy}px, 0) rotateX(${rx}deg) rotateY(${ry}deg)`;

    if (glow) {
      const gx = -ox * GLOW_PARALLAX;
      const gy = -oy * GLOW_PARALLAX;
      glow.style.transform = `translate3d(calc(-50% + ${gx}px), calc(-50% + ${gy}px), 0) scale(1.06)`;
    }

    const { tx: tnx, ty: tny } = targetFromInputs();
    const drifting = Math.abs(smoothX - tnx) > 0.003 || Math.abs(smoothY - tny) > 0.003;
    const settling = Math.abs(smoothX) > 0.004 || Math.abs(smoothY) > 0.004;
    if (drifting || settling || hasOrient) {
      raf = requestAnimationFrame(tick);
    }
  };

  const kick = () => {
    if (!raf) raf = requestAnimationFrame(tick);
  };

  const onMove = (e) => {
    if (!e.isTrusted) return;
    const { nx, ny } = normFromHero(hero, e.clientX, e.clientY);
    mouseN = { nx, ny };
    hasPointerInHero = true;
    kick();
  };

  const onEnter = () => {
    hasPointerInHero = true;
  };

  const onLeave = () => {
    hasPointerInHero = false;
    kick();
  };

  hero.addEventListener("pointermove", onMove, { passive: true });
  hero.addEventListener("pointerenter", onEnter);
  hero.addEventListener("pointerleave", onLeave);
  hero.addEventListener(
    "pointerdown",
    () => {
      if (coarsePointer && typeof DeviceOrientationEvent?.requestPermission === "function") {
        DeviceOrientationEvent.requestPermission()
          .then((s) => {
            if (s === "granted") hasOrient = true;
          })
          .catch(() => {});
      }
    },
    { passive: true },
  );

  /** @type {(ev: DeviceOrientationEvent) => void} */
  let onOrient = null;
  if (window.DeviceOrientationEvent) {
    onOrient = (e) => {
      if (e.gamma == null || e.beta == null) return;
      const nx = clamp(e.gamma / 32, -1, 1);
      const ny = clamp((e.beta - 44) / 36, -1, 1);
      orientN = { nx, ny };
      hasOrient = true;
      kick();
    };
    window.addEventListener("deviceorientation", onOrient, true);
  }

  brainLayer.style.willChange = "transform";
  if (glow) glow.style.willChange = "transform";

  kick();

  return () => {
    hero.removeEventListener("pointermove", onMove);
    hero.removeEventListener("pointerenter", onEnter);
    hero.removeEventListener("pointerleave", onLeave);
    if (onOrient) window.removeEventListener("deviceorientation", onOrient, true);
    if (raf) cancelAnimationFrame(raf);
    brainLayer.style.willChange = "";
    brainLayer.style.transform = "";
    if (glow) {
      glow.style.willChange = "";
      glow.style.transform = "";
    }
  };
}
