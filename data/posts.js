/* ============================================================
   posts.js
   Blog-Beiträge für den Halal Aktien Report.

   SELBST ERWEITERN (täglicher Post): Kopiere einen bestehenden
   Block, füge ihn GANZ OBEN in das Array ein (direkt nach dem
   "[" -- damit er zuerst angezeigt wird), passe date/title/slug/
   body an. "slug" muss einmalig sein (z.B. das heutige Datum +
   Kurztitel, keine Leerzeichen). Beiträge müssen absteigend nach
   Datum sortiert bleiben (neuester zuerst)!
   ============================================================ */

const POSTS = [
  {
    slug: `test-pipeline-automatisch-entfernt`,
    date: `2026-07-26`,
    tag: `Marktbeobachtung`,
    title: `[TEST] Automatisierter Pipeline-Test -- bitte ignorieren`,
    excerpt: `Automatisierter Test der Veroeffentlichungs-Pipeline, wird sofort wieder entfernt.`,
    assets: [],
    body: `Automatisierter Test der Pipeline (VPS -> GitHub -> Netlify). Wird sofort wieder entfernt.

Quelle: Automatisierter Test.

Keine echte Nachricht.`,
  },
  {
    slug: "trump-iran-verhandlungen-gold-bitcoin-apple",
    date: "2026-07-26",
    tag: "Marktbeobachtung",
    title: "Trump verhandelt mit Iran: Halal-Anleger richten Blick auf Gold, Bitcoin und Apple",
    excerpt: "Mehrere unabhängige Quellen berichten übereinstimmend über neue Gespräche -- die Marktreaktion konzentriert sich auf drei sichtbare Bewegungen.",
    assets: ["GOLD", "BTC-USD", "AAPL"],
    body: "Mehrfach bestätigte Berichterstattung deutet auf neue diplomatische Gespräche zwischen den USA und dem Iran hin. In der Folge richten viele Marktteilnehmer ihre Aufmerksamkeit verstärkt auf Gold als traditionellen Unsicherheits-Hedge, auf Bitcoin als alternative Wertanlage sowie auf Apple im Rahmen der laufenden Technologie-Rally.\n\nWichtig: Dies ist eine reine Beobachtung der aktuellen Nachrichtenlage und Marktbewegung, keine Kauf- oder Anlageempfehlung. Die Einordnung von Bitcoin als Halal-Investment bleibt unter Gelehrten umstritten -- eine eigene Prüfung wird empfohlen.\n\nWer solche Bewegungen nicht erst am nächsten Tag im Report, sondern direkt bei Bekanntwerden mitbekommen möchte, findet den Austausch dazu in unserer Telegram-Gruppe.",
  },
  {
    slug: "novo-nordisk-adipositas-pipeline-update",
    date: "2026-07-24",
    tag: "Unternehmens-News",
    title: "Novo Nordisk: Neue Pipeline-Daten sorgen für Bewegung",
    excerpt: "Zwei unabhängige Wirtschaftsmedien berichten übereinstimmend über neue klinische Studiendaten im Adipositas-Segment.",
    assets: ["NVO"],
    body: "Aktuelle Berichterstattung, die von mehreren unabhängigen Quellen bestätigt wurde, bezieht sich auf neue klinische Studienergebnisse im Bereich der Adipositas-Medikamente von Novo Nordisk. Der Sektor-Screen des Unternehmens bleibt unverändert konform.\n\nDies ist eine automatisierte Nachrichten-Zusammenfassung, keine Anlageempfehlung.",
  },
  {
    slug: "gold-mehrjahreshoch-halal-anleger",
    date: "2026-07-22",
    tag: "Rohstoffe",
    title: "Gold erreicht mehrjähriges Hoch -- was Halal-Anleger jetzt beobachten",
    excerpt: "Mehrere Wirtschaftsmedien bestätigen übereinstimmend eine ungewöhnlich starke Nachfrage nach physischem Gold seitens institutioneller Käufer.",
    assets: ["GOLD"],
    body: "Unabhängig voneinander berichten mehrere Wirtschaftsmedien über eine spürbar gestiegene Nachfrage nach physischem Gold, insbesondere seitens Zentralbanken und institutioneller Investoren. Gold gilt unter den meisten Gelehrten als unproblematisch handelbare Anlageform, sofern physische Hinterlegung und Übergabemodalitäten beachtet werden.\n\nAuch hier gilt: reine Marktbeobachtung, keine Kaufempfehlung. Die konkrete Ausgestaltung eines Goldkaufs (physisch vs. Zertifikat) hat unterschiedliche Sharia-Implikationen und sollte individuell geprüft werden.",
  },
  {
    slug: "wochenrueckblick-halal-tech-werte",
    date: "2026-07-20",
    tag: "Wochenrückblick",
    title: "Wochenrückblick: Wie sich Halal-konforme Tech-Werte entwickelt haben",
    excerpt: "Ein Überblick über die am häufigsten in bestätigter Berichterstattung genannten, sektor-konformen Technologiewerte der Woche.",
    assets: ["AAPL", "MSFT"],
    body: "In dieser Woche traten insbesondere Apple und Microsoft mehrfach in unabhängig bestätigter Berichterstattung auf. Beide Unternehmen bestehen weiterhin den Sektor- und Finanzkennzahlen-Screen.\n\nHinweis: Diese Übersicht dient der reinen Information über die Nachrichtenlage, nicht als Kaufempfehlung.",
  },
  {
    slug: "bitcoin-volatilitaet-sharia-diskussion",
    date: "2026-07-17",
    tag: "Krypto-Watch",
    title: "Bitcoin-Volatilität hält an -- die Sharia-Diskussion bleibt ungelöst",
    excerpt: "Zwei unabhängige Marktberichte bestätigen erneut starke Kursausschläge bei Bitcoin. Unter Gelehrten gibt es weiterhin keinen Konsens.",
    assets: ["BTC-USD"],
    body: "Mehrfach bestätigte Berichterstattung zeigt erneut ausgeprägte Kursschwankungen bei Bitcoin innerhalb weniger Handelstage. Unabhängig von der kurzfristigen Marktbewegung bleibt die grundsätzliche Frage bestehen, ob Kryptowährungen die Kriterien einer Sharia-konformen Werteinheit (Mal) erfüllen -- Gelehrte sind sich hier weiterhin uneinig.\n\nWir bilden diese Diskussion bewusst ab, ohne selbst eine Position zu beziehen. Wer die unterschiedlichen Gelehrtenmeinungen und Argumente im Detail diskutieren möchte, ist in unserer Telegram-Gruppe herzlich willkommen.",
  },
  {
    slug: "nvidia-asml-ki-chip-nachfrage",
    date: "2026-07-15",
    tag: "Unternehmens-News",
    title: "Nvidia und ASML: Anhaltend hohe Nachfrage nach KI-Chip-Fertigung",
    excerpt: "Mehrere Fachmedien berichten übereinstimmend über volle Auftragsbücher bei Chipdesignern und Anlagenbauern.",
    assets: ["NVDA", "ASML", "TSM"],
    body: "Übereinstimmende Berichte mehrerer Fachmedien deuten auf anhaltend hohe Nachfrage nach Halbleitern für künstliche Intelligenz hin. Sowohl Chipdesigner Nvidia als auch Anlagenbauer ASML und Auftragsfertiger TSM profitieren laut Berichterstattung von vollen Auftragsbüchern.\n\nAlle drei Unternehmen bestehen weiterhin den Sektor-Screen. Keine Kauf- oder Anlageempfehlung -- reine Zusammenfassung der Nachrichtenlage.",
  },
  {
    slug: "silberpreis-industrienachfrage",
    date: "2026-07-12",
    tag: "Rohstoffe",
    title: "Silberpreis: Industrienachfrage aus der Solarbranche im Fokus",
    excerpt: "Unabhängige Marktbeobachter bestätigen einen wachsenden Anteil industrieller Nachfrage am gesamten Silberverbrauch.",
    assets: ["SILVER"],
    body: "Mehrere Marktbeobachter berichten übereinstimmend, dass ein wachsender Anteil der weltweiten Silbernachfrage auf industrielle Anwendungen -- insbesondere Photovoltaik -- entfällt. Dies unterscheidet die aktuelle Marktdynamik von rein spekulativ getriebenen Phasen.\n\nWie bei Gold gilt: Die Sharia-Konformität hängt von der konkreten Ausgestaltung des Investments ab (physisch vs. Derivat). Keine Anlageempfehlung.",
  },
  {
    slug: "screening-update-vier-neue-unternehmen",
    date: "2026-07-09",
    tag: "Screening-Update",
    title: "Screening-Update: Vier neue Unternehmen in die Übersicht aufgenommen",
    excerpt: "Auf Wunsch der Community haben wir den Sektor- und Finanzkennzahlen-Screen auf vier weitere Unternehmen angewendet.",
    assets: ["COST", "PG", "CAT", "HON"],
    body: "Basierend auf Rückmeldungen aus unserer Community haben wir vier weitere Unternehmen -- Costco, Procter & Gamble, Caterpillar und Honeywell -- durch unseren Sektor- und Finanzkennzahlen-Screen laufen lassen. Alle vier bestehen den aktuellen Screen und sind ab sofort in der Unternehmensübersicht gelistet.\n\nWer ein bestimmtes Unternehmen geprüft haben möchte, kann uns das jederzeit über die Telegram-Gruppe mitteilen -- wir nehmen Vorschläge aus der Community regelmäßig in unsere Screening-Warteliste auf.",
  },
  {
    slug: "wochenrueckblick-konsumgueter",
    date: "2026-07-06",
    tag: "Wochenrückblick",
    title: "Wochenrückblick: Konsumgüter zwischen Stabilität und Margendruck",
    excerpt: "Costco und Procter & Gamble standen diese Woche im Zentrum mehrfach bestätigter Berichterstattung zum Konsumsektor.",
    assets: ["COST", "PG"],
    body: "Diese Woche konzentrierte sich die bestätigte Berichterstattung im Konsumgütersektor auf Costco und Procter & Gamble. Beide Unternehmen gelten als defensiv, da ihre Produkte auch in konjunkturell schwächeren Phasen nachgefragt werden.\n\nReine Nachrichten-Zusammenfassung, keine Kaufempfehlung.",
  },
  {
    slug: "monatsrueckblick-juni",
    date: "2026-07-01",
    tag: "Monatsrückblick",
    title: "Monatsrückblick Juni: Die meistgenannten Halal-Werte im Überblick",
    excerpt: "Ein Rückblick auf die Unternehmen und Anlageklassen, die im vergangenen Monat am häufigsten in bestätigter Berichterstattung auftauchten.",
    assets: ["AAPL", "NVDA", "GOLD"],
    body: "Im Juni traten Apple und Nvidia besonders häufig in unabhängig bestätigter Berichterstattung auf, begleitet von einer spürbar erhöhten medialen Aufmerksamkeit für Gold als Unsicherheits-Hedge. Alle genannten Unternehmen bestehen weiterhin den Sektor-Screen.\n\nMonatsrückblicke wie dieser fassen ausschließlich die Nachrichtenlage zusammen und stellen keine Anlageempfehlung dar. Ausführlichere Diskussionen zu einzelnen Werten finden regelmäßig in unserer Telegram-Gruppe statt.",
  },
  {
    slug: "apple-produktankuendigung-marktreaktion",
    date: "2026-06-27",
    tag: "Unternehmens-News",
    title: "Apple-Produktankündigung: Verhaltene erste Marktreaktion",
    excerpt: "Mehrere Technologiemedien berichten übereinstimmend über eine zurückhaltende erste Kursreaktion nach der jüngsten Produktankündigung.",
    assets: ["AAPL"],
    body: "Nach der jüngsten Produktankündigung von Apple berichten mehrere unabhängige Technologiemedien übereinstimmend über eine zunächst verhaltene Kursreaktion. Analysten verweisen laut Berichterstattung auf bereits hohe Erwartungen im Vorfeld.\n\nReine Beobachtung der Marktreaktion, keine Kauf- oder Verkaufsempfehlung.",
  },
  {
    slug: "sap-cloud-zahlen",
    date: "2026-06-24",
    tag: "Unternehmens-News",
    title: "SAP: Cloud-Umsatzanteil wächst weiter laut übereinstimmenden Berichten",
    excerpt: "Zwei unabhängige Wirtschaftsmedien bestätigen einen weiter steigenden Anteil wiederkehrender Cloud-Umsätze bei SAP.",
    assets: ["SAP"],
    body: "Übereinstimmende Berichterstattung mehrerer Wirtschaftsmedien deutet auf einen weiter wachsenden Anteil von Cloud- und Abo-Umsätzen am Gesamtgeschäft von SAP hin. Der Sektor-Screen des Unternehmens bleibt unverändert konform.\n\nAutomatisierte Nachrichten-Zusammenfassung, keine Anlageempfehlung.",
  },
  {
    slug: "eli-lilly-novo-nordisk-adipositas-wettbewerb",
    date: "2026-06-20",
    tag: "Unternehmens-News",
    title: "Eli Lilly vs. Novo Nordisk: Wettbewerb im Adipositas-Markt spitzt sich zu",
    excerpt: "Mehrere Fachmedien berichten übereinstimmend über neue Studienvergleiche zwischen den beiden führenden Adipositas-Präparate-Herstellern.",
    assets: ["LLY", "NVO"],
    body: "Unabhängig bestätigte Fachberichterstattung vergleicht aktuelle Studiendaten von Eli Lilly und Novo Nordisk im stark wachsenden Adipositas-Medikamentenmarkt. Beide Unternehmen bestehen weiterhin den Sektor-Screen.\n\nReine Marktbeobachtung, keine Kaufempfehlung.",
  },
  {
    slug: "gold-bitcoin-safe-haven-vergleich",
    date: "2026-06-17",
    tag: "Wochenrückblick",
    title: "Wochenrückblick: Gold und Bitcoin im Safe-Haven-Vergleich",
    excerpt: "Ein Überblick darüber, wie unterschiedlich Gold und Bitcoin in der vergangenen Woche auf dieselben Nachrichtenereignisse reagiert haben.",
    assets: ["GOLD", "BTC-USD"],
    body: "In der vergangenen Woche reagierten Gold und Bitcoin laut mehrfach bestätigter Berichterstattung unterschiedlich auf dieselben geopolitischen Nachrichtenereignisse. Während Gold vergleichsweise ruhig blieb, zeigte Bitcoin deutlich stärkere Ausschläge.\n\nDiese Gegenüberstellung dient ausschließlich der Einordnung der Nachrichtenlage, nicht als Anlageempfehlung. Die Frage der Sharia-Konformität von Bitcoin bleibt unter Gelehrten umstritten.",
  },
];

if (typeof module !== "undefined") module.exports = POSTS;
