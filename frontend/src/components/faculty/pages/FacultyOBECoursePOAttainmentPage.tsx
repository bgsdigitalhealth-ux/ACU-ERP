import React, { useState } from 'react';
import {
  Folder,
} from 'lucide-react';
import { useFaculty } from '../../../context/FacultyContext';

export const FacultyOBECoursePOAttainmentPage: React.FC = () => {
  const { currentCourse } = useFaculty();

  const [activeTab, setActiveTab] = useState<'batch' | 'program'>('batch');
  const [showTarget, setShowTarget] = useState(true);
  const [showEmptyState, setShowEmptyState] = useState(false);

  const poAttainmentData = [
    { po: 'PO1', title: 'Domain Knowledge', target: 75, direct: 82.4, indirect: 86.0, overall: 83.1, status: 'Attained' },
    { po: 'PO2', title: 'Problem Analysis', target: 75, direct: 79.1, indirect: 84.5, overall: 80.2, status: 'Attained' },
    { po: 'PO3', title: 'Design & Development', target: 75, direct: 81.3, indirect: 82.0, overall: 81.4, status: 'Attained' },
    { po: 'PO4', title: 'Complex Investigations', target: 70, direct: 74.8, indirect: 80.0, overall: 75.8, status: 'Attained' },
    { po: 'PO5', title: 'Modern Tool Usage', target: 80, direct: 88.2, indirect: 91.0, overall: 88.8, status: 'Attained' },
    { po: 'PO6', title: 'Engineer & Society', target: 65, direct: 68.0, indirect: 72.0, overall: 68.8, status: 'Attained' },
    { po: 'PO7', title: 'Environment & Sustainability', target: 65, direct: 66.5, indirect: 70.0, overall: 67.2, status: 'Attained' },
    { po: 'PO8', title: 'Ethics & Integrity', target: 75, direct: 78.4, indirect: 82.5, overall: 79.2, status: 'Attained' },
    { po: 'PO9', title: 'Individual & Team Work', target: 75, direct: 84.0, indirect: 89.0, overall: 85.0, status: 'Attained' },
    { po: 'PO10', title: 'Communication', target: 75, direct: 80.5, indirect: 85.0, overall: 81.4, status: 'Attained' },
    { po: 'PO11', title: 'Project Management & Finance', target: 70, direct: 76.2, indirect: 80.0, overall: 77.0, status: 'Attained' },
    { po: 'PO12', title: 'Life-long Learning', target: 75, direct: 82.8, indirect: 88.0, overall: 83.8, status: 'Attained' },
  ];

  return (
    <div className="space-y-4">
      {/* Breadcrumb matching Page 23 */}
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        HOME &gt; SUBJECT COMMUNITY &gt; {currentCourse.code} - {currentCourse.name} &gt; OBE &gt; COURSE PO ATTAINMENT
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-2xs p-5 space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
          <h1 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            PO ATTAINMENT
          </h1>

          <button
            onClick={() => setShowEmptyState(!showEmptyState)}
            className="text-xs font-bold text-purple-700 hover:underline cursor-pointer self-start sm:self-auto"
          >
            {showEmptyState ? 'Show Calculated PO Scores' : 'Preview Empty State (From PDF Screenshot)'}
          </button>
        </div>

        {/* Checkbox and Subtabs matching Screenshot Page 23 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 text-xs">
          <label className="flex items-center gap-2 text-gray-700 font-semibold cursor-pointer">
            <input
              type="checkbox"
              checked={showTarget}
              onChange={(e) => setShowTarget(e.target.checked)}
              className="rounded text-purple-600 focus:ring-purple-500"
            />
            <span>Show Target</span>
          </label>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('batch')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'batch'
                  ? 'bg-purple-700 text-white shadow-2xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              BATCH-WISE
            </button>
            <button
              onClick={() => setActiveTab('program')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'program'
                  ? 'bg-purple-700 text-white shadow-2xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              PROGRAM-WISE
            </button>
          </div>
        </div>

        {/* Empty state prompt matching Screenshot Page 23 */}
        {showEmptyState ? (
          <div className="py-24 text-center space-y-2">
            <Folder className="w-12 h-12 mx-auto text-gray-300" />
            <p className="text-xs font-semibold text-gray-500">
              No PO attainment data to display.
            </p>
          </div>
        ) : (
          /* Attainment Report Table */
          <div className="space-y-3 pt-2 animate-in fade-in duration-150">
            <div className="border border-gray-200 rounded-xl overflow-x-auto shadow-2xs">
              <table className="w-full text-left text-xs min-w-[700px]">
                <thead className="bg-gray-100/90 border-b border-gray-200 text-gray-700 font-extrabold text-[10px] uppercase">
                  <tr>
                    <th className="py-2.5 px-3">PO CODE</th>
                    <th className="py-2.5 px-3">PROGRAMME OUTCOME STATEMENT</th>
                    {showTarget && <th className="py-2.5 px-3 text-center">TARGET (%)</th>}
                    <th className="py-2.5 px-3 text-center">DIRECT (80%)</th>
                    <th className="py-2.5 px-3 text-center">INDIRECT (20%)</th>
                    <th className="py-2.5 px-3 text-center">OVERALL (%)</th>
                    <th className="py-2.5 px-3 text-right">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {poAttainmentData.map((row) => (
                    <tr key={row.po} className="hover:bg-purple-50/20 transition-colors">
                      <td className="py-2 px-3 font-extrabold text-purple-900">{row.po}</td>
                      <td className="py-2 px-3 font-bold text-gray-800">{row.title}</td>
                      {showTarget && (
                        <td className="py-2 px-3 text-center font-bold text-gray-600">{row.target}%</td>
                      )}
                      <td className="py-2 px-3 text-center font-semibold text-gray-700">{row.direct}%</td>
                      <td className="py-2 px-3 text-center font-semibold text-gray-700">{row.indirect}%</td>
                      <td className="py-2 px-3 text-center font-black text-purple-800 text-sm">{row.overall}%</td>
                      <td className="py-2 px-3 text-right">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
