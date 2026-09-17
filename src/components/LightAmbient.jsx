import { useMemo } from "react";

/* ------------------------------------------------------------------
   Ambient backdrop for light pages: a slow-rotating color wash, drifting
   glow orbs, a sparse field of twinkling data points, a soft diagonal
   light sweep, and a faint edge-fading grid — all layered at very low
   opacity over a white surface. No dark vignette, no heavy particles.
   Use this instead of LiveGrid on light-theme routes.
------------------------------------------------------------------ */
const LightAmbient = ({ color = "#3B82F6", accent = "#22D3EE", className = "", nodeCount = 18 }) => {
  // Golden-angle scatter: deterministic (same every render/reload),
  // spreads points evenly with no two ever landing close together.
  const nodes = useMemo(
    () =>
      Array.from({ length: nodeCount }, (_, i) => {
        const angle = i * 137.508;
        const x = (angle * 1.7) % 100;
        const y = (angle * 0.9 + i * 13) % 94;
        return {
          id: i,
          x,
          y,
          size: 2 + (i % 4),
          hue: i % 3 === 0 ? accent : color,
          duration: 7 + (i % 6) * 1.6,
          delay: (i % 9) * 0.7,
        };
      }),
    [nodeCount, color, accent]
  );

  return (
    <div aria-hidden="true" className={`absolute inset-0 overflow-hidden pointer-events-none -z-10 ${className}`}>
      <style>{`
        @keyframes la-drift-a {
          0%, 100% { transform: translate(-6%, -4%) scale(1); }
          50% { transform: translate(4%, 6%) scale(1.15); }
        }
        @keyframes la-drift-b {
          0%, 100% { transform: translate(5%, 3%) scale(1.1); }
          50% { transform: translate(-4%, -6%) scale(0.95); }
        }
        @keyframes la-drift-c {
          0%, 100% { transform: translate(0%, 0%) scale(1); }
          50% { transform: translate(-3%, 5%) scale(1.08); }
        }
        @keyframes la-rotate {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes la-sweep {
          0% { transform: translate(-25%, -18%) rotate(8deg); opacity: 0.4; }
          50% { opacity: 1; }
          100% { transform: translate(25%, 18%) rotate(8deg); opacity: 0.4; }
        }
        @keyframes la-twinkle {
          0%, 100% { opacity: 0.15; transform: scale(0.85); }
          50% { opacity: 0.8; transform: scale(1.15); }
        }
        .la-orb-a { animation: la-drift-a 46s ease-in-out infinite; }
        .la-orb-b { animation: la-drift-b 58s ease-in-out infinite; }
        .la-orb-c { animation: la-drift-c 64s ease-in-out infinite; }
        .la-aurora { animation: la-rotate 100s linear infinite; }
        .la-sweep { animation: la-sweep 24s ease-in-out infinite; }
        .la-node { animation: la-twinkle ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .la-orb-a, .la-orb-b, .la-orb-c, .la-aurora, .la-sweep, .la-node {
            animation: none;
            opacity: 0.4;
          }
        }
      `}</style>

      {/* white/near-white base so this reads as the site's light surface */}
      <div className="absolute inset-0 bg-n-8" />

      {/* slow-rotating color wash — gives the page a subtle painterly
          shift over time instead of a static tint */}
      <div
        className="la-aurora absolute left-1/2 top-1/2 w-[75rem] h-[75rem] opacity-[0.05] blur-[110px]"
        style={{
          background: `conic-gradient(from 0deg, ${color}, ${accent}, transparent 55%, ${color})`,
        }}
      />

      {/* drifting glow orbs */}
      <div
        className="la-orb-a absolute -top-1/4 -left-[6%] w-[34rem] h-[34rem] rounded-full opacity-[0.07] blur-[120px]"
        style={{ background: color }}
      />
      <div
        className="la-orb-b absolute top-1/3 -right-[6%] w-[28rem] h-[28rem] rounded-full opacity-[0.06] blur-[110px]"
        style={{ background: accent }}
      />
      <div
        className="la-orb-c absolute bottom-[-8%] left-1/3 w-[24rem] h-[24rem] rounded-full opacity-[0.05] blur-[100px]"
        style={{ background: color }}
      />

      {/* sparse field of twinkling data points — a nod to the "live
          system" idea without the dark cosmic staging of LiveGrid */}
      <div className="absolute inset-0">
        {nodes.map((n) => (
          <span
            key={n.id}
            className="la-node absolute rounded-full"
            style={{
              left: `${n.x}%`,
              top: `${n.y}%`,
              width: `${n.size}px`,
              height: `${n.size}px`,
              background: n.hue,
              boxShadow: `0 0 ${n.size * 3}px ${n.hue}`,
              animationDuration: `${n.duration}s`,
              animationDelay: `${n.delay}s`,
            }}
          />
        ))}
      </div>

      {/* soft diagonal light sweep, drifting back and forth very slowly */}
      <div
        className="la-sweep absolute -inset-[45%]"
        style={{
          background: `linear-gradient(115deg, transparent 42%, ${accent}18 50%, transparent 58%)`,
        }}
      />

      {/* faint grid, fading out toward the edges */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`,
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 80% 55% at 50% 15%, black 35%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 55% at 50% 15%, black 35%, transparent 100%)",
        }}
      />
    </div>
  );
};

export default LightAmbient;