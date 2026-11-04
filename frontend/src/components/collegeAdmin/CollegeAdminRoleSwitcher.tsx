import React from 'react';
import { ShieldCheck, UserCheck, Users } from 'lucide-react';
import { useCollegeAdmin } from '../../context/CollegeAdminContext';
import { CollegeAdminSubRole } from '../../types/collegeAdmin';

export const CollegeAdminRoleSwitcher: React.FC = () => {
  const { activeSubRole, setActiveSubRole } = useCollegeAdmin();

  const subRoles: {
    id: CollegeAdminSubRole;
    label: string;
    sublabel: string;
    icon: React.ElementType;
  }[] = [
    {
      id: 'dean',
      label: 'Chief Superintendent (Dean)',
      sublabel: 'Executive Oversight & Conduction',
      icon: ShieldCheck
    },
    {
      id: 'deputy-superintendent',
      label: 'Deputy Superintendent',
      sublabel: 'Invigilation & Hall Operations',
      icon: UserCheck
    },
    {
      id: 'hod-management',
      label: 'HOD Management',
      sublabel: 'Faculty Mandates & Department Assign',
      icon: Users
    }
  ];

  return (
    <div className="w-full bg-[#1b0633] border-b border-purple-800/50 text-white px-3 sm:px-6 py-2.5 select-none shadow-md">
      <div className="max-w-[1900px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-400 text-purple-950 flex items-center justify-center font-black text-xs shadow-sm">
            BGS
          </div>
          <div>
            <h2 className="text-xs sm:text-sm font-extrabold tracking-tight text-white flex items-center gap-2">
              <span>College Administration & Exam Conduction Desk</span>
              <span className="text-[10px] bg-purple-900/80 text-amber-300 px-2 py-0.5 rounded-full border border-purple-500/40">
                Institutional Level
              </span>
            </h2>
            <p className="text-[10.5px] text-purple-300">
              BGS Medical College & Hospital • Chief & Deputy Superintendent Examination Office
            </p>
          </div>
        </div>

        {/* 3 Role Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 md:pb-0">
          {subRoles.map((r) => {
            const Icon = r.icon;
            const isActive = activeSubRole === r.id;
            return (
              <button
                key={r.id}
                onClick={() => setActiveSubRole(r.id)}
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

