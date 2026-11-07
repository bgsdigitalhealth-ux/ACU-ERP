import React, { useState } from 'react';
import {
  Calendar,
  Check,
  X
} from 'lucide-react';
import { useUniversityAdmin } from '../../../../context/UniversityAdminContext';
import { SCHEDULE_MODIFICATIONS_DATA } from '../../../../data/vcSubmodulesData';

export const VcScheduleModificationsPage: React.FC = () => {
  const { setToast } = useUniversityAdmin();
  const [requests, setRequests] = useState(SCHEDULE_MODIFICATIONS_DATA);
  const [activeModal, setActiveModal] = useState<any | null>(null);
  const [remarks, setRemarks] = useState('');

  const handleAction = (id: string, action: 'Approved' | 'Rejected') => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: action } : r))
    );
    setToast(`Timetable modification for ${id} has been ${action} by Vice-Chancellor.`);
    setActiveModal(null);
    setRemarks('');
  };

  return (
    <div className="space-y-5 p-4 sm:p-6 bg-[#f8f9fe] min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#29084e] via-[#3d0a6c] to-[#250646] text-white p-5 sm:p-6 rounded-2xl shadow-lg border border-[#581c87] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-1">
            <Calendar className="w-4 h-4" />
            <span>Timetable Governance</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            Examination Schedule Modifications
          </h1>
          <p className="text-xs sm:text-sm text-purple-200 mt-1">
            Institutional petitions to reschedule theory and clinical practical board examinations under emergency conditions.
          </p>
        </div>

        <div className="px-3.5 py-1.5 rounded-xl bg-purple-900/80 border border-purple-400/30 text-xs font-bold text-amber-300">
          <span>{requests.filter((r) => r.status === 'Pending Approval').length} Pending Requests</span>
        </div>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {requests.map((req) => (
          <div
            key={req.id}
            className="bg-white rounded-2xl border border-purple-200/90 p-5 shadow-2xs hover:shadow-md transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="font-mono text-[11px] font-black text-purple-900 bg-purple-100 px-2.5 py-0.5 rounded-md">
                  {req.courseCode}
                </span>
                <span className="text-[10px] font-bold text-gray-700 bg-gray-100 px-2 py-0.5 rounded-md">
                  {req.programme}
                </span>
                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                    req.status === 'Approved'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : req.status === 'Rejected'
                      ? 'bg-rose-100 text-rose-800 border border-rose-300'
                      : 'bg-amber-100 text-amber-800 border border-amber-300'
                  }`}
                >
                  {req.status}
                </span>
                <span className="text-[11px] text-gray-500 font-medium">
                  Impact: <strong className="text-gray-800">{req.affectedStudents} Candidates</strong>
                </span>
              </div>

              <h3 className="font-black text-base text-gray-900 leading-snug">{req.courseName}</h3>
              <p className="text-xs text-gray-500 font-semibold">{req.college}</p>

              {/* Existing vs Proposed comparison */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                <div className="p-3 bg-rose-50/70 border border-rose-200 rounded-xl text-xs">
                  <span className="text-[10px] text-rose-700 font-bold uppercase block mb-0.5">Existing Timetable</span>
                  <div className="font-bold text-gray-900">{req.existingDate}</div>
                  <div className="text-[11px] text-gray-600">{req.existingSession}</div>
                </div>

                <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs">
                  <span className="text-[10px] text-emerald-700 font-bold uppercase block mb-0.5">Proposed Modification</span>
                  <div className="font-bold text-gray-900">{req.proposedDate}</div>
                  <div className="text-[11px] text-gray-600">{req.proposedSession}</div>
                </div>
              </div>

              <p className="text-xs text-gray-700 mt-2 bg-gray-50 p-2.5 rounded-xl border border-gray-200">
                <strong>Justification:</strong> {req.reason}
              </p>
            </div>

            <div className="flex items-center gap-2 lg:shrink-0">
              <button
                onClick={() => setActiveModal(req)}
                className="px-4 py-2 bg-gradient-to-r from-purple-800 to-purple-950 text-white font-bold text-xs rounded-xl shadow-md hover:opacity-95 cursor-pointer"
              >
                Decide Modification
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-2xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 sm:p-6 border border-purple-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <span className="font-mono text-xs font-black text-purple-900 bg-purple-100 px-2 py-0.5 rounded-md mb-1 inline-block">
                  {activeModal.courseCode}
                </span>
                <h3 className="font-black text-base text-purple-950">{activeModal.courseName}</h3>
              </div>
              <button onClick={() => setActiveModal(null)} className="p-1 hover:bg-gray-100 rounded-lg text-gray-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 bg-purple-50 rounded-xl border border-purple-100 text-xs space-y-1">
              <span className="font-bold text-purple-900 block">Requested by: {activeModal.requestedBy}</span>
              <p className="text-gray-700">{activeModal.coERecommendation}</p>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Vice-Chancellor Approval Decree Remarks</label>
              <textarea
                rows={3}
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Approved under emergency academic powers. Controller of Examination to notify centres..."
                className="w-full text-xs p-3 bg-gray-50 border border-gray-200 rounded-xl"
              />
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-gray-100">
              <button
                onClick={() => handleAction(activeModal.id, 'Rejected')}
                className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-300 font-bold text-xs rounded-xl"
              >
                Reject Request
              </button>

              <button
                onClick={() => handleAction(activeModal.id, 'Approved')}
                className="px-5 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-black text-xs rounded-xl shadow-md flex items-center gap-1.5"
              >
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Approve &amp; Gazet Modification</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
