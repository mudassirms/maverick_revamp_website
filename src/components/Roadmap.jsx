import { Fragment, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Heading from "./Heading";
import Section from "./Section";
import { grid, check2 } from "../assets";
import { Gradient } from "./design/Roadmap";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const useReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    setReduced(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);
  return reduced;
};

// ---- MaverickDine: live order-status grid + toast ----
// (unified to the site's blue accent system — was red/gold)

const dineTables = ["MH-01", "MH-02", "MH-03", "MH-04", "MH-05", "MH-06"];
const dineStatusStyle = {
  idle: "bg-n-6 border-n-5",
  active: "bg-[#1D4ED8]/20 border-[#1D4ED8]/60",
  ready: "bg-[#3B82F6]/20 border-[#3B82F6]/60",
};

const MaverickDineGraphic = () => {
  const reduced = useReducedMotion();
  const [statuses, setStatuses] = useState(
    Object.fromEntries(dineTables.map((t) => [t, "idle"]))
  );
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (reduced) return;
    const interval = setInterval(() => {
      const table = dineTables[Math.floor(Math.random() * dineTables.length)];
      setStatuses((prev) => ({ ...prev, [table]: "active" }));
      setToast(`New order — ${table}`);

      const toReady = setTimeout(() => {
        setStatuses((prev) => ({ ...prev, [table]: "ready" }));
        setToast(null);
      }, 1400);

      const toIdle = setTimeout(() => {
        setStatuses((prev) => ({ ...prev, [table]: "idle" }));
      }, 3000);

      return () => {
        clearTimeout(toReady);
        clearTimeout(toIdle);
      };
    }, 2200);
    return () => clearInterval(interval);
  }, [reduced]);

  return (
    <div className="relative flex flex-col justify-center h-full bg-n-7 px-6 py-5">
      <div className="grid grid-cols-3 gap-2.5">
        {dineTables.map((table) => (
          <div
            key={table}
            className={`rounded-lg border px-2 py-3 text-center transition-colors duration-500 ${dineStatusStyle[statuses[table]]}`}
          >
            <span className="block text-[0.65rem] font-code text-n-1">
              {table}
            </span>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute top-3 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full bg-n-1 text-n-8 text-[0.65rem] font-code px-3 py-1.5 shadow-lg"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#1D4ED8]" />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ---- MaverickHR: kanban card gliding between columns via shared layout ----

const hrColumns = ["To Do", "In Progress", "Done"];

const MaverickHRGraphic = () => {
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const interval = setInterval(() => {
      setStep((s) => (s + 1) % hrColumns.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [reduced]);

  return (
    <div className="flex h-full gap-2 bg-n-7 px-5 py-5">
      {hrColumns.map((col, index) => (
        <div
          key={col}
          className="flex-1 rounded-lg bg-n-6/60 border border-n-1/5 p-2 flex flex-col gap-2"
        >
          <span className="text-[0.6rem] font-code uppercase tracking-wide text-n-4 px-1">
            {col}
          </span>
          {index !== 0 && (
            <div className="rounded-md bg-n-6 border border-n-1/5 h-8" />
          )}
          {step === index && (
            <motion.div
              layoutId="hr-task-card"
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              className="rounded-md bg-gradient-to-br from-[#1D4ED8]/30 to-[#3B82F6]/30 border border-[#3B82F6]/40 h-9 flex items-center px-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] mr-1.5 shrink-0" />
              <span className="text-[0.55rem] text-n-1 leading-tight">
                Sprint task
              </span>
            </motion.div>
          )}
          {index === 2 && step !== 2 && (
            <div className="rounded-md bg-n-6 border border-n-1/5 h-8 opacity-40" />
          )}
        </div>
      ))}
    </div>
  );
};

// Roadmap content.
// NOTE: BlackBuck's description below is an honest "coming soon" placeholder,
// not a real product description — swap `text` for the real one-liner
// whenever it's available. Nothing here leaks internal/dev notes anymore.
const roadmap = [
  {
    id: "0",
    title: "MaverickDine",
    text: "AI-powered restaurant management and billing platform — POS, kitchen display, inventory, and analytics in one system. Live and trusted by 500+ restaurants across India.",
    status: "done",
    graphic: <MaverickDineGraphic />,
    link: "https://maverickdine.com",
  },
  {
    id: "1",
    title: "MaverickHR",
    text: "A next-gen enterprise workforce and project execution platform — agile sprint tracking, automated payroll, attendance, and real-time team collaboration.",
    status: "progress",
    graphic: <MaverickHRGraphic />,
    link: "https://hr.maverickignite.com",
  },
  {
    id: "2",
    title: "RetailView Analytics",
    text: "A retail intelligence platform turning store and sales data into real-time, actionable insight.",
    status: "progress",
    graphic: null,
  },
  {
    id: "3",
    title: "BlackBuck",
    text: "Currently in early development. Details on what BlackBuck does will be shared here as the product takes shape.",
    status: "progress",
    graphic: null,
  },
];

// "under construction" graphic for products without a mockup yet
const BuildingGraphic = () => (
  <div className="relative flex items-center justify-center h-full min-h-[12rem] bg-n-7">
    <div className="absolute inset-0 opacity-20">
      <img src={grid} className="w-full h-full object-cover" alt="" />
    </div>
    <div className="relative flex flex-col items-center gap-3">
      <span className="relative flex items-center justify-center w-12 h-12 rounded-full border border-[#3B82F6]/50 text-[#3B82F6]">
        <span className="absolute inset-0 rounded-full border border-[#3B82F6]/40 motion-safe:animate-ping" />
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
          <path
            d="M4 20 20 4M9 4H4v5M15 20h5v-5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="tagline text-n-4">Building in public soon</span>
    </div>
  </div>
);

const Spinner = () => (
  <svg
    viewBox="0 0 24 24"
    width="14"
    height="14"
    className="motion-safe:animate-spin"
  >
    <circle
      cx="12"
      cy="12"
      r="9"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeDasharray="42"
      strokeDashoffset="14"
      strokeLinecap="round"
      fill="none"
      opacity="0.9"
    />
  </svg>
);

const StatusBadge = ({ status }) => (
  <div className="flex items-center px-3 py-1 bg-n-1 rounded text-n-8">
    {status === "done" ? (
      <img className="mr-2" src={check2} width={14} height={14} alt="Done" />
    ) : (
      <span className="mr-2">
        <Spinner />
      </span>
    )}
    <div className="tagline">{status === "done" ? "Live" : "In progress"}</div>
  </div>
);

const RoadmapCard = ({ item, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.6, delay: (index % 2) * 0.15, ease: "easeOut" }}
    whileHover={{ y: -6 }}
    className={`md:flex ${
      index % 2 !== 0 ? "md:translate-y-[4rem]" : ""
    } p-[1px] rounded-[2rem] bg-gradient-to-br from-[#1D4ED8]/30 via-n-6 to-[#3B82F6]/30`}
  >
    <div className="relative w-full bg-n-8 rounded-[calc(2rem-1px)] overflow-hidden">
      <div className="flex items-center justify-between p-6 pb-0">
        <h4 className="h5">{item.title}</h4>
        <StatusBadge status={item.status} />
      </div>

      <div className="relative mt-5 h-[13rem] md:h-[14rem] overflow-hidden rounded-2xl mx-6 w-[calc(100%-3rem)] border border-n-1/10">
        {item.graphic ? item.graphic : <BuildingGraphic />}
      </div>

      <div className="p-6">
        <p className="body-2 text-n-4 mb-4">{item.text}</p>
        {item.link && (
          <a
            href={item.link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 font-code text-xs font-bold uppercase tracking-wider text-n-1"
          >
            Visit site →
          </a>
        )}
      </div>
    </div>
  </motion.div>
);

const Roadmap = () => {
  const timelineRef = useRef(null);
  const segmentRefs = useRef([]);
  segmentRefs.current = [];
  const addSegment = (el) => el && segmentRefs.current.push(el);

  useEffect(() => {
    const el = timelineRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(segmentRefs.current, { scaleX: 1 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.set(segmentRefs.current, { scaleX: 0, transformOrigin: "left" });
      gsap.to(segmentRefs.current, {
        scaleX: 1,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.25,
        scrollTrigger: { trigger: el, start: "top 80%" },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <Section className="overflow-hidden" id="roadmap">
      <div className="container md:pb-10">
        <Heading tag="Where we are" title="What we're building" />

        <div
          ref={timelineRef}
          className="hidden md:flex items-center justify-between mb-16 px-2"
        >
          {roadmap.map((item, index) => (
            <Fragment key={item.id}>
              <div className="flex flex-col items-center gap-2">
                <span className="relative flex items-center justify-center">
                  {item.status !== "done" && (
                    <span className="absolute inset-0 -m-1 rounded-full border border-[#3B82F6]/40 motion-safe:animate-ping" />
                  )}
                  <span
                    className={`block w-3.5 h-3.5 rounded-full ${
                      item.status === "done"
                        ? "bg-gradient-to-br from-[#1D4ED8] to-[#3B82F6]"
                        : "border-2 border-[#3B82F6] bg-n-8"
                    }`}
                  />
                </span>
                <span className="text-xs text-n-4 whitespace-nowrap">
                  {item.title}
                </span>
              </div>
              {index < roadmap.length - 1 && (
                <div className="relative flex-1 h-px mx-3 bg-n-6 overflow-hidden">
                  <div
                    ref={addSegment}
                    className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-[#1D4ED8] to-[#3B82F6]"
                  />
                </div>
              )}
            </Fragment>
          ))}
        </div>

        <div className="relative grid gap-6 md:grid-cols-2 md:gap-6 md:pb-[4rem]">
          {roadmap.map((item, index) => (
            <RoadmapCard key={item.id} item={item} index={index} />
          ))}

          <Gradient />
        </div>
      </div>
    </Section>
  );
};

export default Roadmap;