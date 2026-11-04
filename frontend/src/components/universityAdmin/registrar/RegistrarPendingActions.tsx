import React from 'react';
import { Bell, ChevronRight } from 'lucide-react';
import { useUniversityAdmin } from '../../../context/UniversityAdminContext';

export const RegistrarPendingActions: React.FC = () => {
  const { registrarPendingActions, setActiveRegistrarModal } = useUniversityAdmin();

  const handleAction = (type: string) => {
    if (type === 'theory') setActiveRegistrarModal('receive-scripts');
    else if (type === 'practical') setActiveRegistrarModal('practical-marks');
    else if (type === 'ia') setActiveRegistrarModal('ia-marks');
    else setActiveRegistrarModal('publish-results');
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-purple-200/90 shadow-2xs overflow-hidden flex flex-col justify-between select-none">
      {/* Header Bar */}
      <div className="bg-gradient-to-r from-[#440d75] to-[#2d0850] text-white px-4 sm:px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-amber-300" />
          <h3 className="font-extrabold text-sm sm:text-base tracking-tight text-white">
            Pending Actions
          </h3>
        </div>
        <span className="text-[11px] text-purple-200 font-medium bg-purple-900/60 px-2 py-0.5 rounded-full border border-purple-400/30">
          Action Items
        </span>
      </div>

      {/* List */}
      <div className="p-3 sm:p-4 space-y-2">
        {registrarPendingActions.map((item) => (
          <div
            key={item.id}
            onClick={() => handleAction(item.type)}
            className="flex items-center justify-between p-2.5 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50/50 transition-all cursor-pointer group shadow-2xs"
          >
            <div className="flex items-center gap-2 min-w-0 pr-2">
              <span className="w-2 h-2 rounded-full bg-purple-600 shrink-0" />
              <span className="text-xs font-bold text-gray-800 truncate group-hover:text-purple-900">
                {item.label}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-mono">
                {item.count}
              </span>
              <ChevronRight className="w-4 h-4 text-purple-400 group-hover:text-purple-700 group-hover:translate-x-0.5 transition-all" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

