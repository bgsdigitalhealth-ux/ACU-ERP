import React, { useState } from 'react';
import { Printer, Search, RotateCcw, X } from 'lucide-react';
import { useStudent } from '../../../context/StudentContext';
import {
  PROGRAM_OUTCOMES_LIST,
  COURSE_OUTCOMES_LIST,
  STUDENT_PO_SCORES,
} from '../../../data/studentMockData';
import { CourseOutcomeItem } from '../../../types/student';

export const StudentLearningOutcomesPage: React.FC = () => {
  const { activeSubmenu, profile } = useStudent();
  const [selectedTerm, setSelectedTerm] = useState('S4');
  const [poReportTab, setPoReportTab] = useState<'po' | 'overall'>('po');
  const [activeCoDetail, setActiveCoDetail] = useState<CourseOutcomeItem | null>(null);

  return (
    <div className="space-y-4">
      {/* Breadcrumb matching Pages 28, 29, 30 */}
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        {activeSubmenu === 'program-outcomes'
          ? 'PROGRAM OUTCOMES'
          : activeSubmenu === 'course-outcomes'
          ? 'COURSE OUTCOMES'
          : 'LEARNING OUTCOMES > STUDENT PERFORMANCE OUTCOMES'}
      </div>

      {/* PAGE 28: PROGRAM OUTCOMES */}
      {activeSubmenu === 'program-outcomes' && (
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-2xs space-y-6">
          <div className="text-center space-y-1 border-b border-gray-100 pb-4">
            <img
              src="/roles/acu-logo.png"
              alt="ACU Logo"
              className="w-12 h-12 mx-auto object-contain mb-1"
            />
            <h2 className="text-base sm:text-lg font-black text-gray-900">
              Adichunchanagiri University, B.G. Nagara
            </h2>
            <p className="text-xs text-gray-500">
              Adichunchanagiri Institute of Medical Sciences (AIMS) • Bachelor of Medicine &amp; Bachelor of Surgery (MBBS)
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <div className="text-xs font-black text-gray-900 tracking-wider">VISION</div>
              <p className="text-xs text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-200 leading-relaxed">
                To evolve into a centre of excellence in medical education, compassionate healthcare delivery, and biomedical research that produces exemplary Indian Medical Graduates (IMGs) who serve society with utmost empathy and clinical acumen.
              </p>
            </div>

            <div className="space-y-1">
              <div className="text-xs font-black text-gray-900 tracking-wider">MISSION</div>
              <p className="text-xs text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-200 leading-relaxed">
                Provide competency-based medical education aligned with NMC GMER regulations, foster early clinical exposure and research inquiry, and cultivate ethical healthcare leaders committed to lifelong learning and preventive health advocacy.
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-black text-gray-900 uppercase tracking-wider">
              PROGRAM OUTCOMES
            </h3>

            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-100/80 text-gray-700 font-extrabold border-b border-gray-200 uppercase text-[11px]">
                    <th className="p-3 w-20">CODE</th>
                    <th className="p-3 w-64">NAME</th>
                    <th className="p-3">DESCRIPTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {PROGRAM_OUTCOMES_LIST.map((po) => (
                    <tr key={po.code} className="hover:bg-purple-50/20">
                      <td className="p-3 font-bold text-purple-700">{po.code}</td>
                      <td className="p-3 font-bold text-gray-900">{po.name}</td>
                      <td className="p-3 text-gray-600 leading-relaxed">{po.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* PAGE 29: COURSE OUTCOMES */}
      {activeSubmenu === 'course-outcomes' && (
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-gray-100 pb-3">
            <div className="max-w-xs w-full">
              <label className="block text-xs font-bold text-gray-700 mb-1">Terms</label>
              <input
                type="text"
                value={selectedTerm}
                onChange={(e) => setSelectedTerm(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-800 outline-hidden focus:border-[#7047eb]"
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSelectedTerm('S4')}
                className="px-4 py-1.5 rounded-md border border-gray-300 hover:bg-gray-100 text-xs font-bold text-gray-700 flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-gray-500" />
                <span>Reset</span>
              </button>
              <button
                type="button"
                className="px-5 py-1.5 rounded-md bg-[#7047eb] hover:bg-[#5b32d6] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search</span>
              </button>
            </div>
          </div>

          <div className="text-center space-y-0.5 py-1">
            <h3 className="text-sm font-black text-gray-900">
              Adichunchanagiri University, B.G. Nagara
            </h3>
            <p className="text-[11px] text-gray-500">
              B.G. Nagara, Mandya, Karnataka 571448
            </p>
          </div>

          <div className="overflow-x-auto border border-gray-200 rounded-lg">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700 font-extrabold border-b border-gray-200 uppercase text-[11px]">
                  <th className="p-3">SEMESTER</th>
                  <th className="p-3">COURSE</th>
                  <th className="p-3">CO NAME</th>
                  <th className="p-3">CO CODE</th>
                  <th className="p-3">DESCRIPTION</th>
                  <th className="p-3 text-center">DETAILS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {COURSE_OUTCOMES_LIST.map((co, idx) => (
                  <tr key={idx} className="hover:bg-purple-50/20">
                    <td className="p-3 font-bold text-purple-700">{co.semester}</td>
                    <td className="p-3 font-bold text-gray-900">{co.course}</td>
                    <td className="p-3 font-semibold text-gray-800">{co.coName}</td>
                    <td className="p-3 font-semibold text-gray-800">{co.coCode}</td>
                    <td className="p-3 text-gray-600 leading-relaxed max-w-md">{co.description}</td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => setActiveCoDetail(co)}
                        className="px-3 py-1 rounded bg-[#337ab7] hover:bg-[#286090] text-white text-xs font-bold transition-colors cursor-pointer"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* PAGE 30: STUDENT PERFORMANCE OUTCOMES */}
      {activeSubmenu === 'student-performance' && (
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
            <h2 className="text-xs sm:text-sm font-extrabold text-gray-900 uppercase tracking-wide">
              STUDENT PO PERFORMANCE REPORT
            </h2>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#7047eb] hover:bg-[#5b32d6] text-white text-xs font-bold cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setPoReportTab('po')}
              className={`px-4 py-1.5 rounded text-xs font-bold transition-all cursor-pointer ${
                poReportTab === 'po'
                  ? 'border-b-2 border-red-500 text-red-600 font-black'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              STUDENT PO PERFORMANCE REPORT
            </button>
            <button
              onClick={() => setPoReportTab('overall')}
              className={`px-4 py-1.5 rounded text-xs font-bold transition-all cursor-pointer ${
                poReportTab === 'overall'
                  ? 'border-b-2 border-red-500 text-red-600 font-black'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              STUDENT OVERALL OUTCOME REPORT
            </button>
          </div>

          <div className="text-right text-xs font-bold text-gray-700">
            {profile.batchSection}
          </div>

          <div className="overflow-x-auto border border-gray-200 rounded-lg">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-gray-100/80 text-gray-700 font-extrabold border-b border-gray-200 text-[10px] uppercase">
                  <th className="p-2">SL No.</th>
                  <th className="p-2">Roll No.</th>
                  <th className="p-2">Reg No.</th>
                  <th className="p-2 min-w-[140px]">Student Name</th>
                  <th className="p-2 text-center">PO1</th>
                  <th className="p-2 text-center">PO2</th>
                  <th className="p-2 text-center">PO3</th>
                  <th className="p-2 text-center">PO4</th>
                  <th className="p-2 text-center">PO5</th>
                  <th className="p-2 text-center">PO6</th>
                  <th className="p-2 text-center">PO7</th>
                  <th className="p-2 text-center">PO8</th>
                  <th className="p-2 text-center">PO9</th>
                  <th className="p-2 text-center">PO10</th>
                  <th className="p-2 text-center">PO11</th>
                  <th className="p-2 text-center">PO12</th>
                  <th className="p-2 text-center">PSO1</th>
                  <th className="p-2 text-center">PSO2</th>
                  <th className="p-2 text-center">PSO3</th>
                  <th className="p-2 text-center">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {STUDENT_PO_SCORES.map((st) => (
                  <tr key={st.slNo} className="hover:bg-purple-50/20 font-medium">
                    <td className="p-2 text-gray-500 font-bold">{st.slNo}</td>
                    <td className="p-2 font-mono text-purple-700 font-bold">{st.rollNo}</td>
                    <td className="p-2 font-mono text-gray-700">{st.regNo}</td>
                    <td className="p-2 font-black text-gray-900">{st.studentName}</td>
                    <td className="p-2 text-center">{st.poScores.PO1}</td>
                    <td className="p-2 text-center">{st.poScores.PO2}</td>
                    <td className="p-2 text-center">{st.poScores.PO3}</td>
                    <td className="p-2 text-center">{st.poScores.PO4}</td>
                    <td className="p-2 text-center">{st.poScores.PO5}</td>
                    <td className="p-2 text-center">{st.poScores.PO6}</td>
                    <td className="p-2 text-center">{st.poScores.PO7}</td>
                    <td className="p-2 text-center">{st.poScores.PO8}</td>
                    <td className="p-2 text-center">{st.poScores.PO9}</td>
                    <td className="p-2 text-center">{st.poScores.PO10}</td>
                    <td className="p-2 text-center">{st.poScores.PO11}</td>
                    <td className="p-2 text-center">{st.poScores.PO12}</td>
                    <td className="p-2 text-center font-bold text-purple-700">{st.poScores.PSO1}</td>
                    <td className="p-2 text-center font-bold text-purple-700">{st.poScores.PSO2}</td>
                    <td className="p-2 text-center font-bold text-purple-700">{st.poScores.PSO3}</td>
                    <td className="p-2 text-center">
                      <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 inline-flex items-center justify-center font-mono font-bold text-xs cursor-pointer">
                        i
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CO Details Popup */}
      {activeCoDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 border border-gray-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-sm font-extrabold text-gray-900">
                Course Outcome Details ({activeCoDetail.coCode})
              </h3>
              <button
                onClick={() => setActiveCoDetail(null)}
                className="w-7 h-7 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2 text-xs">
              <div><span className="font-bold text-gray-500">Course:</span> <span className="font-bold text-gray-900">{activeCoDetail.course}</span></div>
              <div><span className="font-bold text-gray-500">Semester:</span> <span className="font-bold text-purple-700">{activeCoDetail.semester}</span></div>
              <div className="pt-1">
                <span className="font-bold text-gray-500">Description:</span>
                <p className="mt-1 p-2.5 bg-gray-50 rounded border border-gray-200 text-gray-700 leading-relaxed">
                  {activeCoDetail.description}
                </p>
              </div>
            </div>
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setActiveCoDetail(null)}
                className="px-4 py-1.5 rounded-lg bg-gray-800 text-white font-bold text-xs"
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
