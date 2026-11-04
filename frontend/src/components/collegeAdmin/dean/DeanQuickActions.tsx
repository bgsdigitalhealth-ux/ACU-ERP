import React from 'react';
import {
  Zap,
  CalendarPlus,
  UserPlus,
  ArrowLeftRight,
  CheckSquare,
  Package,
  Activity
} from 'lucide-react';
import { useCollegeAdmin } from '../../../context/CollegeAdminContext';

export const DeanQuickActions: React.FC = () => {
  const { setActiveDeanModal } = useCollegeAdmin();

  const actions = [
    {
      id: 'session',
      label: 'Create Exam Session',
      icon: CalendarPlus,
      bg: 'bg-[#f5eeff]',
      border: 'border-[#e9d5ff]',
      color: 'text-[#7e22ce]',
      onClick: () => setActiveDeanModal('session')
    },
    {
      id: 'invigilators',
      label: 'Allocate Invigilators',
      icon: UserPlus,
      bg: 'bg-[#e0f2fe]',
      border: 'border-[#bae6fd]',
      color: 'text-[#0284c7]',
      onClick: () => setActiveDeanModal('invigilators')
    },
    {
      id: 'substitute',
      label: 'Manage Substitute / Reliever',
      icon: ArrowLeftRight,
      bg: 'bg-[#fff7ed]',
      border: 'border-[#ffedd5]',
      color: 'text-[#ea580c]',
      onClick: () => setActiveDeanModal('substitute')
    },
    {
      id: 'readiness',
      label: 'Check Hall Readiness',
      icon: CheckSquare,
      bg: 'bg-[#ecfdf5]',
      border: 'border-[#d1fae5]',
      color: 'text-[#059669]',
      onClick: () => setActiveDeanModal('readiness')
    },
    {
      id: 'materials',
      label: 'Material Issue & Receipt',
      icon: Package,
      bg: 'bg-[#fdf2f8]',
      border: 'border-[#fce7f3]',
      color: 'text-[#db2777]',
      onClick: () => setActiveDeanModal('materials')
    },
    {
      id: 'monitoring',
      label: 'Live Exam Monitoring',
      icon: Activity,
      bg: 'bg-[#f5f3ff]',
      border: 'border-[#ede9fe]',
      color: 'text-[#7c3aed]',
      onClick: () => setActiveDeanModal('monitoring')
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
          Dean Exam Command
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
              <span className="text-xs font-bold text-gray-800 leading-tight">
                {act.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

