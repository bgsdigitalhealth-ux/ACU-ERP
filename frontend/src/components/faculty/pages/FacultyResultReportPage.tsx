import React, { useState } from 'react';
import {
  Search,
  RotateCcw,
  Download,
  Printer,
  SlidersHorizontal,
} from 'lucide-react';
import { useFaculty } from '../../../context/FacultyContext';

export const FacultyResultReportPage: React.FC = () => {
  const { currentCourse, students, assessments } = useFaculty();

  const [assessmentType, setAssessmentType] = useState('1. CA (Continuous Assessments)');
  const [assessmentName, setAssessmentName] = useState('CA 1 - Node.js Core, Streams, and Express Routing');
  const [hasSearched, setHasSearched] = useState(true);
  const [showFilters, setShowFilters] = useState(true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
  };

  const handleReset = () => {
    setAssessmentType('');
    setAssessmentName('');
    setHasSearched(false);
  };

  return (
    <div className="space-y-4">
      {/* Breadcrumb matching Page 14 */}
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        HOME &gt; SUBJECT COMMUNITY &gt; {currentCourse.code} - {currentCourse.name} &gt; ASSESSMENTS &gt; RESULT REPORT
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-2xs p-5 space-y-4">
        {/* Top Toggle */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-3 py-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-gray-500" />
            <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
          </button>

          {hasSearched && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const csv = 'Roll,Reg,Name,MaxMarks,MarksObtained,Percentage,Status\n' +
                    students.map(s => `${s.rollNo},${s.regNo},"${s.name}",25,${s.caMarks.ca1},${((s.caMarks.ca1/25)*100).toFixed(1)}%,Pass`).join('\n');
                  const blob = new Blob([csv], { type: 'text/csv' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `Result_Report_${currentCourse.code}.csv`;
                  a.click();
                }}
                className="px-3 py-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-gray-500" />
                <span>Export</span>
              </button>
              <button
                onClick={() => window.print()}
                className="px-3 py-1.5 bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>
            </div>
          )}
        </div>

        {/* Filter Inputs Form matching Page 14 */}
        {showFilters && (
          <form onSubmit={handleSearch} className="p-4 bg-gray-50/80 rounded-xl border border-gray-200 space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-bold mb-1">Assessment Type *</label>
                <select
                  value={assessmentType}
                  onChange={(e) => setAssessmentType(e.target.value)}
                  className="w-full text-xs p-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                >
                  <option value="">Select Assessment Type</option>
                  <option value="1. CA (Continuous Assessments)">1. CA (Continuous Assessments)</option>
                  <option value="2. Mid-Term Exam">2. Mid-Term Exam</option>
                  <option value="End Semester Exam">End Semester Exam</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Assessment Name / No *</label>
                <select
                  value={assessmentName}
                  onChange={(e) => setAssessmentName(e.target.value)}
                  className="w-full text-xs p-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                >
                  <option value="">Select Assessment Name / No</option>
                  {assessments.map((a) => (
                    <option key={a.id} value={a.title}>
                      {a.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={handleReset}
                className="px-3 py-1.5 border border-gray-300 hover:bg-gray-100 text-gray-700 font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-gray-500" />
                <span>Reset</span>
              </button>
              <button
                type="submit"
                className="px-5 py-1.5 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search</span>
              </button>
            </div>
          </form>
        )}

        {/* Empty state prompt matching Screenshot Page 14 */}
        {!hasSearched ? (
          <div className="py-16 text-center text-gray-400 space-y-2">
            <div className="text-3xl font-mono text-gray-300 font-bold">EQ</div>
            <p className="text-xs font-semibold text-gray-500">
              Search with a filter to view the assessment mark report
            </p>
          </div>
        ) : (
          /* Result Table */
          <div className="space-y-3 pt-2">
            <div className="bg-purple-50 p-3 rounded-lg border border-purple-200 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-purple-900 gap-1 font-bold">
              <span>{assessmentName || 'CA 1 - Node.js Core, Streams, and Express Routing'}</span>
              <span>Max Marks: 25 • Evaluated Submissions: {students.length}</span>
            </div>

            <div className="border border-gray-200 rounded-xl overflow-x-auto shadow-2xs">
              <table className="w-full text-left text-xs min-w-[700px]">
                <thead className="bg-gray-100/90 border-b border-gray-200 text-gray-700 font-bold text-[10px] uppercase">
                  <tr>
                    <th className="py-2.5 px-3">SL</th>
                    <th className="py-2.5 px-3">ROLL NUMBER</th>
                    <th className="py-2.5 px-3">STUDENT NAME</th>
                    <th className="py-2.5 px-3 text-center">MAX MARKS</th>
                    <th className="py-2.5 px-3 text-center">MARKS OBTAINED</th>
                    <th className="py-2.5 px-3 text-center">PERCENTAGE</th>
                    <th className="py-2.5 px-3 text-right">RESULT STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {students.map((st) => {
                    const obtained = st.caMarks.ca1;
                    const pct = ((obtained / 25) * 100).toFixed(1);
                    return (
                      <tr key={st.rollNo} className="hover:bg-purple-50/30 transition-colors">
                        <td className="py-2 px-3 font-bold text-gray-500">{st.slNo}</td>
                        <td className="py-2 px-3 font-mono text-gray-700">{st.rollNo}</td>
                        <td className="py-2 px-3 font-extrabold text-gray-900 uppercase">{st.name}</td>
                        <td className="py-2 px-3 text-center font-bold text-gray-600">25</td>
                        <td className="py-2 px-3 text-center font-black text-purple-800 text-sm">{obtained}</td>
                        <td className="py-2 px-3 text-center font-bold text-gray-800">{pct}%</td>
                        <td className="py-2 px-3 text-right">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            Passed
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
