import React from 'react';
import { BarChart3, FileText, BarChart2, GraduationCap, Award } from 'lucide-react';
import { useChancellor } from '../../context/ChancellorContext';
import { QUICK_REPORTS_LIST } from '../../data/chancellorData';
import { QuickReportConfig } from '../../types/chancellor';

export const QuickReportsSection: React.FC = () => {
  const { setActiveReportModal } = useChancellor();

  const getReportIcon = (type: QuickReportConfig['iconType']) => {
    switch (type) {
      case 'annual':
        return {
          icon: FileText,
          bg: 'bg-[#fdf2f8]',
          border: 'border-[#fce7f3]',
          color: 'text-rose-600'
        };
      case 'college':
        return {
          icon: BarChart2,
          bg: 'bg-[#f5eeff]',
          border: 'border-[#e9d5ff]',
          color: 'text-purple-700'
        };
      case 'programme':
        return {
          icon: GraduationCap,
          bg: 'bg-[#e0f2fe]',
          border: 'border-[#bae6fd]',
          color: 'text-sky-700'
        };
      case 'accreditation':
      default:
        return {
          icon: Award,
          bg: 'bg-[#f3e8ff]',
          border: 'border-[#e9d5ff]',
          color: 'text-purple-800'
        };
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-purple-200/90 shadow-xs overflow-hidden flex flex-col justify-between">
      {/* Header Bar */}
      <div className="bg-gradient-to-r from-[#440d75] to-[#2d0850] text-white px-4 sm:px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <BarChart3 className="w-5 h-5 text-amber-300" />
          <h3 className="font-extrabold text-sm sm:text-base tracking-tight text-white">
            Quick Reports
          </h3>
        </div>
        <span className="text-[11px] text-purple-200 font-medium bg-purple-900/60 px-2 py-0.5 rounded-full border border-purple-400/30">
          Executive Export
        </span>
      </div>

      {/* 4 Cards in Row */}
      <div className="p-3 sm:p-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {QUICK_REPORTS_LIST.map((rep) => {
          const visual = getReportIcon(rep.iconType);
          const Icon = visual.icon;

          return (
            <button
              key={rep.id}
              onClick={() => setActiveReportModal(rep)}
              className="p-3 bg-[#fcfaff] rounded-xl border border-purple-100/90 hover:border-purple-300 hover:bg-purple-50/60 transition-all flex flex-col items-center text-center group cursor-pointer shadow-2xs"
            >
              <div
                className={`w-11 h-11 rounded-xl ${visual.bg} ${visual.border} border flex items-center justify-center shrink-0 mb-2 group-hover:scale-105 transition-transform shadow-xs`}
              >
                <Icon className={`w-5 h-5 ${visual.color} stroke-[2.2]`} />
              </div>

              <span className="text-xs font-bold text-[#1e1b4b] leading-snug line-clamp-2 group-hover:text-purple-900 transition-colors">
                {rep.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

