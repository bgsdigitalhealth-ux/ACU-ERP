import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Calendar as CalendarIcon,
  X,
} from 'lucide-react';
import { ACADEMIC_CALENDAR_EVENTS } from '../../../data/studentMockData';
import { AcademicCalendarEvent } from '../../../types/student';

export const StudentAcademicCalendarPage: React.FC = () => {
  const [filterHoliday, setFilterHoliday] = useState(true);
  const [filterSpecialEvent, setFilterSpecialEvent] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<AcademicCalendarEvent | null>(null);

  // November 2026 Calendar days structure:
  // Nov 1, 2026 is Sunday. Days in month: 30.
  const daysInMonth = 30;
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getEventsForDay = (day: number) => {
    const dayStr = day < 10 ? `0${day}` : `${day}`;
    const dateQuery = `2026-11-${dayStr}`;
    return ACADEMIC_CALENDAR_EVENTS.filter((e) => {
      if (e.date !== dateQuery) return false;
      if (e.isHoliday && !filterHoliday) return false;
      if (e.isSpecialEvent && !filterSpecialEvent) return false;
      return true;
    });
  };

  return (
    <div className="space-y-4">
      {/* Breadcrumb matching Page 7 */}
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        ACADEMIC CALENDAR &gt; ACADEMIC CALENDAR
      </div>

      <div className="bg-white rounded-xl p-4 sm:p-5 border border-gray-200 shadow-2xs space-y-4">
        <h2 className="text-xs sm:text-sm font-extrabold text-gray-800 tracking-wide uppercase border-b border-gray-100 pb-2">
          ACADEMIC CALENDAR
        </h2>

        {/* Filter Checkboxes & Category Tags matching Page 7 */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs border-b border-gray-100 pb-3">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-1.5 cursor-pointer font-bold text-gray-700">
              <input
                type="checkbox"
                checked={filterHoliday}
                onChange={(e) => setFilterHoliday(e.target.checked)}
                className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500"
              />
              <span>Holiday</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer font-bold text-gray-700">
              <input
                type="checkbox"
                checked={filterSpecialEvent}
                onChange={(e) => setFilterSpecialEvent(e.target.checked)}
                className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500"
              />
              <span>Special Event</span>
            </label>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
              🏛 Institution
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
              🎓 School
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
              🏢 Department
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-800 border border-purple-200">
              📑 Program
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-700 border border-gray-300">
              👥 Batch
            </span>
          </div>
        </div>

        {/* Month Navigation Toolbar matching Page 7 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <button className="p-1 rounded border border-gray-300 hover:bg-gray-100 text-gray-600 cursor-pointer">
              <ChevronsLeft className="w-4 h-4" />
            </button>
            <button className="p-1 rounded border border-gray-300 hover:bg-gray-100 text-gray-600 cursor-pointer">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm sm:text-base font-black text-gray-900 px-3">
              November 2026
            </span>
            <button className="p-1 rounded border border-gray-300 hover:bg-gray-100 text-gray-600 cursor-pointer">
              <ChevronRight className="w-4 h-4" />
            </button>
            <button className="p-1 rounded border border-gray-300 hover:bg-gray-100 text-gray-600 cursor-pointer">
              <ChevronsRight className="w-4 h-4" />
            </button>
          </div>

          <button className="px-3 py-1 rounded border border-gray-300 bg-gray-50 hover:bg-gray-100 text-xs font-bold text-gray-700 cursor-pointer">
            Today
          </button>
        </div>

        {/* Calendar Grid matching Page 7 */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200 text-center font-extrabold text-[11px] text-gray-700 py-2">
            {daysOfWeek.map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 divide-x divide-y divide-gray-200 text-xs">
            {Array.from({ length: daysInMonth }).map((_, index) => {
              const day = index + 1;
              const events = getEventsForDay(day);

              return (
                <div
                  key={day}
                  className={`min-h-[90px] p-1.5 transition-colors ${
                    day === 3 ? 'bg-amber-50/40' : 'bg-white hover:bg-gray-50/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-xs font-bold ${
                        day === 3
                          ? 'w-5 h-5 rounded-full bg-purple-700 text-white flex items-center justify-center text-[10px]'
                          : 'text-gray-700'
                      }`}
                    >
                      {day}
                    </span>
                  </div>

                  {/* Event Tags inside Date Cell */}
                  <div className="space-y-1">
                    {events.map((ev) => (
                      <div
                        key={ev.id}
                        onClick={() => setSelectedEvent(ev)}
                        className={`p-1 rounded text-[10px] font-bold leading-tight cursor-pointer truncate transition-transform hover:scale-[1.02] ${
                          ev.isHoliday
                            ? 'bg-rose-100 text-rose-900 border border-rose-200'
                            : 'bg-blue-100 text-blue-900 border border-blue-200'
                        }`}
                        title={ev.title}
                      >
                        <div>{ev.title}</div>
                        <div className="text-[8px] text-gray-500 font-normal">🏛 {ev.category}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Event Details Popup Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 border border-gray-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-sm font-extrabold text-gray-900 flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-purple-600" />
                <span>Academic Event Details</span>
              </h3>
              <button
                onClick={() => setSelectedEvent(null)}
                className="w-7 h-7 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs text-gray-700">
              <div>
                <span className="font-bold text-gray-500 text-[11px]">Event Title:</span>
                <p className="text-sm font-black text-gray-900">{selectedEvent.title}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <span className="font-bold text-gray-500 text-[11px]">Date:</span>
                  <p className="font-bold text-purple-700">{selectedEvent.date}</p>
                </div>
                <div>
                  <span className="font-bold text-gray-500 text-[11px]">Category:</span>
                  <p className="font-bold text-gray-800">{selectedEvent.category}</p>
                </div>
              </div>

              <div>
                <span className="font-bold text-gray-500 text-[11px]">Description:</span>
                <p className="text-gray-600 mt-0.5 leading-relaxed bg-gray-50 p-2.5 rounded-lg border border-gray-200">
                  {selectedEvent.description}
                </p>
              </div>

              <div className="pt-2 flex items-center gap-2">
                {selectedEvent.isHoliday && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800">
                    Official Holiday
                  </span>
                )}
                {selectedEvent.isSpecialEvent && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                    Special Event
                  </span>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-4 py-1.5 rounded-lg bg-gray-800 text-white text-xs font-bold hover:bg-gray-900 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
