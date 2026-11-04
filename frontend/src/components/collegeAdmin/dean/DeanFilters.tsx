import React from 'react';
import { Filter, ChevronDown, RotateCcw } from 'lucide-react';
import { useCollegeAdmin } from '../../../context/CollegeAdminContext';

export const DeanFilters: React.FC = () => {
  const { deanFilters, setDeanFilters, setToast } = useCollegeAdmin();

  const handleReset = () => {
    setDeanFilters({
      academicYear: '2024 – 25',
      programme: 'MBBS',
      phase: 'First MBBS',
      subject: 'Physiology'
    });
    setToast('Dean examination filters reset.');
  };

  return (
    <div className="w-full bg-white rounded-2xl p-3 sm:p-4 border border-purple-200/90 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 select-none">
      <div className="flex items-center gap-2 text-purple-950 font-bold text-xs sm:text-sm shrink-0">
        <Filter className="w-4 h-4 text-[#7900B8]" />
        <span>Dean Controls:</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 flex-1 max-w-4xl mx-0 md:mx-3">
        {/* Academic Year */}
        <div className="relative">
          <label className="text-[10px] font-bold text-gray-500 uppercase block mb-0.5">Academic Year</label>
          <select
            value={deanFilters.academicYear}
            onChange={(e) => setDeanFilters(prev => ({ ...prev, academicYear: e.target.value }))}
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
            value={deanFilters.programme}
            onChange={(e) => setDeanFilters(prev => ({ ...prev, programme: e.target.value }))}
            className="w-full text-xs font-bold text-gray-800 bg-gray-50 border border-gray-300 rounded-xl px-2.5 py-1.5 pr-7 appearance-none cursor-pointer focus:ring-1 focus:ring-purple-600"
          >
            <option>MBBS</option>
            <option>MD General Medicine</option>
            <option>MS General Surgery</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 bottom-2.5 pointer-events-none" />
        </div>

        {/* Phase */}
        <div className="relative">
          <label className="text-[10px] font-bold text-gray-500 uppercase block mb-0.5">Phase</label>
          <select
            value={deanFilters.phase}
            onChange={(e) => setDeanFilters(prev => ({ ...prev, phase: e.target.value }))}
            className="w-full text-xs font-bold text-gray-800 bg-gray-50 border border-gray-300 rounded-xl px-2.5 py-1.5 pr-7 appearance-none cursor-pointer focus:ring-1 focus:ring-purple-600"
          >
            <option>First MBBS</option>
            <option>Second MBBS</option>
            <option>Final MBBS</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 bottom-2.5 pointer-events-none" />
        </div>

        {/* Subject */}
        <div className="relative">
          <label className="text-[10px] font-bold text-gray-500 uppercase block mb-0.5">Subject</label>
          <select
            value={deanFilters.subject}
            onChange={(e) => setDeanFilters(prev => ({ ...prev, subject: e.target.value }))}
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

