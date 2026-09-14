import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "./Section";
import Heading from "./Heading";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Panel = ({ accent = "mixed", className = "", children }) => {
  const gradients = {
    red: "from-[#e11d2e]/40 via-n-6 to-n-6",
    gold: "from-[#c9a227]/40 via-n-6 to-n-6",
    mixed: "from-[#e11d2e]/30 via-n-6 to-[#c9a227]/30",
  };
  return (
    <div
      className={`rounded-3xl p-[1px] bg-gradient-to-br ${gradients[accent]} ${className}`}
    >
      <div className="relative h-full rounded-[calc(1.5rem-1px)] bg-n-8 overflow-hidden">
        {children}
      </div>
    </div>
  );
};

// one shared "window chrome" strip, reused everywhere a mockup needs one.
// Note: the third dot and every filler element below deliberately use
// bg-white/N instead of bg-n-5 — n-5 renders with a violet tint in this
// theme that clashes against the red/gold palette (visible as a stray
// purple dot/bar in the mockups otherwise).
const WindowChrome = ({ trailing }) => (
  <div className="flex items-center gap-2 px-4 py-3 border-b border-n-1/10">
    <span className="w-3 h-3 rounded-full bg-[#e11d2e]/70" />
    <span className="w-3 h-3 rounded-full bg-[#c9a227]/70" />
    <span className="w-3 h-3 rounded-full bg-white/15" />
    {trailing && <div className="ml-auto">{trailing}</div>}
  </div>
);

const icons = {
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
  rocket: (
    <path
      d="M12 2c3 2 4 6 4 9 0 2-1 4-2 5l-2 2-2-2c-1-1-2-3-2-5 0-3 1-7 4-9Zm-3 13-3 3m9-3 3 3"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
};

const flagshipFeatures = [
  "Custom AI model integration",
  "Production-ready architecture",
  "Scalable from MVP to enterprise",
  "Continuous iteration & support",
];

// a couple more lines than before, and no longer centered — reads like an
// actual file with content starting at the top, not a half-empty box
const codeLines = [
  { w: "60%", tone: "bg-[#e11d2e]/40" },
  { w: "85%", tone: "bg-white/10" },
  { w: "45%", tone: "bg-white/10" },
  { w: "70%", tone: "bg-[#c9a227]/40" },
  { w: "55%", tone: "bg-white/10" },
  { w: "38%", tone: "bg-white/10" },
  { w: "72%", tone: "bg-[#e11d2e]/40" },
];

const stats = [
  { label: "Orders", value: "12.4k" },
  { label: "Uptime", value: "98.2%" },
  { label: "Growth", value: "+18%" },
];

const chartBars = [38, 62, 48, 88, 58, 74];

const compactServices = [
  {
    icon: "data",
    title: "Database Management & Smart Optimization",
    text: "Secure, high-performance data systems tuned with AI-enhanced optimization.",
  },
  {
    icon: "sync",
    title: "System Integration & API Engineering",
    text: "We connect your tools and platforms into one seamless, unified ecosystem.",
  },
  {
    icon: "rocket",
    title: "Full-Cycle Product Development",
    text: "From first idea to MVP to enterprise-grade product — we carry it the whole way.",
  },
];

const Services = () => {
  const contentRef = useRef(null);
  const codeLineRefs = useRef([]);
  const barRefs = useRef([]);
  const chartPathRef = useRef(null);

  codeLineRefs.current = [];
  barRefs.current = [];
  const addCodeLineRef = (el) => el && codeLineRefs.current.push(el);
  const addBarRef = (el) => el && barRefs.current.push(el);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(codeLineRefs.current, { scaleX: 1 });
        gsap.set(barRefs.current, { scaleY: 1 });
        if (chartPathRef.current) {
          gsap.set(chartPathRef.current, { strokeDashoffset: 0 });
        }
        return;
      }

      gsap.from(content.querySelectorAll("[data-reveal]"), {
        y: 28,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: content, start: "top 80%" },
      });

      gsap.set(codeLineRefs.current, { scaleX: 0, transformOrigin: "left" });
      gsap.to(codeLineRefs.current, {
        scaleX: 1,
        duration: 0.4,
        ease: "power2.out",
        stagger: 0.14,
        scrollTrigger: { trigger: content, start: "top 70%" },
      });

      if (chartPathRef.current) {
        const length = chartPathRef.current.getTotalLength();
        gsap.set(chartPathRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
        gsap.to(chartPathRef.current, {
          strokeDashoffset: 0,
          duration: 1.4,
          ease: "power2.inOut",
          scrollTrigger: { trigger: content, start: "top 65%" },
        });
      }

      gsap.set(barRefs.current, { scaleY: 0, transformOrigin: "bottom" });
      gsap.to(barRefs.current, {
        scaleY: 1,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.08,
        scrollTrigger: { trigger: content, start: "top 65%" },
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
          {/* Flagship — AI-Driven Software Development */}
          <div data-reveal className="mb-6 lg:mb-8">
            <Panel accent="mixed">
              <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 p-8 lg:p-12">
                <div className="flex flex-col justify-center">
                  <h4 className="h4 mb-4">AI-Driven Software Development</h4>
                  <p className="body-2 text-n-3 mb-8">
                    We design and ship applications with AI built into the
                    core — engineered to learn, adapt, and scale as your
                    business does.
                  </p>
                  <ul className="body-2">
                    {flagshipFeatures.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-3 py-3 border-t border-n-6 first:border-t-0"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-[#e11d2e] to-[#c9a227]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex">
                  <div className="w-full min-h-[18rem] rounded-2xl border border-n-1/10 bg-n-7 overflow-hidden flex flex-col">
                    <WindowChrome />
                    {/* top-aligned, like an actual file — not centered in
                        the box, which is what made it look empty/broken */}
                    <div className="flex flex-col gap-3 p-6 pt-5">
                      {codeLines.map((line, index) => (
                        <div
                          key={index}
                          ref={addCodeLineRef}
                          className={`h-2.5 rounded-full ${line.tone}`}
                          style={{ width: line.w }}
                        />
                      ))}
                      <div className="flex items-center gap-2 mt-1">
                        <div className="h-2.5 w-1/5 rounded-full bg-white/10" />
                        <span className="inline-block w-2 h-4 bg-[#c9a227] motion-safe:animate-pulse" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Panel>
          </div>

          {/* Enterprise Software Development / Data Engineering & Analytics —
              both now compose the same way: text, then a fixed gap, then the
              graphic. Previously one was pinned to the bottom (mt-auto) and
              the other wasn't, which is what made the row look mismatched. */}
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 mb-6 lg:mb-8">
            <div data-reveal>
              <Panel accent="red" className="h-full">
                <div className="p-8 lg:p-10 flex flex-col h-full">
                  <h4 className="h4 mb-3">Enterprise Software Development</h4>
                  <p className="body-2 text-n-3 mb-8">
                    Robust, scalable systems built for the demands of modern
                    enterprises — secure by design.
                  </p>

                  <div className="rounded-2xl border border-n-1/10 bg-n-7 overflow-hidden">
                    <WindowChrome
                      trailing={<div className="w-16 h-2 rounded-full bg-white/10" />}
                    />
                    <div className="flex">
                      <div className="hidden sm:flex flex-col items-center gap-3 w-10 py-4 border-r border-n-1/10">
                        <span className="w-3.5 h-3.5 rounded bg-[#e11d2e]/60" />
                        <span className="w-3.5 h-3.5 rounded bg-white/10" />
                        <span className="w-3.5 h-3.5 rounded bg-white/10" />
                        <span className="w-3.5 h-3.5 rounded bg-white/10" />
                      </div>
                      <div className="flex-1 p-4">
                        <div className="grid grid-cols-3 gap-2 mb-4">
                          {stats.map((stat) => (
                            <div
                              key={stat.label}
                              className="rounded-lg bg-n-6 px-2 py-2"
                            >
                              <span className="block text-[0.65rem] text-n-4 mb-1">
                                {stat.label}
                              </span>
                              <span className="block text-xs font-semibold text-n-1">
                                {stat.value}
                              </span>
                            </div>
                          ))}
                        </div>
                        <svg viewBox="0 0 100 32" className="w-full h-14">
                          <defs>
                            <linearGradient
                              id="lineGrad"
                              x1="0"
                              y1="0"
                              x2="1"
                              y2="0"
                            >
                              <stop offset="0%" stopColor="#e11d2e" />
                              <stop offset="100%" stopColor="#c9a227" />
                            </linearGradient>
                          </defs>
                          <path
                            ref={chartPathRef}
                            d="M0,26 L15,18 L30,22 L45,8 L60,14 L75,4 L100,10"
                            fill="none"
                            stroke="url(#lineGrad)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Panel>
            </div>

            <div data-reveal>
              <Panel accent="gold" className="h-full">
                <div className="p-8 lg:p-10 flex flex-col h-full">
                  <h4 className="h4 mb-3">Data Engineering &amp; Analytics</h4>
                  <p className="body-2 text-n-3 mb-8">
                    We turn raw, scattered data into business intelligence
                    you can act on, with pipelines built for scale.
                  </p>
                  <div className="flex items-end gap-3 h-32">
                    {chartBars.map((h, index) => (
                      <div
                        key={index}
                        className="flex-1 h-full flex items-end"
                      >
                        <div
                          ref={addBarRef}
                          className="w-full rounded-t-md bg-gradient-to-t from-[#e11d2e]/50 to-[#c9a227]/50"
                          style={{ height: `${h}%` }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </Panel>
            </div>
          </div>

          {/* Remaining services — same structure, same treatment, every card */}
          <h5 data-reveal className="tagline text-n-4 mb-5">
            More ways we help
          </h5>
          <div className="grid sm:grid-cols-3 gap-6 lg:gap-8">
            {compactServices.map((service, index) => (
              <div key={service.title} data-reveal className="group h-full">
                <Panel
                  accent={index % 2 === 0 ? "red" : "gold"}
                  className="h-full transition-transform duration-300 group-hover:-translate-y-1"
                >
                  <div className="p-6 lg:p-8 h-full">
                    <span
                      className={`flex items-center justify-center w-11 h-11 mb-5 rounded-xl border ${
                        index % 2 === 0
                          ? "border-[#e11d2e]/40 text-[#e11d2e]"
                          : "border-[#c9a227]/40 text-[#c9a227]"
                      }`}
                    >
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
                        {icons[service.icon]}
                      </svg>
                    </span>
                    <h5 className="h5 mb-2 text-n-1">{service.title}</h5>
                    <p className="body-2 text-n-3">{service.text}</p>
                  </div>
                </Panel>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Services;