import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { SITE } from "@/content/site";
import "./globals.css";

/**
 * Manrope variable font, bundled locally. No runtime third-party font
 * requests: the exported site is fully self-contained.
 */
const manrope = localFont({
  src: "../fonts/manrope-latin-wght-normal.woff2",
  weight: "200 800",
  style: "normal",
  display: "swap",
  variable: "--font-manrope",
  fallback: [
    "ui-sans-serif",
    "system-ui",
    "-apple-system",
    "Segoe UI",
    "Roboto",
    "Helvetica Neue",
    "Arial",
    "sans-serif",
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.origin),
  title: {
    default: "Etalyah Simpson · Software Engineering, Agentic Coding & AI Evaluation",
    template: "%s · Etalyah Simpson",
  },
  description: SITE.description,
  applicationName: "Etalyah Simpson Portfolio",
  authors: [{ name: SITE.owner, url: SITE.url }],
  creator: SITE.owner,
  publisher: SITE.owner,
  formatDetection: { telephone: false, date: false, address: false, email: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#17131F" },
    { media: "(prefers-color-scheme: light)", color: "#C8C5D0" },
  ],
};

/**
 * Pre-paint theme bootstrap.
 *
 * The document ships with data-theme="dark" (the default for every first
 * visit, regardless of OS preference). If the visitor previously chose a
 * theme, restore it here, before first paint, so there is no flash. This
 * script is intentionally tiny, inline, CSP-friendly (no eval, no remote
 * fetch), and safe on every route of the static export. suppressHydration
 * on <html> covers the case where the stored choice differs from the
 * server-rendered default.
 */
const themeBootstrap = `(function(){try{var t=localStorage.getItem("etalyah-theme");if(t==="light"||t==="dark"){document.documentElement.dataset.theme=t;}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" className={manrope.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body className="flex min-h-screen flex-col bg-page text-ink antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-on-primary"
        >
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
