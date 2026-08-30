/* ============================================================
   shell.js
   Kopfzeile und Fuß für die Unterseiten.

   Warum als Skript und nicht als Markup in jeder Datei: Vier
   Kopien derselben Navigation laufen nach der zweiten Änderung
   auseinander -- ein Link wird ergänzt, drei bleiben alt. Hier
   steht sie einmal.

   Die Startseite baut ihren Kopf selbst, weil sie zusätzlich
   den Fortschrittsbalken und die Sprungmarken trägt.
   ============================================================ */

(function () {
  "use strict";

  /* Wie viele Ebenen liegt die Startseite über dieser Seite?
     /pages/blog.html -> eine, /pages/wissen/riba.html -> zwei.
     Fest verdrahtetes "../" hat die Wissensseiten ins Leere
     zeigen lassen, sobald sie einen Ordner tiefer lagen. */
  const teile = location.pathname.split("/").filter(Boolean);
  const tiefe = Math.max(0, teile.length - 1);
  const hoch = "../".repeat(tiefe);

  const kopf = document.getElementById("shell-header");
  if (kopf) {
    kopf.className = "header stuck";
    kopf.innerHTML =
      '<div class="wrap header-inner">' +
        '<a href="' + hoch + '" class="logo"><span class="logo-mark">B</span> Barakah&nbsp;Finance</a>' +
        '<nav class="nav" id="nav">' +
          '<a href="' + hoch + '#stufen">Mitgliedschaft</a>' +
          '<a href="' + hoch + '#vip-beispiel">So funktioniert&#39;s</a>' +
          '<a href="' + hoch + 'pages/unternehmen.html">Unternehmen</a>' +
          '<a href="' + hoch + 'pages/blog.html">Beiträge</a>' +
          '<a class="btn btn-sm" data-cta="free" href="#">Kostenlos beitreten</a>' +
        "</nav>" +
        '<button class="burger" id="burger" aria-label="Menü" aria-expanded="false">' +
          "<span></span><span></span><span></span></button>" +
      "</div>";
  }

  const fuss = document.getElementById("shell-footer");
  if (fuss) {
    fuss.className = "footer";
    fuss.innerHTML =
      '<div class="wrap">' +
        '<div class="footer-grid">' +
          '<div><a href="' + hoch + '" class="logo"><span class="logo-mark">B</span> Barakah&nbsp;Finance</a>' +
          '<p style="margin-top:16px;font-size:.92rem;max-width:38ch">Täglich geprüfte Marktnachrichten für Menschen, die halal anlegen wollen und dabei verstehen möchten, was sie tun.</p></div>' +
          '<div><h4>Seite</h4><ul>' +
            '<li><a href="' + hoch + '#stufen">Mitgliedschaft</a></li>' +
            '<li><a href="' + hoch + '#weg">So entsteht eine Meldung</a></li>' +
            '<li><a href="' + hoch + 'pages/unternehmen.html">Unternehmen</a></li>' +
            '<li><a href="' + hoch + 'pages/blog.html">Beiträge</a></li>' +
          "</ul></div>" +
          '<div><h4>Wissen</h4><ul>' +
            '<li><a href="' + hoch + 'pages/wissen/ist-bitcoin-halal.html">Ist Bitcoin halal?</a></li>' +
            '<li><a href="' + hoch + 'pages/wissen/was-ist-riba.html">Was ist Riba?</a></li>' +
            '<li><a href="' + hoch + 'pages/wissen/sind-etfs-halal.html">Sind ETFs halal?</a></li>' +
            '<li><a href="' + hoch + 'pages/wissen/halal-aktien-finden.html">Halal Aktien finden</a></li>' +
          "</ul></div>" +
          '<div><h4>Mitmachen</h4><ul>' +
            '<li><a data-cta="free" href="#">Kostenloser Kanal</a></li>' +
            '<li><a data-cta="pro" href="#">PRO — 9,99 €</a></li>' +
            '<li><a data-cta="vip" href="#">VIP — 39,99 €</a></li>' +
          "</ul></div>" +
        "</div>" +
        '<p class="footer-note"><strong>Keine Anlageberatung.</strong> Alle Inhalte sind Marktbeobachtung und Erklärung — keine Kauf- oder Verkaufsempfehlung, keine Kursziele, keine Renditeversprechen. Der Halal-Screen ist eine Heuristik und ersetzt kein zertifiziertes Sharia-Gutachten. © ' +
        new Date().getFullYear() + ' Barakah Finance. <span class="footer-recht">' +
        '<a href="' + hoch + 'pages/recht/impressum.html">Impressum</a> · ' +
        '<a href="' + hoch + 'pages/recht/datenschutz.html">Datenschutz</a> · ' +
        '<a href="' + hoch + 'pages/recht/agb.html">AGB</a> · ' +
        '<a href="' + hoch + 'pages/recht/widerruf.html">Widerruf</a></span></p>' +
      "</div>";
  }
})();
