import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "./Section";
import { BottomLine } from "./design/Hero";
import AINetworkBackground from "./AINetworkBackground";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const icons = {
  code: (
    <path d="M8 5 3 12l5 7M16 5l5 7-5 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  ),
  sync: (
    <path d="M4 12a8 8 0 0 1 13.6-5.7M20 12a8 8 0 0 1-13.6 5.7M14.5 4.3 17.6 6.3 15.6 9.4M9.5 19.7 6.4 17.7 8.4 14.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  ),
  target: (
    <path d="M9 6h10M9 12h10M9 18h10M4.5 6l.75.75L6.5 5.5M4.5 12l.75.75 1.25-1.25M4.5 18l.75.75 1.25-1.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  ),
  bolt: (
    <path d="M13 3 4 14h6l-1 7 9-11h-6l1-7Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  ),
};

// ---- Principles: distilled from the studio's own vision/mission + help-point
// copy, reshaped into Aivorylabs' 4-card numbered grid instead of two panels ----
const principles = [
  {
    icon: "bolt",
    title: "AI Built In, Not Bolted On",
    text: "We build web applications with machine intelligence built into the core — secure and stable enough to put in front of real customers.",
  },
  {
    icon: "target",
    title: "Ship What Matters",
    text: "We ship products, not proofs of concept — software built to hold up once real customers are using it.",
  },
  {
    icon: "sync",
    title: "Data That Survives Reality",
    text: "We design data infrastructure that survives contact with messy, real-world data, not just the demo dataset.",
  },
  {
    icon: "code",
    title: "Automation That Earns Its Keep",
    text: "We only automate a step once we understand why it exists — every system we hand over has to earn its keep.",
  },
];

const processSteps = [
  {
    title: "Understand & Architect",
    text: "We start by understanding what's actually slow, manual, or stuck — then design the system architecture before writing a line of code.",
  },
  {
    title: "Build & Iterate",
    text: "Structured sprints across React, Node, and Python, with continuous review cycles — nothing ships without scrutiny.",
  },
  {
    title: "Ship & Support",
    text: "We deploy, monitor, and stay on for iteration — not just the initial handoff.",
  },
];

const panelAccents = {
  deep: {
    border: "border-[#BFDBFE]",
    wash: "from-[#1D4ED8]/[0.05]",
    hoverShadow: "hover:shadow-[0_20px_45px_-22px_rgba(29,78,216,0.35)]",
    icon: "border-[#1D4ED8]/30 text-[#1D4ED8] bg-[#1D4ED8]/[0.05]",
    text: "#1D4ED8",
  },
  bright: {
    border: "border-[#BFDBFE]",
    wash: "from-[#3B82F6]/[0.05]",
    hoverShadow: "hover:shadow-[0_20px_45px_-22px_rgba(59,130,246,0.35)]",
    icon: "border-[#3B82F6]/30 text-[#3B82F6] bg-[#3B82F6]/[0.05]",
    text: "#3B82F6",
  },
};

const Panel = ({ accent = "deep", className = "", children }) => {
  const a = panelAccents[accent];
  return (
    <div className={`relative h-full rounded-2xl border ${a.border} bg-white shadow-[0_1px_3px_rgba(15,23,42,0.05)] ${a.hoverShadow} transition-shadow duration-300 overflow-hidden ${className}`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${a.wash} to-transparent pointer-events-none`} />
      <div className="relative h-full">{children}</div>
    </div>
  );
};

const PanelIcon = ({ accent, children }) => (
  <span className={`relative flex items-center justify-center w-11 h-11 rounded-xl border ${panelAccents[accent].icon}`}>
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none">{children}</svg>
  </span>
);

const AiCoreAnimation = () => {
  const center = { x: 200, y: 150 };
  const nodes = [
    { x: 310, y: 150 }, { x: 255, y: 245 }, { x: 145, y: 245 },
    { x: 90, y: 150 }, { x: 145, y: 55 }, { x: 255, y: 55 },
  ];

  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-[#BFDBFE] bg-white shadow-[0_25px_60px_-20px_rgba(37,99,235,0.35)]">
      <style>{`
        @keyframes aicore-breathe { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.07); } }
        @keyframes aicore-ring { 0% { transform: scale(0.9); opacity: 0.55; } 100% { transform: scale(2.6); opacity: 0; } }
        @keyframes aicore-orbit { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes aicore-flow { to { stroke-dashoffset: -24; } }
        @keyframes aicore-node-pulse { 0%, 100% { opacity: 0.55; } 50% { opacity: 1; } }
        .aicore-core { transform-origin: 200px 150px; animation: aicore-breathe 4s ease-in-out infinite; }
        .aicore-ring { transform-origin: 200px 150px; animation: aicore-ring 3s ease-out infinite; }
        .aicore-orbit { transform-origin: 200px 150px; animation: aicore-orbit 40s linear infinite; }
        .aicore-line { stroke-dasharray: 6 6; animation: aicore-flow 1.2s linear infinite; }
        .aicore-node { animation: aicore-node-pulse 2.4s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .aicore-core, .aicore-ring, .aicore-orbit, .aicore-line, .aicore-node { animation: none; }
        }
      `}</style>
      <svg viewBox="0 0 400 300" className="w-full h-full">
        <defs>
          <radialGradient id="aicore-core-grad" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </radialGradient>
        </defs>
        <rect width="400" height="300" fill="url(#aicore-core-grad)" opacity="0.03" />
        <circle className="aicore-orbit" cx="200" cy="150" r="120" fill="none" stroke="#93C5FD" strokeWidth="1" strokeDasharray="2 10" />
        {[0, 1, 2].map((i) => (
          <circle key={`ring-${i}`} className="aicore-ring" cx="200" cy="150" r="40" fill="none" stroke="#3B82F6" strokeWidth="2" style={{ animationDelay: `${i}s` }} />
        ))}
        {nodes.map((n, i) => (
          <line key={`line-${i}`} className="aicore-line" x1={center.x} y1={center.y} x2={n.x} y2={n.y} stroke="#93C5FD" strokeWidth="1.5" style={{ animationDelay: `${i * 0.15}s` }} />
        ))}
        {nodes.map((n, i) => (
          <g key={`node-${i}`} className="aicore-node" style={{ animationDelay: `${i * 0.3}s` }}>
            <circle cx={n.x} cy={n.y} r="9" fill="white" stroke="#2563EB" strokeWidth="1.5" />
            <circle cx={n.x} cy={n.y} r="3.5" fill="#2563EB" />
          </g>
        ))}
        <g className="aicore-core">
          <circle cx="200" cy="150" r="34" fill="url(#aicore-core-grad)" />
          <g transform="translate(200,150)">
            <path d="M6,-18 L-5,2 L3,2 L-6,18 L8,-2 L0,-2 Z" fill="white" />
          </g>
        </g>
      </svg>
    </div>
  );
};



const About = () => {
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
        end: "bottom 60%",
        scrub: 0.6,
        onUpdate: (self) => gsap.set(progressRef.current, { scaleX: self.progress }),
      });

      gsap.from(content.querySelectorAll("[data-reveal]"), {
        y: 28,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: content, start: "top 78%" },
      });
    }, content);

    return () => ctx.revert();
  }, []);

  return (
    <Section id="about">
      {/* Same display serif as Hero.jsx. If you've already moved that
          @import into index.html, delete this block — duplicating it here
          just makes sure this section still renders correctly on its own. */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;1,9..144,500&display=swap');
        .display-serif { font-family: 'Fraunces', Georgia, serif; }
      `}</style>

      <div className="container relative z-2">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[34rem] h-[16rem] rounded-full bg-[#1D4ED8]/[0.04] blur-[130px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[24rem] h-[24rem] rounded-full bg-[#3B82F6]/[0.04] blur-[120px] pointer-events-none" />
        <div className="hidden lg:block absolute inset-0 opacity-[0.05] pointer-events-none">
          <AINetworkBackground />
        </div>

        <div className="relative h-px w-full bg-n-6 rounded-full overflow-hidden mb-14 lg:mb-16">
          <div ref={progressRef} className="absolute inset-y-0 left-0 w-full origin-left scale-x-0 bg-gradient-to-r from-[#1D4ED8] to-[#3B82F6]" />
        </div>

        <div ref={contentRef} className="relative">

          {/* ============ WHO WE ARE: split statement + copy ============ */}
          <div data-reveal className="mb-20 lg:mb-24">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
              <div>
                <p className="font-code text-xs uppercase tracking-[0.2em] text-n-4 mb-6">
                  ( Who We Are )
                </p>
                <h1 className="display-serif text-[2.25rem] leading-[1.15] sm:text-[2.75rem] lg:text-[3.4rem] text-n-1 font-normal">
                  We build software that{" "}
                  <span className="italic bg-clip-text text-transparent bg-gradient-to-r from-[#1D4ED8] to-[#3B82F6]">
                    ships
                  </span>{" "}
                  real work and{" "}
                  <span className="italic bg-clip-text text-transparent bg-gradient-to-r from-[#1D4ED8] to-[#3B82F6]">
                    earns
                  </span>{" "}
                  its keep.
                </h1>
              </div>

              <div className="lg:pt-[3.4rem]">
                <p className="body-1 text-n-2 mb-5">
                  MaverickIgnite Solutions LLP is a small engineering studio
                  working out of Bengaluru. We started it because most
                  &quot;AI initiatives&quot; we came across were slide
                  decks, not software — convincing in a meeting room, and
                  gone by the time anyone tried to actually rely on them.
                </p>
                <p className="body-1 text-n-2 mb-9">
                  So that&apos;s what we build instead: the applications,
                  data pipelines, and internal tools that let a business
                  use machine intelligence the way it uses electricity —
                  quietly, reliably, and without anyone having to think
                  about it twice.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
                    style={{
                      background: "linear-gradient(90deg, #1D4ED8 0%, #3B82F6 100%)",
                      boxShadow: "0 12px 30px -10px rgba(29,78,216,0.45)",
                    }}
                  >
                    Schedule a Call
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17 17 7M7 7h10v10" />
                    </svg>
                  </a>

                  <Link
                    to="/team"
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-n-1 border border-n-1/25 transition-colors duration-300 hover:border-n-1/50"
                  >
                    Meet the Team
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17 17 7M7 7h10v10" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* ============ PRINCIPLES ============ */}
          <div className="mb-16 lg:mb-20">
            <p data-reveal className="font-code text-xs uppercase tracking-[0.2em] text-n-4 mb-4">
              ( Principles )
            </p>
            <h3 data-reveal className="h3 mb-10 max-w-xl">
              How we think about engineering
            </h3>
            <div className="grid sm:grid-cols-2 gap-5 lg:gap-6">
              {principles.map((p, index) => (
                <div key={p.title} data-reveal className="group">
                  <Panel accent={index % 2 === 0 ? "deep" : "bright"}>
                    <div className="relative p-6 lg:p-8 h-full transition-transform duration-300 group-hover:-translate-y-1">
                      <div
                        className={`absolute -right-8 -top-8 w-28 h-28 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
                          index % 2 === 0 ? "bg-[#1D4ED8]/[0.06]" : "bg-[#3B82F6]/[0.06]"
                        }`}
                      />
                      <div className="relative flex items-center justify-between mb-5">
                        <PanelIcon accent={index % 2 === 0 ? "deep" : "bright"}>{icons[p.icon]}</PanelIcon>
                        <span
                          className="font-code text-xs opacity-50"
                          style={{ color: index % 2 === 0 ? "#1D4ED8" : "#3B82F6" }}
                        >
                          0{index + 1}
                        </span>
                      </div>
                      <h4 className="relative h5 mb-2 text-n-1">{p.title}</h4>
                      <p className="relative body-2 text-n-3">{p.text}</p>
                    </div>
                  </Panel>
                </div>
              ))}
            </div>
          </div>

          {/* ============ HOW WE WORK ============ */}
          <div className="mb-16 lg:mb-20">
            <p data-reveal className="font-code text-xs uppercase tracking-[0.2em] text-n-4 mb-4">
              ( How We Work )
            </p>
            <h3 data-reveal className="h3 mb-10 max-w-xl">Our process</h3>

            <div className="grid sm:grid-cols-3 gap-6 lg:gap-8 mb-12">
              {processSteps.map((step, index) => (
                <div key={step.title} data-reveal>
                  <span
                    className="font-code text-sm block mb-3"
                    style={{ color: index % 2 === 0 ? "#1D4ED8" : "#3B82F6" }}
                  >
                    0{index + 1}
                  </span>
                  <h5 className="h5 mb-2 text-n-1">{step.title}</h5>
                  <p className="body-2 text-n-3">{step.text}</p>
                </div>
              ))}
            </div>

            
          </div>

          {/* ============ CONTACT / CTA (unchanged design) ============ */}
          <div data-reveal>
            <div className="relative overflow-hidden rounded-[2rem] border border-[#BFE0FF] bg-gradient-to-br from-[#F2F8FF] via-white to-[#EAF6FF]">
              <div className="absolute -top-24 left-[10%] w-[26rem] h-[18rem] rounded-full bg-[#93C5FD]/35 blur-[110px] pointer-events-none" />
              <div className="absolute -bottom-28 -right-16 w-[24rem] h-[24rem] rounded-full bg-[#60A5FA]/25 blur-[110px] pointer-events-none" />
              <div
                className="absolute inset-0 opacity-[0.05] pointer-events-none"
                style={{
                  backgroundImage: `linear-gradient(#1D4ED8 1px, transparent 1px), linear-gradient(90deg, #1D4ED8 1px, transparent 1px)`,
                  backgroundSize: "42px 42px",
                }}
              />

              <div className="relative px-6 py-14 sm:px-10 lg:px-14 lg:py-16">
                <div className="grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-14 items-center">
                  <div className="text-center lg:text-left">
                    <p className="font-code text-[10px] uppercase tracking-[0.2em] text-[#2563EB] mb-5">
                      ( Start a Project )
                    </p>

                    <h3 className="h3 mb-5 text-[#0F172A]">
                      Have a project that needs engineering depth?
                    </h3>

                    <p className="body-1 text-[#475569] mb-9 max-w-md mx-auto lg:mx-0">
                      Tell us what&apos;s slow, manual, or stuck — we&apos;ll
                      tell you honestly whether AI is the right fix, then
                      build it if it is.
                    </p>

                    <a href="#contact" className="group relative inline-flex items-center gap-4">
                      <span className="absolute -inset-3 rounded-2xl bg-[#3B82F6]/15 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <span className="relative flex items-center gap-4 px-7 py-4 rounded-xl bg-[#2563EB] overflow-hidden transition-all duration-300 group-hover:bg-[#1D4ED8] group-hover:-translate-y-1 group-hover:shadow-[0_16px_40px_-8px_rgba(37,99,235,0.45)]">
                        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/[0.18] to-transparent" />
                        <span className="relative flex flex-col items-start">
                          <span className="font-code text-[9px] uppercase tracking-[0.2em] text-blue-100">
                            Start a conversation
                          </span>
                          <span className="font-semibold text-white text-base">
                            Build Something Intelligent
                          </span>
                        </span>
                        <span className="relative flex items-center justify-center w-11 h-11 rounded-lg bg-white text-[#2563EB] transition-all duration-300 group-hover:translate-x-1">
                          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h13" />
                            <path d="m13 6 6 6-6 6" />
                          </svg>
                        </span>
                      </span>
                    </a>
                  </div>

                  <div className="relative mx-auto w-full max-w-md lg:max-w-none">
                    <AiCoreAnimation />
                  </div>
                </div>

                <div className="mt-12 flex items-center justify-center gap-3">
                  <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#93C5FD]" />
                  <span className="font-code text-[9px] uppercase tracking-[0.18em] text-[#64748B]">
                    From concept → intelligence → impact
                  </span>
                  <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#93C5FD]" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <BottomLine />
    </Section>
  );
};

export default About;