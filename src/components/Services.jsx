import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "./Section";
import { getServiceBySlug, services } from "../config/services";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const DEEP = "#1D4ED8";
const BRIGHT = "#3B82F6";
const INK = "#101935";
const SUB = "#5B6478";
const LINE = "#D7E3FA";
const TINT = "#EAF1FE";
const BG = "#EEF3FC";

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---- tiny local icon set — plain stroke svgs, no external icon package required ----
const Icon = ({ path, size = 16, ...rest }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...rest}>
    {path}
  </svg>
);
const IconDatabase = (p) => <Icon {...p} path={<><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5" /><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" /></>} />;
const IconBulb = (p) => <Icon {...p} path={<><path d="M9 18h6" /><path d="M10 22h4" /><path d="M12 2a7 7 0 0 0-4.2 12.6c.9.8 1.2 1.6 1.2 2.4h6c0-.8.3-1.6 1.2-2.4A7 7 0 0 0 12 2z" /></>} />;
const IconUsers = (p) => <Icon {...p} path={<><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.9" /><path d="M16 3.1a4 4 0 0 1 0 7.8" /></>} />;
const IconGear = (p) => <Icon {...p} path={<><circle cx="12" cy="12" r="3.2" />{[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (<line key={a} x1="12" y1="3.5" x2="12" y2="5.5" transform={`rotate(${a} 12 12)`} />))}</>} />;
const IconBars = (p) => <Icon {...p} path={<><rect x="4" y="12" width="3.5" height="8" rx="1" /><rect x="10.2" y="7" width="3.5" height="13" rx="1" /><rect x="16.5" y="3" width="3.5" height="17" rx="1" /></>} />;
const IconShield = (p) => <Icon {...p} path={<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />} />;
const IconCloud = (p) => <Icon {...p} path={<path d="M17.5 19a4.5 4.5 0 0 0 0-9 6 6 0 0 0-11.3-2A5 5 0 0 0 6 19h11.5z" />} />;
const IconCube = (p) => <Icon {...p} path={<><path d="M12 2l8 4.5v11L12 22l-8-4.5v-11z" /><path d="M4 6.5 12 11l8-4.5" /><path d="M12 11v11" /></>} />;
const IconClipboard = (p) => <Icon {...p} path={<><rect x="8" y="2" width="8" height="4" rx="1" /><path d="M9 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-3" /><path d="M9 12h6" /><path d="M9 16h6" /></>} />;
const IconPencil = (p) => <Icon {...p} path={<><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" /></>} />;
const IconCode = (p) => <Icon {...p} path={<><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></>} />;
const IconRocket = (p) => <Icon {...p} path={<><path d="M4.5 16.5c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.7-.8.7-2.1-.1-2.9a2.2 2.2 0 0 0-2.9-.1z" /><path d="M12 15l-3-3a22 22 0 0 1 2-4A12.9 12.9 0 0 1 22 2c0 2.7-.8 7.5-6 11a22.4 22.4 0 0 1-4 2z" /></>} />;
const IconRefresh = (p) => <Icon {...p} path={<><polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" /><path d="M3.5 9a9 9 0 0 1 14.9-3.4L23 10M1 14l4.6 4.4A9 9 0 0 0 20.5 15" /></>} />;
const IconLink = (p) => <Icon {...p} path={<><path d="M10 13a5 5 0 0 0 7.5.5l2-2a5 5 0 0 0-7-7l-1 1" /><path d="M14 11a5 5 0 0 0-7.5-.5l-2 2a5 5 0 0 0 7 7l1-1" /></>} />;
const IconCheck = (p) => <Icon {...p} path={<polyline points="4 12 9 17 20 6" />} />;
const IconSparkle = (p) => <Icon {...p} path={<path d="M12 2l1.8 5.6L19.5 9l-5.7 1.4L12 16l-1.8-5.6L4.5 9l5.7-1.4z" />} />;

// ---- shared "blueprint" card chrome: hairline border, faint dot grid, corner brackets ----
const BlueprintPanel = ({ className = "", children }) => (
  <div className={`relative rounded-2xl border bg-white overflow-hidden ${className}`} style={{ borderColor: LINE }}>
    <div
      className="absolute inset-0 pointer-events-none opacity-[0.55]"
      style={{ backgroundImage: `radial-gradient(${DEEP}14 1px, transparent 1px)`, backgroundSize: "16px 16px" }}
    />
    {[
      "top-3 left-3 border-t-2 border-l-2",
      "top-3 right-3 border-t-2 border-r-2",
      "bottom-3 left-3 border-b-2 border-l-2",
      "bottom-3 right-3 border-b-2 border-r-2",
    ].map((pos) => (
      <span key={pos} className={`absolute w-3.5 h-3.5 pointer-events-none ${pos}`} style={{ borderColor: `${DEEP}55` }} />
    ))}
    <div className="relative h-full">{children}</div>
  </div>
);

const CheckItem = ({ children }) => (
  <li className="flex items-center gap-3 py-3 border-t first:border-t-0" style={{ borderColor: LINE }}>
    <span className="flex items-center justify-center w-5 h-5 rounded-full text-white flex-shrink-0" style={{ background: DEEP }}>
      <IconCheck size={11} strokeWidth={3} />
    </span>
    <span className="text-[0.925rem]" style={{ color: "#33415C" }}>{children}</span>
  </li>
);

// small floating badge used for the source/result nodes in the flagship diagram
const NodeCard = ({ icon, label, className = "" }) => (
  <div
    className={`absolute flex items-center gap-2.5 rounded-xl border bg-white px-3 py-2.5 shadow-[0_10px_24px_-14px_rgba(29,78,216,0.45)] -translate-x-1/2 -translate-y-1/2 ${className}`}
    style={{ borderColor: LINE }}
  >
    <span className="flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0" style={{ background: TINT, color: DEEP }}>
      {icon}
    </span>
    <span className="text-xs font-semibold whitespace-nowrap" style={{ color: "#33415C" }}>{label}</span>
  </div>
);

// ---- 1. flagship — data & ideas & users flow into an AI core, out comes a shipped product ----
const AIPipelineDiagram = () => {
  const flowRefs = useRef([]);
  flowRefs.current = [];
  const addFlow = (el) => el && flowRefs.current.push(el);
  const coreRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const tweens = [
      gsap.to(flowRefs.current, { strokeDashoffset: -16, duration: 1.4, ease: "none", repeat: -1 }),
      gsap.to(coreRef.current, { scale: 1.06, duration: 1.2, ease: "sine.inOut", yoyo: true, repeat: -1 }),
    ];
    return () => tweens.forEach((t) => t.kill());
  }, []);

  return (
    <div className="relative w-full aspect-[16/9] max-w-[560px] mx-auto">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
        <path ref={addFlow} d="M22,16 C36,16 36,50 47,50" stroke={DEEP} strokeWidth="0.6" strokeDasharray="2.5 2.5" fill="none" opacity="0.5" />
        <path ref={addFlow} d="M22,50 L47,50" stroke={DEEP} strokeWidth="0.6" strokeDasharray="2.5 2.5" fill="none" opacity="0.5" />
        <path ref={addFlow} d="M22,84 C36,84 36,50 47,50" stroke={DEEP} strokeWidth="0.6" strokeDasharray="2.5 2.5" fill="none" opacity="0.5" />
        <path ref={addFlow} d="M62,50 L74,50" stroke={BRIGHT} strokeWidth="0.6" strokeDasharray="2.5 2.5" fill="none" opacity="0.6" />
      </svg>

      <NodeCard icon={<IconDatabase size={16} />} label="Your Data" className="left-[15%] top-[16%]" />
      <NodeCard icon={<IconBulb size={16} />} label="Your Ideas" className="left-[15%] top-[50%]" />
      <NodeCard icon={<IconUsers size={16} />} label="Your Users" className="left-[15%] top-[84%]" />

      <div
        ref={coreRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl"
        style={{ background: `linear-gradient(135deg, ${DEEP}, ${BRIGHT})`, boxShadow: `0 20px 45px -14px ${DEEP}99` }}
      >
        <span className="absolute inset-0 rounded-2xl blur-xl -z-10" style={{ background: `${BRIGHT}55` }} />
        <span className="text-white font-bold text-xs sm:text-sm tracking-wide">AI</span>
      </div>

      <div className="absolute left-[82%] top-1/2 -translate-y-1/2 w-32 sm:w-40 rounded-xl border bg-white shadow-[0_18px_40px_-16px_rgba(29,78,216,0.4)] p-2.5 sm:p-3" style={{ borderColor: LINE }}>
        <div className="flex gap-1 mb-2">
          {[0, 1, 2].map((i) => (
            <span key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: LINE }} />
          ))}
        </div>
        <div className="space-y-1.5 mb-2.5">
          <div className="h-1.5 rounded w-4/5" style={{ background: TINT }} />
          <div className="h-1.5 rounded w-3/5" style={{ background: TINT }} />
        </div>
        <div className="flex items-end gap-1 h-8">
          {[0.4, 0.7, 0.5, 1, 0.6].map((h, i) => (
            <div key={i} className="flex-1 rounded-t" style={{ height: `${h * 100}%`, background: `linear-gradient(to top, ${DEEP}80, ${BRIGHT}80)` }} />
          ))}
        </div>
        <div
          className="absolute -top-3 -right-3 flex items-center gap-1 rounded-full bg-white border px-2 py-1 shadow-md text-[9px] sm:text-[10px] font-semibold whitespace-nowrap"
          style={{ borderColor: LINE, color: DEEP }}
        >
          <IconCheck size={10} strokeWidth={3} /> Shipped
        </div>
      </div>
    </div>
  );
};

// ---- 2. enterprise — a hub of modules, pulses of activity radiating to each one ----
const EnterpriseDiagram = () => {
  const packetRefs = useRef([]);
  packetRefs.current = [];
  const add = (el) => el && packetRefs.current.push(el);
  const hub = { x: 50, y: 50 };
  const nodes = [
    { x: 18, y: 18, icon: <IconUsers size={14} />, label: "People" },
    { x: 82, y: 18, icon: <IconGear size={14} />, label: "Operations" },
    { x: 18, y: 82, icon: <IconBars size={14} />, label: "Analytics" },
    { x: 82, y: 82, icon: <IconShield size={14} />, label: "Security" },
  ];

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const tweens = nodes.map((n, i) =>
      gsap.to(packetRefs.current[i], {
        attr: { cx: n.x, cy: n.y },
        opacity: 1,
        duration: 0.9,
        delay: i * 0.25,
        repeat: -1,
        repeatDelay: 0.7,
        ease: "power1.out",
        onRepeat: () => gsap.set(packetRefs.current[i], { attr: { cx: hub.x, cy: hub.y }, opacity: 0 }),
      })
    );
    return () => tweens.forEach((t) => t.kill());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative w-full aspect-square max-w-[220px] mx-auto">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
        {nodes.map((n, i) => (
          <line key={i} x1={hub.x} y1={hub.y} x2={n.x} y2={n.y} stroke={DEEP} strokeWidth="0.6" strokeDasharray="2 2.5" opacity="0.4" />
        ))}
        {nodes.map((_, i) => (
          <circle key={i} ref={add} cx={hub.x} cy={hub.y} r="1.8" fill={BRIGHT} opacity="0" />
        ))}
      </svg>

      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12 rounded-xl"
        style={{ background: `linear-gradient(135deg, ${DEEP}, ${BRIGHT})`, boxShadow: `0 14px 30px -10px ${DEEP}80` }}
      >
        <IconCube size={20} className="text-white" />
      </div>

      {nodes.map((n) => (
        <div key={n.label} className="absolute flex flex-col items-center gap-1 -translate-x-1/2 -translate-y-1/2" style={{ left: `${n.x}%`, top: `${n.y}%` }}>
          <span className="flex items-center justify-center w-9 h-9 rounded-lg border bg-white shadow-sm" style={{ borderColor: LINE, color: DEEP }}>
            {n.icon}
          </span>
          <span className="text-[10px] font-medium whitespace-nowrap" style={{ color: SUB }}>{n.label}</span>
        </div>
      ))}
    </div>
  );
};

// ---- 3. data engineering — raw data blocks feed a pipeline, a live chart comes out the other end ----
const chartBars = [38, 62, 48, 88, 58, 74];

const DataFlowDiagram = () => {
  const barRefs = useRef([]);
  barRefs.current = [];
  const addBar = (el) => el && barRefs.current.push(el);
  const flowRef = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    gsap.set(barRefs.current, { scaleY: 0, transformOrigin: "bottom" });
    const reveal = gsap.to(barRefs.current, {
      scaleY: 1,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.08,
      scrollTrigger: { trigger: wrapRef.current, start: "top 85%" },
    });
    const flow = gsap.to(flowRef.current, { strokeDashoffset: -16, duration: 1.1, ease: "none", repeat: -1 });
    return () => {
      reveal.kill();
      flow.kill();
    };
  }, []);

  return (
    <div ref={wrapRef} className="flex items-center gap-3">
      <div className="flex flex-col gap-1.5">
        {[0, 1, 2].map((i) => (
          <span key={i} className="flex items-center justify-center w-8 h-8 rounded-lg border" style={{ borderColor: LINE, background: TINT, color: DEEP }}>
            <IconCube size={14} />
          </span>
        ))}
      </div>

      <svg viewBox="0 0 60 10" className="w-10 sm:w-14 h-3 flex-shrink-0">
        <path ref={flowRef} d="M0,5 H60" stroke={BRIGHT} strokeWidth="1.6" strokeDasharray="4 4" fill="none" />
      </svg>

      <div className="flex-1 rounded-xl border bg-white p-3" style={{ borderColor: LINE }}>
        <div className="flex items-end gap-1.5 h-16">
          {chartBars.map((h, i) => (
            <div key={i} className="flex-1 h-full flex items-end">
              <div
                ref={addBar}
                className="w-full rounded-t-md"
                style={{ height: `${h}%`, background: `linear-gradient(to top, ${DEEP}80, ${BRIGHT}80)` }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ---- 4. database — a scan sweeping a stack of rows, beside a health checklist ----
const DatabaseScanDiagram = () => {
  const scanRef = useRef(null);
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const tween = gsap.fromTo(scanRef.current, { y: 4 }, { y: 34, duration: 1.4, ease: "power1.inOut", yoyo: true, repeat: -1 });
    return () => tween.kill();
  }, []);

  return (
    <div className="flex items-center gap-3">
      <svg viewBox="0 0 60 50" className="w-16 h-auto">
        <rect x="6" y="4" width="48" height="42" rx="6" fill="none" stroke={DEEP} strokeWidth="1.4" opacity="0.6" />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x="12" y={10 + i * 9} width="36" height="5" rx="2" fill={DEEP} opacity="0.12" />
        ))}
        <rect ref={scanRef} x="6" y="6" width="48" height="5" rx="2" fill={BRIGHT} opacity="0.6" />
      </svg>
      <span className="flex items-center justify-center w-10 h-10 rounded-lg border flex-shrink-0" style={{ borderColor: LINE, background: TINT, color: DEEP }}>
        <IconClipboard size={18} />
      </span>
    </div>
  );
};

// ---- 5. integration — a packet ferried between two systems through a hub ----
const IntegrationDiagram = () => {
  const packetRef = useRef(null);
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const tween = gsap.fromTo(packetRef.current, { attr: { cx: 18 } }, { attr: { cx: 82 }, duration: 1.2, ease: "power1.inOut", yoyo: true, repeat: -1 });
    return () => tween.kill();
  }, []);

  return (
    <div className="relative w-full h-14">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-lg border" style={{ borderColor: LINE, background: TINT, color: DEEP }}>
        <IconCloud size={18} />
      </div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-lg border" style={{ borderColor: LINE, background: TINT, color: BRIGHT }}>
        <IconCube size={18} />
      </div>
      <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
        <line x1="14" y1="10" x2="86" y2="10" stroke={DEEP} strokeWidth="1" strokeDasharray="2.5 2.5" opacity="0.4" />
        <circle cx="50" cy="10" r="6" fill="white" stroke={DEEP} strokeWidth="1" opacity="0.7" />
        <circle ref={packetRef} cx="18" cy="10" r="2.2" fill={BRIGHT} />
      </svg>
    </div>
  );
};

// ---- 6. full-cycle — an actual loop: design, build, ship, iterate ----
const cycleStages = [
  { label: "Design", icon: <IconPencil size={14} />, angle: -90 },
  { label: "Build", icon: <IconCode size={14} />, angle: 0 },
  { label: "Ship", icon: <IconRocket size={14} />, angle: 90 },
  { label: "Iterate", icon: <IconRefresh size={14} />, angle: 180 },
];

const ProductCycleDiagram = () => {
  const orbitRef = useRef(null);
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const tween = gsap.to(orbitRef.current, { rotation: 360, duration: 6, ease: "linear", repeat: -1 });
    return () => tween.kill();
  }, []);

  return (
    <div className="relative w-full aspect-square max-w-[190px] mx-auto">
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full overflow-visible">
        <circle cx="50" cy="50" r="30" fill="none" stroke={DEEP} strokeWidth="1" strokeDasharray="2.5 3" opacity="0.4" />
        <g ref={orbitRef} style={{ transformOrigin: "50px 50px" }}>
          <circle cx="50" cy="20" r="3" fill={BRIGHT} />
        </g>
      </svg>
      {cycleStages.map((s) => {
        const rad = (s.angle * Math.PI) / 180;
        const x = 50 + 30 * Math.cos(rad);
        const y = 50 + 30 * Math.sin(rad);
        return (
          <div key={s.label} className="absolute flex flex-col items-center gap-1 -translate-x-1/2 -translate-y-1/2" style={{ left: `${x}%`, top: `${y}%` }}>
            <span className="flex items-center justify-center w-8 h-8 rounded-full border bg-white shadow-sm" style={{ borderColor: LINE, color: DEEP }}>
              {s.icon}
            </span>
            <span className="text-[10px] font-medium" style={{ color: SUB }}>{s.label}</span>
          </div>
        );
      })}
    </div>
  );
};

const compactSlugs = ["database-management-optimization", "system-integration-api-engineering", "full-cycle-product-development"];
const compactServices = services.filter((s) => compactSlugs.includes(s.slug));
const compactDiagrams = {
  "database-management-optimization": DatabaseScanDiagram,
  "system-integration-api-engineering": IntegrationDiagram,
  "full-cycle-product-development": ProductCycleDiagram,
};

const flagship = getServiceBySlug("ai-driven-software-development");
const enterprise = getServiceBySlug("enterprise-software-development");
const dataEngineering = getServiceBySlug("data-engineering-analytics");

const stats = [
  { label: "Orders", value: "12.4k" },
  { label: "Uptime", value: "98.2%" },
  { label: "Growth", value: "+18%" },
];

const Services = () => {
  const contentRef = useRef(null);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return;
      gsap.from(content.querySelectorAll("[data-reveal]"), {
        y: 28,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: content, start: "top 80%" },
      });
    }, content);
    return () => ctx.revert();
  }, []);

  return (
    <Section id="services" className="relative overflow-hidden" style={{ background: BG }}>
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.5] -z-10"
        style={{ backgroundImage: `radial-gradient(${DEEP}1a 1px, transparent 1px)`, backgroundSize: "22px 22px" }}
      />

      <div className="container relative z-1">
        <div className="flex flex-col items-center text-center mb-14 lg:mb-16" data-reveal>
          <div className="flex items-center gap-3 mb-6">
            <span className="hidden sm:block w-10 h-px" style={{ background: LINE }} />
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border bg-white text-[11px] font-bold uppercase tracking-wider shadow-sm"
              style={{ borderColor: "#B9CDF7", color: DEEP }}
            >
              <IconSparkle size={12} /> Our Services
            </span>
            <span className="hidden sm:block w-10 h-px" style={{ background: LINE }} />
          </div>
          <h2 className="max-w-3xl text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold leading-tight" style={{ color: INK }}>
            Services built around what your business <span style={{ color: DEEP }}>actually needs</span>
          </h2>
          <p className="mt-4 max-w-xl body-1" style={{ color: SUB }}>
            From your first AI feature to your full data stack, engineered end to end
          </p>
        </div>

        <div ref={contentRef} className="relative z-1">
          <div data-reveal className="mb-6 lg:mb-8">
            <Link to={`/services/${flagship.slug}`} className="block">
              <BlueprintPanel>
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 p-8 lg:p-12 items-center">
                  <div className="flex flex-col justify-center">
                    <h4 className="h4 mb-4" style={{ color: INK }}>{flagship.title}</h4>
                    <p className="body-2 mb-8" style={{ color: SUB }}>{flagship.description}</p>
                    <ul className="body-2">
                      {flagship.highlights.map((item, index) => (
                        <CheckItem key={index}>{item}</CheckItem>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-center">
                    <AIPipelineDiagram />
                  </div>
                </div>
              </BlueprintPanel>
            </Link>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 mb-6 lg:mb-8">
            <div data-reveal>
              <Link to={`/services/${enterprise.slug}`} className="block h-full">
                <BlueprintPanel className="h-full">
                  <div className="p-8 lg:p-10 flex flex-col h-full">
                    <h4 className="h4 mb-3" style={{ color: INK }}>{enterprise.title}</h4>
                    <p className="body-2 mb-6" style={{ color: SUB }}>{enterprise.description}</p>

                    <EnterpriseDiagram />

                    <div className="grid grid-cols-3 gap-2 mt-6">
                      {stats.map((stat) => (
                        <div key={stat.label} className="rounded-lg border px-2 py-2 text-center" style={{ borderColor: LINE }}>
                          <span className="block text-xs font-semibold" style={{ color: DEEP }}>{stat.value}</span>
                          <span className="block text-[0.65rem] mt-0.5" style={{ color: SUB }}>{stat.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </BlueprintPanel>
              </Link>
            </div>

            <div data-reveal>
              <Link to={`/services/${dataEngineering.slug}`} className="block h-full">
                <BlueprintPanel className="h-full">
                  <div className="p-8 lg:p-10 flex flex-col h-full">
                    <h4 className="h4 mb-3" style={{ color: INK }}>{dataEngineering.title}</h4>
                    <p className="body-2 mb-6" style={{ color: SUB }}>{dataEngineering.description}</p>
                    <div className="mt-auto">
                      <DataFlowDiagram />
                    </div>
                  </div>
                </BlueprintPanel>
              </Link>
            </div>
          </div>

          <h5 data-reveal className="tagline mb-5" style={{ color: SUB }}>
            More ways we help
          </h5>
          <div className="grid sm:grid-cols-3 gap-6 lg:gap-8">
            {compactServices.map((service) => {
              const Diagram = compactDiagrams[service.slug];
              return (
                <Link key={service.slug} to={`/services/${service.slug}`} data-reveal className="group h-full block">
                  <BlueprintPanel className="h-full transition-transform duration-300 group-hover:-translate-y-1">
                    <div className="p-6 lg:p-8 h-full flex flex-col">
                      <div className="mb-6">
                        <Diagram />
                      </div>
                      <h5 className="h5 mb-2" style={{ color: INK }}>{service.title}</h5>
                      <p className="body-2" style={{ color: SUB }}>{service.shortDescription}</p>
                    </div>
                  </BlueprintPanel>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Services;