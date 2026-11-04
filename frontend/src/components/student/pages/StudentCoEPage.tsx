import React, { useState } from 'react';
import {
  FileText,
  Printer,
  Download,
  CheckCircle2,
  X,
  FileCheck2,
  Sparkles,
} from 'lucide-react';
import { useStudent } from '../../../context/StudentContext';
import { STUDENT_SEMESTER_RESULTS } from '../../../data/studentMockData';

export const StudentCoEPage: React.FC = () => {
  const { activeSubmenu, profile } = useStudent();
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState('');
  const [showHallTicketPreview, setShowHallTicketPreview] = useState(false);

  // Form states
  const [rvType, setRvType] = useState<'Revaluation' | 'Retotaling'>('Revaluation');
  const [rvSubject, setRvSubject] = useState('CSA3012 - Cloud Computing Architecture');

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 4000);
  };

  return (
    <div className="space-y-4">
      {/* Breadcrumb matching Pages 15 - 21 */}
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        CONTROLLER OF EXAMINATION &gt;{' '}
        {activeSubmenu === 'view-answer-booklet'
          ? 'VIEW ANSWER BOOKLET'
          : activeSubmenu === 'view-results'
          ? 'VIEW RESULTS'
          : activeSubmenu === 'makeup-backlog'
          ? 'MAKEUP / BACKLOG REGISTRATION'
          : activeSubmenu === 'apply-rv-rt'
          ? 'APPLY RV/RT'
          : activeSubmenu === 'summer-term'
          ? 'SUMMER TERM'
          : activeSubmenu === 'hall-ticket'
          ? 'END TERM / MID TERM HALL TICKET'
          : 'RE-REGISTRATION'}
      </div>

      {toastMsg && (
        <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* PAGE 15: VIEW ANSWER BOOKLET */}
      {activeSubmenu === 'view-answer-booklet' && (
        <div className="bg-white rounded-xl p-8 sm:p-12 border border-gray-200 shadow-2xs text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-lg sm:text-xl font-black text-gray-900 tracking-tight">
            Answer Booklet Generation
          </h2>
          <p className="text-xs text-gray-500 max-w-md mx-auto">
            Use this page to generate answer booklets for your exams. Click the button below to generate booklet.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setActiveModal('booklet')}
              className="px-6 py-2.5 rounded-lg bg-[#7047eb] hover:bg-[#5b32d6] text-white text-xs font-bold flex items-center gap-2 mx-auto shadow-md transition-all cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Generate Answer Booklet</span>
            </button>
          </div>
        </div>
      )}

      {/* PAGE 16: VIEW RESULTS */}
      {activeSubmenu === 'view-results' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-8 sm:p-12 border border-gray-200 shadow-2xs text-center space-y-4 max-w-3xl mx-auto">
            <h2 className="text-lg sm:text-xl font-black text-gray-900 tracking-tight">
              Results
            </h2>
            <p className="text-xs text-gray-500 max-w-md mx-auto">
              Use this page to generate results for your exams. Click the button below to view results.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setActiveModal('results')}
                className="px-6 py-2.5 rounded-lg bg-[#7047eb] hover:bg-[#5b32d6] text-white text-xs font-bold flex items-center gap-2 mx-auto shadow-md transition-all cursor-pointer"
              >
                <FileCheck2 className="w-4 h-4" />
                <span>View Results</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PAGE 17: MAKEUP / BACKLOG REGISTRATION */}
      {activeSubmenu === 'makeup-backlog' && (
        <div className="bg-white rounded-xl p-8 sm:p-12 border border-gray-200 shadow-2xs text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-lg sm:text-xl font-black text-gray-900 tracking-tight">
            Application For Makeup / Backlog Registration
          </h2>
          <p className="text-xs text-gray-500 max-w-md mx-auto">
            You can apply for Makeup / Backlog Registration using the button below.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setActiveModal('backlog')}
              className="px-6 py-2.5 rounded-lg bg-[#7047eb] hover:bg-[#5b32d6] text-white text-xs font-bold flex items-center gap-2 mx-auto shadow-md transition-all cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Apply Makeup / Backlog Registration</span>
            </button>
          </div>
        </div>
      )}

      {/* PAGE 18: APPLY RV/RT */}
      {activeSubmenu === 'apply-rv-rt' && (
        <div className="bg-white rounded-xl p-8 sm:p-12 border border-gray-200 shadow-2xs text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-lg sm:text-xl font-black text-gray-900 tracking-tight">
            Application For Revaluation or Retotaling
          </h2>
          <p className="text-xs text-gray-500 max-w-md mx-auto">
            You can also apply for Revaluation (RV) or Retotaling (RT) of your answer sheets using the Apply RV/RT button.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setActiveModal('rv-rt')}
              className="px-6 py-2.5 rounded-lg bg-[#7047eb] hover:bg-[#5b32d6] text-white text-xs font-bold flex items-center gap-2 mx-auto shadow-md transition-all cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Apply RV/RT</span>
            </button>
          </div>
        </div>
      )}

      {/* PAGE 19: SUMMER TERM */}
      {activeSubmenu === 'summer-term' && (
        <div className="bg-white rounded-xl p-8 sm:p-12 border border-gray-200 shadow-2xs text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-lg sm:text-xl font-black text-gray-900 tracking-tight">
            Summer Term Registration
          </h2>
          <p className="text-xs text-gray-500 max-w-md mx-auto">
            You can apply for Summer Term Registration using the button below.
          </p>
          <div className="pt-2">
            <button
              onClick={() => triggerToast('Summer term registration window opens on 15th May 2027.')}
              className="px-6 py-2.5 rounded-lg bg-[#7047eb] hover:bg-[#5b32d6] text-white text-xs font-bold flex items-center gap-2 mx-auto shadow-md transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Apply Summer Term Registration</span>
            </button>
          </div>
        </div>
      )}

      {/* PAGE 20: HALL TICKETS */}
      {activeSubmenu === 'hall-ticket' && (
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h2 className="text-xs sm:text-sm font-extrabold text-gray-900 uppercase tracking-wide">
              HALL TICKETS
            </h2>
            <button
              onClick={() => setShowHallTicketPreview(!showHallTicketPreview)}
              className="text-xs text-purple-700 font-bold hover:underline cursor-pointer"
            >
              {showHallTicketPreview ? 'Show PDF Empty State' : 'Preview End Term Hall Ticket'}
            </button>
          </div>

          {!showHallTicketPreview ? (
            /* Page 20 exact empty state */
            <div className="py-20 text-center text-xs font-bold text-gray-500">
              No Hall Tickets Found!
            </div>
          ) : (
            /* Printable Hall Ticket Card */
            <div className="p-6 rounded-xl border-2 border-purple-200 bg-white max-w-2xl mx-auto space-y-4 shadow-md">
              <div className="text-center border-b border-gray-200 pb-3">
                <h3 className="text-base font-black text-gray-900">
                  ADICHUNCHANAGIRI UNIVERSITY
                </h3>
                <p className="text-xs font-bold text-purple-700">
                  CONTROLLER OF EXAMINATIONS - HALL TICKET (DEC 2026)
                </p>
                <p className="text-[10px] text-gray-400">
                  BG Nagara, Mandya, Karnataka 571448
                </p>
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="space-y-1">
                  <div><span className="font-bold text-gray-500">Student: </span><span className="font-extrabold text-gray-900">{profile.fullName}</span></div>
                  <div><span className="font-bold text-gray-500">Roll No: </span><span className="font-bold text-purple-700">{profile.rollNo}</span></div>
                  <div><span className="font-bold text-gray-500">Programme: </span><span className="font-bold text-gray-800">{profile.program}</span></div>
                  <div><span className="font-bold text-gray-500">Centre: </span><span className="font-bold text-gray-800">Main Academic Block, ACU</span></div>
                </div>
                <img
                  src={profile.photoUrl}
                  alt="Student"
                  className="w-16 h-20 rounded border border-gray-300 object-cover"
                />
              </div>

              <div className="pt-2">
                <button
                  onClick={() => window.print()}
                  className="w-full py-2 rounded-lg bg-[#7047eb] hover:bg-[#5b32d6] text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Download / Print Hall Ticket</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* PAGE 21: RE-REGISTRATION */}
      {activeSubmenu === 're-registration' && (
        <div className="bg-white rounded-xl p-8 sm:p-12 border border-gray-200 shadow-2xs text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-lg sm:text-xl font-black text-gray-900 tracking-tight">
            Re-Registration
          </h2>
          <p className="text-xs text-gray-500 max-w-md mx-auto">
            You can apply for Re-Registration using the button below.
          </p>
          <div className="pt-2">
            <button
              onClick={() => triggerToast('Re-registration request recorded. Department advisor notified.')}
              className="px-6 py-2.5 rounded-lg bg-[#7047eb] hover:bg-[#5b32d6] text-white text-xs font-bold flex items-center gap-2 mx-auto shadow-md transition-all cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Apply Re-Registration</span>
            </button>
          </div>
        </div>
      )}

      {/* Results Modal */}
      {activeModal === 'results' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 border border-gray-200 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-base font-black text-gray-900">
                  OFFICIAL SEMESTER RESULT STATEMENT
                </h3>
                <p className="text-xs text-purple-700 font-bold">
                  {STUDENT_SEMESTER_RESULTS.semester} • {STUDENT_SEMESTER_RESULTS.academicYear}
                </p>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="w-7 h-7 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-purple-50/50 p-3 rounded-xl border border-purple-200 text-xs">
              <div><span className="text-gray-500">SGPA:</span> <span className="font-black text-purple-800 text-sm">{STUDENT_SEMESTER_RESULTS.sgpa}</span></div>
              <div><span className="text-gray-500">CGPA:</span> <span className="font-black text-purple-800 text-sm">{STUDENT_SEMESTER_RESULTS.cgpa}</span></div>
              <div><span className="text-gray-500">Credits Earned:</span> <span className="font-bold text-gray-800">{STUDENT_SEMESTER_RESULTS.creditsEarned} / {STUDENT_SEMESTER_RESULTS.totalCredits}</span></div>
              <div><span className="text-gray-500">Result:</span> <span className="font-black text-emerald-600">PASSED</span></div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 font-bold border-b border-gray-200">
                    <th className="p-2.5">Code</th>
                    <th className="p-2.5">Subject Name</th>
                    <th className="p-2.5 text-center">Credits</th>
                    <th className="p-2.5 text-center">Internal</th>
                    <th className="p-2.5 text-center">External</th>
                    <th className="p-2.5 text-center">Total</th>
                    <th className="p-2.5 text-center">Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {STUDENT_SEMESTER_RESULTS.items.map((row) => (
                    <tr key={row.subjectCode} className="hover:bg-gray-50">
                      <td className="p-2.5 font-bold text-purple-700">{row.subjectCode}</td>
                      <td className="p-2.5 text-gray-800 font-semibold">{row.subjectName}</td>
                      <td className="p-2.5 text-center">{row.credits}</td>
                      <td className="p-2.5 text-center">{row.internalMarks}</td>
                      <td className="p-2.5 text-center">{row.externalMarks}</td>
                      <td className="p-2.5 text-center font-bold">{row.totalMarks}</td>
                      <td className="p-2.5 text-center font-black text-purple-700">{row.grade}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pt-3 border-t border-gray-100 flex justify-end gap-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-1.5 rounded-lg border border-gray-300 text-gray-700 font-bold hover:bg-gray-100 text-xs flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Result</span>
              </button>
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-1.5 rounded-lg bg-gray-800 text-white font-bold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Answer Booklet Modal */}
      {activeModal === 'booklet' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-gray-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-sm font-extrabold text-gray-900">
                Authorized Digital Answer Booklet
              </h3>
              <button
                onClick={() => setActiveModal(null)}
                className="w-7 h-7 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 rounded-xl border border-gray-200 bg-gray-50 space-y-2 text-xs">
              <div><span className="font-bold text-gray-500">Student Roll No:</span> <span className="font-mono font-bold text-purple-700">{profile.rollNo}</span></div>
              <div><span className="font-bold text-gray-500">Security Barcode:</span> <span className="font-mono">ACU-AB-2026-994102</span></div>
              <div><span className="font-bold text-gray-500">Total Pages:</span> <span>32 Pages (Ruled Format)</span></div>
              <div><span className="font-bold text-gray-500">Authentication Watermark:</span> <span className="text-emerald-700 font-bold">Verified by CoE ACU</span></div>
            </div>
            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => {
                  triggerToast('Answer booklet downloaded as PDF with encrypted watermark.');
                  setActiveModal(null);
                }}
                className="px-5 py-2 rounded-lg bg-[#7047eb] hover:bg-[#5b32d6] text-white text-xs font-bold flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Printable Booklet</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RV/RT Modal */}
      {activeModal === 'rv-rt' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-gray-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-sm font-extrabold text-gray-900">
                Apply for Revaluation / Retotaling
              </h3>
              <button
                onClick={() => setActiveModal(null)}
                className="w-7 h-7 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Application Type:</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="rvType"
                      checked={rvType === 'Revaluation'}
                      onChange={() => setRvType('Revaluation')}
                    />
                    <span>Revaluation (₹500)</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="rvType"
                      checked={rvType === 'Retotaling'}
                      onChange={() => setRvType('Retotaling')}
                    />
                    <span>Retotaling (₹200)</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">Select Subject:</label>
                <select
                  value={rvSubject}
                  onChange={(e) => setRvSubject(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded p-2 text-xs"
                >
                  <option value="CSA3012 - Cloud Computing Architecture">CSA3012 - Cloud Computing Architecture</option>
                  <option value="CSA3014 - AI & Machine Learning">CSA3014 - AI &amp; Machine Learning</option>
                  <option value="CSA3011 - Advanced Data Structures">CSA3011 - Advanced Data Structures</option>
                </select>
              </div>
            </div>
            <div className="pt-3 border-t border-gray-100 flex justify-end gap-2">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-1.5 rounded-lg border border-gray-300 text-gray-700 font-bold text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  triggerToast(`${rvType} application for ${rvSubject} submitted successfully.`);
                  setActiveModal(null);
                }}
                className="px-5 py-1.5 rounded-lg bg-[#7047eb] hover:bg-[#5b32d6] text-white font-bold text-xs"
              >
                Confirm &amp; Pay Fee
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
