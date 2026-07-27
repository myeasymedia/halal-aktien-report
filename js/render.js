/* ============================================================
   render.js
   Gemeinsame Helfer-Funktionen: Sparkline-SVGs, Karten-Templates.
   Wird von index.html, blog.html, unternehmen.html verwendet.
   ============================================================ */

/** Erzeugt eine kleine SVG-Sparkline aus einer Zahlen-Reihe. */
function renderSparkline(values, { color = "#2dd4a7", width = 240, height = 40 } = {}) {
  if (!values || values.length < 2) return "";
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const stepX = width / (values.length - 1);

  const points = values.map((v, i) => {
    const x = i * stepX;
    const y = height - ((v - min) / span) * (height - 6) - 3;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");

  const areaPoints = `0,${height} ${points} ${width},${height}`;

  return `
    <svg viewBox="0 0 ${width} ${height}" width="100%" height="${height}" preserveAspectRatio="none">
      <polygon points="${areaPoints}" fill="${color}" opacity="0.08"></polygon>
      <polyline points="${points}" fill="none" stroke="${color}" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round"></polyline>
    </svg>
  `;
}

/** Escaped HTML-Sonderzeichen -- Pflicht für jeden Text, der aus externen
 *  Quellen stammt (News-Feeds/Bot), bevor er per innerHTML eingefügt wird. */
function escapeHtml(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

/** Formatiert ein Datum (YYYY-MM-DD) als lesbares deutsches Datum. */
function formatDate(iso) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" });
}

/** Erzeugt HTML für eine Unternehmens-Karte.
 *  basePath: Pfad-Präfix zur pages/-Datei -- "pages/" von der Startseite aus,
 *  "" wenn bereits innerhalb von pages/ aufgerufen. */
function companyCardHTML(c, basePath = "pages/") {
  const changeClass = c.price_change_1y_pct >= 0 ? "up" : "down";
  const sign = c.price_change_1y_pct >= 0 ? "+" : "";
  const sparkColor = c.price_change_1y_pct >= 0 ? "#2dd4a7" : "#d97757";

  return `
    <a class="company-card tilt" href="${basePath}unternehmen-detail.html?ticker=${encodeURIComponent(c.ticker)}">
      <div class="company-top">
        <div>
          <div class="company-ticker mono">${escapeHtml(c.ticker)}</div>
          <div class="company-name">${escapeHtml(c.name)}</div>
        </div>
        <span class="halal-badge">✓ Halal-Screen</span>
      </div>
      <div class="sparkline">${renderSparkline(c.price_history, { color: sparkColor })}</div>
      <div class="company-change mono ${changeClass}">${sign}${c.price_change_1y_pct.toFixed(1)}% · 1 Jahr</div>
    </a>
  `;
}

/** Erzeugt HTML für eine Blog-Karte (Grid-Ansicht, z.B. Startseite). */
function blogCardHTML(post, { featured = false, basePath = "pages/" } = {}) {
  return `
    <a class="blog-card tilt ${featured ? "featured" : ""}" href="${basePath}blog-post.html?slug=${encodeURIComponent(post.slug)}">
      <div class="blog-date mono">${formatDate(post.date)} · ${escapeHtml(post.tag)}</div>
      <h4>${escapeHtml(post.title)}</h4>
      ${featured ? `<p class="blog-excerpt">${escapeHtml(post.excerpt)}</p>` : ""}
    </a>
  `;
}

/** Erzeugt HTML für eine Zeile im vollständigen Blog-Archiv. */
function blogListItemHTML(post, basePath = "") {
  return `
    <a class="blog-list-item" href="${basePath}blog-post.html?slug=${encodeURIComponent(post.slug)}">
      <div class="blog-list-meta mono">${formatDate(post.date)}</div>
      <div class="blog-list-body">
        <span class="tag mono">${escapeHtml(post.tag)}</span>
        <h4>${escapeHtml(post.title)}</h4>
        <p class="blog-excerpt">${escapeHtml(post.excerpt)}</p>
      </div>
      <div class="blog-list-arrow">→</div>
    </a>
  `;
}

/** Baut den "gesperrter Insight"-Hinweis: welche Aktie betroffen ist, der
 *  Halal-Check und die Markteinschätzung bleiben der zahlenden Telegram-Gruppe
 *  vorbehalten -- auf der Website steht bewusst nur die reine, geprüfte News. */
function lockedInsightHTML() {
  return `
    <div class="locked-insight">
      <p>🔒 Welche Aktie das betreffen könnte, der Halal-Check dazu und die Markteinschätzung gibt's in der Telegram-Gruppe.</p>
      <a class="btn-primary" href="https://t.me/+EwK47soi2l5lZWMy" target="_blank" rel="noopener">Zugang sichern →</a>
    </div>
  `;
}

/** Wandelt den mit \n\n getrennten Fließtext eines Beitrags in <p>-Absätze um.
 *  Escaped den Text zuerst (externe Quelle!) und wandelt \n innerhalb eines
 *  Absatzes in <br> um, damit einzeilige Absätze (z.B. "🎯 Fokus: ...") erhalten bleiben. */
function renderBodyParagraphs(body) {
  return body
    .split("\n\n")
    .map((para) => `<p>${escapeHtml(para).replaceAll("\n", "<br>")}</p>`)
    .join("");
}
