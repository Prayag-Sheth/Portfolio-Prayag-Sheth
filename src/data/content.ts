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
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
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
  "Docker",
  "MongoDB",
  "Prisma",
  "Azure OpenAI",
  "Python",
] as const;

export const services = [
  {
    date: "Jul 2024",
    title: "Distributed Financial Data Integration",
    description:
      "Kafka-driven pipeline synchronizing 7 core financial entity types across NetSuite and QuickBooks with resilient bidirectional mapping.",
    active: true,
    image: "/exp-kafka.png",
  },
  {
    date: "2024–2026",
    title: "Xero-Integrated Excel Add-in",
    description:
      "React, Ant Design & Office.js add-in for 50+ users — live P&L, Balance Sheet and Trial Balance in under 5 seconds.",
    active: false,
    image: "/exp-xero-excel.png",
  },
  {
    date: "2024–2026",
    title: "Loyalty Program Management",
    description:
      "Mobile-first loyalty platform (100+ Figma screens) covering hotel, flight booking and gift card redemption with points.",
    active: false,
    image: "/exp-loyalty.png",
  },
  {
    date: "2024–2026",
    title: "Multi-Platform Order Sync",
    description:
      "Unified ops layer for a UK skincare brand connecting Xero, HubSpot and Linnworks — 100+ orders/day with live status tracking.",
    active: false,
    image: "/exp-order-sync.png",
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

export const blogPosts = [
  {
    date: "Satva Technolabs",
    title: "Kafka Financial Integration Platform",
    excerpt:
      "Asynchronous Apache Kafka pipeline normalizing complex transactional payloads into a canonical internal format across NetSuite and QuickBooks.",
    image: "/project-kafka.png",
  },
  {
    date: "Satva Technolabs",
    title: "Xero Excel Reporting Add-in",
    excerpt:
      "Cut financial report generation from hours to seconds for 50+ in-house users with dynamic date ranges and automatic formatting.",
    image: "/project-xero-excel.png",
  },
  {
    date: "Smart India Hackathon",
    title: "Safety Wearable for Industrial Workers",
    excerpt:
      "SIH (G20 Azadi Ka Amrit Mahotsav) hackathon win — a 36-hour Zigbee prototype with real-time safety dashboards. A hardware side-project alongside my core full-stack integration work.",
    image: "/project-sih.png",
  },
] as const;

export const testimonials = [
  {
    quote:
      "TypeScript · JavaScript · Python · Node.js · Express.js · Flask · Apache Kafka · Event-Driven Architecture · REST APIs",
    name: "Backend & Architecture",
    role: "Core stack",
    avatar: "/skill-backend.png",
  },
  {
    quote:
      "React.js · TSX · Redux · Ant Design · Office.js · PostgreSQL · MongoDB · Prisma ORM · Docker · Git · Postman",
    name: "Frontend & DevOps",
    role: "Client & data layer",
    avatar: "/skill-frontend.png",
  },
  {
    quote:
      "Azure OpenAI · Groq API · LLM Integration · Prompt Engineering · AI Agents · Function Calling · RAG · Cursor AI · Claude Code · Codex · MS Power Automate",
    name: "AI & Automation",
    role: "LLM tooling",
    avatar: "/skill-ai.png",
  },
] as const;

export const images = {
  hero: "/hero2.webp",
  heroAvif: "/hero2.avif",
  heroMobile: "/hero2-960.webp",
  heroMobileAvif: "/hero2-960.avif",
  heroFallback: "/hero2.png",
  about: "/about-main.png",
  aboutThumb: "/about-sih-thumb.png",
  process: "/process-how-i-build.png",
  video: "/project-kafka.png",
} as const;

export const education = {
  degree: "B.Tech in Information and Communication Technology",
  diploma: "Diploma in ICT",
  school: "Marwadi University, Rajkot",
  cgpaDegree: "7.78",
  cgpaDiploma: "8.00",
} as const;
