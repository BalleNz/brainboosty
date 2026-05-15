"""Путь к фото автора для «О проекте» / лендинга."""

from __future__ import annotations

from pathlib import Path

from brainboosty_hook_bot.src.config.config import settings

_PACKAGE_ROOT = Path(__file__).resolve().parents[2]


def package_root() -> Path:
    return _PACKAGE_ROOT


def resolve_about_photo_path() -> Path | None:
    custom = (settings.ABOUT_PHOTO_PATH or "").strip()
    if custom:
        p = Path(custom).expanduser()
        if not p.is_absolute():
            p = package_root() / p
        return p if p.is_file() else None

    names = (
        "author.JPG",
        "author.jpg",
        "author.jpeg",
        "author.JPEG",
        "author.png",
        "author.PNG",
        "author.webp",
        "about.jpg",
        "about.png",
    )
    assets_dir = package_root() / "assets"
    for name in names:
        candidate = assets_dir / name
        if candidate.is_file():
            return candidate

    for sub in (Path("images"), Path("src") / "images"):
        for name in names:
            if name.startswith("about."):
                continue
            candidate = package_root() / sub / name
            if candidate.is_file():
                return candidate

    return None
