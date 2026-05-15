"""Обратная совместимость: раньше `brain_pdf_html.build_brain_map_html`."""

from brainboosty_hook_bot.src.services.brain_pdf.builder import build_brain_map_html

__all__ = ("build_brain_map_html",)
