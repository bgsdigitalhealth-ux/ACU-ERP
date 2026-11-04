import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Printer,
} from 'lucide-react';
import { TIMETABLE_SLOTS } from '../../../data/studentMockData';
import { TimetableSlot } from '../../../types/student';

export const StudentTimetablePage: React.FC = () => {
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0);

  const days: ('Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday')[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const datesMap: { [key: string]: string } = {
    Monday: '2 November, 2026',
    Tuesday: '3 November, 2026',
    Wednesday: '4 November, 2026',
    Thursday: '5 November, 2026',
    Friday: '6 November, 2026',
    Saturday: '7 November, 2026',
  };

  const getSlot = (day: string, hour: number): TimetableSlot | undefined => {
    return TIMETABLE_SLOTS.find((s) => s.day === day && s.hour === hour);
  };

  const getStatusBadge = (status: TimetableSlot['status']) => {
    switch (status) {
      case 'Present':
        return <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800">Present</span>;
      case 'Absent':
        return <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-rose-100 text-rose-800">Absent</span>;
      case 'Suspended':
        return <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-100 text-amber-800">Suspended</span>;
      case 'Holiday':
        return <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-yellow-100 text-yellow-800">Holiday</span>;
      default:
        return <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-gray-100 text-gray-600">Unmarked</span>;
    }
  };

  return (
    <div className="space-y-4">
      {/* Breadcrumb matching Page 5 */}
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        TIMETABLES &gt; TIMETABLE
      </div>

      {/* Week Selector & Print Toolbar */}
      <div className="bg-white rounded-xl p-3 sm:p-4 border border-gray-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 self-center sm:self-auto">
          <button
            onClick={() => setCurrentWeekIndex((prev) => prev - 1)}
            className="w-7 h-7 rounded border border-gray-300 hover:bg-gray-100 flex items-center justify-center text-gray-600 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="text-xs sm:text-sm font-extrabold text-gray-800 flex items-center gap-2 px-2">
            <Calendar className="w-4 h-4 text-purple-600" />
            <span>
              {currentWeekIndex === 0
                ? '1st November, 2026 to 7th November, 2026'
                : `Week offset (${currentWeekIndex > 0 ? '+' : ''}${currentWeekIndex})`}
            </span>
          </div>
          <button
            onClick={() => setCurrentWeekIndex((prev) => prev + 1)}
            className="w-7 h-7 rounded border border-gray-300 hover:bg-gray-100 flex items-center justify-center text-gray-600 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-300 hover:bg-gray-100 text-xs font-bold text-gray-700 transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-gray-600" />
            <span>Print</span>
          </button>
        </div>
      </div>

      {/* Legend matching Page 5 */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs bg-white rounded-xl p-3 border border-gray-200 shadow-2xs">
        <span className="font-bold text-gray-600 mr-2">Status Legend:</span>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-xs bg-emerald-500"></span>
          <span className="font-semibold text-gray-700">Present</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-xs bg-rose-500"></span>
          <span className="font-semibold text-gray-700">Absent</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-xs bg-gray-400"></span>
          <span className="font-semibold text-gray-700">Un marked</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-xs bg-amber-500"></span>
          <span className="font-semibold text-gray-700">Suspended</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-xs bg-yellow-400"></span>
          <span className="font-semibold text-gray-700">Holiday</span>
        </div>
      </div>

      {/* Timetable Matrix Grid matching Page 5 */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="bg-gray-100/80 border-b border-gray-200 text-gray-700 font-extrabold text-[11px] uppercase tracking-wider">
                <th className="p-3 w-44 border-r border-gray-200">DAY/HOUR</th>
                <th className="p-3 min-w-[130px] border-r border-gray-200 text-center">HOUR 1</th>
                <th className="p-3 min-w-[130px] border-r border-gray-200 text-center">HOUR 2</th>
                <th className="p-3 min-w-[130px] border-r border-gray-200 text-center">HOUR 3</th>
                <th className="p-3 min-w-[130px] border-r border-gray-200 text-center">HOUR 4</th>
                <th className="p-3 min-w-[130px] border-r border-gray-200 text-center">HOUR 5</th>
                <th className="p-3 min-w-[130px] text-center">HOUR 6</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {days.map((day) => (
                <tr key={day} className="hover:bg-gray-50/60 transition-colors">
                  {/* Day Column matching Page 5 */}
                  <td className="p-3 bg-gray-50/50 border-r border-gray-200 align-top">
                    <div className="font-black text-gray-900 text-xs">
                      {datesMap[day].split(',')[0]}
                    </div>
                    <div className="text-[11px] font-bold text-purple-700">
                      {day}
                    </div>
                  </td>

                  {/* Hours 1 to 6 */}
                  {[1, 2, 3, 4, 5, 6].map((hour) => {
                    const slot = getSlot(day, hour);
                    return (
                      <td
                        key={hour}
                        className="p-2.5 border-r border-gray-200 last:border-r-0 align-top"
                      >
                        {slot ? (
                          <div className="space-y-1">
                            <div className="flex items-center justify-between gap-1">
                              <span className="text-[10px] font-bold text-gray-400">
                                {slot.timeSpan}
                              </span>
                              {getStatusBadge(slot.status)}
                            </div>
                            <h4 className="text-xs font-bold text-gray-900 leading-tight">
                              {slot.courseName}
                            </h4>
                            <p className="text-[10px] text-purple-700 font-semibold truncate">
                              {slot.faculty}
                            </p>
                            <p className="text-[10px] text-gray-500">{slot.classroom}</p>
                          </div>
                        ) : (
                          <div className="h-16 flex items-center justify-center text-gray-300 text-xs">
                            -
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
