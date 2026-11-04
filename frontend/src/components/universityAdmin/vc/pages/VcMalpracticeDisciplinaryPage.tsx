import React, { useState } from 'react';
import {
  ShieldAlert,
  Gavel,
  FileText,
  Eye,
  X
} from 'lucide-react';
import { useUniversityAdmin } from '../../../../context/UniversityAdminContext';
import { MALPRACTICE_CASES_DATA } from '../../../../data/vcSubmodulesData';

export const VcMalpracticeDisciplinaryPage: React.FC = () => {
  const { setToast } = useUniversityAdmin();
  const [cases, setCases] = useState(MALPRACTICE_CASES_DATA);
  const [activeCase, setActiveCase] = useState<any | null>(null);
  const [decreeNote, setDecreeNote] = useState('');

  const handleDecree = (id: string, action: 'Penalty Imposed' | 'Pardoned') => {
    setCases((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              status: action,
              vcDecree: decreeNote || (action === 'Penalty Imposed' ? 'Vice-Chancellor confirmed disciplinary penalty order.' : 'Pardoned with official university warning.')
            }
          : c
      )
    );
    setToast(`Vice-Chancellor decree issued for Case ${id}. Disciplinary order signed.`);
    setActiveCase(null);
    setDecreeNote('');
  };

  return (
    <div className="space-y-5 p-4 sm:p-6 bg-[#f8f9fe] min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#29084e] via-[#3d0a6c] to-[#250646] text-white p-5 sm:p-6 rounded-2xl shadow-lg border border-[#581c87] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-1">
            <ShieldAlert className="w-4 h-4" />
            <span>Apex Disciplinary Tribunal</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            Examination Malpractice &amp; Disciplinary Decrees
          </h1>
          <p className="text-xs sm:text-sm text-purple-200 mt-1">
            Vice-Chancellor appellate tribunal: Review of Flying Squad confiscations, forensic device audits &amp; disciplinary penalty orders.
          </p>
        </div>

        <div className="px-3.5 py-1.5 rounded-xl bg-purple-900/80 border border-purple-400/30 text-xs font-bold text-amber-300">
          <span>{cases.filter((c) => c.status === 'Under Review').length} Active Hearing Cases</span>
        </div>
      </div>

      {/* Case Roster */}
      <div className="space-y-4">
        {cases.map((c) => (
          <div
            key={c.id}
            className="bg-white rounded-2xl border border-purple-200/90 p-5 shadow-2xs hover:shadow-md transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="font-mono text-[11px] font-black text-rose-800 bg-rose-50 px-2.5 py-0.5 rounded-md border border-rose-200">
                  {c.caseNo}
                </span>
                <span className="font-mono text-[11px] font-bold text-gray-700 bg-gray-100 px-2 py-0.5 rounded-md">
                  {c.usn}
                </span>
                <span className="text-[10px] font-bold text-amber-900 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
                  {c.violationType}
                </span>
                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                    c.status === 'Penalty Imposed'
                      ? 'bg-rose-100 text-rose-800 border border-rose-300'
                      : c.status === 'Pardoned'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-amber-100 text-amber-900 border border-amber-300'
                  }`}
                >
                  {c.status}
                </span>
              </div>

              <h3 className="font-black text-base text-gray-900 leading-snug">
                {c.studentName} • {c.examName}
              </h3>
              <p className="text-xs text-gray-500 font-semibold">
                {c.college} • Incident Date: {c.examDate}
              </p>

              <p className="text-xs text-gray-700 mt-2 bg-rose-50/50 p-3 rounded-xl border border-rose-100">
                <strong>Spot Report:</strong> {c.description}
              </p>

              <div className="mt-2 text-[11px] text-gray-600 font-medium">
                Committee Recommendation: <strong className="text-purple-900">{c.committeeRecommendation}</strong>
              </div>
            </div>

            <div className="flex items-center gap-2 lg:shrink-0">
              <button
                onClick={() => setActiveCase(c)}
                className="px-4 py-2 bg-gradient-to-r from-purple-800 to-purple-950 text-white font-bold text-xs rounded-xl shadow-md hover:opacity-95 cursor-pointer flex items-center gap-1.5"
              >
                <Gavel className="w-3.5 h-3.5 text-amber-300" />
                <span>Hear &amp; Adjudicate</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Tribunal Adjudication Modal */}
      {activeCase && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-2xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-xl w-full p-5 sm:p-6 border border-purple-200 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <span className="font-mono text-xs font-black text-rose-800 bg-rose-50 px-2.5 py-0.5 rounded-md mb-1 inline-block border border-rose-200">
                  {activeCase.caseNo}
                </span>
                <h3 className="font-black text-base text-purple-950">{activeCase.studentName}</h3>
                <p className="text-xs text-gray-500">{activeCase.college} • USN: {activeCase.usn}</p>
              </div>
              <button onClick={() => setActiveCase(null)} className="p-1 hover:bg-gray-100 rounded-lg text-gray-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs space-y-1">
              <span className="font-bold text-gray-800 block">Course Exam: {activeCase.examName}</span>
              <p className="text-gray-600">{activeCase.description}</p>
            </div>

            <div className="p-3 bg-purple-50 rounded-xl border border-purple-100 text-xs">
              <span className="text-[10px] text-purple-800 font-bold uppercase tracking-wider block">
                Disciplinary Enquiry Committee Findings
              </span>
              <p className="font-bold text-purple-950 mt-1">{activeCase.committeeRecommendation}</p>
            </div>

            <div>
              <h4 className="text-xs font-bold text-gray-900 mb-2">Logged Evidentiary Exhibits</h4>
              <div className="space-y-1.5">
                {activeCase.evidencePhotos.map((doc: string, i: number) => (
                  <div
                    key={i}
                    onClick={() => setToast(`Viewing forensic file ${doc}`)}
                    className="p-2 bg-gray-50 hover:bg-purple-50 rounded-lg border border-gray-200 flex items-center justify-between text-xs text-gray-800 font-medium cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-purple-700" />
                      <span>{doc}</span>
                    </div>
                    <Eye className="w-3.5 h-3.5 text-gray-400" />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Vice-Chancellor Final Statutory Decree</label>
              <textarea
                rows={3}
                value={decreeNote}
                onChange={(e) => setDecreeNote(e.target.value)}
                placeholder="Decreed under ACU Disciplinary Statutes: Penalty of debarment confirmed / Modified to paper cancellation..."
                className="w-full text-xs p-3 bg-gray-50 border border-gray-200 rounded-xl"
              />
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-gray-100">
              <button
                onClick={() => handleDecree(activeCase.id, 'Pardoned')}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl"
              >
                Pardon / Warning
              </button>

              <button
                onClick={() => handleDecree(activeCase.id, 'Penalty Imposed')}
                className="px-5 py-2 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white font-black text-xs rounded-xl shadow-md flex items-center gap-1.5"
              >
                <Gavel className="w-4 h-4" />
                <span>Issue Final Debarment Decree</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
