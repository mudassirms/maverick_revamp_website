import Button from "./Button";
import Section from "./Section";
import { LeftCurve, RightCurve } from "./design/Collaboration";

import logoMark from "/maverick-logo.png";

const CheckIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <circle
      cx="11"
      cy="11"
      r="10"
      stroke="#1D4ED8"
      strokeOpacity="0.4"
    />

    <path
      d="M6.5 11.3l2.8 2.8 6.2-6.6"
      stroke="#3B82F6"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);


const iconProps = (size = 22) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
});


const DataSenseIcon = ({ size }) => (
  <svg {...iconProps(size)}>
    <path
      d="M5 19V11M12 19V5M19 19v-7"
      stroke="#1D4ED8"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);


const SupportSenseIcon = ({ size }) => (
  <svg {...iconProps(size)}>
    <path
      d="M4 12a8 8 0 1 1 3.2 6.4L4 19l1-3.4A7.96 7.96 0 0 1 4 12z"
      stroke="#3B82F6"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />

    <circle
      cx="9"
      cy="12"
      r="0.9"
      fill="#3B82F6"
    />

    <circle
      cx="12.5"
      cy="12"
      r="0.9"
      fill="#3B82F6"
    />

    <circle
      cx="16"
      cy="12"
      r="0.9"
      fill="#3B82F6"
    />
  </svg>
);


const NotifyBotIcon = ({ size }) => (
  <svg {...iconProps(size)}>
    <path
      d="M12 4a5 5 0 0 0-5 5v3.3L5 16h14l-2-3.7V9a5 5 0 0 0-5-5z"
      stroke="#1D4ED8"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />

    <path
      d="M10 18.5a2 2 0 0 0 4 0"
      stroke="#3B82F6"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
  </svg>
);


const ApiIcon = ({ size }) => (
  <svg {...iconProps(size)}>
    <path
      d="M9 15l6-6M8 9.5l-2-2a2.6 2.6 0 1 1 3.7-3.7l2 2M15 14.5l2 2a2.6 2.6 0 1 1-3.7 3.7l-2-2"
      stroke="#3B82F6"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);


const AutomationIcon = ({ size }) => (
  <svg {...iconProps(size)}>
    <path
      d="M12 3l1.2 2.6 2.8.4-2 2 .5 2.8L12 9.4 9.5 10.8l.5-2.8-2-2 2.8-.4L12 3z"
      stroke="#1D4ED8"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />

    <path
      d="M6 15.5h12M6 19h8"
      stroke="#3B82F6"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);


const DataPipelineIcon = ({ size }) => (
  <svg {...iconProps(size)}>
    <ellipse
      cx="12"
      cy="6"
      rx="6"
      ry="2.2"
      stroke="#3B82F6"
      strokeWidth="1.6"
    />

    <path
      d="M6 6v6c0 1.2 2.7 2.2 6 2.2s6-1 6-2.2V6M6 12v6c0 1.2 2.7 2.2 6 2.2s6-1 6-2.2v-6"
      stroke="#3B82F6"
      strokeWidth="1.6"
    />
  </svg>
);


// --- Section content -------------------------------------------------------

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
  {
    id: "0",
    label: "DataSense",
    Icon: DataSenseIcon,
  },
  {
    id: "1",
    label: "SupportSense",
    Icon: SupportSenseIcon,
  },
  {
    id: "2",
    label: "NotifyBot",
    Icon: NotifyBotIcon,
  },
  {
    id: "3",
    label: "APIs",
    Icon: ApiIcon,
  },
  {
    id: "4",
    label: "Automation",
    Icon: AutomationIcon,
  },
  {
    id: "5",
    label: "Data Pipelines",
    Icon: DataPipelineIcon,
  },
];


const Collaboration = () => {
  return (
    <Section crosses>

      <style>{`
        @keyframes collab-spin {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes collab-orbit {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes collab-glow {
          0%, 100% {
            box-shadow: 0 0 0 rgba(29, 78, 216, 0);
          }

          50% {
            box-shadow: 0 0 26px rgba(29, 78, 216, 0.35);
          }
        }

        @keyframes collab-flow {
          0% {
            top: 2%;
            opacity: 0;
          }

          20% {
            opacity: 1;
          }

          85% {
            opacity: 1;
          }

          100% {
            top: 96%;
            opacity: 0;
          }
        }

        .collab-ring {
          animation: collab-spin 9s linear infinite;
        }

        .collab-orbit {
          animation: collab-orbit 50s linear infinite;
        }

        .collab-hub {
          animation: collab-glow 3.2s ease-in-out infinite;
        }

        .collab-dot {
          animation: collab-flow 2.6s linear infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .collab-ring,
          .collab-orbit,
          .collab-hub,
          .collab-dot {
            animation: none;
          }
        }
      `}</style>


      <div className="container lg:flex">

        {/* ========================================================
            LEFT CONTENT
            ======================================================== */}

        <div className="max-w-[25rem]">

          <h2 className="h2 mb-4 md:mb-8">
            One connected ecosystem, not a pile of disconnected tools
          </h2>


          <ul className="max-w-[22rem] mb-10 md:mb-14">

            {integrationPoints.map((item) => (
              <li
                className="mb-3 py-3"
                key={item.id}
              >

                <div className="flex items-center">

                  <CheckIcon />

                  <h6 className="body-2 ml-5">
                    {item.title}
                  </h6>

                </div>


                {item.text && (
                  <p className="body-2 mt-3 text-n-4">
                    {item.text}
                  </p>
                )}

              </li>
            ))}

          </ul>


          <a href="#products">
            <Button>
              Explore Our Products
            </Button>
          </a>

        </div>


        {/* ========================================================
            RIGHT ECOSYSTEM VISUAL
            ======================================================== */}

        <div className="lg:ml-auto xl:w-[38rem] mt-12 lg:mt-4">

          <div className="relative rounded-3xl border border-n-6 bg-n-7/40 backdrop-blur-sm p-6 pt-10 sm:p-10 overflow-hidden">

            {/* ====================================================
                AMBIENT BLUE GLOWS
                Same colors as Products.jsx
                ==================================================== */}

            <div
              className="absolute -top-16 -right-10 w-56 h-56 rounded-full bg-[#1D4ED8]/10 blur-[90px] pointer-events-none"
            />

            <div
              className="absolute -bottom-16 -left-10 w-56 h-56 rounded-full bg-[#3B82F6]/10 blur-[90px] pointer-events-none"
            />


            {/* ====================================================
                DESCRIPTION
                ==================================================== */}

            <p className="body-2 mb-10 md:mb-12 text-n-3 relative lg:w-[24rem] lg:mx-auto text-center lg:text-left">
              DataSense, SupportSense, and NotifyBot don&apos;t run as
              separate products bolted together — our System Integration &
              API Engineering layer keeps them, and the rest of your stack,
              working as one.
            </p>


            {/* ====================================================
                ECOSYSTEM ORBIT
                ==================================================== */}

            <div className="relative left-1/2 flex w-[19rem] sm:w-[22rem] aspect-square border border-n-6 rounded-full -translate-x-1/2">

              {/* ==================================================
                  SLOW ROTATING DASHED ORBIT
                  ================================================== */}

              <div
                className="collab-orbit absolute inset-0 rounded-full border border-dashed border-n-5/60"
                style={{
                  transformOrigin: "50% 50%",
                }}
              />


              {/* ==================================================
                  INNER ORBIT
                  ================================================== */}

              <div className="flex w-60 aspect-square m-auto border border-n-6 rounded-full">

                <div className="relative w-[6.5rem] aspect-square m-auto">

                  {/* ==================================================
                      SPINNING BLUE GRADIENT RING
                      Exact Product.jsx colors
                      ================================================== */}

                  <div
                    className="collab-ring collab-hub absolute inset-0 rounded-full"
                    style={{
                      transformOrigin: "50% 50%",
                      background:
                        "conic-gradient(from 180deg, #1D4ED8, #3B82F6, #1D4ED8)",
                    }}
                  />



                  <div className="absolute inset-[0.2rem] flex items-center justify-center bg-n-8 rounded-full p-3">

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
                      className="absolute top-0 left-1/2 h-1/2 -ml-[1.6rem] w-[3.2rem] origin-bottom"
                      style={{
                        transform: `rotate(${angle}deg)`,
                      }}
                    >

                      <span
                        className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-[#1D4ED8]/10 via-[#3B82F6]/50 to-[#1D4ED8]/70"
                      />

                      <span
                        className="collab-dot absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#3B82F6] shadow-[0_0_8px_rgba(59,130,246,0.85)]"
                        style={{
                          animationDelay: `${index * 0.4}s`,
                        }}
                      />

                      <div
                        className="relative -top-[1.6rem] mx-auto flex h-[3.6rem] w-[3.6rem] flex-col items-center justify-center gap-1 rounded-xl border border-n-1/15 bg-n-7 shadow-[0_6px_20px_-8px_rgba(0,0,0,0.5)]"
                        style={{
                          transform: `rotate(-${angle}deg)`,
                        }}
                      >

                        <node.Icon size={20} />

                      </div>

                    </li>
                  );
                })}

              </ul>

              <LeftCurve />
              <RightCurve />

            </div>

            <div className="relative flex flex-wrap justify-center gap-2 mt-8">

              {ecosystemNodes.map((node) => (
                <span
                  key={node.id}
                  className="inline-flex items-center gap-1.5 rounded-full border border-n-6 bg-n-8/80 px-3 py-1.5 text-n-3 caption"
                >

                  <node.Icon size={14} />

                  {node.label}

                </span>
              ))}

            </div>

          </div>

        </div>

      </div>

    </Section>
  );
};


export default Collaboration;