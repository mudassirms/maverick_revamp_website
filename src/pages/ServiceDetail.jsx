import { useEffect } from "react";
import { useParams, Link, Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getServiceBySlug, getRelatedServices } from "../config/services";
import { moduleIcons } from "../utils/moduleIcons";
import Section from "../components/Section";


// ------------------------------------------------------------
// Two-tone animated heading
// ------------------------------------------------------------
const AnimatedHeading = ({ text, className = "" }) => {
  const words = text.split(" ");
  const splitAt = words.length > 3 ? words.length - 2 : words.length - 1;
  const lead = words.slice(0, splitAt);
  const accent = words.slice(splitAt);

  const wordVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.h1
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.07,
            delayChildren: 0.1,
          },
        },
      }}
    >
      {lead.map((word, i) => (
        <motion.span
          key={`lead-${i}`}
          className="inline-block mr-[0.3em] text-n-1"
          variants={wordVariants}
        >
          {word}
        </motion.span>
      ))}

      {accent.map((word, i) => (
        <motion.span
          key={`accent-${i}`}
          className="inline-block mr-[0.3em] bg-gradient-to-r from-[#1D4ED8] to-[#3B82F6] bg-clip-text text-transparent"
          variants={wordVariants}
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
};


// ------------------------------------------------------------
// Badge chip
// ------------------------------------------------------------
const BadgeChip = ({ label, index }) => (
  <motion.span
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    animate={{ y: [0, -6, 0] }}
    transition={{
      opacity: {
        duration: 0.4,
        delay: index * 0.08,
      },
      y: {
        duration: 3 + (index % 3) * 0.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: index * 0.2,
      },
    }}
    className="rounded-full border border-n-6 bg-n-7/80 px-4 py-2 font-code text-xs text-n-2 backdrop-blur-sm"
  >
    {label}
  </motion.span>
);


// ------------------------------------------------------------
// Fallback visual for services without artwork
// ------------------------------------------------------------
const IconOrbitGraphic = ({ service, accentColor }) => {
  const nodes = service.features.slice(0, 5);
  const n = nodes.length;

  const cx = 200;
  const cy = 150;
  const radius = 108;

  const points = nodes.map((f, i) => {
    const angle =
      (-90 + (360 / Math.max(n, 1)) * i) * (Math.PI / 180);

    return {
      ...f,
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    };
  });

  const patternId = `orbit-dotgrid-${service.slug}`;

  return (
    <div className="relative w-full aspect-[4/3] rounded-2xl border border-n-6 bg-n-7 overflow-hidden">
      <div
        className="absolute left-1/2 top-1/2 w-72 h-72 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: accentColor }}
      />

      <svg viewBox="0 0 400 300" className="relative w-full h-full">
        <defs>
          <pattern
            id={patternId}
            width="18"
            height="18"
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx="1"
              cy="1"
              r="1"
              className="fill-n-1"
              opacity="0.08"
            />
          </pattern>
        </defs>

        <rect
          width="400"
          height="300"
          fill={`url(#${patternId})`}
        />

        {n > 0 && (
          <motion.circle
            cx={cx}
            cy={cy}
            r={radius}
            fill="none"
            stroke={accentColor}
            strokeOpacity={0.15}
            strokeDasharray="4 8"
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: -48 }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        )}

        {n > 1 &&
          points.map((p, i) => {
            const next = points[(i + 1) % n];

            return (
              <motion.line
                key={`mesh-${i}`}
                x1={p.x}
                y1={p.y}
                x2={next.x}
                y2={next.y}
                stroke={accentColor}
                strokeOpacity={0.12}
                initial={{
                  pathLength: 0,
                  opacity: 0,
                }}
                whileInView={{
                  pathLength: 1,
                  opacity: 1,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: 0.3 + i * 0.08,
                }}
              />
            );
          })}

        {points.map((p, i) => (
          <motion.line
            key={`spoke-${i}`}
            x1={cx}
            y1={cy}
            x2={p.x}
            y2={p.y}
            stroke={accentColor}
            strokeOpacity={0.3}
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: i * 0.08,
            }}
          />
        ))}

        {points.map((p, i) => (
          <motion.circle
            key={`pulse-${i}`}
            r={3}
            fill={accentColor}
            initial={{
              cx,
              cy,
              opacity: 0,
            }}
            animate={{
              cx: [cx, p.x],
              cy: [cy, p.y],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1 + i * 0.35,
            }}
          />
        ))}

        {points.map((p, i) => (
          <motion.g
            key={p.title}
            initial={{
              opacity: 0,
              y: 6,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.4,
              delay: 0.5 + i * 0.08,
            }}
          >
            <circle
              cx={p.x}
              cy={p.y}
              r={22}
              className="fill-n-8"
              stroke={accentColor}
              strokeOpacity={0.5}
            />

            <svg
              x={p.x - 9}
              y={p.y - 9}
              width={18}
              height={18}
              viewBox="0 0 24 24"
              style={{ color: accentColor }}
            >
              {moduleIcons[p.iconName]}
            </svg>
          </motion.g>
        ))}

        <motion.circle
          cx={cx}
          cy={cy}
          r={40}
          className="fill-n-8"
          stroke={accentColor}
          strokeWidth={1.5}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        />

        <motion.circle
          cx={cx}
          cy={cy}
          r={40}
          fill="none"
          stroke={accentColor}
          initial={{
            r: 40,
            opacity: 0.5,
          }}
          animate={{
            r: 62,
            opacity: 0,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />

        <svg
          x={cx - 16}
          y={cy - 16}
          width={32}
          height={32}
          viewBox="0 0 24 24"
          style={{ color: accentColor }}
        >
          {moduleIcons[service.iconName]}
        </svg>
      </svg>
    </div>
  );
};


// ------------------------------------------------------------
// Process step row ("How we get you to the next level")
// ------------------------------------------------------------
const ProcessStep = ({ index, total, step }) => (
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
      {index < total - 1 && (
        <span className="mt-2 w-px flex-1 bg-n-6" />
      )}
    </div>

    <div className="pb-2">
      <h5 className="h5 mb-1">{step.title}</h5>
      <p className="body-2 text-n-3 max-w-lg">{step.description}</p>
    </div>
  </motion.div>
);


// ------------------------------------------------------------
// Reference work / case study card
// ------------------------------------------------------------
const CaseStudyCard = ({ study, index }) => {
  const card = (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group rounded-2xl border border-n-6 bg-n-7 overflow-hidden hover:border-[#3B82F6]/50 transition-colors"
    >
      {study.media && (
        <div className="aspect-video overflow-hidden bg-n-8">
          {study.mediaType === "video" ? (
            <video
              src={study.media}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={study.media}
              alt={study.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
        </div>
      )}

      <div className="p-6">
        {study.tag && (
          <span className="font-code text-xs uppercase tracking-wider text-n-4">
            {study.tag}
          </span>
        )}

        <h5 className="h5 mt-2 mb-1 group-hover:text-[#3B82F6] transition-colors">
          {study.title}
        </h5>

        <p className="body-2 text-n-3">{study.description}</p>
      </div>
    </motion.div>
  );

  return study.link ? (
    <Link to={study.link} className="block">
      {card}
    </Link>
  ) : (
    card
  );
};


// ------------------------------------------------------------
// Service Detail Page
// ------------------------------------------------------------
const ServiceDetail = () => {
  const { slug } = useParams();

  const service = getServiceBySlug(slug);

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);


  if (!service) {
    return <Navigate to="/" replace />;
  }


  const related = getRelatedServices(slug);

  const accentColor = "#3B82F6";


  const goToContact = () => {
    if (window.location.pathname !== "/") {
      window.location.href = "/#contact";
    } else {
      document.getElementById("contact")?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const handleServicesClick = (e) => {
    e.preventDefault();

    if (window.location.pathname !== "/") {
      navigate("/#services");

      setTimeout(() => {
        document.getElementById("services")?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    } else {
      document.getElementById("services")?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };


  return (
    <div className="relative overflow-hidden">

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

      <div
        className="absolute -top-40 -left-40 w-[32rem] h-[32rem] rounded-full blur-[130px] opacity-20 pointer-events-none"
        style={{ background: "#1D4ED8" }}
      />

      <div
        className="absolute top-40 -right-40 w-[26rem] h-[26rem] rounded-full blur-[120px] opacity-10 pointer-events-none"
        style={{ background: "#3B82F6" }}
      />


      <Section className="pt-[8rem]" id={`service-${slug}`}>
        <div className="w-full max-w-[1680px] mx-auto px-6 lg:px-10 xl:px-16 relative z-2">

          {/* ==================================================
              BREADCRUMB
             ================================================== */}
          <nav
            aria-label="Breadcrumb"
            className="mb-10 flex flex-wrap items-center gap-2 font-code text-xs uppercase tracking-wider"
          >
            <Link to="/" className="text-n-4 hover:text-[#3B82F6] transition-colors">
              Home
            </Link>

            <span className="text-n-6 select-none">›</span>

            <button
              type="button"
              onClick={handleServicesClick}
              className="text-n-4 hover:text-[#3B82F6] transition-colors cursor-pointer"
            >
              Services
            </button>

            <span className="text-n-6 select-none">›</span>

            <span className="text-[#3B82F6]" aria-current="page">
              {service.title}
            </span>
          </nav>


          {/* ==================================================
              HERO
             ================================================== */}
          <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center mb-16 lg:mb-20">

            <div>
              <motion.span
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 mb-6 rounded-full border border-[#3B82F6]/40 bg-[#1D4ED8]/10 px-4 py-2"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" className="text-[#3B82F6]">
                  {moduleIcons[service.iconName]}
                </svg>

                <span className="font-code text-xs text-n-2">{service.tagline}</span>
              </motion.span>

              <AnimatedHeading text={service.title} className="h1 mb-6" />

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="body-1 text-n-3 mb-8 max-w-xl"
              >
                {service.description}
              </motion.p>

              {service.highlights?.length > 0 && (
                <ul className="body-2 mb-8">
                  {service.highlights.map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 + i * 0.06 }}
                      className="flex items-center gap-3 py-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-[#1D4ED8] to-[#3B82F6]" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              )}

              {/* Dual CTA row */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-wrap items-center gap-4"
              >
                <button
                  onClick={goToContact}
                  className="inline-flex items-center gap-2 rounded-xl px-6 py-3 font-code text-xs font-bold uppercase tracking-wider text-n-8 transition-transform hover:scale-[1.03]"
                  style={{ background: "linear-gradient(90deg, #1D4ED8, #3B82F6)" }}
                >
                  Let&apos;s build this
                  <span aria-hidden>→</span>
                </button>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-xl border border-n-6 px-6 py-3 font-code text-xs font-bold uppercase tracking-wider text-n-1 hover:border-[#3B82F6]/50 hover:text-[#3B82F6] transition-colors"
                >
                  Talk to us
                </Link>
              </motion.div>
            </div>

            <div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative"
              >
                {service.image ? (
                  <>
                    <div
                      className="absolute -inset-6 rounded-[2rem] blur-3xl opacity-20 pointer-events-none"
                      style={{ background: accentColor }}
                    />

                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                      className="relative rounded-2xl border border-n-6 overflow-hidden shadow-2xl"
                    >
                      <img src={service.image} alt={service.title} className="w-full h-auto block" />
                    </motion.div>
                  </>
                ) : (
                  <IconOrbitGraphic service={service} accentColor={accentColor} />
                )}
              </motion.div>

              {service.badges?.length > 0 && (
                <div className="flex flex-wrap gap-3 mt-6 justify-center lg:justify-start">
                  {service.badges.map((b, i) => (
                    <BadgeChip key={b} label={b} index={i} />
                  ))}
                </div>
              )}
            </div>
          </div>


          {/* ==================================================
              PROCESS — "How we get you to the next level"
             ================================================== */}
          {service.process?.length > 0 && (
            <div className="mb-16 lg:mb-20 pt-10 border-t border-n-6">
              <p className="tagline text-n-4 mb-2">The process</p>
              <h3 className="h3 mb-8 max-w-xl">
                How we take {service.title.toLowerCase()} from idea to launch
              </h3>

              <div className="grid lg:grid-cols-2 lg:gap-x-16">
                {service.process.map((step, i) => (
                  <ProcessStep
                    key={step.title}
                    index={i}
                    total={service.process.length}
                    step={step}
                  />
                ))}
              </div>
            </div>
          )}


          {/* ==================================================
              TYPICAL USE CASES
             ================================================== */}
          {service.useCases?.length > 0 && (
            <div className="mb-16 lg:mb-20 pt-10 border-t border-n-6">
              <p className="tagline text-n-4 mb-2">Where it fits</p>
              <h3 className="h3 mb-8 max-w-xl">Typical use cases</h3>

              <ul className="grid sm:grid-cols-2 gap-x-10 gap-y-4">
                {service.useCases.map((useCase, i) => (
                  <motion.li
                    key={useCase}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="flex items-start gap-3 body-2 text-n-2"
                  >
                    <span className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full bg-gradient-to-br from-[#1D4ED8] to-[#3B82F6]" />
                    {useCase}
                  </motion.li>
                ))}
              </ul>
            </div>
          )}


          {/* ==================================================
              FEATURE GRID — "Why it works"
             ================================================== */}
          {service.features?.length > 0 && (
            <div className="mb-16 lg:mb-20 pt-10 border-t border-n-6">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="tagline text-n-4 mb-5"
              >
                Why it works
              </motion.p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {service.features.map((f, i) => (
                  <motion.div
                    key={f.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    whileHover={{ y: -4 }}
                    className="rounded-2xl border border-n-6 bg-n-7 p-6"
                  >
                    <span className="flex items-center justify-center w-11 h-11 mb-4 rounded-xl border border-[#3B82F6]/40 text-[#3B82F6]">
                      <svg viewBox="0 0 24 24" width="20" height="20">
                        {moduleIcons[f.iconName]}
                      </svg>
                    </span>

                    <h5 className="h5 mb-1">{f.title}</h5>
                    <p className="body-2 text-n-3">{f.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}


          {/* ==================================================
              REFERENCE WORK — case studies for this service
             ================================================== */}
          {service.caseStudies?.length > 0 && (
            <div className="mb-16 lg:mb-20 pt-10 border-t border-n-6">
              <p className="tagline text-n-4 mb-2">Reference work</p>
              <h3 className="h3 mb-8 max-w-xl">
                Projects we&apos;ve built for this service
              </h3>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {service.caseStudies.map((study, i) => (
                  <CaseStudyCard key={study.title} study={study} index={i} />
                ))}
              </div>
            </div>
          )}


          {/* ==================================================
              RELATED / OTHER SERVICES
             ================================================== */}
          {related.length > 0 && (
            <div className="mb-16 lg:mb-20 pt-10 border-t border-n-6">
              <p className="tagline text-n-4 mb-5">Other services</p>

              <div className="flex flex-wrap gap-4">
                {related.map((s) => (
                  <Link
                    key={s.slug}
                    to={`/services/${s.slug}`}
                    className="rounded-xl border border-n-6 px-5 py-3 font-code text-xs uppercase tracking-wider text-n-1 hover:border-[#3B82F6]/50 hover:text-[#3B82F6] transition-colors"
                  >
                    {s.title} →
                  </Link>
                ))}
              </div>
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
            className="pt-10 border-t border-n-6 text-center lg:text-left"
          >
            <p className="tagline text-n-4 mb-2">Contact</p>
            <h3 className="h3 mb-6 max-w-2xl mx-auto lg:mx-0">
              Ready to start {service.title.toLowerCase()}?
            </h3>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <button
                onClick={goToContact}
                className="inline-flex items-center gap-2 rounded-xl px-6 py-3 font-code text-xs font-bold uppercase tracking-wider text-n-8 transition-transform hover:scale-[1.03]"
                style={{ background: "linear-gradient(90deg, #1D4ED8, #3B82F6)" }}
              >
                Let&apos;s build this
                <span aria-hidden>→</span>
              </button>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-n-6 px-6 py-3 font-code text-xs font-bold uppercase tracking-wider text-n-1 hover:border-[#3B82F6]/50 hover:text-[#3B82F6] transition-colors"
              >
                Contact us
              </Link>
            </div>
          </motion.div>

        </div>
      </Section>
    </div>
  );
};

export default ServiceDetail;