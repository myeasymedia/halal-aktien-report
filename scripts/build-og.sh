#!/usr/bin/env bash
# Erzeugt assets/og-image.png aus scripts/og-source.html.
#
# WARUM ES DIESES SKRIPT GIBT: Das Vorschaubild ist das Erste, was
# jemand von der Seite sieht, wenn ein Link in WhatsApp oder
# Telegram geteilt wird. Aendert sich das Design der Seite und das
# Bild nicht, wirbt man mit einer Fassung, die es nicht mehr gibt.
#
# Voraussetzung: der lokale Server laeuft (die Quelle laedt die
# Schriften von http://localhost:4173).
set -euo pipefail
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$CHROME" --headless --disable-gpu --window-size=1200,630 --hide-scrollbars \
  --screenshot=/tmp/og-image.png "$(pwd)/scripts/og-source.html"
python3 - <<'PY'
from PIL import Image
Image.open("/tmp/og-image.png").convert("RGB") \
     .quantize(colors=192, method=Image.MEDIANCUT).convert("RGB") \
     .save("assets/og-image.png", "PNG", optimize=True)
print("assets/og-image.png neu erzeugt")
PY
