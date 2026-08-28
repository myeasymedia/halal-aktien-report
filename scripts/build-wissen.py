# -*- coding: utf-8 -*-
"""
build-wissen.py
-----------------
Erzeugt die Wissensseiten unter pages/wissen/.

WARUM EIGENE SEITEN UND KEIN FAQ-ABSATZ:
Wer "ist bitcoin halal" bei Google eingibt, sucht eine Antwort auf
genau diese Frage -- und Google zeigt bevorzugt Seiten, die genau
diese Frage im Titel, in der Ueberschrift und in der Adresse
tragen. Ein Absatz im Fliesstext der Startseite rankt dafuer
praktisch nie.

Jede Seite traegt strukturierte Daten (FAQPage), damit die Antwort
direkt in den Suchergebnissen erscheinen kann.

Aufruf:  python3 scripts/build-wissen.py
"""

import os

ZIEL = "pages/wissen"

SEITEN = [
    {
        "datei": "ist-bitcoin-halal.html",
        "titel": "Ist Bitcoin halal? Die Argumente beider Seiten",
        "beschreibung": "Ist Bitcoin halal oder haram? Wir stellen die Argumente der Gelehrten gegenüber — Gharar, fehlender innerer Wert, Zahlungsmittel-Frage — ohne eine eigene Fatwa auszusprechen.",
        "h1": "Ist Bitcoin halal?",
        "lead": "Die ehrliche Antwort lautet: Darüber sind sich Gelehrte nicht einig. Wer dir etwas anderes erzählt, verkauft dir seine Meinung als Konsens. Hier stehen beide Seiten.",
        "bloecke": [
            ("Worum überhaupt gestritten wird",
             ["Die Frage ist nicht, ob Bitcoin technisch funktioniert, sondern ob er die Eigenschaften erfüllt, die islamisches Recht an Geld und an handelbare Güter stellt. Drei Punkte stehen dabei im Mittelpunkt.",
              "Erstens: Ist Bitcoin überhaupt <em>mal</em> — also anerkanntes Vermögen? Zweitens: Enthält der Handel damit <em>Gharar</em>, also übermäßige Unsicherheit? Drittens: Ist er <em>thaman</em>, ein Zahlungsmittel, für das eigene Regeln beim Tausch gelten?"]),
            ("Was dafür spricht",
             ["Mehrere Gelehrte und Institutionen argumentieren, Bitcoin sei ein Vermögenswert mit anerkanntem Nutzen: Er wird von Menschen begehrt, ist übertragbar, teilbar und knapp. Damit erfülle er die Kriterien für <em>mal mutaqawwim</em> — erlaubtes Eigentum.",
              "Anders als bei Zinsgeschäften entsteht beim Kauf kein Ertrag aus Geld selbst. Wer Bitcoin kauft und hält, verdient nicht an Zins, sondern an einer Preisänderung — vergleichbar mit einem Rohstoff.",
              "Die Herkunft ist nachvollziehbar: Jede Einheit ist auf eine offene Kette zurückführbar, was Unklarheit über das Eigentum ausschließt."]),
            ("Was dagegen spricht",
             ["Der häufigste Einwand ist die extreme Schwankung. Wenn ein Vermögenswert innerhalb von Wochen die Hälfte verlieren kann, sehen manche Gelehrte darin <em>Gharar</em> — eine Unsicherheit, die den Handel eher zum Glücksspiel als zum Geschäft macht.",
              "Ein zweiter Einwand: Bitcoin hat keinen inneren Wert im klassischen Sinn. Er produziert nichts, zahlt keine Dividende und steht für keinen Sachwert. Sein Preis beruht ausschließlich auf dem, was andere zu zahlen bereit sind.",
              "Ein dritter: Ein erheblicher Teil des Handels ist Spekulation auf kurze Sicht — und Spekulation um ihrer selbst willen ist im islamischen Recht problematisch, unabhängig vom Gegenstand."]),
            ("Wie einzelne Länder und Institutionen entschieden haben",
             ["Die Positionen gehen weit auseinander. Einige nationale Fatwa-Behörden haben den Handel untersagt, andere ihn unter Bedingungen erlaubt, wieder andere sich bewusst nicht festgelegt.",
              "Diese Uneinigkeit ist kein Versagen der Gelehrten, sondern die normale Lage bei einer Frage, für die es keine überlieferte Entsprechung gibt. Neue Sachverhalte brauchen Zeit."]),
            ("Was wir dazu tun — und was nicht",
             ["Wir beobachten Bitcoin, melden Bewegungen und erklären die Mechanik dahinter: warum Zinsentscheidungen darauf wirken, was Regulierung verändert, wie sich Zuflüsse messen lassen.",
              "Was wir <strong>nicht</strong> tun: eine eigene Fatwa aussprechen. Diese Einordnung gehört zu dir und zu einem Gelehrten, dem du vertraust — nicht zu einem Nachrichtendienst."]),
        ],
        "faq": [
            ("Ist Bitcoin halal oder haram?",
             "Darüber sind sich islamische Gelehrte nicht einig. Befürworter sehen in Bitcoin erlaubtes Eigentum (mal mutaqawwim) ohne Zinskomponente. Gegner verweisen auf die starke Schwankung als Gharar und auf den fehlenden inneren Wert. Es gibt dazu keinen Konsens."),
            ("Ist Bitcoin-Mining halal?",
             "Mining wird von einem Teil der Gelehrten als erlaubte Dienstleistung gesehen — man stellt Rechenleistung bereit und wird dafür entlohnt. Kritisch wird es, wenn die Bewertung der zugrundeliegenden Währung selbst abgelehnt wird."),
            ("Sind Krypto-Zinsen (Staking, Lending) halal?",
             "Hier ist die Lage deutlich klarer als bei Bitcoin selbst: Erträge, die allein aus dem Verleihen von Kapital entstehen, gelten überwiegend als Riba und damit als nicht zulässig."),
        ],
    },
    {
        "datei": "was-ist-riba.html",
        "titel": "Was ist Riba? Zins im Islam einfach erklärt",
        "beschreibung": "Riba ist mehr als nur Kreditzins. Was der Begriff umfasst, warum er verboten ist und was das konkret für Aktien, Konten und Finanzierungen bedeutet.",
        "h1": "Was ist Riba?",
        "lead": "Riba wird meist mit „Zins“ übersetzt. Das ist richtig, aber zu kurz — der Begriff umfasst mehr, und genau dieses Mehr entscheidet darüber, welche Aktie durch eine Halal-Prüfung kommt.",
        "bloecke": [
            ("Die einfache Definition",
             ["Riba bezeichnet einen Zuwachs, den jemand erhält, ohne dafür ein Risiko zu tragen oder eine Leistung zu erbringen. Das klassische Beispiel: Geld verleihen und mehr zurückverlangen.",
              "Der entscheidende Gedanke dahinter ist nicht, dass Gewinn verboten wäre. Verboten ist Gewinn <em>ohne Risiko</em>. Wer investiert und dabei verlieren kann, darf gewinnen. Wer nur verleiht und in jedem Fall mehr zurückbekommt, nicht."]),
            ("Die zwei Formen",
             ["<strong>Riba an-Nasi'ah</strong> ist der Aufschlag für Zeit — der klassische Kreditzins. Wer heute 100 leiht und in einem Jahr 110 zurückzahlt, zahlt genau das.",
              "<strong>Riba al-Fadl</strong> betrifft den ungleichen Tausch gleichartiger Güter: Gold gegen Gold, Weizen gegen Weizen, jeweils in unterschiedlicher Menge. Aus dieser Regel folgt übrigens, dass Gold sofort und vollständig bezahlt werden muss — nicht auf Termin."]),
            ("Was das für Aktien bedeutet",
             ["Ein Unternehmen kann in einer völlig erlaubten Branche arbeiten und trotzdem durchfallen — weil seine Bilanz auf verzinslichen Schulden steht oder weil es nennenswerte Zinserträge nebenbei erzielt.",
              "Deshalb besteht jede ernsthafte Halal-Prüfung aus zwei Schritten. Der erste schaut auf das Geschäft, der zweite auf die Finanzen. Übliche Schwellen liegen bei rund einem Drittel der Marktkapitalisierung für verzinsliche Schulden und bei etwa fünf Prozent für Erträge aus nicht erlaubten Quellen."]),
            ("Was mit den restlichen Prozenten passiert",
             ["Selbst ein geprüftes Unternehmen erzielt gelegentlich kleine Erträge aus nicht erlaubten Quellen — Zinsen auf Bankguthaben etwa. Viele Anleger spenden den entsprechenden Anteil ihrer Erträge. Dieser Vorgang heißt Purification.",
              "Mit Zakat hat das nichts zu tun. Zakat ist eine eigenständige Pflichtabgabe auf das Vermögen und wird zusätzlich fällig."]),
        ],
        "faq": [
            ("Ist jeder Zins Riba?",
             "Nach überwiegender Auffassung ja — unabhängig von der Höhe. Die Unterscheidung zwischen „Wucher“ und „normalem Zins“, die im westlichen Recht üblich ist, kennt das islamische Recht in dieser Form nicht."),
            ("Darf ich ein normales Girokonto haben?",
             "Ein Konto ohne Zinsgutschrift wird überwiegend als unproblematisch angesehen, da es der Verwahrung dient. Kritisch werden Zinserträge und verzinsliche Dispositionskredite."),
            ("Wie hoch darf die Verschuldung eines Unternehmens sein?",
             "Gängige Screening-Standards ziehen die Grenze bei rund einem Drittel der Marktkapitalisierung für verzinsliche Schulden. Die genaue Schwelle unterscheidet sich je nach Standard."),
        ],
    },
    {
        "datei": "sind-etfs-halal.html",
        "titel": "Sind ETFs halal? Was bei Indexfonds zu prüfen ist",
        "beschreibung": "Ein ETF ist nur so halal wie das, was drinsteckt. Worauf es bei islamkonformen Indexfonds ankommt: Zusammensetzung, Nachbildung, Wertpapierleihe und Purification.",
        "h1": "Sind ETFs halal?",
        "lead": "Ein ETF ist ein Korb. Ob er halal ist, hängt nicht am Korb, sondern an dem, was drin liegt — und an drei technischen Details, die kaum jemand prüft.",
        "bloecke": [
            ("Der Inhalt entscheidet zuerst",
             ["Ein gewöhnlicher Welt-ETF enthält Banken, Versicherer, Alkoholhersteller und Rüstungskonzerne. Er kann deshalb nicht islamkonform sein, egal wie günstig er ist.",
              "Es gibt eigens gescreente Varianten, oft mit „Islamic“ oder „Sharia“ im Namen. Sie bilden Indizes ab, deren Anbieter denselben zweistufigen Filter anlegen: Sektor-Ausschluss, danach Kennzahlen."]),
            ("Das erste technische Detail: die Nachbildung",
             ["ETFs bilden ihren Index auf zwei Wegen ab. <strong>Physisch</strong> heißt: Der Fonds kauft die enthaltenen Aktien wirklich. <strong>Synthetisch</strong> heißt: Er hält andere Wertpapiere und tauscht deren Ertrag über einen Vertrag mit einer Bank gegen den Index-Ertrag.",
              "Dieser Tauschvertrag ist ein Derivat mit einer Gegenpartei — und wird von vielen Gelehrten als problematisch angesehen. Wer auf Nummer sicher gehen will, achtet auf physische Nachbildung."]),
            ("Das zweite: Wertpapierleihe",
             ["Viele physische ETFs verleihen ihre Aktien gegen Gebühr an andere Marktteilnehmer — meist an solche, die auf fallende Kurse setzen. Der Fonds verdient daran zusätzlich.",
              "Ob dieser Ertrag zulässig ist, wird unterschiedlich beurteilt. Die Information steht im Verkaufsprospekt unter „Securities Lending“."]),
            ("Das dritte: die Reinigung der Erträge",
             ["Auch in einem gescreenten Index bleibt ein kleiner Anteil nicht erlaubter Erträge übrig. Manche Anbieter weisen diesen Anteil jährlich aus, damit Anleger ihn spenden können.",
              "Wo diese Angabe fehlt, muss man selbst schätzen — oder einen Anbieter wählen, der sie liefert."]),
        ],
        "faq": [
            ("Sind Islamic ETFs automatisch halal?",
             "Nicht automatisch. Der Name sagt aus, dass ein Screening stattgefunden hat — nicht, nach welchem Standard, ob synthetisch nachgebildet wird und ob Wertpapierleihe stattfindet. Diese drei Punkte muss man einzeln prüfen."),
            ("Ist ein Sparplan auf einen Islamic ETF erlaubt?",
             "Ein Sparplan ist nur ein regelmäßiger Kauf und ändert an der Bewertung nichts. Entscheidend bleibt der Fonds selbst."),
            ("Was ist mit Gold-ETFs?",
             "Kritisch. Gold muss nach überwiegender Auffassung sofort und vollständig bezahlt und übereignet werden. Ein ETF, der Gold nur nachbildet oder Ansprüche darauf hält, erfüllt das häufig nicht. Physisch hinterlegte Produkte mit Auslieferungsanspruch werden eher akzeptiert."),
        ],
    },
    {
        "datei": "halal-aktien-finden.html",
        "titel": "Halal Aktien finden: die Prüfung in zwei Schritten",
        "beschreibung": "Wie man halal-konforme Aktien systematisch findet: Sektor-Ausschluss, Kennzahlen-Check mit konkreten Schwellen und die häufigsten Fehler dabei.",
        "h1": "Halal Aktien finden",
        "lead": "Die meisten prüfen nur die Branche und hören dann auf. Das ist die halbe Arbeit — und der Grund, warum viele Depots Werte enthalten, die einer genaueren Prüfung nicht standhalten.",
        "bloecke": [
            ("Schritt 1: Der Sektor-Ausschluss",
             ["Zuerst fallen ganze Geschäftsfelder heraus, unabhängig von jeder Kennzahl: konventionelle Zinsgeschäfte und Versicherungen, Alkohol, Tabak, Schweinefleisch, Glücksspiel, Rüstung und Erwachsenenunterhaltung.",
              "Wichtig ist die Betrachtung des ganzen Konzerns, nicht nur der Hauptmarke. Ein Mischkonzern kann über eine Tochter in einem ausgeschlossenen Feld tätig sein."]),
            ("Schritt 2: Der Kennzahlen-Check",
             ["Jetzt wird die Bilanz geprüft. Drei Größen sind üblich, jeweils im Verhältnis zur Marktkapitalisierung: verzinsliche Schulden, zinstragende Anlagen und Erträge aus nicht erlaubten Quellen.",
              "Gängige Schwellen liegen bei rund einem Drittel für die ersten beiden und bei etwa fünf Prozent für die Erträge. Die genauen Werte unterscheiden sich je nach Standard.",
              "Genau hier fallen viele bekannte Namen durch, die im ersten Schritt problemlos durchkamen — stark fremdfinanzierte Industrie- oder Immobilienwerte etwa."]),
            ("Die vier häufigsten Fehler",
             ["<strong>Nur die Branche prüfen.</strong> Der zweite Schritt entscheidet mindestens so oft.",
              "<strong>Einmal prüfen und nie wieder.</strong> Bilanzen ändern sich. Ein Unternehmen, das heute besteht, kann nach einer großen Übernahme auf Kredit durchfallen.",
              "<strong>Dem Namen vertrauen.</strong> „Islamic“ im Produktnamen sagt nichts über den zugrundeliegenden Standard.",
              "<strong>Die Reinigung vergessen.</strong> Auch ein bestandenes Unternehmen erzeugt kleine unerlaubte Erträge."]),
            ("Wie wir das machen",
             ["Wir prüfen unsere Watchlist laufend in beiden Schritten und zeigen das Ergebnis auf jeder Unternehmensseite offen an — samt Begründung.",
              "Es bleibt eine Heuristik und ersetzt kein zertifiziertes Sharia-Gutachten. Sie nimmt dir die Vorarbeit ab, nicht die Entscheidung."]),
        ],
        "faq": [
            ("Wie erkenne ich, ob eine Aktie halal ist?",
             "In zwei Schritten: erst der Sektor-Ausschluss (Zinsgeschäfte, Alkohol, Glücksspiel, Rüstung, Schweinefleisch, Erwachsenenunterhaltung), dann der Kennzahlen-Check auf verzinsliche Schulden, zinstragende Anlagen und unerlaubte Erträge — jeweils im Verhältnis zur Marktkapitalisierung."),
            ("Sind Technologieaktien halal?",
             "Der Sektor ist unproblematisch, aber das allein genügt nicht. Entscheidend ist die Bilanz: Ein Technologiekonzern mit hoher Verschuldung kann im zweiten Schritt durchfallen."),
            ("Wie oft muss ich neu prüfen?",
             "Mindestens einmal jährlich, und immer nach größeren Übernahmen oder Kapitalmaßnahmen. Bilanzkennzahlen verändern sich, die Einordnung mit ihnen."),
        ],
    },
]

VORLAGE = """<!DOCTYPE html>
<html lang="de" class="no-js">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{titel} | Barakah Finance</title>
<meta name="description" content="{beschreibung}">
<link rel="canonical" href="https://joyful-dasik-cdf792.netlify.app/pages/wissen/{datei}">
<meta property="og:type" content="article">
<meta property="og:title" content="{titel}">
<meta property="og:description" content="{beschreibung}">
<meta property="og:locale" content="de_DE">
<meta name="theme-color" content="#070d0c">
<script type="application/ld+json">
{{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{faq}]}}
</script>
<script type="application/ld+json">
{{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[
{{"@type":"ListItem","position":1,"name":"Start","item":"https://joyful-dasik-cdf792.netlify.app/"}},
{{"@type":"ListItem","position":2,"name":"Wissen","item":"https://joyful-dasik-cdf792.netlify.app/pages/wissen/"}},
{{"@type":"ListItem","position":3,"name":"{h1}"}}]}}
</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400..600&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../../css/style.css">
<script>document.documentElement.classList.remove('no-js');</script>
</head>
<body>
<header id="shell-header"></header>

<section class="page-head">
  <div class="wrap">
    <a class="back" href="../../index.html#halal-investieren"><span>&#8592;</span> Grundlagen</a>
    <span class="eyebrow">Wissen</span>
    <h1>{h1}</h1>
    <p>{lead}</p>
  </div>
</section>

<section class="section" style="padding-top:0">
  <div class="wrap">
    <article class="article">
      {bloecke}
    </article>

    <div class="wissen-faq">
      <h2 style="font-size:clamp(1.5rem,3vw,2rem);margin-bottom:22px">Häufige Fragen</h2>
      {faq_html}
    </div>

    <div class="detail-cta" style="margin-top:40px">
      <div>
        <h3>Diese Fragen begleiten dich weiter</h3>
        <p>In der PRO-Gruppe bauen wir jede Woche eine Lektion auf der vorigen auf — von Grund auf, in einfacher Sprache.</p>
      </div>
      <a class="btn" data-cta="pro" href="#">PRO ansehen — 9,99 &euro;</a>
    </div>

    <nav class="wissen-nav">
      <h3>Weitere Grundlagen</h3>
      <div class="wissen-links">{nachbarn}</div>
    </nav>

    <p class="footer-note" style="margin-top:34px">
      <strong>Keine Anlageberatung und keine Rechtsauskunft.</strong> Dieser Text
      fasst verbreitete Positionen zusammen und ersetzt weder ein Gutachten noch
      die Rücksprache mit einem Gelehrten deines Vertrauens.
    </p>
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


def js_text(t):
    return t.replace("\\", "\\\\").replace('"', '\\"')


def bau():
    os.makedirs(ZIEL, exist_ok=True)
    for seite in SEITEN:
        bloecke = "\n      ".join(
            '<h2>%s</h2>\n      <div class="article-body">%s</div>'
            % (t, "".join("<p>%s</p>" % a for a in absaetze))
            for t, absaetze in seite["bloecke"])

        faq_html = "\n      ".join(
            '<div class="faq-item"><button class="faq-q" aria-expanded="false">%s'
            '<span class="faq-sign"></span></button>'
            '<div class="faq-a"><p>%s</p></div></div>' % (f, a)
            for f, a in seite["faq"])

        faq_ld = ",".join(
            '{"@type":"Question","name":"%s","acceptedAnswer":{"@type":"Answer","text":"%s"}}'
            % (js_text(f), js_text(a)) for f, a in seite["faq"])

        nachbarn = "".join(
            '<a class="wissen-link" href="%s"><b>%s</b><span>%s</span></a>'
            % (a["datei"], a["h1"], a["titel"].split(":")[0])
            for a in SEITEN if a["datei"] != seite["datei"])

        html = VORLAGE.format(
            titel=seite["titel"], beschreibung=seite["beschreibung"],
            datei=seite["datei"], h1=seite["h1"], lead=seite["lead"],
            bloecke=bloecke, faq_html=faq_html, faq=faq_ld, nachbarn=nachbarn)

        pfad = os.path.join(ZIEL, seite["datei"])
        open(pfad, "w", encoding="utf-8").write(html)
        print(f"  {pfad}")


if __name__ == "__main__":
    bau()
    print(f"{len(SEITEN)} Wissensseiten erzeugt.")
