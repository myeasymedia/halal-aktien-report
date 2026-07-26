/* ============================================================
   generate-sitemap.js
   Erzeugt sitemap.xml aus data/companies.js und data/posts.js.

   AUSFÜHREN (im Projektordner): node scripts/generate-sitemap.js
   Nach jeder Änderung an companies.js oder posts.js (z.B. neuer
   Blogpost) einmal neu ausführen, damit Google die neuen URLs kennt.
   Domain unten anpassen, sobald Hosting/Domain feststehen.
   ============================================================ */

const fs = require("fs");
const path = require("path");

const SITE_URL = "https://DEINE-DOMAIN.tld";

const COMPANIES = require(path.join(__dirname, "..", "data", "companies.js"));
const POSTS = require(path.join(__dirname, "..", "data", "posts.js"));

const staticUrls = [
  { loc: "/", changefreq: "daily", priority: "1.0" },
  { loc: "/pages/blog.html", changefreq: "daily", priority: "0.9" },
  { loc: "/pages/unternehmen.html", changefreq: "weekly", priority: "0.8" },
];

const postUrls = POSTS.map((p) => ({
  loc: `/pages/blog-post.html?slug=${p.slug}`,
  lastmod: p.date,
  changefreq: "monthly",
  priority: "0.7",
}));

const companyUrls = COMPANIES.map((c) => ({
  loc: `/pages/unternehmen-detail.html?ticker=${c.ticker}`,
  changefreq: "weekly",
  priority: "0.6",
}));

const allUrls = [...staticUrls, ...postUrls, ...companyUrls];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (u) => `  <url>
    <loc>${SITE_URL}${u.loc}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ""}
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

fs.writeFileSync(path.join(__dirname, "..", "sitemap.xml"), xml);
console.log(`sitemap.xml geschrieben mit ${allUrls.length} URLs.`);
