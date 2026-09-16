// pages/Careers.jsx
import { useState } from "react";
import { MapPin, Clock, Briefcase, ChevronDown, ArrowRight, Mail } from "lucide-react";

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

const Careers = () => {
  const [openRoleId, setOpenRoleId] = useState(null);

  return (
    <div className="bg-n-8">
      {/* ================= PAGE HEADER ================= */}
      <section className="pt-16 pb-10 sm:pt-24 sm:pb-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <span className="font-code text-[11px] font-semibold uppercase tracking-[0.14em] text-[#3B82F6]">
            Careers at Maverick Ignite
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-bold text-n-1 leading-tight">
            Open roles
          </h1>
          <p className="mt-4 text-n-3 text-base sm:text-lg">
            Don&apos;t see a fit? Scroll to the bottom — we&apos;d still like to hear from you.
          </p>
        </div>
      </section>

      {/* ================= OPEN ROLES ================= */}
      <section className="pb-16 sm:pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
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