import React from 'react';
import { Gavel, Calendar, AlertTriangle, FileText, Settings2, ChevronRight } from 'lucide-react';
import { useUniversityAdmin } from '../../../context/UniversityAdminContext';
import { VcApprovalItem } from '../../../types/universityAdmin';

export const VcApprovals: React.FC = () => {
  const { vcApprovals, setSelectedVcApproval, setActiveVcModal } = useUniversityAdmin();

  const getUrgencyBadge = (urgency: VcApprovalItem['urgency']) => {
    switch (urgency) {
      case 'High':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      case 'Urgent':
        return 'bg-amber-100 text-amber-900 border-amber-300 font-extrabold';
      case 'Pending':
        return 'bg-purple-100 text-purple-900 border-purple-300';
      case 'For Approval':
      default:
        return 'bg-blue-100 text-blue-900 border-blue-300';
    }
  };

  const getCategoryIcon = (category: VcApprovalItem['category']) => {
    switch (category) {
      case 'Schedule Modification':
        return Calendar;
      case 'Malpractice':
        return AlertTriangle;
      case 'Result Authorisation':
        return FileText;
      case 'Policy Amendment':
      default:
        return Settings2;
    }
  };

  const handleClick = (item: VcApprovalItem) => {
    setSelectedVcApproval(item);
    setActiveVcModal('approval');
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-purple-200/90 shadow-2xs overflow-hidden flex flex-col justify-between select-none">
      {/* Header Bar */}
      <div className="bg-gradient-to-r from-[#440d75] to-[#2d0850] text-white px-4 sm:px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Gavel className="w-5 h-5 text-amber-300" />
          <h3 className="font-extrabold text-sm sm:text-base tracking-tight text-white">
            My Approvals & Escalations ({vcApprovals.length})
          </h3>
        </div>
        <span className="text-[11px] text-purple-200 font-medium bg-purple-900/60 px-2 py-0.5 rounded-full border border-purple-400/30">
          Executive Decision
        </span>
      </div>

      {/* List */}
      <div className="p-3 sm:p-4 space-y-2.5">
        {vcApprovals.length === 0 ? (
          <div className="py-8 text-center text-xs text-gray-500">
            <span className="text-emerald-600 font-bold">All pending escalations and approvals cleared by Vice-Chancellor.</span>
          </div>
        ) : (
          vcApprovals.map((item) => {
            const Icon = getCategoryIcon(item.category);
            return (
              <div
                key={item.id}
                onClick={() => handleClick(item)}
                className="flex items-center justify-between p-3 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50/50 transition-all cursor-pointer group shadow-2xs"
              >
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  <div className="w-9 h-9 rounded-xl bg-purple-100/90 text-purple-800 flex items-center justify-center shrink-0 border border-purple-200 group-hover:scale-105 transition-transform">
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs sm:text-[13px] font-bold text-[#1e1b4b] truncate group-hover:text-purple-900 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-gray-500 truncate mt-0.5">
                      {item.institution}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getUrgencyBadge(item.urgency)}`}>
                    {item.urgency}
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

