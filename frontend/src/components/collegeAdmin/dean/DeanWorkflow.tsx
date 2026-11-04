import React from 'react';
import { Layers, Calendar, Users, ClipboardList, Monitor, CheckCircle2, ArrowRight } from 'lucide-react';
import { useCollegeAdmin } from '../../../context/CollegeAdminContext';

export const DeanWorkflow: React.FC = () => {
  const { setActiveDeanModal } = useCollegeAdmin();

  const stages = [
    { id: 'plan', label: 'Plan & Approve', icon: Calendar, status: 'Completed' },
    { id: 'personnel', label: 'Allocate Personnel', icon: Users, status: 'Completed' },
    { id: 'prepare', label: 'Prepare & Orchestrate', icon: ClipboardList, status: 'Completed' },
    { id: 'conduct', label: 'Conduct & Monitor', icon: Monitor, status: 'Active' },
    { id: 'complete', label: 'Complete & Report', icon: CheckCircle2, status: 'Pending' }
  ];

  return (
    <div className="w-full bg-white rounded-2xl border border-purple-200/90 shadow-2xs overflow-hidden flex flex-col justify-between select-none">
      {/* Header Bar */}
      <div className="bg-gradient-to-r from-[#440d75] to-[#2d0850] text-white px-4 sm:px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-amber-300" />
          <h3 className="font-extrabold text-sm sm:text-base tracking-tight text-white">
            Examination Lifecycle – Chief Superintendent
          </h3>
        </div>
        <span className="text-[11px] text-purple-200 font-medium bg-purple-900/60 px-2.5 py-0.5 rounded-full border border-purple-400/30">
          Stage 4 Active • Conduct & Monitor
        </span>
      </div>

      {/* 5 Stages Horizontal */}
      <div className="p-4 sm:p-5 overflow-x-auto">
        <div className="min-w-[550px] flex items-center justify-between gap-2">
          {stages.map((st, idx) => {
            const Icon = st.icon;
            const isActive = st.status === 'Active';
            const isCompleted = st.status === 'Completed';

            return (
              <React.Fragment key={st.id}>
                <div
                  onClick={() => {
                    if (isActive) setActiveDeanModal('monitoring');
                  }}
                  className="flex flex-col items-center text-center cursor-pointer group flex-1"
                >
                  <div
                    className={`w-13 h-13 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all ${
                      isActive
                        ? 'bg-gradient-to-br from-[#7e22ce] to-[#581c87] text-white shadow-lg ring-4 ring-purple-200 scale-105'
                        : isCompleted
                        ? 'bg-purple-100 text-purple-800 border-2 border-purple-300'
                        : 'bg-gray-100 text-gray-400 border border-gray-200'
                    }`}
                  >
                    <Icon className={`w-6 h-6 stroke-[2] ${isActive ? 'text-amber-300 animate-pulse' : ''}`} />
                  </div>

                  <span
                    className={`mt-2 text-xs font-bold line-clamp-2 max-w-[100px] ${
                      isActive
                        ? 'text-purple-950 font-black scale-105'
                        : isCompleted
                        ? 'text-gray-800'
                        : 'text-gray-400'
                    }`}
                  >
                    {st.label}
                  </span>
                </div>

                {idx < stages.length - 1 && (
                  <div className="flex items-center justify-center text-purple-300 px-1 shrink-0">
                    <ArrowRight className="w-4 h-4 stroke-[2]" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

