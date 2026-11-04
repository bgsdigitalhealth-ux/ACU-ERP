import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  ShieldCheck,
  Send,
  X,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { useUniversityAdmin } from '../../../../context/UniversityAdminContext';
import { EXAM_READINESS_DATA } from '../../../../data/vcSubmodulesData';

export const VcExamReadinessPage: React.FC = () => {
  const { setToast } = useUniversityAdmin();
  const [escalateItem, setEscalateItem] = useState<any | null>(null);
  const [escalationRemarks, setEscalationRemarks] = useState('');

  const readyCount = EXAM_READINESS_DATA.filter((r) => r.status === 'Ready').length;
  const inProgressCount = EXAM_READINESS_DATA.filter((r) => r.status === 'In Progress').length;
  const overallAvg = (
    EXAM_READINESS_DATA.reduce((acc, r) => acc + r.progress, 0) / EXAM_READINESS_DATA.length
  ).toFixed(1);

  const handleEscalate = () => {
    if (!escalationRemarks.trim()) return;
    setToast(`Executive escalation order dispatched to ${escalateItem?.responsibleOfficer}.`);
    setEscalateItem(null);
    setEscalationRemarks('');
  };

  return (
    <div className="space-y-5 p-4 sm:p-6 bg-[#f8f9fe] min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#29084e] via-[#3d0a6c] to-[#250646] text-white p-5 sm:p-6 rounded-2xl shadow-lg border border-[#581c87] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Operational Integrity Audit</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            University Examination Readiness Audit
          </h1>
          <p className="text-xs sm:text-sm text-purple-200 mt-1">
            Comprehensive pre-examination readiness checklist, QP encryption, hall tickets &amp; invigilation allocations.
          </p>
        </div>

        <div className="bg-purple-900/80 border border-purple-400/40 p-3 rounded-2xl flex items-center gap-4">
          <div>
            <span className="text-[10px] text-purple-200 font-bold block">Overall University Readiness</span>
            <span className="text-2xl font-black text-amber-300">{overallAvg}%</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-400 text-purple-950 flex items-center justify-center font-black">
            <TrendingUp className="w-6 h-6 stroke-[2.5]" />
          </div>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-emerald-200 shadow-2xs flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xl font-black text-emerald-950">{readyCount} Modules</span>
            <p className="text-xs text-gray-500 font-medium">100% Certified Ready</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-2xs flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-black shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xl font-black text-amber-950">{inProgressCount} Ongoing Tasks</span>
            <p className="text-xs text-gray-500 font-medium">Within Timed SLA Window</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-purple-200 shadow-2xs flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center font-black shrink-0">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xl font-black text-purple-950">256-bit AES</span>
            <p className="text-xs text-gray-500 font-medium">Encrypted QP Dual-Key Active</p>
          </div>
        </div>
      </div>

      {/* Checklist Grid */}
      <div className="bg-white rounded-2xl border border-purple-200/90 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-extrabold text-sm sm:text-base text-purple-950">
            Statutory Examination Prerequisites &amp; Verification Roster
          </h3>
          <span className="text-xs font-semibold text-gray-500">Live University Roster</span>
        </div>

        <div className="divide-y divide-gray-100">
          {EXAM_READINESS_DATA.map((item) => (
            <div
              key={item.id}
              className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-purple-50/30 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-800 bg-purple-100 px-2 py-0.5 rounded-full">
                    {item.category}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.status === 'Ready'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-amber-100 text-amber-800 border border-amber-300'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <h4 className="font-bold text-sm text-gray-900 leading-snug">{item.task}</h4>
                <p className="text-xs text-gray-500 mt-1">{item.notes}</p>
                <div className="mt-2 text-[11px] text-gray-500 flex items-center gap-4">
                  <span>
                    Custodian: <strong className="text-gray-800">{item.responsibleOfficer}</strong>
                  </span>
                  <span>
                    Deadline: <strong className="text-gray-800">{item.deadline}</strong>
                  </span>
                </div>
              </div>

              {/* Progress and Actions */}
              <div className="flex items-center gap-4 sm:shrink-0">
                <div className="w-32">
                  <div className="flex items-center justify-between text-xs font-black mb-1">
                    <span className="text-gray-600">Progress</span>
                    <span className={item.progress === 100 ? 'text-emerald-700' : 'text-purple-700'}>
                      {item.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${item.progress === 100 ? 'bg-emerald-500' : 'bg-purple-600'}`}
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>

                {item.status !== 'Ready' && (
                  <button
                    onClick={() => setEscalateItem(item)}
                    className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    <span>Escalate</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Escalation Modal */}
      {escalateItem && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-2xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 sm:p-6 border border-purple-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="font-black text-base text-purple-950">Vice-Chancellor Executive Escalation</h3>
                <p className="text-xs text-gray-500">{escalateItem.task}</p>
              </div>
              <button onClick={() => setEscalateItem(null)} className="p-1 hover:bg-gray-100 rounded-lg text-gray-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs space-y-1">
              <span className="font-bold text-amber-950 block">Officer Responsible: {escalateItem.responsibleOfficer}</span>
              <p className="text-amber-800">Current Progress: {escalateItem.progress}% • Target: {escalateItem.deadline}</p>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Apex Directive / Warning Remarks</label>
              <textarea
                rows={3}
                value={escalationRemarks}
                onChange={(e) => setEscalationRemarks(e.target.value)}
                placeholder="Direct officer to resolve within 24 hours under Vice-Chancellor emergency provisions..."
                className="w-full text-xs p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-600"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setEscalateItem(null)}
                className="px-4 py-2 border border-gray-200 text-gray-700 font-bold text-xs rounded-xl hover:bg-gray-50 cursor-pointer"
              >
                Dismiss
              </button>
              <button
                onClick={handleEscalate}
                className="px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer hover:opacity-95 flex items-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Issue Order</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
