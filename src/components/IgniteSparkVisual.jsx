import { useEffect, useRef } from "react";
import gsap from "gsap";

const CORE = { x: 50, y: 54 };

const PADS = [
  { x: 80, y: 20, label: "AI Engineering" },
  { x: 84, y: 62, label: "Data Systems" },
  { x: 20, y: 82, label: "Integration" },
];

const TRACES = [
  { d: "M50,54 L50,32 L80,32 L80,20", color: "#e11d2e" },
  { d: "M50,54 L70,54 L70,62 L84,62", color: "#c9a227" },
  { d: "M50,54 L50,82 L20,82", color: "#e11d2e" },
];

const VIAS = [
  { x: 50, y: 32 }, { x: 80, y: 32 },
  { x: 70, y: 54 }, { x: 70, y: 62 },
  { x: 50, y: 82 },
];

const IgniteSparkVisual = () => {
  const svgRef = useRef(null);
  const coreRef = useRef(null);
  const lineRefs = useRef([]);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.to(coreRef.current, {
        scale: 1.22,
        opacity: 0.8,
        duration: 1.7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        transformOrigin: "center",
      });

      lineRefs.current.forEach((line, i) => {
        if (!line) return;
        const length = line.getTotalLength();
        gsap.set(line, {
          strokeDasharray: `${length * 0.16} ${length}`,
          strokeDashoffset: length,
        });
        gsap.to(line, {
          strokeDashoffset: -length * 0.3,
          duration: 2.6 + i * 0.4,
          repeat: -1,
          ease: "power1.inOut",
          delay: i * 0.5,
        });
      });
    }, svgRef);

    return () => ctx.revert();
  }, []);
  return (
    <div className="relative mx-auto w-full max-w-md aspect-square">
      {/* Ember glow, contained to this panel only */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          left: `${CORE.x}%`,
          top: `${CORE.y}%`,
          width: "70%",
          height: "70%",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(225,29,46,0.30) 0%, rgba(201,162,39,0.14) 42%, transparent 72%)",
          filter: "blur(30px)",
        }}
      />

      <svg
        ref={svgRef}
        viewBox="0 0 100 100"
        className="relative w-full h-full"
      >
        {TRACES.map((trace, i) => (
          <path
            key={i}
            ref={(el) => (lineRefs.current[i] = el)}
            d={trace.d}
            fill="none"
            stroke={trace.color}
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.55"
          />
        ))}
        {TRACES.map((trace, i) => (
          <path
            key={`base-${i}`}
            d={trace.d}
            fill="none"
            stroke={trace.color}
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.12"
          />
        ))}

        {VIAS.map((v, i) => (
          <circle key={i} cx={v.x} cy={v.y} r="0.9" fill="#c9a227" opacity="0.5" />
        ))}
        {PADS.map((p, i) => (
          <circle key={`pad-${i}`} cx={p.x} cy={p.y} r="1.6" fill="#15131a" stroke="#c9a227" strokeWidth="0.4" />
        ))}

        <circle cx={CORE.x} cy={CORE.y} r="3.2" fill="#fff5e0" opacity="0.9" />
        <circle ref={coreRef} cx={CORE.x} cy={CORE.y} r="5.4" fill="#e11d2e" opacity="0.5" />
      </svg>

      {/* Labels, positioned to match each pad */}
      {PADS.map((p, i) => (
        <span
          key={i}
          className="absolute font-code text-[10px] uppercase tracking-[0.14em] text-n-4 whitespace-nowrap"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            transform:
              p.x > 50
                ? "translate(0.9rem, -50%)"
                : "translate(calc(-100% - 0.9rem), -50%)",
          }}
        >
          {p.label}
        </span>
      ))}
    </div>
  );
};

export default IgniteSparkVisual;