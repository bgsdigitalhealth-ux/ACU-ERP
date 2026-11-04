import React, { useState } from 'react';
import {
  RotateCcw,
  Search,
  SlidersHorizontal,
  Calendar,
} from 'lucide-react';
import { useFaculty } from '../../../context/FacultyContext';

export const FacultySubstitutionReportPage: React.FC = () => {
  const { substitutions } = useFaculty();

  const [dateStr, setDateStr] = useState('03-11-2026');
  const [hasSearched, setHasSearched] = useState(true);
  const [showFilters, setShowFilters] = useState(true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
  };

  const handleReset = () => {
    setDateStr('');
    setHasSearched(false);
  };

  return (
    <div className="space-y-4">
      {/* Breadcrumb matching Page 31 */}
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        SUBSTITUTION REPORT
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-2xs p-5 space-y-4">
        {/* Toggle */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-3 py-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-gray-500" />
            <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
          </button>
        </div>

        {/* Filter Toolbar matching Screenshot Page 31 */}
        {showFilters && (
          <form onSubmit={handleSearch} className="p-4 bg-gray-50/80 rounded-xl border border-gray-200 flex flex-wrap items-end gap-3 text-xs">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-600 uppercase">Date *</label>
              <div className="relative">
                <input
                  type="text"
                  value={dateStr}
                  onChange={(e) => setDateStr(e.target.value)}
                  className="pl-3 pr-8 py-1.5 border border-gray-300 rounded-lg text-xs bg-white focus:outline-none focus:ring-1 focus:ring-purple-600 w-48"
                />
                <Calendar className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-2.5 pointer-events-none" />
              </div>
            </div>

            <div className="flex items-center gap-2">
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

        {/* Prompt matching Screenshot Page 31 */}
        {!hasSearched ? (
          <div className="py-20 text-center text-gray-400 space-y-2">
            <div className="text-3xl font-mono text-gray-300 font-bold">EQ</div>
            <p className="text-xs font-semibold text-gray-500">
              Search with a filter to view timetable swapped hours
            </p>
          </div>
        ) : (
          /* Substitution Table */
          <div className="space-y-3 pt-2 animate-in fade-in duration-150">
            <div className="border border-gray-200 rounded-xl overflow-x-auto shadow-2xs">
              <table className="w-full text-left text-xs min-w-[750px]">
                <thead className="bg-gray-100/90 border-b border-gray-200 text-gray-700 font-extrabold text-[10px] uppercase">
                  <tr>
                    <th className="py-2.5 px-3">DATE</th>
                    <th className="py-2.5 px-3 text-center">HOUR</th>
                    <th className="py-2.5 px-3">COURSE</th>
                    <th className="py-2.5 px-3">ORIGINAL FACULTY</th>
                    <th className="py-2.5 px-3">SUBSTITUTE FACULTY</th>
                    <th className="py-2.5 px-3">REASON</th>
                    <th className="py-2.5 px-3 text-right">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {substitutions.map((sub) => (
                    <tr key={sub.id} className="hover:bg-purple-50/20 transition-colors">
                      <td className="py-2.5 px-3 font-mono font-bold text-gray-800">{sub.date}</td>
                      <td className="py-2.5 px-3 text-center font-bold text-purple-700">Hour {sub.hour}</td>
                      <td className="py-2.5 px-3 font-semibold text-gray-900">{sub.courseCode}</td>
                      <td className="py-2.5 px-3 text-gray-600">{sub.originalFaculty}</td>
                      <td className="py-2.5 px-3 font-bold text-purple-900">{sub.substituteFaculty}</td>
                      <td className="py-2.5 px-3 text-gray-500 max-w-xs truncate">{sub.reason}</td>
                      <td className="py-2.5 px-3 text-right">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          {sub.status}
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
