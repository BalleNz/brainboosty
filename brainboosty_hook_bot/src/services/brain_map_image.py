"""PNG-инфографика «карта мозга» (полная / урезанная для бесплатного режима)."""

from __future__ import annotations

import os
from io import BytesIO

from PIL import Image, ImageDraw, ImageFont

from brainboosty_hook_bot.src.locale import t
from brainboosty_hook_bot.src.services import assistant_service


_FONT_CANDIDATES = (
    "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    "/Library/Fonts/Arial Unicode.ttf",
    "/System/Library/Fonts/Supplemental/Arial Unicode.ttf",
    "/System/Library/Fonts/Supplemental/Arial.ttf",
)


def _font(size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    for path in _FONT_CANDIDATES:
        if os.path.isfile(path):
            try:
                return ImageFont.truetype(path, size)
            except OSError:
                continue
    return ImageFont.load_default()


def _bar_color(score: float) -> tuple[int, int, int]:
    if score >= 80:
        return (39, 174, 96)
    if score >= 55:
        return (243, 156, 18)
    return (231, 76, 60)


def _draw_label(draw: ImageDraw.ImageDraw, xy: tuple[int, int], text: str, font: ImageFont.ImageFont, fill: tuple[int, int, int]) -> None:
    try:
        draw.text(xy, text, font=font, fill=fill)
    except OSError:
        from unidecode import unidecode

        draw.text(xy, unidecode(text), font=font, fill=fill)


def build_brain_map_infographic_png(
    scores: dict[str, float],
    lang: str,
    *,
    paid: bool,
    test_variant: str,
) -> bytes:
    """
    Полная версия: все 6 зон с процентами.
    Бесплатная: 4 зоны с процентами (слабые первые), 2 зоны без цифр — «заблокировано».
    """
    w, h = 920, 1080
    img = Image.new("RGB", (w, h), (248, 249, 251))
    draw = ImageDraw.Draw(img)
    title_font = _font(26)
    label_font = _font(18)
    small_font = _font(15)

    subtitle = t(lang, "PDF_VARIANT", variant="sexual" if test_variant == "sexual" else "development")
    title = t(lang, "BRAIN_MAP_PHOTO_TITLE")
    _draw_label(draw, (40, 28), title, title_font, (33, 37, 41))
    _draw_label(draw, (40, 68), subtitle, small_font, (90, 98, 104))

    y = 120
    row_h = 118
    bar_left = 40
    bar_max_w = 560
    bar_h = 34

    if paid:
        keys = list(assistant_service.REGION_KEYS)
    else:
        sorted_pairs = sorted(scores.items(), key=lambda x: x[1])
        keys = [k for k, _ in sorted_pairs]

    for i, key in enumerate(keys):
        name = t(lang, f"BRAIN_RL_{key}")
        score = float(scores.get(key, 0.0))
        locked = (not paid) and i >= 4

        _draw_label(draw, (bar_left, y + 4), name, label_font, (55, 65, 75))
        y_bar = y + 44
        draw.rectangle((bar_left, y_bar, bar_left + bar_max_w, y_bar + bar_h), fill=(220, 224, 230))
        if locked:
            fill_w = int(bar_max_w * 0.22)
            draw.rectangle((bar_left, y_bar, bar_left + fill_w, y_bar + bar_h), fill=(180, 185, 195))
            lock_txt = t(lang, "BRAIN_MAP_PHOTO_LOCKED")
            _draw_label(draw, (bar_left + bar_max_w + 20, y_bar + 6), lock_txt, label_font, (120, 120, 130))
        else:
            frac = max(0.0, min(1.0, score / 100.0))
            fill_w = max(8, int(bar_max_w * frac))
            col = _bar_color(score)
            draw.rectangle((bar_left, y_bar, bar_left + fill_w, y_bar + bar_h), fill=col)
            pct = f"{score:.1f}%"
            _draw_label(draw, (bar_left + bar_max_w + 20, y_bar + 6), pct, label_font, (33, 37, 41))

        y += row_h

    if not paid:
        hint = t(lang, "BRAIN_MAP_PHOTO_TEASER_HINT")
        _draw_label(draw, (40, y + 8), hint, small_font, (120, 120, 130))

    buf = BytesIO()
    img.save(buf, format="PNG", optimize=True)
    return buf.getvalue()
