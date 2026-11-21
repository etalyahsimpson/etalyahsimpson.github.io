import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/layout/container";
import { buildRouteMetadata } from "@/lib/metadata";
import { education } from "@/content/education";

export const metadata: Metadata = buildRouteMetadata({
  title: "Education",
  description:
    "My education: PhD student in Machine Learning and AI at Carnegie Mellon University (ongoing, research focus deep learning), MS in Software Engineering from Drexel University, BS from Temple University, AS from Community College of Philadelphia.",
  path: "/education/",
  image: "/previews/etalyah-portfolio.png",
});

export default function EducationPage() {
  return (
    <>
      <PageHero
        eyebrow="Education"
        title="Formal education, from Philadelphia to Pittsburgh"
        description="My academic path through computer science and software engineering, now continuing as my doctoral research in machine learning."
        breadcrumbs={[{ label: "Education" }]}
      />

      <Container className="copy-deter py-14 sm:py-16 lg:py-20">
        <ol className="relative space-y-5 before:absolute before:bottom-8 before:left-[9px] before:top-8 before:w-px before:bg-line sm:before:left-[11px]">
          {education.map((entry) => (
            <li key={entry.credential} className="relative pl-8 sm:pl-12">
              <span
                aria-hidden="true"
                className={`absolute left-0 top-5 flex h-[19px] w-[19px] items-center justify-center rounded-full border-2 sm:h-[23px] sm:w-[23px] ${
                  entry.ongoing ? "border-primary bg-primary-soft" : "border-line bg-surface"
                }`}
              >
                <span
                  className={`rounded-full ${entry.ongoing ? "h-[7px] w-[7px] bg-primary" : ""}`}
                />
              </span>
              <div
                className={`card-lift rounded-3xl border p-6 shadow-card sm:p-7 ${
                  entry.ongoing
                    ? "border-primary/25 bg-primary-soft/40"
                    : "border-line bg-surface"
                }`}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h2 className="text-[1.125rem] font-extrabold tracking-[-0.015em] text-ink">
                    {entry.credential}
                    {entry.ongoing ? (
                      <span className="ml-2.5 rounded-full bg-primary-soft px-2.5 py-0.5 align-middle text-[0.625rem] font-bold uppercase tracking-[0.12em] text-primary-strong">
                        Ongoing study
                      </span>
                    ) : null}
                  </h2>
                  <p className="text-[0.8125rem] font-bold uppercase tracking-[0.08em] text-ink-muted">
                    {entry.startDate} – {entry.endDate}
                  </p>
                </div>
                <p className="mt-1.5 text-sm font-semibold text-primary-strong">
                  {entry.institution}
                </p>
                <p className="mt-1 text-sm text-ink-muted">{entry.field}</p>
                {entry.note ? (
                  <p className="mt-3 rounded-xl bg-surface-muted/70 px-4 py-3 text-[0.8125rem] leading-relaxed text-ink-muted">
                    {entry.note}
                  </p>
                ) : null}
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-8 text-sm text-ink-muted">
          My doctoral program is ongoing; I claim no degree before it is awarded.
        </p>
      </Container>
    </>
  );
}
