import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/layout/container";
import { buildRouteMetadata } from "@/lib/metadata";
import { featuredProjects } from "@/content/projects";
import { ProjectCard } from "@/components/projects/project-card";
import { EXTERNAL_LINKS } from "@/content/site";
import { GitHubIcon } from "@/components/layout/es-mark";

export const metadata: Metadata = buildRouteMetadata({
  title: "Projects",
  description:
    "Selected engineering projects by Etalyah Simpson: PolicyGuard AI (AI response evaluation workbench), VendorLens AI (supplier entity resolution), and BECBarrier (BEC investigation and payment-change safeguarding), each with a public repository and case study.",
  path: "/projects/",
  image: "/previews/etalyah-home.png",
});

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Engineering work you can inspect"
        description="Three independently built systems, each a public GitHub repository with source, tests, and CI, plus a case study on this site explaining the problem, the architecture, and the verified results."
        breadcrumbs={[{ label: "Projects" }]}
      >
        <div className="mt-6">
          <a
            href={EXTERNAL_LINKS.githubProfile}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-primary/40 hover:text-primary-strong"
            aria-label="Explore the GitHub profile for full source access (opens in new tab)"
          >
            <GitHubIcon />
            Explore GitHub profile
          </a>
        </div>
      </PageHero>

      <Container className="py-14 sm:py-16 lg:py-20">
        <div className="grid gap-6 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-line bg-surface-muted/60 p-6 sm:p-8">
          <h2 className="text-base font-extrabold text-ink">Evidence policy</h2>
          <p className="mt-3 max-w-3xl text-[0.9375rem] leading-relaxed text-ink-muted">
            Every technology badge on this site was verified against the implementation in the
            linked repository before publishing. Metrics come from each repository's committed
            case study and CI runs. All three projects run locally from their repositories and
            have no public deployment, commercial users, or customer data.
          </p>
        </div>
      </Container>
    </>
  );
}
