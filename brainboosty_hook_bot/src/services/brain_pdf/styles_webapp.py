"""Shared cyber-neon CSS fragments for Web App (source of truth: styles.py)."""

from brainboosty_hook_bot.src.services.brain_pdf.styles import PRINT_STYLESHEET

# Re-export for tooling / future SSR; Web App bundle uses webapp/src/styles/cyber-neon.css
WEBAPP_SCREEN_EXTRA = """
  .bb-app { min-height: 100dvh; }
"""

WEBAPP_STYLESHEET = PRINT_STYLESHEET + WEBAPP_SCREEN_EXTRA
