import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import gsap from "gsap";

import Section from "../components/Section";
import { BottomLine } from "../components/design/Hero";
import AINetworkBackground from "../components/AINetworkBackground";

import { team } from "../config/team";

/* -------------------------------------------------------------------------- */
/* ICONS                                                                      */
/* -------------------------------------------------------------------------- */

const UserIcon = ({ size = 40, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

/* -------------------------------------------------------------------------- */
/* PAGE                                                                       */
/* -------------------------------------------------------------------------- */

const TeamMemberPage = () => {
  const { slug } = useParams();

  const contentRef = useRef(null);
  const imageRef = useRef(null);

  const [imageFailed, setImageFailed] = useState(false);

  const memberIndex = useMemo(
    () => team.findIndex((person) => person.slug === slug),
    [slug]
  );

  const member = useMemo(
    () => team.find((person) => person.slug === slug),
    [slug]
  );

  useEffect(() => {
    if (!contentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-member-reveal]", {
        y: 22,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
      });

      if (imageRef.current) {
        gsap.from(imageRef.current, {
          clipPath: "inset(0 0 100% 0)",
          duration: 0.9,
          ease: "power3.out",
        });
      }
    }, contentRef);

    return () => ctx.revert();
  }, [slug]);

  if (!member) {
    return (
      <Section customPaddings="pt-28 pb-24 lg:pt-32 lg:pb-32">
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

  const hasPhoto = Boolean(member.photo) && !imageFailed;
  const fileNumber = String(memberIndex + 1).padStart(3, "0");

  return (
    <Section
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings="pt-10 pb-20 lg:pt-14 lg:pb-28"
    >
      <div className="container relative z-2">
        {/* Background */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-[40rem] w-[60rem] -translate-x-1/2 rounded-full bg-[#1D4ED8]/[0.055] blur-[150px]" />

        <div className="pointer-events-none absolute inset-0 opacity-[0.15]">
          <AINetworkBackground />
        </div>

        <div ref={contentRef} className="relative">
          {/* ==================================================
              BREADCRUMB
             ================================================== */}
          <nav
            aria-label="Breadcrumb"
            data-member-reveal
            className="mb-6 flex flex-wrap items-center gap-2 font-code text-xs uppercase tracking-wider"
          >
            <Link
              to="/"
              className="text-n-4 hover:text-[#3B82F6] transition-colors"
            >
              Home
            </Link>

            <span className="text-n-1 select-none">›</span>

            <Link
              to="/team"
              className="text-n-4 hover:text-[#3B82F6] transition-colors"
            >
              Team
            </Link>

            <span className="text-n-1 select-none">›</span>

            <span className="text-[#3B82F6]" aria-current="page">
              {member.name}
            </span>
          </nav>

          {/* ==================================================
              DOSSIER HEADER — id card + name/meta ledger
             ================================================== */}
          <div className="grid gap-8 border-t border-n-6 pt-8 lg:grid-cols-[15.5rem_1fr] lg:gap-14 lg:pt-10">
            {/* ID card */}
            <div data-member-reveal className="lg:pt-1">
              <div
                ref={imageRef}
                className="relative mx-auto w-full max-w-[15.5rem] lg:mx-0"
              >
                <div
                  className="relative aspect-[3/4] overflow-hidden border border-[#3B82F6]/25 bg-n-7"
                  style={{
                    clipPath:
                      "polygon(0 0, 100% 0, 100% 100%, 1.25rem 100%, 0 calc(100% - 1.25rem))",
                  }}
                >
                  {hasPhoto ? (
                    <img
                      src={member.photo}
                      alt={member.name}
                      onError={() => setImageFailed(true)}
                      className="h-full w-full object-cover grayscale-[15%]"
                    />
                  ) : (
                    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-[#0B1220] via-[#101B32] to-[#07101F]">
                      <div
                        className="pointer-events-none absolute inset-0 opacity-[0.35]"
                        style={{
                          backgroundImage:
                            "linear-gradient(#3B82F6 1px, transparent 1px), linear-gradient(90deg, #3B82F6 1px, transparent 1px)",
                          backgroundSize: "18px 18px",
                        }}
                      />
                      <UserIcon size={44} className="relative text-[#60A5FA]" />
                    </div>
                  )}

                  {/* scan line accent */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[#3B82F6]/60" />
                </div>

                {/* File tab */}
                <div className="flex items-center justify-between border-x border-b border-n-6 bg-n-7 px-3 py-2">
                  <span className="font-code text-[10px] uppercase tracking-[0.16em] text-n-4">
                    File / {fileNumber}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
                </div>
              </div>
            </div>

            {/* Name + meta */}
            <div data-member-reveal className="relative">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-4 right-0 hidden select-none font-code text-[7rem] font-bold leading-none text-n-6/40 lg:-top-8 lg:block xl:text-[9rem]"
              >
                {fileNumber}
              </span>

              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-8 bg-[#3B82F6]" />
                <span className="font-code text-[10px] uppercase tracking-[0.2em] text-[#60A5FA]">
                  {member.department}
                </span>
              </div>

              <h1 className="h2 relative mb-5 max-w-xl">{member.name}</h1>

              <p className="body-1 mb-8 max-w-lg text-n-2">
                {member.introduction ||
                  "A member of the MaverickIgnite team contributing to the work we build together."}
              </p>

              {/* Spec sheet */}
              <dl className="grid max-w-lg grid-cols-2 gap-x-6 gap-y-4 border-y border-n-6 py-5 sm:grid-cols-3">
                <div>
                  <dt className="font-code text-[9px] uppercase tracking-[0.18em] text-n-4">
                    Role
                  </dt>
                  <dd className="mt-1 text-sm text-n-1">
                    {member.title || "Team Member"}
                  </dd>
                </div>
                <div>
                  <dt className="font-code text-[9px] uppercase tracking-[0.18em] text-n-4">
                    Department
                  </dt>
                  <dd className="mt-1 text-sm text-n-1">{member.department}</dd>
                </div>
                <div>
                  <dt className="font-code text-[9px] uppercase tracking-[0.18em] text-n-4">
                    Status
                  </dt>
                  <dd className="mt-1 text-sm text-n-1">Active</dd>
                </div>
              </dl>

              {/* About */}
              <div className="mt-8 max-w-lg">
                <span className="font-code text-[9px] uppercase tracking-[0.2em] text-[#3B82F6]">
                  About
                </span>
                <p className="body-2 mt-3 text-n-3">
                  {member.about ||
                    "More information about this team member will be added soon."}
                </p>
              </div>

              {/* Expertise — inline ledger rather than pill tags */}
              {member.expertise?.length > 0 && (
                <div className="mt-8">
                  <span className="font-code text-[9px] uppercase tracking-[0.2em] text-[#3B82F6]">
                    Areas of focus
                  </span>

                  <ul className="mt-3 flex max-w-lg flex-wrap gap-x-6 gap-y-2">
                    {member.expertise.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-sm text-n-2"
                      >
                        <span className="h-1 w-1 rounded-full bg-[#3B82F6]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* OTHER TEAM MEMBERS — horizontal filmstrip                       */}
          {/* ---------------------------------------------------------------- */}

          <div
            data-member-reveal
            className="mt-20 border-t border-n-6 pt-10 lg:mt-24"
          >
            <div className="mb-6 flex items-end justify-between">
              <div>
                <span className="font-code text-[9px] uppercase tracking-[0.2em] text-[#3B82F6]">
                  More people
                </span>

                <h2 className="h4 mt-2">Meet the rest of the team.</h2>
              </div>

              <Link
                to="/team"
                className="hidden font-code text-[9px] uppercase tracking-[0.18em] text-n-3 transition-colors hover:text-[#60A5FA] sm:block"
              >
                View all →
              </Link>
            </div>

            <div className="-mx-1 flex gap-3 overflow-x-auto pb-2">
              {team
                .filter((person) => person.slug !== member.slug)
                .slice(0, 6)
                .map((person) => (
                  <FilmstripCard key={person.slug} person={person} />
                ))}
            </div>
          </div>
        </div>
      </div>

      <BottomLine />
    </Section>
  );
};

/* -------------------------------------------------------------------------- */
/* FILMSTRIP CARD                                                             */
/* -------------------------------------------------------------------------- */

const FilmstripCard = ({ person }) => {
  const [failed, setFailed] = useState(false);
  const hasPhoto = Boolean(person.photo) && !failed;

  return (
    <Link
      to={`/team/${person.slug}`}
      className="group flex w-32 flex-shrink-0 flex-col gap-2 px-1 sm:w-36"
    >
      <div className="relative aspect-[3/4] overflow-hidden border border-n-6 bg-n-7 transition-colors duration-300 group-hover:border-[#3B82F6]/40">
        {hasPhoto ? (
          <img
            src={person.photo}
            alt={person.name}
            className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
            onError={() => setFailed(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-n-8">
            <UserIcon size={26} className="text-[#60A5FA]/70" />
          </div>
        )}
      </div>

      <p className="text-xs font-medium text-n-1 group-hover:text-[#60A5FA]">
        {person.name}
      </p>
    </Link>
  );
};

export default TeamMemberPage;