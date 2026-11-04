import React from 'react';
import { BarChart3 } from 'lucide-react';
import { useCollegeAdmin } from '../../../context/CollegeAdminContext';
import { ExamConductRow } from '../../../types/collegeAdmin';

export const DeanExamConductStatusTable: React.FC = () => {
  const { examConductRows } = useCollegeAdmin();

  const getStatusBadge = (status: ExamConductRow['status']) => {
    switch (status) {
      case 'In Progress':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold';
      case 'Scheduled':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'Completed':
      default:
        return 'bg-blue-100 text-blue-900 border-blue-300';
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-purple-200/90 shadow-2xs overflow-hidden flex flex-col justify-between select-none">
      {/* Header Bar */}
      <div className="bg-gradient-to-r from-[#440d75] to-[#2d0850] text-white px-4 sm:px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-amber-300" />
          <h3 className="font-extrabold text-sm sm:text-base tracking-tight text-white">
            Exam Conduct Status
          </h3>
        </div>
        <span className="text-[11px] text-purple-200 font-medium bg-purple-900/60 px-2 py-0.5 rounded-full border border-purple-400/30">
          Campus Hall Status
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#f9f5ff] text-[#4a157c] font-extrabold border-b border-purple-100">
            <tr>
              <th className="py-2.5 px-4">Session</th>
              <th className="py-2.5 px-3 text-center">Centres</th>
              <th className="py-2.5 px-3 text-center">Halls</th>
              <th className="py-2.5 px-3 text-center">Seats</th>
              <th className="py-2.5 px-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-100">
            {examConductRows.map((row, idx) => (
              <tr key={idx} className="hover:bg-purple-50/50 transition-colors">
                <td className="py-2.5 px-4 font-bold text-gray-900">{row.session}</td>
                <td className="py-2.5 px-3 text-center font-semibold text-gray-700">{row.centres}</td>
                <td className="py-2.5 px-3 text-center font-semibold text-gray-700">{row.halls}</td>
                <td className="py-2.5 px-3 text-center font-semibold text-purple-900">{row.seats}</td>
                <td className="py-2.5 px-3 text-center">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(row.status)}`}>
                    {row.status === 'In Progress' ? '✓ In Progress' : row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

