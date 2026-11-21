import { test, expect } from "@playwright/test";

/**
 * Project interaction contract:
 *  - Copy Project Link copies the canonical HTTPS route
 *  - repository actions point to the correct GitHub repositories in new tabs
 *  - case-study links navigate internally with URL updates
 */

test("copy project link copies the canonical URL", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/projects/policyguard-ai/");
  await page.getByRole("button", { name: /copy the link to the policyguard ai case study/i }).click();
  await expect(page.getByText("Link copied")).toBeVisible();
  const clipboard = await page.evaluate(() => navigator.clipboard.readText());
  expect(clipboard).toBe("https://etalyahsimpson.github.io/projects/policyguard-ai/");
});

const PROJECTS = [
  { slug: "policyguard-ai", title: "PolicyGuard AI" },
  { slug: "vendorlens-ai", title: "VendorLens AI" },
  { slug: "becbarrier", title: "BECBarrier" },
];

for (const project of PROJECTS) {
  test(`repository actions on ${project.slug} are correct external anchors`, async ({ page }) => {
    await page.goto(`/projects/${project.slug}/`);
    const repo = page.locator(`a[href="https://github.com/etalyahsimpson/${project.slug}"]`);
    const count = await repo.count();
    expect(count).toBeGreaterThan(0);
    const first = repo.first();
    expect(await first.getAttribute("target")).toBe("_blank");
    expect(await first.getAttribute("rel")).toContain("noopener");

    // project card repository anchor on the overview page as well
    await page.goto("/projects/");
    const cardRepo = page.locator(`a[href="https://github.com/etalyahsimpson/${project.slug}"]`);
    expect(await cardRepo.count()).toBeGreaterThan(0);
    expect(await cardRepo.first().getAttribute("target")).toBe("_blank");
  });

  test(`case-study navigation from card to ${project.slug} updates the address bar`, async ({ page }) => {
    await page.goto("/projects/");
    await page.getByRole("link", { name: `View ${project.title} case study` }).first().click();
    await expect(page).toHaveURL(new RegExp(`/projects/${project.slug}/$`));
    await expect(page.locator("h1")).toContainText(project.title);
  });
}

test("no nested interactive elements inside project card links", async ({ page }) => {
  await page.goto("/projects/");
  const cardLinks = page.locator("article a");
  const count = await cardLinks.count();
  for (let i = 0; i < count; i += 1) {
    const nested = await cardLinks.nth(i).evaluate((el) => el.querySelector("a, button"));
    expect(nested, "anchor must not contain another interactive element").toBeNull();
  }
});
