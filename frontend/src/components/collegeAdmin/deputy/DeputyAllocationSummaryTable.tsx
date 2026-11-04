import React from 'react';
import { Users, CheckCircle, Clock } from 'lucide-react';
import { useCollegeAdmin } from '../../../context/CollegeAdminContext';

export const DeputyAllocationSummaryTable: React.FC = () => {
  const { allocationSummary } = useCollegeAdmin();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-purple-100 p-4 sm:p-5 flex flex-col justify-between h-full">
      {/* Title bar banner */}
      <div className="bg-gradient-to-r from-[#4B087B] to-[#7900B8] -mx-4 -mt-4 sm:-mx-5 sm:-mt-5 p-3 rounded-t-xl text-white flex items-center justify-between shadow-xs mb-3">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-amber-300" />
          <h2 className="text-xs sm:text-sm font-bold tracking-wide">
            Invigilator Allocation – Summary
          </h2>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-gray-700 bg-gray-50/70">
              <th className="py-2 px-3 font-bold">Session</th>
              <th className="py-2 px-3 font-bold text-center">Required</th>
              <th className="py-2 px-3 font-bold text-center">Allocated</th>
              <th className="py-2 px-3 font-bold text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {allocationSummary.map((row, idx) => (
              <tr key={idx} className="hover:bg-purple-50/40 transition-colors">
                <td className="py-2.5 px-3 font-medium text-gray-800">{row.session}</td>
                <td className="py-2.5 px-3 text-center font-bold text-gray-700">{row.required}</td>
                <td className="py-2.5 px-3 text-center font-bold text-purple-900">{row.allocated}</td>
                <td className="py-2.5 px-3 text-center">
                  {row.status === 'Completed' ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-green-100 text-green-700 border border-green-200">
                      <CheckCircle className="w-3 h-3" /> Completed
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-700 border border-amber-200">
                      <Clock className="w-3 h-3" /> In Progress
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

