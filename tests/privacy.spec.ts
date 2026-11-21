import { test, expect } from "@playwright/test";

/**
 * Privacy contract, asserted on every route:
 *  - no telephone links or phone-like text
 *  - no WhatsApp / messenger / chat widgets
 *  - no CV/résumé viewer, link, or download control
 *  - email mailto is the only direct-contact mechanism
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

const PHONE_LIKE = /(?:\+\s*1[\s.-]?)?\(?\b[2-9]\d{2}\)?[\s.-]?\d{3}[\s.-]?\d{4}\b/;

for (const route of ALL_ROUTES) {
  test(`privacy holds on ${route}`, async ({ page }) => {
    await page.goto(route, { waitUntil: "networkidle" });
    const body = await page.locator("body").innerText();

    expect(body, `phone-like text on ${route}`).not.toMatch(PHONE_LIKE);
    expect(body.toLowerCase(), `whatsapp mention on ${route}`).not.toContain("whatsapp");
    expect(body.toLowerCase(), `chat widget mention on ${route}`).not.toContain("chat with us");

    const telLinks = await page.locator('a[href^="tel:"], a[href^="sms:"]').count();
    expect(telLinks, `tel/sms link on ${route}`).toBe(0);

    const waLinks = await page
      .locator('a[href*="wa.me"], a[href*="whatsapp"], a[href*="messenger.com"], a[href*="linkedin.com/in/"]')
      .count();
    expect(waLinks, `messaging link on ${route}`).toBe(0);

    const cvControls = await page
      .locator('a[href*="cv" i], a[href*="resume" i], a[href$=".docx" i], a[href$=".pdf" i], a[href*="drive.google" i], a[href*="docs.google" i]')
      .count();
    expect(cvControls, `CV access control on ${route}`).toBe(0);

    const iframes = await page.locator("iframe").count();
    expect(iframes, `embedded viewer on ${route}`).toBe(0);
  });
}

test("mailto is present and functional on contact page", async ({ page }) => {
  await page.goto("/contact/");
  const mailto = page.locator('a[href^="mailto:etalyahsimpson.tech@gmail.com"]');
  await expect(mailto.first()).toBeVisible();
  const href = await mailto.first().getAttribute("href");
  expect(href).toBe("mailto:etalyahsimpson.tech@gmail.com");
});

test("header carries a GitHub profile link", async ({ page }) => {
  await page.goto("/");
  const github = page.locator('header a[href="https://github.com/etalyahsimpson"]');
  await expect(github).toHaveCount(1);
  const rel = await github.getAttribute("rel");
  expect(rel).toContain("noopener");
});
