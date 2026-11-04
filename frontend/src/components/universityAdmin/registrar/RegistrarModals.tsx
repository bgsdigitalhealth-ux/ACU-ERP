import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useUniversityAdmin } from '../../../context/UniversityAdminContext';

export const RegistrarModals: React.FC = () => {
  const {
    activeRegistrarModal,
    setActiveRegistrarModal,
    handleReceiveScripts,
    handleLockMarks,
    handlePublishResult,
    setToast,
    registrarFilters
  } = useUniversityAdmin();

  const [receivedCount, setReceivedCount] = useState(160);

  if (!activeRegistrarModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none">
      <div className="bg-white rounded-3xl shadow-2xl border border-purple-200/90 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#380665] via-[#4B087B] to-[#250444] text-white px-5 py-4 flex items-center justify-between">
          <h3 className="font-extrabold text-base tracking-tight text-white flex items-center gap-2">
            {activeRegistrarModal === 'receive-scripts' && 'Receive & Register Answer Scripts'}
            {activeRegistrarModal === 'allocate-eval' && 'Allocate Scripts to Evaluators'}
            {activeRegistrarModal === 'practical-marks' && 'Import & Verify Practical Marks'}
            {activeRegistrarModal === 'ia-marks' && 'Consolidate Internal Assessment Marks'}
            {activeRegistrarModal === 'lock-marks' && 'Verify & Lock Examination Marks'}
            {activeRegistrarModal === 'process-results' && 'Compile & Draft Semester Results'}
            {activeRegistrarModal === 'publish-results' && 'Publish Official Results'}
            {activeRegistrarModal === 'reval' && 'Revaluation & Retotalling Desk'}
          </h3>
          <button
            onClick={() => setActiveRegistrarModal(null)}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal 1: Receive Scripts */}
        {activeRegistrarModal === 'receive-scripts' && (
          <div className="p-6 space-y-4">
            <div className="bg-purple-50 p-3 rounded-xl border border-purple-200 text-xs text-purple-900">
              Barcoded examination bundles from Examination Centres arrived under armed confidential escort.
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Answer Scripts Count to Inward</label>
              <input
                type="number"
                value={receivedCount}
                onChange={(e) => setReceivedCount(Number(e.target.value))}
                className="w-full text-xs p-2.5 border border-gray-300 rounded-xl font-bold"
              />
            </div>
            <div className="pt-3 border-t border-gray-100 flex justify-end gap-2">
              <button
                onClick={() => setActiveRegistrarModal(null)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => handleReceiveScripts(receivedCount)}
                className="px-5 py-2 bg-[#4B087B] text-white rounded-xl text-xs font-bold shadow-md hover:bg-[#38055c]"
              >
                Inward & Register Scripts
              </button>
            </div>
          </div>
        )}

        {/* Modal 2: Allocate Evaluators */}
        {activeRegistrarModal === 'allocate-eval' && (
          <div className="p-6 space-y-4">
            <p className="text-xs text-gray-600">
              18 Evaluators active in Central Valuation Zone. Distributing un-evaluated scripts equally across double evaluation desks.
            </p>
            <div className="pt-3 border-t border-gray-100 flex justify-end gap-2">
              <button
                onClick={() => setActiveRegistrarModal(null)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setActiveRegistrarModal(null);
                  setToast('Allocated 260 scripts across valuation panels.');
                }}
                className="px-5 py-2 bg-[#0284c7] text-white rounded-xl text-xs font-bold"
              >
                Distribute to Valuation Desks
              </button>
            </div>
          </div>
        )}

        {/* Modal 3: Practical Marks */}
        {activeRegistrarModal === 'practical-marks' && (
          <div className="p-6 space-y-4">
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900">
              142 Practical & Clinical exam sheets endorsed by Chief External and Internal Examiners.
            </div>
            <div className="pt-3 border-t border-gray-100 flex justify-end gap-2">
              <button
                onClick={() => setActiveRegistrarModal(null)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setActiveRegistrarModal(null);
                  setToast('Practical marks imported and verified.');
                }}
                className="px-5 py-2 bg-[#ea580c] text-white rounded-xl text-xs font-bold"
              >
                Verify & Endorse Practical Marks
              </button>
            </div>
          </div>
        )}

        {/* Modal 4: IA Marks */}
        {activeRegistrarModal === 'ia-marks' && (
          <div className="p-6 space-y-4">
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900">
              Continuous Internal Assessment (CIA-I, CIA-II, CIA-III) marks consolidated for 142 students.
            </div>
            <div className="pt-3 border-t border-gray-100 flex justify-end gap-2">
              <button
                onClick={() => setActiveRegistrarModal(null)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setActiveRegistrarModal(null);
                  setToast('Internal Assessment marks consolidated and ratified.');
                }}
                className="px-5 py-2 bg-[#059669] text-white rounded-xl text-xs font-bold"
              >
                Consolidate & Ratify IA
              </button>
            </div>
          </div>
        )}

        {/* Modal 5: Lock Marks */}
        {activeRegistrarModal === 'lock-marks' && (
          <div className="p-6 space-y-4">
            <div className="p-3 bg-purple-50 border border-purple-200 rounded-xl text-xs text-purple-900 space-y-1">
              <span className="font-bold">Cryptographic Marks Freezing</span>
              <p>Once locked, no further alterations can be made without Academic Council and VC approval.</p>
            </div>
            <div className="pt-3 border-t border-gray-100 flex justify-end gap-2">
              <button
                onClick={() => setActiveRegistrarModal(null)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleLockMarks}
                className="px-5 py-2 bg-[#db2777] text-white rounded-xl text-xs font-bold"
              >
                Lock Marks & Compile Draft
              </button>
            </div>
          </div>
        )}

        {/* Modal 6: Process Results */}
        {activeRegistrarModal === 'process-results' && (
          <div className="p-6 space-y-4">
            <p className="text-xs text-gray-600">
              Generating statistical grade distribution, calculating GPA/percentages, and verifying student rank lists.
            </p>
            <div className="pt-3 border-t border-gray-100 flex justify-end gap-2">
              <button
                onClick={() => setActiveRegistrarModal(null)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setActiveRegistrarModal(null);
                  setToast('Result tabulation register compiled. Ready for Vice-Chancellor assent.');
                }}
                className="px-5 py-2 bg-[#2563eb] text-white rounded-xl text-xs font-bold"
              >
                Compile Tabulation Register
              </button>
            </div>
          </div>
        )}

        {/* Modal 7: Publish Results */}
        {activeRegistrarModal === 'publish-results' && (
          <div className="p-6 space-y-4">
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-950 space-y-1">
              <span className="font-black text-sm block">Official Result Declaration</span>
              <p>Subject: <strong>{registrarFilters.subject}</strong></p>
              <p>Programme: <strong>{registrarFilters.programme} ({registrarFilters.phase})</strong></p>
              <p className="text-emerald-700 text-[11px] pt-1">VC approval reference: ACU/VC/2025/APP-082 (Assented)</p>
            </div>
            <div className="pt-3 border-t border-gray-100 flex justify-end gap-2">
              <button
                onClick={() => setActiveRegistrarModal(null)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handlePublishResult}
                className="px-5 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-md hover:bg-emerald-700"
              >
                Publish Results to Student Portal
              </button>
            </div>
          </div>
        )}

        {/* Modal 8: Revaluation */}
        {activeRegistrarModal === 'reval' && (
          <div className="p-6 space-y-4">
            <p className="text-xs text-gray-600">
              Revaluation and answer script digital copy request window open for 15 days from publication.
            </p>
            <div className="pt-3 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => {
                  setActiveRegistrarModal(null);
                  setToast('Revaluation portal active for candidate applications.');
                }}
                className="px-5 py-2 bg-[#0d9488] text-white rounded-xl text-xs font-bold"
              >
                Open Revaluation Window
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

