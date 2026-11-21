import { test, expect } from "@playwright/test";

/**
 * Contact presentation contract (owner-directed correction):
 *  - LinkedIn icon links ONLY to the owner-confirmed current profile,
 *    https://www.linkedin.com/in/etaly-queen/, with a first-person
 *    accessible name ("Connect with me on LinkedIn").
 *  - Gmail icon opens the pre-addressed Gmail compose view with the correct
 *    to= parameter, never the inbox or Google homepage, and uses the
 *    first-person accessible name ("Email me in Gmail").
 *  - No visible raw email address and no visible raw LinkedIn URL anywhere in
 *    rendered content (checked with rendered-text queries, not source grep).
 *  - The exact approved LinkedIn transition notice appears in both contact
 *    areas and survives hydration.
 *  - Icons are visible, focusable, keyboard reachable, and unobstructed by the
 *    notice in both themes and at a 320px mobile viewport.
 *  - Structured data references the current profile.
 */

const CURRENT_LINKEDIN = "https://www.linkedin.com/in/etaly-queen/";
const GMAIL_COMPOSE = "https://mail.google.com/mail/?view=cm&fs=1&to=etalyahsimpson.tech%40gmail.com";
const NOTICE =
  "My previous LinkedIn account is no longer accessible to me following an account issue and is no longer in use. Please connect through my current profile.";
const GMAIL_LABEL = "Email me in Gmail (opens in new tab)";
const LINKEDIN_LABEL = "Connect with me on LinkedIn (opens in new tab)";

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

test("Gmail and LinkedIn icons are visible and correctly labelled in the contact area", async ({ page }) => {
  await page.goto("/contact/");
  // Scoped to the contact area: the header CTA and footer pill share the
  // same accessible name by design.
  const contact = page.locator("#main-content");
  const gmail = contact.getByRole("link", { name: GMAIL_LABEL });
  const linkedin = contact.getByRole("link", { name: LINKEDIN_LABEL });
  await expect(gmail).toBeVisible();
  await expect(linkedin).toBeVisible();
  expect(await gmail.getAttribute("href")).toBe(GMAIL_COMPOSE);
  expect(await gmail.getAttribute("target")).toBe("_blank");
  expect(await gmail.getAttribute("rel")).toContain("noopener");
  expect(await linkedin.getAttribute("href")).toBe(CURRENT_LINKEDIN);
  expect(await linkedin.getAttribute("target")).toBe("_blank");
  expect(await linkedin.getAttribute("rel")).toContain("noopener");
});

test("both icons meet the 44px touch-target minimum", async ({ page }) => {
  await page.goto("/contact/");
  const contact = page.locator("#main-content");
  for (const label of [GMAIL_LABEL, LINKEDIN_LABEL]) {
    const box = await contact.getByRole("link", { name: label }).boundingBox();
    expect(box?.height ?? 0, `${label} touch target height`).toBeGreaterThanOrEqual(44);
    expect(box?.width ?? 0, `${label} touch target width`).toBeGreaterThanOrEqual(44);
  }
});

test("both icons are keyboard reachable with a visible focus outline", async ({ page }) => {
  await page.goto("/contact/");
  const contact = page.locator("#main-content");
  for (const label of [GMAIL_LABEL, LINKEDIN_LABEL]) {
    const link = contact.getByRole("link", { name: label });
    // Walk the natural tab order with the keyboard until the icon is focused.
    await page.keyboard.press("Tab");
    let reached = false;
    for (let i = 0; i < 40 && !reached; i += 1) {
      reached = await link.evaluate((el) => document.activeElement === el);
      if (!reached) await page.keyboard.press("Tab");
    }
    expect(reached, `${label} must be reachable by keyboard Tab`).toBe(true);
    // Keyboard focus triggers the global :focus-visible outline in Chromium.
    const outline = await link.evaluate((el) => {
      const style = getComputedStyle(el);
      return { style: style.outlineStyle, width: style.outlineWidth };
    });
    expect(outline.style, `${label} focus outline style`).toBe("solid");
    expect(outline.width, `${label} focus outline width`).not.toBe("0px");
  }
});

test("icons remain visible and unobstructed by the notice at 320px in both themes", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  for (const theme of ["dark", "light"] as const) {
    await page.goto("/contact/", { waitUntil: "networkidle" });
    if (theme === "light") {
      await page.getByRole("button", { name: "Switch to light theme" }).click();
      await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    }
    const contact = page.locator("#main-content");
    const gmail = contact.getByRole("link", { name: GMAIL_LABEL });
    const linkedin = contact.getByRole("link", { name: LINKEDIN_LABEL });
    const notice = page.getByText(NOTICE);
    await expect(gmail).toBeVisible();
    await expect(linkedin).toBeVisible();
    await expect(notice).toBeVisible();

    const boxes = {
      gmail: await gmail.boundingBox(),
      linkedin: await linkedin.boundingBox(),
      notice: await notice.boundingBox(),
    };
    type Box = { x: number; y: number; width: number; height: number } | null;
    const overlaps = (a: Box, b: Box) => {
      if (!a || !b) return false;
      return a.x < b.x + b.width && b.x < a.x + a.width && a.y < b.y + b.height && b.y < a.y + a.height;
    };
    expect(overlaps(boxes.gmail, boxes.notice), `gmail icon overlapped by notice (${theme})`).toBe(false);
    expect(overlaps(boxes.linkedin, boxes.notice), `linkedin icon overlapped by notice (${theme})`).toBe(false);
    // Everything inside the viewport width (no clipped icons at 320px).
    for (const [name, box] of Object.entries(boxes)) {
      expect(box?.x ?? 999, `${name} x-position at 320px (${theme})`).toBeGreaterThanOrEqual(0);
      expect((box?.x ?? 999) + (box?.width ?? 0), `${name} right edge at 320px (${theme})`).toBeLessThanOrEqual(320);
    }
  }
});

test("LinkedIn icon appears in the homepage contact section and footer with the current destination", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const linkedin = page.locator(`a[href="${CURRENT_LINKEDIN}"]`);
  expect(await linkedin.count(), "LinkedIn icons on the homepage").toBeGreaterThanOrEqual(2);
  await expect(linkedin.first()).toBeVisible();
});

test("every LinkedIn destination across all routes is the owner-confirmed current profile", async ({ page }) => {
  for (const route of ALL_ROUTES) {
    await page.goto(route, { waitUntil: "networkidle" });
    const links = page.locator('a[href*="linkedin.com/in/"]');
    const count = await links.count();
    for (let i = 0; i < count; i += 1) {
      const href = await links.nth(i).getAttribute("href");
      expect(href, `LinkedIn destination on ${route} at index ${i}`).toBe(CURRENT_LINKEDIN);
    }
  }
});

test("former LinkedIn destinations are absent from initial HTML and metadata", async ({ request }) => {
  for (const route of ["/", "/contact/", "/projects/policyguard-ai/"]) {
    const html = await (await request.get(route)).text();
    // Only the current profile path may appear.
    const matches = html.match(/linkedin\.com\/in\/[a-z0-9-]+/gi) ?? [];
    for (const match of matches) {
      expect(match.toLowerCase()).toBe("linkedin.com/in/etaly-queen");
    }
  }
});

test("no visible raw email address or raw LinkedIn URL in rendered content on any route", async ({ page }) => {
  for (const route of ALL_ROUTES) {
    await page.goto(route, { waitUntil: "networkidle" });
    const body = await page.locator("body").innerText();
    expect(body, `visible raw email address on ${route}`).not.toContain("etalyahsimpson.tech@gmail.com");
    expect(body, `visible raw LinkedIn URL on ${route}`).not.toContain("linkedin.com/in/");
  }
});

test("exact LinkedIn transition notice appears in both contact areas after hydration", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.locator("#contact").getByText(NOTICE)).toBeVisible();
  await page.goto("/contact/", { waitUntil: "networkidle" });
  await expect(page.getByText(NOTICE)).toBeVisible();
});

test("structured data references the current LinkedIn profile", async ({ request }) => {
  const html = await (await request.get("/")).text();
  const jsonLd = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
  expect(jsonLd).toBeTruthy();
  const data = JSON.parse(jsonLd ?? "{}");
  expect(data.sameAs).toContain(CURRENT_LINKEDIN);
  expect(data.email).toBe("mailto:etalyahsimpson.tech@gmail.com");
});

test("Gmail icon is never labelled with the raw address", async ({ page }) => {
  await page.goto("/contact/");
  const gmail = page.locator("#main-content").getByRole("link", { name: GMAIL_LABEL });
  await expect(gmail).not.toContainText("@");
  const title = await gmail.getAttribute("title");
  expect(title ?? "").not.toContain("@");
});
