#!/usr/bin/env node
/**
 * Social preview image generator (1200 x 630, dark theme to match the
 * site's default appearance).
 *
 * Project cards are composed from each project's AUTHENTIC banner and
 * software overview screenshot (the same assets served on the site). The
 * home, experience, and expertise cards are original typographic designs.
 * No em dashes are used in any rendered copy.
 *
 * Usage: node scripts/generate-previews.mjs   (run from the repo root)
 */
import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "public", "previews");

const W = 1200;
const H = 630;
const FONT = "Liberation Sans, DejaVu Sans, Arial, sans-serif";

const C = {
  page: "#17131F",
  page2: "#211B2C",
  text: "#F3EFF9",
  muted: "#C8BFD4",
  primary: "#B48BE8",
  primaryStrong: "#CBACF7",
  soft: "#3D2A54",
  border: "rgba(180,139,232,0.30)",
};

const escapeXml = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function baseSvg(body) {
  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${C.page}"/>
      <stop offset="1" stop-color="${C.page2}"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.82" cy="0.12" r="0.65">
      <stop offset="0" stop-color="rgba(180,139,232,0.22)"/>
      <stop offset="1" stop-color="rgba(180,139,232,0)"/>
    </radialGradient>
    <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.1" fill="rgba(200,191,212,0.10)"/>
    </pattern>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <rect width="${W}" height="${H}" fill="url(#dots)"/>
  ${body}
</svg>`;
}

function footer(leftText) {
  return `
  <line x1="36" y1="${H - 68}" x2="${W - 36}" y2="${H - 68}" stroke="${C.border}" stroke-width="1"/>
  <text x="36" y="${H - 38}" font-family="${FONT}" font-size="19" font-weight="bold" fill="${C.text}">${escapeXml(leftText)}</text>
  <text x="${W - 36}" y="${H - 38}" font-family="${FONT}" font-size="19" fill="${C.primary}" text-anchor="end">etalyahsimpson.github.io</text>`;
}

async function rounded(input, w, h, r) {
  const mask = Buffer.from(
    `<svg width="${w}" height="${h}"><rect width="${w}" height="${h}" rx="${r}" ry="${r}" fill="#fff"/></svg>`,
  );
  return sharp(input)
    .resize(w, h, { fit: "cover", position: "top" })
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toBuffer();
}

async function roundedContain(input, w, h, r) {
  const mask = Buffer.from(
    `<svg width="${w}" height="${h}"><rect width="${w}" height="${h}" rx="${r}" ry="${r}" fill="#fff"/></svg>`,
  );
  return sharp(input)
    .resize(w, h, { fit: "contain", background: { r: 23, g: 20, b: 32, alpha: 1 } })
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toBuffer();
}

function frameRect(x, y, w, h, r) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="none" stroke="${C.border}" stroke-width="2"/>`;
}

async function projectCard({ name, banner, screenshot, out }) {
  const maxBannerW = 1128;
  const maxBannerH = 240;
  const bannerMeta = await sharp(banner).metadata();
  const scale = Math.min(maxBannerW / bannerMeta.width, maxBannerH / bannerMeta.height);
  const bw = Math.round(bannerMeta.width * scale);
  const bh = Math.round(bannerMeta.height * scale);
  const bx = Math.round((W - bw) / 2);

  const footerZone = 84;
  const sy = 36 + bh + 16;
  const sh = H - sy - footerZone;
  const sw = 1128;
  const sx = 36;

  const base = baseSvg(`
    ${frameRect(bx - 2, 34, bw + 4, bh + 4, 16)}
    ${frameRect(sx - 2, sy - 2, sw + 4, sh + 4, 16)}
    ${footer(`Etalyah Simpson · ${name} case study`)}`);

  const bannerBuf = await roundedContain(banner, bw, bh, 14);
  const shotBuf = await rounded(screenshot, sw, sh, 14);

  await sharp(Buffer.from(base))
    .composite([
      { input: bannerBuf, left: bx, top: 36 },
      { input: shotBuf, left: sx, top: sy },
    ])
    .png({ compressionLevel: 9 })
    .toFile(path.join(OUT, out));
  console.log(`generated ${out}`);
}

async function homeCard() {
  const pills = ["Next.js", "TypeScript", "FastAPI", "Python", "PyTorch", "PostgreSQL"];
  let x = 36;
  const pillY = 452;
  const pillSvg = pills
    .map((label) => {
      const w = 26 + label.length * 12;
      const rect = `<rect x="${x}" y="${pillY}" width="${w}" height="46" rx="23" fill="rgba(61,42,84,0.85)" stroke="${C.border}"/>`;
      const text = `<text x="${x + w / 2}" y="${pillY + 29}" font-family="${FONT}" font-size="19" font-weight="bold" fill="${C.primaryStrong}" text-anchor="middle">${escapeXml(label)}</text>`;
      x += w + 14;
      return rect + text;
    })
    .join("\n  ");

  const body = `
  <text x="36" y="118" font-family="${FONT}" font-size="21" font-weight="bold" letter-spacing="6" fill="${C.primary}">ENGINEERING PORTFOLIO</text>
  <text x="34" y="228" font-family="${FONT}" font-size="82" font-weight="bold" fill="${C.text}">Etalyah <tspan fill="${C.primary}">Simpson</tspan></text>
  <text x="36" y="286" font-family="${FONT}" font-size="27" font-weight="bold" fill="${C.primaryStrong}">Agentic Coding · Software Engineering · AI Evaluation</text>
  <text x="36" y="336" font-family="${FONT}" font-size="21" fill="${C.muted}">Philadelphia, PA · 4+ years professional experience · PhD student, Machine Learning / AI</text>
  <text x="36" y="398" font-family="${FONT}" font-size="20" fill="${C.muted}">Full-stack applications, model-backed services, and evidence-based AI evaluation workflows.</text>
  ${pillSvg}
  ${footer("Etalyah Simpson · Software Engineering, Agentic Coding & AI Evaluation")}`;

  await sharp(Buffer.from(baseSvg(body))).png({ compressionLevel: 9 }).toFile(path.join(OUT, "etalyah-home.png"));
  console.log("generated etalyah-home.png");
}

async function experienceCard() {
  const roles = [
    { company: "9series Inc", title: "Full-Stack / AI Engineer", period: "Mar 2026 - Present" },
    { company: "Altana AI", title: "Machine Learning Engineer", period: "2025 - 2026" },
    { company: "InductEV", title: "Full-Stack Developer", period: "2024 - 2025" },
    { company: "Hertz", title: "Full-Stack Developer, CRM System", period: "2022 - 2024" },
  ];
  const rows = roles
    .map((role, i) => {
      const y = 196 + i * 74;
      return `
  <circle cx="46" cy="${y - 8}" r="5" fill="${C.primary}"/>
  <text x="70" y="${y}" font-family="${FONT}" font-size="25" font-weight="bold" fill="${C.text}">${escapeXml(role.company)}</text>
  <text x="70" y="${y + 30}" font-family="${FONT}" font-size="20" fill="${C.muted}">${escapeXml(role.title)}</text>
  <text x="${W - 36}" y="${y}" font-family="${FONT}" font-size="19" fill="${C.primaryStrong}" text-anchor="end">${escapeXml(role.period)}</text>`;
    })
    .join("");

  const body = `
  <text x="36" y="104" font-family="${FONT}" font-size="21" font-weight="bold" letter-spacing="6" fill="${C.primary}">CAREER</text>
  <text x="34" y="154" font-family="${FONT}" font-size="40" font-weight="bold" fill="${C.text}">Professional experience</text>
  ${rows}
  ${footer("Etalyah Simpson · Work experience")}`;

  await sharp(Buffer.from(baseSvg(body))).png({ compressionLevel: 9 }).toFile(path.join(OUT, "etalyah-experience.png"));
  console.log("generated etalyah-experience.png");
}

async function expertiseCard() {
  const groups = [
    "Languages",
    "Frontend",
    "Backend & APIs",
    "AI & Machine Learning",
    "AI Evaluation",
    "Agentic Development",
    "Testing",
    "Infrastructure & Data",
    "CRM & Integrations",
  ];
  // two rows of pills
  const rows = [groups.slice(0, 4), groups.slice(4, 7), groups.slice(7)];
  let y = 240;
  const pillSvg = rows
    .map((row) => {
      let x = 36;
      const rects = row
        .map((label) => {
          const w = 30 + label.length * 11.5;
          const rect = `<rect x="${x}" y="${y}" width="${w}" height="50" rx="25" fill="rgba(61,42,84,0.85)" stroke="${C.border}"/>`;
          const text = `<text x="${x + w / 2}" y="${y + 32}" font-family="${FONT}" font-size="20" font-weight="bold" fill="${C.primaryStrong}" text-anchor="middle">${escapeXml(label)}</text>`;
          x += w + 16;
          return rect + text;
        })
        .join("");
      y += 66;
      return rects;
    })
    .join("\n  ");

  const body = `
  <text x="36" y="112" font-family="${FONT}" font-size="21" font-weight="bold" letter-spacing="6" fill="${C.primary}">EXPERTISE</text>
  <text x="34" y="164" font-family="${FONT}" font-size="44" font-weight="bold" fill="${C.text}">Skills grouped by engineering purpose</text>
  ${pillSvg}
  ${footer("Etalyah Simpson · Expertise & skills")}`;

  await sharp(Buffer.from(baseSvg(body))).png({ compressionLevel: 9 }).toFile(path.join(OUT, "etalyah-portfolio.png"));
  console.log("generated etalyah-portfolio.png");
}

const P = (p) => path.join(ROOT, "public", p);

await projectCard({
  name: "PolicyGuard AI",
  banner: P("projects/policyguard-ai/policyguard-banner.svg"),
  screenshot: P("projects/policyguard-ai/policyguard-overview.png"),
  out: "policyguard-ai.png",
});
await projectCard({
  name: "VendorLens AI",
  banner: P("projects/vendorlens-ai/vendorlens-banner.svg"),
  screenshot: P("projects/vendorlens-ai/vendorslens-overview.png"),
  out: "vendorlens-ai.png",
});
await projectCard({
  name: "BECBarrier",
  banner: P("projects/becbarrier/becbarrier-hero.svg"),
  screenshot: P("projects/becbarrier/becbarrier-overview.png"),
  out: "becbarrier.png",
});
await homeCard();
await experienceCard();
await expertiseCard();
console.log("all previews generated.");
