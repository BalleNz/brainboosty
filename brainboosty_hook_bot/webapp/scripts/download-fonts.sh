#!/usr/bin/env bash
# Локальные woff2 в public/fonts/ (Space Grotesk). Satoshi — Fontshare в index.html.
# macOS без wget: используйте bash webapp/scripts/download-fonts.sh
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT/public/fonts"
mkdir -p space-grotesk

fetch() {
  if command -v curl >/dev/null 2>&1; then
    curl -fsSL "$1" -o "$2"
  elif command -v wget >/dev/null 2>&1; then
    wget -q "$1" -O "$2"
  else
    echo "Нужен curl или wget"
    exit 1
  fi
}

# Space Grotesk — прямых woff2 с gstatic (архив fonts.google.com через wget часто отдаёт HTML)
SG="https://fonts.gstatic.com/s/spacegrotesk/v22"
fetch "${SG}/V8mDoQDjQSkFtoMM3T6r8E7mPbF4Cw.woff2" "space-grotesk/latin.woff2"
fetch "${SG}/V8mDoQDjQSkFtoMM3T6r8E7mPb94C-s0.woff2" "space-grotesk/latin-ext.woff2"
fetch "${SG}/V8mDoQDjQSkFtoMM3T6r8E7mPb54C-s0.woff2" "space-grotesk/vietnamese.woff2"

echo "OK → $ROOT/public/fonts/"
