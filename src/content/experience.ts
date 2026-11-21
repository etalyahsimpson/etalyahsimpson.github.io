/**
 * Work experience registry. Role titles, employers, arrangements, and dates
 * follow the corrected CV exactly. No title inflation, no date adjustments.
 */

export interface ExperienceRole {
  company: string;
  location: string;
  title: string;
  startDate: string;
  endDate: string;
  arrangement: string;
  current: boolean;
  summary: string;
  highlights: string[];
  tags: string[];
}

export const experience: ExperienceRole[] = [
  {
    company: "9series Inc",
    location: "Seattle, WA",
    title: "Full-Stack / AI Engineer",
    startDate: "Mar 2026",
    endDate: "Present",
    arrangement: "Part-Time · Remote",
    current: true,
    summary:
      "Building full-stack AI applications with model-backed features, RAG pipelines, tool-using agents, and evaluation-driven release quality.",
    highlights: [
      "Build full-stack AI applications with Next.js, FastAPI, PostgreSQL, and Redis, exposing model-backed features through REST APIs with Pydantic request validation.",
      "Design retrieval-augmented generation pipelines with LangChain and Pinecone, grounding OpenAI and Anthropic API responses in company documents.",
      "Develop tool-using agents connected to internal systems through Model Context Protocol (MCP) servers, with permission checks and request logging.",
      "Run agentic coding workflows with Claude Code, Cursor, GitHub Copilot, and OpenAI Codex: precise task specifications, reviewed diffs, and test-based acceptance criteria before merging.",
      "Evaluate model and agent quality with Promptfoo, OpenAI Evals, and LangSmith as a regression suite in the release pipeline, and review outputs in Argilla with structured, evidence-based feedback.",
    ],
    tags: [
      "Next.js",
      "FastAPI",
      "LangChain",
      "Pinecone",
      "MCP",
      "Promptfoo",
      "LangSmith",
      "Argilla",
    ],
  },
  {
    company: "Altana AI",
    location: "Brooklyn, NY",
    title: "Machine Learning Engineer",
    startDate: "May 2024",
    endDate: "Feb 2026",
    arrangement: "Hybrid",
    current: false,
    summary:
      "Built, trained, and served classical and neural models for NLP and entity understanding, with rigorous experiment tracking and evaluation.",
    highlights: [
      "Built and trained classical and neural models with Python, scikit-learn, and PyTorch on structured and text datasets, using Pandas and NumPy for feature engineering and data cleaning.",
      "Fine-tuned Hugging Face Transformers models for NLP tasks such as text classification and named-entity recognition, and used OpenAI and Anthropic APIs for LLM-based extraction and summarization.",
      "Built semantic search and early RAG prototypes with sentence embeddings, FAISS vector indexes, and LangChain pipelines.",
      "Tracked experiments, parameters, and model versions with MLflow and Weights & Biases so results could be reproduced and compared across runs.",
      "Evaluated models with precision, recall, F1, and confusion matrices; scored RAG outputs with Ragas and DeepEval; and documented gaps between expected and actual behavior for development teams.",
      "Packaged models behind FastAPI services in Docker containers, deployed them on AWS, and used GitHub Copilot for routine coding, reviewing all generated code before merging.",
    ],
    tags: [
      "Python",
      "PyTorch",
      "scikit-learn",
      "Hugging Face",
      "FAISS",
      "LangChain",
      "MLflow",
      "FastAPI",
    ],
  },
  {
    company: "InductEV",
    location: "King of Prussia, PA",
    title: "Full-Stack Developer",
    startDate: "Jan 2024",
    endDate: "Mar 2024",
    arrangement: "Contract",
    current: false,
    summary:
      "Delivered customer-facing web features, real-time order tracking, and background job processing for EV fleet charging systems.",
    highlights: [
      "Built customer-facing web features with React, Next.js, TypeScript, and Tailwind CSS, using TanStack Query for server data and React Hook Form with Zod for validated forms.",
      "Developed REST APIs with FastAPI and Node.js/Express, validated requests with Pydantic, and implemented JWT/OAuth2 authentication and authorization.",
      "Delivered real-time features such as live order tracking and notifications with WebSockets, and background jobs for scheduled reports, bulk imports, and email delivery with Celery and Redis.",
      "Modeled data and wrote SQL queries in PostgreSQL, used MongoDB for flexible records, and managed schema changes.",
      "Wrote tests with pytest, Jest, and Playwright, documented and tested APIs in Postman, and took part in pull-request reviews on Git/GitHub.",
    ],
    tags: [
      "React",
      "Next.js",
      "TypeScript",
      "FastAPI",
      "WebSockets",
      "Celery",
      "PostgreSQL",
      "Playwright",
    ],
  },
  {
    company: "Hertz",
    location: "Philadelphia, PA",
    title: "Full-Stack Developer, CRM System",
    startDate: "Jan 2022",
    endDate: "Nov 2023",
    arrangement: "Hybrid",
    current: false,
    summary:
      "Supported and extended the company's Salesforce Marketing Cloud CRM platform, its integrations, and its customer-facing surfaces.",
    highlights: [
      "Supported the development and maintenance of the company's customer relationship management platform, working with senior developers to build new features and keep existing ones running.",
      "Built and updated email templates, landing pages, and customer-facing components in Salesforce Marketing Cloud using HTML, CSS, JavaScript, and AMPscript.",
      "Wrote and tested Apex classes (Salesforce platform) and Java components to the specifications set by senior engineers, and documented the work.",
      "Wrote SQL and SOQL queries to pull, check, and clean customer data from several sources, and flagged data-load errors and mismatches to the team.",
      "Helped build and test REST and SOAP API integrations between the CRM and other company systems, including connections to web properties, and handled first-line troubleshooting of integration errors.",
      "Used AWS services such as S3 and Lambda to support small microservices and data-processing tasks, and took part in code reviews, user acceptance testing, and functional documentation.",
    ],
    tags: [
      "Salesforce Marketing Cloud",
      "AMPscript",
      "SOQL",
      "Apex",
      "REST/SOAP",
      "AWS S3",
      "AWS Lambda",
    ],
  },
];
