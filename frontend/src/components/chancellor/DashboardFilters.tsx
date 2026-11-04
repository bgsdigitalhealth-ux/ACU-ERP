import React from 'react';
import { RotateCcw, Filter } from 'lucide-react';
import { useChancellor } from '../../context/ChancellorContext';
import {
  ACADEMIC_YEARS,
  COLLEGES_LIST,
  PROGRAMMES_LIST,
  PHASES_LIST
} from '../../data/chancellorData';

export const DashboardFilters: React.FC = () => {
  const {
    filters,
    setAcademicYear,
    setCollege,
    setProgramme,
    setPhase,
    resetFilters
  } = useChancellor();

  const isFiltered =
    filters.academicYear !== '2024 – 25' ||
    filters.college !== 'All Colleges' ||
    filters.programme !== 'All Programmes' ||
    filters.phase !== 'All Phases';

  return (
    <div className="w-full bg-white rounded-2xl p-3 sm:p-4 border border-purple-100/80 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 select-none">
      <div className="flex items-center gap-2 text-xs font-bold text-[#2e1065] shrink-0">
        <Filter className="w-4 h-4 text-purple-600" />
        <span>Governance Filters:</span>
      </div>

      {/* 4 Dropdowns Grid */}
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {/* Filter 1: Academic Year */}
        <div className="relative">
          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-0.5">
            Academic Year
          </label>
          <select
            value={filters.academicYear}
            onChange={(e) => setAcademicYear(e.target.value)}
            className="w-full bg-[#f8f9ff] text-xs font-bold text-[#1e293b] border border-purple-200/90 rounded-xl px-3 py-2 outline-none focus:border-purple-600 focus:bg-white transition-all cursor-pointer shadow-2xs"
          >
            {ACADEMIC_YEARS.map((yr) => (
              <option key={yr} value={yr}>
                {yr}
              </option>
            ))}
          </select>
        </div>

        {/* Filter 2: College / Institution */}
        <div className="relative">
          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-0.5">
            College / Institution
          </label>
          <select
            value={filters.college}
            onChange={(e) => setCollege(e.target.value)}
            className="w-full bg-[#f8f9ff] text-xs font-bold text-[#1e293b] border border-purple-200/90 rounded-xl px-3 py-2 outline-none focus:border-purple-600 focus:bg-white transition-all cursor-pointer shadow-2xs truncate"
          >
            {COLLEGES_LIST.map((col) => (
              <option key={col} value={col}>
                {col}
              </option>
            ))}
          </select>
        </div>

        {/* Filter 3: All Programmes */}
        <div className="relative">
          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-0.5">
            Programme Type
          </label>
          <select
            value={filters.programme}
            onChange={(e) => setProgramme(e.target.value)}
            className="w-full bg-[#f8f9ff] text-xs font-bold text-[#1e293b] border border-purple-200/90 rounded-xl px-3 py-2 outline-none focus:border-purple-600 focus:bg-white transition-all cursor-pointer shadow-2xs truncate"
          >
            {PROGRAMMES_LIST.map((prog) => (
              <option key={prog} value={prog}>
                {prog}
              </option>
            ))}
          </select>
        </div>

        {/* Filter 4: All Phases */}
        <div className="relative">
          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-0.5">
            Examination Phase
          </label>
          <select
            value={filters.phase}
            onChange={(e) => setPhase(e.target.value)}
            className="w-full bg-[#f8f9ff] text-xs font-bold text-[#1e293b] border border-purple-200/90 rounded-xl px-3 py-2 outline-none focus:border-purple-600 focus:bg-white transition-all cursor-pointer shadow-2xs truncate"
          >
            {PHASES_LIST.map((ph) => (
              <option key={ph} value={ph}>
                {ph}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Reset Action */}
      {isFiltered && (
        <button
          onClick={resetFilters}
          className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-purple-700 hover:text-purple-900 bg-purple-50 hover:bg-purple-100 border border-purple-200 transition-all cursor-pointer shrink-0 mt-3 md:mt-0"
          title="Reset to default filters"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      )}
    </div>
  );
};

