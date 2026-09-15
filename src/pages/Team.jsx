import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Section from "../components/Section";
import { BottomLine } from "../components/design/Hero";
import AINetworkBackground from "../components/AINetworkBackground";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* -------------------------------------------------------------------------- */
/* TEAM DATA                                                                  */
/* -------------------------------------------------------------------------- */

export const team = [
  {
    name: "Hifzur Raheman Sanderwale",
    slug: "hifzur-raheman-sanderwale",
    department: "Engineering",
    photo: "/team/hifzur.jpg",
  },
  {
    name: "Zeeshan Karmikhan",
    slug: "zeeshan-karmikhan",
    department: "Engineering",
    photo: "/team/zeeshan.jpg",
  },
  {
    name: "Yaseen Sanderwale",
    slug: "yaseen-sanderwale",
    department: "AI & Machine Learning",
    photo: "/team/yaseen.jpg",
  },
  {
    name: "Musadiq Sanderwale",
    slug: "musadiq-sanderwale",
    department: "Product & Design",
    photo: "/team/musadiq.jpg",
  },
  {
    name: "Tufail Sanderwale",
    slug: "tufail-sanderwale",
    department: "Technology",
    photo: "/team/tufail.jpg",
  },
  {
    name: "Naveed Patait",
    slug: "naveed-patait",
    department: "Technology",
    photo: "/team/naveed.jpg",
  },
  {
    name: "Raquib Qadari",
    slug: "raquib-qadari",
    department: "Technology",
    photo: "/team/raquib.jpg",
  },
  {
    name: "Arifa Chamanshaikh",
    slug: "arifa-chamanshaikh",
    department: "Operations",
    photo: "/team/arifa.jpg",
  },
  {
    name: "Mudassir Sanderwale",
    slug: "mudassir-sanderwale",
    department: "Engineering",
    photo: "/team/mudassir.jpg",
  },
  {
    name: "Saklen Sajjan",
    slug: "saklen-sajjan",
    department: "Technology",
    photo: "/team/saklen.jpg",
  },
  {
    name: "Anas Sanderwale",
    slug: "anas-sanderwale",
    department: "Technology",
    photo: "/team/anas.jpg",
  },
  {
    name: "Subhan Sanderwale",
    slug: "subhan-sanderwale",
    department: "Technology",
    photo: "/team/subhan.jpg",
  },
  {
    name: "Asim Bage",
    slug: "asim-bage",
    department: "Technology",
    photo: "/team/asim.jpg",
  },

  // Add interns here when you are ready.
  // {
  //   name: "Intern Name",
  //   slug: "intern-name",
  //   department: "Intern",
  //   photo: "/team/intern-name.jpg",
  // },
];

/* -------------------------------------------------------------------------- */
/* HELPERS                                                                    */
/* -------------------------------------------------------------------------- */

const initialsOf = (name) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

/* -------------------------------------------------------------------------- */
/* EMPLOYEE CARD                                                              */
/* -------------------------------------------------------------------------- */

const EmployeeCard = ({ member, index }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;

    if (!card) return;

    if (!window.matchMedia("(hover: hover)").matches) return;

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

      rotateY(px * 6);
      rotateX(py * -6);
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
      style={{
        perspective: "1000px",
      }}
    >
      <div className="relative overflow-hidden rounded-[1.5rem] border border-n-6 bg-n-7 transition-all duration-500 group-hover:border-[#3B82F6]/40 group-hover:-translate-y-1 group-hover:shadow-[0_25px_70px_-25px_rgba(37,99,235,0.35)]">
        {/* Image */}
        <div className="relative aspect-[4/4.7] overflow-hidden bg-n-6">
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />

          <div className="absolute top-4 left-4 z-20">
            <span className="font-code text-[9px] uppercase tracking-[0.18em] text-white/70">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <EmployeeImage member={member} />
          
          {/* Hover overlay */}
          <div className="absolute inset-0 z-20 flex items-end p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-[#1D4ED8]">
              View profile
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h13" />
                <path d="m13 6 6 6-6 6" />
              </svg>
            </span>
          </div>
        </div>

        {/* Information */}
        <div className="p-5">
          <div className="mb-2">
            <span className="font-code text-[9px] uppercase tracking-[0.18em] text-[#3B82F6]">
              {member.department}
            </span>
          </div>

          <h3 className="text-lg font-semibold text-n-1 transition-colors duration-300 group-hover:text-[#60A5FA]">
            {member.name}
          </h3>

          <div className="mt-4 flex items-center justify-between border-t border-n-6 pt-4">
            <span className="font-code text-[9px] uppercase tracking-[0.16em] text-n-4">
              Team member
            </span>

            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-n-6 text-n-3 transition-all duration-300 group-hover:border-[#3B82F6]/40 group-hover:bg-[#3B82F6]/10 group-hover:text-[#60A5FA]">
              →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

/* -------------------------------------------------------------------------- */
/* IMAGE                                                                      */
/* -------------------------------------------------------------------------- */

const EmployeeImage = ({ member }) => {
  const initials = initialsOf(member.name);

  return (
    <div className="relative h-full w-full">
      <img
        src={member.photo}
        alt={member.name}
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        onError={(event) => {
          event.currentTarget.style.display = "none";
          event.currentTarget.nextElementSibling.style.display = "flex";
        }}
      />

      <div
        className="absolute inset-0 hidden items-center justify-center"
        style={{
          background:
            "radial-gradient(circle at center, rgba(59,130,246,0.18), transparent 65%), #080B12",
        }}
      >
        <span className="text-5xl font-semibold text-[#60A5FA]">
          {initials}
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
        y: 25,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.07,
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
        <div className="relative mb-14 h-px w-full overflow-hidden rounded-full bg-n-6 lg:mb-20">
          <div
            ref={progressRef}
            className="absolute inset-y-0 left-0 w-full origin-left scale-x-0 bg-gradient-to-r from-[#1D4ED8] to-[#3B82F6]"
          />
        </div>

        <div ref={contentRef} className="relative">
          {/* ---------------------------------------------------------------- */}
          {/* INTRO                                                            */}
          {/* ---------------------------------------------------------------- */}

          <div data-reveal className="mb-14 max-w-3xl lg:mb-20">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-[#3B82F6]" />

              <span className="font-code text-[10px] uppercase tracking-[0.2em] text-[#60A5FA]">
                MaverickIgnite / Team
              </span>
            </div>

            <h1 className="h2 mb-6">
              Meet the people
              <br />
              <span className="text-n-3">behind MaverickIgnite.</span>
            </h1>

            <p className="body-1 max-w-2xl text-n-2">
              A team of engineers, designers, builders, and problem solvers
              working together to turn ideas into intelligent products and
              scalable technology.
            </p>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* TEAM GRID                                                        */}
          {/* ---------------------------------------------------------------- */}

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {team.map((member, index) => (
              <EmployeeCard
                key={member.slug}
                member={member}
                index={index}
              />
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