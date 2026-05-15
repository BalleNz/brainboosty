"""Стили печати A4 (cyber-neon grid)."""

PRINT_STYLESHEET = """
  @page { size: A4; margin: 0; }
  html, body { margin: 0; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  /* Вотермарк: между фоном листа и контентом (z-1), едва заметные диагональные полосы */
  .pdf-wm-sheet {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 155%;
    height: 155%;
    margin-left: -77.5%;
    margin-top: -77.5%;
    z-index: 1;
    pointer-events: none;
    overflow: hidden;
    opacity: 0.07;
    transform: rotate(-45deg);
    transform-origin: 50% 50%;
    font-size: 7px;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.14);
    white-space: nowrap;
    user-select: none;
  }
  .pdf-wm-row {
    position: absolute;
    left: -20%;
    width: 140%;
    line-height: 17px;
    height: 17px;
    background: repeating-linear-gradient(
      90deg,
      transparent 0px,
      transparent 11px,
      rgba(255, 255, 255, 0.018) 11px,
      rgba(255, 255, 255, 0.018) 12px
    );
  }
  .cta-golden-wrap {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: stretch;
  }
  .cta-golden-inner {
    width: 61.803%;
    max-width: 128mm;
    min-width: 0;
    margin-left: auto;
    margin-right: auto;
  }
  .pdf-cta-slide {
    padding-top: 4mm;
  }
  .sheet {
    width: 210mm;
    min-height: 297mm;
    page-break-after: always;
    break-after: page;
    box-sizing: border-box;
  }
  .sheet:last-child { page-break-after: auto; break-after: auto; }
  .sheet-premium {
    background: linear-gradient(165deg, #010108 0%, #04040f 35%, #080818 70%, #0a0a1c 100%);
    isolation: isolate;
  }
  .sheet-premium::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    background-image:
      radial-gradient(ellipse 100% 55% at 50% -12%, rgba(34, 211, 238, 0.11), transparent 58%),
      radial-gradient(ellipse 80% 70% at 80% 100%, rgba(124, 58, 237, 0.06), transparent 55%),
      linear-gradient(rgba(148, 163, 214, 0.07) 1px, transparent 1px),
      linear-gradient(90deg, rgba(148, 163, 214, 0.07) 1px, transparent 1px);
    background-size: auto, auto, 16px 16px, 16px 16px;
    background-position: center top, center bottom, 0 0, 0 0;
    opacity: 0.88;
  }
  .brain-float-top {
    display: block;
    max-height: 105mm;
    max-width: 155mm;
    width: auto;
    height: auto;
    object-fit: contain;
    filter: drop-shadow(0 0 22px rgba(34, 211, 238, 0.6)) drop-shadow(0 0 52px rgba(139, 92, 246, 0.55))
      drop-shadow(0 0 80px rgba(124, 58, 237, 0.38)) drop-shadow(0 18px 36px rgba(0, 0, 0, 0.72));
  }
  .brain-float-top-svg {
    filter: drop-shadow(0 0 18px rgba(34, 211, 238, 0.45)) drop-shadow(0 0 40px rgba(139, 92, 246, 0.35));
  }
  .cover-full-brain-hero {
    display: block;
    max-height: 118mm;
    max-width: min(175mm, 100%);
    width: auto;
    height: auto;
    object-fit: contain;
    filter: drop-shadow(0 0 28px rgba(34, 211, 238, 0.55)) drop-shadow(0 0 64px rgba(167, 139, 250, 0.42))
      drop-shadow(0 0 100px rgba(124, 58, 237, 0.3)) drop-shadow(0 20px 40px rgba(0, 0, 0, 0.65));
  }
  .cover-full-brain-hero-svg {
    max-height: 110mm;
    filter: drop-shadow(0 0 22px rgba(34, 211, 238, 0.5)) drop-shadow(0 0 48px rgba(167, 139, 250, 0.35));
  }
  .cover-hero-svg {
    filter: drop-shadow(0 0 22px rgba(34, 211, 238, 0.5)) drop-shadow(0 0 48px rgba(167, 139, 250, 0.35));
  }
  .cover-neon-card {
    box-shadow: 0 0 0 1px rgba(34, 211, 238, 0.25), 0 0 48px rgba(34, 211, 238, 0.18), 0 0 96px rgba(124, 58, 237, 0.12),
      0 24px 64px rgba(0, 0, 0, 0.55);
  }
  .neon-score-cover {
    filter: drop-shadow(0 0 32px rgba(34, 211, 238, 0.65)) drop-shadow(0 0 64px rgba(167, 139, 250, 0.45));
  }
  .neon-zone-title {
    text-shadow: 0 0 22px rgba(34, 211, 238, 0.45), 0 0 48px rgba(167, 139, 250, 0.28), 0 0 4px rgba(255,255,255,0.15);
  }
  .neon-cta-title {
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 0 36px rgba(34, 211, 238, 0.7), 0 0 80px rgba(167, 139, 250, 0.55), 0 0 120px rgba(124, 58, 237, 0.35),
      0 0 18px rgba(244, 114, 182, 0.25);
  }
  .qr-neon-wrap {
    box-shadow: 0 0 0 1px rgba(34, 211, 238, 0.45), 0 0 48px rgba(34, 211, 238, 0.45), 0 0 100px rgba(139, 92, 246, 0.35),
      0 0 140px rgba(124, 58, 237, 0.2);
  }
  .glass {
    background: linear-gradient(135deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02));
    border: 1px solid rgba(255,255,255,0.12);
    box-shadow: 0 20px 60px rgba(0,0,0,0.45);
    backdrop-filter: blur(14px);
  }
  /* Progress: один градиент на всю ширину трека, видимость через clip-path — цвет одинаковый при любой длине */
  .pdf-bar-track {
    position: relative;
    height: 1rem;
    border-radius: 9999px;
    overflow: hidden;
    background: rgba(30, 41, 59, 0.92);
    border: 1px solid rgba(34, 211, 238, 0.22);
    box-sizing: border-box;
  }
  .pdf-bar-gradient {
    position: absolute;
    inset: 0;
    border-radius: 9999px;
    background: linear-gradient(90deg, #22d3ee 0%, #5eead4 22%, #818cf8 55%, #a855f7 100%);
  }
  .pdf-bar-gradient--main {
    box-shadow: inset 0 0 0 1px rgba(255,255,255,0.12), 0 0 14px rgba(255,255,255,0.15),
      0 0 28px rgba(34, 211, 238, 0.75), 0 0 48px rgba(139, 92, 246, 0.45);
  }
  .pdf-bar-gradient--sub {
    box-shadow: inset 0 0 0 1px rgba(255,255,255,0.08), 0 0 12px rgba(34, 211, 238, 0.4),
      0 0 26px rgba(167, 139, 250, 0.35);
  }
  /* Chromium PDF: backdrop-filter и тяжёлые filter/drop-shadow дают пустые страницы или битый PDF в части вьюеров */
  @media print {
    .glass {
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
    }
    .brain-float-top,
    .cover-full-brain-hero {
      filter: none !important;
    }
    .brain-float-top-svg,
    .cover-full-brain-hero-svg,
    .cover-hero-svg {
      filter: none !important;
    }
    .neon-score-cover {
      filter: none !important;
    }
    .neon-zone-title {
      text-shadow: 0 0 8px rgba(34, 211, 238, 0.22), 0 0 14px rgba(167, 139, 250, 0.18), 0 0 2px rgba(255,255,255,0.08);
    }
    .neon-cta-title {
      text-shadow: 0 0 10px rgba(34, 211, 238, 0.35), 0 0 22px rgba(167, 139, 250, 0.25);
      padding-top: 0.15em;
    }
    .qr-neon-wrap {
      box-shadow: 0 0 0 1px rgba(34, 211, 238, 0.35) !important;
    }
    .cover-neon-card {
      box-shadow: 0 0 0 1px rgba(34, 211, 238, 0.22), 0 12px 32px rgba(0, 0, 0, 0.35) !important;
    }
    .pdf-bar-gradient--main,
    .pdf-bar-gradient--sub {
      box-shadow: inset 0 0 0 1px rgba(255,255,255,0.1), 0 0 8px rgba(34, 211, 238, 0.3) !important;
    }
  }
"""
