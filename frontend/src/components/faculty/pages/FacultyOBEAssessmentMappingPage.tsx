import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Printer,
  RotateCcw,
  Search,
} from 'lucide-react';
import { useFaculty } from '../../../context/FacultyContext';

export const FacultyOBEAssessmentMappingPage: React.FC = () => {
  const { currentCourse, assessmentMappings } = useFaculty();

  const [selectedTypePill, setSelectedTypePill] = useState('1. CA (Continuous Assessments)');
  const [selectedNamePill, setSelectedNamePill] = useState('CA 1');
  const [includeDetails, setIncludeDetails] = useState(false);

  return (
    <div className="space-y-4">
      {/* Breadcrumb matching Page 24 & 25 */}
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        HOME &gt; SUBJECT COMMUNITY &gt; {currentCourse.code} - {currentCourse.name} &gt; OBE &gt; ASSESSMENT CO-PO MAPPING
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-2xs p-5 space-y-4">
        {/* Title */}
        <h1 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
          ASSESSMENT CO-PO MAPPING
        </h1>

        {/* Filter Toolbar matching Screenshot Page 25 */}
        <div className="p-4 bg-gray-50/80 rounded-xl border border-gray-200 space-y-3 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Assessment Type Pills */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-600 uppercase">Assessment Type</label>
              <div className="flex flex-wrap gap-1.5">
                {[
                  '1. CA (Continuous Assessments)',
                  '2. Mid-Term Exam',
                  'End Semester Exam',
                ].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSelectedTypePill(type)}
                    className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                      selectedTypePill === type
                        ? 'bg-purple-100 text-purple-900 border border-purple-300 font-bold'
                        : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    * {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Assessment Name / Number Pills */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-600 uppercase">Assessment Name / Number</label>
              <div className="flex flex-wrap gap-1.5">
                {['CA 1', 'CA 2', 'CA 3', 'End Semester Exam', 'Mid-Term Exam'].map((name) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => setSelectedNamePill(name)}
                    className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                      selectedNamePill === name
                        ? 'bg-purple-100 text-purple-900 border border-purple-300 font-bold'
                        : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    * {name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-200/60">
            <button
              onClick={() => {
                setSelectedTypePill('1. CA (Continuous Assessments)');
                setSelectedNamePill('CA 1');
              }}
              className="px-3 py-1.5 border border-gray-300 hover:bg-gray-100 text-gray-700 font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-gray-500" />
              <span>Reset</span>
            </button>
            <button
              onClick={() => alert(`Filtered: ${selectedTypePill} - ${selectedNamePill}`)}
              className="px-4 py-1.5 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search</span>
            </button>
          </div>
        </div>

        {/* Action Row matching Screenshot Page 25 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 text-xs">
          <label className="flex items-center gap-2 text-gray-700 font-semibold cursor-pointer">
            <input
              type="checkbox"
              checked={includeDetails}
              onChange={(e) => setIncludeDetails(e.target.checked)}
              className="rounded text-purple-600 focus:ring-purple-500"
            />
            <span>Include CO PO Details</span>
          </label>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const csv = 'SL NO,ASSESSMENT TYPE,ASSESSMENT NAME,TITLE,CO,PO,PSO\n' +
                  assessmentMappings.map(m => `${m.slNo},"${m.assessmentType}","${m.assessmentNumber}","${m.title}","${m.mappedCO}","${m.mappedPO}","${m.mappedPSO}"`).join('\n');
                const blob = new Blob([csv], { type: 'text/csv' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `Assessment_CO_PO_Mapping_${currentCourse.code}.csv`;
                a.click();
              }}
              className="px-3 py-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
              <span>Excel</span>
            </button>
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
          </div>
        </div>

        {/* Assessment CO-PO Mapping Table matching Screenshot Page 25 */}
        <div className="border border-gray-200 rounded-xl overflow-x-auto shadow-2xs">
          <table className="w-full text-left text-xs min-w-[850px]">
            <thead className="bg-gray-100/90 border-b border-gray-200 text-gray-700 font-extrabold text-[10px] uppercase">
              <tr>
                <th className="py-2.5 px-3 text-center w-14">SL NO</th>
                <th className="py-2.5 px-3 min-w-[190px]">ASSESSMENT TYPE</th>
                <th className="py-2.5 px-3 min-w-[150px]">ASSESSMENT NAME / NUMBER</th>
                <th className="py-2.5 px-3 min-w-[140px]">TITLE OF ASSESSMENT</th>
                <th className="py-2.5 px-3 min-w-[110px] text-purple-900">CO</th>
                <th className="py-2.5 px-3 min-w-[170px] text-indigo-900">PO</th>
                <th className="py-2.5 px-3 min-w-[90px] text-emerald-900">PSO</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {assessmentMappings.map((row) => (
                <tr key={row.slNo} className="hover:bg-purple-50/20 transition-colors">
                  <td className="py-2.5 px-3 text-center font-bold text-gray-500">{row.slNo}</td>
                  <td className="py-2.5 px-3 font-semibold text-gray-800">{row.assessmentType}</td>
                  <td className="py-2.5 px-3 font-bold text-gray-900">{row.assessmentNumber}</td>
                  <td className="py-2.5 px-3 font-semibold text-gray-700">{row.title}</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-purple-700">{row.mappedCO}</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-indigo-700">{row.mappedPO}</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-emerald-700">{row.mappedPSO}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
