import React from 'react';
import { Crown, Landmark, ScrollText, Scale } from 'lucide-react';
import { useUniversityAdmin } from '../../context/UniversityAdminContext';
import { UniversityAdminRole } from '../../types/universityAdmin';

export const UniversityAdminRoleSwitcher: React.FC = () => {
  const { activeRole, setActiveRole } = useUniversityAdmin();

  const roles: {
    id: UniversityAdminRole;
    label: string;
    sublabel: string;
    icon: React.ElementType;
    badgeColor: string;
  }[] = [
    {
      id: 'chancellor',
      label: 'Chancellor',
      sublabel: 'Governance & Apex Oversight',
      icon: Crown,
      badgeColor: 'from-amber-500 to-amber-700'
    },
    {
      id: 'vice-chancellor',
      label: 'Vice-Chancellor',
      sublabel: 'Approvals & Academic Oversight',
      icon: Landmark,
      badgeColor: 'from-purple-600 to-purple-800'
    },
    {
      id: 'coe',
      label: 'Controller of Examination',
      sublabel: 'Schedules & Centre Allocation',
      icon: ScrollText,
      badgeColor: 'from-blue-600 to-indigo-800'
    },
    {
      id: 'registrar',
      label: 'Registrar (Evaluation)',
      sublabel: 'Evaluation & Result Processing',
      icon: Scale,
      badgeColor: 'from-emerald-600 to-teal-800'
    }
  ];

  return (
    <div className="w-full bg-[#1b0633] border-b border-purple-800/50 text-white px-3 sm:px-6 py-2.5 select-none shadow-md">
      <div className="max-w-[1900px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-400 text-purple-950 flex items-center justify-center font-black text-xs shadow-sm">
            ACU
          </div>
          <div>
            <h2 className="text-xs sm:text-sm font-extrabold tracking-tight text-white flex items-center gap-2">
              <span>University Admin Governance Suite</span>
              <span className="text-[10px] bg-purple-900/80 text-amber-300 px-2 py-0.5 rounded-full border border-purple-500/40">
                Apex Portal
              </span>
            </h2>
            <p className="text-[10.5px] text-purple-300">
              Select Executive Office to oversee institutional examination operations
            </p>
          </div>
        </div>

        {/* 4 Role Selector Tabs */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto max-w-full pb-1 md:pb-0">
          {roles.map((r) => {
            const Icon = r.icon;
            const isActive = activeRole === r.id;
            return (
              <button
                key={r.id}
                onClick={() => setActiveRole(r.id)}
                className={`flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-[#7900B8] to-[#4B087B] text-amber-300 shadow-lg ring-1.5 ring-amber-300/50 scale-102'
                    : 'bg-purple-950/60 text-purple-200 hover:text-white hover:bg-purple-900/70 border border-purple-800/40'
                }`}
              >
                <div className={`w-5 h-5 rounded-lg flex items-center justify-center ${isActive ? 'bg-amber-400 text-purple-950' : 'text-purple-300'}`}>
                  <Icon className="w-3.5 h-3.5 stroke-[2.2]" />
                </div>
                <div className="text-left">
                  <div className="leading-tight">{r.label}</div>
                  <div className="text-[9px] font-normal text-purple-300 hidden sm:block">{r.sublabel}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

