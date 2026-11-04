import React from 'react';
import { PieChart, TrendingUp, Calendar, Users, Shield } from 'lucide-react';
import { useChancellor } from '../../context/ChancellorContext';

export const KeyInsightsSection: React.FC = () => {
  const { keyInsights } = useChancellor();

  const getInsightVisual = (type: string) => {
    switch (type) {
      case 'passRate':
        return {
          icon: TrendingUp,
          iconBg: 'bg-emerald-50 border-emerald-200',
          iconColor: 'text-emerald-600',
          valColor: 'text-emerald-600'
        };
      case 'examsConducted':
        return {
          icon: Calendar,
          iconBg: 'bg-purple-50 border-purple-200',
          iconColor: 'text-purple-700',
          valColor: 'text-[#1e1b4b]'
        };
      case 'resultsPublished':
        return {
          icon: Users,
          iconBg: 'bg-sky-50 border-sky-200',
          iconColor: 'text-sky-600',
          valColor: 'text-[#1e1b4b]'
        };
      case 'disruptions':
      default:
        return {
          icon: Shield,
          iconBg: 'bg-amber-50 border-amber-200',
          iconColor: 'text-amber-600',
          valColor: 'text-[#1e1b4b]'
        };
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-purple-200/90 shadow-xs overflow-hidden flex flex-col justify-between">
      {/* Header Bar */}
      <div className="bg-gradient-to-r from-[#440d75] to-[#2d0850] text-white px-4 sm:px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <PieChart className="w-5 h-5 text-amber-300" />
          <h3 className="font-extrabold text-sm sm:text-base tracking-tight text-white">
            Key Insights
          </h3>
        </div>
        <span className="text-[11px] text-purple-200 font-medium bg-purple-900/60 px-2 py-0.5 rounded-full border border-purple-400/30">
          Executive Telemetry
        </span>
      </div>

      {/* 2x2 Grid of Insights */}
      <div className="p-3 sm:p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {keyInsights.map((ins) => {
          const visual = getInsightVisual(ins.type);
          const Icon = visual.icon;

          return (
            <div
              key={ins.id}
              className="p-3.5 bg-[#fcfaff] rounded-xl border border-purple-100 flex items-center gap-3.5 hover:shadow-xs transition-shadow"
            >
              <div
                className={`w-11 h-11 rounded-xl ${visual.iconBg} border flex items-center justify-center shrink-0 shadow-2xs`}
              >
                <Icon className={`w-5 h-5 ${visual.iconColor} stroke-[2.2]`} />
              </div>

              <div className="min-w-0">
                <span className={`text-xl sm:text-2xl font-extrabold tracking-tight ${visual.valColor} block leading-none`}>
                  {ins.value}
                </span>
                <span className="text-[11.5px] font-semibold text-gray-600 mt-1 block leading-tight">
                  {ins.subtitle}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

