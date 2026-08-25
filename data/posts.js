/* ============================================================
   posts.js
   Blog-Beiträge für Barakah Finance.

   SELBST ERWEITERN (täglicher Post): Kopiere einen bestehenden
   Block, füge ihn GANZ OBEN in das Array ein (direkt nach dem
   "[" -- damit er zuerst angezeigt wird), passe date/title/slug/
   body an. "slug" muss einmalig sein (z.B. das heutige Datum +
   Kurztitel, keine Leerzeichen). Beiträge müssen absteigend nach
   Datum sortiert bleiben (neuester zuerst)!
   ============================================================ */

const POSTS = [
  {
    slug: `2026-08-25-bitcoin-nimmt-einen-beat-nach-debasement-handel-funken-am-be`,
    date: `2026-08-25`,
    tag: `Update`,
    title: `Bitcoin nimmt einen Beat nach Debasement-Handel Funken am besten Woche in über drei Jahren`,
    excerpt: `Bitcoin steigt über $80.000 als weicher Dollar, Debasement fürchtet Momentum zu steigern.`,
    assets: [],
    sources: [
      { name: `Investing.com`, url: `https://www.investing.com/news/cryptocurrency-news/bitcoin-rallies-past-80k-as-debasement-trade-dents-dollar-4874510` },
      { name: `Reuters`, url: `https://news.google.com/rss/articles/CBMivwFBVV95cUxOU1A3ZDBwNm85VE41dmUyZGMzWUdmTHJMb3JMYkl4V21XdG9PTHNOZnFnLXhPR2VpSWtsbDNla1pna3I2WHNSRzU2TkhERE9oMnRNZGluNDNHMlFOWnlmSUEtT1dwNGxqVnRrQ1pJemRCTzlDa3A3b3hJV0pNSGJPSFpYbktMemhOblpRZW1QekkwT3F0VEY5TkNQaFZhdlZjejFTU1JjTjVKZ01SNjZMQ195YWlZOVA2NG1fTVFMaw?oc=5` },
    ],
    body: `Bitcoin steigt über $80.000 als weicher Dollar, Debasement fürchtet Momentum zu steigern.

Quellen: Investing.com, Reuters.

Automatisierte, KI-gestützte Zusammenfassung aus mehrfach bestätigter Berichterstattung. Keine Kauf- oder Anlageempfehlung.`,
  },
  {
    slug: `2026-08-25-neue-installationen-entstehen-auf-insel-wahrend-china-den-au`,
    date: `2026-08-25`,
    tag: `Update`,
    title: `Neue Installationen entstehen auf Insel, während China den Aufbau des Südchinesischen Meeres beschleunigt`,
    excerpt: `SGA Raised seine Wette auf Alphabet (GOOG) als AI-Anforderung beschleunigt. Philippinen, um die militärische Drohnenflotte zu erweitern, da die Spannungen im Südchinesischen Meer steigen.`,
    assets: [],
    sources: [
      { name: `Reuters`, url: `https://news.google.com/rss/articles/CBMivgFBVV95cUxNNVNLQXVYZlJVS2s4RkVMRlB3anJuLUd2WlVoTk5QMm96YVhTWHZCLXdBcUptQWdGclRKc0NRaTBaZFM4MjQ2UFVFanFoYndGRmgyVFlZWko2Q1RxRVhhU0QxSmhubmFEeHduMUJRUDdNVmVkSnREQnJQY0EydnNTamhMUnJZWldaSmF6Rkl5bXBIcEF6WVV1dU1Dby1KNjU5Yi1Dalk5Z1pUNVpVMlhxUUpBb09fdXpxTDYwaFd3?oc=5` },
      { name: `Yahoo Finance`, url: `https://finance.yahoo.com/markets/stocks/articles/sga-raised-bet-alphabet-goog-133755704.html` },
      { name: `South China Morning Post (SCMP)`, url: `https://www.scmp.com/news/asia/southeast-asia/article/3365188/philippines-expand-military-drone-fleet-south-china-sea-tensions-rise?utm_source=rss_feed` },
    ],
    body: `SGA Raised seine Wette auf Alphabet (GOOG) als AI-Anforderung beschleunigt. Philippinen, um die militärische Drohnenflotte zu erweitern, da die Spannungen im Südchinesischen Meer steigen.

Quellen: Reuters, South China Morning Post (SCMP), Yahoo Finance.

Automatisierte, KI-gestützte Zusammenfassung aus mehrfach bestätigter Berichterstattung. Keine Kauf- oder Anlageempfehlung.`,
  },
  {
    slug: `2026-08-25-krypto-klammern-die-hartesten-us-sanktionen-der-geschichte-g`,
    date: `2026-08-25`,
    tag: `Marktbeobachtung`,
    title: `Krypto-Klammern "Die härtesten US-Sanktionen der Geschichte" gegen den Iran in Stunden — Wie könnten XRP und Bitcoin beeinflusst werden?`,
    excerpt: `Können neue US-Sanktionen die Schattenwirtschaft des Iran lähmen? Die USA weiten die Sanktionen gegen die iranischen Finanznetze aus und zielen auf Krypto, Gold, Luftfahrt und Schifffahrt.`,
    assets: [],
    sources: [
      { name: `Yahoo Finance`, url: `https://finance.yahoo.com/markets/crypto/articles/crypto-braces-history-toughest-us-124626091.html` },
      { name: `Deutsche Welle (DW)`, url: `https://www.dw.com/en/can-new-us-sanctions-cripple-iran-s-shadow-economy/a-78494630?maca=en-rss-en-all-1573-rdf` },
    ],
    body: `Können neue US-Sanktionen die Schattenwirtschaft des Iran lähmen? Die USA weiten die Sanktionen gegen die iranischen Finanznetze aus und zielen auf Krypto, Gold, Luftfahrt und Schifffahrt.

Quellen: Deutsche Welle (DW), Yahoo Finance.

Automatisierte, KI-gestützte Zusammenfassung aus mehrfach bestätigter Berichterstattung. Keine Kauf- oder Anlageempfehlung.`,
  },
  {
    slug: `2026-08-25-warum-sturzt-intuit-heute`,
    date: `2026-08-25`,
    tag: `Update`,
    title: `Warum stürzt Intuit heute?`,
    excerpt: `Intuit Stockrutschen nach Q4 Ergebnis Beat wird durch weiche Führung gefolgt. Warum verkauft Russland sein Gold?`,
    assets: [],
    sources: [
      { name: `Investing.com`, url: `https://www.investing.com/news/stock-market-news/why-is-intuit-stock-plunging-today-93CH-4875915` },
      { name: `Seeking Alpha`, url: `https://seekingalpha.com/news/4636754-intuit-stock-slides-after-q4-earnings-beat-is-followed-up-by-soft-guidance?utm_source=feed_news_all&utm_medium=referral&feed_item_type=news` },
      { name: `Deutsche Welle (DW)`, url: `https://www.dw.com/en/why-is-russia-selling-its-gold/a-78145069?maca=en-rss-en-all-1573-rdf` },
    ],
    body: `Intuit Stockrutschen nach Q4 Ergebnis Beat wird durch weiche Führung gefolgt. Warum verkauft Russland sein Gold?

Quellen: Deutsche Welle (DW), Investing.com, Seeking Alpha.

Automatisierte, KI-gestützte Zusammenfassung aus mehrfach bestätigter Berichterstattung. Keine Kauf- oder Anlageempfehlung.`,
  },
  {
    slug: `2026-08-25-kanada-erhebt-vergeltungszolle-auf-us-waren-im-wert-von-20-m`,
    date: `2026-08-25`,
    tag: `Update`,
    title: `Kanada erhebt Vergeltungszölle auf US-Waren im Wert von 20 Milliarden US-Dollar, da sich der Handelskrieg verschärft`,
    excerpt: `Optionen zeigen, dass Nvidia-Aktien nach den Gewinnen einen Kursanstieg von 280 Milliarden US-Dollar erleben werden.`,
    assets: [],
    sources: [
      { name: `Reuters`, url: `https://news.google.com/rss/articles/CBMivwFBVV95cUxQYnllQWZiMlB2MERDOUJLLWZUdGs0SjFhaDVKcVJwNWVGb0FhZ2pramhtQVJlT2l0eUlBREV1YUgzTEgxZzliNjVQR1hRTWdOdGJXSFhlamF3LXl0dGRmZjg0c1NwWEZKNDRiRkgyZG5QUmw1UlZ3dDA2ZlNtMTNabUVxc0UzdDRsNTM1b2hPWHlTZjVadWxJUTRLWGVuM1A3eFQxU21lQm1RY3hpMS1URUcxX1lGQktwZnR6SFhkOA?oc=5` },
      { name: `Associated Press (AP)`, url: `https://news.google.com/rss/articles/CBMigwFBVV95cUxNUExDUGZBbXhJOXZta0tiOEhmckJ2c1Viei1pMnk2ZEpwVVdieFUzVU54X194NW5LRmZ1NlNIaWhCWVFMNFpZN3hzSXJUcF80NFg2TVdfVGJmUzByWkIzQVV4ckE4N2xscjNVeHNiekZKRlBBNlBVVHVsc2NRVVhfQVdxVQ?oc=5` },
      { name: `Financial Times (FT)`, url: `https://www.ft.com/content/7ced71c2-03b8-4569-a68d-14624a7e83f2?syn-25a6b1a6=1` },
      { name: `BBC News`, url: `https://www.bbc.co.uk/news/articles/c3v4xg5klx7o?at_medium=RSS&at_campaign=rss` },
      { name: `BBC World`, url: `https://www.bbc.co.uk/news/articles/c3v4xg5klx7o?at_medium=RSS&at_campaign=rss` },
      { name: `BBC Business`, url: `https://www.bbc.co.uk/news/articles/cx272np7vgyo?at_medium=RSS&at_campaign=rss` },
      { name: `The Guardian`, url: `https://www.theguardian.com/us-news/live/2026/aug/25/donald-trump-tariffs-canada-midterms-primary-south-carolina-iran-ukraine-voting-rights-latest-news-updates` },
      { name: `Deutsche Welle (DW)`, url: `https://www.dw.com/en/canada-announces-retaliatory-tariffs-on-us-goods/a-78491819?maca=en-rss-en-all-1573-rdf` },
      { name: `Al Jazeera English`, url: `https://www.aljazeera.com/economy/2026/8/25/canada-hits-us-with-counter-tariffs-targeting-hundreds-of-products?traffic_source=rss` },
    ],
    body: `Optionen zeigen, dass Nvidia-Aktien nach den Gewinnen einen Kursanstieg von 280 Milliarden US-Dollar erleben werden. Häuser stehen unter Wasser, Zehntausende werden im Süden Chinas umgesiedelt, während die Überschwemmungen zunehmen.

Quellen: Al Jazeera English, Associated Press (AP), BBC Business, BBC News, BBC World, Deutsche Welle (DW), Financial Times (FT), Reuters, The Guardian.

Automatisierte, KI-gestützte Zusammenfassung aus mehrfach bestätigter Berichterstattung. Keine Kauf- oder Anlageempfehlung.`,
  },
  {
    slug: `2026-08-25-eine-neue-solana-abstimmung-konnte-die-taglichen-sol-verbren`,
    date: `2026-08-25`,
    tag: `Marktbeobachtung`,
    title: `Eine neue Solana-Abstimmung könnte die täglichen SOL-Verbrennungen auf 800.000 US-Dollar steigern und die Erstellung neuer Token verlangsamen`,
    excerpt: `Solana-Transaktionen erreichten einen Rekordwert von 4,2 Milliarden, während SOL um 40 % zulegte.`,
    assets: [],
    sources: [
      { name: `CoinDesk`, url: `https://www.coindesk.com/tech/2026/08/24/new-solana-vote-could-ramp-daily-sol-burns-to-usd800-000-and-slow-new-token-creation` },
      { name: `Cointelegraph`, url: `https://cointelegraph.com/news/solana-record-transactions-rwa-sol-price?utm_source=rss_feed&utm_medium=rss&utm_campaign=rss_partner_inbound` },
    ],
    body: `Solana-Transaktionen erreichten einen Rekordwert von 4,2 Milliarden, während SOL um 40 % zulegte. Tokenisierte reale Vermögenswerte auf Solana nähern sich 4 Milliarden US-Dollar, da sich die Netzwerkaktivität zusammen mit einer breiteren Erholung der Kryptomärkte beschleunigt.

Quellen: CoinDesk, Cointelegraph.

Automatisierte, KI-gestützte Zusammenfassung aus mehrfach bestätigter Berichterstattung. Keine Kauf- oder Anlageempfehlung.`,
  },
  {
    slug: `2026-08-25-warum-steigt-die-aktie-von-standard-nuclear-heute-stark-an`,
    date: `2026-08-25`,
    tag: `Update`,
    title: `Warum steigt die Aktie von Standard Nuclear heute stark an?`,
    excerpt: `Warum die Marvell Technology-Aktie heute rasant steigt. Warum verkauft Russland sein Gold?`,
    assets: [],
    sources: [
      { name: `Investing.com`, url: `https://www.investing.com/news/stock-market-news/why-is-standard-nuclear-stock-surging-today-93CH-4875744` },
      { name: `Yahoo Finance`, url: `https://finance.yahoo.com/markets/stocks/articles/why-marvell-technology-stock-rocketing-161452851.html` },
      { name: `Deutsche Welle (DW)`, url: `https://www.dw.com/en/why-is-russia-selling-its-gold/a-78145069?maca=en-rss-en-all-1573-rdf` },
    ],
    body: `Warum die Marvell Technology-Aktie heute rasant steigt. Warum verkauft Russland sein Gold?

Quellen: Deutsche Welle (DW), Investing.com, Yahoo Finance.

Automatisierte, KI-gestützte Zusammenfassung aus mehrfach bestätigter Berichterstattung. Keine Kauf- oder Anlageempfehlung.`,
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
