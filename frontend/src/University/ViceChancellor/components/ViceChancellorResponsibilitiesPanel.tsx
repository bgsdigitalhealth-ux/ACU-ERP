import React from 'react';
import {
  GraduationCap,
  FileCheck,
  Building2,
  Users,
  Coins,
  Calendar,
  FlaskConical,
  TrendingUp,
  Target,
  UserCheck
} from 'lucide-react';
import {
  ViceChancellorResponsibility as VcResp,
  ViceChancellorModuleAccess as VcMod,
} from '../services/vicechancellorApi';

interface VcResponsibilitiesProps {
  responsibilities?: VcResp[];
  erpModulesAccess?: VcMod[];
  goal?: string;
}

export const ViceChancellorResponsibilitiesPanel: React.FC<VcResponsibilitiesProps> = ({
  responsibilities,
  erpModulesAccess,
  goal,
}) => {
  const getIconForNumber = (num: number) => {
    switch (num) {
      case 1:
        return { icon: GraduationCap, bg: 'bg-indigo-50 text-indigo-700 border-indigo-200' };
      case 2:
        return { icon: FileCheck, bg: 'bg-sky-50 text-sky-700 border-sky-200' };
      case 3:
        return { icon: Building2, bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
      case 4:
        return { icon: Users, bg: 'bg-purple-50 text-purple-700 border-purple-200' };
      case 5:
        return { icon: Coins, bg: 'bg-amber-50 text-amber-700 border-amber-200' };
      case 6:
        return { icon: Calendar, bg: 'bg-pink-50 text-pink-700 border-pink-200' };
      case 7:
        return { icon: FlaskConical, bg: 'bg-cyan-50 text-cyan-700 border-cyan-200' };
      case 8:
      default:
        return { icon: TrendingUp, bg: 'bg-blue-50 text-blue-700 border-blue-200' };
    }
  };

  const defaultResp: VcResp[] = [
    {
      id: 'r-1',
      number: 1,
      title: 'Academic Leadership & Quality',
      bullets: ['Ensure academic excellence and innovation', 'Monitor program effectiveness', 'Promote research and interdisciplinary studies'],
    },
    {
      id: 'r-2',
      number: 2,
      title: 'Policy Implementation & Compliance',
      bullets: ['Implement university policies and decisions', 'Ensure regulatory compliance (UGC/NAAC/NIRF)', 'Monitor risk and legal matters'],
    },
    {
      id: 'r-3',
      number: 3,
      title: 'Administration & Governance',
      bullets: ['Oversee university administration', 'Implement statutes and regulations', 'Coordinate with Registrar and other authorities'],
    },
    {
      id: 'r-4',
      number: 4,
      title: 'Faculty & Staff Management',
      bullets: ['Oversee faculty recruitment and development', 'Ensure HR policies implementation', 'Promote faculty performance and well-being'],
    },
    {
      id: 'r-5',
      number: 5,
      title: 'Finance & Resource Management',
      bullets: ['Monitor budget utilization', 'Optimize resource allocation', 'Ensure financial sustainability'],
    },
    {
      id: 'r-6',
      number: 6,
      title: 'Statutory Meetings & Committees',
      bullets: ['Chair Executive Council / Academic Council', 'Review committee reports and resolutions', 'Ensure timely decisions and follow-ups'],
    },
    {
      id: 'r-7',
      number: 7,
      title: 'Research, Innovation & Collaboration',
      bullets: ['Promote research activities', 'Facilitate industry and international collaborations', 'Support innovation and incubation centers'],
    },
    {
      id: 'r-8',
      number: 8,
      title: 'Institutional Development',
      bullets: ['Drive strategic planning and expansion', 'Enhance university reputation and rankings', 'Strengthen alumni and stakeholder engagement'],
    },
  ];

  const defaultModules: VcMod[] = [
    { module: 'Vice Chancellor Dashboard', keyFeatures: 'University overview, KPIs, pending approvals, key alerts, quick actions' },
    { module: 'Academic Oversight', keyFeatures: 'Program performance, departments, student results, faculty profile' },
    { module: 'Administration', keyFeatures: 'Appointments, governance, committee reports, official notifications' },
    { module: 'Finance & Budget', keyFeatures: 'Budget summary, expenditure, audit reports, financial approvals' },
    { module: 'Research & Innovation', keyFeatures: 'Research projects, grants, MoUs, publications' },
    { module: 'Statutory Meetings', keyFeatures: 'Agendas, minutes, resolutions, follow-ups' },
    { module: 'Approvals & Decisions', keyFeatures: 'Pending proposals, approval workflow, digital signing' },
    { module: 'Quality & Accreditation', keyFeatures: 'NAAC/NIRF status, compliance reports, audit observations' },
    { module: 'Reports & Analytics', keyFeatures: 'Performance reports, custom analytics, data export' },
    { module: 'Communication', keyFeatures: 'Official circulars, announcements, messaging' },
  ];

  const respList = responsibilities && responsibilities.length > 0 ? responsibilities : defaultResp;
  const modList = erpModulesAccess && erpModulesAccess.length > 0 ? erpModulesAccess : defaultModules;

  return (
    <div className="w-full bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex flex-col space-y-4 select-none text-slate-800">
      
      {/* Top Banner of Right Column */}
      <div className="p-3.5 bg-gradient-to-r from-[#172554] to-[#1e3a8a] text-white rounded-xl shadow-xs flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center border border-white/20 text-blue-200 shrink-0">
          <UserCheck className="w-5 h-5 stroke-[2.2]" />
        </div>
        <div>
          <h2 className="text-sm font-black text-white leading-tight">
            Vice Chancellor
          </h2>
          <div className="text-[11px] font-bold text-blue-200">
            Work &amp; Responsibilities in ERP
          </div>
        </div>
      </div>

      {/* Subtitle Tags Bar */}
      <div className="text-[10.5px] font-bold text-slate-500 bg-slate-50 p-2 rounded-xl border border-slate-200 text-center">
        Academic Leadership • Administrative Oversight • Policy Implementation • Institutional Development
      </div>

      {/* Scrollable Container */}
      <div className="space-y-4 max-h-[calc(100vh-250px)] overflow-y-auto pr-1 custom-scrollbar">
        
        {/* Section 1: Key Responsibilities (8 Cards) */}
        <div>
          <div className="text-xs font-black text-slate-900 uppercase tracking-wider mb-2.5 flex items-center gap-2">
            <span className="w-1.5 h-3.5 bg-blue-600 rounded-full" />
            <span>1. Key Responsibilities</span>
          </div>

          <div className="space-y-2.5">
            {respList.map((resp) => {
              const { icon: Icon, bg } = getIconForNumber(resp.number);
              return (
                <div
                  key={resp.id || resp.number}
                  className="p-3 rounded-xl bg-slate-50/70 hover:bg-slate-50 border border-slate-200/80 transition-all flex items-start gap-2.5 group"
                >
                  <div
                    className={`w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 shadow-2xs group-hover:scale-105 transition-transform ${bg}`}
                  >
                    <Icon className="w-3.5 h-3.5 stroke-[2.2]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs font-black text-slate-900 group-hover:text-blue-900 leading-snug">
                      {resp.number}. {resp.title}
                    </h3>
                    <ul className="mt-1 space-y-0.5 text-[11px] text-slate-600 list-disc list-inside">
                      {resp.bullets.map((b, bIdx) => (
                        <li key={bIdx} className="leading-relaxed">
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 2: ERP Modules & Access for Vice Chancellor (Table) */}
        <div>
          <div className="text-xs font-black text-slate-900 uppercase tracking-wider mb-2.5 flex items-center gap-2">
            <span className="w-1.5 h-3.5 bg-blue-600 rounded-full" />
            <span>2. ERP Modules &amp; Access for Vice Chancellor</span>
          </div>

          <div className="rounded-xl border border-slate-200 overflow-hidden text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold text-[10.5px] uppercase tracking-wider border-b border-slate-200">
                  <th className="py-2 px-3">Module</th>
                  <th className="py-2 px-3">Key Features / Sub-Content</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-[11px]">
                {modList.map((m, mIdx) => (
                  <tr key={mIdx} className="hover:bg-blue-50/40 transition-colors">
                    <td className="py-2 px-3 font-bold text-slate-900 whitespace-nowrap">
                      {m.module}
                    </td>
                    <td className="py-2 px-3 text-slate-600">
                      {m.keyFeatures}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 3: Goal Banner */}
        <div className="p-3.5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200/80 shadow-2xs flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-700 text-white flex items-center justify-center shrink-0 shadow-sm">
            <Target className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <div className="text-xs font-black text-blue-950 uppercase tracking-wide">
              Goal
            </div>
            <div className="text-[11px] font-semibold text-slate-700 mt-0.5 leading-snug">
              {goal ||
                'To provide visionary leadership, ensure academic excellence, and drive the university towards growth and global recognition.'}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ViceChancellorResponsibilitiesPanel;
