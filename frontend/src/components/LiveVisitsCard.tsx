import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import { VisitsDistribution } from '../types/erp';

interface LiveVisitsCardProps {
  visits: VisitsDistribution;
}

export const LiveVisitsCard: React.FC<LiveVisitsCardProps> = ({ visits }) => {
  // Donut SVG circumference calculation
  // Radius = 54, Circumference = 2 * PI * 54 = 339.292
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const domesticDash = (visits.domestic / 100) * circumference;
  const internationalDash = (visits.international / 100) * circumference;

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#edf2f7] shadow-sm flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h4 className="text-base font-bold text-[#1e293b]">Live Visits on Our Site</h4>
        <button className="text-[#8a92a6] hover:text-[#1e293b] p-1 rounded transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Donut Chart with Percentage Badges */}
      <div className="relative flex items-center justify-center my-6">
        <svg viewBox="0 0 140 140" className="w-48 h-48 -rotate-90">
          {/* Base Domestic Arc (Purple) */}
          <circle
            cx="70"
            cy="70"
            r={radius}
            fill="transparent"
            stroke="#7047eb"
            strokeWidth="20"
            strokeDasharray={`${domesticDash} ${circumference}`}
            strokeDashoffset="0"
          />
          {/* International Arc (Pink) */}
          <circle
            cx="70"
            cy="70"
            r={radius}
            fill="transparent"
            stroke="#e83e8c"
            strokeWidth="20"
            strokeDasharray={`${internationalDash} ${circumference}`}
            strokeDashoffset={`-${domesticDash}`}
          />
        </svg>

        {/* In-chart Percentage Labels */}
        <div className="absolute inset-0 flex items-center justify-between px-5 pointer-events-none">
          <span className="text-xs font-bold text-white bg-[#e83e8c] px-1.5 py-0.5 rounded shadow-sm">
            {visits.international}%
          </span>
          <span className="text-xs font-bold text-white bg-[#7047eb] px-1.5 py-0.5 rounded shadow-sm">
            {visits.domestic}%
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 text-xs font-medium text-[#64748b]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#7047eb]"></span>
          <span>Domestic</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#e83e8c]"></span>
          <span>International</span>
        </div>
      </div>
    </div>
  );
};

