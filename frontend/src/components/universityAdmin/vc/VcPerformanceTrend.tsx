import React from 'react';
import { TrendingUp } from 'lucide-react';
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';
import { useUniversityAdmin } from '../../../context/UniversityAdminContext';

export const VcPerformanceTrend: React.FC = () => {
  const { vcTrendData } = useUniversityAdmin();

  return (
    <div className="w-full bg-white rounded-2xl border border-purple-200/90 shadow-2xs overflow-hidden flex flex-col justify-between select-none">
      {/* Header Bar */}
      <div className="bg-gradient-to-r from-[#440d75] to-[#2d0850] text-white px-4 sm:px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-amber-300" />
          <h3 className="font-extrabold text-sm sm:text-base tracking-tight text-white">
            Examination Performance Trend
          </h3>
        </div>
        <span className="text-[11px] text-purple-200 font-medium bg-purple-900/60 px-2 py-0.5 rounded-full border border-purple-400/30">
          Year-on-Year Growth
        </span>
      </div>

      {/* Chart */}
      <div className="p-4 pt-6 h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={vcTrendData} margin={{ top: 10, right: 20, left: -15, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={{ stroke: '#cbd5e1' }}
              tick={{ fontSize: 11, fontWeight: 600, fill: '#475569' }}
            />
            <YAxis
              domain={[70, 100]}
              ticks={[70, 75, 80, 85, 90, 95, 100]}
              tickFormatter={(v) => `${v}%`}
              tickLine={false}
              axisLine={{ stroke: '#cbd5e1' }}
              tick={{ fontSize: 10, fontWeight: 600, fill: '#64748b' }}
            />
            <Tooltip
              formatter={(value: any) => [`${value}%`, 'Pass Rate']}
              contentStyle={{
                backgroundColor: '#2a084e',
                color: '#fff',
                borderRadius: '12px',
                border: '1px solid #c084fc',
                fontSize: '12px',
                fontWeight: 'bold'
              }}
            />
            <Bar
              dataKey="passRate"
              fill="#8A2BE2"
              radius={[8, 8, 0, 0]}
              barSize={40}
            />
            <Line
              type="monotone"
              dataKey="passRate"
              stroke="#fbbf24"
              strokeWidth={3}
              dot={{ r: 5, fill: '#fbbf24', stroke: '#fff', strokeWidth: 2 }}
              activeDot={{ r: 7, stroke: '#d97706', strokeWidth: 2 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

