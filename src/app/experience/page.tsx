import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/layout/container";
import { buildRouteMetadata } from "@/lib/metadata";
import { experience } from "@/content/experience";
import { TechnologyBadge } from "@/components/ui/technology-badge";

export const metadata: Metadata = buildRouteMetadata({
  title: "Work Experience",
  description:
    "Etalyah Simpson's professional experience: Full-Stack / AI Engineer at 9series Inc, Machine Learning Engineer at Altana AI, Full-Stack Developer at InductEV and Hertz, with exact titles, dates, and arrangements.",
  path: "/experience/",
  image: "/previews/etalyah-experience.png",
});

export default function ExperiencePage() {
  return (
    <>
      <PageHero
        eyebrow="Experience"
        title="Four roles, exact titles, honest scope"
        description="A chronology of professional work across AI engineering, machine learning, and full-stack development. Expand any role for the responsibilities and technologies it actually involved."
        breadcrumbs={[{ label: "Experience" }]}
      />

      <Container className="py-14 sm:py-16 lg:py-20">
        <ol className="relative space-y-5 before:absolute before:bottom-8 before:left-[9px] before:top-8 before:w-px before:bg-line sm:before:left-[11px]">
          {experience.map((role) => (
            <li key={`${role.company}-${role.title}`} className="relative pl-8 sm:pl-12">
              <span
                aria-hidden="true"
                className={`absolute left-0 top-4 flex h-[19px] w-[19px] items-center justify-center rounded-full border-2 sm:h-[23px] sm:w-[23px] ${
                  role.current ? "border-primary bg-primary-soft" : "border-line bg-surface"
                }`}
              >
                <span
                  className={`rounded-full ${
                    role.current ? "h-[7px] w-[7px] bg-primary" : ""
                  }`}
                />
              </span>

              <details className="role-details card-lift group rounded-3xl border border-line bg-surface p-6 shadow-card open:shadow-card-hover sm:p-7">
                <summary className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
                  <span>
                    <span className="flex flex-wrap items-center gap-2.5">
                      <span className="text-[1.125rem] font-extrabold tracking-[-0.015em] text-ink">
                        {role.title}
                      </span>
                      {role.current ? (
                        <span className="rounded-full bg-primary-soft px-2.5 py-0.5 text-[0.625rem] font-bold uppercase tracking-[0.12em] text-primary-strong">
                          Current
                        </span>
                      ) : null}
                    </span>
                    <span className="mt-1 block text-sm font-semibold text-primary-strong">
                      {role.company} · {role.location} · {role.arrangement}
                    </span>
                  </span>
                  <span className="flex items-center gap-3">
                    <span className="text-[0.8125rem] font-bold uppercase tracking-[0.08em] text-ink-muted">
                      {role.startDate} – {role.endDate}
                    </span>
                    <svg
                      viewBox="0 0 16 16"
                      aria-hidden="true"
                      className="chevron h-4 w-4 text-ink-muted"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 6l4 4 4-4" />
                    </svg>
                  </span>
                </summary>

                <div className="mt-5 border-t border-line pt-5">
                  <p className="text-[0.9375rem] font-semibold leading-relaxed text-ink">
                    {role.summary}
                  </p>
                  <ul className="mt-4 space-y-2.5">
                    {role.highlights.map((highlight) => (
                      <li key={highlight.slice(0, 28)} className="flex gap-3">
                        <span
                          aria-hidden="true"
                          className="mt-[0.55rem] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70"
                        />
                        <span className="text-[0.9375rem] leading-relaxed text-ink-muted">
                          {highlight}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={`${role.company} technologies`}>
                    {role.tags.map((tag) => (
                      <li key={tag}>
                        <TechnologyBadge name={tag} />
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            </li>
          ))}
        </ol>

        <p className="mt-8 text-sm text-ink-muted">
          Titles, employers, arrangements, and dates above reflect the owner's current CV
          exactly. Confidential work is summarized at the level its confidentiality permits.
        </p>
      </Container>
    </>
  );
}
