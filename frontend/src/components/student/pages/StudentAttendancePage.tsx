import React, { useState } from 'react';
import {
  Info,
  Printer,
  FileSpreadsheet,
} from 'lucide-react';
import { useStudent } from '../../../context/StudentContext';

export const StudentAttendancePage: React.FC = () => {
  const { attendance, activeSubmenu, navigate } = useStudent();
  const [dateRange, setDateRange] = useState('01-08-2026 to 03-11-2026');

  // Compute Totals dynamically
  const totalTH = attendance.reduce((acc, row) => acc + row.th, 0);
  const totalAH = attendance.reduce((acc, row) => acc + row.ah, 0);
  const totalDL = attendance.reduce((acc, row) => acc + row.dl, 0);
  const totalAHDL = attendance.reduce((acc, row) => acc + row.ahDl, 0);
  const totalAHPercent = totalTH > 0 ? (totalAH / totalTH) * 100 : 0;
  const totalAHDLPercent = totalTH > 0 ? (totalAHDL / totalTH) * 100 : 0;

  return (
    <div className="space-y-4">
      {/* Breadcrumb matching Page 8 */}
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        ATTENDANCE &gt;{' '}
        {activeSubmenu === 'week-wise'
          ? 'WEEK-WISE REPORT'
          : activeSubmenu === 'daily'
          ? 'DAILY ATTENDANCE'
          : 'COURSE WISE REPORT'}
      </div>

      {/* Submenu Tabs Bar */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => navigate('attendance', 'course-wise')}
          className={`py-2 px-5 text-xs font-bold border-b-2 transition-all cursor-pointer ${
            activeSubmenu === 'course-wise'
              ? 'border-[#7047eb] text-[#7047eb] bg-purple-50/40'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          Course Wise Report
        </button>
        <button
          onClick={() => navigate('attendance', 'week-wise')}
          className={`py-2 px-5 text-xs font-bold border-b-2 transition-all cursor-pointer ${
            activeSubmenu === 'week-wise'
              ? 'border-[#7047eb] text-[#7047eb] bg-purple-50/40'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          Week-wise Report
        </button>
        <button
          onClick={() => navigate('attendance', 'daily')}
          className={`py-2 px-5 text-xs font-bold border-b-2 transition-all cursor-pointer ${
            activeSubmenu === 'daily'
              ? 'border-[#7047eb] text-[#7047eb] bg-purple-50/40'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          Daily Attendance
        </button>
      </div>

      {/* Information Banner matching Page 8 */}
      <div className="bg-white rounded-xl p-3 sm:p-4 border border-gray-200 shadow-2xs flex items-center justify-between gap-3">
        <div className="flex items-start gap-2 text-xs text-gray-700">
          <Info className="w-4 h-4 text-gray-500 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Note: </span>
            <span className="text-gray-600">
              When the rule Attendance count from date of admission is enabled, data is shown from the date of admission. Minimum 75% required for examination eligibility.
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => alert('Exporting attendance report as CSV/Excel...')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-300 hover:bg-gray-50 text-xs font-bold text-gray-700 transition-colors cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
            <span>Export</span>
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-300 hover:bg-gray-50 text-xs font-bold text-gray-700 transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-gray-600" />
            <span>Print</span>
          </button>
        </div>
      </div>

      {/* TAB 1: COURSE WISE REPORT matching Page 8 */}
      {activeSubmenu === 'course-wise' && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-2xs overflow-hidden space-y-4 p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
            <h3 className="text-xs sm:text-sm font-extrabold text-gray-900 tracking-wide uppercase">
              COURSE WISE REPORT
            </h3>
            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold text-gray-600">Date range:</span>
              <input
                type="text"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="bg-gray-50 border border-gray-300 rounded px-2.5 py-1 text-xs text-gray-800 outline-hidden font-medium"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-gray-100/90 text-gray-700 font-black text-[11px] border-b border-gray-200 uppercase">
                  <th className="p-3 w-16 text-center">SL.NO.</th>
                  <th className="p-3">COURSE NAME</th>
                  <th className="p-3 text-center">TH</th>
                  <th className="p-3 text-center">AH</th>
                  <th className="p-3 text-center">DL</th>
                  <th className="p-3 text-center">AH + DL</th>
                  <th className="p-3 text-center">AH%</th>
                  <th className="p-3 text-center">AH+DL%</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {attendance.map((row) => (
                  <tr key={row.slNo} className="hover:bg-purple-50/20 transition-colors">
                    <td className="p-3 text-center font-bold text-gray-500">{row.slNo}</td>
                    <td className="p-3 font-bold text-gray-900">{row.courseName}</td>
                    <td className="p-3 text-center font-semibold text-gray-700">{row.th}</td>
                    <td className="p-3 text-center font-semibold text-gray-700">{row.ah}</td>
                    <td className="p-3 text-center font-semibold text-gray-700">{row.dl}</td>
                    <td className="p-3 text-center font-bold text-gray-800">{row.ahDl}</td>
                    <td
                      className={`p-3 text-center font-black ${
                        row.ahPercent >= 75
                          ? 'text-emerald-600'
                          : row.th === 0
                          ? 'text-gray-400'
                          : 'text-amber-600'
                      }`}
                    >
                      {row.ahPercent.toFixed(2)} %
                    </td>
                    <td
                      className={`p-3 text-center font-black ${
                        row.ahDlPercent >= 75
                          ? 'text-emerald-600'
                          : row.th === 0
                          ? 'text-gray-400'
                          : 'text-amber-600'
                      }`}
                    >
                      {row.ahDlPercent.toFixed(2)} %
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-50/80 font-black text-xs border-t-2 border-gray-300">
                  <td colSpan={2} className="p-3 text-right text-gray-900 uppercase">
                    Total
                  </td>
                  <td className="p-3 text-center text-gray-900">{totalTH}</td>
                  <td className="p-3 text-center text-gray-900">{totalAH}</td>
                  <td className="p-3 text-center text-gray-900">{totalDL}</td>
                  <td className="p-3 text-center text-gray-900">{totalAHDL}</td>
                  <td className="p-3 text-center text-purple-700 font-extrabold">
                    {totalAHPercent.toFixed(2)} %
                  </td>
                  <td className="p-3 text-center text-purple-700 font-extrabold">
                    {totalAHDLPercent.toFixed(2)} %
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: WEEK-WISE REPORT */}
      {activeSubmenu === 'week-wise' && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-2xs p-5 space-y-4">
          <h3 className="text-sm font-extrabold text-gray-900 border-b border-gray-100 pb-2">
            WEEK-WISE ATTENDANCE AGGREGATION
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700 font-bold border-b border-gray-200">
                  <th className="p-2.5">Week No.</th>
                  <th className="p-2.5">Academic Duration</th>
                  <th className="p-2.5 text-center">Classes Scheduled</th>
                  <th className="p-2.5 text-center">Classes Attended</th>
                  <th className="p-2.5 text-center">Duty Leaves</th>
                  <th className="p-2.5 text-center">Weekly Percentage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { week: 'Week 13', dates: '26 Oct 2026 - 31 Oct 2026', sch: 16, att: 13, dl: 0, pct: '81.25%' },
                  { week: 'Week 12', dates: '19 Oct 2026 - 24 Oct 2026', sch: 18, att: 15, dl: 0, pct: '83.33%' },
                  { week: 'Week 11', dates: '12 Oct 2026 - 17 Oct 2026', sch: 18, att: 14, dl: 0, pct: '77.78%' },
                  { week: 'Week 10', dates: '05 Oct 2026 - 10 Oct 2026', sch: 17, att: 13, dl: 0, pct: '76.47%' },
                ].map((w, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="p-2.5 font-bold text-purple-700">{w.week}</td>
                    <td className="p-2.5 text-gray-700 font-medium">{w.dates}</td>
                    <td className="p-2.5 text-center font-bold text-gray-800">{w.sch}</td>
                    <td className="p-2.5 text-center font-bold text-emerald-700">{w.att}</td>
                    <td className="p-2.5 text-center text-gray-500">{w.dl}</td>
                    <td className="p-2.5 text-center font-black text-gray-900">{w.pct}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: DAILY ATTENDANCE */}
      {activeSubmenu === 'daily' && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-2xs p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
            <h3 className="text-sm font-extrabold text-gray-900">
              DAILY CLASS ATTENDANCE LOG
            </h3>
            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold text-gray-600">Select Date:</span>
              <input
                type="date"
                defaultValue="2026-11-02"
                className="bg-gray-50 border border-gray-300 rounded px-2.5 py-1 text-xs text-gray-800 outline-hidden"
              />
            </div>
          </div>

          <div className="space-y-2.5">
            {[
              { hour: 'Hour 1 (08:45 - 09:40)', course: 'Human Physiology I & II (PHY101)', faculty: 'Prof. Dr. Mohammed Ismail Razee, MD', status: 'Present' },
              { hour: 'Hour 2 (09:45 - 10:40)', course: 'Human Physiology Hematology Lab (PHY101-L)', faculty: 'Prof. Dr. Mohammed Ismail Razee, MD', status: 'Present' },
              { hour: 'Hour 3 (10:55 - 11:50)', course: 'Human Anatomy Cadaveric Dissection (ANA101)', faculty: 'Dr. Shwetha K., MS (Anatomy)', status: 'Present' },
              { hour: 'Hour 4 (11:55 - 12:50)', course: 'Medical Biochemistry & Diagnostics (BIO101)', faculty: 'Dr. Anand Acharya, MD (Biochemistry)', status: 'Absent' },
              { hour: 'Hour 5 (01:30 - 02:25)', course: 'Early Clinical Exposure & Ethics (ECE101)', faculty: 'Dr. B. G. Dharanendra, MD (Medicine)', status: 'Present' },
            ].map((log, idx) => (
              <div key={idx} className="p-3 rounded-lg border border-gray-200 flex items-center justify-between hover:bg-gray-50">
                <div>
                  <span className="text-[11px] font-bold text-purple-700">{log.hour}</span>
                  <h4 className="text-xs font-bold text-gray-900">{log.course}</h4>
                  <p className="text-[11px] text-gray-500">Instructor: {log.faculty}</p>
                </div>
                <span
                  className={`px-2.5 py-1 rounded text-xs font-bold ${
                    log.status === 'Present'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {log.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
