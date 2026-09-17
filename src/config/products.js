import dataSenseScreenshot from "../assets/images/datasense.png";
import supportSenseScreenshot from "../assets/images/supportsense.png";
import maverickdine from "../assets/images/maverickdine.webp";
import maverickhr_logo from "../assets/images/maverickhr_logo.png";

// Product Logos
import datasense_logo from "../assets/images/datasense_logo.png";
import supportsense_logo from "../assets/images/supportlogo.png";
import maverickdine_logo from "../assets/images/maverick_dine.webp";
import maverickhr from "../assets/images/maverickhr.png";

import schoolManagement_logo from "../assets/images/maverick-logo.png";
import learningManagement_logo from "../assets/images/maverick-logo.png";

export const products = [
  {
    slug: "datasense",
    title: "DataSense",
    tagline: "AI-powered business data insights",
    icon: datasense_logo,
    accent: "red",

    shortDescription:
      "Turns scattered business data into clear, actionable insight.",

    description:
      "Turns your scattered business data into clear, actionable insight — surfacing the trends that matter without the manual digging. Ask it anything about your school, staff, or students in plain English and get an instant answer.",

    techStack: ["React", "AI insights", "Unified data", "Live analytics"],

    stats: [
      { value: "4×", label: "Faster reporting" },
      { value: "12", label: "Connected sources" },
      { value: "94%", label: "Insight confidence" },
      { value: "40h", label: "Saved each month" },
    ],

    challengeTitle: "Decisions were buried in busywork",
    challenge:
      "Teams spent hours reconciling disconnected spreadsheets before they could even begin to understand what had changed.",

    solutionTitle: "Answers arrive with the question",
    solution:
      "DataSense connects existing sources, detects meaningful movement, and explains it in language every team can act on.",

    howItWorksNote:
      "A connected intelligence layer that makes complex operational data feel direct and usable.",

    outcomeQuote:
      "A clear answer now takes seconds — not another spreadsheet, meeting, or week.",

    highlights: [
      "Automated trend surfacing across sources",
      "No manual spreadsheet digging",
      "Plugs into your existing data stack",
      "Dashboards built for non-technical teams",
    ],

    capabilities: [
      {
        title: "Connect what already exists",
        description:
          "Bring every source into one reliable view without rebuilding your current data stack.",
        iconName: "sync",
      },
      {
        title: "Detect what changed",
        description:
          "Surface the patterns, anomalies, and causes that deserve attention before they are missed.",
        iconName: "pulse",
      },
      {
        title: "Ask in plain English",
        description:
          "Turn a business question into a clear, cited answer without waiting for a custom report.",
        iconName: "chat",
      },
    ],

    features: [
      {
        title: "Unified data ingestion",
        description: "Connect every source you already use — no migration required.",
        iconName: "sync",
      },
      {
        title: "Trend detection",
        description:
          "Surfaces what's changed and why, instead of raw charts you have to interpret yourself.",
        iconName: "pulse",
      },
    ],

    screenshot: dataSenseScreenshot,
    gallery: [],
    liveUrl: null,
  },

  {
    slug: "supportsense",
    title: "SupportSense",
    tagline: "Smart support assistant",
    icon: supportsense_logo,
    accent: "gold",

    shortDescription:
      "A support assistant trained on your own business knowledge.",

    description:
      "A support assistant trained on your own business knowledge, answering customers instantly instead of routing everything to a queue.",

    techStack: ["React", "RAG", "Knowledge base", "Live handoff"],

    stats: [
      { value: "68%", label: "Tickets deflected" },
      { value: "9s", label: "Median first reply" },
      { value: "24/7", label: "Coverage" },
      { value: "5 days", label: "Time to launch" },
    ],

    challengeTitle: "Every question became a ticket",
    challenge:
      "Support teams answered the same handful of questions all day, so the genuinely hard cases waited in the same queue as the easy ones.",

    solutionTitle: "Your own knowledge, on call",
    solution:
      "SupportSense reads your existing documentation and answers from it directly, escalating to a person the moment it isn't confident.",

    howItWorksNote:
      "Trained on what your business already knows, so answers sound like your team rather than a generic bot.",

    outcomeQuote:
      "Customers get an answer while they're still on the page, not the next morning.",

    highlights: [
      "Trained on your docs, not generic data",
      "Deflects repetitive tickets automatically",
      "Escalates to a human when it's unsure",
      "Live in days, not months",
    ],

    capabilities: [
      {
        title: "Learn from your documentation",
        description:
          "Point it at the help centre, policies, and product notes you already maintain.",
        iconName: "sync",
      },
      {
        title: "Answer with a source",
        description:
          "Every reply links back to the page it came from, so customers and agents can verify it.",
        iconName: "chat",
      },
      {
        title: "Hand over cleanly",
        description:
          "Low-confidence conversations move to a person with the full thread attached.",
        iconName: "mail",
      },
    ],

    features: [],

    screenshot: supportSenseScreenshot,
    gallery: [],
    liveUrl: null,
  },

  {
    slug: "maverickdine",
    title: "MaverickDine",
    tagline: "Restaurant & dining operations platform",
    icon: maverickdine_logo,
    accent: "gold",

    shortDescription:
      "A live restaurant platform — POS, menus, and tables in one place.",

    description:
      "MaverickDine brings point-of-sale, menu management, table setup, and order flow into a single connected platform, built for real restaurant operations. It's a live product — take a look for yourself.",

    techStack: ["React", "POS", "Real-time orders", "Multi-location"],

    stats: [
      { value: "3", label: "Service modes" },
      { value: "100%", label: "Orders tracked live" },
      { value: "1", label: "System per group" },
      { value: "0", label: "Paper tickets" },
    ],

    challengeTitle: "Four tools for one dinner service",
    challenge:
      "Menus lived in one system, tables in another, and orders in a third — so nothing matched once service got busy.",

    solutionTitle: "One floor, one system",
    solution:
      "Dine-in, takeaway, and delivery run through the same order flow, with menus and tables managed from the same place.",

    howItWorksNote:
      "Built around how a service actually runs, from the first table seated to the last payment closed.",

    outcomeQuote:
      "The floor, the kitchen, and the till finally agree on what was ordered.",

    highlights: [
      "Multi-mode POS: dine-in, takeaway, delivery",
      "Live menu & table management",
      "Order and payment tracking in real time",
      "Built for multi-location restaurant groups",
    ],

    capabilities: [
      {
        title: "Set up the floor",
        description:
          "Define sections, tables, and capacity, then change them without calling support.",
        iconName: "sync",
      },
      {
        title: "Run the order",
        description:
          "Take dine-in, takeaway, and delivery orders through a single till with live status.",
        iconName: "pulse",
      },
      {
        title: "Close and reconcile",
        description:
          "Payments, discounts, and totals land against the right table and the right shift.",
        iconName: "sms",
      },
    ],

    features: [],

    screenshot: maverickdine,
    gallery: [],
    liveUrl: "https://maverickdine.com/",
  },

  {
    slug: "maverickhr",
    title: "MaverickHR",
    tagline: "Enterprise workforce & project execution platform",
    icon: maverickhr_logo,
    accent: "gold",

    shortDescription:
      "A unified workforce platform for employee management, attendance, projects, and organizational operations.",

    description:
      "MaverickHR brings workforce management and project execution into one connected platform, helping organizations manage employees, attendance, teams, projects, tasks, and day-to-day operations from a single system. Built for modern enterprises, it provides a centralized view of people, work, and organizational performance.",

    techStack: ["React", "Role-based access", "Attendance", "Project tracking"],

    stats: [
      { value: "6", label: "Modules in one system" },
      { value: "100%", label: "Attendance visibility" },
      { value: "1", label: "Record per employee" },
      { value: "Live", label: "Project status" },
    ],

    challengeTitle: "People data lived apart from the work",
    challenge:
      "Attendance sat in one register, projects in another tracker, and nobody could see how the two lined up.",

    solutionTitle: "People and work in one view",
    solution:
      "MaverickHR puts employee records, attendance, leave, and project delivery on the same platform, with role-based access across the org.",

    howItWorksNote:
      "A single source of truth for who works here, when they work, and what they're working on.",

    outcomeQuote:
      "Leadership can see where effort is actually going, not where it was planned to go.",

    highlights: [
      "Centralized employee and workforce management",
      "Attendance, leave, and employee activity tracking",
      "Project, task, team, and work management",
      "Role-based access and organizational management",
      "Real-time workforce and project visibility",
      "Built for scalable enterprise operations",
    ],

    features: [
      {
        title: "Employee management",
        description: "A single record for every employee across the org.",
        iconName: "bot",
      },
      {
        title: "Attendance management",
        description: "Track check-ins, hours, and attendance patterns.",
        iconName: "pulse",
      },
      {
        title: "Leave management",
        description: "Requests, approvals, and balances in one place.",
        iconName: "mail",
      },
      {
        title: "Project management",
        description: "Plan and track projects from kickoff to delivery.",
        iconName: "sync",
      },
      {
        title: "Task management",
        description: "Assign, prioritize, and follow tasks to completion.",
        iconName: "sms",
      },
      {
        title: "Workforce tracking",
        description: "Live visibility into where people and effort are going.",
        iconName: "pulse",
      },
    ],

    screenshot: maverickhr,
    gallery: [],
    liveUrl: "https://hr.maverickignite.com/",
  },

  {
    slug: "schoolytics",
    title: "School Management System",
    tagline: "School analytics & management system",
    icon: schoolManagement_logo,
    accent: "red",

    shortDescription:
      "A single dashboard for enrollment, fees, and academic performance.",

    description:
      "Schoolytics brings students, teachers, fee collection, and academic performance into one connected dashboard, giving school leadership real-time visibility instead of scattered spreadsheets and registers. Track enrollment, outstanding fees, and performance trends the moment they change.",

    techStack: ["React", "Dashboards", "Fee tracking", "Academic analytics"],

    stats: [
      { value: "2,840", label: "Students tracked" },
      { value: "94.6%", label: "Attendance rate" },
      { value: "88.1%", label: "Fee recovery" },
      { value: "1", label: "Dashboard for leadership" },
    ],

    challengeTitle: "Registers, spreadsheets, and guesswork",
    challenge:
      "Fee status, attendance, and results lived in separate files, so leadership only learned about a problem at the end of a term.",

    solutionTitle: "One dashboard for the whole school",
    solution:
      "Schoolytics keeps student records, collections, and performance trends in one place and updates them as they change.",

    howItWorksNote:
      "Built for administrators and principals first, not for whoever happens to maintain the spreadsheets.",

    outcomeQuote:
      "Leadership sees a problem while there's still a term left to fix it.",

    highlights: [
      "Real-time student & teacher records",
      "Fee collection tracking with pending vs. collected view",
      "Academic performance trends across the year",
      "Infrastructure & retention scoring",
      "Built for school administrators, not just IT staff",
    ],

    features: [
      {
        title: "Student management",
        description: "A complete record for every student, in one place.",
        iconName: "bot",
      },
      {
        title: "Fees management",
        description: "Track collections, pending dues, and collection rate over time.",
        iconName: "pulse",
      },
      {
        title: "Academic performance tracking",
        description: "Year-round trends across classes, not just term-end reports.",
        iconName: "sync",
      },
      {
        title: "Teacher management",
        description: "Manage staff records alongside student and class data.",
        iconName: "mail",
      },
    ],

    screenshot: null,
    gallery: [],
    liveUrl: null,
  },

  {
    slug: "maverick-learn",
    title: "Learn Management System",
    tagline: "Learning management system",
    icon: learningManagement_logo,
    accent: "gold",

    shortDescription:
      "Courses, assignments, and progress tracking in one learning platform.",

    description:
      "Maverick Learn gives learners a single home for courses, assignments, exams, and certificates — with progress tracking that shows exactly how far along they are, not just what's assigned. Built for cohorts, instructors, and self-paced learners alike.",

    techStack: ["React", "Cohorts", "Live sessions", "Certificates"],

    stats: [
      { value: "4", label: "Learning formats" },
      { value: "100%", label: "Progress visibility" },
      { value: "1-click", label: "Session join" },
      { value: "Auto", label: "Certificates issued" },
    ],

    challengeTitle: "Learners couldn't see where they stood",
    challenge:
      "Course material, assignments, and session links were spread across drives and chat threads, so progress was impossible to judge.",

    solutionTitle: "One home for the whole course",
    solution:
      "Maverick Learn keeps enrollment, submissions, live sessions, and certificates together, with progress shown per category.",

    howItWorksNote:
      "Designed for instructor-led cohorts and self-paced learners on the same platform.",

    outcomeQuote:
      "Learners know exactly what's done, what's next, and what's left.",

    highlights: [
      "Course enrollment & completion tracking",
      "Assignments, exams, and certificates in one place",
      "Live session scheduling with join links",
      "Category-level progress breakdown",
      "Designed for both instructor-led and self-paced learning",
    ],

    features: [
      {
        title: "Course management",
        description: "Browse, enroll, and track progress across every course.",
        iconName: "sync",
      },
      {
        title: "Assignments & exams",
        description: "Submit, grade, and track assignments and exams end to end.",
        iconName: "sms",
      },
      {
        title: "Certificates",
        description: "Automatically issued on completion, tracked per learner.",
        iconName: "bot",
      },
      {
        title: "Live sessions",
        description: "Scheduled sessions with one-click join, right from the dashboard.",
        iconName: "chat",
      },
    ],

    screenshot: null,
    gallery: [],
    liveUrl: null,
  },
];

export const getProductBySlug = (slug) => products.find((p) => p.slug === slug);

export const getRelatedProducts = (slug, count = 2) =>
  products.filter((p) => p.slug !== slug).slice(0, count);