import { useEffect, useRef } from "react";
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
    <path
      d="M8 5 3 12l5 7M16 5l5 7-5 7"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  sync: (
    <path
      d="M4 12a8 8 0 0 1 13.6-5.7M20 12a8 8 0 0 1-13.6 5.7M14.5 4.3 17.6 6.3 15.6 9.4M9.5 19.7 6.4 17.7 8.4 14.6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  bolt: (
    <path
      d="M13 3 4 14h6l-1 7 9-11h-6l1-7Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  data: (
    <path
      d="M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3Zm0 0v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
};

const helpPoints = [
  {
    icon: "code",
    question: "Need intelligent software?",
    answer:
      "We build AI-powered web applications that are secure, scalable, and ready for the enterprise.",
  },
  {
    icon: "sync",
    question: "Want to bring AI into your workflow?",
    answer:
      "We embed machine learning and automation into the systems you already run, so decisions get smarter without a rebuild.",
  },
  {
    icon: "bolt",
    question: "Buried in manual processes?",
    answer:
      "We design smart tooling that removes repetitive work and gives your team hours back.",
  },
  {
    icon: "data",
    question: "Drowning in data you can&apos;t use?",
    answer:
      "We architect cloud-native pipelines that turn scattered data into insight you can act on.",
  },
];

const facts = [
  { label: "Founded", value: "2023" },
  { label: "Based in", value: "Bengaluru, India" },
  { label: "Focus", value: "AI-first engineering" },
];

const Panel = ({ innerRef, accent = "mixed", className = "", children }) => {
  const gradients = {
    deep: "from-[#1D4ED8]/40 via-n-6 to-n-6",
    bright: "from-[#3B82F6]/40 via-n-6 to-n-6",
    mixed: "from-[#1D4ED8]/30 via-n-6 to-[#3B82F6]/30",
  };
  return (
    <div
      className={`rounded-3xl p-[1px] bg-gradient-to-br ${gradients[accent]} ${className}`}
    >
      <div
        ref={innerRef}
        className="relative h-full rounded-[calc(1.5rem-1px)] bg-n-8/90 backdrop-blur-sm overflow-hidden"
      >
        {children}
      </div>
    </div>
  );
};

const AiCoreAnimation = () => {
  const center = { x: 200, y: 150 };
  const nodes = [
    { x: 310, y: 150 },
    { x: 255, y: 245 },
    { x: 145, y: 245 },
    { x: 90, y: 150 },
    { x: 145, y: 55 },
    { x: 255, y: 55 },
  ];

  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-[#BFDBFE] bg-white shadow-[0_25px_60px_-20px_rgba(37,99,235,0.35)]">
      <style>{`
        @keyframes aicore-breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.07); }
        }
        @keyframes aicore-ring {
          0% { transform: scale(0.9); opacity: 0.55; }
          100% { transform: scale(2.6); opacity: 0; }
        }
        @keyframes aicore-orbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes aicore-flow {
          to { stroke-dashoffset: -24; }
        }
        @keyframes aicore-node-pulse {
          0%, 100% { opacity: 0.55; }
          50% { opacity: 1; }
        }
        .aicore-core {
          transform-origin: 200px 150px;
          animation: aicore-breathe 4s ease-in-out infinite;
        }
        .aicore-ring {
          transform-origin: 200px 150px;
          animation: aicore-ring 3s ease-out infinite;
        }
        .aicore-orbit {
          transform-origin: 200px 150px;
          animation: aicore-orbit 40s linear infinite;
        }
        .aicore-line {
          stroke-dasharray: 6 6;
          animation: aicore-flow 1.2s linear infinite;
        }
        .aicore-node {
          animation: aicore-node-pulse 2.4s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .aicore-core, .aicore-ring, .aicore-orbit, .aicore-line, .aicore-node {
            animation: none;
          }
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

        <circle
          className="aicore-orbit"
          cx="200"
          cy="150"
          r="120"
          fill="none"
          stroke="#93C5FD"
          strokeWidth="1"
          strokeDasharray="2 10"
        />

        {[0, 1, 2].map((i) => (
          <circle
            key={`ring-${i}`}
            className="aicore-ring"
            cx="200"
            cy="150"
            r="40"
            fill="none"
            stroke="#3B82F6"
            strokeWidth="2"
            style={{ animationDelay: `${i}s` }}
          />
        ))}

        {nodes.map((n, i) => (
          <line
            key={`line-${i}`}
            className="aicore-line"
            x1={center.x}
            y1={center.y}
            x2={n.x}
            y2={n.y}
            stroke="#93C5FD"
            strokeWidth="1.5"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}

        {nodes.map((n, i) => (
          <g
            key={`node-${i}`}
            className="aicore-node"
            style={{ animationDelay: `${i * 0.3}s` }}
          >
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
  const visionRef = useRef(null);
  const missionRef = useRef(null);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

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
        onUpdate: (self) =>
          gsap.set(progressRef.current, { scaleX: self.progress }),
      });

      gsap.from(content.querySelectorAll("[data-reveal]"), {
        y: 28,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: content, start: "top 78%" },
      });

      if (window.matchMedia("(hover: hover)").matches) {
        [visionRef.current, missionRef.current].forEach((panel) => {
          if (!panel) return;
          const setRX = gsap.quickTo(panel, "rotateX", {
            duration: 0.4,
            ease: "power3.out",
          });
          const setRY = gsap.quickTo(panel, "rotateY", {
            duration: 0.4,
            ease: "power3.out",
          });
          const onMove = (e) => {
            const rect = panel.getBoundingClientRect();
            const px = (e.clientX - rect.left) / rect.width - 0.5;
            const py = (e.clientY - rect.top) / rect.height - 0.5;
            setRY(px * 6);
            setRX(py * -6);
          };
          const onLeave = () => {
            setRX(0);
            setRY(0);
          };
          panel.addEventListener("mousemove", onMove);
          panel.addEventListener("mouseleave", onLeave);
          panel._cleanupTilt = () => {
            panel.removeEventListener("mousemove", onMove);
            panel.removeEventListener("mouseleave", onLeave);
          };
        });
      }
    }, content);

    return () => {
      ctx.revert();
      [visionRef.current, missionRef.current].forEach(
        (panel) => panel?._cleanupTilt?.()
      );
    };
  }, []);

  return (
    <Section crosses crossesOffset="lg:translate-y-[5.25rem]" id="about">
      <div className="container relative z-2">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60rem] h-[40rem] rounded-full bg-[#1D4ED8]/[0.06] blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] rounded-full bg-[#3B82F6]/[0.07] blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 opacity-25 pointer-events-none">
          <AINetworkBackground />
        </div>

        <div className="relative h-px w-full bg-n-6 rounded-full overflow-hidden mb-14 lg:mb-16">
          <div
            ref={progressRef}
            className="absolute inset-y-0 left-0 w-full origin-left scale-x-0 bg-gradient-to-r from-[#1D4ED8] to-[#3B82F6]"
          />
        </div>

        <div ref={contentRef} className="relative">
          <div
            data-reveal
            className="grid lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-16 items-end mb-16 lg:mb-20"
          >
            <div>
              <h2 className="h2 mb-6">Who we are</h2>
              <p className="body-1 text-n-2 max-w-xl">
                MaverickIgnite Solutions LLP is an AI-first engineering
                studio. We design and build the software layer that lets
                businesses put artificial intelligence to work — in their
                products, their data, and the systems that run their day.
              </p>
            </div>

            <Panel accent="mixed">
              <div className="flex flex-col p-6 lg:p-7">
                {facts.map((fact, index) => (
                  <div
                    key={fact.label}
                    className={`flex items-center justify-between py-4 ${
                      index !== facts.length - 1 ? "border-b border-n-6" : ""
                    } ${index === 0 ? "pt-0" : ""} ${
                      index === facts.length - 1 ? "pb-0" : ""
                    }`}
                  >
                    <span className="body-2 text-n-4">{fact.label}</span>
                    <span className="h5 text-n-1">{fact.value}</span>
                  </div>
                ))}
              </div>
            </Panel>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 mb-16 lg:mb-20">
            <div data-reveal style={{ perspective: "1000px" }}>
              <Panel innerRef={visionRef} accent="deep" className="h-full">
                <div className="relative p-8 lg:p-10 h-full">
                  <div className="absolute -top-20 -left-20 w-56 h-56 rounded-full bg-[#1D4ED8]/10 blur-[90px] pointer-events-none" />
                  <p className="tagline text-n-4 mb-4 relative">
                    Where we&apos;re headed
                  </p>
                  <p className="h4 text-n-1 leading-snug relative">
                    A world where companies of any size can build with AI on
                    equal footing — where intelligent engineering and
                    data-driven decisions are simply how software gets made.
                  </p>
                </div>
              </Panel>
            </div>

            <div data-reveal style={{ perspective: "1000px" }}>
              <Panel innerRef={missionRef} accent="bright" className="h-full">
                <div className="relative p-8 lg:p-10 h-full">
                  <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-[#3B82F6]/10 blur-[90px] pointer-events-none" />
                  <p className="tagline text-n-4 mb-4 relative">
                    What we do every day
                  </p>
                  <ul className="relative flex flex-col gap-4">
                    <li className="flex gap-3 body-2 text-n-2">
                      <span className="mt-[7px] w-[6px] h-[6px] shrink-0 bg-[#3B82F6]" />
                      Ship AI-driven software and enterprise-grade platforms
                      built to scale.
                    </li>
                    <li className="flex gap-3 body-2 text-n-2">
                      <span className="mt-[7px] w-[6px] h-[6px] shrink-0 bg-[#3B82F6]" />
                      Engineer modern data infrastructure that cuts through
                      complexity.
                    </li>
                    <li className="flex gap-3 body-2 text-n-2">
                      <span className="mt-[7px] w-[6px] h-[6px] shrink-0 bg-[#3B82F6]" />
                      Automate with purpose — every system earns its place.
                    </li>
                  </ul>
                </div>
              </Panel>
            </div>
          </div>

          <div className="mb-16 lg:mb-20">
            <h3 data-reveal className="h3 mb-10 max-w-xl">
              How we help businesses like yours
            </h3>
            <div className="grid sm:grid-cols-2 gap-5 lg:gap-6">
              {helpPoints.map((point, index) => (
                <div key={index} data-reveal className="group">
                  <Panel accent={index % 2 === 0 ? "deep" : "bright"}>
                    <div className="relative p-6 lg:p-8 h-full transition-transform duration-300 group-hover:-translate-y-1">
                      <div
                        className={`absolute -right-8 -top-8 w-28 h-28 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
                          index % 2 === 0 ? "bg-[#1D4ED8]/10" : "bg-[#3B82F6]/10"
                        }`}
                      />
                      <span
                        className={`relative flex items-center justify-center w-11 h-11 mb-5 rounded-xl border ${
                          index % 2 === 0
                            ? "border-[#1D4ED8]/40 text-[#1D4ED8]"
                            : "border-[#3B82F6]/40 text-[#3B82F6]"
                        }`}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          width="20"
                          height="20"
                          fill="none"
                        >
                          {icons[point.icon]}
                        </svg>
                      </span>
                      <h4 className="relative h5 mb-2 text-n-1">
                        {point.question}
                      </h4>
                      <p className="relative body-2 text-n-3">
                        {point.answer}
                      </p>
                    </div>
                  </Panel>
                </div>
              ))}
            </div>
          </div>

          {/* ---- Bright CTA panel with video showcase ---- */}
          <div data-reveal>
            <div className="relative overflow-hidden rounded-[2rem] border border-[#BFE0FF] bg-gradient-to-br from-[#F2F8FF] via-white to-[#EAF6FF]">
              {/* Soft daylight glow, not a dark vignette */}
              <div className="absolute -top-24 left-[10%] w-[26rem] h-[18rem] rounded-full bg-[#93C5FD]/35 blur-[110px] pointer-events-none" />
              <div className="absolute -bottom-28 -right-16 w-[24rem] h-[24rem] rounded-full bg-[#60A5FA]/25 blur-[110px] pointer-events-none" />

              {/* Faint technical grid, tuned for a light surface */}
              <div
                className="absolute inset-0 opacity-[0.05] pointer-events-none"
                style={{
                  backgroundImage: `
                    linear-gradient(#1D4ED8 1px, transparent 1px),
                    linear-gradient(90deg, #1D4ED8 1px, transparent 1px)
                  `,
                  backgroundSize: "42px 42px",
                }}
              />

              <div className="relative px-6 py-14 sm:px-10 lg:px-14 lg:py-16">
                <div className="grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-14 items-center">
                  {/* Copy + CTA */}
                  <div className="text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-[#BFDBFE] bg-white/80 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3B82F6] opacity-50" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2563EB]" />
                      </span>
                      <span className="font-code text-[10px] uppercase tracking-[0.2em] text-[#2563EB]">
                        AI transformation starts here
                      </span>
                    </div>

                    <h3 className="h3 mb-5 text-[#0F172A]">
                      Ready to make your business AI-ready?
                    </h3>

                    <p className="body-1 text-[#475569] mb-9 max-w-md mx-auto lg:mx-0">
                      Turn ideas into intelligent products, smarter
                      workflows, and scalable systems built for what comes
                      next.
                    </p>

                    <a
                      href="#contact"
                      className="group relative inline-flex items-center gap-4"
                    >
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

                  {/* AI core animation — built entirely in SVG/CSS, no video file */}
                  <div className="relative mx-auto w-full max-w-md lg:max-w-none">
                    <AiCoreAnimation />
                  </div>
                </div>

                {/* Bottom signal */}
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