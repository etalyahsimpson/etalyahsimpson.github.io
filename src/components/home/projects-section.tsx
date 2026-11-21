import { featuredProjects } from "@/content/projects";
import { ProjectCard } from "@/components/projects/project-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { GitHubIcon } from "@/components/layout/es-mark";
import { EXTERNAL_LINKS } from "@/content/site";

/** Homepage featured projects: the three verified public repositories. */
export function ProjectsSection() {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="scroll-mt-24 bg-section">
      <div className="mx-auto w-full max-w-[1180px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Selected engineering projects"
            title="Three inspectable systems, built end to end"
            description="Each project below is a public GitHub repository with source, tests, and CI. Case studies live on this site; repositories stay one click away."
            id="projects-heading"
          />
          <a
            href={EXTERNAL_LINKS.githubProfile}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-semibold text-ink-muted transition-colors hover:border-primary/40 hover:text-primary-strong"
            aria-label="Explore the full GitHub profile (opens in new tab)"
          >
            <GitHubIcon />
            GitHub profile
          </a>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
