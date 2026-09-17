// pages/Careers.jsx
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, ArrowUpRight } from "lucide-react";

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
      "Run the hiring pipeline end to end and own onboarding, from the first reply to someone's first week.",
    requirements: [
      "1–3 years in HR or talent acquisition",
      "Organized, and comfortable owning a process",
      "Genuinely likes talking to people",
    ],
  },
];

const departments = ["All", ...new Set(openRoles.map((r) => r.dept))];

const deptColors = {
  Engineering: "bg-blue-50 text-blue-700 ring-blue-600/20",
  Design: "bg-sky-50 text-sky-700 ring-sky-600/20",
  Sales: "bg-indigo-50 text-indigo-700 ring-indigo-600/20",
  People: "bg-cyan-50 text-cyan-700 ring-cyan-600/20",
};

/* ============================================================
   DECORATIVE SPARKLINE — draws in once on load
============================================================ */

const HiringSparkline = () => (
  <svg
    viewBox="0 0 220 64"
    className="hidden sm:block w-44 h-16 flex-shrink-0"
    fill="none"
  >
    <defs>
      <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#2563EB" stopOpacity="0.18" />
        <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
      </linearGradient>
    </defs>
    <motion.path
      d="M2 46 L34 40 L66 48 L98 22 L130 30 L162 10 L218 16"
      fill="none"
      stroke="#2563EB"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.1, ease: "easeOut" }}
    />
    <motion.path
      d="M2 46 L34 40 L66 48 L98 22 L130 30 L162 10 L218 16 L218 64 L2 64 Z"
      fill="url(#sparkFill)"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    />
  </svg>
);

/* ============================================================
   COMPONENT
============================================================ */

const Careers = () => {
  const [query, setQuery] = useState("");
  const [dept, setDept] = useState("All");
  const [openRoleId, setOpenRoleId] = useState(null);

  const filteredRoles = useMemo(() => {
    const q = query.trim().toLowerCase();
    return openRoles.filter((role) => {
      const matchesDept = dept === "All" || role.dept === dept;
      const matchesQuery =
        !q ||
        role.title.toLowerCase().includes(q) ||
        role.dept.toLowerCase().includes(q) ||
        role.location.toLowerCase().includes(q);
      return matchesDept && matchesQuery;
    });
  }, [query, dept]);

  return (
    <div className="bg-white min-h-screen">
      {/* ================= HERO / STATUS ================= */}
      <section className="pt-20 pb-10 sm:pt-28 sm:pb-14 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
            </span>
            <span className="text-sm text-slate-500">Hiring now</span>
          </div>

          <div className="mt-5 flex items-end justify-between gap-6">
            <div>
              <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 tracking-tight">
                {openRoles.length}
              </h1>
              <p className="mt-2 text-lg sm:text-xl text-slate-600 max-w-md">
                open roles across {new Set(openRoles.map((r) => r.dept)).size}{" "}
                teams in Bengaluru.
              </p>
            </div>
            <HiringSparkline />
          </div>
        </div>
      </section>

      {/* ================= FILTER BAR ================= */}
      <section className="py-8 sm:py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="relative flex-1">
              <Search
                size={17}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search roles, teams, or cities"
                className="w-full pl-11 pr-4 py-3 rounded-full border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {departments.map((d) => {
                const active = dept === d;
                return (
                  <button
                    key={d}
                    onClick={() => setDept(d)}
                    className={`text-sm px-4 py-2 rounded-full border transition-colors whitespace-nowrap ${
                      active
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900"
                    }`}
                  >
                    {d}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ================= ROLE FEED ================= */}
      <section className="pb-20 sm:pb-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {filteredRoles.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 px-6 py-16 text-center">
              <p className="text-slate-700 text-lg">
                Nothing matches that search.
              </p>
              <p className="mt-2 text-slate-400 text-sm">
                Try a different team, or{" "}
                <button
                  onClick={() => {
                    setQuery("");
                    setDept("All");
                  }}
                  className="text-blue-600 hover:underline"
                >
                  clear your filters
                </button>{" "}
                to see everything open right now.
              </p>
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 divide-y divide-slate-200 overflow-hidden">
              {filteredRoles.map((role) => {
                const isOpen = openRoleId === role.id;

                return (
                  <div key={role.id} className="bg-white">
                    <button
                      onClick={() => setOpenRoleId(isOpen ? null : role.id)}
                      className="w-full flex items-center justify-between gap-4 px-5 py-5 sm:px-6 text-left hover:bg-slate-50 transition-colors"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="text-base sm:text-lg font-semibold text-slate-900">
                            {role.title}
                          </h3>
                          <span
                            className={`text-xs font-medium px-2.5 py-1 rounded-full ring-1 ring-inset ${
                              deptColors[role.dept] ||
                              "bg-slate-50 text-slate-600 ring-slate-500/20"
                            }`}
                          >
                            {role.dept}
                          </span>
                        </div>
                        <p className="mt-1.5 text-sm text-slate-500">
                          {role.location}
                          <span className="mx-2 text-slate-300">|</span>
                          {role.type}
                        </p>
                      </div>

                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex-shrink-0 text-slate-400"
                      >
                        <ChevronDown size={20} />
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-6 sm:px-6 pt-1">
                            <p className="text-slate-600 text-sm sm:text-base">
                              {role.description}
                            </p>

                            <ul className="mt-4 space-y-2">
                              {role.requirements.map((req) => (
                                <li
                                  key={req}
                                  className="text-slate-600 text-sm flex items-start gap-2.5"
                                >
                                  <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-500 flex-shrink-0" />
                                  {req}
                                </li>
                              ))}
                            </ul>

                            <a
                              href={`mailto:careers@maverickignite.com?subject=Application: ${role.title}`}
                              className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
                            >
                              Apply for this role
                              <ArrowUpRight size={15} />
                            </a>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Careers;