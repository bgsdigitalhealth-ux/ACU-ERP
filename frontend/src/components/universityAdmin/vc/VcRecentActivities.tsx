import React from 'react';
import { Clock } from 'lucide-react';

interface VcRecentActivitiesProps {
  onNavigate?: (tab: string) => void;
}

export const VcRecentActivities: React.FC<VcRecentActivitiesProps> = ({ onNavigate }) => {

  const enhancedActivities = [
    {
      id: 'act-1',
      date: '10 Mar 2025',
      time: '14:20',
      activity: 'Approved – Exam Schedule Modification (AIMS)',
      reference: 'ACU/Exam/2025/021',
      type: 'approval',
      status: 'Executive Assent Granted',
      badge: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    {
      id: 'act-2',
      date: '08 Mar 2025',
      time: '11:45',
      activity: 'Sanctioned – ICMR Multicentric Clinical Research Project',
      reference: 'ACU/R&D/2025/104',
      type: 'research',
      status: '₹2.45 Cr Fund Allocated',
      badge: 'bg-purple-50 text-purple-700 border-purple-200'
    },
    {
      id: 'act-3',
      date: '07 Mar 2025',
      time: '16:10',
      activity: 'Reviewed – Malpractice Report (BGS MCH)',
      reference: 'ACU/Exam/2025/020',
      type: 'disciplinary',
      status: 'Referred to Committee',
      badge: 'bg-amber-50 text-amber-700 border-amber-200'
    },
    {
      id: 'act-4',
      date: '05 Mar 2025',
      time: '09:30',
      activity: 'Approved – Evaluation Guideline Amendment (Medical & Allied)',
      reference: 'ACU/Exam/2025/017',
      type: 'regulation',
      status: 'Statute Gazetted',
      badge: 'bg-blue-50 text-blue-700 border-blue-200'
    },
    {
      id: 'act-5',
      date: '03 Mar 2025',
      time: '17:00',
      activity: 'Concurred – Annual University Financial Audit & Surplus Transfer',
      reference: 'ACU/Fin/2025/088',
      type: 'finance',
      status: 'Syndicate Placed',
      badge: 'bg-indigo-50 text-indigo-700 border-indigo-200'
    }
  ];

  return (
    <div className="w-full bg-white rounded-2xl border border-purple-200/90 shadow-2xs overflow-hidden flex flex-col justify-between select-none">
      {/* Header Bar */}
      <div className="bg-gradient-to-r from-[#440d75] to-[#2d0850] text-white px-4 sm:px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-amber-300" />
          <h3 className="font-extrabold text-sm sm:text-base tracking-tight text-white">
            Recent Activities & Decisions
          </h3>
        </div>
        <button
          onClick={() => {
            if (onNavigate) onNavigate('performance-reports-vc');
          }}
          className="text-[11px] text-purple-200 font-bold hover:text-amber-300 cursor-pointer transition-colors"
        >
          View All Logs →
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#f9f5ff] text-[#4a157c] font-extrabold border-b border-purple-100 uppercase text-[10.5px]">
            <tr>
              <th className="py-2.5 px-4">Date & Time</th>
              <th className="py-2.5 px-4">Executive Activity</th>
              <th className="py-2.5 px-3">Reference No.</th>
              <th className="py-2.5 px-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-100/70">
            {enhancedActivities.map((act) => (
              <tr key={act.id} className="hover:bg-purple-50/50 transition-colors">
                <td className="py-3 px-4 whitespace-nowrap">
                  <div className="font-bold text-gray-900">{act.date}</div>
                  <div className="text-[10px] text-gray-400 font-mono">{act.time} IST</div>
                </td>
                <td className="py-3 px-4">
                  <div className="font-bold text-gray-900 text-xs">{act.activity}</div>
                </td>
                <td className="py-3 px-3 font-mono text-[11px] font-bold text-purple-900 whitespace-nowrap">
                  {act.reference}
                </td>
                <td className="py-3 px-4 text-center whitespace-nowrap">
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${act.badge}`}>
                    {act.status}
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
