import React, { useState } from 'react';
import { useFaculty } from '../../../context/FacultyContext';
import { AttendanceRecordRow } from '../../../types/faculty';
import { Search, RotateCcw, Calendar, Download, Printer, Filter, CheckCircle } from 'lucide-react';

export const FacultyAttendanceReportsPage: React.FC = () => {
  const { students, dayAttendanceRecords } = useFaculty();
  const [activeTab, setActiveTab] = useState<'day' | 'week'>('day');
  const [fromDate, setFromDate] = useState('2024-11-01');
  const [toDate, setToDate] = useState('2025-02-28');
  const [selectedBatch, setSelectedBatch] = useState('2024MBBS01');
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    setHasSearched(true);
  };

  const handleReset = () => {
    setFromDate('2025-01-01');
    setToDate('2025-03-31');
    setHasSearched(false);
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb & Header */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 uppercase tracking-wider mb-1 font-semibold">
              <span>Attendance Reports</span>
              <span>&gt;</span>
              <span className="text-purple-700">Day / Week Wise Report</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-800">Day / Week Wise Attendance Report</h1>
            <p className="text-sm text-slate-500">Comprehensive aggregated attendance summary across sessions</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition"
            >
              <Printer className="w-4 h-4" />
              <span>Print</span>
            </button>
            <button
              onClick={() => alert('Downloading Excel report...')}
              className="flex items-center gap-2 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium shadow-sm transition"
            >
              <Download className="w-4 h-4" />
              <span>Export Excel</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 mt-6 gap-8">
          <button
            onClick={() => setActiveTab('day')}
            className={`pb-3 text-sm font-semibold transition border-b-2 ${
              activeTab === 'day'
                ? 'border-purple-600 text-purple-700'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            Day Wise Report
          </button>
          <button
            onClick={() => setActiveTab('week')}
            className={`pb-3 text-sm font-semibold transition border-b-2 ${
              activeTab === 'week'
                ? 'border-purple-600 text-purple-700'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            Week Wise Report
          </button>
        </div>

        {/* Filter Controls (Page 32) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-5 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Batch / Class</label>
            <select
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
              className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="2024MBBS01">2024MBBS01 - First MBBS (Batch A)</option>
              <option value="2024MBBS02">2024MBBS02 - Phase 1 (Batch B)</option>
              <option value="2023MBBS01">2023MBBS01 - Second MBBS</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">From Date</label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full text-sm border border-slate-300 rounded-lg pl-9 pr-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">To Date</label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full text-sm border border-slate-300 rounded-lg pl-9 pr-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div className="flex items-end gap-2">
            <button
              onClick={handleSearch}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-lg text-sm font-semibold transition shadow-sm"
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>
            <button
              onClick={handleReset}
              className="flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-sm font-medium transition"
              title="Reset Filters"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {!hasSearched ? (
        // Empty state exactly matching Screenshot Page 32
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-16 text-center">
          <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600">
            <Filter className="w-10 h-10 stroke-[1.5]" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-1">Search with a filter to view the attendance report</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Select a batch, set the date range, and click the Search button above to generate the {activeTab === 'day' ? 'day-wise' : 'week-wise'} attendance aggregated ledger.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-800">Generated Report:</span>
              <span className="text-sm text-slate-600">
                {selectedBatch} | {fromDate} to {toDate} ({students.length} students recorded)
              </span>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" /> Ready
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                  <th className="py-3 px-4 w-12 text-center">#</th>
                  <th className="py-3 px-4">Roll Number</th>
                  <th className="py-3 px-4">Student Name</th>
                  <th className="py-3 px-4 text-center">Total Classes</th>
                  <th className="py-3 px-4 text-center">Attended</th>
                  <th className="py-3 px-4 text-center">Absent</th>
                  <th className="py-3 px-4 text-center">Percentage</th>
                  <th className="py-3 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {dayAttendanceRecords.map((rec: AttendanceRecordRow, index: number) => {
                  const isEligible = rec.averagePercentage >= 75;
                  const total = 8;
                  const absent = rec.absentHours.length;
                  const attended = total - absent;

                  return (
                    <tr key={rec.studentRoll} className="hover:bg-slate-50 transition">
                      <td className="py-3 px-4 text-center font-medium text-slate-500">{index + 1}</td>
                      <td className="py-3 px-4 font-mono font-medium text-purple-700">{rec.studentRoll}</td>
                      <td className="py-3 px-4 font-medium text-slate-800">{rec.studentName}</td>
                      <td className="py-3 px-4 text-center font-medium text-slate-600">{total}</td>
                      <td className="py-3 px-4 text-center font-bold text-emerald-600">{attended}</td>
                      <td className="py-3 px-4 text-center font-bold text-rose-500">{absent}</td>
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`font-bold px-2 py-0.5 rounded text-xs ${
                            rec.averagePercentage >= 85
                              ? 'bg-emerald-100 text-emerald-800'
                              : rec.averagePercentage >= 75
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {rec.averagePercentage}%
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        {isEligible ? (
                          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            Eligible
                          </span>
                        ) : (
                          <span className="text-xs font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                            Condonation Req.
                          </span>
                        )}
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
  );
};
