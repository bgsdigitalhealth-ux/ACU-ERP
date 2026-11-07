import React from 'react';
import { GraduationCap, Users, ClipboardCheck, TrendingUp, Award } from 'lucide-react';
import { useUniversityAdmin } from '../../../context/UniversityAdminContext';

export const VcKpis: React.FC = () => {
  const { vcKpis } = useUniversityAdmin();

  const cards = [
    {
      id: 'colleges',
      value: vcKpis.constituentColleges,
      label: 'Constituent Colleges',
      icon: GraduationCap,
      iconBg: 'bg-[#8A2BE2]',
      cardBg: 'bg-white',
      borderColor: 'border-purple-200/90'
    },
    {
      id: 'students',
      value: vcKpis.studentsRegistered.toLocaleString('en-IN'),
      label: 'Students Registered',
      icon: Users,
      iconBg: 'bg-[#00B4D8]',
      cardBg: 'bg-white',
      borderColor: 'border-cyan-200/90'
    },
    {
      id: 'exams',
      value: vcKpis.totalExams,
      label: 'Exams (Theory + Practical)',
      icon: ClipboardCheck,
      iconBg: 'bg-[#10B981]',
      cardBg: 'bg-white',
      borderColor: 'border-emerald-200/90'
    },
    {
      id: 'passRate',
      value: `${vcKpis.overallPassPercentage}%`,
      label: 'Overall Pass Percentage',
      icon: TrendingUp,
      iconBg: 'bg-[#F97316]',
      cardBg: 'bg-white',
      borderColor: 'border-amber-200/90'
    },
    {
      id: 'pending',
      value: vcKpis.pendingApprovals,
      label: 'Items Pending Approval',
      icon: Award,
      iconBg: 'bg-[#7900B8]',
      cardBg: 'bg-white',
      borderColor: 'border-purple-200/90'
    }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 select-none">
      {cards.map((c) => {
        const Icon = c.icon;
        return (
          <div
            key={c.id}
            className={`${c.cardBg} ${c.borderColor} border rounded-2xl p-4 shadow-2xs flex items-center gap-3.5 hover:shadow-md transition-all group`}
          >
            <div className={`w-12 h-12 rounded-2xl ${c.iconBg} text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform`}>
              <Icon className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div className="min-w-0">
              <span className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight leading-none block">
                {c.value}
              </span>
              <p className="text-[11px] font-semibold text-gray-600 mt-1 leading-tight line-clamp-2">
                {c.label}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

