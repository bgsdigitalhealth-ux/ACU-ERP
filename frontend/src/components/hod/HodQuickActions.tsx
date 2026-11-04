import React from 'react';
import {
  Zap,
  UserPlus,
  CalendarPlus,
  FileSearch,
  UploadCloud,
  FlaskConical,
  BarChart3
} from 'lucide-react';
import { useHod } from '../../context/HodContext';

export const HodQuickActions: React.FC = () => {
  const { setActiveQuickModal } = useHod();

  const actions = [
    {
      id: 'nominate',
      label: 'Nominate Examiners',
      icon: UserPlus,
      bg: 'bg-[#f5eeff]',
      border: 'border-[#e9d5ff]',
      color: 'text-[#7e22ce]',
      onClick: () => setActiveQuickModal('nominate')
    },
    {
      id: 'schedule',
      label: 'Propose Exam Schedule',
      icon: CalendarPlus,
      bg: 'bg-[#e0f2fe]',
      border: 'border-[#bae6fd]',
      color: 'text-[#0284c7]',
      onClick: () => setActiveQuickModal('schedule')
    },
    {
      id: 'review',
      label: 'Review Question Paper',
      icon: FileSearch,
      bg: 'bg-[#fff7ed]',
      border: 'border-[#ffedd5]',
      color: 'text-[#ea580c]',
      onClick: () => setActiveQuickModal('review')
    },
    {
      id: 'upload',
      label: 'Upload / Verify Marks',
      icon: UploadCloud,
      bg: 'bg-[#ecfdf5]',
      border: 'border-[#d1fae5]',
      color: 'text-[#059669]',
      onClick: () => setActiveQuickModal('upload')
    },
    {
      id: 'practical',
      label: 'Practical / Viva Details',
      icon: FlaskConical,
      bg: 'bg-[#fdf2f8]',
      border: 'border-[#fce7f3]',
      color: 'text-[#db2777]',
      onClick: () => setActiveQuickModal('practical')
    },
    {
      id: 'report',
      label: 'View Department Report',
      icon: BarChart3,
      bg: 'bg-[#f0f9ff]',
      border: 'border-[#e0f2fe]',
      color: 'text-[#0284c7]',
      onClick: () => setActiveQuickModal('report')
    }
  ];

  return (
    <div className="w-full bg-white rounded-2xl border border-purple-200/90 shadow-2xs overflow-hidden flex flex-col justify-between select-none">
      {/* Header Bar */}
      <div className="bg-gradient-to-r from-[#440d75] to-[#2d0850] text-white px-4 sm:px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-300" />
          <h3 className="font-extrabold text-sm sm:text-base tracking-tight text-white">
            Quick Actions
          </h3>
        </div>
        <span className="text-[11px] text-purple-200 font-medium bg-purple-900/60 px-2.5 py-0.5 rounded-full border border-purple-400/30">
          Operational Shortcuts
        </span>
      </div>

      {/* 6 Actions Grid */}
      <div className="p-3 sm:p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <button
              key={act.id}
              onClick={act.onClick}
              className={`p-3.5 ${act.bg} ${act.border} border rounded-2xl flex flex-col items-center justify-center text-center gap-2 hover:shadow-md hover:scale-102 transition-all cursor-pointer group`}
            >
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-2xs group-hover:scale-110 transition-transform">
                <Icon className={`w-5 h-5 ${act.color} stroke-[2.2]`} />
              </div>
              <span className="text-xs font-extrabold text-[#1e1b4b] leading-tight group-hover:text-purple-900 transition-colors">
                {act.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

