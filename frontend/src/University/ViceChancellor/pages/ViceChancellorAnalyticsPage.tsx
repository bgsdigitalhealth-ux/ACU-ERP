import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  BarChart3,
  TrendingUp,
  FlaskConical,
  ShieldCheck,
  Building2,
  Users,
  CheckCircle2,
  BookOpen,
  PieChart,
  Lightbulb,
  MapPin,
  Download
} from 'lucide-react';
import {
  vicechancellorApi,
  ViceChancellorAnalyticsData,
} from '../services/vicechancellorApi';

interface VcAnalyticsPageProps {
  academicYear?: string;
  onBackToDashboard: () => void;
}

export const ViceChancellorAnalyticsPage: React.FC<VcAnalyticsPageProps> = ({
  academicYear = '2024 - 2025',
  onBackToDashboard,
}) => {
  const [data, setData] = useState<ViceChancellorAnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'analytics' | 'multicampus'>('analytics');

  useEffect(() => {
    let isMounted = true;
    vicechancellorApi
      .fetchAnalytics(academicYear)
      .then((res) => {
        if (isMounted) {
          setData(res);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Error fetching VC analytics:', err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [academicYear]);

  if (loading || !data) {
    return (
      <div className="flex-1 min-h-[calc(100vh-4rem)] bg-[#f4f6fb] flex items-center justify-center p-8">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-bold text-slate-600">
            Synthesizing institutional intelligence &amp; multi-campus analytics...
          </span>
        </div>
      </div>
    );
  }

  // SVG calculations for Enrollment Growth Trends line chart
  const trends = data.enrollmentTrends || [
    { month: 'Jan', students: 650 },
    { month: 'Feb', students: 950 },
    { month: 'Mar', students: 1300 },
    { month: 'Apr', students: 1650 },
    { month: 'May', students: 2100 },
    { month: 'Jun', students: 2600 },
  ];

  const maxStudents = 2600;
  const chartHeight = 160;
  const chartWidth = 460;
  const points = trends
    .map((t, idx) => {
      const x = 30 + idx * ((chartWidth - 60) / (trends.length - 1));
      const y = chartHeight - (t.students / maxStudents) * (chartHeight - 40);
      return `${x},${y}`;
    })
    .join(' ');

  const areaPoints = `30,${chartHeight} ${points} ${chartWidth - 30},${chartHeight}`;

  // SVG calculations for Faculty Allocation Donut
  const facultyList = data.facultyAllocation || [
    { faculty: 'Arts & Humanities', percentage: 25, color: '#ec4899' },
    { faculty: 'Business', percentage: 15, color: '#eab308' },
    { faculty: 'Computer Science', percentage: 30, color: '#3b82f6' },
    { faculty: 'Engineering', percentage: 20, color: '#8b5cf6' },
    { faculty: 'Science', percentage: 10, color: '#10b981' },
  ];

  const circ = 2 * Math.PI * 65;
  let accumulatedPercent = 0;

  return (
    <div className="flex-1 min-h-[calc(100vh-4rem)] bg-[#f4f6fb] flex flex-col p-4 sm:p-6 lg:p-8 space-y-6">
      {/* 1. Header Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onBackToDashboard}
            className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-300 text-slate-700 hover:text-blue-700 transition-all cursor-pointer shadow-2xs shrink-0 flex items-center gap-1.5 text-xs font-bold"
            title="Return to VC Dashboard"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to VC Dashboard</span>
          </button>

          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-700">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Institutional Intelligence Platform</span>
            </div>
            <h1 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight mt-0.5">
              Reports &amp; Analytics • Multi-Campus &amp; Accreditation Readiness
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Academic Year {academicYear} • Live data stream from 3 campuses, 52 academic departments and NIRF/NAAC dashboards
            </p>
          </div>
        </div>

        {/* Tab Switcher & Export */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center p-1 bg-slate-100 rounded-xl">
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === 'analytics'
                  ? 'bg-white text-blue-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Academic Analytics
            </button>
            <button
              onClick={() => setActiveTab('multicampus')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === 'multicampus'
                  ? 'bg-white text-blue-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Multi-Campus &amp; NAAC
            </button>
          </div>

          <button
            onClick={() => window.print()}
            className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors shadow-2xs cursor-pointer"
            title="Export PDF"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. TAB 1: ACADEMIC ANALYTICS (Mockup Image 2) */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {/* Top Row: Enrollment Growth Trends & Departmental Success Index */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Enrollment Growth Trends */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 flex flex-col justify-between">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  <h2 className="text-sm sm:text-base font-extrabold text-slate-900">
                    Enrollment Growth Trends
                  </h2>
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  +18.4% YTD
                </span>
              </div>

              {/* Chart Canvas */}
              <div className="py-4">
                <svg
                  viewBox={`0 0 ${chartWidth} ${chartHeight + 30}`}
                  className="w-full h-48 overflow-visible"
                >
                  <defs>
                    <linearGradient id="enrollmentGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.01" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal grid lines */}
                  {[650, 1300, 1950, 2600].map((val) => {
                    const y = chartHeight - (val / maxStudents) * (chartHeight - 40);
                    return (
                      <g key={val}>
                        <line
                          x1="30"
                          y1={y}
                          x2={chartWidth - 30}
                          y2={y}
                          stroke="#f1f5f9"
                          strokeDasharray="4 4"
                        />
                        <text
                          x="25"
                          y={y + 4}
                          textAnchor="end"
                          className="text-[10px] fill-slate-400 font-semibold"
                        >
                          {val}
                        </text>
                      </g>
                    );
                  })}

                  {/* Filled area */}
                  <polygon points={areaPoints} fill="url(#enrollmentGrad)" />

                  {/* Trend line */}
                  <polyline
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={points}
                  />

                  {/* Points & Labels */}
                  {trends.map((t, idx) => {
                    const x = 30 + idx * ((chartWidth - 60) / (trends.length - 1));
                    const y = chartHeight - (t.students / maxStudents) * (chartHeight - 40);
                    return (
                      <g key={t.month}>
                        <circle
                          cx={x}
                          cy={y}
                          r="5"
                          fill="#ffffff"
                          stroke="#1e293b"
                          strokeWidth="2.5"
                          className="hover:scale-125 transition-transform"
                        />
                        <text
                          x={x}
                          y={chartHeight + 20}
                          textAnchor="middle"
                          className="text-[11px] font-bold fill-slate-600"
                        >
                          {t.month}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                <span>Base: Jan (650)</span>
                <span>Peak: Jun (2,600 Admissions)</span>
              </div>
            </div>

            {/* Departmental Success Index */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 flex flex-col justify-between">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-purple-600" />
                  <h2 className="text-sm sm:text-base font-extrabold text-slate-900">
                    Departmental Success Index
                  </h2>
                </div>
                <div className="flex items-center gap-3 text-xs font-bold">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded bg-[#1e293b]" />
                    <span className="text-slate-700">Pass Rate</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded bg-[#6366f1]" />
                    <span className="text-slate-700">Placement</span>
                  </div>
                </div>
              </div>

              {/* Bar comparison */}
              <div className="py-4 space-y-4">
                {(data.departmentalSuccessIndex || []).map((dept) => (
                  <div key={dept.department} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                      <span>{dept.department}</span>
                      <span className="text-slate-500">
                        {dept.passRate}% Pass • {dept.placementRate}% Placed
                      </span>
                    </div>
                    <div className="h-4 flex rounded-lg overflow-hidden bg-slate-100 gap-1 p-0.5">
                      <div
                        style={{ width: `${dept.passRate}%` }}
                        className="bg-[#1e293b] rounded-sm transition-all duration-700"
                        title={`Pass Rate: ${dept.passRate}%`}
                      />
                      <div
                        style={{ width: `${dept.placementRate}%` }}
                        className="bg-[#6366f1] rounded-sm transition-all duration-700"
                        title={`Placement Rate: ${dept.placementRate}%`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between font-medium">
                <span>Top Performer: Science (SCI)</span>
                <span>Benchmark: UGC Standard (75%)</span>
              </div>
            </div>
          </div>

          {/* Bottom Row: Faculty Allocation & Strategic Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Faculty Allocation Donut */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 flex flex-col justify-between">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <PieChart className="w-4 h-4 text-pink-600" />
                  <h2 className="text-sm sm:text-base font-extrabold text-slate-900">
                    Faculty Allocation
                  </h2>
                </div>
                <span className="text-xs font-bold text-slate-500">1,820 Active Faculty</span>
              </div>

              <div className="py-4 flex flex-col sm:flex-row items-center justify-center gap-8">
                {/* SVG Donut */}
                <div className="relative w-44 h-44 shrink-0">
                  <svg viewBox="0 0 160 160" className="w-full h-full -rotate-90">
                    {facultyList.map((f, i) => {
                      const strokeDasharray = `${(f.percentage / 100) * circ} ${circ}`;
                      const strokeDashoffset = -((accumulatedPercent / 100) * circ);
                      accumulatedPercent += f.percentage;
                      return (
                        <circle
                          key={i}
                          cx="80"
                          cy="80"
                          r="65"
                          fill="transparent"
                          stroke={f.color || '#3b82f6'}
                          strokeWidth="24"
                          strokeDasharray={strokeDasharray}
                          strokeDashoffset={strokeDashoffset}
                          className="transition-all duration-500"
                        />
                      );
                    })}
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-base font-black text-slate-900">100%</span>
                    <span className="text-[10px] font-bold text-slate-400">Allocated</span>
                  </div>
                </div>

                {/* Legend */}
                <div className="space-y-2 text-xs font-bold text-slate-700">
                  {facultyList.map((f, idx) => (
                    <div key={idx} className="flex items-center gap-2.5">
                      <span
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ backgroundColor: f.color || '#3b82f6' }}
                      />
                      <span>
                        {f.faculty} – {f.percentage}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 text-xs text-slate-500 font-medium">
                Cadre compliance according to AICTE &amp; UGC teacher-student ratios.
              </div>
            </div>

            {/* Strategic Insights */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 flex flex-col justify-between">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  <h2 className="text-sm sm:text-base font-extrabold text-slate-900">
                    Strategic Insights
                  </h2>
                </div>
                <span className="text-xs font-bold text-blue-600">AI Institutional Analytics</span>
              </div>

              <div className="py-2 space-y-3">
                {(data.strategicInsights || []).map((ins, idx) => (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-xl border text-xs space-y-1 ${
                      ins.type === 'growth'
                        ? 'bg-blue-50/60 border-blue-200 text-blue-950'
                        : ins.type === 'resource'
                        ? 'bg-purple-50/60 border-purple-200 text-purple-950'
                        : 'bg-amber-50/60 border-amber-200 text-amber-950'
                    }`}
                  >
                    <div className="font-black text-slate-900 flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          ins.type === 'growth'
                            ? 'bg-blue-600'
                            : ins.type === 'resource'
                            ? 'bg-purple-600'
                            : 'bg-amber-600'
                        }`}
                      />
                      <span>{ins.title}</span>
                    </div>
                    <p className="text-slate-600 font-medium leading-relaxed">{ins.description}</p>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-100 text-xs text-slate-500 font-medium">
                Updated weekly from automated institutional surveillance metrics.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. TAB 2: MULTI-CAMPUS & ACCREDITATION READINESS (Mockup Image 3) */}
      {activeTab === 'multicampus' && (
        <div className="space-y-6">
          {/* Top Multi-Campus Management Node Canvas */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-6">
            <div className="text-center space-y-1">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold uppercase tracking-wider">
                edumerge University Architecture
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Multi-Campus Management System
              </h2>
              <p className="text-xs text-slate-500 max-w-xl mx-auto">
                Unified governance and centralized ERP administration connecting the University Main Campus, North Campus, and City Campus.
              </p>
            </div>

            {/* Campuses Hub & Nodes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              {(data.multiCampus || []).map((campus, idx) => (
                <div
                  key={campus.name}
                  className={`p-5 rounded-2xl border transition-all text-center flex flex-col justify-between ${
                    idx === 0
                      ? 'border-blue-300 bg-blue-50/40 shadow-sm ring-2 ring-blue-500/20'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 mx-auto rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-600/30">
                      <Building2 className="w-6 h-6 stroke-[2.2]" />
                    </div>
                    <div>
                      <h3 className="text-base font-extrabold text-slate-900">{campus.name}</h3>
                      <div className="text-xs font-medium text-slate-500 flex items-center justify-center gap-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-blue-600" />
                        <span>{campus.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-200/80 grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-2xs">
                      <div className="text-[10px] font-bold text-slate-400">Students</div>
                      <div className="font-black text-slate-900 text-sm mt-0.5">
                        {campus.students.toLocaleString()}
                      </div>
                    </div>
                    <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-2xs">
                      <div className="text-[10px] font-bold text-slate-400">Departments</div>
                      <div className="font-black text-slate-900 text-sm mt-0.5">
                        {campus.departments}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Row: Research & Publications + Accreditation Readiness */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Research & Publications Tracking */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <BookOpen className="w-5 h-5 text-indigo-600" />
                  <h3 className="text-base font-black text-slate-900">
                    Research &amp; Publications Portal
                  </h3>
                </div>
                <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
                  Global Impact
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                {[
                  { label: 'Research Projects', val: '120 Active', icon: FlaskConical },
                  { label: 'Publications Tracking', val: '245 Indexed', icon: BookOpen },
                  { label: 'Faculty Profiles', val: '1,820 Verified', icon: Users },
                  { label: 'Impact & Citation Index', val: 'h-index: 48', icon: TrendingUp },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-3"
                    >
                      <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 stroke-[2.2]" />
                      </div>
                      <div>
                        <div className="text-[11px] font-bold text-slate-500">{item.label}</div>
                        <div className="text-xs sm:text-sm font-black text-slate-900 mt-0.5">
                          {item.val}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <p className="text-xs text-slate-500 font-medium pt-2 leading-relaxed">
                Integrated with Scopus, Web of Science, and Indian Citation Index (ICI) for automated faculty research publication verification.
              </p>
            </div>

            {/* Accreditation Readiness (NAAC, NBA, NIRF - 92%) */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-base font-black text-slate-900">
                    Accreditation Readiness
                  </h3>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  High Compliance
                </span>
              </div>

              <div className="space-y-3.5 py-2">
                {/* NAAC */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-800 font-black text-xs flex items-center justify-center">
                      NAAC
                    </div>
                    <div>
                      <div className="text-xs font-black text-slate-900">NAAC Accreditation</div>
                      <div className="text-[11px] text-slate-500">
                        {data.accreditationReadiness?.naacStatus || 'Prepared (A++)'}
                      </div>
                    </div>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                </div>

                {/* NBA */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-800 font-black text-xs flex items-center justify-center">
                      NBA
                    </div>
                    <div>
                      <div className="text-xs font-black text-slate-900">NBA Tier-1 Compliance</div>
                      <div className="text-[11px] text-slate-500">
                        {data.accreditationReadiness?.nbaStatus || 'Compliant'}
                      </div>
                    </div>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                </div>

                {/* NIRF */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-800 font-black text-xs flex items-center justify-center">
                      NIRF
                    </div>
                    <div>
                      <div className="text-xs font-black text-slate-900">NIRF Rankings Submission</div>
                      <div className="text-[11px] text-slate-500">
                        {data.accreditationReadiness?.nirfStatus || 'Data Ready'}
                      </div>
                    </div>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                </div>
              </div>

              {/* Overall Readiness Bar */}
              <div className="pt-3 border-t border-slate-100 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                  <span>Overall Readiness</span>
                  <span className="text-emerald-700 font-black text-sm">
                    {data.accreditationReadiness?.overallReadinessPercentage || 92}%
                  </span>
                </div>
                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden p-0.5">
                  <div
                    style={{
                      width: `${data.accreditationReadiness?.overallReadinessPercentage || 92}%`,
                    }}
                    className="h-full bg-emerald-500 rounded-full transition-all duration-700"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViceChancellorAnalyticsPage;