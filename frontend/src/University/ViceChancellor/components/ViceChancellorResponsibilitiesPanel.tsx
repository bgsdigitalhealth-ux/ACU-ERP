import React from 'react';
import {
  GraduationCap,
  Building2,
  Users,
  Coins,
  Calendar,
  FlaskConical,
  TrendingUp,
  Target,
  FileCheck,
  UserCheck,
  ShieldCheck,
  Globe,
  Compass,
  Landmark,
  CheckCircle2,
  RotateCcw,
  XCircle,
  FileText,
  Lock,
  Bell,
  BarChart3,
  History,
  Smartphone,
  Stamp
} from 'lucide-react';
import {
  ViceChancellorResponsibility as VcResp,
  ViceChancellorModuleAccess as VcMod,
} from '../services/vicechancellorApi';

interface VcResponsibilitiesProps {
  responsibilities?: VcResp[];
  erpModulesAccess?: VcMod[];
  reportsList?: string[];
  importantComponents?: string[];
  goal?: string;
  onSelectModule?: (moduleName: string) => void;
}

export const ViceChancellorResponsibilitiesPanel: React.FC<VcResponsibilitiesProps> = ({
  responsibilities,
  erpModulesAccess,
  reportsList,
  onSelectModule,
}) => {
  const defaultResp: VcResp[] = [
    {
      id: 'r-1',
      number: 1,
      title: 'Academic Leadership',
      bullets: [
        'Lead academic planning and policy implementation.',
        'Ensure quality of teaching, learning and evaluation.',
        'Approve new programs and curriculum changes.',
      ],
      iconType: 'academic',
    },
    {
      id: 'r-2',
      number: 2,
      title: 'Administration & Governance',
      bullets: [
        'Overall administration and day-to-day management.',
        'Implement decisions of Executive Council, Academic Council & Syndicate.',
        'Ensure efficient and transparent governance.',
      ],
      iconType: 'governance',
    },
    {
      id: 'r-3',
      number: 3,
      title: 'Research & Innovation',
      bullets: [
        'Promote research culture and innovation.',
        'Approve major research projects and MoUs.',
        'Facilitate funding, industry and international collaborations.',
      ],
      iconType: 'research',
    },
    {
      id: 'r-4',
      number: 4,
      title: 'Finance & Resource Management',
      bullets: [
        'Prepare and present the annual budget.',
        'Approve major expenditures and resource allocations.',
        'Ensure financial discipline and audit compliance.',
      ],
      iconType: 'finance',
    },
    {
      id: 'r-5',
      number: 5,
      title: 'Human Resource Management',
      bullets: [
        'Oversee recruitment, promotions and service matters.',
        'Ensure faculty and staff development.',
        'Approve key HR policies and initiatives.',
      ],
      iconType: 'hr',
    },
    {
      id: 'r-6',
      number: 6,
      title: 'Student Welfare & Development',
      bullets: [
        'Ensure student support, scholarships and inclusion.',
        'Monitor student services, placements and career support.',
        'Promote a safe, equitable and conducive campus environment.',
      ],
      iconType: 'student',
    },
    {
      id: 'r-7',
      number: 7,
      title: 'Quality, Accreditation & Compliance',
      bullets: [
        'Ensure compliance with UGC/AICTE/PCI/NCTE and State regulations.',
        'Lead NAAC, NIRF and other accreditation/ranking initiatives.',
        'Monitor quality assurance and institutional audits.',
      ],
      iconType: 'quality',
    },
    {
      id: 'r-8',
      number: 8,
      title: 'Planning, Development & Expansion',
      bullets: [
        'Prepare and execute long-term development plans.',
        'Approve infrastructure, ICT and campus development projects.',
        'Drive digital transformation and capacity building.',
      ],
      iconType: 'planning',
    },
    {
      id: 'r-9',
      number: 9,
      title: 'Statutory Meetings & Decision Implementation',
      bullets: [
        'Preside over Academic Council, Executive Council & Syndicate.',
        'Ensure implementation of resolutions and follow-up actions.',
        'Review progress of key initiatives and projects.',
      ],
      iconType: 'statutory',
    },
    {
      id: 'r-10',
      number: 10,
      title: 'External Relations & Representation',
      bullets: [
        'Represent the university at national and international forums.',
        'Foster industry, alumni and community engagement.',
        'Build strategic partnerships and enhance the university’s reputation.',
      ],
      iconType: 'external',
    },
  ];

  const defaultMods: VcMod[] = [
    {
      module: 'University Governance',
      keyFeatures: 'Policies, Statutes & Ordinances | Regulatory Compliance (UGC/AICTE) | Institutional Audit & Governance Reports',
      iconType: 'governance',
    },
    {
      module: 'Academic Affairs',
      keyFeatures: 'Programs & Curriculum Approval | Academic Planning & Monitoring | Academic Performance & Quality',
      iconType: 'academic',
    },
    {
      module: 'Examinations',
      keyFeatures: 'Examination Policies & Scheduling | Results & Performance Analytics | Evaluation Reforms & Oversight',
      iconType: 'exam',
    },
    {
      module: 'Research & Innovation',
      keyFeatures: 'Research Projects & Grants | MoUs & Collaborations | IPR, Innovation & Incubation',
      iconType: 'research',
    },
    {
      module: 'Human Resources',
      keyFeatures: 'Recruitment & Appointments | Promotions & Service Matters | Faculty Development & Training',
      iconType: 'hr',
    },
    {
      module: 'Finance & Budget',
      keyFeatures: 'Annual Budget & Allocations | Expenditure & Financial Approvals | Audit Reports & Financial Compliance',
      iconType: 'finance',
    },
    {
      module: 'Planning & Development',
      keyFeatures: 'University Development Plan (UDP) | Infrastructure & Campus Projects | ICT & Digital Campus Initiatives',
      iconType: 'planning',
    },
    {
      module: 'Student Affairs',
      keyFeatures: 'Scholarships & Welfare Schemes | Placements & Career Services | Student Grievances & Support',
      iconType: 'student',
    },
    {
      module: 'College & Affiliation',
      keyFeatures: 'Affiliation / Renewal / Extension | College Performance & Compliance | Inspection & Approval Reports',
      iconType: 'college',
    },
    {
      module: 'Quality & Accreditation',
      keyFeatures: 'NAAC / NIRF / Rankings | IQAC Activities & Quality Reports | Continuous Improvement Plans',
      iconType: 'quality',
    },
    {
      module: 'Statutory Bodies & Meetings',
      keyFeatures: 'Academic Council / Executive Council | Syndicate / Board Meetings | Agendas, Minutes & Resolutions',
      iconType: 'statutory',
    },
    {
      module: 'Approvals & Workflow',
      keyFeatures: 'Program / Policy Approvals | Administrative & Financial Approvals | e-File Tracking & Decision History',
      iconType: 'approvals',
    },
  ];

  const defaultReports = [
    'University Performance Dashboard',
    'Academic & Examination Reports',
    'Research, Grants & MoU Reports',
    'Finance & Budget Utilization Reports',
    'HR & Employee Strength Reports',
    'Accreditation & Compliance Reports',
    'Project & Development Progress Reports',
  ];

  const itemsResp = responsibilities && responsibilities.length > 0 ? responsibilities : defaultResp;
  const itemsMods = erpModulesAccess && erpModulesAccess.length > 0 ? erpModulesAccess : defaultMods;
  const itemsReports = reportsList && reportsList.length > 0 ? reportsList : defaultReports;

  const getIconForNumber = (num: number) => {
    switch (num) {
      case 1:
        return GraduationCap;
      case 2:
        return Building2;
      case 3:
        return FlaskConical;
      case 4:
        return Coins;
      case 5:
        return UserCheck;
      case 6:
        return Users;
      case 7:
        return ShieldCheck;
      case 8:
        return TrendingUp;
      case 9:
        return Calendar;
      case 10:
        return Globe;
      default:
        return Target;
    }
  };

  const getIconForModule = (name: string) => {
    if (name.includes('Governance')) return Building2;
    if (name.includes('Academic')) return GraduationCap;
    if (name.includes('Exam')) return FileCheck;
    if (name.includes('Research')) return FlaskConical;
    if (name.includes('Human')) return Users;
    if (name.includes('Finance')) return Coins;
    if (name.includes('Planning')) return Compass;
    if (name.includes('Student')) return UserCheck;
    if (name.includes('College')) return Landmark;
    if (name.includes('Quality')) return ShieldCheck;
    if (name.includes('Statutory')) return Calendar;
    return FileCheck;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 space-y-6 select-none font-sans">
      {/* 1. Header Box: Profile, Title & Subtitle paragraph */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-purple-50 via-indigo-50/60 to-purple-50 border border-purple-200/80 flex items-start gap-4">
        <div className="w-11 h-11 rounded-2xl bg-[#2a0e5b] text-white flex items-center justify-center shrink-0 shadow-md">
          <GraduationCap className="w-6 h-6 stroke-[2.2]" />
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
            Vice Chancellor – Work &amp; Responsibilities
          </h2>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            The Vice Chancellor (VC) is the chief executive and academic head of the university, responsible for overall administration, academic leadership, statutory compliance, resource management and implementation of the university’s vision, policies and decisions of statutory bodies.
          </p>
        </div>
      </div>

      {/* 2. Main Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Column 1: Key Work & Responsibilities (10 Detailed Sections) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="px-3.5 py-2 rounded-xl bg-[#2a0e5b] text-white text-xs font-black tracking-wide flex items-center gap-2 shadow-xs">
            <Target className="w-4 h-4 text-purple-300" />
            <span>Key Work &amp; Responsibilities</span>
          </div>

          <div className="space-y-3">
            {itemsResp.map((resp) => {
              const Icon = getIconForNumber(resp.number);
              return (
                <div
                  key={resp.id || resp.number}
                  className="p-3.5 rounded-xl border border-slate-200/80 hover:border-purple-300 hover:bg-purple-50/20 transition-all space-y-1.5"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center shrink-0 text-xs font-black">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <h3 className="text-xs font-extrabold text-slate-900">
                      {resp.number}. {resp.title}
                    </h3>
                  </div>

                  <ul className="pl-8 space-y-0.5 text-[11px] text-slate-600 font-medium list-disc marker:text-purple-600">
                    {resp.bullets.map((bullet, idx) => (
                      <li key={idx} className="leading-snug">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* Column 2: ERP Modules & Subcontents + Workflow + Reports */}
        <div className="lg:col-span-6 space-y-5">
          {/* Section: ERP Modules & Subcontents */}
          <div className="space-y-3">
            <div className="px-3.5 py-2 rounded-xl bg-[#2a0e5b] text-white text-xs font-black tracking-wide flex items-center gap-2 shadow-xs">
              <Building2 className="w-4 h-4 text-purple-300" />
              <span>ERP Modules &amp; Subcontents for Vice Chancellor</span>
            </div>

            <div className="space-y-2">
              {itemsMods.map((mod, idx) => {
                const Icon = getIconForModule(mod.module);
                return (
                  <div
                    key={idx}
                    onClick={() => {
                      if (onSelectModule) {
                        onSelectModule(mod.module.toLowerCase().replace(/\s+/g, '-'));
                      }
                    }}
                    className="p-2.5 rounded-xl border border-slate-200/80 hover:border-purple-300 hover:bg-purple-50/30 transition-all flex items-start gap-2.5 cursor-pointer group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-slate-900 group-hover:text-purple-900 transition-colors">
                        {mod.module}
                      </div>
                      <div className="text-[10px] text-slate-500 font-medium leading-snug mt-0.5">
                        {mod.keyFeatures}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section: Statutory Approval Workflow (Example) */}
          <div className="space-y-3 pt-2">
            <div className="px-3.5 py-2 rounded-xl bg-[#2a0e5b] text-white text-xs font-black tracking-wide flex items-center gap-2 shadow-xs">
              <FileCheck className="w-4 h-4 text-purple-300" />
              <span>Approval Workflow (Example)</span>
            </div>

            <div className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 space-y-3">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-bold">
                {/* Node 1 */}
                <div className="px-3 py-2 rounded-lg bg-white border border-slate-200 text-center shadow-2xs w-full sm:w-auto">
                  <span className="text-[10px] text-slate-400 block font-semibold">Initiation</span>
                  <span className="text-slate-800 text-xs">Department / College Proposal</span>
                </div>

                <span className="text-purple-600 font-black">➔</span>

                {/* Node 2 */}
                <div className="px-3 py-2 rounded-lg bg-white border border-slate-200 text-center shadow-2xs w-full sm:w-auto">
                  <span className="text-[10px] text-slate-400 block font-semibold">Verification</span>
                  <span className="text-slate-800 text-xs">Registrar Review</span>
                </div>

                <span className="text-purple-600 font-black">➔</span>

                {/* Node 3 */}
                <div className="px-3 py-2 rounded-lg bg-purple-100 border border-purple-300 text-center shadow-2xs w-full sm:w-auto">
                  <span className="text-[10px] text-purple-700 block font-semibold">Executive Desk</span>
                  <span className="text-purple-950 font-black text-xs">VC Review &amp; Decision</span>
                </div>
              </div>

              {/* 3 Outcome Branches */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-slate-200">
                <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center gap-2 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <div className="font-black text-emerald-900 leading-tight">Approved</div>
                    <div className="text-[9px] text-emerald-700 font-semibold">(With Order)</div>
                  </div>
                </div>

                <div className="p-2 rounded-lg bg-amber-50 border border-amber-200 flex items-center gap-2 text-xs">
                  <RotateCcw className="w-4 h-4 text-amber-600 shrink-0" />
                  <div>
                    <div className="font-black text-amber-900 leading-tight">Returned</div>
                    <div className="text-[9px] text-amber-700 font-semibold">(With Remarks)</div>
                  </div>
                </div>

                <div className="p-2 rounded-lg bg-rose-50 border border-rose-200 flex items-center gap-2 text-xs">
                  <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <div>
                    <div className="font-black text-rose-900 leading-tight">Rejected</div>
                    <div className="text-[9px] text-rose-700 font-semibold">(With Reason)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Key Reports & Analytics */}
          <div className="space-y-3 pt-2">
            <div className="px-3.5 py-2 rounded-xl bg-[#2a0e5b] text-white text-xs font-black tracking-wide flex items-center gap-2 shadow-xs">
              <BarChart3 className="w-4 h-4 text-purple-300" />
              <span>Key Reports &amp; Analytics</span>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {itemsReports.map((report, idx) => (
                <div key={idx} className="flex items-center gap-2 p-1.5 rounded-lg bg-white border border-slate-200/70">
                  <FileText className="w-3.5 h-3.5 text-purple-700 shrink-0" />
                  <span className="text-[11px] font-bold text-slate-800 truncate">{report}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Banner: Other Important ERP Components (8 Pills) */}
      <div className="pt-4 border-t border-slate-200 space-y-3">
        <div className="px-3.5 py-2 rounded-xl bg-[#2a0e5b] text-white text-xs font-black tracking-wide flex items-center gap-2 shadow-xs w-fit">
          <Lock className="w-4 h-4 text-purple-300" />
          <span>Other Important ERP Components</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
          {[
            { label: 'Digital Signature', icon: Stamp },
            { label: 'Document Management', icon: FileText },
            { label: 'Role-based Access Control', icon: Lock },
            { label: 'Notifications & Alerts', icon: Bell },
            { label: 'Calendar & Meetings', icon: Calendar },
            { label: 'MIS & Data Analytics', icon: BarChart3 },
            { label: 'Audit Trail & History', icon: History },
            { label: 'Mobile Access', icon: Smartphone },
          ].map((comp, idx) => {
            const Icon = comp.icon;
            return (
              <div
                key={idx}
                className="p-2.5 rounded-xl bg-purple-50/70 border border-purple-200/70 flex flex-col items-center justify-center text-center gap-1.5 shadow-2xs"
              >
                <div className="w-7 h-7 rounded-lg bg-purple-200 text-purple-900 flex items-center justify-center">
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] font-extrabold text-slate-800 leading-tight">
                  {comp.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ViceChancellorResponsibilitiesPanel;