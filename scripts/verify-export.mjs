#!/usr/bin/env node
/**
 * Post-build verification of the exported static site in out/.
 *
 * For every generated .html file this script:
 *   - extracts every local URL (src, href, srcset, poster, preload, icons)
 *     and verifies the referenced file exists in out/ (with trailing-slash
 *     directory mapping and traversal protection);
 *   - verifies internal links resolve to exported routes or in-page anchors;
 *   - validates initial-HTML metadata (title, description, canonical, Open
 *     Graph, Twitter card) against the expected per-route values;
 *   - rejects tel:/sms:/WhatsApp/messenger contact schemes and phone-like
 *     strings (privacy contract);
 *   - rejects em dashes in authored document text;
 *   - verifies required routes, out/.nojekyll, and non-empty preview images;
 *   - rejects any asset URL prefixed with the repository name.
 *
 * Exit code 0 = release gate passed. Writes scripts/verify-export-report.json.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "out");
const ORIGIN = "https://etalyahsimpson.github.io";
const REPO_PREFIX = "/etalyahsimpson.github.io/";

const failures = [];
const stats = { htmlFiles: 0, localAssetsChecked: 0, internalLinksChecked: 0, routesVerified: 0, metadataVerified: 0 };

const fail = (msg) => failures.push(msg);

const walk = async (dir, acc = []) => {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full, acc);
    else acc.push(full);
  }
  return acc;
};

// ---------------------------------------------------------------- helpers
const stripUrl = (url) => {
  let u = url.trim();
  const hashIndex = u.indexOf("#");
  if (hashIndex >= 0) u = u.slice(0, hashIndex);
  const qIndex = u.indexOf("?");
  if (qIndex >= 0) u = u.slice(0, qIndex);
  return u;
};

const resolveLocal = (rawUrl) => {
  let u = stripUrl(rawUrl);
  if (!u || u === "") return null;
  if (/^(mailto:|data:|blob:|javascript:)/i.test(u)) return null;
  if (/^(tel:|sms:)/i.test(u)) { fail(`forbidden contact scheme: ${u}`); return null; }
  if (/^([a-z][a-z0-9+.-]*):/i.test(u)) {
    if (/wa\.me|api\.whatsapp\.com|whatsapp:|messenger\.com|linkedin\.com\/in\//i.test(u)) {
      fail(`forbidden contact link: ${u}`);
    }
    return null; // external http(s), mailto etc: skip local resolution
  }
  if (!u.startsWith("/")) return { kind: "relative", value: u };
  u = decodeURIComponent(u);
  if (u.startsWith(REPO_PREFIX)) { fail(`asset URL uses repository prefix: ${u}`); return null; }
  return { kind: "root", value: u };
};

const localPathFor = (urlInfo, htmlFile) => {
  let fsPath;
  if (urlInfo.kind === "root") {
    fsPath = path.normalize(path.join(OUT, urlInfo.value));
  } else {
    const baseDir = path.dirname(htmlFile);
    fsPath = path.normalize(path.join(baseDir, urlInfo.value));
  }
  if (!fsPath.startsWith(OUT)) { fail(`path traversal detected from ${rel(htmlFile)}: ${urlInfo.value}`); return null; }
  if (fsPath === OUT || urlInfo.value.endsWith("/")) {
    fsPath = path.join(fsPath, "index.html");
  } else if (!path.extname(fsPath)) {
    fsPath = path.join(fsPath, "index.html");
  }
  return fsPath;
};

const rel = (p) => path.relative(ROOT, p);

// Minimal HTML entity decoding for text extracted from raw HTML (titles,
// descriptions). Attribute URL values are compared after decoding too.
const entityMap = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&apos;": "'", "&#39;": "'", "&nbsp;": " " };
const decodeEntities = (value) => value.replace(/&(amp|lt|gt|quot|apos|#39|nbsp);/g, (m) => entityMap[m] ?? m);

async function exists(p) {
  try { await fs.access(p); return true; } catch { return false; }
}

// ---------------------------------------------------------------- collect HTML files
const htmlFiles = (await walk(OUT)).filter((f) => f.endsWith(".html"));
stats.htmlFiles = htmlFiles.length;
if (htmlFiles.length === 0) fail("no HTML files found under out/");

// required routes
const REQUIRED_ROUTES = [
  "index.html",
  "about/index.html",
  "skills/index.html",
  "experience/index.html",
  "projects/index.html",
  "projects/policyguard-ai/index.html",
  "projects/vendorlens-ai/index.html",
  "projects/becbarrier/index.html",
  "roadmap/index.html",
  "education/index.html",
  "certifications/index.html",
  "contact/index.html",
  "404.html",
  "sitemap.xml",
];
for (const route of REQUIRED_ROUTES) {
  if (!(await exists(path.join(OUT, route)))) fail(`required export missing: out/${route}`);
  else stats.routesVerified += 1;
}
if (!(await exists(path.join(OUT, ".nojekyll")))) fail("out/.nojekyll missing");

// Six owner-supplied authentic project visuals must be present and non-empty
// in the export: one branded banner plus one software overview per project.
const AUTHENTIC_PROJECT_ASSETS = [
  "projects/policyguard-ai/policyguard-banner.svg",
  "projects/policyguard-ai/policyguard-overview.png",
  "projects/vendorlens-ai/vendorlens-banner.svg",
  "projects/vendorlens-ai/vendorslens-overview.png",
  "projects/becbarrier/becbarrier-hero.svg",
  "projects/becbarrier/becbarrier-overview.png",
];
for (const asset of AUTHENTIC_PROJECT_ASSETS) {
  const p = path.join(OUT, asset);
  if (!(await exists(p))) fail(`authentic project asset missing: out/${asset}`);
  else {
    const stat = await fs.stat(p);
    if (stat.size < 512) fail(`authentic project asset suspiciously small: out/${asset}`);
  }
}
// Each project case study must reference BOTH of its authentic visuals in the
// initial HTML, and the overview screenshot must appear near the top.
const PROJECT_VISUAL_REFERENCE = {
  "projects/policyguard-ai/index.html": ["policyguard-banner.svg", "policyguard-overview.png"],
  "projects/vendorlens-ai/index.html": ["vendorlens-banner.svg", "vendorslens-overview.png"],
  "projects/becbarrier/index.html": ["becbarrier-hero.svg", "becbarrier-overview.png"],
};
for (const [route, assets] of Object.entries(PROJECT_VISUAL_REFERENCE)) {
  const p = path.join(OUT, route);
  if (!(await exists(p))) { fail(`project page missing, cannot verify visuals: ${route}`); continue; }
  const html = await fs.readFile(p, "utf8");
  for (const asset of assets) {
    if (!html.includes(asset)) fail(`${route} does not reference authentic asset ${asset}`);
  }
}

const PREVIEWS = [
  "previews/etalyah-home.png",
  "previews/etalyah-portfolio.png",
  "previews/etalyah-experience.png",
  "previews/policyguard-ai.png",
  "previews/vendorlens-ai.png",
  "previews/becbarrier.png",
];
for (const preview of PREVIEWS) {
  const p = path.join(OUT, preview);
  if (!(await exists(p))) fail(`preview image missing: out/${preview}`);
  else {
    const stat = await fs.stat(p);
    if (stat.size < 1024) fail(`preview image suspiciously small: out/${preview}`);
  }
}

const PORTRAITS = ["images/etalyah-hero.webp", "images/etalyah-about.webp", "images/etalyah-avatar.webp"];
for (const portrait of PORTRAITS) {
  if (!(await exists(path.join(OUT, portrait)))) fail(`portrait missing: out/${portrait}`);
}

// Browser identity icons (portrait-derived PNG set emitted by the App Router
// file conventions): favicon 32x32 and apple-touch-icon 180x180.
const FAVICON_ASSETS = ["icon.png", "apple-icon.png"];
for (const icon of FAVICON_ASSETS) {
  if (!(await exists(path.join(OUT, icon)))) fail(`favicon asset missing: out/${icon}`);
}

// ---------------------------------------------------------------- per-HTML checks
const PHONE_LIKE = /(?:\+\s*1[\s.-]?)?\(?\b[2-9]\d{2}\)?[\s.-]?\d{3}[\s.-]?\d{4}\b/;
const EM_DASH_CHAR = "\u2014";
const EM_DASH_ENTITY = /&mdash;|&#8212;|&#x2014;/i;

const ATTR_VALUE = /(src|href|poster)\s*=\s*"([^"]*)"/g;

for (const htmlFile of htmlFiles) {
  const html = await fs.readFile(htmlFile, "utf8");
  const routeRel = rel(htmlFile);

  // strip <script> and <style> blocks for text-level checks; scan scripts separately for contact schemes.
  // SVG path/points geometry (long numeric coordinate runs in d="..." and
  // points="...") is machine data, not copy: strip it so phone scanning never
  // mistakes bezier coordinates for telephone numbers. Visible SVG <text>
  // content and every other text node remain fully scanned.
  const textOnly = html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/\bd\s*=\s*"[^"]*"/gi, "")
    .replace(/\bpoints\s*=\s*"[^"]*"/gi, "");
  if (textOnly.includes(EM_DASH_CHAR) || EM_DASH_ENTITY.test(textOnly)) fail(`em dash present in ${routeRel}`);
  if (PHONE_LIKE.test(textOnly)) fail(`phone-like string in ${routeRel}`);
  if (/tel:|sms:|wa\.me|api\.whatsapp\.com|whatsapp:/i.test(html)) fail(`forbidden contact scheme in ${routeRel}`);
  if (/View CV|Open Résumé|Download Résumé|Download CV|download-cv|resume\.pdf|cv\.pdf/i.test(html)) fail(`CV access control present in ${routeRel}`);

  // collect local URLs. Only src/href/poster are URL-bearing attributes;
  // meta content="..." values (card types, dimensions, titles) are NOT URLs.
  const refs = new Set();
  for (const match of html.matchAll(ATTR_VALUE)) {
    const value = match[2];
    if (!value) continue;
    refs.add(decodeEntities(value));
  }
  for (const match of html.matchAll(/(?:srcset|imagesrcset)\s*=\s*"([^"]*)"/g)) {
    for (const candidate of match[1].split(",")) {
      const url = candidate.trim().split(/\s+/)[0];
      if (url) refs.add(decodeEntities(url));
    }
  }

  // Social preview images: absolute og:image / twitter:image URLs must point
  // at real files inside this export (same-origin only).
  for (const match of html.matchAll(/<meta[^>]+(?:property|name)=["'](?:og:image|og:image:secure_url|twitter:image|twitter:image:src)["'][^>]*>/gi)) {
    const content = match[0].match(/content=["']([^"']*)["']/i)?.[1];
    if (!content) continue;
    let url;
    try { url = new URL(content, ORIGIN); } catch { fail(`invalid social preview URL in ${routeRel}: ${content}`); continue; }
    if (url.origin !== ORIGIN) continue;
    const fsPath = path.normalize(path.join(OUT, decodeURIComponent(url.pathname)));
    if (!fsPath.startsWith(OUT)) { fail(`social preview path traversal in ${routeRel}: ${content}`); continue; }
    if (!(await exists(fsPath))) fail(`social preview image missing in ${routeRel}: ${content}`);
  }

  for (const ref of refs) {
    const resolved = resolveLocal(ref);
    if (!resolved) continue;
    const fsPath = localPathFor(resolved, htmlFile);
    if (!fsPath) continue;
    if (!(await exists(fsPath))) {
      fail(`broken local reference in ${routeRel}: ${ref}`);
    } else {
      stats.localAssetsChecked += 1;
    }

    // internal link to another exported document (no file extension = route)
    if (resolved.kind === "root" && !path.extname(stripUrl(ref))) {
      stats.internalLinksChecked += 1;
    }
    const raw = ref;
    const anchorMatch = raw.match(/#([A-Za-z0-9_-]+)$/);
    if (anchorMatch && stripUrl(raw) !== "" && stripUrl(raw) !== "/") {
      // anchor on another document: verify the id exists in the target
      const targetInfo = resolveLocal(stripUrl(raw));
      if (targetInfo) {
        const targetPath = localPathFor(targetInfo, htmlFile);
        if (targetPath && (await exists(targetPath))) {
          const targetHtml = await fs.readFile(targetPath, "utf8");
          const anchorId = anchorMatch[1];
          if (!targetHtml.includes(`id="${anchorId}"`) && !targetHtml.includes(`id='${anchorId}'`)) {
            // only fatal when the link text suggests navigation; warn-level for robustness
            fail(`anchor #${anchorId} not found in target of link from ${routeRel}: ${raw}`);
          }
        }
      }
    }
  }
}

// ---------------------------------------------------------------- metadata checks
const EXPECTED = {
  "index.html": {
    title: "Etalyah Simpson · Software Engineering, Agentic Coding & AI Evaluation",
    description: "Etalyah Simpson is a full-stack and AI engineer",
    canonical: `${ORIGIN}/`,
    ogImage: `${ORIGIN}/previews/etalyah-home.png`,
  },
  "projects/policyguard-ai/index.html": {
    title: "PolicyGuard AI",
    description: "PolicyGuard AI",
    canonical: `${ORIGIN}/projects/policyguard-ai/`,
    ogImage: `${ORIGIN}/previews/policyguard-ai.png`,
  },
  "projects/vendorlens-ai/index.html": {
    title: "VendorLens AI",
    description: "VendorLens AI",
    canonical: `${ORIGIN}/projects/vendorlens-ai/`,
    ogImage: `${ORIGIN}/previews/vendorlens-ai.png`,
  },
  "projects/becbarrier/index.html": {
    title: "BECBarrier",
    description: "BECBarrier",
    canonical: `${ORIGIN}/projects/becbarrier/`,
    ogImage: `${ORIGIN}/previews/becbarrier.png`,
  },
  "experience/index.html": {
    title: "Work Experience",
    description: "professional experience",
    canonical: `${ORIGIN}/experience/`,
    ogImage: `${ORIGIN}/previews/etalyah-experience.png`,
  },
  "about/index.html": { title: "About", canonical: `${ORIGIN}/about/` },
  "skills/index.html": { title: "Expertise & Skills", canonical: `${ORIGIN}/skills/` },
  "roadmap/index.html": { title: "Roadmap", canonical: `${ORIGIN}/roadmap/` },
  "education/index.html": { title: "Education", canonical: `${ORIGIN}/education/` },
  "certifications/index.html": { title: "Certifications", canonical: `${ORIGIN}/certifications/` },
  "contact/index.html": { title: "Contact", canonical: `${ORIGIN}/contact/` },
  "projects/index.html": { title: "Projects", canonical: `${ORIGIN}/projects/` },
};

const metaOf = (html, name) => {
  const re = new RegExp(`<meta[^>]+(?:name|property)=["']${name}["'][^>]*>`, "i");
  const tag = html.match(re)?.[0];
  if (!tag) return null;
  const content = tag.match(/content=["']([^"']*)["']/i);
  return content ? decodeEntities(content[1]) : null;
};

const uniqueTitles = new Set();
for (const [route, expected] of Object.entries(EXPECTED)) {
  const file = path.join(OUT, route);
  if (!(await exists(file))) { fail(`metadata check skipped, file missing: ${route}`); continue; }
  const html = await fs.readFile(file, "utf8");
  const title = html.match(/<title>([^<]*)<\/title>/i)?.[1] ?? null;
  const decodedTitle = title ? decodeEntities(title) : null;
  const description = metaOf(html, "description");
  const canonical = html.match(/<link[^>]+rel=["']canonical["'][^>]*>/i)?.[0]?.match(/href=["']([^"']*)["']/i)?.[1] ?? null;
  const ogTitle = metaOf(html, "og:title");
  const ogDescription = metaOf(html, "og:description");
  const ogUrl = metaOf(html, "og:url");
  const ogImage = metaOf(html, "og:image");
  const twitterCard = metaOf(html, "twitter:card");
  const twitterImage = metaOf(html, "twitter:image");

  if (!decodedTitle) fail(`missing <title> in ${route}`); else uniqueTitles.add(decodedTitle);
  if (expected.title && !decodedTitle?.includes(expected.title)) fail(`unexpected title in ${route}: ${decodedTitle}`);
  if (!description) fail(`missing meta description in ${route}`);
  else if (expected.description && !description.toLowerCase().includes(expected.description.toLowerCase())) fail(`description mismatch in ${route}`);
  if (!canonical) fail(`missing canonical in ${route}`);
  else if (canonical !== expected.canonical) fail(`canonical mismatch in ${route}: ${canonical}`);
  if (!ogTitle) fail(`missing og:title in ${route}`);
  if (!ogDescription) fail(`missing og:description in ${route}`);
  if (!ogUrl) fail(`missing og:url in ${route}`);
  else if (ogUrl !== expected.canonical) fail(`og:url mismatch in ${route}: ${ogUrl}`);
  if (!ogImage) fail(`missing og:image in ${route}`);
  else if (expected.ogImage && ogImage !== expected.ogImage) fail(`og:image mismatch in ${route}: ${ogImage}`);
  if (!twitterCard || twitterCard !== "summary_large_image") fail(`twitter:card missing or wrong in ${route}: ${twitterCard}`);
  if (!twitterImage) fail(`missing twitter:image in ${route}`);
  stats.metadataVerified += 1;
}

// portrait placement: hero on index, about on index + /about/, avatar in the
// shared header on every route (checked on the homepage)
const indexHtml = await fs.readFile(path.join(OUT, "index.html"), "utf8");
if (!indexHtml.includes("/images/etalyah-hero.webp")) fail("homepage does not reference the approved hero portrait");
if (!indexHtml.includes("/images/etalyah-about.webp")) fail("homepage does not reference the approved About portrait");
if (!indexHtml.includes("/images/etalyah-avatar.webp")) fail("homepage header does not reference the approved avatar mark");
if (!/<link[^>]+rel="icon"/.test(indexHtml)) fail("homepage missing the favicon link tag");
if (!/<link[^>]+rel="apple-touch-icon"/.test(indexHtml)) fail("homepage missing the apple-touch-icon link tag");
const aboutHtml = await fs.readFile(path.join(OUT, "about/index.html"), "utf8");
if (!aboutHtml.includes("/images/etalyah-about.webp")) fail("/about/ does not reference the approved About portrait");

// no carousels: search for common slideshow markers in authored markup
for (const htmlFile of htmlFiles) {
  const html = await fs.readFile(htmlFile, "utf8");
  if (/class=["'][^"']*(carousel|slideshow|swiper|slider)[^"']*["']/i.test(html)) {
    fail(`carousel/slideshow marker present in ${rel(htmlFile)}`);
  }
}

// ---------------------------------------------------------------- report
const report = { passed: failures.length === 0, stats, failures };
await fs.writeFile(path.join(__dirname, "verify-export-report.json"), JSON.stringify(report, null, 2));

if (failures.length > 0) {
  console.error(`verify-export: FAILED (${failures.length} issue(s))`);
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}
console.log("verify-export: PASSED");
console.log(`  HTML files: ${stats.htmlFiles}`);
console.log(`  required routes verified: ${stats.routesVerified}`);
console.log(`  local asset references resolved: ${stats.localAssetsChecked}`);
console.log(`  route metadata records verified: ${stats.metadataVerified}`);
console.log(`  privacy: no tel/sms/whatsapp/phone/CV artifacts; email-only contact intact`);
console.log(`  punctuation: no em dashes in exported documents`);
