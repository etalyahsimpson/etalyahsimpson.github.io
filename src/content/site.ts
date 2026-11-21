/**
 * Central site constants: canonical URLs and navigation structure.
 * The production origin is the GitHub Pages user site root.
 */

export const SITE = {
  title: "Etalyah Simpson",
  origin: "https://etalyahsimpson.github.io",
  url: "https://etalyahsimpson.github.io/",
  tagline: "Agentic Coding · Software Engineering · AI Evaluation",
  description:
    "Etalyah Simpson is a full-stack and AI engineer in Philadelphia, PA with 4+ years of experience building customer-facing applications, model-backed services, and evidence-based AI evaluation workflows.",
  owner: "Etalyah Simpson",
  year: new Date().getFullYear(),
} as const;

/**
 * Canonical external contact destinations. These are the ONLY approved
 * outbound contact links; components must reference them from here rather
 * than hardcoding URLs. Raw addresses are never rendered as visible text.
 */
export const EXTERNAL_LINKS = {
  githubProfile: "https://github.com/etalyahsimpson",
  email: "etalyahsimpson.tech@gmail.com",
  /** Pre-addressed Gmail composition view (primary email action). */
  gmailCompose:
    "https://mail.google.com/mail/?view=cm&fs=1&to=etalyahsimpson.tech%40gmail.com",
  /** Owner-confirmed CURRENT LinkedIn profile (the sole LinkedIn destination). */
  linkedinProfile: "https://www.linkedin.com/in/etaly-queen/",
} as const;

/**
 * Owner-approved public notice about the previous LinkedIn account.
 * Exact wording; do not alter, and never include the former URL or handle.
 */
export const LINKEDIN_TRANSITION_NOTICE =
  "My previous LinkedIn account is no longer accessible to me following an account issue and is no longer in use. Please connect through my current profile.";

/** Top-level navigation. Every entry points to a real exported route. */
export const NAV_ITEMS = [
  { label: "About", href: "/about/" },
  { label: "Expertise", href: "/skills/" },
  { label: "Experience", href: "/experience/" },
  { label: "Projects", href: "/projects/" },
  { label: "Roadmap", href: "/roadmap/" },
  { label: "Contact", href: "/contact/" },
] as const;

/** All routes that must exist in the static export (see docs/ROUTE_MAP.md). */
export const SITE_ROUTES = [
  "/",
  "/about/",
  "/skills/",
  "/experience/",
  "/projects/",
  "/projects/policyguard-ai/",
  "/projects/vendorlens-ai/",
  "/projects/becbarrier/",
  "/roadmap/",
  "/education/",
  "/certifications/",
  "/contact/",
] as const;
