import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/page-hero";
import { Container } from "@/components/layout/container";
import { buildRouteMetadata } from "@/lib/metadata";
import { projects, getProject, getRelatedProjects } from "@/content/projects";
import { CopyLinkButton } from "@/components/projects/copy-link";
import { GitHubIcon } from "@/components/layout/es-mark";
import { StatusPill } from "@/components/ui/chip";
import { TechnologyBadge } from "@/components/ui/technology-badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { projectUrl } from "@/lib/urls";
import { cn } from "@/lib/utils";

/** Real static deep links: pages are generated at build time from the registry. */
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) {
    return { title: "Project not found" };
  }
  return buildRouteMetadata({
    title: `${project.title}: ${project.subtitle}`,
    description: project.seoDescription,
    path: `/projects/${project.slug}/`,
    image: project.socialImage,
  });
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const related = getRelatedProjects(project.slug);
  const canonical = projectUrl(project.slug);
  const isTallOverview = project.overview.height / project.overview.width > 1.1;

  return (
    <>
      <div className="relative overflow-hidden border-b border-line bg-section">
        <div
          aria-hidden="true"
          className="ambient-glow pointer-events-none absolute -right-32 -top-32 h-[26rem] w-[26rem]"
        />
        <Container className="copy-deter relative py-10 sm:py-14">
          <Breadcrumbs
            items={[{ label: "Projects", href: "/projects/" }, { label: project.title }]}
          />
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <StatusPill label={project.statusLabel} tone="published" />
            <p className="text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-ink-muted">
              {project.industry}
            </p>
          </div>
          <h1 className="mt-3 text-balance text-[clamp(2.1rem,4.6vw,3.6rem)] font-extrabold leading-[1.06] tracking-[-0.025em] text-ink">
            {project.title}
          </h1>
          <p className="mt-3 max-w-2xl text-[1.0625rem] font-semibold leading-relaxed text-primary-strong">
            {project.subtitle}
          </p>
          <p className="mt-4 max-w-3xl text-[1.0325rem] leading-[1.7] text-ink-muted">
            {project.oneLineProblem}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href={project.repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-on-primary transition-colors hover:bg-primary-strong"
              aria-label={`View the ${project.title} GitHub repository (opens in new tab)`}
            >
              <GitHubIcon />
              View repository
            </a>
            <CopyLinkButton
              url={canonical}
              label={`Copy the link to the ${project.title} case study`}
            />
          </div>
        </Container>
      </div>

      <Container className="copy-deter py-12 sm:py-14 lg:py-16">
        {/* Authentic branded banner: the project's own identity panel */}
        <figure>
          <div className="overflow-hidden rounded-[1.35rem] border border-line bg-surface-soft p-3 shadow-card">
            <div className="overflow-hidden rounded-2xl">
              <Image
                src={project.banner.src}
                alt={project.banner.alt}
                width={project.banner.width}
                height={project.banner.height}
                loading="lazy"
                draggable={false}
                sizes="(min-width: 1180px) 1116px, 92vw"
                style={{ aspectRatio: `${project.banner.width} / ${project.banner.height}` }}
                className="w-full object-cover"
              />
            </div>
          </div>
          <figcaption className="mt-3 text-center text-[0.8125rem] text-ink-muted">
            {project.title} branded banner supplied with the project.
          </figcaption>
        </figure>

        {/* Authentic software overview: the real running application */}
        <section aria-labelledby="overview-heading" className="mt-12">
          <SectionHeading
            eyebrow="Application interface"
            title="Product overview"
            description={`A genuine screenshot of the running ${project.title} application, captured from the source repository.`}
            id="overview-heading"
          />
          <figure
            className={cn(
              "mt-8",
              isTallOverview && "mx-auto w-full max-w-[880px]",
            )}
          >
            <div className="overflow-hidden rounded-[1.35rem] border border-line bg-surface-soft p-3 shadow-card">
              <div className="overflow-hidden rounded-2xl border border-line/60 bg-surface-raised">
                <div
                  aria-hidden="true"
                  className="flex items-center gap-1.5 border-b border-line/60 bg-surface-raised px-3.5 py-2"
                >
                  <span className="h-2 w-2 rounded-full bg-primary/60" />
                  <span className="h-2 w-2 rounded-full bg-border" />
                  <span className="h-2 w-2 rounded-full bg-border" />
                  <span className="ml-2.5 text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-ink-muted/80">
                    {project.title} · application screenshot
                  </span>
                </div>
                <Image
                  src={project.overview.src}
                  alt={project.overview.alt}
                  width={project.overview.width}
                  height={project.overview.height}
                  loading="lazy"
                  draggable={false}
                  sizes="(min-width: 1180px) 1116px, 92vw"
                  className={cn(
                    "w-full object-contain",
                    isTallOverview ? "bg-surface-raised" : "object-top",
                  )}
                />
              </div>
            </div>
            <figcaption className="mt-3 text-center text-[0.8125rem] text-ink-muted">
              {project.overview.caption}
            </figcaption>
          </figure>
        </section>

        {/* Problem and solution */}
        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-12">
          <section aria-labelledby="problem-heading">
            <h2 id="problem-heading" className="eyebrow">
              The problem
            </h2>
            <div className="mt-4 space-y-4 text-[1.0325rem] leading-[1.75] text-ink-muted">
              {project.problem.map((paragraph) => (
                <p key={paragraph.slice(0, 28)}>{paragraph}</p>
              ))}
            </div>
          </section>
          <section aria-labelledby="solution-heading">
            <h2 id="solution-heading" className="eyebrow">
              The solution
            </h2>
            <div className="mt-4 space-y-4 text-[1.0325rem] leading-[1.75] text-ink-muted">
              {project.solution.map((paragraph) => (
                <p key={paragraph.slice(0, 28)}>{paragraph}</p>
              ))}
            </div>
          </section>
        </div>

        {/* Architecture */}
        <section aria-labelledby="architecture-heading" className="mt-14">
          <div className="rounded-[1.35rem] border border-primary/25 bg-primary-soft/60 p-6 sm:p-8">
            <h2 id="architecture-heading" className="eyebrow">
              Architecture
            </h2>
            <p className="mt-4 max-w-4xl text-[1.0325rem] leading-[1.75] text-ink">
              {project.architectureSummary}
            </p>
          </div>
        </section>

        {/* Implemented features */}
        <section aria-labelledby="features-heading" className="mt-14">
          <SectionHeading
            eyebrow="Implemented features"
            title="What is actually built"
            description="Verified against the repository implementation. Nothing on this list is aspirational."
            id="features-heading"
          />
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {project.features.map((feature) => (
              <li
                key={feature.slice(0, 30)}
                className="flex gap-3.5 rounded-2xl border border-line bg-surface p-5 shadow-card"
              >
                <span
                  aria-hidden="true"
                  className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-success/12"
                >
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="var(--success)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 8.5l3.5 3.5L13 5" />
                  </svg>
                </span>
                <span className="text-[0.9375rem] leading-relaxed text-ink">{feature}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Additional genuine screenshots from the repository */}
        {project.screenshots.length > 0 ? (
          <section aria-labelledby="screenshots-heading" className="mt-14">
            <SectionHeading
              eyebrow="More product views"
              title="Further screenshots from the running application"
              description="Captured from the real, running product in the source repository."
              id="screenshots-heading"
            />
            <div className="mt-8 grid gap-8">
              {project.screenshots.map((shot) => (
                <figure key={shot.src} className="overflow-hidden rounded-[1.35rem] border border-line bg-surface-soft p-3 shadow-card">
                  <div className="overflow-hidden rounded-2xl">
                    <Image
                      src={shot.src}
                      alt={shot.alt}
                      width={shot.width}
                      height={shot.height}
                      loading="lazy"
                      draggable={false}
                      sizes="(min-width: 1180px) 1116px, 92vw"
                      className="w-full object-cover object-top"
                    />
                  </div>
                  <figcaption className="px-2 pb-1 pt-3 text-[0.8125rem] text-ink-muted">
                    {shot.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        ) : null}

        {/* Verified metrics */}
        <section aria-labelledby="results-heading" className="mt-14">
          <SectionHeading
            eyebrow="Verification"
            title="Measured results, not claims"
            description={project.verificationNote}
            id="results-heading"
          />
          <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {project.metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-2xl border border-line bg-surface p-5 shadow-card"
              >
                <dt className="text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-ink-muted">
                  {metric.label}
                </dt>
                <dd className="mt-2 text-2xl font-extrabold tracking-[-0.02em] text-primary-strong">
                  {metric.value}
                </dd>
                <dd className="mt-2 text-[0.8125rem] leading-relaxed text-ink-muted">
                  {metric.note}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Tech stack */}
        <section aria-labelledby="stack-heading" className="mt-14">
          <SectionHeading
            eyebrow="Stack"
            title="Technologies in the implementation"
            description="Each badge was verified present in the repository source before publishing."
            id="stack-heading"
          />
          <ul className="mt-7 flex flex-wrap gap-2" aria-label={`${project.title} technology stack`}>
            {project.implementedTechnologies.map((tech) => (
              <li key={tech}>
                <TechnologyBadge name={tech} />
              </li>
            ))}
          </ul>
        </section>

        {/* Evidence links */}
        <section aria-labelledby="evidence-heading" className="mt-14">
          <div className="rounded-[1.35rem] border border-line bg-surface p-6 shadow-card sm:p-8">
            <h2 id="evidence-heading" className="eyebrow">
              Evidence
            </h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {project.evidence.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-11 items-center justify-between gap-3 rounded-2xl border border-line bg-page/70 px-4 py-3 text-[0.9375rem] font-semibold text-ink transition-colors hover:border-primary/40 hover:text-primary-strong"
                  >
                    {item.label}
                    <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.1em] text-ink-muted">
                      GitHub
                      <svg viewBox="0 0 16 16" aria-hidden="true" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 3h7v7M13 3L7 9" />
                        <path d="M11 9v4H3V5h4" />
                      </svg>
                    </span>
                    <span className="sr-only">(opens in new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Related projects */}
        {related.length > 0 ? (
          <section aria-labelledby="related-heading" className="mt-14">
            <h2 id="related-heading" className="eyebrow">
              Continue exploring
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {related.map((other) => (
                <Link
                  key={other.slug}
                  href={`/projects/${other.slug}/`}
                  className="card-lift flex items-center justify-between gap-4 rounded-2xl border border-line bg-surface p-5 shadow-card"
                >
                  <span>
                    <span className="block text-[1.0625rem] font-extrabold tracking-[-0.01em] text-ink">
                      {other.title}
                    </span>
                    <span className="mt-1 block text-sm font-semibold text-primary-strong">
                      {other.subtitle}
                    </span>
                  </span>
                  <svg viewBox="0 0 16 16" aria-hidden="true" className="h-4 w-4 shrink-0 text-primary" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </Container>
    </>
  );
}
