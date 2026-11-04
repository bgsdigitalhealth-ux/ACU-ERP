import React from 'react';
import { FileText, ChevronRight, CheckCircle2, X } from 'lucide-react';
import { useChancellor } from '../../context/ChancellorContext';

interface GovernanceDecisionsProps {
  onViewAll?: () => void;
}

export const GovernanceDecisionsTable: React.FC<GovernanceDecisionsProps> = ({ onViewAll }) => {
  const { governanceDecisions, selectedDecision, setSelectedDecision } = useChancellor();

  return (
    <div className="w-full bg-white rounded-2xl border border-purple-200/90 shadow-xs overflow-hidden flex flex-col justify-between">
      {/* Header Bar */}
      <div className="bg-gradient-to-r from-[#440d75] to-[#2d0850] text-white px-4 sm:px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <FileText className="w-5 h-5 text-amber-300" />
          <h3 className="font-extrabold text-sm sm:text-base tracking-tight text-white">
            Recent Governance Decisions
          </h3>
        </div>

        {onViewAll && (
          <button
            onClick={onViewAll}
            className="text-xs font-semibold text-purple-200 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-[#fcfaff] text-[#475569] font-bold border-b border-purple-100 uppercase tracking-wider text-[11px]">
              <th className="py-2.5 px-4 sm:px-5 font-extrabold text-[#2e1065] w-28">Date</th>
              <th className="py-2.5 px-3">Decision / Approval</th>
              <th className="py-2.5 px-4 font-mono text-purple-900">Reference</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-50 text-[12px] font-medium text-[#1e293b]">
            {governanceDecisions.slice(0, 3).map((item) => (
              <tr
                key={item.id}
                onClick={() => setSelectedDecision(item)}
                className="hover:bg-purple-50/60 transition-colors cursor-pointer group"
              >
                <td className="py-3 px-4 sm:px-5 text-gray-500 font-semibold whitespace-nowrap">
                  {item.date}
                </td>
                <td className="py-3 px-3 font-bold text-[#1e1b4b] group-hover:text-purple-900 transition-colors">
                  {item.title}
                </td>
                <td className="py-3 px-4 font-mono text-purple-700 font-semibold whitespace-nowrap">
                  {item.referenceNumber}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Decision Detail Modal */}
      {selectedDecision && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border-2 border-purple-200">
            <div className="flex items-start justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                <div>
                  <span className="text-[10px] font-extrabold text-purple-700 bg-purple-100 px-2 py-0.5 rounded">
                    {selectedDecision.referenceNumber}
                  </span>
                  <h3 className="text-base font-extrabold text-[#1e1b4b] mt-1 leading-snug">
                    {selectedDecision.title}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setSelectedDecision(null)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="my-4 text-xs space-y-3">
              <div className="bg-purple-50/70 p-3 rounded-xl border border-purple-100 flex items-center justify-between">
                <div>
                  <span className="text-gray-500 text-[11px] block">Date of Assent:</span>
                  <span className="font-bold text-[#1e1b4b]">{selectedDecision.date}</span>
                </div>
                <div>
                  <span className="text-gray-500 text-[11px] block">Ratified By:</span>
                  <span className="font-bold text-purple-900">{selectedDecision.approvedBy}</span>
                </div>
              </div>

              <div>
                <span className="text-gray-500 font-bold block mb-1">Official Decree / Resolution Text:</span>
                <p className="text-gray-800 leading-relaxed bg-[#fcfaff] p-3 rounded-xl border border-purple-100 text-[12px]">
                  {selectedDecision.description}
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedDecision(null)}
                className="px-4 py-2 bg-[#4a157c] text-white rounded-xl text-xs font-bold hover:bg-[#320b60]"
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
