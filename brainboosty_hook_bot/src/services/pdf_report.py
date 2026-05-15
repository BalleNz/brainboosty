from __future__ import annotations

from datetime import datetime
from pathlib import Path
from typing import Any

from fpdf import FPDF
from unidecode import unidecode

from brainboosty_hook_bot.src.config.config import settings
from brainboosty_hook_bot.src.locale import t
from brainboosty_hook_bot.src.services.brain_pdf import build_brain_map_html
from brainboosty_hook_bot.src.services.brain_region_keys import REGION_KEYS
from brainboosty_hook_bot.src.services.brain_pdf_playwright import render_html_to_pdf_bytes, tribute_qr_data_url

_DEJAVU_REGULAR = Path("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf")
_DEJAVU_BOLD = Path("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf")


def _ascii(s: str) -> str:
    return unidecode(s)


def _bmp_only(s: str) -> str:
    """DejaVu не покрывает суррогатные плоскости (эмодзи) — убираем, кириллица остаётся."""
    return "".join(c for c in s if ord(c) <= 0xFFFF)


def _register_dejavu_if_available(pdf: FPDF) -> None:
    """В Docker после fonts-dejavu-core — нормальная кириллица; иначе helvetica + транслитерация."""
    pdf._font_main = "helvetica"  # noqa: SLF001
    if not _DEJAVU_REGULAR.is_file() or not _DEJAVU_BOLD.is_file():
        return
    try:
        pdf.add_font("DejaVu", "", str(_DEJAVU_REGULAR))
        pdf.add_font("DejaVu", "B", str(_DEJAVU_BOLD))
        pdf._font_main = "DejaVu"  # noqa: SLF001
    except OSError:
        pass


def _pdf_text(pdf: FPDF, s: str) -> str:
    if getattr(pdf, "_font_main", "helvetica") == "DejaVu":
        return _bmp_only(s)
    return _ascii(s)


class BrainMapPDF(FPDF):
    def header(self) -> None:
        fam = getattr(self, "_font_main", "helvetica")
        self.set_font(fam, "B", 22)
        self.set_text_color(25, 25, 112)  # Dark blue
        self.cell(0, 12, _pdf_text(self, t(self.lang, "PDF_DOC_TITLE")), ln=True, align="C")
        self.ln(2)

    def footer(self) -> None:
        fam = getattr(self, "_font_main", "helvetica")
        self.set_y(-15)
        self.set_font(fam, "", 8)
        self.set_text_color(128, 128, 128)
        self.cell(0, 10, _pdf_text(self, t(self.lang, "PDF_FOOTER")), align="C")


async def build_brain_map_pdf(
    *,
    lang: str,
    scores: dict[str, float],
    test_variant: str,
    goal_keys: list[str],
    paid: bool = True,
    user_display_name: str = "",
    detail_json: dict[str, Any] | None = None,
) -> bytes:
    """Cyber-neon PDF (HTML + Playwright async). goal_keys зарезервированы для будущих блоков / совместимости API."""
    _ = goal_keys
    tribute_url = (settings.TRIBUTE_APP_URL or "").strip() or "https://t.me/tribute/app"
    qr = tribute_qr_data_url(tribute_url)
    html = build_brain_map_html(
        lang=lang,
        scores=scores,
        test_variant=test_variant,
        paid=paid,
        user_display_name=user_display_name,
        tribute_url=tribute_url,
        qr_data_url=qr,
        detail_json=detail_json,
    )
    return await render_html_to_pdf_bytes(html)


def build_shared_test_history_pdf(*, lang: str, rows: list[dict[str, Any]]) -> bytes:
    """PDF: история общих тестов и баллы по зонам (стиль как у карты мозга)."""
    pdf = BrainMapPDF(orientation="P", unit="mm", format="A4")
    _register_dejavu_if_available(pdf)
    pdf.lang = lang
    pdf.set_auto_page_break(auto=True, margin=20)
    pdf.add_page()
    fam = getattr(pdf, "_font_main", "helvetica")

    pdf.set_font(fam, "B", 14)
    pdf.set_text_color(100, 50, 200)
    pdf.cell(0, 8, _pdf_text(pdf, t(lang, "PDF_HISTORY_TITLE")), ln=True, align="C")
    pdf.ln(4)

    if not rows:
        pdf.set_font(fam, "", 11)
        pdf.set_text_color(0, 0, 0)
        pdf.multi_cell(0, 7, _pdf_text(pdf, t(lang, "TESTS_HISTORY_EMPTY")))
        out = pdf.output(dest="S")
        return bytes(out) if isinstance(out, (bytes, bytearray)) else out.encode("latin-1")

    pdf.set_font(fam, "", 10)
    pdf.set_text_color(0, 0, 0)

    for row in rows:
        kind = row.get("kind") or "daily"
        period = str(row.get("period_key") or "")
        completed_at: datetime = row["completed_at"]
        if completed_at.tzinfo is None:
            completed_at = completed_at.replace(tzinfo=None)
        dt_s = completed_at.strftime("%Y-%m-%d %H:%M UTC")
        kind_label = t(lang, "PDF_HISTORY_KIND_DAILY" if kind == "daily" else "PDF_HISTORY_KIND_WEEKLY")
        pdf.set_font(fam, "B", 11)
        pdf.set_text_color(25, 25, 112)
        pdf.multi_cell(0, 6, _pdf_text(pdf, f"{dt_s} — {t(lang, 'PDF_HISTORY_PERIOD', period=period, kind=kind_label)}"))
        pdf.ln(1)

        scores: dict[str, float] = row["scores"]
        deltas: dict[str, float] | None = row.get("deltas")
        pdf.set_font(fam, "", 10)
        pdf.set_text_color(0, 0, 0)
        for key in REGION_KEYS:
            name = t(lang, f"BRAIN_RL_{key}")
            value = float(scores.get(key, 0.0))
            if deltas and key in deltas:
                line = t(lang, "PDF_HISTORY_SCORE_LINE", name=name, value=value, delta=float(deltas[key]))
            else:
                line = t(lang, "PDF_HISTORY_SCORE_LINE_FIRST", name=name, value=value)
            pdf.multi_cell(0, 5, _pdf_text(pdf, line))
        pdf.ln(4)

    pdf.set_font(fam, "", 9)
    pdf.set_text_color(100, 100, 100)
    pdf.multi_cell(0, 5, _pdf_text(pdf, t(lang, "PDF_FOOTER")))
    out = pdf.output(dest="S")
    return bytes(out) if isinstance(out, (bytes, bytearray)) else out.encode("latin-1")
