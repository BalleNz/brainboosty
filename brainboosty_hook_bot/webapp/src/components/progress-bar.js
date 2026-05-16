/**
 * Progress bar — same clip-path technique as brain_pdf/fragments.bar_block.
 * @param {{ label: string, value: number, glow?: boolean }} opts
 */
export function progressBarHtml({ label, value, glow = false }) {
  const w = Math.max(0, Math.min(100, Number(value) || 0));
  const clipRight = Math.max(0, 100 - w);
  const gradCls = glow
    ? "pdf-bar-gradient pdf-bar-gradient--main"
    : "pdf-bar-gradient pdf-bar-gradient--sub";
  const safeLabel = escapeHtml(label);
  const parts = [
    `<div class="mb-3.5" data-bar-value="${w}">`,
    '<div class="flex justify-between text-xs mb-1 pdf-bar-label">',
    `<span>${safeLabel}</span>`,
    `<span class="pdf-bar-value font-bold tracking-wide">${w.toFixed(1)}% ♥</span>`,
    "</div>",
    '<div class="pdf-bar-track">',
    `<div class="${gradCls}" style="clip-path: inset(0 ${clipRight.toFixed(2)}% 0 0);"></div>`,
    "</div>",
    "</div>",
  ];
  return parts.join("\n  ");
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
