// pages/Careers.jsx
import { useState } from "react";
import {
  Lightbulb,
  Users2,
  GraduationCap,
  HeartHandshake,
  MapPin,
  Clock,
  Briefcase,
  ChevronDown,
  ArrowRight,
  Mail,
} from "lucide-react";

import outingImg from "../assets/team/outing-4.jpg";
import cricketImg from "../assets/team/cricket.jpg";
import dinnerImg from "../assets/team/dinner.jpg";

/* ============================================================
   DATA — edit freely, no structural changes needed
============================================================ */

const openRoles = [
  {
    id: "role-01",
    title: "Full Stack Developer",
    type: "Full-time",
    location: "Bengaluru",
    dept: "Engineering",
    description:
      "Build and ship features across our product suite — React on the front end, Node/Express on the back. You'll work closely with design and QA from day one, not just take tickets.",
    requirements: [
      "2+ years with React and a Node-based backend",
      "Comfortable owning a feature end to end",
      "Bonus: experience with CI/CD pipelines",
    ],
  },
  {
    id: "role-02",
    title: "UI/UX Designer",
    type: "Full-time",
    location: "Bengaluru",
    dept: "Design",
    description:
      "Own the look and feel of our products and marketing site. You'll move between quick wireframes and polished, production-ready screens.",
    requirements: [
      "Portfolio showing end-to-end product design work",
      "Proficiency in Figma",
      "An eye for typography and spacing, not just color",
    ],
  },
  {
    id: "role-03",
    title: "Business Development Executive",
    type: "Full-time",
    location: "Bengaluru",
    dept: "Sales",
    description:
      "Identify new business opportunities, build client relationships, and help translate conversations into signed work.",
    requirements: [
      "1+ years in B2B sales or client-facing roles",
      "Comfortable with outbound prospecting",
      "Strong written and verbal communication",
    ],
  },
  {
    id: "role-04",
    title: "HR Executive",
    type: "Full-time",
    location: "Bengaluru",
    dept: "People",
    description:
      "Run the hiring pipeline end to end, own onboarding, and help keep the culture you'll see below actually true day to day.",
    requirements: [
      "1–3 years in HR or talent acquisition",
      "Organized, and comfortable owning a process",
      "Genuinely likes talking to people",
    ],
  },
];

const galleryCategories = ["All", "Outings", "Sports", "Office Life"];

const galleryPhotos = [
  { id: "g1", src: outingImg, caption: "Annual offsite — V-Zone Games", category: "Outings" },
  { id: "g2", src: cricketImg, caption: "Inter-team cricket finals", category: "Sports" },
  { id: "g3", src: dinnerImg, caption: "Friday team dinner", category: "Office Life" },
];

const values = [
  {
    icon: Lightbulb,
    title: "Bias to build",
    description:
      "We'd rather ship a rough version and learn from it than debate a perfect one that never leaves the whiteboard.",
  },
  {
    icon: Users2,
    title: "Small teams, real ownership",
    description:
      "No layers between you and the decision. If it's your feature, it's genuinely your call.",
  },
  {
    icon: GraduationCap,
    title: "Learning is expected",
    description:
      "Conference tickets, courses, and time carved out to go deep on something — not just a line in the handbook.",
  },
  {
    icon: HeartHandshake,
    title: "Work that doesn't eat your life",
    description:
      "Outings, festivals, and Friday lunches aren't perks bolted on — they're just how the team spends time together.",
  },
];

const perks = [
  "Flexible working hours",
  "Health insurance",
  "Annual team offsite",
  "Learning & certification support",
  "Festival & birthday celebrations",
  "Performance-based growth",
];

const hiringSteps = [
  { title: "Apply", description: "Send your resume and a note on what you'd want to work on." },
  { title: "Intro call", description: "A 20-minute conversation about your experience and what we're building." },
  { title: "Skills round", description: "A practical task or discussion close to the actual work — no trick questions." },
  { title: "Offer", description: "Clear compensation and a start date that works for you." },
];

/* ============================================================
   MARQUEE ROW
   Duplicates the photo list so the loop is seamless.
============================================================ */

const MarqueeRow = ({ photos, direction = "left", speed = 34 }) => {
  const doubled = [...photos, ...photos];

  return (
    <div className="marquee-track-wrapper overflow-hidden">
      <div
        className="marquee-track flex gap-4 w-max"
        style={{
          animation: `${direction === "left" ? "marquee-left" : "marquee-right"} ${speed}s linear infinite`,
        }}
      >
        {doubled.map((photo, i) => (
          <div
            key={`${photo.id}-${i}`}
            className="relative w-64 sm:w-72 aspect-[4/3] flex-shrink-0 rounded-xl overflow-hidden border border-n-6"
          >
            <img
              src={photo.src}
              alt={photo.caption}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
            <p className="absolute bottom-3 left-3 right-3 text-white text-xs sm:text-sm font-medium">
              {photo.caption}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Careers = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [openRoleId, setOpenRoleId] = useState(null);

  const filteredGallery =
    activeCategory === "All"
      ? galleryPhotos
      : galleryPhotos.filter((p) => p.category === activeCategory);

  const rowA = filteredGallery.length ? filteredGallery : galleryPhotos;
  const rowB = [...rowA].reverse();

  return (
    <div className="bg-n-8">
      {/* scoped marquee keyframes */}
      <style>{`
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
        .marquee-track-wrapper:hover .marquee-track {
          animation-play-state: paused;
        }
      `}</style>

      {/* ================= HERO ================= */}
      <section className="relative pt-16 pb-14 sm:pt-24 sm:pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-xl">
            <span className="font-code text-[11px] font-semibold uppercase tracking-[0.14em] text-[#3B82F6]">
              Careers at Maverick Ignite
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl font-bold text-n-1 leading-tight">
              Build things that matter, with people who show up for each other.
            </h1>
            <p className="mt-4 text-n-3 text-base sm:text-lg">
              We&apos;re a small team that ships real work for real clients — and
              still makes time for cricket finals and Friday dinners.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#open-roles"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1D4ED8] text-white font-code text-[12px] font-semibold uppercase tracking-[0.12em] hover:bg-[#1e40af] transition-colors"
              >
                View open roles
                <ArrowRight size={14} />
              </a>
              <a
                href="#life-at-maverick"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-n-6 text-n-2 font-code text-[12px] font-semibold uppercase tracking-[0.12em] hover:text-n-1 hover:border-n-4 transition-colors"
              >
                See life here
              </a>
            </div>
          </div>
        </div>

        {/* hero marquee, bleeding to the edge */}
        <div className="mt-14 space-y-4">
          <MarqueeRow photos={galleryPhotos} direction="left" speed={30} />
          <MarqueeRow photos={[...galleryPhotos].reverse()} direction="right" speed={38} />
        </div>
      </section>

      {/* ================= OPEN ROLES ================= */}
      <section id="open-roles" className="py-16 sm:py-24 border-t border-n-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-n-1">Open roles</h2>
            <p className="mt-3 text-n-3">
              Don&apos;t see a fit? Scroll to the bottom — we&apos;d still like to hear from you.
            </p>
          </div>

          <div className="space-y-3">
            {openRoles.map((role) => {
              const isOpen = openRoleId === role.id;

              return (
                <div
                  key={role.id}
                  className="border border-n-6 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenRoleId(isOpen ? null : role.id)}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 sm:px-6 sm:py-5 text-left hover:bg-n-7/40 transition-colors"
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-n-1">{role.title}</h3>
                      <div className="mt-2 flex flex-wrap gap-3 text-n-4 text-xs font-code uppercase tracking-[0.08em]">
                        <span className="inline-flex items-center gap-1">
                          <Briefcase size={12} /> {role.dept}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <MapPin size={12} /> {role.location}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Clock size={12} /> {role.type}
                        </span>
                      </div>
                    </div>

                    <ChevronDown
                      size={20}
                      className={`flex-shrink-0 text-n-3 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6 border-t border-n-6 pt-5">
                      <p className="text-n-3 text-sm sm:text-base">{role.description}</p>

                      <ul className="mt-4 space-y-2">
                        {role.requirements.map((req) => (
                          <li
                            key={req}
                            className="text-n-3 text-sm flex items-start gap-2"
                          >
                            <span className="mt-1.5 w-1 h-1 rounded-full bg-[#3B82F6] flex-shrink-0" />
                            {req}
                          </li>
                        ))}
                      </ul>

                      <a
                        href={`mailto:careers@maverickignite.com?subject=Application: ${role.title}`}
                        className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1D4ED8] text-white font-code text-[11px] font-semibold uppercase tracking-[0.12em] hover:bg-[#1e40af] transition-colors"
                      >
                        Apply for this role
                        <ArrowRight size={13} />
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= LIFE AT MAVERICK — MOVING GALLERY ================= */}
      <section id="life-at-maverick" className="py-16 sm:py-24 border-t border-n-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-xl mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-n-1">Life at Maverick</h2>
            <p className="mt-3 text-n-3 text-base sm:text-lg">
              Outings, wins, and the everyday moments that make this a team,
              not just an office.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mb-10">
            {galleryCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-code text-[11px] font-semibold uppercase tracking-[0.12em] px-4 py-2 rounded-full border transition-colors duration-200 ${
                  activeCategory === cat
                    ? "bg-[#1D4ED8] border-[#1D4ED8] text-white"
                    : "border-n-6 text-n-3 hover:text-n-1 hover:border-n-4"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <MarqueeRow photos={rowA} direction="left" speed={32} />
          <MarqueeRow photos={rowB} direction="right" speed={40} />
        </div>
      </section>

      {/* ================= VALUES ================= */}
      <section className="py-16 sm:py-24 border-t border-n-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-n-1 mb-10 sm:mb-14">
            What it&apos;s actually like
          </h2>

          <div className="grid sm:grid-cols-2 gap-5">
            {values.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="p-6 sm:p-7 rounded-xl border border-n-6 hover:border-n-4 transition-colors"
              >
                <Icon size={22} className="text-[#3B82F6]" />
                <h3 className="mt-4 text-lg font-semibold text-n-1">{title}</h3>
                <p className="mt-2 text-n-3 text-sm sm:text-base">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PERKS ================= */}
      <section className="py-16 sm:py-24 border-t border-n-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-n-1 mb-10">Perks</h2>

          <div className="flex flex-wrap gap-3">
            {perks.map((perk) => (
              <span
                key={perk}
                className="px-5 py-2.5 rounded-full border border-n-6 text-n-2 text-sm"
              >
                {perk}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HOW WE HIRE ================= */}
      <section className="py-16 sm:py-24 border-t border-n-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-n-1 mb-10 sm:mb-14">
            How we hire
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {hiringSteps.map((step, i) => (
              <div key={step.title} className="relative">
                <span className="font-code text-sm text-[#3B82F6]">
                  0{i + 1}
                </span>
                <h3 className="mt-2 text-lg font-semibold text-n-1">{step.title}</h3>
                <p className="mt-2 text-n-3 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CLOSING CTA ================= */}
      <section className="py-16 sm:py-24 border-t border-n-6">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-n-1">
            Don&apos;t see the right role?
          </h2>
          <p className="mt-3 text-n-3">
            We&apos;re always open to hearing from people who&apos;d be a good fit.
            Send us your resume and tell us what you&apos;d want to work on.
          </p>

          <a
            href="mailto:careers@maverickignite.com?subject=General Application"
            className="mt-7 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#1D4ED8] text-white font-code text-[12px] font-semibold uppercase tracking-[0.12em] hover:bg-[#1e40af] transition-colors"
          >
            <Mail size={15} />
            Send your resume
          </a>
        </div>
      </section>
    </div>
  );
};

export default Careers;