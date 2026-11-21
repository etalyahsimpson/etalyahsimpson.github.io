import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/layout/container";
import { buildRouteMetadata } from "@/lib/metadata";
import { skillGroups } from "@/content/skills";
import { TechnologyBadge } from "@/components/ui/technology-badge";

export const metadata: Metadata = buildRouteMetadata({
  title: "Expertise & Skills",
  description:
    "Etalyah Simpson's engineering skills grouped by purpose: languages, frontend, backend and APIs, AI and machine learning, AI evaluation, agentic development, testing, infrastructure, and CRM integrations.",
  path: "/skills/",
  image: "/previews/etalyah-portfolio.png",
});

export default function SkillsPage() {
  return (
    <>
      <PageHero
        eyebrow="Expertise"
        title="Skills grouped by engineering purpose"
        description="These are CV-level capabilities built through professional work: not a wall of badges, but the tools I use to ship product features, train and serve models, and evaluate AI systems with reproducible evidence."
        breadcrumbs={[{ label: "Expertise" }]}
      />

      <Container className="copy-deter py-14 sm:py-16 lg:py-20">
        <div className="grid gap-5 md:grid-cols-2">
          {skillGroups.map((group) => (
            <section
              key={group.id}
              className="card-lift rounded-3xl border border-line bg-surface p-6 shadow-card sm:p-7"
              aria-labelledby={`skills-${group.id}`}
            >
              <h2
                id={`skills-${group.id}`}
                className="text-lg font-extrabold tracking-[-0.015em] text-ink"
              >
                {group.title}
              </h2>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-muted">
                {group.context}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${group.title} skills`}>
                {group.skills.map((skill) => (
                  <li key={skill}>
                    <TechnologyBadge name={skill} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-line bg-surface-muted/60 p-6 sm:p-8">
          <h2 className="text-base font-extrabold text-ink">How to read this page</h2>
          <p className="mt-3 max-w-3xl text-[0.9375rem] leading-relaxed text-ink-muted">
            These groups describe capabilities from professional experience and formal study.
            Project pages on this site list technologies independently, verified directly from
            each public repository's implementation, so a tool appearing here does not imply it
            appears in every project.
          </p>
        </div>
      </Container>
    </>
  );
}
