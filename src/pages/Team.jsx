import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Section from "../components/Section";
import AINetworkBackground from "../components/AINetworkBackground";
import { team } from "../config/team";

export { team };

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* -------------------------------------------------------------------------- */
/* ICON                                                                       */
/* -------------------------------------------------------------------------- */

const UserIcon = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 22 22"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

// Palette cycled per-member so each portrait ring gets a distinct accent.
const PORTRAIT_PALETTE = [
  { from: "#60A5FA", to: "#1D4ED8", solid: "#3B82F6" }, // blue
  { from: "#F472B6", to: "#BE185D", solid: "#EC4899" }, // pink
  { from: "#34D399", to: "#047857", solid: "#10B981" }, // emerald
  { from: "#FBBF24", to: "#B45309", solid: "#F59E0B" }, // amber
  { from: "#A78BFA", to: "#5B21B6", solid: "#8B5CF6" }, // violet
  { from: "#F87171", to: "#B91C1C", solid: "#EF4444" }, // red
  { from: "#22D3EE", to: "#0E7490", solid: "#06B6D4" }, // cyan
  { from: "#FB923C", to: "#C2410C", solid: "#F97316" }, // orange
];

const getPortraitColors = (index) => PORTRAIT_PALETTE[index % PORTRAIT_PALETTE.length];

/* -------------------------------------------------------------------------- */
/* PORTRAIT — a single member: ringed photo, name, role, bio on hover         */
/* -------------------------------------------------------------------------- */

const EmployeePortrait = ({ member, colors }) => {
  const hasPhoto = Boolean(member.photo);

  return (
    <div data-reveal className="group flex w-36 flex-col items-center text-center sm:w-40 lg:w-44">
      <div
        className="rounded-full p-[3px] transition-transform duration-500 group-hover:-translate-y-1.5"
        style={{ background: `linear-gradient(135deg, ${colors.from}, ${colors.to})` }}
      >
        <div className="h-28 w-28 overflow-hidden rounded-full border-4 border-n-8 bg-n-7 sm:h-32 sm:w-32 lg:h-36 lg:w-36">
          {hasPhoto ? (
            <img
              src={member.photo}
              alt={member.name}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-[50%_18%] saturate-[1.1] contrast-[1.05] transition-transform duration-700 ease-out group-hover:scale-110"
              onError={(event) => {
                event.currentTarget.style.display = "none";
                event.currentTarget.nextElementSibling.style.display = "flex";
              }}
            />
          ) : null}
          <div
            className={`h-full w-full items-center justify-center ${hasPhoto ? "hidden" : "flex"}`}
            style={{
              background: `radial-gradient(circle at 50% 40%, ${colors.solid}29, transparent 65%), #0A0E17`,
            }}
          >
            <span style={{ color: `${colors.solid}CC` }}>
              <UserIcon size={32} />
            </span>
          </div>
        </div>
      </div>

      <h3 className="mt-4 text-sm font-semibold leading-tight" style={{ color: colors.solid }}>
        {member.name}
      </h3>
      <p className="mt-0.5 text-xs leading-tight text-n-3">{member.title}</p>

      {member.introduction && (
        <p className="mt-0 max-h-0 overflow-hidden text-[11px] leading-snug text-n-4 opacity-0 transition-all duration-500 ease-out group-hover:mt-2 group-hover:max-h-24 group-hover:opacity-100">
          {member.introduction}
        </p>
      )}
    </div>
  );
};

const TeamPage = () => {
  const contentRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(progressRef.current, { scaleX: 1 });
        return;
      }

      ScrollTrigger.create({
        trigger: content,
        start: "top 80%",
        end: "bottom 65%",
        scrub: 0.6,
        onUpdate: (self) => gsap.set(progressRef.current, { scaleX: self.progress }),
      });

      gsap.from(content.querySelectorAll("[data-reveal]"), {
        y: 24,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.06,
        scrollTrigger: { trigger: content, start: "top 82%" },
      });
    }, content);

    return () => ctx.revert();
  }, []);

  return (
    <Section
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings="pt-10 pb-20 lg:pt-14 lg:pb-28"
      id="team"
    >
      <div className="container relative z-2">
        {/* Ambient lighting */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-[40rem] w-[60rem] -translate-x-1/2 rounded-full bg-[#1D4ED8]/[0.055] blur-[150px]" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-[30rem] w-[30rem] rounded-full bg-[#3B82F6]/[0.06] blur-[120px]" />

        <div className="pointer-events-none absolute inset-0 opacity-[0.18]">
          <AINetworkBackground />
        </div>        

        <div ref={contentRef} className="relative">

          <nav
            aria-label="Breadcrumb"
            data-reveal
            className="mb-6 flex flex-wrap items-center gap-2 font-code text-xs uppercase tracking-wider"
          >
            <Link to="/" className="text-n-4 transition-colors hover:text-[#3B82F6]">
              Home
            </Link>
            <span className="select-none text-n-1">›</span>
            <span className="text-[#3B82F6]" aria-current="page">
              Team
            </span>
          </nav>

          <div
            data-reveal
            className="mb-14 flex flex-col gap-6 border-n-6 pb-10 lg:mb-16 lg:flex-row lg:items-end lg:justify-between"
          >
            <div className="max-w-2xl">
              <h1 className="h2">
                Meet the people
                <br />
                <span className="text-n-3">behind MaverickIgnite.</span>
              </h1>
            </div>

            <p className="body-1 max-w-sm text-n-3 lg:text-right">
              A team of engineers, designers, builders, and problem solvers
              working together to turn ideas into intelligent products and
              scalable technology.
            </p>
          </div>

          {/* -------------------------------------------------------------- */}
          {/* DEVELOPMENT TEAM — single section, no department split          */}
          {/* -------------------------------------------------------------- */}

          <div data-reveal className="relative">
            <div className="mb-8 flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-2 w-2 flex-shrink-0 rounded-full"
                style={{ backgroundColor: "#3B82F6" }}
              />

              <h2 className="font-code text-xs uppercase tracking-[0.2em] text-n-3">
                Development Team
              </h2>

              <span className="h-px flex-1 bg-n-6" />

              <span className="font-code text-xs text-n-5">
                {String(team.length).padStart(2, "0")}
              </span>
            </div>

            <div className="flex flex-wrap justify-start gap-x-6 gap-y-12 sm:gap-x-8 lg:gap-x-10">
              {team.map((member, index) => (
                <EmployeePortrait key={member.slug} member={member} colors={getPortraitColors(index)} />
              ))}
            </div>
          </div>

          <div data-reveal className="mt-24  border-n-6 pt-10 lg:mt-28">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <span className="font-code text-[9px] uppercase tracking-[0.2em] text-[#3B82F6]">
                  People
                </span>

                <h2 className="h3 mt-3">
                  Good ideas need
                  <br />
                  good people.
                </h2>
              </div>

              <p className="body-2 max-w-md text-n-3 lg:text-right">
                From engineering and AI to design and operations, every person
                contributes to the systems and products we build.
              </p>
            </div>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* CAREERS CTA                                                      */}
          {/* ---------------------------------------------------------------- */}

          <div
            data-reveal
            className="relative mt-16 overflow-hidden rounded-[2rem] border border-[#BFE0FF] bg-gradient-to-br from-[#F2F8FF] via-white to-[#EAF6FF] lg:mt-20"
          >
            <div className="pointer-events-none absolute -left-20 -top-24 h-[20rem] w-[26rem] rounded-full bg-[#93C5FD]/30 blur-[110px]" />
            <div className="pointer-events-none absolute -bottom-28 -right-16 h-[24rem] w-[24rem] rounded-full bg-[#60A5FA]/20 blur-[110px]" />

            <div
              className="pointer-events-none absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: `
                  linear-gradient(#1D4ED8 1px, transparent 1px),
                  linear-gradient(90deg, #1D4ED8 1px, transparent 1px)
                `,
                backgroundSize: "42px 42px",
              }}
            />

            <div className="relative px-6 py-14 text-center sm:px-10 lg:px-14 lg:py-16">
              <span className="font-code text-[10px] uppercase tracking-[0.2em] text-[#2563EB]">
                Work with us
              </span>

              <h3 className="h3 mb-5 mt-4 text-[#0F172A]">
                Want to build something intelligent?
              </h3>

              <p className="body-1 mx-auto mb-9 max-w-lg text-[#475569]">
                We are always interested in meeting people who love solving
                difficult problems, building useful technology, and learning
                along the way.
              </p>

              <a
                href="mailto:careers@maverickignite.com"
                className="group relative inline-flex items-center gap-4"
              >
                <span className="absolute -inset-3 rounded-2xl bg-[#3B82F6]/15 blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <span className="relative flex items-center gap-4 overflow-hidden rounded-xl bg-[#2563EB] px-7 py-4 transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-[#1D4ED8] group-hover:shadow-[0_16px_40px_-8px_rgba(37,99,235,0.45)]">
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.18] to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                  <span className="relative flex flex-col items-start">
                    <span className="font-code text-[9px] uppercase tracking-[0.2em] text-blue-100">
                      Say hello
                    </span>
                    <span className="text-base font-semibold text-white">
                      careers@maverickignite.com
                    </span>
                  </span>

                  <span className="relative flex h-11 w-11 items-center justify-center rounded-lg bg-white text-[#2563EB] transition-all duration-300 group-hover:translate-x-1">
                    <svg
                      width="19"
                      height="19"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h13" />
                      <path d="m13 6 6 6-6 6" />
                    </svg>
                  </span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default TeamPage;