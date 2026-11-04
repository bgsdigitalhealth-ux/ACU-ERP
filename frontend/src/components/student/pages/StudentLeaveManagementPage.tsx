import React, { useState } from 'react';
import {
  Upload,
  CheckCircle2,
  Home,
  BarChart2,
  KeyRound,
  FileCheck,
} from 'lucide-react';
import { useStudent } from '../../../context/StudentContext';

export const StudentLeaveManagementPage: React.FC = () => {
  const { profile, activeSubmenu, navigate, leaveApplications, submitLeave } = useStudent();
  const [leaveType, setLeaveType] = useState('');
  const [dayType, setDayType] = useState<'Single' | 'Multi'>('Single');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [selectedSessions, setSelectedSessions] = useState<{ [hour: number]: boolean }>({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
  });
  const [leaveReason, setLeaveReason] = useState('');
  const [leaveDesc, setLeaveDesc] = useState('');
  const [toastMsg, setToastMsg] = useState('');

  const toggleSession = (hour: number) => {
    setSelectedSessions((prev) => ({ ...prev, [hour]: !prev[hour] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leaveType) {
      alert('Please select Leave Type');
      return;
    }

    const hours = Object.entries(selectedSessions)
      .filter(([_, checked]) => checked)
      .map(([hour]) => Number(hour));

    submitLeave({
      leaveType: leaveType as any,
      dayType,
      fromDate: fromDate || new Date().toISOString().split('T')[0],
      toDate: dayType === 'Multi' ? toDate : fromDate,
      sessions: hours.length > 0 ? hours : [1, 2, 3, 4],
      reason: leaveReason,
      description: leaveDesc,
      attachmentName: 'Leave_Supporting_Document.pdf',
    });

    setToastMsg('Leave application submitted successfully for Head of Department approval!');
    setLeaveReason('');
    setLeaveDesc('');
    setTimeout(() => setToastMsg(''), 4000);
  };

  return (
    <div className="space-y-4">
      {/* Top Blue Header matching Page 32 */}
      <div className="bg-[#1b75bb] text-white rounded-lg px-4 py-2.5 flex items-center justify-between shadow-2xs">
        <span className="text-xs sm:text-sm font-bold tracking-wide">
          Adichunchanagiri University, B.G. Nagara
        </span>
        <div className="flex items-center gap-4 text-xs font-semibold">
          <button
            onClick={() => navigate('home', 'my-courses')}
            className="flex items-center gap-1 hover:underline cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
          <button
            onClick={() => navigate('outcomes', 'student-performance')}
            className="flex items-center gap-1 hover:underline cursor-pointer"
          >
            <BarChart2 className="w-3.5 h-3.5" />
            <span>My performance</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sub-Sidebar matching Page 32 */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-2xs">
            <div className="bg-[#337ab7] text-white px-4 py-2 text-xs font-bold uppercase tracking-wider">
              Profile Settings
            </div>
            <div className="divide-y divide-gray-100 text-xs">
              <button
                onClick={() => navigate('profile', 'my-profile')}
                className="w-full text-left px-4 py-2.5 text-gray-700 hover:bg-gray-50 flex items-center gap-2 cursor-pointer"
              >
                <span>My profile</span>
              </button>
              <button
                onClick={() => navigate('profile', 'change-password')}
                className="w-full text-left px-4 py-2.5 text-gray-700 hover:bg-gray-50 flex items-center gap-2 cursor-pointer"
              >
                <KeyRound className="w-3.5 h-3.5 text-gray-400" />
                <span>Change password</span>
              </button>
            </div>

            <div className="bg-[#337ab7] text-white px-4 py-2 text-xs font-bold uppercase tracking-wider">
              Leave Management
            </div>
            <div className="divide-y divide-gray-100 text-xs">
              <button
                onClick={() => navigate('leave', 'apply-leave')}
                className={`w-full text-left px-4 py-2.5 font-bold flex items-center gap-2 cursor-pointer ${
                  activeSubmenu === 'apply-leave'
                    ? 'text-[#337ab7] bg-blue-50/50'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="text-blue-600">▸</span>
                <span>Apply For Leave</span>
              </button>
              <button
                onClick={() => navigate('leave', 'applied-leaves')}
                className={`w-full text-left px-4 py-2.5 font-bold flex items-center gap-2 cursor-pointer ${
                  activeSubmenu === 'applied-leaves'
                    ? 'text-[#337ab7] bg-blue-50/50'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span>Applied Leave(s)</span>
              </button>
              <button
                onClick={() => navigate('surveys', 'course-survey')}
                className="w-full text-left px-4 py-2.5 text-gray-700 hover:bg-gray-50 flex items-center gap-2 cursor-pointer"
              >
                <FileCheck className="w-3.5 h-3.5 text-gray-400" />
                <span>Evaluation</span>
              </button>
            </div>
          </div>

          {/* Student Photo Card */}
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-2xs flex flex-col items-center text-center">
            <div className="w-36 h-44 rounded-lg overflow-hidden border-2 border-gray-200 shadow-inner mb-2 bg-gray-100 flex items-center justify-center">
              <img
                src={profile.photoUrl || '/student/haribhushan_photo.jpg'}
                alt={profile.fullName}
                className="w-full h-full object-cover"
              />
            </div>
            <h4 className="text-xs font-extrabold text-gray-900">{profile.fullName}</h4>
            <p className="text-[10px] text-gray-500 font-medium">Roll: {profile.rollNo}</p>
          </div>
        </div>

        {/* Right Form: LEAVE APPLICATION matching Page 32 */}
        <div className="lg:col-span-9 bg-white rounded-xl p-5 sm:p-6 border border-gray-200 shadow-2xs space-y-6">
          <div className="border-b border-gray-200 pb-2">
            <h2 className="text-xs sm:text-sm font-extrabold text-gray-900 uppercase tracking-wide">
              {activeSubmenu === 'applied-leaves' ? 'APPLIED LEAVE(S) STATUS' : 'LEAVE APPLICATION'}
            </h2>
          </div>

          {toastMsg && (
            <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{toastMsg}</span>
            </div>
          )}

          {activeSubmenu === 'apply-leave' ? (
            <form onSubmit={handleSubmit} className="space-y-5 text-xs text-gray-700">
              {/* General Instructions matching Page 32 */}
              <div className="bg-gray-50 rounded-lg p-3.5 border border-gray-200 space-y-1 text-gray-600 text-[11px]">
                <div className="font-bold text-gray-800 mb-0.5">General Instructions</div>
                <p>1. Students should complete the application process with utmost care.</p>
                <p>2. If the availed Medical leave days include Sunday/Holidays, the Medical leave should be applied in two different applications excluding the holidays.</p>
                <p>3. Student can only apply for Medical Leaves only if course wise attendance has 65%.</p>
              </div>

              {/* Leave Type */}
              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2">
                <label className="font-bold text-gray-700">
                  LEAVE TYPE<span className="text-red-500">*</span>
                </label>
                <div className="sm:col-span-3">
                  <select
                    required
                    value={leaveType}
                    onChange={(e) => setLeaveType(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded p-2 text-xs outline-hidden focus:border-[#7047eb]"
                  >
                    <option value="">Select</option>
                    <option value="Medical Leave">Medical Leave</option>
                    <option value="Duty Leave">Duty Leave</option>
                    <option value="Casual Leave">Casual Leave</option>
                    <option value="Family Emergency">Family Emergency</option>
                  </select>
                </div>
              </div>

              {/* Day Radio */}
              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2">
                <label className="font-bold text-gray-700">DAY</label>
                <div className="sm:col-span-3 flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer font-bold">
                    <input
                      type="radio"
                      name="day"
                      checked={dayType === 'Single'}
                      onChange={() => setDayType('Single')}
                      className="text-purple-600"
                    />
                    <span>Single</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer font-bold">
                    <input
                      type="radio"
                      name="day"
                      checked={dayType === 'Multi'}
                      onChange={() => setDayType('Multi')}
                      className="text-purple-600"
                    />
                    <span>Multi</span>
                  </label>
                </div>
              </div>

              {/* Leave On */}
              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2">
                <label className="font-bold text-gray-700">
                  LEAVE ON<span className="text-red-500">*</span>
                </label>
                <div className="sm:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="date"
                    required
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    placeholder="From Date"
                    className="w-full bg-white border border-gray-300 rounded p-2 text-xs outline-hidden focus:border-[#7047eb]"
                  />
                  {dayType === 'Multi' && (
                    <input
                      type="date"
                      required
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                      placeholder="To Date"
                      className="w-full bg-white border border-gray-300 rounded p-2 text-xs outline-hidden focus:border-[#7047eb]"
                    />
                  )}
                </div>
              </div>

              {/* Session Hours */}
              <div className="grid grid-cols-1 sm:grid-cols-4 items-start gap-2">
                <label className="font-bold text-gray-700 pt-1">
                  SESSION<span className="text-red-500">*</span>
                </label>
                <div className="sm:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((h) => (
                    <label
                      key={h}
                      className="flex items-center gap-2 p-1.5 rounded border border-gray-200 bg-gray-50 hover:bg-gray-100 cursor-pointer text-[11px]"
                    >
                      <input
                        type="checkbox"
                        checked={!!selectedSessions[h]}
                        onChange={() => toggleSession(h)}
                        className="rounded text-purple-600"
                      />
                      <span>{h}th Hour</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Reason */}
              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2">
                <label className="font-bold text-gray-700">
                  LEAVE REASON<span className="text-red-500">*</span>
                </label>
                <div className="sm:col-span-3">
                  <input
                    type="text"
                    required
                    value={leaveReason}
                    onChange={(e) => setLeaveReason(e.target.value)}
                    placeholder="Brief reason for leave request"
                    className="w-full bg-white border border-gray-300 rounded p-2 text-xs outline-hidden focus:border-[#7047eb]"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="grid grid-cols-1 sm:grid-cols-4 items-start gap-2">
                <label className="font-bold text-gray-700 pt-1">
                  LEAVE DESCRIPTION<span className="text-red-500">*</span>
                </label>
                <div className="sm:col-span-3 space-y-1">
                  <textarea
                    rows={3}
                    required
                    maxLength={500}
                    value={leaveDesc}
                    onChange={(e) => setLeaveDesc(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded p-2 text-xs outline-hidden focus:border-[#7047eb]"
                  />
                  <div className="text-[10px] text-gray-400 text-right">
                    You have {500 - leaveDesc.length} chars left
                  </div>
                </div>
              </div>

              {/* Attachment */}
              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2">
                <div className="font-bold text-gray-700">
                  <div>ATTACHMENT</div>
                  <div className="text-[10px] text-gray-400 font-normal">supported format(s):pdf upload limit 1MB</div>
                </div>
                <div className="sm:col-span-3">
                  <label className="px-4 py-1.5 rounded border border-gray-300 bg-gray-50 hover:bg-gray-100 text-xs font-bold text-gray-700 cursor-pointer inline-flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload</span>
                    <input type="file" accept=".pdf" className="hidden" />
                  </label>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-200 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2 rounded bg-[#337ab7] hover:bg-[#286090] text-white text-xs font-bold cursor-pointer transition-colors shadow-xs"
                >
                  Submit
                </button>
              </div>
            </form>
          ) : (
            /* Applied Leave(s) History Table */
            <div className="overflow-x-auto border border-gray-200 rounded-lg">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 font-extrabold border-b border-gray-200 uppercase text-[11px]">
                    <th className="p-3">APPLIED ON</th>
                    <th className="p-3">LEAVE TYPE</th>
                    <th className="p-3">DURATION</th>
                    <th className="p-3">REASON</th>
                    <th className="p-3">SESSIONS</th>
                    <th className="p-3 text-center">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {leaveApplications.map((l) => (
                    <tr key={l.id} className="hover:bg-gray-50">
                      <td className="p-3 font-semibold text-gray-800">{l.appliedOn}</td>
                      <td className="p-3 font-bold text-purple-700">{l.leaveType}</td>
                      <td className="p-3 text-gray-700">
                        {l.fromDate} {l.toDate && l.toDate !== l.fromDate ? `to ${l.toDate}` : ''}
                      </td>
                      <td className="p-3 text-gray-900 font-medium max-w-xs">{l.reason}</td>
                      <td className="p-3 text-gray-500">
                        {l.sessions.map((s) => `${s}h`).join(', ')}
                      </td>
                      <td className="p-3 text-center">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            l.status === 'Approved'
                              ? 'bg-emerald-100 text-emerald-800'
                              : l.status === 'Rejected'
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {l.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
