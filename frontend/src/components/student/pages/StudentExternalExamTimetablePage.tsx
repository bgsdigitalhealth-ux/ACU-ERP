import React, { useState } from 'react';
import { Search, RotateCcw, Printer } from 'lucide-react';
import { EXTERNAL_EXAM_SCHEDULE } from '../../../data/studentMockData';

export const StudentExternalExamTimetablePage: React.FC = () => {
  const [examType, setExamType] = useState('Regular Exam');
  const [hasSearched, setHasSearched] = useState(true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
  };

  const handleReset = () => {
    setExamType('');
    setHasSearched(false);
  };

  const filteredExams = hasSearched
    ? EXTERNAL_EXAM_SCHEDULE.filter(
        (ex) => !examType || ex.examType === examType
      )
    : [];

  return (
    <div className="space-y-4">
      {/* Breadcrumb matching Page 6 */}
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        TIMETABLES &gt; EXTERNAL EXAM TIMETABLE
      </div>

      <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-2xs space-y-4">
        <h2 className="text-xs sm:text-sm font-extrabold text-gray-800 tracking-wide uppercase border-b border-gray-100 pb-2">
          EXTERNAL EXAM TIME TABLE
        </h2>

        {/* Filter Form matching Page 6 */}
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="max-w-md">
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Exam Type:<span className="text-red-500">*</span>
            </label>
            <select
              value={examType}
              onChange={(e) => setExamType(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-xs text-gray-800 outline-hidden focus:border-[#7047eb]"
            >
              <option value="">Select Exam Type</option>
              <option value="Regular Exam">Regular Exam</option>
              <option value="Supplementary">Supplementary</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-1.5 rounded-md border border-gray-300 hover:bg-gray-100 text-xs font-bold text-gray-700 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-gray-500" />
              <span>Reset</span>
            </button>
            <button
              type="submit"
              className="px-5 py-1.5 rounded-md bg-[#7047eb] hover:bg-[#5b32d6] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search</span>
            </button>
          </div>
        </form>
      </div>

      {/* Results Table */}
      {hasSearched && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-2xs overflow-hidden">
          <div className="p-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
            <span className="text-xs font-extrabold text-gray-800">
              Examination Schedule ({filteredExams.length} Subjects)
            </span>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3 py-1 rounded-md border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Schedule</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700 font-extrabold text-[11px] border-b border-gray-200 uppercase">
                  <th className="p-3 w-12 text-center">SL.NO</th>
                  <th className="p-3">COURSE CODE &amp; NAME</th>
                  <th className="p-3">DATE</th>
                  <th className="p-3 text-center">SESSION</th>
                  <th className="p-3">TIME</th>
                  <th className="p-3">VENUE</th>
                  <th className="p-3 text-center">SEATING NO</th>
                  <th className="p-3">INSTRUCTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredExams.map((ex, idx) => (
                  <tr key={ex.id} className="hover:bg-purple-50/20 transition-colors">
                    <td className="p-3 text-center font-bold text-gray-500">{idx + 1}</td>
                    <td className="p-3">
                      <div className="font-extrabold text-gray-900">{ex.courseName}</div>
                      <div className="text-[11px] font-bold text-purple-700">{ex.courseCode}</div>
                    </td>
                    <td className="p-3 font-semibold text-gray-800">{ex.date}</td>
                    <td className="p-3 text-center">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800">
                        {ex.session}
                      </span>
                    </td>
                    <td className="p-3 font-semibold text-gray-700">
                      {ex.startTime} - {ex.endTime}
                    </td>
                    <td className="p-3 font-medium text-gray-700">{ex.venue}</td>
                    <td className="p-3 text-center font-mono font-bold text-purple-700">
                      {ex.seatingNo}
                    </td>
                    <td className="p-3 text-gray-500 text-[11px] max-w-xs">{ex.instructions}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
