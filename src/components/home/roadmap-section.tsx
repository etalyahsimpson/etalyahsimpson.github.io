import { roadmapInitiatives } from "@/content/roadmap";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatusPill } from "@/components/ui/chip";

/**
 * Homepage roadmap: three planned long-form initiatives. Visually calmer than
 * the featured projects, information-only, with no repository links.
 */
export function RoadmapSection() {
  return (
    <section id="roadmap" aria-labelledby="roadmap-heading" className="scroll-mt-24 bg-surface-muted/60">
      <div className="mx-auto w-full max-w-[1180px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <SectionHeading
          eyebrow="Currently building · Coming soon"
          title="Larger initiatives on the planning board"
          description="Beyond the three inspectable repositories above, these are independent long-form engineering initiatives at the planning stage. They are concept work, not shipped systems."
          id="roadmap-heading"
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {roadmapInitiatives.map((initiative) => (
            <article
              key={initiative.id}
              className="rounded-2xl border border-dashed border-primary/25 bg-surface/80 p-6"
            >
              <div className="flex items-center justify-between gap-3">
                <StatusPill label="Planned" tone="planned" />
              </div>
              <h3 className="mt-4 text-lg font-extrabold tracking-[-0.015em] text-ink">
                {initiative.title}
              </h3>
              <p className="mt-1 text-sm font-semibold text-primary-strong">{initiative.subtitle}</p>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-muted">
                {initiative.focus}
              </p>
              <p className="mt-4 border-t border-line pt-3 text-xs font-medium text-ink-muted">
                {initiative.planningHorizon}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
