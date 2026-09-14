import dataSenseScreenshot from "../assets/images/datasense.png";
import supportSenseScreenshot from "../assets/images/supportsense.png";
import maverickdine from "../assets/images/maverickdine.webp";
import notifybot from "../assets/images/notify.png";
import maverickhr_logo from "../assets/images/maverickhr_logo.png";
// Product Logos
import datasense_logo from "../assets/images/datasense_logo.png";
import supportsense_logo from "../assets/images/supportlogo.png";
// import notifybot_logo from "../assets/images/notifybot_logo.png";
import maverickdine_logo from "../assets/images/maverick_dine.webp";
import maverickhr from "../assets/images/maverickhr.png";

// NEW: School Management System + Learning Management System
import schoolManagementScreenshot from "../assets/images/school_management.png";
import schoolManagement_logo from "../assets/images/maverick-logo.png";
import learningManagementScreenshot from "../assets/images/learning_management.png";
import learningManagement_logo from "../assets/images/maverick-logo.png";

export const products = [
  {
    slug: "datasense",
    title: "DataSense",
    tagline: "AI-Powered Business Data Insights",
    icon: datasense_logo,
    accent: "red",

    shortDescription:
      "Turns scattered business data into clear, actionable insight.",

    description:
      "Turns your scattered business data into clear, actionable insight — surfacing the trends that matter without the manual digging. Ask it anything about your school, staff, or students in plain English and get an instant answer.",

    highlights: [
      "Automated trend surfacing across sources",
      "No manual spreadsheet digging",
      "Plugs into your existing data stack",
      "Dashboards built for non-technical teams",
    ],

    features: [
      {
        title: "Unified data ingestion",
        description:
          "Connect every source you already use — no migration required.",
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
    liveUrl: null,
  },

  {
    slug: "supportsense",
    title: "SupportSense",
    tagline: "Smart Support Assistant",
    icon: supportsense_logo,
    accent: "gold",

    shortDescription:
      "A support assistant trained on your own business knowledge.",

    description:
      "A support assistant trained on your own business knowledge, answering customers instantly instead of routing everything to a queue.",

    highlights: [
      "Trained on your docs, not generic data",
      "Deflects repetitive tickets automatically",
      "Escalates to a human when it's unsure",
      "Live in days, not months",
    ],

    features: [],

    screenshot: supportSenseScreenshot,
    liveUrl: null,
  },

  {
    slug: "notifybot",
    title: "NotifyBot",
    tagline: "Unified Notification Service",
    // icon: notifybot_logo,
    accent: "red",

    shortDescription:
      "One integration for WhatsApp, SMS, and email.",

    description:
      "One integration for WhatsApp, SMS, and email — send every notification through a single, reliable pipeline.",

    highlights: [
      "One API for three channels",
      "Delivery tracking across all of them",
      "Automatic fallback if a channel fails",
      "Built-in templating",
    ],

    features: [],

    screenshot: notifybot,
    liveUrl: null,
  },

  {
    slug: "maverickdine",
    title: "MaverickDine",
    tagline: "Restaurant & Dining Operations Platform",
    icon: maverickdine_logo,
    accent: "gold",

    shortDescription:
      "A live restaurant platform — POS, menus, and tables in one place.",

    description:
      "MaverickDine brings point-of-sale, menu management, table setup, and order flow into a single connected platform, built for real restaurant operations. It's a live product — take a look for yourself.",

    highlights: [
      "Multi-mode POS: dine-in, takeaway, delivery",
      "Live menu & table management",
      "Order and payment tracking in real time",
      "Built for multi-location restaurant groups",
    ],

    features: [],

    screenshot: maverickdine,
    liveUrl: "https://maverickdine.com/",
  },

  {
    slug: "maverickhr",
    title: "MaverickHR",
    tagline: "Enterprise Workforce & Project Execution Platform",
    icon: maverickhr_logo,
    accent: "gold",

    shortDescription:
      "A unified workforce platform for employee management, attendance, projects, and organizational operations.",

    description:
      "MaverickHR brings workforce management and project execution into one connected platform, helping organizations manage employees, attendance, teams, projects, tasks, and day-to-day operations from a single system. Built for modern enterprises, it provides a centralized view of people, work, and organizational performance.",

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
        title: "Employee Management",
        description: "A single record for every employee across the org.",
        iconName: "bot",
      },
      {
        title: "Attendance Management",
        description: "Track check-ins, hours, and attendance patterns.",
        iconName: "pulse",
      },
      {
        title: "Leave Management",
        description: "Requests, approvals, and balances in one place.",
        iconName: "mail",
      },
      {
        title: "Project Management",
        description: "Plan and track projects from kickoff to delivery.",
        iconName: "sync",
      },
      {
        title: "Task Management",
        description: "Assign, prioritize, and follow tasks to completion.",
        iconName: "sms",
      },
      {
        title: "Workforce Tracking",
        description: "Live visibility into where people and effort are going.",
        iconName: "pulse",
      },
    ],

    screenshot: maverickhr,
    liveUrl: "https://hr.maverickignite.com/",
  },

  {
    slug: "schoolytics",
    title: "School Management System",
    tagline: "School Analytics & Management System",
    icon: schoolManagement_logo,
    accent: "red",

    shortDescription:
      "A single dashboard for enrollment, fees, and academic performance.",

    description:
      "Schoolytics brings students, teachers, fee collection, and academic performance into one connected dashboard, giving school leadership real-time visibility instead of scattered spreadsheets and registers. Track enrollment, outstanding fees, and performance trends the moment they change.",

    highlights: [
      "Real-time student & teacher records",
      "Fee collection tracking with pending vs. collected view",
      "Academic performance trends across the year",
      "Infrastructure & retention scoring",
      "Built for school administrators, not just IT staff",
    ],

    features: [
      {
        title: "Student Management",
        description: "A complete record for every student, in one place.",
        iconName: "bot",
      },
      {
        title: "Fees Management",
        description: "Track collections, pending dues, and collection rate over time.",
        iconName: "pulse",
      },
      {
        title: "Academic Performance Tracking",
        description: "Year-round trends across classes, not just term-end reports.",
        iconName: "sync",
      },
      {
        title: "Teacher Management",
        description: "Manage staff records alongside student and class data.",
        iconName: "mail",
      },
    ],

    screenshot: schoolManagementScreenshot,
    liveUrl: null,
  },

  {
    slug: "maverick-learn",
    title: "Learn Management System",
    tagline: "Learning Management System",
    icon: learningManagement_logo,
    accent: "gold",

    shortDescription:
      "Courses, assignments, and progress tracking in one learning platform.",

    description:
      "Maverick Learn gives learners a single home for courses, assignments, exams, and certificates — with progress tracking that shows exactly how far along they are, not just what's assigned. Built for cohorts, instructors, and self-paced learners alike.",

    highlights: [
      "Course enrollment & completion tracking",
      "Assignments, exams, and certificates in one place",
      "Live session scheduling with join links",
      "Category-level progress breakdown",
      "Designed for both instructor-led and self-paced learning",
    ],

    features: [
      {
        title: "Course Management",
        description: "Browse, enroll, and track progress across every course.",
        iconName: "sync",
      },
      {
        title: "Assignments & Exams",
        description: "Submit, grade, and track assignments and exams end to end.",
        iconName: "sms",
      },
      {
        title: "Certificates",
        description: "Automatically issued on completion, tracked per learner.",
        iconName: "bot",
      },
      {
        title: "Live Sessions",
        description: "Scheduled sessions with one-click join, right from the dashboard.",
        iconName: "chat",
      },
    ],

    screenshot: learningManagementScreenshot,
    liveUrl: null,
  },
];

export const getProductBySlug = (slug) =>
  products.find((p) => p.slug === slug);

export const getRelatedProducts = (slug, count = 2) =>
  products.filter((p) => p.slug !== slug).slice(0, count);