import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "./Section";
import { BottomLine } from "./design/Hero";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ------------------------------------------------------------------ *
 *  THEME
 * ------------------------------------------------------------------ */
const INK = "#0B1B3A";
const BLUE_DEEP = "#1D4ED8";
const BLUE = "#3B82F6";
const SKY = "#60A5FA";
const AMBER = "#D97706";

/* ------------------------------ icons ----------------------------- */
const icons = {
  code: <path d="M8 5 3 12l5 7M16 5l5 7-5 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  sync: <path d="M4 12a8 8 0 0 1 13.6-5.7M20 12a8 8 0 0 1-13.6 5.7M14.5 4.3 17.6 6.3 15.6 9.4M9.5 19.7 6.4 17.7 8.4 14.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  target: <path d="M9 6h10M9 12h10M9 18h10M4.5 6l.75.75L6.5 5.5M4.5 12l.75.75 1.25-1.25M4.5 18l.75.75 1.25-1.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  bolt: <path d="M13 3 4 14h6l-1 7 9-11h-6l1-7Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  cross: <path d="M7 7l10 10M17 7 7 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />,
};

const iconsSolid = {
  bolt: <path d="M13 3 4 14h6l-1 7 9-11h-6l1-7Z" fill="currentColor" />,
  target: (
    <g fill="currentColor">
      <rect x="9" y="5.2" width="11" height="1.8" rx="0.9" />
      <rect x="9" y="11.1" width="11" height="1.8" rx="0.9" />
      <rect x="9" y="17" width="11" height="1.8" rx="0.9" />
      <circle cx="5.4" cy="6.1" r="1.9" />
      <circle cx="5.4" cy="12" r="1.9" />
      <circle cx="5.4" cy="17.9" r="1.9" />
    </g>
  ),
  sync: (
    <g fill="currentColor">
      <path d="M12 4a8 8 0 0 1 7.4 5h-2.2A6 6 0 0 0 6 12H4a8 8 0 0 1 8-8Z" />
      <path d="M12 20a8 8 0 0 1-7.4-5h2.2A6 6 0 0 0 18 12h2a8 8 0 0 1-8 8Z" />
    </g>
  ),
  code: (
    <g fill="currentColor">
      <path d="M8.9 4.3a1.2 1.2 0 0 1 .2 1.7L5.5 12l3.6 6a1.2 1.2 0 1 1-1.9 1.4l-4-6.7a1.2 1.2 0 0 1 0-1.4l4-6.7a1.2 1.2 0 0 1 1.7-.3Z" />
      <path d="M15.1 4.3a1.2 1.2 0 0 0-.2 1.7l3.6 6-3.6 6a1.2 1.2 0 1 0 1.9 1.4l4-6.7a1.2 1.2 0 0 0 0-1.4l-4-6.7a1.2 1.2 0 0 0-1.7-.3Z" />
    </g>
  ),
};

/* ------------------------------ content --------------------------- */
const brokenPromises = [
  "A demo that only works on the demo data?",
  "Six months to a first working screen?",
  "A pipeline nobody can debug at 2am?",
  "An AI feature bolted on after launch?",
  "A handover doc instead of a handover?",
];

const whyItBreaks = [
  "the data is messier than anyone admitted at kickoff",
  "the model is judged on accuracy, not on the decision it changes",
  "nobody owns the thing once the pilot ends",
  "it was built to impress a room, not to survive a Monday",
];

const processSteps = [
  {
    kicker: "First",
    title: "Understand & architect",
    text: "We start by understanding what's actually slow, manual, or stuck — then design the system architecture before writing a line of code.",
  },
  {
    kicker: "Then",
    title: "Build & iterate",
    text: "Structured sprints across React, Node, and Python, with continuous review cycles — nothing ships without scrutiny.",
  },
  {
    kicker: "After that",
    title: "Ship & support",
    text: "We deploy, monitor, and stay on for iteration — not just the initial handoff.",
  },
];

const pillars = [
  {
    key: "depth",
    label: "Depth",
    heading: "Engineers who read the whole problem, not the ticket",
    body: [
      "Most AI work fails one layer below the model — in the join that silently drops 8% of rows, the queue that retries forever, the schema that changed last quarter. That layer is where we spend our time.",
      "Every project is architected before it is coded, and reviewed by someone who didn't write it.",
    ],
    proof: [
      "Architecture decided before the first commit",
      "Review by an engineer who didn't write the code",
      "Failure modes written down, not discovered later",
    ],
  },
  {
    key: "directness",
    label: "Directness",
    heading: "No relay between you and the people building it",
    body: [
      "There's no account manager translating your problem into a brief and the brief back into an update. You're in the same room as the engineers, which is the only way a product stays close to the problem it was meant to solve.",
      "If we think AI is the wrong fix for what you've described, you'll hear that in the first conversation rather than in month four.",
    ],
    proof: [
      "One thread, one team, no translation layer",
      "An honest read on whether AI is even the fix",
      "Trade-offs surfaced while they're still cheap",
    ],
  },
  {
    key: "tempo",
    label: "Tempo",
    heading: "Something running early, then kept running",
    body: [
      "We'd rather put a thin, real slice of the system in front of you quickly than spend weeks producing a document about it. Real usage tells you things a spec never will.",
      "After launch we stay on — monitoring, tuning, and picking up the next thing the data teaches us.",
    ],
    proof: [
      "A working slice before a finished document",
      "Short sprints with visible output each cycle",
      "We stay on after launch, not just through it",
    ],
  },
];

const values = [
  { icon: "bolt", title: "AI built in, not bolted on", text: "Machine intelligence sits in the core of the application — secure and stable enough to put in front of real customers." },
  { icon: "target", title: "Ship what matters", text: "Products, not proofs of concept. Software built to hold up once real customers are using it." },
  { icon: "sync", title: "Data that survives reality", text: "Infrastructure designed for messy, real-world data — not just the tidy demo dataset." },
  { icon: "code", title: "Automation that earns its keep", text: "We only automate a step once we understand why it exists. Every system we hand over has to pay for itself." },
];

/* ================================================================== *
 *  SVG ARTWORK
 * ================================================================== */

/* Vision — a north star locked inside drifting orbits. */
const VisionArt = () => (
  <svg viewBox="0 0 320 240" className="w-full h-auto" role="img" aria-label="Orbits converging on a single point">
    <defs>
      <radialGradient id="mi-vis-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor={SKY} stopOpacity="0.55" />
        <stop offset="100%" stopColor={SKY} stopOpacity="0" />
      </radialGradient>
    </defs>
    <circle cx="160" cy="120" r="88" fill="url(#mi-vis-glow)" />
    <g className="mi-spin-slow" style={{ transformOrigin: "160px 120px" }}>
      <ellipse cx="160" cy="120" rx="118" ry="46" fill="none" stroke="#93C5FD" strokeWidth="1" strokeOpacity="0.45" />
      <circle cx="278" cy="120" r="4" fill="#93C5FD" />
    </g>
    <g className="mi-spin-rev" style={{ transformOrigin: "160px 120px" }}>
      <ellipse cx="160" cy="120" rx="46" ry="110" fill="none" stroke="#93C5FD" strokeWidth="1" strokeOpacity="0.32" />
      <circle cx="160" cy="10" r="3.5" fill="#BFDBFE" />
    </g>
    <circle cx="160" cy="120" r="74" fill="none" stroke="#BFDBFE" strokeWidth="1" strokeOpacity="0.25" strokeDasharray="3 9" />
    {/* north star */}
    <g className="mi-pulse" style={{ transformOrigin: "160px 120px" }}>
      <path d="M160 88c3 20 12 29 32 32-20 3-29 12-32 32-3-20-12-29-32-32 20-3 29-12 32-32Z" fill="#fff" />
      <path d="M160 100c2 13 8 19 21 21-13 2-19 8-21 21-2-13-8-19-21-21 13-2 19-8 21-21Z" fill={SKY} opacity="0.55" />
    </g>
  </svg>
);

/* Mission — messy inputs entering a system, one clean line leaving it. */
const MissionArt = () => (
  <svg viewBox="0 0 320 240" className="w-full h-auto" role="img" aria-label="Scattered inputs resolving into one output stream">
    {/* scattered inputs, left */}
    {[
      [18, 52], [46, 96], [14, 140], [52, 176], [30, 20], [64, 132],
    ].map(([x, y], i) => (
      <rect
        key={`in-${i}`}
        x={x} y={y} width="16" height="16" rx="3"
        fill="none" stroke="#93C5FD" strokeWidth="1.4" strokeOpacity="0.7"
        className="mi-drift" style={{ animationDelay: `${i * 0.45}s` }}
      />
    ))}
    {/* converging strands */}
    {[52, 96, 140, 176, 20, 132].map((y, i) => (
      <path
        key={`p-${i}`}
        d={`M74 ${y + 8} C 118 ${y + 8}, 126 120, 168 120`}
        fill="none" stroke="#93C5FD" strokeWidth="1.2" strokeOpacity="0.45"
        strokeDasharray="4 7" className="mi-flow" style={{ animationDelay: `${i * 0.2}s` }}
      />
    ))}
    {/* the system */}
    <rect x="168" y="86" width="70" height="68" rx="16" fill="rgba(96,165,250,0.12)" stroke="#60A5FA" strokeWidth="1.5" />
    <g stroke="#BFDBFE" strokeWidth="1.3" strokeLinecap="round">
      <path d="M184 104h38M184 120h38M184 136h24" />
    </g>
    <rect x="168" y="86" width="70" height="68" rx="16" fill="none" stroke="#fff" strokeWidth="1.5" strokeOpacity="0.25" className="mi-breathe" style={{ transformOrigin: "203px 120px" }} />
    {/* single clean output */}
    <path d="M238 120h58" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeOpacity="0.85" />
    <path d="M288 112l10 8-10 8" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.85" />
  </svg>
);

/* One small diagram per pillar, so the tab panel has something to look at. */
const PillarArt = ({ which }) => {
  if (which === "depth") {
    return (
      <svg viewBox="0 0 240 150" className="w-full h-auto" role="img" aria-label="Layers of a system, with the lowest layer highlighted">
        {[0, 1, 2, 3].map((i) => {
          const y = 18 + i * 30;
          const deepest = i === 3;
          return (
            <g key={i}>
              <rect
                x={26 + i * 6} y={y} width={188 - i * 12} height="20" rx="5"
                fill={deepest ? `${BLUE}1F` : "#F1F5F9"}
                stroke={deepest ? BLUE : "#E2E8F0"}
                strokeWidth={deepest ? 1.6 : 1}
              />
              {deepest && (
                <rect
                  x={26 + i * 6} y={y} width={188 - i * 12} height="20" rx="5"
                  fill="none" stroke={BLUE} strokeWidth="1.6"
                  className="mi-breathe" style={{ transformOrigin: "120px 108px" }}
                />
              )}
            </g>
          );
        })}
        <path d="M120 128v14" stroke={BLUE} strokeWidth="1.6" strokeLinecap="round" strokeDasharray="3 4" />
        <circle cx="120" cy="145" r="3.5" fill={BLUE} />
      </svg>
    );
  }
  if (which === "directness") {
    return (
      <svg viewBox="0 0 240 150" className="w-full h-auto" role="img" aria-label="A direct line replacing a relayed one">
        {/* the relayed path, struck out */}
        <g opacity="0.45">
          <circle cx="26" cy="42" r="9" fill="none" stroke="#CBD5E1" strokeWidth="1.4" />
          <circle cx="120" cy="42" r="9" fill="none" stroke="#CBD5E1" strokeWidth="1.4" />
          <circle cx="214" cy="42" r="9" fill="none" stroke="#CBD5E1" strokeWidth="1.4" />
          <path d="M35 42h76M129 42h76" stroke="#CBD5E1" strokeWidth="1.4" strokeDasharray="4 5" />
          <path d="M14 58 226 26" stroke={AMBER} strokeWidth="2" strokeLinecap="round" />
        </g>
        {/* the direct path */}
        <circle cx="26" cy="112" r="11" fill={`${BLUE}1A`} stroke={BLUE_DEEP} strokeWidth="1.6" />
        <circle cx="214" cy="112" r="11" fill={`${BLUE}1A`} stroke={BLUE_DEEP} strokeWidth="1.6" />
        <path d="M37 112h166" stroke={BLUE} strokeWidth="2" strokeLinecap="round" strokeDasharray="6 6" className="mi-flow" />
        <path d="M120 100v-8" stroke="#E2E8F0" strokeWidth="1.2" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 240 150" className="w-full h-auto" role="img" aria-label="Short repeating build cycles rising over time">
      <path d="M20 128h200" stroke="#E2E8F0" strokeWidth="1.2" />
      {[0, 1, 2, 3, 4].map((i) => {
        const h = 22 + i * 19;
        return (
          <rect
            key={i} x={34 + i * 38} y={128 - h} width="22" height={h} rx="5"
            fill={i === 4 ? BLUE : `${BLUE}33`} stroke={i === 4 ? BLUE_DEEP : "transparent"} strokeWidth="1.2"
            className="mi-rise" style={{ animationDelay: `${i * 0.12}s`, transformOrigin: "center bottom" }}
          />
        );
      })}
      <path d="M45 104 C 90 92, 130 60, 197 30" fill="none" stroke={BLUE_DEEP} strokeWidth="1.6" strokeLinecap="round" strokeDasharray="5 6" className="mi-flow" />
    </svg>
  );
};

/* The core animation, kept from your original CTA. */
const AiCoreAnimation = () => {
  const center = { x: 200, y: 150 };
  const nodes = [
    { x: 310, y: 150 }, { x: 255, y: 245 }, { x: 145, y: 245 },
    { x: 90, y: 150 }, { x: 145, y: 55 }, { x: 255, y: 55 },
  ];

  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-[#BFDBFE] bg-white shadow-[0_25px_60px_-20px_rgba(37,99,235,0.35)]">
      <svg viewBox="0 0 400 300" className="w-full h-full">
        <defs>
          <radialGradient id="aicore-core-grad" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </radialGradient>
        </defs>
        <rect width="400" height="300" fill="url(#aicore-core-grad)" opacity="0.03" />
        <circle className="mi-spin-slow" cx="200" cy="150" r="120" fill="none" stroke="#93C5FD" strokeWidth="1" strokeDasharray="2 10" style={{ transformOrigin: "200px 150px" }} />
        {[0, 1, 2].map((i) => (
          <circle key={`ring-${i}`} className="mi-ring" cx="200" cy="150" r="40" fill="none" stroke="#3B82F6" strokeWidth="2" style={{ animationDelay: `${i}s`, transformOrigin: "200px 150px" }} />
        ))}
        {nodes.map((n, i) => (
          <line key={`line-${i}`} className="mi-flow" x1={center.x} y1={center.y} x2={n.x} y2={n.y} stroke="#93C5FD" strokeWidth="1.5" strokeDasharray="6 6" style={{ animationDelay: `${i * 0.15}s` }} />
        ))}
        {nodes.map((n, i) => (
          <g key={`node-${i}`} className="mi-node" style={{ animationDelay: `${i * 0.3}s` }}>
            <circle cx={n.x} cy={n.y} r="9" fill="white" stroke="#2563EB" strokeWidth="1.5" />
            <circle cx={n.x} cy={n.y} r="3.5" fill="#2563EB" />
          </g>
        ))}
        <g className="mi-breathe" style={{ transformOrigin: "200px 150px" }}>
          <circle cx="200" cy="150" r="34" fill="url(#aicore-core-grad)" />
          <path d="M206 132 L195 152 L203 152 L194 168 L208 148 L200 148 Z" fill="white" />
        </g>
      </svg>
    </div>
  );
};

/* ------------------------- small components ----------------------- */
const StruckLine = ({ text }) => (
  <li className="group relative flex items-start gap-4 py-5 border-b border-[#E2E8F0] last:border-b-0">
    <span
      className="mt-0.5 flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full border"
      style={{ borderColor: `${AMBER}40`, color: AMBER, background: `${AMBER}0D` }}
    >
      <svg viewBox="0 0 24 24" width="14" height="14">{icons.cross}</svg>
    </span>
    <span className="relative inline-block">
      <span className="text-[1.05rem] sm:text-[1.2rem] leading-snug text-n-3">{text}</span>
      <span
        aria-hidden="true"
        data-strike
        className="absolute left-0 top-1/2 h-[2px] w-full origin-left rounded-full"
        style={{ background: AMBER, transform: "scaleX(0)" }}
      />
    </span>
  </li>
);

const ValueCard = ({ item, index }) => (
  <div
    data-reveal
    className="group relative h-full rounded-2xl p-6 lg:p-7 overflow-hidden border border-[#D9E7FF] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#93C5FD] hover:shadow-[0_26px_54px_-28px_rgba(29,78,216,0.55)]"
    style={{ background: "linear-gradient(160deg, #F7FAFF 0%, #FFFFFF 55%, #F0F6FF 100%)" }}
  >
    <span
      className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
      style={{ background: `linear-gradient(90deg, ${BLUE_DEEP}, ${SKY})` }}
    />
    <span
      className="absolute -right-6 -bottom-8 display-serif text-[7rem] leading-none pointer-events-none select-none"
      style={{ color: BLUE_DEEP, opacity: 0.05 }}
      aria-hidden="true"
    >
      {index + 1}
    </span>

    <span className="relative flex items-center justify-center w-12 h-12 rounded-xl mb-5 border border-[#BFDBFE] bg-white overflow-hidden">
      <svg viewBox="0 0 24 24" width="22" height="22" className="absolute transition-all duration-300 group-hover:-translate-y-7 group-hover:opacity-0" style={{ color: BLUE_DEEP }}>
        {icons[item.icon]}
      </svg>
      <svg viewBox="0 0 24 24" width="22" height="22" className="absolute translate-y-7 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100" style={{ color: BLUE }}>
        {iconsSolid[item.icon]}
      </svg>
    </span>

    <h4 className="relative h5 mb-2 text-n-1">{item.title}</h4>
    <p className="relative body-2 text-n-3">{item.text}</p>
  </div>
);

/* ------------------------------ page ------------------------------ */
const About = () => {
  const contentRef = useRef(null);
  const progressRef = useRef(null);
  const brokenRef = useRef(null);
  const [activePillar, setActivePillar] = useState(0);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const reveals = gsap.utils.toArray(content.querySelectorAll("[data-reveal]"));
    const strikes = brokenRef.current
      ? gsap.utils.toArray(brokenRef.current.querySelectorAll("[data-strike]"))
      : [];

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* Safety net: whatever happens to ScrollTrigger, nothing stays hidden.
       If the timers below never fire, this still clears every element. */
    const failSafe = window.setTimeout(() => {
      gsap.set(reveals, { clearProps: "opacity,transform" });
      gsap.set(strikes, { scaleX: 1 });
    }, 4000);

    if (reduceMotion) {
      gsap.set(progressRef.current, { scaleX: 1 });
      gsap.set(strikes, { scaleX: 1 });
      window.clearTimeout(failSafe);
      return undefined;
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: content,
        start: "top 80%",
        end: "bottom 60%",
        scrub: 0.6,
        onUpdate: (self) => gsap.set(progressRef.current, { scaleX: self.progress }),
      });

      /* Each element owns its own trigger, and clears its inline styles the
         moment it finishes — so a stranded tween can't leave a blank section. */
      reveals.forEach((el) => {
        gsap.fromTo(
          el,
          { y: 26, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            immediateRender: false,
            clearProps: "opacity,transform",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          }
        );
      });

      strikes.forEach((el, i) => {
        gsap.to(el, {
          scaleX: 1,
          duration: 0.5,
          ease: "power2.inOut",
          delay: i * 0.12,
          scrollTrigger: { trigger: brokenRef.current, start: "top 72%", once: true },
        });
      });
    }, content);

    /* Fraunces loads late and changes every heading's height — without this
       refresh, ScrollTrigger measures the page against stale positions. */
    const refresh = () => ScrollTrigger.refresh();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);
    window.addEventListener("load", refresh);

    return () => {
      window.clearTimeout(failSafe);
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, []);

  const pillar = pillars[activePillar];

  return (
    <Section id="about">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;1,9..144,500&display=swap');
        .display-serif { font-family: 'Fraunces', Georgia, serif; }
        .about-tab:focus-visible { outline: 2px solid ${BLUE}; outline-offset: 3px; }

        @keyframes mi-spin { to { transform: rotate(360deg); } }
        @keyframes mi-spin-r { to { transform: rotate(-360deg); } }
        @keyframes mi-flow { to { stroke-dashoffset: -26; } }
        @keyframes mi-breathe { 0%,100% { transform: scale(1); opacity: .9 } 50% { transform: scale(1.06); opacity: 1 } }
        @keyframes mi-pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.09); } }
        @keyframes mi-ring { 0% { transform: scale(.9); opacity:.5 } 100% { transform: scale(2.6); opacity:0 } }
        @keyframes mi-node { 0%,100% { opacity:.55 } 50% { opacity:1 } }
        @keyframes mi-drift { 0%,100% { transform: translateX(0) } 50% { transform: translateX(7px) } }
        @keyframes mi-rise { 0% { transform: scaleY(.82) } 100% { transform: scaleY(1) } }

        .mi-spin-slow { animation: mi-spin 34s linear infinite; }
        .mi-spin-rev  { animation: mi-spin-r 46s linear infinite; }
        .mi-flow      { animation: mi-flow 1.4s linear infinite; }
        .mi-breathe   { animation: mi-breathe 4s ease-in-out infinite; }
        .mi-pulse     { animation: mi-pulse 3.4s ease-in-out infinite; }
        .mi-ring      { animation: mi-ring 3s ease-out infinite; }
        .mi-node      { animation: mi-node 2.4s ease-in-out infinite; }
        .mi-drift     { animation: mi-drift 5s ease-in-out infinite; }
        .mi-rise      { animation: mi-rise 1.6s ease-in-out infinite alternate; }

        @media (prefers-reduced-motion: reduce) {
          .mi-spin-slow,.mi-spin-rev,.mi-flow,.mi-breathe,.mi-pulse,
          .mi-ring,.mi-node,.mi-drift,.mi-rise { animation: none !important; }
        }
      `}</style>

      <div className="container relative z-2">
        <div className="relative h-px w-full bg-[#E2E8F0] rounded-full overflow-hidden mb-14 lg:mb-16">
          <div ref={progressRef} className="absolute inset-y-0 left-0 w-full origin-left scale-x-0 bg-gradient-to-r from-[#1D4ED8] to-[#3B82F6]" />
        </div>

        <div ref={contentRef} className="relative">

          {/* ================= 1. WHO WE ARE ================= */}
          <div data-reveal className="mb-24 lg:mb-32">
            <div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-16 items-start">
              <div>
                <p className="font-code text-xs uppercase tracking-[0.2em] text-n-4 mb-6">( Who We Are )</p>
                <h1 className="display-serif text-[2.25rem] leading-[1.14] sm:text-[2.75rem] lg:text-[3.5rem] text-n-1 font-normal">
                  We are MaverickIgnite, an engineering studio for software that has to
                  <span className="relative inline-block ml-3">
                    <span className="italic bg-clip-text text-transparent bg-gradient-to-r from-[#1D4ED8] to-[#3B82F6]">actually run</span>
                    <svg className="absolute -bottom-2 left-0 w-full" height="10" viewBox="0 0 200 10" preserveAspectRatio="none" fill="none" aria-hidden="true">
                      <path d="M2 7c40-5 90-6 196-3" stroke={BLUE} strokeWidth="2.5" strokeLinecap="round" opacity="0.45" />
                    </svg>
                  </span>
                </h1>
              </div>

              <div className="lg:pt-[1.2rem]">
                <p className="body-1 text-n-2 mb-5">
                  We&apos;re a small engineering studio working out of Bengaluru. We started it
                  because most &quot;AI initiatives&quot; we came across were slide decks, not
                  software — convincing in a meeting room, and gone by the time anyone tried to
                  actually rely on them.
                </p>
                <p className="body-1 text-n-2 mb-9">
                  So that&apos;s what we build instead: the applications, data pipelines, and
                  internal tools that let a business use machine intelligence the way it uses
                  electricity — quietly, reliably, and without anyone having to think about it twice.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
                    style={{ background: `linear-gradient(90deg, ${BLUE_DEEP} 0%, ${BLUE} 100%)`, boxShadow: "0 12px 30px -10px rgba(29,78,216,0.45)" }}
                  >
                    Schedule a call
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M7 7h10v10" /></svg>
                  </a>
                  <Link
                    to="/team"
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-n-1 border border-n-1/25 transition-colors duration-300 hover:border-n-1/50"
                  >
                    Meet the team
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M7 7h10v10" /></svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* ================= 2. WHY WE STARTED ================= */}
          <div ref={brokenRef} className="mb-24 lg:mb-32">
            <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-start">
              <div data-reveal className="lg:sticky lg:top-28">
                <p className="font-code text-xs uppercase tracking-[0.2em] text-n-4 mb-6">( Why We Started )</p>
                <h2 className="display-serif text-[1.9rem] sm:text-[2.3rem] leading-[1.2] text-n-1 font-normal mb-5">
                  We built the studio around the things we kept watching go wrong.
                </h2>
                <p className="body-2 text-n-3 max-w-sm">
                  None of these are exotic failures. They&apos;re the ordinary ones — and every
                  one is a decision someone made early and nobody revisited.
                </p>
              </div>
              <ul data-reveal className="relative">
                {brokenPromises.map((t) => <StruckLine key={t} text={t} />)}
              </ul>
            </div>
          </div>

          {/* ================= 3. WHY IT BREAKS ================= */}
          <div data-reveal className="mb-24 lg:mb-32">
            <div className="relative rounded-[2rem] border border-[#D9E7FF] bg-[#F7FAFF] px-6 py-12 sm:px-10 lg:px-14 lg:py-16 overflow-hidden">
              <div
                className="absolute inset-0 opacity-[0.05] pointer-events-none"
                style={{
                  backgroundImage: `linear-gradient(${BLUE_DEEP} 1px, transparent 1px), linear-gradient(90deg, ${BLUE_DEEP} 1px, transparent 1px)`,
                  backgroundSize: "48px 48px",
                }}
              />
              <div className="relative">
                <h3 className="display-serif text-[1.75rem] sm:text-[2.1rem] leading-[1.25] text-n-1 font-normal mb-10 max-w-2xl">
                  It comes apart in the same four places, almost every time.
                </h3>
                <div className="grid sm:grid-cols-2 gap-x-10">
                  {whyItBreaks.map((t, i) => (
                    <div key={t} className="group flex items-baseline gap-5 py-6 border-t border-[#DBE7F8]">
                      <span className="font-code text-sm flex-shrink-0 opacity-60 transition-opacity duration-300 group-hover:opacity-100" style={{ color: i % 2 === 0 ? BLUE_DEEP : BLUE }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="body-1 text-n-2">{t}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ================= 4. PROCESS ================= */}
          <div className="mb-24 lg:mb-32">
            <p data-reveal className="font-code text-xs uppercase tracking-[0.2em] text-n-4 mb-4">( How We Work )</p>
            <h3 data-reveal className="display-serif text-[1.9rem] sm:text-[2.3rem] leading-[1.2] text-n-1 font-normal mb-12 max-w-xl">
              Three moves, in this order, every time.
            </h3>
            <div className="relative grid sm:grid-cols-3 gap-10 sm:gap-6 lg:gap-10">
              <div className="hidden sm:block absolute top-[11px] left-[8%] right-[8%] h-px bg-gradient-to-r from-[#BFDBFE] via-[#BFDBFE] to-transparent" />
              {processSteps.map((step, index) => (
                <div key={step.title} data-reveal className="relative group">
                  <span
                    className="relative z-10 block w-[22px] h-[22px] rounded-full border-4 border-white transition-transform duration-300 group-hover:scale-110"
                    style={{ background: index === 0 ? BLUE_DEEP : index === 1 ? BLUE : SKY, boxShadow: "0 0 0 1px #BFDBFE" }}
                  />
                  <span className="font-code text-[11px] uppercase tracking-[0.18em] text-n-4 block mt-5 mb-2">{step.kicker}</span>
                  <h5 className="h5 mb-2.5 text-n-1">{step.title}</h5>
                  <p className="body-2 text-n-3">{step.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ================= 5. PILLARS ================= */}
          <div data-reveal className="mb-24 lg:mb-32">
            <p className="font-code text-xs uppercase tracking-[0.2em] text-n-4 mb-4">( What Makes It Work )</p>
            <h3 className="display-serif text-[1.9rem] sm:text-[2.3rem] leading-[1.2] text-n-1 font-normal mb-10 max-w-xl">
              Depth, directness, tempo.
            </h3>

            <div className="flex flex-wrap gap-2 sm:gap-3 mb-8" role="tablist" aria-label="How we work">
              {pillars.map((p, i) => {
                const active = i === activePillar;
                return (
                  <button
                    key={p.key}
                    role="tab"
                    id={`pillar-tab-${p.key}`}
                    aria-selected={active}
                    aria-controls={`pillar-panel-${p.key}`}
                    onClick={() => setActivePillar(i)}
                    className={`about-tab relative px-5 sm:px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border ${
                      active ? "text-white border-transparent" : "text-n-3 border-[#D9E7FF] bg-white hover:border-[#93C5FD] hover:text-n-1"
                    }`}
                    style={active ? { background: `linear-gradient(90deg, ${BLUE_DEEP}, ${BLUE})`, boxShadow: "0 10px 26px -12px rgba(29,78,216,0.6)" } : undefined}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>

            <div
              key={pillar.key}
              role="tabpanel"
              id={`pillar-panel-${pillar.key}`}
              aria-labelledby={`pillar-tab-${pillar.key}`}
              className="relative rounded-[2rem] border border-[#D9E7FF] bg-white overflow-hidden shadow-[0_24px_60px_-40px_rgba(29,78,216,0.5)]"
            >
              <span className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ background: `linear-gradient(180deg, ${BLUE_DEEP}, ${SKY})` }} />
              <div className="grid lg:grid-cols-[1.3fr_1fr]">
                <div className="px-6 py-10 sm:px-10 lg:px-12 lg:py-12">
                  <h4 className="display-serif text-[1.5rem] sm:text-[1.8rem] leading-[1.3] text-n-1 font-normal mb-6">{pillar.heading}</h4>
                  {pillar.body.map((para) => (
                    <p key={para.slice(0, 24)} className="body-2 text-n-3 mb-4 last:mb-0 max-w-[62ch]">{para}</p>
                  ))}
                </div>
                <div className="relative px-6 pb-10 sm:px-10 lg:px-10 lg:py-12 lg:border-l border-[#E6EFFC] bg-[#F7FAFF]">
                  <div className="mb-7 max-w-[240px] mx-auto lg:mx-0">
                    <PillarArt which={pillar.key} />
                  </div>
                  <ul className="space-y-4">
                    {pillar.proof.map((p) => (
                      <li key={p} className="flex items-start gap-3">
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" className="mt-1 flex-shrink-0" style={{ color: BLUE }}>
                          <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="body-2 text-n-2">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* ================= 6. VISION & MISSION ================= */}
          <div data-reveal className="mb-24 lg:mb-32">
            <div
              className="relative rounded-[2rem] overflow-hidden"
              style={{ background: `linear-gradient(150deg, ${INK} 0%, #12294F 55%, #0E2246 100%)` }}
            >
              <div className="absolute -top-24 -left-16 w-[26rem] h-[22rem] rounded-full blur-[120px] pointer-events-none" style={{ background: "rgba(59,130,246,0.35)" }} />
              <div className="absolute -bottom-28 right-0 w-[24rem] h-[24rem] rounded-full blur-[120px] pointer-events-none" style={{ background: "rgba(96,165,250,0.22)" }} />
              <div
                className="absolute inset-0 opacity-[0.07] pointer-events-none"
                style={{
                  backgroundImage: "linear-gradient(#BFDBFE 1px, transparent 1px), linear-gradient(90deg, #BFDBFE 1px, transparent 1px)",
                  backgroundSize: "54px 54px",
                }}
              />

              <div className="relative grid md:grid-cols-2">
                <div className="px-7 py-12 sm:px-10 lg:px-12 lg:py-14 md:border-r border-white/10" id="vision">
                  <div className="max-w-[260px] mb-8"><VisionArt /></div>
                  <p className="font-code text-[10px] uppercase tracking-[0.22em] mb-4" style={{ color: "#93C5FD" }}>( Vision )</p>
                  <h4 className="display-serif text-[1.7rem] sm:text-[2rem] leading-[1.25] font-normal text-white mb-4">
                    Intelligence that behaves like infrastructure.
                  </h4>
                  <p className="body-2 max-w-[48ch]" style={{ color: "rgba(226,232,240,0.82)" }}>
                    Software with machine intelligence in it should be as ordinary and as
                    dependable as electricity — something a business runs on without having to
                    think about it twice.
                  </p>
                </div>

                <div className="px-7 py-12 sm:px-10 lg:px-12 lg:py-14 border-t md:border-t-0 border-white/10" id="mission">
                  <div className="max-w-[260px] mb-8"><MissionArt /></div>
                  <p className="font-code text-[10px] uppercase tracking-[0.22em] mb-4" style={{ color: "#93C5FD" }}>( Mission )</p>
                  <h4 className="display-serif text-[1.7rem] sm:text-[2rem] leading-[1.25] font-normal text-white mb-4">
                    Build it, then keep it running.
                  </h4>
                  <p className="body-2 max-w-[48ch]" style={{ color: "rgba(226,232,240,0.82)" }}>
                    To design, build, and maintain the applications, data infrastructure, and
                    internal tools that let a team actually use that intelligence — end to end,
                    and stable enough to put in front of real customers.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ================= 7. VALUES ================= */}
          <div className="mb-24 lg:mb-32" id="values">
            <p data-reveal className="font-code text-xs uppercase tracking-[0.2em] text-n-4 mb-4">( Our Values )</p>
            <h3 data-reveal className="display-serif text-[1.9rem] sm:text-[2.3rem] leading-[1.2] text-n-1 font-normal mb-10 max-w-xl">
              Four rules we don&apos;t bend.
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
              {values.map((v, i) => <ValueCard key={v.title} item={v} index={i} />)}
            </div>
          </div>

          {/* ================= 8. MANIFESTO ================= */}
          <div data-reveal className="mb-24 lg:mb-32">
            <div className="relative max-w-3xl mx-auto text-center px-4">
              <svg width="44" height="36" viewBox="0 0 44 36" fill="none" className="mx-auto mb-6 opacity-20" aria-hidden="true">
                <path d="M0 36V20C0 9 6 2 17 0l2 6c-6 2-9 6-9 11h8v19H0Zm25 0V20C25 9 31 2 42 0l2 6c-6 2-9 6-9 11h8v19H25Z" fill={BLUE_DEEP} />
              </svg>
              <p className="display-serif text-[1.5rem] sm:text-[1.9rem] lg:text-[2.1rem] leading-[1.35] text-n-1 font-normal">
                Anyone can make a model produce an impressive answer. The engineering is in
                everything around it — the data it reads, the system it sits in, and whether
                it&apos;s still right six months from now.
              </p>
              <div className="mt-8 flex items-center justify-center gap-3">
                <span className="h-px w-12" style={{ background: `linear-gradient(90deg, transparent, ${BLUE})` }} />
                <span className="font-code text-[10px] uppercase tracking-[0.2em] text-n-4">How we think about it</span>
                <span className="h-px w-12" style={{ background: `linear-gradient(270deg, transparent, ${BLUE})` }} />
              </div>
            </div>
          </div>

          {/* ================= 9. CTA ================= */}
          <div data-reveal>
            <div className="relative overflow-hidden rounded-[2rem] border border-[#BFE0FF] bg-gradient-to-br from-[#F2F8FF] via-white to-[#EAF6FF]">
              <div className="absolute -top-24 left-[10%] w-[26rem] h-[18rem] rounded-full bg-[#93C5FD]/35 blur-[110px] pointer-events-none" />
              <div className="absolute -bottom-28 -right-16 w-[24rem] h-[24rem] rounded-full bg-[#60A5FA]/25 blur-[110px] pointer-events-none" />
              <div
                className="absolute inset-0 opacity-[0.05] pointer-events-none"
                style={{
                  backgroundImage: `linear-gradient(${BLUE_DEEP} 1px, transparent 1px), linear-gradient(90deg, ${BLUE_DEEP} 1px, transparent 1px)`,
                  backgroundSize: "42px 42px",
                }}
              />
              <div className="relative px-6 py-14 sm:px-10 lg:px-14 lg:py-16">
                <div className="grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-14 items-center">
                  <div className="text-center lg:text-left">
                    <p className="font-code text-[10px] uppercase tracking-[0.2em] text-[#2563EB] mb-5">( Start a Project )</p>
                    <h3 className="display-serif text-[1.9rem] sm:text-[2.3rem] leading-[1.2] font-normal mb-5" style={{ color: INK }}>
                      Have a project that needs engineering depth?
                    </h3>
                    <p className="body-1 text-[#475569] mb-9 max-w-md mx-auto lg:mx-0">
                      Tell us what&apos;s slow, manual, or stuck — we&apos;ll tell you honestly
                      whether AI is the right fix, then build it if it is.
                    </p>
                    <a href="#contact" className="group relative inline-flex items-center gap-4">
                      <span className="absolute -inset-3 rounded-2xl bg-[#3B82F6]/15 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <span className="relative flex items-center gap-4 px-7 py-4 rounded-xl bg-[#2563EB] overflow-hidden transition-all duration-300 group-hover:bg-[#1D4ED8] group-hover:-translate-y-1 group-hover:shadow-[0_16px_40px_-8px_rgba(37,99,235,0.45)]">
                        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/[0.18] to-transparent" />
                        <span className="relative flex flex-col items-start">
                          <span className="font-code text-[9px] uppercase tracking-[0.2em] text-blue-100">Start a conversation</span>
                          <span className="font-semibold text-white text-base">Build something intelligent</span>
                        </span>
                        <span className="relative flex items-center justify-center w-11 h-11 rounded-lg bg-white text-[#2563EB] transition-all duration-300 group-hover:translate-x-1">
                          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h13" /><path d="m13 6 6 6-6 6" />
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
                  <span className="font-code text-[9px] uppercase tracking-[0.18em] text-[#64748B]">From concept to intelligence to impact</span>
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