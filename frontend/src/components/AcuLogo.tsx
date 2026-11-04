import React from 'react';

interface AcuLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const AcuLogo: React.FC<AcuLogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true
}) => {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Official ACU Crest (Vector SVG with AU Monogram + Lotus) */}
      <div
        className={`relative shrink-0 flex items-center justify-center ${
          size === 'sm' ? 'w-10 h-11' : size === 'lg' ? 'w-14 h-16' : 'w-12 h-14'
        }`}
      >
        <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-sm overflow-visible">
          <defs>
            {/* Gold border gradient */}
            <linearGradient id="shieldGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="35%" stopColor="#eab308" />
              <stop offset="70%" stopColor="#ca8a04" />
              <stop offset="100%" stopColor="#854d0e" />
            </linearGradient>

            {/* Crimson / Maroon shield border */}
            <linearGradient id="shieldCrimson" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#991b1b" />
              <stop offset="50%" stopColor="#7f1d1d" />
              <stop offset="100%" stopColor="#581c87" />
            </linearGradient>

            {/* Lotus pink gradient */}
            <linearGradient id="lotusPink" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="60%" stopColor="#db2777" />
              <stop offset="100%" stopColor="#be185d" />
            </linearGradient>
          </defs>

          {/* Shield Outer Outline */}
          <path
            d="M 12 10 L 88 10 C 88 10, 92 68, 50 114 C 8 68, 12 10, 12 10 Z"
            fill="#ffffff"
            stroke="url(#shieldCrimson)"
            strokeWidth="4"
          />

          {/* Inner Golden Border */}
          <path
            d="M 18 16 L 82 16 C 82 16, 85 64, 50 105 C 15 64, 18 16, 18 16 Z"
            fill="#ffffff"
            stroke="url(#shieldGoldGrad)"
            strokeWidth="2.2"
          />

          {/* Monogram "AU" Upper Section */}
          <g transform="translate(23, 24) scale(0.95)">
            {/* Letter 'A' */}
            <path
              d="M 12 40 L 26 6 L 40 40 L 32 40 L 26 23 L 20 40 Z"
              fill="#831843"
            />
            {/* 'A' Crossbar */}
            <rect x="18" y="27" width="16" height="4.5" fill="#831843" />

            {/* Letter 'U' Interlinked */}
            <path
              d="M 33 6 L 40 6 L 40 28 C 40 37, 30 38, 26 38 C 22 38, 14 37, 14 28 L 14 22 L 20 22 L 20 27 C 20 31, 23 32, 26 32 C 29 32, 34 31, 34 26 L 34 6 Z"
              fill="#9d174d"
              opacity="0.95"
            />
          </g>

          {/* Lotus Flower at the Base */}
          <g transform="translate(50, 84) scale(0.48)">
            {/* Center Petal */}
            <path
              d="M 0 -36 C -14 -18, -10 6, 0 16 C 10 6, 14 -18, 0 -36 Z"
              fill="url(#lotusPink)"
            />
            {/* Left Petal */}
            <path
              d="M -3 -30 C -25 -20, -32 2, -18 15 C -8 16, 0 8, 0 0 Z"
              fill="#e11d48"
              opacity="0.88"
            />
            {/* Right Petal */}
            <path
              d="M 3 -30 C 25 -20, 32 2, 18 15 C 8 16, 0 8, 0 0 Z"
              fill="#e11d48"
              opacity="0.88"
            />
            {/* Outer Left Petal */}
            <path
              d="M -12 -18 C -38 -8, -42 12, -26 22 C -18 22, -10 14, -8 4 Z"
              fill="#f43f5e"
              opacity="0.75"
            />
            {/* Outer Right Petal */}
            <path
              d="M 12 -18 C 38 -8, 42 12, 26 22 C 18 22, 10 14, 8 4 Z"
              fill="#f43f5e"
              opacity="0.75"
            />
            {/* Green Lotus Base */}
            <path
              d="M -26 22 C -15 28, 15 28, 26 22 C 18 18, -18 18, -26 22 Z"
              fill="#15803d"
            />
          </g>
        </svg>
      </div>

      {/* Typography: ACU ERP + Adichunchanagiri University */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-black tracking-tight text-[#29084e] leading-none ${
              size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
            }`}
          >
            ACU ERP
          </span>
        </div>

        {showSubtitle && (
          <>
            <p
              className={`font-semibold text-[#3b0764] tracking-tight leading-tight mt-0.5 ${
                size === 'sm' ? 'text-[10px]' : size === 'lg' ? 'text-xs sm:text-sm' : 'text-[11px] sm:text-xs'
              }`}
            >
              Adichunchanagiri University
            </p>
            {/* Golden underline accent below title */}
            <div className="w-16 sm:w-20 h-0.5 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full mt-1" />
          </>
        )}
      </div>
    </div>
  );
};

