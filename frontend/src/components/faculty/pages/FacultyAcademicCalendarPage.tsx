import React, { useState } from 'react';
import { useFaculty } from '../../../context/FacultyContext';
import {
  Calendar,
  Clock,
  MapPin,
  CalendarDays,
  Printer,
  Download,
  Filter,
} from 'lucide-react';

export const FacultyAcademicCalendarPage: React.FC = () => {
  const { academicCalendar, profile } = useFaculty();

  const [activeTab, setActiveTab] = useState<'all' | 'present' | 'upcoming'>('present');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const filteredEvents = academicCalendar.filter((item) => {
    if (activeTab !== 'all' && item.type !== activeTab) return false;
    if (selectedCategory !== 'ALL' && item.category !== selectedCategory) return false;
    return true;
  });

  const presentCount = academicCalendar.filter((i) => i.type === 'present').length;
  const upcomingCount = academicCalendar.filter((i) => i.type === 'upcoming').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 uppercase tracking-wider mb-1 font-semibold">
              <span>Home</span>
              <span>&gt;</span>
              <span>Campus Governance</span>
              <span>&gt;</span>
              <span className="text-purple-700">Academic Calendar</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2.5">
              <CalendarDays className="w-6 h-6 text-purple-700" />
              <span>Medical Academic Calendar (2024–2025)</span>
            </h1>
            <p className="text-sm text-slate-500">
              Official MBBS institutional schedule &bull; BGS Medical College &amp; Hospital &bull; {profile.department}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print Schedule</span>
            </button>
            <button
              onClick={() => alert('Downloading official ACU Academic Calendar PDF...')}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-lg text-xs font-bold shadow-sm transition cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>

        {/* Tab Switcher: Present vs Upcoming */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 mt-5 pt-4">
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('present')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                activeTab === 'present'
                  ? 'bg-white text-purple-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Present Term ({presentCount})</span>
            </button>

            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                activeTab === 'upcoming'
                  ? 'bg-white text-purple-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-purple-600" />
              <span>Upcoming Schedule ({upcomingCount})</span>
            </button>

            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-white text-purple-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>All Events ({academicCalendar.length})</span>
            </button>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="text-xs font-semibold border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              <option value="ALL">All Categories</option>
              <option value="Examination">Examinations &amp; OSPE</option>
              <option value="Clinical Posting">Clinical Postings &amp; Wards</option>
              <option value="Didactic Lecture">Didactic Lectures</option>
              <option value="Academic Event">Academic Events &amp; CMEs</option>
              <option value="Holiday / Vacation">Vacations &amp; Holidays</option>
            </select>
          </div>
        </div>
      </div>

      {/* Events List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredEvents.map((evt) => (
          <div
            key={evt.id}
            className={`bg-white rounded-xl border p-5 transition-all shadow-2xs hover:shadow-md ${
              evt.type === 'present'
                ? 'border-emerald-200 hover:border-emerald-400'
                : 'border-slate-200 hover:border-purple-300'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <span
                className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                  evt.type === 'present'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-purple-100 text-purple-800 border border-purple-200'
                }`}
              >
                {evt.type === 'present' ? 'Present / Active' : 'Upcoming Schedule'}
              </span>

              <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md">
                {evt.category}
              </span>
            </div>

            <h3 className="font-bold text-slate-900 text-base mt-2.5 leading-snug">
              {evt.title}
            </h3>

            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              {evt.description}
            </p>

            <div className="pt-4 mt-4 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-600 gap-2">
              <div className="flex items-center gap-1.5 font-semibold text-purple-900">
                <Calendar className="w-3.5 h-3.5 text-purple-600" />
                <span>{evt.startDate} &ndash; {evt.endDate}</span>
              </div>

              <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span className="truncate max-w-[200px]">{evt.venue}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
