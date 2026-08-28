# -*- coding: utf-8 -*-
"""
fetch-fonts.py
----------------
Laedt die Google-Schriften herunter und legt sie lokal ab.

WARUM LOKAL:
Ein Aufruf an fonts.gstatic.com uebertraegt die IP-Adresse jedes
Besuchers an einen Server in den USA -- ohne Einwilligung, bevor
die Seite ueberhaupt sichtbar ist. Das Landgericht Muenchen I
sah darin 2022 einen DSGVO-Verstoss (Az. 3 O 17493/20), danach
folgte eine Abmahnwelle. Lokal entfaellt das Problem, und die
Seite laedt schneller, weil eine Fremdverbindung wegfaellt.

Aufruf:  python3 scripts/fetch-fonts.py
"""

import os
import re
import urllib.request

CSS_URL = ("https://fonts.googleapis.com/css2"
            "?family=Fraunces:opsz,wght@9..144,400..600"
            "&family=Inter:wght@400;500;600;700"
            "&family=IBM+Plex+Mono:wght@400;500&display=swap")

# Ohne modernen User-Agent liefert Google das alte woff-Format.
UA = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/120.0 Safari/537.36")

ZIEL = "assets/fonts"
# Nur Latein: Die Seite ist deutschsprachig. Kyrillisch und
# Vietnamesisch waeren totes Gewicht -- rund ein halbes Megabyte.
ZEICHENSAETZE = ("latin", "latin-ext")


def main():
    anfrage = urllib.request.Request(CSS_URL, headers={"User-Agent": UA})
    css = urllib.request.urlopen(anfrage).read().decode("utf-8")
    os.makedirs(ZIEL, exist_ok=True)

    bloecke = re.findall(r"/\*\s*([\w\[\]-]+)\s*\*/\s*@font-face\s*\{(.*?)\}", css, re.S)
    # WICHTIG: Google liefert manche Familien als VARIABLE Schrift --
    # dieselbe Datei bedient dann mehrere Gewichte. Wird sie unter
    # dem Namen des ersten Gewichts gespeichert, zeigen die
    # @font-face-Regeln der anderen Gewichte ins Leere (404), und
    # der Browser rechnet sich Fett selbst aus. Deshalb merkt sich
    # diese Tabelle den DATEINAMEN je Adresse und gibt ihn erneut aus.
    datei_je_adresse = {}
    regeln = []

    for zeichensatz, block in bloecke:
        if zeichensatz not in ZEICHENSAETZE:
            continue
        familie = re.search(r"font-family:\s*'([^']+)'", block).group(1)
        gewicht = re.search(r"font-weight:\s*([^;]+);", block).group(1).strip()
        stil = re.search(r"font-style:\s*([^;]+);", block)
        stil = stil.group(1).strip() if stil else "normal"
        adresse = re.search(r"url\((https://[^)]+\.woff2)\)", block).group(1)
        bereich = re.search(r"unicode-range:\s*([^;]+);", block)

        if adresse not in datei_je_adresse:
            name = "%s-%s-%s.woff2" % (familie.replace(" ", ""),
                                        gewicht.replace(" ", ""), zeichensatz)
            urllib.request.urlretrieve(adresse, os.path.join(ZIEL, name))
            datei_je_adresse[adresse] = name

        regeln.append({
            "familie": familie, "gewicht": gewicht, "stil": stil,
            "datei": datei_je_adresse[adresse],
            "bereich": bereich.group(1).strip() if bereich else "",
        })

    kopf = ("/* Erzeugt von scripts/fetch-fonts.py -- nicht von Hand aendern.\n"
            "   Schriften liegen lokal, damit keine Besucher-IP an Google geht.\n"
            "   Siehe Kopf des Skripts. */\n")
    zeilen = [kopf]
    for r in regeln:
        zeilen.append("@font-face {")
        zeilen.append("  font-family: '%s';" % r["familie"])
        zeilen.append("  font-style: %s;" % r["stil"])
        zeilen.append("  font-weight: %s;" % r["gewicht"])
        zeilen.append("  font-display: swap;")
        zeilen.append("  src: url('../assets/fonts/%s') format('woff2');" % r["datei"])
        if r["bereich"]:
            zeilen.append("  unicode-range: %s;" % r["bereich"])
        zeilen.append("}\n")

    open("css/fonts.css", "w", encoding="utf-8").write("\n".join(zeilen))

    groesse = sum(os.path.getsize(os.path.join(ZIEL, n)) for n in os.listdir(ZIEL))
    print("Dateien: %d · Regeln: %d · %.0f KB"
          % (len(datei_je_adresse), len(regeln), groesse / 1024))

    # Gegenprobe: Zeigt jede Regel auf eine Datei, die es gibt?
    fehlend = [r["datei"] for r in regeln
               if not os.path.exists(os.path.join(ZIEL, r["datei"]))]
    print("Fehlende Dateien:", fehlend if fehlend else "keine")


if __name__ == "__main__":
    main()
