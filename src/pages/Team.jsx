import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Section from "../components/Section";
import { BottomLine } from "../components/design/Hero";
import AINetworkBackground from "../components/AINetworkBackground";
import { team } from "../config/team";

// Re-exported for backward compatibility in case anything still does
// `import { team } from "./Team"` — the real data now lives in config/team.js.
export { team };

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* -------------------------------------------------------------------------- */
/* EMPLOYEE CARD                                                              */
/* -------------------------------------------------------------------------- */

const UserIcon = ({ size = 40 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
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

const EmployeeCard = ({ member, index }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;

    if (!card) return;

    if (!window.matchMedia("(hover: hover)").matches) return;

    // Give GSAP a recorded baseline for these two individual transform
    // properties before quickTo ever touches them — without this, resetting
    // to 0 on mouseleave has nothing to interpolate from and GSAP logs
    // "not eligible for reset" to the console.
    gsap.set(card, { transformPerspective: 800, rotateX: 0, rotateY: 0, force3D: true });

    const rotateX = gsap.quickTo(card, "rotateX", {
      duration: 0.45,
      ease: "power3.out",
    });

    const rotateY = gsap.quickTo(card, "rotateY", {
      duration: 0.45,
      ease: "power3.out",
    });

    const onMove = (event) => {
      const rect = card.getBoundingClientRect();

      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;

      rotateY(px * 5);
      rotateX(py * -5);
    };

    const onLeave = () => {
      rotateX(0);
      rotateY(0);
    };

    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);

    return () => {
      card.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <Link
      to={`/team/${member.slug}`}
      ref={cardRef}
      data-reveal
      className="group block"
      style={{ perspective: "1000px" }}
    >
      {/* fixed aspect ratio on every card — no mosaic tall/short mix */}
      <div className="relative aspect-[4/4.8] overflow-hidden border border-n-6 bg-n-7 transition-all duration-500 group-hover:border-[#3B82F6]/40">
        {/* Ghost index numeral */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-3 left-2 select-none font-code text-[5.5rem] font-bold leading-none text-white/[0.06]"
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

        <EmployeeImage member={member} />

        {/* Info overlay, pinned to the base of the photo */}
        <div className="absolute inset-x-0 bottom-0 z-20 p-4">
          <span className="font-code text-[9px] uppercase tracking-[0.18em] text-[#60A5FA]">
            {member.department}
          </span>

          <h3 className="mt-1 flex items-center justify-between gap-2 text-base font-semibold text-white">
            {member.name}
            <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-white/25 text-sm text-white opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100">
              →
            </span>
          </h3>
        </div>
      </div>
    </Link>
  );
};

/* -------------------------------------------------------------------------- */
/* IMAGE                                                                      */
/* -------------------------------------------------------------------------- */

const EmployeeImage = ({ member }) => {
  // No photo import for this member (photo is null) → skip the <img>
  // entirely and go straight to the user-icon fallback.
  const hasPhoto = Boolean(member.photo);

  return (
    <div className="relative h-full w-full">
      {hasPhoto && (
        <img
          src={member.photo}
          alt={member.name}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          onError={(event) => {
            // Covers a photo import that exists but fails to load at runtime.
            event.currentTarget.style.display = "none";
            event.currentTarget.nextElementSibling.style.display = "flex";
          }}
        />
      )}

      <div
        className={`absolute inset-0 items-center justify-center ${hasPhoto ? "hidden" : "flex"}`}
        style={{
          background:
            "radial-gradient(circle at 50% 40%, rgba(59,130,246,0.16), transparent 65%), #0A0E17",
        }}
      >
        <span className="text-[#60A5FA]/80">
          <UserIcon />
        </span>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* TEAM PAGE                                                                  */
/* -------------------------------------------------------------------------- */

const TeamPage = () => {
  const contentRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const content = contentRef.current;

    if (!content) return;

    const reduceMotion = window
      .matchMedia("(prefers-reduced-motion: reduce)")
      .matches;

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(progressRef.current, {
          scaleX: 1,
        });

        return;
      }

      ScrollTrigger.create({
        trigger: content,
        start: "top 80%",
        end: "bottom 65%",
        scrub: 0.6,
        onUpdate: (self) => {
          gsap.set(progressRef.current, {
            scaleX: self.progress,
          });
        },
      });

      gsap.from(content.querySelectorAll("[data-reveal]"), {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.06,
        scrollTrigger: {
          trigger: content,
          start: "top 82%",
        },
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

        {/* AI network */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.18]">
          <AINetworkBackground />
        </div>

        {/* Progress line */}
        <div className="relative mb-10 h-px w-full overflow-hidden rounded-full bg-n-6 lg:mb-14">
          <div
            ref={progressRef}
            className="absolute inset-y-0 left-0 w-full origin-left scale-x-0 bg-gradient-to-r from-[#1D4ED8] to-[#3B82F6]"
          />
        </div>

        <div ref={contentRef} className="relative">
          {/* ---------------------------------------------------------------- */}
          {/* BREADCRUMB + INTRO                                               */}
          {/* ---------------------------------------------------------------- */}

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
            className="mb-10 flex flex-col gap-6 border-b border-n-6 pb-10 lg:mb-14 lg:flex-row lg:items-end lg:justify-between"
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

          {/* ---------------------------------------------------------------- */}
          {/* TEAM GRID — uniform roster                                       */}
          {/* ---------------------------------------------------------------- */}

          <div className="grid grid-cols-1 items-start gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {team.map((member, index) => (
              <EmployeeCard key={member.slug} member={member} index={index} />
            ))}
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* TEAM FOOTER                                                      */}
          {/* ---------------------------------------------------------------- */}

          <div
            data-reveal
            className="mt-20 border-t border-n-6 pt-10 lg:mt-28"
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <span className="font-code text-[9px] uppercase tracking-[0.2em] text-[#3B82F6]">
                  01 — People
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

      <BottomLine />
    </Section>
  );
};

export default TeamPage;