import Image from "next/image";
import { profile } from "@/content/profile";
import { heroPortrait } from "@/content/profile-media";
import { heroSkills } from "@/content/skills";
import { EXTERNAL_LINKS } from "@/content/site";
import { Button } from "@/components/ui/button";
import { GitHubIcon, GmailIcon } from "@/components/layout/es-mark";
import { TechnologyBadge } from "@/components/ui/technology-badge";

/**
 * Homepage hero: editorial identity and primary actions on the left, the
 * owner-approved official portrait on the right, framed in lavender with a
 * fine purple keyline. The portrait is a static editorial placement.
 */
export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className="relative overflow-hidden">
      {/* restrained decorative field: soft lavender glow + dot texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -top-40 right-[-12%] h-[34rem] w-[34rem] rounded-full bg-primary-soft [mask-image:radial-gradient(closest-side,black,transparent)] opacity-80" />
        <div className="absolute bottom-[-30%] left-[-10%] h-[26rem] w-[26rem] rounded-full bg-section [mask-image:radial-gradient(closest-side,black,transparent)]" />
      </div>

      <div className="copy-deter relative mx-auto grid w-full max-w-[1180px] gap-12 px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:grid-cols-[1.06fr_0.94fr] lg:items-center lg:gap-14 lg:px-8 lg:pb-24 lg:pt-20">
        <div>
          <p className="eyebrow flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="inline-block h-1.5 w-1.5 rounded-full bg-primary"
            />
            {profile.location} · Engineering Portfolio
          </p>

          <h1
            id="hero-heading"
            className="mt-4 text-balance text-[clamp(2.8rem,5.5vw,5.4rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-ink"
          >
            Etalyah{" "}
            <span className="text-primary">Simpson</span>
          </h1>

          <p className="mt-5 text-[clamp(1.05rem,1.9vw,1.35rem)] font-bold tracking-[-0.01em] text-primary-strong">
            {profile.identityLine}
          </p>

          <p className="mt-5 max-w-xl text-[1.0625rem] leading-[1.75] text-ink-muted">
            {profile.heroValue}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href="/projects/" size="lg">
              View my projects
            </Button>
            <Button
              href={EXTERNAL_LINKS.githubProfile}
              external
              size="lg"
              variant="outline"
              iconLeading={<GitHubIcon />}
              ariaLabel="Explore my GitHub profile (opens in new tab)"
            >
              Explore my GitHub
            </Button>
            <Button
              href={EXTERNAL_LINKS.gmailCompose}
              external
              size="lg"
              variant="ghost"
              iconLeading={<GmailIcon className="h-[1.15em] w-[1.15em]" />}
              ariaLabel="Email me in Gmail (opens in new tab)"
            >
              Email me
            </Button>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-success/25 bg-success/8 px-3.5 py-1.5 text-[0.8125rem] font-bold text-success">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-success" />
              {profile.yearsBadge}
            </span>
            <ul className="flex flex-wrap items-center gap-1.5" aria-label="Core technologies">
              {heroSkills.map((skill) => (
                <li key={skill}>
                  <TechnologyBadge name={skill} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Official portrait: the single hero photograph, no rotation or slides */}
        <div className="relative mx-auto w-full max-w-[460px] lg:max-w-none">
          <div
            aria-hidden="true"
            className="dot-grid absolute -right-5 -top-5 h-28 w-28 rounded-2xl opacity-70"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-6 -left-6 hidden text-primary/50 sm:block"
          >
            <svg width="120" height="86" viewBox="0 0 120 86" fill="none">
              <path
                d="M4 82V54c0-6.6 5.4-12 12-12h30"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <path
                d="M116 82V64c0-6.6-5.4-12-12-12H74"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeDasharray="1 7"
              />
              <circle cx="46" cy="42" r="4" fill="currentColor" fillOpacity="0.9" />
              <circle cx="4" cy="82" r="3" fill="currentColor" fillOpacity="0.6" />
              <circle cx="74" cy="52" r="4" fill="none" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </div>

          <div className="relative rounded-[1.6rem] border border-primary/20 bg-primary-soft/80 p-2.5 shadow-card">
            <div className="relative overflow-hidden rounded-[1.25rem]">
              <Image
                src={heroPortrait.src}
                alt={heroPortrait.alt}
                width={heroPortrait.width}
                height={heroPortrait.height}
                priority={heroPortrait.priority}
                draggable={false}
                sizes="(min-width: 1024px) 460px, (min-width: 640px) 60vw, 92vw"
                className="aspect-[4/5] w-full object-cover object-[center_30%]"
              />
            </div>
          </div>

          <div className="absolute -bottom-5 left-5 max-w-[16.5rem] rounded-2xl border border-line bg-surface px-4 py-3 shadow-card">
            <p className="text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-ink-muted">
              Currently
            </p>
            <p className="mt-1 text-[0.8375rem] font-semibold leading-snug text-ink">
              PhD student in Machine Learning / AI, Carnegie Mellon University
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
