import React from 'react';
import { Calendar, Users, FileEdit, ChevronRight } from 'lucide-react';
import { useHod } from '../../context/HodContext';
import { HodPendingAction } from '../../types/hod';

export const HodPendingActions: React.FC = () => {
  const { pendingActions, setActiveQuickModal } = useHod();

  const handleActionClick = (action: HodPendingAction) => {
    if (action.actionType === 'nominate') {
      setActiveQuickModal('nominate');
    } else if (action.actionType === 'verify') {
      setActiveQuickModal('upload');
    } else if (action.actionType === 'review') {
      setActiveQuickModal('review');
    } else {
      setActiveQuickModal('practical');
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-purple-200/90 shadow-2xs overflow-hidden flex flex-col justify-between select-none">
      {/* Header Bar */}
      <div className="bg-gradient-to-r from-[#440d75] to-[#2d0850] text-white px-4 sm:px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Calendar className="w-5 h-5 text-amber-300" />
          <h3 className="font-extrabold text-sm sm:text-base tracking-tight text-white">
            My Pending Actions ({pendingActions.length})
          </h3>
        </div>
        <span className="text-[11px] text-purple-200 font-medium bg-purple-900/60 px-2 py-0.5 rounded-full border border-purple-400/30">
          Action Required
        </span>
      </div>

      {/* List of 2 Actions */}
      <div className="p-3 sm:p-4 space-y-2.5">
        {pendingActions.length === 0 ? (
          <div className="py-6 text-center text-xs text-gray-500">
            <span className="text-emerald-600 font-bold">All pending departmental tasks completed!</span>
          </div>
        ) : (
          pendingActions.map((act) => {
            const isNominate = act.actionType === 'nominate';
            const Icon = isNominate ? Users : FileEdit;

            return (
              <div
                key={act.id}
                onClick={() => handleActionClick(act)}
                className="flex items-center justify-between p-3 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50/50 transition-all cursor-pointer group shadow-2xs"
              >
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  <div className="w-9 h-9 rounded-xl bg-purple-100/90 text-purple-800 flex items-center justify-center shrink-0 border border-purple-200 group-hover:scale-105 transition-transform">
                    <Icon className="w-4.5 h-4.5" />
                  </div>

                  <div className="min-w-0">
                    <h4 className="text-xs sm:text-[13px] font-bold text-[#1e1b4b] truncate group-hover:text-purple-900 transition-colors">
                      {act.title}
                    </h4>
                    <p className="text-[11px] text-gray-500 truncate mt-0.5">
                      {act.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 whitespace-nowrap">
                    {act.dueDate}
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

