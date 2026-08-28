/* ============================================================
   vip-demo.js
   Die animierte VIP-Nachricht: Syrien, aufgehobene Sanktionen,
   Landeswährung.

   WARUM ANIMIERT UND NICHT ALS BILD:
   Weil der Wert der Gruppe in der REIHENFOLGE liegt. Ein Bild
   zeigt alle fünf Schritte gleichzeitig -- dann ist es eine
   Liste. Erscheinen sie nacheinander, denkt der Betrachter
   jeden Schritt mit, und genau dieses Mitdenken ist das, wofür
   jemand bezahlt. Der Schreibindikator davor macht daraus einen
   Moment statt einer Grafik.

   ZAHLEN: gerundet und als Rückblick gekennzeichnet. Der
   Wechselkurs des Syrischen Pfunds wurde jahrelang im Wesentlichen
   über den Parallelmarkt gebildet -- exakte Werte gibt es dafür
   nicht, und wer sie behauptet, erfindet sie.
   ============================================================ */

(function () {
  "use strict";

  const box = document.getElementById("vip-phone");
  if (!box) return;

  const ruhig = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const KETTE = [
    "Sanktionen fallen weg — Banken dürfen wieder überweisen",
    "Hilfsgelder und Rücküberweisungen erreichen das Land",
    "Wer im Land investieren will, braucht die Landeswährung",
    "Die Nachfrage nach Syrischem Pfund steigt",
    "Gleichzeitig bleibt das Angebot knapp — der Kurs zieht an",
  ];

  /* Aufbau einmal erzeugen. Die Kettenschritte starten
     unsichtbar und werden nacheinander eingeblendet. */
  box.innerHTML =
    '<div class="ph-frame"><div class="ph-screen">' +
      '<div class="ph-bar"><span class="ph-dot"></span> Barakah Finance VIP</div>' +
      '<div class="ph-msgs">' +
        '<div class="ph-msg ph-in" data-step="0">' +
          '<span class="ph-title">🔓 US-Sanktionen gegen Syrien aufgehoben</span>' +
          '<span class="ph-sub">Bestätigt durch 2 unabhängige Quellen · 14:02</span>' +
        "</div>" +
        '<div class="ph-typing" id="ph-typing"><span></span><span></span><span></span></div>' +
        '<div class="ph-msg ph-chain" data-step="1">' +
          '<span class="ph-label">Was daraus folgen kann</span>' +
          KETTE.map(function (t, i) {
            return '<div class="ph-step" data-i="' + i + '"><i>' + (i + 1) + "</i>" + t + "</div>";
          }).join("") +
          '<span class="ph-label">Woran du erkennst, ob es hält</span>' +
          '<div class="ph-watch">Öffnen die Korrespondenzbanken wirklich wieder?</div>' +
          '<div class="ph-foot">Bekanntes Muster, keine Prognose. Jeder Schritt kann ausbleiben.</div>' +
          '<span class="ph-time">14:03 ✓✓</span>' +
        "</div>" +
      "</div>" +
    "</div></div>";

  const schritte = box.querySelectorAll(".ph-step");
  const kette = box.querySelector(".ph-chain");
  const tippen = box.querySelector("#ph-typing");

  function sofortFertig() {
    if (tippen) tippen.style.display = "none";
    kette.classList.add("da");
    schritte.forEach(function (s) { s.classList.add("da"); });
  }

  if (ruhig) { sofortFertig(); return; }

  let gelaufen = false;
  function abspielen() {
    if (gelaufen) return;
    gelaufen = true;
    /* Erst der Schreibindikator, dann die Nachricht, dann die
       Schritte im Sekundentakt. Die Pausen sind bewusst kurz --
       wer wartet, scrollt weiter. */
    setTimeout(function () {
      if (tippen) tippen.style.display = "none";
      kette.classList.add("da");
      schritte.forEach(function (s, i) {
        setTimeout(function () { s.classList.add("da"); }, 260 + i * 480);
      });
    }, 1100);
  }

  /* Kein IntersectionObserver als einziger Ausloeser: Er greift
     nicht, wenn per Sprungmarke gescrollt wird. Derselbe Takt
     wie in animate.js -- er haelt sich selbst an. */
  (function pruefen() {
    const k = box.getBoundingClientRect();
    const sichtbar = Math.min(k.bottom, window.innerHeight) - Math.max(k.top, 0);
    if (k.height && sichtbar / k.height > 0.35) { abspielen(); return; }
    setTimeout(pruefen, 250);
  })();

  /* Sicherheitsnetz: Ist nach zwoelf Sekunden nichts passiert,
     wird die Nachricht einfach gezeigt. Eine halb aufgebaute
     Nachricht ist schlimmer als eine fertige ohne Animation. */
  setTimeout(function () {
    if (!kette.classList.contains("da")) sofortFertig();
  }, 12000);
})();
