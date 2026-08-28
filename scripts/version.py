# -*- coding: utf-8 -*-
"""
version.py
------------
Haengt an jede CSS-, JS- und Datendatei im HTML eine Version aus
ihrem Inhalt: style.css?v=a3f9c21b

WARUM DAS NOETIG IST:
Browser halten diese Dateien tagelang im Zwischenspeicher. Ohne
Version sieht ein Besucher nach einem Update weiter die alte
Fassung -- und man sucht Fehler, die es laengst nicht mehr gibt.
Genau das ist beim Bau dieser Seite zweimal passiert.

Aus dem INHALT und nicht aus dem Datum: Aendert sich nichts,
bleibt die Adresse gleich und der Zwischenspeicher gueltig. Nur
was sich wirklich geaendert hat, wird neu geladen.

Aufruf (im Projektverzeichnis):
    python3 scripts/version.py
"""

import glob
import hashlib
import os
import re

# (\.\./)* statt (\.\./)? -- die Wissensseiten liegen zwei Ebenen tief.
MUSTER = re.compile(r'(href|src)="((?:\.\./)*(?:css|js|data)/[^"]+)"')


def fingerabdruck(pfad: str) -> str:
    with open(pfad, "rb") as f:
        return hashlib.md5(f.read()).hexdigest()[:8]


def versioniere(html_pfad: str) -> int:
    inhalt = open(html_pfad, encoding="utf-8").read()
    treffer = [0]

    def ersetze(m):
        attr, datei = m.group(1), m.group(2)
        rein = datei.split("?")[0]
        lokal = os.path.normpath(os.path.join(os.path.dirname(html_pfad), rein))
        if not os.path.exists(lokal):
            print(f"  WARNUNG: {rein} fehlt (in {html_pfad})")
            return m.group(0)
        treffer[0] += 1
        return '%s="%s?v=%s"' % (attr, rein, fingerabdruck(lokal))

    open(html_pfad, "w", encoding="utf-8").write(MUSTER.sub(ersetze, inhalt))
    return treffer[0]


def main():
    seiten = ["index.html"] + sorted(glob.glob("pages/**/*.html", recursive=True))
    gesamt = 0
    for seite in seiten:
        n = versioniere(seite)
        gesamt += n
        print(f"  {seite}: {n} Dateien")
    print(f"Fertig: {gesamt} Verweise versioniert.")


if __name__ == "__main__":
    main()
