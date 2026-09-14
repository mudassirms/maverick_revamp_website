import { useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

const NODE_COUNT = 45;

// Deterministic-per-mount layout (random once, not on every render)
const generateNodes = () => {
  const nodes = [];
  for (let i = 0; i < NODE_COUNT; i++) {
    nodes.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      r: 1.6 + Math.random() * 2,
    });
  }
  return nodes;
};

// Connect each node to its 2 nearest neighbours, dedupe edges
const generateEdges = (nodes) => {
  const edges = [];
  nodes.forEach((n, i) => {
    const nearest = nodes
      .map((other, j) => ({
        j,
        d: i === j ? Infinity : Math.hypot(n.x - other.x, n.y - other.y),
      }))
      .sort((a, b) => a.d - b.d)
      .slice(0, 2);

    nearest.forEach(({ j }) => {
      const key = [i, j].sort((a, b) => a - b).join("-");
      if (!edges.find((e) => e.key === key)) {
        edges.push({ key, from: n, to: nodes[j] });
      }
    });
  });
  return edges;
};

const AINetworkBackground = () => {
  const svgRef = useRef(null);
  const nodeRefs = useRef([]);
  const lineRefs = useRef([]);

  const nodes = useMemo(() => generateNodes(), []);
  const edges = useMemo(() => generateEdges(nodes), [nodes]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Nodes gently pulse, staggered
      nodeRefs.current.forEach((node, i) => {
        if (!node) return;
        gsap.to(node, {
          scale: 1.8,
          opacity: 1,
          duration: 1.6 + Math.random(),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.12,
          transformOrigin: "center",
        });
      });

      // "Data" flows along each connecting line, staggered start
      lineRefs.current.forEach((line, i) => {
        if (!line) return;
        const length = line.getTotalLength();
        gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(line, {
          strokeDashoffset: 0,
          duration: 2.5 + Math.random() * 2.5,
          repeat: -1,
          ease: "power1.inOut",
          delay: i * 0.18,
        });
      });

      // Whole network drifts very slowly, adds life without distraction
      gsap.to(svgRef.current, {
        rotate: 1.5,
        duration: 22,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        transformOrigin: "center",
      });
    }, svgRef);

    return () => ctx.revert();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="absolute inset-0 pointer-events-none overflow-hidden"
    >
      <svg
        ref={svgRef}
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full opacity-70"
      >
        <defs>
          <linearGradient id="aiLineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e11d2e" />
            <stop offset="100%" stopColor="#c9a227" />
          </linearGradient>
        </defs>

        {edges.map((edge, i) => (
          <line
            key={edge.key}
            ref={(el) => (lineRefs.current[i] = el)}
            x1={edge.from.x}
            y1={edge.from.y}
            x2={edge.to.x}
            y2={edge.to.y}
            stroke="url(#aiLineGradient)"
            strokeWidth="0.15"
            strokeLinecap="round"
            opacity="0.5"
          />
        ))}

        {nodes.map((node, i) => (
          <circle
            key={node.id}
            ref={(el) => (nodeRefs.current[i] = el)}
            cx={node.x}
            cy={node.y}
            r={node.r * 0.35}
            fill={i % 3 === 0 ? "#c9a227" : "#e11d2e"}
            opacity="0.5"
          />
        ))}
      </svg>
    </motion.div>
  );
};

export default AINetworkBackground;