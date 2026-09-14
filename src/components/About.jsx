import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "./Button";
import Section from "./Section";
import { BottomLine } from "./design/Hero";
import AINetworkBackground from "./AINetworkBackground";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const icons = {
  code: (
    <path
      d="M8 5 3 12l5 7M16 5l5 7-5 7"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  sync: (
    <path
      d="M4 12a8 8 0 0 1 13.6-5.7M20 12a8 8 0 0 1-13.6 5.7M14.5 4.3 17.6 6.3 15.6 9.4M9.5 19.7 6.4 17.7 8.4 14.6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  bolt: (
    <path
      d="M13 3 4 14h6l-1 7 9-11h-6l1-7Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  data: (
    <path
      d="M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3Zm0 0v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
};

const helpPoints = [
  {
    icon: "code",
    question: "Need intelligent software?",
    answer:
      "We build AI-powered web applications that are secure, scalable, and ready for the enterprise.",
  },
  {
    icon: "sync",
    question: "Want to bring AI into your workflow?",
    answer:
      "We embed machine learning and automation into the systems you already run, so decisions get smarter without a rebuild.",
  },
  {
    icon: "bolt",
    question: "Buried in manual processes?",
    answer:
      "We design smart tooling that removes repetitive work and gives your team hours back.",
  },
  {
    icon: "data",
    question: "Drowning in data you can&apos;t use?",
    answer:
      "We architect cloud-native pipelines that turn scattered data into insight you can act on.",
  },
];

const facts = [
  { label: "Founded", value: "2023" },
  { label: "Based in", value: "Bengaluru, India" },
  { label: "Focus", value: "AI-first engineering" },
];

// rim-light gradient border wrapper used across every panel/card so the
// whole section shares one consistent "premium surface" language
const Panel = ({ innerRef, accent = "mixed", className = "", children }) => {
  const gradients = {
    red: "from-[#e11d2e]/40 via-n-6 to-n-6",
    gold: "from-[#c9a227]/40 via-n-6 to-n-6",
    mixed: "from-[#e11d2e]/30 via-n-6 to-[#c9a227]/30",
  };
  return (
    <div
      className={`rounded-3xl p-[1px] bg-gradient-to-br ${gradients[accent]} ${className}`}
    >
      <div
        ref={innerRef}
        className="relative h-full rounded-[calc(1.5rem-1px)] bg-n-8/90 backdrop-blur-sm overflow-hidden"
      >
        {children}
      </div>
    </div>
  );
};

const About = () => {
  const contentRef = useRef(null);
  const progressRef = useRef(null);
  const visionRef = useRef(null);
  const missionRef = useRef(null);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(progressRef.current, { scaleX: 1 });
        return;
      }

      ScrollTrigger.create({
        trigger: content,
        start: "top 80%",
        end: "bottom 60%",
        scrub: 0.6,
        onUpdate: (self) =>
          gsap.set(progressRef.current, { scaleX: self.progress }),
      });

      gsap.from(content.querySelectorAll("[data-reveal]"), {
        y: 28,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: content, start: "top 78%" },
      });

      if (window.matchMedia("(hover: hover)").matches) {
        [visionRef.current, missionRef.current].forEach((panel) => {
          if (!panel) return;
          const setRX = gsap.quickTo(panel, "rotateX", {
            duration: 0.4,
            ease: "power3.out",
          });
          const setRY = gsap.quickTo(panel, "rotateY", {
            duration: 0.4,
            ease: "power3.out",
          });
          const onMove = (e) => {
            const rect = panel.getBoundingClientRect();
            const px = (e.clientX - rect.left) / rect.width - 0.5;
            const py = (e.clientY - rect.top) / rect.height - 0.5;
            setRY(px * 6);
            setRX(py * -6);
          };
          const onLeave = () => {
            setRX(0);
            setRY(0);
          };
          panel.addEventListener("mousemove", onMove);
          panel.addEventListener("mouseleave", onLeave);
          panel._cleanupTilt = () => {
            panel.removeEventListener("mousemove", onMove);
            panel.removeEventListener("mouseleave", onLeave);
          };
        });
      }
    }, content);

    return () => {
      ctx.revert();
      [visionRef.current, missionRef.current].forEach(
        (panel) => panel?._cleanupTilt?.()
      );
    };
  }, []);

  return (
    <Section crosses crossesOffset="lg:translate-y-[5.25rem]" id="about">
      <div className="container relative z-2">
        {/* ambient atmosphere — echoes the Hero so the page reads as one world */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60rem] h-[40rem] rounded-full bg-[#e11d2e]/[0.06] blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] rounded-full bg-[#c9a227]/[0.07] blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 opacity-25 pointer-events-none">
          <AINetworkBackground />
        </div>

        {/* scroll-progress rail */}
        <div className="relative h-px w-full bg-n-6 rounded-full overflow-hidden mb-14 lg:mb-16">
          <div
            ref={progressRef}
            className="absolute inset-y-0 left-0 w-full origin-left scale-x-0 bg-gradient-to-r from-[#e11d2e] to-[#c9a227]"
          />
        </div>

        <div ref={contentRef} className="relative">
          {/* Intro — copy left, quick facts right */}
          <div
            data-reveal
            className="grid lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-16 items-end mb-16 lg:mb-20"
          >
            <div>
              <h2 className="h2 mb-6">Who we are</h2>
              <p className="body-1 text-n-2 max-w-xl">
                MaverickIgnite Solutions LLP is an AI-first engineering
                studio. We design and build the software layer that lets
                businesses put artificial intelligence to work — in their
                products, their data, and the systems that run their day.
              </p>
            </div>

            <Panel accent="mixed">
              <div className="flex flex-col p-6 lg:p-7">
                {facts.map((fact, index) => (
                  <div
                    key={fact.label}
                    className={`flex items-center justify-between py-4 ${
                      index !== facts.length - 1 ? "border-b border-n-6" : ""
                    } ${index === 0 ? "pt-0" : ""} ${
                      index === facts.length - 1 ? "pb-0" : ""
                    }`}
                  >
                    <span className="body-2 text-n-4">{fact.label}</span>
                    <span className="h5 text-n-1">{fact.value}</span>
                  </div>
                ))}
              </div>
            </Panel>
          </div>

          {/* Vision / Mission — wide side-by-side panels */}
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 mb-16 lg:mb-20">
            <div data-reveal style={{ perspective: "1000px" }}>
              <Panel innerRef={visionRef} accent="red" className="h-full">
                <div className="relative p-8 lg:p-10 h-full">
                  <div className="absolute -top-20 -left-20 w-56 h-56 rounded-full bg-[#e11d2e]/10 blur-[90px] pointer-events-none" />
                  <p className="tagline text-n-4 mb-4 relative">
                    Where we&apos;re headed
                  </p>
                  <p className="h4 text-n-1 leading-snug relative">
                    A world where companies of any size can build with AI on
                    equal footing — where intelligent engineering and
                    data-driven decisions are simply how software gets made.
                  </p>
                </div>
              </Panel>
            </div>

            <div data-reveal style={{ perspective: "1000px" }}>
              <Panel innerRef={missionRef} accent="gold" className="h-full">
                <div className="relative p-8 lg:p-10 h-full">
                  <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-[#c9a227]/10 blur-[90px] pointer-events-none" />
                  <p className="tagline text-n-4 mb-4 relative">
                    What we do every day
                  </p>
                  <ul className="relative flex flex-col gap-4">
                    <li className="flex gap-3 body-2 text-n-2">
                      <span className="mt-[7px] w-[6px] h-[6px] shrink-0 bg-[#c9a227]" />
                      Ship AI-driven software and enterprise-grade platforms
                      built to scale.
                    </li>
                    <li className="flex gap-3 body-2 text-n-2">
                      <span className="mt-[7px] w-[6px] h-[6px] shrink-0 bg-[#c9a227]" />
                      Engineer modern data infrastructure that cuts through
                      complexity.
                    </li>
                    <li className="flex gap-3 body-2 text-n-2">
                      <span className="mt-[7px] w-[6px] h-[6px] shrink-0 bg-[#c9a227]" />
                      Automate with purpose — every system earns its place.
                    </li>
                  </ul>
                </div>
              </Panel>
            </div>
          </div>

          {/* Capabilities — real grid with distinct icons per card */}
          <div className="mb-16 lg:mb-20">
            <h3 data-reveal className="h3 mb-10 max-w-xl">
              How we help businesses like yours
            </h3>
            <div className="grid sm:grid-cols-2 gap-5 lg:gap-6">
              {helpPoints.map((point, index) => (
                <div key={index} data-reveal className="group">
                  <Panel accent={index % 2 === 0 ? "red" : "gold"}>
                    <div className="relative p-6 lg:p-8 h-full transition-transform duration-300 group-hover:-translate-y-1">
                      <div
                        className={`absolute -right-8 -top-8 w-28 h-28 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
                          index % 2 === 0 ? "bg-[#e11d2e]/10" : "bg-[#c9a227]/10"
                        }`}
                      />
                      <span
                        className={`relative flex items-center justify-center w-11 h-11 mb-5 rounded-xl border ${
                          index % 2 === 0
                            ? "border-[#e11d2e]/40 text-[#e11d2e]"
                            : "border-[#c9a227]/40 text-[#c9a227]"
                        }`}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          width="20"
                          height="20"
                          fill="none"
                        >
                          {icons[point.icon]}
                        </svg>
                      </span>
                      <h4 className="relative h5 mb-2 text-n-1">
                        {point.question}
                      </h4>
                      <p className="relative body-2 text-n-3">
                        {point.answer}
                      </p>
                    </div>
                  </Panel>
                </div>
              ))}
            </div>
          </div>

          {/* CTA band */}
          <div data-reveal>
            <Panel accent="mixed">
              <div className="relative px-8 py-12 lg:px-16 lg:py-16 text-center">
                <h3 className="h3 mb-4">
                  Ready to make your business AI-ready?
                </h3>
                <p className="body-1 text-n-2 mb-8 max-w-xl mx-auto">
                  Let&apos;s build the future together.
                </p>
                <a href="#contact">
                  <Button white>Get Started</Button>
                </a>
              </div>
            </Panel>
          </div>
        </div>
      </div>

      <BottomLine />
    </Section>
  );
};

export default About;