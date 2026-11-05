import React, { useState } from 'react';
import { RoleInfo } from '../types/auth';

export interface KarnatakaCollegeRole extends RoleInfo {
  x: number;
  y: number;
  radius: number;
}

export const KARNATAKA_COLLEGE_ROLES: KarnatakaCollegeRole[] = [
  {
    id: 'principal',
    title: 'Principal',
    subtitle: 'Apex institutional governance & college leadership',
    iconName: 'UserCheck',
    color: '#e11d48',
    bgLight: '#ffe4e6',
    borderColor: '#f43f5e',
    defaultEmail: 'principal@bgs.edu.in',
    angle: 270,
    x: 512,
    y: 124,
    radius: 96
  },
  {
    id: 'vice-principal',
    title: 'Vice Principal',
    subtitle: 'Academic supervision & institutional management',
    iconName: 'Award',
    color: '#d97706',
    bgLight: '#fef3c7',
    borderColor: '#f59e0b',
    defaultEmail: 'vp@bgs.edu.in',
    angle: 306,
    x: 740,
    y: 198,
    radius: 96
  },
  {
    id: 'hr-manager',
    title: 'HR Manager',
    subtitle: 'College personnel, staff roster & administrative HR',
    iconName: 'Users',
    color: '#db2777',
    bgLight: '#fce7f3',
    borderColor: '#ec4899',
    defaultEmail: 'hr.college@bgs.edu.in',
    angle: 342,
    x: 881,
    y: 392,
    radius: 96
  },
  {
    id: 'finance',
    title: 'Finance Officer',
    subtitle: 'College treasury, tuition fees & financial audits',
    iconName: 'Coins',
    color: '#7c3aed',
    bgLight: '#ede9fe',
    borderColor: '#8b5cf6',
    defaultEmail: 'finance.college@bgs.edu.in',
    angle: 18,
    x: 881,
    y: 632,
    radius: 96
  },
  {
    id: 'hod',
    title: 'HOD (Head of Department)',
    subtitle: 'Curriculum delivery, faculty workload & student marks',
    iconName: 'Network',
    color: '#16a34a',
    bgLight: '#dcfce7',
    borderColor: '#22c55e',
    defaultEmail: 'hod.physiology@bgs.edu.in',
    angle: 54,
    x: 740,
    y: 826,
    radius: 96
  },
  {
    id: 'faculty',
    title: 'Faculty / Teaching Staff',
    subtitle: 'Assessments, attendance, internal marks & classes',
    iconName: 'GraduationCap',
    color: '#15803d',
    bgLight: '#dcfce7',
    borderColor: '#16a34a',
    defaultEmail: 'faculty.medicine@bgs.edu.in',
    angle: 90,
    x: 512,
    y: 900,
    radius: 96
  },
  {
    id: 'exam-coordinator',
    title: 'Examination Coordinator',
    subtitle: 'Internal test scheduling, QP papers & room allocation',
    iconName: 'FileCheck',
    color: '#0284c7',
    bgLight: '#e0f2fe',
    borderColor: '#0ea5e9',
    defaultEmail: 'exam.coord@bgs.edu.in',
    angle: 126,
    x: 284,
    y: 826,
    radius: 96
  },
  {
    id: 'librarian',
    title: 'Librarian',
    subtitle: 'Digital catalog, textbook issuance & research access',
    iconName: 'BookOpen',
    color: '#4338ca',
    bgLight: '#e0e7ff',
    borderColor: '#6366f1',
    defaultEmail: 'library@bgs.edu.in',
    angle: 162,
    x: 143,
    y: 632,
    radius: 96
  },
  {
    id: 'student',
    title: 'Student',
    subtitle: 'Attendance tracking, online assessments & exam results',
    iconName: 'User',
    color: '#059669',
    bgLight: '#d1fae5',
    borderColor: '#10b981',
    defaultEmail: 'student.mbbs@bgs.edu.in',
    angle: 198,
    x: 143,
    y: 392,
    radius: 96
  },
  {
    id: 'parent',
    title: 'Parent / Guardian',
    subtitle: 'Student attendance reports, fee dues & academic notices',
    iconName: 'HeartHandshake',
    color: '#2563eb',
    bgLight: '#dbeafe',
    borderColor: '#3b82f6',
    defaultEmail: 'parent@bgs.edu.in',
    angle: 234,
    x: 284,
    y: 198,
    radius: 96
  }
];

interface KarnatakaCollegeRoleDialProps {
  selectedRoleId: string | null;
  onSelectRole: (role: RoleInfo) => void;
}

export const KarnatakaCollegeRoleDial: React.FC<KarnatakaCollegeRoleDialProps> = ({
  selectedRoleId,
  onSelectRole
}) => {
  const [hoveredRoleId, setHoveredRoleId] = useState<string | null>(null);

  return (
    <div className="relative w-[340px] h-[340px] sm:w-[460px] sm:h-[460px] md:w-[520px] md:h-[520px] lg:w-[540px] lg:h-[540px] flex items-center justify-center select-none">
      {/* 
        High-Resolution College Role Dial Artwork (Karnataka Higher Education ERP - 10 Roles)
      */}
      <div className="absolute inset-0 rounded-full overflow-hidden shadow-2xl border-4 border-white/85 bg-white">
        <img
          src="/karnataka-college-dial.jpg"
          alt="Karnataka Higher Education ERP - College Role Based Login"
          className="w-full h-full object-contain pointer-events-none"
        />
      </div>

      {/* Interactive Clickable SVG Overlay for the 10 Satellite Role Circles */}
      <svg
        viewBox="0 0 1024 1024"
        className="absolute inset-0 w-full h-full z-20 cursor-pointer pointer-events-auto"
      >
        <defs>
          <filter id="collegeCircleGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="12" floodColor="#8b0029" floodOpacity="0.55" />
          </filter>
        </defs>

        {KARNATAKA_COLLEGE_ROLES.map((role) => {
          const isSelected = selectedRoleId === role.id;
          const isHovered = hoveredRoleId === role.id;

          return (
            <circle
              key={role.id}
              cx={role.x}
              cy={role.y}
              r={role.radius}
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
                  ? 'rgba(139, 0, 41, 0.7)'
                  : 'transparent'
              }
              strokeWidth={isSelected ? 6 : isHovered ? 4 : 0}
              filter={isSelected ? 'url(#collegeCircleGlow)' : undefined}
            >
              <title>{role.title} – Click to login</title>
            </circle>
          );
        })}
      </svg>
    </div>
  );
};
