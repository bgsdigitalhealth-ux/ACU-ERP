import React, { useState } from 'react';
import { Filter, Search, RotateCcw, Printer } from 'lucide-react';

export const StudentAssessmentMarksPage: React.FC = () => {
  const [showFilters, setShowFilters] = useState(true);
  const [semester, setSemester] = useState('S4');
  const [assessmentType, setAssessmentType] = useState('');
  const [includeExternal, setIncludeExternal] = useState(false);

  return (
    <div className="space-y-4">
      {/* Breadcrumb matching Page 23 */}
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        RESULTS &gt; ASSESSMENT MARKS
      </div>

      <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <h2 className="text-xs sm:text-sm font-extrabold text-gray-900 uppercase tracking-wide">
            ASSESSMENT MARKS
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-300 hover:bg-gray-50 text-xs font-bold text-gray-700 transition-colors cursor-pointer"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
            </button>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-300 hover:bg-gray-50 text-xs font-bold text-gray-700 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
          </div>
        </div>

        {/* Filters matching Page 23 */}
        {showFilters && (
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs items-center">
              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Semester<span className="text-red-500">*</span>
                </label>
                <select
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-800 outline-hidden focus:border-[#7047eb]"
                >
                  <option value="S4">S4</option>
                  <option value="S3">S3</option>
                  <option value="S2">S2</option>
                  <option value="S1">S1</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Assessment Type
                </label>
                <select
                  value={assessmentType}
                  onChange={(e) => setAssessmentType(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-800 outline-hidden focus:border-[#7047eb]"
                >
                  <option value="">Select Assessment Type</option>
                  <option value="CA 1">Continuous Assessment 1 (CA 1)</option>
                  <option value="CA 2">Continuous Assessment 2 (CA 2)</option>
                  <option value="Assignments">Assignments &amp; Projects</option>
                </select>
              </div>

              <div className="flex items-center pt-5">
                <label className="flex items-center gap-2 cursor-pointer font-semibold text-gray-700 text-xs">
                  <input
                    type="checkbox"
                    checked={includeExternal}
                    onChange={(e) => setIncludeExternal(e.target.checked)}
                    className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500"
                  />
                  <span>Include External Sub Curriculum Courses</span>
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-200">
              <button
                type="button"
                onClick={() => {
                  setSemester('S4');
                  setAssessmentType('');
                  setIncludeExternal(false);
                }}
                className="px-4 py-1.5 rounded-md border border-gray-300 hover:bg-gray-100 text-xs font-bold text-gray-700 flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-gray-500" />
                <span>Reset</span>
              </button>
              <button
                type="button"
                className="px-5 py-1.5 rounded-md bg-[#7047eb] hover:bg-[#5b32d6] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search</span>
              </button>
            </div>
          </div>
        )}

        {/* SECTION 1: CA 1 matching Page 23 */}
        <div className="space-y-2 pt-2">
          <div className="text-right text-xs font-extrabold text-gray-600 uppercase tracking-wider">
            CA 1
          </div>
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-gray-100/80 text-gray-700 font-extrabold border-b border-gray-200 uppercase text-[11px]">
                  <th className="p-3">Course Name</th>
                  <th className="p-3 text-center w-40">Mark Obtained</th>
                  <th className="p-3 text-center w-40">Max Marks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-purple-50/20">
                  <td className="p-3 font-bold text-gray-900">Human Physiology I &amp; II (PHY101)</td>
                  <td className="p-3 text-center font-bold text-purple-700">20</td>
                  <td className="p-3 text-center text-gray-600">20</td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="bg-gray-50 font-bold border-t border-gray-200">
                  <td className="p-3 text-gray-800">Total</td>
                  <td className="p-3 text-center font-extrabold text-gray-900">20</td>
                  <td className="p-3 text-center font-extrabold text-gray-900">20</td>
                </tr>
                <tr className="bg-purple-50/40 font-black text-purple-900 border-t border-gray-200">
                  <td className="p-3">Percentage</td>
                  <td colSpan={2} className="p-3 text-center text-sm font-black text-emerald-600">
                    100 %
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* SECTION 2: CA 2 matching Page 23 */}
        <div className="space-y-2 pt-4">
          <div className="text-right text-xs font-extrabold text-gray-600 uppercase tracking-wider">
            CA 2
          </div>
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-gray-100/80 text-gray-700 font-extrabold border-b border-gray-200 uppercase text-[11px]">
                  <th className="p-3">Course Name</th>
                  <th className="p-3 text-center w-40">Mark Obtained</th>
                  <th className="p-3 text-center w-40">Max Marks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-purple-50/20">
                  <td className="p-3 font-bold text-gray-900">Human Physiology I &amp; II (PHY101)</td>
                  <td className="p-3 text-center font-bold text-purple-700">19</td>
                  <td className="p-3 text-center text-gray-600">20</td>
                </tr>
                <tr className="hover:bg-purple-50/20">
                  <td className="p-3 font-bold text-gray-900">Human Anatomy, Embryology &amp; Histology (ANA101)</td>
                  <td className="p-3 text-center font-bold text-purple-700">18</td>
                  <td className="p-3 text-center text-gray-600">20</td>
                </tr>
                <tr className="hover:bg-purple-50/20">
                  <td className="p-3 font-bold text-gray-900">Medical Biochemistry &amp; Molecular Diagnostics (BIO101)</td>
                  <td className="p-3 text-center font-bold text-purple-700">18</td>
                  <td className="p-3 text-center text-gray-600">20</td>
                </tr>
                <tr className="hover:bg-purple-50/20">
                  <td className="p-3 font-bold text-gray-900">Early Clinical Exposure &amp; Medical Ethics (ECE101)</td>
                  <td className="p-3 text-center font-bold text-purple-700">19</td>
                  <td className="p-3 text-center text-gray-600">20</td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="bg-gray-50 font-bold border-t border-gray-200">
                  <td className="p-3 text-gray-800">Total</td>
                  <td className="p-3 text-center font-extrabold text-gray-900">74</td>
                  <td className="p-3 text-center font-extrabold text-gray-900">80</td>
                </tr>
                <tr className="bg-purple-50/40 font-black text-purple-900 border-t border-gray-200">
                  <td className="p-3">Percentage</td>
                  <td colSpan={2} className="p-3 text-center text-sm font-black text-emerald-600">
                    92.50 %
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
