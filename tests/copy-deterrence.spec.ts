import { test, expect } from "@playwright/test";

/**
 * Copy-deterrence contract (client-side friction, not enforcement):
 *  - authored reading regions (hero, About, skills, experience, project
 *    descriptions, roadmap, education/certification cards) suppress pointer
 *    text selection via scoped user-select: none;
 *  - presentation portraits and project visuals resist dragging;
 *  - links, keyboard focus, theme toggle, navigation, and the intentional
 *    Copy Project Link feature remain fully functional.
 */

const ALL_ROUTES = [
  "/",
  "/about/",
  "/skills/",
  "/experience/",
  "/projects/",
  "/projects/policyguard-ai/",
  "/roadmap/",
  "/education/",
  "/certifications/",
  "/contact/",
];

test("authored reading regions suppress computed text selection", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const regions = [
    'section#top h1', // hero heading
    'section#about p', // about narrative
    'section#expertise p', // skills copy
    'section#experience p', // experience copy
    'section#projects p', // project card copy
    'section#roadmap p', // roadmap copy
    'section#education p', // education/certification copy
  ];
  for (const selector of regions) {
    const el = page.locator(selector).first();
    await expect(el).toBeVisible();
    const computed = await el.evaluate((node) => getComputedStyle(node).userSelect);
    expect(computed, `${selector} must be inside a user-select:none region`).toBe("none");
  }
});

test("pointer text selection on protected content yields no copied text", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const hero = page.locator("section#top p").first();
  const selected = await hero.evaluate((node) => {
    const range = document.createRange();
    range.selectNodeContents(node);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
    const text = selection?.toString() ?? "";
    selection?.removeAllRanges();
    return text;
  });
  expect(selected, "hero paragraph must not be selectable").toBe("");
});

test("project case-study descriptions are protected on project routes", async ({ page }) => {
  for (const slug of ["policyguard-ai", "vendorlens-ai", "becbarrier"]) {
    await page.goto(`/projects/${slug}/`, { waitUntil: "networkidle" });
    const paragraph = page.locator("#problem-heading ~ div p, section p").first();
    const computed = await paragraph.evaluate((node) => getComputedStyle(node).userSelect);
    expect(computed, `${slug} description must be inside a user-select:none region`).toBe("none");
  }
});

test("inner-page hero bands and page content are protected on every route", async ({ page }) => {
  for (const route of ALL_ROUTES.slice(1)) {
    await page.goto(route, { waitUntil: "networkidle" });
    const heading = page.locator("h1").first();
    const computed = await heading.evaluate((node) => getComputedStyle(node).userSelect);
    expect(computed, `h1 on ${route} must be inside a user-select:none region`).toBe("none");
  }
});

test("presentation images resist dragging", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const heroPortrait = page.locator('img[alt*="black blazer"]').first();
  await expect(heroPortrait).toBeVisible();
  const heroDrag = await heroPortrait.evaluate((img) => {
    const image = img as HTMLImageElement;
    return {
      draggable: image.draggable,
      cssDrag: getComputedStyle(image).getPropertyValue("-webkit-user-drag").trim(),
    };
  });
  expect(heroDrag.draggable, "hero portrait must set draggable=false").toBe(false);
  expect(heroDrag.cssDrag, "hero portrait must set -webkit-user-drag:none").toBe("none");

  await page.goto("/projects/policyguard-ai/", { waitUntil: "networkidle" });
  const banner = page.locator("figure img").first();
  const bannerDrag = await banner.evaluate((img) => {
    const image = img as HTMLImageElement;
    return {
      draggable: image.draggable,
      cssDrag: getComputedStyle(image).getPropertyValue("-webkit-user-drag").trim(),
    };
  });
  expect(bannerDrag.draggable, "project banner must set draggable=false").toBe(false);
  expect(bannerDrag.cssDrag, "project banner must set -webkit-user-drag:none").toBe("none");
});

test("image links still navigate after drag protection", async ({ page }) => {
  await page.goto("/projects/", { waitUntil: "networkidle" });
  await page.getByRole("link", { name: "View PolicyGuard AI case study" }).first().click();
  await expect(page).toHaveURL(/\/projects\/policyguard-ai\/$/);
});

test("links, theme toggle, and navigation remain functional inside protected regions", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  // Theme toggle (in the sticky header, outside protected regions).
  await page.getByRole("button", { name: "Switch to light theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  // Internal navigation link inside a protected section.
  await page.getByRole("link", { name: "Read the full story" }).click();
  await expect(page).toHaveURL(/\/about\/$/);
  // External anchor inside a protected region still carries its target.
  await page.goto("/", { waitUntil: "networkidle" });
  const github = page.locator('section#contact a[href^="https://github.com/etalyahsimpson"]');
  await expect(github.first()).toBeVisible();
  expect(await github.first().getAttribute("target")).toBe("_blank");
});

test("Copy Project Link remains functional under copy deterrence", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/projects/policyguard-ai/", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: /copy the link to the policyguard ai case study/i }).click();
  await expect(page.getByText("Link copied")).toBeVisible();
  const clipboard = await page.evaluate(() => navigator.clipboard.readText());
  expect(clipboard).toBe("https://etalyahsimpson.github.io/projects/policyguard-ai/");
});

test("manual copy fallback URL stays selectable if ever rendered", async ({ page }) => {
  // The .selectable opt-out is a CSS contract: elements carrying it inside
  // protected regions must compute to selectable text.
  await page.goto("/projects/policyguard-ai/", { waitUntil: "networkidle" });
  const selectable = await page.evaluate(() => {
    const el = document.createElement("code");
    el.className = "selectable";
    const protectedRegion = document.querySelector(".copy-deter");
    if (!protectedRegion) return null;
    protectedRegion.appendChild(el);
    const computed = getComputedStyle(el).userSelect;
    el.remove();
    return computed;
  });
  expect(selectable).toBe("text");
});
