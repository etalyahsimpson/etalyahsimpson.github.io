import { test, expect, type Page } from "@playwright/test";

/**
 * Core route matrix: every required route must return 200 on a fresh context,
 * render its heading, load all images, and produce no console errors.
 */

const ROUTES: { path: string; heading: RegExp }[] = [
  { path: "/", heading: /Etalyah/i },
  { path: "/about/", heading: /Full-stack engineering/i },
  { path: "/skills/", heading: /Skills grouped by engineering purpose/i },
  { path: "/experience/", heading: /Four roles/i },
  { path: "/projects/", heading: /Engineering work you can inspect/i },
  { path: "/projects/policyguard-ai/", heading: /PolicyGuard AI/i },
  { path: "/projects/vendorlens-ai/", heading: /VendorLens AI/i },
  { path: "/projects/becbarrier/", heading: /BECBarrier/i },
  { path: "/roadmap/", heading: /Long-form initiatives/i },
  { path: "/education/", heading: /Formal education/i },
  { path: "/certifications/", heading: /Cloud architecture/i },
  { path: "/contact/", heading: /Email is the best way/i },
];

const consoleErrors: string[] = [];
async function captureConsoleErrors(page: Page) {
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => consoleErrors.push(String(error)));
}

for (const route of ROUTES) {
  test(`route ${route.path} renders`, async ({ page }) => {
    await captureConsoleErrors(page);
    const response = await page.goto(route.path, { waitUntil: "networkidle" });
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1").first()).toBeVisible();
    await expect(page.locator("h1").first()).toContainText(route.heading);
  });
}

test("every image on every route loads", async ({ page }) => {
  await captureConsoleErrors(page);
  for (const route of ROUTES) {
    await page.goto(route.path, { waitUntil: "networkidle" });
    const images = page.locator("img");
    const count = await images.count();
    for (let i = 0; i < count; i += 1) {
      const image = images.nth(i);
      // Lazy-loaded images below the fold only load once scrolled into
      // view; scroll each image into view and wait for its decode.
      await image.scrollIntoViewIfNeeded();
      await image.evaluate((el) => (el as HTMLImageElement).decode().catch(() => undefined));
      const complete = await image.evaluate((img) => { const image = img as HTMLImageElement; return image.complete && image.naturalWidth > 0; });
      expect(complete, `broken image on ${route.path} at index ${i}`).toBe(true);
    }
  }
});

test("no console errors across the site", async ({ page }) => {
  await captureConsoleErrors(page);
  for (const route of ROUTES) {
    await page.goto(route.path, { waitUntil: "networkidle" });
  }
  expect(consoleErrors).toEqual([]);
});

test("project deep links open directly and refresh safely", async ({ page }) => {
  for (const slug of ["policyguard-ai", "vendorlens-ai", "becbarrier"]) {
    await page.goto(`/projects/${slug}/`);
    await expect(page.locator("h1")).toContainText(
      slug === "policyguard-ai" ? "PolicyGuard AI" : slug === "vendorlens-ai" ? "VendorLens AI" : "BECBarrier",
    );
    await page.reload();
    await expect(page.locator("h1")).toBeVisible();
    expect(page.url()).toContain(`/projects/${slug}/`);
  }
});

test("homepage navigation reaches project case study and back", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "View PolicyGuard AI case study" }).first().click();
  await expect(page).toHaveURL(/\/projects\/policyguard-ai\/$/);
  await expect(page.locator("h1")).toContainText("PolicyGuard AI");
  await page.goBack();
  await expect(page).toHaveURL(/\/$/);
  await page.goForward();
  await expect(page).toHaveURL(/\/projects\/policyguard-ai\/$/);
});

test("breadcrumb returns to projects overview", async ({ page }) => {
  await page.goto("/projects/becbarrier/");
  await page.getByRole("link", { name: "Projects" }).first().click();
  await expect(page).toHaveURL(/\/projects\/$/);
});

test("hero shows the approved official portrait", async ({ page }) => {
  await page.goto("/");
  const hero = page.locator('img[alt*="black blazer"]').first();
  await expect(hero).toBeVisible();
  const box = await hero.boundingBox();
  expect(box?.width ?? 0).toBeGreaterThan(100);
});

test("about section shows the approved smiling portrait", async ({ page }) => {
  await page.goto("/");
  const smiling = page.locator('img[alt*="smiling"]').first();
  await expect(smiling).toBeVisible();
});
