/**
 * SINGLE canonical project registry.
 *
 * Every card, badge, route parameter, case-study page, canonical link, Open
 * Graph image, Copy Project Link target, and release URL audit is generated
 * from this file. Technology badges list ONLY tools verified present in the
 * actual public repositories (inspected directly before publishing).
 *
 * Facts and metrics below are taken from each repository's committed case
 * study, README, and CI-verified test runs. No business outcomes, customers,
 * or deployment claims are invented: all three projects run locally from their
 * repositories and have no public deployment.
 */

export type ProjectStatus = "published" | "in-progress" | "planned" | "unverified";

export interface ProjectEvidence {
  label: string;
  href: string;
  verified: boolean;
}

export interface ProjectMetric {
  label: string;
  value: string;
  note: string;
}

export interface ProjectScreenshot {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
}

export interface ProjectBanner {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface PortfolioProject {
  slug: string;
  title: string;
  subtitle: string;
  industry: string;
  status: ProjectStatus;
  statusLabel: string;
  oneLineProblem: string;
  cardSummary: string;
  problem: string[];
  solution: string[];
  architectureSummary: string;
  features: string[];
  metrics: ProjectMetric[];
  implementedTechnologies: string[];
  repositoryUrl: string;
  repositoryVerified: boolean;
  verificationNote: string;
  evidence: ProjectEvidence[];
  /** Authentic branded banner supplied by the owner (matches the repository asset byte-for-byte). */
  banner: ProjectBanner;
  /** Authentic software overview screenshot supplied by the owner. */
  overview: ProjectScreenshot;
  /** True when banner and overview were verified against the source repositories. */
  visualVerified: boolean;
  screenshots: ProjectScreenshot[];
  socialImage: string;
  seoDescription: string;
  featured: boolean;
  relatedSlugs: string[];
}

export const projects: PortfolioProject[] = [
  {
    slug: "policyguard-ai",
    title: "PolicyGuard AI",
    subtitle: "AI response evaluation and agent authorization workbench",
    industry: "AI Evaluation · Application Security",
    status: "published",
    statusLabel: "Published",
    oneLineProblem:
      "Engineering teams need systematic ways to inspect AI-generated customer-support responses, citations, instruction compliance, and proposed agent actions.",
    cardSummary:
      "I built a deterministic evaluation workbench for AI-generated support responses: one shared TypeScript engine checks policy facts, citation integrity, output contracts, and default-deny tool authorization, and is consumed unchanged by a Next.js workbench, an Express API, an MCP server, and the CI suites.",
    problem: [
      "Enterprises increasingly let AI assistants answer customers directly and propose operational actions. Three failure classes recur: policy drift (responses omit mandatory policy information or assert guarantees the policy does not make), citation rot (responses cite documents that do not exist, cite superseded versions, or assert facts no cited document defines), and authorization overreach (tool proposals exceed what the acting user may do).",
      "These defects are regressions: they reappear when prompts, models, or retrieval corpora change. Like any software behavior they need reproducible, automated testing rather than one-off manual review. PolicyGuard AI is a workbench for the engineers who own that problem: it evaluates candidate responses against versioned policy requirements and a default-deny authorization matrix, deterministically and offline.",
    ],
    solution: [
      "I built a TypeScript monorepo with one architectural rule: the evaluation logic exists once. A shared engine performs 11 deterministic structural checks (required facts, fact support, citation validity, coverage and allowlists, fact-to-citation linkage, structured-output contract, completeness, tool-action permission, scenario action prohibition, forbidden content) with per-check severity, explanation, and evidence.",
      "I wired the same engine unchanged into every surface: a six-view Next.js workbench (overview, scenario explorer, response inspector, authorization workbench, baseline-vs-revised comparison, report export), an Express REST API with Zod validation on every request, a Model Context Protocol server exposing three agent-consumable tools, and the CI test suites including a Promptfoo offline suite where correctly rejected negative examples count as passing tests.",
      "My authorization design is a default-deny 3-role by 5-operation matrix with tenant scoping and separation of duties; every decision cites the rule responsible. Scoring is deterministic (round(100 x passed / applicable)) and the overall decision fails whenever any applicable check fails.",
    ],
    architectureSummary:
      "I structured the project as an npm-workspaces monorepo on Node 22 with TypeScript strict mode. packages/evaluation-core holds the engine and Zod schemas; datasets holds 9 policy documents, 32 scenarios, and 51 version-controlled candidate responses; apps/web is a Next.js static-export workbench; apps/api is an Express 5 REST API; packages/mcp-server exposes the engine over MCP stdio; evaluations runs Promptfoo with a local provider. No external LLM APIs, no database, no paid dependencies: everything reproduces after npm ci.",
    features: [
      "Shared evaluation engine with 11 deterministic checks, per-check severity, explanation, and evidence",
      "Six-view browser workbench with live in-browser reruns, scenario search and filters, and JSON/CSV export",
      "Authorization workbench with a default-deny permission matrix and rule-attributed ALLOW/DENY decisions",
      "Express 5 REST API with Zod validation, request logging, and consistent JSON error envelopes",
      "MCP server (official SDK, stdio) with list_evaluation_scenarios, evaluate_ai_response, and check_tool_permission tools",
      "Promptfoo offline evaluation suite covering all 51 responses against documented ground truth",
      "Full test pyramid: Jest unit and integration, React Testing Library component tests, Playwright end-to-end tests against the static export",
      "Static-export frontend and multistage non-root Docker image for the API",
    ],
    metrics: [
      { label: "Jest cases", value: "163 / 163", note: "across 14 suites: engine, datasets, API, MCP, and UI components" },
      { label: "Playwright e2e", value: "13 / 13", note: "against the production static export" },
      { label: "Promptfoo suite", value: "51 / 51", note: "offline assertions over the full response corpus" },
      { label: "Evaluation corpus", value: "32 scenarios · 51 responses", note: "9 policy documents, 11 deterministic checks" },
    ],
    implementedTechnologies: [
      "TypeScript",
      "Next.js",
      "React",
      "Tailwind CSS",
      "Zustand",
      "Zod",
      "Node.js",
      "Express",
      "Model Context Protocol",
      "Promptfoo",
      "Jest",
      "React Testing Library",
      "Playwright",
      "Docker",
      "GitHub Actions",
    ],
    repositoryUrl: "https://github.com/etalyahsimpson/policyguard-ai",
    repositoryVerified: true,
    verificationNote:
      "I inspected the public repository directly before publishing. Badges list only technologies present in the implementation. The evaluation is deterministic and offline; no connected live LLM processing is involved.",
    evidence: [
      { label: "GitHub repository", href: "https://github.com/etalyahsimpson/policyguard-ai", verified: true },
      { label: "Project README", href: "https://github.com/etalyahsimpson/policyguard-ai/blob/main/README.md", verified: true },
      { label: "Engineering case study", href: "https://github.com/etalyahsimpson/policyguard-ai/blob/main/docs/PROJECT_CASE_STUDY.md", verified: true },
      { label: "CI workflow", href: "https://github.com/etalyahsimpson/policyguard-ai/blob/main/.github/workflows/ci.yml", verified: true },
    ],
    banner: {
      src: "/projects/policyguard-ai/policyguard-banner.svg",
      alt: "PolicyGuard AI branded banner: enterprise AI response evaluation and agent security workbench on a dark navy grid",
      width: 1280,
      height: 360,
    },
    overview: {
      src: "/projects/policyguard-ai/policyguard-overview.png",
      alt: "PolicyGuard AI evaluation workbench overview showing scenario and evaluation counts, failure-category distribution, and baseline versus revised comparisons",
      width: 1440,
      height: 900,
      caption:
        "Evaluation workbench overview: live scenario and evaluation counts, failure-category distribution, and baseline versus revised comparisons",
    },
    visualVerified: true,
    screenshots: [
      {
        src: "/projects/policyguard-ai/scenario-inspector.png",
        alt: "PolicyGuard AI response inspector with fact chips, citations, and in-browser evaluation rerun",
        width: 1440,
        height: 900,
        caption: "Response inspector: editable candidate response with fact chips, citations, and in-browser rerun",
      },
      {
        src: "/projects/policyguard-ai/permission-workbench.png",
        alt: "PolicyGuard AI authorization workbench showing the permission matrix and rule-attributed allow and deny decisions",
        width: 1440,
        height: 900,
        caption: "Authorization workbench: default-deny matrix with rule-attributed decisions",
      },
    ],
    socialImage: "/previews/policyguard-ai.png",
    seoDescription:
      "My PolicyGuard AI project: a deterministic AI response evaluation and agent authorization workbench with a shared TypeScript engine, Next.js workbench, Express API, MCP server, and Promptfoo CI suite.",
    featured: true,
    relatedSlugs: ["vendorlens-ai", "becbarrier"],
  },
  {
    slug: "vendorlens-ai",
    title: "VendorLens AI",
    subtitle: "Supplier entity resolution and duplicate-record detection",
    industry: "Machine Learning · Data Quality",
    status: "published",
    statusLabel: "Published",
    oneLineProblem:
      "Duplicate and inconsistent supplier identities complicate business data quality and procurement workflows.",
    cardSummary:
      "I built a supplier entity-resolution product: careful normalization, FAISS candidate retrieval, a trained scikit-learn classifier over 19 interpretable features, ranked suggestions with per-field evidence, and a human review workflow where nothing merges automatically.",
    problem: [
      "Procurement, finance, and operations teams maintain supplier master data imported from divisions, ERPs, and spreadsheets. The same vendor reappears under abbreviations, punctuation variants, old addresses, and inconsistent legal suffixes, while similar names often belong to different legal entities.",
      "Exact-string matching over-merges and under-finds; manual deduplication does not scale; and silent duplicates leak into spend analysis, payments, and vendor risk.",
    ],
    solution: [
      "I built a complete local-first pipeline: CSV import with schema validation and hard limits, careful normalization, then FAISS nearest-neighbor candidate retrieval combined with deterministic blocking, then a genuinely trained scikit-learn classifier (logistic regression over 19 interpretable features) that scores candidate duplicate pairs.",
      "My ranked suggestions carry per-field evidence (name, website, city, postal code, suffix signals) and uncertainty bands. I route every recommendation to a human review workspace with an expandable side-by-side comparison drawer and decision controls (confirm, reject, investigate) persisted server-side; there is no merge endpoint by design. Analysts export a full findings report with model output and human decisions.",
      "I designed evaluation to be honest by construction: canonical-entity-disjoint splits mean the model is scored on suppliers it has never seen, thresholds come from validation only, and the trained model is compared against a deterministic baseline on held-out data.",
    ],
    architectureSummary:
      "I built a Python backend (FastAPI, Pydantic, SQLAlchemy, PostgreSQL via Docker Compose with a SQLite quick start) serving a React + Vite + TypeScript + Tailwind review UI. Training and serving compute features with identical code; MLflow tracks baseline and model runs with artifacts; pytest covers 82 backend cases and Playwright covers 9 end-to-end flows in CI.",
    features: [
      "CSV supplier-register import with documented schema validation and hard limits, plus a bundled sample dataset",
      "FAISS nearest-neighbor candidate retrieval with website and city+postal blocking (100% candidate recall on the benchmark)",
      "Trained scikit-learn classifier over 19 interpretable features with entity-disjoint train/validation/test splits",
      "Ranked duplicate suggestions with score bars, per-field evidence chips, uncertainty bands, filters, and search",
      "Human review workflow with persisted decisions and a side-by-side comparison drawer; nothing merges automatically",
      "Model evidence view: held-out precision/recall/F1, confusion matrix, baseline comparison, and feature definitions",
      "CSV export combining model output with human decisions, with formula neutralization applied",
      "One-command Docker Compose stack and reproducible dataset generation (seed 42, pinned dependencies)",
    ],
    metrics: [
      { label: "Held-out F1", value: "0.964", note: "trained model vs 0.855 deterministic baseline; 44 unseen entities" },
      { label: "Held-out recall", value: "1.000", note: "29 true duplicates recovered that the baseline misses" },
      { label: "Candidate recall", value: "1.000", note: "validation and test splits, FAISS retrieval" },
      { label: "Backend tests", value: "82", note: "pytest cases plus 9 Playwright end-to-end flows in CI" },
    ],
    implementedTechnologies: [
      "Python",
      "Pandas",
      "NumPy",
      "scikit-learn",
      "FAISS",
      "MLflow",
      "FastAPI",
      "Pydantic",
      "SQLAlchemy",
      "PostgreSQL",
      "React",
      "Vite",
      "TypeScript",
      "Tailwind CSS",
      "pytest",
      "Playwright",
      "Docker",
      "GitHub Actions",
    ],
    repositoryUrl: "https://github.com/etalyahsimpson/vendorlens-ai",
    repositoryVerified: true,
    verificationNote:
      "I inspected the public repository directly before publishing. Metrics are measured on the included synthetic benchmark dataset and are not estimates of real-world accuracy.",
    evidence: [
      { label: "GitHub repository", href: "https://github.com/etalyahsimpson/vendorlens-ai", verified: true },
      { label: "Project README", href: "https://github.com/etalyahsimpson/vendorlens-ai/blob/main/README.md", verified: true },
      { label: "Engineering case study", href: "https://github.com/etalyahsimpson/vendorlens-ai/blob/main/docs/PROJECT_CASE_STUDY.md", verified: true },
      { label: "ML methodology", href: "https://github.com/etalyahsimpson/vendorlens-ai/blob/main/docs/ML_METHODOLOGY.md", verified: true },
    ],
    banner: {
      src: "/projects/vendorlens-ai/vendorlens-banner.svg",
      alt: "VendorLens AI branded banner: intelligent supplier identity resolution and duplicate detection",
      width: 1200,
      height: 400,
    },
    overview: {
      src: "/projects/vendorlens-ai/vendorslens-overview.png",
      alt: "VendorLens AI review workspace showing ranked duplicate candidate pairs with match scores, evidence chips, and decision controls",
      width: 1440,
      height: 900,
      caption:
        "Review Matches workspace: ranked duplicate suggestions with scores, per-field evidence chips, and per-pair decision controls",
    },
    visualVerified: true,
    screenshots: [
      {
        src: "/projects/vendorlens-ai/overview.png",
        alt: "VendorLens AI overview screen with live counts and options to explore sample data or upload a supplier CSV",
        width: 1440,
        height: 1074,
        caption: "Overview: live counts from the active analysis with sample data and CSV upload entry points",
      },
    ],
    socialImage: "/previews/vendorlens-ai.png",
    seoDescription:
      "My VendorLens AI project: supplier entity resolution and duplicate detection with FAISS retrieval, a trained scikit-learn classifier, per-field evidence, and human review.",
    featured: true,
    relatedSlugs: ["policyguard-ai", "becbarrier"],
  },
  {
    slug: "becbarrier",
    title: "BECBarrier",
    subtitle: "Enterprise BEC investigation and supplier payment-change safeguarding",
    industry: "Security Engineering · Financial Controls",
    status: "published",
    statusLabel: "Published",
    oneLineProblem:
      "Business email compromise and fraudulent changes to supplier payment instructions can exploit normal business workflows.",
    cardSummary:
      "I built a governed payment-change safeguard: explainable email-indicator review plus a server-enforced workflow of mandatory holds, independent callback verification, dual distinct approval, immutable revisions, and an HMAC-chained audit trail.",
    problem: [
      "A convincing email can appear to come from a trusted supplier and request an urgent banking change. Pure email analysis can never prove a payment instruction is legitimate, because a compromised real mailbox passes every authentication check.",
      "Detection alone cannot authorize payments. BECBarrier therefore treats every mail signal as advisory and makes supplier bank changes pass a governed, server-enforced workflow that no email-analysis result can bypass.",
    ],
    solution: [
      "I built the workflow so every new bank-account instruction enters ON_HOLD, requires a callback to a contact established in the approved directory before the request, requires two distinct eligible approvals, and only then produces a controlled ERP update instruction. No funds move inside BECBarrier.",
      "My email analysis is explainable and provenance-aware: BEC-01 through BEC-07 deterministic indicators with reason codes and redacted evidence, with untrusted claims (such as forged Authentication-Results headers) never treated as verified.",
      "My authoritative TypeScript API against PostgreSQL enforces the invariants: row locks, idempotency keys, composite unique constraints against concurrent duplicate approvals, immutable revisions that void stale evidence after material edits, tenant-scoped queries with neutral 404s for cross-tenant access, AES-256-GCM encryption for bank fields, and an HMAC-SHA-256 chained append-only audit trail with a verifier CLI.",
    ],
    architectureSummary:
      "I built a TypeScript/PostgreSQL core (Node.js, Express, Zod, pg, Redis, WebSockets) with an isolated Python analysis service (FastAPI, Pandas, NumPy). The role-aware workbench is an 8-screen Next.js app with TanStack Query, React Hook Form + Zod, and WebSocket-plus-polling realtime. Five versioned reversible migrations with least-privilege DB roles, one-command Docker Compose, and gated GitHub Actions CI across quality, python, integration, build, e2e, and scan stages.",
    features: [
      "Seven deterministic BEC email indicators with reason codes, provenance-aware analysis, and UNTRUSTED_CLAIM handling",
      "Server-enforced payment guard: mandatory ON_HOLD, pre-approved directory callback, dual distinct approval, controlled ERP update instruction only",
      "Immutable revisions: material edits create a new revision and void prior evidence",
      "Idempotent, concurrency-safe transitions proven by 40+ concurrent duplicate-approval and release attempts",
      "AES-256-GCM encrypted bank fields with tenant/supplier/revision AAD binding and keyed equality fingerprints",
      "HMAC-SHA-256 chained, append-only audit trail with a verifier CLI",
      "Tenant-scoped queries everywhere; cross-tenant identifiers return neutral 404s",
      "8-screen role-aware Next.js workbench with realtime updates; 32 email fixtures and 26 executable workflow scenarios",
    ],
    metrics: [
      { label: "Acceptance matrix", value: "T01 – T18", note: "executed across pytest, Jest, and Playwright" },
      { label: "Workflow scenarios", value: "26", note: "executable fixtures plus 32 email samples" },
      { label: "Concurrency attempts", value: "40+", note: "racing releases and duplicate approvals fail closed without corrupting state" },
      { label: "DB migrations", value: "5", note: "versioned and reversible, with least-privilege roles proven by permission-denial tests" },
    ],
    implementedTechnologies: [
      "TypeScript",
      "Python",
      "Next.js",
      "React",
      "FastAPI",
      "Pydantic",
      "Pandas",
      "NumPy",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Redis",
      "WebSockets",
      "TanStack Query",
      "React Hook Form",
      "Zod",
      "Docker",
      "GitHub Actions",
      "pytest",
      "Playwright",
    ],
    repositoryUrl: "https://github.com/etalyahsimpson/becbarrier",
    repositoryVerified: true,
    verificationNote:
      "I inspected the public repository directly before publishing. BECBarrier does not initiate bank transfers and does not guarantee fraud prevention; it implements governed verification workflows. No live mailbox, ERP, or identity-provider integrations exist in this release.",
    evidence: [
      { label: "GitHub repository", href: "https://github.com/etalyahsimpson/becbarrier", verified: true },
      { label: "Project README", href: "https://github.com/etalyahsimpson/becbarrier/blob/main/README.md", verified: true },
      { label: "Engineering case study", href: "https://github.com/etalyahsimpson/becbarrier/blob/main/docs/PROJECT_CASE_STUDY.md", verified: true },
      { label: "Evidence report", href: "https://github.com/etalyahsimpson/becbarrier/blob/main/BECBarrier_Evidence_Report.md", verified: true },
    ],
    banner: {
      src: "/projects/becbarrier/becbarrier-hero.svg",
      alt: "BECBarrier branded banner: verify the sender, protect the payment, preserve the evidence",
      width: 960,
      height: 260,
    },
    overview: {
      src: "/projects/becbarrier/becbarrier-overview.png",
      alt: "BECBarrier security overview dashboard showing bank-change hold counts, alerts by priority, workflow distribution, and recent bank-change activity",
      width: 1280,
      height: 1330,
      caption:
        "Security overview: bank-change holds, alerts by priority, workflow distribution, and recent bank-change activity",
    },
    visualVerified: true,
    screenshots: [
      {
        src: "/projects/becbarrier/bank-change-approval.png",
        alt: "BECBarrier bank-change detail view showing callback verification and dual approval controls",
        width: 1280,
        height: 1032,
        caption: "Bank-change detail: callback verification and dual distinct approval with immutable revisions",
      },
    ],
    socialImage: "/previews/becbarrier.png",
    seoDescription:
      "My BECBarrier project: enterprise BEC investigation and supplier payment-change safeguarding with email-indicator review, independent callbacks, dual approval, and an auditable trail.",
    featured: true,
    relatedSlugs: ["policyguard-ai", "vendorlens-ai"],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string): PortfolioProject | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getRelatedProjects(slug: string): PortfolioProject[] {
  const project = getProject(slug);
  if (!project) return [];
  return project.relatedSlugs
    .map((s) => getProject(s))
    .filter((p): p is PortfolioProject => Boolean(p));
}
