/**
 * Long-form future engineering initiatives. These are PLANNED concepts only:
 * larger initiatives at the planning stage, separate from the three inspectable
 * repositories. No repository links, no fake deadlines, no shipped claims.
 * The ~18-week detail is an owner-provided prospective planning horizon.
 */

export interface RoadmapInitiative {
  id: string;
  title: string;
  subtitle: string;
  status: "planned";
  focus: string;
  depth: string[];
  differentiatesFrom: string;
  planningHorizon: string;
}

export const roadmapInitiatives: RoadmapInitiative[] = [
  {
    id: "enterpriseops-ai",
    title: "EnterpriseOps AI",
    subtitle: "Secure enterprise knowledge & agent workflows",
    status: "planned",
    focus:
      "A planned deeper enterprise-grade RAG platform with permission-scoped document access, authorized tool-using agents, systematic model evaluations, and operational governance.",
    depth: [
      "Permission-aware retrieval: document-level access control enforced at query time",
      "Authorized tool-using agents with auditable action boundaries",
      "Evaluation harnesses for groundedness and instruction adherence across retrievers",
      "Operational governance: structured logs, review workflows, and release gates",
    ],
    differentiatesFrom:
      "Distinct from PolicyGuard AI's focused evaluation workbench: this initiative targets a full enterprise knowledge and agent platform rather than a response-evaluation tool.",
    planningHorizon: "Long-form initiative · Planning horizon: approximately 18 weeks",
  },
  {
    id: "supplychain-intelligence",
    title: "SupplyChain Intelligence",
    subtitle: "Supplier risk & ML operations platform",
    status: "planned",
    focus:
      "A planned larger system for document and entity extraction, supplier relationship graphs, model training pipelines, and traceable risk-prioritization workflows.",
    depth: [
      "Document and entity extraction pipelines over heterogeneous supplier sources",
      "Supplier relationship modeling and risk signal aggregation",
      "Traceable ML operations: training, versioning, and evaluation lineage",
      "Risk-prioritization workflows with human review and decision history",
    ],
    differentiatesFrom:
      "Distinct from VendorLens AI's focused duplicate identification: this initiative covers a broader risk and ML-operations platform rather than a single resolution product.",
    planningHorizon: "Long-form initiative · Planning horizon: approximately 18 weeks",
  },
  {
    id: "opsflow-enterprise",
    title: "OpsFlow Enterprise",
    subtitle: "Real-time business operations platform",
    status: "planned",
    focus:
      "A planned multi-service order-operations platform with event-driven notifications, reliable background processing, secure APIs, and cloud operational controls.",
    depth: [
      "Multi-service order operations with consistent state and clean failure modes",
      "Event-driven notifications and reliable background job processing",
      "Secure service-to-service APIs with scoped authorization",
      "Cloud operational controls: observability, deployment, and rollback discipline",
    ],
    differentiatesFrom:
      "Distinct from BECBarrier's payment-change verification control: this initiative addresses broad real-time operations rather than a single financial safeguard.",
    planningHorizon: "Long-form initiative · Planning horizon: approximately 18 weeks",
  },
];
