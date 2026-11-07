import React from 'react';
import { Filter, ChevronDown, RotateCcw } from 'lucide-react';
import { useUniversityAdmin } from '../../../context/UniversityAdminContext';

export const VcFilters: React.FC = () => {
  const { vcFilters, setVcFilters, setToast } = useUniversityAdmin();

  const handleReset = () => {
    setVcFilters({
      academicYear: '2024 – 25',
      college: 'All Colleges',
      programme: 'All Programmes',
      phase: 'All Phases'
    });
    setToast('Vice-Chancellor filters reset to university-wide view.');
  };

  return (
    <div className="w-full bg-white rounded-2xl p-3 sm:p-4 border border-purple-200/90 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 select-none">
      <div className="flex items-center gap-2 text-purple-950 font-bold text-xs sm:text-sm">
        <Filter className="w-4 h-4 text-[#7900B8]" />
        <span>University Filters:</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 flex-1 max-w-4xl mx-0 md:mx-4">
        {/* Academic Year */}
        <div className="relative">
          <label className="text-[10px] font-bold text-gray-500 uppercase block mb-0.5">Academic Year</label>
          <select
            value={vcFilters.academicYear}
            onChange={(e) => setVcFilters(prev => ({ ...prev, academicYear: e.target.value }))}
            className="w-full text-xs font-bold text-gray-800 bg-gray-50 border border-gray-300 rounded-xl px-2.5 py-1.5 pr-7 appearance-none cursor-pointer focus:ring-1 focus:ring-purple-600"
          >
            <option>2024 – 25</option>
            <option>2023 – 24</option>
            <option>2022 – 23</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 bottom-2.5 pointer-events-none" />
        </div>

        {/* All Colleges */}
        <div className="relative">
          <label className="text-[10px] font-bold text-gray-500 uppercase block mb-0.5">College</label>
          <select
            value={vcFilters.college}
            onChange={(e) => setVcFilters(prev => ({ ...prev, college: e.target.value }))}
            className="w-full text-xs font-bold text-gray-800 bg-gray-50 border border-gray-300 rounded-xl px-2.5 py-1.5 pr-7 appearance-none cursor-pointer focus:ring-1 focus:ring-purple-600"
          >
            <option>All Colleges</option>
            <option>BGS Medical College & Hospital</option>
            <option>AIMS, B.G. Nagara</option>
            <option>BGSVIAHS</option>
            <option>BGS Institute of Technology</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 bottom-2.5 pointer-events-none" />
        </div>

        {/* All Programmes */}
        <div className="relative">
          <label className="text-[10px] font-bold text-gray-500 uppercase block mb-0.5">Programme</label>
          <select
            value={vcFilters.programme}
            onChange={(e) => setVcFilters(prev => ({ ...prev, programme: e.target.value }))}
            className="w-full text-xs font-bold text-gray-800 bg-gray-50 border border-gray-300 rounded-xl px-2.5 py-1.5 pr-7 appearance-none cursor-pointer focus:ring-1 focus:ring-purple-600"
          >
            <option>All Programmes</option>
            <option>MBBS</option>
            <option>B.Tech</option>
            <option>B.Pharm</option>
            <option>B.Sc Nursing</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 bottom-2.5 pointer-events-none" />
        </div>

        {/* All Phases */}
        <div className="relative">
          <label className="text-[10px] font-bold text-gray-500 uppercase block mb-0.5">Phase</label>
          <select
            value={vcFilters.phase}
            onChange={(e) => setVcFilters(prev => ({ ...prev, phase: e.target.value }))}
            className="w-full text-xs font-bold text-gray-800 bg-gray-50 border border-gray-300 rounded-xl px-2.5 py-1.5 pr-7 appearance-none cursor-pointer focus:ring-1 focus:ring-purple-600"
          >
            <option>All Phases</option>
            <option>Phase I / First Year</option>
            <option>Phase II / Second Year</option>
            <option>Final Phase</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 bottom-2.5 pointer-events-none" />
        </div>
      </div>

      <button
        onClick={handleReset}
        className="px-3 py-1.5 rounded-xl border border-purple-200 text-purple-900 text-xs font-bold hover:bg-purple-50 flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0"
        title="Reset to default"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>Reset</span>
      </button>
    </div>
  );
};

