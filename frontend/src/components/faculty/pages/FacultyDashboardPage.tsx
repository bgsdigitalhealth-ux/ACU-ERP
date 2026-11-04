import React, { useState } from 'react';
import {
  Calendar,
  Users,
  Clock,
  ClipboardList,
  Bell,
  Sparkles,
  Folder,
  BookOpen,
  ChevronDown,
  Search,
} from 'lucide-react';
import { useFaculty } from '../../../context/FacultyContext';

export const FacultyDashboardPage: React.FC = () => {
  const { profile, currentCourse, navigate, setNavMode, academicCalendar } = useFaculty();
  const [selectedProgramme, setSelectedProgramme] = useState('MBBS (Bachelor of Medicine and Bachelor of Surgery)');
  const [expandedSection, setExpandedSection] = useState(true);
  const [calendarViewTab, setCalendarViewTab] = useState<'present' | 'upcoming'>('present');
  const [quickSearch, setQuickSearch] = useState('');

  const programmesList = [
    'MBBS (Bachelor of Medicine and Bachelor of Surgery)',
    'MD (Physiology)',
    'MD (General Medicine)',
    'MS (General Surgery)',
    'MD (Anatomy)',
    'MD (Biochemistry)',
    'MD (Pathology)',
    'MD (Pharmacology)',
  ];

  return (
    <div className="space-y-6">
      {/* Breadcrumb matching Page 2 */}
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        HOME &gt; QUICK ACCESS
      </div>

      {/* Top 4 Pill Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => navigate('timetable', 'batch-section', 'global')}
          className="p-3 bg-white rounded-xl border border-gray-200 shadow-2xs hover:border-purple-300 hover:shadow-md transition-all flex items-center gap-3 group cursor-pointer text-left"
        >
          <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center group-hover:bg-purple-700 group-hover:text-white transition-colors">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-gray-900">My Timetable</div>
            <div className="text-[11px] text-gray-500">Weekly Schedule</div>
          </div>
        </button>

        <button
          onClick={() => {
            setNavMode('course');
            navigate('student-info', 'details', 'course');
          }}
          className="p-3 bg-white rounded-xl border border-gray-200 shadow-2xs hover:border-purple-300 hover:shadow-md transition-all flex items-center gap-3 group cursor-pointer text-left"
        >
          <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center group-hover:bg-purple-700 group-hover:text-white transition-colors">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-gray-900">Course Communities</div>
            <div className="text-[11px] text-gray-500">{currentCourse.code} Active</div>
          </div>
        </button>

        <button
          onClick={() => navigate('academic-calendar', undefined, 'global')}
          className="p-3 bg-white rounded-xl border border-gray-200 shadow-2xs hover:border-purple-300 hover:shadow-md transition-all flex items-center gap-3 group cursor-pointer text-left"
        >
          <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center group-hover:bg-purple-700 group-hover:text-white transition-colors">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-gray-900">Academic Calendar</div>
            <div className="text-[11px] text-gray-500">2026 - 2027 Term</div>
          </div>
        </button>

        <button
          onClick={() => navigate('my-communities', 'my-tutor-batches', 'global')}
          className="p-3 bg-white rounded-xl border border-gray-200 shadow-2xs hover:border-purple-300 hover:shadow-md transition-all flex items-center gap-3 group cursor-pointer text-left"
        >
          <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center group-hover:bg-purple-700 group-hover:text-white transition-colors">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-gray-900">Other Communities</div>
            <div className="text-[11px] text-gray-500">Tutor &amp; Mentees</div>
          </div>
        </button>
      </div>

      {/* QUICK ACCESS Section with Search Bar (Page 2) */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-2xs space-y-5">
        <div>
          <h2 className="text-sm font-extrabold text-gray-900 uppercase tracking-wide">
            QUICK ACCESS
          </h2>
          <div className="relative mt-2 max-w-md">
            <input
              type="text"
              value={quickSearch}
              onChange={(e) => setQuickSearch(e.target.value)}
              placeholder="What are you looking for..."
              className="w-full text-xs pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          </div>
        </div>

        {/* 7 Quick Access Tiles matching screenshot Page 2 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 pt-2">
          {[
            {
              title: 'Timetable',
              icon: Clock,
              action: () => navigate('timetable', 'batch-section', 'global'),
            },
            {
              title: 'Daily Work Log',
              icon: ClipboardList,
              action: () => navigate('lesson-planner', 'proposed-plan', 'course'),
            },
            {
              title: 'Attendance',
              icon: Users,
              action: () => navigate('attendance', 'mark-attendance', 'course'),
            },
            {
              title: 'Assessment',
              icon: ClipboardList,
              action: () => navigate('assessments', 'management', 'course'),
            },
            {
              title: 'Notification Center',
              icon: Bell,
              action: () => navigate('dashboard', 'quick-access', 'global'),
            },
            {
              title: 'Activity Points',
              icon: Sparkles,
              action: () => navigate('dashboard', 'quick-access', 'global'),
            },
            {
              title: 'Resource Repository',
              icon: Folder,
              action: () => navigate('materials', 'copy', 'course'),
            },
          ].map((tile, i) => {
            const Icon = tile.icon;
            return (
              <button
                key={i}
                onClick={tile.action}
                className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 hover:bg-purple-50 hover:border-purple-300 transition-all flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-lg bg-white shadow-2xs border border-gray-200 text-purple-700 flex items-center justify-center group-hover:bg-purple-700 group-hover:text-white transition-colors mb-2">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-gray-800 group-hover:text-purple-900 leading-tight">
                  {tile.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Program Outcomes & Program Specific Outcomes (Page 2) */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-purple-600 rounded-sm"></span>
            <h3 className="text-xs sm:text-sm font-extrabold text-gray-900 uppercase tracking-wide">
              PROGRAM OUTCOMES &amp; PROGRAM SPECIFIC OUTCOMES
            </h3>
          </div>
          <span className="text-xs font-bold text-gray-500 uppercase">AIMS / MBBS</span>
        </div>

        {/* Programme Selection Pills */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {programmesList.map((prog, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedProgramme(prog)}
              className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                selectedProgramme === prog
                  ? 'bg-purple-100 text-purple-900 border border-purple-300 shadow-2xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {prog}
            </button>
          ))}
        </div>

        {/* Expandable Group */}
        <div className="border border-gray-200 rounded-xl overflow-hidden mt-4">
          <button
            onClick={() => setExpandedSection(!expandedSection)}
            className="w-full bg-gray-50 px-4 py-2.5 text-left flex items-center justify-between text-xs font-bold text-gray-800 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <span>v BGS Medical College &amp; Hospital &bull; Phase 1 MBBS Competency Framework (2024 - 2029)</span>
            <ChevronDown
              className={`w-4 h-4 text-gray-500 transition-transform ${
                expandedSection ? 'rotate-180' : ''
              }`}
            />
          </button>

          {expandedSection && (
            <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4 bg-white animate-in fade-in duration-150">
              <div className="p-4 rounded-xl border border-gray-200 bg-purple-50/30 space-y-1.5">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-200 text-purple-900">
                  PO1 - Medical Knowledge
                </span>
                <h4 className="text-xs font-bold text-gray-900">Biomedical &amp; Clinical Sciences</h4>
                <p className="text-[11px] text-gray-600 leading-relaxed">
                  Demonstrate comprehensive understanding of normal human structure, physiological functions, pathogenesis, and clinical disease management (NMC GMER 2024).
                </p>
              </div>

              <div className="p-4 rounded-xl border border-gray-200 bg-purple-50/30 space-y-1.5">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-200 text-purple-900">
                  PO2 - Clinical Skills &amp; Care
                </span>
                <h4 className="text-xs font-bold text-gray-900">Diagnostic &amp; Procedural Competencies</h4>
                <p className="text-[11px] text-gray-600 leading-relaxed">
                  Perform comprehensive physical examination, interpret clinical tests (ECG, Spirometry, ABG, Hematology), and demonstrate patient-centric clinical decision making.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-gray-200 bg-purple-50/30 space-y-1.5">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-200 text-purple-900">
                  PO3 - Professionalism &amp; Ethics
                </span>
                <h4 className="text-xs font-bold text-gray-900">AETCOM Bioethics &amp; Communication</h4>
                <p className="text-[11px] text-gray-600 leading-relaxed">
                  Exhibit compassionate patient communication, cultural sensitivity, professional medical ethics, and teamwork in diverse clinical and hospital settings.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Present & Upcoming Academic Calendar Section */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-2xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-purple-100 text-purple-800">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-gray-900 uppercase tracking-wide">
                Faculty Academic Calendar (Present &amp; Upcoming Schedule)
              </h3>
              <p className="text-xs text-gray-500">
                Phase 1 MBBS &bull; Department of Physiology &bull; Session 2024–2025
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => setCalendarViewTab('present')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                calendarViewTab === 'present'
                  ? 'bg-white text-purple-800 shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Present Schedule</span>
            </button>
            <button
              onClick={() => setCalendarViewTab('upcoming')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                calendarViewTab === 'upcoming'
                  ? 'bg-white text-purple-800 shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-purple-600" />
              <span>Upcoming Events</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {academicCalendar
            .filter((item) => item.type === calendarViewTab)
            .map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-purple-300 hover:shadow-xs transition space-y-2"
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span
                    className={`font-bold px-2 py-0.5 rounded-full ${
                      item.type === 'present'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}
                  >
                    {item.status}
                  </span>
                  <span className="font-semibold text-slate-500">{item.category}</span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
                <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-xs font-semibold text-purple-900">
                  <span>{item.startDate} &ndash; {item.endDate}</span>
                  <span className="text-[11px] text-slate-500">{item.venue}</span>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Active Faculty Profile Summary Bar */}
      <div className="bg-gradient-to-r from-purple-800 to-indigo-900 rounded-xl p-4 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
        <div>
          <div className="text-xs text-purple-200 font-semibold">Active Faculty Profile</div>
          <div className="text-base font-bold">{profile.fullName} ({profile.empCode})</div>
          <div className="text-xs text-purple-300 mt-0.5">
            {profile.department} • {profile.designation}
          </div>
        </div>
        <button
          onClick={() => {
            setNavMode('course');
            navigate('student-info', 'details', 'course');
          }}
          className="px-4 py-2 bg-white text-purple-900 hover:bg-purple-50 rounded-lg text-xs font-bold shadow-sm transition-colors cursor-pointer self-start sm:self-auto"
        >
          Open Subject Community ({currentCourse.code}) &rarr;
        </button>
      </div>
    </div>
  );
};

