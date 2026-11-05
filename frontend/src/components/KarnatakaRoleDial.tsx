import React, { useState } from 'react';
import { RoleInfo } from '../types/auth';

export interface KarnatakaDialRole extends RoleInfo {
  angleDeg: number;
}

export const KARNATAKA_8_ROLES: KarnatakaDialRole[] = [
  {
    id: 'principal',
    title: 'Principal',
    subtitle: 'Apex institutional governance & college leadership',
    iconName: 'UserCheck',
    color: '#e11d48',
    bgLight: '#ffe4e6',
    borderColor: '#f43f5e',
    defaultEmail: 'principal@acu.edu.in',
    angle: 270,
    angleDeg: 270 // 12:00 Top
  },
  {
    id: 'vice-principal',
    title: 'Vice Principal',
    subtitle: 'Academic supervision & institutional management',
    iconName: 'Award',
    color: '#ea580c',
    bgLight: '#ffedd5',
    borderColor: '#fb923c',
    defaultEmail: 'vp@acu.edu.in',
    angle: 315,
    angleDeg: 315 // 1:30 Top-Right
  },
  {
    id: 'hr-manager',
    title: 'HR Manager',
    subtitle: 'Personnel governance & staff administrative roster',
    iconName: 'Users',
    color: '#db2777',
    bgLight: '#fce7f3',
    borderColor: '#ec4899',
    defaultEmail: 'hr.admin@acu.edu.in',
    angle: 0,
    angleDeg: 0 // 3:00 Right
  },
  {
    id: 'finance',
    title: 'Finance Officer',
    subtitle: 'Treasury funds, fee reconciliation & financial audits',
    iconName: 'Coins',
    color: '#7c3aed',
    bgLight: '#ede9fe',
    borderColor: '#8b5cf6',
    defaultEmail: 'finance@acu.edu.in',
    angle: 45,
    angleDeg: 45 // 4:30 Bottom-Right
  },
  {
    id: 'hod',
    title: 'HOD (Head of Department)',
    subtitle: 'Curriculum delivery, faculty workload & student marks',
    iconName: 'Network',
    color: '#16a34a',
    bgLight: '#dcfce7',
    borderColor: '#22c55e',
    defaultEmail: 'hod.physiology@acu.edu.in',
    angle: 90,
    angleDeg: 90 // 6:00 Bottom
  },
  {
    id: 'faculty',
    title: 'Faculty / Teaching Staff',
    subtitle: 'Assessments, attendance, internal marks & classes',
    iconName: 'GraduationCap',
    color: '#0891b2',
    bgLight: '#cffafe',
    borderColor: '#22d3ee',
    defaultEmail: 'faculty.medicine@acu.edu.in',
    angle: 135,
    angleDeg: 135 // 7:30 Bottom-Left
  },
  {
    id: 'exam-coordinator',
    title: 'Examination Coordinator',
    subtitle: 'Examination schedules, QP papers & room allocation',
    iconName: 'FileCheck',
    color: '#2563eb',
    bgLight: '#dbeafe',
    borderColor: '#60a5fa',
    defaultEmail: 'coe@acu.edu.in',
    angle: 180,
    angleDeg: 180 // 9:00 Left
  },
  {
    id: 'librarian',
    title: 'Librarian',
    subtitle: 'Digital catalog, textbook issuance & research access',
    iconName: 'BookOpen',
    color: '#4338ca',
    bgLight: '#e0e7ff',
    borderColor: '#6366f1',
    defaultEmail: 'library@acu.edu.in',
    angle: 225,
    angleDeg: 225 // 10:30 Top-Left
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

  // Center coordinate of 600x600 SVG viewBox
  const cx = 300;
  const cy = 300;
  const rIn = 120;  // Inner hub radius
  const rOut = 285; // Outer petal radius

  // Sector path generator for 45-degree petals (8 petals)
  const getSectorPath = (angleCenterDeg: number) => {
    const halfAngle = 22.5; // 45 / 2
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
    <div className="relative w-[340px] h-[340px] sm:w-[460px] sm:h-[460px] md:w-[520px] md:h-[520px] lg:w-[540px] lg:h-[540px] flex items-center justify-center select-none">
      {/* 
        High-Resolution Image 3: Karnataka Higher Education ERP Role Dial Artwork 
        Rendered cleanly inside circular container with soft ambient glow
      */}
      <div className="absolute inset-0 rounded-full overflow-hidden shadow-2xl border-4 border-white/80 bg-white/60 backdrop-blur-md">
        <img
          src="/karnataka-role-dial.png"
          alt="Karnataka Higher Education ERP Role Based Login"
          className="w-full h-full object-contain pointer-events-none"
        />
      </div>

      {/* Interactive Clickable SVG Sectors Overlay matching the 8 Petals */}
      <svg
        viewBox="0 0 600 600"
        className="absolute inset-0 w-full h-full z-20 cursor-pointer pointer-events-auto"
      >
        <defs>
          <filter id="petalGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#8b0029" floodOpacity="0.45" />
          </filter>
        </defs>

        {KARNATAKA_8_ROLES.map((role) => {
          const isSelected = selectedRoleId === role.id;
          const isHovered = hoveredRoleId === role.id;
          const pathD = getSectorPath(role.angleDeg);

          return (
            <path
              key={role.id}
              d={pathD}
              onClick={() => onSelectRole(role)}
              onMouseEnter={() => setHoveredRoleId(role.id)}
              onMouseLeave={() => setHoveredRoleId(null)}
              className="transition-all duration-200 cursor-pointer"
              fill={
                isSelected
                  ? 'rgba(139, 0, 41, 0.22)'
                  : isHovered
                  ? 'rgba(139, 0, 41, 0.12)'
                  : 'rgba(0, 0, 0, 0.001)'
              }
              stroke={
                isSelected
                  ? '#8b0029'
                  : isHovered
                  ? 'rgba(139, 0, 41, 0.6)'
                  : 'transparent'
              }
              strokeWidth={isSelected ? 4 : isHovered ? 2.5 : 0}
              strokeDasharray={isSelected ? 'none' : 'none'}
              filter={isSelected ? 'url(#petalGlow)' : undefined}
            >
              <title>{role.title} – Click to login</title>
            </path>
          );
        })}

        {/* Center Hub click handler (deselects or prompts) */}
        <circle
          cx={cx}
          cy={cy}
          r={rIn - 5}
          fill="transparent"
          className="cursor-default"
        />
      </svg>
    </div>
  );
};

