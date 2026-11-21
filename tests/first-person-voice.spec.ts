import { test, expect } from "@playwright/test";

/**
 * Editorial voice contract (owner-directed correction): the portfolio speaks
 * in the owner's first-person voice from the hero to the footer.
 *
 *  - Rendered text on every route is free of third-person owner narration:
 *    she/her/hers/herself, "Etalyah is/builds/...", "Email Etalyah",
 *    "Connect with Etalyah", "Reach Etalyah", "by Etalyah Simpson".
 *  - The proper name "Etalyah Simpson" remains allowed where identity belongs:
 *    the brand masthead, copyright line, portrait alt text, and structured
 *    data. The patterns below match ownership narration, never the bare name,
 *    so they stay free of substring false positives (Hertz, here, etc.).
 *  - Contact CTAs use first-person accessible names: "Email me in Gmail" and
 *    "Connect with me on LinkedIn"; visible CTA text is "Email me".
 *  - The approved LinkedIn transition notice remains present, in first person,
 *    and every LinkedIn destination stays the owner-confirmed current profile.
 *  - Authored metadata descriptions describe the work in first person and
 *    contain no em dashes.
 *  - First-person voice is positively present: hero, About, Contact,
 *    experience, roadmap, education, certifications, and each case study.
 */

const ALL_ROUTES = [
  "/",
  "/about/",
  "/skills/",
  "/experience/",
  "/projects/",
  "/projects/policyguard-ai/",
  "/projects/vendorlens-ai/",
  "/projects/becbarrier/",
  "/roadmap/",
  "/education/",
  "/certifications/",
  "/contact/",
];

const NOTICE =
  "My previous LinkedIn account is no longer accessible to me following an account issue and is no longer in use. Please connect through my current profile.";
const CURRENT_LINKEDIN = "https://www.linkedin.com/in/etaly-queen/";

// Third-person ownership narration patterns, whole-word matched. Proper nouns
// (Etalyah Simpson, employers, universities, project names), UI labels, and
// image identification text never match these by construction.
const THIRD_PERSON_TEXT: RegExp[] = [
  /\b(she|her|hers|herself)\b/i,
  /\bEtalyah['’]?\s*(is|was|has|had|builds|built|focuses|focused|plans|planned|pursuing|pursued|earned|developed|designed|implemented|combines|combined|brings|brought|writes|wrote|works|worked|specializes|specialized|scored|scores|treats|treated|used|uses|created|delivered|helped|supported|studied|practices)\b/,
  /\bEtalyah['’]s\s+(work|experience|education|skills|certifications|projects|professional|engineering|career|approach|planned|current|GitHub|LinkedIn)\b/i,
  /\bEmail Etalyah\b/i,
  /\bConnect with Etalyah\b/i,
  /\bReach Etalyah\b/i,
  /\bExplore Etalyah\b/i,
  /\banswered by Etalyah\b/i,
  /\bEtalyah herself\b/i,
  /\bby Etalyah Simpson\b/i,
];

// Third-person narration must not appear inside accessible names either. The
// brand link "Etalyah Simpson, home" is identity and remains allowed.
const THIRD_PERSON_LABEL =
  /\b(Email Etalyah|Connect with Etalyah|Reach Etalyah|Explore Etalyah|Etalyah['’]s|to Etalyah|of Etalyah|Etalyah on GitHub|Etalyah herself)\b/i;

for (const route of ALL_ROUTES) {
  test(`rendered text on ${route} is free of third-person owner narration`, async ({ page }) => {
    await page.goto(route, { waitUntil: "networkidle" });
    const body = await page.locator("body").innerText();
    for (const pattern of THIRD_PERSON_TEXT) {
      expect(body, `${route} rendered text matched ${pattern}`).not.toMatch(pattern);
    }
    // Privacy presentation contract re-asserted from the voice audit: raw
    // addresses never become visible page text (hrefs are checked elsewhere).
    expect(body, `visible raw email address on ${route}`).not.toContain("etalyahsimpson.tech@gmail.com");
    expect(body, `visible raw LinkedIn URL on ${route}`).not.toContain("linkedin.com/in/");
  });
}

test("accessible names never address the owner in the third person", async ({ request }) => {
  for (const route of ALL_ROUTES) {
    const html = await (await request.get(route)).text();
    const labels = [...html.matchAll(/aria-label="([^"]*)"/g)].map((m) => m[1]);
    expect(labels.length, `aria-labels present on ${route}`).toBeGreaterThan(0);
    for (const label of labels) {
      expect(label, `aria-label on ${route}: "${label}"`).not.toMatch(THIRD_PERSON_LABEL);
    }
  }
});

test("authored metadata describes my work in first person, without em dashes", async ({ request }) => {
  for (const route of ALL_ROUTES) {
    const html = await (await request.get(route)).text();
    const metas = [
      ...html.matchAll(
        /<meta[^>]+(?:name|property)=["'](?:description|og:description|twitter:description)["'][^>]*>/gi,
      ),
    ].map((m) => m[0]);
    expect(metas.length, `description metadata present on ${route}`).toBeGreaterThan(0);
    for (const tag of metas) {
      const content = tag.match(/content="([^"]*)"/)?.[1] ?? "";
      const decoded = content
        .replace(/&#x27;/g, "'")
        .replace(/&#39;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/&amp;/g, "&");
      expect(
        decoded,
        `metadata on ${route}: ${decoded}`,
      ).not.toMatch(
        /\b(Etalyah Simpson['’]s|by Etalyah Simpson|Etalyah Simpson is|her (projects|profile|work|experience|education|skills|certifications))\b/i,
      );
      expect(decoded, `em dash in metadata on ${route}`).not.toContain("\u2014");
    }
  }
});

test("contact CTAs say Email me, never Email Etalyah", async ({ page }) => {
  await page.goto("/contact/");
  const contact = page.locator("#main-content");
  const gmail = contact.getByRole("link", { name: "Email me in Gmail (opens in new tab)" });
  await expect(gmail).toBeVisible();
  await expect(gmail).toContainText("Email me");
  const linkedin = contact.getByRole("link", { name: "Connect with me on LinkedIn (opens in new tab)" });
  await expect(linkedin).toBeVisible();
  const body = await page.locator("body").innerText();
  expect(body).not.toContain("Email Etalyah");
  expect(body).toContain("Email me");
});

test("homepage hero uses first-person CTAs", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("link", { name: "Email me in Gmail (opens in new tab)" }).first(),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Explore my GitHub profile (opens in new tab)" }).first(),
  ).toBeVisible();
  const hero = page.locator("#top");
  await expect(hero.getByText("View my projects")).toBeVisible();
  await expect(hero.getByText("Explore my GitHub")).toBeVisible();
  await expect(hero.getByText("Email me")).toBeVisible();
});

test("homepage and about section speak in first person", async ({ page }) => {
  await page.goto("/");
  const home = await page.locator("body").innerText();
  expect(home).toContain("I build"); // hero value statement
  expect(home).toContain("I am a full-stack and AI engineer"); // About paragraph
  expect(home).toContain("Reach me by email");

  await page.goto("/about/");
  const about = await page.locator("body").innerText();
  expect(about).toContain("I am a full-stack and AI engineer");
  expect(about).toContain("What I bring to a team");
});

test("project case studies read as my case studies", async ({ page }) => {
  for (const slug of ["policyguard-ai", "vendorlens-ai", "becbarrier"]) {
    await page.goto(`/projects/${slug}/`, { waitUntil: "networkidle" });
    const body = await page.locator("body").innerText();
    expect(body, `${slug} case study must be first person`).toContain("I built");
    expect(body, `${slug} verification note must be first person`).toContain("I inspected the public repository");
  }
});

test("experience page keeps exact employers and dates in first person", async ({ page }) => {
  await page.goto("/experience/");
  // Role summaries live inside collapsed <details> elements; expand every
  // role the way a visitor would before reading the text.
  const roles = page.locator("details.role-details > summary");
  const roleCount = await roles.count();
  expect(roleCount).toBe(4);
  for (let i = 0; i < roleCount; i += 1) {
    await roles.nth(i).click();
  }
  const body = await page.locator("body").innerText();
  expect(body).toContain("I build full-stack AI applications");
  expect(body).toContain("I built, trained, and served");
  expect(body).toContain("9series Inc");
  expect(body).toContain("Altana AI");
  expect(body).toContain("InductEV");
  expect(body).toContain("Hertz");
  expect(body).toContain("reflect my current CV");
});

test("roadmap initiatives are my plans and still marked Planned", async ({ page }) => {
  await page.goto("/roadmap/");
  const body = await page.locator("body").innerText();
  expect(body).toContain("I'm planning");
  expect(body).toContain("my prospective planning estimate");
  const plannedPills = page.locator("main").getByText("Planned", { exact: true });
  expect(await plannedPills.count(), "three Planned status pills").toBeGreaterThanOrEqual(3);
});

test("education and certifications speak in first person", async ({ page }) => {
  await page.goto("/education/");
  const edu = await page.locator("body").innerText();
  expect(edu).toContain("My academic path");
  expect(edu).toContain("My doctoral program is ongoing");
  expect(edu).toContain("Carnegie Mellon University");

  await page.goto("/certifications/");
  const certs = await page.locator("body").innerText();
  expect(certs).toContain("I earned");
  expect(certs).toContain("I list certification names");
});

test("LinkedIn transition notice stays present, first person, and correctly linked", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#contact").getByText(NOTICE)).toBeVisible();
  await page.goto("/contact/");
  await expect(page.getByText(NOTICE)).toBeVisible();

  for (const route of ["/", "/contact/"]) {
    await page.goto(route, { waitUntil: "networkidle" });
    const links = page.locator('a[href*="linkedin.com/in/"]');
    const count = await links.count();
    expect(count, `LinkedIn links on ${route}`).toBeGreaterThan(0);
    for (let i = 0; i < count; i += 1) {
      expect(await links.nth(i).getAttribute("href")).toBe(CURRENT_LINKEDIN);
    }
  }
});
