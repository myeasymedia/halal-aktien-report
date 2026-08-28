/* ============================================================
   pages.js
   Inhalte der Unterseiten: Beitragsliste, einzelner Beitrag,
   Unternehmensliste mit Branchenfilter, Unternehmensdetail.

   Jeder Block prüft zuerst, ob sein Container auf der Seite
   überhaupt existiert. So kann dieselbe Datei auf allen
   Unterseiten geladen werden, ohne dass es vier Varianten gibt.
   ============================================================ */

(function () {
  "use strict";

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function de(n, d) {
    return Number(n).toLocaleString("de-DE",
      { minimumFractionDigits: d == null ? 1 : d, maximumFractionDigits: d == null ? 1 : d });
  }
  function datum(s) {
    return new Date(s).toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" });
  }
  function param(name) {
    return new URLSearchParams(location.search).get(name) || "";
  }

  function postKarte(p) {
    return '<a class="card post-card reveal" href="blog-post.html?slug=' + encodeURIComponent(p.slug) + '">' +
      '<span class="post-date mono">' + esc(datum(p.date)) + " · " + esc(p.tag) + "</span>" +
      "<h3>" + esc(p.title) + "</h3><p>" + esc(p.excerpt) + "</p>" +
      '<span class="post-more">Weiterlesen <span>→</span></span></a>';
  }

  function firmenKarte(c) {
    const konform = String(c.halal_status).toLowerCase().indexOf("konform") === 0;
    const jahr = typeof c.price_change_1y_pct === "number"
      ? '<span class="tag ' + (c.price_change_1y_pct >= 0 ? "tag-ok" : "") + '">' +
        (c.price_change_1y_pct >= 0 ? "+" : "−") + de(Math.abs(c.price_change_1y_pct)) + " % (1 J.)</span>"
      : "";
    return '<a class="card co-card reveal" data-sektor="' + esc(c.sector) +
      '" href="unternehmen-detail.html?ticker=' + encodeURIComponent(c.ticker) + '">' +
      '<div class="co-top"><div class="co-logo">' + esc(c.ticker.slice(0, 2)) + "</div>" +
      '<div><div class="co-name">' + esc(c.name) + "</div>" +
      '<div class="co-ticker mono">' + esc(c.ticker) + " · " + esc(c.sector) + "</div></div></div>" +
      '<p class="co-desc">' + esc(String(c.description).slice(0, 120)) + "…</p>" +
      '<div class="co-tags"><span class="tag ' + (konform ? "tag-ok" : "") + '">' +
      esc(c.halal_status) + "</span>" + jahr + "</div></a>";
  }

  /* ---------- Beitragsliste ---------- */
  const blogBox = document.getElementById("blog-list");
  if (blogBox && typeof POSTS !== "undefined") {
    blogBox.innerHTML = POSTS.map(postKarte).join("") ||
      '<p class="empty">Noch keine Beiträge.</p>';
  }

  /* ---------- Einzelner Beitrag ---------- */
  const postBox = document.getElementById("post");
  if (postBox && typeof POSTS !== "undefined") {
    const p = POSTS.filter(function (x) { return x.slug === param("slug"); })[0];
    if (!p) {
      postBox.innerHTML = '<p class="empty">Diesen Beitrag gibt es nicht (mehr). ' +
        '<a href="blog.html" style="color:var(--jade)">Zur Übersicht</a></p>';
    } else {
      document.title = p.title + " — Barakah Finance";
      /* Beschreibung und Vorschau je Beitrag setzen. Eine statische
         Beschreibung waere bei allen Beitraegen dieselbe -- fuer
         Google ein Duplikat, und in WhatsApp stuende unter jedem
         geteilten Link derselbe Satz. */
      const beschreibung = document.querySelector('meta[name="description"]');
      if (beschreibung) beschreibung.setAttribute("content", p.excerpt);
      const ogTitel = document.querySelector('meta[property="og:title"]');
      if (ogTitel) ogTitel.setAttribute("content", p.title);
      const ogBesch = document.querySelector('meta[property="og:description"]');
      if (ogBesch) ogBesch.setAttribute("content", p.excerpt);
      const absaetze = String(p.body).split("\n\n")
        .map(function (a) { return "<p>" + esc(a) + "</p>"; }).join("");
      postBox.innerHTML =
        '<a class="back" href="blog.html"><span>←</span> Alle Beiträge</a>' +
        '<div class="meta"><span class="chip">' + esc(p.tag) + "</span>" +
        '<span class="post-date mono">' + esc(datum(p.date)) + "</span></div>" +
        "<h1>" + esc(p.title) + "</h1>" +
        '<div class="article-body">' + absaetze + "</div>" +
        quellenBlock(p) +
        '<p class="footer-note" style="margin-top:40px"><strong>Keine Anlageberatung.</strong> ' +
        "Dieser Beitrag ist Marktbeobachtung und Erklärung — keine Kauf- oder " +
        "Verkaufsempfehlung.</p>";
    }
  }

  /* ---------- Unternehmensliste mit Filter ---------- */
  const coBox = document.getElementById("company-grid");
  if (coBox && typeof COMPANIES !== "undefined") {
    coBox.innerHTML = COMPANIES.map(firmenKarte).join("");

    const filterBox = document.getElementById("filters");
    if (filterBox) {
      const sektoren = [];
      COMPANIES.forEach(function (c) {
        if (sektoren.indexOf(c.sector) === -1) sektoren.push(c.sector);
      });
      filterBox.innerHTML = '<button class="sector active" data-s="">Alle</button>' +
        sektoren.map(function (s) {
          return '<button class="sector" data-s="' + esc(s) + '">' + esc(s) + "</button>";
        }).join("");

      filterBox.addEventListener("click", function (e) {
        const b = e.target.closest(".sector");
        if (!b) return;
        filterBox.querySelectorAll(".sector").forEach(function (x) { x.classList.remove("active"); });
        b.classList.add("active");
        const wahl = b.dataset.s;
        coBox.querySelectorAll(".co-card").forEach(function (k) {
          k.style.display = (!wahl || k.dataset.sektor === wahl) ? "" : "none";
        });
      });
    }
  }

  /* ---------- Unternehmensdetail ---------- */
  const detailBox = document.getElementById("company-detail");
  if (detailBox && typeof COMPANIES !== "undefined") {
    const c = COMPANIES.filter(function (x) { return x.ticker === param("ticker"); })[0];
    if (!c) {
      detailBox.innerHTML = '<p class="empty">Dieses Unternehmen ist nicht hinterlegt. ' +
        '<a href="unternehmen.html" style="color:var(--jade)">Zur Übersicht</a></p>';
    } else {
      document.title = c.name + " — Barakah Finance";
      const konform = String(c.halal_status).toLowerCase().indexOf("konform") === 0;
      const jahr = typeof c.price_change_1y_pct === "number"
        ? (c.price_change_1y_pct >= 0 ? "+" : "−") + de(Math.abs(c.price_change_1y_pct)) + " %"
        : "—";

      const hoch = Math.max.apply(null, c.price_history || [0]);
      const tief = Math.min.apply(null, c.price_history || [0]);
      const letzter = (c.price_history || [])[(c.price_history || []).length - 1] || 0;

      /* Beiträge, die diesen Wert nennen. Ein Unternehmen ohne
         Bezug zur Berichterstattung ist ein Datenblatt -- mit
         Bezug wird es eine Geschichte, und Geschichten halten
         Besucher auf der Seite. */
      const passende = (typeof POSTS !== "undefined" ? POSTS : []).filter(function (x) {
        return (x.assets || []).indexOf(c.ticker) !== -1;
      }).slice(0, 3);

      /* Andere Werte derselben Branche -- der naheliegende
         nächste Klick. Ohne ihn endet der Besuch hier. */
      const nachbarn = COMPANIES.filter(function (x) {
        return x.sector === c.sector && x.ticker !== c.ticker;
      }).slice(0, 4);

      detailBox.innerHTML =
        '<a class="back" href="unternehmen.html"><span>←</span> Alle Unternehmen</a>' +
        '<div class="detail-head"><div class="detail-logo">' + esc(c.ticker.slice(0, 2)) + "</div>" +
        "<div><h1 style=\"font-size:clamp(1.7rem,3.6vw,2.6rem)\">" + esc(c.name) + "</h1>" +
        '<div class="co-ticker mono">' + esc(c.ticker) + " · " + esc(c.sector) +
        " · " + esc(c.industry) + "</div></div>" +
        '<span class="tag ' + (konform ? "tag-ok" : "") + '" style="margin-left:auto">' +
        esc(c.halal_status) + "</span></div>" +
        '<p style="margin:18px 0 30px;max-width:70ch">' + esc(c.description) + "</p>" +

        /* Kennzahlen zuerst -- wer schnell schaut, sieht die
           Zahlen und nicht erst drei Absätze Fließtext. */
        '<div class="detail-kpis">' +
          kpi("Veränderung 1 Jahr", jahr, c.price_change_1y_pct >= 0 ? "up" : "down") +
          kpi("12-Monats-Hoch", de(hoch, 0), "") +
          kpi("12-Monats-Tief", de(tief, 0), "") +
          kpi("Zuletzt", de(letzter, 0), "") +
        "</div>" +

        '<div class="detail-grid" style="margin-top:22px">' +
          '<div class="card"><div class="chart-kopf"><h3>Kursverlauf · 12 Monate</h3>' +
            '<span class="mono ' + (c.price_change_1y_pct >= 0 ? "up" : "down") + '">' + jahr + "</span></div>" +
            grosserChart(c.price_history) + "</div>" +
          '<div class="card"><h3 style="margin-bottom:14px">Halal-Einordnung</h3>' +
            '<span class="tag ' + (konform ? "tag-ok" : "") + '">' + esc(c.halal_status) + "</span>" +
            '<p style="margin-top:14px;font-size:.93rem">' + esc(c.halal_note) + "</p>" +
            '<div class="halal-schritte">' +
              '<div class="hs"><span class="hs-num">1</span><span>Sektor-Prüfung</span><span class="hs-ok">bestanden</span></div>' +
              '<div class="hs"><span class="hs-num">2</span><span>Kennzahlen-Prüfung</span><span class="hs-ok">' +
              (konform ? "bestanden" : "offen") + "</span></div>" +
            "</div></div>" +
        "</div>" +

        '<div class="grid-2" style="margin-top:22px">' +
          '<div class="card"><h3 style="margin-bottom:16px">Dafür spricht</h3>' +
            '<ul class="pc-list pros">' + (c.pros || []).map(function (x) {
              return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></div>" +
          '<div class="card"><h3 style="margin-bottom:16px">Dagegen spricht</h3>' +
            '<ul class="pc-list cons">' + (c.cons || []).map(function (x) {
              return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></div>" +
        "</div>" +

        (passende.length
          ? '<div style="margin-top:34px"><h3 style="margin-bottom:16px">Dazu berichtet</h3>' +
            '<div class="grid-3">' + passende.map(postKarte).join("") + "</div></div>"
          : "") +

        (nachbarn.length
          ? '<div style="margin-top:34px"><h3 style="margin-bottom:16px">Weitere aus ' +
            esc(c.sector) + '</h3><div class="nachbarn">' + nachbarn.map(function (n) {
              return '<a class="nachbar" href="unternehmen-detail.html?ticker=' +
                encodeURIComponent(n.ticker) + '"><span class="co-logo">' +
                esc(n.ticker.slice(0, 2)) + '</span><span><b>' + esc(n.name.split(" ")[0]) +
                '</b><span class="mono">' + esc(n.ticker) + "</span></span></a>";
            }).join("") + "</div></div>"
          : "") +

        '<div class="detail-cta"><div><h3>Diese Werte beobachten wir täglich</h3>' +
        "<p>In den Gruppen steht, was eine Meldung dazu für dein Geld bedeutet — " +
        "meist Stunden vor dem Beitrag hier.</p></div>" +
        '<a class="btn" data-cta="pro" href="#">Mitglied werden</a></div>' +

        '<p class="footer-note" style="margin-top:30px"><strong>Keine Anlageberatung.</strong> ' +
        "Die Halal-Einordnung ist eine Heuristik und ersetzt kein zertifiziertes " +
        "Sharia-Gutachten. Vor- und Nachteile sind eine Zusammenfassung öffentlich " +
        "bekannter Punkte, keine Empfehlung. Kursverlauf gerundet und indikativ.</p>";

      /* Einstiegslinks auf nachgeladenen Knöpfen setzen -- sie
         entstehen erst hier, nach dem Durchlauf von render.js. */
      document.querySelectorAll("[data-cta]").forEach(function (el) {
        if (typeof LINKS !== "undefined" && LINKS[el.dataset.cta]) {
          el.href = LINKS[el.dataset.cta];
          el.target = "_blank"; el.rel = "noopener";
        }
      });
    }
  }

  /* Eine Kennzahl-Kachel. */
  function kpi(label, wert, ton) {
    return '<div class="dkpi"><span class="dkpi-lbl">' + esc(label) + "</span>" +
           '<b class="dkpi-val mono ' + (ton || "") + '">' + esc(wert) + "</b></div>";
  }

  /* Der grosse Kursverlauf der Detailseite.

     Anders als die kleine Linie in der Uebersicht traegt er
     Achsenbeschriftung, Hoch- und Tiefpunkt und ein Raster --
     ohne die ist eine Kurve huebsch, aber nicht lesbar: Man
     sieht eine Richtung und weiss nicht, ueber welchen Betrag
     sie geht. Weiterhin von Hand gezeichnet; zwoelf Punkte
     rechtfertigen keine Diagrammbibliothek. */
  function grosserChart(werte) {
    if (!werte || werte.length < 2) return '<p class="empty">Kein Verlauf hinterlegt.</p>';
    const B = 620, H = 240, L = 42, R = 14, T = 18, U = 30;
    const min = Math.min.apply(null, werte), max = Math.max.apply(null, werte);
    const spanne = (max - min) || 1;
    const pad = spanne * 0.12;
    const untenWert = min - pad, obenWert = max + pad;
    const x = function (i) { return L + (i / (werte.length - 1)) * (B - L - R); };
    const y = function (v) { return T + (1 - (v - untenWert) / (obenWert - untenWert)) * (H - T - U); };

    /* Waagerechtes Raster mit drei Linien -- mehr wird bei
       dieser Hoehe zum Gitter statt zur Hilfe. */
    let raster = "";
    for (let i = 0; i <= 2; i++) {
      const wert = untenWert + (obenWert - untenWert) * (i / 2);
      const yy = y(wert);
      raster += '<line x1="' + L + '" y1="' + yy.toFixed(1) + '" x2="' + (B - R) +
                '" y2="' + yy.toFixed(1) + '" class="ch-grid"/>' +
                '<text x="' + (L - 8) + '" y="' + (yy + 4).toFixed(1) +
                '" class="ch-lbl" text-anchor="end">' + de(wert, 0) + "</text>";
    }

    const punkte = werte.map(function (v, i) { return [x(i), y(v)]; });
    let d = "M" + punkte[0][0].toFixed(1) + " " + punkte[0][1].toFixed(1);
    for (let i = 0; i < punkte.length - 1; i++) {
      const p0 = punkte[i === 0 ? 0 : i - 1], p1 = punkte[i];
      const p2 = punkte[i + 1], p3 = punkte[i + 2 < punkte.length ? i + 2 : i + 1];
      d += " C" + (p1[0] + (p2[0] - p0[0]) / 6).toFixed(1) + " " +
           (p1[1] + (p2[1] - p0[1]) / 6).toFixed(1) + "," +
           (p2[0] - (p3[0] - p1[0]) / 6).toFixed(1) + " " +
           (p2[1] - (p3[1] - p1[1]) / 6).toFixed(1) + "," +
           p2[0].toFixed(1) + " " + p2[1].toFixed(1);
    }
    const flaeche = d + " L" + (B - R) + " " + (H - U) + " L" + L + " " + (H - U) + " Z";

    const iHoch = werte.indexOf(max), iTief = werte.indexOf(min);
    const marke = function (i, v, oben) {
      return '<circle cx="' + x(i).toFixed(1) + '" cy="' + y(v).toFixed(1) +
             '" r="4" class="ch-pt ' + (oben ? "ch-pt-hoch" : "ch-pt-tief") + '"/>' +
             '<text x="' + x(i).toFixed(1) + '" y="' + (y(v) + (oben ? -12 : 18)).toFixed(1) +
             '" class="ch-lbl ch-lbl-mark" text-anchor="middle">' + de(v, 0) + "</text>";
    };

    const monate = ["", "", "", "vor 9 M.", "", "", "vor 6 M.", "", "", "vor 3 M.", "", "heute"];
    const xlbl = werte.map(function (_v, i) {
      const t = monate[i] || "";
      if (!t) return "";
      return '<text x="' + x(i).toFixed(1) + '" y="' + (H - 8) +
             '" class="ch-lbl" text-anchor="middle">' + t + "</text>";
    }).join("");

    return '<svg class="ch" viewBox="0 0 ' + B + " " + H + '" role="img" ' +
      'aria-label="Kursverlauf der letzten zwölf Monate">' +
      '<defs><linearGradient id="chFill" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0%" stop-color="#2ee6a8" stop-opacity=".24"/>' +
      '<stop offset="100%" stop-color="#2ee6a8" stop-opacity="0"/></linearGradient></defs>' +
      raster + '<path class="ch-area" d="' + flaeche + '"/>' +
      '<path class="ch-line" d="' + d + '"/>' +
      marke(iHoch, max, true) + marke(iTief, min, false) + xlbl + "</svg>";
  }

  /* Quellen mit Adresse. Eine Quellenangabe ohne Link ist eine
     Behauptung, eine mit Link ein Beleg -- und genau das
     unterscheidet uns von einem Aggregator, der Schlagzeilen
     einsammelt. Ältere Beiträge haben das Feld noch nicht,
     deshalb die Prüfung statt der Voraussetzung. */
  function quellenBlock(p) {
    const q = p.sources || [];
    if (!q.length) return "";
    const eintraege = q.map(function (s) {
      const name = esc(s.name);
      return s.url
        ? '<a class="quelle" href="' + esc(s.url) + '" target="_blank" rel="noopener nofollow">' +
          name + ' <span aria-hidden="true">↗</span></a>'
        : '<span class="quelle quelle-tot">' + name + "</span>";
    }).join("");
    return '<div class="quellen"><h3>Zum Nachlesen bei der Quelle</h3>' +
           '<div class="quellen-liste">' + eintraege + "</div>" +
           '<p style="margin-top:12px;font-size:.85rem">Wir veröffentlichen erst, wenn ' +
           "mindestens zwei unabhängige Quellen dasselbe berichten. Hier sind sie.</p></div>";
  }

  /* Kursverlauf als reine SVG-Linie -- für zwölf Punkte lohnt
     keine Diagrammbibliothek. Sie würde mehr wiegen als die
     ganze Seite. */
  function sparkline(werte) {
    if (!werte || werte.length < 2) return '<p class="empty">Kein Verlauf hinterlegt.</p>';
    const b = 600, h = 120, pad = 6;
    const min = Math.min.apply(null, werte), max = Math.max.apply(null, werte);
    const spanne = (max - min) || 1;
    const punkte = werte.map(function (v, i) {
      const x = pad + (i / (werte.length - 1)) * (b - pad * 2);
      const y = pad + (1 - (v - min) / spanne) * (h - pad * 2);
      return [x, y];
    });
    const linie = punkte.map(function (p, i) {
      return (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1);
    }).join(" ");
    const flaeche = linie + " L" + (b - pad) + " " + (h - pad) + " L" + pad + " " + (h - pad) + " Z";
    return '<svg class="spark" viewBox="0 0 ' + b + " " + h + '" preserveAspectRatio="none" aria-hidden="true">' +
      '<defs><linearGradient id="sparkfill" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0%" stop-color="#2ee6a8" stop-opacity=".28"/>' +
      '<stop offset="100%" stop-color="#2ee6a8" stop-opacity="0"/></linearGradient></defs>' +
      '<path class="area" d="' + flaeche + '"/><path d="' + linie + '"/></svg>';
  }
})();
