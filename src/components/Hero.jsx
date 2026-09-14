import Button from "./Button";
import Section from "./Section";
import { BottomLine } from "./design/Hero";
import IgniteBackground from "./IgniteBackground";

const Hero = () => {
  return (
    <Section
      className="pt-[12rem] -mt-[5.25rem] pb-[10rem]"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >
      <div className="container relative">
        <IgniteBackground />

        <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
          <h1 className="h1 mb-6">
            Transforming Business with AI-Driven Software{" "}
            <span className="relative inline-block">
              Excellence
              <span className="absolute left-0 -bottom-2 w-full h-[3px] rounded-full bg-gradient-to-r from-[#e11d2e] via-[#c9a227] to-[#e11d2e]" />
            </span>
          </h1>
          <p className="body-1 max-w-3xl mx-auto mb-6 text-n-2 lg:mb-8">
            Building next-gen platforms with AI and advanced engineering.
            MaverickIgnite Solutions LLP delivers AI software development,
            data management, and system integration solutions.
          </p>
          <a href="#contact">
            <Button white>Get Started</Button>
          </a>
        </div>
      </div>

      <BottomLine />
    </Section>
  );
};

export default Hero;