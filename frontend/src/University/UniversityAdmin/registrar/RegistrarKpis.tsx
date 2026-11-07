import React from 'react';
import { FileText, Users, CheckCircle2, FlaskConical, ClipboardCheck, Trophy } from 'lucide-react';
import { useUniversityAdmin } from '../../../context/UniversityAdminContext';

export const RegistrarKpis: React.FC = () => {
  const { registrarKpis } = useUniversityAdmin();

  const cards = [
    {
      id: 'scriptsReceived',
      value: registrarKpis.answerScriptsReceived.toLocaleString('en-IN'),
      label: 'Answer Scripts Received',
      icon: FileText,
      iconBg: 'bg-[#8A2BE2]'
    },
    {
      id: 'evaluators',
      value: registrarKpis.evaluatorsAppointed,
      label: 'Evaluators Appointed',
      icon: Users,
      iconBg: 'bg-[#00B4D8]'
    },
    {
      id: 'evaluated',
      value: `${registrarKpis.scriptsEvaluated.toLocaleString('en-IN')}`,
      label: `Scripts Evaluated (${registrarKpis.evaluationPercentage}%)`,
      icon: CheckCircle2,
      iconBg: 'bg-[#10B981]'
    },
    {
      id: 'practicalMarks',
      value: registrarKpis.practicalMarksReceived,
      label: 'Practical Marks Received',
      icon: FlaskConical,
      iconBg: 'bg-[#F59E0B]'
    },
    {
      id: 'resultDrafts',
      value: registrarKpis.resultDraftsPrepared,
      label: 'Result Drafts Prepared',
      icon: ClipboardCheck,
      iconBg: 'bg-[#EC4899]'
    },
    {
      id: 'published',
      value: registrarKpis.resultsPublished,
      label: 'Result Published',
      icon: Trophy,
      iconBg: 'bg-[#0284C7]'
    }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 select-none">
      {cards.map((c) => {
        const Icon = c.icon;
        return (
          <div
            key={c.id}
            className="bg-white border border-purple-200/90 rounded-2xl p-4 shadow-2xs flex items-center gap-3.5 hover:shadow-md transition-all group"
          >
            <div className={`w-12 h-12 rounded-2xl ${c.iconBg} text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform`}>
              <Icon className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div className="min-w-0">
              <span className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight leading-none block">
                {c.value}
              </span>
              <p className="text-[11px] font-semibold text-gray-600 mt-1 leading-tight line-clamp-2">
                {c.label}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

