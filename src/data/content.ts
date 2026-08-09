export const profile = {
  name: "Prayag Sheth",
  title: "Full-Stack Developer",
  email: "prayagsheth94@gmail.com",
  phone: "+91-99091-22514",
  location: "Ahmedabad, Gujarat, India",
  github: "https://github.com/Prayag-Sheth",
  linkedin: "https://www.linkedin.com/in/prayag-s-75426716b",
  resumeUrl: "/Prayag-Sheth-SDE-Resume.pdf",
  company: "Satva Technolabs Private Limited",
} as const;

export const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Projects", href: "/#projects" },
  { label: "Skills", href: "/#skills" },
] as const;

export const stats = [
  { value: "2+", label: "Years Experience", icon: "briefcase" },
  { value: "4", label: "Platforms Shipped", icon: "growth" },
  { value: "<5s", label: "Report Retrieval", icon: "heart" },
  { value: "SIH", label: "Hackathon Winner", icon: "users" },
] as const;

export const partners = [
  "TypeScript",
  "Node.js",
  "Apache Kafka",
  "React.js",
  "PostgreSQL",
  "MySQL",
  "Docker",
  "MongoDB",
  "Prisma",
  "Azure OpenAI",
  "Python",
] as const;

export const services = [
  {
    slug: "kafka-financial-integration",
    date: "Jul 2024",
    title: "Distributed Financial Data Integration",
    description:
      "Bidirectional Kafka-based multi-ERP integration platform — the client app never calls QuickBooks or NetSuite directly. Unified request/response topics drive outbound entity creates and inbound master-data sync across an orchestration layer, ERP microservices, and a separate auth path, with validate → map → persist → audit on the middle tier.",
    active: true,
    image: "/exp-kafka.avif",
  },
  {
    slug: "xero-excel-addin",
    date: "2024–2026",
    title: "Xero Excel Reporting Add-in",
    description:
      "React, Ant Design & Office.js add-in for 50+ users — live P&L, Balance Sheet and Trial Balance in under 5 seconds.",
    active: false,
    image: "/exp-xero-excel.webp",
  },
  {
    slug: "loyalty-program",
    date: "2024–2026",
    title: "Loyalty Program Management",
    description:
      "Mobile-first loyalty platform (100+ Figma screens) covering hotel, flight booking and gift card redemption with points.",
    active: false,
    image: "/exp-loyalty.webp",
  },
  {
    slug: "multi-platform-order-sync",
    date: "2024–2026",
    title: "Multi-Platform Order Sync",
    description:
      "Unified ops layer for a UK skincare brand connecting Xero, HubSpot and Linnworks — 100+ orders/day with live status tracking.",
    active: false,
    image: "/exp-order-sync.webp",
  },
] as const;

export const processSteps = [
  {
    title: "Understand requirements and data flows",
    body: "",
    expanded: false,
  },
  {
    title: "Architect event-driven, reliable systems",
    body: "",
    expanded: false,
  },
  {
    title: "Develop",
    body: "I build production TypeScript backends, Kafka integrations, and React clients — containerized with Docker — so enterprise data moves reliably from hours-long jobs to near-instant results.",
    expanded: true,
  },
] as const;

export type ProjectLink = {
  label: string;
  href: string;
};

export const blogPosts = [
  {
    date: "Smart India Hackathon",
    title: "Safety Wearable for Industrial Workers",
    excerpt:
      "SIH (G20 Azadi Ka Amrit Mahotsav) hackathon win — a 36-hour Zigbee prototype with real-time safety dashboards. A hardware side-project alongside my core full-stack integration work.",
    image: "/project-sih.webp",
    badge: null as string | null,
    tech: null as string | null,
    links: null as ProjectLink[] | null,
  },
  {
    date: "Personal Project",
    title: "Deterministic Insights",
    excerpt:
      "Client interaction intelligence platform — staff log meeting transcripts; an LLM layer classifies sentiment and extracts follow-up action items. Born as a 48-hour assessment; now evolving toward multi-tenant SaaS with invites, A/V transcripts, and RAG. Dockerized with images on Docker Hub.",
    image: "/skill-ai.webp",
    badge: "Deployed · Ongoing",
    tech: "Python · FastAPI · PostgreSQL · Redis · Groq LLM · Docker · Next.js",
    links: [
      {
        label: "GitHub · Backend",
        href: "https://github.com/Prayag-Sheth/deterministic_insights_backend",
      },
      {
        label: "GitHub · Frontend",
        href: "https://github.com/Prayag-Sheth/deterministic_insights_frontend",
      },
    ] as ProjectLink[],
  },
] as const;

export const testimonials = [
  {
    quote:
      "TypeScript · JavaScript · Python · Node.js · Express.js · Flask · Apache Kafka · Event-Driven Architecture · REST APIs · MySQL",
    name: "Backend & Architecture",
    role: "Core stack",
    avatar: "/skill-backend.svg",
  },
  {
    quote:
      "React.js · TSX · Redux · Ant Design · Office.js · PostgreSQL · MySQL · MongoDB · Prisma ORM · Docker · Git · Postman",
    name: "Frontend & DevOps",
    role: "Client & data layer",
    avatar: "/skill-frontend.svg",
  },
  {
    quote:
      "Azure OpenAI · Groq API · LLM Integration · Prompt Engineering · AI Agents · Function Calling · RAG · Cursor AI · Claude Code · Codex · MS Power Automate",
    name: "AI & Automation",
    role: "LLM tooling",
    avatar: "/skill-ai.svg",
  },
] as const;

export const images = {
  hero: "/hero2.webp",
  heroAvif: "/hero2.avif",
  heroMobile: "/hero2-mobile.webp",
  heroMobileAvif: "/hero2-mobile.avif",
  heroFallback: "/hero2.png",
  about: "/about-main.webp",
  aboutThumb: "/about-sih-thumb.webp",
  process: "/process-how-i-build.webp",
  video: "/project-kafka.webp",
} as const;

export const education = {
  degree: "B.Tech in Information and Communication Technology",
  diploma: "Diploma in ICT",
  school: "Marwadi University, Rajkot",
  cgpaDegree: "7.78",
  cgpaDiploma: "8.00",
} as const;
