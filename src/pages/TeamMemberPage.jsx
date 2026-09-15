import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import gsap from "gsap";

import Section from "../components/Section";
import { BottomLine } from "../components/design/Hero";
import AINetworkBackground from "../components/AINetworkBackground";

import { team } from "./Team";

/* -------------------------------------------------------------------------- */
/* EMPLOYEE DETAILS                                                           */
/* -------------------------------------------------------------------------- */

/*
  Add detailed information for each employee here.

  Keep only information you actually want to publish on the website.
*/

const employeeDetails = {
  "hifzur-raheman-sanderwale": {
    title: "Team Member",
    department: "Engineering",
    introduction:
      "Working on the technology, systems, and products that power MaverickIgnite.",
    about:
      "Add the employee's short professional introduction here.",
    expertise: [
      "Technology",
      "Engineering",
      "Product Development",
    ],
  },

  "zeeshan-karmikhan": {
    title: "Team Member",
    department: "Engineering",
    introduction:
      "Building reliable technology and systems that support MaverickIgnite products.",
    about:
      "Add the employee's short professional introduction here.",
    expertise: [
      "Backend Development",
      "Systems",
      "Engineering",
    ],
  },

  "yaseen-sanderwale": {
    title: "Team Member",
    department: "AI & Machine Learning",
    introduction:
      "Exploring machine learning and intelligent systems to solve practical problems.",
    about:
      "Add the employee's short professional introduction here.",
    expertise: [
      "Machine Learning",
      "Artificial Intelligence",
      "Data",
    ],
  },

  "musadiq-sanderwale": {
    title: "Team Member",
    department: "Product & Design",
    introduction:
      "Helping turn complex ideas into clear, useful, and engaging product experiences.",
    about:
      "Add the employee's short professional introduction here.",
    expertise: [
      "Product",
      "Design",
      "User Experience",
    ],
  },

  "tufail-sanderwale": {
    title: "Team Member",
    department: "Technology",
    introduction:
      "Contributing to the technology and products being built at MaverickIgnite.",
    about:
      "Add the employee's short professional introduction here.",
    expertise: [
      "Technology",
      "Development",
      "Product",
    ],
  },

  "naveed-patait": {
    title: "Team Member",
    department: "Technology",
    introduction:
      "Working across technology and product development to help deliver useful solutions.",
    about:
      "Add the employee's short professional introduction here.",
    expertise: [
      "Technology",
      "Development",
      "Problem Solving",
    ],
  },

  "raquib-qadari": {
    title: "Team Member",
    department: "Technology",
    introduction:
      "Helping build and improve the technology behind MaverickIgnite's products.",
    about:
      "Add the employee's short professional introduction here.",
    expertise: [
      "Technology",
      "Development",
      "Systems",
    ],
  },

  "arifa-chamanshaikh": {
    title: "Team Member",
    department: "Operations",
    introduction:
      "Supporting the people, processes, and operations that keep the team moving.",
    about:
      "Add the employee's short professional introduction here.",
    expertise: [
      "Operations",
      "Coordination",
      "Team Support",
    ],
  },

  "mudassir-sanderwale": {
    title: "Team Member",
    department: "Engineering",
    introduction:
      "Building applications and intelligent technology across AI, data, and software.",
    about:
      "Add the employee's short professional introduction here.",
    expertise: [
      "Python",
      "AI & LLMs",
      "FastAPI",
      "React",
      "Data Systems",
    ],
  },

  "saklen-sajjan": {
    title: "Team Member",
    department: "Technology",
    introduction:
      "Contributing to technology and software development at MaverickIgnite.",
    about:
      "Add the employee's short professional introduction here.",
    expertise: [
      "Technology",
      "Software",
      "Development",
    ],
  },

  "anas-sanderwale": {
    title: "Team Member",
    department: "Technology",
    introduction:
      "Working with the team to build practical technology and digital products.",
    about:
      "Add the employee's short professional introduction here.",
    expertise: [
      "Technology",
      "Development",
      "Digital Products",
    ],
  },

  "subhan-sanderwale": {
    title: "Team Member",
    department: "Technology",
    introduction:
      "Contributing to the development and evolution of MaverickIgnite products.",
    about:
      "Add the employee's short professional introduction here.",
    expertise: [
      "Technology",
      "Software",
      "Product Development",
    ],
  },

  "asim-bage": {
    title: "Team Member",
    department: "Technology",
    introduction:
      "Helping build technology and solutions across the MaverickIgnite ecosystem.",
    about:
      "Add the employee's short professional introduction here.",
    expertise: [
      "Technology",
      "Development",
      "Problem Solving",
    ],
  },
};

/* -------------------------------------------------------------------------- */
/* PAGE                                                                       */
/* -------------------------------------------------------------------------- */

const TeamMemberPage = () => {
  const { slug } = useParams();

  const contentRef = useRef(null);
  const imageRef = useRef(null);

  const [imageFailed, setImageFailed] = useState(false);

  const member = useMemo(
    () => team.find((person) => person.slug === slug),
    [slug]
  );

  const details = employeeDetails[slug];

  useEffect(() => {
    if (!contentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-member-reveal]", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });

      if (imageRef.current) {
        gsap.from(imageRef.current, {
          scale: 0.94,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });
      }
    }, contentRef);

    return () => ctx.revert();
  }, [slug]);

  if (!member) {
    return (
      <Section>
        <div className="container py-32 text-center">
          <h1 className="h2 mb-6">Team member not found</h1>

          <Link
            to="/team"
            className="inline-flex rounded-xl bg-[#2563EB] px-6 py-3 font-medium text-white"
          >
            Back to team
          </Link>
        </div>

        <BottomLine />
      </Section>
    );
  }

  const initials = member.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Section crosses crossesOffset="lg:translate-y-[5.25rem]">
      <div className="container relative z-2">
        {/* Background */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-[40rem] w-[60rem] -translate-x-1/2 rounded-full bg-[#1D4ED8]/[0.055] blur-[150px]" />

        <div className="pointer-events-none absolute inset-0 opacity-[0.15]">
          <AINetworkBackground />
        </div>

        <div ref={contentRef} className="relative">
          {/* Back */}
          <div data-member-reveal className="mb-12">
            <Link
              to="/team"
              className="group inline-flex items-center gap-3 font-code text-[10px] uppercase tracking-[0.18em] text-n-3 transition-colors hover:text-[#60A5FA]"
            >
              <span className="transition-transform duration-300 group-hover:-translate-x-1">
                ←
              </span>

              Back to team
            </Link>
          </div>

          {/* Main */}
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] lg:gap-20">
            {/* Photo */}
            <div data-member-reveal>
              <div
                ref={imageRef}
                className="relative mx-auto max-w-[28rem]"
              >
                {/* Glow */}
                <div className="pointer-events-none absolute -inset-8 rounded-[3rem] bg-[#2563EB]/10 blur-[70px]" />

                <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-[#3B82F6]/25 bg-n-7 shadow-[0_30px_80px_-30px_rgba(37,99,235,0.45)]">
                  {!imageFailed ? (
                    <img
                      src={member.photo}
                      alt={member.name}
                      onError={() => setImageFailed(true)}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#0B1220] via-[#101B32] to-[#07101F]">
                      <span className="text-7xl font-semibold text-[#60A5FA]">
                        {initials}
                      </span>
                    </div>
                  )}

                  {/* Bottom gradient */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />

                  {/* Number */}
                  <div className="absolute left-5 top-5">
                    <span className="font-code text-[9px] uppercase tracking-[0.2em] text-white/60">
                      MaverickIgnite / People
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Information */}
            <div data-member-reveal>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-8 bg-[#3B82F6]" />

                <span className="font-code text-[10px] uppercase tracking-[0.2em] text-[#60A5FA]">
                  {details?.department || member.department}
                </span>
              </div>

              <h1 className="h2 mb-5 max-w-3xl">
                {member.name}
              </h1>

              <p className="mb-8 text-lg leading-relaxed text-n-2 lg:text-xl">
                {details?.introduction ||
                  "A member of the MaverickIgnite team contributing to the work we build together."}
              </p>

              {/* Divider */}
              <div className="mb-8 h-px w-full bg-n-6" />

              {/* About */}
              <div className="mb-10">
                <span className="font-code text-[9px] uppercase tracking-[0.2em] text-[#3B82F6]">
                  About
                </span>

                <p className="body-1 mt-4 max-w-2xl text-n-3">
                  {details?.about ||
                    "More information about this team member will be added soon."}
                </p>
              </div>

              {/* Expertise */}
              {details?.expertise?.length > 0 && (
                <div>
                  <span className="font-code text-[9px] uppercase tracking-[0.2em] text-[#3B82F6]">
                    Areas of focus
                  </span>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {details.expertise.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-[#3B82F6]/20 bg-[#3B82F6]/[0.04] px-4 py-2 text-sm text-n-2"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* OTHER TEAM MEMBERS                                              */}
          {/* ---------------------------------------------------------------- */}

          <div
            data-member-reveal
            className="mt-24 border-t border-n-6 pt-12 lg:mt-32"
          >
            <div className="mb-8 flex items-end justify-between">
              <div>
                <span className="font-code text-[9px] uppercase tracking-[0.2em] text-[#3B82F6]">
                  More people
                </span>

                <h2 className="h3 mt-3">
                  Meet the rest of the team.
                </h2>
              </div>

              <Link
                to="/team"
                className="hidden font-code text-[9px] uppercase tracking-[0.18em] text-n-3 transition-colors hover:text-[#60A5FA] sm:block"
              >
                View all →
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {team
                .filter((person) => person.slug !== member.slug)
                .slice(0, 5)
                .map((person) => (
                  <Link
                    key={person.slug}
                    to={`/team/${person.slug}`}
                    className="group"
                  >
                    <div className="overflow-hidden rounded-xl border border-n-6 bg-n-7">
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={person.photo}
                          alt={person.name}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          onError={(event) => {
                            event.currentTarget.style.display = "none";
                          }}
                        />
                      </div>

                      <div className="p-3">
                        <p className="text-sm font-medium text-n-1">
                          {person.name}
                        </p>

                        <p className="mt-1 text-xs text-n-4">
                          {person.department}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>

      <BottomLine />
    </Section>
  );
};

export default TeamMemberPage;