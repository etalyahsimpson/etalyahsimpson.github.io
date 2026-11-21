import Link from "next/link";
import { education } from "@/content/education";
import { certifications } from "@/content/certifications";
import { SectionHeading } from "@/components/ui/section-heading";

/** Homepage education + certifications summary. */
export function EducationSection() {
  return (
    <section id="education" aria-labelledby="education-heading" className="scroll-mt-24">
      <div className="copy-deter mx-auto w-full max-w-[1180px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <SectionHeading
          eyebrow="Education & credentials"
          title="Continuous formal learning"
          description="An ongoing PhD in Machine Learning and AI, a software engineering master's, and industry certifications across cloud architecture and machine learning."
          id="education-heading"
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-card sm:p-7">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-base font-extrabold text-ink">Education</h3>
              <Link
                href="/education/"
                className="text-sm font-semibold text-primary-strong transition-colors hover:text-primary"
              >
                Details
              </Link>
            </div>
            <ul className="mt-5 space-y-5">
              {education.map((entry) => (
                <li key={entry.credential} className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-[6px] ${
                      entry.ongoing ? "bg-primary" : "bg-line"
                    }`}
                  />
                  <div>
                    <p className="text-[0.9375rem] font-bold leading-snug text-ink">
                      {entry.credential}
                      {entry.ongoing ? (
                        <span className="ml-2 rounded-full bg-primary-soft px-2 py-0.5 align-middle text-[0.625rem] font-bold uppercase tracking-[0.12em] text-primary-strong">
                          Ongoing
                        </span>
                      ) : null}
                    </p>
                    <p className="mt-1 text-sm text-ink-muted">
                      {entry.institution} · {entry.startDate} – {entry.endDate}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-line bg-surface p-6 shadow-card sm:p-7">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-base font-extrabold text-ink">Certifications</h3>
              <Link
                href="/certifications/"
                className="text-sm font-semibold text-primary-strong transition-colors hover:text-primary"
              >
                Details
              </Link>
            </div>
            <ul className="mt-5 grid gap-3">
              {certifications.map((cert) => (
                <li
                  key={cert.name}
                  className="flex items-center justify-between gap-4 rounded-xl border border-line bg-page/70 px-4 py-3"
                >
                  <p className="text-[0.9375rem] font-semibold leading-snug text-ink">
                    {cert.name}
                  </p>
                  <span className="shrink-0 rounded-full bg-surface-muted px-2.5 py-1 text-xs font-bold text-ink-muted">
                    {cert.year}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
