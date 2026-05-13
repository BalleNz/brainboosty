"""PDF-отчёт по карте мозга (fpdf2 + ASCII-safe текст)."""

from __future__ import annotations

from fpdf import FPDF
from unidecode import unidecode

from brainboosty_hook_bot.src.locale import t
from brainboosty_hook_bot.src.services import assistant_service
from brainboosty_hook_bot.src.services.brain_map import recommendation_for_goals


def _ascii(s: str) -> str:
    return unidecode(s)


def build_brain_map_pdf(
    *,
    lang: str,
    scores: dict[str, float],
    test_variant: str,
    goal_keys: list[str],
) -> bytes:
    """Компактный PDF: зоны %, краткий контекст, рекомендация по целям."""
    pdf = FPDF(orientation="P", unit="mm", format="A4")
    pdf.set_auto_page_break(auto=True, margin=14)
    pdf.add_page()
    pdf.set_font("Helvetica", size=14)
    pdf.cell(0, 10, _ascii(t(lang, "PDF_DOC_TITLE")), ln=True)
    pdf.set_font("Helvetica", size=10)
    vlabel = "sexual" if test_variant == "sexual" else "development"
    pdf.cell(0, 6, _ascii(t(lang, "PDF_VARIANT", variant=vlabel)), ln=True)
    pdf.ln(2)
    pdf.set_font("Helvetica", "B", size=11)
    pdf.cell(0, 7, _ascii(t(lang, "PDF_SECTION_ZONES")), ln=True)
    pdf.set_font("Helvetica", size=10)
    for key in assistant_service.REGION_KEYS:
        name = t(lang, f"BRAIN_RL_{key}")
        val = scores.get(key, 0.0)
        line = f"  - {name}: {val:.1f}%"
        pdf.multi_cell(0, 5, _ascii(line))
    pdf.ln(2)
    pdf.set_font("Helvetica", "B", size=11)
    pdf.cell(0, 7, _ascii(t(lang, "PDF_SECTION_REC")), ln=True)
    pdf.set_font("Helvetica", size=10)
    rec = recommendation_for_goals(lang, goal_keys)
    pdf.multi_cell(0, 5, _ascii(rec))
    pdf.ln(4)
    pdf.set_font("Helvetica", size=8)
    pdf.multi_cell(0, 4, _ascii(t(lang, "PDF_FOOTER")))

    out = pdf.output(dest="S")
    if isinstance(out, str):
        return out.encode("latin-1")
    return bytes(out)
