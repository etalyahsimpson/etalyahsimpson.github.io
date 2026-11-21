import { test, expect } from "@playwright/test";

/**
 * Initial-HTML social metadata: values must be present in the served HTML
 * before hydration (fetched raw with Playwright's request context).
 */
const ORIGIN = "https://etalyahsimpson.github.io";

const CHECKS: {
  route: string;
  title: string;
  ogImage: string;
  canonical: string;
}[] = [
  { route: "/", title: "Etalyah Simpson", ogImage: `${ORIGIN}/previews/etalyah-home.png`, canonical: `${ORIGIN}/` },
  { route: "/projects/policyguard-ai/", title: "PolicyGuard AI", ogImage: `${ORIGIN}/previews/policyguard-ai.png`, canonical: `${ORIGIN}/projects/policyguard-ai/` },
  { route: "/projects/vendorlens-ai/", title: "VendorLens AI", ogImage: `${ORIGIN}/previews/vendorlens-ai.png`, canonical: `${ORIGIN}/projects/vendorlens-ai/` },
  { route: "/projects/becbarrier/", title: "BECBarrier", ogImage: `${ORIGIN}/previews/becbarrier.png`, canonical: `${ORIGIN}/projects/becbarrier/` },
  { route: "/experience/", title: "Work Experience", ogImage: `${ORIGIN}/previews/etalyah-experience.png`, canonical: `${ORIGIN}/experience/` },
];

for (const check of CHECKS) {
  test(`initial HTML metadata for ${check.route}`, async ({ request }) => {
    const response = await request.get(check.route);
    expect(response.status()).toBe(200);
    const html = await response.text();

    const title = html.match(/<title>([^<]*)<\/title>/i)?.[1];
    expect(title).toContain(check.title);

    const canonical = html.match(/<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']+)["']/i)?.[1];
    expect(canonical).toBe(check.canonical);

    const ogImage = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i)?.[1]
      ?? html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i)?.[1];
    expect(ogImage).toBe(check.ogImage);

    const ogUrl = html.match(/<meta[^>]+property=["']og:url["'][^>]+content=["']([^"']+)["']/i)?.[1]
      ?? html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:url["']/i)?.[1];
    expect(ogUrl).toBe(check.canonical);

    const twitterCard = html.match(/<meta[^>]+name=["']twitter:card["'][^>]+content=["']([^"']+)["']/i)?.[1]
      ?? html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:card["']/i)?.[1];
    expect(twitterCard).toBe("summary_large_image");

    // the preview image itself must be fetchable with an image content type
    const imageResponse = await request.get(new URL(check.ogImage).pathname);
    expect(imageResponse.status()).toBe(200);
    expect(imageResponse.headers()["content-type"]).toContain("image/");
  });
}

test("every project route has a unique og:image", async ({ request }) => {
  const images = new Set<string>();
  for (const slug of ["policyguard-ai", "vendorlens-ai", "becbarrier"]) {
    const html = await (await request.get(`/projects/${slug}/`)).text();
    const ogImage = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i)?.[1]
      ?? html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i)?.[1];
    expect(ogImage).toBeTruthy();
    images.add(ogImage ?? "");
  }
  expect(images.size).toBe(3);
});
