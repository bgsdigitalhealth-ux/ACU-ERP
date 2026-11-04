import React from 'react';
import {
  GraduationCap,
  Users,
  ClipboardList,
  BarChart2,
  Award,
  TrendingUp
} from 'lucide-react';
import { useChancellor } from '../../context/ChancellorContext';

export const KpiCards: React.FC = () => {
  const { kpiSummary } = useChancellor();

  const cards = [
    {
      id: 'kpi-colleges',
      value: kpiSummary.constituentColleges,
      label: 'Constituent Colleges',
      icon: GraduationCap,
      iconBg: 'bg-[#f5eeff]',
      iconBorder: 'border-[#e9d5ff]',
      iconColor: 'text-[#7c3aed]',
      change: kpiSummary.collegesChange,
    },
    {
      id: 'kpi-students',
      value: kpiSummary.studentsRegistered.toLocaleString('en-IN'),
      label: 'Students Registered',
      icon: Users,
      iconBg: 'bg-[#e0f2fe]',
      iconBorder: 'border-[#bae6fd]',
      iconColor: 'text-[#0284c7]',
      change: kpiSummary.studentsChange,
    },
    {
      id: 'kpi-exams',
      value: kpiSummary.totalExams,
      label: 'Exams (Theory + Practical)',
      icon: ClipboardList,
      iconBg: 'bg-[#dcfce7]',
      iconBorder: 'border-[#bbf7d0]',
      iconColor: 'text-[#16a34a]',
      change: kpiSummary.examsChange,
    },
    {
      id: 'kpi-pass',
      value: `${kpiSummary.overallPassPercentage}%`,
      label: 'Overall Pass Percentage',
      icon: BarChart2,
      iconBg: 'bg-[#ffedd5]',
      iconBorder: 'border-[#fed7aa]',
      iconColor: 'text-[#ea580c]',
      change: kpiSummary.passPercentageChange,
    },
    {
      id: 'kpi-completion',
      value: `${kpiSummary.examCompletionPercentage}%`,
      label: 'Examination Completion',
      icon: Award,
      iconBg: 'bg-[#f3e8ff]',
      iconBorder: 'border-[#e9d5ff]',
      iconColor: 'text-[#9333ea]',
      change: kpiSummary.completionChange,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4 select-none">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className="bg-white rounded-2xl p-4 sm:p-4.5 border border-purple-100/80 shadow-xs hover:shadow-md transition-all flex items-center gap-3.5 group"
          >
            {/* Circular Icon with tinted background */}
            <div
              className={`w-12 h-12 rounded-full ${card.iconBg} ${card.iconBorder} border flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform`}
            >
              <Icon className={`w-6 h-6 ${card.iconColor} stroke-[2.2]`} />
            </div>

            {/* Numerical Value & Label */}
            <div className="min-w-0">
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#1e1b4b] tracking-tight leading-none">
                {card.value}
              </h3>
              <p className="text-[11.5px] font-semibold text-gray-600 mt-1 leading-tight truncate">
                {card.label}
              </p>
              {card.change && (
                <div className="flex items-center gap-1 mt-1 text-[10px] font-bold text-emerald-600">
                  <TrendingUp className="w-2.5 h-2.5" />
                  <span>{card.change}</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

