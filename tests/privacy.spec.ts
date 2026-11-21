import { test, expect } from "@playwright/test";

/**
 * Privacy contract, asserted on every route:
 *  - no telephone links or phone-like text
 *  - no WhatsApp / messenger / chat widgets
 *  - no CV/résumé viewer, link, or download control
 *  - Gmail compose (pre-addressed) is the primary direct-contact mechanism and
 *    the owner-confirmed current LinkedIn profile
 *    (https://www.linkedin.com/in/etaly-queen/) is the ONLY permitted LinkedIn
 *    destination; former-profile references must be absent everywhere.
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

const CURRENT_LINKEDIN = "https://www.linkedin.com/in/etaly-queen/";

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

    const messagingLinks = await page
      .locator('a[href*="wa.me"], a[href*="whatsapp"], a[href*="messenger.com"]')
      .count();
    expect(messagingLinks, `messaging link on ${route}`).toBe(0);

    // Every LinkedIn anchor must be exactly the owner-confirmed current profile.
    const linkedinLinks = page.locator('a[href*="linkedin.com/in/"]');
    const linkedinCount = await linkedinLinks.count();
    for (let i = 0; i < linkedinCount; i += 1) {
      const href = await linkedinLinks.nth(i).getAttribute("href");
      expect(href, `LinkedIn destination on ${route} at index ${i}`).toBe(CURRENT_LINKEDIN);
    }

    const cvControls = await page
      .locator('a[href*="cv" i], a[href*="resume" i], a[href$=".docx" i], a[href$=".pdf" i], a[href*="drive.google" i], a[href*="docs.google" i]')
      .count();
    expect(cvControls, `CV access control on ${route}`).toBe(0);

    const iframes = await page.locator("iframe").count();
    expect(iframes, `embedded viewer on ${route}`).toBe(0);
  });
}

test("Gmail compose is the primary email action on the contact page", async ({ page }) => {
  await page.goto("/contact/");
  const gmail = page.locator('a[href^="https://mail.google.com/mail/?view=cm"]');
  await expect(gmail.first()).toBeVisible();
  const href = await gmail.first().getAttribute("href");
  expect(href).toBe("https://mail.google.com/mail/?view=cm&fs=1&to=etalyahsimpson.tech%40gmail.com");
  // The to= parameter must decode to the exact approved address.
  const to = new URL(href ?? "").searchParams.get("to");
  expect(to).toBe("etalyahsimpson.tech@gmail.com");
});

test("mailto fallback is present, labelled, and hides the address", async ({ page }) => {
  await page.goto("/contact/");
  const fallback = page.getByRole("link", { name: "Email in another app" });
  await expect(fallback).toBeVisible();
  const href = await fallback.getAttribute("href");
  expect(href).toBe("mailto:etalyahsimpson.tech@gmail.com");
  // The visible label must not leak the raw address.
  await expect(fallback).not.toContainText("@");
});

test("header carries a GitHub profile link", async ({ page }) => {
  await page.goto("/");
  const github = page.locator('header a[href="https://github.com/etalyahsimpson"]');
  await expect(github).toHaveCount(1);
  const rel = await github.getAttribute("rel");
  expect(rel).toContain("noopener");
});
