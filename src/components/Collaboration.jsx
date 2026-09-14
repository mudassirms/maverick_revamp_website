import Button from "./Button";
import Section from "./Section";
import { LeftCurve, RightCurve } from "./design/Collaboration";
// Point this at your icon-only logo mark (not the full "MAVERICK IGNITE"
// text lockup — the badge is ~5.5rem across, text would be unreadable there).
import logoMark from "/maverick.png";

// --- Inline icons (no image assets) -----------------------------------

const CheckIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <circle cx="11" cy="11" r="10" stroke="#e11d2e" strokeOpacity="0.4" />
    <path
      d="M6.5 11.3l2.8 2.8 6.2-6.6"
      stroke="#c9a227"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const iconProps = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none" };

const DataSenseIcon = () => (
  <svg {...iconProps}>
    <path d="M5 19V11M12 19V5M19 19v-7" stroke="#e11d2e" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const SupportSenseIcon = () => (
  <svg {...iconProps}>
    <path
      d="M4 12a8 8 0 1 1 3.2 6.4L4 19l1-3.4A7.96 7.96 0 0 1 4 12z"
      stroke="#c9a227"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
    <circle cx="9" cy="12" r="0.9" fill="#c9a227" />
    <circle cx="12.5" cy="12" r="0.9" fill="#c9a227" />
    <circle cx="16" cy="12" r="0.9" fill="#c9a227" />
  </svg>
);

const NotifyBotIcon = () => (
  <svg {...iconProps}>
    <path
      d="M12 4a5 5 0 0 0-5 5v3.3L5 16h14l-2-3.7V9a5 5 0 0 0-5-5z"
      stroke="#e11d2e"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
    <path d="M10 18.5a2 2 0 0 0 4 0" stroke="#e11d2e" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

const ApiIcon = () => (
  <svg {...iconProps}>
    <path
      d="M9 15l6-6M8 9.5l-2-2a2.6 2.6 0 1 1 3.7-3.7l2 2M15 14.5l2 2a2.6 2.6 0 1 1-3.7 3.7l-2-2"
      stroke="#c9a227"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const AutomationIcon = () => (
  <svg {...iconProps}>
    <path
      d="M12 3l1.2 2.6 2.8.4-2 2 .5 2.8L12 9.4 9.5 10.8l.5-2.8-2-2 2.8-.4L12 3z"
      stroke="#e11d2e"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path d="M6 15.5h12M6 19h8" stroke="#e11d2e" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const DataPipelineIcon = () => (
  <svg {...iconProps}>
    <ellipse cx="12" cy="6" rx="6" ry="2.2" stroke="#c9a227" strokeWidth="1.6" />
    <path
      d="M6 6v6c0 1.2 2.7 2.2 6 2.2s6-1 6-2.2V6M6 12v6c0 1.2 2.7 2.2 6 2.2s6-1 6-2.2v-6"
      stroke="#c9a227"
      strokeWidth="1.6"
    />
  </svg>
);

// --- Section content ----------------------------------------------------

const integrationPoints = [
  {
    id: "0",
    title: "Unified APIs & middleware",
    text: "Every tool in your stack talks to every other tool through one secure, well-documented integration layer.",
  },
  {
    id: "1",
    title: "Real-time system sync",
    text: "Data moves the moment it changes — no overnight batch jobs, no stale dashboards.",
  },
  {
    id: "2",
    title: "Cloud-native pipelines",
    text: "Built to scale with your data volume, not around it.",
  },
];

const ecosystemNodes = [
  { id: "0", label: "DataSense", Icon: DataSenseIcon },
  { id: "1", label: "SupportSense", Icon: SupportSenseIcon },
  { id: "2", label: "NotifyBot", Icon: NotifyBotIcon },
  { id: "3", label: "APIs", Icon: ApiIcon },
  { id: "4", label: "Automation", Icon: AutomationIcon },
  { id: "5", label: "Data Pipelines", Icon: DataPipelineIcon },
];

const Collaboration = () => {
  return (
    <Section crosses>
      <div className="container lg:flex">
        <div className="max-w-[25rem]">
          <h2 className="h2 mb-4 md:mb-8">
            One connected ecosystem, not a pile of disconnected tools
          </h2>

          <ul className="max-w-[22rem] mb-10 md:mb-14">
            {integrationPoints.map((item) => (
              <li className="mb-3 py-3" key={item.id}>
                <div className="flex items-center">
                  <CheckIcon />
                  <h6 className="body-2 ml-5">{item.title}</h6>
                </div>
                {item.text && (
                  <p className="body-2 mt-3 text-n-4">{item.text}</p>
                )}
              </li>
            ))}
          </ul>

          <a href="#products">
            <Button>Explore Our Products</Button>
          </a>
        </div>

        <div className="lg:ml-auto xl:w-[38rem] mt-4">
          <p className="body-2 mb-8 text-n-4 md:mb-16 lg:mb-32 lg:w-[24rem] lg:mx-auto">
            DataSense, SupportSense, and NotifyBot don&apos;t run as separate
            products bolted together — our System Integration & API
            Engineering layer keeps them, and the rest of your stack,
            working as one.
          </p>

          <div className="relative left-1/2 flex w-[22rem] aspect-square border border-n-6 rounded-full -translate-x-1/2 scale:75 md:scale-100">
            <div className="flex w-60 aspect-square m-auto border border-n-6 rounded-full">
              <div
                className="w-[6rem] aspect-square m-auto p-[0.2rem] rounded-full"
                style={{
                  background:
                    "conic-gradient(from 180deg, #e11d2e, #c9a227, #e11d2e)",
                }}
              >
                <div className="flex items-center justify-center w-full h-full bg-n-8 rounded-full p-3">
                  <img
                    src={logoMark}
                    alt="MaverickIgnite"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>

            <ul>
              {ecosystemNodes.map((node, index) => {
                const angle = index * 60;
                return (
                  <li
                    key={node.id}
                    className="absolute top-0 left-1/2 h-1/2 -ml-[1.6rem] origin-bottom"
                    style={{ transform: `rotate(${angle}deg)` }}
                  >
                    <div
                      className="relative -top-[1.6rem] flex flex-col items-center justify-center gap-1 w-[3.6rem] h-[3.6rem] bg-n-7 border border-n-1/15 rounded-xl"
                      style={{ transform: `rotate(-${angle}deg)` }}
                    >
                      <node.Icon />
                    </div>
                  </li>
                );
              })}
            </ul>

            <LeftCurve />
            <RightCurve />
          </div>

          {/* Labels, since the icons alone don't name the products */}
          <div className="hidden md:flex flex-wrap justify-center gap-x-4 gap-y-1 mt-6 text-n-4 caption">
            {ecosystemNodes.map((node) => (
              <span key={node.id}>{node.label}</span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Collaboration;