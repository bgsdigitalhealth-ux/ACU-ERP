import React, { useState } from 'react';
import {
  Sparkles,
  ShieldCheck,
  X
} from 'lucide-react';
import { useUniversityAdmin } from '../../../../context/UniversityAdminContext';
import { EXAM_REFORMS_DATA } from '../../../../data/vcSubmodulesData';

export const VcSchemeReformsPage: React.FC = () => {
  const { setToast } = useUniversityAdmin();
  const [reformModal, setReformModal] = useState<any | null>(null);

  return (
    <div className="space-y-5 p-4 sm:p-6 bg-[#f8f9fe] min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#29084e] via-[#3d0a6c] to-[#250646] text-white p-5 sm:p-6 rounded-2xl shadow-lg border border-[#581c87] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Institutional Evolution</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            Academic Scheme &amp; Examination Reforms
          </h1>
          <p className="text-xs sm:text-sm text-purple-200 mt-1">
            Apex strategic reforms: On-Screen Marking (OSM), Biometric Entry, DigiLocker NAD Sync &amp; AI Evaluation Auditing.
          </p>
        </div>

        <div className="px-3.5 py-1.5 rounded-xl bg-purple-900/80 border border-purple-400/30 text-xs font-bold text-amber-300 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Vice-Chancellor Vision 2025</span>
        </div>
      </div>

      {/* Reforms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {EXAM_REFORMS_DATA.map((ref) => (
          <div
            key={ref.id}
            className="bg-white rounded-2xl border border-purple-200/90 p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-800 bg-purple-100 px-2 py-0.5 rounded-md">
                  {ref.initiative}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    ref.status === 'Implemented'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : ref.status === 'In Progress'
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : 'bg-purple-100 text-purple-800 border border-purple-300'
                  }`}
                >
                  {ref.status}
                </span>
              </div>

              <h3 className="font-black text-base text-gray-900 leading-snug">{ref.title}</h3>
              <p className="text-xs text-gray-600 mt-2 leading-relaxed">{ref.impact}</p>

              <div className="mt-4 pt-3 border-t border-gray-100 text-xs space-y-1">
                <div className="flex items-center justify-between text-gray-500">
                  <span>Implementation Phase:</span>
                  <span className="font-bold text-gray-800">{ref.phase}</span>
                </div>
                <div className="flex items-center justify-between text-gray-500">
                  <span>Lead Authority:</span>
                  <span className="font-semibold text-purple-900">{ref.leadDepartment}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
              <button
                onClick={() => setReformModal(ref)}
                className="w-full py-2 bg-purple-50 hover:bg-purple-100 text-purple-900 font-bold text-xs rounded-xl border border-purple-200 transition-colors cursor-pointer"
              >
                View Milestone Roadmap
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Milestone Roadmap Modal */}
      {reformModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-2xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 sm:p-6 border border-purple-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-800 bg-purple-100 px-2 py-0.5 rounded-md mb-1 inline-block">
                  {reformModal.initiative}
                </span>
                <h3 className="font-black text-base text-purple-950">{reformModal.title}</h3>
              </div>
              <button onClick={() => setReformModal(null)} className="p-1 hover:bg-gray-100 rounded-lg text-gray-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-gray-700 bg-purple-50 p-3 rounded-xl border border-purple-100">
              {reformModal.impact}
            </p>

            <div className="space-y-2 text-xs">
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between">
                <span className="font-bold text-gray-800">Target Year of Universal Commissioning</span>
                <span className="font-black text-purple-950">{reformModal.targetYear}</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between">
                <span className="font-bold text-gray-800">Status</span>
                <span className="font-bold text-emerald-700">{reformModal.status}</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
              <button
                onClick={() => {
                  setToast(`Executive mandate refreshed for ${reformModal.title}`);
                  setReformModal(null);
                }}
                className="px-4 py-2 bg-gradient-to-r from-purple-800 to-purple-950 text-white font-bold text-xs rounded-xl shadow-md"
              >
                Reaffirm Executive Mandate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
