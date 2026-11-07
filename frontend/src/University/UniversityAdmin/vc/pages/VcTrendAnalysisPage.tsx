import React from 'react';
import {
  TrendingUp,
  Download
} from 'lucide-react';
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
import { useUniversityAdmin } from '../../../../context/UniversityAdminContext';

export const VcTrendAnalysisPage: React.FC = () => {
  const { setToast } = useUniversityAdmin();

  const multiYearData = [
    { year: '2020–21', passRate: 86.4, distinctions: 16.2, students: 6420 },
    { year: '2021–22', passRate: 88.1, distinctions: 18.4, students: 7150 },
    { year: '2022–23', passRate: 89.7, distinctions: 20.1, students: 7890 },
    { year: '2023–24', passRate: 91.6, distinctions: 21.8, students: 8240 },
    { year: '2024–25', passRate: 92.4, distinctions: 22.7, students: 8642 }
  ];

  return (
    <div className="space-y-5 p-4 sm:p-6 bg-[#f8f9fe] min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#29084e] via-[#3d0a6c] to-[#250646] text-white p-5 sm:p-6 rounded-2xl shadow-lg border border-[#581c87] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-1">
            <TrendingUp className="w-4 h-4" />
            <span>Longitudinal Academic Trajectory</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            5-Year University Examination Trend Analysis
          </h1>
          <p className="text-xs sm:text-sm text-purple-200 mt-1">
            Long-term pass percentage trajectory, distinction growth &amp; enrollment expansion from 2020 to 2025.
          </p>
        </div>

        <button
          onClick={() => setToast('Multi-year Trend Analysis Dossier exported.')}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-purple-950 font-black text-xs flex items-center gap-2 shadow-md cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Export Trends Chart</span>
        </button>
      </div>

      {/* Main Chart */}
      <div className="bg-white rounded-2xl border border-purple-200/90 p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h3 className="font-extrabold text-base text-purple-950">
              Pass Rate vs Distinction Rate (2020 – 2025)
            </h3>
            <p className="text-xs text-gray-500">Continuous 5-year upward trajectory across all ACU boards</p>
          </div>

          <div className="flex items-center gap-4 text-xs font-bold">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#8A2BE2]" />
              <span className="text-gray-700">Pass Rate (%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#fbbf24]" />
              <span className="text-gray-700">Distinction Rate (%)</span>
            </div>
          </div>
        </div>

        <div className="h-80 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={multiYearData} margin={{ top: 10, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="year" tickLine={false} tick={{ fontSize: 11, fontWeight: 700, fill: '#334155' }} />
              <YAxis domain={[0, 100]} tickLine={false} tick={{ fontSize: 10, fontWeight: 600, fill: '#64748b' }} tickFormatter={(v) => `${v}%`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#2a084e',
                  color: '#fff',
                  borderRadius: '12px',
                  border: '1px solid #c084fc',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}
              />
              <Bar dataKey="passRate" fill="#8A2BE2" radius={[6, 6, 0, 0]} barSize={42} />
              <Line type="monotone" dataKey="distinctionRate" stroke="#fbbf24" strokeWidth={3} dot={{ r: 5, fill: '#fbbf24' }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Year-by-Year Historical Breakdown Table */}
      <div className="bg-white rounded-2xl border border-purple-200/90 shadow-2xs overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#f9f5ff] text-[#4a157c] font-black border-b border-purple-100">
            <tr>
              <th className="py-3 px-4">Academic Year</th>
              <th className="py-3 px-3 text-center">Total Registered</th>
              <th className="py-3 px-3 text-center">Pass Percentage</th>
              <th className="py-3 px-3 text-center">Distinction Share</th>
              <th className="py-3 px-3 text-center">YoY Growth</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-100">
            {multiYearData.map((row, idx) => (
              <tr key={row.year} className="hover:bg-purple-50/40 transition-colors">
                <td className="py-3 px-4 font-bold text-gray-900">{row.year}</td>
                <td className="py-3 px-3 text-center font-semibold text-gray-700">{row.students.toLocaleString()}</td>
                <td className="py-3 px-3 text-center font-black text-purple-950">{row.passRate}%</td>
                <td className="py-3 px-3 text-center font-bold text-amber-700">{row.distinctions}%</td>
                <td className="py-3 px-3 text-center font-bold text-emerald-700">
                  {idx > 0 ? `+${(row.passRate - multiYearData[idx - 1].passRate).toFixed(1)}%` : 'Base Year'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
