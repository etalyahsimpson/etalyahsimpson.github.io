import { test, expect } from "@playwright/test";

/**
 * Theme contract:
 *  - first visit with no stored preference defaults to DARK on every route,
 *    including direct visits to project pages;
 *  - the static HTML itself ships data-theme="dark" plus an inline pre-paint
 *    bootstrap so a stored preference is applied before first paint (no flash);
 *  - the header toggle switches to an intermediate-gray light mode (never a
 *    white page), persists across reloads and routes, and is keyboard operable;
 *  - body text keeps WCAG AA contrast against the page background in both
 *    themes;
 *  - technology badges render an icon and an accessible label everywhere they
 *    appear.
 */

const DARK_PAGE_BG = "rgb(23, 19, 31)"; // #17131F
const LIGHT_PAGE_BG = "rgb(200, 197, 208)"; // #C8C5D0 intermediate gray

test("first visit defaults to dark on home and deep project routes", async ({ page }) => {
  for (const route of ["/", "/projects/policyguard-ai/", "/contact/"]) {
    await page.goto(route, { waitUntil: "domcontentloaded" });
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    expect(bg, `dark page background on ${route}`).toBe(DARK_PAGE_BG);
  }
});

test("server HTML ships the dark default and the pre-paint bootstrap", async ({ page }) => {
  const response = await page.goto("/", { waitUntil: "networkidle" });
  const html = (await response?.text()) ?? "";
  expect(html).toContain('data-theme="dark"');
  expect(html).toContain('localStorage.getItem("etalyah-theme")');
  // The bootstrap script must run inside <head>, before any visible content.
  const headEnd = html.indexOf("</head>");
  const scriptIndex = html.indexOf('localStorage.getItem("etalyah-theme")');
  expect(scriptIndex).toBeGreaterThan(0);
  expect(scriptIndex).toBeLessThan(headEnd);
});

test("stored light preference is active by DOMContentLoaded (no flash window)", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("etalyah-theme", "light"));
  await page.goto("/", { waitUntil: "domcontentloaded" });
  expect(await page.evaluate(() => document.documentElement.dataset.theme)).toBe("light");
  const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  expect(bg).toBe(LIGHT_PAGE_BG);
});

test("toggle switches dark to intermediate-gray light and back", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.getByRole("button", { name: "Switch to light theme" })).toBeVisible();
  await page.getByRole("button", { name: "Switch to light theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  // The body background transitions over 200ms; poll until it settles.
  await expect
    .poll(async () => page.evaluate(() => getComputedStyle(document.body).backgroundColor), { timeout: 3_000 })
    .toBe(LIGHT_PAGE_BG);

  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect
    .poll(async () => page.evaluate(() => getComputedStyle(document.body).backgroundColor), { timeout: 3_000 })
    .toBe(DARK_PAGE_BG);
});

test("theme choice persists across reload and route navigation", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Switch to light theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");

  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");

  await page.click('header a[href="/projects/"]');
  await expect(page).toHaveURL(/\/projects\/$/);
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
});

test("theme toggle is keyboard operable", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const toggle = page.getByRole("button", { name: "Switch to light theme" });
  await toggle.focus();
  await expect(toggle).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");

  const toggleBack = page.getByRole("button", { name: "Switch to dark theme" });
  await toggleBack.focus();
  await page.keyboard.press("Space");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});

test("body text meets WCAG AA contrast on the page background in both themes", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const contrast = await page.evaluate(() => {
    const luminance = (r: number, g: number, b: number) => {
      const channel = (c: number) => {
        const s = c / 255;
        return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
      };
      return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
    };
    const parse = (color: string) => {
      const m = color.match(/rgba?\((\d+), (\d+), (\d+)(?:, ([\d.]+))?\)/);
      if (!m) return null;
      return { r: Number(m[1]), g: Number(m[2]), b: Number(m[3]), a: m[4] === undefined ? 1 : Number(m[4]) };
    };
    const ratio = (fg: string, bg: string) => {
      const f = parse(fg);
      const b = parse(bg);
      if (!f || !b) return null;
      const l1 = luminance(f.r, f.g, f.b);
      const l2 = luminance(b.r, b.g, b.b);
      const [hi, lo] = l1 >= l2 ? [l1, l2] : [l2, l1];
      return (hi + 0.05) / (lo + 0.05);
    };
    const bodyColor = getComputedStyle(document.body).color;
    const bodyBg = getComputedStyle(document.body).backgroundColor;
    return { darkRatio: ratio(bodyColor, bodyBg) };
  });
  expect(contrast.darkRatio ?? 0, "dark theme body text contrast").toBeGreaterThanOrEqual(4.5);

  await page.getByRole("button", { name: "Switch to light theme" }).click();
  // Wait for the 200ms background transition to settle before measuring.
  await expect
    .poll(async () => page.evaluate(() => getComputedStyle(document.body).backgroundColor), { timeout: 3_000 })
    .toBe(LIGHT_PAGE_BG);
  const lightRatio = await page.evaluate(() => {
    const luminance = (r: number, g: number, b: number) => {
      const channel = (c: number) => {
        const s = c / 255;
        return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
      };
      return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
    };
    const parse = (color: string) => {
      const m = color.match(/rgba?\((\d+), (\d+), (\d+)(?:, ([\d.]+))?\)/);
      if (!m) return null;
      return { r: Number(m[1]), g: Number(m[2]), b: Number(m[3]), a: m[4] === undefined ? 1 : Number(m[4]) };
    };
    const ratio = (fg: string, bg: string) => {
      const f = parse(fg);
      const b = parse(bg);
      if (!f || !b) return null;
      const l1 = luminance(f.r, f.g, f.b);
      const l2 = luminance(b.r, b.g, b.b);
      const [hi, lo] = l1 >= l2 ? [l1, l2] : [l2, l1];
      return (hi + 0.05) / (lo + 0.05);
    };
    return ratio(getComputedStyle(document.body).color, getComputedStyle(document.body).backgroundColor);
  });
  expect(lightRatio ?? 0, "light theme body text contrast").toBeGreaterThanOrEqual(4.5);
});

test("technology badges render an icon and an accessible label on every route that shows them", async ({ page }) => {
  for (const route of ["/", "/skills/", "/projects/policyguard-ai/"]) {
    await page.goto(route, { waitUntil: "networkidle" });
    const badges = page.locator(".technology-badge");
    const count = await badges.count();
    expect(count, `technology badges on ${route}`).toBeGreaterThan(0);
    const withIcons = await badges.locator("svg").count();
    expect(withIcons, `every badge on ${route} carries an icon`).toBe(count);
    for (let i = 0; i < count; i += 1) {
      const label = (await badges.nth(i).innerText()).trim();
      expect(label.length, `badge label on ${route} at index ${i}`).toBeGreaterThan(0);
    }
  }
});
