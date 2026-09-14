import Section from "./Section";
import { BottomLine } from "./design/Hero";
import IgniteSparkVisual from "./IgniteSparkVisual";

const pillars = [
  "AI Software Development",
  "Data Management",
  "System Integration",
];

const Hero = () => {
  return (
    <Section
      className="pt-[10rem] -mt-[5.25rem] pb-[8rem]"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >
      <div className="container relative">
        <div className="relative z-1 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-8 items-center">
          <div className="max-w-[36rem]">
            <h1 className="h1 mb-6 text-left">
              Transforming business with{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#e11d2e] to-[#c9a227]">
                AI-driven software excellence
              </span>
            </h1>

            <p className="body-1 max-w-xl mb-8 text-n-2">
              Building next-gen platforms with AI and advanced engineering.
              MaverickIgnite Solutions LLP delivers AI software development,
              data management, and system integration solutions.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-10">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-lg font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
                style={{
                  background:
                    "linear-gradient(90deg, #e11d2e 0%, #c9a227 100%)",
                  boxShadow: "0 12px 30px -10px rgba(225,29,46,0.45)",
                }}
              >
                Get Started
              </a>
              <a
                href="#services"
                className="body-2 text-n-2 hover:text-n-1 transition-colors border-b border-n-2/30 hover:border-n-1 pb-0.5"
              >
                See our services
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              {pillars.map((pillar, i) => (
                <span key={pillar} className="flex items-center gap-6">
                  <span className="flex items-center gap-2">
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        background: i % 2 === 0 ? "#e11d2e" : "#c9a227",
                      }}
                    />
                    <span className="caption text-n-4">{pillar}</span>
                  </span>
                  {i < pillars.length - 1 && (
                    <span className="hidden sm:block w-px h-3 bg-n-6" />
                  )}
                </span>
              ))}
            </div>
          </div>

          <IgniteSparkVisual />
        </div>
      </div>

      <BottomLine />
    </Section>
  );
};

export default Hero;