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
  Award,
  ArrowRight,
  Send,
  Stamp,
  Landmark
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

  return (
    <div className="space-y-4 sm:space-y-5 select-none text-slate-800">
      
      {/* 1. Welcome Greeting Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#eff6ff] via-white to-[#f0f9ff] rounded-2xl p-4 sm:p-5 border border-blue-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="z-10">
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Welcome, {overview.viceChancellorName || 'Dr. R. Sharma'}
            </h1>
          </div>
          <div className="text-xs font-bold text-blue-700 mt-0.5">
            Vice Chancellor
          </div>
          <p className="text-xs sm:text-[13px] italic font-semibold text-slate-600 mt-1 max-w-2xl">
            &ldquo;{overview.motto || 'Committed to Academic Excellence, Research, Innovation and Holistic Development'}&rdquo;
          </p>
        </div>

        {/* Academic Year Selector & Palace Graphic */}
        <div className="flex items-center gap-3 self-start sm:self-center z-10">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 shadow-2xs">
            <Calendar className="w-3.5 h-3.5 text-blue-600" />
            <span>Academic Year :</span>
            <select
              value={academicYear}
              onChange={(e) => onAcademicYearChange(e.target.value)}
              className="bg-transparent font-black text-blue-900 focus:outline-none cursor-pointer"
            >
              <option value="2024 - 2025">2024 – 2025</option>
              <option value="2025 - 2026">2025 – 2026</option>
              <option value="2026 - 2027">2026 – 2027</option>
            </select>
          </div>
        </div>

        {/* Soft Background Silhouette */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-100/60 pointer-events-none hidden md:block">
          <Landmark className="w-28 h-28 stroke-[0.8]" />
        </div>
      </div>

      {/* 2. Four KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        
        {/* KPI 1: Total Students */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700 shrink-0 shadow-2xs">
            <GraduationCap className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-500">Total Students</div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
              {totalStudents.toLocaleString()}
            </div>
            <div className="text-[11px] font-extrabold text-emerald-600 mt-0.5">
              {overview.totalStudentsGrowth || '↑ 6.2%'}
            </div>
          </div>
        </div>

        {/* KPI 2: Total Faculty */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 shrink-0 shadow-2xs">
            <Users className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-500">Total Faculty</div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
              {(overview.totalFaculty || 1820).toLocaleString()}
            </div>
            <div className="text-[11px] font-extrabold text-emerald-600 mt-0.5">
              {overview.totalFacultyGrowth || '↑ 3.8%'}
            </div>
          </div>
        </div>

        {/* KPI 3: Departments */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0 shadow-2xs">
            <Building2 className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-500">Departments</div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
              {overview.departments || 52}
            </div>
            <div className="text-[11px] font-extrabold text-emerald-600 mt-0.5">
              {overview.departmentsGrowth || '↑ 2.0%'}
            </div>
          </div>
        </div>

        {/* KPI 4: Academic Programs */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-pink-50 border border-pink-200 flex items-center justify-center text-pink-700 shrink-0 shadow-2xs">
            <BookOpen className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-500">Academic Programs</div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
              {overview.academicPrograms || 320}
            </div>
            <div className="text-[11px] font-extrabold text-emerald-600 mt-0.5">
              {overview.academicProgramsGrowth || '↑ 4.5%'}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Row 2: University Overview Donut (Left) + Pending Approvals (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Left: University Overview */}
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
            {/* SVG Donut */}
            <div className="relative w-44 h-44 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 180 180">
                <circle cx="90" cy="90" r="70" fill="transparent" stroke="#f1f5f9" strokeWidth="24" />
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

        {/* Right: Pending Approvals */}
        <div className="lg:col-span-6 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h2 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight">
              Pending Approvals
            </h2>
            <button
              onClick={() => onNavigate('approvals-workflow')}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors cursor-pointer"
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
                className="p-2.5 rounded-xl hover:bg-slate-50 border border-slate-100 hover:border-slate-200 transition-all flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                    {item.category.includes('Program') ? (
                      <BookOpen className="w-4 h-4 text-blue-600" />
                    ) : item.category.includes('Faculty') ? (
                      <UserCheck className="w-4 h-4 text-purple-600" />
                    ) : item.category.includes('Budget') ? (
                      <Building2 className="w-4 h-4 text-amber-600" />
                    ) : item.category.includes('Policy') ? (
                      <FileCheck className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Handshake className="w-4 h-4 text-sky-600" />
                    )}
                  </div>
                  <span className="text-xs sm:text-[13px] font-bold text-slate-800 group-hover:text-blue-900 transition-colors">
                    {item.category}
                  </span>
                </div>

                <div className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-xs font-black group-hover:bg-rose-100 transition-colors">
                  {item.count}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Row 3: Academic Performance + Research & Innovation + Upcoming Meetings */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Card 1: Academic Performance */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h2 className="text-xs sm:text-sm font-extrabold text-slate-900 tracking-tight">
              Academic Performance
            </h2>
            <button
              onClick={() => onNavigate('academic-affairs')}
              className="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
            >
              <span>View Details</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="flex items-center gap-3 text-[10.5px] font-bold text-slate-500 py-1.5 justify-center">
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-blue-600" />
              <span>Current Year</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-purple-500" />
              <span>Previous Year</span>
            </div>
          </div>

          {/* Grouped Bar Chart */}
          <div className="py-2 flex items-end justify-around h-32 border-b border-slate-100 px-2">
            {/* UG */}
            <div className="flex flex-col items-center gap-1 h-full justify-end">
              <div className="flex items-end gap-1.5 h-24">
                <div className="w-5 bg-blue-600 rounded-t-sm flex items-center justify-center text-[9px] text-white font-bold h-[87%]">
                  87
                </div>
                <div className="w-5 bg-purple-400 rounded-t-sm flex items-center justify-center text-[9px] text-white font-bold h-[83%]">
                  83
                </div>
              </div>
              <span className="text-[10px] font-bold text-slate-600">UG Pass %</span>
            </div>

            {/* PG */}
            <div className="flex flex-col items-center gap-1 h-full justify-end">
              <div className="flex items-end gap-1.5 h-24">
                <div className="w-5 bg-blue-600 rounded-t-sm flex items-center justify-center text-[9px] text-white font-bold h-[92%]">
                  92
                </div>
                <div className="w-5 bg-purple-400 rounded-t-sm flex items-center justify-center text-[9px] text-white font-bold h-[88%]">
                  88
                </div>
              </div>
              <span className="text-[10px] font-bold text-slate-600">PG Pass %</span>
            </div>

            {/* PhD */}
            <div className="flex flex-col items-center gap-1 h-full justify-end">
              <div className="flex items-end gap-1.5 h-24">
                <div className="w-5 bg-blue-600 rounded-t-sm flex items-center justify-center text-[9px] text-white font-bold h-[76%]">
                  76
                </div>
                <div className="w-5 bg-purple-400 rounded-t-sm flex items-center justify-center text-[9px] text-white font-bold h-[70%]">
                  70
                </div>
              </div>
              <span className="text-[10px] font-bold text-slate-600">PhD Comp</span>
            </div>
          </div>
        </div>

        {/* Card 2: Research & Innovation Overview */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h2 className="text-xs sm:text-sm font-extrabold text-slate-900 tracking-tight">
              Research &amp; Innovation
            </h2>
            <button
              onClick={() => onNavigate('research-innovation')}
              className="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="py-1 space-y-2.5">
            <div className="flex items-center justify-between p-2 rounded-xl bg-purple-50/60 border border-purple-100">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <FlaskConical className="w-4 h-4 text-purple-600" />
                <span>Active Research Projects</span>
              </div>
              <span className="text-xs font-black text-purple-950">
                {overview.researchInnovation?.activeProjects || 120}
              </span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-xl bg-blue-50/60 border border-blue-100">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <Award className="w-4 h-4 text-blue-600" />
                <span>Grants Received</span>
              </div>
              <span className="text-xs font-black text-blue-950">
                {overview.researchInnovation?.grantsReceived || 48}
              </span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-xl bg-cyan-50/60 border border-cyan-100">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <Handshake className="w-4 h-4 text-cyan-600" />
                <span>MoUs / Collaborations</span>
              </div>
              <span className="text-xs font-black text-cyan-950">
                {overview.researchInnovation?.mousCollaborations || 36}
              </span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <FileText className="w-4 h-4 text-slate-600" />
                <span>Publications (Last 1 Year)</span>
              </div>
              <span className="text-xs font-black text-slate-950">
                {overview.researchInnovation?.publicationsLastYear || 245}
              </span>
            </div>
          </div>
        </div>

        {/* Card 3: Upcoming Meetings */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h2 className="text-xs sm:text-sm font-extrabold text-slate-900 tracking-tight">
              Upcoming Meetings
            </h2>
            <button
              onClick={() => onNavigate('statutory-meetings')}
              className="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
            >
              <span>View Calendar</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="py-1 space-y-2.5">
            {(overview.upcomingMeetings || []).slice(0, 3).map((m, idx) => (
              <div
                key={m.id || idx}
                onClick={() => onNavigate('statutory-meetings')}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50/60 border border-slate-200/70 transition-all flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                    <Calendar className="w-3.5 h-3.5 stroke-[2.2]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 line-clamp-1 group-hover:text-blue-900">
                      {m.title}
                    </div>
                    <div className="text-[10px] text-slate-500">{m.venue || 'Council Hall'}</div>
                  </div>
                </div>
                <div className="text-[11px] font-black text-blue-700 whitespace-nowrap">
                  {m.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Row 4: Quick Actions (Left) + Notifications & Alerts (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Left: Quick Actions */}
        <div className="lg:col-span-7 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="pb-2 border-b border-slate-100">
            <h2 className="text-xs sm:text-sm font-extrabold text-slate-900 tracking-tight">
              Quick Actions
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 py-2">
            {/* 1. Approve Proposals */}
            <button
              onClick={() => onNavigate('approvals-workflow')}
              className="p-3 bg-purple-50/70 hover:bg-purple-100 border border-purple-200/80 rounded-xl text-center flex flex-col items-center justify-center group transition-all shadow-2xs cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-purple-200/80 text-purple-800 flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
                <FileCheck className="w-4 h-4 stroke-[2.2]" />
              </div>
              <span className="text-[11px] font-bold text-slate-800 leading-tight">
                Approve Proposals
              </span>
            </button>

            {/* 2. View Reports */}
            <button
              onClick={() => onNavigate('reports-analytics')}
              className="p-3 bg-blue-50/70 hover:bg-blue-100 border border-blue-200/80 rounded-xl text-center flex flex-col items-center justify-center group transition-all shadow-2xs cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-200/80 text-blue-800 flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
                <FileText className="w-4 h-4 stroke-[2.2]" />
              </div>
              <span className="text-[11px] font-bold text-slate-800 leading-tight">
                View Reports
              </span>
            </button>

            {/* 3. Sign Documents */}
            <button
              onClick={() => onNavigate('approvals-workflow')}
              className="p-3 bg-emerald-50/70 hover:bg-emerald-100 border border-emerald-200/80 rounded-xl text-center flex flex-col items-center justify-center group transition-all shadow-2xs cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-200/80 text-emerald-800 flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
                <Stamp className="w-4 h-4 stroke-[2.2]" />
              </div>
              <span className="text-[11px] font-bold text-slate-800 leading-tight">
                Sign Documents
              </span>
            </button>

            {/* 4. Meeting Management */}
            <button
              onClick={() => onNavigate('statutory-meetings')}
              className="p-3 bg-amber-50/70 hover:bg-amber-100 border border-amber-200/80 rounded-xl text-center flex flex-col items-center justify-center group transition-all shadow-2xs cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-amber-200/80 text-amber-800 flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
                <Calendar className="w-4 h-4 stroke-[2.2]" />
              </div>
              <span className="text-[11px] font-bold text-slate-800 leading-tight">
                Meeting Management
              </span>
            </button>

            {/* 5. Send Notification */}
            <button
              onClick={() => onNavigate('communication')}
              className="p-3 bg-cyan-50/70 hover:bg-cyan-100 border border-cyan-200/80 rounded-xl text-center flex flex-col items-center justify-center group transition-all shadow-2xs cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-cyan-200/80 text-cyan-800 flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
                <Send className="w-4 h-4 stroke-[2.2]" />
              </div>
              <span className="text-[11px] font-bold text-slate-800 leading-tight">
                Send Notification
              </span>
            </button>
          </div>
        </div>

        {/* Right: Notifications & Alerts */}
        <div className="lg:col-span-5 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h2 className="text-xs sm:text-sm font-extrabold text-slate-900 tracking-tight">
              Notifications &amp; Alerts
            </h2>
            <button
              onClick={() => onNavigate('communication')}
              className="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="py-1 space-y-2">
            {(overview.notifications || []).slice(0, 3).map((n, idx) => (
              <div
                key={n.id || idx}
                className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3 text-xs"
              >
                <div
                  className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                    idx === 0 ? 'bg-amber-500' : idx === 1 ? 'bg-blue-500' : 'bg-emerald-500'
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-slate-900 truncate">{n.message}</div>
                  <div className="text-[10px] text-slate-500">{n.timeAgo}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

export default ViceChancellorDashboardPage;
