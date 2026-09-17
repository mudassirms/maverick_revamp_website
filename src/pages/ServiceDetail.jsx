import { useEffect, useRef, useState } from "react";
import { useParams, Link, Navigate, useNavigate } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { services, getServiceBySlug, getRelatedServices } from "../config/services";
import { moduleIcons } from "../utils/moduleIcons";
import Section from "../components/Section";
import LightAmbient from "../components/LightAmbient";

const ACCENT = "#3B82F6";
const ACCENT_DEEP = "#1D4ED8";
const ACCENT_SOFT = "#22D3EE";

/* ------------------------------------------------------------------
   Title set on two lines: everything but the final phrase in white,
   the closing phrase in the gradient. Reads as a wordmark, not a heading.
------------------------------------------------------------------ */
const ServiceTitle = ({ text }) => {
  const words = text.split(" ");
  const splitAt = words.length > 3 ? words.length - 2 : Math.max(words.length - 1, 1);

  return (
    <motion.h1
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="text-[13vw] sm:text-[7.5vw] lg:text-[4.4vw] leading-[0.95] font-bold tracking-tight mb-7"
    >
      <span className="block text-n-1">{words.slice(0, splitAt).join(" ")}</span>
      <span
        className="block"
        style={{
          background: `linear-gradient(100deg, ${ACCENT}, ${ACCENT_SOFT})`,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        {words.slice(splitAt).join(" ")}
      </span>
    </motion.h1>
  );
};

/* ------------------------------------------------------------------ */
const CountUp = ({ value }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const match = String(value).match(/^(\D*)([\d.,]+)(.*)$/);
  const [shown, setShown] = useState(match ? 0 : value);

  useEffect(() => {
    if (!match || !inView) return;
    const target = parseFloat(match[2].replace(/,/g, ""));
    if (reduce) return setShown(target);
    const decimals = (match[2].split(".")[1] || "").length;
    const start = performance.now();
    let frame;
    const tick = (now) => {
      const t = Math.min((now - start) / 1000, 1);
      setShown((target * (1 - Math.pow(1 - t, 3))).toFixed(decimals));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduce, value]);

  if (!match) return <span ref={ref}>{value}</span>;
  return (
    <span ref={ref}>
      {match[1]}
      {Number(shown).toLocaleString()}
      {match[3]}
    </span>
  );
};

/* ------------------------------------------------------------------
   Hero visual when a service has no artwork: the capabilities drawn as
   a live system rather than a static icon. Hovering a node lights its
   spoke, so the graphic answers you instead of just looping.
------------------------------------------------------------------ */
const CapabilityConstellation = ({ service }) => {
  const [hot, setHot] = useState(null);
  const nodes = (service.features || []).slice(0, 6);
  const n = nodes.length;
  const cx = 200;
  const cy = 160;
  const r = 112;
  const patternId = `cc-grid-${service.slug}`;

  const points = nodes.map((f, i) => {
    const a = (-90 + (360 / Math.max(n, 1)) * i) * (Math.PI / 180);
    return { ...f, x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
  });

  return (
    <div className="relative w-full aspect-[4/3] rounded-2xl border border-n-6 bg-n-7/60 overflow-hidden backdrop-blur-sm">
      <div
        className="absolute left-1/2 top-1/2 w-80 h-80 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[90px] opacity-25 pointer-events-none"
        style={{ background: ACCENT }}
      />

      <svg viewBox="0 0 400 320" className="relative w-full h-full">
        <defs>
          <pattern id={patternId} width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" className="fill-n-1" opacity="0.09" />
          </pattern>
        </defs>
        <rect width="400" height="320" fill={`url(#${patternId})`} />

        {/* slowly rotating orbit */}
        <motion.circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={ACCENT}
          strokeOpacity={0.18}
          strokeDasharray="3 9"
          animate={{ strokeDashoffset: [0, -48] }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
        />

        {/* spokes */}
        {points.map((p, i) => (
          <line
            key={`s-${i}`}
            x1={cx}
            y1={cy}
            x2={p.x}
            y2={p.y}
            stroke={hot === i ? ACCENT_SOFT : ACCENT}
            strokeOpacity={hot === i ? 0.9 : 0.22}
            style={{ transition: "stroke-opacity .3s, stroke .3s" }}
          />
        ))}

        {/* signal travelling out to one node at a time */}
        {points.map((p, i) => (
          <motion.circle
            key={`p-${i}`}
            r={3}
            fill={ACCENT_SOFT}
            initial={{ cx, cy, opacity: 0 }}
            animate={{ cx: [cx, p.x], cy: [cy, p.y], opacity: [0, 1, 0] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              repeatDelay: n * 0.5,
              delay: i * 0.5,
              ease: "easeOut",
            }}
          />
        ))}

        {/* nodes */}
        {points.map((p, i) => (
          <g
            key={p.title}
            onMouseEnter={() => setHot(i)}
            onMouseLeave={() => setHot(null)}
            style={{ cursor: "default" }}
          >
            <circle
              cx={p.x}
              cy={p.y}
              r={hot === i ? 25 : 22}
              className="fill-n-8"
              stroke={hot === i ? ACCENT_SOFT : ACCENT}
              strokeOpacity={hot === i ? 1 : 0.45}
              style={{ transition: "r .25s, stroke .25s" }}
            />
            <svg
              x={p.x - 9}
              y={p.y - 9}
              width={18}
              height={18}
              viewBox="0 0 24 24"
              style={{ color: hot === i ? ACCENT_SOFT : ACCENT }}
            >
              {moduleIcons[p.iconName]}
            </svg>
          </g>
        ))}

        {/* core */}
        <motion.circle
          cx={cx}
          cy={cy}
          r={42}
          fill="none"
          stroke={ACCENT}
          initial={{ r: 42, opacity: 0.45 }}
          animate={{ r: 68, opacity: 0 }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
        />
        <circle cx={cx} cy={cy} r={42} className="fill-n-8" stroke={ACCENT} strokeWidth={1.5} />
        <svg
          x={cx - 17}
          y={cy - 17}
          width={34}
          height={34}
          viewBox="0 0 24 24"
          style={{ color: ACCENT }}
        >
          {moduleIcons[service.iconName]}
        </svg>
      </svg>

      <p className="absolute bottom-4 left-0 right-0 text-center font-code text-[11px] uppercase tracking-[0.18em] text-n-4">
        {hot !== null ? points[hot].title : `${n} capabilities, one system`}
      </p>
    </div>
  );
};

/* ------------------------------------------------------------------
   Engagement pipeline. Horizontal rail on desktop with a pulse that
   travels the line; stacked on mobile.
------------------------------------------------------------------ */
const Pipeline = ({ steps }) => (
  <div className="relative">
    <div className="hidden lg:block absolute left-0 right-0 top-[7px] h-px bg-n-6" />
    <motion.span
      className="hidden lg:block absolute top-[3px] w-2.5 h-2.5 rounded-full"
      style={{ background: ACCENT_SOFT, boxShadow: `0 0 18px ${ACCENT_SOFT}` }}
      initial={{ left: "0%" }}
      animate={{ left: "calc(100% - 10px)" }}
      transition={{ duration: steps.length * 1.6, repeat: Infinity, ease: "easeInOut" }}
    />

    <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, i) => (
        <div key={step.title} className="relative lg:pt-12">
          <span
            className="hidden lg:block absolute top-0 left-0 w-3.5 h-3.5 rounded-full border-2 bg-n-8"
            style={{ borderColor: ACCENT }}
          />
          <span className="font-code text-xs tracking-[0.18em]" style={{ color: ACCENT }}>
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="h5 mt-2 mb-2">{step.title}</h3>
          <p className="body-2 text-n-3 max-w-[42ch]">{step.description}</p>
        </div>
      ))}
    </div>
  </div>
);

/* ------------------------------------------------------------------
   Features as a selector instead of a card grid: pick one on the left,
   read it on the right.
------------------------------------------------------------------ */
const FeatureExplorer = ({ features }) => {
  const [active, setActive] = useState(0);
  const f = features[active];

  return (
    <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] gap-10 lg:gap-16">
      <div className="border-t border-n-6">
        {features.map((item, i) => (
          <button
            key={item.title}
            type="button"
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
            aria-pressed={active === i}
            className="group relative w-full flex items-center gap-4 py-5 border-b border-n-6 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3B82F6]"
          >
            <span
              className="font-code text-xs w-7 shrink-0"
              style={{ color: active === i ? ACCENT : undefined }}
            >
              <span className={active === i ? "" : "text-n-4"}>
                {String(i + 1).padStart(2, "0")}
              </span>
            </span>
            <span
              className={`h5 transition-colors ${
                active === i ? "text-n-1" : "text-n-4 group-hover:text-n-2"
              }`}
            >
              {item.title}
            </span>
            <span
              className="absolute left-0 bottom-0 h-px transition-all duration-500"
              style={{
                width: active === i ? "100%" : "0%",
                background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT_SOFT}, transparent)`,
              }}
            />
          </button>
        ))}
      </div>

      <div className="relative rounded-2xl border border-n-6 bg-n-7/60 backdrop-blur-sm p-8 lg:p-10 min-h-[16rem] overflow-hidden">
        <div
          className="absolute -top-20 -right-16 w-60 h-60 rounded-full blur-[90px] opacity-25 pointer-events-none"
          style={{ background: ACCENT }}
        />
        <AnimatePresence mode="wait">
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="relative"
          >
            <span
              className="flex items-center justify-center w-14 h-14 mb-6 rounded-2xl border"
              style={{ borderColor: `${ACCENT}55`, color: ACCENT, background: `${ACCENT}14` }}
            >
              <svg viewBox="0 0 24 24" width="24" height="24">
                {moduleIcons[f.iconName]}
              </svg>
            </span>
            <h3 className="h4 mb-3">{f.title}</h3>
            <p className="body-1 text-n-3 max-w-[48ch]">{f.description}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

/* ================================================================== */
const ServiceDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const service = getServiceBySlug(slug);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!service) return <Navigate to="/" replace />;

  const related = getRelatedServices(slug);
  const index = services.findIndex((s) => s.slug === slug);
  const prevService = services[(index - 1 + services.length) % services.length];
  const nextService = services[(index + 1) % services.length];

  const goToContact = () => {
    if (window.location.pathname !== "/") {
      navigate("/#contact");
      setTimeout(
        () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }),
        100
      );
      return;
    }
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const goToServices = (e) => {
    e.preventDefault();
    if (window.location.pathname !== "/") {
      navigate("/#services");
      setTimeout(
        () => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" }),
        100
      );
      return;
    }
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative overflow-hidden">
      <motion.div
        style={{
          scaleX: progress,
          transformOrigin: "0%",
          background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT_SOFT})`,
        }}
        className="fixed top-0 left-0 right-0 h-[2px] z-40"
      />

      {/* backdrop: light, white-based ambient glow — matches the rest of the site */}
      <LightAmbient color={ACCENT} accent={ACCENT_SOFT} />

      <Section className="pt-[8rem] !pb-0" id={`service-${slug}`}>
        <div className="w-full max-w-[1680px] mx-auto px-6 lg:px-10 xl:px-16 relative z-2">

          {/* ---------- breadcrumb ---------- */}
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-2 font-code text-xs uppercase tracking-wider"
            >
              <Link to="/" className="text-n-4 hover:text-[#3B82F6] transition-colors">
                Home
              </Link>
              <span className="text-n-5 select-none">/</span>
              <button
                type="button"
                onClick={goToServices}
                className="text-n-4 hover:text-[#3B82F6] transition-colors"
              >
                Services
              </button>
              <span className="text-n-5 select-none">/</span>
              <span className="text-[#3B82F6]" aria-current="page">
                {service.title}
              </span>
            </nav>

            <span className="flex items-center gap-2 font-code text-xs uppercase tracking-wider text-n-4">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Service {String(index + 1).padStart(2, "0")} of{" "}
              {String(services.length).padStart(2, "0")}
            </span>
          </div>

          {/* ---------- hero ---------- */}
          <div className="grid lg:grid-cols-[1.05fr_1fr] gap-14 xl:gap-20 items-center pb-20 lg:pb-28">
            <div>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2.5 mb-7 rounded-full border border-[#3B82F6]/40 bg-[#1D4ED8]/10 px-4 py-2"
              >
                <svg viewBox="0 0 24 24" width="15" height="15" className="text-[#3B82F6]">
                  {moduleIcons[service.iconName]}
                </svg>
                <span className="font-code text-xs uppercase tracking-[0.16em] text-n-2">
                  {service.tagline}
                </span>
              </motion.span>

              <ServiceTitle text={service.title} />

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="body-1 text-n-3 max-w-[56ch] mb-9 !leading-normal"
              >
                {service.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="flex flex-wrap items-center gap-4 mb-10"
              >
                <button
                  onClick={goToContact}
                  className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-code text-xs font-bold uppercase tracking-wider text-n-8 transition-transform hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6]"
                  style={{ background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT_DEEP})` }}
                >
                  Start a project
                  <span aria-hidden>↗</span>
                </button>
                <Link
                  to="/contact"
                  className="inline-flex items-center rounded-xl border border-n-6 px-7 py-3.5 font-code text-xs font-bold uppercase tracking-wider text-n-1 hover:border-[#3B82F6]/60 hover:text-[#3B82F6] transition-colors"
                >
                  Book a call
                </Link>
              </motion.div>

              {service.badges?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {service.badges.map((b) => (
                    <span
                      key={b}
                      className="rounded-full border border-n-6 bg-n-7/70 px-3.5 py-1.5 font-code text-xs text-n-2"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {service.image ? (
                <>
                  <div
                    className="absolute -inset-8 rounded-[3rem] blur-[90px] opacity-30 pointer-events-none"
                    style={{ background: ACCENT }}
                  />
                  <div className="relative rounded-2xl border border-n-6 overflow-hidden shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]">
                    <img src={service.image} alt="" className="w-full h-auto block" />
                  </div>
                </>
              ) : (
                <CapabilityConstellation service={service} />
              )}
            </motion.div>
          </div>
        </div>

        {/* ---------- outcomes band ---------- */}
        {service.stats?.length > 0 && (
          <div className="relative z-2 border-y border-n-6 bg-n-7/40 backdrop-blur-sm">
            <div className="w-full max-w-[1680px] mx-auto grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-n-6">
              {service.stats.map((stat) => (
                <div key={stat.label} className="px-6 lg:px-10 py-12">
                  <p
                    className="text-4xl lg:text-5xl font-bold tracking-tight mb-2"
                    style={{ color: ACCENT }}
                  >
                    <CountUp value={stat.value} />
                  </p>
                  <p className="font-code text-xs uppercase tracking-wider text-n-4">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="w-full max-w-[1680px] mx-auto px-6 lg:px-10 xl:px-16 relative z-2">

          {/* ---------- what you get ---------- */}
          {service.highlights?.length > 0 && (
            <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20 py-20 lg:py-24">
              <div>
                <h2 className="h2 leading-[1.04] mb-5 max-w-[14ch]">
                  What you actually get.
                </h2>
                <p className="body-2 text-n-3 max-w-[44ch] !leading-normal">{service.shortDescription}</p>
              </div>

              <ul>
                {service.highlights.map((item) => (
                  <li
                    key={item}
                    className="group flex items-center gap-4 py-5 border-b border-n-6 first:border-t first:border-n-6"
                  >
                    <span
                      className="flex items-center justify-center w-7 h-7 shrink-0 rounded-full border"
                      style={{ borderColor: `${ACCENT}55`, color: ACCENT, background: `${ACCENT}14` }}
                    >
                      <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M4 12.5l5 5L20 6.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="body-2 text-n-1 group-hover:text-[#3B82F6] transition-colors">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* ---------- engagement pipeline ---------- */}
          {service.process?.length > 0 && (
            <div className="py-16 lg:py-24 border-t border-n-6">
              <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-20 items-end mb-14">
                <h2 className="h2 leading-[1.04] max-w-[18ch]">
                  How the work actually runs.
                </h2>
                <p className="body-2 text-n-3 max-w-[46ch] !leading-normal">
                  {service.processNote ||
                    "Four stages, each with something you can see and sign off on before the next one starts."}
                </p>
              </div>

              <Pipeline steps={service.process} />
            </div>
          )}

          {/* ---------- features explorer ---------- */}
          {service.features?.length > 0 && (
            <div className="py-16 lg:py-24 border-t border-n-6">
              <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
                <h2 className="h2 leading-[1.04] max-w-[16ch]">Why this approach holds up.</h2>
                <span className="font-code text-xs uppercase tracking-wider text-n-4">
                  Hover to read each one
                </span>
              </div>

              <FeatureExplorer features={service.features} />
            </div>
          )}

          {/* ---------- use cases ---------- */}
          {service.useCases?.length > 0 && (
            <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20 py-16 lg:py-24 border-t border-n-6">
              <h2 className="h2 leading-[1.04] max-w-[12ch]">Where it fits.</h2>

              <ul className="grid sm:grid-cols-2 gap-x-10">
                {service.useCases.map((useCase) => (
                  <li
                    key={useCase}
                    className="flex items-start gap-3 body-2 text-n-2 py-4 border-b border-n-6"
                  >
                    <span
                      className="mt-2.5 w-1.5 h-1.5 shrink-0 rounded-full"
                      style={{ background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT_SOFT})` }}
                    />
                    {useCase}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* ---------- outcome quote ---------- */}
          {service.outcomeQuote && (
            <figure className="py-16 lg:py-24 border-t border-n-6">
              <div
                className="relative rounded-2xl bg-n-7 px-8 py-12 lg:px-14 lg:py-16 overflow-hidden"
                style={{ borderLeft: `4px solid ${ACCENT}` }}
              >
                <div
                  className="absolute -top-24 -right-16 w-72 h-72 rounded-full blur-[100px] opacity-20 pointer-events-none"
                  style={{ background: ACCENT }}
                />
                <figcaption className="font-code text-xs uppercase tracking-wider text-n-4 mb-6">
                  What clients say afterwards
                </figcaption>
                <blockquote className="h3 max-w-[26ch] leading-[1.15] text-n-1">
                  &ldquo;{service.outcomeQuote}&rdquo;
                </blockquote>
              </div>
            </figure>
          )}

          {/* ---------- reference work ---------- */}
          {service.caseStudies?.length > 0 && (
            <div className="py-16 lg:py-24 border-t border-n-6">
              <h2 className="h2 leading-[1.04] mb-12 max-w-[16ch]">Work we&apos;ve shipped.</h2>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {service.caseStudies.map((study) => {
                  const inner = (
                    <div className="group h-full rounded-2xl border border-n-6 bg-n-7/60 backdrop-blur-sm overflow-hidden hover:border-[#3B82F6]/60 transition-colors">
                      {study.media && (
                        <div className="aspect-video overflow-hidden bg-n-8">
                          {study.mediaType === "video" ? (
                            <video src={study.media} autoPlay muted loop playsInline className="w-full h-full object-cover" />
                          ) : (
                            <img
                              src={study.media}
                              alt=""
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          )}
                        </div>
                      )}
                      <div className="p-6">
                        {study.tag && (
                          <span className="font-code text-xs uppercase tracking-wider text-n-4">
                            {study.tag}
                          </span>
                        )}
                        <h3 className="h5 mt-2 mb-2 group-hover:text-[#3B82F6] transition-colors">
                          {study.title}
                        </h3>
                        <p className="body-2 text-n-3">{study.description}</p>
                      </div>
                    </div>
                  );

                  return study.link ? (
                    <Link key={study.title} to={study.link} className="block h-full">
                      {inner}
                    </Link>
                  ) : (
                    <div key={study.title}>{inner}</div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ---------- related ---------- */}
          {related.length > 0 && (
            <div className="py-14 border-t border-n-6">
              <p className="font-code text-xs uppercase tracking-wider text-n-4 mb-5">
                Other services
              </p>
              <div className="flex flex-wrap gap-3">
                {related.map((s) => (
                  <Link
                    key={s.slug}
                    to={`/services/${s.slug}`}
                    className="inline-flex items-center gap-2.5 rounded-xl border border-n-6 px-5 py-3 font-code text-xs uppercase tracking-wider text-n-1 hover:border-[#3B82F6]/60 hover:text-[#3B82F6] transition-colors"
                  >
                    <svg viewBox="0 0 24 24" width="14" height="14" style={{ color: ACCENT }}>
                      {moduleIcons[s.iconName]}
                    </svg>
                    {s.title}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* ---------- prev / next ---------- */}
          {services.length > 1 && (
            <div className="py-14 border-t border-n-6 grid sm:grid-cols-2 gap-5">
              <Link
                to={`/services/${prevService.slug}`}
                className="group rounded-2xl border border-n-6 bg-n-7/60 backdrop-blur-sm p-7 hover:border-[#3B82F6]/60 transition-colors"
              >
                <span className="font-code text-xs uppercase tracking-wider text-n-4">
                  Previous service
                </span>
                <p className="h5 mt-2 group-hover:text-[#3B82F6] transition-colors">
                  {prevService.title}
                </p>
              </Link>

              <Link
                to={`/services/${nextService.slug}`}
                className="group rounded-2xl border border-n-6 bg-n-7/60 backdrop-blur-sm p-7 text-right hover:border-[#3B82F6]/60 transition-colors"
              >
                <span className="font-code text-xs uppercase tracking-wider text-n-4">
                  Next service
                </span>
                <p className="h5 mt-2 group-hover:text-[#3B82F6] transition-colors">
                  {nextService.title}
                </p>
              </Link>
            </div>
          )}
        </div>

        {/* ---------- closing CTA ---------- */}
        <div className="relative z-2 border-t border-n-6 bg-n-7/30">
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.12]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
            }}
          />
          <div className="relative w-full max-w-[1680px] mx-auto px-6 lg:px-10 xl:px-16 py-20 lg:py-28 grid lg:grid-cols-[1.2fr_auto] gap-10 items-end">
            <div>
              <p
                className="font-code text-xs uppercase tracking-wider mb-4"
                style={{ color: ACCENT }}
              >
                Start a conversation
              </p>
              <h2 className="h2 leading-[1.04] mb-5 max-w-[16ch]">
                Ready to start {service.title.toLowerCase()}?
              </h2>
              <p className="body-2 text-n-3 max-w-[50ch] !leading-normal">
                Send us the problem in your own words. We&apos;ll come back with a scope, a
                timeline, and what the first two weeks look like.
              </p>
            </div>

            <button
              onClick={goToContact}
              className="inline-flex items-center gap-2 rounded-xl px-8 py-4 font-code text-xs font-bold uppercase tracking-wider text-n-8 transition-transform hover:scale-[1.03]"
              style={{ background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT_DEEP})` }}
            >
              Contact us
              <span aria-hidden>↗</span>
            </button>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default ServiceDetail;