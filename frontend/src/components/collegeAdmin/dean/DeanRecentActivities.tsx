import React from 'react';
import { History, CheckCircle, ClipboardCheck, Package, PlayCircle } from 'lucide-react';
import { useCollegeAdmin } from '../../../context/CollegeAdminContext';
import { DeanActivityItem } from '../../../types/collegeAdmin';

export const DeanRecentActivities: React.FC = () => {
  const { deanActivities } = useCollegeAdmin();

  const getActivityIcon = (type: DeanActivityItem['type']) => {
    switch (type) {
      case 'finalised':
        return <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />;
      case 'verified':
        return <ClipboardCheck className="w-4 h-4 text-blue-600 shrink-0" />;
      case 'issued':
        return <Package className="w-4 h-4 text-amber-600 shrink-0" />;
      case 'progress':
      default:
        return <PlayCircle className="w-4 h-4 text-purple-600 shrink-0" />;
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-purple-200/90 shadow-2xs overflow-hidden flex flex-col justify-between select-none">
      {/* Header Bar */}
      <div className="bg-gradient-to-r from-[#440d75] to-[#2d0850] text-white px-4 sm:px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-amber-300" />
          <h3 className="font-extrabold text-sm sm:text-base tracking-tight text-white">
            Recent Activities
          </h3>
        </div>
        <span className="text-[11px] text-purple-200 font-medium bg-purple-900/60 px-2 py-0.5 rounded-full border border-purple-400/30">
          Superintendence Log
        </span>
      </div>

      {/* Feed List */}
      <div className="p-4 space-y-3">
        {deanActivities.map((act) => (
          <div
            key={act.id}
            className="flex items-center justify-between gap-3 p-2.5 rounded-xl border border-gray-100 hover:border-purple-200 hover:bg-purple-50/40 transition-colors text-xs"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 border border-gray-200">
                {getActivityIcon(act.type)}
              </div>
              <span className="font-bold text-gray-800 truncate">{act.text}</span>
            </div>
            <span className="text-[10px] text-gray-400 font-semibold whitespace-nowrap">
              {act.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

