"""Корни файловой системы для PDF-ассетов (относительно пакета brainboosty_hook_bot)."""

from __future__ import annotations

from pathlib import Path


def package_root() -> Path:
    """Корень пакета `brainboosty_hook_bot` (родитель `src/`)."""
    # .../src/services/brain_pdf/paths.py → parents[3] = brainboosty_hook_bot
    return Path(__file__).resolve().parents[3]


def pdf_assets_dir() -> Path:
    return package_root() / "assets" / "pdf"


def brain_sections_dir() -> Path:
    return package_root() / "assets" / "brain-sections"


def all_assets_dir() -> Path:
    return package_root() / "assets"
