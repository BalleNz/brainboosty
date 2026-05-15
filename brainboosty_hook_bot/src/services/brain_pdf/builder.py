"""Сборка HTML документа карты мозга для Playwright → PDF."""

from __future__ import annotations

import html

from brainboosty_hook_bot.src.locale import t
from brainboosty_hook_bot.src.services.brain_pdf.assets import cover_hero_image_html, read_pdf_svg, section_brain_visual_html
from brainboosty_hook_bot.src.services.brain_pdf.fragments import bar_block, html_foot, html_head, sheet_close, sheet_open
from brainboosty_hook_bot.src.services.brain_pdf.styles import PRINT_STYLESHEET
from brainboosty_hook_bot.src.services.brain_pdf_content import (
    inter_region_connectivity_lines,
    neuro_score,
    region_recommendation_bullets,
    submetrics_for_region,
)
from brainboosty_hook_bot.src.services.brain_region_keys import REGION_KEYS


def _zone_page_title(lang: str, region_key: str) -> str:
    k = f"PDF_BRAIN_PAGE_{region_key}"
    s = t(lang, k)
    if s.startswith("PDF_BRAIN_PAGE_"):
        return t(lang, f"BRAIN_RL_{region_key}")
    return s


def build_brain_map_html(
    *,
    lang: str,
    scores: dict[str, float],
    test_variant: str,
    paid: bool,
    user_display_name: str,
    tribute_url: str,
    qr_data_url: str,
    detail_json: dict | None = None,
) -> str:
    is_sexual = test_variant == "sexual"
    logo = read_pdf_svg("logo.svg")
    ns = neuro_score(scores)
    name = html.escape((user_display_name or "").strip() or ("User" if lang == "en" else "Гость"))
    cover_sub = html.escape(t(lang, "PDF_BRAIN_COVER_LINE"))
    score_lbl = html.escape(t(lang, "PDF_BRAIN_SCORE_LABEL"))

    parts: list[str] = [html_head(lang, stylesheet=PRINT_STYLESHEET)]

    # --- Cover ---
    parts.append(sheet_open())
    parts.append(f'<div class="flex justify-center mb-5 drop-shadow-[0_0_24px_rgba(34,211,238,0.35)]">{logo}</div>')
    parts.append('<div class="w-full flex justify-center mb-4 px-2">')
    parts.append(cover_hero_image_html())
    parts.append("</div>")
    parts.append('<div class="glass rounded-3xl p-8 mb-6 cover-neon-card border border-cyan-500/20">')
    parts.append(
        '<p class="text-center text-sm uppercase tracking-[0.4em] text-cyan-200 mt-2 font-semibold '
        'drop-shadow-[0_0_16px_rgba(34,211,238,0.55)]">'
        f"{html.escape(t(lang, 'PDF_BRAIN_HERO_BRAIN'))}</p>"
    )
    parts.append(
        f'<h1 class="text-center text-3xl font-bold mt-6 text-white drop-shadow-[0_0_20px_rgba(167,139,250,0.25)]">'
        f"{name}</h1>"
    )
    parts.append(
        f'<p class="text-center text-slate-300/95 mt-3 text-[15px] leading-relaxed max-w-md mx-auto tracking-wide">'
        f"{cover_sub}</p>"
    )
    parts.append('<div class="mt-10 flex flex-col items-center justify-center">')
    parts.append(
        f'<p class="text-cyan-100/90 text-sm mb-2 font-medium tracking-wide '
        f'drop-shadow-[0_0_10px_rgba(34,211,238,0.35)]">{score_lbl}</p>'
    )
    parts.append(
        '<div class="text-7xl font-black bg-gradient-to-r from-cyan-200 via-violet-300 to-fuchsia-300 '
        f'bg-clip-text text-transparent neon-score-cover">{ns:.1f}</div>'
    )
    parts.append("</div>")
    conn = inter_region_connectivity_lines(lang, detail_json)
    if conn:
        parts.append('<div class="mt-6 text-left text-xs text-slate-300/90 max-w-lg mx-auto space-y-1.5">')
        parts.append(f'<p class="font-semibold text-cyan-100/90 mb-1">{html.escape(t(lang, "PDF_BRAIN_CONNECTIVITY_TITLE"))}</p>')
        for line in conn:
            parts.append(f"<p>• {html.escape(line)}</p>")
        parts.append("</div>")
    parts.append("</div>")
    parts.append(f'<p class="text-center text-[11px] text-slate-500 mt-6">{html.escape(t(lang, "PDF_FOOTER"))}</p>')
    parts.append(sheet_close())

    # --- Region pages ---
    main_bar_caption = t(lang, "PDF_BRAIN_ZONE_LEVEL")
    for key in REGION_KEYS:
        main = float(scores.get(key, 0.0))
        title = html.escape(_zone_page_title(lang, key))
        brain_vis = section_brain_visual_html(key)
        bullets = region_recommendation_bullets(
            lang, key, is_sexual, main, paid=paid, detail_json=detail_json if isinstance(detail_json, dict) else None
        )
        subs = submetrics_for_region(lang, key, main, detail_json=detail_json if isinstance(detail_json, dict) else None)

        parts.append(sheet_open())
        parts.append(
            '<div class="flex flex-col items-center w-full max-w-3xl mx-auto pt-1 pb-6">'
        )
        parts.append(f'<div class="w-full flex justify-center shrink-0 mb-2">{brain_vis}</div>')
        parts.append(
            f'<h2 class="text-center text-[26px] font-bold text-white mb-2 leading-tight w-full px-2">'
            f"{title}</h2>"
        )
        parts.append(
            f'<p class="text-center text-sm text-cyan-200 font-medium mb-2 drop-shadow-[0_0_12px_rgba(34,211,238,0.35)]">'
            f'{html.escape(t(lang, "PDF_BRAIN_PROGRESS_MAIN", pct=f"{main:.1f}"))}</p>'
        )
        parts.append('<div class="w-full max-w-xl mx-auto">')
        parts.append(bar_block(main_bar_caption or "Progress", main, glow=True))
        for sub_label, sub_val in subs:
            parts.append(bar_block(sub_label, sub_val, glow=False))
        parts.append("</div>")
        parts.append('<div class="glass rounded-2xl p-4 mt-4 w-full max-w-xl mx-auto">')
        parts.append(
            f'<p class="text-base font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-100 via-cyan-200 '
            f'to-violet-300 mb-3 tracking-tight drop-shadow-[0_0_18px_rgba(34,211,238,0.45)] '
            f'drop-shadow-[0_0_28px_rgba(167,139,250,0.3)]">{html.escape(t(lang, "PDF_BRAIN_REC_TITLE"))}</p>'
        )
        parts.append('<ul class="list-disc pl-5 space-y-2 text-sm text-slate-200 leading-relaxed">')
        for b in bullets:
            parts.append(f"<li>{html.escape(b)}</li>")
        parts.append("</ul></div></div>")
        parts.append(sheet_close())

    # --- CTA (пропорции ~ золотое сечение: узкий столбец, воздух по краям) ---
    parts.append(sheet_open())
    parts.append('<div class="cta-golden-wrap py-6 pdf-cta-slide">')
    parts.append('<div class="cta-golden-inner flex flex-col items-center text-center">')
    parts.append(
        '<div class="mb-3 rounded-full px-5 py-1.5 border border-cyan-400/30 bg-cyan-500/10 text-xs font-bold '
        'uppercase tracking-[0.35em] text-cyan-100 drop-shadow-[0_0_12px_rgba(34,211,238,0.5)]">'
        f"{html.escape(t(lang, 'PDF_BRAIN_CTA_BADGE'))}</div>"
    )
    parts.append(
        f'<h2 class="text-4xl md:text-5xl font-black bg-gradient-to-r from-cyan-100 via-violet-200 to-fuchsia-300 '
        f'bg-clip-text text-transparent mb-4 neon-cta-title leading-[1.12] mt-3">'
        f'{html.escape(t(lang, "PDF_BRAIN_CTA_TITLE"))}</h2>'
    )
    parts.append(
        f'<p class="text-slate-100 w-full text-base md:text-lg mb-7 leading-[1.55] font-medium '
        f'drop-shadow-[0_0_12px_rgba(15,23,42,0.8)]">{html.escape(t(lang, "PDF_BRAIN_CTA_SUB"))}</p>'
    )
    parts.append(
        f'<div class="glass rounded-[2rem] p-7 mb-5 qr-neon-wrap border border-cyan-400/25 w-full flex justify-center">'
        f'<img src="{qr_data_url}" alt="QR" class="w-72 h-72 md:w-80 md:h-80 mx-auto '
        f'drop-shadow-[0_0_24px_rgba(34,211,238,0.4)]"/>'
        f"</div>"
    )
    parts.append(
        f'<p class="text-center text-[11px] text-slate-400/95 leading-relaxed tracking-wide '
        f'break-all w-full mt-1">{html.escape(tribute_url)}</p>'
    )
    parts.append("</div></div>")
    parts.append(sheet_close())

    parts.append(html_foot())
    return "\n".join(parts)
