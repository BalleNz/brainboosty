/** Placeholder для vanilla SPA — монтируется через mountMaskedLogosIn */
export function maskedLogoMountHtml(variant = "cover") {
  return `<div class="bb-masked-logo-mount" data-masked-logo="${variant}" aria-hidden="true"></div>`;
}

/** @deprecated используйте maskedLogoMountHtml */
export function brandLogoHtml(variant = "cover") {
  return maskedLogoMountHtml(variant);
}
