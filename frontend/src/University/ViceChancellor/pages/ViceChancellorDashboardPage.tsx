import React from 'react';
import {
  GraduationCap,
  Users,
  Building2,
  BookOpen,
  Calendar,
  FileCheck,
  FileText,
  UserCheck,
  Handshake,
  FlaskConical,
  ArrowRight,
  Send,
  Stamp,
  Landmark,
  Coins,
  CheckSquare,
  FileSpreadsheet,
  TrendingUp,
  Target
} from 'lucide-react';
import {
  ViceChancellorOverviewData,
  ViceChancellorProposalItem,
} from '../services/vicechancellorApi';

interface VcDashboardPageProps {
  overview: ViceChancellorOverviewData;
  academicYear: string;
  onAcademicYearChange: (year: string) => void;
  onNavigate: (pageId: string) => void;
  onSelectCategory: (category: string) => void;
  onOpenProposalModal?: (proposal: ViceChancellorProposalItem) => void;
}

export const ViceChancellorDashboardPage: React.FC<VcDashboardPageProps> = ({
  overview,
  academicYear,
  onAcademicYearChange,
  onNavigate,
  onSelectCategory,
}) => {
  // SVG Donut chart calculation
  const totalStudents = overview.totalStudents || 24560;
  const ugPct = overview.studentDistribution?.ug || 55;
  const pgPct = overview.studentDistribution?.pg || 32;
  const phdPct = overview.studentDistribution?.phd || 8;
  const otherPct = overview.studentDistribution?.others || 5;

  const circ = 2 * Math.PI * 70;
  const ugDash = (ugPct / 100) * circ;
  const pgDash = (pgPct / 100) * circ;
  const phdDash = (phdPct / 100) * circ;
  const otherDash = (otherPct / 100) * circ;

  const ugOffset = 0;
  const pgOffset = -ugDash;
  const phdOffset = -(ugDash + pgDash);
  const otherOffset = -(ugDash + pgDash + phdDash);

  const finance = overview.financeOverview || {
    fiscalYear: 'FY 2026–27',
    annualBudget: '₹ 520.00 Cr',
    expenditureYtd: '₹ 286.40 Cr (55.1%)',
    committed: '₹ 112.30 Cr (21.6%)',
    balance: '₹ 121.30 Cr (23.3%)',
  };

  return (
    <div className="space-y-5 select-none font-sans">
      {/* 1. Welcome Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>Welcome, Vice Chancellor</span>
            <span>👏</span>
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-0.5">
            {overview.motto || 'Oversee • Lead • Approve • Monitor • Develop'}
          </p>
        </div>

        {/* Academic Year Selection */}
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3.5 py-1.5 rounded-xl shadow-2xs self-start md:self-auto">
          <Calendar className="w-4 h-4 text-purple-700 shrink-0" />
          <span className="text-xs font-bold text-slate-600">Academic Year:</span>
          <select
            value={academicYear}
            onChange={(e) => onAcademicYearChange(e.target.value)}
            className="text-xs font-extrabold text-slate-900 bg-transparent border-none focus:outline-hidden cursor-pointer"
          >
            <option value="2026 – 2027">2026 – 2027</option>
            <option value="2025 – 2026">2025 – 2026</option>
            <option value="2024 – 2025">2024 – 2025</option>
          </select>
        </div>
      </div>

      {/* 2. Grid of 8 KPI Summary Cards matching Mockup */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* KPI 1: Total Students */}
        <div
          onClick={() => onNavigate('academic-affairs')}
          className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/80 shadow-xs hover:border-purple-300 hover:shadow-sm transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-slate-500">Total Students</div>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-base sm:text-lg font-black text-slate-900">
                  {overview.totalStudents?.toLocaleString() || '24,560'}
                </span>
                <span className="text-[10px] font-extrabold text-emerald-600">
                  {overview.totalStudentsGrowth || '↑ 6.2%'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* KPI 2: Total Faculty */}
        <div
          onClick={() => onNavigate('human-resources')}
          className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/80 shadow-xs hover:border-cyan-300 hover:shadow-sm transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-100 text-cyan-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Users className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-slate-500">Total Faculty</div>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-base sm:text-lg font-black text-slate-900">
                  {overview.totalFaculty?.toLocaleString() || '1,820'}
                </span>
                <span className="text-[10px] font-extrabold text-emerald-600">
                  {overview.totalFacultyGrowth || '↑ 3.8%'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* KPI 3: Total Departments */}
        <div
          onClick={() => onNavigate('academic-affairs')}
          className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/80 shadow-xs hover:border-amber-300 hover:shadow-sm transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Building2 className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-slate-500">Total Departments</div>
              <div className="text-base sm:text-lg font-black text-slate-900 mt-0.5">
                {overview.departments || 52}
              </div>
            </div>
          </div>
        </div>

        {/* KPI 4: Programs */}
        <div
          onClick={() => onNavigate('academic-affairs')}
          className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/80 shadow-xs hover:border-purple-300 hover:shadow-sm transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-slate-500">Programs</div>
              <div className="text-base sm:text-lg font-black text-slate-900 mt-0.5">
                {overview.academicPrograms || 320}
              </div>
              <div className="text-[9px] font-bold text-slate-400">
                {overview.academicProgramsBreakdown || '(UG 198 | PG 92 | PhD 30)'}
              </div>
            </div>
          </div>
        </div>

        {/* KPI 5: Affiliated Colleges */}
        <div
          onClick={() => onNavigate('college-affiliation')}
          className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/80 shadow-xs hover:border-pink-300 hover:shadow-sm transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-pink-100 text-pink-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Landmark className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-slate-500">Affiliated Colleges</div>
              <div className="text-base sm:text-lg font-black text-slate-900 mt-0.5">
                {overview.affiliatedColleges || 186}
              </div>
            </div>
          </div>
        </div>

        {/* KPI 6: Research Projects */}
        <div
          onClick={() => onNavigate('research-innovation')}
          className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/80 shadow-xs hover:border-purple-300 hover:shadow-sm transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <FlaskConical className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-slate-500">Research Projects</div>
              <div className="text-base sm:text-lg font-black text-slate-900 mt-0.5">
                {overview.researchProjects || 420}
              </div>
              <div className="text-[9px] font-bold text-slate-400">
                {overview.researchFunding || '(₹ 86.4 Cr)'}
              </div>
            </div>
          </div>
        </div>

        {/* KPI 7: Active MoUs */}
        <div
          onClick={() => onNavigate('research-innovation')}
          className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/80 shadow-xs hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Handshake className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-slate-500">Active MoUs</div>
              <div className="text-base sm:text-lg font-black text-slate-900 mt-0.5">
                {overview.activeMous || 68}
              </div>
              <div className="text-[9px] font-bold text-slate-400">
                {overview.mousBreakdown || '(National 42 | International 26)'}
              </div>
            </div>
          </div>
        </div>

        {/* KPI 8: Pending Approvals */}
        <div
          onClick={() => onNavigate('approvals-workflow')}
          className="bg-white p-3.5 sm:p-4 rounded-2xl border border-rose-200 shadow-xs hover:border-rose-400 hover:shadow-sm transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <CheckSquare className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-slate-500">Pending Approvals</div>
              <div className="text-base sm:text-lg font-black text-rose-600 mt-0.5">
                {overview.pendingApprovalsCount || 37}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Second Row: University Academic Overview & Finance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: University Academic Overview (SVG Donut) */}
        <div className="lg:col-span-6 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h2 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight">
              University Academic Overview
            </h2>
            <button
              onClick={() => onNavigate('academic-affairs')}
              className="text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1 cursor-pointer"
            >
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="py-3 flex flex-col sm:flex-row items-center justify-center gap-8">
            <div className="relative w-40 h-40 shrink-0">
              <svg viewBox="0 0 180 180" className="w-full h-full -rotate-90">
                <circle
                  cx="90"
                  cy="90"
                  r="70"
                  fill="transparent"
                  stroke="#3b82f6"
                  strokeWidth="24"
                  strokeDasharray={`${ugDash} ${circ - ugDash}`}
                  strokeDashoffset={ugOffset}
                  className="transition-all duration-500"
                />
                <circle
                  cx="90"
                  cy="90"
                  r="70"
                  fill="transparent"
                  stroke="#a855f7"
                  strokeWidth="24"
                  strokeDasharray={`${pgDash} ${circ - pgDash}`}
                  strokeDashoffset={pgOffset}
                  className="transition-all duration-500"
                />
                <circle
                  cx="90"
                  cy="90"
                  r="70"
                  fill="transparent"
                  stroke="#ec4899"
                  strokeWidth="24"
                  strokeDasharray={`${phdDash} ${circ - phdDash}`}
                  strokeDashoffset={phdOffset}
                  className="transition-all duration-500"
                />
                <circle
                  cx="90"
                  cy="90"
                  r="70"
                  fill="transparent"
                  stroke="#eab308"
                  strokeWidth="24"
                  strokeDasharray={`${otherDash} ${circ - otherDash}`}
                  strokeDashoffset={otherOffset}
                  className="transition-all duration-500"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                <span className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
                  {totalStudents.toLocaleString()}
                </span>
                <span className="text-[11px] font-bold text-slate-500">Students</span>
              </div>
            </div>

            {/* Legend */}
            <div className="space-y-2 text-xs font-bold text-slate-700">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#3b82f6]" />
                <span>UG – {ugPct}%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#a855f7]" />
                <span>PG – {pgPct}%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ec4899]" />
                <span>PhD – {phdPct}%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#eab308]" />
                <span>Others – {otherPct}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Finance Overview (FY 2026–27) */}
        <div className="lg:col-span-6 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h2 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <Coins className="w-4 h-4 text-purple-700" />
              <span>Finance Overview ({finance.fiscalYear})</span>
            </h2>
            <button
              onClick={() => onNavigate('finance-budget')}
              className="text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1 cursor-pointer"
            >
              <span>Full Ledger</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="py-2 space-y-2.5">
            {/* Annual Budget */}
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xs">
                  ₹
                </div>
                <span className="text-xs font-bold text-slate-700">Annual Budget</span>
              </div>
              <span className="text-sm font-black text-slate-900">{finance.annualBudget}</span>
            </div>

            {/* Expenditure (YTD) */}
            <div className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
                  <FileSpreadsheet className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-700">Expenditure (YTD)</span>
              </div>
              <span className="text-sm font-black text-amber-900">{finance.expenditureYtd}</span>
            </div>

            {/* Committed */}
            <div className="p-2.5 rounded-xl bg-purple-50/60 border border-purple-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center font-bold text-xs">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-700">Committed</span>
              </div>
              <span className="text-sm font-black text-purple-900">{finance.committed}</span>
            </div>

            {/* Balance */}
            <div className="p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                  <Target className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-700">Balance</span>
              </div>
              <span className="text-sm font-black text-emerald-900">{finance.balance}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Third Row: Key Approvals & Pending Actions & Upcoming Meetings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Key Approvals & Pending Actions */}
        <div className="lg:col-span-6 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h2 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight">
              Key Approvals &amp; Pending Actions
            </h2>
            <button
              onClick={() => onNavigate('approvals-workflow')}
              className="text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1 cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="py-1 space-y-2">
            {(overview.pendingApprovals?.breakdown || []).map((item, idx) => (
              <div
                key={idx}
                onClick={() => onSelectCategory(item.category)}
                className="p-2.5 rounded-xl hover:bg-purple-50/50 border border-slate-100 hover:border-purple-200 transition-all flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 border border-purple-200 text-purple-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    {item.category.includes('Program') ? (
                      <BookOpen className="w-4 h-4 text-purple-700" />
                    ) : item.category.includes('Affiliation') ? (
                      <Landmark className="w-4 h-4 text-amber-700" />
                    ) : item.category.includes('Recruitment') ? (
                      <UserCheck className="w-4 h-4 text-cyan-700" />
                    ) : item.category.includes('Research') ? (
                      <Handshake className="w-4 h-4 text-blue-700" />
                    ) : item.category.includes('Budget') ? (
                      <Coins className="w-4 h-4 text-emerald-700" />
                    ) : (
                      <FileCheck className="w-4 h-4 text-pink-700" />
                    )}
                  </div>
                  <span className="text-xs font-bold text-slate-800 group-hover:text-purple-900 transition-colors">
                    {item.category}
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-purple-100 text-purple-900">
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Upcoming Meetings */}
        <div className="lg:col-span-6 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h2 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight">
              Upcoming Meetings
            </h2>
            <button
              onClick={() => onNavigate('statutory-meetings')}
              className="text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1 cursor-pointer"
            >
              <span>View Calendar</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="py-1 space-y-2.5">
            {(overview.upcomingMeetings || []).map((m, idx) => (
              <div
                key={m.id || idx}
                className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center shrink-0">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-black text-slate-900">{m.title}</div>
                    <div className="text-[10px] text-slate-500 font-medium">{m.type || 'Statutory Body'}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-extrabold text-purple-950">{m.date}</div>
                  <div className="text-[10px] text-slate-400">{m.time || '11:00 AM'}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Fourth Row: Quick Actions */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <h2 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight mb-3">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* Action 1: Approve Requests */}
          <button
            onClick={() => onNavigate('approvals-workflow')}
            className="p-3 bg-emerald-50/70 hover:bg-emerald-100 border border-emerald-200/80 rounded-xl text-center flex flex-col items-center justify-center group transition-all shadow-2xs cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-200/80 text-emerald-800 flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
              <FileCheck className="w-4 h-4 stroke-[2.2]" />
            </div>
            <span className="text-[11px] font-bold text-slate-800 leading-tight">
              Approve Requests
            </span>
          </button>

          {/* Action 2: Review Proposals */}
          <button
            onClick={() => onNavigate('approvals-workflow')}
            className="p-3 bg-purple-50/70 hover:bg-purple-100 border border-purple-200/80 rounded-xl text-center flex flex-col items-center justify-center group transition-all shadow-2xs cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-purple-200/80 text-purple-800 flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
              <FileText className="w-4 h-4 stroke-[2.2]" />
            </div>
            <span className="text-[11px] font-bold text-slate-800 leading-tight">
              Review Proposals
            </span>
          </button>

          {/* Action 3: View Reports */}
          <button
            onClick={() => onNavigate('reports-analytics')}
            className="p-3 bg-blue-50/70 hover:bg-blue-100 border border-blue-200/80 rounded-xl text-center flex flex-col items-center justify-center group transition-all shadow-2xs cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-200/80 text-blue-800 flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
              <FileSpreadsheet className="w-4 h-4 stroke-[2.2]" />
            </div>
            <span className="text-[11px] font-bold text-slate-800 leading-tight">
              View Reports
            </span>
          </button>

          {/* Action 4: Sign Documents */}
          <button
            onClick={() => onNavigate('approvals-workflow')}
            className="p-3 bg-pink-50/70 hover:bg-pink-100 border border-pink-200/80 rounded-xl text-center flex flex-col items-center justify-center group transition-all shadow-2xs cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-pink-200/80 text-pink-800 flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
              <Stamp className="w-4 h-4 stroke-[2.2]" />
            </div>
            <span className="text-[11px] font-bold text-slate-800 leading-tight">
              Sign Documents
            </span>
          </button>

          {/* Action 5: Schedule Meeting */}
          <button
            onClick={() => onNavigate('statutory-meetings')}
            className="p-3 bg-amber-50/70 hover:bg-amber-100 border border-amber-200/80 rounded-xl text-center flex flex-col items-center justify-center group transition-all shadow-2xs cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-amber-200/80 text-amber-800 flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
              <Calendar className="w-4 h-4 stroke-[2.2]" />
            </div>
            <span className="text-[11px] font-bold text-slate-800 leading-tight">
              Schedule Meeting
            </span>
          </button>

          {/* Action 6: Issue Circular */}
          <button
            onClick={() => onNavigate('communication')}
            className="p-3 bg-cyan-50/70 hover:bg-cyan-100 border border-cyan-200/80 rounded-xl text-center flex flex-col items-center justify-center group transition-all shadow-2xs cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-cyan-200/80 text-cyan-800 flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
              <Send className="w-4 h-4 stroke-[2.2]" />
            </div>
            <span className="text-[11px] font-bold text-slate-800 leading-tight">
              Issue Circular
            </span>
          </button>
        </div>
      </div>

      {/* 6. VC Goal Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-950 rounded-2xl p-4 text-white flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-black tracking-wider uppercase border border-white/10">
            VC Goal
          </div>
          <p className="text-xs sm:text-sm font-semibold text-purple-100 max-w-4xl leading-relaxed">
            {overview.goal ||
              'Ensure academic excellence, research innovation, good governance, financial sustainability, regulatory compliance and holistic development of the university.'}
          </p>
        </div>
        <Landmark className="w-6 h-6 text-purple-300/40 hidden md:block shrink-0" />
      </div>
    </div>
  );
};

export default ViceChancellorDashboardPage;