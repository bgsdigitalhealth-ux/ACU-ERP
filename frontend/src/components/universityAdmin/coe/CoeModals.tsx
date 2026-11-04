import React, { useState } from 'react';
import { X, UploadCloud } from 'lucide-react';
import { useUniversityAdmin } from '../../../context/UniversityAdminContext';

export const CoeModals: React.FC = () => {
  const {
    activeCoeModal,
    setActiveCoeModal,
    handleCreateExam,
    handleAllocateExaminers,
    setToast,
    coeFilters
  } = useUniversityAdmin();

  // Local state for Create Exam
  const [newExamSubject, setNewExamSubject] = useState('Pharmacology');
  const [newExamType, setNewExamType] = useState<'Theory' | 'Practical'>('Practical');

  // Local state for Allocate Examiners
  const [examinersCount, setExaminersCount] = useState(4);
  const [selectedSubject, setSelectedSubject] = useState(coeFilters.subject);

  if (!activeCoeModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none">
      <div className="bg-white rounded-3xl shadow-2xl border border-purple-200/90 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#380665] via-[#4B087B] to-[#250444] text-white px-5 py-4 flex items-center justify-between">
          <h3 className="font-extrabold text-base tracking-tight text-white flex items-center gap-2">
            {activeCoeModal === 'create-exam' && 'Create & Schedule University Examination'}
            {activeCoeModal === 'allocate-examiners' && 'Allocate Examiners Panel'}
            {activeCoeModal === 'centre-alloc' && 'Allocate Examination Centres'}
            {activeCoeModal === 'upload-marks' && 'Upload Practical Exam Marks'}
            {activeCoeModal === 'process-results' && 'Process & Publish Semester Results'}
          </h3>
          <button
            onClick={() => setActiveCoeModal(null)}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal 1: Create Exam */}
        {activeCoeModal === 'create-exam' && (
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Subject Name</label>
              <input
                type="text"
                value={newExamSubject}
                onChange={(e) => setNewExamSubject(e.target.value)}
                className="w-full text-xs p-2.5 border border-gray-300 rounded-xl font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Component</label>
              <div className="flex gap-2">
                {(['Practical', 'Theory'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setNewExamType(t)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      newExamType === t
                        ? 'bg-[#4B087B] text-white border-[#4B087B]'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-2">
              <button
                onClick={() => setActiveCoeModal(null)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl text-xs font-semibold hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleCreateExam(newExamSubject, newExamType)}
                className="px-5 py-2 bg-[#4B087B] text-white rounded-xl text-xs font-bold shadow-md hover:bg-[#38045e]"
              >
                Create & Add to Timetable
              </button>
            </div>
          </div>
        )}

        {/* Modal 2: Allocate Examiners */}
        {activeCoeModal === 'allocate-examiners' && (
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Target Subject</label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full text-xs p-2.5 border border-gray-300 rounded-xl font-bold"
              >
                <option>Physiology</option>
                <option>Anatomy</option>
                <option>Biochemistry</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Number of Empanelled Examiners</label>
              <input
                type="number"
                value={examinersCount}
                onChange={(e) => setExaminersCount(Number(e.target.value))}
                className="w-full text-xs p-2.5 border border-gray-300 rounded-xl font-bold"
              />
            </div>
            <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-2">
              <button
                onClick={() => setActiveCoeModal(null)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl text-xs font-semibold hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleAllocateExaminers(selectedSubject, examinersCount)}
                className="px-5 py-2 bg-[#0284c7] text-white rounded-xl text-xs font-bold shadow-md hover:bg-[#0369a1]"
              >
                Allocate & Issue Order
              </button>
            </div>
          </div>
        )}

        {/* Modal 3: Centre Allocation */}
        {activeCoeModal === 'centre-alloc' && (
          <div className="p-6 space-y-4">
            <p className="text-xs text-gray-600">
              6 Constituent examination centres configured with CCTV live feed and bio-metric attendance hubs.
            </p>
            <div className="space-y-2">
              {['BGS Medical College Central Exam Hall', 'AIMS Auditorium Centre', 'BGSVIAHS Digital Hall'].map((c, i) => (
                <div key={i} className="p-3 bg-purple-50 border border-purple-200 rounded-xl text-xs flex items-center justify-between">
                  <span className="font-bold text-gray-900">{c}</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">Verified</span>
                </div>
              ))}
            </div>
            <div className="pt-3 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => {
                  setActiveCoeModal(null);
                  setToast('Examination centres ratifications updated.');
                }}
                className="px-5 py-2 bg-purple-900 text-white rounded-xl text-xs font-bold"
              >
                Confirm Centre Allotment
              </button>
            </div>
          </div>
        )}

        {/* Modal 4: Upload Marks */}
        {activeCoeModal === 'upload-marks' && (
          <div className="p-6 space-y-4">
            <div className="border-2 border-dashed border-emerald-300 bg-emerald-50/50 p-6 rounded-2xl text-center">
              <UploadCloud className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
              <p className="text-xs font-bold text-gray-800">Practical & Viva marks sheet verified for 142 candidates</p>
              <p className="text-[11px] text-gray-500 mt-1">Signed by Chief External & Internal Examiner</p>
            </div>
            <div className="pt-3 border-t border-gray-100 flex justify-end gap-2">
              <button
                onClick={() => setActiveCoeModal(null)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setActiveCoeModal(null);
                  setToast('Practical marks imported and encrypted into University central ledger.');
                }}
                className="px-5 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold"
              >
                Confirm Marks Import
              </button>
            </div>
          </div>
        )}

        {/* Modal 5: Process Results */}
        {activeCoeModal === 'process-results' && (
          <div className="p-6 space-y-4">
            <div className="p-3 bg-pink-50 border border-pink-200 rounded-xl text-xs text-pink-900 space-y-1">
              <span className="font-bold">Moderation & Grace Marks Protocol</span>
              <p>Pass criteria: 50% aggregate in Theory + Practical with minimum 40% in each component.</p>
            </div>
            <div className="pt-3 border-t border-gray-100 flex justify-end gap-2">
              <button
                onClick={() => setActiveCoeModal(null)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setActiveCoeModal(null);
                  setToast('Results computed. Forwarded to Vice-Chancellor and Registrar for assent.');
                }}
                className="px-5 py-2 bg-[#db2777] text-white rounded-xl text-xs font-bold"
              >
                Execute Result Processing
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

