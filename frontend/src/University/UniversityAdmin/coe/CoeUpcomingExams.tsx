import React from 'react';
import { Calendar, ChevronRight } from 'lucide-react';
import { useUniversityAdmin } from '../../../context/UniversityAdminContext';

export const CoeUpcomingExams: React.FC = () => {
  const { coeUpcomingExams } = useUniversityAdmin();

  return (
    <div className="w-full bg-white rounded-2xl border border-purple-200/90 shadow-2xs overflow-hidden flex flex-col justify-between select-none">
      {/* Header Bar */}
      <div className="bg-gradient-to-r from-[#440d75] to-[#2d0850] text-white px-4 sm:px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-amber-300" />
          <h3 className="font-extrabold text-sm sm:text-base tracking-tight text-white">
            Upcoming Examinations
          </h3>
        </div>
        <span className="text-[11px] text-purple-200 font-medium bg-purple-900/60 px-2 py-0.5 rounded-full border border-purple-400/30">
          March 2025
        </span>
      </div>

      {/* List */}
      <div className="p-3 sm:p-4 space-y-2.5">
        {coeUpcomingExams.map((exam) => (
          <div
            key={exam.id}
            className="flex items-center justify-between p-3 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50/50 transition-all cursor-pointer group shadow-2xs"
          >
            <div className="flex items-center gap-3 min-w-0 pr-2">
              <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center shrink-0 border border-purple-200 group-hover:scale-105 transition-transform">
                <Calendar className="w-4.5 h-4.5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-900">{exam.date}</span>
                  <span className="text-[10px] text-gray-500 font-medium">• {exam.type}</span>
                </div>
                <h4 className="text-xs sm:text-[13px] font-bold text-purple-950 truncate mt-0.5">
                  {exam.subject}
                </h4>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span
                className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                  exam.status === 'Scheduled'
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    : 'bg-blue-100 text-blue-900 border-blue-300'
                }`}
              >
                {exam.status}
              </span>
              <ChevronRight className="w-4 h-4 text-purple-400 group-hover:text-purple-700 group-hover:translate-x-0.5 transition-all" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

