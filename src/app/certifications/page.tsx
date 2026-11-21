import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/layout/container";
import { buildRouteMetadata } from "@/lib/metadata";
import { certifications } from "@/content/certifications";

export const metadata: Metadata = buildRouteMetadata({
  title: "Certifications",
  description:
    "My certifications: AWS Certified Solutions Architect Associate (2025), Google Cloud Professional Machine Learning Engineer (2024), DeepLearning.AI Deep Learning Specialization, AWS Machine Learning Foundations, and Salesforce Marketing Cloud.",
  path: "/certifications/",
  image: "/previews/etalyah-portfolio.png",
});

export default function CertificationsPage() {
  const sorted = [...certifications].sort((a, b) => b.year - a.year);
  return (
    <>
      <PageHero
        eyebrow="Certifications"
        title="Cloud architecture, machine learning, and platform credentials"
        description="Industry certifications I earned between 2020 and 2025, spanning AWS architecture, Google Cloud machine learning, deep learning, and Salesforce Marketing Cloud."
        breadcrumbs={[{ label: "Certifications" }]}
      />

      <Container className="copy-deter py-14 sm:py-16 lg:py-20">
        <ul className="grid gap-4 sm:grid-cols-2">
          {sorted.map((cert) => (
            <li
              key={cert.name}
              className="card-lift flex items-start justify-between gap-5 rounded-3xl border border-line bg-surface p-6 shadow-card"
            >
              <div>
                <h2 className="text-[1.0625rem] font-extrabold leading-snug tracking-[-0.01em] text-ink">
                  {cert.name}
                </h2>
                <p className="mt-1.5 text-sm text-ink-muted">{cert.issuer}</p>
              </div>
              <span className="inline-flex shrink-0 items-center rounded-full bg-primary-soft px-3.5 py-1.5 text-sm font-extrabold text-primary-strong">
                {cert.year}
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-sm text-ink-muted">
          I list certification names and years exactly as earned. I publish no verification URLs
          or credential identifiers because none are authorized for public display, and no
          endorsement by the issuing organizations is implied.
        </p>
      </Container>
    </>
  );
}
