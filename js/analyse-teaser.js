/* analyse-teaser.js
 * -------------------
 * DER BLICK INS DASHBOARD -- fuer alle, die (noch) nicht drin sind.
 *
 * Auftrag vom 28.08.2026: "dieses beispiel auf der webseite muss
 * ueberzeugen von der analyse und von der verstaendlichkeit weil die
 * webseite muss verkaufen am ende des tages".
 *
 * DREI ENTSCHEIDUNGEN, DIE DAS TRAGEN:
 *
 * 1. ECHTE DATEN. Kurs, Verlauf und Erklaerung stammen aus der Analyse
 *    dieser Woche. Erfundenen Zahlen sieht man an, dass sie erfunden
 *    sind -- und damit waere der Beweis dahin.
 *
 * 2. EIN GEDANKE VOLLSTAENDIG. Die erste Fassung schnitt mitten im Wort
 *    ab. Das zeigt den Stil, beweist aber nichts: Wer nicht weiss, ob
 *    der Satz gut zu Ende geht, zahlt dafuer nicht. Verschlossen wird
 *    die MENGE, nicht die Qualitaet.
 *
 * 3. AUCH DAS MINUS. Steht bei "aus 10.000 Euro wurden" ein kleinerer
 *    Betrag, wird er genauso gezeigt. Das ist der glaubwuerdigste Satz
 *    auf der ganzen Seite -- jeder andere Anbieter zeigt nur Gewinne.
 */
(function () {
  "use strict";

  var wurzel = document.getElementById("analyse-teaser");
  if (!wurzel || typeof ANALYSE_TEASER === "undefined") return;
  var d = ANALYSE_TEASER;

  function zahl(v, stellen) {
    if (v === null || v === undefined) return "–";
    return v.toLocaleString("de-DE", {
      minimumFractionDigits: stellen, maximumFractionDigits: stellen
    });
  }

  function prozent(v) {
    if (v === null || v === undefined) return "";
    var k = v > 0 ? "up" : (v < 0 ? "down" : "");
    return '<span class="' + k + '">' + (v > 0 ? "+" : "") + zahl(v, 1) + " %</span>";
  }

  function linie(werte) {
    if (!werte || werte.length < 3) return "";
    var min = Math.min.apply(null, werte), max = Math.max.apply(null, werte);
    var spanne = (max - min) || 1, B = 600, H = 150, pad = 8;
    var steigt = werte[werte.length - 1] >= werte[0];
    var farbe = steigt ? "var(--accent, #5fe0a8)" : "var(--rot, #ff6b6b)";
    var punkte = werte.map(function (c, i) {
      return [(i / (werte.length - 1)) * B,
               pad + (1 - (c - min) / spanne) * (H - 2 * pad)];
    });
    var pfad = punkte.map(function (p, i) {
      return (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1);
    }).join(" ");
    return '<svg class="at-linie" viewBox="0 0 ' + B + ' ' + H + '" ' +
      'preserveAspectRatio="none" role="img" aria-label="Kursverlauf ' +
      (d.name || "") + ', ein Jahr">' +
      '<path d="' + pfad + " L" + B + " " + H + " L0 " + H + ' Z" fill="' + farbe +
      '" opacity=".12"/>' +
      '<path d="' + pfad + '" fill="none" stroke="' + farbe + '" stroke-width="2.5" ' +
      'vector-effect="non-scaling-stroke" stroke-linejoin="round"/></svg>';
  }

  function kacheln() {
    var felder = [["30d", "30 Tage"], ["90d", "90 Tage"], ["1y", "1 Jahr"]];
    var da = felder.filter(function (f) {
      var w = d.changes[f[0]];
      return w !== null && w !== undefined;
    });
    if (!da.length) return "";
    return '<div class="at-kacheln" style="grid-template-columns:repeat(' +
      da.length + ',1fr)">' + da.map(function (f) {
        return "<div><span>" + f[1] + "</span>" + prozent(d.changes[f[0]]) + "</div>";
      }).join("") + "</div>";
  }

  // Zwei vollstaendige Wirkungswege. Erst an der ZWEITEN Erklaerung
  // sieht man, dass hinter einem Wert mehrere Kraefte wirken -- und
  // genau das soll der Besucher denken: "so sieht eine Analyse aus".
  function wirkungswege() {
    var wege = d.wirkungswege || [];
    if (!wege.length) return "";
    return '<div class="at-weg"><h4>Was diesen Wert typischerweise bewegt</h4>' +
      wege.map(function (w) {
        return '<div class="at-weg-eintrag">' +
          '<span class="at-anlass">' + w.anlass + "</span>" +
          "<p>" + w.szenario + "</p></div>";
      }).join("") + "</div>";
  }

  // Echte, datierte Termine -- der Beweis, dass die Analyse nach vorn
  // schaut und nicht nur Kurse nacherzaehlt.
  function termine() {
    var t = d.termine || [];
    if (!t.length) return "";
    return '<div class="at-termine"><h4>Was in den nächsten Wochen ansteht</h4><ul>' +
      t.map(function (x) {
        return "<li><span class=\"at-t-icon\">" + (x.icon || "") + "</span>" +
          '<span class="at-t-wann">' + x.wann + (x.zeit ? ", " + x.zeit : "") +
          '</span><span class="at-t-titel">' + x.titel + "</span></li>";
      }).join("") + "</ul></div>";
  }

  var v = d.verborgen || {};
  function anzahl(n, ein, mehr) { return n + " " + (n === 1 ? ein : mehr); }
  var teile = [];
  v.wirkungswege && teile.push(anzahl(v.wirkungswege, "weiterer Wirkungsweg",
                                       "weitere Wirkungswege"));
  v.termine && teile.push(anzahl(v.termine, "anstehender Termin", "anstehende Termine"));
  v.kennzahlen && teile.push(anzahl(v.kennzahlen, "Kennzahl", "Kennzahlen"));
  v.bewegungen && teile.push("die größten Kursbewegungen der letzten Jahre");

  wurzel.innerHTML =
    '<article class="at-karte">' +
      '<div class="at-marke">Echte Analyse aus KW' + d.kw +
        ' — nicht nachgestellt</div>' +
      '<div class="at-kopf">' +
        '<div><h3>' + d.name + '</h3><span class="at-symbol">' + d.symbol +
          "</span></div>" +
        '<div class="at-preis"><b>' + zahl(d.preis, 2) + '</b> <span>' +
          (d.waehrung || "USD") + "</span></div>" +
      "</div>" +
      kacheln() +
      linie(d.verlauf) +
      wirkungswege() +
      termine() +
      '<div class="at-schloss">' +
        '<div class="at-schloss-inner">' +
          '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">' +
            '<path fill="currentColor" d="M12 1a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-1V6a5 5 0 0 0-5-5Zm-3 5a3 3 0 1 1 6 0v3H9V6Z"/>' +
          "</svg>" +
          '<p class="at-schloss-titel">Das war ein Ausschnitt.</p>' +
          (teile.length
            ? '<p class="at-schloss-mehr">Zu diesem Wert kommen noch ' +
              teile.join(" · ") + " dazu."
            : "") +
          (v.weitere_werte
            ? '<p class="at-schloss-mehr">Dazu ' +
              anzahl(v.weitere_werte, "weiterer Wert", "weitere Werte") +
              " — Gold, Aktien, Krypto. <strong>Jeden Sonntag neu.</strong></p>"
            : "") +
          (d.cta
            ? '<a class="btn btn-primary at-schloss-btn" href="' + d.cta +
              '" rel="noopener">Alle Analysen ansehen — VIP</a>'
            : "") +
          '<p class="at-schloss-fuss">39,99 € im Monat · monatlich kündbar</p>' +
        "</div>" +
      "</div>" +
    "</article>";
})();
