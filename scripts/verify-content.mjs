#!/usr/bin/env node
/**
 * Pre-build content and privacy verification for the portfolio source.
 *
 * Gates (each failure blocks the release):
 *  1. Authored copy contains no em dash (U+2014 / &mdash; / &#8212; / &#x2014;).
 *  2. No phone-like strings, tel:/sms: links, WhatsApp/messenger integrations,
 *     or LinkedIn profile links other than the owner-approved current profile
 *     (linkedin.com/in/etaly-queen/) anywhere in authored source or public assets.
 *  3. No CV/résumé artifacts (docx/pdf/pages) anywhere in the repository tree.
 *  4. Every referenced local asset exists in public/.
 *  5. Every route in the site route map has a matching app-router page.
 *  6. Project registry slugs are unique and their brand/preview/screenshot
 *     assets exist.
 *  7. Portrait registry files exist (two approved photographs plus the
 *     derived square avatar) and no other personal photos are present.
 *
 * Exit code 0 = all gates passed. A JSON report is written to
 * scripts/verify-content-report.json (non-secret).
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const report = { emDash: [], phoneLike: [], forbiddenContact: [], cvArtifacts: [], missingAssets: [], routes: [], slugs: [], portraits: [], extraPeoplePhotos: [], projectVisuals: [], passed: false };
const failures = [];

// Sandbox-only working directories exist in the development workspace but are
// never tracked or pushed; the release gates below inspect the published tree.
const SANDBOX_DIRS = new Set([
  "node_modules",
  ".git",
  "out",
  ".next",
  "skills",
  "upload",
  "tool-results",
  "examples",
  "mini-services",
  ".zscripts",
  "db",
  "download",
  "prisma",
]);

const walk = async (dir, filter, acc = []) => {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    if (SANDBOX_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full, filter, acc);
    else if (!filter || filter(full)) acc.push(full);
  }
  return acc;
};

const rel = (p) => path.relative(ROOT, p);

// Owner-supplied authentic visual assets are preserved byte-for-byte and are
// therefore exempt from the authored-copy em dash gate (the specification
// forbids altering the six supplied originals solely for punctuation).
const EM_DASH_EXEMPT = new Set([
  "public/projects/policyguard-ai/policyguard-banner.svg",
  "public/projects/vendorlens-ai/vendorlens-banner.svg",
  "public/projects/becbarrier/becbarrier-hero.svg",
]);

// Generated SVG path geometry (icon registry) is machine data, not authored
// copy: coordinate digit runs are not telephone numbers.
const PHONE_SCAN_EXEMPT = new Set(["src/components/ui/tech-icon-data.ts"]);

const isEmDashExempt = (file) => EM_DASH_EXEMPT.has(rel(file));
const isPhoneScanExempt = (file) => PHONE_SCAN_EXEMPT.has(rel(file));

// ---------------------------------------------------------------- sources
const textExtensions = /\.(ts|tsx|css|md|mdx|svg|json|mjs|txt)$/;
const sourceFiles = (await walk(path.join(ROOT, "src"), (f) => textExtensions.test(f)))
  .concat(await walk(path.join(ROOT, "public"), (f) => textExtensions.test(f)))
  .concat([path.join(ROOT, "README.md")])
  .concat(await walk(path.join(ROOT, "docs"), (f) => textExtensions.test(f)));

const EM_DASH = /\u2014|&mdash;|&#8212;|&#x2014;/i;
// Generic NANP-like phone pattern (never the owner's actual number).
const PHONE_LIKE = /(?:\+\s*1[\s.-]?)?\(?\b[2-9]\d{2}\)?[\s.-]?\d{3}[\s.-]?\d{4}\b/;
// The owner-confirmed CURRENT LinkedIn profile is the ONLY permitted LinkedIn
// destination (owner correction supersedes earlier prompts); every other
// profile path is treated as a forbidden former-profile reference.
const FORBIDDEN_CONTACT = /tel:|sms:|wa\.me|api\.whatsapp\.com|whatsapp:|messenger\.com|linkedin\.com\/in\/(?!etaly-queen\/)|shrinke\.me|calendly\.com/i;
const CV_ARTIFACT_NAME = /(^|[\/_-])(cv|resume|curriculum[\s_-]vitae)([\/_.-]|$)/i;

for (const file of sourceFiles) {
  let content;
  try {
    content = await fs.readFile(file, "utf8");
  } catch {
    continue;
  }
  // Markdown documents DESCRIBE the rules (for example the literal entity
  // strings and contact schemes inside inline code). Strip code spans/blocks
  // before scanning them; authored prose must still pass every check.
  if (/\.mdx?$/i.test(file)) {
    content = content
      .replace(/```[\s\S]*?```/g, "")
      .replace(/`[^`\n]*`/g, "");
  }
  const r = rel(file);
  if (!isEmDashExempt(file) && EM_DASH.test(content)) { report.emDash.push(r); failures.push(`em dash in ${r}`); }
  if (!isPhoneScanExempt(file) && PHONE_LIKE.test(content)) { report.phoneLike.push(r); failures.push(`phone-like string in ${r}`); }
  if (FORBIDDEN_CONTACT.test(content)) { report.forbiddenContact.push(r); failures.push(`forbidden contact link in ${r}`); }
}

// ---------------------------------------------------------------- CV artifacts
const allFiles = await walk(ROOT, null);
for (const file of allFiles) {
  const r = rel(file);
  if (/\.(docx?|pdf|pages)$/i.test(file) && CV_ARTIFACT_NAME.test(r)) {
    report.cvArtifacts.push(r);
    failures.push(`CV/résumé artifact in repository: ${r}`);
  }
}

// ---------------------------------------------------------------- assets
const publicDir = path.join(ROOT, "public");
const publicFiles = new Set((await walk(publicDir, null)).map((f) => "/" + path.relative(publicDir, f).split(path.sep).join("/")));

const srcFilesForAssets = await walk(path.join(ROOT, "src"), (f) => /\.(ts|tsx)$/.test(f));
const assetRefs = new Set();
// Asset references must look like file paths (the final segment carries an
// extension); route hrefs such as "/projects/policyguard-ai/" are excluded.
const ASSET_REF = /["']\/((?:images|previews|brand|projects|fonts)\/[A-Za-z0-9._\-]+(?:\/[A-Za-z0-9._\-]+)*\.[A-Za-z0-9]+)["']/g;
for (const file of srcFilesForAssets) {
  const content = await fs.readFile(file, "utf8");
  for (const match of content.matchAll(ASSET_REF)) assetRefs.add("/" + match[1]);
}
for (const ref of assetRefs) {
  if (!publicFiles.has(ref)) {
    report.missingAssets.push(ref);
    failures.push(`referenced asset missing from public/: ${ref}`);
  }
}

// ---------------------------------------------------------------- routes
// Map a URL route to its app-router page file, allowing dynamic segments
// (for example /projects/<slug>/ -> src/app/projects/[slug]/page.tsx).
async function pageExistsForRoute(route) {
  const segments = route === "/" ? [] : route.replace(/^\//, "").replace(/\/$/, "").split("/");
  let dir = path.join(ROOT, "src", "app");
  for (let i = 0; i < segments.length; i += 1) {
    let nextDir = path.join(dir, segments[i]);
    try {
      const stat = await fs.stat(nextDir);
      if (!stat.isDirectory()) throw new Error("not a directory");
    } catch {
      const entries = await fs.readdir(dir);
      const dynamic = entries.find((entry) => /^\[.*\]$/.test(entry));
      if (!dynamic) return false;
      nextDir = path.join(dir, dynamic);
    }
    dir = nextDir;
  }
  try {
    await fs.access(path.join(dir, "page.tsx"));
    return true;
  } catch {
    return false;
  }
}

const ROUTES = ["/", "/about/", "/skills/", "/experience/", "/projects/", "/roadmap/", "/education/", "/certifications/", "/contact/", "/projects/policyguard-ai/", "/projects/vendorlens-ai/", "/projects/becbarrier/"];
for (const route of ROUTES) {
  const exists = await pageExistsForRoute(route);
  report.routes.push({ route, page: exists });
  if (!exists) failures.push(`route ${route} has no page.tsx`);
}

// ---------------------------------------------------------------- slugs
// Authentic per-project visual contract: each featured project must carry its
// owner-supplied branded banner and software overview screenshot under
// public/projects/<slug>/, plus its social preview image.
const AUTHENTIC_VISUALS = {
  "policyguard-ai": ["/projects/policyguard-ai/policyguard-banner.svg", "/projects/policyguard-ai/policyguard-overview.png"],
  "vendorlens-ai": ["/projects/vendorlens-ai/vendorlens-banner.svg", "/projects/vendorlens-ai/vendorslens-overview.png"],
  "becbarrier": ["/projects/becbarrier/becbarrier-hero.svg", "/projects/becbarrier/becbarrier-overview.png"],
};

const projectsTs = await fs.readFile(path.join(ROOT, "src", "content", "projects.ts"), "utf8");
const slugs = [...projectsTs.matchAll(/^\s*slug:\s*"([a-z0-9-]+)",\s*$/gm)].map((m) => m[1]);
const unique = new Set(slugs);
if (unique.size !== slugs.length) { failures.push("duplicate project slugs in registry"); }
report.slugs = slugs;
for (const slug of slugs) {
  for (const asset of [`/previews/${slug}.png`]) {
    if (!publicFiles.has(asset)) failures.push(`project ${slug} missing ${asset}`);
  }
  const visuals = AUTHENTIC_VISUALS[slug] ?? [];
  for (const asset of visuals) {
    if (!publicFiles.has(asset)) failures.push(`project ${slug} missing authentic visual ${asset}`);
  }
  report.projectVisuals.push({ slug, visuals: visuals.map((v) => ({ path: v, present: publicFiles.has(v) })) });
  // every screenshot referenced by the registry must exist
  for (const match of projectsTs.matchAll(/src:\s*"(\/projects\/[a-z0-9-]+\/[a-z0-9._-]+)"/g)) {
    if (match[1].includes(`/${slug}/`) && !publicFiles.has(match[1])) {
      failures.push(`project ${slug} references missing screenshot ${match[1]}`);
    }
  }
}

// ---------------------------------------------------------------- portraits
// Authorized personal-photo inventory: the two approved source portraits plus
// the square avatar DERIVED from the approved official portrait (crop and
// resize only) that serves as the header/footer identity mark. Nothing else
// may ever appear under public/images/.
const portraitFiles = [...publicFiles].filter((f) => f.startsWith("/images/"));
report.portraits = portraitFiles;
const expected = ["/images/etalyah-hero.webp", "/images/etalyah-about.webp", "/images/etalyah-avatar.webp"];
for (const file of expected) {
  if (!publicFiles.has(file)) failures.push(`approved portrait missing: ${file}`);
}
const allowedPeoplePhotos = new Set(expected);
for (const file of portraitFiles) {
  if (!allowedPeoplePhotos.has(file)) {
    report.extraPeoplePhotos.push(file);
    failures.push(`unexpected file under public/images (only the two approved portraits and the derived avatar are allowed): ${file}`);
  }
}

// ---------------------------------------------------------------- report
report.passed = failures.length === 0;
await fs.writeFile(path.join(__dirname, "verify-content-report.json"), JSON.stringify(report, null, 2));

if (!report.passed) {
  console.error(`verify-content: FAILED (${failures.length} issue(s))`);
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}
console.log(`verify-content: PASSED`);
console.log(`  em dash: none | phone-like: none | forbidden contact: none (only the approved LinkedIn profile) | CV artifacts: none`);
console.log(`  assets referenced: ${assetRefs.size}, all present`);
console.log(`  authentic project visuals: ${Object.values(AUTHENTIC_VISUALS).flat().length} verified`);
console.log(`  routes: ${ROUTES.length} verified | project slugs: ${slugs.join(", ")} | portraits: ${portraitFiles.length} (as authorized)`);
