import React, { useState } from 'react';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Copy,
  X,
  Send,
} from 'lucide-react';
import { useFaculty } from '../../../context/FacultyContext';
import { HourlyAttendanceSlot } from '../../../types/faculty';

export const FacultyAttendanceMarkPage: React.FC = () => {
  const {
    currentCourse,
    attendanceSlots,
    students,
    saveAttendanceForHour,
  } = useFaculty();

  const [selectedDate, setSelectedDate] = useState('03-11-2026');
  const [activeSlotModal, setActiveSlotModal] = useState<HourlyAttendanceSlot | null>(null);
  const [attendanceSheet, setAttendanceSheet] = useState<{ [rollNo: string]: 'P' | 'A' | 'OD' | 'L' }>({});
  const [successToast, setSuccessToast] = useState('');

  const handleOpenHour = (slot: HourlyAttendanceSlot) => {
    setActiveSlotModal(slot);
    // Initialize student statuses: default to 'P'
    const initial: { [rollNo: string]: 'P' | 'A' | 'OD' | 'L' } = {};
    students.forEach((s) => {
      // simulate realistic 5 students absent
      if (['20241MBBS0005', '20241MBBS0009', '20241MBBS0010', '20241MBBS0013', '20241MBBS0018'].includes(s.rollNo)) {
        initial[s.rollNo] = 'A';
      } else {
        initial[s.rollNo] = 'P';
      }
    });
    setAttendanceSheet(initial);
  };

  const handleMarkAll = (status: 'P' | 'A') => {
    const updated: { [rollNo: string]: 'P' | 'A' | 'OD' | 'L' } = {};
    students.forEach((s) => {
      updated[s.rollNo] = status;
    });
    setAttendanceSheet(updated);
  };

  const handleStatusChange = (rollNo: string, status: 'P' | 'A' | 'OD' | 'L') => {
    setAttendanceSheet((prev) => ({
      ...prev,
      [rollNo]: status,
    }));
  };

  const handleSaveAttendance = () => {
    if (!activeSlotModal) return;
    saveAttendanceForHour(activeSlotModal.hour, attendanceSheet);
    setActiveSlotModal(null);
    setSuccessToast(`Attendance for Hour ${activeSlotModal.hour} (${currentCourse.code}) recorded and synced!`);
    setTimeout(() => setSuccessToast(''), 4000);
  };

  const markedCount = attendanceSlots.filter((s) => s.status === 'Marked').length;
  const unmarkedCount = attendanceSlots.filter((s) => s.status === 'Unmarked' || s.status === 'Open').length;

  return (
    <div className="space-y-4">
      {/* Breadcrumb matching Page 6 */}
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        HOME &gt; SUBJECT COMMUNITY &gt; {currentCourse.code} - {currentCourse.name} &gt; STUDENT ATTENDANCE &gt; MARK ATTENDANCE
      </div>

      {successToast && (
        <div className="bg-emerald-600 text-white px-4 py-2.5 rounded-lg text-xs font-bold flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-200" />
            <span>{successToast}</span>
          </div>
          <button onClick={() => setSuccessToast('')} className="text-emerald-200 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Container matching Page 6 */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-2xs p-5 space-y-5">
        {/* Top Control Bar: Copy Attendance and Date picker matching Page 6 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
          <button
            onClick={() => alert('Attendance pattern copied from previous session.')}
            className="px-3.5 py-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs self-start"
          >
            <Copy className="w-3.5 h-3.5 text-gray-500" />
            <span>Copy Attendance</span>
          </button>

          {/* Date Selector < 03-11-2026 > */}
          <div className="flex items-center gap-2 self-center sm:self-auto">
            <button
              onClick={() => setSelectedDate('02-11-2026')}
              className="w-7 h-7 rounded border border-gray-300 hover:bg-gray-100 flex items-center justify-center text-gray-600 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 border border-gray-200 rounded-lg text-xs font-extrabold text-gray-800">
              <Calendar className="w-3.5 h-3.5 text-purple-700" />
              <span>{selectedDate}</span>
            </div>
            <button
              onClick={() => setSelectedDate('04-11-2026')}
              className="w-7 h-7 rounded border border-gray-300 hover:bg-gray-100 flex items-center justify-center text-gray-600 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Legend Pills matching Screenshot Page 6 */}
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
            <span className="text-gray-700 font-medium">Marked Hour - {markedCount}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500"></span>
            <span className="text-gray-700 font-medium">Unmarked Hour - {unmarkedCount}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-purple-600"></span>
            <span className="text-gray-700 font-medium">Open To All Hour</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-blue-300"></span>
            <span className="text-gray-700 font-medium">Disabled Hour</span>
          </div>
        </div>

        {/* 8 Hours Grid matching Screenshot Page 6 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 border border-gray-200 rounded-xl overflow-hidden divide-x divide-gray-200">
          {attendanceSlots.map((slot) => {
            const isHour2 = slot.hour === 2;

            return (
              <div
                key={slot.hour}
                className={`min-h-[140px] flex flex-col justify-between p-2.5 transition-all ${
                  isHour2
                    ? 'bg-emerald-50/50 hover:bg-emerald-100/60 cursor-pointer'
                    : 'bg-gray-50/60 opacity-80'
                }`}
                onClick={() => {
                  if (isHour2 || slot.status === 'Open' || slot.status === 'Marked') {
                    handleOpenHour(slot);
                  }
                }}
              >
                <div className="text-center font-bold text-xs uppercase tracking-wider text-gray-600 border-b border-gray-200 pb-1.5">
                  HOUR {slot.hour}
                </div>

                <div className="py-2">
                  {isHour2 ? (
                    <div className="p-2 rounded-lg bg-emerald-600 text-white shadow-sm space-y-1">
                      <div className="text-[10px] font-extrabold truncate uppercase">
                        {currentCourse.shortName}
                      </div>
                      <div className="text-[9px] font-mono text-emerald-100">
                        {slot.timeSpan}
                      </div>
                      <div className="text-[9px] font-bold bg-white/20 rounded px-1 text-center">
                        {slot.status === 'Marked' ? 'Marked' : 'Click to Mark'}
                      </div>
                    </div>
                  ) : (
                    <div className="text-[10px] text-gray-400 text-center py-4">
                      {slot.timeSpan}
                    </div>
                  )}
                </div>

                <div className="text-[10px] text-center font-semibold text-gray-500">
                  {isHour2 ? `${students.length} Students` : 'No Class'}
                </div>
              </div>
            );
          })}
        </div>

        {/* Center prompt matching screenshot Page 6 */}
        <div className="py-8 text-center text-gray-400 space-y-2">
          <Calendar className="w-10 h-10 mx-auto text-gray-300" />
          <p className="text-xs font-semibold">Click on any Hour to mark attendance.</p>
        </div>
      </div>

      {/* Interactive Attendance Marking Modal */}
      {activeSlotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden border border-gray-200 animate-in fade-in zoom-in-95 duration-150 my-8">
            <div className="bg-gradient-to-r from-purple-800 to-indigo-900 p-5 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-200">
                  Hour {activeSlotModal.hour} Attendance Register
                </span>
                <h3 className="font-bold text-base uppercase">
                  {currentCourse.code} - {currentCourse.name}
                </h3>
                <div className="text-xs text-purple-200 mt-0.5">
                  Date: {selectedDate} • Time: {activeSlotModal.timeSpan} • Batch: {currentCourse.batch}
                </div>
              </div>
              <button
                onClick={() => setActiveSlotModal(null)}
                className="text-purple-200 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              {/* Quick Actions & Stats */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-purple-50 p-3 rounded-xl border border-purple-200">
                <div className="flex items-center gap-4">
                  <span className="font-bold text-gray-800">
                    Total: <strong>{students.length}</strong>
                  </span>
                  <span className="font-bold text-emerald-700">
                    Present:{' '}
                    <strong>
                      {Object.values(attendanceSheet).filter((s) => s === 'P' || s === 'OD').length}
                    </strong>
                  </span>
                  <span className="font-bold text-rose-700">
                    Absent:{' '}
                    <strong>
                      {Object.values(attendanceSheet).filter((s) => s === 'A').length}
                    </strong>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleMarkAll('P')}
                    className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                  >
                    Mark All Present
                  </button>
                  <button
                    onClick={() => handleMarkAll('A')}
                    className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                  >
                    Mark All Absent
                  </button>
                </div>
              </div>

              {/* Student Attendance List Table */}
              <div className="border border-gray-200 rounded-xl overflow-hidden max-h-[50vh] overflow-y-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-100 sticky top-0 border-b border-gray-200 text-gray-600 font-bold text-[11px] uppercase">
                    <tr>
                      <th className="py-2.5 px-3">SL</th>
                      <th className="py-2.5 px-3">ROLL NUMBER</th>
                      <th className="py-2.5 px-3">STUDENT NAME</th>
                      <th className="py-2.5 px-3 text-center">ATTENDANCE STATUS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    {students.map((st) => {
                      const currentStatus = attendanceSheet[st.rollNo] || 'P';

                      return (
                        <tr
                          key={st.rollNo}
                          className={`hover:bg-purple-50/30 transition-colors ${
                            currentStatus === 'A' ? 'bg-rose-50/40' : ''
                          }`}
                        >
                          <td className="py-2 px-3 font-bold text-gray-500">{st.slNo}</td>
                          <td className="py-2 px-3 font-mono text-gray-700">{st.rollNo}</td>
                          <td className="py-2 px-3 font-extrabold text-gray-900 uppercase">
                            {st.name}
                          </td>
                          <td className="py-2 px-3">
                            <div className="flex items-center justify-center gap-1.5">
                              {(['P', 'A', 'OD', 'L'] as const).map((code) => {
                                const labels: { [key: string]: string } = {
                                  P: 'Present',
                                  A: 'Absent',
                                  OD: 'On Duty',
                                  L: 'Leave',
                                };
                                const isSelected = currentStatus === code;

                                const colorClasses =
                                  code === 'P'
                                    ? isSelected
                                      ? 'bg-emerald-600 text-white font-bold'
                                      : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                                    : code === 'A'
                                    ? isSelected
                                      ? 'bg-rose-600 text-white font-bold'
                                      : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                                    : code === 'OD'
                                    ? isSelected
                                      ? 'bg-blue-600 text-white font-bold'
                                      : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                                    : isSelected
                                    ? 'bg-amber-600 text-white font-bold'
                                    : 'bg-amber-50 text-amber-700 hover:bg-amber-100';

                                return (
                                  <button
                                    key={code}
                                    type="button"
                                    onClick={() => handleStatusChange(st.rollNo, code)}
                                    className={`px-2.5 py-1 rounded text-[10px] transition-all cursor-pointer ${colorClasses}`}
                                  >
                                    {labels[code]}
                                  </button>
                                );
                              })}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-gray-50 px-5 py-3 flex items-center justify-between border-t border-gray-200">
              <span className="text-[11px] text-gray-500">
                Attendance locking window: 24 hours from scheduled slot
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveSlotModal(null)}
                  className="px-3.5 py-1.5 border border-gray-300 text-gray-700 text-xs font-bold rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveAttendance}
                  className="px-5 py-1.5 bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  Save &amp; Submit Attendance
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
