import React, { useState } from 'react';
import {
  FileCheck2,
  Search,
  Download,
  Eye,
  X,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { useUniversityAdmin } from '../../../../context/UniversityAdminContext';
import { EXAM_POLICIES_DATA } from '../../../../data/vcSubmodulesData';

export const VcPoliciesGuidelinesPage: React.FC = () => {
  const { setToast } = useUniversityAdmin();
  const [search, setSearch] = useState('');
  const [selectedPolicy, setSelectedPolicy] = useState<any | null>(null);

  const filtered = EXAM_POLICIES_DATA.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5 p-4 sm:p-6 bg-[#f8f9fe] min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#29084e] via-[#3d0a6c] to-[#250646] text-white p-5 sm:p-6 rounded-2xl shadow-lg border border-[#581c87] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-1">
            <FileCheck2 className="w-4 h-4" />
            <span>Statutory Policies &amp; Directives</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            University Policies &amp; Examination Guidelines
          </h1>
          <p className="text-xs sm:text-sm text-purple-200 mt-1">
            Official guidelines for Moderation Board, Third Evaluator thresholds, OSM protocols &amp; Flying Squad powers.
          </p>
        </div>

        <div className="px-3.5 py-1.5 rounded-xl bg-purple-900/80 border border-purple-400/30 text-xs font-bold text-amber-300 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Statutory Vice-Chancellor Directives</span>
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
            placeholder="Search policies by keyword, topic, or category..."
            className="w-full pl-9 pr-4 py-2 text-xs font-medium bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-600"
          />
        </div>
      </div>

      {/* Policies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((pol) => (
          <div
            key={pol.id}
            className="bg-white rounded-2xl border border-purple-200/90 p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-800 bg-purple-100 px-2 py-0.5 rounded-md">
                  {pol.category}
                </span>
                <span className="font-mono text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">
                  {pol.version}
                </span>
              </div>

              <h3 className="font-black text-sm text-gray-900 leading-snug mb-1">{pol.title}</h3>
              <p className="text-xs text-gray-600 line-clamp-3 mb-3">{pol.description}</p>

              <div className="space-y-1.5 pt-2 border-t border-gray-100">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Key Operational Rules:</span>
                {pol.keyRules.slice(0, 2).map((rule: string, i: number) => (
                  <div key={i} className="text-[11px] text-gray-700 font-medium flex items-start gap-1.5">
                    <span className="text-purple-600 font-bold">•</span>
                    <span className="line-clamp-2">{rule}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
              <button
                onClick={() => setSelectedPolicy(pol)}
                className="w-full py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 font-bold text-xs border border-purple-200 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5 text-purple-700" />
                <span>Examine Policy</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Policy Details Modal */}
      {selectedPolicy && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-2xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-xl w-full p-5 sm:p-6 border border-purple-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-800 bg-purple-100 px-2 py-0.5 rounded-md mb-1 inline-block">
                  {selectedPolicy.category} • {selectedPolicy.version}
                </span>
                <h3 className="font-black text-base text-purple-950">{selectedPolicy.title}</h3>
              </div>
              <button onClick={() => setSelectedPolicy(null)} className="p-1 hover:bg-gray-100 rounded-lg text-gray-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-gray-700 leading-relaxed bg-purple-50 p-3 rounded-xl border border-purple-100">
              {selectedPolicy.description}
            </p>

            <div>
              <h4 className="text-xs font-bold text-gray-900 mb-2">Statutory Directive Specifications</h4>
              <div className="space-y-2">
                {selectedPolicy.keyRules.map((rule: string, idx: number) => (
                  <div key={idx} className="p-2.5 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-800 font-medium">
                    {rule}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-gray-100">
              <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Active &amp; Binding on All Boards</span>
              </span>
              <button
                onClick={() => {
                  setToast(`Official guideline signed copy downloaded.`);
                  setSelectedPolicy(null);
                }}
                className="px-4 py-2 bg-gradient-to-r from-purple-800 to-purple-950 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer hover:opacity-95 flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
