import React from 'react';
import {
  Zap,
  Inbox,
  Users,
  FlaskConical,
  Database,
  Lock,
  BarChart2,
  Megaphone,
  RotateCcw
} from 'lucide-react';
import { useUniversityAdmin } from '../../../context/UniversityAdminContext';

export const RegistrarQuickActions: React.FC = () => {
  const { setActiveRegistrarModal } = useUniversityAdmin();

  const actions = [
    {
      id: 'receive-scripts',
      label: 'Receive & Register Scripts',
      icon: Inbox,
      bg: 'bg-[#f5eeff]',
      border: 'border-[#e9d5ff]',
      color: 'text-[#7e22ce]',
      onClick: () => setActiveRegistrarModal('receive-scripts')
    },
    {
      id: 'allocate-eval',
      label: 'Allocate Evaluators',
      icon: Users,
      bg: 'bg-[#e0f2fe]',
      border: 'border-[#bae6fd]',
      color: 'text-[#0284c7]',
      onClick: () => setActiveRegistrarModal('allocate-eval')
    },
    {
      id: 'practical-marks',
      label: 'Enter / Import Practical Marks',
      icon: FlaskConical,
      bg: 'bg-[#fff7ed]',
      border: 'border-[#ffedd5]',
      color: 'text-[#ea580c]',
      onClick: () => setActiveRegistrarModal('practical-marks')
    },
    {
      id: 'ia-marks',
      label: 'Consolidate IA Marks',
      icon: Database,
      bg: 'bg-[#ecfdf5]',
      border: 'border-[#d1fae5]',
      color: 'text-[#059669]',
      onClick: () => setActiveRegistrarModal('ia-marks')
    },
    {
      id: 'lock-marks',
      label: 'Verify & Lock Marks',
      icon: Lock,
      bg: 'bg-[#fdf2f8]',
      border: 'border-[#fce7f3]',
      color: 'text-[#db2777]',
      onClick: () => setActiveRegistrarModal('lock-marks')
    },
    {
      id: 'process-results',
      label: 'Process Results',
      icon: BarChart2,
      bg: 'bg-[#eff6ff]',
      border: 'border-[#dbeafe]',
      color: 'text-[#2563eb]',
      onClick: () => setActiveRegistrarModal('process-results')
    },
    {
      id: 'publish-results',
      label: 'Publish Results',
      icon: Megaphone,
      bg: 'bg-[#fef2f2]',
      border: 'border-[#fee2e2]',
      color: 'text-[#dc2626]',
      onClick: () => setActiveRegistrarModal('publish-results')
    },
    {
      id: 'handle-reval',
      label: 'Handle Revaluation',
      icon: RotateCcw,
      bg: 'bg-[#f0fdfa]',
      border: 'border-[#ccfbf1]',
      color: 'text-[#0d9488]',
      onClick: () => setActiveRegistrarModal('reval')
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
          Valuation Centre Operations
        </span>
      </div>

      {/* 8 Actions Grid */}
      <div className="p-3 sm:p-4 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <button
              key={act.id}
              onClick={act.onClick}
              className={`p-3 ${act.bg} ${act.border} border rounded-2xl flex flex-col items-center justify-center text-center gap-2 hover:shadow-md hover:scale-102 transition-all cursor-pointer group`}
            >
              <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shadow-2xs group-hover:scale-110 transition-transform">
                <Icon className={`w-4.5 h-4.5 ${act.color} stroke-[2.2]`} />
              </div>
              <span className="text-[11px] font-bold text-gray-800 leading-tight">
                {act.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

