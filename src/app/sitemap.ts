import type { MetadataRoute } from "next";
import { SITE_ROUTES, SITE } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return SITE_ROUTES.map((route) => ({
    url: `${SITE.origin}${route === "/" ? "/" : route}`,
    lastModified,
    changeFrequency: "monthly",
    priority: route === "/" ? 1 : route.startsWith("/projects/") ? 0.9 : 0.7,
  }));
}
