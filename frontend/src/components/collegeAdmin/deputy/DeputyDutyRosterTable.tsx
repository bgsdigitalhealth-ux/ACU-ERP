import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { useCollegeAdmin } from '../../../context/CollegeAdminContext';

export const DeputyDutyRosterTable: React.FC = () => {
  const { dutyRoster, setActiveDeputyModal } = useCollegeAdmin();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-purple-100 p-4 sm:p-5 flex flex-col justify-between h-full">
      {/* Title bar banner */}
      <div className="bg-gradient-to-r from-[#4B087B] to-[#7900B8] -mx-4 -mt-4 sm:-mx-5 sm:-mt-5 p-3 rounded-t-xl text-white flex items-center justify-between shadow-xs mb-3">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-amber-300" />
          <h2 className="text-xs sm:text-sm font-bold tracking-wide">
            Today's Duty Roster (FN)
          </h2>
        </div>
      </div>

      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-gray-700 bg-gray-50/70">
              <th className="py-2 px-3 font-bold">Hall No.</th>
              <th className="py-2 px-3 font-bold">Invigilators</th>
              <th className="py-2 px-3 font-bold text-center">Seats</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {dutyRoster.map((item, idx) => (
              <tr key={idx} className="hover:bg-purple-50/40 transition-colors">
                <td className="py-2 px-3 font-bold text-gray-900">{item.hallNo}</td>
                <td className="py-2 px-3 font-medium text-gray-800">{item.invigilators}</td>
                <td className="py-2 px-3 text-center font-bold text-purple-900">{item.seats}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bottom link to view full roster */}
      <div className="pt-3 border-t border-gray-100 flex justify-end">
        <button
          onClick={() => setActiveDeputyModal('roster')}
          className="text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1 cursor-pointer group"
        >
          <span>View Full Duty Roster</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};

