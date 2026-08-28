/* kuerzen.js
 * ------------
 * LANGE ABSCHNITTE AUF DEM HANDY EINKLAPPEN.
 *
 * Rueckmeldung mehrerer Leser (28.08.2026): "die webseite ist zu
 * ueberladen, vorallem mit text und infos, gerade in der mobilen
 * ansicht". Gemessen: 34 Bildschirmhoehen Scrollen, davon 16 in vier
 * Abschnitten.
 *
 * WARUM EINKLAPPEN UND NICHT LOESCHEN:
 * Der Text traegt die Suchmaschinen-Sichtbarkeit fuer "halal
 * investieren" -- das ist der Grund, warum er ueberhaupt da ist. Er
 * bleibt deshalb VOLLSTAENDIG im Dokument und wird nur optisch
 * beschnitten. Google sieht alles, der Leser zuerst das Wichtigste.
 *
 * NUR AUF SCHMALEN BILDSCHIRMEN. Am Desktop stoert die Laenge nicht,
 * und ein Aufklapper waere dort nur ein zusaetzlicher Klick.
 */
(function () {
  "use strict";

  var SCHWELLE = 760;           // ab hier gilt "Handy"
  var MAX_HOEHE = 560;          // sichtbarer Rest in Pixeln

  function einklappen(abschnitt) {
    var wrap = abschnitt.querySelector(".wrap") || abschnitt;
    var kopf = wrap.querySelector(".section-head");
    var rest = [];
    var kinder = Array.prototype.slice.call(wrap.children);
    var nachKopf = false;
    kinder.forEach(function (kind) {
      if (kind === kopf) { nachKopf = true; return; }
      if (nachKopf || !kopf) rest.push(kind);
    });
    if (!rest.length) return;

    var huelle = document.createElement("div");
    huelle.className = "mehr-inhalt";
    rest[0].parentNode.insertBefore(huelle, rest[0]);
    rest.forEach(function (k) { huelle.appendChild(k); });

    // Passt es ohnehin, bleibt alles wie es ist -- ein Aufklapper fuer
    // drei Zeilen waere laecherlich.
    if (huelle.scrollHeight <= MAX_HOEHE * 1.35) {
      huelle.classList.add("mehr-offen");
      return;
    }

    var knopf = document.createElement("button");
    knopf.type = "button";
    knopf.className = "mehr-knopf";
    knopf.setAttribute("aria-expanded", "false");
    knopf.textContent = "Weiterlesen";
    huelle.parentNode.insertBefore(knopf, huelle.nextSibling);

    knopf.addEventListener("click", function () {
      var offen = huelle.classList.toggle("mehr-offen");
      knopf.setAttribute("aria-expanded", offen ? "true" : "false");
      knopf.textContent = offen ? "Weniger anzeigen" : "Weiterlesen";
      if (!offen) {
        // Beim Zuklappen zurueck zur Ueberschrift, sonst steht der
        // Leser ploetzlich mitten im naechsten Abschnitt.
        var y = abschnitt.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    });
  }

  function start() {
    if (window.innerWidth > SCHWELLE) return;
    if (document.documentElement.classList.contains("gekuerzt")) return;
    document.documentElement.classList.add("gekuerzt");
    document.querySelectorAll("section[data-kuerzen]").forEach(einklappen);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
