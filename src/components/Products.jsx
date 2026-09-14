import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import Heading from "./Heading";
import Section from "./Section";
import Arrow from "../assets/svg/Arrow";
import { moduleIcons } from "../utils/moduleIcons";
import { products } from "../config/products";

const AUTOPLAY_MS = 6000;

// rim-light gradient border, shared visual language with About/Services
const Panel = ({ accent = "mixed", className = "", children }) => {
  const gradients = {
    red: "from-[#e11d2e]/40 via-n-6 to-n-6",
    gold: "from-[#c9a227]/40 via-n-6 to-n-6",
    mixed: "from-[#e11d2e]/30 via-n-6 to-[#c9a227]/30",
  };
  return (
    <div className={`rounded-3xl p-[1px] bg-gradient-to-br ${gradients[accent]} ${className}`}>
      <div className="relative h-full rounded-[calc(1.5rem-1px)] bg-n-8 overflow-hidden">
        {children}
      </div>
    </div>
  );
};

// ---- per-product live graphics, driven by GSAP (unchanged, just used larger now) ----

const DataSenseGraphic = () => {
  const barsRef = useRef([]);
  barsRef.current = [];
  const add = (el) => el && barsRef.current.push(el);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tl = gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: "sine.inOut" } });
    tl.to(barsRef.current, { scaleY: () => gsap.utils.random(0.5, 1), duration: 1.1, stagger: 0.12, transformOrigin: "bottom" });
    return () => tl.kill();
  }, []);

  return (
    <div className="flex items-end gap-3 h-32">
      {[0.9, 0.5, 1, 0.65, 0.8].map((h, i) => (
        <div key={i} className="w-5 h-full flex items-end">
          <div
            ref={add}
            style={{ height: `${h * 100}%` }}
            className="w-full rounded-t-sm bg-gradient-to-t from-[#e11d2e]/50 to-[#c9a227]/50"
          />
        </div>
      ))}
    </div>
  );
};

const SupportSenseGraphic = () => {
  const dotsRef = useRef([]);
  dotsRef.current = [];
  const add = (el) => el && dotsRef.current.push(el);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tl = gsap.timeline({ repeat: -1 });
    tl.to(dotsRef.current, { opacity: 1, y: -3, duration: 0.35, stagger: 0.15, ease: "power1.out" })
      .to(dotsRef.current, { opacity: 0.3, y: 0, duration: 0.35, stagger: 0.15, ease: "power1.in" }, "+=0.2");
    return () => tl.kill();
  }, []);

  return (
    <div className="flex flex-col gap-3 w-full max-w-xs">
      <div className="self-start max-w-[75%] rounded-xl rounded-bl-sm bg-n-6 px-4 py-3 body-2 text-n-3">
        How do I reset my password?
      </div>
      <div className="self-end flex items-center gap-1.5 rounded-xl rounded-br-sm bg-gradient-to-br from-[#e11d2e]/30 to-[#c9a227]/30 px-4 py-3">
        {[0, 1, 2].map((i) => (
          <span key={i} ref={add} className="w-2 h-2 rounded-full bg-n-1 opacity-30" />
        ))}
      </div>
    </div>
  );
};

const NotifyBotGraphic = () => {
  const orbitRef = useRef(null);
  const iconRefs = useRef([]);
  iconRefs.current = [];
  const addIcon = (el) => el && iconRefs.current.push(el);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const orbitTween = gsap.to(orbitRef.current, { rotation: 360, duration: 10, repeat: -1, ease: "linear" });
    const counterTween = gsap.to(iconRefs.current, { rotation: -360, duration: 10, repeat: -1, ease: "linear" });
    return () => {
      orbitTween.kill();
      counterTween.kill();
    };
  }, []);

  const channels = [
    { glyph: "chat", angle: 0 },
    { glyph: "sms", angle: 120 },
    { glyph: "mail", angle: 240 },
  ];

  return (
    <div className="relative w-40 h-40 mx-auto">
      <span className="absolute inset-1/4 rounded-full border border-[#e11d2e]/40 motion-safe:animate-ping opacity-30" />
      <span className="absolute inset-1/4 flex items-center justify-center rounded-full bg-n-7 border border-n-6 text-[#c9a227]">
        <svg viewBox="0 0 24 24" width="26" height="26">
          {moduleIcons.bot}
        </svg>
      </span>

      <div ref={orbitRef} className="absolute inset-0">
        {channels.map((c) => (
          <div
            key={c.glyph}
            className="absolute top-1/2 left-1/2 w-10 h-10"
            style={{
              transform: `rotate(${c.angle}deg) translate(4.4rem) rotate(-${c.angle}deg)`,
              marginTop: "-1.25rem",
              marginLeft: "-1.25rem",
            }}
          >
            <div
              ref={addIcon}
              className="flex items-center justify-center w-full h-full rounded-full bg-n-7 border border-n-6 text-[#e11d2e]"
            >
              <svg viewBox="0 0 24 24" width="18" height="18">
                {moduleIcons[c.glyph]}
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// a receipt "prints" out of a POS slot, line by line, then gets a PAID stamp and retracts — loops
const MaverickDineGraphic = () => {
  const clipRectRef = useRef(null);
  const stampRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.6 });
    tl.set(clipRectRef.current, { attr: { height: 0 } })
      .set(stampRef.current, { opacity: 0, scale: 0 })
      .to(clipRectRef.current, { attr: { height: 150 }, duration: 1.3, ease: "power2.out" })
      .to(stampRef.current, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(2.5)" }, "-=0.1")
      .to({}, { duration: 1.1 })
      .to(stampRef.current, { opacity: 0, scale: 0, duration: 0.25 })
      .to(clipRectRef.current, { attr: { height: 0 }, duration: 0.9, ease: "power1.in" }, "<");
    return () => tl.kill();
  }, []);

  return (
    <svg viewBox="0 0 160 210" width="148" height="194" className="overflow-visible">
      <defs>
        {/* height animates 0 -> 150 to reveal the receipt top-to-bottom, like it's printing */}
        <clipPath id="mdPrintClip">
          <rect ref={clipRectRef} x="16" y="38" width="128" height="150" rx="2" />
        </clipPath>
      </defs>

      {/* printer housing — sits above the clip, so it never needs to "hide" anything */}
      <rect x="10" y="10" width="140" height="30" rx="8" fill="#26262b" />
      <rect x="34" y="34" width="92" height="6" rx="3" fill="#0e0e10" />
      <circle cx="126" cy="22" r="3" fill="#c9a227" />

      <g clipPath="url(#mdPrintClip)">
        <rect x="18" y="36" width="124" height="168" rx="4" fill="#ffffff" stroke="#e7e5e1" />
        <text x="80" y="58" textAnchor="middle" fontFamily="monospace" fontSize="9" fontWeight="700" fill="#1a1a1a">
          MAVERICKDINE
        </text>
        <text x="80" y="70" textAnchor="middle" fontFamily="monospace" fontSize="7" fill="#8a8a8a">
          Table 4 · Order #128
        </text>
        <line x1="26" y1="80" x2="134" y2="80" stroke="#e2e2e2" strokeDasharray="3 3" />

        <text x="26" y="96" fontFamily="monospace" fontSize="8" fill="#3a3a3a">Butter Chicken</text>
        <text x="134" y="96" textAnchor="end" fontFamily="monospace" fontSize="8" fill="#3a3a3a">₹320</text>

        <text x="26" y="112" fontFamily="monospace" fontSize="8" fill="#3a3a3a">Garlic Naan</text>
        <text x="134" y="112" textAnchor="end" fontFamily="monospace" fontSize="8" fill="#3a3a3a">₹60</text>

        <text x="26" y="128" fontFamily="monospace" fontSize="8" fill="#3a3a3a">Masala Chai</text>
        <text x="134" y="128" textAnchor="end" fontFamily="monospace" fontSize="8" fill="#3a3a3a">₹40</text>

        <line x1="26" y1="140" x2="134" y2="140" stroke="#e2e2e2" strokeDasharray="3 3" />

        <text x="26" y="158" fontFamily="monospace" fontSize="9" fontWeight="700" fill="#e11d2e">TOTAL</text>
        <text x="134" y="158" textAnchor="end" fontFamily="monospace" fontSize="9" fontWeight="700" fill="#e11d2e">₹420</text>

        <text x="80" y="188" textAnchor="middle" fontFamily="monospace" fontSize="7" fill="#a3a3a3">
          Thank you, come again!
        </text>
      </g>

      {/* paid stamp, scales in once the total line has printed */}
      <g ref={stampRef}>
        <g transform="rotate(-14 128 150)">
          <circle cx="128" cy="150" r="20" fill="none" stroke="#c9a227" strokeWidth="2.5" />
          <text
            x="128"
            y="150"
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="monospace"
            fontSize="8"
            fontWeight="700"
            fill="#c9a227"
          >
            PAID
          </text>
        </g>
      </g>
    </svg>
  );
};

// a small roster: employee avatar pills light up top-to-bottom like an
// attendance/roster check, then a bottom progress bar fills — loops
const MaverickHRGraphic = () => {
  const avatarsRef = useRef([]);
  avatarsRef.current = [];
  const addAvatar = (el) => el && avatarsRef.current.push(el);
  const barFillRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.6 });
    tl.set(avatarsRef.current, { opacity: 0.25, scale: 0.85 })
      .set(barFillRef.current, { attr: { width: 0 } })
      .to(avatarsRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        stagger: 0.12,
        ease: "back.out(2)",
      })
      .to(barFillRef.current, { attr: { width: 168 }, duration: 1, ease: "power2.out" }, "-=0.2")
      .to({}, { duration: 0.8 })
      .to(avatarsRef.current, { opacity: 0.25, scale: 0.85, duration: 0.4, stagger: 0.06 })
      .to(barFillRef.current, { attr: { width: 0 }, duration: 0.5, ease: "power1.in" }, "<");
    return () => tl.kill();
  }, []);

  const rows = [
    ["Priya Nair", "Team Lead"],
    ["Arjun Rao", "Engineer"],
    ["Sana Iyer", "Designer"],
  ];

  return (
    <svg viewBox="0 0 200 190" width="176" height="167" className="overflow-visible">
      <rect x="4" y="4" width="192" height="182" rx="16" fill="none" stroke="#e7e5e1" strokeOpacity="0.15" />

      {rows.map(([name, role], i) => (
        <g key={name} ref={addAvatar} transform={`translate(16 ${20 + i * 42})`}>
          <circle cx="14" cy="14" r="14" fill="#c9a227" opacity="0.85" />
          <text x="14" y="18" textAnchor="middle" fontFamily="monospace" fontSize="10" fontWeight="700" fill="#0e0e10">
            {name.split(" ").map((w) => w[0]).join("")}
          </text>
          <text x="38" y="12" fontFamily="monospace" fontSize="9" fontWeight="700" fill="#e7e5e1">
            {name}
          </text>
          <text x="38" y="24" fontFamily="monospace" fontSize="7" fill="#8a8a8a">
            {role}
          </text>
          <circle cx="180" cy="14" r="4" fill="#2ecc71" />
        </g>
      ))}

      <text x="16" y="156" fontFamily="monospace" fontSize="7" fill="#8a8a8a">
        WEEKLY UTILIZATION
      </text>
      <rect x="16" y="164" width="168" height="6" rx="3" fill="#26262b" />
      <rect ref={barFillRef} x="16" y="164" height="6" rx="3" fill="#c9a227" />
    </svg>
  );
};

// products with an entry here get the full animated rail + stage treatment.
// anything else (e.g. products with only a screenshot, no custom graphic)
// automatically falls into the "Explore more" grid below instead — so the
// rail never renders a product with nothing to show.
const graphicsBySlug = {
  datasense: <DataSenseGraphic />,
  supportsense: <SupportSenseGraphic />,
  notifybot: <NotifyBotGraphic />,
  maverickdine: <MaverickDineGraphic />,
  maverickhr: <MaverickHRGraphic />,
};

const featuredProducts = products.filter((p) => graphicsBySlug[p.slug]);
const moreProducts = products.filter((p) => !graphicsBySlug[p.slug]);

const accentColor = (accent) => (accent === "gold" ? "#c9a227" : "#e11d2e");

// ---- tab rail item: icon + name + tagline, active state as a sliding
// tinted card (shared layoutId) instead of a flat gray fill, plus a
// contained progress bar instead of one pinned to the card's raw edge ----

const RailItem = ({ product, isActive, onSelect, autoplay, onCycle }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-30, 30], [3, -3]);
  const rotateY = useTransform(x, [-30, 30], [-3, 3]);
  const springX = useSpring(rotateY, { stiffness: 200, damping: 20 });
  const springY = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const color = accentColor(product.accent);

  return (
    <motion.button
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - r.left - r.width / 2);
        y.set(e.clientY - r.top - r.height / 2);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ rotateX: springY, rotateY: springX, transformStyle: "preserve-3d" }}
      onClick={() => onSelect(product.slug)}
      className="group relative flex-shrink-0 w-64 lg:w-auto text-left px-5 py-4 rounded-2xl"
    >
      {isActive && (
        <motion.div
          layoutId="rail-active-bg"
          className="absolute inset-0 rounded-2xl border"
          style={{ background: `${color}0d`, borderColor: `${color}33` }}
          transition={{ type: "spring", stiffness: 350, damping: 32 }}
        />
      )}

      {/* accent tick that lights up on active/hover instead of a flat fill */}
      <span
        className={`absolute left-0 top-3 bottom-3 w-[3px] rounded-full transition-opacity duration-300 ${
          isActive ? "opacity-100" : "opacity-0 group-hover:opacity-40"
        }`}
        style={{ background: color }}
      />

      <div className="relative flex items-center gap-3 mb-1.5">
        <span
          className="flex items-center justify-center w-9 h-9 rounded-xl border flex-shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-105"
          style={{ borderColor: `${color}55`, color, background: `${color}0f` }}
        >
          <svg viewBox="0 0 24 24" width="15" height="15">
            {moduleIcons[product.iconName]}
          </svg>
        </span>
        <span className="h6">{product.title}</span>
      </div>
      <p className="relative body-2 text-n-4 text-sm pl-12">{product.tagline}</p>

      <div className="relative mt-3 ml-12 mr-1 h-[3px] rounded-full bg-n-6/70 overflow-hidden">
        {isActive && (
          <motion.div
            key={product.slug}
            className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg, ${color}, ${color}99)` }}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
            onAnimationComplete={() => autoplay && onCycle()}
          />
        )}
      </div>
    </motion.button>
  );
};

// ---- "Explore more" card: a lighter-weight, static entry for products
// that don't have a custom animated graphic — just their real screenshot,
// icon, name, and tagline, linking straight to the detail page ----

const ExploreMoreCard = ({ product }) => {
  const color = accentColor(product.accent);

  return (
    <Link
      to={`/products/${product.slug}`}
      className="group relative flex flex-col rounded-2xl border border-n-6 bg-n-7/40 overflow-hidden transition-colors hover:border-n-5"
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-n-6 bg-n-8">
        {product.screenshot ? (
          <img
            src={product.screenshot}
            alt={`${product.title} screenshot`}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-code text-xs uppercase tracking-wider text-n-4">
              Preview coming soon
            </span>
          </div>
        )}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ background: `linear-gradient(to top, ${color}22, transparent 55%)` }}
        />
      </div>

      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-2.5 mb-2">
          {product.icon && (
            <span
              className="flex items-center justify-center w-8 h-8 rounded-lg border flex-shrink-0 overflow-hidden"
              style={{ borderColor: `${color}55`, background: `${color}0f` }}
            >
              <img src={product.icon} alt="" className="w-4 h-4 object-contain" />
            </span>
          )}
          <span className="h6">{product.title}</span>
        </div>

        <p className="body-2 text-n-4 text-sm mb-4">{product.tagline}</p>

        <span className="mt-auto inline-flex items-center font-code text-[11px] font-bold uppercase tracking-wider text-n-3 group-hover:text-n-1 transition-colors">
          View details
          <span className="ml-1 inline-flex transition-transform duration-300 group-hover:translate-x-1">
            <Arrow />
          </span>
        </span>
      </div>
    </Link>
  );
};

const Products = () => {
  const [activeSlug, setActiveSlug] = useState(featuredProducts[0]?.slug);
  const [autoplay, setAutoplay] = useState(true);
  const activeIndex = featuredProducts.findIndex((p) => p.slug === activeSlug);
  const active = featuredProducts[activeIndex] ?? featuredProducts[0];

  const handleSelect = (slug) => {
    setActiveSlug(slug);
    setAutoplay(false); // a manual pick means the visitor is steering, not us
  };

  const handleCycle = () => {
    setActiveSlug(featuredProducts[(activeIndex + 1) % featuredProducts.length].slug);
  };

  return (
    <Section id="products" className="relative overflow-hidden">
      {/* ambient mood glow — crossfades between red/gold so the whole
          section's atmosphere subtly tracks whichever product is active,
          instead of a static plain-white backdrop */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <motion.div
          className="absolute top-10 left-[8%] w-[36rem] h-[36rem] rounded-full blur-[150px] bg-[#e11d2e]/[0.07]"
          animate={{ opacity: active.accent === "gold" ? 0 : 1 }}
          transition={{ duration: 0.6 }}
        />
        <motion.div
          className="absolute top-10 left-[8%] w-[36rem] h-[36rem] rounded-full blur-[150px] bg-[#c9a227]/[0.07]"
          animate={{ opacity: active.accent === "gold" ? 1 : 0 }}
          transition={{ duration: 0.6 }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, #14161b 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />
      </div>

      <div className="container relative z-2">
        <Heading
          tag="What we build"
          className="md:max-w-md lg:max-w-2xl"
          title="Our Products"
          text="Smart, scalable, AI-driven products — built to automate support, unlock insights, and streamline communication."
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-[280px_1fr] gap-6 lg:gap-10"
        >
          {/* tab rail, grouped into a framed card on large screens instead
              of floating as a bare list */}
          <div className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible -mx-4 px-4 lg:mx-0 lg:px-2 lg:py-2 pb-3 lg:pb-2 lg:rounded-3xl lg:border lg:border-n-6 lg:bg-n-7/40">
            {featuredProducts.map((product) => (
              <RailItem
                key={product.slug}
                product={product}
                isActive={product.slug === activeSlug}
                onSelect={handleSelect}
                autoplay={autoplay}
                onCycle={handleCycle}
              />
            ))}
          </div>

          {/* stage */}
          <Panel
            accent={active.accent}
            className="min-h-[26rem] shadow-[0_30px_60px_-20px_rgba(20,22,27,0.15)]"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active.slug}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="relative flex flex-col md:flex-row items-center h-full p-8 lg:p-14 gap-10"
              >
                <div
                  className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-[100px] pointer-events-none"
                  style={{ background: `${accentColor(active.accent)}1a` }}
                />

                <div className="relative flex-1">
                  <p className="tagline text-n-4 mb-3">{active.tagline}</p>
                  <h3 className="h3 mb-4">{active.title}</h3>
                  <p className="body-1 text-n-3 mb-8 max-w-md">{active.shortDescription}</p>
                  <Link
                    to={`/products/${active.slug}`}
                    className="group/link inline-flex items-center font-code text-xs font-bold uppercase tracking-wider"
                  >
                    Learn more
                    <span className="ml-1 inline-flex transition-transform duration-300 group-hover/link:translate-x-1">
                      <Arrow />
                    </span>
                  </Link>
                </div>

                <div className="relative flex-1 flex items-center justify-center min-h-[10rem]">
                  {graphicsBySlug[active.slug]}
                </div>
              </motion.div>
            </AnimatePresence>
          </Panel>
        </motion.div>

        {/* Explore more — every product without a custom animated graphic
            (e.g. Schoolytics, Maverick Learn) shows here as a static card
            with its real screenshot, instead of crowding the featured rail */}
        {moreProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="mt-14 lg:mt-20"
          >
            <p className="tagline text-n-4 mb-6">Explore more</p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {moreProducts.map((product) => (
                <ExploreMoreCard key={product.slug} product={product} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </Section>
  );
};

export default Products;