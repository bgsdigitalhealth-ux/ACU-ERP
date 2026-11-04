import React from 'react';
import { Calendar, Users, Check, FileEdit, Hourglass } from 'lucide-react';
import { useHod } from '../../context/HodContext';

export const HodKpiCards: React.FC = () => {
  const { kpis, setActiveQuickModal } = useHod();

  const cards = [
    {
      id: 'kpi-exams',
      value: kpis.examsInvolved,
      title: 'Exams',
      subtitle: '(Dept. Involved)',
      icon: Calendar,
      iconBg: 'bg-[#9333ea]',
      iconColor: 'text-white',
      border: 'border-purple-200',
      action: () => setActiveQuickModal('schedule')
    },
    {
      id: 'kpi-examiners',
      value: kpis.examinersNominated,
      title: 'Examiners',
      subtitle: 'Nominated',
      icon: Users,
      iconBg: 'bg-[#0284c7]',
      iconColor: 'text-white',
      border: 'border-sky-200',
      action: () => setActiveQuickModal('nominate')
    },
    {
      id: 'kpi-reviewed',
      value: kpis.questionPapersReviewed,
      title: 'Question Papers',
      subtitle: 'Reviewed',
      icon: Check,
      iconBg: 'bg-[#16a34a]',
      iconColor: 'text-white',
      border: 'border-emerald-200',
      action: () => setActiveQuickModal('review')
    },
    {
      id: 'kpi-marks',
      value: kpis.marksSubmitted,
      title: 'Marks',
      subtitle: 'Submitted',
      icon: FileEdit,
      iconBg: 'bg-[#ea580c]',
      iconColor: 'text-white',
      border: 'border-orange-200',
      action: () => setActiveQuickModal('upload')
    },
    {
      id: 'kpi-pending',
      value: kpis.pendingApprovals,
      title: 'Pending',
      subtitle: 'Approvals',
      icon: Hourglass,
      iconBg: 'bg-[#7c3aed]',
      iconColor: 'text-white',
      border: 'border-violet-200',
      action: () => {}
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4 select-none">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            onClick={card.action}
            className={`bg-white rounded-2xl p-4 sm:p-4.5 border ${card.border} shadow-2xs hover:shadow-md transition-all flex items-center gap-3.5 group cursor-pointer`}
          >
            {/* Round Icon */}
            <div
              className={`w-12 h-12 rounded-full ${card.iconBg} flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform`}
            >
              <Icon className={`w-6 h-6 ${card.iconColor} stroke-[2.5]`} />
            </div>

            {/* Numbers & Labels */}
            <div className="min-w-0">
              <h3 className="text-2xl sm:text-[28px] font-extrabold text-[#1e1b4b] tracking-tight leading-none">
                {card.value}
              </h3>
              <p className="text-xs font-bold text-gray-800 mt-1 leading-tight truncate">
                {card.title}
              </p>
              <p className="text-[11px] font-medium text-gray-500 leading-none">
                {card.subtitle}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

