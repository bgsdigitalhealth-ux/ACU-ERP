import React from 'react';
import {
  GraduationCap,
  Users,
  Building2,
  FileText,
  Calendar,
  FlaskConical,
  Trophy,
  ArrowRight,
  Settings,
  Coins,
  Handshake,
  User,
  Target,
  Landmark
} from 'lucide-react';
import {
  ChancellorOverviewData,
  ChancellorProposalItem,
} from '../services/chancellorApi';

interface ChancellorDashboardPageProps {
  overview: ChancellorOverviewData;
  academicYear: string;
  onAcademicYearChange: (year: string) => void;
  onNavigate: (pageId: string) => void;
  onSelectProposalCategory: (category: string) => void;
  onOpenProposalModal?: (proposal: ChancellorProposalItem) => void;
  proposals?: ChancellorProposalItem[];
}

export const ChancellorDashboardPage: React.FC<ChancellorDashboardPageProps> = ({
  overview,
  academicYear,
  onAcademicYearChange,
  onNavigate,
  onSelectProposalCategory,
}) => {
  // SVG Donut calculation for University Overview
  const totalStudents = overview.totalStudents || 24560;
  const ugPct = overview.studentDistribution?.ug || 55;
  const pgPct = overview.studentDistribution?.pg || 32;
  const phdPct = overview.studentDistribution?.phd || 8;
  const otherPct = overview.studentDistribution?.others || 5;

  // Circumference for r=70: 2 * PI * 70 = 439.82
  const circ = 2 * Math.PI * 70;
  const ugDash = (ugPct / 100) * circ;
  const pgDash = (pgPct / 100) * circ;
  const phdDash = (phdPct / 100) * circ;
  const otherDash = (otherPct / 100) * circ;

  const ugOffset = 0;
  const pgOffset = -ugDash;
  const phdOffset = -(ugDash + pgDash);
  const otherOffset = -(ugDash + pgDash + phdDash);

  const getActionIcon = (iconType: string) => {
    switch (iconType) {
      case 'document':
        return <FileText className="w-4 h-4 text-purple-600" />;
      case 'gear':
        return <Settings className="w-4 h-4 text-blue-600" />;
      case 'coins':
        return <Coins className="w-4 h-4 text-amber-600" />;
      case 'handshake':
        return <Handshake className="w-4 h-4 text-sky-600" />;
      case 'user':
      default:
        return <User className="w-4 h-4 text-indigo-600" />;
    }
  };

  const getActionBg = (iconType: string) => {
    switch (iconType) {
      case 'document':
        return 'bg-purple-50 border-purple-200';
      case 'gear':
        return 'bg-blue-50 border-blue-200';
      case 'coins':
        return 'bg-amber-50 border-amber-200';
      case 'handshake':
        return 'bg-sky-50 border-sky-200';
      case 'user':
      default:
        return 'bg-indigo-50 border-indigo-200';
    }
  };

  return (
    <div className="space-y-4 sm:space-y-5 select-none text-slate-800">
      
      {/* 1. Welcome Greeting Banner & Academic Year Dropdown */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Welcome, Chancellor
            </h1>
            <span className="text-xl">👏</span>
          </div>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-0.5">
            University Governance &amp; Strategic Oversight
          </p>
        </div>

        {/* Academic Year Selector */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          <div className="relative">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-100 transition-colors">
              <Calendar className="w-3.5 h-3.5 text-indigo-600" />
              <span>Academic Year :</span>
              <select
                value={academicYear}
                onChange={(e) => onAcademicYearChange(e.target.value)}
                className="bg-transparent font-extrabold text-indigo-900 focus:outline-none cursor-pointer"
              >
                <option value="2026 - 2027">2026 – 2027</option>
                <option value="2025 - 2026">2025 – 2026</option>
                <option value="2027 - 2028">2027 – 2028</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Four KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        
        {/* KPI 1: Total Students */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700 shrink-0 shadow-2xs">
            <GraduationCap className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-500">Total Students</div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
              {totalStudents.toLocaleString()}
            </div>
            <div className="text-[11px] font-extrabold text-emerald-600 flex items-center gap-0.5 mt-0.5">
              <span>↑</span>
              <span>{overview.totalStudentsGrowth || '+6.2%'}</span>
            </div>
          </div>
        </div>

        {/* KPI 2: Total Faculty */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 shrink-0 shadow-2xs">
            <Users className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-500">Total Faculty</div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
              {(overview.totalFaculty || 1820).toLocaleString()}
            </div>
            <div className="text-[11px] font-extrabold text-emerald-600 flex items-center gap-0.5 mt-0.5">
              <span>↑</span>
              <span>{overview.totalFacultyGrowth || '+3.8%'}</span>
            </div>
          </div>
        </div>

        {/* KPI 3: Departments */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0 shadow-2xs">
            <Building2 className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-500">Departments</div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
              {overview.departments || 52}
            </div>
            <div className="text-[11px] font-semibold text-slate-400 mt-0.5">
              Across 12 Faculties
            </div>
          </div>
        </div>

        {/* KPI 4: Active Programs */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700 shrink-0 shadow-2xs">
            <FileText className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-500">Active Programs</div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
              {overview.activePrograms || 320}
            </div>
            <div className="text-[11px] font-semibold text-slate-400 mt-0.5">
              UG, PG, Super-Specialty
            </div>
          </div>
        </div>
      </div>

      {/* 3. Middle Row: University Overview (Left) + Key Approvals & Pending Actions (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Left: University Overview (Donut Chart) */}
        <div className="lg:col-span-6 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h2 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight">
              University Overview
            </h2>
            <span className="text-[11px] font-semibold text-slate-500">
              Student Demographics
            </span>
          </div>

          <div className="py-4 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
            {/* SVG Donut Chart with central 24,560 count */}
            <div className="relative w-44 h-44 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 180 180">
                {/* Background track */}
                <circle
                  cx="90"
                  cy="90"
                  r="70"
                  fill="transparent"
                  stroke="#f1f5f9"
                  strokeWidth="24"
                />
                {/* UG: 55% */}
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
                {/* PG: 32% */}
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
                {/* PhD: 8% */}
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
                {/* Others: 5% */}
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

              {/* Central Text inside Donut */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                <span className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
                  {totalStudents.toLocaleString()}
                </span>
                <span className="text-[11px] font-bold text-slate-500">
                  Students
                </span>
              </div>
            </div>

            {/* Donut Legend */}
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

        {/* Right: Key Approvals & Pending Actions */}
        <div className="lg:col-span-6 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h2 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight">
              Key Approvals &amp; Pending Actions
            </h2>
            <button
              onClick={() => onNavigate('approvals-all')}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Action List items */}
          <div className="py-2 space-y-2">
            {(overview.pendingActions?.breakdown || []).map((action, idx) => (
              <div
                key={idx}
                onClick={() => onSelectProposalCategory(action.category)}
                className="p-2.5 rounded-xl hover:bg-slate-50 border border-slate-100 hover:border-slate-200 transition-all flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform ${getActionBg(
                      action.iconType
                    )}`}
                  >
                    {getActionIcon(action.iconType)}
                  </div>
                  <span className="text-xs sm:text-[13px] font-bold text-slate-800 group-hover:text-blue-900 transition-colors">
                    {action.category}
                  </span>
                </div>

                {/* Badge Count */}
                <div className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-xs font-black group-hover:bg-rose-100 transition-colors">
                  {action.count}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Next Row: Academic & Research Highlights (Left) + Meetings & Governance (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Left: Academic & Research Highlights */}
        <div className="lg:col-span-6 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="pb-2 border-b border-slate-100">
            <h2 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight">
              Academic &amp; Research Highlights
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-3 py-3">
            {/* Stat 1: NAAC Grade */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-center flex flex-col items-center justify-center">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center mb-1 shadow-2xs">
                <GraduationCap className="w-4 h-4 stroke-[2.2]" />
              </div>
              <div className="text-[11px] font-bold text-slate-500">NAAC Grade</div>
              <div className="text-lg sm:text-xl font-black text-blue-950 mt-0.5">
                {overview.academicResearchHighlights?.naacGrade || 'A++'}
              </div>
            </div>

            {/* Stat 2: Research Projects */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-center flex flex-col items-center justify-center">
              <div className="w-8 h-8 rounded-lg bg-cyan-100 text-cyan-700 flex items-center justify-center mb-1 shadow-2xs">
                <FlaskConical className="w-4 h-4 stroke-[2.2]" />
              </div>
              <div className="text-[11px] font-bold text-slate-500">Research Projects</div>
              <div className="text-lg sm:text-xl font-black text-cyan-950 mt-0.5">
                {overview.academicResearchHighlights?.researchProjects || 420}
              </div>
            </div>

            {/* Stat 3: Active MoUs */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-center flex flex-col items-center justify-center">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center mb-1 shadow-2xs">
                <Trophy className="w-4 h-4 stroke-[2.2]" />
              </div>
              <div className="text-[11px] font-bold text-slate-500">Active MoUs</div>
              <div className="text-lg sm:text-xl font-black text-amber-950 mt-0.5">
                {overview.academicResearchHighlights?.activeMoUs || 68}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Meetings & Governance */}
        <div className="lg:col-span-6 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h2 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight">
              Meetings &amp; Governance
            </h2>
            <button
              onClick={() => onNavigate('statutory-meetings')}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>View Calendar</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 3 Upcoming Meetings */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 py-3">
            {(overview.upcomingMeetings || []).slice(0, 3).map((meeting, idx) => (
              <div
                key={meeting.id || idx}
                onClick={() => onNavigate('statutory-meetings')}
                className="p-3 bg-slate-50 hover:bg-indigo-50/50 rounded-xl border border-slate-200/70 hover:border-indigo-200 transition-all text-center flex flex-col items-center justify-center group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center mb-1 shadow-2xs group-hover:scale-105 transition-transform">
                  <Calendar className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div className="text-xs font-bold text-slate-900 line-clamp-1 group-hover:text-indigo-900">
                  {meeting.title}
                </div>
                <div className="text-[11px] font-extrabold text-indigo-700 mt-1">
                  {meeting.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Bottom Goal Banner with Soft University Graphic */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#eef2ff] via-[#f8fafc] to-[#e0e7ff] rounded-2xl p-4 sm:p-5 border border-indigo-200/80 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-4 z-10">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-[#1e1b4b] to-[#3b82f6] text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20">
            <Target className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-black text-indigo-950 uppercase tracking-wide">
              Goal
            </div>
            <div className="text-xs sm:text-[13px] font-semibold text-slate-700 mt-0.5 max-w-3xl leading-relaxed">
              {overview.goal ||
                'Ensure academic excellence, good governance, financial sustainability, regulatory compliance, and long-term growth of the university.'}
            </div>
          </div>
        </div>

        {/* Soft University Building Silhouette on right */}
        <div className="hidden md:flex items-center text-indigo-300/60 pointer-events-none pr-4">
          <Landmark className="w-16 h-16 stroke-[1.2]" />
        </div>
      </div>
    </div>
  );
};

export default ChancellorDashboardPage;
