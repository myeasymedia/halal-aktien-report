# -*- coding: utf-8 -*-
"""
build-recht.py
----------------
Erzeugt Impressum und Datenschutzerklaerung unter pages/recht/.

WICHTIG: Das sind sorgfaeltig gebaute Standardtexte, keine
Rechtsberatung. Sie decken den ueblichen Fall einer Website ohne
Cookies, ohne Tracking und ohne Formular ab -- genau das trifft
auf diese Seite zu (geprueft am 25.08.2026: keine Cookies, kein
localStorage, keine Formulare, keine Fremdinhalte).

Vor dem Livegang von einem Anwalt gegenlesen lassen.

Aufruf:  python3 scripts/build-recht.py
"""

import os

ZIEL = "pages/recht"

BETREIBER = {
    "name": "Dennis Ramani",
    "zusatz": "c/o Smarvo 116",
    "strasse": "Südstraße 31",
    "ort": "47475 Kamp-Lintfort",
    "land": "Deutschland",
    # NOCH EINZUTRAGEN -- eine E-Mail-Adresse ist nach § 5 DDG
    # Pflicht ("schnelle elektronische Kontaktaufnahme").
    "email": "info@barakah-finance.de",
}

VORLAGE = """<!DOCTYPE html>
<html lang="de" class="no-js">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{titel} | Barakah Finance</title>
<meta name="description" content="{beschreibung}">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://joyful-dasik-cdf792.netlify.app/pages/recht/{datei}">
<meta name="theme-color" content="#070d0c">
<link rel="stylesheet" href="../../css/fonts.css">
<link rel="stylesheet" href="../../css/style.css">
<script>document.documentElement.classList.remove('no-js');</script>
</head>
<body>
<header id="shell-header"></header>

<section class="page-head">
  <div class="wrap">
    <a class="back" href="../../index.html"><span>&#8592;</span> Startseite</a>
    <span class="eyebrow">Rechtliches</span>
    <h1>{h1}</h1>
  </div>
</section>

<section class="section" style="padding-top:0">
  <div class="wrap">
    <article class="article recht">
      {inhalt}
    </article>
  </div>
</section>

<footer id="shell-footer"></footer>
<script src="../../data/companies.js"></script>
<script src="../../data/posts.js"></script>
<script src="../../js/shell.js"></script>
<script src="../../js/render.js"></script>
<script src="../../js/animate.js"></script>
</body>
</html>
"""

IMPRESSUM = """
<h2>Angaben gemäß § 5 DDG</h2>
<div class="article-body">
<p class="anschrift">{name}<br>{zusatz}<br>{strasse}<br>{ort}<br>{land}</p>
</div>

<h2>Kontakt</h2>
<div class="article-body">
<p>E-Mail: <a href="mailto:{email}">{email}</a></p>
</div>

<h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
<div class="article-body">
<p>{name}, Anschrift wie oben.</p>
</div>

<h2>Streitbeilegung</h2>
<div class="article-body">
<p>Die Europäische Kommission stellt eine Plattform zur
Online-Streitbeilegung bereit:
<a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener">
ec.europa.eu/consumers/odr</a>.</p>
<p>Wir sind weder bereit noch verpflichtet, an
Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
teilzunehmen.</p>
</div>

<h2>Haftung für Inhalte</h2>
<div class="article-body">
<p>Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den
allgemeinen Gesetzen verantwortlich. Wir sind jedoch nicht verpflichtet,
übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach
Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.</p>
<p>Sämtliche Inhalte dieser Website sind Marktbeobachtung und allgemeine
Information. Sie stellen <strong>keine Anlageberatung, keine
Anlagevermittlung und keine Kauf- oder Verkaufsempfehlung</strong> dar. Die
Halal-Einordnung ist eine Heuristik und ersetzt kein zertifiziertes
Sharia-Gutachten und keine religiöse Rechtsauskunft.</p>
</div>

<h2>Haftung für Links</h2>
<div class="article-body">
<p>Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte
wir keinen Einfluss haben. Für diese fremden Inhalte kann keine Gewähr
übernommen werden; verantwortlich ist stets der jeweilige Anbieter.</p>
</div>

<h2>Urheberrecht</h2>
<div class="article-body">
<p>Die durch die Seitenbetreiber erstellten Inhalte und Werke unterliegen dem
deutschen Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet.</p>
</div>
"""

DATENSCHUTZ = """
<div class="article-body">
<p class="lead-p">Diese Website kommt ohne Cookies, ohne Tracking, ohne
Analysewerkzeuge und ohne Formulare aus. Es werden keine Profile gebildet und
keine Daten an Werbenetzwerke weitergegeben. Was trotzdem anfällt, steht
unten.</p>
</div>

<h2>1. Verantwortlicher</h2>
<div class="article-body">
<p class="anschrift">{name}<br>{zusatz}<br>{strasse}<br>{ort}<br>{land}<br>
E-Mail: <a href="mailto:{email}">{email}</a></p>
</div>

<h2>2. Hosting und Server-Logdateien</h2>
<div class="article-body">
<p>Diese Website wird bei Netlify, Inc. (44 Montgomery Street, Suite 300, San
Francisco, CA 94104, USA) gehostet. Beim Aufruf werden technisch notwendige
Daten verarbeitet, die Ihr Browser automatisch übermittelt: IP-Adresse,
Datum und Uhrzeit, aufgerufene Adresse, übertragene Datenmenge,
Browsertyp und Betriebssystem.</p>
<p>Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO — unser berechtigtes
Interesse an einer technisch fehlerfreien Auslieferung. Die Übermittlung in
die USA erfolgt auf Grundlage der Standardvertragsklauseln sowie der
Zertifizierung von Netlify unter dem EU-US Data Privacy Framework.</p>
</div>

<h2>3. Schriftarten</h2>
<div class="article-body">
<p>Die verwendeten Schriftarten werden <strong>ausschließlich von unserem
eigenen Server</strong> ausgeliefert. Es besteht keine Verbindung zu Google
Fonts oder einem anderen Fremdanbieter, und es wird keine IP-Adresse an
Dritte übertragen.</p>
</div>

<h2>4. Keine Cookies, kein Tracking</h2>
<div class="article-body">
<p>Wir setzen keine Cookies, verwenden keinen lokalen Speicher des Browsers
und binden keine Analyse-, Werbe- oder Social-Media-Werkzeuge ein. Ein
Einwilligungsbanner ist deshalb nicht erforderlich.</p>
</div>

<h2>5. Links zu Telegram</h2>
<div class="article-body">
<p>Diese Website verlinkt auf Kanäle und Gruppen bei Telegram. <strong>Erst
wenn Sie einen solchen Link anklicken</strong>, werden Daten an Telegram
übermittelt. Für die Verarbeitung dort ist Telegram verantwortlich; es
gelten deren Datenschutzbestimmungen. Wir erhalten von Telegram keine
personenbezogenen Daten über Sie.</p>
</div>

<h2>6. Ihre Rechte</h2>
<div class="article-body">
<p>Sie haben jederzeit das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung
(Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18),
Datenübertragbarkeit (Art. 20) sowie Widerspruch gegen die Verarbeitung
(Art. 21). Wenden Sie sich dafür an die oben genannte Adresse.</p>
<p>Ihnen steht zudem ein Beschwerderecht bei einer Aufsichtsbehörde zu. Für
Nordrhein-Westfalen ist dies die Landesbeauftragte für Datenschutz und
Informationsfreiheit NRW.</p>
</div>

<h2>7. Speicherdauer</h2>
<div class="article-body">
<p>Server-Logdateien werden nach spätestens 30 Tagen gelöscht oder
anonymisiert, sofern sie nicht ausnahmsweise zur Aufklärung eines
konkreten Missbrauchsfalls länger benötigt werden.</p>
</div>

<h2>8. Änderungen</h2>
<div class="article-body">
<p>Wir passen diese Erklärung an, sobald sich die technische Umsetzung der
Website oder die Rechtslage ändert. Es gilt jeweils die hier abrufbare
Fassung.</p>
</div>
"""


def bau():
    os.makedirs(ZIEL, exist_ok=True)
    seiten = [
        ("impressum.html", "Impressum", "Impressum",
         "Impressum von Barakah Finance nach § 5 DDG.", IMPRESSUM),
        ("datenschutz.html", "Datenschutzerklärung", "Datenschutz",
         "Datenschutzerklärung von Barakah Finance: keine Cookies, kein Tracking, "
         "lokal ausgelieferte Schriftarten.", DATENSCHUTZ),
    ]
    for datei, titel, h1, beschreibung, inhalt in seiten:
        html = VORLAGE.format(titel=titel, h1=h1, datei=datei,
                               beschreibung=beschreibung,
                               inhalt=inhalt.format(**BETREIBER))
        open(os.path.join(ZIEL, datei), "w", encoding="utf-8").write(html)
        print(f"  {ZIEL}/{datei}")


if __name__ == "__main__":
    bau()
    print("Rechtstexte erzeugt. Vor dem Livegang anwaltlich pruefen lassen.")
