import { SITE } from "@/content/site";
import type { PortfolioProject } from "@/content/projects";

/** Build an absolute https URL for a site path (path starts with "/"). */
export function absoluteUrl(path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${SITE.origin}${clean === "/" ? "/" : clean}`;
}

/** Canonical public URL of a project case study. */
export function projectUrl(slug: string): string {
  return absoluteUrl(`/projects/${slug}/`);
}

/** Repository URL for a project, typed against the registry. */
export function projectRepositoryUrl(project: PortfolioProject): string {
  return project.repositoryUrl;
}

/** Mailto link, the standards-based fallback for users unable to use Gmail. */
export function emailLink(email: string): string {
  return `mailto:${email}`;
}
