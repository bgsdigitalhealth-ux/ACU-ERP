import React, { useState } from 'react';
import {
  Gavel,
  XCircle,
  FileText,
  Search,
  X,
  Check,
  Download
} from 'lucide-react';
import { useUniversityAdmin } from '../../../../context/UniversityAdminContext';
import { EXCEPTIONAL_CASES_DATA } from '../../../../data/vcSubmodulesData';

export const VcExceptionalCasesPage: React.FC = () => {
  const { setToast } = useUniversityAdmin();
  const [cases, setCases] = useState(EXCEPTIONAL_CASES_DATA);
  const [search, setSearch] = useState('');
  const [activeCaseModal, setActiveCaseModal] = useState<any | null>(null);
  const [decisionRemarks, setDecisionRemarks] = useState('');

  const handleDecision = (id: string, action: 'Approved' | 'Rejected') => {
    setCases((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              status: action === 'Approved' ? 'Approved' : 'Rejected',
              remarks: decisionRemarks || (action === 'Approved' ? 'Approved by Vice-Chancellor under executive discretion.' : 'Rejected under University Ordinance guidelines.')
            }
          : c
      )
    );
    setToast(`Case ${id} has been formally ${action} by the Vice-Chancellor.`);
    setActiveCaseModal(null);
    setDecisionRemarks('');
  };

  const filtered = cases.filter(
    (c) =>
      c.studentName.toLowerCase().includes(search.toLowerCase()) ||
      c.usn.toLowerCase().includes(search.toLowerCase()) ||
      c.college.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5 p-4 sm:p-6 bg-[#f8f9fe] min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#29084e] via-[#3d0a6c] to-[#250646] text-white p-5 sm:p-6 rounded-2xl shadow-lg border border-[#581c87] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-1">
            <Gavel className="w-4 h-4" />
            <span>Executive Prerogative</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            Exceptional Examination Petitions &amp; Condonations
          </h1>
          <p className="text-xs sm:text-sm text-purple-200 mt-1">
            Student special permissions, medical attendance condonations, scribe allotments &amp; extraordinary exam sittings.
          </p>
        </div>

        <div className="px-3.5 py-1.5 rounded-xl bg-purple-900/80 border border-purple-400/30 text-xs font-bold text-amber-300 flex items-center gap-2">
          <span>{cases.filter((c) => c.status === 'Pending VC Decision').length} Pending VC Decisions</span>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white p-3 sm:p-4 rounded-2xl border border-purple-200/90 shadow-2xs flex items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search student by name, USN, or college..."
            className="w-full pl-9 pr-4 py-2 text-xs font-medium bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-600"
          />
        </div>
      </div>

      {/* Cases List */}
      <div className="space-y-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-purple-200/90 p-5 shadow-2xs hover:shadow-md transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="font-mono text-[11px] font-black text-purple-900 bg-purple-100 px-2.5 py-0.5 rounded-md">
                  {item.usn}
                </span>
                <span className="text-[10px] font-bold text-gray-700 bg-gray-100 px-2 py-0.5 rounded-md">
                  {item.requestType}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    item.urgency === 'High'
                      ? 'bg-rose-100 text-rose-800 border border-rose-300'
                      : item.urgency === 'Urgent'
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : 'bg-blue-100 text-blue-800 border border-blue-300'
                  }`}
                >
                  {item.urgency} Priority
                </span>
                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                    item.status === 'Approved'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : item.status === 'Rejected'
                      ? 'bg-rose-100 text-rose-800 border border-rose-300'
                      : 'bg-purple-100 text-purple-900 border border-purple-300'
                  }`}
                >
                  {item.status}
                </span>
                <span className="text-[11px] text-gray-400">Date: {item.submittedDate}</span>
              </div>

              <h3 className="font-black text-base text-gray-900 leading-snug">
                {item.studentName} • {item.programme} ({item.semester})
              </h3>
              <p className="text-xs text-gray-500 font-semibold">{item.college}</p>

              <p className="text-xs text-gray-700 mt-2 bg-gray-50 p-3 rounded-xl border border-gray-200">
                {item.reason}
              </p>

              <div className="mt-2 text-[11px] text-gray-500">
                Recommended by: <strong className="text-gray-800">{item.recommendingAuthority}</strong>
              </div>
            </div>

            <div className="flex items-center gap-2 lg:shrink-0">
              <button
                onClick={() => setActiveCaseModal(item)}
                className="px-4 py-2 bg-gradient-to-r from-purple-800 to-purple-950 text-white font-bold text-xs rounded-xl shadow-md hover:opacity-95 cursor-pointer flex items-center gap-1.5"
              >
                <Gavel className="w-3.5 h-3.5 text-amber-300" />
                <span>Review Dossier</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Review Modal */}
      {activeCaseModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-2xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-xl w-full p-5 sm:p-6 border border-purple-200 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <span className="font-mono text-xs font-black text-purple-900 bg-purple-100 px-2.5 py-0.5 rounded-md mb-1 inline-block">
                  {activeCaseModal.usn}
                </span>
                <h3 className="font-black text-base text-purple-950">{activeCaseModal.studentName}</h3>
                <p className="text-xs text-gray-500">{activeCaseModal.college}</p>
              </div>
              <button onClick={() => setActiveCaseModal(null)} className="p-1 hover:bg-gray-100 rounded-lg text-gray-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3.5 bg-purple-50 rounded-xl border border-purple-100 text-xs space-y-1">
              <span className="text-[10px] text-purple-800 font-bold uppercase tracking-wider block">
                Petition Categorization: {activeCaseModal.requestType}
              </span>
              <p className="text-gray-800 font-medium">{activeCaseModal.reason}</p>
            </div>

            <div>
              <h4 className="text-xs font-bold text-gray-900 mb-2">Attached Statutory &amp; Clinical Exhibits</h4>
              <div className="space-y-1.5">
                {activeCaseModal.documentsAttached.map((doc: string, i: number) => (
                  <div
                    key={i}
                    onClick={() => setToast(`Opening certified preview for ${doc}`)}
                    className="p-2.5 bg-gray-50 hover:bg-purple-50 rounded-xl border border-gray-200 flex items-center justify-between text-xs text-gray-800 font-medium cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-purple-700" />
                      <span>{doc}</span>
                    </div>
                    <Download className="w-3.5 h-3.5 text-gray-400" />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Vice-Chancellor Decree Remarks</label>
              <textarea
                rows={3}
                value={decisionRemarks}
                onChange={(e) => setDecisionRemarks(e.target.value)}
                placeholder="Enter statutory grounds or conditions for approval/rejection..."
                className="w-full text-xs p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-600"
              />
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-gray-100">
              <button
                onClick={() => handleDecision(activeCaseModal.id, 'Rejected')}
                className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-300 font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer"
              >
                <XCircle className="w-4 h-4" />
                <span>Reject Petition</span>
              </button>

              <button
                onClick={() => handleDecision(activeCaseModal.id, 'Approved')}
                className="px-5 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-black text-xs rounded-xl shadow-md flex items-center gap-2 cursor-pointer"
              >
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Issue Vice-Chancellor Assent</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
