import React, { useState } from 'react';
import {
  Filter,
  User,
  GraduationCap,
  Calendar,
  Clock,
  TrendingUp,
  FileCheck2,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { useStudent } from '../../../context/StudentContext';
import { PROGRAM_OUTCOMES_LIST } from '../../../data/studentMockData';

export const StudentHomeDashboard: React.FC = () => {
  const { profile, courses, navigate, feeYearRecords } = useStudent();
  const [activeTab, setActiveTab] = useState<'courses' | 'overview'>('courses');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSemFilter, setSelectedSemFilter] = useState('All');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState('All');

  const filteredCourses = courses.filter((c) => {
    if (selectedSemFilter !== 'All' && c.semester !== selectedSemFilter) return false;
    if (selectedTypeFilter !== 'All' && c.type !== selectedTypeFilter) return false;
    return true;
  });

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Breadcrumb matching Page 1 */}
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        HOME
      </div>

      {/* Top Tabs: "My Courses" | "Dashboard / Overview" */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('courses')}
          className={`py-2.5 px-6 sm:px-8 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === 'courses'
              ? 'border-[#7047eb] text-[#7047eb] bg-purple-50/30'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          My Courses
        </button>
        <button
          onClick={() => setActiveTab('overview')}
          className={`py-2.5 px-6 sm:px-8 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === 'overview'
              ? 'border-[#7047eb] text-[#7047eb] bg-purple-50/30'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Dashboard / Overview
        </button>
      </div>

      {/* Subtitle Information Bar */}
      <div className="bg-white rounded-xl p-3 sm:p-4 border border-gray-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="text-xs sm:text-sm font-bold text-gray-800">
          <span>Program: </span>
          <span className="text-[#7047eb]">{profile.program}</span>
          <span className="text-gray-400 mx-2">|</span>
          <span>Batch/Section: </span>
          <span className="text-gray-900">{profile.batchSection}</span>
          <span className="text-gray-400 mx-2">|</span>
          <span>Current Semester: </span>
          <span className="text-purple-700 font-extrabold">{profile.currentSemester}</span>
        </div>

        {activeTab === 'courses' && (
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-300 hover:border-[#7047eb] text-xs font-semibold text-gray-700 hover:text-[#7047eb] bg-gray-50 transition-colors self-start md:self-auto cursor-pointer"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
          </button>
        )}
      </div>

      {/* Collapsible Filters */}
      {showFilters && activeTab === 'courses' && (
        <div className="bg-gray-50 rounded-xl p-3 sm:p-4 border border-gray-200 grid grid-cols-1 sm:grid-cols-3 gap-3 animate-in fade-in duration-150">
          <div>
            <label className="block text-[11px] font-bold text-gray-600 mb-1">Semester</label>
            <select
              value={selectedSemFilter}
              onChange={(e) => setSelectedSemFilter(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-md px-2.5 py-1.5 text-xs text-gray-800 outline-hidden focus:border-[#7047eb]"
            >
              <option value="All">All Semesters</option>
              <option value="S4">Semester 4 (S4)</option>
              <option value="S3">Semester 3 (S3)</option>
              <option value="S2">Semester 2 (S2)</option>
              <option value="S1">Semester 1 (S1)</option>
            </select>
          </div>
          <div>
            <label className="block text-[11px] font-bold text-gray-600 mb-1">Course Type</label>
            <select
              value={selectedTypeFilter}
              onChange={(e) => setSelectedTypeFilter(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-md px-2.5 py-1.5 text-xs text-gray-800 outline-hidden focus:border-[#7047eb]"
            >
              <option value="All">All Course Types</option>
              <option value="Department Elective">Department Elective</option>
              <option value="Open Elective">Open Elective</option>
              <option value="Core Management">Core Management</option>
              <option value="Project / Thesis">Project / Thesis</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => {
                setSelectedSemFilter('All');
                setSelectedTypeFilter('All');
              }}
              className="px-4 py-1.5 text-xs font-semibold text-gray-600 hover:text-gray-900 border border-gray-300 rounded-md bg-white hover:bg-gray-100 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}

      {/* TAB 1: MY COURSES VIEW */}
      {activeTab === 'courses' && (
        <div className="space-y-6">
          {/* Course Cards Grid matching Page 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCourses.map((c) => (
              <div
                key={c.code}
                onClick={() => navigate('attendance', 'course-wise')}
                className="bg-white rounded-xl p-4 border border-gray-200 shadow-2xs hover:shadow-md hover:border-[#7047eb]/60 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-bold text-[#7047eb] truncate">
                      {c.batchTag}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-gray-100 text-gray-600 shrink-0">
                      {c.type}
                    </span>
                  </div>

                  <h3 className="text-xs sm:text-sm font-extrabold text-gray-900 group-hover:text-[#7047eb] transition-colors leading-snug line-clamp-2 mb-1">
                    {c.code} - {c.name}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
                    <User className="w-3.5 h-3.5 text-gray-400" />
                    <span className="font-semibold">{c.faculty}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-gray-500">Attendance:</span>
                    <span
                      className={`text-xs font-black ${
                        c.attendancePercent >= 75
                          ? 'text-emerald-600'
                          : c.attendancePercent === 0
                          ? 'text-gray-400'
                          : 'text-amber-600'
                      }`}
                    >
                      {c.attendancePercent.toFixed(1)}%
                    </span>
                  </div>
                  <span className="text-[11px] text-purple-700 font-bold group-hover:translate-x-0.5 transition-transform flex items-center">
                    Details <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* PROGRAM OUTCOMES SECTION matching Page 1 */}
          <div className="pt-4 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-700 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>PROGRAM OUTCOMES</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {PROGRAM_OUTCOMES_LIST.slice(0, 3).map((po) => (
                <div
                  key={po.code}
                  onClick={() => navigate('outcomes', 'program-outcomes')}
                  className="bg-white rounded-xl p-3.5 border border-gray-200 shadow-2xs hover:border-purple-300 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-purple-100 text-purple-700">
                      {po.code}
                    </span>
                    <h4 className="text-xs font-extrabold text-gray-800 truncate">
                      {po.name}
                    </h4>
                  </div>
                  <p className="text-[11px] text-gray-500 line-clamp-3 leading-relaxed">
                    {po.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-right">
              <button
                onClick={() => navigate('outcomes', 'program-outcomes')}
                className="text-xs font-bold text-purple-700 hover:text-purple-900 cursor-pointer"
              >
                View All Program Outcomes &rarr;
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: DASHBOARD / OVERVIEW VIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div
              onClick={() => navigate('attendance', 'course-wise')}
              className="bg-white rounded-xl p-4 border border-gray-200 shadow-2xs hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gray-500">Overall Attendance</span>
                <Clock className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-2xl font-black text-emerald-600">77.30%</div>
              <p className="text-[11px] text-gray-500 mt-1">143 / 185 hours attended</p>
            </div>

            <div
              onClick={() => navigate('coe', 'view-results')}
              className="bg-white rounded-xl p-4 border border-gray-200 shadow-2xs hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gray-500">Latest CGPA (S3)</span>
                <GraduationCap className="w-4 h-4 text-purple-600" />
              </div>
              <div className="text-2xl font-black text-purple-700">8.38</div>
              <p className="text-[11px] text-gray-500 mt-1">SGPA: 8.42 • 24 Credits Earned</p>
            </div>

            <div
              onClick={() => navigate('fees', 'pay-fee')}
              className="bg-white rounded-xl p-4 border border-gray-200 shadow-2xs hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gray-500">Fee Status</span>
                <FileCheck2 className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-2xl font-black text-gray-900">
                ₹{feeYearRecords.reduce((acc, r) => acc + r.balanceFee, 0).toLocaleString()}
              </div>
              <p className="text-[11px] text-emerald-600 font-semibold mt-1">
                All installments cleared
              </p>
            </div>

            <div
              onClick={() => navigate('credits', 'apply-credits')}
              className="bg-white rounded-xl p-4 border border-gray-200 shadow-2xs hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gray-500">Activity Points</span>
                <TrendingUp className="w-4 h-4 text-amber-600" />
              </div>
              <div className="text-2xl font-black text-amber-600">50 pts</div>
              <p className="text-[11px] text-gray-500 mt-1">20 Approved • 30 Pending Review</p>
            </div>
          </div>

          {/* Today's Schedule & Pending Activities */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 bg-white rounded-xl p-5 border border-gray-200 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="text-sm font-extrabold text-gray-900 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-purple-600" />
                  <span>Today’s Classes (Monday)</span>
                </h3>
                <button
                  onClick={() => navigate('timetables', 'timetable')}
                  className="text-xs font-bold text-purple-700 hover:underline cursor-pointer"
                >
                  Full Timetable &rarr;
                </button>
              </div>

              <div className="space-y-2.5">
                <div className="p-3 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-purple-700">08:45 - 09:40 (Hour 1)</span>
                    <h4 className="text-xs font-bold text-gray-900">Human Physiology I &amp; II (PHY101)</h4>
                    <p className="text-[11px] text-gray-500">Faculty: Prof. Dr. Mohammed Ismail Razee, MD • Physiology LH 1</p>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700">
                    Present
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-purple-700">09:45 - 10:40 (Hour 2)</span>
                    <h4 className="text-xs font-bold text-gray-900">Human Anatomy Cadaveric Dissection (ANA101)</h4>
                    <p className="text-[11px] text-gray-500">Faculty: Dr. Shwetha K., MS (Anatomy) • Dissection Hall AIMS</p>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700">
                    Present
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-purple-700">11:55 - 12:50 (Hour 4)</span>
                    <h4 className="text-xs font-bold text-gray-900">Medical Biochemistry &amp; Diagnostics (BIO101)</h4>
                    <p className="text-[11px] text-gray-500">Faculty: Dr. Anand Acharya, MD • Biochemistry Lab AIMS</p>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700">
                    Present
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions Sidebar */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-2xs space-y-3">
                <h3 className="text-sm font-extrabold text-gray-900">Quick Applications</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => navigate('applications', 'other-applications')}
                    className="w-full py-2 px-3 rounded-lg bg-purple-50 hover:bg-purple-100 text-[#7047eb] font-bold text-xs text-left flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span>Bonafide Certificate</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => navigate('leave', 'apply-leave')}
                    className="w-full py-2 px-3 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs text-left flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span>Apply for Leave</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => navigate('coe', 'hall-ticket')}
                    className="w-full py-2 px-3 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold text-xs text-left flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span>End Term Hall Ticket</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => navigate('transport', 'application-request')}
                    className="w-full py-2 px-3 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs text-left flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span>Transportation Application</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
