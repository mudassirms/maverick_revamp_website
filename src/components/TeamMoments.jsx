// components/TeamMoments.jsx
import { useState, useRef, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

import outingImg from "../assets/team/outing-4.jpg";
import cricketImg from "../assets/team/cricket.jpg";
import dinnerImg from "../assets/team/dinner.jpg";

/* ============================================================
   REEL DATA
   `featured: true` prints as a wide frame instead of a standard
   one. Frames run in the order given — this is a strip of film,
   so order reads as sequence. Add more anytime.
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

// edge-code amber — the one accent this section spends its "boldness" on,
// standing in for the orange ink printed along real film stock
const FILM = "#F59E0B";
const frameCode = (i) => `MI·${String(i + 1).padStart(2, "0")}`;

/**
 * A horizontal, draggable "film reel" of team photos with sprocket-hole
 * edges and a contact-sheet lightbox. Reused on the home page (default
 * copy) and on the Careers page (pass title/description/id to relabel it
 * as "Life at Maverick" without duplicating the gallery logic).
 */
const TeamMoments = ({
  id = "team-moments",
  title = "Off the clock",
  description = "Outings, wins, and the everyday moments that make Maverick Ignite feel like a team, not just an office.",
}) => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [progress, setProgress] = useState(0);

  const trackRef = useRef(null);
  const dragState = useRef({ dragging: false, startX: 0, startScroll: 0, moved: false });

  const filtered =
    activeFilter === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter);

  useEffect(() => {
    if (trackRef.current) trackRef.current.scrollLeft = 0;
    setProgress(0);
  }, [activeFilter]);

  const updateProgress = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  }, []);

  const onPointerDown = (e) => {
    dragState.current = {
      dragging: true,
      startX: e.clientX,
      startScroll: trackRef.current.scrollLeft,
      moved: false,
    };
    trackRef.current.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!dragState.current.dragging) return;
    const dx = e.clientX - dragState.current.startX;
    if (Math.abs(dx) > 4) dragState.current.moved = true;
    trackRef.current.scrollLeft = dragState.current.startScroll - dx;
    updateProgress();
  };

  const onPointerUp = (e) => {
    dragState.current.dragging = false;
    trackRef.current?.releasePointerCapture?.(e.pointerId);
  };

  const openFrame = (index) => () => {
    if (dragState.current.moved) return; // that was a drag, not a click
    setLightboxIndex(index);
    disablePageScroll();
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    enablePageScroll();
  }, []);

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
    <section id={id} className="relative py-16 sm:py-24 bg-n-8">
      <style>{`
        #${id} .reel-track::-webkit-scrollbar { display: none; }
        #${id} .reel-track { scrollbar-width: none; -ms-overflow-style: none; }
        #${id} .sprockets {
          background-image: radial-gradient(circle, rgba(255,255,255,0.14) 1.6px, transparent 2px);
          background-size: 22px 100%;
          background-position: 11px center;
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* HEADING + FILTERS */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10 sm:mb-14">
          <div className="max-w-xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-n-1 leading-tight">
              {title}
            </h2>
            <p className="mt-3 text-n-3 text-base sm:text-lg">{description}</p>
          </div>

          <div className="flex flex-wrap gap-2">
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
        </div>

        {/* THE REEL */}
        <div className="relative rounded-2xl bg-black/40 border border-n-6 overflow-hidden">
          <div className="sprockets h-3.5 sm:h-4" />

          <div
            ref={trackRef}
            onScroll={updateProgress}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
            className="reel-track flex gap-px overflow-x-auto cursor-grab active:cursor-grabbing select-none"
          >
            <AnimatePresence initial={false}>
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  onClick={openFrame(i)}
                  className={`group relative flex-shrink-0 bg-n-8 ${
                    item.featured ? "w-[74vw] sm:w-[520px]" : "w-[62vw] sm:w-[340px]"
                  }`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={item.src}
                      alt={item.caption}
                      draggable={false}
                      className="w-full h-full object-cover grayscale-[35%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-70 group-hover:opacity-90 transition-opacity duration-300" />

                    <span
                      style={{ color: FILM }}
                      className="absolute top-3 left-3 font-code text-[10px] tracking-[0.1em]"
                    >
                      {frameCode(i)}
                    </span>

                    <ZoomIn
                      size={16}
                      className="absolute top-3 right-3 text-white/0 group-hover:text-white/80 transition-colors duration-300"
                    />

                    <p className="absolute bottom-3 left-3 right-3 text-white text-sm sm:text-[15px] font-medium">
                      {item.caption}
                    </p>
                  </div>

                  {/* gap between negatives */}
                  <div className="absolute top-0 right-0 h-full w-px bg-n-8" />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="sprockets h-3.5 sm:h-4" />
        </div>

        {/* footage counter */}
        <div className="mt-4 flex items-center gap-4">
          <div className="flex-1 h-[2px] bg-n-6 rounded-full overflow-hidden">
            <div
              style={{
                width: `${Math.max(progress * 100, filtered.length ? 8 : 0)}%`,
                backgroundColor: FILM,
              }}
              className="h-full rounded-full transition-[width] duration-150"
            />
          </div>
          <span className="font-code text-[11px] text-n-4 uppercase tracking-[0.1em] whitespace-nowrap">
            drag to explore · {filtered.length} frame{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* LIGHTBOX — contact sheet */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-[100] bg-black/92 backdrop-blur-md flex items-center justify-center px-4"
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
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-3xl w-full flex flex-col items-center"
            >
              <div className="w-full flex items-center justify-between mb-3 px-1">
                <span style={{ color: FILM }} className="font-code text-xs tracking-[0.1em]">
                  {frameCode(lightboxIndex)}
                </span>
                <span className="font-code text-xs text-white/50 tracking-[0.1em]">
                  {lightboxIndex + 1} / {filtered.length}
                </span>
              </div>

              <img
                src={activeItem.src}
                alt={activeItem.caption}
                className="max-h-[65vh] w-auto rounded-sm object-contain"
              />
              <p className="mt-4 text-white/80 text-sm">{activeItem.caption}</p>

              <div className="mt-6 flex gap-2 overflow-x-auto max-w-full px-1">
                {filtered.map((item, i) => (
                  <button
                    key={item.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxIndex(i);
                    }}
                    className={`flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-sm overflow-hidden border transition-colors ${
                      i === lightboxIndex ? "border-[#3B82F6]" : "border-white/10 hover:border-white/30"
                    }`}
                  >
                    <img
                      src={item.src}
                      alt=""
                      className={`w-full h-full object-cover transition-opacity ${
                        i === lightboxIndex ? "opacity-100" : "opacity-50"
                      }`}
                    />
                  </button>
                ))}
              </div>
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