import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

/**
 * A handful of hand-placed circuit traces radiating from a single spark.
 * Coordinates are in a 0–100 viewBox so the whole thing scales with the
 * hero. Each trace is one orthogonal polyline (PCB-style right-angle
 * routing) rather than a straight or curved line — that's what reads as
 * "circuit" instead of "generic connecting line".
 *
 * `pulse: true` traces get a traveling light animation; the rest stay
 * still so the motion reads as a couple of deliberate signals, not a
 * field of things twitching at once.
 */
const SPARK = { x: 10, y: 84 };

const TRACES = [
  { d: "M10,84 L10,62 L27,62 L27,34", pulse: true, color: "#e11d2e" },
  { d: "M10,84 L31,84 L31,54 L53,54", pulse: true, color: "#c9a227" },
  { d: "M10,84 L10,44 L58,44 L58,12", pulse: false, color: "#e11d2e" },
  { d: "M10,84 L46,84 L46,20", pulse: false, color: "#c9a227" },
  { d: "M10,84 L4,84 L4,68", pulse: false, color: "#e11d2e" },
  { d: "M10,84 L10,90 L22,90", pulse: false, color: "#c9a227" },
];

// Small pads marking where a trace bends or ends — reads as circuitry,
// not decoration, since real PCB traces terminate at vias/pads.
const VIAS = [
  { x: 27, y: 62 }, { x: 27, y: 34 },
  { x: 31, y: 54 }, { x: 53, y: 54 },
  { x: 58, y: 44 }, { x: 58, y: 12 },
  { x: 46, y: 20 },
];

const IgniteBackground = () => {
  const svgRef = useRef(null);
  const lineRefs = useRef([]);
  const coreRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // The spark's core breathes — the one bold, high-contrast element
      gsap.to(coreRef.current, {
        scale: 1.25,
        opacity: 0.75,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        transformOrigin: "center",
      });

      // Only the marked traces carry a traveling pulse
      lineRefs.current.forEach((line) => {
        if (!line) return;
        const length = line.getTotalLength();
        gsap.set(line, { strokeDasharray: `${length * 0.12} ${length}`, strokeDashoffset: length });
        gsap.to(line, {
          strokeDashoffset: -length * 0.3,
          duration: 3 + Math.random() * 1.5,
          repeat: -1,
          ease: "power1.inOut",
          delay: Math.random() * 1.5,
        });
      });
    }, svgRef);

    return () => ctx.revert();
  }, []);

  let pulseIndex = 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="absolute -top-[42.375rem] left-0 right-0 h-[70rem] overflow-hidden pointer-events-none md:-top-[38.5rem] xl:-top-[32rem]"
    >
      {/* Ember glow behind the spark — soft, wide falloff */}
      <div
        className="absolute rounded-full"
        style={{
          left: `${SPARK.x}%`,
          top: `${SPARK.y}%`,
          width: "26rem",
          height: "26rem",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(225,29,46,0.35) 0%, rgba(201,162,39,0.15) 40%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      <svg
        ref={svgRef}
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full opacity-80"
      >
        {TRACES.map((trace, i) => (
          <path
            key={i}
            ref={(el) => {
              if (trace.pulse) lineRefs.current[pulseIndex++] = el;
            }}
            d={trace.d}
            fill="none"
            stroke={trace.color}
            strokeWidth={trace.pulse ? 0.25 : 0.15}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={trace.pulse ? 0.55 : 0.25}
          />
        ))}

        {VIAS.map((v, i) => (
          <circle key={i} cx={v.x} cy={v.y} r={0.4} fill="#c9a227" opacity="0.4" />
        ))}

        {/* Spark core — bright center, the one high-contrast point on the canvas */}
        <circle cx={SPARK.x} cy={SPARK.y} r="1.4" fill="#fff5e0" opacity="0.9" />
        <circle ref={coreRef} cx={SPARK.x} cy={SPARK.y} r="2.4" fill="#e11d2e" opacity="0.5" />
      </svg>
    </motion.div>
  );
};

export default IgniteBackground;