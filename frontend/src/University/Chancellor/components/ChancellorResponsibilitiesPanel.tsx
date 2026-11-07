import React from 'react';
import {
  GraduationCap,
  Building2,
  ClipboardCheck,
  Users,
  Coins,
  FlaskConical,
  UsersRound,
  ShieldCheck,
  BarChart3,
  Star
} from 'lucide-react';
import { ChancellorResponsibility } from '../services/chancellorApi';

interface ResponsibilitiesPanelProps {
  responsibilities?: ChancellorResponsibility[];
}

export const ChancellorResponsibilitiesPanel: React.FC<ResponsibilitiesPanelProps> = ({
  responsibilities,
}) => {
  // Default 10 responsibilities from Image 1 if not passed from dynamic backend
  const defaultItems = [
    {
      id: 'resp-1',
      title: 'Strategic Leadership & Governance',
      description:
        'Provide overall vision, direction and oversight for the university\'s academic, administrative and developmental goals.',
      icon: Building2,
      iconBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    },
    {
      id: 'resp-2',
      title: 'Policy & Statutory Approvals',
      description:
        'Approve university policies, statutes, ordinances, and amendments; ensure regulatory compliance (UGC/AICTE, etc.).',
      icon: ClipboardCheck,
      iconBg: 'bg-sky-50 text-sky-700 border-sky-200',
    },
    {
      id: 'resp-3',
      title: 'Academic Oversight',
      description:
        'Approve new academic programs, curricula, and major academic reforms; review academic performance and quality.',
      icon: GraduationCap,
      iconBg: 'bg-purple-50 text-purple-700 border-purple-200',
    },
    {
      id: 'resp-4',
      title: 'Key Appointments',
      description:
        'Appoint Vice-Chancellor (as per regulations), Pro-Vice Chancellor, Registrar and other senior functionaries; approve promotions.',
      icon: Users,
      iconBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      id: 'resp-5',
      title: 'Finance & Resource Approval',
      description:
        'Approve annual budgets, major expenditures, grants, and resource allocation; oversee financial integrity and audits.',
      icon: Coins,
      iconBg: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    {
      id: 'resp-6',
      title: 'Research, Innovation & Collaboration',
      description:
        'Promote research and innovation, approve major research initiatives, and authorize MoUs and strategic partnerships.',
      icon: FlaskConical,
      iconBg: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    },
    {
      id: 'resp-7',
      title: 'Preside Over Statutory Bodies',
      description:
        'Chair key bodies such as the Executive Council, Academic Council, Syndicate, and other apex committees.',
      icon: UsersRound,
      iconBg: 'bg-violet-50 text-violet-700 border-violet-200',
    },
    {
      id: 'resp-8',
      title: 'Quality, Compliance & Risk Oversight',
      description:
        'Ensure adherence to statutory requirements, quality standards (NAAC/NIRF), and risk management.',
      icon: ShieldCheck,
      iconBg: 'bg-teal-50 text-teal-700 border-teal-200',
    },
    {
      id: 'resp-9',
      title: 'Performance & Impact Review',
      description:
        'Review periodic reports on academics, research, finance, and administration; monitor university rankings and outcomes.',
      icon: BarChart3,
      iconBg: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      id: 'resp-10',
      title: 'Represent & Promote the University',
      description:
        'Act as the ceremonial head and brand ambassador, foster industry, alumni and global academic relations.',
      icon: Star,
      iconBg: 'bg-amber-50 text-amber-600 border-amber-200',
    },
  ];

  const getIconForType = (type: string) => {
    switch (type) {
      case 'building':
        return { icon: Building2, iconBg: 'bg-indigo-50 text-indigo-700 border-indigo-200' };
      case 'clipboard':
        return { icon: ClipboardCheck, iconBg: 'bg-sky-50 text-sky-700 border-sky-200' };
      case 'graduation':
        return { icon: GraduationCap, iconBg: 'bg-purple-50 text-purple-700 border-purple-200' };
      case 'users':
        return { icon: Users, iconBg: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
      case 'coins':
        return { icon: Coins, iconBg: 'bg-amber-50 text-amber-700 border-amber-200' };
      case 'flask':
        return { icon: FlaskConical, iconBg: 'bg-cyan-50 text-cyan-700 border-cyan-200' };
      case 'users-group':
        return { icon: UsersRound, iconBg: 'bg-violet-50 text-violet-700 border-violet-200' };
      case 'shield':
        return { icon: ShieldCheck, iconBg: 'bg-teal-50 text-teal-700 border-teal-200' };
      case 'chart':
        return { icon: BarChart3, iconBg: 'bg-blue-50 text-blue-700 border-blue-200' };
      case 'star':
      default:
        return { icon: Star, iconBg: 'bg-amber-50 text-amber-600 border-amber-200' };
    }
  };

  const items =
    responsibilities && responsibilities.length > 0
      ? responsibilities.map((r) => ({
          id: r.id,
          title: r.title,
          description: r.description,
          ...getIconForType(r.iconType),
        }))
      : defaultItems;

  return (
    <div className="w-full bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex flex-col space-y-3.5 select-none">
      {/* Header with Graduation Cap Icon */}
      <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
        <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center border border-indigo-100 shadow-2xs">
          <GraduationCap className="w-4 h-4 stroke-[2.2]" />
        </div>
        <h2 className="text-sm sm:text-base font-extrabold text-[#1e1b4b] tracking-tight">
          Work &amp; Responsibilities
        </h2>
      </div>

      {/* 10 Responsibilities List */}
      <div className="space-y-3 overflow-y-auto max-h-[calc(100vh-210px)] pr-1 custom-scrollbar">
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id || idx}
              className="p-3 rounded-xl bg-slate-50/70 hover:bg-slate-50 border border-slate-200/70 hover:border-slate-300 transition-all flex items-start gap-3 group"
            >
              <div
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0 border mt-0.5 shadow-2xs group-hover:scale-105 transition-transform ${item.iconBg}`}
              >
                <Icon className="w-4 h-4 stroke-[2.2]" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xs sm:text-[13px] font-bold text-slate-900 leading-snug group-hover:text-indigo-900 transition-colors">
                  {item.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed mt-0.5">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChancellorResponsibilitiesPanel;
