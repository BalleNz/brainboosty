import { BRAND_LOGO_SRC, BRAND_NAME } from "../data/brand.js";

/** Логотип brainboosty для vanilla HTML-шаблонов */
export function brandLogoHtml(className = "bb-brand-logo") {
  return `<img src="${BRAND_LOGO_SRC}" alt="${BRAND_NAME}" class="${className}" width="200" height="56" decoding="async" translate="no" />`;
}
