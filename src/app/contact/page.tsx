import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/layout/container";
import { buildRouteMetadata } from "@/lib/metadata";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { EXTERNAL_LINKS, LINKEDIN_TRANSITION_NOTICE } from "@/content/site";
import { GitHubIcon, GmailIcon, LinkedInIcon } from "@/components/layout/es-mark";

export const metadata: Metadata = buildRouteMetadata({
  title: "Contact",
  description:
    "Contact Etalyah Simpson for engineering opportunities, AI evaluation work, or questions about her projects. Reach her by email in Gmail or through her current LinkedIn profile. No phone number or contact form is published on this site.",
  path: "/contact/",
  image: "/previews/etalyah-portfolio.png",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Email is the way to reach Etalyah"
        description="For engineering opportunities, collaboration on AI evaluation, or questions about any project on this site, send an email or connect through LinkedIn."
        breadcrumbs={[{ label: "Contact" }]}
      />

      <Container className="copy-deter py-14 sm:py-16 lg:py-20">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="relative overflow-hidden rounded-[2rem] border border-primary/20 bg-primary-soft/70 p-8 sm:p-10">
            <div aria-hidden="true" className="dot-grid absolute inset-0 opacity-40" />
            <div className="relative">
              <h2 className="text-xl font-extrabold tracking-[-0.015em] text-ink">
                Send an email
              </h2>
              <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-ink-muted">
                Direct, personal, and answered by Etalyah herself. For anything about source
                code, the repositories below are the fastest path to an answer.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-4">
                <a
                  href={EXTERNAL_LINKS.gmailCompose}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Compose an email to Etalyah Simpson in Gmail (opens in new tab)"
                  className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-primary px-6 py-3.5 text-[0.9375rem] font-bold text-on-primary shadow-[0_4px_14px_var(--glow-strong)] transition-colors hover:bg-primary-strong"
                >
                  <GmailIcon className="h-[1.15em] w-[1.15em]" />
                  Email Etalyah
                </a>
                <a
                  href={EXTERNAL_LINKS.linkedinProfile}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Etalyah Simpson's current LinkedIn profile (opens in new tab)"
                  className="inline-flex min-h-12 items-center gap-2.5 rounded-full border border-line bg-surface px-6 py-3.5 text-[0.9375rem] font-bold text-ink transition-colors hover:border-primary/40 hover:text-primary-strong"
                >
                  <LinkedInIcon className="h-[1.15em] w-[1.15em]" />
                  LinkedIn
                </a>
                <a
                  href={`mailto:${profile.email}`}
                  aria-label="Email in another app"
                  className="text-sm font-semibold text-primary-strong underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary"
                >
                  Email in another app
                </a>
              </div>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-ink-muted">
                {LINKEDIN_TRANSITION_NOTICE}
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-line bg-surface p-8 shadow-card">
            <h2 className="text-xl font-extrabold tracking-[-0.015em] text-ink">
              Professional evidence
            </h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-muted">
              Public source code you can review directly:
            </p>
            <ul className="mt-5 space-y-2.5">
              <li>
                <a
                  href={EXTERNAL_LINKS.githubProfile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 items-center gap-2.5 rounded-2xl border border-line bg-page/70 px-4 py-3 text-[0.9375rem] font-semibold text-ink transition-colors hover:border-primary/40 hover:text-primary-strong"
                >
                  <GitHubIcon />
                  GitHub profile
                  <span className="sr-only">(opens in new tab)</span>
                </a>
              </li>
              {projects.map((project) => (
                <li key={project.slug}>
                  <a
                    href={project.repositoryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-11 items-center justify-between gap-3 rounded-2xl border border-line bg-page/70 px-4 py-3 text-[0.9375rem] font-semibold text-ink transition-colors hover:border-primary/40 hover:text-primary-strong"
                  >
                    {project.title} repository
                    <span className="sr-only">(opens in new tab)</span>
                    <svg viewBox="0 0 16 16" aria-hidden="true" className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 3h7v7M13 3L7 9" />
                      <path d="M11 9v4H3V5h4" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-8 text-sm leading-relaxed text-ink-muted">
          This site intentionally publishes no phone number, messaging handle, or contact form.
          GitHub and LinkedIn links are professional evidence and profile destinations, not
          messaging channels.
        </p>
      </Container>
    </>
  );
}
