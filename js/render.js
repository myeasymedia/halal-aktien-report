/* ============================================================
   render.js
   Baut die datengetriebenen Teile der Startseite: Zahlenband,
   Unternehmen, Beiträge, Halal-Prüfung und Fragen.

   Warum hier und nicht im HTML: Diese Blöcke wiederholen sich.
   Achtzehn Unternehmen von Hand ins HTML zu schreiben heißt,
   achtzehn Stellen zu pflegen, sobald sich das Kartendesign
   ändert -- und genau das passiert bei einer Website ständig.
   ============================================================ */

/* ------------------------------------------------------------
   EINSTIEGSLINKS -- die einzige Stelle, an der sie stehen.
   Trägst du unten einen neuen Einladungslink ein, ändert sich
   er überall auf der Seite: in der Kopfzeile, bei den Stufen,
   im Abschluss und im Fuß.
   ------------------------------------------------------------ */
const LINKS = {
  free: "https://t.me/barakahfinance_free",
  // Ueber den BOT, nicht direkt in die Gruppe -- sonst kommt jeder
  // Besucher ohne Zahlung hinein.
  pro:  "https://t.me/DerFinanzOnkel_Bot?start=beitreten",
  vip:  "https://t.me/DerFinanzOnkel_Bot?start=beitreten",
};

/* Kleiner Helfer: schützt vor Sonderzeichen aus den Daten.
   Ohne ihn würde ein "&" im Firmennamen die Seite zerlegen. */
function esc(s) {
  return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
}

function de(n, digits) {
  return Number(n).toLocaleString("de-DE", {
    minimumFractionDigits: digits == null ? 2 : digits,
    maximumFractionDigits: digits == null ? 2 : digits,
  });
}

/* ---------- Einstiegslinks setzen ---------- */
(function ctas() {
  document.querySelectorAll("[data-cta]").forEach(function (el) {
    const ziel = LINKS[el.dataset.cta];
    if (!ziel) return;
    el.href = ziel;
    el.target = "_blank";
    el.rel = "noopener";
  });
})();

/* ---------- Zahlenband ----------
   Die Werte sind Platzhalter mit realistischen Größenordnungen.
   Sie stehen bewusst NICHT als "live" ausgezeichnet: Eine Zahl
   als aktuell zu verkaufen, die es nicht ist, wäre genau die
   Sorte Unsauberkeit, die wir in den Nachrichten vermeiden. */
const TICKER = [
  { n: "Bitcoin",  v: "78.682 $", d: +1.2 },
  { n: "Gold",     v: "4.709 $",  d: +1.9 },
  { n: "Silber",   v: "68,88 $",  d: -0.8 },
  { n: "Ethereum", v: "2.469 $",  d: +0.2 },
  { n: "Apple",    v: "312,43 $", d: +1.0 },
  { n: "Nvidia",   v: "184,20 $", d: -0.6 },
  { n: "Microsoft",v: "489,33 $", d: +0.4 },
  { n: "Platin",   v: "1.284 $",  d: +2.1 },
];

(function ticker() {
  const box = document.getElementById("ticker");
  if (!box) return;
  function reihe() {
    return TICKER.map(function (t) {
      const rauf = t.d >= 0;
      return '<span class="ticker-item">' +
             '<b>' + esc(t.n) + '</b>' +
             '<span class="mono">' + esc(t.v) + '</span>' +
             '<span class="mono ' + (rauf ? "up" : "down") + '">' +
             (rauf ? "▲ +" : "▼ −") + de(Math.abs(t.d), 1) + " %</span></span>";
    }).join("");
  }
  /* Zweimal dieselbe Reihe: Das Band läuft um genau seine halbe
     Breite und springt dann zurück -- der Übergang ist dadurch
     unsichtbar. Mit nur einer Reihe klafft am Ende eine Lücke. */
  box.innerHTML = reihe() + reihe();
})();

/* ---------- Unternehmen ---------- */
(function companies() {
  const box = document.getElementById("companies");
  if (!box || typeof COMPANIES === "undefined") return;

  box.innerHTML = COMPANIES.slice(0, 6).map(function (c) {
    const konform = String(c.halal_status).toLowerCase().indexOf("konform") === 0;
    const jahr = typeof c.price_change_1y_pct === "number"
      ? '<span class="tag ' + (c.price_change_1y_pct >= 0 ? "tag-ok" : "") + '">' +
        (c.price_change_1y_pct >= 0 ? "+" : "−") + de(Math.abs(c.price_change_1y_pct), 1) + " % (1 J.)</span>"
      : "";
    return '<a class="card co-card reveal" href="pages/unternehmen-detail.html?ticker=' + encodeURIComponent(c.ticker) + '">' +
      '<div class="co-top">' +
        '<div class="co-logo">' + esc(c.ticker.slice(0, 2)) + "</div>" +
        "<div><div class=\"co-name\">" + esc(c.name) + "</div>" +
        '<div class="co-ticker mono">' + esc(c.ticker) + " · " + esc(c.sector) + "</div></div>" +
      "</div>" +
      '<p class="co-desc">' + esc(String(c.description).slice(0, 120)) + "…</p>" +
      '<div class="co-tags">' +
        '<span class="tag ' + (konform ? "tag-ok" : "") + '">' + esc(c.halal_status) + "</span>" +
        jahr +
      "</div></a>";
  }).join("");
})();

/* ---------- Beiträge ---------- */
(function posts() {
  const box = document.getElementById("posts");
  if (!box || typeof POSTS === "undefined") return;

  box.innerHTML = POSTS.slice(0, 3).map(function (p) {
    const datum = new Date(p.date).toLocaleDateString("de-DE", {
      day: "2-digit", month: "long", year: "numeric",
    });
    return '<a class="card post-card reveal" href="pages/blog-post.html?slug=' + encodeURIComponent(p.slug) + '">' +
      '<span class="post-date mono">' + esc(datum) + " · " + esc(p.tag) + "</span>" +
      "<h3>" + esc(p.title) + "</h3>" +
      "<p>" + esc(p.excerpt) + "</p>" +
      '<span class="post-more">Weiterlesen <span>→</span></span></a>';
  }).join("");
})();

/* ---------- Halal-Prüfung zum Anfassen ----------
   Die Spielerei mit dem größten Nutzen: Fast jeder glaubt, der
   Halal-Screen sei eine Branchenliste. Wer hier auf "Technologie"
   klickt und liest, dass die Branche nur die halbe Miete ist,
   hat den Kern in fünf Sekunden verstanden -- schneller, als ein
   Absatz Text es je erklären könnte. */
const SEKTOREN = [
  { n: "Technologie", ok: true,  t: "Keine ausgeschlossene Branche. Jetzt zählt die Bilanz: Wie hoch sind verzinsliche Schulden im Verhältnis zur Marktkapitalisierung, und wie viel wird über Zinsen nebenbei verdient?" },
  { n: "Gesundheit",  ok: true,  t: "Grundsätzlich erlaubt. Geprüft wird danach, ob Nebengeschäfte oder die Finanzierung Zinsanteile enthalten." },
  { n: "Konsumgüter", ok: true,  t: "Erlaubt, solange keine verbotenen Produkte darin stecken. Danach entscheidet die Bilanz." },
  { n: "Industrie",   ok: true,  t: "Erlaubt. Der zweite Schritt ist hier besonders wichtig — Industrieunternehmen sind oft stark fremdfinanziert." },
  { n: "Konventionelle Banken", ok: false, t: "Ausgeschlossen. Das Geschäftsmodell beruht auf Zins, und zwar nicht nebenbei, sondern im Kern." },
  { n: "Alkohol",     ok: false, t: "Ausgeschlossen im ersten Schritt. Hier wird nichts weiter geprüft." },
  { n: "Glücksspiel", ok: false, t: "Ausgeschlossen. Auch dann, wenn es nur ein Teilbereich des Konzerns ist." },
  { n: "Rüstung",     ok: false, t: "Ausgeschlossen im Sektor-Screen." },
  { n: "Erwachsenenunterhaltung", ok: false, t: "Ausgeschlossen im ersten Schritt." },
];

(function screener() {
  const pick = document.getElementById("sectors");
  const out = document.getElementById("verdict");
  if (!pick || !out) return;

  pick.innerHTML = SEKTOREN.map(function (s, i) {
    return '<button class="sector" data-i="' + i + '">' + esc(s.n) + "</button>";
  }).join("");

  pick.addEventListener("click", function (e) {
    const btn = e.target.closest(".sector");
    if (!btn) return;
    pick.querySelectorAll(".sector").forEach(function (b) { b.classList.remove("active"); });
    btn.classList.add("active");

    const s = SEKTOREN[Number(btn.dataset.i)];
    out.className = "screen-out " + (s.ok ? "v-pass" : "v-fail");
    out.innerHTML =
      '<div class="verdict"><span class="verdict-icon">' + (s.ok ? "✓" : "✕") + "</span>" +
      (s.ok ? "Besteht Schritt 1" : "Fällt in Schritt 1 durch") + "</div>" +
      "<p>" + esc(s.t) + "</p>" +
      '<div class="stage">' +
      (s.ok
        ? "Schritt 2 von 2 — der Kennzahlen-Check entscheidet."
        : "Schritt 2 entfällt. Ein Ausschluss im Sektor ist endgültig.") +
      "</div>";
  });
})();

/* ---------- Fragen ---------- */
const FRAGEN = [
  ["Ist das eine Anlageberatung?",
   "Nein, und das ist keine Formalie. Wir geben keine Kauf- oder Verkaufsempfehlungen, keine Kursziele und keine Renditeversprechen. Was wir liefern, ist Erklärung: wie etwas funktioniert, welche Märkte es berührt und welche Fehler dabei üblich sind. Die Entscheidung bleibt deine — und das ist kein Mangel, sondern der Punkt."],
  ["Was unterscheidet die drei Gruppen wirklich?",
   "Nicht das Thema, sondern die Tiefe. Im kostenlosen Kanal steht der Fakt mit Quelle. In PRO steht darunter, was er mit deinem Geld zu tun hat — plus ein wöchentlicher Lehrplan, der bei null anfängt. In VIP kommt jede Meldung in Echtzeit, mit der vollständigen Wirkungskette bis zu den Anlagen, die du hältst."],
  ["Wie funktioniert der Halal-Screen genau?",
   "In zwei Schritten. Zuerst ein Sektor-Ausschluss: konventionelle Zinsgeschäfte, Alkohol, Glücksspiel, Rüstung, Schweinefleisch, Erwachsenenunterhaltung. Danach ein Kennzahlen-Check auf verzinsliche Schulden im Verhältnis zur Marktkapitalisierung und auf zinsbasierte Nebenerträge. Es ist eine Heuristik und ersetzt kein zertifiziertes Sharia-Gutachten."],
  ["Ist Bitcoin halal?",
   "Darüber sind sich Gelehrte nicht einig. Wir beobachten Bitcoin, melden Bewegungen und erklären die Mechanik dahinter — sprechen aber bewusst keine eigene Fatwa aus. Diese Einordnung gehört zu dir und zu deinem Gelehrten, nicht zu einem Nachrichtendienst."],
  ["Woher kommen die Nachrichten?",
   "Aus über 35 Quellen — Reuters, Bloomberg, Financial Times, Handelsblatt, manager magazin, CoinDesk und andere. Eine Meldung geht erst raus, wenn eine zweite unabhängige Quelle sie bestätigt. Kurse stammen von Börsendaten und CoinGecko."],
  ["Warum kommt manchmal tagelang wenig?",
   "Weil wir lieber schweigen als etwas Belangloses schicken. Von rund 190 Meldungen am Tag schaffen es die wenigsten durch alle vier Prüfungen. Ein Kanal, der täglich Füllmaterial sendet, wird nach zwei Wochen nicht mehr gelesen — und dann geht die eine wichtige Meldung mit unter."],
  ["Kann ich jederzeit kündigen?",
   "Ja. Beide bezahlten Gruppen laufen monatlich, ohne Mindestlaufzeit und ohne Kündigungsfrist."],
];

(function faq() {
  const box = document.getElementById("faq-list");
  if (!box) return;
  box.innerHTML = FRAGEN.map(function (f, i) {
    return '<div class="faq-item">' +
      '<button class="faq-q" aria-expanded="false" aria-controls="fa' + i + '">' +
      esc(f[0]) + '<span class="faq-sign"></span></button>' +
      '<div class="faq-a" id="fa' + i + '"><p>' + esc(f[1]) + "</p></div></div>";
  }).join("");
})();

/* ---------- Jahreszahl ---------- */
(function year() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
})();
