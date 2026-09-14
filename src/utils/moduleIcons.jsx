// src/utils/moduleIcons.jsx
// Generic, non-branded glyphs shared by Products and Services (cards + detail pages).

export const moduleIcons = {
  bot: (
    <>
      <rect x="6" y="8" width="12" height="10" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="9.5" cy="13" r="1" fill="currentColor" />
      <circle cx="14.5" cy="13" r="1" fill="currentColor" />
      <path d="M12 8V5m-2 0h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  chat: (
    <path
      d="M4 5h16v10H9l-4 4v-4H4V5Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  sms: (
    <>
      <path
        d="M4 5h16v10H9l-4 4v-4H4V5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="9" cy="10" r="0.8" fill="currentColor" />
      <circle cx="12" cy="10" r="0.8" fill="currentColor" />
      <circle cx="15" cy="10" r="0.8" fill="currentColor" />
    </>
  ),
  mail: (
    <path
      d="M4 6h16v12H4V6Zm0 0 8 7 8-7"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
      strokeLinecap="round"
      fill="none"
    />
  ),
  pulse: (
    <path
      d="M3 12h4l2-6 4 12 2-6h6"
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
  rocket: (
    <path
      d="M12 2c3 2 4 6 4 9 0 2-1 4-2 5l-2 2-2-2c-1-1-2-3-2-5 0-3 1-7 4-9Zm-3 13-3 3m9-3 3 3"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  shield: (
    <path
      d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  layers: (
    <>
      <path d="M12 3 2 8l10 5 10-5-10-5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
      <path d="M2 13l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M2 18l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </>
  ),
  puzzle: (
    <path
      d="M4 8h4a2 2 0 1 1 4 0h4v4a2 2 0 1 0 0 4v4H4v-4a2 2 0 1 0 0-4V8Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  bolt: (
    <path
      d="M13 3 5 13h5l-1 8 8-10h-5l1-8Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  users: (
    <>
      <circle cx="8.5" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="16" cy="9" r="2.4" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path
        d="M2.5 20c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5M13.5 20c.3-2.6 2.3-4.3 5-4.3s4.3 1.6 5 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </>
  ),
  chart: (
    <path
      d="M4 20V10M10 20V4M16 20v-7M22 20v-3"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
    />
  ),
  storefront: (
    <path
      d="M4 9.5 5 4h14l1 5.5M4 9.5a2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0M4 9.5V20h16V9.5M9.5 20v-6h5v6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
};

export default moduleIcons;