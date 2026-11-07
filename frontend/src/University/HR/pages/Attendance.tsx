import React, { useState, useEffect } from 'react';
import { hrApi, AttendanceRecord } from '../services/hrApi';

export const Attendance: React.FC = () => {
  const [logs, setLogs] = useState<AttendanceRecord[]>([]);
  const [date, setDate] = useState('06 Nov 2026');

  useEffect(() => {
    hrApi.getAttendance(date).then(setLogs);
  }, [date]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Biometric Attendance Logs</h1>
          <p className="text-sm text-slate-500">Real-time daily staff check-in/out and leaves tracking</p>
        </div>
        <input
          type="text"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="e.g. 06 Nov 2026"
          className="px-3.5 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white font-medium w-44"
        />
      </div>

      <div className="overflow-x-auto bg-white rounded-xl border border-slate-200 shadow-sm">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold text-xs uppercase tracking-wider">
              <th className="py-3.5 px-4">Log ID</th>
              <th className="py-3.5 px-4">Employee</th>
              <th className="py-3.5 px-4">Department</th>
              <th className="py-3.5 px-4">Check-In</th>
              <th className="py-3.5 px-4">Check-Out</th>
              <th className="py-3.5 px-4 text-center">Status</th>
              <th className="py-3.5 px-4 text-center">Biometric</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {logs.map((log) => (
              <tr key={log.attendanceId} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3 px-4 font-mono font-medium text-slate-700">{log.attendanceId}</td>
                <td className="py-3 px-4">
                  <div className="font-semibold text-slate-800">{log.employeeName}</div>
                  <div className="text-xs text-slate-500">{log.employeeId}</div>
                </td>
                <td className="py-3 px-4 text-slate-700">{log.department}</td>
                <td className="py-3 px-4 font-mono text-slate-700">{log.checkInTime}</td>
                <td className="py-3 px-4 font-mono text-slate-700">{log.checkOutTime}</td>
                <td className="py-3 px-4 text-center">
                  <span className="px-2.5 py-1 text-xs rounded-full font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {log.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  <span className="text-xs font-semibold text-blue-600">Verified ✓</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;

