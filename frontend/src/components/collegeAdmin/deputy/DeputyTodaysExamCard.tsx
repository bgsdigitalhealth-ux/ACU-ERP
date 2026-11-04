import React from 'react';
import { Calendar, FileSpreadsheet } from 'lucide-react';

export const DeputyTodaysExamCard: React.FC = () => {

  return (
    <div className="bg-white rounded-xl shadow-sm border border-purple-100 p-4 sm:p-5 flex flex-col justify-between h-full">
      {/* Title bar with purple banner */}
      <div className="bg-gradient-to-r from-[#4B087B] to-[#7900B8] -mx-4 -mt-4 sm:-mx-5 sm:-mt-5 p-3 rounded-t-xl text-white flex items-center justify-between shadow-xs mb-3">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-amber-300" />
          <h2 className="text-xs sm:text-sm font-bold tracking-wide">
            Today's Examination
          </h2>
        </div>
      </div>

      <div className="flex items-start justify-between gap-4 py-1">
        {/* Exam Metadata */}
        <div className="space-y-2 flex-1 text-xs sm:text-sm">
          <div className="flex items-baseline">
            <span className="font-bold text-gray-700 w-20 shrink-0">Subject :</span>
            <span className="font-extrabold text-purple-950">Physiology – Paper I</span>
          </div>

          <div className="flex items-baseline">
            <span className="font-bold text-gray-700 w-20 shrink-0">Date :</span>
            <span className="font-medium text-gray-800">05 Mar 2025</span>
          </div>

          <div className="flex items-baseline">
            <span className="font-bold text-gray-700 w-20 shrink-0">Session :</span>
            <span className="font-medium text-gray-800">FN (09:30 AM – 12:30 PM)</span>
          </div>

          <div className="flex items-baseline">
            <span className="font-bold text-gray-700 w-20 shrink-0">Centre :</span>
            <span className="font-medium text-gray-800">Main Block – Halls 1 to 4</span>
          </div>
        </div>

        {/* Right Status Badge and Visual Doc Icon */}
        <div className="flex flex-col items-end justify-between self-stretch shrink-0">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 border border-green-200 shadow-2xs">
            ✓ Ready
          </span>

          <div className="w-16 h-16 rounded-xl bg-purple-50 flex items-center justify-center text-purple-400 border border-purple-100 shadow-inner mt-2">
            <FileSpreadsheet className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>
    </div>
  );
};
