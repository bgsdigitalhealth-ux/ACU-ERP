import React, { useState } from 'react';
import {
  MessageSquareHeart,
  Users,
  GraduationCap,
  Smile,
  Award,
  Download,
  Filter,
  CheckCircle2,
  TrendingUp
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';

interface VcFeedbackGraphProps {
  onNavigate?: (tab: string) => void;
}

export const VcFeedbackGraph: React.FC<VcFeedbackGraphProps> = ({ onNavigate }) => {
  const [selectedCohort, setSelectedCohort] = useState('2024-25');

  // Comparative data between Students and Parents
  const feedbackData = [
    {
      parameter: 'Curriculum & Academics',
      student: 94,
      parents: 92,
      benchmark: 85
    },
    {
      parameter: 'Teaching & Mentorship',
      student: 96,
      parents: 95,
      benchmark: 85
    },
    {
      parameter: 'Clinical & Lab Facilities',
      student: 91,
      parents: 89,
      benchmark: 85
    },
    {
      parameter: 'Exam Transparency',
      student: 93,
      parents: 90,
      benchmark: 85
    },
    {
      parameter: 'Campus Safety & Hostel',
      student: 88,
      parents: 94,
      benchmark: 85
    },
    {
      parameter: 'Digital ERP & Portal',
      student: 95,
      parents: 91,
      benchmark: 85
    },
    {
      parameter: 'Career & Internship',
      student: 92,
      parents: 93,
      benchmark: 85
    }
  ];

  // Custom Recharts Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1e1b4b] text-white p-3 rounded-xl shadow-xl border border-purple-400/40 text-xs select-none">
          <p className="font-bold text-amber-300 mb-1.5">{label}</p>
          <div className="space-y-1">
            <div className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-1.5 text-purple-200">
                <span className="w-2.5 h-2.5 rounded-full bg-[#7047eb] inline-block" />
                Student Satisfaction:
              </span>
              <span className="font-extrabold text-white">{payload[0].value}%</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-1.5 text-emerald-200">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] inline-block" />
                Parents Satisfaction:
              </span>
              <span className="font-extrabold text-white">{payload[1].value}%</span>
            </div>
            <div className="pt-1 mt-1 border-t border-purple-400/20 text-[10px] text-gray-300">
              UGC / NAAC Benchmark: 85% (Exceeded)
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
            <MessageSquareHeart className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-sm sm:text-base tracking-tight text-white">
                Student & Parents Feedback Analytics
              </h3>
              <span className="text-[10px] font-bold bg-emerald-400/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-300/30">
                93.8% Overall CSAT
              </span>
            </div>
            <p className="text-[11px] text-purple-200">
              Institutional feedback benchmarking across all faculties & colleges
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-purple-950/70 border border-purple-400/30 rounded-xl px-2.5 py-1 text-xs text-white">
            <Filter className="w-3.5 h-3.5 text-purple-300" />
            <select
              value={selectedCohort}
              onChange={(e) => setSelectedCohort(e.target.value)}
              className="bg-transparent text-white font-medium text-xs focus:outline-hidden cursor-pointer"
            >
              <option value="2024-25" className="bg-[#2d0850] text-white">Academic Year 2024–25</option>
              <option value="2023-24" className="bg-[#2d0850] text-white">Academic Year 2023–24</option>
            </select>
          </div>

          <button
            onClick={() => {
              if (onNavigate) onNavigate('performance-reports-vc');
            }}
            className="flex items-center gap-1 px-3 py-1 bg-white/10 hover:bg-white/20 text-purple-100 hover:text-white rounded-xl text-xs font-semibold transition-all border border-white/20 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-5">
        {/* Metric Overview Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-[#f5f3ff] border border-purple-200/70 rounded-xl p-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#7047eb] text-white flex items-center justify-center shrink-0 shadow-xs">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <div className="text-lg font-black text-purple-950">93.8%</div>
              <div className="text-[11px] font-semibold text-purple-800">Student Satisfaction</div>
              <div className="text-[10px] text-gray-500">6,420 Responses</div>
            </div>
          </div>

          <div className="bg-[#ecfdf5] border border-emerald-200/70 rounded-xl p-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <div className="text-lg font-black text-emerald-950">91.6%</div>
              <div className="text-[11px] font-semibold text-emerald-800">Parents Satisfaction</div>
              <div className="text-[10px] text-gray-500">2,520 Responses</div>
            </div>
          </div>

          <div className="bg-[#f0f9ff] border border-sky-200/70 rounded-xl p-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-sky-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Smile className="w-4 h-4" />
            </div>
            <div>
              <div className="text-lg font-black text-sky-950">+76</div>
              <div className="text-[11px] font-semibold text-sky-800">Net Promoter Score</div>
              <div className="text-[10px] text-gray-500">World-Class Tier</div>
            </div>
          </div>

          <div className="bg-[#fffbeb] border border-amber-200/70 rounded-xl p-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <div className="text-lg font-black text-amber-950">89.4%</div>
              <div className="text-[11px] font-semibold text-amber-800">Response Participation</div>
              <div className="text-[10px] text-gray-500">Mandatory Survey</div>
            </div>
          </div>
        </div>

        {/* Recharts Bar Graph */}
        <div className="border border-purple-100 rounded-2xl p-4 bg-[#faf9fe]">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="text-xs font-black text-gray-900 uppercase tracking-wider">
                Parameter-Wise Feedback Comparison (% Satisfaction)
              </h4>
              <p className="text-[11px] text-gray-500">
                Evaluation across curriculum, faculty, hospital infrastructure, and evaluation
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-bold">
              <span className="flex items-center gap-1.5 text-purple-900">
                <span className="w-3 h-3 rounded-md bg-[#7047eb] inline-block" />
                Student Feedback
              </span>
              <span className="flex items-center gap-1.5 text-emerald-900">
                <span className="w-3 h-3 rounded-md bg-[#10b981] inline-block" />
                Parents Feedback
              </span>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={feedbackData}
                margin={{ top: 15, right: 20, left: -10, bottom: 25 }}
                barGap={6}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e9d5ff" />
                <XAxis
                  dataKey="parameter"
                  tick={{ fill: '#4b5563', fontSize: 11, fontWeight: 600 }}
                  interval={0}
                  angle={-12}
                  textAnchor="end"
                />
                <YAxis
                  domain={[70, 100]}
                  tick={{ fill: '#6b7280', fontSize: 11 }}
                  unit="%"
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="student"
                  name="Student Feedback"
                  fill="#7047eb"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={32}
                />
                <Bar
                  dataKey="parents"
                  name="Parents Feedback"
                  fill="#10b981"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={32}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Key Takeaways & Recommendations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-[#fcfbff] border border-purple-100 rounded-xl p-3.5 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs font-bold text-gray-900">Highest Rated: Teaching & Mentorship (96%)</h5>
              <p className="text-[11px] text-gray-600 mt-0.5">
                Clinical faculty bed-side rounds and interactive problem-based learning received top marks from both MBBS and Pharmacy students.
              </p>
            </div>
          </div>

          <div className="bg-[#fcfbff] border border-purple-100 rounded-xl p-3.5 flex items-start gap-3">
            <TrendingUp className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs font-bold text-gray-900">Highest Parent Priority: Campus Safety (94%)</h5>
              <p className="text-[11px] text-gray-600 mt-0.5">
                Parents expressed highest trust in campus biometric hostel security, clinical safety protocols, and direct digital ERP communication.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
