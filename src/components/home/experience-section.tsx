import Link from "next/link";
import { experience } from "@/content/experience";
import { SectionHeading } from "@/components/ui/section-heading";

/** Homepage experience preview: accurate role chronology, current role marked. */
export function ExperienceSection() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="scroll-mt-24">
      <div className="mx-auto w-full max-w-[1180px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Experience"
            title="Professional roles, exact titles and dates"
            description="Four roles across AI engineering, machine learning, and full-stack product work. The experience page carries the full scope for every role."
            id="experience-heading"
          />
          <Link
            href="/experience/"
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-semibold text-ink-muted transition-colors hover:border-primary/40 hover:text-primary-strong"
          >
            Full experience
            <svg viewBox="0 0 16 16" aria-hidden="true" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>
        </div>

        <ol className="relative mt-10 space-y-4 before:absolute before:bottom-6 before:left-[7px] before:top-6 before:w-px before:bg-line sm:before:left-[9px]">
          {experience.map((role) => (
            <li key={`${role.company}-${role.title}`} className="relative pl-8 sm:pl-10">
              <span
                aria-hidden="true"
                className={`absolute left-0 top-2 flex h-[15px] w-[15px] items-center justify-center rounded-full border-2 sm:h-[19px] sm:w-[19px] ${
                  role.current
                    ? "border-primary bg-primary-soft"
                    : "border-line bg-surface"
                }`}
              >
                <span
                  className={`rounded-full ${role.current ? "h-[5px] w-[5px] bg-primary sm:h-[7px] sm:w-[7px]" : ""}`}
                />
              </span>
              <div className="card-lift rounded-2xl border border-line bg-surface p-5 shadow-card sm:p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-[1.0625rem] font-extrabold tracking-[-0.01em] text-ink">
                    {role.title}
                    {role.current ? (
                      <span className="ml-2 rounded-full bg-primary-soft px-2 py-0.5 align-middle text-[0.625rem] font-bold uppercase tracking-[0.12em] text-primary-strong">
                        Current
                      </span>
                    ) : null}
                  </h3>
                  <p className="text-[0.8125rem] font-bold uppercase tracking-[0.08em] text-ink-muted">
                    {role.startDate} – {role.endDate}
                  </p>
                </div>
                <p className="mt-1 text-sm font-semibold text-primary-strong">
                  {role.company} · {role.location} · {role.arrangement}
                </p>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-muted">
                  {role.summary}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
