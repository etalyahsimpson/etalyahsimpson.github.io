/**
 * Professional identity, permitted public facts only.
 *
 * Privacy contract (see docs/CONTENT_PROVENANCE.md):
 * - Gmail (pre-addressed compose) is the ONLY public direct-contact channel;
 *   the current LinkedIn profile is the sole approved professional profile
 *   link. Raw addresses are never rendered as visible text.
 * - No phone number, messaging handle, or social-messaging profile is published.
 * - Facts are derived from the owner's private CV but re-authored as portfolio copy.
 */

export interface Profile {
  name: string;
  firstName: string;
  identityLine: string;
  location: string;
  email: string;
  yearsBadge: string;
  githubProfile: string;
  portfolioUrl: string;
  heroValue: string;
  aboutParagraphs: string[];
  aboutPositioning: string[];
  focusAreas: { title: string; description: string }[];
}

export const profile: Profile = {
  name: "Etalyah Simpson",
  firstName: "Etalyah",
  identityLine: "Agentic Coding · Software Engineering · AI Evaluation",
  location: "Philadelphia, PA",
  email: "etalyahsimpson.tech@gmail.com",
  yearsBadge: "4+ years professional experience",
  githubProfile: "https://github.com/etalyahsimpson",
  portfolioUrl: "https://etalyahsimpson.github.io/",

  heroValue:
    "I build full-stack applications, model-backed services, and AI evaluation workflows, combining secure APIs, thoughtful user experiences, and evidence-led engineering.",

  aboutParagraphs: [
    "I am a full-stack and AI engineer with 4+ years of professional experience developing customer-facing applications, model-backed services, and enterprise integrations. My work spans Next.js, React, TypeScript, FastAPI, Node.js, PostgreSQL, and Redis, alongside machine learning, retrieval-augmented generation, and tool-using AI agents.",
    "What ties my work together is a commitment to verifiable quality: secure API and authentication design, cloud deployment, automated testing, and evidence-based LLM evaluation. I score models and agents on accuracy, groundedness, and instruction adherence so that quality claims rest on reproducible evidence rather than impressions.",
    "I am currently a PhD student in Machine Learning and AI at Carnegie Mellon University with a research focus on deep learning, and I practice agentic coding workflows professionally: writing precise task specifications, reviewing generated diffs, and setting test-based acceptance criteria before anything merges.",
  ],

  aboutPositioning: [
    "Full-stack engineering with a security-first API and data mindset",
    "ML-enabled systems, from feature engineering to deployed model services",
    "AI evaluation as a first-class engineering discipline",
  ],

  focusAreas: [
    {
      title: "Agentic Coding",
      description:
        "Tool-using agents connected through MCP servers, with permission checks, request logging, and test-based acceptance criteria for AI-generated code.",
    },
    {
      title: "Software Engineering",
      description:
        "Full-stack product engineering: typed APIs, validated data flows, real-time features, background jobs, and cloud deployment with automated tests.",
    },
    {
      title: "AI Evaluation",
      description:
        "Reproducible LLM, RAG, and agent evaluation: accuracy, groundedness, hallucination analysis, and regression suites that run in the release pipeline.",
    },
  ],
};
