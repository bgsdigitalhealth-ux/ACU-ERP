import React, { useState } from 'react';
import {
  Scroll,
  BookOpen,
  Search,
  Download,
  Plus,
  X
} from 'lucide-react';
import { useUniversityAdmin } from '../../../../context/UniversityAdminContext';
import { EXAM_REGULATIONS_DATA } from '../../../../data/vcSubmodulesData';

export const VcExamRegulationsPage: React.FC = () => {
  const { setToast } = useUniversityAdmin();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeRegModal, setActiveRegModal] = useState<any | null>(null);
  const [newRegOpen, setNewRegOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const filtered = EXAM_REGULATIONS_DATA.filter((r) => {
    const matchesSearch =
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.code.toLowerCase().includes(search.toLowerCase()) ||
      r.programme.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || r.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-5 p-4 sm:p-6 bg-[#f8f9fe] min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#29084e] via-[#3d0a6c] to-[#250646] text-white p-5 sm:p-6 rounded-2xl shadow-lg border border-[#581c87] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-1">
            <Scroll className="w-4 h-4" />
            <span>Academic &amp; Exam Governance</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            University Examination Regulations &amp; Ordinances
          </h1>
          <p className="text-xs sm:text-sm text-purple-200 mt-1">
            Statutory examination ordinances, double valuation statutes, attendance condonation norms &amp; CBME rules.
          </p>
        </div>

        <button
          onClick={() => setNewRegOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-purple-950 font-black text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Propose Ordinance Amendment</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-3 sm:p-4 rounded-2xl border border-purple-200/90 shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search regulations by title, statute code, or programme..."
            className="w-full pl-9 pr-4 py-2 text-xs font-medium bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-600"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {['All', 'Medical (CBME)', 'General', 'Pharmacy'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-purple-900 text-amber-300 shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Regulations List */}
      <div className="space-y-3">
        {filtered.map((reg) => (
          <div
            key={reg.id}
            className="bg-white rounded-2xl border border-purple-200/90 p-5 shadow-2xs hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="font-mono text-[11px] font-black text-purple-900 bg-purple-100 px-2.5 py-0.5 rounded-md">
                  {reg.code}
                </span>
                <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">
                  {reg.category}
                </span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                  {reg.status}
                </span>
                <span className="text-[11px] text-gray-400">Effective: {reg.effectiveDate}</span>
              </div>

              <h3 className="font-black text-base text-gray-900 leading-snug">{reg.title}</h3>
              <p className="text-xs text-gray-600 mt-1 line-clamp-2">{reg.description}</p>
            </div>

            <div className="flex items-center gap-2 md:shrink-0">
              <button
                onClick={() => setActiveRegModal(reg)}
                className="px-3.5 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 font-bold text-xs border border-purple-200 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5 text-purple-700" />
                <span>View Statute</span>
              </button>
              <button
                onClick={() => setToast(`Downloading official gazetted copy of ${reg.code}...`)}
                className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors cursor-pointer"
                title="Download PDF"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Regulation Clauses Modal */}
      {activeRegModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-2xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-5 sm:p-6 border border-purple-200 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <span className="font-mono text-xs font-black text-purple-900 bg-purple-100 px-2 py-0.5 rounded-md mb-1 inline-block">
                  {activeRegModal.code}
                </span>
                <h3 className="font-black text-base text-purple-950">{activeRegModal.title}</h3>
              </div>
              <button onClick={() => setActiveRegModal(null)} className="p-1 hover:bg-gray-100 rounded-lg text-gray-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-gray-700 leading-relaxed bg-purple-50/50 p-3.5 rounded-xl border border-purple-100">
              {activeRegModal.description}
            </p>

            <div>
              <h4 className="text-xs font-black uppercase text-purple-900 tracking-wider mb-2">
                Operative Statutory Clauses &amp; Decrees
              </h4>
              <div className="space-y-2">
                {activeRegModal.clauses.map((clause: string, i: number) => (
                  <div key={i} className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-800 font-medium">
                    {clause}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-gray-100">
              <span className="text-[11px] text-gray-500 font-semibold">
                Approved by Academic Council &amp; Syndicate of ACU
              </span>
              <button
                onClick={() => {
                  setToast(`Official ordinance document generated for ${activeRegModal.code}`);
                  setActiveRegModal(null);
                }}
                className="px-4 py-2 bg-gradient-to-r from-purple-800 to-purple-950 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer hover:opacity-95 flex items-center gap-2"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Sealed PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Propose Amendment Modal */}
      {newRegOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-2xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 sm:p-6 border border-purple-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-black text-base text-purple-950">Draft Ordinance / Regulation Amendment</h3>
              <button onClick={() => setNewRegOpen(false)} className="p-1 hover:bg-gray-100 rounded-lg text-gray-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Statutory Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Amendment to CBME Clinical Valuation Rubric 2025"
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl"
                />
              </div>
              <div>
                <label className="font-bold text-gray-700 block mb-1">Target Faculty / Board</label>
                <select className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl">
                  <option>Faculty of Medicine (AIMS / BGS MCH)</option>
                  <option>Faculty of Pharmacy</option>
                  <option>Faculty of Allied Health Sciences</option>
                  <option>Faculty of Engineering &amp; Technology</option>
                </select>
              </div>
              <div>
                <label className="font-bold text-gray-700 block mb-1">Justification &amp; Proposed Clause Text</label>
                <textarea
                  rows={4}
                  placeholder="Detail the amendment reason and revised statutory clause..."
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setNewRegOpen(false)}
                className="px-4 py-2 border border-gray-200 text-gray-700 font-bold text-xs rounded-xl hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setToast('Amendment draft forwarded to Registrar & Statutory Drafting Committee.');
                  setNewRegOpen(false);
                  setNewTitle('');
                }}
                className="px-4 py-2 bg-gradient-to-r from-purple-800 to-purple-950 text-white font-bold text-xs rounded-xl shadow-md"
              >
                Submit for Academic Council
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
