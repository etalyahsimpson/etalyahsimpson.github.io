import type { Metadata } from "next";
import { SITE } from "@/content/site";
import { absoluteUrl } from "@/lib/urls";

interface RouteMetadataInput {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "profile";
}

/**
 * Build complete per-route metadata: title, description, canonical, Open
 * Graph, and Twitter card values, all resolved against the production origin.
 * Rendered into the initial static HTML at build time.
 */
export function buildRouteMetadata({
  title,
  description,
  path,
  image = "/previews/etalyah-home.png",
  type = "website",
}: RouteMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = absoluteUrl(image);
  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.title,
      type,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${title} · ${SITE.title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
