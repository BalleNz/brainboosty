import { BRAND_LOGO_SRC, BRAND_NAME } from "../data/brand.js";

/** Логотип brainboosty (PNG) — React */
export function BrandLogo({ className = "bb-brand-logo", ...props }) {
  return (
    <img
      src={BRAND_LOGO_SRC}
      alt={BRAND_NAME}
      className={className}
      width={200}
      height={56}
      decoding="async"
      {...props}
    />
  );
}
