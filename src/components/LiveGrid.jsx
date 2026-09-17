import { useMemo } from "react";

const LiveGrid = ({
  color = "#3B82F6",
  accent = "#22D3EE",
  cell = 56,
  speed = 3,
  particles = 26,
  floor = true,
  flat = true,
  className = "",
}) => {
  /*
   * Generate stable particles.
   * useMemo prevents them from being regenerated on every render.
   */
  const dots = useMemo(
    () =>
      Array.from({ length: particles }, (_, i) => ({
        id: i,

        left: Math.random() * 100,
        top: Math.random() * 72,

        size: 1.2 + Math.random() * 3,

        delay: -Math.random() * 18,

        duration: 8 + Math.random() * 16,

        driftX: (Math.random() - 0.5) * 80,
        driftY: (Math.random() - 0.5) * 50,

        opacity: 0.2 + Math.random() * 0.65,

        hue: Math.random() > 0.48 ? accent : color,
      })),
    [particles, accent, color]
  );

  /*
   * Small orbiting planets / data nodes.
   */
  const orbitNodes = useMemo(
    () => [
      {
        id: 1,
        orbit: "orbit-1",
        size: 7,
        delay: "-1.5s",
        duration: `${speed * 7}s`,
        color: accent,
        position: "top",
      },
      {
        id: 2,
        orbit: "orbit-2",
        size: 5,
        delay: "-4s",
        duration: `${speed * 10}s`,
        color: color,
        position: "right",
      },
      {
        id: 3,
        orbit: "orbit-3",
        size: 8,
        delay: "-7s",
        duration: `${speed * 13}s`,
        color: "#67E8F9",
        position: "left",
      },
      {
        id: 4,
        orbit: "orbit-4",
        size: 4,
        delay: "-3s",
        duration: `${speed * 16}s`,
        color: accent,
        position: "bottom",
      },
    ],
    [speed, color, accent]
  );

  return (
    <div
      aria-hidden="true"
      className={`lg-root ${className}`}
      style={{
        "--lg-color": color,
        "--lg-accent": accent,
        "--lg-cell": `${cell}px`,
        "--lg-speed": `${speed}s`,
      }}
    >
      {/* =========================================================
          BACKGROUND ATMOSPHERE
      ========================================================== */}

      <div className="lg-space" />

      {/* Subtle flat grid */}
      {flat && <div className="lg-flat-grid" />}

      {/* =========================================================
          CENTRAL ORBITAL SYSTEM
      ========================================================== */}

      <div className="lg-orbital-system">

        {/* Large atmospheric glow */}
        <div className="lg-core-aura" />

        {/* Central core */}
        <div className="lg-core">
          <div className="lg-core-inner" />
          <div className="lg-core-highlight" />
        </div>

        {/* Vertical intelligence beam */}
        <div className="lg-beam" />

        {/* Horizontal energy beam */}
        <div className="lg-horizontal-beam" />

        {/* Orbital rings */}
        <div className="lg-orbit orbit-1">
          <div className="lg-orbit-glow" />
          <div className="lg-orbit-pulse" />
        </div>

        <div className="lg-orbit orbit-2">
          <div className="lg-orbit-glow" />
          <div className="lg-orbit-pulse" />
        </div>

        <div className="lg-orbit orbit-3">
          <div className="lg-orbit-glow" />
          <div className="lg-orbit-pulse" />
        </div>

        <div className="lg-orbit orbit-4">
          <div className="lg-orbit-glow" />
          <div className="lg-orbit-pulse" />
        </div>

        <div className="lg-orbit orbit-5">
          <div className="lg-orbit-glow" />
        </div>

        {/* Orbiting nodes */}
        {orbitNodes.map((node) => (
          <div
            key={node.id}
            className={`lg-node ${node.orbit}`}
            style={{
              "--node-size": `${node.size}px`,
              "--node-color": node.color,
              "--node-delay": node.delay,
              "--node-duration": node.duration,
            }}
          >
            <span className="lg-node-core" />
            <span className="lg-node-trail" />
          </div>
        ))}
      </div>

      {/* =========================================================
          PERSPECTIVE FLOOR
      ========================================================== */}

      {floor && (
        <div className="lg-floor-wrapper">
          <div className="lg-floor-grid" />

          <div className="lg-floor-rings">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
      )}

      {/* =========================================================
          PARTICLES / DATA POINTS
      ========================================================== */}

      <div className="lg-particles">
        {dots.map((dot) => (
          <span
            key={dot.id}
            className="lg-dot"
            style={{
              left: `${dot.left}%`,
              top: `${dot.top}%`,
              width: `${dot.size}px`,
              height: `${dot.size}px`,
              background: dot.hue,
              opacity: dot.opacity,
              boxShadow: `0 0 ${dot.size * 5}px ${dot.hue}`,
              animationDelay: `${dot.delay}s`,
              animationDuration: `${dot.duration}s`,
              "--drift-x": `${dot.driftX}px`,
              "--drift-y": `${dot.driftY}px`,
            }}
          />
        ))}
      </div>

      {/* =========================================================
          SCANNING / LIGHT EFFECTS
      ========================================================== */}

      <div className="lg-scan-line" />

      <div className="lg-light-sweep" />

      <div className="lg-vignette" />

      {/* =========================================================
          COMPONENT STYLES
      ========================================================== */}

      <style>{`
        /* =========================================================
           ROOT
        ========================================================== */

        .lg-root {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          z-index: 0;

          background:
            radial-gradient(
              ellipse 80% 65% at 50% 45%,
              color-mix(in oklab, var(--lg-color) 8%, transparent),
              transparent 65%
            ),
            radial-gradient(
              ellipse 55% 45% at 50% 55%,
              color-mix(in oklab, var(--lg-accent) 6%, transparent),
              transparent 70%
            );
        }

        /* =========================================================
           SPACE
        ========================================================== */

        .lg-space {
          position: absolute;
          inset: 0;

          background:
            radial-gradient(
              circle at 50% 50%,
              color-mix(in oklab, var(--lg-color) 5%, transparent),
              transparent 45%
            );

          opacity: 0.9;
        }

        /* =========================================================
           FLAT BACKGROUND GRID
        ========================================================== */

        .lg-flat-grid {
          position: absolute;
          inset: -15%;

          background-image:
            linear-gradient(
              to right,
              color-mix(
                in oklab,
                var(--lg-color) 13%,
                transparent
              ) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              color-mix(
                in oklab,
                var(--lg-color) 13%,
                transparent
              ) 1px,
              transparent 1px
            );

          background-size:
            var(--lg-cell) var(--lg-cell);

          transform:
            perspective(900px)
            rotateX(58deg)
            scale(1.35);

          transform-origin: 50% 65%;

          opacity: 0.2;

          mask-image:
            radial-gradient(
              ellipse 75% 60% at 50% 45%,
              black 0%,
              transparent 78%
            );

          -webkit-mask-image:
            radial-gradient(
              ellipse 75% 60% at 50% 45%,
              black 0%,
              transparent 78%
            );

          animation:
            lg-background-drift
            calc(var(--lg-speed) * 10)
            linear
            infinite;
        }

        /* =========================================================
           ORBITAL SYSTEM
        ========================================================== */

        .lg-orbital-system {
          position: absolute;

          width: min(950px, 115vw);
          height: min(650px, 80vh);

          left: 50%;
          top: 47%;

          transform: translate(-50%, -50%);

          perspective: 1200px;

          isolation: isolate;
        }

        /* =========================================================
           CORE AURA
        ========================================================== */

        .lg-core-aura {
          position: absolute;

          width: 260px;
          height: 260px;

          left: 50%;
          top: 50%;

          transform: translate(-50%, -50%);

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              color-mix(
                in oklab,
                var(--lg-accent) 24%,
                transparent
              ) 0%,
              color-mix(
                in oklab,
                var(--lg-color) 12%,
                transparent
              ) 30%,
              transparent 72%
            );

          filter: blur(18px);

          animation:
            lg-core-pulse
            calc(var(--lg-speed) * 2)
            ease-in-out
            infinite alternate;
        }

        /* =========================================================
           CORE
        ========================================================== */

        .lg-core {
          position: absolute;

          width: 70px;
          height: 70px;

          left: 50%;
          top: 50%;

          transform: translate(-50%, -50%);

          border-radius: 50%;

          background:
            radial-gradient(
              circle at 35% 30%,
              white 0%,
              color-mix(
                in oklab,
                var(--lg-accent) 80%,
                white
              ) 8%,
              var(--lg-accent) 25%,
              var(--lg-color) 52%,
              transparent 72%
            );

          box-shadow:
            0 0 15px
              color-mix(
                in oklab,
                var(--lg-accent) 80%,
                transparent
              ),
            0 0 45px
              color-mix(
                in oklab,
                var(--lg-accent) 55%,
                transparent
              ),
            0 0 100px
              color-mix(
                in oklab,
                var(--lg-color) 35%,
                transparent
              );

          z-index: 10;

          animation:
            lg-core-float
            calc(var(--lg-speed) * 2.5)
            ease-in-out
            infinite alternate;
        }

        .lg-core::before {
          content: "";

          position: absolute;
          inset: -16px;

          border-radius: 50%;

          border:
            1px solid
            color-mix(
              in oklab,
              var(--lg-accent) 45%,
              transparent
            );

          box-shadow:
            0 0 25px
              color-mix(
                in oklab,
                var(--lg-accent) 20%,
                transparent
              );

          animation:
            lg-ring-pulse
            calc(var(--lg-speed) * 1.7)
            ease-in-out
            infinite;
        }

        .lg-core::after {
          content: "";

          position: absolute;
          inset: -35px;

          border-radius: 50%;

          border:
            1px solid
            color-mix(
              in oklab,
              var(--lg-color) 20%,
              transparent
            );

          opacity: 0.5;
        }

        .lg-core-inner {
          position: absolute;

          inset: 18px;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              white,
              var(--lg-accent) 35%,
              transparent 75%
            );

          filter: blur(1px);
        }

        .lg-core-highlight {
          position: absolute;

          width: 16px;
          height: 16px;

          left: 19px;
          top: 15px;

          border-radius: 50%;

          background: white;

          filter: blur(2px);

          opacity: 0.9;
        }

        /* =========================================================
           ORBIT RINGS
        ========================================================== */

        .lg-orbit {
          position: absolute;

          left: 50%;
          top: 50%;

          border-radius: 50%;

          border:
            1px solid
            color-mix(
              in oklab,
              var(--lg-color) 35%,
              transparent
            );

          transform-style: preserve-3d;

          box-shadow:
            0 0 12px
              color-mix(
                in oklab,
                var(--lg-color) 10%,
                transparent
              );

          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        .orbit-1 {
          width: 220px;
          height: 100px;

          margin-left: -110px;
          margin-top: -50px;

          transform:
            rotateX(68deg)
            rotateZ(-16deg);

          animation:
            lg-orbit-one
            calc(var(--lg-speed) * 5)
            linear
            infinite;
        }

        .orbit-2 {
          width: 340px;
          height: 150px;

          margin-left: -170px;
          margin-top: -75px;

          transform:
            rotateX(66deg)
            rotateZ(18deg);

          border-color:
            color-mix(
              in oklab,
              var(--lg-accent) 34%,
              transparent
            );

          animation:
            lg-orbit-two
            calc(var(--lg-speed) * 7)
            linear
            infinite;
        }

        .orbit-3 {
          width: 480px;
          height: 210px;

          margin-left: -240px;
          margin-top: -105px;

          transform:
            rotateX(69deg)
            rotateZ(-24deg);

          animation:
            lg-orbit-three
            calc(var(--lg-speed) * 9)
            linear
            infinite;
        }

        .orbit-4 {
          width: 650px;
          height: 285px;

          margin-left: -325px;
          margin-top: -142px;

          transform:
            rotateX(67deg)
            rotateZ(13deg);

          border-color:
            color-mix(
              in oklab,
              var(--lg-accent) 22%,
              transparent
            );

          animation:
            lg-orbit-four
            calc(var(--lg-speed) * 12)
            linear
            infinite;
        }

        .orbit-5 {
          width: 830px;
          height: 360px;

          margin-left: -415px;
          margin-top: -180px;

          transform:
            rotateX(69deg)
            rotateZ(-7deg);

          border-color:
            color-mix(
              in oklab,
              var(--lg-color) 17%,
              transparent
            );

          animation:
            lg-orbit-five
            calc(var(--lg-speed) * 15)
            linear
            infinite;
        }

        /* =========================================================
           ORBIT GLOW
        ========================================================== */

        .lg-orbit-glow {
          position: absolute;

          inset: -1px;

          border-radius: inherit;

          border:
            2px solid
            color-mix(
              in oklab,
              var(--lg-accent) 20%,
              transparent
            );

          filter: blur(5px);

          opacity: 0.45;
        }

        .lg-orbit-pulse {
          position: absolute;

          width: 80px;
          height: 2px;

          right: 8%;

          top: 50%;

          transform:
            translateY(-50%)
            rotate(-12deg);

          background:
            linear-gradient(
              90deg,
              transparent,
              var(--lg-accent),
              white
            );

          box-shadow:
            0 0 10px var(--lg-accent),
            0 0 25px var(--lg-accent);

          filter: blur(0.3px);

          animation:
            lg-pulse-run
            calc(var(--lg-speed) * 1.8)
            linear
            infinite;
        }

        /* =========================================================
           ORBIT NODES
        ========================================================== */

        .lg-node {
          position: absolute;

          left: 50%;
          top: 50%;

          width: var(--node-size);
          height: var(--node-size);

          margin-left:
            calc(var(--node-size) / -2);

          margin-top:
            calc(var(--node-size) / -2);

          border-radius: 50%;

          z-index: 8;

          animation-duration: var(--node-duration);
          animation-delay: var(--node-delay);
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        .lg-node-core {
          position: absolute;

          inset: 0;

          border-radius: 50%;

          background: var(--node-color);

          box-shadow:
            0 0 8px var(--node-color),
            0 0 18px var(--node-color),
            0 0 32px
              color-mix(
                in oklab,
                var(--node-color) 60%,
                transparent
              );
        }

        .lg-node-trail {
          position: absolute;

          width: 35px;
          height: 1px;

          top: 50%;
          right: 50%;

          transform-origin: right center;

          background:
            linear-gradient(
              90deg,
              transparent,
              var(--node-color)
            );

          opacity: 0.5;
        }

        .lg-node.orbit-1 {
          animation-name: lg-node-orbit-1;
        }

        .lg-node.orbit-2 {
          animation-name: lg-node-orbit-2;
        }

        .lg-node.orbit-3 {
          animation-name: lg-node-orbit-3;
        }

        .lg-node.orbit-4 {
          animation-name: lg-node-orbit-4;
        }

        /* =========================================================
           VERTICAL BEAM
        ========================================================== */

        .lg-beam {
          position: absolute;

          width: 1px;
          height: 90%;

          left: 50%;
          top: 5%;

          background:
            linear-gradient(
              to bottom,
              transparent,
              color-mix(
                in oklab,
                var(--lg-accent) 30%,
                transparent
              ),
              color-mix(
                in oklab,
                var(--lg-accent) 65%,
                transparent
              ),
              transparent
            );

          box-shadow:
            0 0 12px
              color-mix(
                in oklab,
                var(--lg-accent) 30%,
                transparent
              );

          opacity: 0.35;

          animation:
            lg-beam-pulse
            calc(var(--lg-speed) * 2)
            ease-in-out
            infinite alternate;
        }

        /* =========================================================
           HORIZONTAL BEAM
        ========================================================== */

        .lg-horizontal-beam {
          position: absolute;

          width: 100%;
          height: 1px;

          left: 0;
          top: 50%;

          background:
            linear-gradient(
              90deg,
              transparent,
              color-mix(
                in oklab,
                var(--lg-color) 25%,
                transparent
              ),
              color-mix(
                in oklab,
                var(--lg-accent) 45%,
                transparent
              ),
              color-mix(
                in oklab,
                var(--lg-color) 25%,
                transparent
              ),
              transparent
            );

          opacity: 0.35;
        }

        /* =========================================================
           FLOOR
        ========================================================== */

        .lg-floor-wrapper {
          position: absolute;

          left: -30%;
          right: -30%;

          bottom: -23%;

          height: 52%;

          perspective: 500px;

          mask-image:
            linear-gradient(
              to bottom,
              transparent 0%,
              black 25%,
              black 70%,
              transparent 100%
            );

          -webkit-mask-image:
            linear-gradient(
              to bottom,
              transparent 0%,
              black 25%,
              black 70%,
              transparent 100%
            );
        }

        .lg-floor-grid {
          position: absolute;
          inset: 0;

          transform:
            rotateX(72deg);

          transform-origin: 50% 0%;

          background-image:
            linear-gradient(
              to right,
              color-mix(
                in oklab,
                var(--lg-color) 38%,
                transparent
              ) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              color-mix(
                in oklab,
                var(--lg-accent) 30%,
                transparent
              ) 1px,
              transparent 1px
            );

          background-size:
            var(--lg-cell) var(--lg-cell);

          opacity: 0.42;

          animation:
            lg-floor-travel
            var(--lg-speed)
            linear
            infinite;
        }

        .lg-floor-rings {
          position: absolute;

          left: 50%;
          top: 30%;

          width: 80%;
          height: 70%;

          transform:
            translateX(-50%)
            rotateX(70deg);

          transform-origin: top center;
        }

        .lg-floor-rings span {
          position: absolute;

          left: 50%;
          top: 0;

          transform: translateX(-50%);

          border:
            1px solid
            color-mix(
              in oklab,
              var(--lg-accent) 30%,
              transparent
            );

          border-radius: 50%;

          animation:
            lg-floor-ring
            calc(var(--lg-speed) * 3)
            ease-in-out
            infinite alternate;
        }

        .lg-floor-rings span:nth-child(1) {
          width: 15%;
          height: 12%;
        }

        .lg-floor-rings span:nth-child(2) {
          width: 32%;
          height: 25%;
        }

        .lg-floor-rings span:nth-child(3) {
          width: 52%;
          height: 40%;
        }

        .lg-floor-rings span:nth-child(4) {
          width: 72%;
          height: 58%;
        }

        .lg-floor-rings span:nth-child(5) {
          width: 92%;
          height: 76%;
        }

        /* =========================================================
           PARTICLES
        ========================================================== */

        .lg-particles {
          position: absolute;

          inset: 0;

          overflow: hidden;
        }

        .lg-dot {
          position: absolute;

          border-radius: 999px;

          will-change: transform;

          animation:
            lg-particle-float
            ease-in-out
            infinite;
        }

        /* =========================================================
           SCAN LINE
        ========================================================== */

        .lg-scan-line {
          position: absolute;

          left: 0;
          right: 0;

          top: -10%;

          height: 1px;

          background:
            linear-gradient(
              90deg,
              transparent,
              color-mix(
                in oklab,
                var(--lg-accent) 50%,
                transparent
              ),
              transparent
            );

          box-shadow:
            0 0 18px
              color-mix(
                in oklab,
                var(--lg-accent) 50%,
                transparent
              );

          opacity: 0.35;

          animation:
            lg-scan
            calc(var(--lg-speed) * 7)
            ease-in-out
            infinite;
        }

        /* =========================================================
           LIGHT SWEEP
        ========================================================== */

        .lg-light-sweep {
          position: absolute;

          width: 60%;
          height: 60%;

          left: 20%;
          top: 15%;

          background:
            radial-gradient(
              ellipse,
              color-mix(
                in oklab,
                var(--lg-accent) 10%,
                transparent
              ),
              transparent 70%
            );

          filter: blur(20px);

          opacity: 0.4;

          animation:
            lg-sweep
            calc(var(--lg-speed) * 6)
            ease-in-out
            infinite alternate;
        }

        /* =========================================================
           VIGNETTE
        ========================================================== */

        .lg-vignette {
          position: absolute;

          inset: 0;

          background:
            radial-gradient(
              ellipse at center,
              transparent 30%,
              rgba(0, 0, 0, 0.16) 75%,
              rgba(0, 0, 0, 0.35) 100%
            );

          pointer-events: none;
        }

        /* =========================================================
           ANIMATIONS
        ========================================================== */

        @keyframes lg-background-drift {
          from {
            background-position: 0 0;
          }

          to {
            background-position:
              var(--lg-cell)
              var(--lg-cell);
          }
        }

        @keyframes lg-core-pulse {
          from {
            transform: translate(-50%, -50%) scale(0.9);
            opacity: 0.65;
          }

          to {
            transform: translate(-50%, -50%) scale(1.18);
            opacity: 1;
          }
        }

        @keyframes lg-core-float {
          from {
            transform:
              translate(-50%, -50%)
              scale(0.96);
          }

          to {
            transform:
              translate(-50%, -50%)
              scale(1.05);
          }
        }

        @keyframes lg-ring-pulse {
          0%,
          100% {
            transform: scale(0.9);
            opacity: 0.25;
          }

          50% {
            transform: scale(1.15);
            opacity: 0.7;
          }
        }

        @keyframes lg-orbit-one {
          from {
            transform:
              rotateX(68deg)
              rotateZ(-16deg)
              rotate(0deg);
          }

          to {
            transform:
              rotateX(68deg)
              rotateZ(-16deg)
              rotate(360deg);
          }
        }

        @keyframes lg-orbit-two {
          from {
            transform:
              rotateX(66deg)
              rotateZ(18deg)
              rotate(0deg);
          }

          to {
            transform:
              rotateX(66deg)
              rotateZ(18deg)
              rotate(-360deg);
          }
        }

        @keyframes lg-orbit-three {
          from {
            transform:
              rotateX(69deg)
              rotateZ(-24deg)
              rotate(0deg);
          }

          to {
            transform:
              rotateX(69deg)
              rotateZ(-24deg)
              rotate(360deg);
          }
        }

        @keyframes lg-orbit-four {
          from {
            transform:
              rotateX(67deg)
              rotateZ(13deg)
              rotate(0deg);
          }

          to {
            transform:
              rotateX(67deg)
              rotateZ(13deg)
              rotate(-360deg);
          }
        }

        @keyframes lg-orbit-five {
          from {
            transform:
              rotateX(69deg)
              rotateZ(-7deg)
              rotate(0deg);
          }

          to {
            transform:
              rotateX(69deg)
              rotateZ(-7deg)
              rotate(360deg);
          }
        }

        @keyframes lg-node-orbit-1 {
          from {
            transform:
              rotate(0deg)
              translateX(110px)
              rotate(0deg);
          }

          to {
            transform:
              rotate(360deg)
              translateX(110px)
              rotate(-360deg);
          }
        }

        @keyframes lg-node-orbit-2 {
          from {
            transform:
              rotate(35deg)
              translateX(170px)
              rotate(-35deg);
          }

          to {
            transform:
              rotate(395deg)
              translateX(170px)
              rotate(-395deg);
          }
        }

        @keyframes lg-node-orbit-3 {
          from {
            transform:
              rotate(140deg)
              translateX(240px)
              rotate(-140deg);
          }

          to {
            transform:
              rotate(500deg)
              translateX(240px)
              rotate(-500deg);
          }
        }

        @keyframes lg-node-orbit-4 {
          from {
            transform:
              rotate(210deg)
              translateX(325px)
              rotate(-210deg);
          }

          to {
            transform:
              rotate(-150deg)
              translateX(325px)
              rotate(150deg);
          }
        }

        @keyframes lg-pulse-run {
          0% {
            opacity: 0;
            transform:
              translateX(-30px)
              translateY(-50%)
              scaleX(0.4);
          }

          35% {
            opacity: 1;
          }

          100% {
            opacity: 0;
            transform:
              translateX(45px)
              translateY(-50%)
              scaleX(1.4);
          }
        }

        @keyframes lg-floor-travel {
          from {
            background-position:
              0 0,
              0 0;
          }

          to {
            background-position:
              0 var(--lg-cell),
              0 var(--lg-cell);
          }
        }

        @keyframes lg-floor-ring {
          from {
            opacity: 0.25;
            transform:
              translateX(-50%)
              scale(0.96);
          }

          to {
            opacity: 0.7;
            transform:
              translateX(-50%)
              scale(1.04);
          }
        }

        @keyframes lg-particle-float {
          0% {
            transform:
              translate3d(0, 0, 0)
              scale(0.8);
          }

          25% {
            transform:
              translate3d(
                calc(var(--drift-x) * 0.35),
                calc(var(--drift-y) * -0.4),
                0
              )
              scale(1);
          }

          50% {
            transform:
              translate3d(
                var(--drift-x),
                var(--drift-y),
                0
              )
              scale(1.15);
          }

          75% {
            transform:
              translate3d(
                calc(var(--drift-x) * -0.3),
                calc(var(--drift-y) * 0.4),
                0
              )
              scale(0.95);
          }

          100% {
            transform:
              translate3d(0, 0, 0)
              scale(0.8);
          }
        }

        @keyframes lg-beam-pulse {
          from {
            opacity: 0.15;
          }

          to {
            opacity: 0.5;
          }
        }

        @keyframes lg-scan {
          0% {
            top: -10%;
            opacity: 0;
          }

          15% {
            opacity: 0.5;
          }

          85% {
            opacity: 0.5;
          }

          100% {
            top: 110%;
            opacity: 0;
          }
        }

        @keyframes lg-sweep {
          from {
            transform:
              translate3d(-18%, -8%, 0)
              scale(0.9);

            opacity: 0.25;
          }

          to {
            transform:
              translate3d(18%, 8%, 0)
              scale(1.1);

            opacity: 0.65;
          }
        }

        /* =========================================================
           MOBILE
        ========================================================== */

        @media (max-width: 768px) {
          .lg-orbital-system {
            width: 900px;
            height: 580px;

            top: 45%;
          }

          .lg-orbit.orbit-5 {
            opacity: 0.45;
          }

          .lg-orbit.orbit-4 {
            opacity: 0.65;
          }

          .lg-flat-grid {
            opacity: 0.12;
          }

          .lg-floor-wrapper {
            bottom: -15%;
          }

          .lg-core {
            width: 58px;
            height: 58px;
          }

          .lg-core-aura {
            width: 210px;
            height: 210px;
          }
        }

        /* =========================================================
           REDUCED MOTION
        ========================================================== */

        @media (prefers-reduced-motion: reduce) {
          .lg-root *,
          .lg-root {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </div>
  );
};

export default LiveGrid;