import React from 'react';
import { Star } from 'lucide-react';
import { RatingsData } from '../types/erp';

interface RatingsCardProps {
  ratings: RatingsData;
}

export const RatingsCard: React.FC<RatingsCardProps> = ({ ratings }) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-[#edf2f7] shadow-sm flex items-center justify-between">
      <div>
        <h4 className="text-base font-bold text-[#1e293b]">Ratings</h4>
        <p className="text-[11px] font-semibold text-[#8a92a6] tracking-wider mt-1 uppercase">
          {ratings.year}
        </p>

        <div className="mt-3">
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-[#1e293b]">{ratings.reviewsCount}</span>
            <span className="text-xs text-[#8a92a6]">Review</span>
          </div>

          <div className="flex items-center gap-1.5 mt-2 text-xs">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            </div>
            <span className="font-semibold text-[#1e293b]">{ratings.averageScore}</span>
            <span className="text-emerald-500 font-medium">{ratings.percentageChange}</span>
            <span className="text-[#8a92a6] text-[11px]">From previous period</span>
          </div>
        </div>
      </div>

      {/* Segmented Donut Chart */}
      <div className="relative w-24 h-24 shrink-0">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          {/* Segment 1 - Cyan */}
          <circle
            cx="50"
            cy="50"
            r="38"
            fill="transparent"
            stroke="#00cfe8"
            strokeWidth="11"
            strokeDasharray="75 165"
            strokeDashoffset="0"
            strokeLinecap="round"
          />
          {/* Segment 2 - Teal */}
          <circle
            cx="50"
            cy="50"
            r="38"
            fill="transparent"
            stroke="#00b5ad"
            strokeWidth="11"
            strokeDasharray="45 195"
            strokeDashoffset="-80"
            strokeLinecap="round"
          />
          {/* Segment 3 - Pink */}
          <circle
            cx="50"
            cy="50"
            r="38"
            fill="transparent"
            stroke="#e83e8c"
            strokeWidth="11"
            strokeDasharray="40 200"
            strokeDashoffset="-135"
            strokeLinecap="round"
          />
          {/* Segment 4 - Purple */}
          <circle
            cx="50"
            cy="50"
            r="38"
            fill="transparent"
            stroke="#7047eb"
            strokeWidth="11"
            strokeDasharray="45 195"
            strokeDashoffset="-185"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
};

