import React, { useState } from 'react';
import { Calendar, CheckCircle2, ChevronRight, X } from 'lucide-react';
import { useHod } from '../../context/HodContext';
import { HodSubmissionRecord } from '../../types/hod';

export const HodRecentSubmissions: React.FC = () => {
  const { submissions } = useHod();
  const [selectedSub, setSelectedSub] = useState<HodSubmissionRecord | null>(null);

  const getStatusBadge = (status: HodSubmissionRecord['status']) => {
    switch (status) {
      case 'Approved':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Forwarded':
        return 'bg-sky-100 text-sky-800 border-sky-300';
      case 'Modification Requested':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Pending':
      default:
        return 'bg-purple-100 text-purple-800 border-purple-300';
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-purple-200/90 shadow-2xs overflow-hidden flex flex-col justify-between select-none">
      {/* Header Bar */}
      <div className="bg-gradient-to-r from-[#440d75] to-[#2d0850] text-white px-4 sm:px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Calendar className="w-5 h-5 text-amber-300" />
          <h3 className="font-extrabold text-sm sm:text-base tracking-tight text-white">
            Recent Submissions – Department
          </h3>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-[#fcfaff] text-[#475569] font-bold border-b border-purple-100 uppercase tracking-wider text-[11px]">
              <th className="py-2.5 px-4 sm:px-5 font-extrabold text-[#2e1065] w-28">Date</th>
              <th className="py-2.5 px-3">Activity</th>
              <th className="py-2.5 px-3">Subject</th>
              <th className="py-2.5 px-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-50 text-[12.5px] font-medium text-[#1e293b]">
            {submissions.slice(0, 3).map((sub) => (
              <tr
                key={sub.id}
                onClick={() => setSelectedSub(sub)}
                className="hover:bg-purple-50/60 transition-colors cursor-pointer group"
              >
                <td className="py-3 px-4 sm:px-5 text-gray-500 font-semibold whitespace-nowrap">
                  {sub.date}
                </td>
                <td className="py-3 px-3 font-bold text-[#1e1b4b] group-hover:text-purple-900 transition-colors">
                  {sub.activity}
                </td>
                <td className="py-3 px-3 text-gray-600 font-semibold whitespace-nowrap">
                  {sub.subject}
                </td>
                <td className="py-3 px-4 text-center">
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-[10.5px] font-bold border ${getStatusBadge(
                      sub.status
                    )}`}
                  >
                    {sub.status === 'Approved' && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                    <span>{sub.status}</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Link */}
      <div className="p-2.5 bg-purple-50/50 border-t border-purple-100 text-center">
        <button
          onClick={() => setSelectedSub(submissions[0] || null)}
          className="text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center justify-center gap-1 mx-auto transition-colors cursor-pointer"
        >
          <span>View All Activities</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Submission Details Modal */}
      {selectedSub && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-2xs animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border-2 border-purple-200">
            <div className="flex items-start justify-between pb-3 border-b border-gray-100">
              <div>
                <span className="text-[10px] font-extrabold text-purple-700 bg-purple-100 px-2 py-0.5 rounded">
                  {selectedSub.refNumber}
                </span>
                <h3 className="text-base font-extrabold text-[#1e1b4b] mt-1">
                  {selectedSub.activity}
                </h3>
                <p className="text-xs text-gray-500">{selectedSub.examination}</p>
              </div>
              <button
                onClick={() => setSelectedSub(null)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="my-4 text-xs space-y-2.5">
              <div className="grid grid-cols-2 gap-2 bg-purple-50/60 p-3 rounded-xl border border-purple-100">
                <div>
                  <span className="text-gray-500 block">Submitted On:</span>
                  <span className="font-bold text-[#1e1b4b]">{selectedSub.date}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">Current Status:</span>
                  <span className="font-bold text-emerald-700">{selectedSub.status}</span>
                </div>
              </div>

              <div>
                <span className="text-gray-500 font-bold block mb-1">Details &amp; Observations:</span>
                <p className="text-gray-800 leading-relaxed bg-[#fcfaff] p-3 rounded-xl border border-purple-100 text-[12px]">
                  {selectedSub.details}
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedSub(null)}
                className="px-4 py-2 bg-[#4a157c] text-white rounded-xl text-xs font-bold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
