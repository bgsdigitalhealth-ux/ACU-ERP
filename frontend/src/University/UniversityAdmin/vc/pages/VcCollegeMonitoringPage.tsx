import React, { useState } from 'react';
import {
  Building2,
  ShieldCheck,
  Search,
  X,
  Send
} from 'lucide-react';
import { useUniversityAdmin } from '../../../../context/UniversityAdminContext';
import { COLLEGE_MONITORING_DATA } from '../../../../data/vcSubmodulesData';

export const VcCollegeMonitoringPage: React.FC = () => {
  const { setToast } = useUniversityAdmin();
  const [search, setSearch] = useState('');
  const [activeCollege, setActiveCollege] = useState<any | null>(null);
  const [memoText, setMemoText] = useState('');

  const filtered = COLLEGE_MONITORING_DATA.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.code.toLowerCase().includes(search.toLowerCase()) ||
      c.principal.toLowerCase().includes(search.toLowerCase())
  );

  const handleSendMemo = () => {
    if (!memoText.trim()) return;
    setToast(`Vice-Chancellor Executive Directives dispatched to ${activeCollege?.principal}`);
    setMemoText('');
    setActiveCollege(null);
  };

  return (
    <div className="space-y-5 p-4 sm:p-6 bg-[#f8f9fe] min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#29084e] via-[#3d0a6c] to-[#250646] text-white p-5 sm:p-6 rounded-2xl shadow-lg border border-[#581c87] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-1">
            <Building2 className="w-4 h-4" />
            <span>Institution Oversight</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            Constituent Colleges Live Monitoring
          </h1>
          <p className="text-xs sm:text-sm text-purple-200 mt-1">
            Institutional examination integrity, live surveillance link, invigilator deployment &amp; compliance audit.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-xl bg-purple-900/80 border border-purple-400/30 text-xs font-bold text-amber-300 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>14 Constituent Colleges Active</span>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-3 sm:p-4 rounded-2xl border border-purple-200/90 shadow-2xs flex items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search college name, code, or dean..."
            className="w-full pl-9 pr-4 py-2 text-xs font-medium bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-600"
          />
        </div>
      </div>

      {/* Colleges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((col) => (
          <div
            key={col.id}
            className="bg-white rounded-2xl border border-purple-200/90 shadow-2xs p-5 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-black text-xs shrink-0 border border-purple-200">
                  {col.code.split('-')[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm text-gray-900 leading-snug line-clamp-2">{col.name}</h3>
                  <span className="text-[11px] font-mono font-bold text-purple-700">{col.code}</span>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold border shrink-0 ${
                    col.cctvStatus === 'Online'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                      : 'bg-amber-50 text-amber-800 border-amber-300'
                  }`}
                >
                  {col.cctvStatus}
                </span>
              </div>

              <div className="mt-4 space-y-2 text-xs">
                <div className="flex items-center justify-between text-gray-600">
                  <span className="text-[11px] text-gray-500">Principal:</span>
                  <span className="font-bold text-gray-900 truncate max-w-[180px]">{col.principal}</span>
                </div>
                <div className="flex items-center justify-between text-gray-600">
                  <span className="text-[11px] text-gray-500">Total Students:</span>
                  <span className="font-black text-purple-950">{col.totalStudents.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-gray-600">
                  <span className="text-[11px] text-gray-500">Examinations Conducted:</span>
                  <span className="font-bold text-emerald-700">
                    {col.examsConducted} / {col.examsScheduled}
                  </span>
                </div>
                <div className="flex items-center justify-between text-gray-600">
                  <span className="text-[11px] text-gray-500">Active Invigilators:</span>
                  <span className="font-semibold text-gray-800">{col.invigilatorsActive} Assigned</span>
                </div>
              </div>

              {/* Compliance score bar */}
              <div className="mt-4 pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between text-[11px] font-bold mb-1">
                  <span className="text-gray-500">Integrity &amp; Compliance Score</span>
                  <span className="text-emerald-700">{col.complianceScore}%</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${col.complianceScore}%` }} />
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
              <button
                onClick={() => setActiveCollege(col)}
                className="w-full py-2 bg-purple-50 hover:bg-purple-100 text-purple-900 font-bold text-xs rounded-xl border border-purple-200 transition-colors cursor-pointer"
              >
                Direct VC Directive
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Send VC Directive Modal */}
      {activeCollege && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-2xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 sm:p-6 border border-purple-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="font-black text-base text-purple-950">Issue Vice-Chancellor Directives</h3>
                <p className="text-xs text-gray-500">{activeCollege.name}</p>
              </div>
              <button onClick={() => setActiveCollege(null)} className="p-1 hover:bg-gray-100 rounded-lg text-gray-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-purple-50 rounded-xl border border-purple-100 text-xs">
                <span className="font-bold text-purple-950 block">Recipient: {activeCollege.principal}</span>
                <span className="text-gray-500">CC: Controller of Examination, Registrar (Evaluation)</span>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Directive / Executive Memo Content</label>
                <textarea
                  rows={4}
                  value={memoText}
                  onChange={(e) => setMemoText(e.target.value)}
                  placeholder="Enter directive regarding examination hall readiness, strict CCTV compliance, or evaluation pace..."
                  className="w-full text-xs p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-600"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setActiveCollege(null)}
                className="px-4 py-2 border border-gray-200 text-gray-700 font-bold text-xs rounded-xl hover:bg-gray-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSendMemo}
                className="px-4 py-2 bg-gradient-to-r from-purple-800 to-purple-950 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer hover:opacity-95 flex items-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Issue Directive</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
