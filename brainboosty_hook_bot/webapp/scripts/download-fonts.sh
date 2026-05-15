#!/usr/bin/env bash
# Локальные шрифты в public/fonts/ (Inter + Space Grotesk woff2).
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

# Inter (rsms/inter)
fetch "https://raw.githubusercontent.com/rsms/inter/master/docs/font-files/Inter-Regular.woff2" "Inter-Regular.woff2"
fetch "https://raw.githubusercontent.com/rsms/inter/master/docs/font-files/Inter-Medium.woff2" "Inter-Medium.woff2"
fetch "https://raw.githubusercontent.com/rsms/inter/master/docs/font-files/Inter-SemiBold.woff2" "Inter-SemiBold.woff2"
fetch "https://raw.githubusercontent.com/rsms/inter/master/docs/font-files/Inter-Bold.woff2" "Inter-Bold.woff2"

# Space Grotesk — прямых woff2 с gstatic (архив fonts.google.com через wget часто отдаёт HTML)
SG="https://fonts.gstatic.com/s/spacegrotesk/v22"
fetch "${SG}/V8mDoQDjQSkFtoMM3T6r8E7mPbF4Cw.woff2" "space-grotesk/latin.woff2"
fetch "${SG}/V8mDoQDjQSkFtoMM3T6r8E7mPb94C-s0.woff2" "space-grotesk/latin-ext.woff2"
fetch "${SG}/V8mDoQDjQSkFtoMM3T6r8E7mPb54C-s0.woff2" "space-grotesk/vietnamese.woff2"

echo "OK → $ROOT/public/fonts/"
