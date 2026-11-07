import React from 'react';
import { Layers, FileBox, Users, Edit3, FlaskConical, Database, ShieldCheck, BarChart2, Megaphone } from 'lucide-react';
import { useUniversityAdmin } from '../../../context/UniversityAdminContext';

export const RegistrarWorkflow: React.FC = () => {
  const { setActiveRegistrarModal } = useUniversityAdmin();

  const stages = [
    { id: 'receive', label: 'Receive Scripts', icon: FileBox, status: 'Completed' },
    { id: 'evaluators', label: 'Allocate Evaluators', icon: Users, status: 'Completed' },
    { id: 'theory', label: 'Theory Valuation', icon: Edit3, status: 'Completed' },
    { id: 'practical', label: 'Practical / Viva Marks', icon: FlaskConical, status: 'Completed' },
    { id: 'ia', label: 'IA Consolidation', icon: Database, status: 'Completed' },
    { id: 'verify', label: 'Marks Verification', icon: ShieldCheck, status: 'Active' },
    { id: 'processing', label: 'Result Processing', icon: BarChart2, status: 'Pending' },
    { id: 'pub', label: 'Publication', icon: Megaphone, status: 'Pending' }
  ];

  return (
    <div className="w-full bg-white rounded-2xl border border-purple-200/90 shadow-2xs overflow-hidden flex flex-col justify-between select-none">
      {/* Header Bar */}
      <div className="bg-gradient-to-r from-[#440d75] to-[#2d0850] text-white px-4 sm:px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-amber-300" />
          <h3 className="font-extrabold text-sm sm:text-base tracking-tight text-white">
            Evaluation & Result Processing
          </h3>
        </div>
        <span className="text-[11px] text-purple-200 font-medium bg-purple-900/60 px-2.5 py-0.5 rounded-full border border-purple-400/30">
          Stage 6 Active • Marks Verification
        </span>
      </div>

      {/* Horizontal 8-Stage Flow */}
      <div className="p-4 sm:p-5 overflow-x-auto">
        <div className="min-w-[760px] flex items-center justify-between relative">
          {/* Connector Line behind stages */}
          <div className="absolute top-5 left-8 right-8 h-1 bg-emerald-200 -z-0" />

          {stages.map((stage) => {
            const Icon = stage.icon;
            const isActive = stage.status === 'Active';
            const isCompleted = stage.status === 'Completed';

            return (
              <div
                key={stage.id}
                onClick={() => {
                  if (isActive) setActiveRegistrarModal('lock-marks');
                }}
                className="flex flex-col items-center text-center cursor-pointer group z-10"
              >
                <div
                  className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all ${
                    isActive
                      ? 'bg-gradient-to-br from-[#7e22ce] to-[#581c87] text-white ring-4 ring-purple-300 shadow-lg scale-110'
                      : isCompleted
                      ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-white'
                      : 'bg-gray-200 text-gray-500 ring-2 ring-white'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-amber-300 animate-pulse' : ''}`} />
                </div>

                <span
                  className={`mt-2 text-[10.5px] font-bold max-w-[85px] leading-tight ${
                    isActive
                      ? 'text-purple-950 font-black scale-105'
                      : isCompleted
                      ? 'text-gray-800'
                      : 'text-gray-400'
                  }`}
                >
                  {stage.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

