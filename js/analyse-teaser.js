/* analyse-teaser.js
 * -------------------
 * DER BLICK INS DASHBOARD -- fuer alle, die (noch) nicht drin sind.
 *
 * Auftrag vom 28.08.2026: "damit leute die auf der webseite sind das mal
 * sehen und das eventuell deren interessen weckt was das dashboard alles
 * kann und dann aber nur fuer vip mitglieder schoen provokant".
 *
 * DER REIZ ENTSTEHT DURCH ECHTHEIT: Kurs, Verlauf und der erste halbe
 * Satz der Erklaerung sind die WIRKLICHEN Daten aus der Analyse dieser
 * Woche (data/analyse-teaser.js, taeglich erzeugt). Ausgedachte
 * Platzhalter wuerden genau das kaputtmachen -- man sieht ihnen an, dass
 * sie erfunden sind.
 *
 * Alles Weitere liegt hinter dem Schloss, und daneben steht, WIE VIEL
 * dort liegt: "noch 2 Wirkungswege, 6 Kennzahlen, 12 weitere Werte".
 * Eine Zahl weckt mehr Neugier als ein leeres Versprechen.
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
      (d.name || "") + '">' +
      '<path d="' + pfad + " L" + B + " " + H + " L0 " + H + ' Z" fill="' + farbe +
      '" opacity=".12"/>' +
      '<path d="' + pfad + '" fill="none" stroke="' + farbe + '" stroke-width="2.5" ' +
      'vector-effect="non-scaling-stroke" stroke-linejoin="round"/></svg>';
  }

  // Leere Kacheln weglassen -- eine Ueberschrift ohne Zahl darunter
  // sieht aus, als fehlten Daten.
  function kacheln() {
    var felder = [["30d", "30 Tage"], ["90d", "90 Tage"], ["1y", "1 Jahr"]];
    var vorhanden = felder.filter(function (f) {
      var w = d.changes[f[0]];
      return w !== null && w !== undefined;
    });
    if (!vorhanden.length) return "";
    return '<div class="at-kacheln" style="grid-template-columns:repeat(' +
      vorhanden.length + ',1fr)">' + vorhanden.map(function (f) {
        return "<div><span>" + f[1] + "</span>" + prozent(d.changes[f[0]]) + "</div>";
      }).join("") + "</div>";
  }

  // Ein/Mehrzahl richtig setzen -- "1 anstehende Termine" liest sich
  // schludrig, und Schludrigkeit ist genau das Gegenteil dessen, was
  // dieser Ausschnitt zeigen soll.
  function anzahl(n, einzahl, mehrzahl) {
    return n + " " + (n === 1 ? einzahl : mehrzahl);
  }

  var v = d.verborgen || {};
  var teile = [];
  v.wirkungswege && teile.push(anzahl(v.wirkungswege,
    "weiterer Wirkungsweg", "weitere Wirkungswege"));
  v.kennzahlen && teile.push(anzahl(v.kennzahlen, "Kennzahl", "Kennzahlen"));
  v.termine && teile.push(anzahl(v.termine,
    "anstehender Termin", "anstehende Termine"));
  v.bewegungen && teile.push("die größten Kursbewegungen");
  var mehr = teile.join(" · ");

  wurzel.innerHTML =
    '<article class="at-karte">' +
      '<div class="at-marke">Echte Analyse aus KW' + d.kw + ' — nicht nachgestellt</div>' +
      '<div class="at-kopf">' +
        '<div><h3>' + d.name + '</h3><span class="at-symbol">' + d.symbol + '</span></div>' +
        '<div class="at-preis"><b>' + zahl(d.preis, 2) + '</b> <span>' +
          (d.waehrung || "USD") + '</span></div>' +
      '</div>' +
      kacheln() +
      linie(d.verlauf) +
      '<div class="at-weg">' +
        '<span class="at-anlass">' + (d.anlass || "Wirkungsweg") + '</span>' +
        '<p>' + (d.anriss || "") + '</p>' +
      '</div>' +
      '<div class="at-schloss">' +
        '<div class="at-schloss-inner">' +
          '<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">' +
            '<path fill="currentColor" d="M12 1a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-1V6a5 5 0 0 0-5-5Zm-3 5a3 3 0 1 1 6 0v3H9V6Z"/>' +
          '</svg>' +
          '<p class="at-schloss-titel">Hier geht es weiter — für VIP-Mitglieder</p>' +
          (mehr ? '<p class="at-schloss-mehr">' + mehr + '</p>' : "") +
          (v.weitere_werte ? '<p class="at-schloss-mehr">und ' +
            anzahl(v.weitere_werte, "weiterer Wert", "weitere Werte") +
            ', jede Woche neu</p>' : "") +
          (d.cta ? '<a class="btn btn-primary at-schloss-btn" href="' + d.cta +
            '" rel="noopener">VIP beitreten</a>' : "") +
        '</div>' +
      '</div>' +
    '</article>';
})();
