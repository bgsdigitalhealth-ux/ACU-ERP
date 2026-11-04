import React from 'react';
import { Calendar, Users, CheckCircle2, Building, FlaskConical, FileText } from 'lucide-react';
import { useUniversityAdmin } from '../../../context/UniversityAdminContext';

export const CoeKpis: React.FC = () => {
  const { coeKpis } = useUniversityAdmin();

  const cards = [
    {
      id: 'planned',
      value: coeKpis.examsPlanned,
      label: 'Exams Planned',
      icon: Calendar,
      bg: 'bg-[#8A2BE2]'
    },
    {
      id: 'totalExaminers',
      value: coeKpis.examinersTotal,
      label: 'Examiners (Theory + Practical)',
      icon: Users,
      bg: 'bg-[#00B4D8]'
    },
    {
      id: 'allocated',
      value: coeKpis.examinersAllocated,
      label: 'Examiners Allocated',
      icon: CheckCircle2,
      bg: 'bg-[#10B981]'
    },
    {
      id: 'centres',
      value: coeKpis.examCentres,
      label: 'Exam Centres',
      icon: Building,
      bg: 'bg-[#F59E0B]'
    },
    {
      id: 'batches',
      value: coeKpis.practicalBatches,
      label: 'Practical Batches',
      icon: FlaskConical,
      bg: 'bg-[#EC4899]'
    },
    {
      id: 'students',
      value: coeKpis.totalStudents.toLocaleString('en-IN'),
      label: 'Students',
      icon: FileText,
      bg: 'bg-[#7900B8]'
    }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 select-none">
      {cards.map((c) => {
        const Icon = c.icon;
        return (
          <div
            key={c.id}
            className="bg-white border border-purple-200/90 rounded-2xl p-3.5 shadow-2xs flex items-center gap-3 hover:shadow-md transition-all group"
          >
            <div className={`w-11 h-11 rounded-2xl ${c.bg} text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform`}>
              <Icon className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div className="min-w-0">
              <span className="text-xl font-black text-gray-900 tracking-tight leading-none block">
                {c.value}
              </span>
              <p className="text-[10.5px] font-semibold text-gray-600 mt-1 leading-tight line-clamp-2">
                {c.label}
              </p>
            </div>
          </div>
        );
      })}

      {/* 7th Card: 92% Overall Readiness Radial Donut */}
      <div className="bg-white border border-cyan-200/90 rounded-2xl p-3.5 shadow-2xs flex items-center gap-3 hover:shadow-md transition-all group col-span-2 sm:col-span-1">
        <div className="relative w-11 h-11 shrink-0 flex items-center justify-center">
          <svg className="w-11 h-11 transform -rotate-90">
            <circle
              cx="22"
              cy="22"
              r="17"
              stroke="#e2e8f0"
              strokeWidth="3.5"
              fill="transparent"
            />
            <circle
              cx="22"
              cy="22"
              r="17"
              stroke="#0284c7"
              strokeWidth="3.5"
              fill="transparent"
              strokeDasharray={106.8}
              strokeDashoffset={106.8 * (1 - coeKpis.overallReadiness / 100)}
              strokeLinecap="round"
            />
          </svg>
          <span className="absolute text-[10px] font-black text-sky-700">
            {coeKpis.overallReadiness}%
          </span>
        </div>
        <div className="min-w-0">
          <span className="text-lg font-black text-sky-700 tracking-tight leading-none block">
            {coeKpis.overallReadiness}%
          </span>
          <p className="text-[10.5px] font-semibold text-gray-600 mt-1 leading-tight">
            Overall Readiness
          </p>
        </div>
      </div>
    </div>
  );
};

