"""Повторяющиеся HTML-фрагменты листа и progress-баров."""

from __future__ import annotations

import html


_WM_LINE = "BrainBoosty — @androgenautist — "


def watermark() -> str:
    """Очень слабый диагональный «ребристый» вотермарк (много строк, ~45°).

    Вставляется внутри каждого .sheet (между фоном ::before и контентом), иначе листы
    перекрывают fixed-слой на body и в PDF его не видно.
    """
    line = (_WM_LINE * 28)[:480]
    esc = html.escape(line)
    rows: list[str] = []
    for i in range(-10, 52):
        rows.append(f'<div class="pdf-wm-row" style="top:{i * 18}px">{esc}</div>')
    return f'<div class="pdf-wm-sheet" aria-hidden="true">{"".join(rows)}</div>'


def sheet_open() -> str:
    return (
        '<div class="sheet relative z-[1] overflow-hidden sheet-premium text-slate-100 px-10 py-8">'
        f"{watermark()}"
        '<div class="relative z-[2]">'
    )


def sheet_close() -> str:
    return "</div></div>"


def bar_block(label: str, pct: float, *, glow: bool = False) -> str:
    w = max(0.0, min(100.0, pct))
    clip_right = max(0.0, 100.0 - w)
    grad_cls = "pdf-bar-gradient pdf-bar-gradient--main" if glow else "pdf-bar-gradient pdf-bar-gradient--sub"
    lab = html.escape(label)
    return f"""
<div class="mb-3.5">
  <div class="flex justify-between text-xs text-slate-400 mb-1"><span>{lab}</span><span class="text-cyan-100 font-bold tracking-wide">{w:.1f}%</span></div>
  <div class="pdf-bar-track">
    <div class="{grad_cls}" style="clip-path: inset(0 {clip_right:.2f}% 0 0);"></div>
  </div>
</div>
"""


def html_head(lang: str, *, stylesheet: str) -> str:
    lg = "en" if lang == "en" else "ru"
    return f"""<!DOCTYPE html>
<html lang="{lg}">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<script src="https://cdn.tailwindcss.com"></script>
<script>
  tailwind.config = {{
    theme: {{
      extend: {{
        fontFamily: {{ sans: ["ui-sans-serif","system-ui","Segoe UI","Roboto","sans-serif"] }}
      }}
    }}
  }};
</script>
<style>
{stylesheet}
</style>
</head>
<body class="bg-black text-slate-100 antialiased">
"""


def html_foot() -> str:
    return "</body></html>"
