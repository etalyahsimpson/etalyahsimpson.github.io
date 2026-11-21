import { profile } from "@/content/profile";
import { EXTERNAL_LINKS, LINKEDIN_TRANSITION_NOTICE } from "@/content/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { GitHubIcon, GmailIcon, LinkedInIcon } from "@/components/layout/es-mark";

/**
 * Homepage contact section. Gmail compose and the owner-confirmed current
 * LinkedIn profile are the only direct-contact mechanisms on this site; raw
 * addresses and profile URLs are never rendered as visible text. GitHub
 * links are professional evidence, not messaging channels.
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
          <div className="copy-deter relative max-w-2xl">
            <SectionHeading
              eyebrow="Contact"
              title="Reach me by email"
              description="For engineering opportunities, collaboration on AI evaluation, or questions about the projects on this site, email is the best way to reach me."
              id="contact-heading"
            />
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={EXTERNAL_LINKS.gmailCompose}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Email me in Gmail (opens in new tab)"
                className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-primary px-6 py-3.5 text-[0.9375rem] font-bold text-on-primary shadow-[0_4px_14px_var(--glow-strong)] transition-colors hover:bg-primary-strong"
              >
                <GmailIcon className="h-[1.15em] w-[1.15em]" />
                Email me
              </a>
              <a
                href={EXTERNAL_LINKS.linkedinProfile}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Connect with me on LinkedIn (opens in new tab)"
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
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-ink-muted">
              {LINKEDIN_TRANSITION_NOTICE}
            </p>
            <p className="mt-6 text-sm text-ink-muted">
              Source code for every project I've built is public on{" "}
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
