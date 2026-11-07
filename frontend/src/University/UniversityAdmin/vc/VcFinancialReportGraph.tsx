import React, { useState } from 'react';
import {
  Coins,
  Download,
  Filter,
  ArrowUpRight,
  ShieldCheck,
  PieChart
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';

interface VcFinancialReportGraphProps {
  onNavigate?: (tab: string) => void;
}

export const VcFinancialReportGraph: React.FC<VcFinancialReportGraphProps> = ({ onNavigate }) => {
  const [selectedYear, setSelectedYear] = useState('2024-25');

  // Quarterly Financial Performance Data (Amounts in ₹ Crores)
  const financialData = [
    {
      quarter: 'Q1 (Apr–Jun)',
      revenue: 41.2,
      expenditure: 34.5,
      researchGrant: 3.8,
      surplus: 6.7
    },
    {
      quarter: 'Q2 (Jul–Sep)',
      revenue: 45.8,
      expenditure: 37.2,
      researchGrant: 4.2,
      surplus: 8.6
    },
    {
      quarter: 'Q3 (Oct–Dec)',
      revenue: 43.6,
      expenditure: 38.1,
      researchGrant: 4.1,
      surplus: 5.5
    },
    {
      quarter: 'Q4 (Jan–Mar)',
      revenue: 42.2,
      expenditure: 38.4,
      researchGrant: 4.32,
      surplus: 3.8
    }
  ];

  // Expenditure distribution
  const expenseBreakdown = [
    { category: 'Faculty & Medical Staff Salaries', percent: 46, amount: '₹68.17 Cr', color: 'bg-purple-600' },
    { category: 'Hospital & Clinical Consumables', percent: 22, amount: '₹32.60 Cr', color: 'bg-indigo-500' },
    { category: 'Campus & Laboratory Infrastructure', percent: 16, amount: '₹23.71 Cr', color: 'bg-blue-500' },
    { category: 'Research, Grants & Innovation', percent: 11, amount: '₹16.30 Cr', color: 'bg-emerald-500' },
    { category: 'Student Welfare & Scholarships', percent: 5, amount: '₹7.41 Cr', color: 'bg-amber-500' }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1e1b4b] text-white p-3 rounded-xl shadow-xl border border-purple-400/40 text-xs select-none">
          <p className="font-bold text-amber-300 mb-1.5">{label}</p>
          <div className="space-y-1">
            <div className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-1.5 text-purple-200">
                <span className="w-2.5 h-2.5 rounded-full bg-[#7047eb] inline-block" />
                Total Revenue:
              </span>
              <span className="font-extrabold text-white">₹{payload[0].value} Cr</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-1.5 text-rose-200">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f43f5e] inline-block" />
                Operating Expenditure:
              </span>
              <span className="font-extrabold text-white">₹{payload[1].value} Cr</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-1.5 text-emerald-200">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] inline-block" />
                Research Grants:
              </span>
              <span className="font-extrabold text-white">₹{payload[2].value} Cr</span>
            </div>
            <div className="pt-1 mt-1 border-t border-purple-400/20 text-[10px] text-emerald-300 flex justify-between">
              <span>Operational Surplus:</span>
              <span className="font-bold">+₹{(payload[0].value - payload[1].value).toFixed(1)} Cr</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-purple-200/90 shadow-2xs overflow-hidden flex flex-col justify-between select-none">
      {/* Header Bar */}
      <div className="bg-gradient-to-r from-[#440d75] to-[#2d0850] text-white px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-400 text-purple-950 flex items-center justify-center shadow-sm">
            <Coins className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-sm sm:text-base tracking-tight text-white">
                University Financial & Budgetary Report
              </h3>
              <span className="text-[10px] font-bold bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-300/30">
                FY 2024–25 Audit
              </span>
            </div>
            <p className="text-[11px] text-purple-200">
              Institutional quarterly revenue, operational expenditure & research grant funds
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-purple-950/70 border border-purple-400/30 rounded-xl px-2.5 py-1 text-xs text-white">
            <Filter className="w-3.5 h-3.5 text-purple-300" />
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="bg-transparent text-white font-medium text-xs focus:outline-hidden cursor-pointer"
            >
              <option value="2024-25" className="bg-[#2d0850] text-white">Fiscal Year 2024–25</option>
              <option value="2023-24" className="bg-[#2d0850] text-white">Fiscal Year 2023–24</option>
            </select>
          </div>

          <button
            onClick={() => {
              if (onNavigate) onNavigate('performance-reports-vc');
            }}
            className="flex items-center gap-1 px-3 py-1 bg-white/10 hover:bg-white/20 text-purple-100 hover:text-white rounded-xl text-xs font-semibold transition-all border border-white/20 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Audit PDF</span>
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-5">
        {/* KPI Summary Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-[#fcfbff] border border-purple-200/70 rounded-xl p-3 flex flex-col justify-between">
            <span className="text-[11px] font-bold text-gray-500">Approved Annual Budget</span>
            <div className="text-xl font-black text-gray-900 mt-0.5">₹184.50 Cr</div>
            <span className="text-[10px] font-semibold text-emerald-600 mt-1 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> Syndicate Approved
            </span>
          </div>

          <div className="bg-[#fcfbff] border border-purple-200/70 rounded-xl p-3 flex flex-col justify-between">
            <span className="text-[11px] font-bold text-gray-500">Revenue Realized</span>
            <div className="text-xl font-black text-purple-900 mt-0.5">₹172.80 Cr</div>
            <span className="text-[10px] font-semibold text-purple-600 mt-1 flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" /> 93.6% of Target
            </span>
          </div>

          <div className="bg-[#fcfbff] border border-purple-200/70 rounded-xl p-3 flex flex-col justify-between">
            <span className="text-[11px] font-bold text-gray-500">Expenditure Incurred</span>
            <div className="text-xl font-black text-rose-900 mt-0.5">₹148.20 Cr</div>
            <span className="text-[10px] font-semibold text-rose-600 mt-1">
              80.3% Budget Utilization
            </span>
          </div>

          <div className="bg-[#fcfbff] border border-purple-200/70 rounded-xl p-3 flex flex-col justify-between">
            <span className="text-[11px] font-bold text-gray-500">Net Operational Surplus</span>
            <div className="text-xl font-black text-emerald-700 mt-0.5">+₹24.60 Cr</div>
            <span className="text-[10px] font-semibold text-emerald-600 mt-1">
              Transferred to Endowment
            </span>
          </div>
        </div>

        {/* Graph + Side Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Main Area Chart (8 Columns) */}
          <div className="lg:col-span-8 border border-purple-100 rounded-2xl p-4 bg-[#faf9fe] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="text-xs font-black text-gray-900 uppercase tracking-wider">
                  Quarterly Revenue vs. Operating Expenditure (in ₹ Crores)
                </h4>
                <p className="text-[11px] text-gray-500">
                  Includes tuition revenue, medical hospital earnings, and extramural research grants
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs font-bold">
                <span className="flex items-center gap-1.5 text-purple-900">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#7047eb] inline-block" />
                  Revenue
                </span>
                <span className="flex items-center gap-1.5 text-rose-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#f43f5e] inline-block" />
                  Expenditure
                </span>
                <span className="flex items-center gap-1.5 text-emerald-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] inline-block" />
                  Research Grants
                </span>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={financialData}
                  margin={{ top: 15, right: 10, left: -15, bottom: 5 }}
                >
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7047eb" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#7047eb" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="colorGrant" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e9d5ff" />
                  <XAxis dataKey="quarter" tick={{ fill: '#4b5563', fontSize: 11, fontWeight: 600 }} />
                  <YAxis unit=" Cr" tick={{ fill: '#6b7280', fontSize: 11 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#7047eb"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorRev)"
                  />
                  <Area
                    type="monotone"
                    dataKey="expenditure"
                    stroke="#f43f5e"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorExp)"
                  />
                  <Area
                    type="monotone"
                    dataKey="researchGrant"
                    stroke="#10b981"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorGrant)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Budget Expenditure Allocation Breakdown (4 Columns) */}
          <div className="lg:col-span-4 border border-purple-100 rounded-2xl p-4 bg-[#fcfbff] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <PieChart className="w-4 h-4 text-purple-700" />
                <h4 className="text-xs font-extrabold text-[#3b1263] uppercase tracking-wider">
                  Expenditure Distribution
                </h4>
              </div>
              <p className="text-[11px] text-gray-500 mb-3">
                Total Outlay: ₹148.20 Crores across operational heads
              </p>

              <div className="space-y-3">
                {expenseBreakdown.map((exp, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-gray-700 truncate max-w-[190px]">
                        {exp.category}
                      </span>
                      <span className="font-black text-gray-900 font-mono">
                        {exp.amount} ({exp.percent}%)
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                      <div
                        className={`h-full ${exp.color} rounded-full`}
                        style={{ width: `${exp.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-purple-100 flex items-center justify-between text-xs">
              <span className="text-gray-500 font-medium">Fiscal Compliance Rating:</span>
              <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                AAA (Statutory Clean)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
