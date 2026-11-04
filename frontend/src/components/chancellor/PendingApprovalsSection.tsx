import React from 'react';
import { Scale, ChevronRight, FileText, Calendar, Settings } from 'lucide-react';
import { useChancellor } from '../../context/ChancellorContext';
import { PendingApprovalItem } from '../../types/chancellor';

interface PendingApprovalsProps {
  onViewAll?: () => void;
}

export const PendingApprovalsSection: React.FC<PendingApprovalsProps> = ({ onViewAll }) => {
  const { pendingApprovals, setSelectedApproval } = useChancellor();

  const getApprovalIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return FileText;
      case 1:
        return Calendar;
      case 2:
      default:
        return Settings;
    }
  };

  const getBadgeStyle = (category: PendingApprovalItem['category']) => {
    switch (category) {
      case 'Policy Approval':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Governance':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Special Approval':
      default:
        return 'bg-sky-100 text-sky-700 border-sky-200';
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-purple-200/90 shadow-xs overflow-hidden flex flex-col justify-between">
      {/* Header Bar */}
      <div className="bg-gradient-to-r from-[#440d75] to-[#2d0850] text-white px-4 sm:px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Scale className="w-5 h-5 text-amber-300" />
          <h3 className="font-extrabold text-sm sm:text-base tracking-tight text-white">
            Pending for Chancellor Approval ({pendingApprovals.length})
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

      {/* List of Pending Items */}
      <div className="p-3 sm:p-4 space-y-2.5">
        {pendingApprovals.length === 0 ? (
          <div className="py-8 text-center text-gray-500 text-xs">
            <p className="font-bold text-emerald-600">All pending governance cases cleared.</p>
            <p className="text-[11px] mt-0.5">No statutory assent files awaiting Chancellor decision.</p>
          </div>
        ) : (
          pendingApprovals.map((item, idx) => {
            const Icon = getApprovalIcon(idx);
            return (
              <div
                key={item.id}
                onClick={() => setSelectedApproval(item)}
                className="flex items-center justify-between p-3 rounded-xl border border-purple-100/90 hover:border-purple-300 hover:bg-purple-50/50 transition-all cursor-pointer group shadow-2xs"
              >
                <div className="flex items-center gap-3 min-w-0 pr-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-100/80 border border-purple-200 flex items-center justify-center shrink-0 text-purple-700 group-hover:scale-105 transition-transform">
                    <Icon className="w-4.5 h-4.5" />
                  </div>

                  <div className="min-w-0">
                    <h4 className="text-xs sm:text-[13px] font-bold text-[#1e1b4b] truncate group-hover:text-purple-900 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-gray-500 truncate mt-0.5">
                      Submitted by: <span className="font-semibold text-gray-700">{item.submittedBy}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span
                    className={`hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10.5px] font-bold border ${getBadgeStyle(
                      item.category
                    )}`}
                  >
                    {item.category}
                  </span>
                  <ChevronRight className="w-4 h-4 text-purple-400 group-hover:text-purple-700 group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

