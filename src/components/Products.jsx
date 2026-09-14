import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import Heading from "./Heading";
import Section from "./Section";
import Arrow from "../assets/svg/Arrow";
import { smallSphere, stars } from "../assets";

// rim-light gradient border, shared visual language with About/Services
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

// generic, non-branded communication glyphs — not literal WhatsApp/SMS logos
const glyphs = {
  bot: (
    <>
      <rect x="6" y="8" width="12" height="10" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="9.5" cy="13" r="1" fill="currentColor" />
      <circle cx="14.5" cy="13" r="1" fill="currentColor" />
      <path d="M12 8V5m-2 0h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  chat: (
    <path
      d="M4 5h16v10H9l-4 4v-4H4V5Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  sms: (
    <>
      <path
        d="M4 5h16v10H9l-4 4v-4H4V5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="9" cy="10" r="0.8" fill="currentColor" />
      <circle cx="12" cy="10" r="0.8" fill="currentColor" />
      <circle cx="15" cy="10" r="0.8" fill="currentColor" />
    </>
  ),
  mail: (
    <path
      d="M4 6h16v12H4V6Zm0 0 8 7 8-7"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
      strokeLinecap="round"
      fill="none"
    />
  ),
  pulse: (
    <path
      d="M3 12h4l2-6 4 12 2-6h6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
};

// ---- per-product live graphics, driven by GSAP ----

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
    <div className="flex items-end gap-2 h-16">
      {[0.9, 0.5, 1, 0.65, 0.8].map((h, i) => (
        <div key={i} className="w-3 h-full flex items-end">
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
    
    <div className="flex flex-col gap-2 w-full">
      
      <div className="self-start max-w-[75%] rounded-xl rounded-bl-sm bg-n-6 px-3 py-2 body-2 text-n-3 text-xs">
        How do I reset my password?
      </div>
      <div className="self-end flex items-center gap-1 rounded-xl rounded-br-sm bg-gradient-to-br from-[#e11d2e]/30 to-[#c9a227]/30 px-3 py-2">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            ref={add}
            className="w-1.5 h-1.5 rounded-full bg-n-1 opacity-30"
          />
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
    const orbitTween = gsap.to(orbitRef.current, {
      rotation: 360,
      duration: 10,
      repeat: -1,
      ease: "linear",
    });
    const counterTween = gsap.to(iconRefs.current, {
      rotation: -360,
      duration: 10,
      repeat: -1,
      ease: "linear",
    });
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
    <div className="relative w-24 h-24 mx-auto">
      <span className="absolute inset-1/4 rounded-full border border-[#e11d2e]/40 motion-safe:animate-ping opacity-30" />
      <span className="absolute inset-1/4 flex items-center justify-center rounded-full bg-n-7 border border-n-6 text-[#c9a227]">
        <svg viewBox="0 0 24 24" width="18" height="18">
          {glyphs.bot}
        </svg>
      </span>

      <div ref={orbitRef} className="absolute inset-0">
        {channels.map((c, i) => (
          <div
            key={c.glyph}
            className="absolute top-1/2 left-1/2 w-7 h-7"
            style={{
              transform: `rotate(${c.angle}deg) translate(2.6rem) rotate(-${c.angle}deg)`,
              marginTop: "-0.875rem",
              marginLeft: "-0.875rem",
            }}
          >
            <div
              ref={addIcon}
              className="flex items-center justify-center w-full h-full rounded-full bg-n-7 border border-n-6 text-[#e11d2e]"
            >
              <svg viewBox="0 0 24 24" width="14" height="14">
                {glyphs[c.glyph]}
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ---- card shell: framer-motion handles entrance + cursor-tilt ----

const ProductCard = ({ accent, icon, title, tagline, text, graphic, index }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-60, 60], [7, -7]);
  const rotateY = useTransform(x, [-60, 60], [-7, 7]);
  const springX = useSpring(rotateY, { stiffness: 150, damping: 15 });
  const springY = useSpring(rotateX, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX: springY, rotateY: springX, transformStyle: "preserve-3d", perspective: 800 }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      className="h-full"
    >
      <Panel accent={accent} className="h-full">
        <div className="flex flex-col h-full p-7 lg:p-8">
          <span
            className={`flex items-center justify-center w-11 h-11 mb-6 rounded-xl border ${
              accent === "red"
                ? "border-[#e11d2e]/40 text-[#e11d2e]"
                : "border-[#c9a227]/40 text-[#c9a227]"
            }`}
          >
            <svg viewBox="0 0 24 24" width="20" height="20">
              {glyphs[icon]}
            </svg>
          </span>

          <p className="tagline text-n-4 mb-2">{tagline}</p>
          <h4 className="h4 mb-3">{title}</h4>
          <p className="body-2 text-n-3 mb-8">{text}</p>

          <div className="mt-auto mb-8 flex items-center justify-center min-h-[4rem]">
            {graphic}
          </div>

          <div className="flex items-center pt-4 border-t border-n-6">
            <p className="font-code text-xs font-bold text-n-1 uppercase tracking-wider">
              Learn more
            </p>
            <Arrow />
          </div>
        </div>
      </Panel>
    </motion.div>
  );
};

const products = [
  {
    accent: "red",
    icon: "pulse",
    tagline: "AI-Powered Business Data Insights",
    title: "DataSense",
    text: "Turns your scattered business data into clear, actionable insight — surfacing the trends that matter without the manual digging.",
    graphic: <DataSenseGraphic />,
  },
  {
    accent: "gold",
    icon: "chat",
    tagline: "Smart Support Assistant",
    title: "SupportSense",
    text: "A support assistant trained on your own business knowledge, answering customers instantly instead of routing everything to a queue.",
    graphic: <SupportSenseGraphic />,
  },
  {
    accent: "red",
    icon: "bot",
    tagline: "Unified Notification Service",
    title: "NotifyBot",
    text: "One integration for WhatsApp, SMS, and email — send every notification through a single, reliable pipeline.",
    graphic: <NotifyBotGraphic />,
  },
];

const Products = () => {
  return (
    <Section id="products">
      <div className="container relative z-2">
        <Heading
          className="md:max-w-md lg:max-w-2xl"
          title="Our Products"
          text="Smart, scalable, AI-driven products — built to automate support, unlock insights, and streamline communication."
        />

        <div className="grid md:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <ProductCard key={product.title} index={index} {...product} />
          ))}
        </div>
      </div>
      
    </Section>
  );
};

export default Products;