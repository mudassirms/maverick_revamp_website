// src/config/services.js
import aiDrivenImage from "../assets/images/AI-service.png";
import enterpriseImage from "../assets/images/enterprise.png";

export const services = [
  {
    slug: "ai-driven-software-development",
    title: "AI-Driven Software Development",
    tagline: "AI-Driven Software Development",
    iconName: "rocket",
    accent: "mixed",
    shortDescription: "Applications engineered with AI built into the core, not bolted on.",
    description:
      "We leverage the power of AI to build intelligent, scalable and high-performance software solutions that turn ideas into real-world impact.",
    highlights: [
      "Custom AI model integration",
      "Production-ready architecture",
      "Scalable from MVP to enterprise",
      "Continuous iteration & support",
    ],
    features: [
      {
        title: "AI-Powered Development",
        description: "Write, review and optimize code with AI assistance.",
        iconName: "bolt",
      },
      {
        title: "Faster Delivery",
        description: "Reduce development cycles and ship sooner.",
        iconName: "sync",
      },
      {
        title: "Smarter Solutions",
        description: "Build systems that learn, adapt and grow.",
        iconName: "rocket",
      },
      {
        title: "Higher Quality",
        description: "Cleaner code, fewer bugs, more reliability.",
        iconName: "shield",
      },
    ],
    badges: ["Python", "React", "Node.js", "Database", "Cloud"],
    image: aiDrivenImage,
  },
  {
    slug: "enterprise-software-development",
    title: "Enterprise Software Development",
    tagline: "Scalable · Secure · Future-Ready",
    iconName: "data",
    accent: "deep",
    shortDescription: "Robust, secure-by-design systems for the demands of modern enterprises.",
    description:
      "We build robust, scalable and secure enterprise solutions that streamline operations, improve productivity and drive long-term growth.",
    highlights: [],
    features: [
      {
        title: "Secure & Reliable",
        description: "Enterprise-grade security and data protection.",
        iconName: "shield",
      },
      {
        title: "Scalable Architecture",
        description: "Built to grow with your business.",
        iconName: "layers",
      },
      {
        title: "Custom Solutions",
        description: "Tailored to your unique business needs.",
        iconName: "puzzle",
      },
      {
        title: "Seamless Integration",
        description: "Connect with your existing tools and systems.",
        iconName: "bolt",
      },
      {
        title: "Better Collaboration",
        description: "Enable teams, departments and partners.",
        iconName: "users",
      },
      {
        title: "Data-Driven Decisions",
        description: "Turn data into real business value.",
        iconName: "chart",
      },
    ],
    badges: ["CRM", "ERP", "HR Management", "Finance", "Analytics", "Inventory"],
    image: enterpriseImage,
  },
  {
    slug: "data-engineering-analytics",
    title: "Data Engineering & Analytics",
    tagline: "Business Intelligence",
    iconName: "pulse",
    accent: "bright",
    shortDescription: "Raw, scattered data turned into business intelligence you can act on.",
    description:
      "We turn raw, scattered data into business intelligence you can act on, with pipelines built for scale.",
    highlights: [],
    features: [
      {
        title: "Unified Pipelines",
        description: "Every data source flowing into one clean, reliable pipeline.",
        iconName: "sync",
      },
      {
        title: "Real-Time Analytics",
        description: "Dashboards and trends that update as your business moves.",
        iconName: "chart",
      },
      {
        title: "Built to Scale",
        description: "Architecture that keeps up as your data volume grows.",
        iconName: "layers",
      },
    ],
    badges: ["ETL", "Dashboards", "Warehousing"],
    image: null,
  },
  {
    slug: "database-management-optimization",
    title: "Database Management & Smart Optimization",
    tagline: "More Ways We Help",
    iconName: "data",
    accent: "deep",
    shortDescription: "Secure, high-performance data systems tuned with AI-enhanced optimization.",
    description: "Secure, high-performance data systems tuned with AI-enhanced optimization.",
    highlights: [],
    features: [
      {
        title: "AI-Tuned Performance",
        description: "Query and index optimization that adapts to real usage patterns.",
        iconName: "bolt",
      },
      {
        title: "Hardened Security",
        description: "Access control and encryption built in from day one.",
        iconName: "shield",
      },
      {
        title: "Proactive Monitoring",
        description: "Catch bottlenecks and failures before they hit production.",
        iconName: "chart",
      },
    ],
    badges: ["PostgreSQL", "MySQL", "Redis"],
    image: null,
  },
  {
    slug: "system-integration-api-engineering",
    title: "System Integration & API Engineering",
    tagline: "More Ways We Help",
    iconName: "sync",
    accent: "bright",
    shortDescription: "Every tool and platform you use, connected into one seamless ecosystem.",
    description: "We connect your tools and platforms into one seamless, unified ecosystem.",
    highlights: [],
    features: [
      {
        title: "Unified Ecosystem",
        description: "Every platform you rely on, talking to each other.",
        iconName: "puzzle",
      },
      {
        title: "Reliable APIs",
        description: "Well-documented, versioned APIs built to last.",
        iconName: "bolt",
      },
      {
        title: "Zero Data Silos",
        description: "Information flows where it's needed, automatically.",
        iconName: "layers",
      },
    ],
    badges: ["REST", "Webhooks", "GraphQL"],
    image: null,
  },
  {
    slug: "full-cycle-product-development",
    title: "Full-Cycle Product Development",
    tagline: "More Ways We Help",
    iconName: "rocket",
    accent: "deep",
    shortDescription: "From first idea to MVP to enterprise-grade product, carried the whole way.",
    description: "From first idea to MVP to enterprise-grade product — we carry it the whole way.",
    highlights: [],
    features: [
      {
        title: "Idea to MVP",
        description: "Fast, focused builds that validate the idea first.",
        iconName: "bolt",
      },
      {
        title: "Built to Grow",
        description: "Architecture that scales from first user to enterprise.",
        iconName: "layers",
      },
      {
        title: "Ongoing Partnership",
        description: "We stay on for iteration, not just the initial launch.",
        iconName: "users",
      },
    ],
    badges: ["Discovery", "MVP", "Scale"],
    image: null,
  },
];

export const getServiceBySlug = (slug) => services.find((s) => s.slug === slug);
export const getRelatedServices = (slug, count = 2) =>
  services.filter((s) => s.slug !== slug).slice(0, count);