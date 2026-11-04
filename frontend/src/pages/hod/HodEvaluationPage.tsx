import React, { useState } from 'react';
import { FileSearch, UploadCloud, CheckCircle } from 'lucide-react';
import { useHod } from '../../context/HodContext';
import { SAMPLE_MARKS_DATA } from '../../data/hodData';

interface Props {
  initialSubTab?: 'qp-review' | 'internal-assessment' | 'marks-verification';
}

export const HodEvaluationPage: React.FC<Props> = ({ initialSubTab = 'qp-review' }) => {
  const [activeSubTab, setActiveSubTab] = useState(initialSubTab);
  const { filters, setActiveQuickModal } = useHod();

  return (
    <div className="p-4 sm:p-6 space-y-5 bg-[#f8f9fe] min-h-screen">
      {/* Title & Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-purple-200/80 shadow-2xs">
        <div>
          <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">Evaluation & Grading</span>
          <h2 className="text-xl font-extrabold text-[#2a084e]">Evaluation Management — {filters.subject}</h2>
        </div>

        <div className="flex flex-wrap gap-1.5 bg-purple-50 p-1.5 rounded-xl border border-purple-200">
          <button
            onClick={() => setActiveSubTab('qp-review')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === 'qp-review'
                ? 'bg-[#4B087B] text-white shadow-xs'
                : 'text-purple-900 hover:bg-purple-100'
            }`}
          >
            QP Review
          </button>
          <button
            onClick={() => setActiveSubTab('internal-assessment')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === 'internal-assessment'
                ? 'bg-[#4B087B] text-white shadow-xs'
                : 'text-purple-900 hover:bg-purple-100'
            }`}
          >
            Internal Assessment
          </button>
          <button
            onClick={() => setActiveSubTab('marks-verification')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === 'marks-verification'
                ? 'bg-[#4B087B] text-white shadow-xs'
                : 'text-purple-900 hover:bg-purple-100'
            }`}
          >
            Marks Verification
          </button>
        </div>
      </div>

      {/* Tab 1: Question Paper Review */}
      {activeSubTab === 'qp-review' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-800">Department Question Paper Scrutiny & Moderation</h3>
            <button
              onClick={() => setActiveQuickModal('review')}
              className="px-3.5 py-1.5 bg-[#ea580c] text-white rounded-xl text-xs font-bold hover:bg-[#c2410c] flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <FileSearch className="w-4 h-4" />
              <span>Scrutinize Pending QP</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-purple-200/80 shadow-2xs space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-900 text-[10px] font-bold">PHY-101</span>
                  <h4 className="text-sm font-bold text-gray-900 mt-1">Physiology — Theory Paper I</h4>
                  <p className="text-xs text-gray-500">General Physiology, Blood, Nerve & Muscle, CVS</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  Approved & Sealed
                </span>
              </div>
              <div className="text-xs text-gray-600 bg-gray-50 p-2.5 rounded-xl border border-gray-100 space-y-1">
                <p>Scrutinizer: <strong>Dr. Ranjan Kumar (HOD)</strong></p>
                <p>Max Marks: 100 • 3 Hours • Blueprint 100% compliant</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-purple-200/80 shadow-2xs space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-900 text-[10px] font-bold">PHY-102</span>
                  <h4 className="text-sm font-bold text-gray-900 mt-1">Physiology — Theory Paper II</h4>
                  <p className="text-xs text-gray-500">Respiration, Renal, Endocrine, Reproduction, CNS</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold">
                  Under Scrutiny
                </span>
              </div>
              <div className="text-xs text-gray-600 bg-gray-50 p-2.5 rounded-xl border border-gray-100 space-y-1">
                <p>Setter: Confidential University Setter Panel</p>
                <p>Action: HOD Moderation pending verification of Q5 diagram</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2 & 3: Internal Assessment & Marks Verification */}
      {(activeSubTab === 'internal-assessment' || activeSubTab === 'marks-verification') && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-800">Continuous Internal Assessment & Verification Grid</h3>
            <button
              onClick={() => setActiveQuickModal('upload')}
              className="px-3.5 py-1.5 bg-[#059669] text-white rounded-xl text-xs font-bold hover:bg-[#047857] flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <UploadCloud className="w-4 h-4" />
              <span>Verify & Upload Scores</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-purple-200 overflow-hidden shadow-2xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#4B087B] text-white font-bold">
                <tr>
                  <th className="py-3 px-4">Register No</th>
                  <th className="py-3 px-4">Student Name</th>
                  <th className="py-3 px-4">Internal (30)</th>
                  <th className="py-3 px-4">Practical (40)</th>
                  <th className="py-3 px-4">Total (70)</th>
                  <th className="py-3 px-4">Attendance</th>
                  <th className="py-3 px-4">HOD Assent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-100">
                {SAMPLE_MARKS_DATA.map((row, idx) => (
                  <tr key={idx} className="hover:bg-purple-50/50">
                    <td className="py-3 px-4 font-mono font-bold text-purple-900">{row.regNumber}</td>
                    <td className="py-3 px-4 font-semibold text-gray-800">{row.studentName}</td>
                    <td className="py-3 px-4 font-bold text-gray-700">{row.internalMarks}</td>
                    <td className="py-3 px-4 font-bold text-gray-700">{row.practicalMarks}</td>
                    <td className="py-3 px-4 font-extrabold text-emerald-700">{row.totalMarks}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-green-100 text-green-800 font-bold text-[10px]">
                        {row.attendance}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="flex items-center gap-1 text-[11px] text-emerald-700 font-bold">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Verified</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
