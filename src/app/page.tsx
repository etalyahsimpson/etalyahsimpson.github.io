import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { AboutSection } from "@/components/home/about-section";
import { SkillsSection } from "@/components/home/skills-section";
import { ProjectsSection } from "@/components/home/projects-section";
import { ExperienceSection } from "@/components/home/experience-section";
import { RoadmapSection } from "@/components/home/roadmap-section";
import { EducationSection } from "@/components/home/education-section";
import { ContactSection } from "@/components/home/contact-section";
import { buildRouteMetadata } from "@/lib/metadata";
import { profile } from "@/content/profile";
import { EXTERNAL_LINKS, SITE } from "@/content/site";

export const metadata: Metadata = buildRouteMetadata({
  title: "Etalyah Simpson · Software Engineering, Agentic Coding & AI Evaluation",
  description: SITE.description,
  path: "/",
  image: "/previews/etalyah-home.png",
  type: "profile",
});

/** schema.org Person: permitted public facts only. No telephone. */
function PersonJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: SITE.url,
    email: `mailto:${profile.email}`,
    jobTitle: "Full-Stack / AI Engineer",
    description: SITE.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Philadelphia",
      addressRegion: "PA",
      addressCountry: "US",
    },
    sameAs: [EXTERNAL_LINKS.githubProfile],
    knowsAbout: [
      "Agentic coding",
      "Software engineering",
      "AI evaluation",
      "Machine learning",
      "Full-stack development",
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function HomePage() {
  return (
    <>
      <PersonJsonLd />
      <Hero />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <RoadmapSection />
      <EducationSection />
      <ContactSection />
    </>
  );
}
