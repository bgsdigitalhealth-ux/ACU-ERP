import React, { useState } from 'react';
import { X, UserPlus, Calendar, ArrowLeftRight, CheckCircle2 } from 'lucide-react';
import { useCollegeAdmin } from '../../../context/CollegeAdminContext';

export const DeputyModals: React.FC = () => {
  const {
    activeDeputyModal,
    setActiveDeputyModal,
    handleAllocateInvigilators,
    handleGenerateDutyRoster,
    handleSubstituteInvigilator,
    handleMarkAttendance,
    dutyRoster
  } = useCollegeAdmin();

  // Local form states
  const [allocCount, setAllocCount] = useState<number>(2);
  const [selectedHall, setSelectedHall] = useState<string>('Hall 1');
  const [substituteFaculty, setSubstituteFaculty] = useState<string>('Dr. Rajesh N. (Pathology)');
  const [attendanceCount, setAttendanceCount] = useState<number>(68);

  if (!activeDeputyModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-purple-200 animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#4B087B] to-[#7900B8] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {activeDeputyModal === 'allocate' && <UserPlus className="w-5 h-5 text-amber-300" />}
            {activeDeputyModal === 'roster' && <Calendar className="w-5 h-5 text-amber-300" />}
            {activeDeputyModal === 'substitute' && <ArrowLeftRight className="w-5 h-5 text-amber-300" />}
            {activeDeputyModal === 'attendance' && <CheckCircle2 className="w-5 h-5 text-amber-300" />}
            <h3 className="font-bold text-base sm:text-lg">
              {activeDeputyModal === 'allocate' && 'Allocate Invigilators'}
              {activeDeputyModal === 'roster' && 'Duty Roster Management'}
              {activeDeputyModal === 'substitute' && 'Reallocate / Substitute Invigilator'}
              {activeDeputyModal === 'attendance' && 'Mark Invigilator Attendance'}
            </h3>
          </div>
          <button
            onClick={() => setActiveDeputyModal(null)}
            className="text-white/80 hover:text-white hover:bg-white/20 p-1.5 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          {/* Modal 1: Allocate Invigilators */}
          {activeDeputyModal === 'allocate' && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Allocate faculty from medical departments to active examination sessions for complete invigilation coverage.
              </p>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Target Session
                </label>
                <select className="w-full text-sm border border-gray-300 rounded-lg p-2.5 bg-gray-50 focus:ring-2 focus:ring-purple-600 focus:outline-hidden font-semibold text-gray-800">
                  <option>Practical – Physiology (Needs 2 invigilators)</option>
                  <option>Theory – FN Session (Fully Allocated)</option>
                  <option>Theory – AN Session (Fully Allocated)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Department Pool
                </label>
                <select className="w-full text-sm border border-gray-300 rounded-lg p-2.5 bg-gray-50 focus:ring-2 focus:ring-purple-600 focus:outline-hidden font-semibold text-gray-800">
                  <option>Department of Anatomy (14 Faculty Available)</option>
                  <option>Department of Biochemistry (12 Faculty Available)</option>
                  <option>Department of Pathology (18 Faculty Available)</option>
                  <option>Department of Pharmacology (16 Faculty Available)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Number of Invigilators to Allocate
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={allocCount}
                  onChange={(e) => setAllocCount(Number(e.target.value))}
                  className="w-full text-sm border border-gray-300 rounded-lg p-2.5 font-bold text-gray-900 focus:ring-2 focus:ring-purple-600 focus:outline-hidden"
                />
              </div>

              <div className="p-3 bg-purple-50 rounded-xl border border-purple-100 text-xs text-purple-900 font-medium">
                Allocating {allocCount} invigilators will fulfill 100% of required quotas for current examination cycles.
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setActiveDeputyModal(null)}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleAllocateInvigilators(allocCount)}
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-purple-700 to-purple-900 hover:from-purple-800 hover:to-purple-950 text-white text-sm font-bold shadow-md cursor-pointer"
                >
                  Confirm Allocation
                </button>
              </div>
            </div>
          )}

          {/* Modal 2: Generate Duty Roster */}
          {activeDeputyModal === 'roster' && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Review and dispatch final invigilation duty rosters across examination blocks.
              </p>

              <div className="border border-purple-100 rounded-xl overflow-hidden max-h-60 overflow-y-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-purple-50 text-purple-900 font-bold">
                    <tr>
                      <th className="py-2 px-3">Hall</th>
                      <th className="py-2 px-3">Invigilators</th>
                      <th className="py-2 px-3 text-center">Seats</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-100">
                    {dutyRoster.map((d, i) => (
                      <tr key={i} className="hover:bg-purple-50/50">
                        <td className="py-2 px-3 font-bold text-gray-800">{d.hallNo}</td>
                        <td className="py-2 px-3 font-semibold text-purple-950">{d.invigilators}</td>
                        <td className="py-2 px-3 text-center font-bold text-gray-700">{d.seats}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setActiveDeputyModal(null)}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleGenerateDutyRoster}
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white text-sm font-bold shadow-md cursor-pointer"
                >
                  Dispatch Roster (SMS/Email)
                </button>
              </div>
            </div>
          )}

          {/* Modal 3: Reallocate / Substitute */}
          {activeDeputyModal === 'substitute' && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Replace an invigilator unable to attend due to emergency or scheduling conflict.
              </p>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Examination Hall
                </label>
                <select
                  value={selectedHall}
                  onChange={(e) => setSelectedHall(e.target.value)}
                  className="w-full text-sm border border-gray-300 rounded-lg p-2.5 bg-gray-50 focus:ring-2 focus:ring-purple-600 focus:outline-hidden font-semibold text-gray-800"
                >
                  <option value="Hall 1">Hall 1 (Dr. A. Kumar, Dr. S. Meena)</option>
                  <option value="Hall 2">Hall 2 (Dr. P. Rao, Dr. N. Shree)</option>
                  <option value="Hall 3">Hall 3 (Dr. R. Kiran, Dr. V. Latha)</option>
                  <option value="Hall 4">Hall 4 (Dr. M. Arun, Dr. K. Devi)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Substitute Faculty
                </label>
                <input
                  type="text"
                  value={substituteFaculty}
                  onChange={(e) => setSubstituteFaculty(e.target.value)}
                  className="w-full text-sm border border-gray-300 rounded-lg p-2.5 font-bold text-gray-900 focus:ring-2 focus:ring-purple-600 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Reason for Substitution
                </label>
                <select className="w-full text-sm border border-gray-300 rounded-lg p-2.5 bg-gray-50 focus:ring-2 focus:ring-purple-600 focus:outline-hidden font-semibold text-gray-800">
                  <option>Medical Emergency / Unforeseen Leave</option>
                  <option>Administrative Duty Overlap</option>
                  <option>External Examiner Conflict of Interest</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setActiveDeputyModal(null)}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleSubstituteInvigilator(selectedHall, substituteFaculty)}
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-orange-600 to-orange-800 hover:from-orange-700 hover:to-orange-900 text-white text-sm font-bold shadow-md cursor-pointer"
                >
                  Apply Substitution
                </button>
              </div>
            </div>
          )}

          {/* Modal 4: Mark Attendance */}
          {activeDeputyModal === 'attendance' && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Log morning session physical presence and biometric verification for assigned invigilators.
              </p>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Verified Present Invigilators (Out of 68)
                </label>
                <input
                  type="number"
                  min="0"
                  max="68"
                  value={attendanceCount}
                  onChange={(e) => setAttendanceCount(Number(e.target.value))}
                  className="w-full text-sm border border-gray-300 rounded-lg p-2.5 font-bold text-gray-900 focus:ring-2 focus:ring-purple-600 focus:outline-hidden"
                />
              </div>

              <div className="p-3 bg-green-50 rounded-xl border border-green-200 text-xs text-green-900 font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                <span>All biometric check-ins match Chief Superintendent room roster.</span>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setActiveDeputyModal(null)}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleMarkAttendance(attendanceCount)}
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 text-white text-sm font-bold shadow-md cursor-pointer"
                >
                  Record Attendance
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

