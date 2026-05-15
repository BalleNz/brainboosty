"""HTML → PDF через Playwright Async API (Chromium), совместимо с asyncio-ботом."""

from __future__ import annotations

import base64
import io
import logging
import tempfile
from pathlib import Path

logger = logging.getLogger(__name__)


def tribute_qr_data_url(url: str) -> str:
    import qrcode  # noqa: PLC0415

    qr = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_L, box_size=4, border=1)
    qr.add_data(url)
    qr.make(fit=True)
    img = qr.make_image(fill_color="white", back_color="#050508")
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    return "data:image/png;base64," + base64.b64encode(buf.getvalue()).decode("ascii")


async def render_html_to_pdf_bytes(html: str) -> bytes:
    from playwright.async_api import async_playwright  # noqa: PLC0415

    with tempfile.NamedTemporaryFile(
        mode="w",
        suffix=".html",
        delete=False,
        encoding="utf-8",
    ) as tmp:
        tmp.write(html)
        path = Path(tmp.name)
    pdf_bytes: bytes | None = None
    try:
        async with async_playwright() as p:
            # /dev/shm в Docker по умолчанию маленький — без флагов Chromium иногда даёт обрезанный/битый PDF.
            browser = await p.chromium.launch(
                headless=True,
                args=(
                    "--disable-dev-shm-usage",
                    "--no-sandbox",
                    "--disable-gpu",
                ),
            )
            try:
                page = await browser.new_page()
                await page.goto(path.resolve().as_uri(), wait_until="load", timeout=120_000)
                await page.wait_for_selector(".sheet", state="attached", timeout=90_000)
                await page.emulate_media(media="print")
                await page.wait_for_timeout(2500)
                try:
                    pdf_bytes = await page.pdf(
                        format="A4",
                        print_background=True,
                        prefer_css_page_size=False,
                        margin={"top": "0", "right": "0", "bottom": "0", "left": "0"},
                        tagged=False,
                    )
                except TypeError:
                    pdf_bytes = await page.pdf(
                        format="A4",
                        print_background=True,
                        prefer_css_page_size=False,
                        margin={"top": "0", "right": "0", "bottom": "0", "left": "0"},
                    )
            finally:
                await browser.close()
    except Exception:
        logger.exception("Playwright PDF rendering failed")
        raise
    finally:
        try:
            path.unlink(missing_ok=True)
        except OSError:
            pass
    if pdf_bytes is None:
        raise RuntimeError("Playwright returned no PDF bytes")
    if len(pdf_bytes) < 500 or not pdf_bytes.startswith(b"%PDF"):
        raise RuntimeError(f"Playwright returned invalid PDF ({len(pdf_bytes)} bytes, head={pdf_bytes[:32]!r})")
    return pdf_bytes
