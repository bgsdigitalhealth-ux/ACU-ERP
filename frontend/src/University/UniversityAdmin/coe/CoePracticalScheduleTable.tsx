import React from 'react';
import { Calendar } from 'lucide-react';
import { useUniversityAdmin } from '../../../context/UniversityAdminContext';

export const CoePracticalScheduleTable: React.FC = () => {
  const { practicalSchedule, setToast } = useUniversityAdmin();

  return (
    <div className="w-full bg-white rounded-2xl border border-purple-200/90 shadow-2xs overflow-hidden flex flex-col justify-between select-none">
      {/* Header Bar */}
      <div className="bg-gradient-to-r from-[#440d75] to-[#2d0850] text-white px-4 sm:px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-amber-300" />
          <h3 className="font-extrabold text-sm sm:text-base tracking-tight text-white">
            Exam Schedule – Practical
          </h3>
        </div>
        <button
          onClick={() => setToast('Opening complete university practical schedule.')}
          className="text-[11px] text-purple-200 font-medium hover:text-white cursor-pointer"
        >
          View Full Schedule →
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#f9f5ff] text-[#4a157c] font-extrabold border-b border-purple-100">
            <tr>
              <th className="py-2.5 px-4">Subject</th>
              <th className="py-2.5 px-3">Batch</th>
              <th className="py-2.5 px-3">Date</th>
              <th className="py-2.5 px-3">Time</th>
              <th className="py-2.5 px-3">Venue</th>
              <th className="py-2.5 px-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-100">
            {practicalSchedule.map((row) => (
              <tr key={row.id} className="hover:bg-purple-50/50 transition-colors">
                <td className="py-2.5 px-4 font-bold text-gray-900">{row.subject}</td>
                <td className="py-2.5 px-3 font-semibold text-purple-900">{row.batch}</td>
                <td className="py-2.5 px-3 font-medium text-gray-700 whitespace-nowrap">{row.date}</td>
                <td className="py-2.5 px-3 font-medium text-gray-600 whitespace-nowrap">{row.time}</td>
                <td className="py-2.5 px-3 text-gray-600">{row.venue}</td>
                <td className="py-2.5 px-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                    {row.status}
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

