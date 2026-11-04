import React from 'react';
import { PieChart, Briefcase, Users, TrendingUp, TrendingDown } from 'lucide-react';
import { MetricStat } from '../types/erp';

interface StatCardsProps {
  metrics: MetricStat[];
}

export const StatCards: React.FC<StatCardsProps> = ({ metrics }) => {
  const getCardIcon = (type: MetricStat['type']) => {
    switch (type) {
      case 'sales':
        return {
          icon: PieChart,
          bgColor: 'bg-[#eef2ff]',
          iconColor: 'text-[#5c77ff]',
          trendColor: 'text-[#10b981]',
        };
      case 'orders':
        return {
          icon: Briefcase,
          bgColor: 'bg-[#e0f9fc]',
          iconColor: 'text-[#00cfe8]',
          trendColor: 'text-[#00b5ad]',
        };
      case 'customers':
      default:
        return {
          icon: Users,
          bgColor: 'bg-[#f0ebff]',
          iconColor: 'text-[#7047eb]',
          trendColor: 'text-[#e83e8c]',
        };
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {metrics.map((item) => {
        const visual = getCardIcon(item.type);
        const IconComponent = visual.icon;

        return (
          <div
            key={item.id}
            className="bg-white rounded-2xl p-6 border border-[#edf2f7] shadow-sm flex items-start justify-between hover:shadow-md transition-shadow"
          >
            <div>
              <h3 className="text-2xl font-bold text-[#1e293b] tracking-tight">{item.value}</h3>
              <p className="text-sm font-medium text-[#8a92a6] mt-1">{item.title}</p>
              
              <div className="flex items-center gap-1.5 mt-4 text-xs font-medium">
                {item.isPositive ? (
                  <TrendingUp className={`w-3.5 h-3.5 ${visual.trendColor}`} />
                ) : (
                  <TrendingDown className={`w-3.5 h-3.5 ${visual.trendColor}`} />
                )}
                <span className={visual.trendColor}>
                  {item.change} {item.trendText}
                </span>
              </div>
            </div>

            <div className={`w-14 h-14 rounded-2xl ${visual.bgColor} flex items-center justify-center shrink-0`}>
              <IconComponent className={`w-7 h-7 ${visual.iconColor} stroke-[1.5]`} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

