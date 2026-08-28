/* ============================================================
   animate.js
   Alles, was sich bewegt: Kopfzeile, Menü, Fortschritt,
   Einblenden beim Scrollen, kippende Karten, Fragen-Aufklapper.

   Grundsatz: Jede Bewegung hat eine Aufgabe -- Aufmerksamkeit
   lenken, einen Zustand zeigen oder eine Reihenfolge herstellen.
   Was nur hübsch ist, kostet Ladezeit und Ablenkung, und beides
   zahlt der Besucher.

   Wer im Betriebssystem "Bewegung reduzieren" eingestellt hat,
   bekommt hier gar nichts davon -- das ist keine Nettigkeit,
   sondern eine Bedienungshilfe.
   ============================================================ */

(function () {
  "use strict";

  const ruhig = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Kopfzeile & Fortschritt ---------- */
  const header = document.getElementById("header");
  const progress = document.getElementById("progress");

  function beimScrollen() {
    const y = window.scrollY;
    if (header) header.classList.toggle("stuck", y > 24);
    if (progress) {
      const hoehe = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.setProperty("--p", hoehe > 0 ? (y / hoehe).toFixed(4) : 0);
    }
  }
  /* requestAnimationFrame statt direktem Scroll-Handler: Der
     Browser feuert beim Scrollen dutzende Male pro Sekunde,
     und jedes Schreiben am Stil erzwingt sonst ein Neuzeichnen. */
  let geplant = false;
  window.addEventListener("scroll", function () {
    if (geplant) return;
    geplant = true;
    requestAnimationFrame(function () { beimScrollen(); geplant = false; });
  }, { passive: true });
  beimScrollen();

  /* ---------- Menü auf dem Handy ---------- */
  const burger = document.getElementById("burger");
  const nav = document.getElementById("nav");
  if (burger && nav) {
    burger.addEventListener("click", function () {
      const offen = nav.classList.toggle("open");
      burger.classList.toggle("open", offen);
      burger.setAttribute("aria-expanded", String(offen));
    });
    /* Nach dem Antippen eines Ziels schließen -- sonst verdeckt
       das Menü genau den Abschnitt, zu dem es gesprungen ist. */
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        nav.classList.remove("open");
        burger.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- Einblenden beim Scrollen ----------
     Versetzt, damit das Auge einer Reihenfolge folgt statt alles
     gleichzeitig zu sehen. Der Versatz gilt nur innerhalb einer
     Reihe; sonst wartet man am Seitenende sekundenlang. */
  /* Ab hier uebernimmt das Skript die Sichtbarkeit. Steht diese
     Zeile nicht, bleibt alles sichtbar -- siehe CSS. */
  if (!ruhig) document.documentElement.classList.add("reveal-ready");

  let beobachter = null;

  function beobachte() {
    /* IMMER neu abfragen: render.js, case.js und pages.js fügen
       ihre Karten erst nach dem Start ein. Eine einmal gezogene
       Liste kennt sie nie -- am 25.08.2026 blieben dadurch 35
       Elemente dauerhaft unsichtbar, darunter die halbe
       Fallstudie. Wer .observe() zweimal auf dasselbe Element
       ruft, tut nichts; der Aufruf ist also gefahrlos. */
    const offen = document.querySelectorAll(".reveal:not(.in)");
    if (!beobachter) { offen.forEach(function (el) { el.classList.add("in"); }); return; }
    offen.forEach(function (el) { beobachter.observe(el); });
  }

  if ("IntersectionObserver" in window && !ruhig) {
    beobachter = new IntersectionObserver(function (eintraege) {
      eintraege.forEach(function (e, i) {
        if (!e.isIntersecting) return;
        setTimeout(function () { e.target.classList.add("in"); }, Math.min(i, 5) * 70);
        beobachter.unobserve(e.target);
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -6% 0px" });
  }
  beobachte();

  /* Zweiter und dritter Durchlauf für alles, was die anderen
     Skripte erst danach einfügen. Zwei Zeitpunkte statt einem,
     weil manche Blöcke auf Daten warten. */
  setTimeout(beobachte, 60);
  setTimeout(beobachte, 400);

  /* Sicherheitsnetz, bewusst NICHT am Scroll-Ereignis:
     Sprungmarken, Tastatur-Navigation und programmatisches
     Scrollen loesen es nicht zuverlaessig aus -- im Testbrowser
     ueberhaupt nicht. Ein kurzer Takt kostet praktisch nichts
     und haelt sich von selbst an, sobald alles sichtbar ist. */
  (function sichten() {
    let offeneArbeit = false;

    document.querySelectorAll(".reveal:not(.in)").forEach(function (el) {
      offeneArbeit = true;
      const k = el.getBoundingClientRect();
      if (k.top < window.innerHeight * 0.95 && k.bottom > 0) el.classList.add("in");
    });

    document.querySelectorAll("[data-count]:not([data-done])").forEach(function (el) {
      offeneArbeit = true;
      if (imBlick(el, 0.4)) { el.dataset.done = "1"; zaehle(el); }
    });

    const tr = document.getElementById("funnel");
    if (tr && tr.dataset.wachsen === "offen") {
      offeneArbeit = true;
      if (imBlick(tr, 0.3)) { tr.dataset.wachsen = "fertig"; window.__funnelWachsen(); }
    }

    if (offeneArbeit) setTimeout(sichten, 200);   // haelt sich selbst an
  })();

  /* ---------- Kippende Karten ----------
     Kein Schatten-Effekt um seiner selbst willen: Das Kippen
     folgt dem Zeiger und macht die Karte damit anfassbar. Der
     Ausschlag ist bewusst klein -- alles darüber wirkt wie ein
     Spielzeug, nicht wie ein Finanzprodukt. */
  if (!ruhig && window.matchMedia("(hover: hover)").matches) {
    document.querySelectorAll(".tilt-scope").forEach(function (bereich) {
      bereich.querySelectorAll(".tilt").forEach(function (karte) {
        karte.addEventListener("mousemove", function (e) {
          const k = karte.getBoundingClientRect();
          const x = (e.clientX - k.left) / k.width - 0.5;
          const y = (e.clientY - k.top) / k.height - 0.5;
          karte.style.setProperty("--ry", (x * 9).toFixed(2) + "deg");
          karte.style.setProperty("--rx", (-y * 9).toFixed(2) + "deg");
        });
        karte.addEventListener("mouseleave", function () {
          karte.style.setProperty("--ry", "0deg");
          karte.style.setProperty("--rx", "0deg");
        });
      });
    });
  }

  /* ---------- Fragen-Aufklapper ----------
     Die Höhe wird in Pixeln gesetzt statt auf "auto": CSS kann
     nach auto nicht weich überblenden, und ein Aufklappen ohne
     Übergang wirkt wie ein Sprung. */
  document.addEventListener("click", function (e) {
    const frage = e.target.closest(".faq-q");
    if (!frage) return;
    const eintrag = frage.parentElement;
    const antwort = eintrag.querySelector(".faq-a");
    const offen = eintrag.classList.toggle("open");
    frage.setAttribute("aria-expanded", String(offen));
    antwort.style.height = offen ? antwort.scrollHeight + "px" : "0px";
  });

  /* Bei Größenänderung die offene Antwort nachmessen -- sonst
     schneidet sie ab, wenn der Text auf dem Handy umbricht. */
  window.addEventListener("resize", function () {
    document.querySelectorAll(".faq-item.open .faq-a").forEach(function (a) {
      a.style.height = a.scrollHeight + "px";
    });
  });

  /* ---------- Zählende Zahlen ----------
     Eine Zahl, die hochzählt, wird gelesen. Dieselbe Zahl fest
     hingeschrieben wird überflogen -- das ist der ganze Zweck,
     nicht der Effekt an sich. Deshalb läuft sie EINMAL und
     kurz; eine Zahl, die drei Sekunden zappelt, nervt. */
  function zaehle(el) {
    const ziel = Number(el.dataset.count);
    if (!isFinite(ziel)) return;
    /* Die richtige Zahl steht bereits im HTML. Erst HIER wird auf
       null zurueckgesetzt -- und zwar nur, wenn gleich auch
       hochgezaehlt wird.

       Andersherum (im HTML eine 0, die das Skript ersetzt) sieht
       der Besucher vier Nullen, sobald irgendetwas klemmt:
       gedrosseltes Zeichnen, ein Skriptfehler weiter oben, ein
       Blocker. Genau das ist am 25.08.2026 passiert. Eine falsche
       Zahl auf einer Finanzseite ist schlimmer als gar keine
       Animation. */
    if (ruhig) { el.textContent = ziel.toLocaleString("de-DE"); return; }
    el.textContent = "0";
    const dauer = 1100;
    const start = performance.now();
    /* setTimeout statt requestAnimationFrame: rAF liefert keine
       Bilder, wenn der Tab im Hintergrund liegt oder der Browser
       das Zeichnen drosselt -- dann bleibt die Zahl auf 0 stehen,
       und der Besucher sieht eine kaputte Kachel statt einer
       Zahl. Fuer einen Wert, der einmal ueber eine Sekunde
       hochlaeuft, ist der Unterschied in der Glaettung nicht
       sichtbar, der Unterschied in der Verlaesslichkeit schon. */
    (function schritt() {
      const t = Math.min(1, (performance.now() - start) / dauer);
      /* Weiches Auslaufen: Ohne das wirkt das Ende abgehackt. */
      const e = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(ziel * e).toLocaleString("de-DE");
      if (t < 1) setTimeout(schritt, 24);
    })();
  }

  /* Kein eigener Beobachter: Zaehler, Trichter und Einblendung
     haengen jetzt am selben Takt (siehe sichten() weiter unten).
     Ein IntersectionObserver ist der elegantere Weg, greift aber
     nicht, wenn die Seite per Sprungmarke oder Tastatur bewegt
     wird -- und in einem automatisierten Browser ueberhaupt
     nicht. Ein Takt, der sich selbst anhaelt, tut es immer. */
  function imBlick(el, anteil) {
    const k = el.getBoundingClientRect();
    if (!k.height) return false;
    const sichtbar = Math.min(k.bottom, window.innerHeight) - Math.max(k.top, 0);
    return sichtbar > 0 && sichtbar / k.height >= (anteil || 0.35);
  }

  /* ---------- Trichter ----------
     Die Balken wachsen erst, wenn man sie sieht. Sonst ist die
     Bewegung vorbei, bevor jemand hinschaut -- und dann hätte
     man sie sich sparen können. */
  const trichter = document.getElementById("funnel");
  if (trichter) {
    const balken = trichter.querySelectorAll(".funnel-bar");
    function wachsen() {
      balken.forEach(function (b, i) {
        const breite = b.dataset.w + "%";
        if (ruhig) { b.style.width = breite; return; }
        setTimeout(function () { b.style.width = breite; }, i * 130);
      });
    }
    /* Die Endbreiten stehen bereits im HTML. Nur wenn wirklich
       animiert wird, werden sie kurz eingeklappt -- sonst bleibt
       der Trichter einfach fertig stehen. Ein Diagramm, das bei
       einem Skriptfehler auf Null zusammenfaellt, sieht aus wie
       ein Datenfehler und nicht wie ein Animationsfehler. */
    if (!ruhig) {
      balken.forEach(function (b) { b.style.width = "62px"; });
      trichter.dataset.wachsen = "offen";
      window.__funnelWachsen = wachsen;
    }
  }

  /* ---------- Magnetische Schaltflächen ----------
     Sehr geringer Ausschlag (max. 4 px). Er reicht, damit sich
     der Zeiger "eingefangen" anfühlt, und bleibt so klein, dass
     niemand danebenklickt. */
  if (!ruhig && window.matchMedia("(hover: hover)").matches) {
    document.querySelectorAll(".btn").forEach(function (b) {
      b.addEventListener("mousemove", function (e) {
        const k = b.getBoundingClientRect();
        const x = (e.clientX - k.left - k.width / 2) / k.width;
        const y = (e.clientY - k.top - k.height / 2) / k.height;
        b.style.transform = "translate(" + (x * 8).toFixed(1) + "px," +
                            (y * 5 - 2).toFixed(1) + "px)";
      });
      b.addEventListener("mouseleave", function () { b.style.transform = ""; });
    });
  }
})();
