/**
 * Skills registry, grouped by engineering purpose. Categories and entries come
 * from the corrected CV. These are CV-level capabilities, not a claim that each
 * named tool appears in every portfolio repository. Project-specific badges are
 * independently verified from repository evidence in projects.ts.
 */

export interface SkillGroup {
  id: string;
  title: string;
  context: string;
  skills: string[];
  homecard: boolean;
}

export const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    title: "Languages",
    context:
      "Daily working languages across product code, data processing, and automation scripts.",
    skills: ["TypeScript", "JavaScript", "Python", "Java", "Apex", "SQL", "HTML", "CSS", "Bash"],
    homecard: true,
  },
  {
    id: "frontend",
    title: "Frontend",
    context:
      "Component-driven interfaces with typed state management and validated forms.",
    skills: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "TanStack Query",
      "React Hook Form",
      "Zod",
    ],
    homecard: true,
  },
  {
    id: "backend",
    title: "Backend & APIs",
    context:
      "Service boundaries with validated contracts, authentication, and asynchronous work.",
    skills: [
      "FastAPI",
      "Node.js",
      "Express.js",
      "Pydantic",
      "Celery",
      "REST APIs",
      "SOAP",
      "WebSockets",
      "JWT/OAuth2",
    ],
    homecard: true,
  },
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    context:
      "Classical and neural modeling, retrieval pipelines, and production LLM integrations.",
    skills: [
      "PyTorch",
      "scikit-learn",
      "Pandas",
      "NumPy",
      "Hugging Face Transformers",
      "LangChain",
      "MLflow",
      "FAISS",
      "Pinecone",
      "OpenAI APIs",
      "Anthropic APIs",
    ],
    homecard: true,
  },
  {
    id: "ai-evaluation",
    title: "AI Evaluation",
    context:
      "Scoring accuracy, groundedness, and agent safety with reproducible regression evidence.",
    skills: [
      "Promptfoo",
      "DeepEval",
      "Ragas",
      "OpenAI Evals",
      "LangSmith",
      "Weights & Biases",
      "Label Studio",
      "Argilla",
      "Inspect (UK AISI)",
    ],
    homecard: true,
  },
  {
    id: "agentic",
    title: "Agentic Development",
    context:
      "Specifying, reviewing, and gating AI-generated code with test-based acceptance criteria.",
    skills: [
      "Claude Code",
      "MCP",
      "GitHub Copilot",
      "Cursor",
      "OpenAI Codex",
    ],
    homecard: true,
  },
  {
    id: "testing",
    title: "Testing",
    context: "Unit, integration, and end-to-end coverage as a release gate, not an afterthought.",
    skills: ["pytest", "Jest", "React Testing Library", "Playwright", "Postman"],
    homecard: false,
  },
  {
    id: "infrastructure",
    title: "Infrastructure & Data",
    context: "Containerized deployment, cloud services, and operational data stores.",
    skills: [
      "Git/GitHub",
      "Linux",
      "Docker",
      "AWS (S3, Lambda)",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "GitHub Actions",
    ],
    homecard: false,
  },
  {
    id: "crm",
    title: "CRM & Integrations",
    context: "Enterprise marketing platform development and system-to-system data flows.",
    skills: ["Salesforce Marketing Cloud", "AMPscript", "SOQL"],
    homecard: false,
  },
];

/** Compact hero/summary selection. */
export const heroSkills = [
  "Next.js",
  "TypeScript",
  "FastAPI",
  "Python",
  "LangChain",
  "Promptfoo",
  "PyTorch",
  "PostgreSQL",
];
