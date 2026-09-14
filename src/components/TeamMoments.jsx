// components/TeamMoments.jsx
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

import outingImg from "../assets/team/outing-4.jpg";
import cricketImg from "../assets/team/cricket.jpg";
import dinnerImg from "../assets/team/dinner.jpg";

/* ============================================================
   GALLERY DATA
   `featured: true` gets a larger frame. Order doesn't matter —
   the scatter pattern is driven by index, so add more anytime.
============================================================ */

const galleryItems = [
  {
    id: "outing-01",
    src: outingImg,
    caption: "Annual offsite — V-Zone Games",
    category: "Outings",
    featured: true,
  },
  {
    id: "sports-01",
    src: cricketImg,
    caption: "Inter-team cricket finals",
    category: "Sports",
  },
  {
    id: "office-01",
    src: dinnerImg,
    caption: "Friday team dinner",
    category: "Office Life",
  },
];

const filters = ["All", "Outings", "Sports", "Office Life"];

/* deterministic scatter values, cycled by index */
const rotations = [-5, 4, -3, 6, -4, 3, -6, 2, -3, 5];
const liftsPx = [0, 26, -14, 18, -22, 10, -16, 24, -10, 16];
const tapeRotations = [8, -10, 6, -7, 9, -6, 8, -9, 7, -8];
const tapeColors = ["#1D4ED8", "#3B82F6", "#93C5FD"];

const TeamMoments = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [hoveredId, setHoveredId] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filtered =
    activeFilter === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    enablePageScroll();
  }, []);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    disablePageScroll();
  };

  const showNext = useCallback(
    (e) => {
      e?.stopPropagation();
      setLightboxIndex((i) => (i + 1) % filtered.length);
    },
    [filtered.length]
  );

  const showPrev = useCallback(
    (e) => {
      e?.stopPropagation();
      setLightboxIndex((i) => (i - 1 + filtered.length) % filtered.length);
    },
    [filtered.length]
  );

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKey = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, closeLightbox, showNext, showPrev]);

  const activeItem = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  return (
    <section id="team-moments" className="relative py-16 sm:py-24 bg-n-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* ================= HEADING ================= */}
        <div className="max-w-xl mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-n-1 leading-tight">
            Off the clock
          </h2>
          <p className="mt-3 text-n-3 text-base sm:text-lg">
            Outings, wins, and the everyday moments that make Maverick
            Ignite feel like a team, not just an office.
          </p>
        </div>

        {/* ================= FILTER CHIPS ================= */}
        <div className="flex flex-wrap gap-2 mb-12 sm:mb-16">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`font-code text-[11px] font-semibold uppercase tracking-[0.12em] px-4 py-2 rounded-full border transition-colors duration-200 ${
                activeFilter === f
                  ? "bg-[#1D4ED8] border-[#1D4ED8] text-white"
                  : "border-n-6 text-n-3 hover:text-n-1 hover:border-n-4"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* ================= SCRAPBOOK WALL ================= */}
        <div className="relative rounded-2xl border border-dashed border-n-6 bg-n-7/20 px-6 py-14 sm:px-10 sm:py-20">
          <motion.div
            layout
            className="flex flex-wrap justify-center items-start gap-x-6 gap-y-10 sm:gap-x-10 sm:gap-y-16"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((item, i) => {
                const isHovered = hoveredId === item.id;
                const rotation = rotations[i % rotations.length];
                const lift = liftsPx[i % liftsPx.length];
                const tapeRotation = tapeRotations[i % tapeRotations.length];
                const tapeColor = tapeColors[i % tapeColors.length];

                const restingTransform = `translateY(${lift}px) rotate(${rotation}deg)`;
                const hoveredTransform = `translateY(${lift - 10}px) rotate(0deg) scale(1.05)`;

                return (
                  <motion.button
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    transition={{ type: "spring", stiffness: 260, damping: 24 }}
                    onClick={() => openLightbox(i)}
                    onMouseEnter={() => setHoveredId(item.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onFocus={() => setHoveredId(item.id)}
                    onBlur={() => setHoveredId(null)}
                    style={{
                      transform: isHovered ? hoveredTransform : restingTransform,
                      zIndex: isHovered ? 20 : 1,
                    }}
                    className={`group relative transition-transform duration-300 ease-out ${
                      item.featured
                        ? "w-64 sm:w-80"
                        : "w-52 sm:w-60"
                    }`}
                  >
                    {/* washi tape */}
                    <span
                      style={{
                        transform: `translate(-50%, -50%) rotate(${tapeRotation}deg)`,
                        backgroundColor: tapeColor,
                      }}
                      className="absolute top-0 left-1/2 w-14 h-6 sm:w-16 sm:h-7 opacity-80 shadow-sm"
                    />

                    {/* polaroid frame */}
                    <div className="bg-white pt-3 px-3 pb-6 shadow-[0_12px_30px_rgba(0,0,0,0.18)] rounded-[2px] group-hover:shadow-[0_20px_45px_rgba(0,0,0,0.28)] transition-shadow duration-300">
                      <div
                        className={`relative overflow-hidden bg-n-6 ${
                          item.featured
                            ? "aspect-[4/5]"
                            : "aspect-square"
                        }`}
                      >
                        <img
                          src={item.src}
                          alt={item.caption}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />

                        <Maximize2
                          size={14}
                          className="absolute top-2 right-2 text-white drop-shadow opacity-0 group-hover:opacity-90 transition-opacity duration-300"
                        />
                      </div>

                      <p className="mt-3 text-center text-[13px] sm:text-sm italic text-neutral-700">
                        {item.caption}
                      </p>
                    </div>
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* ================= LIGHTBOX ================= */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center px-4"
          >
            <button
              onClick={closeLightbox}
              aria-label="Close"
              className="absolute top-5 right-5 text-white/80 hover:text-white transition-colors"
            >
              <X size={26} />
            </button>

            <button
              onClick={showPrev}
              aria-label="Previous photo"
              className="absolute left-3 sm:left-8 text-white/60 hover:text-white transition-colors"
            >
              <ChevronLeft size={32} />
            </button>

            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-3xl w-full flex flex-col items-center"
            >
              <img
                src={activeItem.src}
                alt={activeItem.caption}
                className="max-h-[75vh] w-auto rounded-sm object-contain"
              />
              <p className="mt-4 text-white/80 text-sm italic">
                {activeItem.caption}
              </p>
            </motion.div>

            <button
              onClick={showNext}
              aria-label="Next photo"
              className="absolute right-3 sm:right-8 text-white/60 hover:text-white transition-colors"
            >
              <ChevronRight size={32} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default TeamMoments;