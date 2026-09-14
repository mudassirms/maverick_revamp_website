import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "./Section";
import Heading from "./Heading";
import { getServiceBySlug, services } from "../config/services";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ACCENTS = { deep: "#1D4ED8", bright: "#3B82F6" };

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Blueprint-style panel: hairline border, faint dot grid, technical corner marks.
// Deliberately different chrome from the Products section's soft gradient-rim cards —
// this reads as a schematic/spec sheet, which fits "how we build" rather than "what we sell".
const BlueprintPanel = ({ accent = "deep", className = "", children }) => {
  const color = ACCENTS[accent] || ACCENTS.deep;
  return (
    <div className={`relative rounded-xl border bg-n-8 overflow-hidden ${className}`} style={{ borderColor: `${color}30` }}>
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{ backgroundImage: `radial-gradient(${color}26 1px, transparent 1px)`, backgroundSize: "18px 18px" }}
      />
      <span className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 pointer-events-none" style={{ borderColor: color }} />
      <span className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 pointer-events-none" style={{ borderColor: color }} />
      <div className="relative h-full">{children}</div>
    </div>
  );
};

// ---- 1. flagship — raw data flows into an AI core, comes out as a shipped product ----
const AIPipelineDiagram = () => {
  const path1Ref = useRef(null);
  const path2Ref = useRef(null);
  const coreRef = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const tweens = [
      gsap.to(path1Ref.current, { strokeDashoffset: -24, duration: 1.6, ease: "none", repeat: -1 }),
      gsap.to(path2Ref.current, { strokeDashoffset: -24, duration: 1.6, ease: "none", repeat: -1 }),
      gsap.to(coreRef.current, { scale: 1.08, duration: 1.1, ease: "sine.inOut", yoyo: true, repeat: -1 }),
      gsap.to(cursorRef.current, { opacity: 0, duration: 0.5, ease: "steps(1)", yoyo: true, repeat: -1 }),
    ];
    return () => tweens.forEach((t) => t.kill());
  }, []);

  return (
    <svg viewBox="0 0 360 180" className="w-full h-auto">
      {[0, 1, 2].map((i) => (
        <rect key={i} x="16" y={58 + i * 22} width="48" height="14" rx="3" fill="#1D4ED8" opacity={0.15 + i * 0.12} />
      ))}
      <path ref={path1Ref} d="M70,97 H150" stroke="#1D4ED8" strokeWidth="2" strokeDasharray="6 6" fill="none" />

      <g ref={coreRef} style={{ transformOrigin: "180px 97px" }}>
        <polygon points="180,68 206,82 206,112 180,126 154,112 154,82" fill="none" stroke="#3B82F6" strokeWidth="2" />
        <circle cx="180" cy="97" r="6" fill="#3B82F6" />
      </g>

      <path ref={path2Ref} d="M210,97 H290" stroke="#3B82F6" strokeWidth="2" strokeDasharray="6 6" fill="none" />

      <rect x="292" y="60" width="60" height="74" rx="6" fill="none" stroke="#1D4ED8" strokeWidth="1.5" />
      <rect x="302" y="74" width="40" height="6" rx="2" fill="#1D4ED8" opacity="0.4" />
      <rect x="302" y="86" width="26" height="6" rx="2" fill="#1D4ED8" opacity="0.25" />
      <rect ref={cursorRef} x="302" y="100" width="3" height="10" fill="#3B82F6" />
    </svg>
  );
};

// ---- 2. enterprise — a hub of modules, packets pulsing out to each one ----
const EnterpriseDiagram = () => {
  const packetRefs = useRef([]);
  packetRefs.current = [];
  const add = (el) => el && packetRefs.current.push(el);

  const hub = { x: 100, y: 80 };
  const nodes = [
    { x: 30, y: 30 },
    { x: 170, y: 30 },
    { x: 30, y: 130 },
    { x: 170, y: 130 },
  ];

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const tweens = packetRefs.current.map((el, i) =>
      gsap.to(el, {
        attr: { cx: nodes[i].x, cy: nodes[i].y },
        opacity: 1,
        duration: 0.9,
        delay: i * 0.25,
        repeat: -1,
        repeatDelay: 0.7,
        ease: "power1.out",
        onRepeat: () => gsap.set(el, { attr: { cx: hub.x, cy: hub.y }, opacity: 0 }),
      })
    );
    return () => tweens.forEach((t) => t.kill());
  }, []);

  return (
    <svg viewBox="0 0 200 160" className="w-full h-auto">
      {nodes.map((n, i) => (
        <line key={i} x1={hub.x} y1={hub.y} x2={n.x} y2={n.y} stroke="#1D4ED8" strokeWidth="1.5" strokeDasharray="3 4" opacity="0.4" />
      ))}
      <rect x={hub.x - 26} y={hub.y - 18} width="52" height="36" rx="6" fill="#1D4ED8" opacity="0.15" stroke="#1D4ED8" />
      {nodes.map((n, i) => (
        <rect key={i} x={n.x - 12} y={n.y - 12} width="24" height="24" rx="5" fill="none" stroke="#3B82F6" strokeWidth="1.5" />
      ))}
      {nodes.map((_, i) => (
        <circle key={i} ref={add} cx={hub.x} cy={hub.y} r="3.5" fill="#3B82F6" opacity="0" />
      ))}
    </svg>
  );
};

// ---- 3. data engineering — raw data blocks feed a pipe, a live chart rises out the other end ----
const chartBars = [38, 62, 48, 88, 58, 74];

const DataFlowDiagram = () => {
  const barRefs = useRef([]);
  barRefs.current = [];
  const addBar = (el) => el && barRefs.current.push(el);
  const pipeRef = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    const reduce = prefersReducedMotion();
    if (reduce) return;

    gsap.set(barRefs.current, { scaleY: 0, transformOrigin: "bottom" });
    const reveal = gsap.to(barRefs.current, {
      scaleY: 1,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.08,
      scrollTrigger: { trigger: wrapRef.current, start: "top 85%" },
    });
    const flow = gsap.to(pipeRef.current, { strokeDashoffset: -20, duration: 1.2, ease: "none", repeat: -1 });
    return () => {
      reveal.kill();
      flow.kill();
    };
  }, []);

  return (
    <div ref={wrapRef}>
      <svg viewBox="0 0 200 40" className="w-full h-auto mb-3">
        {[0, 1, 2].map((i) => (
          <rect key={i} x={10 + i * 20} y="14" width="12" height="12" rx="2" fill="#1D4ED8" opacity="0.5" />
        ))}
        <path ref={pipeRef} d="M60,20 H190" stroke="#3B82F6" strokeWidth="2" strokeDasharray="5 5" fill="none" />
      </svg>
      <div className="flex items-end gap-3 h-28">
        {chartBars.map((h, i) => (
          <div key={i} className="flex-1 h-full flex items-end">
            <div
              ref={addBar}
              className="w-full rounded-t-md bg-gradient-to-t from-[#1D4ED8]/60 to-[#3B82F6]/60"
              style={{ height: `${h}%` }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// ---- 4. database — an index scan sweeping down a stack of rows ----
const DatabaseScanDiagram = () => {
  const scanRef = useRef(null);
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const tween = gsap.fromTo(
      scanRef.current,
      { y: 14 },
      { y: 66, duration: 1.5, ease: "power1.inOut", yoyo: true, repeat: -1 }
    );
    return () => tween.kill();
  }, []);

  return (
    <svg viewBox="0 0 120 90" className="w-full h-auto">
      <rect x="20" y="10" width="80" height="70" rx="6" fill="none" stroke="#1D4ED8" strokeWidth="1.5" />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x="28" y={18 + i * 16} width="64" height="8" rx="2" fill="#1D4ED8" opacity="0.15" />
      ))}
      <rect ref={scanRef} x="20" y="14" width="80" height="8" rx="2" fill="#3B82F6" opacity="0.55" />
    </svg>
  );
};

// ---- 5. integration — a packet ferried back and forth between two systems ----
const IntegrationDiagram = () => {
  const packetRef = useRef(null);
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const tween = gsap.fromTo(
      packetRef.current,
      { attr: { cx: 30 } },
      { attr: { cx: 90 }, duration: 1.1, ease: "power1.inOut", yoyo: true, repeat: -1 }
    );
    return () => tween.kill();
  }, []);

  return (
    <svg viewBox="0 0 120 90" className="w-full h-auto">
      <rect x="10" y="32" width="28" height="28" rx="6" fill="none" stroke="#1D4ED8" strokeWidth="1.5" />
      <rect x="82" y="32" width="28" height="28" rx="6" fill="none" stroke="#3B82F6" strokeWidth="1.5" />
      <path d="M38,46 H82" stroke="#1D4ED8" strokeWidth="1.5" strokeDasharray="3 4" opacity="0.4" />
      <circle ref={packetRef} cx="30" cy="46" r="4" fill="#3B82F6" />
    </svg>
  );
};

// ---- 6. full-cycle — an actual loop (design/build/ship/iterate is genuinely cyclical) ----
const ProductCycleDiagram = () => {
  const orbitRef = useRef(null);
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const tween = gsap.to(orbitRef.current, { rotation: 360, duration: 5, ease: "linear", repeat: -1 });
    return () => tween.kill();
  }, []);

  const stageAngles = [-90, 0, 90, 180];

  return (
    <svg viewBox="0 0 120 90" className="w-full h-auto overflow-visible">
      <circle cx="60" cy="45" r="26" fill="none" stroke="#1D4ED8" strokeWidth="1.5" strokeDasharray="4 5" opacity="0.5" />
      {stageAngles.map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        return <circle key={i} cx={60 + 26 * Math.cos(rad)} cy={45 + 26 * Math.sin(rad)} r="3" fill="#1D4ED8" opacity="0.5" />;
      })}
      <g ref={orbitRef} style={{ transformOrigin: "60px 45px" }}>
        <circle cx="60" cy="19" r="4.5" fill="#3B82F6" />
      </g>
    </svg>
  );
};

const compactSlugs = [
  "database-management-optimization",
  "system-integration-api-engineering",
  "full-cycle-product-development",
];
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
    <Section id="services">
      <div className="container relative">
        <Heading
          title="Services built around what your business actually needs"
          text="From your first AI feature to your full data stack, engineered end to end"
        />

        <div ref={contentRef} className="relative z-1">
          <div data-reveal className="mb-6 lg:mb-8">
            <Link to={`/services/${flagship.slug}`} className="block">
              <BlueprintPanel accent="deep">
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 p-8 lg:p-12">
                  <div className="flex flex-col justify-center">
                    <h4 className="h4 mb-4">{flagship.title}</h4>
                    <p className="body-2 text-n-3 mb-8">{flagship.description}</p>
                    <ul className="body-2">
                      {flagship.highlights.map((item, index) => (
                        <li key={index} className="flex items-center gap-3 py-3 border-t border-n-6 first:border-t-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-[#1D4ED8] to-[#3B82F6]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-center rounded-xl border border-n-6 p-6">
                    <AIPipelineDiagram />
                  </div>
                </div>
              </BlueprintPanel>
            </Link>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 mb-6 lg:mb-8">
            <div data-reveal>
              <Link to={`/services/${enterprise.slug}`} className="block h-full">
                <BlueprintPanel accent="deep" className="h-full">
                  <div className="p-8 lg:p-10 flex flex-col h-full">
                    <h4 className="h4 mb-3">{enterprise.title}</h4>
                    <p className="body-2 text-n-3 mb-6">{enterprise.description}</p>

                    <EnterpriseDiagram />

                    <div className="grid grid-cols-3 gap-2 mt-6">
                      {stats.map((stat) => (
                        <div key={stat.label} className="rounded-lg border border-n-6 px-2 py-2">
                          <span className="block text-[0.65rem] text-n-4 mb-1">{stat.label}</span>
                          <span className="block text-xs font-semibold text-n-1">{stat.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </BlueprintPanel>
              </Link>
            </div>

            <div data-reveal>
              <Link to={`/services/${dataEngineering.slug}`} className="block h-full">
                <BlueprintPanel accent="bright" className="h-full">
                  <div className="p-8 lg:p-10 flex flex-col h-full">
                    <h4 className="h4 mb-3">{dataEngineering.title}</h4>
                    <p className="body-2 text-n-3 mb-6">{dataEngineering.description}</p>
                    <DataFlowDiagram />
                  </div>
                </BlueprintPanel>
              </Link>
            </div>
          </div>

          <h5 data-reveal className="tagline text-n-4 mb-5">
            More ways we help
          </h5>
          <div className="grid sm:grid-cols-3 gap-6 lg:gap-8">
            {compactServices.map((service, index) => {
              const Diagram = compactDiagrams[service.slug];
              return (
                <Link key={service.slug} to={`/services/${service.slug}`} data-reveal className="group h-full block">
                  <BlueprintPanel
                    accent={index % 2 === 0 ? "deep" : "bright"}
                    className="h-full transition-transform duration-300 group-hover:-translate-y-1"
                  >
                    <div className="p-6 lg:p-8 h-full flex flex-col">
                      <div className="mb-5 w-24">
                        <Diagram />
                      </div>
                      <h5 className="h5 mb-2 text-n-1">{service.title}</h5>
                      <p className="body-2 text-n-3">{service.shortDescription}</p>
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