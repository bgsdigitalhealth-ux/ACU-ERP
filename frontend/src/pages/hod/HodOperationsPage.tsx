import React, { useState } from 'react';
import { UserPlus, FlaskConical, Plus } from 'lucide-react';
import { useHod } from '../../context/HodContext';
import { ELIGIBLE_FACULTY_LIST } from '../../data/hodData';

interface Props {
  initialSubTab?: 'exam-schedule' | 'examiner-nomination' | 'practical-viva-details';
}

export const HodOperationsPage: React.FC<Props> = ({ initialSubTab = 'exam-schedule' }) => {
  const [activeSubTab, setActiveSubTab] = useState(initialSubTab);
  const { filters, setActiveQuickModal } = useHod();

  return (
    <div className="p-4 sm:p-6 space-y-5 bg-[#f8f9fe] min-h-screen">
      {/* Title & Sub-tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-purple-200/80 shadow-2xs">
        <div>
          <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">Department Operations</span>
          <h2 className="text-xl font-extrabold text-[#2a084e]">Examination Operations — {filters.subject}</h2>
        </div>

        <div className="flex flex-wrap gap-1.5 bg-purple-50 p-1.5 rounded-xl border border-purple-200">
          <button
            onClick={() => setActiveSubTab('exam-schedule')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === 'exam-schedule'
                ? 'bg-[#4B087B] text-white shadow-xs'
                : 'text-purple-900 hover:bg-purple-100'
            }`}
          >
            Exam Schedule
          </button>
          <button
            onClick={() => setActiveSubTab('examiner-nomination')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === 'examiner-nomination'
                ? 'bg-[#4B087B] text-white shadow-xs'
                : 'text-purple-900 hover:bg-purple-100'
            }`}
          >
            Examiner Nomination
          </button>
          <button
            onClick={() => setActiveSubTab('practical-viva-details')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === 'practical-viva-details'
                ? 'bg-[#4B087B] text-white shadow-xs'
                : 'text-purple-900 hover:bg-purple-100'
            }`}
          >
            Practical / Viva Details
          </button>
        </div>
      </div>

      {/* Tab 1: Exam Schedule */}
      {activeSubTab === 'exam-schedule' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-800">Department Exam Schedule & Hall Allocations</h3>
            <button
              onClick={() => setActiveQuickModal('schedule')}
              className="px-3.5 py-1.5 bg-[#4B087B] text-white rounded-xl text-xs font-bold hover:bg-[#380665] flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Propose New Schedule</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-purple-200 overflow-hidden shadow-2xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#4B087B] text-white font-bold">
                <tr>
                  <th className="py-3 px-4">Date & Time</th>
                  <th className="py-3 px-4">Subject & Paper</th>
                  <th className="py-3 px-4">Exam Type</th>
                  <th className="py-3 px-4">Venue</th>
                  <th className="py-3 px-4">Candidates</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-100">
                <tr className="hover:bg-purple-50/50">
                  <td className="py-3 px-4 font-semibold text-gray-800">18 Mar 2025 • 09:30 AM - 12:30 PM</td>
                  <td className="py-3 px-4 font-bold text-purple-900">Physiology – Theory Paper I</td>
                  <td className="py-3 px-4"><span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold text-[10px]">Theory</span></td>
                  <td className="py-3 px-4 text-gray-600">Exam Hall 1 (Ground Floor)</td>
                  <td className="py-3 px-4 font-bold text-gray-800">150 Students</td>
                  <td className="py-3 px-4"><span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">Approved</span></td>
                </tr>
                <tr className="hover:bg-purple-50/50">
                  <td className="py-3 px-4 font-semibold text-gray-800">20 Mar 2025 • 09:30 AM - 12:30 PM</td>
                  <td className="py-3 px-4 font-bold text-purple-900">Physiology – Theory Paper II</td>
                  <td className="py-3 px-4"><span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold text-[10px]">Theory</span></td>
                  <td className="py-3 px-4 text-gray-600">Exam Hall 1 (Ground Floor)</td>
                  <td className="py-3 px-4 font-bold text-gray-800">150 Students</td>
                  <td className="py-3 px-4"><span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">Approved</span></td>
                </tr>
                <tr className="hover:bg-purple-50/50">
                  <td className="py-3 px-4 font-semibold text-gray-800">24 Mar 2025 • 09:00 AM - 04:30 PM</td>
                  <td className="py-3 px-4 font-bold text-purple-900">Physiology – Practical & Viva (Batch A)</td>
                  <td className="py-3 px-4"><span className="px-2 py-0.5 rounded bg-pink-100 text-pink-800 font-bold text-[10px]">Practical</span></td>
                  <td className="py-3 px-4 text-gray-600">Physiology Lab 1 & 2</td>
                  <td className="py-3 px-4 font-bold text-gray-800">50 Students</td>
                  <td className="py-3 px-4"><span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-[10px]">Scheduled</span></td>
                </tr>
                <tr className="hover:bg-purple-50/50">
                  <td className="py-3 px-4 font-semibold text-gray-800">25 Mar 2025 • 09:00 AM - 04:30 PM</td>
                  <td className="py-3 px-4 font-bold text-purple-900">Physiology – Practical & Viva (Batch B)</td>
                  <td className="py-3 px-4"><span className="px-2 py-0.5 rounded bg-pink-100 text-pink-800 font-bold text-[10px]">Practical</span></td>
                  <td className="py-3 px-4 text-gray-600">Physiology Lab 1 & 2</td>
                  <td className="py-3 px-4 font-bold text-gray-800">50 Students</td>
                  <td className="py-3 px-4"><span className="px-2.5 py-1 rounded-full bg-purple-100 text-purple-900 font-bold text-[10px]">Pending Examiners</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Examiner Nomination */}
      {activeSubTab === 'examiner-nomination' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-800">Empanelled Department Faculty & Examiners</h3>
            <button
              onClick={() => setActiveQuickModal('nominate')}
              className="px-3.5 py-1.5 bg-[#4B087B] text-white rounded-xl text-xs font-bold hover:bg-[#380665] flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>Nominate Examiners Panel</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {ELIGIBLE_FACULTY_LIST.map((fac, idx) => (
              <div key={idx} className="bg-white p-4 rounded-2xl border border-purple-200/80 shadow-2xs space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">{fac.name}</h4>
                    <p className="text-[11px] text-purple-700 font-semibold">{fac.designation}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                    Eligible
                  </span>
                </div>
                <div className="text-[11px] text-gray-500 pt-1 border-t border-gray-100 space-y-0.5">
                  <p>Specialization: <span className="font-semibold text-gray-700">{fac.specialization}</span></p>
                  <p>Teaching Experience: <span className="font-semibold text-gray-700">{fac.experience}</span></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Practical / Viva Details */}
      {activeSubTab === 'practical-viva-details' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-800">Practical Examination & OSCE / OSPE Stations</h3>
            <button
              onClick={() => setActiveQuickModal('practical')}
              className="px-3.5 py-1.5 bg-[#db2777] text-white rounded-xl text-xs font-bold hover:bg-[#be185d] flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <FlaskConical className="w-4 h-4" />
              <span>Edit Stations & Rubrics</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-pink-200 shadow-2xs space-y-2">
              <span className="px-2.5 py-0.5 rounded-full bg-pink-100 text-pink-900 text-[10px] font-bold">Station 1</span>
              <h4 className="font-extrabold text-xs text-gray-900">Hematology Practical</h4>
              <p className="text-[11px] text-gray-600">Blood smear staining, differential leukocyte count, and hemoglobinometry testing.</p>
              <div className="pt-2 text-[10px] font-bold text-pink-700">Lab: Physiology Lab 1 • Max Marks: 20</div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-pink-200 shadow-2xs space-y-2">
              <span className="px-2.5 py-0.5 rounded-full bg-pink-100 text-pink-900 text-[10px] font-bold">Station 2</span>
              <h4 className="font-extrabold text-xs text-gray-900">Human Physiology & ECG</h4>
              <p className="text-[11px] text-gray-600">Recording and interpretation of human normal and abnormal 12-lead ECG traces, spirometry.</p>
              <div className="pt-2 text-[10px] font-bold text-pink-700">Lab: Physiology Lab 2 • Max Marks: 20</div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-pink-200 shadow-2xs space-y-2">
              <span className="px-2.5 py-0.5 rounded-full bg-pink-100 text-pink-900 text-[10px] font-bold">Station 3</span>
              <h4 className="font-extrabold text-xs text-gray-900">Clinical Examination & Viva</h4>
              <p className="text-[11px] text-gray-600">Cardiovascular and respiratory clinical examination on simulated subject, oral viva voce.</p>
              <div className="pt-2 text-[10px] font-bold text-pink-700">Lab: Clinical Seminar Room • Max Marks: 30</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
