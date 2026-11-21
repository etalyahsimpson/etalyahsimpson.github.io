import Link from "next/link";
import { skillGroups } from "@/content/skills";
import { SectionHeading } from "@/components/ui/section-heading";
import { TechnologyBadge } from "@/components/ui/technology-badge";

/** Homepage expertise preview: scannable groups organized by purpose. */
export function SkillsSection() {
  const homeGroups = skillGroups.filter((g) => g.homecard);
  return (
    <section id="expertise" aria-labelledby="expertise-heading" className="scroll-mt-24">
      <div className="mx-auto w-full max-w-[1180px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Expertise"
            title="Skills grouped by engineering purpose"
            description="Capabilities drawn from professional work across product engineering, machine learning, and AI evaluation. Detailed groups with context live on the expertise page."
            id="expertise-heading"
          />
          <Link
            href="/skills/"
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-semibold text-ink-muted transition-colors hover:border-primary/40 hover:text-primary-strong"
          >
            All expertise
            <svg viewBox="0 0 16 16" aria-hidden="true" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {homeGroups.map((group) => (
            <div
              key={group.id}
              className="card-lift rounded-2xl border border-line bg-surface p-6 shadow-card"
            >
              <h3 className="text-base font-extrabold tracking-[-0.01em] text-ink">
                {group.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{group.context}</p>
              <ul
                className="mt-4 flex flex-wrap gap-1.5"
                aria-label={`${group.title} highlight skills`}
              >
                {group.skills.slice(0, 5).map((skill) => (
                  <li key={skill}>
                    <TechnologyBadge name={skill} />
                  </li>
                ))}
                {group.skills.length > 5 ? (
                  <li className="inline-flex items-center px-1 text-[0.78rem] font-semibold text-ink-muted">
                    +{group.skills.length - 5}
                  </li>
                ) : null}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
