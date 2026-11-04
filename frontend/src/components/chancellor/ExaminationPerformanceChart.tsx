import React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell
} from 'recharts';
import { BarChart2 } from 'lucide-react';
import { useChancellor } from '../../context/ChancellorContext';

export const ExaminationPerformanceChart: React.FC = () => {
  const { performanceHistory } = useChancellor();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#1e143b] text-white p-3 rounded-xl shadow-xl border border-purple-400/40 text-xs select-none">
          <p className="font-extrabold text-amber-300 text-sm mb-1">{label}</p>
          <p className="font-bold">
            Pass Percentage:{' '}
            <span className="text-emerald-400 font-extrabold">
              {data.passPercentage}%
            </span>
          </p>
          <div className="mt-1.5 pt-1.5 border-t border-purple-800 text-[11px] text-purple-200 space-y-0.5">
            <p>Registered: {data.registeredStudents.toLocaleString('en-IN')}</p>
            <p>Appeared: {data.appearedStudents.toLocaleString('en-IN')}</p>
            <p>Passed: {data.passedStudents.toLocaleString('en-IN')}</p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-purple-200/90 shadow-xs overflow-hidden flex flex-col justify-between">
      {/* Header Bar */}
      <div className="bg-gradient-to-r from-[#440d75] to-[#2d0850] text-white px-4 sm:px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <BarChart2 className="w-5 h-5 text-amber-300" />
          <h3 className="font-extrabold text-sm sm:text-base tracking-tight text-white">
            Examination Performance (University)
          </h3>
        </div>
        <span className="text-[11px] text-purple-200 font-medium bg-purple-900/60 px-2.5 py-0.5 rounded-full border border-purple-400/30">
          YoY Benchmark
        </span>
      </div>

      {/* Chart Canvas */}
      <div className="p-4 pt-5 h-[230px] sm:h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={performanceHistory}
            margin={{ top: 15, right: 20, left: -10, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis
              dataKey="year"
              stroke="#64748b"
              fontSize={11}
              fontWeight={600}
              tickLine={false}
              axisLine={{ stroke: '#cbd5e1' }}
            />
            <YAxis
              domain={[70, 100]}
              ticks={[70, 75, 80, 85, 90, 95, 100]}
              tickFormatter={(v) => `${v}%`}
              stroke="#64748b"
              fontSize={11}
              fontWeight={600}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />

            {/* Purple Bars with rounded top */}
            <Bar
              dataKey="passPercentage"
              radius={[6, 6, 0, 0]}
              barSize={44}
              label={{
                position: 'top',
                formatter: (v: any) => `${v}%`,
                fill: '#6b21a8',
                fontSize: 11,
                fontWeight: 700
              }}
            >
              {performanceHistory.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === performanceHistory.length - 1 ? '#8b5cf6' : '#9333ea'}
                  stroke="#7c3aed"
                />
              ))}
            </Bar>

            {/* Glowing Golden Trend Line Overlay */}
            <Line
              type="monotone"
              dataKey="passPercentage"
              stroke="#f59e0b"
              strokeWidth={2.8}
              dot={{
                r: 4.5,
                fill: '#fef08a',
                stroke: '#d97706',
                strokeWidth: 2
              }}
              activeDot={{
                r: 7,
                fill: '#ffffff',
                stroke: '#f59e0b',
                strokeWidth: 3
              }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
