import Link from "next/link";
import { NAV_ITEMS, EXTERNAL_LINKS, SITE } from "@/content/site";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { GitHubIcon } from "@/components/layout/es-mark";
import { PortraitMark } from "@/components/layout/portrait-mark";
import { Container } from "@/components/layout/container";

/** Global footer: identity, sitemap, professional evidence links, email. */
export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line bg-section">
      <Container className="py-12 sm:py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <PortraitMark className="h-8 w-8" />
              <span className="text-[0.9375rem] font-extrabold text-ink">
                Etalyah <span className="text-primary">Simpson</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-muted">
              Full-stack and AI engineer building applications, model-backed services, and
              evidence-based AI evaluation workflows.
            </p>
            <p className="mt-4 text-xs font-medium uppercase tracking-[0.12em] text-ink-muted/80">
              {profile.location}
            </p>
          </div>

          <nav aria-label="Site footer navigation">
            <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-ink">Explore</h2>
            <ul className="mt-4 grid gap-2.5">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm font-medium text-ink-muted transition-colors hover:text-primary-strong"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/education/"
                  className="text-sm font-medium text-ink-muted transition-colors hover:text-primary-strong"
                >
                  Education
                </Link>
              </li>
              <li>
                <Link
                  href="/certifications/"
                  className="text-sm font-medium text-ink-muted transition-colors hover:text-primary-strong"
                >
                  Certifications
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Source code links">
            <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-ink">Source code</h2>
            <ul className="mt-4 grid gap-2.5">
              <li>
                <a
                  href={EXTERNAL_LINKS.githubProfile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted transition-colors hover:text-primary-strong"
                >
                  <GitHubIcon className="h-3.5 w-3.5" />
                  GitHub profile
                  <span className="sr-only">(opens in new tab)</span>
                </a>
              </li>
              {projects.map((project) => (
                <li key={project.slug}>
                  <a
                    href={project.repositoryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-ink-muted transition-colors hover:text-primary-strong"
                  >
                    {project.title}
                    <span className="sr-only"> repository (opens in new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-ink">Contact</h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">
              Email is the only direct contact channel.
            </p>
            <a
              href={`mailto:${EXTERNAL_LINKS.email}`}
              className="mt-3 inline-flex min-h-11 items-center rounded-full border border-primary/25 bg-primary-soft px-4 py-2.5 text-sm font-semibold text-primary-strong transition-colors hover:bg-primary-soft/70"
            >
              {EXTERNAL_LINKS.email}
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {SITE.year} Etalyah Simpson. Portfolio content is authored work; project facts are
            cited to their public repositories.
          </p>
          <p className="font-medium tracking-[0.02em]">
            Built with Next.js, TypeScript, and Tailwind CSS.
          </p>
        </div>
      </Container>
    </footer>
  );
}
