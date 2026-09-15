import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const StatCounter = ({ value, suffix = "", label, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1400;
    const start = performance.now() + delay * 1000;
    let raf;

    const tick = (now) => {
      const progress = Math.min(Math.max((now - start) / duration, 0), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView, value, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col"
    >
      <span className="text-3xl sm:text-4xl font-bold text-n-1">
        {display}
        <span className="bg-gradient-to-r from-[#1D4ED8] to-[#3B82F6] bg-clip-text text-transparent">
          {suffix}
        </span>
      </span>
      <span className="mt-1 font-code text-[11px] uppercase tracking-[0.14em] text-n-4">
        {label}
      </span>
    </motion.div>
  );
};

export default StatCounter;