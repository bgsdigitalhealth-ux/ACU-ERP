import React from 'react';
import { Calendar, Users, CheckCircle2, Building, Armchair } from 'lucide-react';
import { useCollegeAdmin } from '../../../context/CollegeAdminContext';

export const DeputyKpis: React.FC = () => {
  const { deputyKpis } = useCollegeAdmin();

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
      {/* 1. Exams Scheduled */}
      <div className="bg-white rounded-xl p-3.5 sm:p-4 shadow-sm border border-purple-100 flex items-center justify-between hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-purple-600 flex items-center justify-center text-white shrink-0 shadow-sm">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-gray-900 leading-none">
              {deputyKpis.examsScheduled}
            </div>
            <div className="text-[11px] sm:text-xs font-semibold text-gray-500 mt-1 leading-tight">
              Exams Scheduled
            </div>
          </div>
        </div>
      </div>

      {/* 2. Faculty Available */}
      <div className="bg-white rounded-xl p-3.5 sm:p-4 shadow-sm border border-purple-100 flex items-center justify-between hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#0284c7] flex items-center justify-center text-white shrink-0 shadow-sm">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-gray-900 leading-none">
              {deputyKpis.facultyAvailable}
            </div>
            <div className="text-[11px] sm:text-xs font-semibold text-gray-500 mt-1 leading-tight">
              Faculty Available
            </div>
          </div>
        </div>
      </div>

      {/* 3. Invigilators Allocated */}
      <div className="bg-white rounded-xl p-3.5 sm:p-4 shadow-sm border border-purple-100 flex items-center justify-between hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#16a34a] flex items-center justify-center text-white shrink-0 shadow-sm">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-gray-900 leading-none">
              {deputyKpis.invigilatorsAllocated}
            </div>
            <div className="text-[11px] sm:text-xs font-semibold text-gray-500 mt-1 leading-tight">
              Invigilators Allocated
            </div>
          </div>
        </div>
      </div>

      {/* 4. Exam Halls */}
      <div className="bg-white rounded-xl p-3.5 sm:p-4 shadow-sm border border-purple-100 flex items-center justify-between hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#f97316] flex items-center justify-center text-white shrink-0 shadow-sm">
            <Building className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-gray-900 leading-none">
              {deputyKpis.examHalls}
            </div>
            <div className="text-[11px] sm:text-xs font-semibold text-gray-500 mt-1 leading-tight">
              Exam Halls
            </div>
          </div>
        </div>
      </div>

      {/* 5. Total Seats */}
      <div className="bg-white rounded-xl p-3.5 sm:p-4 shadow-sm border border-purple-100 flex items-center justify-between hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#ec4899] flex items-center justify-center text-white shrink-0 shadow-sm">
            <Armchair className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-gray-900 leading-none">
              {deputyKpis.totalSeats.toLocaleString()}
            </div>
            <div className="text-[11px] sm:text-xs font-semibold text-gray-500 mt-1 leading-tight">
              Total Seats
            </div>
          </div>
        </div>
      </div>

      {/* 6. Allocation Completed Donut */}
      <div className="bg-white rounded-xl p-3.5 sm:p-4 shadow-sm border border-purple-100 flex items-center justify-between hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3 w-full">
          {/* Circular Donut Gauge */}
          <div className="relative w-12 h-12 shrink-0 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-cyan-100"
                strokeWidth="4"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-cyan-500"
                strokeDasharray={`${deputyKpis.allocationCompletedPercent}, 100`}
                strokeWidth="4.2"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute text-[11px] font-black text-cyan-600">
              {deputyKpis.allocationCompletedPercent}%
            </span>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-gray-900 leading-none">
              {deputyKpis.allocationCompletedPercent}%
            </div>
            <div className="text-[11px] sm:text-xs font-semibold text-gray-500 mt-1 leading-tight">
              Allocation Completed
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

