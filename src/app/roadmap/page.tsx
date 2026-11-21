import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/layout/container";
import { buildRouteMetadata } from "@/lib/metadata";
import { roadmapInitiatives } from "@/content/roadmap";
import { StatusPill } from "@/components/ui/chip";

export const metadata: Metadata = buildRouteMetadata({
  title: "Roadmap: Planned Initiatives",
  description:
    "My planned long-form engineering initiatives: EnterpriseOps AI (secure enterprise knowledge and agent workflows), SupplyChain Intelligence (supplier risk and ML operations), and OpsFlow Enterprise (real-time business operations).",
  path: "/roadmap/",
  image: "/previews/etalyah-portfolio.png",
});

export default function RoadmapPage() {
  return (
    <>
      <PageHero
        eyebrow="Currently building · Coming soon"
        title="Long-form initiatives at the planning stage"
        description="I'm planning three initiatives larger than my three published repositories. They are grounded concept work with clear engineering objectives: planned, not shipped, with no fabricated timelines or repository links."
        breadcrumbs={[{ label: "Roadmap" }]}
      />

      <Container className="copy-deter py-14 sm:py-16 lg:py-20">
        <div className="grid gap-6 lg:grid-cols-3">
          {roadmapInitiatives.map((initiative) => (
            <article
              key={initiative.id}
              className="flex flex-col rounded-3xl border border-dashed border-primary/25 bg-surface p-6 shadow-card sm:p-7"
            >
              <StatusPill label="Planned" tone="planned" />
              <h2 className="mt-4 text-xl font-extrabold tracking-[-0.015em] text-ink">
                {initiative.title}
              </h2>
              <p className="mt-1 text-sm font-semibold text-primary-strong">
                {initiative.subtitle}
              </p>
              <p className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-ink-muted">
                {initiative.focus}
              </p>
              <ul className="mt-5 space-y-2.5 border-t border-line pt-5">
                {initiative.depth.map((point) => (
                  <li key={point.slice(0, 30)} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-[0.55rem] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70"
                    />
                    <span className="text-[0.875rem] leading-relaxed text-ink-muted">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-xs font-medium text-ink-muted">
                {initiative.planningHorizon}
              </p>
              <p className="mt-3 rounded-xl bg-surface-muted/70 px-4 py-3 text-[0.8125rem] leading-relaxed text-ink-muted">
                {initiative.differentiatesFrom}
              </p>
            </article>
          ))}
        </div>

        <p className="mt-10 max-w-3xl text-sm leading-relaxed text-ink-muted">
          The approximately 18-week horizon is my prospective planning estimate for each
          initiative, not a promised release date. As each initiative begins producing real
          repositories, its card will graduate to the published projects section with verified
          evidence, exactly like PolicyGuard AI, VendorLens AI, and BECBarrier.
        </p>
      </Container>
    </>
  );
}
