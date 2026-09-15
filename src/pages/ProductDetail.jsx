import { useEffect } from "react";
import { useParams, Link, Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  products,
  getProductBySlug,
  getRelatedProducts,
} from "../config/products";
import { moduleIcons } from "../utils/moduleIcons";
import Section from "../components/Section";

// ------------------------------------------------------------
// Animated heading
// ------------------------------------------------------------
const AnimatedHeading = ({ text, className = "" }) => {
  const words = text.split(" ");

  return (
    <motion.h1
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.06,
            delayChildren: 0.1,
          },
        },
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.3em]"
          variants={{
            hidden: { opacity: 0, y: 24 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, ease: "easeOut" },
            },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
};


// ------------------------------------------------------------
// Browser mockup — hero media (video takes priority over screenshot)
// ------------------------------------------------------------
const BrowserMockup = ({ screenshot, video, title, accentColor }) => (
  <motion.div
    initial={{ opacity: 0, y: 50, rotate: -2 }}
    whileInView={{ opacity: 1, y: 0, rotate: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className="relative"
  >
    <div
      className="absolute -inset-6 rounded-[2rem] blur-3xl opacity-30"
      style={{ background: `radial-gradient(circle, ${accentColor}, transparent 70%)` }}
    />

    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      className="relative rounded-2xl border border-n-6 bg-n-7 overflow-hidden shadow-2xl"
    >
      <div className="flex items-center gap-2 px-4 py-3 border-b border-n-6 bg-n-8">
        <span className="w-3 h-3 rounded-full" style={{ background: accentColor, opacity: 0.7 }} />
        <span className="w-3 h-3 rounded-full bg-n-6" />
        <span className="w-3 h-3 rounded-full bg-n-6" />
        <span className="ml-3 h-2 w-40 rounded-full bg-n-6" />
      </div>

      {video ? (
        <video
          src={video}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-auto block"
        />
      ) : screenshot ? (
        <img src={screenshot} alt={`${title} screenshot`} className="w-full h-auto block" />
      ) : (
        <div className="aspect-[16/10] flex items-center justify-center bg-n-8">
          <span className="font-code text-xs uppercase tracking-wider text-n-4">
            Live product — no preview
          </span>
        </div>
      )}
    </motion.div>
  </motion.div>
);


// ------------------------------------------------------------
// Stat block — "9 Specialities / 15 Doctors / 2 Locations"
// ------------------------------------------------------------
const StatBlock = ({ stat, index, accentColor }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.08 }}
    className="text-center sm:text-left"
  >
    <p className="h2 mb-1" style={{ color: accentColor }}>
      {stat.value}
    </p>
    <p className="font-code text-xs uppercase tracking-wider text-n-4">
      {stat.label}
    </p>
  </motion.div>
);


// ------------------------------------------------------------
// Numbered capability row — "Features & main functionality"
// ------------------------------------------------------------
const CapabilityRow = ({ index, total, item }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.5, delay: index * 0.06 }}
    className="relative flex gap-6 py-6"
  >
    <div className="flex flex-col items-center">
      <span className="font-code text-sm text-[#3B82F6]">
        {String(index + 1).padStart(2, "0")}
      </span>
      {index < total - 1 && <span className="mt-2 w-px flex-1 bg-n-6" />}
    </div>

    <div className="pb-2">
      <h5 className="h5 mb-1">{item.title}</h5>
      <p className="body-2 text-n-3 max-w-lg">{item.description}</p>
    </div>
  </motion.div>
);


// ------------------------------------------------------------
// Product Detail
// ------------------------------------------------------------
const ProductDetail = () => {
  const { slug } = useParams();

  const product = getProductBySlug(slug);

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);


  if (!product) {
    return <Navigate to="/" replace />;
  }


  const related = getRelatedProducts(slug);

  // Previous / next product in catalogue order
  const currentIndex = products.findIndex((p) => p.slug === slug);
  const prevProduct = products[(currentIndex - 1 + products.length) % products.length];
  const nextProduct = products[(currentIndex + 1) % products.length];


  // One fixed blue accent, the same on every product page — mirrors ServiceDetail
  const accentColor = "#3B82F6";
  const accentColorDark = "#1D4ED8";
  const accentBorder = "border-[#3B82F6]/40 text-[#3B82F6]";


  const handleProductsClick = (e) => {
    e.preventDefault();

    if (window.location.pathname === "/") {
      document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    navigate("/#products");

    setTimeout(() => {
      document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };


  return (
    <div className="relative overflow-hidden">

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 0%, black, transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 0%, black, transparent)",
        }}
      />

      <div
        className="absolute -top-40 -left-40 w-[30rem] h-[30rem] rounded-full blur-[120px] opacity-20 pointer-events-none"
        style={{ background: accentColor }}
      />

      <div
        className="absolute top-40 -right-40 w-[26rem] h-[26rem] rounded-full blur-[120px] opacity-10 pointer-events-none"
        style={{ background: accentColor }}
      />


      <Section className="pt-[8rem]" id={`product-${slug}`}>
        <div className="w-full max-w-[1680px] mx-auto px-6 lg:px-10 xl:px-16 relative z-2">

          {/* ==================================================
              BREADCRUMB + CATEGORY TAG
             ================================================== */}
          <div className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-2">
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-2 font-code text-xs uppercase tracking-wider"
            >
              <Link to="/" className="text-n-4 hover:text-[#3B82F6] transition-colors">
                Home
              </Link>

              <span className="text-n-6 select-none">›</span>

              <button
                type="button"
                onClick={handleProductsClick}
                className="text-n-4 hover:text-[#3B82F6] transition-colors cursor-pointer"
              >
                Products
              </button>

              <span className="text-n-6 select-none">›</span>

              <span className="text-[#3B82F6]" aria-current="page">
                {product.title}
              </span>
            </nav>

            {product.tags?.length > 0 && (
              <span className="font-code text-xs uppercase tracking-wider text-n-4">
                {product.tags.join(" · ")}
              </span>
            )}
          </div>


          {/* ==================================================
              HERO
             ================================================== */}
          <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center mb-16 lg:mb-20">

            <div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`flex items-center justify-center w-16 h-16 mb-6 rounded-2xl border ${accentBorder} bg-n-7`}
              >
                <img
                  src={product.icon}
                  alt={`${product.title} logo`}
                  className="w-11 h-11 object-contain"
                />
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="tagline text-n-4 mb-3"
              >
                {product.tagline}
              </motion.p>

              <AnimatedHeading text={product.title} className="h3 mb-6" />

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="body-1 text-n-3 mb-8"
              >
                {product.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="flex flex-wrap items-center gap-4 mb-8"
              >
                {product.liveUrl && (
                  <a
                    href={product.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl px-6 py-3 font-code text-xs font-bold uppercase tracking-wider text-n-8 transition-transform hover:scale-[1.03]"
                    style={{ background: `linear-gradient(90deg, ${accentColor}, ${accentColorDark})` }}
                  >
                    Visit Live Site
                    <span aria-hidden>↗</span>
                  </a>
                )}

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-xl border border-n-6 px-6 py-3 font-code text-xs font-bold uppercase tracking-wider text-n-1 hover:border-[#3B82F6]/50 hover:text-[#3B82F6] transition-colors"
                >
                  Want something like this?
                </Link>
              </motion.div>

              {/* Tech stack chips */}
              {product.techStack?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {product.techStack.map((tech, i) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 + i * 0.05 }}
                      className="rounded-full border border-n-6 bg-n-7/80 px-3 py-1.5 font-code text-xs text-n-2"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              )}
            </div>

            <BrowserMockup
              screenshot={product.screenshot}
              video={product.video}
              title={product.title}
              accentColor={accentColor}
            />
          </div>


          {/* ==================================================
              SCREENSHOT GALLERY
             ================================================== */}
          {product.gallery?.length > 0 && (
            <div className="mb-16 lg:mb-20">
              <p className="tagline text-n-4 mb-5">Screenshots</p>

              <div className="grid sm:grid-cols-2 gap-6">
                {product.gallery.map((src, i) => (
                  <motion.div
                    key={src}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="rounded-2xl border border-n-6 overflow-hidden"
                  >
                    <img
                      src={src}
                      alt={`${product.title} screenshot ${i + 1}`}
                      className="w-full h-auto block"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          )}


          {/* ==================================================
              STATS ROW
             ================================================== */}
          {product.stats?.length > 0 && (
            <div className="mb-16 lg:mb-20 pt-10 border-t border-n-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
                {product.stats.map((stat, i) => (
                  <StatBlock key={stat.label} stat={stat} index={i} accentColor={accentColor} />
                ))}
              </div>
            </div>
          )}


          {/* ==================================================
              CHALLENGE + SOLUTION
             ================================================== */}
          {(product.challenge || product.solution) && (
            <div className="mb-16 lg:mb-20 pt-10 border-t border-n-6 grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24">

              {product.challenge && (
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6 }}
                >
                  <p className="tagline text-n-4 mb-2">The challenge</p>
                  <h3 className="h4 mb-4">Why it mattered</h3>
                  <p className="body-2 text-n-3">{product.challenge}</p>
                </motion.div>
              )}

              {product.solution && (
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <p className="tagline text-n-4 mb-2">Our solution</p>
                  <h3 className="h4 mb-4">What we built</h3>
                  <p className="body-2 text-n-3">{product.solution}</p>
                </motion.div>
              )}
            </div>
          )}


          {/* ==================================================
              KEY OUTCOME QUOTE
             ================================================== */}
          {product.outcomeQuote && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="mb-16 lg:mb-20 rounded-2xl border border-n-6 bg-n-7 p-8 lg:p-12"
            >
              <p className="tagline text-n-4 mb-4">Key outcome</p>
              <p className="h4 max-w-3xl" style={{ color: accentColor }}>
                &ldquo;{product.outcomeQuote}&rdquo;
              </p>
            </motion.div>
          )}


          {/* ==================================================
              HIGHLIGHTS + NUMBERED CAPABILITIES
             ================================================== */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24 pt-10 border-t border-n-6">

            {product.highlights?.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
              >
                <p className="tagline text-n-4 mb-4">Highlights</p>

                <ul className="body-2">
                  {product.highlights.map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.06 }}
                      className="flex items-center gap-3 py-3 border-t border-n-6 first:border-t-0"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: `linear-gradient(90deg, ${accentColor}, ${accentColorDark})` }}
                      />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Numbered "Features & main functionality" list — falls back to
                the icon-card `features` if no `capabilities` array is set */}
            {(product.capabilities?.length > 0 || product.features?.length > 0) && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <p className="tagline text-n-4 mb-4">
                  {product.capabilities?.length > 0 ? "Features & main functionality" : "Under the hood"}
                </p>

                {product.capabilities?.length > 0 ? (
                  <div>
                    {product.capabilities.map((item, i) => (
                      <CapabilityRow
                        key={item.title}
                        index={i}
                        total={product.capabilities.length}
                        item={item}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-6">
                    {product.features.map((f, i) => (
                      <motion.div
                        key={f.title}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.08 }}
                        className="rounded-2xl border border-n-6 bg-n-7 p-6"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          width="20"
                          height="20"
                          className="mb-3"
                          style={{ color: accentColor }}
                        >
                          {moduleIcons[f.iconName]}
                        </svg>

                        <h5 className="h5 mb-1">{f.title}</h5>
                        <p className="body-2 text-n-3">{f.description}</p>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </div>


          {/* ==================================================
              RELATED PRODUCTS
             ================================================== */}
          {related.length > 0 && (
            <div className="pt-10 mt-16 border-t border-n-6">
              <p className="tagline text-n-4 mb-5">Related products</p>

              <div className="flex flex-wrap gap-4">
                {related.map((p) => (
                  <Link
                    key={p.slug}
                    to={`/products/${p.slug}`}
                    className="rounded-xl border border-n-6 px-5 py-3 font-code text-xs uppercase tracking-wider text-n-1 hover:border-[#3B82F6]/50 hover:text-[#3B82F6] transition-colors"
                  >
                    {p.title} →
                  </Link>
                ))}
              </div>
            </div>
          )}


          {/* ==================================================
              PREV / NEXT PROJECT NAV
             ================================================== */}
          {products.length > 1 && (
            <div className="mt-16 pt-10 border-t border-n-6 grid sm:grid-cols-2 gap-6">
              <Link
                to={`/products/${prevProduct.slug}`}
                className="group rounded-2xl border border-n-6 bg-n-7 p-6 hover:border-[#3B82F6]/50 transition-colors"
              >
                <span className="font-code text-xs uppercase tracking-wider text-n-4">
                  ← Previous Project
                </span>
                <p className="h5 mt-2 group-hover:text-[#3B82F6] transition-colors">
                  {prevProduct.title}
                </p>
              </Link>

              <Link
                to={`/products/${nextProduct.slug}`}
                className="group rounded-2xl border border-n-6 bg-n-7 p-6 text-right hover:border-[#3B82F6]/50 transition-colors"
              >
                <span className="font-code text-xs uppercase tracking-wider text-n-4">
                  Next Project →
                </span>
                <p className="h5 mt-2 group-hover:text-[#3B82F6] transition-colors">
                  {nextProduct.title}
                </p>
              </Link>
            </div>
          )}


          {/* ==================================================
              CLOSING CTA
             ================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="mt-16 pt-10 border-t border-n-6 text-center lg:text-left"
          >
            <p className="tagline text-n-4 mb-2">Contact</p>
            <h3 className="h3 mb-6 max-w-2xl mx-auto lg:mx-0">
              Want something like {product.title}?
            </h3>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl px-6 py-3 font-code text-xs font-bold uppercase tracking-wider text-n-8 transition-transform hover:scale-[1.03]"
                style={{ background: `linear-gradient(90deg, ${accentColor}, ${accentColorDark})` }}
              >
                Contact us
                <span aria-hidden>→</span>
              </Link>
            </div>
          </motion.div>

        </div>
      </Section>
    </div>
  );
};

export default ProductDetail;