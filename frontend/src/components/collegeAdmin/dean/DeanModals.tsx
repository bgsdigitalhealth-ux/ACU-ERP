import React, { useState } from 'react';
import { X, CheckCircle2, Video } from 'lucide-react';
import { useCollegeAdmin } from '../../../context/CollegeAdminContext';

export const DeanModals: React.FC = () => {
  const {
    activeDeanModal,
    setActiveDeanModal,
    handleCreateExamSession,
    handleVerifyReadiness,
    handleIssueMaterials,
    setToast
  } = useCollegeAdmin();

  const [sessionTitle, setSessionTitle] = useState('MBBS Phase II Theory Session');
  const [hallsCount, setHallsCount] = useState(4);

  if (!activeDeanModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none">
      <div className="bg-white rounded-3xl shadow-2xl border border-purple-200/90 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#380665] via-[#4B087B] to-[#250444] text-white px-5 py-4 flex items-center justify-between">
          <h3 className="font-extrabold text-base tracking-tight text-white flex items-center gap-2">
            {activeDeanModal === 'session' && 'Create Exam Session'}
            {activeDeanModal === 'invigilators' && 'Allocate Invigilator Squad'}
            {activeDeanModal === 'substitute' && 'Manage Reliever / Substitute Invigilator'}
            {activeDeanModal === 'readiness' && 'Exam Hall Readiness Checklist'}
            {activeDeanModal === 'materials' && 'Confidential Exam Material Issue & Receipt'}
            {activeDeanModal === 'monitoring' && 'Live Examination Command & CCTV Monitoring'}
          </h3>
          <button
            onClick={() => setActiveDeanModal(null)}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal 1: Create Session */}
        {activeDeanModal === 'session' && (
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Session Description</label>
              <input
                type="text"
                value={sessionTitle}
                onChange={(e) => setSessionTitle(e.target.value)}
                className="w-full text-xs p-2.5 border border-gray-300 rounded-xl font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Number of Examination Halls</label>
              <input
                type="number"
                value={hallsCount}
                onChange={(e) => setHallsCount(Number(e.target.value))}
                className="w-full text-xs p-2.5 border border-gray-300 rounded-xl font-bold"
              />
            </div>
            <div className="pt-3 border-t border-gray-100 flex justify-end gap-2">
              <button
                onClick={() => setActiveDeanModal(null)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => handleCreateExamSession(sessionTitle, hallsCount)}
                className="px-5 py-2 bg-[#4B087B] text-white rounded-xl text-xs font-bold shadow-md hover:bg-[#38045e]"
              >
                Create Session
              </button>
            </div>
          </div>
        )}

        {/* Modal 2: Allocate Invigilators */}
        {activeDeanModal === 'invigilators' && (
          <div className="p-6 space-y-4">
            <p className="text-xs text-gray-600">
              86 Faculty members available in roster. 68 invigilators active across Halls 1 to 14.
            </p>
            <div className="p-3 bg-purple-50 border border-purple-200 rounded-xl text-xs text-purple-900 space-y-1">
              <span className="font-bold">Norms Compliance</span>
              <p>Ratio: 1 Invigilator per 30 students. Two invigilators per examination hall minimum.</p>
            </div>
            <div className="pt-3 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => {
                  setActiveDeanModal(null);
                  setToast('Invigilator squad allocated and notified.');
                }}
                className="px-5 py-2 bg-[#0284c7] text-white rounded-xl text-xs font-bold"
              >
                Confirm Allocation
              </button>
            </div>
          </div>
        )}

        {/* Modal 3: Substitute */}
        {activeDeanModal === 'substitute' && (
          <div className="p-6 space-y-4">
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900">
              Standby relievers on duty: Dr. C. Verma, Dr. T. Nayak. Immediate replacement available on emergency leave.
            </div>
            <div className="pt-3 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => {
                  setActiveDeanModal(null);
                  setToast('Standby relievers assigned to Halls 1–4.');
                }}
                className="px-5 py-2 bg-[#ea580c] text-white rounded-xl text-xs font-bold"
              >
                Confirm Reliever Protocol
              </button>
            </div>
          </div>
        )}

        {/* Modal 4: Hall Readiness */}
        {activeDeanModal === 'readiness' && (
          <div className="p-6 space-y-4">
            <div className="space-y-2 text-xs">
              {[
                'CCTV Surveillance Cameras active and recording in all 14 halls',
                'Desk spacing 1.5m maintained with candidate roll stickers pasted',
                'Mobile phone jammers & signal blockers operational in main block',
                'Drinking water & emergency medical kit stationed'
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 p-2 bg-emerald-50/70 border border-emerald-200 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-semibold text-gray-800">{item}</span>
                </div>
              ))}
            </div>
            <div className="pt-3 border-t border-gray-100 flex justify-end gap-2">
              <button
                onClick={() => setActiveDeanModal(null)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleVerifyReadiness}
                className="px-5 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-md hover:bg-emerald-700"
              >
                Verify & Certify Hall Readiness
              </button>
            </div>
          </div>
        )}

        {/* Modal 5: Materials */}
        {activeDeanModal === 'materials' && (
          <div className="p-6 space-y-4">
            <div className="p-3 bg-pink-50 border border-pink-200 rounded-xl text-xs text-pink-900 space-y-1">
              <span className="font-bold">Confidential Custody Handover</span>
              <p>Question paper packets sealed with tamper-proof security wax seals. Handover requires dual biometric authorization.</p>
            </div>
            <div className="pt-3 border-t border-gray-100 flex justify-end gap-2">
              <button
                onClick={() => setActiveDeanModal(null)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleIssueMaterials}
                className="px-5 py-2 bg-[#db2777] text-white rounded-xl text-xs font-bold shadow-md hover:bg-[#be185d]"
              >
                Issue Exam Packets
              </button>
            </div>
          </div>
        )}

        {/* Modal 6: Live Monitoring */}
        {activeDeanModal === 'monitoring' && (
          <div className="p-6 space-y-4">
            <div className="bg-gray-900 text-white p-4 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Video className="w-5 h-5 text-red-500 animate-pulse" />
                <span className="text-xs font-bold">14 Live CCTV Streams Active</span>
              </div>
              <span className="text-[10px] bg-red-600 px-2 py-0.5 rounded-full font-black uppercase">
                REC
              </span>
            </div>
            <p className="text-xs text-gray-600">
              Exam halls 1 to 4 operating at full compliance. Zero mobile violations or unauthorized materials detected.
            </p>
            <div className="pt-3 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => {
                  setActiveDeanModal(null);
                  setToast('CCTV recording logs archived for University audit.');
                }}
                className="px-5 py-2 bg-[#7c3aed] text-white rounded-xl text-xs font-bold"
              >
                Close Live Monitor
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
