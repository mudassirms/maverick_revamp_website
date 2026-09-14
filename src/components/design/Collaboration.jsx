export const RightCurve = () => {
  return (
    <div className="hidden absolute top-1/2 left-full w-[10.125rem] -mt-1 ml-10 pointer-events-none xl:block">
      <svg viewBox="0 0 162 76" fill="none" className="w-full h-auto">
        <path
          d="M2 38 C 50 38, 70 6, 160 6"
          stroke="#1D4ED8"
          strokeOpacity="0.35"
          strokeWidth="1.5"
          strokeDasharray="4 5"
          strokeLinecap="round"
        />
        <path
          d="M2 38 C 50 38, 70 70, 160 70"
          stroke="#3B82F6"
          strokeOpacity="0.25"
          strokeWidth="1.5"
          strokeDasharray="4 5"
          strokeLinecap="round"
        />
        <circle cx="160" cy="6" r="2.5" fill="#1D4ED8" opacity="0.6" />
        <circle cx="160" cy="70" r="2.5" fill="#3B82F6" opacity="0.5" />
      </svg>
    </div>
  );
};

export const LeftCurve = () => {
  return (
    <div className="hidden absolute top-1/2 right-full w-[32.625rem] -mt-1 mr-10 pointer-events-none xl:block">
      <svg viewBox="0 0 522 182" fill="none" className="w-full h-auto">
        <path
          d="M520 91 C 380 91, 260 20, 2 14"
          stroke="#3B82F6"
          strokeOpacity="0.3"
          strokeWidth="1.5"
          strokeDasharray="5 6"
          strokeLinecap="round"
        />
        <path
          d="M520 91 C 380 91, 260 165, 2 172"
          stroke="#1D4ED8"
          strokeOpacity="0.25"
          strokeWidth="1.5"
          strokeDasharray="5 6"
          strokeLinecap="round"
        />
        <circle cx="2" cy="14" r="3" fill="#3B82F6" opacity="0.6" />
        <circle cx="2" cy="172" r="3" fill="#1D4ED8" opacity="0.5" />
      </svg>
    </div>
  );
};