import { profile } from "@/content/profile";
import { EXTERNAL_LINKS } from "@/content/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { GitHubIcon } from "@/components/layout/es-mark";

/**
 * Homepage contact section. Email via mailto: is the ONLY direct-contact
 * mechanism on this site. GitHub links are professional evidence, not
 * messaging channels.
 */
export function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-24 bg-section">
      <div className="mx-auto w-full max-w-[1180px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="relative overflow-hidden rounded-[2rem] border border-primary/20 bg-primary-soft/70 px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
          <div aria-hidden="true" className="dot-grid absolute inset-0 opacity-40" />
          <div
            aria-hidden="true"
            className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-surface/70 [mask-image:radial-gradient(closest-side,black,transparent)]"
          />
          <div className="relative max-w-2xl">
            <SectionHeading
              eyebrow="Contact"
              title="Reach Etalyah by email"
              description="For engineering opportunities, collaboration on AI evaluation, or questions about the projects on this site, email is the best way to start."
              id="contact-heading"
            />
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-primary px-6 py-3.5 text-[0.9375rem] font-bold text-on-primary shadow-[0_4px_14px_var(--glow-strong)] transition-colors hover:bg-primary-strong"
              >
                <svg viewBox="0 0 20 20" aria-hidden="true" className="h-[1.1em] w-[1.1em]" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2.5" y="4.5" width="15" height="11" rx="2.5" />
                  <path d="M4 7l6 4.5L16 7" />
                </svg>
                Email Etalyah
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="font-mono text-[0.9375rem] font-semibold text-primary-strong underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary"
              >
                {profile.email}
              </a>
            </div>
            <p className="mt-6 text-sm text-ink-muted">
              Source code for every project is public on{" "}
              <a
                href={EXTERNAL_LINKS.githubProfile}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-semibold text-primary-strong underline decoration-primary/30 underline-offset-4 hover:decoration-primary"
              >
                <GitHubIcon className="h-3.5 w-3.5" />
                GitHub
              </a>{" "}
              for professional evidence and review.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
