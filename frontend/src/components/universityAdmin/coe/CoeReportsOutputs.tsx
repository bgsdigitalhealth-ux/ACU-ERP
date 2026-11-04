import React from 'react';
import { BarChart3, FileText, Calendar, Users, TrendingUp } from 'lucide-react';
import { useUniversityAdmin } from '../../../context/UniversityAdminContext';

export const CoeReportsOutputs: React.FC = () => {
  const { setToast } = useUniversityAdmin();

  const reports = [
    {
      id: 'rep-examiner',
      title: 'Examiner Allocation Report',
      icon: FileText,
      color: 'text-purple-700',
      bg: 'bg-purple-50',
      border: 'border-purple-200'
    },
    {
      id: 'rep-sched',
      title: 'Practical Schedule',
      icon: Calendar,
      color: 'text-blue-700',
      bg: 'bg-blue-50',
      border: 'border-blue-200'
    },
    {
      id: 'rep-marks',
      title: 'Marks Entry Status',
      icon: Users,
      color: 'text-cyan-700',
      bg: 'bg-cyan-50',
      border: 'border-cyan-200'
    },
    {
      id: 'rep-perf',
      title: 'Subject-wise Performance',
      icon: TrendingUp,
      color: 'text-amber-700',
      bg: 'bg-amber-50',
      border: 'border-amber-200'
    }
  ];

  return (
    <div className="w-full bg-white rounded-2xl border border-purple-200/90 shadow-2xs overflow-hidden flex flex-col justify-between select-none">
      {/* Header Bar */}
      <div className="bg-gradient-to-r from-[#440d75] to-[#2d0850] text-white px-4 sm:px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-amber-300" />
          <h3 className="font-extrabold text-sm sm:text-base tracking-tight text-white">
            Reports & Outputs
          </h3>
        </div>
        <span className="text-[11px] text-purple-200 font-medium bg-purple-900/60 px-2.5 py-0.5 rounded-full border border-purple-400/30">
          Downloads
        </span>
      </div>

      {/* 4 Cards Grid */}
      <div className="p-3 sm:p-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {reports.map((rep) => {
          const Icon = rep.icon;
          return (
            <button
              key={rep.id}
              onClick={() => setToast(`Generating PDF report: ${rep.title}`)}
              className={`p-3.5 ${rep.bg} ${rep.border} border rounded-2xl flex flex-col items-center justify-center text-center gap-2 hover:shadow-md hover:scale-102 transition-all cursor-pointer group`}
            >
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-2xs group-hover:scale-110 transition-transform">
                <Icon className={`w-5 h-5 ${rep.color} stroke-[2.2]`} />
              </div>
              <span className="text-xs font-bold text-gray-800 leading-tight">
                {rep.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

