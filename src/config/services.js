// src/config/services.js
import aiDrivenImage from "../assets/images/AI-service.png";
import enterpriseImage from "../assets/images/enterprise.png";

export const services = [
  {
    slug: "ai-driven-software-development",
    title: "AI-Driven Software Development",
    tagline: "AI built into the core",
    iconName: "rocket",
    accent: "mixed",

    shortDescription:
      "Applications engineered with AI built into the core, not bolted on.",

    description:
      "We leverage the power of AI to build intelligent, scalable and high-performance software solutions that turn ideas into real-world impact.",

    stats: [
      { value: "6 weeks", label: "Idea to working MVP" },
      { value: "2×", label: "Faster delivery cycles" },
      { value: "40%", label: "Less rework" },
      { value: "100%", label: "Code reviewed" },
    ],

    highlights: [
      "Custom AI model integration",
      "Production-ready architecture",
      "Scalable from MVP to enterprise",
      "Continuous iteration & support",
    ],

    processNote:
      "Four stages, each ending in something you can click, not just a document.",

    process: [
      {
        title: "Frame the problem",
        description:
          "We work out what the software has to decide, not just what it has to display.",
      },
      {
        title: "Prototype the intelligence",
        description:
          "The AI piece gets tested against your real data before we build around it.",
      },
      {
        title: "Build for production",
        description:
          "Architecture, monitoring, and fallbacks designed for the day the model is wrong.",
      },
      {
        title: "Ship and iterate",
        description:
          "We stay on after launch to tune behaviour against how people actually use it.",
      },
    ],

    useCases: [
      "Automating a process that currently needs a human to read something",
      "Adding natural-language search to an existing product",
      "Document extraction and classification at volume",
      "Recommendation and ranking inside an existing app",
      "Internal copilots trained on company knowledge",
      "Replacing rules engines that have grown unmaintainable",
    ],

    outcomeQuote:
      "It does the reading we used to do, and it explains why it decided what it decided.",

    features: [
      {
        title: "AI-powered development",
        description:
          "We use AI across writing, reviewing and optimizing code, so more of the team's time goes to the parts that need judgement.",
        iconName: "bolt",
      },
      {
        title: "Faster delivery",
        description:
          "Shorter development cycles mean you see working software early enough to change your mind about it.",
        iconName: "sync",
      },
      {
        title: "Smarter solutions",
        description:
          "Systems that learn from use and adapt, rather than needing a new release for every new rule.",
        iconName: "rocket",
      },
      {
        title: "Higher quality",
        description:
          "Cleaner code, fewer defects and more reliability, backed by review at every stage rather than at the end.",
        iconName: "shield",
      },
    ],

    badges: ["Python", "React", "Node.js", "Database", "Cloud"],
    caseStudies: [],
    image: aiDrivenImage,
  },

  {
    slug: "enterprise-software-development",
    title: "Enterprise Software Development",
    tagline: "Scalable · secure · future-ready",
    iconName: "data",
    accent: "deep",

    shortDescription:
      "Robust, secure-by-design systems for the demands of modern enterprises.",

    description:
      "We build robust, scalable and secure enterprise solutions that streamline operations, improve productivity and drive long-term growth.",

    stats: [
      { value: "99.9%", label: "Uptime target" },
      { value: "6", label: "Core modules" },
      { value: "0", label: "Vendor lock-in" },
      { value: "24/7", label: "Support window" },
    ],

    highlights: [
      "Security and access control designed in from day one",
      "Architecture that scales with headcount and data",
      "Integrates with the systems you already run",
      "Handover, documentation and training included",
    ],

    processNote:
      "Enterprise work lives or dies on the discovery stage, so that's where we spend the most time.",

    process: [
      {
        title: "Map the operation",
        description:
          "We sit with the teams who'll use it and document how the work happens today.",
      },
      {
        title: "Design the system",
        description:
          "Data model, permissions, and integration points agreed before a line is written.",
      },
      {
        title: "Build in slices",
        description:
          "One working module at a time, in production, rather than a single launch at the end.",
      },
      {
        title: "Roll out and hand over",
        description:
          "Training, documentation, and a support window while your team takes the wheel.",
      },
    ],

    useCases: [
      "Replacing a patchwork of spreadsheets with one system of record",
      "Custom CRM or ERP where off-the-shelf doesn't fit the process",
      "Workforce, inventory or finance operations at multi-site scale",
      "Consolidating systems after a merger or acquisition",
      "Compliance-heavy workflows that need an audit trail",
      "Internal portals serving several departments at once",
    ],

    outcomeQuote:
      "Four systems became one, and the monthly close stopped being a week-long argument.",

    features: [
      {
        title: "Secure and reliable",
        description:
          "Enterprise-grade security and data protection, with access control modelled on your actual org chart.",
        iconName: "shield",
      },
      {
        title: "Scalable architecture",
        description:
          "Built to grow with the business, so the system that serves fifty people still serves five thousand.",
        iconName: "layers",
      },
      {
        title: "Custom solutions",
        description:
          "Tailored to how your business actually runs, instead of bending your process to fit a product.",
        iconName: "puzzle",
      },
      {
        title: "Seamless integration",
        description:
          "Connects with the tools and systems you already depend on, rather than replacing all of them at once.",
        iconName: "bolt",
      },
      {
        title: "Better collaboration",
        description:
          "Teams, departments and external partners working from the same data at the same time.",
        iconName: "users",
      },
      {
        title: "Data-driven decisions",
        description:
          "Reporting built into the system, so the numbers leadership sees come from the work itself.",
        iconName: "chart",
      },
    ],

    badges: ["CRM", "ERP", "HR management", "Finance", "Analytics", "Inventory"],
    caseStudies: [],
    image: enterpriseImage,
  },

  {
    slug: "data-engineering-analytics",
    title: "Data Engineering & Analytics",
    tagline: "Business intelligence",
    iconName: "pulse",
    accent: "bright",

    shortDescription:
      "Raw, scattered data turned into business intelligence you can act on.",

    description:
      "We turn raw, scattered data into business intelligence you can act on, with pipelines built for scale.",

    stats: [
      { value: "12+", label: "Sources unified" },
      { value: "4×", label: "Faster reporting" },
      { value: "Daily", label: "Refresh cadence" },
      { value: "1", label: "Source of truth" },
    ],

    highlights: [
      "Every source flowing into one reliable pipeline",
      "Dashboards non-technical teams can actually read",
      "Historical data cleaned, not just the new stuff",
      "Alerting when the numbers move, not just when you look",
    ],

    processNote:
      "We start from the decision you want to make, then work backwards to the data that supports it.",

    process: [
      {
        title: "Audit the sources",
        description:
          "Find everything that holds data today, including the spreadsheets nobody mentions.",
      },
      {
        title: "Build the pipeline",
        description:
          "Ingestion, cleaning and transformation, with checks that catch bad data early.",
      },
      {
        title: "Model for questions",
        description:
          "Structure the warehouse around the questions the business asks, not the schema of the source.",
      },
      {
        title: "Put it on screen",
        description:
          "Dashboards and alerts that go to the people who act on them.",
      },
    ],

    useCases: [
      "Monthly reporting that currently takes days of manual work",
      "Data spread across several tools with no single view",
      "Migrating off legacy reporting onto a modern warehouse",
      "Operational dashboards for leadership and floor teams",
      "Data quality problems nobody can trace to a source",
      "Preparing a clean dataset before any AI work begins",
    ],

    outcomeQuote:
      "The monthly report now builds itself, and everyone finally quotes the same number.",

    features: [
      {
        title: "Unified pipelines",
        description:
          "Every data source flowing into one clean, reliable pipeline, with failures surfaced rather than silently swallowed.",
        iconName: "sync",
      },
      {
        title: "Real-time analytics",
        description:
          "Dashboards and trends that update as your business moves, so decisions aren't made on last month's picture.",
        iconName: "chart",
      },
      {
        title: "Built to scale",
        description:
          "Architecture that keeps up as volume grows, without a rewrite every time the business doubles.",
        iconName: "layers",
      },
    ],

    badges: ["ETL", "Dashboards", "Warehousing"],
    caseStudies: [],
    image: null,
  },

  {
    slug: "database-management-optimization",
    title: "Database Management & Smart Optimization",
    tagline: "Performance and safety",
    iconName: "data",
    accent: "deep",

    shortDescription:
      "Secure, high-performance data systems tuned with AI-enhanced optimization.",

    description:
      "Secure, high-performance data systems tuned with AI-enhanced optimization, so the database stops being the reason things are slow.",

    stats: [
      { value: "70%", label: "Query time cut" },
      { value: "24/7", label: "Monitoring" },
      { value: "0", label: "Unplanned downtime target" },
      { value: "15min", label: "Recovery objective" },
    ],

    highlights: [
      "Query and index tuning against real traffic",
      "Encryption and access control reviewed end to end",
      "Backup and restore tested, not just configured",
      "Monitoring that pages someone before users notice",
    ],

    processNote:
      "We measure before we touch anything, so every change has a number attached to it.",

    process: [
      {
        title: "Profile the load",
        description:
          "Capture real query patterns instead of guessing at what's slow.",
      },
      {
        title: "Tune and index",
        description:
          "Targeted schema and index changes, benchmarked against the captured load.",
      },
      {
        title: "Harden access",
        description:
          "Encryption, roles and least-privilege access reviewed across every connection.",
      },
      {
        title: "Instrument and watch",
        description:
          "Dashboards and alerts so the next bottleneck is caught before it lands.",
      },
    ],

    useCases: [
      "An application that has slowed down as data has grown",
      "Databases that have never had a security review",
      "Migrating between engines or to managed cloud hosting",
      "Backup strategies that have never actually been restored",
      "Scaling reads for a product with spiky traffic",
      "Cleaning up schemas after years of incremental change",
    ],

    outcomeQuote:
      "The page that used to time out now loads before you've let go of the mouse.",

    features: [
      {
        title: "AI-tuned performance",
        description:
          "Query and index optimization that adapts to real usage patterns instead of assumptions made at design time.",
        iconName: "bolt",
      },
      {
        title: "Hardened security",
        description:
          "Access control and encryption built in from day one, with permissions that match who actually needs the data.",
        iconName: "shield",
      },
      {
        title: "Proactive monitoring",
        description:
          "Bottlenecks and failures caught before they reach production, with alerts that go to a person rather than a log file.",
        iconName: "chart",
      },
    ],

    badges: ["PostgreSQL", "MySQL", "Redis"],
    caseStudies: [],
    image: null,
  },

  {
    slug: "system-integration-api-engineering",
    title: "System Integration & API Engineering",
    tagline: "One connected ecosystem",
    iconName: "sync",
    accent: "bright",

    shortDescription:
      "Every tool and platform you use, connected into one seamless ecosystem.",

    description:
      "We connect your tools and platforms into one seamless, unified ecosystem, so data stops being re-typed between systems.",

    stats: [
      { value: "1", label: "Integration layer" },
      { value: "100%", label: "Calls logged" },
      { value: "0", label: "Manual re-entry" },
      { value: "3", label: "Retry strategies" },
    ],

    highlights: [
      "Documented, versioned APIs your team can build on",
      "Retries and fallbacks for when a third party is down",
      "Webhooks and events instead of nightly batch jobs",
      "One place to see what called what, and when",
    ],

    processNote:
      "Integrations fail at the edges, so most of the work goes into what happens when something doesn't respond.",

    process: [
      {
        title: "Chart the systems",
        description:
          "Every platform, every handoff, and every place data is currently copied by hand.",
      },
      {
        title: "Design the contract",
        description:
          "API shape, auth, versioning and error behaviour agreed before implementation.",
      },
      {
        title: "Build and harden",
        description:
          "Retries, idempotency and fallbacks so a third-party outage isn't your outage.",
      },
      {
        title: "Observe in production",
        description:
          "Logging and alerting on every integration point, with a clear trail to debug from.",
      },
    ],

    useCases: [
      "Data being copied by hand between two systems every day",
      "Connecting a new SaaS tool to your existing stack",
      "Exposing an API so partners can build against your product",
      "Replacing brittle nightly batch jobs with real-time events",
      "Payment, messaging or logistics providers that need swapping out",
      "Legacy systems that have to stay but need to talk to new ones",
    ],

    outcomeQuote:
      "Orders land in three systems at once now, and nobody re-types anything.",

    features: [
      {
        title: "Unified ecosystem",
        description:
          "Every platform you rely on talking to the others, so a change in one place shows up everywhere it matters.",
        iconName: "puzzle",
      },
      {
        title: "Reliable APIs",
        description:
          "Well-documented, versioned APIs built to last, so upgrading one service doesn't break three others.",
        iconName: "bolt",
      },
      {
        title: "Zero data silos",
        description:
          "Information flows where it's needed automatically, instead of waiting for someone to export a file.",
        iconName: "layers",
      },
    ],

    badges: ["REST", "Webhooks", "GraphQL"],
    caseStudies: [],
    image: null,
  },

  {
    slug: "full-cycle-product-development",
    title: "Full-Cycle Product Development",
    tagline: "Idea to shipped product",
    iconName: "rocket",
    accent: "deep",

    shortDescription:
      "From first idea to MVP to enterprise-grade product, carried the whole way.",

    description:
      "From first idea to MVP to enterprise-grade product — we carry it the whole way, including the unglamorous parts after launch.",

    stats: [
      { value: "8 weeks", label: "Typical MVP" },
      { value: "2", label: "Week sprint cycle" },
      { value: "1", label: "Team, start to finish" },
      { value: "100%", label: "Code ownership yours" },
    ],

    highlights: [
      "Discovery that ends with a scope you can price",
      "An MVP real users can try, not a clickable mockup",
      "The same team from first sketch to production",
      "Ongoing iteration after launch, not a handover email",
    ],

    processNote:
      "Most of the risk sits in the first two weeks, so that's where the sharpest questions get asked.",

    process: [
      {
        title: "Discovery",
        description:
          "Users, constraints and the one thing the product must do better than the alternative.",
      },
      {
        title: "MVP",
        description:
          "The smallest build that proves the idea with real users and real data.",
      },
      {
        title: "Scale",
        description:
          "Architecture, performance and security hardened once the idea has earned it.",
      },
      {
        title: "Iterate",
        description:
          "Continuous releases driven by how people actually use what you shipped.",
      },
    ],

    useCases: [
      "A founder with an idea and no technical team yet",
      "An internal tool that needs to become a real product",
      "Validating a new line of business before hiring for it",
      "Rebuilding a product that has outgrown its first version",
      "Adding a digital product alongside an existing service business",
      "Taking a proof of concept from a hackathon into production",
    ],

    outcomeQuote:
      "We went from a whiteboard sketch to paying users without hiring a single engineer.",

    features: [
      {
        title: "Idea to MVP",
        description:
          "Fast, focused builds that validate the idea first, so you learn whether it works before spending like it does.",
        iconName: "bolt",
      },
      {
        title: "Built to grow",
        description:
          "Architecture that scales from the first user to enterprise load, without a rewrite at every milestone.",
        iconName: "layers",
      },
      {
        title: "Ongoing partnership",
        description:
          "We stay on for iteration rather than disappearing at launch, because that's when the real feedback starts.",
        iconName: "users",
      },
    ],

    badges: ["Discovery", "MVP", "Scale"],
    caseStudies: [],
    image: null,
  },
];

export const getServiceBySlug = (slug) => services.find((s) => s.slug === slug);

export const getRelatedServices = (slug, count = 2) =>
  services.filter((s) => s.slug !== slug).slice(0, count);