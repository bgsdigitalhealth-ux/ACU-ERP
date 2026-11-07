import React, { useState } from 'react';
import { RoleInfo } from '../types/auth';

export interface KarnatakaDialRole extends RoleInfo {
  angleDeg: number;
  gradientId: string;
  themeColor: string;
  petalFill: string;
}

export const KARNATAKA_8_ROLES: KarnatakaDialRole[] = [
  {
    id: 'chancellor',
    title: 'Chancellor',
    subtitle: 'Apex university governance, statutory approvals and executive decrees',
    iconName: 'Crown',
    color: '#e11d48',
    themeColor: '#e11d48',
    bgLight: '#ffe4e6',
    borderColor: '#f43f5e',
    petalFill: 'url(#gradChancellor)',
    defaultEmail: 'chancellor@acu.edu.in',
    angle: 270,
    angleDeg: 270, // 12:00 Top
    gradientId: 'gradChancellor'
  },
  {
    id: 'vice-chancellor',
    title: 'Vice Chancellor',
    subtitle: 'Approvals & Academic Oversight, Institutional Governance',
    iconName: 'Award',
    color: '#d97706',
    themeColor: '#d97706',
    bgLight: '#ffedd5',
    borderColor: '#f59e0b',
    petalFill: 'url(#gradVC)',
    defaultEmail: 'vc.office@acu.edu.in',
    angle: 315,
    angleDeg: 315, // 1:30 Top-Right
    gradientId: 'gradVC'
  },
  {
    id: 'registrar',
    title: 'Registrar',
    subtitle: 'Evaluation, Valuation Centers & Result Processing Administration',
    iconName: 'FileEdit',
    color: '#db2777',
    themeColor: '#db2777',
    bgLight: '#fce7f3',
    borderColor: '#ec4899',
    petalFill: 'url(#gradRegistrar)',
    defaultEmail: 'registrar@acu.edu.in',
    angle: 0,
    angleDeg: 0, // 3:00 Right
    gradientId: 'gradRegistrar'
  },
  {
    id: 'coe',
    title: 'Controller of Examinations',
    subtitle: 'University examination schedules, QP generation and centre allocation',
    iconName: 'ClipboardCheck',
    color: '#7c3aed',
    themeColor: '#7c3aed',
    bgLight: '#ede9fe',
    borderColor: '#8b5cf6',
    petalFill: 'url(#gradCOE)',
    defaultEmail: 'coe@acu.edu.in',
    angle: 45,
    angleDeg: 45, // 4:30 Bottom-Right
    gradientId: 'gradCOE'
  },
  {
    id: 'finance',
    title: 'Finance Officer',
    subtitle: 'Treasury funds, examination fee reconciliation & remuneration registers',
    iconName: 'Coins',
    color: '#16a34a',
    themeColor: '#16a34a',
    bgLight: '#dcfce7',
    borderColor: '#22c55e',
    petalFill: 'url(#gradFinance)',
    defaultEmail: 'finance.officer@acu.edu.in',
    angle: 90,
    angleDeg: 90, // 6:00 Bottom
    gradientId: 'gradFinance'
  },
  {
    id: 'hr-manager',
    title: 'HR Manager',
    subtitle: 'Faculty appointments, roster & university personnel governance',
    iconName: 'Users',
    color: '#0891b2',
    themeColor: '#0891b2',
    bgLight: '#cffafe',
    borderColor: '#06b6d4',
    petalFill: 'url(#gradHR)',
    defaultEmail: 'hr.university@acu.edu.in',
    angle: 135,
    angleDeg: 135, // 7:30 Bottom-Left
    gradientId: 'gradHR'
  },
  {
    id: 'dean',
    title: 'Dean',
    subtitle: 'Chief Superintendent examination oversight & institutional management',
    iconName: 'UserCheck',
    color: '#2563eb',
    themeColor: '#2563eb',
    bgLight: '#dbeafe',
    borderColor: '#3b82f6',
    petalFill: 'url(#gradDean)',
    defaultEmail: 'dean.medical@acu.edu.in',
    angle: 180,
    angleDeg: 180, // 9:00 Left
    gradientId: 'gradDean'
  },
  {
    id: 'iqac',
    title: 'IQAC Coordinator',
    subtitle: 'Internal Quality Assurance Cell, NAAC & NIRF Rankings',
    iconName: 'BookOpen',
    color: '#6366f1',
    themeColor: '#6366f1',
    bgLight: '#e0e7ff',
    borderColor: '#8b5cf6',
    petalFill: 'url(#gradIQAC)',
    defaultEmail: 'iqac@acu.edu.in',
    angle: 225,
    angleDeg: 225, // 10:30 Top-Left
    gradientId: 'gradIQAC'
  }
];

interface KarnatakaRoleDialProps {
  selectedRoleId: string | null;
  onSelectRole: (role: RoleInfo) => void;
}

export const KarnatakaRoleDial: React.FC<KarnatakaRoleDialProps> = ({
  selectedRoleId,
  onSelectRole
}) => {
  const [hoveredRoleId, setHoveredRoleId] = useState<string | null>(null);

  // High-Resolution 640x640 SVG coordinate system
  const cx = 320;
  const cy = 320;
  const rIn = 120;   // Inner hub radius
  const rOut = 295;  // Outer petal edge radius

  // Sector path generator for 45-degree curved petals with rounded corners
  const getSectorPath = (angleCenterDeg: number) => {
    const halfAngle = 21.8; // 43.6 deg with crisp 1.4 deg boundary gap
    const startDeg = angleCenterDeg - halfAngle;
    const endDeg = angleCenterDeg + halfAngle;

    const toRad = (deg: number) => (deg * Math.PI) / 180;
    const startRad = toRad(startDeg);
    const endRad = toRad(endDeg);

    const x1 = cx + rIn * Math.cos(startRad);
    const y1 = cy + rIn * Math.sin(startRad);
    const x2 = cx + rOut * Math.cos(startRad);
    const y2 = cy + rOut * Math.sin(startRad);
    const x3 = cx + rOut * Math.cos(endRad);
    const y3 = cy + rOut * Math.sin(endRad);
    const x4 = cx + rIn * Math.cos(endRad);
    const y4 = cy + rIn * Math.sin(endRad);

    return `M ${x1} ${y1} L ${x2} ${y2} A ${rOut} ${rOut} 0 0 1 ${x3} ${y3} L ${x4} ${y4} A ${rIn} ${rIn} 0 0 0 ${x1} ${y1} Z`;
  };

  return (
    <div className="relative w-[340px] h-[340px] sm:w-[460px] sm:h-[460px] md:w-[520px] md:h-[520px] lg:w-[560px] lg:h-[560px] xl:w-[590px] xl:h-[590px] flex items-center justify-center select-none filter drop-shadow-2xl">
      {/* 
        Full HD Vector SVG University Role Dial
        100% Vector Math - Crisp, zero pixelation, crystal clear typography on 1080p, 4K and Retina screens.
      */}
      <svg
        viewBox="0 0 640 640"
        className="w-full h-full select-none"
        style={{ shapeRendering: 'geometricPrecision', textRendering: 'geometricPrecision' }}
      >
        <defs>
          {/* Petal Drop Shadows */}
          <filter id="dialShadow" x="-15%" y="-15%" width="130%" height="130%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#0f172a" floodOpacity="0.18" />
          </filter>
          <filter id="hubShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#0f172a" floodOpacity="0.22" />
          </filter>
          <filter id="selectionGlow" x="-25%" y="-25%" width="150%" height="150%">
            <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#8b0029" floodOpacity="0.75" />
          </filter>

          {/* Gradients matching the user's mockup precisely */}
          {/* 1. Chancellor - Pink to Coral Red */}
          <radialGradient id="gradChancellor" cx="50%" cy="10%" r="90%">
            <stop offset="0%" stopColor="#ffb3c1" />
            <stop offset="50%" stopColor="#ff8fa3" />
            <stop offset="100%" stopColor="#ffe4e6" />
          </radialGradient>

          {/* 2. Vice Chancellor - Warm Amber Gold */}
          <radialGradient id="gradVC" cx="70%" cy="20%" r="90%">
            <stop offset="0%" stopColor="#fde68a" />
            <stop offset="55%" stopColor="#fed7aa" />
            <stop offset="100%" stopColor="#fff7ed" />
          </radialGradient>

          {/* 3. Registrar - Vibrant Magenta Pink */}
          <radialGradient id="gradRegistrar" cx="85%" cy="50%" r="90%">
            <stop offset="0%" stopColor="#f472b6" />
            <stop offset="60%" stopColor="#fbcfe8" />
            <stop offset="100%" stopColor="#fdf2f8" />
          </radialGradient>

          {/* 4. COE - Soft Violet Lilac */}
          <radialGradient id="gradCOE" cx="75%" cy="75%" r="90%">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="60%" stopColor="#e9d5ff" />
            <stop offset="100%" stopColor="#faf5ff" />
          </radialGradient>

          {/* 5. Finance Officer - Bright Spring Mint Green */}
          <radialGradient id="gradFinance" cx="50%" cy="85%" r="90%">
            <stop offset="0%" stopColor="#86efac" />
            <stop offset="55%" stopColor="#bbf7d0" />
            <stop offset="100%" stopColor="#f0fdf4" />
          </radialGradient>

          {/* 6. HR Manager - Aqua Cyan */}
          <radialGradient id="gradHR" cx="25%" cy="75%" r="90%">
            <stop offset="0%" stopColor="#67e8f9" />
            <stop offset="55%" stopColor="#a5f3fc" />
            <stop offset="100%" stopColor="#ecfeff" />
          </radialGradient>

          {/* 7. Dean - Sky Royal Blue */}
          <radialGradient id="gradDean" cx="15%" cy="50%" r="90%">
            <stop offset="0%" stopColor="#93c5fd" />
            <stop offset="60%" stopColor="#bae6fd" />
            <stop offset="100%" stopColor="#f0f9ff" />
          </radialGradient>

          {/* 8. IQAC Coordinator - Soft Lavender Purple */}
          <radialGradient id="gradIQAC" cx="25%" cy="25%" r="90%">
            <stop offset="0%" stopColor="#c4b5fd" />
            <stop offset="60%" stopColor="#ddd6fe" />
            <stop offset="100%" stopColor="#f5f3ff" />
          </radialGradient>

          {/* Central Golden Glow Ring Gradient */}
          <linearGradient id="centerGoldRing" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>

          {/* Purple Pill Button Gradient */}
          <linearGradient id="purplePillGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#9333ea" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
        </defs>

        {/* ============================================================== */}
        {/* 8 ROLE PETALS (Vector paths with crisp borders and icons)     */}
        {/* ============================================================== */}
        <g filter="url(#dialShadow)">
          {KARNATAKA_8_ROLES.map((role) => {
            const isSelected = selectedRoleId === role.id;
            const isHovered = hoveredRoleId === role.id;
            const pathD = getSectorPath(role.angleDeg);

            // Icon Center Coordinates (r = 236)
            const iconRad = (role.angleDeg * Math.PI) / 180;
            const iconR = 236;
            const ix = cx + iconR * Math.cos(iconRad);
            const iy = cy + iconR * Math.sin(iconRad);

            // Text Center Coordinates (r = 164)
            const textR = 164;
            const tx = cx + textR * Math.cos(iconRad);
            const ty = cy + textR * Math.sin(iconRad);

            return (
              <g
                key={role.id}
                onClick={() => onSelectRole(role)}
                onMouseEnter={() => setHoveredRoleId(role.id)}
                onMouseLeave={() => setHoveredRoleId(null)}
                className="cursor-pointer transition-transform duration-200"
                style={{
                  transformOrigin: `${cx}px ${cy}px`,
                  transform: isSelected ? 'scale(1.02)' : isHovered ? 'scale(1.015)' : 'none',
                }}
              >
                {/* Petal Geometry */}
                <path
                  d={pathD}
                  fill={role.petalFill}
                  stroke={isSelected ? '#8b0029' : isHovered ? role.themeColor : '#ffffff'}
                  strokeWidth={isSelected ? 5 : isHovered ? 4.5 : 3.5}
                  filter={isSelected ? 'url(#selectionGlow)' : undefined}
                  className="transition-all duration-200"
                />

                {/* Subtle Inner Highlight Outline */}
                <path
                  d={pathD}
                  fill="none"
                  stroke={isSelected ? 'rgba(139, 0, 41, 0.4)' : isHovered ? 'rgba(255, 255, 255, 0.7)' : 'transparent'}
                  strokeWidth={2}
                />

                {/* ============================================================ */}
                {/* VECTOR ROLE ICONS                                           */}
                {/* ============================================================ */}
                {/* 1. Chancellor (12:00 / 270°) */}
                {role.id === 'chancellor' && (
                  <g transform={`translate(${ix - 20}, ${iy - 22})`} className="pointer-events-none">
                    <circle cx="20" cy="8" r="6" fill="#dc2626" />
                    <path d="M 12 20 C 12 15 28 15 28 20 Z" fill="#dc2626" />
                    <rect x="7" y="20" width="26" height="5" rx="1.5" fill="#991b1b" />
                    <path d="M 10 25 L 14 36 L 26 36 L 30 25 Z" fill="#b91c1c" />
                    <rect x="12" y="36" width="16" height="3" rx="1" fill="#7f1d1d" />
                  </g>
                )}

                {/* 2. Vice Chancellor (1:30 / 315°) */}
                {role.id === 'vice-chancellor' && (
                  <g transform={`translate(${ix - 19}, ${iy - 21})`} className="pointer-events-none">
                    <circle cx="19" cy="8" r="6.5" fill="#d97706" />
                    <path d="M 10 22 C 10 16 16 15 19 15 C 22 15 28 16 28 22 L 28 36 L 10 36 Z" fill="#b45309" />
                    <polygon points="19,16 17,28 19,34 21,28" fill="#fef3c7" />
                    <polygon points="19,18 17.5,24 19,27 20.5,24" fill="#78350f" />
                  </g>
                )}

                {/* 3. Registrar (3:00 / 0°) */}
                {role.id === 'registrar' && (
                  <g transform={`translate(${ix - 22}, ${iy - 17})`} className="pointer-events-none">
                    {/* Left person */}
                    <circle cx="11" cy="9" r="4.5" fill="#db2777" opacity="0.8" />
                    <path d="M 5 22 C 5 18 17 18 17 22 Z" fill="#db2777" opacity="0.8" />
                    {/* Right person */}
                    <circle cx="33" cy="9" r="4.5" fill="#db2777" opacity="0.8" />
                    <path d="M 27 22 C 27 18 39 18 39 22 Z" fill="#db2777" opacity="0.8" />
                    {/* Center person */}
                    <circle cx="22" cy="7" r="5.5" fill="#be185d" />
                    <path d="M 13 23 C 13 17 31 17 31 23 Z" fill="#be185d" />
                  </g>
                )}

                {/* 4. Controller of Examinations (4:30 / 45°) */}
                {role.id === 'coe' && (
                  <g transform={`translate(${ix - 18}, ${iy - 19})`} className="pointer-events-none">
                    <rect x="4" y="4" width="26" height="30" rx="3" fill="#ffffff" stroke="#7c3aed" strokeWidth="2.5" />
                    <line x1="9" y1="11" x2="21" y2="11" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" />
                    <line x1="9" y1="17" x2="21" y2="17" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" />
                    <line x1="9" y1="23" x2="16" y2="23" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="25" cy="27" r="7" fill="#7c3aed" />
                    <path d="M 22 27 L 24 29 L 28 25" stroke="#ffffff" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </g>
                )}

                {/* 5. Finance Officer (6:00 / 90°) */}
                {role.id === 'finance' && (
                  <g transform={`translate(${ix - 20}, ${iy - 20})`} className="pointer-events-none">
                    <circle cx="16" cy="7" r="6" fill="#16a34a" />
                    <path d="M 7 21 C 7 15 25 15 25 21 L 25 34 L 7 34 Z" fill="#15803d" />
                    {/* Rupee coin badge */}
                    <circle cx="28" cy="24" r="8" fill="#16a34a" stroke="#ffffff" strokeWidth="1.5" />
                    <text x="28" y="27.5" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="900" fontFamily="system-ui">
                      ₹
                    </text>
                  </g>
                )}

                {/* 6. HR Manager (7:30 / 135°) */}
                {role.id === 'hr-manager' && (
                  <g transform={`translate(${ix - 22}, ${iy - 17})`} className="pointer-events-none">
                    <circle cx="11" cy="9" r="4.5" fill="#0891b2" opacity="0.8" />
                    <path d="M 5 22 C 5 18 17 18 17 22 Z" fill="#0891b2" opacity="0.8" />
                    <circle cx="33" cy="9" r="4.5" fill="#0891b2" opacity="0.8" />
                    <path d="M 27 22 C 27 18 39 18 39 22 Z" fill="#0891b2" opacity="0.8" />
                    <circle cx="22" cy="7" r="5.5" fill="#0e7490" />
                    <path d="M 13 23 C 13 17 31 17 31 23 Z" fill="#0e7490" />
                  </g>
                )}

                {/* 7. Dean (9:00 / 180°) */}
                {role.id === 'dean' && (
                  <g transform={`translate(${ix - 22}, ${iy - 17})`} className="pointer-events-none">
                    {/* Blue Graduation Cap */}
                    <polygon points="22,6 40,14 22,22 4,14" fill="#2563eb" />
                    <path d="M 12 18 L 12 27 C 12 31 32 31 32 27 L 32 18 Z" fill="#1d4ed8" />
                    <line x1="36" y1="15" x2="36" y2="28" stroke="#f59e0b" strokeWidth="1.8" />
                    <circle cx="36" cy="29" r="2" fill="#d97706" />
                  </g>
                )}

                {/* 8. IQAC Coordinator (10:30 / 225°) */}
                {role.id === 'iqac' && (
                  <g transform={`translate(${ix - 19}, ${iy - 22})`} className="pointer-events-none">
                    {/* Purple Award Rosette Ribbon */}
                    <circle cx="19" cy="16" r="12" fill="#7c3aed" />
                    <circle cx="19" cy="16" r="9.5" fill="#6d28d9" stroke="#ffffff" strokeWidth="1.2" />
                    <path d="M 15 16 L 18 19 L 23 13" stroke="#ffffff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M 13 26 L 10 38 L 17 34 L 19 28 Z" fill="#5b21b6" />
                    <path d="M 25 26 L 28 38 L 21 34 L 19 28 Z" fill="#4c1d95" />
                  </g>
                )}

                {/* ============================================================ */}
                {/* VECTOR ROLE TYPOGRAPHY (Crystal Clear, High-DPI Sharp)      */}
                {/* ============================================================ */}
                {role.id === 'chancellor' && (
                  <text
                    x={tx}
                    y={ty + 6}
                    textAnchor="middle"
                    fill="#0f172a"
                    fontSize="17.5"
                    fontWeight="800"
                    fontFamily="system-ui, -apple-system, sans-serif"
                    className="pointer-events-none tracking-tight drop-shadow-xs"
                  >
                    Chancellor
                  </text>
                )}

                {role.id === 'vice-chancellor' && (
                  <text
                    x={tx}
                    y={ty - 1}
                    textAnchor="middle"
                    fill="#0f172a"
                    fontSize="15"
                    fontWeight="800"
                    fontFamily="system-ui, -apple-system, sans-serif"
                    className="pointer-events-none tracking-tight drop-shadow-xs"
                  >
                    <tspan x={tx} dy="-6">Vice</tspan>
                    <tspan x={tx} dy="16">Chancellor</tspan>
                  </text>
                )}

                {role.id === 'registrar' && (
                  <text
                    x={tx}
                    y={ty + 5}
                    textAnchor="middle"
                    fill="#0f172a"
                    fontSize="17"
                    fontWeight="800"
                    fontFamily="system-ui, -apple-system, sans-serif"
                    className="pointer-events-none tracking-tight drop-shadow-xs"
                  >
                    Registrar
                  </text>
                )}

                {role.id === 'coe' && (
                  <text
                    x={tx}
                    y={ty - 1}
                    textAnchor="middle"
                    fill="#0f172a"
                    fontSize="13.5"
                    fontWeight="800"
                    fontFamily="system-ui, -apple-system, sans-serif"
                    className="pointer-events-none tracking-tight drop-shadow-xs"
                  >
                    <tspan x={tx} dy="-6">Controller of</tspan>
                    <tspan x={tx} dy="15">Examinations</tspan>
                  </text>
                )}

                {role.id === 'finance' && (
                  <text
                    x={tx}
                    y={ty - 1}
                    textAnchor="middle"
                    fill="#0f172a"
                    fontSize="15.5"
                    fontWeight="800"
                    fontFamily="system-ui, -apple-system, sans-serif"
                    className="pointer-events-none tracking-tight drop-shadow-xs"
                  >
                    <tspan x={tx} dy="-6">Finance</tspan>
                    <tspan x={tx} dy="16">Officer</tspan>
                  </text>
                )}

                {role.id === 'hr-manager' && (
                  <text
                    x={tx}
                    y={ty - 1}
                    textAnchor="middle"
                    fill="#0f172a"
                    fontSize="15.5"
                    fontWeight="800"
                    fontFamily="system-ui, -apple-system, sans-serif"
                    className="pointer-events-none tracking-tight drop-shadow-xs"
                  >
                    <tspan x={tx} dy="-6">HR</tspan>
                    <tspan x={tx} dy="16">Manager</tspan>
                  </text>
                )}

                {role.id === 'dean' && (
                  <text
                    x={tx}
                    y={ty + 5}
                    textAnchor="middle"
                    fill="#0f172a"
                    fontSize="18"
                    fontWeight="800"
                    fontFamily="system-ui, -apple-system, sans-serif"
                    className="pointer-events-none tracking-tight drop-shadow-xs"
                  >
                    Dean
                  </text>
                )}

                {role.id === 'iqac' && (
                  <text
                    x={tx}
                    y={ty - 1}
                    textAnchor="middle"
                    fill="#0f172a"
                    fontSize="15"
                    fontWeight="800"
                    fontFamily="system-ui, -apple-system, sans-serif"
                    className="pointer-events-none tracking-tight drop-shadow-xs"
                  >
                    <tspan x={tx} dy="-6">IQAC</tspan>
                    <tspan x={tx} dy="16">Coordinator</tspan>
                  </text>
                )}
              </g>
            );
          })}
        </g>

        {/* ============================================================== */}
        {/* CENTER HUB (High-DPI Razor Sharp Vector Branding)              */}
        {/* ============================================================== */}
        <g filter="url(#hubShadow)">
          {/* Outer Golden Gradient Ring */}
          <circle
            cx={cx}
            cy={cy}
            r={rIn - 2}
            fill="#ffffff"
            stroke="url(#centerGoldRing)"
            strokeWidth="5"
          />

          {/* Inner Accent Ring */}
          <circle
            cx={cx}
            cy={cy}
            r={rIn - 7}
            fill="#ffffff"
            stroke="rgba(245, 158, 11, 0.25)"
            strokeWidth="1.5"
          />

          {/* Academic Mortarboard Cap Graphic */}
          <g transform={`translate(${cx - 24}, ${cy - 82})`}>
            {/* Red Diamond Top */}
            <polygon points="24,6 46,15 24,24 2,15" fill="#dc2626" />
            <path d="M 12 19 L 12 28 C 12 33 36 33 36 28 L 36 19 Z" fill="#b91c1c" />
            {/* Yellow Tassel */}
            <path d="M 42 16 L 43 28" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
            <circle cx="43" cy="29" r="2.5" fill="#d97706" />
          </g>

          {/* Title: University */}
          <text
            x={cx}
            y={cy - 34}
            textAnchor="middle"
            fill="#1e1b4b"
            fontSize="23"
            fontWeight="900"
            fontFamily="system-ui, -apple-system, sans-serif"
            className="tracking-tight"
          >
            University
          </text>

          {/* Title: ERP */}
          <text
            x={cx}
            y={cy + 1}
            textAnchor="middle"
            fill="#7e22ce"
            fontSize="34"
            fontWeight="950"
            fontFamily="system-ui, -apple-system, sans-serif"
            className="tracking-wider"
          >
            ERP
          </text>

          {/* Pill Badge: Select Your Role */}
          <g transform={`translate(${cx - 62}, ${cy + 15})`}>
            <rect
              x="0"
              y="0"
              width="124"
              height="24"
              rx="12"
              fill="url(#purplePillGrad)"
              filter="drop-shadow(0 2px 4px rgba(126, 34, 206, 0.3))"
            />
            <text
              x="62"
              y="16"
              textAnchor="middle"
              fill="#ffffff"
              fontSize="11.5"
              fontWeight="800"
              fontFamily="system-ui, -apple-system, sans-serif"
              letterSpacing="0.3"
            >
              Select Your Role
            </text>
          </g>

          {/* University Building Silhouette */}
          <g transform={`translate(${cx - 25}, ${cy + 46})`} fill="#7e22ce">
            {/* Center pediment & columns */}
            <polygon points="25,2 14,8 36,8" />
            <rect x="15" y="9" width="20" height="13" />
            {/* Side wings */}
            <rect x="2" y="12" width="11" height="10" />
            <rect x="37" y="12" width="11" height="10" />
            {/* Windows cutouts */}
            <rect x="18" y="12" width="3" height="4" fill="#ffffff" />
            <rect x="29" y="12" width="3" height="4" fill="#ffffff" />
            <rect x="6" y="15" width="3" height="4" fill="#ffffff" />
            <rect x="41" y="15" width="3" height="4" fill="#ffffff" />
            {/* Door arch */}
            <path d="M 23 22 L 23 17 A 2 2 0 0 1 27 17 L 27 22 Z" fill="#ffffff" />
            {/* Base foundation line */}
            <rect x="0" y="22" width="50" height="2" rx="0.5" />
          </g>
        </g>
      </svg>
    </div>
  );
};
