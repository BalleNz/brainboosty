import sys
from pathlib import Path

# Добавь это в начало файла (сразу после импортов)
sys.path.insert(0, str(Path(__file__).parent.parent))

from brainboosty_hook_bot.src.config.config import settings
__all__ = ("settings",)
