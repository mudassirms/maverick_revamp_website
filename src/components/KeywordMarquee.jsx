const keywords = [
  "AI Agents",
  "Data Pipelines",
  "System Integration",
  "SaaS Products",
  "Automation",
  "Enterprise Software",
  "Dashboards",
];

const KeywordMarquee = () => {
  const doubled = [...keywords, ...keywords];

  return (
    <div className="relative w-full overflow-hidden border-y border-n-6 py-4">
      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .marquee-track { animation: marquee-scroll 28s linear infinite; }
        .marquee-wrap:hover .marquee-track { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
      `}</style>

      {/* fade edges so the loop doesn't hard-cut */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-n-8 to-transparent z-1" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-n-8 to-transparent z-1" />

      <div className="marquee-wrap">
        <div className="marquee-track flex w-max gap-3">
          {doubled.map((word, i) => (
            <span
              key={`${word}-${i}`}
              className="flex items-center gap-3 font-code text-sm text-n-3 whitespace-nowrap"
            >
              {word}
              <span className="text-[#3B82F6]">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KeywordMarquee;