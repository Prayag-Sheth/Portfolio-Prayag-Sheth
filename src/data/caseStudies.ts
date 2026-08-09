/**
 * Case study metadata + optional body copy.
 * Only slugs with `content` are considered published; others stay pending.
 */

export type CaseStudySectionId =
  | "overview"
  | "architecture"
  | "challenges"
  | "impact"
  | "next";

export type CaseStudySection = {
  id: CaseStudySectionId;
  title: string;
};

export type ChallengeDecision = {
  challenge: string;
  decision: string;
};

export type CaseStudyContent = {
  overview: {
    paragraphs: string[];
    layers: { name: string; role: string }[];
    flow: string;
  };
  architecture: {
    diagram: string;
    messaging: string;
    deploy: string;
  };
  challenges: ChallengeDecision[];
  impact: string[];
  next: string[];
};

export type CaseStudyMeta = {
  slug: string;
  title: string;
  timeline: string;
  role: string;
  stack: string[];
  image: string;
  content?: CaseStudyContent;
};

export const caseStudySections: CaseStudySection[] = [
  { id: "overview", title: "Overview" },
  { id: "architecture", title: "Architecture" },
  { id: "challenges", title: "Challenges & Decisions" },
  { id: "impact", title: "Impact" },
  { id: "next", title: "What's Next" },
];

const kafkaContent: CaseStudyContent = {
  overview: {
    paragraphs: [
      "An ERP connector platform that creates and syncs accounting entities — vendors, accounts, classes/segments, bills, payments, journal entries, and expenses — across QuickBooks Online, NetSuite, and Sage Intacct.",
      "The client application never calls ERP APIs directly. It goes through an auth gateway for OAuth connect, an orchestration backend for CRUD and sync, Kafka for async create/sync messaging, then an API gateway and per-entity microservices into each ERP.",
    ],
    layers: [
      {
        name: "Product surface",
        role: "React webapp, Auth Gateway (OAuth), orchestration backend (CRUD, sync, Kafka, Prisma/MySQL)",
      },
      {
        name: "ERP microservices",
        role: "Per-entity services behind an API Gateway, packaged with a Helm umbrella chart",
      },
      {
        name: "R&D workspace",
        role: "Live API research, evidence, and fixtures (not production)",
      },
      {
        name: "Cross-cutting docs",
        role: "Reference for Kafka flows and shared integration contracts",
      },
    ],
    flow: "React app → Auth Gateway (connect ERP) → Orchestration API → Kafka → ERP microservices → ERP APIs",
  },
  architecture: {
    diagram: `Webapp (React)
    │
    ▼
Auth Gateway  ──OAuth──► QuickBooks / NetSuite / Sage
    │
    ▼
Orchestration API        CRUD, sync, mappers, MySQL
    │
    ▼
Kafka                    Async create & sync messages
    │
    ▼
ERP microservices        account, vendor, bill, payment, …
    │                    Behind an API gateway
    ▼
ERP APIs                 QuickBooks · NetSuite · Sage Intacct`,
    messaging:
      "Kafka sits between the orchestration API and the ERP services. Creates and syncs are sent as messages on the bus; each service handles its own work and sends a result back. Connection and “sync now” events use the same pattern, so the React app never calls an ERP API directly.",
    deploy:
      "Independent Helm charts for auth vs orchestration; ERP microservices via an umbrella chart with env bifurcation across dev, staging, and prod.",
  },
  challenges: [
    {
      challenge: "Multi-ERP auth without coupling the UI to each OAuth flow",
      decision:
        "Provider factory on the Auth Gateway; single auth action endpoint with a provider header",
    },
    {
      challenge: "Isolate secrets and limit blast radius",
      decision:
        "Auth and orchestration on separate Kubernetes clusters with network policies",
    },
    {
      challenge: "Scale ERP work independently",
      decision:
        "Per-entity microservices + umbrella Helm; independent image deploys",
    },
    {
      challenge: "Async create/sync without blocking the app",
      decision:
        "Push create and sync work through Kafka so the UI stays responsive while ERP services process in the background",
    },
    {
      challenge: "Sage/NetSuite API quirks (segments, pagination, scopes)",
      decision:
        "Findings-first R&D with live scripts and evidence before production coding",
    },
    {
      challenge: "Sage custom/UDD segments",
      decision:
        "Explicitly out of scope; standard dimensions and class only",
    },
    {
      challenge: "Sage sync not finished",
      decision:
        "Fetch path live-verified; persistence, mappers, and Kafka sync still open",
    },
    {
      challenge: "Bill attachments (QBO)",
      decision:
        "Create bill first, then download from object storage and upload to QBO via an attachment factory",
    },
  ],
  impact: [
    "One connector stack for QuickBooks Online, NetSuite, and expanding Sage Intacct instead of one-off integrations.",
    "Clear separation so auth, orchestration, and ERP adapters can deploy and scale independently.",
    "Kafka provides durable async create and sync between the client application and ERPs.",
    "Dedicated ERP research shortens discovery and cuts rework on segments, query limits, and field mapping.",
    "Helm umbrella charts with env bifurcation support repeatable deploys across dev, staging, and prod.",
  ],
  next: [
    "Sage Intacct sync end-to-end — DB persistence, platform mappers, Kafka sync (fetch path already done).",
    "Broaden Sage create — vendor POST and other write paths still incomplete.",
    "More auth providers on the same Auth Gateway factory pattern (Xero / NetSuite / QBD).",
    "Harden ops — staging HPA patterns, metrics, and cluster separation as the default for prod.",
    "Keep ERP research findings current as implementation status changes.",
  ],
};

export const caseStudies: CaseStudyMeta[] = [
  {
    slug: "kafka-financial-integration",
    title: "Distributed Financial Data Integration",
    timeline: "Jul 2024",
    role: "Software Engineer – Full Stack",
    stack: [
      "TypeScript",
      "Apache Kafka",
      "MySQL",
      "React",
      "NetSuite",
      "QuickBooks Online",
      "Sage Intacct",
      "Kubernetes",
    ],
    image: "/exp-kafka.avif",
    content: kafkaContent,
  },
  {
    slug: "xero-excel-addin",
    title: "Xero Excel Reporting Add-in",
    timeline: "2024–2026",
    role: "Software Engineer – Full Stack",
    stack: ["React", "TypeScript", "Ant Design", "Office.js", "Xero API"],
    image: "/exp-xero-excel.webp",
  },
  {
    slug: "loyalty-program",
    title: "Loyalty Program Management",
    timeline: "2024–2026",
    role: "Software Engineer – Full Stack",
    stack: ["React", "TypeScript", "Mobile-first UI", "Figma"],
    image: "/exp-loyalty.webp",
  },
  {
    slug: "multi-platform-order-sync",
    title: "Multi-Platform Order Sync",
    timeline: "2024–2026",
    role: "Software Engineer – Full Stack",
    stack: ["TypeScript", "Xero", "HubSpot", "Linnworks"],
    image: "/exp-order-sync.webp",
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudyMeta | undefined {
  return caseStudies.find((study) => study.slug === slug);
}
