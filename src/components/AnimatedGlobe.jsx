"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

/**
 * A "cheap globe": a real equirectangular Earth photo, cropped into a
 * circle and pinned so India sits front-and-center — not a true
 * rotating 3D sphere (that needs WebGL/three.js). Framer Motion and
 * GSAP can't texture-map a photo onto geometry, but combined with a
 * real photo, a day/night shading pass, drifting cloud haze, and a
 * starfield behind it, it reads as a real floating object rather than
 * a flat circle.
 *
 * The India outline and the Bengaluru marker coordinates below were
 * derived from real lat/lon and checked pixel-for-pixel against the
 * exact texture crop used here, so they land on the actual landmass
 * rather than floating over open ocean.
 */

// Public equirectangular Earth texture (NASA-derived "Blue Marble"
// data, no clouds). Swap EARTH_TEXTURE for your own licensed/self-hosted
// asset for production if you'd rather not hotlink this one.
const EARTH_TEXTURE =
  "https://raw.githubusercontent.com/turban/webgl-earth/master/images/2_no_clouds_4k.jpg";
const TEXTURE_W = 4096;
const TEXTURE_H = 2048;

// Crop window into that texture — computed from lon/lat so it centers
// on India, then verified against the actual image.
const CROP_X = 2758;
const CROP_Y = 568;
const VIEW = 456; // crop is a 456x456 square

// India + Sri Lanka outline, hand-simplified but positioned from real
// lat/lon converted into this exact crop's pixel space.
const INDIA_OUTLINE = [
  [69.4, 194.3], [97.8, 177.2], [137.6, 86.2], [171.8, 63.5],
  [211.6, 109.0], [291.2, 143.1], [331.1, 148.8], [393.6, 137.4],
  [365.2, 182.9], [348.1, 200.0], [302.6, 211.4], [262.8, 234.1],
  [205.9, 279.6], [199.1, 338.8], [171.8, 363.8], [157.0, 342.2],
  [129.7, 285.3], [118.3, 239.8], [81.9, 211.4],
];

const SRI_LANKA = [
  [202.5, 344.5], [221.8, 353.6], [211.6, 387.7],
  [203.6, 388.9], [196.8, 370.7], [199.1, 354.7],
];

const BENGALURU = { x: 172.9, y: 308.4, label: "Bengaluru" };

// glow color used for both the outline stroke/fill and its drop-shadow —
// previously these were empty/invalid strings (`stroke=""`, `stroke="#"`,
// `drop-shadow(0 0 4px )`) so the glow silently never rendered.

// small fixed starfield behind the globe — positions are percentages of
// an oversized wrapper so stars sit just outside the sphere's edge.
const STARS = [
  { x: 6, y: 12, size: 2, delay: 0 },
  { x: 94, y: 8, size: 1.5, delay: 0.6 },
  { x: 12, y: 90, size: 1.5, delay: 1.1 },
  { x: 90, y: 94, size: 2, delay: 1.6 },
  { x: 50, y: 2, size: 1, delay: 2.1 },
  { x: 2, y: 55, size: 1, delay: 0.9 },
  { x: 98, y: 62, size: 1.5, delay: 1.4 },
  { x: 28, y: 96, size: 1, delay: 0.3 },
];

const toPath = (pts) =>
  pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p[0]} ${p[1]}`).join(" ") + " Z";

export default function GlobeIndia() {
  const outlineRef = useRef(null);
  const sriLankaRef = useRef(null);
  const sphereRef = useRef(null);
  const glowGroupRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Draw the outline in on mount
      [outlineRef, sriLankaRef].forEach((ref, i) => {
        const el = ref.current;
        if (!el) return;
        const len = el.getTotalLength();
        gsap.set(el, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(el, {
          strokeDashoffset: 0,
          duration: 1.8,
          delay: 0.4 + i * 0.3,
          ease: "power2.out",
        });
      });

      // Continuous soft glow breathing on the outline
      gsap.to(glowGroupRef.current, {
        opacity: 0.55,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2,
      });

      // Gentle ambient pan instead of a full rotation — keeps India
      // aligned with the hand-placed outline instead of spinning away
      // from it, while still feeling alive.
      gsap.to(sphereRef.current, {
        backgroundPositionX: `-=18px`,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="relative mx-auto"
      style={{ width: VIEW, height: VIEW }}
    >
      {/* Starfield, sitting just outside the sphere's own bounds */}
      <div className="absolute pointer-events-none" style={{ inset: "-22%" }}>
        {STARS.map((s, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-white"
            style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size }}
            animate={{ opacity: [0.15, 1, 0.15] }}
            transition={{ duration: 2.4 + i * 0.3, repeat: Infinity, ease: "easeInOut", delay: s.delay }}
          />
        ))}
      </div>

      {/* Slow-rotating dashed orbit ring for a bit of tech polish */}
      <motion.div
        className="absolute rounded-full border border-dashed pointer-events-none"
        style={{ inset: "-9%", borderColor: "rgba(120,190,255,0.22)" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />

      {/* Atmosphere glow, behind the sphere */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          inset: "-14%",
          background:
            "radial-gradient(circle, rgba(80,180,255,0.35) 0%, rgba(40,110,255,0.15) 45%, transparent 72%)",
          filter: "blur(10px)",
        }}
      />

      {/* The sphere: real photo, cropped to a circle, gently panning */}
      <div
        ref={sphereRef}
        className="absolute inset-0 rounded-full overflow-hidden"
        style={{
          backgroundImage: `url(${EARTH_TEXTURE})`,
          backgroundSize: `${TEXTURE_W}px ${TEXTURE_H}px`,
          backgroundPosition: `-${CROP_X}px -${CROP_Y}px`,
          boxShadow:
            "inset 12px -10px 40px rgba(0,0,0,0.65), inset -8px 8px 30px rgba(150,200,255,0.15), 0 0 0 1px rgba(120,190,255,0.25)",
        }}
      >
        {/* Drifting cloud haze — clipped to the circle by the parent's
            overflow-hidden, screened on top of the photo texture */}
        <motion.div
          className="absolute inset-0"
          animate={{ x: [0, -30, 0], y: [0, 8, 0] }}
          transition={{ duration: 46, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background:
              "radial-gradient(ellipse 220px 90px at 22% 28%, rgba(255,255,255,0.20), transparent 60%)," +
              "radial-gradient(ellipse 260px 110px at 72% 62%, rgba(255,255,255,0.15), transparent 65%)," +
              "radial-gradient(ellipse 180px 70px at 45% 88%, rgba(255,255,255,0.13), transparent 60%)",
            mixBlendMode: "screen",
            filter: "blur(2px)",
          }}
        />

        {/* Day/night shading — gives the sphere an actual sense of
            curvature instead of looking like a flat lit disc */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(115deg, transparent 32%, rgba(0,8,20,0.55) 78%, rgba(0,5,15,0.85) 100%)",
            mixBlendMode: "multiply",
          }}
        />

        {/* Specular highlight, top-left, to sell the "lit sphere" look */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(circle at 30% 22%, rgba(255,255,255,0.30), transparent 42%)",
            mixBlendMode: "screen",
          }}
        />
      </div>

      {/* Thin bright rim, matching the reference photo's edge highlight */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{ boxShadow: "0 0 24px 2px rgba(90,180,255,0.55)" }}
      />

      {/* Country outline + marker, in the same pixel space as the crop */}
      <svg
        viewBox={`0 0 ${VIEW} ${VIEW}`}
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        <g ref={glowGroupRef} opacity="0.85">
          <path
            ref={outlineRef}
            d={toPath(INDIA_OUTLINE)}
            fill="rgba(80,230,255,0.06)"
            stroke=''
            strokeWidth="2"
            strokeLinejoin="round"
            style={{ filter: `drop-shadow(0 0 4px )` }}
          />
          <path
            ref={sriLankaRef}
            d={toPath(SRI_LANKA)}
            fill="rgba(80,230,255,0.06)"
            stroke=''
            strokeWidth="1.5"
            strokeLinejoin="round"
            style={{ filter: `drop-shadow(0 0 3px )` }}
          />
        </g>
      </svg>

      {/* Marker — HTML so Framer Motion can bounce/pulse it easily */}
      <motion.div
        className="absolute"
        style={{ left: BENGALURU.x, top: BENGALURU.y }}
        initial={{ opacity: 0, y: -8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 1.6, duration: 0.6, ease: "backOut" }}
      >
        <div className="relative -translate-x-1/2 -translate-y-full">
          {/* Ping rings */}
          {[0, 1].map((i) => (
            <motion.span
              key={i}
              className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ width: 10, height: 10, background: "rgba(255,120,60,0.55)" }}
              animate={{ scale: [1, 3.2], opacity: [0.6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: i }}
            />
          ))}
          {/* Pin */}
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="w-3 h-3 rounded-full bg-[#ff7a3c] shadow-[0_0_10px_3px_rgba(255,122,60,0.6)]"
          />
          <span className="absolute left-1/2 top-full -translate-x-1/2 mt-1 whitespace-nowrap text-[11px] font-mono text-[#eafcff] drop-shadow-[0_0_4px_rgba(0,0,0,0.8)]">
            {BENGALURU.label}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}