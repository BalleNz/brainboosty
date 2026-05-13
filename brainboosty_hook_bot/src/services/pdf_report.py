from __future__ import annotations
from fpdf import FPDF
from unidecode import unidecode

from brainboosty_hook_bot.src.locale import t
from brainboosty_hook_bot.src.services import assistant_service
from brainboosty_hook_bot.src.services.brain_map import recommendation_for_goals


def _ascii(s: str) -> str:
    return unidecode(s)


class BrainMapPDF(FPDF):
    def header(self):
        self.set_font("Helvetica", "B", 22)
        self.set_text_color(25, 25, 112)  # Dark blue
        self.cell(0, 12, _ascii(t(self.lang, "PDF_DOC_TITLE")), ln=True, align="C")
        self.ln(2)

    def footer(self):
        self.set_y(-15)
        self.set_font("Helvetica", size=8)
        self.set_text_color(128, 128, 128)
        self.cell(0, 10, _ascii(t(self.lang, "PDF_FOOTER")), align="C")


def build_brain_map_pdf(
    *,
    lang: str,
    scores: dict[str, float],
    test_variant: str,
    goal_keys: list[str],
) -> bytes:
    """КРАСИВЫЙ премиум PDF с прогресс-барами"""
    pdf = BrainMapPDF(orientation="P", unit="mm", format="A4")
    pdf.lang = lang
    pdf.set_auto_page_break(auto=True, margin=20)
    pdf.add_page()

    # === ШАПКА ===
    vlabel = "Сексуальная карта мозга 🔥" if test_variant == "sexual" else "Карта развития мозга 🧠"
    pdf.set_font("Helvetica", "B", 14)
    pdf.set_text_color(100, 50, 200)  # Фиолетовый акцент
    pdf.cell(0, 8, _ascii(vlabel), ln=True, align="C")
    pdf.ln(8)

    # === ЗОНЫ МОЗГА ===
    pdf.set_font("Helvetica", "B", 13)
    pdf.set_text_color(25, 25, 112)
    pdf.cell(0, 10, _ascii(t(lang, "PDF_SECTION_ZONES")), ln=True)
    pdf.ln(2)

    pdf.set_font("Helvetica", size=11)
    for key in assistant_service.REGION_KEYS:
        name = t(lang, f"BRAIN_RL_{key}")
        value = scores.get(key, 0.0)
        
        # Название + процент
        pdf.set_text_color(0, 0, 0)
        pdf.cell(0, 8, f"{name}: {value:.1f}%", ln=True)
        
        # Прогресс-бар
        bar_width = 170
        fill_width = (value / 100) * bar_width
        
        pdf.set_fill_color(100, 50, 200)      # Фиолетовый
        pdf.rect(10, pdf.get_y(), fill_width, 6, "F")           # Заполненная часть
        pdf.set_fill_color(230, 230, 230)     # Серый фон
        pdf.rect(10 + fill_width, pdf.get_y(), bar_width - fill_width, 6, "F")
        
        pdf.ln(10)

    # === РЕКОМЕНДАЦИИ ===
    pdf.ln(5)
    pdf.set_font("Helvetica", "B", 13)
    pdf.set_text_color(25, 25, 112)
    pdf.cell(0, 10, _ascii(t(lang, "PDF_SECTION_REC")), ln=True)
    
    pdf.set_font("Helvetica", size=11)
    pdf.set_text_color(0, 0, 0)
    rec = recommendation_for_goals(lang, goal_keys)
    pdf.multi_cell(0, 6, _ascii(rec))

    # Финальный футер
    pdf.ln(10)
    pdf.set_font("Helvetica", size=9)
    pdf.set_text_color(100, 100, 100)
    pdf.multi_cell(0, 5, _ascii(t(lang, "PDF_FOOTER")))

    out = pdf.output(dest="S")
    return bytes(out) if isinstance(out, (bytes, bytearray)) else out.encode("latin-1")