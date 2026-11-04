import React from 'react';
import { Filter, ChevronDown, RotateCcw } from 'lucide-react';
import { useUniversityAdmin } from '../../../context/UniversityAdminContext';

export const CoeFilters: React.FC = () => {
  const { coeFilters, setCoeFilters, setToast } = useUniversityAdmin();

  const handleReset = () => {
    setCoeFilters({
      academicYear: '2024 – 25',
      programme: 'MBBS',
      phase: 'First MBBS',
      examType: 'Practical',
      subject: 'Physiology'
    });
    setToast('CoE filters reset.');
  };

  return (
    <div className="w-full bg-white rounded-2xl p-3 sm:p-4 border border-purple-200/90 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 select-none">
      <div className="flex items-center gap-2 text-purple-950 font-bold text-xs sm:text-sm shrink-0">
        <Filter className="w-4 h-4 text-[#7900B8]" />
        <span>CoE Filters:</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 flex-1 max-w-5xl mx-0 md:mx-3">
        {/* Academic Year */}
        <div className="relative">
          <label className="text-[10px] font-bold text-gray-500 uppercase block mb-0.5">Academic Year</label>
          <select
            value={coeFilters.academicYear}
            onChange={(e) => setCoeFilters(prev => ({ ...prev, academicYear: e.target.value }))}
            className="w-full text-xs font-bold text-gray-800 bg-gray-50 border border-gray-300 rounded-xl px-2.5 py-1.5 pr-7 appearance-none cursor-pointer focus:ring-1 focus:ring-purple-600"
          >
            <option>2024 – 25</option>
            <option>2023 – 24</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 bottom-2.5 pointer-events-none" />
        </div>

        {/* Programme */}
        <div className="relative">
          <label className="text-[10px] font-bold text-gray-500 uppercase block mb-0.5">Programme</label>
          <select
            value={coeFilters.programme}
            onChange={(e) => setCoeFilters(prev => ({ ...prev, programme: e.target.value }))}
            className="w-full text-xs font-bold text-gray-800 bg-gray-50 border border-gray-300 rounded-xl px-2.5 py-1.5 pr-7 appearance-none cursor-pointer focus:ring-1 focus:ring-purple-600"
          >
            <option>MBBS</option>
            <option>B.Tech</option>
            <option>B.Pharm</option>
            <option>B.Sc Nursing</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 bottom-2.5 pointer-events-none" />
        </div>

        {/* Phase */}
        <div className="relative">
          <label className="text-[10px] font-bold text-gray-500 uppercase block mb-0.5">Phase</label>
          <select
            value={coeFilters.phase}
            onChange={(e) => setCoeFilters(prev => ({ ...prev, phase: e.target.value }))}
            className="w-full text-xs font-bold text-gray-800 bg-gray-50 border border-gray-300 rounded-xl px-2.5 py-1.5 pr-7 appearance-none cursor-pointer focus:ring-1 focus:ring-purple-600"
          >
            <option>First MBBS</option>
            <option>Second MBBS</option>
            <option>Final MBBS (Part I)</option>
            <option>Final MBBS (Part II)</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 bottom-2.5 pointer-events-none" />
        </div>

        {/* Exam Type */}
        <div className="relative">
          <label className="text-[10px] font-bold text-gray-500 uppercase block mb-0.5">Exam Type</label>
          <select
            value={coeFilters.examType}
            onChange={(e) => setCoeFilters(prev => ({ ...prev, examType: e.target.value as any }))}
            className="w-full text-xs font-bold text-gray-800 bg-gray-50 border border-gray-300 rounded-xl px-2.5 py-1.5 pr-7 appearance-none cursor-pointer focus:ring-1 focus:ring-purple-600"
          >
            <option>Practical</option>
            <option>Theory</option>
            <option>All</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 bottom-2.5 pointer-events-none" />
        </div>

        {/* Subject */}
        <div className="relative">
          <label className="text-[10px] font-bold text-gray-500 uppercase block mb-0.5">Subject</label>
          <select
            value={coeFilters.subject}
            onChange={(e) => setCoeFilters(prev => ({ ...prev, subject: e.target.value }))}
            className="w-full text-xs font-bold text-gray-800 bg-gray-50 border border-gray-300 rounded-xl px-2.5 py-1.5 pr-7 appearance-none cursor-pointer focus:ring-1 focus:ring-purple-600"
          >
            <option>Physiology</option>
            <option>Anatomy</option>
            <option>Biochemistry</option>
            <option>Pathology</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 bottom-2.5 pointer-events-none" />
        </div>
      </div>

      <button
        onClick={handleReset}
        className="px-3 py-1.5 rounded-xl border border-purple-200 text-purple-900 text-xs font-bold hover:bg-purple-50 flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0"
        title="Reset"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>Reset</span>
      </button>
    </div>
  );
};

