import { useEffect, useRef } from "react";
import { mountMaskedBrandLogo, prefersReducedMotion } from "../../lib/masked-brand-video.js";
import { BRAND_LOGO_SRC } from "../../data/brand.js";

/** React-обёртка: masked video в container ref */
export function useMaskedVideoCanvas({ enabled = true, variant = "hero" } = {}) {
  const rootRef = useRef(null);

  useEffect(() => {
    if (!enabled || !rootRef.current) return undefined;
    return mountMaskedBrandLogo(rootRef.current, { variant });
  }, [enabled, variant]);

  return {
    rootRef,
    posterSrc: BRAND_LOGO_SRC,
    reducedMotion: !enabled || prefersReducedMotion(),
  };
}
