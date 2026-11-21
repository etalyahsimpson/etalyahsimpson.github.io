import { test, expect } from "@playwright/test";

/**
 * Responsive layout: no horizontal overflow at 320, 360, 390, 768, 1024,
 * 1280, and 1440 px. Portraits remain visible on mobile.
 */
const WIDTHS = [320, 360, 390, 768, 1024, 1280, 1440];

for (const width of WIDTHS) {
  test(`no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/", { waitUntil: "networkidle" });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow, `horizontal overflow at ${width}px`).toBeLessThanOrEqual(1);
  });
}

for (const width of [320, 390, 768, 1280]) {
  test(`hero portrait visible and intact at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/", { waitUntil: "networkidle" });
    const hero = page.locator('img[alt*="black blazer"]').first();
    await expect(hero).toBeVisible();
    const box = await hero.boundingBox();
    expect(box?.width ?? 0).toBeGreaterThan(60);
    const loaded = await hero.evaluate((img) => { const image = img as HTMLImageElement; return image.complete && image.naturalWidth > 0; });
    expect(loaded).toBe(true);
  });

  test(`about portrait visible at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/", { waitUntil: "networkidle" });
    const smiling = page.locator('img[alt*="smiling"]').first();
    await expect(smiling).toBeVisible();
    const loaded = await smiling.evaluate((img) => { const image = img as HTMLImageElement; return image.complete && image.naturalWidth > 0; });
    expect(loaded).toBe(true);
  });
}

test("mobile menu opens, navigates, and closes on Escape", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Open menu" });
  await toggle.click();
  await expect(page.getByRole("button", { name: "Close menu" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();

  await toggle.click();
  await page.getByRole("link", { name: "Projects" }).last().click();
  await expect(page).toHaveURL(/\/projects\/$/);
});

test("sticky header never covers anchored section headings", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/#projects", { waitUntil: "load" });
  // The browser performs the fragment scroll (respecting the site's
  // scroll-padding-top). Wait in-page until the scroll has started and the
  // smooth-scroll animation has settled (scrollY stops changing).
  const settledScrollY = await page.evaluate(async () => {
    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    let last = -1;
    for (let i = 0; i < 25; i += 1) {
      const y = window.scrollY;
      if (y > 0 && y === last) return y;
      last = y;
      await sleep(200);
    }
    return window.scrollY;
  });
  expect(settledScrollY, "fragment navigation did not scroll to the section").toBeGreaterThan(0);
  // The anchored section heading must sit fully below the sticky header.
  const headerBox = await page.locator("header").boundingBox();
  const sectionBox = await page.locator("#projects").boundingBox();
  const headerBottom = (headerBox?.y ?? 0) + (headerBox?.height ?? 0);
  expect((sectionBox?.y ?? -1) - headerBottom, "anchored heading is covered by the sticky header").toBeGreaterThanOrEqual(0);
});
