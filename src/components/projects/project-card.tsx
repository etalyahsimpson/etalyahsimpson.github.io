import Image from "next/image";
import Link from "next/link";
import type { PortfolioProject } from "@/content/projects";
import { StatusPill } from "@/components/ui/chip";
import { TechnologyBadge } from "@/components/ui/technology-badge";
import { GitHubIcon } from "@/components/layout/es-mark";
import { cn } from "@/lib/utils";

/**
 * Featured project card built from the project's AUTHENTIC visual evidence:
 * a narrow branded banner strip above a framed, real software overview
 * screenshot (a deliberately composed viewport of the running application,
 * never a repainted mock), followed by title, concise value copy, verified
 * technology badges, and separated case-study/repository actions.
 *
 * Click targets stay deliberately separated:
 * - the media stack, title, and "Explore case study" open the INTERNAL
 *   static case-study route;
 * - the GitHub badge opens the EXTERNAL repository in a new tab.
 * No anchors are nested inside other interactive elements.
 */
export function ProjectCard({
  project,
  className,
}: {
  project: PortfolioProject;
  className?: string;
}) {
  const extraTech = project.implementedTechnologies.length - 6;
  const overviewAspect =
    project.overview.width / project.overview.height >= 1.2
      ? `${project.overview.width} / ${project.overview.height}`
      : "16 / 10"; // tall screenshots get a composed top-anchored viewport

  return (
    <article
      className={cn(
        "card-lift group flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-line bg-surface shadow-card",
        className,
      )}
    >
      <Link
        href={`/projects/${project.slug}/`}
        aria-label={`View ${project.title} case study`}
        className="block focus-visible:outline-none"
      >
        {/* Authentic branded banner strip at its natural proportions */}
        <div className="border-b border-line/70 bg-surface-soft p-3 pb-0">
          <div className="overflow-hidden rounded-t-xl">
            <Image
              src={project.banner.src}
              alt={project.banner.alt}
              width={project.banner.width}
              height={project.banner.height}
              loading="lazy"
              draggable={false}
              sizes="(min-width: 1024px) 372px, (min-width: 640px) 88vw, 92vw"
              style={{ aspectRatio: `${project.banner.width} / ${project.banner.height}` }}
              className="w-full object-cover"
            />
          </div>
        </div>

        {/* Authentic software overview inside an application-preview frame */}
        <div className="bg-surface-soft p-3">
          <div className="overflow-hidden rounded-xl border border-line/60 bg-surface-raised shadow-card">
            <div
              aria-hidden="true"
              className="flex items-center gap-1.5 border-b border-line/60 bg-surface-raised px-3 py-1.5"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
              <span className="h-1.5 w-1.5 rounded-full bg-border" />
              <span className="h-1.5 w-1.5 rounded-full bg-border" />
              <span className="ml-2 text-[0.5625rem] font-semibold uppercase tracking-[0.16em] text-ink-muted/80">
                Application preview
              </span>
            </div>
            <div className="relative">
              <Image
                src={project.overview.src}
                alt={project.overview.alt}
                width={project.overview.width}
                height={project.overview.height}
                loading="lazy"
                draggable={false}
                sizes="(min-width: 1024px) 372px, (min-width: 640px) 88vw, 92vw"
                style={{ aspectRatio: overviewAspect }}
                className="w-full object-cover object-top"
              />
              <div className="absolute left-2.5 top-2.5">
                <StatusPill label={project.statusLabel} tone="published" />
              </div>
            </div>
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-6 pt-5">
        <p className="text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-ink-muted">
          {project.industry}
        </p>
        <h3 className="mt-2 text-[1.375rem] font-extrabold tracking-[-0.015em] text-ink">
          <Link
            href={`/projects/${project.slug}/`}
            className="transition-colors hover:text-primary-strong"
          >
            {project.title}
          </Link>
        </h3>
        <p className="mt-1 text-sm font-semibold text-primary-strong">{project.subtitle}</p>
        <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-ink-muted">
          {project.cardSummary}
        </p>

        <ul
          className="mt-5 flex flex-wrap gap-1.5"
          aria-label={`${project.title} technologies`}
        >
          {project.implementedTechnologies.slice(0, 6).map((tech) => (
            <li key={tech}>
              <TechnologyBadge name={tech} />
            </li>
          ))}
          {extraTech > 0 ? (
            <li className="inline-flex items-center rounded-[0.7rem] border border-primary/20 bg-primary-soft/70 px-2.5 py-[0.38rem] text-[0.78rem] font-semibold leading-none text-primary-strong">
              +{extraTech} in repo
            </li>
          ) : null}
        </ul>

        <div className="mt-6 flex items-center justify-between gap-3 border-t border-line pt-5">
          <Link
            href={`/projects/${project.slug}/`}
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary-soft px-4 py-2.5 text-sm font-bold text-primary-strong transition-colors hover:bg-primary-soft/70"
            aria-label={`Explore ${project.title} case study`}
          >
            Explore case study
            <svg
              viewBox="0 0 16 16"
              aria-hidden="true"
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>

          <a
            href={project.repositoryUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.title} GitHub repository (opens in new tab)`}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-4 py-2.5 text-sm font-semibold text-ink-muted transition-colors hover:border-primary/40 hover:text-primary-strong"
          >
            <GitHubIcon />
            Repository
          </a>
        </div>
      </div>
    </article>
  );
}
