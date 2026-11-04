import React, { useState } from 'react';
import { FolderX, Folder, Download } from 'lucide-react';

export const StudentResourceRepositoryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showEmptyState, setShowEmptyState] = useState(false);

  const categories = [
    {
      id: 'cat-1',
      title: 'Human Physiology I & II (PHY101)',
      description: 'Guyton & Hall summaries, ECG waveform charts, Spirometry protocols, and hematology guides.',
      filesCount: 16,
    },
    {
      id: 'cat-2',
      title: 'Human Anatomy, Embryology & Histology (ANA101)',
      description: 'Cunningham dissection guides, histological slide atlases, neuroanatomy cross-sections.',
      filesCount: 12,
    },
    {
      id: 'cat-3',
      title: 'Medical Biochemistry & Diagnostics (BIO101)',
      description: 'Harper illustrated notes, metabolic pathway flowcharts, and clinical enzymology handouts.',
      filesCount: 14,
    },
    {
      id: 'cat-4',
      title: 'Early Clinical Exposure & Ethics (ECE101)',
      description: 'NMC AETCOM case studies, hospital ward clinical posting logs, and doctor-patient communication manuals.',
      filesCount: 8,
    },
    {
      id: 'cat-5',
      title: 'Phase 1 MBBS University Question Papers (2019 - 2024)',
      description: 'Solved university end-term examination papers from 2023 to 2025.',
      filesCount: 22,
    },
  ];

  const filtered = categories.filter(
    (c) =>
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Breadcrumb matching Page 24 */}
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        RESOURCE REPOSITORY &gt; MY RESOURCES
      </div>

      <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
          <div className="max-w-md w-full">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search category..."
              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-800 outline-hidden focus:border-[#7047eb]"
            />
          </div>

          <button
            onClick={() => setShowEmptyState(!showEmptyState)}
            className="text-xs font-bold text-purple-700 hover:underline cursor-pointer"
          >
            {showEmptyState ? 'Show Course Resources' : 'Toggle Page 24 Empty State'}
          </button>
        </div>

        <h2 className="text-xs sm:text-sm font-extrabold text-gray-900 uppercase tracking-wide">
          CATEGORIES
        </h2>

        {/* Page 24 Empty State */}
        {showEmptyState || filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[340px] text-center p-8 space-y-3">
            <div className="w-16 h-16 rounded-xl border-2 border-gray-300 flex items-center justify-center text-gray-400">
              <FolderX className="w-8 h-8" />
            </div>
            <p className="text-xs font-semibold text-gray-500">
              No categories found
            </p>
          </div>
        ) : (
          /* Available Learning Resources */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((cat) => (
              <div
                key={cat.id}
                className="p-4 rounded-xl border border-gray-200 bg-white hover:border-[#7047eb] hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                      <Folder className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-bold text-purple-700">
                      {cat.filesCount} Documents
                    </span>
                  </div>

                  <h3 className="text-xs sm:text-sm font-extrabold text-gray-900 leading-snug">
                    {cat.title}
                  </h3>
                  <p className="text-[11px] text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[10px] text-gray-400 font-semibold">
                    Authorized for S4
                  </span>
                  <button
                    onClick={() => alert(`Accessing repository folder: ${cat.title}`)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#7047eb] hover:bg-[#5b32d6] text-white font-bold text-[11px] transition-colors cursor-pointer"
                  >
                    <Download className="w-3 h-3" />
                    <span>Access Files</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
