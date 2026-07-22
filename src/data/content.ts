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
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
  },
  {
    date: "2024–2026",
    title: "Xero-Integrated Excel Add-in",
    description:
      "React, Ant Design & Office.js add-in for 50+ users — live P&L, Balance Sheet and Trial Balance in under 5 seconds.",
    active: false,
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
  },
  {
    date: "2024–2026",
    title: "Loyalty Program Management",
    description:
      "Mobile-first loyalty platform (100+ Figma screens) covering hotel, flight booking and gift card redemption with points.",
    active: false,
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80",
  },
  {
    date: "2024–2026",
    title: "Multi-Platform Order Sync",
    description:
      "Unified ops layer for a UK skincare brand connecting Xero, HubSpot and Linnworks — 100+ orders/day with live status tracking.",
    active: false,
    image:
      "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=600&q=80",
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
    date: "Smart India Hackathon",
    title: "Safety Wearable for Industrial Workers",
    excerpt:
      "Zigbee-based wearable to monitor worker safety in high-risk environments, with dashboards for real-time alerts and risk tracking. SIH (G20 Azadi Ka Amrit Mahotsav) winner.",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
  },
  {
    date: "Satva Technolabs",
    title: "Kafka Financial Integration Platform",
    excerpt:
      "Asynchronous Apache Kafka pipeline normalizing complex transactional payloads into a canonical internal format across NetSuite and QuickBooks.",
    image:
      "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&q=80",
  },
  {
    date: "Satva Technolabs",
    title: "Xero Excel Reporting Add-in",
    excerpt:
      "Cut financial report generation from hours to seconds for 50+ in-house users with dynamic date ranges and automatic formatting.",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
  },
] as const;

export const testimonials = [
  {
    quote:
      "TypeScript · JavaScript · Python · Node.js · Express.js · Flask · Apache Kafka · Event-Driven Architecture · REST APIs",
    name: "Backend & Architecture",
    role: "Core stack",
    avatar:
      "https://images.unsplash.com/photo-1558494949-ef526b394bb8?w=120&q=80",
  },
  {
    quote:
      "React.js · TSX · Redux · Ant Design · Office.js · PostgreSQL · MongoDB · Prisma ORM · Docker · Git · Postman",
    name: "Frontend & DevOps",
    role: "Client & data layer",
    avatar:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=120&q=80",
  },
  {
    quote:
      "Azure OpenAI · Groq API · LLM Integration · Prompt Engineering · AI Agents · Function Calling · RAG · Cursor AI · Claude Code · Codex · MS Power Automate",
    name: "AI & Automation",
    role: "LLM tooling",
    avatar:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=120&q=80",
  },
] as const;

export const images = {
  hero: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1600&q=80",
  about:
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&q=80",
  aboutThumb:
    "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=200&q=80",
  process:
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&q=80",
  video:
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1400&q=80",
} as const;

export const education = {
  degree: "B.Tech in Information and Communication Technology",
  diploma: "Diploma in ICT",
  school: "Marwadi University, Rajkot",
  cgpaDegree: "7.78",
  cgpaDiploma: "8.00",
} as const;
