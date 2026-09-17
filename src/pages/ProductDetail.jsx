import { useEffect, useRef, useState } from "react";
import { useParams, Link, Navigate, useNavigate } from "react-router-dom";
import {
  motion,
  useScroll,
  useSpring,
  useMotionValue,
  useTransform,
  useInView,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import {
  products,
  getProductBySlug,
  getRelatedProducts,
} from "../config/products";
import { moduleIcons } from "../utils/moduleIcons";
import Section from "../components/Section";
import LightAmbient from "../components/LightAmbient";

const ACCENT = "#3B82F6";
const ACCENT_DEEP = "#1D4ED8";
const ACCENT_SOFT = "#22D3EE";

/* ------------------------------------------------------------------
   Splits "DataSense" -> ["Data", "Sense"], "MaverickHR" -> ["Maverick", "HR"]
   Multi-word titles fall back to first word / rest.
------------------------------------------------------------------ */
const splitTitle = (title) => {
  if (title.includes(" ")) {
    const [head, ...rest] = title.split(" ");
    return [head, rest.join(" ")];
  }
  const parts = title.match(/[A-Z]+[a-z]*/g);
  if (!parts || parts.length < 2) return [title, ""];
  return [parts[0], parts.slice(1).join("")];
};

/* ------------------------------------------------------------------
   Counts a stat up when it scrolls into view. Keeps any prefix/suffix
   ("4×", "94%", "40h", "2 Locations") intact.
------------------------------------------------------------------ */
const CountUp = ({ value }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const match = String(value).match(/^(\D*)([\d.,]+)(.*)$/);
  const [shown, setShown] = useState(match ? 0 : value);

  useEffect(() => {
    if (!match) return;
    const target = parseFloat(match[2].replace(/,/g, ""));
    if (!inView) return;
    if (reduce) {
      setShown(target);
      return;
    }
    const decimals = (match[2].split(".")[1] || "").length;
    const start = performance.now();
    const duration = 1100;
    let frame;

    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setShown((target * eased).toFixed(decimals));
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduce, value]);

  if (!match) return <span ref={ref}>{value}</span>;

  return (
    <span ref={ref}>
      {match[1]}
      {Number(shown).toLocaleString()}
      {match[3]}
    </span>
  );
};

/* ------------------------------------------------------------------
   Hero media. Tilts toward the cursor — the one piece of the page that
   reacts to you, so it carries the "this is a live product" idea.
------------------------------------------------------------------ */
const ProductFrame = ({ screenshot, video, title, liveUrl }) => {
  const reduce = useReducedMotion();
  const wrap = useRef(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [7, -7]), {
    stiffness: 140,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-9, 9]), {
    stiffness: 140,
    damping: 18,
  });

  const onMove = (e) => {
    if (reduce) return;
    const r = wrap.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };

  const reset = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <div
      ref={wrap}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className="relative"
      style={{ perspective: 1200 }}
    >
      <div
        className="absolute -inset-10 rounded-[3rem] blur-[90px] opacity-40 pointer-events-none"
        style={{
          background: `radial-gradient(60% 60% at 50% 40%, ${ACCENT}, transparent 70%)`,
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative rounded-2xl border border-n-6 bg-n-7 overflow-hidden shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]"
      >
        <div className="flex items-center gap-2 px-4 py-3 border-b border-n-6 bg-n-8">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: ACCENT }}
          />
          <span className="w-2.5 h-2.5 rounded-full bg-n-6" />
          <span className="w-2.5 h-2.5 rounded-full bg-n-6" />
          <span className="ml-4 flex-1 truncate font-code text-[11px] text-n-4">
            {liveUrl ? liveUrl.replace(/^https?:\/\//, "") : `${title.toLowerCase().replace(/\s+/g, "")}.app`}
          </span>
          <span className="flex items-center gap-1.5 font-code text-[10px] uppercase tracking-wider text-n-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            live
          </span>
        </div>

        {video ? (
          <video src={video} autoPlay muted loop playsInline className="w-full h-auto block" />
        ) : screenshot ? (
          <img src={screenshot} alt={`${title} interface`} className="w-full h-auto block" />
        ) : (
          <div className="aspect-[16/10] flex flex-col items-center justify-center gap-3 bg-n-8">
            <div
              className="w-12 h-12 rounded-xl border"
              style={{ borderColor: `${ACCENT}55`, background: `${ACCENT}12` }}
            />
            <span className="font-code text-xs text-n-4">Preview coming soon</span>
          </div>
        )}
      </motion.div>
    </div>
  );
};

/* ------------------------------------------------------------------
   A real sequence, so numbers are earned here.
------------------------------------------------------------------ */
const StepRow = ({ index, item, isLast }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className={`group relative grid grid-cols-[3rem_1fr_auto] items-start gap-5 py-7 ${
        isLast ? "" : "border-b border-n-6"
      }`}
    >
      <span
        className="font-code text-sm pt-1 transition-colors"
        style={{ color: open ? ACCENT : undefined }}
      >
        <span className={open ? "" : "text-n-4"}>
          {String(index + 1).padStart(2, "0")}
        </span>
      </span>

      <div>
        <h3 className="h5 mb-2 transition-colors group-hover:text-[#3B82F6]">
          {item.title}
        </h3>
        <p className="body-2 text-n-3 max-w-[58ch] !leading-normal">{item.description}</p>
      </div>

      {item.iconName && moduleIcons[item.iconName] && (
        <span
          className="hidden sm:flex items-center justify-center w-11 h-11 rounded-xl border border-n-6 bg-n-7 transition-colors group-hover:border-[#3B82F6]/50"
          style={{ color: ACCENT }}
        >
          <svg viewBox="0 0 24 24" width="18" height="18">
            {moduleIcons[item.iconName]}
          </svg>
        </span>
      )}

      <span
        className="absolute left-0 bottom-0 h-px transition-all duration-500"
        style={{
          width: open ? "100%" : "0%",
          background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT_SOFT}, transparent)`,
        }}
      />
    </div>
  );
};

/* ------------------------------------------------------------------ */
const Lightbox = ({ src, alt, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClose}
    className="fixed inset-0 z-50 flex items-center justify-center bg-n-8/90 backdrop-blur-sm p-6"
  >
    <motion.img
      initial={{ scale: 0.96 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0.96 }}
      src={src}
      alt={alt}
      className="max-h-[88vh] w-auto rounded-2xl border border-n-6"
    />
    <button
      onClick={onClose}
      className="absolute top-6 right-6 rounded-lg border border-n-6 px-3 py-2 font-code text-xs text-n-1 hover:border-[#3B82F6]/60"
    >
      Close
    </button>
  </motion.div>
);

/* ================================================================== */
const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = getProductBySlug(slug);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setLightbox(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!product) return <Navigate to="/" replace />;

  const related = getRelatedProducts(slug);
  const index = products.findIndex((p) => p.slug === slug);
  const prevProduct = products[(index - 1 + products.length) % products.length];
  const nextProduct = products[(index + 1) % products.length];

  const [head, tail] = splitTitle(product.title);
  const steps = product.capabilities?.length ? product.capabilities : product.features || [];

  const goToProducts = (e) => {
    e.preventDefault();
    if (window.location.pathname === "/") {
      document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    navigate("/#products");
    setTimeout(
      () => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" }),
      100
    );
  };

  return (
    <div className="relative overflow-hidden">
      {/* reading progress */}
      <motion.div
        style={{
          scaleX: progress,
          transformOrigin: "0%",
          background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT_SOFT})`,
        }}
        className="fixed top-0 left-0 right-0 h-[2px] z-40"
      />

      {/* backdrop: light, white-based ambient glow — matches the rest of the site */}
      <LightAmbient color={ACCENT} accent={ACCENT_SOFT} />
      <div
        className="absolute -top-48 -left-40 w-[34rem] h-[34rem] rounded-full blur-[130px] opacity-20 pointer-events-none"
        style={{ background: ACCENT }}
      />
      <div
        className="absolute top-[30rem] -right-48 w-[28rem] h-[28rem] rounded-full blur-[130px] opacity-10 pointer-events-none"
        style={{ background: ACCENT_SOFT }}
      />

      <Section className="pt-[8rem] !pb-0" id={`product-${slug}`}>
        <div className="w-full max-w-[1680px] mx-auto px-6 lg:px-10 xl:px-16 relative z-2">

          {/* ---------- breadcrumb + position ---------- */}
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-2 font-code text-xs uppercase tracking-wider"
            >
              <Link to="/" className="text-n-4 hover:text-[#3B82F6] transition-colors">
                Home
              </Link>
              <span className="text-n-5 select-none">/</span>
              <button
                type="button"
                onClick={goToProducts}
                className="text-n-4 hover:text-[#3B82F6] transition-colors"
              >
                Products
              </button>
              <span className="text-n-5 select-none">/</span>
              <span className="text-[#3B82F6]" aria-current="page">
                {product.title}
              </span>
            </nav>

            <span className="flex items-center gap-2 font-code text-xs uppercase tracking-wider text-n-4">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Product {String(index + 1).padStart(2, "0")} of{" "}
              {String(products.length).padStart(2, "0")}
              {product.liveUrl && <span className="text-[#3B82F6]">· shipped</span>}
            </span>
          </div>

          {/* ---------- hero ---------- */}
          <div className="grid lg:grid-cols-[1.05fr_1fr] gap-14 xl:gap-20 items-center pb-20 lg:pb-28">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-4 mb-7"
              >
                <span className="flex items-center justify-center w-14 h-14 rounded-2xl border border-[#3B82F6]/40 bg-n-7">
                  <img
                    src={product.icon}
                    alt=""
                    className="w-9 h-9 object-contain"
                  />
                </span>
                <span className="font-code text-xs uppercase tracking-[0.2em] text-n-4">
                  {product.tagline}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="text-[11vw] sm:text-[7vw] md:text-[6vw] lg:text-[4.8vw] xl:text-[4.5vw] leading-[0.95] font-bold tracking-tight mb-7"
              >
                <span
                  className={product.title.includes(" ") ? "block text-n-1" : "inline text-n-1"}
                >
                  {head}
                </span>

                {tail && (
                  <span
                    className={product.title.includes(" ") ? "block" : "inline"}
                    style={{
                      background: `linear-gradient(100deg, ${ACCENT}, ${ACCENT_SOFT})`,
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    {product.title.includes(" ") ? ` ${tail}` : tail}
                  </span>
                )}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="body-1 text-n-3 max-w-[56ch] mb-9 !leading-normal"
              >
                {product.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="flex flex-wrap items-center gap-4 mb-10"
              >
                {product.liveUrl && (
                  <a
                    href={product.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-code text-xs font-bold uppercase tracking-wider text-n-8 transition-transform hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6]"
                    style={{ background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT_DEEP})` }}
                  >
                    Open the live product
                    <span aria-hidden>↗</span>
                  </a>
                )}
                <Link
                  to="/contact"
                  className="inline-flex items-center rounded-xl border border-n-6 px-7 py-3.5 font-code text-xs font-bold uppercase tracking-wider text-n-1 hover:border-[#3B82F6]/60 hover:text-[#3B82F6] transition-colors"
                >
                  Build something like it
                </Link>
              </motion.div>

              {product.techStack?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {product.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-n-6 bg-n-7/70 px-3.5 py-1.5 font-code text-xs text-n-2"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <ProductFrame
              screenshot={product.screenshot}
              video={product.video}
              title={product.title}
              liveUrl={product.liveUrl}
            />
          </div>
        </div>

        {/* ---------- stats band, full bleed ---------- */}
        {product.stats?.length > 0 && (
          <div className="relative z-2 border-y border-n-6 bg-n-7/40 backdrop-blur-sm">
            <div className="w-full max-w-[1680px] mx-auto grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-n-6">
              {product.stats.map((stat) => (
                <div key={stat.label} className="px-6 lg:px-10 py-12">
                  <p
                    className="text-4xl lg:text-5xl font-bold tracking-tight mb-2"
                    style={{ color: ACCENT }}
                  >
                    <CountUp value={stat.value} />
                  </p>
                  <p className="font-code text-xs uppercase tracking-wider text-n-4">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="w-full max-w-[1680px] mx-auto px-6 lg:px-10 xl:px-16 relative z-2">

          {/* ---------- challenge / solution ---------- */}
          {(product.challenge || product.solution) && (
            <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20 py-20 lg:py-28">
              <h2 className="h2 max-w-[14ch] leading-[1.02]">
                From scattered work to one clear signal.
              </h2>

              <div className="grid sm:grid-cols-2 gap-10">
                {product.challenge && (
                  <div className="pt-6 border-t border-n-6">
                    <p className="font-code text-xs uppercase tracking-wider text-n-4 mb-4">
                      The challenge
                    </p>
                    <h3 className="h5 mb-3">{product.challengeTitle || "What got in the way"}</h3>
                    <p className="body-2 text-n-3 !leading-normal">{product.challenge}</p>
                  </div>
                )}
                {product.solution && (
                  <div className="pt-6 border-t" style={{ borderColor: `${ACCENT}66` }}>
                    <p
                      className="font-code text-xs uppercase tracking-wider mb-4"
                      style={{ color: ACCENT }}
                    >
                      Our solution
                    </p>
                    <h3 className="h5 mb-3">{product.solutionTitle || "What we built"}</h3>
                    <p className="body-2 text-n-3 !leading-normal">{product.solution}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ---------- how it works ---------- */}
          {steps.length > 0 && (
            <div className="py-16 lg:py-24 border-t border-n-6">
              <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-20 items-end mb-10">
                <h2 className="h2 leading-[1.04] max-w-[18ch]">
                  {product.capabilities?.length
                    ? "One path from data to decision."
                    : "What's under the hood."}
                </h2>
                <p className="body-2 text-n-3 max-w-[46ch] !leading-normal">
                  {product.howItWorksNote ||
                    `A connected layer that makes ${product.title}'s day-to-day work feel direct and usable.`}
                </p>
              </div>

              <div className="border-t border-n-6">
                {steps.map((item, i) => (
                  <StepRow
                    key={item.title}
                    index={i}
                    item={item}
                    isLast={i === steps.length - 1}
                  />
                ))}
              </div>
            </div>
          )}

          {/* ---------- highlights ---------- */}
          {product.highlights?.length > 0 && (
            <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20 py-16 lg:py-24 border-t border-n-6">
              <div>
                <h2 className="h2 leading-[1.04] mb-5 max-w-[12ch]">
                  Less digging. More knowing.
                </h2>
                <p className="body-2 text-n-3 max-w-[46ch] !leading-normal">
                  {product.shortDescription}
                </p>
              </div>

              <ul>
                {product.highlights.map((item) => (
                  <li
                    key={item}
                    className="group flex items-center gap-4 py-5 border-b border-n-6 first:border-t first:border-n-6"
                  >
                    <span
                      className="flex items-center justify-center w-7 h-7 shrink-0 rounded-full border transition-colors"
                      style={{ borderColor: `${ACCENT}55`, color: ACCENT, background: `${ACCENT}14` }}
                    >
                      <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M4 12.5l5 5L20 6.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="body-2 text-n-1 group-hover:text-[#3B82F6] transition-colors">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* ---------- gallery ---------- */}
          {product.gallery?.length > 0 && (
            <div className="py-16 lg:py-24 border-t border-n-6">
              <div className="flex items-end justify-between gap-6 mb-8">
                <h2 className="h3">Inside the product</h2>
                <span className="font-code text-xs uppercase tracking-wider text-n-4">
                  Click to enlarge
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {product.gallery.map((src, i) => (
                  <button
                    key={src}
                    onClick={() => setLightbox(src)}
                    className="group relative rounded-2xl border border-n-6 overflow-hidden text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3B82F6]"
                  >
                    <img
                      src={src}
                      alt={`${product.title} screen ${i + 1}`}
                      className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <span className="absolute inset-0 bg-n-8/0 group-hover:bg-n-8/25 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ---------- outcome ---------- */}
          {product.outcomeQuote && (
            <figure className="py-16 lg:py-24 border-t border-n-6">
              <div
                className="relative rounded-2xl bg-n-7 px-8 py-12 lg:px-14 lg:py-16 overflow-hidden"
                style={{ borderLeft: `4px solid ${ACCENT}` }}
              >
                <div
                  className="absolute -top-24 -right-16 w-72 h-72 rounded-full blur-[100px] opacity-20 pointer-events-none"
                  style={{ background: ACCENT }}
                />
                <figcaption className="font-code text-xs uppercase tracking-wider text-n-4 mb-6">
                  Key outcome
                </figcaption>
                <blockquote className="h3 max-w-[22ch] sm:max-w-[26ch] leading-[1.15] text-n-1">
                  &ldquo;{product.outcomeQuote}&rdquo;
                </blockquote>
              </div>
            </figure>
          )}

          {/* ---------- related ---------- */}
          {related.length > 0 && (
            <div className="py-14 border-t border-n-6">
              <p className="font-code text-xs uppercase tracking-wider text-n-4 mb-5">
                Related products
              </p>
              <div className="flex flex-wrap gap-3">
                {related.map((p) => (
                  <Link
                    key={p.slug}
                    to={`/products/${p.slug}`}
                    className="inline-flex items-center gap-2 rounded-xl border border-n-6 px-5 py-3 font-code text-xs uppercase tracking-wider text-n-1 hover:border-[#3B82F6]/60 hover:text-[#3B82F6] transition-colors"
                  >
                    <img src={p.icon} alt="" className="w-4 h-4 object-contain" />
                    {p.title}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* ---------- prev / next ---------- */}
          {products.length > 1 && (
            <div className="py-14 border-t border-n-6 grid sm:grid-cols-2 gap-5">
              <Link
                to={`/products/${prevProduct.slug}`}
                className="group rounded-2xl border border-n-6 bg-n-7 p-7 hover:border-[#3B82F6]/60 transition-colors"
              >
                <span className="font-code text-xs uppercase tracking-wider text-n-4">
                  Previous product
                </span>
                <p className="h5 mt-2 group-hover:text-[#3B82F6] transition-colors">
                  {prevProduct.title}
                </p>
              </Link>

              <Link
                to={`/products/${nextProduct.slug}`}
                className="group rounded-2xl border border-n-6 bg-n-7 p-7 text-right hover:border-[#3B82F6]/60 transition-colors"
              >
                <span className="font-code text-xs uppercase tracking-wider text-n-4">
                  Next product
                </span>
                <p className="h5 mt-2 group-hover:text-[#3B82F6] transition-colors">
                  {nextProduct.title}
                </p>
              </Link>
            </div>
          )}
        </div>

        {/* ---------- closing CTA, full bleed ---------- */}
        <div className="relative z-2 border-t border-n-6 bg-n-7/30">
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.12]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
            }}
          />
          <div className="relative w-full max-w-[1680px] mx-auto px-6 lg:px-10 xl:px-16 py-20 lg:py-28 grid lg:grid-cols-[1.2fr_auto] gap-10 items-end">
            <div>
              <p
                className="font-code text-xs uppercase tracking-wider mb-4"
                style={{ color: ACCENT }}
              >
                Start a conversation
              </p>
              <h2 className="h2 leading-[1.04] mb-5 max-w-[16ch]">
                Want something like {product.title}?
              </h2>
              <p className="body-2 text-n-3 max-w-[50ch] !leading-normal">
                Tell us what your team does every day, and we&apos;ll show you what it
                looks like as a product.
              </p>
            </div>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl px-8 py-4 font-code text-xs font-bold uppercase tracking-wider text-n-8 transition-transform hover:scale-[1.03]"
              style={{ background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT_DEEP})` }}
            >
              Contact us
              <span aria-hidden>↗</span>
            </Link>
          </div>
        </div>
      </Section>

      <AnimatePresence>
        {lightbox && (
          <Lightbox
            src={lightbox}
            alt={`${product.title} screen`}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductDetail;