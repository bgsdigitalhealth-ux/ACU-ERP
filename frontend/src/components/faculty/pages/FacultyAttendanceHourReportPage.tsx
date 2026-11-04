import React, { useState } from 'react';
import {
  Calendar,
  Search,
  RotateCcw,
  Download,
} from 'lucide-react';
import { useFaculty } from '../../../context/FacultyContext';

export const FacultyAttendanceHourReportPage: React.FC = () => {
  const { currentCourse, students } = useFaculty();

  const [dateRange, setDateRange] = useState('03-11-2026');
  const [displayLeaveType, setDisplayLeaveType] = useState(false);
  const [sortBy, setSortBy] = useState('roll');

  const hourColumns = [
    '07-08-2026 HOUR 8',
    '11-08-2026 HOUR 2',
    '14-08-2026 HOUR 8',
    '18-08-2026 HOUR 2',
    '21-08-2026 HOUR 8',
    '25-08-2026 HOUR 2',
    '28-08-2026 HOUR 8',
    '01-09-2026 HOUR 2',
    '08-09-2026 HOUR 2',
    '09-09-2026 HOUR 8',
    '11-09-2026 HOUR 8',
    '15-09-2026 HOUR 2',
  ];

  // Specific attendance patterns matching Screenshot Page 8
  const getStudentHourValue = (rollNo: string, colIdx: number): 'P' | 'A' => {
    if (rollNo === '20241MBBS0005') {
      return [0, 1, 11].includes(colIdx) ? 'A' : 'P';
    }
    if (rollNo === '20241MBBS0009') {
      return [0, 2, 6, 11].includes(colIdx) ? 'A' : 'P';
    }
    if (rollNo === '20241MBBS0010') {
      return [5, 6, 7].includes(colIdx) ? 'A' : 'P';
    }
    if (rollNo === '20241MBBS0013') {
      return colIdx === 6 ? 'A' : 'P';
    }
    if (rollNo === '20241MBBS0018') {
      return [0, 3, 5, 10].includes(colIdx) ? 'A' : 'P';
    }
    return colIdx % 7 === 0 && colIdx > 0 ? 'A' : 'P';
  };

  const sortedStudents = [...students].sort((a, b) =>
    sortBy === 'roll' ? a.rollNo.localeCompare(b.rollNo) : a.name.localeCompare(b.name)
  );

  return (
    <div className="space-y-4">
      {/* Breadcrumb matching Page 7 & 8 */}
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        HOME &gt; SUBJECT COMMUNITY &gt; {currentCourse.code} - {currentCourse.name} &gt; STUDENT ATTENDANCE &gt; HOUR WISE REPORT
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-2xs p-5 space-y-4">
        {/* Title */}
        <h1 className="text-sm sm:text-base font-extrabold text-gray-900 uppercase">
          {currentCourse.name} ({currentCourse.code})
        </h1>

        {/* Filter Toolbar matching Screenshot Page 8 */}
        <div className="p-4 bg-gray-50/80 rounded-xl border border-gray-200 flex flex-wrap items-end gap-3 text-xs">
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-600 uppercase">Attendance Date Range</label>
            <div className="relative">
              <input
                type="text"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="pl-3 pr-8 py-1.5 border border-gray-300 rounded-lg text-xs bg-white focus:outline-none focus:ring-1 focus:ring-purple-600"
              />
              <Calendar className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-2.5 pointer-events-none" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setDateRange('03-11-2026')}
              className="px-3 py-1.5 border border-gray-300 hover:bg-gray-100 text-gray-700 font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-gray-500" />
              <span>Reset</span>
            </button>
            <button
              onClick={() => alert(`Searching records for: ${dateRange}`)}
              className="px-4 py-1.5 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search</span>
            </button>
          </div>
        </div>

        {/* Action Controls row matching Page 8 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 text-xs">
          <label className="flex items-center gap-2 text-gray-700 font-medium cursor-pointer">
            <input
              type="checkbox"
              checked={displayLeaveType}
              onChange={(e) => setDisplayLeaveType(e.target.checked)}
              className="rounded text-purple-600 focus:ring-purple-500"
            />
            <span>Display student leave type</span>
          </label>

          <div className="flex items-center gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-semibold bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-purple-600"
            >
              <option value="roll">Sort by roll number</option>
              <option value="name">Sort by student name</option>
            </select>

            <button
              onClick={() => {
                const csv = 'SL,ROLL,NAME,' + hourColumns.join(',') + '\n' +
                  sortedStudents.map(st => `${st.slNo},${st.rollNo},${st.name},` + hourColumns.map((_, i) => getStudentHourValue(st.rollNo, i)).join(',')).join('\n');
                const blob = new Blob([csv], { type: 'text/csv' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `Hour_Wise_Report_${currentCourse.code}.csv`;
                a.click();
              }}
              className="px-3 py-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-gray-500" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Detailed Hour-wise Table matching Screenshot Page 8 */}
        <div className="border border-gray-200 rounded-xl overflow-x-auto shadow-2xs">
          <table className="w-full text-left text-xs min-w-[950px]">
            <thead className="bg-gray-100/90 border-b border-gray-200 text-gray-700 font-extrabold text-[10px] uppercase">
              <tr>
                <th className="py-2.5 px-3 text-center w-12">SL. NO</th>
                <th className="py-2.5 px-3 w-32">ROLL NUMBER</th>
                <th className="py-2.5 px-3 min-w-[160px]">STUDENT NAME</th>
                {hourColumns.map((col, idx) => (
                  <th key={idx} className="py-2.5 px-2 text-center text-[9px] font-bold tracking-tight whitespace-nowrap">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {sortedStudents.map((st) => (
                <tr key={st.rollNo} className="hover:bg-purple-50/30 transition-colors">
                  <td className="py-2 px-3 text-center font-bold text-gray-500">{st.slNo}</td>
                  <td className="py-2 px-3 font-mono font-medium text-gray-700">{st.rollNo}</td>
                  <td className="py-2 px-3 font-extrabold text-gray-900 uppercase truncate max-w-[200px]">
                    {st.name}
                  </td>
                  {hourColumns.map((_, i) => {
                    const status = getStudentHourValue(st.rollNo, i);
                    return (
                      <td
                        key={i}
                        className={`py-2 px-2 text-center font-bold text-xs ${
                          status === 'P' ? 'text-gray-800' : 'text-rose-600 bg-rose-50/60 font-black'
                        }`}
                      >
                        {status}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
