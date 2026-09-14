import dataSenseScreenshot from "../assets/images/datasense.png";
import supportSenseScreenshot from "../assets/images/supportsense.png";
import maverickdine from "../assets/images/maverickdine.webp";
import notifybot from "../assets/images/notify.png";

// Product Logos
import datasense_logo from "../assets/images/datasense_logo.png";
import supportsense_logo from "../assets/images/supportlogo.png";
// import notifybot_logo from "../assets/images/notifybot_logo.png";
import maverickdine_logo from "../assets/images/maverick_dine.webp";

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
];

export const getProductBySlug = (slug) =>
  products.find((p) => p.slug === slug);

export const getRelatedProducts = (slug, count = 2) =>
  products.filter((p) => p.slug !== slug).slice(0, count);