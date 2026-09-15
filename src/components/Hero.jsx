import Section from "./Section";
import IgniteSparkVisual from "./IgniteSparkVisual";
import StatCounter from "./StatCounter";
import KeywordMarquee from "./KeywordMarquee";

const stats = [
  { value: 6, suffix: "+", label: "Products shipped" },
  { value: 4, suffix: "", label: "Industries served" },
  { value: 24, suffix: "/7", label: "Support & uptime" },
  { value: 100, suffix: "%", label: "Compliance achieved" },
];

const pillars = [
  "AI Software Development",
  "Data Management",
  "System Integration",
];

const Hero = () => {
  return (
    <Section
      className="pt-[8rem] -mt-[5.25rem] pb-0"
      customPaddings
      id="hero"
    >
      <div className="container relative">

        {/* =========================
            HERO CONTENT
        ========================== */}
        <div className="relative z-1 grid lg:grid-cols-[1.2fr_0.8fr] gap-8 xl:gap-12 items-center">

          {/* =========================
              LEFT CONTENT
          ========================== */}
          <div className="w-full max-w-[46rem]">

            {/* Eyebrow */}
            <p className="font-code text-xs uppercase tracking-[0.2em] text-n-4 mb-5">
              ( Applied AI Engineering )
            </p>

            {/* Main Heading */}
            <h1
  className="
    h1
    mb-6
    text-left
    max-w-[46rem]
    pr-3
    overflow-visible
    leading-[1.08]
    tracking-[-0.035em]
  "
>
  Transforming business with{" "}

  <span
  className="
    italic
    bg-clip-text
    text-transparent
    bg-gradient-to-r
    from-[#1D4ED8]
    to-[#3B82F6]
    pr-3
  "
>
  AI-driven software
</span>{" "}

  <span
    className="
      inline-block
      italic
      pr-2
      bg-clip-text
      text-transparent
      bg-gradient-to-r
      from-[#1D4ED8]
      to-[#3B82F6]
    "
  >
    excellence
  </span>
</h1>

            {/* Description */}
            <p className="body-1 max-w-[40rem] mb-8 text-n-2">
              Building next-gen platforms with AI and advanced engineering.
              MaverickIgnite Solutions LLP delivers AI software development,
              data management, and system integration solutions.
            </p>

            {/* CTA */}
            <div className="flex flex-wrap items-center gap-6 mb-12">

              <a
                href="#contact"
                className="
                  inline-flex
                  items-center
                  justify-center
                  px-7
                  py-3.5
                  rounded-lg
                  font-semibold
                  text-white
                  transition-transform
                  duration-300
                  hover:-translate-y-0.5
                "
                style={{
                  background:
                    "linear-gradient(90deg, #1D4ED8 0%, #3B82F6 100%)",
                  boxShadow:
                    "0 12px 30px -10px rgba(29,78,216,0.45)",
                }}
              >
                Get Started
              </a>

              <a
                href="#services"
                className="
                  body-2
                  text-n-2
                  hover:text-n-1
                  transition-colors
                  border-b
                  border-n-2/30
                  hover:border-n-1
                  pb-0.5
                "
              >
                Explore our services
              </a>

            </div>

            {/* Pillars */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">

              {pillars.map((pillar, i) => (
                <span
                  key={pillar}
                  className="flex items-center gap-6"
                >
                  <span className="flex items-center gap-2">

                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{
                        background:
                          i % 2 === 0 ? "#1D4ED8" : "#3B82F6",
                      }}
                    />

                    <span className="caption text-n-4 whitespace-nowrap">
                      {pillar}
                    </span>

                  </span>

                  {i < pillars.length - 1 && (
                    <span className="hidden sm:block w-px h-3 bg-n-6" />
                  )}
                </span>
              ))}

            </div>
          </div>

          {/* =========================
              RIGHT VISUAL
          ========================== */}
          <div className="w-full flex justify-center lg:justify-end">
            <IgniteSparkVisual />
          </div>

        </div>

        {/* =========================
            STAT COUNTERS
        ========================== */}
        <div
          className="
            relative
            z-1
            grid
            grid-cols-2
            sm:grid-cols-4
            gap-8
            mt-12
            lg:mt-14
            pt-8
            border-t
            border-n-6
          "
        >
          {stats.map((stat, i) => (
            <StatCounter
              key={stat.label}
              {...stat}
              delay={i * 0.1}
            />
          ))}
        </div>

      </div>

      {/* =========================
          KEYWORD MARQUEE
      ========================== */}
      <div className="mt-10 lg:mt-12">
        <KeywordMarquee />
      </div>

    </Section>
  );
};

export default Hero;