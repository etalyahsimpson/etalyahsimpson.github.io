import Image from "next/image";
import Link from "next/link";
import { profile } from "@/content/profile";
import { aboutPortrait } from "@/content/profile-media";
import { SectionHeading } from "@/components/ui/section-heading";

/**
 * Homepage About section: the owner-approved smiling portrait beside the
 * CV-derived professional narrative. A quieter editorial placement that is
 * visibly distinct from the hero.
 */
export function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-heading" className="scroll-mt-24 bg-section">
      <div className="copy-deter mx-auto grid w-full max-w-[1180px] gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16 lg:px-8 lg:py-24">
        <div className="relative order-2 mx-auto w-full max-w-[380px] lg:order-1 lg:max-w-none">
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
                sizes="(min-width: 1024px) 400px, (min-width: 640px) 55vw, 92vw"
                className="aspect-[3/4] w-full object-cover object-[center_28%]"
              />
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <SectionHeading
            eyebrow="About"
            title="Engineering with evidence at the center"
            id="about-heading"
          />
          <div className="mt-6 space-y-4 text-[1.0325rem] leading-[1.78] text-ink-muted">
            {profile.aboutParagraphs.slice(0, 2).map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>

          <ul className="mt-7 grid gap-3">
            {profile.aboutPositioning.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="mt-1.5 inline-block h-2 w-2 shrink-0 rounded-[4px] bg-primary"
                />
                <span className="text-[0.9375rem] font-medium leading-relaxed text-ink">
                  {point}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <Link
              href="/about/"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-primary/25 bg-primary-soft px-5 py-2.5 text-sm font-semibold text-primary-strong transition-colors hover:bg-primary-soft/70"
            >
              Read the full story
              <svg
                viewBox="0 0 16 16"
                aria-hidden="true"
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
