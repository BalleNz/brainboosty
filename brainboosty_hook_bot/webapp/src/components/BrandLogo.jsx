import { useEffect, useRef } from "react";
import { mountMaskedBrandLogo, prefersReducedMotion } from "../lib/masked-brand-video.js";
import { BRAND_LOGO_SRC, BRAND_NAME } from "../data/brand.js";

/**
 * Анимированный логотип (color + alpha → canvas), без статичного PNG.
 */
export function BrandLogo({ className = "", variant = "cover", ...props }) {
  const rootRef = useRef(null);
  const reduced = prefersReducedMotion();

  useEffect(() => {
    if (!rootRef.current || reduced) return undefined;
    return mountMaskedBrandLogo(rootRef.current, { variant });
  }, [variant, reduced]);

  if (reduced) {
    return (
      <img
        src={BRAND_LOGO_SRC}
        alt={BRAND_NAME}
        className={`bb-masked-logo-fallback ${className}`.trim()}
        decoding="async"
        {...props}
      />
    );
  }

  return (
    <div
      ref={rootRef}
      className={`bb-masked-logo-root bb-masked-logo-root--${variant} ${className}`.trim()}
      {...props}
    />
  );
}
