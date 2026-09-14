import { useEffect } from "react";
import { useParams, Link, Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
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
            hidden: {
              opacity: 0,
              y: 24,
            },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.5,
                ease: "easeOut",
              },
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
// Browser mockup
// ------------------------------------------------------------
const BrowserMockup = ({
  screenshot,
  title,
  accentColor,
}) => (
  <motion.div
    initial={{
      opacity: 0,
      y: 50,
      rotate: -2,
    }}
    whileInView={{
      opacity: 1,
      y: 0,
      rotate: 0,
    }}
    viewport={{
      once: true,
      margin: "-60px",
    }}
    transition={{
      duration: 0.8,
      ease: "easeOut",
    }}
    className="relative"
  >
    <div
      className="absolute -inset-6 rounded-[2rem] blur-3xl opacity-30"
      style={{
        background: `radial-gradient(circle, ${accentColor}, transparent 70%)`,
      }}
    />

    <motion.div
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="relative rounded-2xl border border-n-6 bg-n-7 overflow-hidden shadow-2xl"
    >
      <div className="flex items-center gap-2 px-4 py-3 border-b border-n-6 bg-n-8">
        <span
          className="w-3 h-3 rounded-full"
          style={{
            background: accentColor,
            opacity: 0.7,
          }}
        />

        <span className="w-3 h-3 rounded-full bg-n-6" />
        <span className="w-3 h-3 rounded-full bg-n-6" />

        <span className="ml-3 h-2 w-40 rounded-full bg-n-6" />
      </div>

      {screenshot ? (
        <img
          src={screenshot}
          alt={`${title} screenshot`}
          className="w-full h-auto block"
        />
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
// Product Detail
// ------------------------------------------------------------
const ProductDetail = () => {
  const { slug } = useParams();

  const product = getProductBySlug(slug);

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);


  // ----------------------------------------------------------
  // Product not found
  // ----------------------------------------------------------
  if (!product) {
    return <Navigate to="/" replace />;
  }


  const related = getRelatedProducts(slug);

  const accentColor =
    product.accent === "red"
      ? "#e11d2e"
      : "#c9a227";

  const accentBorder =
    product.accent === "red"
      ? "border-[#e11d2e]/40 text-[#e11d2e]"
      : "border-[#c9a227]/40 text-[#c9a227]";


  // ----------------------------------------------------------
  // Breadcrumb → Products
  // ----------------------------------------------------------
  const handleProductsClick = (e) => {
    e.preventDefault();

    // If already on home page, smooth scroll directly
    if (window.location.pathname === "/") {
      document
        .getElementById("products")
        ?.scrollIntoView({
          behavior: "smooth",
        });

      return;
    }

    // If on a product detail page, go home first
    navigate("/#products");

    // Wait for navigation/rendering before scrolling
    setTimeout(() => {
      document
        .getElementById("products")
        ?.scrollIntoView({
          behavior: "smooth",
        });
    }, 100);
  };


  return (
    <div className="relative overflow-hidden">

      {/* ======================================================
          FULL-BLEED GRID TEXTURE
         ====================================================== */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 0%, black, transparent)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 0%, black, transparent)",
        }}
      />


      {/* ======================================================
          AMBIENT BACKGROUND BLOBS
         ====================================================== */}
      <div
        className="absolute -top-40 -left-40 w-[30rem] h-[30rem] rounded-full blur-[120px] opacity-20 pointer-events-none"
        style={{
          background: accentColor,
        }}
      />

      <div
        className="absolute top-40 -right-40 w-[26rem] h-[26rem] rounded-full blur-[120px] opacity-10 pointer-events-none"
        style={{
          background: accentColor,
        }}
      />


      {/* ======================================================
          MAIN SECTION
         ====================================================== */}
      <Section
        className="pt-[8rem]"
        id={`product-${slug}`}
      >
        <div className="w-full max-w-[1680px] mx-auto px-6 lg:px-10 xl:px-16 relative z-2">

          {/* ==================================================
              BREADCRUMB
              Home > Products > Current Product
             ================================================== */}
          <nav
            aria-label="Breadcrumb"
            className="mb-10 flex flex-wrap items-center gap-2 font-code text-xs uppercase tracking-wider"
          >

            {/* Home */}
            <Link
              to="/"
              className="text-n-4 hover:text-[#c9a227] transition-colors"
            >
              Home
            </Link>

            <span className="text-n-6 select-none">
              ›
            </span>

            {/* Products */}
            <button
              type="button"
              onClick={handleProductsClick}
              className="text-n-4 hover:text-[#c9a227] transition-colors cursor-pointer"
            >
              Products
            </button>

            <span className="text-n-6 select-none">
              ›
            </span>

            {/* Current Product */}
            <span
              className="text-[#c9a227]"
              aria-current="page"
            >
              {product.title}
            </span>

          </nav>


          {/* ==================================================
              HERO
             ================================================== */}
          <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center mb-20 lg:mb-28">

            {/* Left side */}
            <div>

              {/* Product icon */}
              {/* Product Logo */}
<motion.div
  initial={{
    opacity: 0,
    y: 12,
  }}
  animate={{
    opacity: 1,
    y: 0,
  }}
  transition={{
    duration: 0.5,
  }}
  className={`flex items-center justify-center w-16 h-16 mb-6 rounded-2xl border ${accentBorder} bg-n-7`}
>
  <img
    src={product.icon}
    alt={`${product.title} logo`}
    className="w-11 h-11 object-contain"
  />
</motion.div>

              {/* Product tagline */}
              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.1,
                }}
                className="tagline text-n-4 mb-3"
              >
                {product.tagline}
              </motion.p>


              {/* Product title */}
              <AnimatedHeading
                text={product.title}
                className="h3 mb-6"
              />


              {/* Product description */}
              <motion.p
                initial={{
                  opacity: 0,
                  y: 16,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.35,
                }}
                className="body-1 text-n-3 mb-8"
              >
                {product.description}
              </motion.p>


              {/* Visit Live Site */}
              {product.liveUrl && (
                <motion.a
                  initial={{
                    opacity: 0,
                    y: 16,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: 0.45,
                  }}
                  href={product.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl px-6 py-3 font-code text-xs font-bold uppercase tracking-wider text-n-8 transition-transform hover:scale-[1.03]"
                  style={{
                    background: `linear-gradient(90deg, ${accentColor}, #c9a227)`,
                  }}
                >
                  Visit Live Site

                  <span aria-hidden>
                    ↗
                  </span>
                </motion.a>
              )}

            </div>


            {/* Product screenshot */}
            <BrowserMockup
              screenshot={product.screenshot}
              title={product.title}
              accentColor={accentColor}
            />

          </div>


          {/* ==================================================
              HIGHLIGHTS + FEATURES
             ================================================== */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24">

            {/* Highlights */}
            {product.highlights?.length > 0 && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 24,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  margin: "-80px",
                }}
                transition={{
                  duration: 0.6,
                }}
              >

                <p className="tagline text-n-4 mb-4">
                  Highlights
                </p>

                <ul className="body-2">

                  {product.highlights.map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{
                        opacity: 0,
                        x: -12,
                      }}
                      whileInView={{
                        opacity: 1,
                        x: 0,
                      }}
                      viewport={{
                        once: true,
                      }}
                      transition={{
                        duration: 0.4,
                        delay: i * 0.06,
                      }}
                      className="flex items-center gap-3 py-3 border-t border-n-6 first:border-t-0"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{
                          background: `linear-gradient(90deg, ${accentColor}, #c9a227)`,
                        }}
                      />

                      {item}
                    </motion.li>
                  ))}

                </ul>

              </motion.div>
            )}


            {/* Features */}
            {product.features?.length > 0 && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 24,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  margin: "-80px",
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.1,
                }}
              >

                <p className="tagline text-n-4 mb-4">
                  Under the hood
                </p>

                <div className="grid sm:grid-cols-2 gap-6">

                  {product.features.map((f, i) => (
                    <motion.div
                      key={f.title}
                      initial={{
                        opacity: 0,
                        y: 16,
                      }}
                      whileInView={{
                        opacity: 1,
                        y: 0,
                      }}
                      viewport={{
                        once: true,
                      }}
                      transition={{
                        duration: 0.4,
                        delay: i * 0.08,
                      }}
                      className="rounded-2xl border border-n-6 bg-n-7 p-6"
                    >

                      <svg
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                        className="mb-3"
                        style={{
                          color: accentColor,
                        }}
                      >
                        {moduleIcons[f.iconName]}
                      </svg>

                      <h5 className="h5 mb-1">
                        {f.title}
                      </h5>

                      <p className="body-2 text-n-3">
                        {f.description}
                      </p>

                    </motion.div>
                  ))}

                </div>

              </motion.div>
            )}

          </div>


          {/* ==================================================
              RELATED PRODUCTS
             ================================================== */}
          {related.length > 0 && (
            <div className="pt-10 mt-16 border-t border-n-6">

              <p className="tagline text-n-4 mb-5">
                Related products
              </p>

              <div className="flex flex-wrap gap-4">

                {related.map((p) => (
                  <Link
                    key={p.slug}
                    to={`/products/${p.slug}`}
                    className="rounded-xl border border-n-6 px-5 py-3 font-code text-xs uppercase tracking-wider text-n-1 hover:border-[#c9a227]/50 hover:text-[#c9a227] transition-colors"
                  >
                    {p.title} →
                  </Link>
                ))}

              </div>

            </div>
          )}

        </div>
      </Section>
    </div>
  );
};

export default ProductDetail;

