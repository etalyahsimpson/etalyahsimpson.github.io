import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/layout/container";
import { buildRouteMetadata } from "@/lib/metadata";
import { profile } from "@/content/profile";
import { aboutPortrait } from "@/content/profile-media";
import { experience } from "@/content/experience";
import { education } from "@/content/education";
import { EXTERNAL_LINKS } from "@/content/site";
import { GmailIcon } from "@/components/layout/es-mark";
import { TechnologyBadge } from "@/components/ui/technology-badge";

export const metadata: Metadata = buildRouteMetadata({
  title: "About",
  description:
    "I'm a full-stack and AI engineer in Philadelphia, PA with 4+ years of experience across product engineering, machine learning systems, and evidence-based AI evaluation, and I'm now pursuing a PhD in Machine Learning and AI at Carnegie Mellon University.",
  path: "/about/",
  image: "/previews/etalyah-portfolio.png",
  type: "profile",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Full-stack engineering, ML systems, and evaluation you can verify"
        description="I combine product engineering with machine learning and treat AI evaluation as a first-class engineering discipline: reproducible tests, honest metrics, and evidence before claims."
        breadcrumbs={[{ label: "About" }]}
      />

      <Container className="copy-deter py-14 sm:py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <div className="relative mx-auto max-w-[360px]">
              <div
                aria-hidden="true"
                className="absolute -left-4 -top-4 h-20 w-20 rounded-2xl border-2 border-primary/15"
              />
              <div className="relative rounded-[1.4rem] border border-line bg-surface p-2.5 shadow-card">
                <div className="overflow-hidden rounded-[1.05rem]">
                  <Image
                    src={aboutPortrait.src}
                    alt={aboutPortrait.alt}
                    width={aboutPortrait.width}
                    height={aboutPortrait.height}
                    loading="lazy"
                    draggable={false}
                    sizes="(min-width: 1024px) 380px, 88vw"
                    className="aspect-[3/4] w-full object-cover object-[center_28%]"
                  />
                </div>
              </div>
            </div>
            <div className="mx-auto mt-8 max-w-[360px] rounded-2xl border border-line bg-surface p-5 shadow-card">
              <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-ink-muted">
                Quick facts
              </h2>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="font-semibold text-ink-muted">Location</dt>
                  <dd className="text-right font-semibold text-ink">{profile.location}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="font-semibold text-ink-muted">Experience</dt>
                  <dd className="text-right font-semibold text-ink">4+ years professional</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="font-semibold text-ink-muted">Currently</dt>
                  <dd className="text-right font-semibold text-ink">
                    PhD student, Machine Learning / AI, CMU
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="font-semibold text-ink-muted">Contact</dt>
                  <dd className="text-right">
                    <a
                      href={EXTERNAL_LINKS.gmailCompose}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-semibold text-primary-strong underline decoration-primary/30 underline-offset-4 hover:decoration-primary"
                      aria-label="Email me in Gmail (opens in new tab)"
                    >
                      <GmailIcon className="h-3.5 w-3.5" />
                      Gmail
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div>
            <div className="space-y-4 text-[1.0625rem] leading-[1.78] text-ink-muted">
              {profile.aboutParagraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-10">
              <h2 className="text-lg font-extrabold tracking-[-0.01em] text-ink">
                What I bring to a team
              </h2>
              <ul className="mt-4 grid gap-3">
                {profile.focusAreas.map((area) => (
                  <li
                    key={area.title}
                    className="rounded-2xl border border-line bg-surface p-5 shadow-card"
                  >
                    <p className="text-[0.9375rem] font-extrabold text-primary-strong">
                      {area.title}
                    </p>
                    <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-muted">
                      {area.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10">
              <h2 className="text-lg font-extrabold tracking-[-0.01em] text-ink">
                Professional timeline
              </h2>
              <ol className="mt-4 space-y-3">
                {experience.map((role) => (
                  <li
                    key={`${role.company}-${role.title}`}
                    className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 rounded-xl border border-line bg-page/70 px-4 py-3"
                  >
                    <p className="text-sm font-bold text-ink">
                      {role.title} · {role.company}
                    </p>
                    <p className="text-[0.8125rem] font-semibold text-ink-muted">
                      {role.startDate} – {role.endDate}
                    </p>
                  </li>
                ))}
                {education
                  .filter((e) => e.ongoing)
                  .map((entry) => (
                    <li
                      key={entry.credential}
                      className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 rounded-xl border border-primary/20 bg-primary-soft/50 px-4 py-3"
                    >
                      <p className="text-sm font-bold text-ink">
                        {entry.credential} · {entry.institution}
                      </p>
                      <p className="text-[0.8125rem] font-semibold text-ink-muted">
                        {entry.startDate} – {entry.endDate}
                      </p>
                    </li>
                  ))}
              </ol>
            </div>

            <div className="mt-10">
              <h2 className="text-lg font-extrabold tracking-[-0.01em] text-ink">
                Technical focus in brief
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technical focus areas">
                {[
                  "Next.js & React",
                  "TypeScript",
                  "FastAPI & Node.js",
                  "PostgreSQL & Redis",
                  "PyTorch",
                  "LangChain & RAG",
                  "MCP agents",
                  "Promptfoo & DeepEval",
                  "Ragas",
                  "LangSmith",
                  "MLflow",
                  "GitHub Actions",
                ].map((item) => (
                  <li key={item}>
                    <TechnologyBadge name={item} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
