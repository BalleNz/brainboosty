"""Загрузка PNG/SVG для обложки и страниц зон."""

from __future__ import annotations

import base64
import io
import logging
from pathlib import Path

from brainboosty_hook_bot.src.services.brain_pdf.cover_svg import COVER_HERO_FALLBACK_SVG
from brainboosty_hook_bot.src.services.brain_pdf.paths import all_assets_dir, brain_sections_dir, pdf_assets_dir
from brainboosty_hook_bot.src.services.brain_pdf.region_png_map import REGION_SECTION_PNG

logger = logging.getLogger(__name__)

_COVER_HERO_PNG_CANDIDATES: tuple[Path, ...] = (
    all_assets_dir() / "brainboosty_logo.png",
    brain_sections_dir() / "cover-hero.png",
)


def _png_bytes_resized(path: Path, *, max_edge_px: int) -> bytes | None:
    """Уменьшает PNG перед base64 — иначе в PDF уходят мегапиксели и размер файла раздувается."""
    if not path.is_file():
        return None
    try:
        from PIL import Image  # noqa: PLC0415
    except ImportError:
        return path.read_bytes()
    try:
        with Image.open(path) as im:
            im = im.convert("RGBA")
            w, h = im.size
            if max(w, h) > max_edge_px:
                scale = max_edge_px / float(max(w, h))
                nw, nh = max(1, int(w * scale)), max(1, int(h * scale))
                im = im.resize((nw, nh), Image.Resampling.LANCZOS)
            buf = io.BytesIO()
            im.save(buf, format="PNG", optimize=True)
            return buf.getvalue()
    except OSError as exc:
        logger.warning("PDF asset PNG resize failed %s: %s", path, exc)
        return path.read_bytes()


def png_data_url(path: Path, *, max_edge_px: int = 900) -> str | None:
    if not path.is_file():
        return None
    raw = _png_bytes_resized(path, max_edge_px=max_edge_px)
    if raw is None:
        return None
    b64 = base64.standard_b64encode(raw).decode("ascii")
    return f"data:image/png;base64,{b64}"


def read_pdf_svg(relative_under_pdf_assets: str) -> str:
    p = pdf_assets_dir() / relative_under_pdf_assets
    if p.is_file():
        return p.read_text(encoding="utf-8")
    return "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'><text x='10' y='60' fill='#64748b'>BB</text></svg>"


def read_region_fallback_svg(region_key: str) -> str:
    p = brain_sections_dir() / f"{region_key}.svg"
    if p.is_file():
        return p.read_text(encoding="utf-8")
    return read_pdf_svg(f"regions/{region_key}.svg")


def brain_section_png_data_url(region_key: str) -> str | None:
    fn = REGION_SECTION_PNG.get(region_key)
    if not fn:
        return None
    return png_data_url(brain_sections_dir() / fn, max_edge_px=720)


def section_brain_visual_html(region_key: str) -> str:
    url = brain_section_png_data_url(region_key)
    if url:
        return f'<img src="{url}" alt="" class="brain-float-top mx-auto"/>'
    return f'<div class="brain-float-top-svg mx-auto w-full max-w-md">{read_region_fallback_svg(region_key)}</div>'


def brand_logo_html(*, max_edge_px: int = 480) -> str:
    """Логотип brainboosty для PDF/HTML отчётов."""
    path = all_assets_dir() / "brainboosty_logo.png"
    url = png_data_url(path, max_edge_px=max_edge_px)
    if url:
        return (
            f'<img src="{url}" alt="brainboosty" class="mx-auto block" '
            f'style="max-height:52px;width:auto;object-fit:contain"/>'
        )
    return read_pdf_svg("logo.svg")


def cover_hero_image_html() -> str:
    for candidate in _COVER_HERO_PNG_CANDIDATES:
        url = png_data_url(candidate, max_edge_px=1000)
        if url:
            return f'<img src="{url}" alt="" class="cover-full-brain-hero mx-auto"/>'
    return (
        f'<div class="cover-full-brain-hero-svg mx-auto w-full max-w-2xl">{COVER_HERO_FALLBACK_SVG}</div>'
    )
