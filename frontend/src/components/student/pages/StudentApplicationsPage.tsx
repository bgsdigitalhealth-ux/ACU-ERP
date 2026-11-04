import React, { useState } from 'react';
import {
  FileText,
  Building2,
  Mic,
  Award,
  GraduationCap,
  Bus,
  Wrench,
  Bed,
  Landmark,
  Receipt,
  Users,
  Server,
  Laptop,
  CheckSquare,
  RefreshCw,
  Printer,
  X,
  CheckCircle2,
} from 'lucide-react';
import { useStudent } from '../../../context/StudentContext';
import { APPLICATION_CARDS } from '../../../data/studentMockData';
import { ApplicationCardItem } from '../../../types/student';

export const StudentApplicationsPage: React.FC = () => {
  const { activeSubmenu, submittedApplications, addApplication, profile } = useStudent();
  const [activeCardModal, setActiveCardModal] = useState<ApplicationCardItem | null>(null);
  const [cbeTab, setCbeTab] = useState<'cbe' | 'course-reg' | 'exemption'>('cbe');
  const [requestSubject, setRequestSubject] = useState('');
  const [requestDetails, setRequestDetails] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  // Grace mark form state
  const [graceCourse, setGraceCourse] = useState('PHY101 - Human Physiology I & II');
  const [graceMarks, setGraceMarks] = useState(3);
  const [graceReason, setGraceReason] = useState('State Medical Conference OSPE Presentation');

  // Regular exam form state
  const [examRegistered, setExamRegistered] = useState(false);

  const getIcon = (name: string) => {
    switch (name) {
      case 'FileText': return <FileText className="w-5 h-5 text-gray-700" />;
      case 'Building2': return <Building2 className="w-5 h-5 text-gray-700" />;
      case 'Mic': return <Mic className="w-5 h-5 text-gray-700" />;
      case 'Award': return <Award className="w-5 h-5 text-gray-700" />;
      case 'GraduationCap': return <GraduationCap className="w-5 h-5 text-gray-700" />;
      case 'Bus': return <Bus className="w-5 h-5 text-gray-700" />;
      case 'Wrench': return <Wrench className="w-5 h-5 text-gray-700" />;
      case 'Bed': return <Bed className="w-5 h-5 text-gray-700" />;
      case 'Landmark': return <Landmark className="w-5 h-5 text-gray-700" />;
      case 'Receipt': return <Receipt className="w-5 h-5 text-gray-700" />;
      case 'Users': return <Users className="w-5 h-5 text-gray-700" />;
      case 'Server': return <Server className="w-5 h-5 text-gray-700" />;
      case 'Laptop': return <Laptop className="w-5 h-5 text-gray-700" />;
      case 'CheckSquare': return <CheckSquare className="w-5 h-5 text-gray-700" />;
      default: return <FileText className="w-5 h-5 text-gray-700" />;
    }
  };

  const handleCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeCardModal) return;

    addApplication({
      title: `${activeCardModal.title} - ${requestSubject || 'General Request'}`,
      category: activeCardModal.category,
      status: 'APPLIED',
      refNumber: `ACU/APP/${new Date().getFullYear()}/${Math.floor(1000 + Math.random() * 9000)}`,
      remarks: requestDetails || 'Submitted via Student Portal Helpdesk',
    });

    setActiveCardModal(null);
    setRequestSubject('');
    setRequestDetails('');
    setToastMessage(`Application for ${activeCardModal.title} submitted successfully!`);
    setTimeout(() => setToastMessage(''), 4000);
  };

  const handleGraceMarkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addApplication({
      title: `Grace Mark Request (${graceMarks} marks) - ${graceCourse}`,
      category: 'Grace Mark',
      status: 'APPLIED',
      refNumber: `ACU/GRACE/${new Date().getFullYear()}/${Math.floor(1000 + Math.random() * 9000)}`,
      remarks: `${graceReason} - Document verified by Faculty Advisor`,
    });
    setToastMessage('Grace mark application forwarded to CoE board for consideration.');
    setTimeout(() => setToastMessage(''), 4000);
  };

  return (
    <div className="space-y-4">
      {/* Breadcrumb matching Pages 11, 12, 13 */}
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        APPLICATIONS &amp; REGISTRATIONS &gt;{' '}
        {activeSubmenu === 'grace-mark'
          ? 'GRACE MARK'
          : activeSubmenu === 'cbe-semterm'
          ? 'CBE / SEM TERM'
          : activeSubmenu === 'regular-exam'
          ? 'REGULAR EXAM'
          : 'OTHER APPLICATIONS'}
      </div>

      {toastMessage && (
        <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* SUBMENU 1: OTHER APPLICATIONS - 14 Cards Grid matching Page 11 */}
      {activeSubmenu === 'other-applications' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-4 sm:p-5 border border-gray-200 shadow-2xs">
            <h2 className="text-xs sm:text-sm font-extrabold text-gray-900 tracking-wide uppercase mb-4">
              APPLICATIONS
            </h2>

            {/* 14 Application Cards matching Page 11 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {APPLICATION_CARDS.map((card) => (
                <div
                  key={card.id}
                  onClick={() => setActiveCardModal(card)}
                  className="bg-white rounded-xl p-4 border border-gray-200 hover:border-[#7047eb] hover:shadow-md transition-all cursor-pointer group flex items-start gap-3.5 relative"
                >
                  <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-200 group-hover:bg-purple-50 group-hover:border-purple-200 flex items-center justify-center shrink-0 transition-colors">
                    {getIcon(card.iconName)}
                  </div>

                  <div className="flex-1 min-w-0 pr-6">
                    <h3 className="text-xs font-black text-gray-900 group-hover:text-[#7047eb] transition-colors uppercase leading-snug">
                      {card.title}
                    </h3>
                    <p className="text-[11px] text-gray-500 font-medium line-clamp-1 mt-0.5">
                      {card.description}
                    </p>
                  </div>

                  {card.badge && (
                    <span className="w-5 h-5 rounded-full bg-[#7047eb] text-white text-[10px] font-black flex items-center justify-center absolute top-4 right-4">
                      {card.badge}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUBMENU 2: GRACE MARK matching Page 12 */}
      {activeSubmenu === 'grace-mark' && (
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-2xs space-y-5 max-w-3xl">
          <div className="border-b border-gray-100 pb-3">
            <h2 className="text-xs sm:text-sm font-extrabold text-gray-900 uppercase tracking-wide">
              APPLICATION FOR GRACE MARK
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Eligible students who participated in recognized sports, NSS, NCC or cultural events can apply.
            </p>
          </div>

          <form onSubmit={handleGraceMarkSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-gray-700 mb-1">
                Select Course / Subject:<span className="text-red-500">*</span>
              </label>
              <select
                value={graceCourse}
                onChange={(e) => setGraceCourse(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-md p-2 outline-hidden focus:border-[#7047eb]"
              >
                <option value="PHY101 - Human Physiology I & II">PHY101 - Human Physiology I &amp; II</option>
                <option value="ANA101 - Human Anatomy, Embryology & Histology">ANA101 - Human Anatomy, Embryology &amp; Histology</option>
                <option value="BIO101 - Medical Biochemistry & Molecular Diagnostics">BIO101 - Medical Biochemistry &amp; Molecular Diagnostics</option>
                <option value="ECE101 - Early Clinical Exposure & Medical Ethics">ECE101 - Early Clinical Exposure &amp; Medical Ethics</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Marks Requested (Max 5):<span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min={1}
                  max={5}
                  value={graceMarks}
                  onChange={(e) => setGraceMarks(Number(e.target.value))}
                  className="w-full bg-white border border-gray-300 rounded-md p-2 outline-hidden focus:border-[#7047eb]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Eligibility Category:<span className="text-red-500">*</span>
                </label>
                <select className="w-full bg-white border border-gray-300 rounded-md p-2 outline-hidden focus:border-[#7047eb]">
                  <option>University Sports / All India Inter-University</option>
                  <option>National Service Scheme (NSS Republic Day / State Camp)</option>
                  <option>National Cadet Corps (NCC C-Certificate)</option>
                  <option>State / National Level Hackathon Winner</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">
                Event Description &amp; Reason:<span className="text-red-500">*</span>
              </label>
              <textarea
                rows={3}
                value={graceReason}
                onChange={(e) => setGraceReason(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-md p-2 outline-hidden focus:border-[#7047eb]"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">
                Upload Certificate / Endorsement Slip (PDF):
              </label>
              <input
                type="file"
                className="w-full bg-gray-50 border border-gray-300 rounded-md p-1.5 text-xs text-gray-700"
              />
            </div>

            <div className="pt-2 border-t border-gray-100 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 rounded-lg bg-[#7047eb] hover:bg-[#5b32d6] text-white font-bold cursor-pointer transition-colors"
              >
                Submit Grace Mark Application
              </button>
            </div>
          </form>
        </div>
      )}

      {/* SUBMENU 3: CBE / SEM TERM matching Page 13 */}
      {activeSubmenu === 'cbe-semterm' && (
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
            {/* Tabs matching Page 13 */}
            <div className="flex gap-2">
              <button
                onClick={() => setCbeTab('cbe')}
                className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                  cbeTab === 'cbe'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                CBE
              </button>
              <button
                onClick={() => setCbeTab('course-reg')}
                className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                  cbeTab === 'course-reg'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                COURSE REGISTRATION
              </button>
              <button
                onClick={() => setCbeTab('exemption')}
                className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                  cbeTab === 'exemption'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                COURSE EXEMPTION
              </button>
            </div>

            {/* Refresh Button matching Page 13 */}
            <button
              onClick={() => alert('Applications refreshed with live academic servers.')}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-md bg-[#337ab7] hover:bg-[#286090] text-white text-xs font-bold shadow-xs cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh</span>
            </button>
          </div>

          <h3 className="text-xs sm:text-sm font-extrabold text-gray-800 tracking-wide uppercase pt-1">
            SUBMITTED APPLICATIONS
          </h3>

          {/* Cards matching Page 13 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {submittedApplications.map((app) => (
              <div
                key={app.id}
                className="bg-white rounded-xl p-4 border border-gray-200 shadow-2xs space-y-2.5 relative"
              >
                <h4 className="text-xs font-bold text-gray-900 pr-8 leading-snug">
                  {app.title}
                </h4>

                <button
                  onClick={() => window.print()}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 cursor-pointer"
                  title="Print Acknowledgement"
                >
                  <Printer className="w-4 h-4" />
                </button>

                <div className="space-y-1 text-xs text-gray-700">
                  <div className="flex items-center gap-2">
                    <span className="w-32 text-gray-500 font-semibold">Application Status</span>
                    <span>:</span>
                    <span className="font-bold text-emerald-600">{app.status}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="w-32 text-gray-500 font-semibold">Applied Time</span>
                    <span>:</span>
                    <span className="font-semibold text-gray-800">{app.appliedTime}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="w-32 text-gray-500 font-semibold">Finalized Time</span>
                    <span>:</span>
                    <span className="font-semibold text-gray-800">{app.finalizedTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBMENU 4: REGULAR EXAM */}
      {activeSubmenu === 'regular-exam' && (
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-2xs space-y-4 max-w-2xl">
          <div className="border-b border-gray-100 pb-3">
            <h2 className="text-xs sm:text-sm font-extrabold text-gray-900 uppercase tracking-wide">
              REGULAR END-TERM EXAMINATION REGISTRATION
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Registration for S4 End-Term Examinations (Academic Year 2026-27).
            </p>
          </div>

          <div className="p-4 rounded-lg bg-purple-50/50 border border-purple-200 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="font-bold text-gray-600">Candidate:</span>
              <span className="font-extrabold text-gray-900">{profile.fullName}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold text-gray-600">Programme:</span>
              <span className="font-bold text-purple-700">{profile.program}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold text-gray-600">Semester:</span>
              <span className="font-bold text-gray-900">{profile.currentSemester}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold text-gray-600">Eligible Subjects:</span>
              <span className="font-bold text-gray-900">5 Courses (Theory + Project)</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold text-gray-600">Examination Fee:</span>
              <span className="font-black text-emerald-700">₹5,000.00 (Paid on 17-01-2026)</span>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={() => {
                setExamRegistered(true);
                setToastMessage('Regular examination enrollment confirmed! Hall ticket will be issued.');
              }}
              disabled={examRegistered}
              className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${
                examRegistered
                  ? 'bg-emerald-600 text-white cursor-default'
                  : 'bg-[#7047eb] hover:bg-[#5b32d6] text-white cursor-pointer shadow-xs'
              }`}
            >
              {examRegistered ? '✓ Registration Complete' : 'Confirm Exam Registration'}
            </button>
          </div>
        </div>
      )}

      {/* Card Application Modal */}
      {activeCardModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 border border-gray-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-sm font-extrabold text-gray-900">
                  {activeCardModal.title}
                </h3>
                <p className="text-xs text-gray-500 font-medium">
                  {activeCardModal.description}
                </p>
              </div>
              <button
                onClick={() => setActiveCardModal(null)}
                className="w-7 h-7 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCardSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Subject / Application Purpose:<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={requestSubject}
                  onChange={(e) => setRequestSubject(e.target.value)}
                  placeholder="e.g. Issue of Bonafide Certificate for Bank Loan"
                  className="w-full bg-white border border-gray-300 rounded-md p-2 outline-hidden focus:border-[#7047eb]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Detailed Request / Justification:
                </label>
                <textarea
                  rows={3}
                  value={requestDetails}
                  onChange={(e) => setRequestDetails(e.target.value)}
                  placeholder="Provide supporting details or requirements..."
                  className="w-full bg-white border border-gray-300 rounded-md p-2 outline-hidden focus:border-[#7047eb]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Optional Attachment (PDF):
                </label>
                <input
                  type="file"
                  className="w-full bg-gray-50 border border-gray-300 rounded-md p-1.5 text-xs text-gray-700"
                />
              </div>

              <div className="pt-3 border-t border-gray-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setActiveCardModal(null)}
                  className="px-4 py-1.5 rounded-lg border border-gray-300 text-gray-700 font-bold hover:bg-gray-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-1.5 rounded-lg bg-[#7047eb] hover:bg-[#5b32d6] text-white font-bold cursor-pointer"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
