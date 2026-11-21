import type { NextConfig } from "next";

/**
 * Static-export configuration for the GitHub Pages user site
 * https://etalyahsimpson.github.io/ (root deployment, empty base path).
 * scripts/build-static.sh resolves NEXT_PUBLIC_BASE_PATH: it is ALWAYS the
 * empty string for this user-site repository.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
