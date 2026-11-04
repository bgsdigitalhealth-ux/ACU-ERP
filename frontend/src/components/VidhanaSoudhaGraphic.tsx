import React from 'react';

export const VidhanaSoudhaGraphic: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl shadow-md border-2 border-white/80 bg-gradient-to-b from-[#e0f2fe] via-[#f8fafc] to-[#dcfce7] ${className}`}>
      <svg
        viewBox="0 0 600 280"
        className="w-full h-full object-cover select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Sky Gradient */}
          <linearGradient id="vsSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7dd3fc" />
            <stop offset="55%" stopColor="#bae6fd" />
            <stop offset="85%" stopColor="#f0f9ff" />
          </linearGradient>

          {/* Granite Stone Gradient */}
          <linearGradient id="vsStone" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fde047" stopOpacity="0.4" />
            <stop offset="20%" stopColor="#fef3c7" />
            <stop offset="70%" stopColor="#fcd34d" />
            <stop offset="100%" stopColor="#eab308" />
          </linearGradient>

          {/* Roof Granite Shadow */}
          <linearGradient id="vsRoof" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>

          {/* Lawn Gradient */}
          <linearGradient id="vsLawn" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#86efac" />
            <stop offset="30%" stopColor="#4ade80" />
            <stop offset="100%" stopColor="#16a34a" />
          </linearGradient>
        </defs>

        {/* Sky Background */}
        <rect width="600" height="280" fill="url(#vsSky)" />

        {/* Fluffy clouds */}
        <ellipse cx="120" cy="50" rx="60" ry="20" fill="#ffffff" opacity="0.6" />
        <ellipse cx="160" cy="45" rx="40" ry="16" fill="#ffffff" opacity="0.75" />
        <ellipse cx="480" cy="60" rx="70" ry="22" fill="#ffffff" opacity="0.55" />
        <ellipse cx="440" cy="55" rx="45" ry="18" fill="#ffffff" opacity="0.7" />

        {/* Trees Background */}
        <g fill="#22c55e" opacity="0.85">
          <circle cx="30" cy="190" r="35" fill="#15803d" />
          <circle cx="65" cy="185" r="30" fill="#16a34a" />
          <circle cx="95" cy="190" r="28" fill="#15803d" />
          <circle cx="505" cy="190" r="28" fill="#15803d" />
          <circle cx="535" cy="185" r="30" fill="#16a34a" />
          <circle cx="570" cy="190" r="35" fill="#15803d" />
        </g>

        {/* Vidhana Soudha Palace Building Facade */}
        <g id="vidhanaSoudhaBuilding">
          {/* Main Horizontal Base & Lower Tier */}
          <rect x="40" y="160" width="520" height="50" fill="#fef08a" stroke="#d97706" strokeWidth="1" />
          <rect x="30" y="200" width="540" height="15" fill="#fde047" stroke="#b45309" strokeWidth="1" />

          {/* Window / Pillar Grid across lower wings */}
          {Array.from({ length: 28 }).map((_, i) => (
            <rect
              key={`win-lower-${i}`}
              x={50 + i * 18}
              y="170"
              width="9"
              height="25"
              rx="1.5"
              fill="#78350f"
              opacity="0.8"
            />
          ))}

          {/* Second Tier / Balcony */}
          <rect x="70" y="125" width="460" height="36" fill="#fef9c3" stroke="#d97706" strokeWidth="1" />
          {Array.from({ length: 24 }).map((_, i) => (
            <rect
              key={`win-mid-${i}`}
              x={80 + i * 18}
              y="133"
              width="9"
              height="20"
              rx="1"
              fill="#92400e"
              opacity="0.75"
            />
          ))}

          {/* Left Wing Chhatri / Tower */}
          <rect x="70" y="85" width="55" height="42" fill="#fef08a" stroke="#d97706" />
          <path d="M60 85 Q97.5 50 135 85 Z" fill="url(#vsRoof)" stroke="#78350f" />
          <circle cx="97.5" cy="48" r="3" fill="#ca8a04" />

          {/* Right Wing Chhatri / Tower */}
          <rect x="475" y="85" width="55" height="42" fill="#fef08a" stroke="#d97706" />
          <path d="M465 85 Q502.5 50 540 85 Z" fill="url(#vsRoof)" stroke="#78350f" />
          <circle cx="502.5" cy="48" r="3" fill="#ca8a04" />

          {/* Central Grand Portico Pillars */}
          <rect x="210" y="115" width="180" height="95" fill="#fffbeb" stroke="#b45309" strokeWidth="1.5" />
          {/* Neoclassical Grand Columns */}
          {Array.from({ length: 12 }).map((_, i) => (
            <rect
              key={`col-${i}`}
              x={220 + i * 14}
              y="140"
              width="7"
              height="65"
              fill="#fef08a"
              stroke="#b45309"
              strokeWidth="0.8"
            />
          ))}
          {/* Grand Entry Stairway Arch */}
          <path d="M280 205 Q300 170 320 205 Z" fill="#451a03" />

          {/* Classical Pediment (Triangle) */}
          <polygon points="205,115 300,75 395,115" fill="#fef08a" stroke="#b45309" strokeWidth="2" />
          <text
            x="300"
            y="108"
            textAnchor="middle"
            fill="#78350f"
            fontWeight="bold"
            fontSize="7"
            fontFamily="sans-serif"
            letterSpacing="0.5"
          >
            GOVERNMENT OF KARNATAKA
          </text>

          {/* Central Majestic Dome */}
          <rect x="255" y="55" width="90" height="22" fill="#fef9c3" stroke="#b45309" strokeWidth="1" />
          {Array.from({ length: 7 }).map((_, i) => (
            <rect
              key={`dome-col-${i}`}
              x={262 + i * 11}
              y="58"
              width="4"
              height="16"
              fill="#78350f"
            />
          ))}

          {/* Grand Dome Arch */}
          <path
            d="M250 55 C250 15, 350 15, 350 55 Z"
            fill="url(#vsRoof)"
            stroke="#78350f"
            strokeWidth="1.5"
          />

          {/* Dome Kalasha / Spire */}
          <rect x="298" y="8" width="4" height="10" fill="#eab308" />
          <circle cx="300" cy="7" r="4" fill="#f59e0b" stroke="#78350f" strokeWidth="0.8" />

          {/* Indian National Tricolor Flag */}
          <line x1="300" y1="7" x2="300" y2="-12" stroke="#475569" strokeWidth="1.5" />
          <rect x="300" y="-12" width="18" height="4" fill="#ff9933" />
          <rect x="300" y="-8" width="18" height="4" fill="#ffffff" />
          <rect x="300" y="-4" width="18" height="4" fill="#128807" />
          <circle cx="309" cy="-6" r="1.5" fill="#000088" />
        </g>

        {/* Manicured Front Green Lawn & Garden */}
        <path d="M0 215 Q300 205 600 215 L600 280 L0 280 Z" fill="url(#vsLawn)" />

        {/* Garden Pathway & Flowerbeds */}
        <polygon points="260,280 340,280 320,218 280,218" fill="#d97706" opacity="0.35" />

        {/* Foreground Decorative Shrubs */}
        {Array.from({ length: 14 }).map((_, i) => (
          <ellipse
            key={`shrub-${i}`}
            cx={25 + i * 42}
            cy="245"
            rx="16"
            ry="9"
            fill="#15803d"
            opacity="0.9"
          />
        ))}
        {Array.from({ length: 13 }).map((_, i) => (
          <ellipse
            key={`shrub-front-${i}`}
            cx={45 + i * 42}
            cy="252"
            rx="14"
            ry="8"
            fill="#22c55e"
          />
        ))}
      </svg>

      {/* Building Label overlay */}
      <div className="absolute bottom-2 left-3 right-3 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-amber-200/60 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-[11px] font-bold text-[#78350f] uppercase tracking-wide">
            Vidhana Soudha • Bengaluru
          </p>
          <p className="text-[9.5px] text-[#64748b]">
            Department of Higher Education, Govt. of Karnataka
          </p>
        </div>
        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
          Active HQ
        </span>
      </div>
    </div>
  );
};

