import React from "react";

export const ZenDoOneStatusIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="5" />
  </svg>
);

export const ZenDoOneIcon = ({ className }: { className?: string }) => (
  <img
    src="/app-icon-256.png"
    alt="ZenDoOne App Icon"
    className={`object-contain ${className}`}
    draggable={false}
  />
);

export const FinderIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 1024 1024" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Background with gradient */}
    <rect width="1024" height="1024" rx="220" fill="url(#finder_bg)"/>

    {/* Finder face - simple and clean */}
    <g transform="translate(512, 512)">
      {/* Left half - slightly darker blue */}
      <rect x="-280" y="-200" width="280" height="400" rx="60" fill="url(#finder_left)"/>

      {/* Right half - slightly lighter blue */}
      <rect x="0" y="-200" width="280" height="400" rx="60" fill="url(#finder_right)"/>

      {/* Left eye */}
      <circle cx="-140" cy="-80" r="24" fill="white"/>

      {/* Right eye */}
      <circle cx="140" cy="-80" r="24" fill="white"/>

      {/* Smile */}
      <path d="M -120 40 Q 0 120 120 40" stroke="white" strokeWidth="32" strokeLinecap="round" fill="none"/>
    </g>

    <defs>
      <linearGradient id="finder_bg" x1="512" y1="0" x2="512" y2="1024" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#54C7FC"/>
        <stop offset="100%" stopColor="#1283D4"/>
      </linearGradient>
      <linearGradient id="finder_left" x1="0" y1="0" x2="0" y2="400" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#4BA9E6"/>
        <stop offset="100%" stopColor="#2E8EDB"/>
      </linearGradient>
      <linearGradient id="finder_right" x1="0" y1="0" x2="0" y2="400" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#6DC2F2"/>
        <stop offset="100%" stopColor="#4BA9E6"/>
      </linearGradient>
    </defs>
  </svg>
);

export const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 1024 1024" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
     <rect width="1024" height="1024" rx="220" fill="#181717" />
     <path fill="white" d="M512 126.3C299 126.3 126.3 299 126.3 512c0 170.5 110.5 315.1 263.8 366.1 19.3 3.6 26.3-8.4 26.3-18.6 0-9.1-0.3-33.3-0.5-65.4-107.3 23.3-129.9-51.7-129.9-51.7-17.5-44.5-42.8-56.4-42.8-56.4-35-23.9 2.6-23.4 2.6-23.4 38.7 2.7 59.1 39.7 59.1 39.7 34.4 58.9 90.2 41.9 112.2 32 3.5-24.9 13.5-41.9 24.5-51.5-85.6-9.7-175.6-42.8-175.6-190.5 0-42.1 15-76.5 39.7-103.5-4-9.7-17.2-48.9 3.8-102 0 0 32.4-10.4 106 39.4 30.8-8.6 63.8-12.9 96.6-13.1 32.7 0.2 65.7 4.5 96.6 13.1 73.7-49.8 106-39.4 106-39.4 21 53.1 7.8 92.3 3.8 102 24.7 27 39.7 61.4 39.7 103.5 0 148-90.2 180.7-176.1 190.2 13.8 11.9 26.2 35.4 26.2 71.3 0 51.5-0.5 93.1-0.5 105.7 0 10.3 7 22.3 26.4 18.6C787.5 827 898 682.5 898 512 898 299 725.3 126.3 512 126.3z"/>
  </svg>
);

export const DiscordIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 1024 1024" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
     <rect width="1024" height="1024" rx="220" fill="#5865F2" />
     <g transform="translate(512, 512) scale(0.8) translate(-512, -512)">
       <path d="M297.27999969 760.32000031l-17.88-8.04-19.11999938 16.27999969c28.63999969 16.84000031 54.72 29.59999969 78.27999938 38.16a688.68 688.68 0 0 1-50.23999969 84.28000031c-91.84000031-31.2-169.24000031-72-232.24000031-122.4C32.07999969 533.07999969 118.95999969 333.60000031 192.00000031 226.32000031A733.00000031 733.00000031 0 0 1 381.99999969 165.08c8.71999969 16.24000031 16.96000031 33.36 24.64000031 51.40000031 37.68-5.20000031 69.28000031-7.87999969 94.8-8.00000062l10.63999969 0.08000062 10.56-0.12c25.60000031 0.16000031 57.19999969 2.80000031 94.8 8.04 7.72000031-18 15.96-35.20000031 24.68000062-51.40000031 67.44 12.19999969 130.75999969 32.64 189.91999969 61.27999969 73.08 107.28 159.91999969 306.79999969 135.96 542.20000031-63 50.47999969-140.4 91.27999969-232.24000031 122.44000031a688.84000031 688.84000031 0 0 1-50.23999969-84.28000031c23.59999969-8.59999969 49.63999969-21.31999969 78.28000031-38.16l-19.08-16.27999969-17.92000031 8.04c-71.56000031 30.96-143.16 46.39999969-214.72000031 46.39999969-71.59999969 0-143.20000031-15.43999969-214.8-46.39999969z m61.60000031-292.16000062c-46.48000031 0-82.48000031 43.60000031-82.48000031 95.76s35.59999969 96 82.48000031 96c46.92 0 82.8-43.84000031 82.8-96 0-52.2-36.36-95.76-82.8-95.76z m306.28000031 0c-46.48000031 0-82.8 43.60000031-82.8 95.76s35.88 96 82.8 96c46.92 0 82.48000031-43.84000031 82.47999938-96 0-52.2-36-95.76-82.47999938-95.76z" fill="white"/>
     </g>
  </svg>
);
