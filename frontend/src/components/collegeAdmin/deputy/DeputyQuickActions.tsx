import React from 'react';
import { Zap, UserPlus, CalendarPlus, ArrowLeftRight, ClipboardCheck } from 'lucide-react';
import { useCollegeAdmin } from '../../../context/CollegeAdminContext';

export const DeputyQuickActions: React.FC = () => {
  const { setActiveDeputyModal } = useCollegeAdmin();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-purple-100 p-4 sm:p-5 flex flex-col justify-between h-full">
      {/* Title bar banner */}
      <div className="bg-gradient-to-r from-[#4B087B] to-[#7900B8] -mx-4 -mt-4 sm:-mx-5 sm:-mt-5 p-3 rounded-t-xl text-white flex items-center justify-between shadow-xs mb-3">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-300" />
          <h2 className="text-xs sm:text-sm font-bold tracking-wide">
            Quick Actions
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 py-1">
        {/* 1. Allocate Invigilators */}
        <button
          onClick={() => setActiveDeputyModal('allocate')}
          className="flex flex-col items-center justify-center p-3 rounded-xl border border-purple-200 bg-purple-50/50 hover:bg-purple-100/70 hover:border-purple-400 transition-all text-center group cursor-pointer shadow-2xs"
        >
          <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center mb-2 group-hover:scale-105 transition-transform shadow-xs">
            <UserPlus className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-gray-800 group-hover:text-purple-900 leading-tight">
            Allocate Invigilators
          </span>
        </button>

        {/* 2. Generate Duty Roster */}
        <button
          onClick={() => setActiveDeputyModal('roster')}
          className="flex flex-col items-center justify-center p-3 rounded-xl border border-blue-200 bg-blue-50/50 hover:bg-blue-100/70 hover:border-blue-400 transition-all text-center group cursor-pointer shadow-2xs"
        >
          <div className="w-10 h-10 rounded-full bg-[#0284c7] text-white flex items-center justify-center mb-2 group-hover:scale-105 transition-transform shadow-xs">
            <CalendarPlus className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-gray-800 group-hover:text-blue-900 leading-tight">
            Generate Duty Roster
          </span>
        </button>

        {/* 3. Reallocate / Substitute */}
        <button
          onClick={() => setActiveDeputyModal('substitute')}
          className="flex flex-col items-center justify-center p-3 rounded-xl border border-orange-200 bg-orange-50/50 hover:bg-orange-100/70 hover:border-orange-400 transition-all text-center group cursor-pointer shadow-2xs"
        >
          <div className="w-10 h-10 rounded-full bg-[#f97316] text-white flex items-center justify-center mb-2 group-hover:scale-105 transition-transform shadow-xs">
            <ArrowLeftRight className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-gray-800 group-hover:text-orange-900 leading-tight">
            Reallocate / Substitute
          </span>
        </button>

        {/* 4. Mark Attendance */}
        <button
          onClick={() => setActiveDeputyModal('attendance')}
          className="flex flex-col items-center justify-center p-3 rounded-xl border border-green-200 bg-green-50/50 hover:bg-green-100/70 hover:border-green-400 transition-all text-center group cursor-pointer shadow-2xs"
        >
          <div className="w-10 h-10 rounded-full bg-[#16a34a] text-white flex items-center justify-center mb-2 group-hover:scale-105 transition-transform shadow-xs">
            <ClipboardCheck className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-gray-800 group-hover:text-green-900 leading-tight">
            Mark Attendance
          </span>
        </button>
      </div>
    </div>
  );
};

