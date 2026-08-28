/* ============================================================
   case.js
   Die Fallstudie: Russland-Sanktionen 2022 und der Rubel.

   WARUM AUSGERECHNET DIESER FALL:
   Weil er die Kernbehauptung dieser Seite in einem einzigen
   Beispiel beweist -- und zwar an einem Verlauf, den fast jeder
   falsch erinnert. Die Schlagzeile im Maerz 2022 lautete
   "Rubel im freien Fall". Wer nur sie las, hat den zweiten Teil
   verpasst: Vier Monate spaeter stand der Rubel STAERKER als
   vor dem Krieg.

   Dazwischen lag kein Zufall, sondern eine Kette, deren
   Glieder einzeln nachvollziehbar sind. Genau das verkaufen
   wir -- nicht die Schlagzeile, sondern was daraus folgt.

   ALLE ZAHLEN SIND HISTORISCH UND GERUNDET. Das ist ein
   Rueckblick, keine Vorhersage, und der Text sagt das auch.
   ============================================================ */

(function () {
  "use strict";

  /* Rubel je US-Dollar. Ein STEIGENDER Wert heisst hier ein
     SCHWAECHERER Rubel -- das ist die uebliche Notierung und
     genau die Stelle, an der Laien die Grafik falsch lesen.
     Deshalb steht die Erklaerung direkt an der Achse. */
  const VERLAUF = [
    { m: "Jan 22", v: 76 },
    { m: "Feb 22", v: 84 },
    { m: "Mrz 22", v: 135 },
    { m: "Apr 22", v: 79 },
    { m: "Mai 22", v: 66 },
    { m: "Jun 22", v: 53 },
    { m: "Jul 22", v: 58 },
    { m: "Aug 22", v: 60 },
  ];

  const KETTE = [
    {
      datum: "24. Februar 2022",
      titel: "Der Einmarsch beginnt",
      text: "Russische Truppen überschreiten die Grenze zur Ukraine. Die Schlagzeile ist überall — und sie sagt noch nichts darüber, was mit dem Geld passiert.",
      marke: "Ausgangspunkt",
    },
    {
      datum: "26. Februar 2022",
      titel: "Der Zahlungsweg wird gekappt",
      text: "Mehrere russische Banken werden vom internationalen Zahlungsverkehr ausgeschlossen, ein Teil der Zentralbank-Reserven eingefroren. Nicht die Ware wird sanktioniert — der Weg, auf dem Geld dafür fließt.",
      marke: "Sanktionen",
    },
    {
      datum: "28. Februar 2022",
      titel: "Der Rubel stürzt",
      text: "Der Kurs fällt binnen Tagen von rund 80 auf über 130 Rubel je Dollar. Die Notenbank hebt den Leitzins von 9,5 auf 20 Prozent und friert den Kapitalabfluss ein.",
      marke: "−40 %",
      ton: "runter",
    },
    {
      datum: "März 2022",
      titel: "Die Ware wird weiter gebraucht",
      text: "Hier bricht die Erzählung mit der Erwartung: Europa kauft weiter Gas. Sanktionen unterbrechen den Zahlungsweg, nicht den Bedarf. Und ein Bedarf, der bleibt, sucht sich einen neuen Weg.",
      marke: "Der Wendepunkt",
    },
    {
      datum: "31. März 2022",
      titel: "Bezahlt wird in Rubel",
      text: "Russland verlangt die Bezahlung von Gaslieferungen in Rubel. Wer kaufen will, muss die Währung vorher besorgen — aus einer politischen Forderung wird eine echte Nachfrage.",
      marke: "Nachfrage entsteht",
    },
    {
      datum: "Juni 2022",
      titel: "Stärker als vor dem Krieg",
      text: "Der Rubel notiert bei rund 53 je Dollar — deutlich fester als die etwa 76 vor dem Einmarsch. Nicht weil die Wirtschaft gesund wäre, sondern weil Nachfrage entstand und Abfluss verhindert wurde.",
      marke: "+30 % ggü. Vorkriegsniveau",
      ton: "rauf",
    },
  ];

  const box = document.getElementById("case-steps");
  if (box) {
    box.innerHTML = KETTE.map(function (s, i) {
      const tonKlasse = s.ton ? " marke-" + s.ton : "";
      return '<article class="case-step reveal" data-i="' + i + '">' +
        '<div class="case-dot"><span>' + (i + 1) + "</span></div>" +
        '<div class="case-body">' +
          '<div class="case-meta"><span class="mono">' + s.datum + "</span>" +
          '<span class="case-marke' + tonKlasse + '">' + s.marke + "</span></div>" +
          "<h3>" + s.titel + "</h3><p>" + s.text + "</p>" +
        "</div></article>";
    }).join("");
  }

  /* ---------- Verlaufsgrafik ----------
     Von Hand gezeichnet statt mit einer Bibliothek: Acht Punkte
     rechtfertigen keine 300 KB Diagrammcode, und die Linie muss
     ohnehin gegen die Leserichtung beschriftet werden. */
  const svgBox = document.getElementById("case-chart");
  if (svgBox) {
    /* Auf dem Handy ist die Grafik hoeher als breit gedacht:
       Bei 720 x 260 auf 340px Breite bleiben knapp 120px Hoehe
       uebrig -- darin ist ein Absturz von 76 auf 135 kaum als
       Absturz zu erkennen. Genau der ist aber der Punkt. */
    const schmal = window.innerWidth < 700;
    const B = 720, H = schmal ? 360 : 260;
    const L = schmal ? 30 : 46, R = 16, T = schmal ? 34 : 22, U = schmal ? 44 : 34;
    const werte = VERLAUF.map(function (p) { return p.v; });
    const min = 40, max = 145;
    const x = function (i) { return L + (i / (VERLAUF.length - 1)) * (B - L - R); };
    const y = function (v) { return T + (1 - (v - min) / (max - min)) * (H - T - U); };

    /* Weiche Kurve statt Streckenzug. Die Stuetzpunkte liegen
       auf einem Sechstel des Abstands zum Nachbarn -- das ist
       die uebliche Catmull-Rom-Naeherung und haelt die Kurve
       dicht an den echten Werten. Mehr Rundung waere huebscher
       und ungenauer; bei Kursdaten ist das keine Abwaegung. */
    function kurve(punkte) {
      if (punkte.length < 2) return "";
      let d = "M" + punkte[0][0].toFixed(1) + " " + punkte[0][1].toFixed(1);
      for (let i = 0; i < punkte.length - 1; i++) {
        const p0 = punkte[i === 0 ? 0 : i - 1];
        const p1 = punkte[i];
        const p2 = punkte[i + 1];
        const p3 = punkte[i + 2 < punkte.length ? i + 2 : i + 1];
        const c1x = p1[0] + (p2[0] - p0[0]) / 6;
        const c1y = p1[1] + (p2[1] - p0[1]) / 6;
        const c2x = p2[0] - (p3[0] - p1[0]) / 6;
        const c2y = p2[1] - (p3[1] - p1[1]) / 6;
        d += " C" + c1x.toFixed(1) + " " + c1y.toFixed(1) + "," +
             c2x.toFixed(1) + " " + c2y.toFixed(1) + "," +
             p2[0].toFixed(1) + " " + p2[1].toFixed(1);
      }
      return d;
    }
    const stuetzen = VERLAUF.map(function (p, i) { return [x(i), y(p.v)]; });
    const linie = kurve(stuetzen);
    const flaeche = linie + " L" + x(VERLAUF.length - 1).toFixed(1) + " " + (H - U) +
                    " L" + L + " " + (H - U) + " Z";

    /* Waagerechte Hilfslinie auf dem Vorkriegsniveau. Ohne sie
       sieht man zwar den Absturz, aber nicht den eigentlichen
       Punkt: dass die Linie darunter endet. */
    const vorkrieg = y(76);

    const punkte = VERLAUF.map(function (p, i) {
      return '<circle cx="' + x(i).toFixed(1) + '" cy="' + y(p.v).toFixed(1) +
             '" r="3.5" class="case-pt"/>';
    }).join("");

    /* Auf schmalen Geraeten nur jede zweite Monatsangabe --
       acht Beschriftungen auf 340px ueberlappen sich sonst zu
       einem grauen Strich. */
    const beschriftung = VERLAUF.map(function (p, i) {
      if (schmal && i % 2 === 1 && i !== VERLAUF.length - 1) return "";
      return '<text x="' + x(i).toFixed(1) + '" y="' + (H - 14) +
             '" class="case-lbl" text-anchor="middle">' + p.m + "</text>";
    }).join("");

    svgBox.innerHTML =
      '<svg viewBox="0 0 ' + B + " " + H + '" class="case-svg" role="img" ' +
      'aria-label="Rubel je US-Dollar von Januar bis August 2022">' +
        "<defs><linearGradient id=\"caseFill\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">" +
          '<stop offset="0%" stop-color="#2ee6a8" stop-opacity=".26"/>' +
          '<stop offset="100%" stop-color="#2ee6a8" stop-opacity="0"/>' +
        "</linearGradient></defs>" +
        '<line x1="' + L + '" y1="' + vorkrieg.toFixed(1) + '" x2="' + (B - R) +
          '" y2="' + vorkrieg.toFixed(1) + '" class="case-ref"/>' +
        '<text x="' + (L + 4) + '" y="' + (vorkrieg - 10).toFixed(1) +
          '" class="case-lbl case-lbl-ref">Vor dem Einmarsch: 76</text>' +
        '<path d="' + flaeche + '" class="case-area"/>' +
        '<path d="' + linie + '" class="case-line"/>' +
        punkte + beschriftung +
        '<text x="' + L + '" y="14" class="case-lbl">Rubel je US-Dollar — höher heißt schwächer</text>' +
      "</svg>";

    /* Die Linie zeichnet sich beim Scrollen. Der Effekt hat hier
       eine Aufgabe: Er erzwingt die Leserichtung und damit die
       Reihenfolge, in der die Geschichte funktioniert. */
    const pfad = svgBox.querySelector(".case-line");
    if (pfad && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const laenge = pfad.getTotalLength();
      pfad.style.strokeDasharray = laenge;
      pfad.style.strokeDashoffset = laenge;
      if ("IntersectionObserver" in window) {
        new IntersectionObserver(function (e, o) {
          if (!e[0].isIntersecting) return;
          pfad.style.transition = "stroke-dashoffset 2.2s cubic-bezier(.16,1,.3,1)";
          pfad.style.strokeDashoffset = "0";
          o.disconnect();
        }, { threshold: 0.3 }).observe(svgBox);
      } else {
        pfad.style.strokeDashoffset = "0";
      }
    }
  }
})();
