import { useEffect, useRef } from "react";
import { BRAND_LOGO_SRC, BRAND_VIDEO_ALPHA_SRC, BRAND_VIDEO_COLOR_SRC } from "../../data/brand.js";

const MAX_EDGE = 640;

/**
 * Синхронный color + alpha MP4 → canvas с прозрачным фоном.
 * alpha.mp4: matte (яркость = непрозрачность).
 */
export function useMaskedVideoCanvas({ enabled = true } = {}) {
  const canvasRef = useRef(null);
  const colorRef = useRef(null);
  const alphaRef = useRef(null);
  const readyRef = useRef(false);

  useEffect(() => {
    if (!enabled) return undefined;

    const color = document.createElement("video");
    const alpha = document.createElement("video");
    colorRef.current = color;
    alphaRef.current = alpha;

    const common = {
      muted: true,
      loop: true,
      playsInline: true,
      preload: "auto",
    };
    Object.assign(color, common, { src: BRAND_VIDEO_COLOR_SRC });
    Object.assign(alpha, common, { src: BRAND_VIDEO_ALPHA_SRC });

    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return undefined;

    const offAlpha = document.createElement("canvas");
    const offCtx = offAlpha.getContext("2d", { willReadFrequently: true });

    let raf = 0;
    let running = true;
    let started = false;

    const syncTime = () => {
      if (Math.abs(color.currentTime - alpha.currentTime) > 0.04) {
        alpha.currentTime = color.currentTime;
      }
    };

    const drawFrame = () => {
      if (!running || color.readyState < 2 || alpha.readyState < 2) return;

      const vw = color.videoWidth;
      const vh = color.videoHeight;
      if (!vw || !vh) return;

      const scale = Math.min(1, MAX_EDGE / vw);
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
      readyRef.current = true;
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
        /* autoplay policy */
      }
      tick();
    };

    const onReady = () => {
      if (color.readyState >= 2 && alpha.readyState >= 2) {
        startPlayback();
      }
    };

    color.addEventListener("loadeddata", onReady);
    alpha.addEventListener("loadeddata", onReady);
    color.load();
    alpha.load();

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      color.pause();
      alpha.pause();
      color.removeAttribute("src");
      alpha.removeAttribute("src");
      colorRef.current = null;
      alphaRef.current = null;
    };
  }, [enabled]);

  return { canvasRef, posterSrc: BRAND_LOGO_SRC, readyRef };
}
