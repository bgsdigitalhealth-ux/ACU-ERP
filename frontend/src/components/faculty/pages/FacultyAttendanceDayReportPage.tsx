import React, { useState } from 'react';
import {
  Calendar,
  Search,
  RotateCcw,
  Download,
  Printer,
} from 'lucide-react';
import { useFaculty } from '../../../context/FacultyContext';

export const FacultyAttendanceDayReportPage: React.FC = () => {
  const { currentCourse, dayAttendanceRecords } = useFaculty();

  const [startDate, setStartDate] = useState('03-11-2026');
  const [endDate, setEndDate] = useState('03-11-2026');
  const [searchQuery, setSearchQuery] = useState('');
  const [displayHolidays, setDisplayHolidays] = useState(false);
  const [displaySuspendRemark, setDisplaySuspendRemark] = useState(false);
  const [includeMarkingDetails, setIncludeMarkingDetails] = useState(false);
  const [displayLeaveType, setDisplayLeaveType] = useState(false);
  const [sortBy, setSortBy] = useState('regNo');

  const filteredRecords = dayAttendanceRecords.filter(
    (r) =>
      r.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.studentRoll.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.regNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Breadcrumb matching Page 9 */}
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        HOME &gt; SUBJECT COMMUNITY &gt; {currentCourse.code} - {currentCourse.name} &gt; STUDENT ATTENDANCE &gt; DAY WISE REPORT
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-2xs p-5 space-y-4">
        {/* Title */}
        <h1 className="text-sm sm:text-base font-extrabold text-gray-900 uppercase">
          {currentCourse.name} ({currentCourse.code})
        </h1>

        {/* Date Filter Toolbar matching Page 9 */}
        <div className="p-4 bg-gray-50/80 rounded-xl border border-gray-200 flex flex-wrap items-end justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-600 uppercase">Start Date</label>
              <div className="relative">
                <input
                  type="text"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="pl-3 pr-8 py-1.5 border border-gray-300 rounded-lg text-xs bg-white focus:outline-none focus:ring-1 focus:ring-purple-600"
                />
                <Calendar className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-2.5 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-600 uppercase">End Date</label>
              <div className="relative">
                <input
                  type="text"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="pl-3 pr-8 py-1.5 border border-gray-300 rounded-lg text-xs bg-white focus:outline-none focus:ring-1 focus:ring-purple-600"
                />
                <Calendar className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-2.5 pointer-events-none" />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-4">
              <button
                onClick={() => {
                  setStartDate('03-11-2026');
                  setEndDate('03-11-2026');
                }}
                className="px-3 py-1.5 border border-gray-300 hover:bg-gray-100 text-gray-700 font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-gray-500" />
                <span>Reset</span>
              </button>
              <button
                onClick={() => alert(`Searching date: ${startDate} to ${endDate}`)}
                className="px-4 py-1.5 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search</span>
              </button>
            </div>
          </div>

          {/* Blocked Pill matching Screenshot Page 9 */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
            <span className="w-2 h-2 rounded-full bg-rose-600"></span>
            <span>Blocked : Student attendance currently locked</span>
          </div>
        </div>

        {/* Checkbox Options row matching Page 9 */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-700 pt-1">
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={displayHolidays}
              onChange={(e) => setDisplayHolidays(e.target.checked)}
              className="rounded text-purple-600 focus:ring-purple-500"
            />
            <span>Display Holidays</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={displaySuspendRemark}
              onChange={(e) => setDisplaySuspendRemark(e.target.checked)}
              className="rounded text-purple-600 focus:ring-purple-500"
            />
            <span>Display Suspend Remark</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={includeMarkingDetails}
              onChange={(e) => setIncludeMarkingDetails(e.target.checked)}
              className="rounded text-purple-600 focus:ring-purple-500"
            />
            <span>Include Marking Details</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={displayLeaveType}
              onChange={(e) => setDisplayLeaveType(e.target.checked)}
              className="rounded text-purple-600 focus:ring-purple-500"
            />
            <span>Display Student Leave Type</span>
          </label>
        </div>

        {/* Secondary Toolbar: Include columns, Search, Sort By, Export, Print */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-2 text-xs border-t border-gray-100">
          <div className="flex items-center gap-2">
            <span className="text-gray-500 font-bold uppercase text-[10px]">INCLUDE COLUMNS</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800">
              • Roll No
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800">
              • Average
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Roll No, Register No, or Name"
                className="pl-7 pr-3 py-1.5 border border-gray-300 rounded-lg text-xs bg-white focus:outline-none focus:ring-1 focus:ring-purple-600 w-48 sm:w-56"
              />
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2 top-2" />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-semibold bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-purple-600"
            >
              <option value="regNo">Sort by Register No</option>
              <option value="rollNo">Sort by Roll No</option>
              <option value="name">Sort by Student Name</option>
            </select>

            <button
              onClick={() => {
                const csv = 'ROLL NO,STUDENT NAME,H1,H2,H3,H4,H5,H6,H7,H8,ABSENT HOURS,AVG\n' +
                  filteredRecords.map(r => `${r.studentRoll},"${r.studentName}",${r.hours[1]},${r.hours[2]},${r.hours[3]},${r.hours[4]},${r.hours[5]},${r.hours[6]},${r.hours[7]},${r.hours[8]},"${r.absentHours.join(', ')}",${r.averagePercentage}%`).join('\n');
                const blob = new Blob([csv], { type: 'text/csv' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `DayWise_Report_${currentCourse.code}.csv`;
                a.click();
              }}
              className="px-3 py-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-gray-500" />
              <span>Export</span>
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

        {/* Section title banner matching Page 9 */}
        <div className="bg-gray-100 py-1.5 text-center font-black text-gray-700 text-xs tracking-wider uppercase rounded-md">
          DAY WISE REPORT
        </div>

        {/* Day-wise Table matching Screenshot Page 9 */}
        <div className="border border-gray-200 rounded-xl overflow-x-auto shadow-2xs">
          <table className="w-full text-left text-xs min-w-[850px]">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-extrabold text-[10px] uppercase">
              <tr>
                <th className="py-2.5 px-3">ROLL NO.</th>
                <th className="py-2.5 px-3 min-w-[170px]">STUDENT NAME</th>
                <th colSpan={8} className="py-1 px-2 text-center border-l border-r border-gray-200 bg-gray-100/70 font-mono text-purple-900 font-black">
                  03-11-2026
                </th>
                <th className="py-2.5 px-3 min-w-[120px]">ABSENT HOUR(S)</th>
                <th className="py-2.5 px-3 text-right">AVG</th>
              </tr>
              <tr className="border-t border-gray-200 bg-gray-50/50 text-[9px] text-gray-500 text-center">
                <th colSpan={2}></th>
                <th className="py-1 px-1 border-l border-gray-200 w-8">H1</th>
                <th className="py-1 px-1 w-8">H2</th>
                <th className="py-1 px-1 w-8">H3</th>
                <th className="py-1 px-1 w-8">H4</th>
                <th className="py-1 px-1 w-8">H5</th>
                <th className="py-1 px-1 w-8">H6</th>
                <th className="py-1 px-1 w-8">H7</th>
                <th className="py-1 px-1 border-r border-gray-200 w-8">H8</th>
                <th colSpan={2}></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {filteredRecords.map((r) => (
                <tr key={r.studentRoll} className="hover:bg-purple-50/30 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-medium text-gray-700">{r.studentRoll}</td>
                  <td className="py-2.5 px-3 font-extrabold text-gray-900 uppercase">{r.studentName}</td>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((h) => {
                    const val = r.hours[h];
                    return (
                      <td
                        key={h}
                        className={`py-2 px-1 text-center font-bold text-xs ${
                          val === 'P'
                            ? 'text-gray-800'
                            : 'text-rose-600 bg-rose-50/70 font-black'
                        }`}
                      >
                        {val}
                      </td>
                    );
                  })}
                  <td className="py-2.5 px-3 font-semibold text-rose-600">
                    {r.absentHours.length > 0 ? r.absentHours.join(', ') : '-'}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-gray-900">
                    {r.averagePercentage.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
