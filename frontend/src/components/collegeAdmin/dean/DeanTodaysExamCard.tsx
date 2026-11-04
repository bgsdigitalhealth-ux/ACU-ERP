import React from 'react';
import { Calendar, BookOpen, Clock, Building, FileText } from 'lucide-react';
import { useCollegeAdmin } from '../../../context/CollegeAdminContext';

export const DeanTodaysExamCard: React.FC = () => {
  const { deanFilters } = useCollegeAdmin();

  return (
    <div className="w-full bg-white rounded-2xl border border-purple-200/90 shadow-2xs overflow-hidden flex flex-col justify-between select-none">
      {/* Header Bar */}
      <div className="bg-gradient-to-r from-[#440d75] to-[#2d0850] text-white px-4 sm:px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-amber-300" />
          <h3 className="font-extrabold text-sm sm:text-base tracking-tight text-white">
            Today's Examination
          </h3>
        </div>
        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/30 text-emerald-300 border border-emerald-400/50">
          ● Live Session
        </span>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex items-center justify-between gap-4">
        <div className="space-y-2 text-xs flex-1">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-purple-700 shrink-0" />
            <span className="text-gray-500 font-semibold w-16">Subject</span>
            <span className="font-black text-gray-900 text-sm">{deanFilters.subject} – Paper I</span>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-purple-700 shrink-0" />
            <span className="text-gray-500 font-semibold w-16">Date</span>
            <span className="font-bold text-gray-800">05 Mar 2025</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-purple-700 shrink-0" />
            <span className="text-gray-500 font-semibold w-16">Session</span>
            <span className="font-bold text-purple-950 bg-purple-100 px-2 py-0.5 rounded-md">
              FN (09:30 AM – 12:30 PM)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Building className="w-4 h-4 text-purple-700 shrink-0" />
            <span className="text-gray-500 font-semibold w-16">Centre</span>
            <span className="font-bold text-gray-800">Main Block – Halls 1 to 4</span>
          </div>
        </div>

        {/* Paper Illustration Graphic */}
        <div className="w-20 h-24 rounded-2xl bg-gradient-to-tr from-purple-100 to-purple-50 border-2 border-purple-200 flex flex-col items-center justify-center p-2 text-center shadow-xs shrink-0">
          <FileText className="w-8 h-8 text-[#7900B8] mb-1" />
          <span className="text-[10px] font-black uppercase text-purple-900 tracking-wider">
            EXAM
          </span>
        </div>
      </div>
    </div>
  );
};

