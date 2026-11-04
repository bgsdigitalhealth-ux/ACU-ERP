import React, { useState } from 'react';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Printer,
  Search,
  RotateCcw,
  SlidersHorizontal,
} from 'lucide-react';
import { useFaculty } from '../../../context/FacultyContext';

export const FacultyTimetablePage: React.FC = () => {
  const { profile } = useFaculty();

  const [activeTab, setActiveTab] = useState<'batch' | 'consolidated'>('batch');
  const [selectedStaff, setSelectedStaff] = useState('Mohammed Ismail Razee (PUNIV03049)');
  const [showFilters, setShowFilters] = useState(true);
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0);

  const days = [
    { day: 'Monday', dateStr: '2 November, 2026' },
    { day: 'Tuesday', dateStr: '3 November, 2026' },
    { day: 'Wednesday', dateStr: '4 November, 2026' },
    { day: 'Thursday', dateStr: '5 November, 2026' },
    { day: 'Friday', dateStr: '6 November, 2026' },
    { day: 'Saturday', dateStr: '7 November, 2026' },
  ];

  const timetableSchedule: {
    [day: string]: { [hour: number]: { course: string; code: string; hall: string; batch: string } };
  } = {
    Monday: {
      1: { course: 'Physiology (CVS)', code: 'PHY101', hall: 'Physio LH-1', batch: '2024MBBS01' },
      2: { course: 'Physiology Lab', code: 'PHY101', hall: 'Central Lab', batch: '2024MBBS01' },
    },
    Tuesday: {
      2: { course: 'Physiology Theory', code: 'PHY101', hall: 'Physio LH-1', batch: '2024MBBS01' },
      4: { course: 'Anatomy Dissection', code: 'ANA101', hall: 'Dissection Hall', batch: '2024MBBS01' },
      6: { course: 'Biochemistry Practical', code: 'BIO101', hall: 'Biochem Lab', batch: '2024MBBS01' },
    },
    Wednesday: {
      1: { course: 'ECE Ward Rounds', code: 'ECE101', hall: 'BGS Hospital', batch: '2024MBBS01' },
      3: { course: 'Physiology OSPE Lab', code: 'PHY101', hall: 'OSPE Lab', batch: '2024MBBS01' },
    },
    Thursday: {
      3: { course: 'Hematology Practical', code: 'PHY101', hall: 'Central Lab', batch: '2024MBBS01' },
      4: { course: 'Respiratory Physiology', code: 'PHY101', hall: 'Physio LH-1', batch: '2024MBBS01' },
      7: { course: 'Clinical Case Seminar', code: 'PHY101', hall: 'Seminar Hall', batch: '2024MBBS01' },
    },
    Friday: {
      2: { course: 'Renal Physiology', code: 'PHY101', hall: 'Physio LH-1', batch: '2024MBBS01' },
      5: { course: 'AETCOM Ethics Module', code: 'ECE101', hall: 'Auditorium', batch: '2024MBBS01' },
    },
    Saturday: {
      1: { course: 'Formative Assessment', code: 'PHY101', hall: 'Physio LH-1', batch: '2024MBBS01' },
      2: { course: 'Medical Mentoring', code: 'MENTOR', hall: 'Faculty Room', batch: '2024MBBS01' },
    },
  };

  return (
    <div className="space-y-4">
      {/* Breadcrumb matching Page 30 */}
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        TIMETABLE &gt; BATCH/SECTION TIMETABLE
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-2xs p-5 space-y-4">
        {/* Top Tabs matching Screenshot Page 30 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('batch')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'batch'
                  ? 'bg-purple-700 text-white shadow-2xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              BATCH/SECTION TIMETABLE
            </button>
            <button
              onClick={() => setActiveTab('consolidated')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'consolidated'
                  ? 'bg-purple-700 text-white shadow-2xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              CONSOLIDATED BATCH/SECTION TIMETABLE
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-3 py-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-gray-500" />
              <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
            </button>
            <button
              onClick={() => window.print()}
              className="px-3.5 py-1.5 bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold rounded-lg shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Timetable</span>
            </button>
          </div>
        </div>

        {/* Filters Form matching Page 30 */}
        {showFilters && (
          <div className="p-4 bg-gray-50/80 rounded-xl border border-gray-200 flex flex-wrap items-end justify-between gap-3 text-xs">
            <div className="space-y-1 w-full sm:w-72">
              <label className="text-[11px] font-bold text-gray-600 uppercase">Staff</label>
              <select
                value={selectedStaff}
                onChange={(e) => setSelectedStaff(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg text-xs bg-white font-semibold text-gray-800 focus:outline-none focus:ring-1 focus:ring-purple-600"
              >
                <option value="Mohammed Ismail Razee (PUNIV03049)">
                  {profile.fullName} ({profile.empCode})
                </option>
                <option value="Dr. ANJANA D (PUNIV02102)">Dr. ANJANA D (PUNIV02102)</option>
                <option value="Prof. KUMARAVEL T (PUNIV01984)">Prof. KUMARAVEL T (PUNIV01984)</option>
              </select>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setSelectedStaff(`${profile.fullName} (${profile.empCode})`)}
                className="px-3 py-1.5 border border-gray-300 hover:bg-gray-100 text-gray-700 font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-gray-500" />
                <span>Reset</span>
              </button>
              <button
                onClick={() => alert(`Showing schedule for: ${selectedStaff}`)}
                className="px-5 py-1.5 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search</span>
              </button>
            </div>
          </div>
        )}

        {/* Date Navigator matching Screenshot Page 30 */}
        <div className="flex items-center justify-between border-y border-gray-100 py-3 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentWeekIndex((prev) => prev - 1)}
              className="w-7 h-7 rounded border border-gray-300 hover:bg-gray-100 flex items-center justify-center text-gray-600 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 font-bold text-gray-800 px-2">
              <Calendar className="w-4 h-4 text-purple-700" />
              <span>
                {currentWeekIndex === 0
                  ? '1st November, 2026 to 7th November, 2026'
                  : `Week Offset: ${currentWeekIndex > 0 ? '+' : ''}${currentWeekIndex}`}
              </span>
            </div>
            <button
              onClick={() => setCurrentWeekIndex((prev) => prev + 1)}
              className="w-7 h-7 rounded border border-gray-300 hover:bg-gray-100 flex items-center justify-center text-gray-600 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <span className="text-[11px] font-semibold text-gray-500">
            Assigned Batch: 2024MBBS01 (First MBBS)
          </span>
        </div>

        {/* Weekly Grid matching Screenshot Page 30 */}
        <div className="border border-gray-200 rounded-xl overflow-x-auto shadow-2xs">
          <table className="w-full text-left text-xs min-w-[950px] border-collapse">
            <thead className="bg-gray-100 border-b border-gray-200 text-gray-700 font-extrabold text-[10px] uppercase">
              <tr>
                <th className="py-2.5 px-3 w-36 border-r border-gray-200">DAY / HOUR</th>
                <th className="py-2 px-2 text-center w-28">HOUR 1<div className="text-[9px] font-normal text-gray-400">08:45-09:40</div></th>
                <th className="py-2 px-2 text-center w-28">HOUR 2<div className="text-[9px] font-normal text-gray-400">09:45-10:40</div></th>
                <th className="py-2 px-2 text-center w-28">HOUR 3<div className="text-[9px] font-normal text-gray-400">10:55-11:50</div></th>
                <th className="py-2 px-2 text-center w-28">HOUR 4<div className="text-[9px] font-normal text-gray-400">11:55-12:50</div></th>
                <th className="py-2 px-2 text-center w-28">HOUR 5<div className="text-[9px] font-normal text-gray-400">01:30-02:25</div></th>
                <th className="py-2 px-2 text-center w-28">HOUR 6<div className="text-[9px] font-normal text-gray-400">02:30-03:25</div></th>
                <th className="py-2 px-2 text-center w-28">HOUR 7<div className="text-[9px] font-normal text-gray-400">03:30-04:25</div></th>
                <th className="py-2 px-2 text-center w-28">HOUR 8<div className="text-[9px] font-normal text-gray-400">04:30-05:15</div></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {days.map((d) => (
                <tr key={d.day} className="hover:bg-purple-50/20 transition-colors">
                  <td className="py-3 px-3 border-r border-gray-200 bg-gray-50/50">
                    <div className="font-extrabold text-gray-900">{d.day}</div>
                    <div className="text-[10px] text-gray-400 font-mono">{d.dateStr}</div>
                  </td>

                  {[1, 2, 3, 4, 5, 6, 7, 8].map((h) => {
                    const slot = timetableSchedule[d.day]?.[h];
                    return (
                      <td key={h} className="py-2 px-1.5 border-r border-gray-100 align-top">
                        {slot ? (
                          <div className="p-2 rounded-lg bg-purple-50 border border-purple-200 space-y-1 hover:bg-purple-100/70 transition-colors">
                            <div className="font-extrabold text-[10px] text-purple-900 leading-tight">
                              {slot.code} • {slot.course}
                            </div>
                            <div className="text-[9px] text-gray-600 flex justify-between font-mono">
                              <span>{slot.hall}</span>
                              <span className="font-semibold text-purple-700">{slot.batch}</span>
                            </div>
                          </div>
                        ) : (
                          <div className="h-12 flex items-center justify-center text-gray-300 text-[10px]">
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
