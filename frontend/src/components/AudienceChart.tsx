import React, { useState } from 'react';
import { MonthlyChartData } from '../types/erp';

interface AudienceChartProps {
  data: MonthlyChartData[];
}

export const AudienceChart: React.FC<AudienceChartProps> = ({ data }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const maxValue = 120;
  const chartHeight = 220;

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#edf2f7] shadow-sm">
      {/* Card Header & Legend */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h3 className="text-lg font-bold text-[#1e293b]">Audience Overview</h3>

        {/* Legend */}
        <div className="flex items-center gap-5 text-xs font-medium text-[#64748b]">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm bg-[#5c77ff]"></span>
            <span>Orders</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm bg-[#00cfe8]"></span>
            <span>Net Revenue</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm bg-[#e83e8c]"></span>
            <span>Refunds</span>
          </div>
        </div>
      </div>

      {/* Bar Chart Area */}
      <div className="relative pt-2 pb-1">
        {/* Y Axis Gridlines & Labels */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-7">
          {[120, 100, 80, 60, 40, 20, 0].map((val) => (
            <div key={val} className="flex items-center w-full">
              <span className="text-[11px] text-[#8a92a6] w-7 shrink-0">{val}</span>
              <div className="flex-1 h-[1px] bg-[#f1f5f9] ml-2"></div>
            </div>
          ))}
        </div>

        {/* Clustered Bars Container */}
        <div className="relative z-10 flex items-end justify-between ml-9 h-[220px] pb-7 pt-4">
          {data.map((item, idx) => {
            const ordersHeight = (item.orders / maxValue) * (chartHeight - 35);
            const revenueHeight = (item.revenue / maxValue) * (chartHeight - 35);
            const refundsHeight = (item.refunds / maxValue) * (chartHeight - 35);

            const isHovered = hoveredIndex === idx;

            return (
              <div
                key={item.month}
                className="flex-1 flex flex-col items-center justify-end h-full group relative cursor-pointer"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Tooltip on hover */}
                {isHovered && (
                  <div className="absolute -top-12 bg-[#1e293b] text-white text-[11px] py-1 px-2.5 rounded-lg shadow-lg z-20 whitespace-nowrap pointer-events-none">
                    <span className="font-semibold">{item.month}: </span>
                    <span className="text-[#5c77ff] font-medium">{item.orders}</span> /{' '}
                    <span className="text-[#00cfe8] font-medium">{item.revenue}</span> /{' '}
                    <span className="text-[#e83e8c] font-medium">{item.refunds}</span>
                  </div>
                )}

                {/* 3 Bars */}
                <div className="flex items-end gap-1 px-1">
                  {/* Orders Bar (Indigo) */}
                  <div
                    style={{ height: `${ordersHeight}px` }}
                    className="w-1.5 md:w-2 bg-[#5c77ff] rounded-t-sm transition-all duration-300 group-hover:brightness-110"
                  />
                  {/* Net Revenue Bar (Cyan) */}
                  <div
                    style={{ height: `${revenueHeight}px` }}
                    className="w-1.5 md:w-2 bg-[#00cfe8] rounded-t-sm transition-all duration-300 group-hover:brightness-110"
                  />
                  {/* Refunds Bar (Pink) */}
                  <div
                    style={{ height: `${refundsHeight}px` }}
                    className="w-1.5 md:w-2 bg-[#e83e8c] rounded-t-sm transition-all duration-300 group-hover:brightness-110"
                  />
                </div>

                {/* Month Label */}
                <span className="absolute -bottom-6 text-[11px] font-medium text-[#8a92a6]">
                  {item.month}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

