import React from 'react';
import { Filter } from 'lucide-react';
import { useHod } from '../../context/HodContext';

export const HodFilters: React.FC = () => {
  const { filters, setFilters, hodSession } = useHod();

  return (
    <div className="w-full bg-white rounded-2xl p-3 sm:p-3.5 border border-purple-100/90 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 select-none">
      <div className="flex items-center gap-2 text-xs font-bold text-[#2e1065] shrink-0">
        <Filter className="w-4 h-4 text-purple-600" />
        <span>Examination Scope:</span>
      </div>

      <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
        {/* Academic Year */}
        <div>
          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-0.5">
            Academic Year
          </label>
          <select
            value={filters.academicYear}
            onChange={(e) => setFilters({ ...filters, academicYear: e.target.value })}
            className="w-full bg-[#f8f9ff] text-xs font-bold text-[#1e293b] border border-purple-200/90 rounded-xl px-3 py-1.5 outline-none focus:border-purple-600"
          >
            <option value="2024 – 25">2024 – 25</option>
            <option value="2023 – 24">2023 – 24</option>
            <option value="2022 – 23">2022 – 23</option>
          </select>
        </div>

        {/* Programme */}
        <div>
          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-0.5">
            Programme
          </label>
          <select
            value={filters.programme}
            onChange={(e) => setFilters({ ...filters, programme: e.target.value })}
            className="w-full bg-[#f8f9ff] text-xs font-bold text-[#1e293b] border border-purple-200/90 rounded-xl px-3 py-1.5 outline-none focus:border-purple-600"
          >
            <option value="MBBS">MBBS</option>
            <option value="MD / MS">MD / MS</option>
            <option value="M.Sc Medical">M.Sc Medical</option>
          </select>
        </div>

        {/* Phase */}
        <div>
          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-0.5">
            Phase
          </label>
          <select
            value={filters.phase}
            onChange={(e) => setFilters({ ...filters, phase: e.target.value })}
            className="w-full bg-[#f8f9ff] text-xs font-bold text-[#1e293b] border border-purple-200/90 rounded-xl px-3 py-1.5 outline-none focus:border-purple-600"
          >
            <option value="First MBBS">First MBBS</option>
            <option value="Second MBBS">Second MBBS</option>
            <option value="Final MBBS Part I">Final MBBS Part I</option>
            <option value="Final MBBS Part II">Final MBBS Part II</option>
          </select>
        </div>

        {/* Exam Type */}
        <div>
          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-0.5">
            Exam Type
          </label>
          <select
            value={filters.examType}
            onChange={(e) => setFilters({ ...filters, examType: e.target.value as any })}
            className="w-full bg-[#f8f9ff] text-xs font-bold text-[#1e293b] border border-purple-200/90 rounded-xl px-3 py-1.5 outline-none focus:border-purple-600"
          >
            <option value="Theory">Theory</option>
            <option value="Practical">Practical</option>
            <option value="All">All Types</option>
          </select>
        </div>

        {/* Subject (Locked to Department) */}
        <div>
          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-0.5">
            Subject (Assigned)
          </label>
          <input
            type="text"
            disabled
            value={hodSession?.department || filters.subject}
            className="w-full bg-purple-50 text-xs font-extrabold text-purple-900 border border-purple-200 rounded-xl px-3 py-1.5 cursor-not-allowed"
          />
        </div>
      </div>
    </div>
  );
};

