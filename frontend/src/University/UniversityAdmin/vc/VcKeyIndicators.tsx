import React from 'react';
import { Target, TrendingUp, Users, Calendar, ShieldCheck } from 'lucide-react';

export const VcKeyIndicators: React.FC = () => {
  const indicators = [
    {
      id: 'passRateGrowth',
      value: '+0.8%',
      label: 'Pass Rate',
      sublabel: '(vs. Previous Year)',
      icon: TrendingUp,
      color: 'text-emerald-700',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200'
    },
    {
      id: 'resultsPublished',
      value: '92.1%',
      label: 'Results Published',
      sublabel: 'Across All Faculties',
      icon: Users,
      color: 'text-purple-700',
      bg: 'bg-purple-50',
      border: 'border-purple-200'
    },
    {
      id: 'conductedOnTime',
      value: '98.4%',
      label: 'Exams Conducted',
      sublabel: '(as per Calendar)',
      icon: Calendar,
      color: 'text-blue-700',
      bg: 'bg-blue-50',
      border: 'border-blue-200'
    },
    {
      id: 'disruptions',
      value: '0',
      label: 'Major Exam Disruptions',
      sublabel: 'Zero Malpractice Leaks',
      icon: ShieldCheck,
      color: 'text-amber-700',
      bg: 'bg-amber-50',
      border: 'border-amber-200'
    }
  ];

  return (
    <div className="w-full bg-white rounded-2xl border border-purple-200/90 shadow-2xs overflow-hidden flex flex-col justify-between select-none">
      {/* Header Bar */}
      <div className="bg-gradient-to-r from-[#440d75] to-[#2d0850] text-white px-4 sm:px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-amber-300" />
          <h3 className="font-extrabold text-sm sm:text-base tracking-tight text-white">
            Key Indicators
          </h3>
        </div>
        <span className="text-[11px] text-purple-200 font-medium bg-purple-900/60 px-2 py-0.5 rounded-full border border-purple-400/30">
          Executive Summary
        </span>
      </div>

      {/* Grid of 4 indicators */}
      <div className="p-3 sm:p-4 grid grid-cols-2 gap-3">
        {indicators.map((ind) => {
          const Icon = ind.icon;
          return (
            <div
              key={ind.id}
              className={`p-3.5 ${ind.bg} ${ind.border} border rounded-xl flex items-center gap-3 shadow-2xs`}
            >
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-2xs">
                <Icon className={`w-5 h-5 ${ind.color} stroke-[2.2]`} />
              </div>
              <div className="min-w-0">
                <span className={`text-lg sm:text-xl font-black ${ind.color} leading-none block`}>
                  {ind.value}
                </span>
                <p className="text-xs font-bold text-gray-800 mt-0.5 truncate">
                  {ind.label}
                </p>
                <p className="text-[10px] text-gray-500 truncate">
                  {ind.sublabel}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

