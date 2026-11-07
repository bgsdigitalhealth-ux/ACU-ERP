import React from 'react';
import { Calendar } from 'lucide-react';
import { useUniversityAdmin } from '../../../context/UniversityAdminContext';

export const RegistrarRecentActivities: React.FC = () => {
  const { registrarActivities } = useUniversityAdmin();

  return (
    <div className="w-full bg-white rounded-2xl border border-purple-200/90 shadow-2xs overflow-hidden flex flex-col justify-between select-none">
      {/* Header Bar */}
      <div className="bg-gradient-to-r from-[#440d75] to-[#2d0850] text-white px-4 sm:px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-amber-300" />
          <h3 className="font-extrabold text-sm sm:text-base tracking-tight text-white">
            Recent Activities
          </h3>
        </div>
        <span className="text-[11px] text-purple-200 font-medium bg-purple-900/60 px-2 py-0.5 rounded-full border border-purple-400/30">
          Evaluation Log
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#f9f5ff] text-[#4a157c] font-extrabold border-b border-purple-100">
            <tr>
              <th className="py-2.5 px-4">Date & Time</th>
              <th className="py-2.5 px-4">Activity</th>
              <th className="py-2.5 px-4">Details / Remarks</th>
              <th className="py-2.5 px-4">By</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-100">
            {registrarActivities.map((row) => (
              <tr key={row.id} className="hover:bg-purple-50/50 transition-colors">
                <td className="py-2.5 px-4 font-semibold text-gray-700 whitespace-nowrap">{row.dateTime}</td>
                <td className="py-2.5 px-4 font-bold text-gray-900">{row.activity}</td>
                <td className="py-2.5 px-4 text-gray-600">{row.details}</td>
                <td className="py-2.5 px-4 font-semibold text-purple-900">{row.by}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

