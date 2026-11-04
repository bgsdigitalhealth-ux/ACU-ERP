import React from 'react';
import { Clock } from 'lucide-react';
import { useUniversityAdmin } from '../../../context/UniversityAdminContext';

export const VcRecentActivities: React.FC = () => {
  const { vcActivities } = useUniversityAdmin();

  return (
    <div className="w-full bg-white rounded-2xl border border-purple-200/90 shadow-2xs overflow-hidden flex flex-col justify-between select-none">
      {/* Header Bar */}
      <div className="bg-gradient-to-r from-[#440d75] to-[#2d0850] text-white px-4 sm:px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-amber-300" />
          <h3 className="font-extrabold text-sm sm:text-base tracking-tight text-white">
            Recent Activities
          </h3>
        </div>
        <span className="text-[11px] text-purple-200 font-medium hover:text-white cursor-pointer">
          View All →
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#f9f5ff] text-[#4a157c] font-extrabold border-b border-purple-100">
            <tr>
              <th className="py-2.5 px-4">Date</th>
              <th className="py-2.5 px-4">Activity</th>
              <th className="py-2.5 px-4">Reference</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-100">
            {vcActivities.map((act) => (
              <tr key={act.id} className="hover:bg-purple-50/50 transition-colors">
                <td className="py-2.5 px-4 font-semibold text-gray-700 whitespace-nowrap">{act.date}</td>
                <td className="py-2.5 px-4 font-bold text-gray-900">{act.activity}</td>
                <td className="py-2.5 px-4 font-mono text-[11px] font-semibold text-purple-900">{act.reference}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

