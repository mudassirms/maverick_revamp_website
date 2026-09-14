import { useEffect, useState } from "react";
import { MouseParallax } from "react-just-parallax";

export const Gradient = () => {
  return (
    <>
      <div className="relative z-1 h-6 mx-2.5 bg-[#15131a] shadow-[0_25px_60px_-15px_rgba(225,29,46,0.35)] rounded-b-[1.25rem] lg:h-6 lg:mx-8" />
      <div className="relative z-1 h-6 mx-6 bg-[#15131a]/70 shadow-[0_25px_60px_-15px_rgba(201,162,39,0.25)] rounded-b-[1.25rem] lg:h-6 lg:mx-20" />
    </>
  );
};

export const BottomLine = () => {
  return (
    <div className="hidden absolute top-[55.25rem] left-10 right-10 h-px bg-gradient-to-r from-transparent via-[#e11d2e]/25 to-transparent pointer-events-none xl:block" />
  );
};

/**
 * A single comet: a tapered streak of light with a bright head,
 * fading to nothing at the tail. Drawn as one rotated div with a
 * directional gradient, so no extra markup per comet.
 */
const Comet = ({
  top,
  left,
  length,
  angle,
  thickness = 2,
  color,
  delay = "0ms",
  mounted,
}) => (
  <div
    className="absolute origin-left rounded-full transition-[width,opacity] ease-out"
    style={{
      top,
      left,
      height: thickness,
      width: mounted ? length : 0,
      opacity: mounted ? 1 : 0,
      transform: `rotate(${angle}deg)`,
      transitionDuration: "1100ms",
      transitionDelay: delay,
      background: `linear-gradient(90deg, transparent 0%, ${color}55 55%, ${color} 92%, #fff 100%)`,
    }}
  />
);

const Spark = ({ top, left, size, color, delay, mounted }) => (
  <div
    className="absolute rounded-full transition-all ease-out"
    style={{
      top,
      left,
      width: size,
      height: size,
      background: color,
      boxShadow: `0 0 ${size * 3}px ${size * 0.6}px ${color}`,
      opacity: mounted ? 0.9 : 0,
      transform: mounted ? "scale(1)" : "scale(0.2)",
      transitionDuration: "900ms",
      transitionDelay: delay,
    }}
  />
);

export const BackgroundCircles = ({ parallaxRef }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="absolute -top-[42.375rem] left-0 right-0 h-[70rem] overflow-hidden pointer-events-none md:-top-[38.5rem] xl:-top-[32rem]">
      {/* Film-grain texture — keeps the dark field from reading flat */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04] mix-blend-overlay">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>

      {/* The flare: a single off-axis light source, not a centered symmetric hub */}
      <div
        className="absolute -top-24 right-[8%] w-[34rem] h-[34rem] rounded-full transition-all duration-1000 ease-out"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(225,29,46,0.55) 0%, rgba(201,162,39,0.25) 35%, transparent 70%)",
          filter: "blur(40px)",
          opacity: mounted ? 1 : 0,
          transform: mounted ? "scale(1)" : "scale(0.85)",
        }}
      />
      <div
        className="absolute top-6 right-[14%] w-40 h-40 rounded-full transition-all duration-700 ease-out"
        style={{
          background: "radial-gradient(circle, #fff 0%, #c9a227 40%, transparent 75%)",
          filter: "blur(6px)",
          opacity: mounted ? 0.85 : 0,
          transitionDelay: "150ms",
        }}
      />

      {/* Comet trails, all racing the same diagonal — direction reads as motion, not decoration */}
      <MouseParallax strength={0.05} parallaxContainerRef={parallaxRef}>
        <Comet top="9rem" left="72%" length="28rem" angle={-28} thickness={2.5} color="#e11d2e" delay="80ms" mounted={mounted} />
        <Comet top="15rem" left="66%" length="20rem" angle={-24} thickness={1.5} color="#c9a227" delay="220ms" mounted={mounted} />
        <Comet top="4rem" left="60%" length="16rem" angle={-33} thickness={1} color="#9a9ba3" delay="360ms" mounted={mounted} />
      </MouseParallax>

      <MouseParallax strength={0.1} parallaxContainerRef={parallaxRef}>
        <Comet top="20rem" left="50%" length="12rem" angle={-30} thickness={1.5} color="#e11d2e" delay="480ms" mounted={mounted} />
        <Comet top="26rem" left="38%" length="9rem" angle={-26} thickness={1} color="#c9a227" delay="560ms" mounted={mounted} />

        <Spark top="7.5rem" left="70.5%" size={5} color="#fff" delay="640ms" mounted={mounted} />
        <Spark top="18rem" left="49%" size={4} color="#c9a227" delay="700ms" mounted={mounted} />
        <Spark top="24rem" left="34%" size={3} color="#e11d2e" delay="760ms" mounted={mounted} />
      </MouseParallax>
    </div>
  );
};