import React, { useState } from 'react';
import {
  Award,
  Upload,
  Download,
  X
} from 'lucide-react';
import { useUniversityAdmin } from '../../../../context/UniversityAdminContext';
import { ACCREDITATION_METRICS_DATA } from '../../../../data/vcSubmodulesData';

export const VcAccreditationPage: React.FC = () => {
  const { setToast } = useUniversityAdmin();
  const [metrics] = useState(ACCREDITATION_METRICS_DATA);
  const [uploadModal, setUploadModal] = useState<any | null>(null);
  const [docName, setDocName] = useState('');

  const handleUpload = () => {
    if (!docName.trim()) return;
    setToast(`Document "${docName}" uploaded and verified under ${uploadModal?.metricNo}.`);
    setUploadModal(null);
    setDocName('');
  };

  return (
    <div className="space-y-5 p-4 sm:p-6 bg-[#f8f9fe] min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#29084e] via-[#3d0a6c] to-[#250646] text-white p-5 sm:p-6 rounded-2xl shadow-lg border border-[#581c87] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-1">
            <Award className="w-4 h-4" />
            <span>National Accreditation &amp; Statutory Benchmarks</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            Accreditation &amp; Regulatory Compliance (NAAC / NIRF)
          </h1>
          <p className="text-xs sm:text-sm text-purple-200 mt-1">
            NAAC Criterion 2.5: Evaluation Process &amp; Reforms, NIRF Graduate Outcomes &amp; statutory audit exhibits.
          </p>
        </div>

        <button
          onClick={() => setToast('Consolidated NAAC Criterion 2.5 Self-Study Report (SSR) Dossier exported.')}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-purple-950 font-black text-xs flex items-center gap-2 shadow-md cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Export NAAC SSR Dossier</span>
        </button>
      </div>

      {/* Metrics List */}
      <div className="space-y-4">
        {metrics.map((met) => (
          <div
            key={met.id}
            className="bg-white rounded-2xl border border-purple-200/90 p-5 shadow-2xs hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="font-mono text-[10px] font-black text-purple-900 bg-purple-100 px-2.5 py-0.5 rounded-md">
                  Metric {met.metricNo}
                </span>
                <span className="text-[10px] font-bold text-gray-700 bg-gray-100 px-2 py-0.5 rounded-md">
                  {met.criterion}
                </span>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                  {met.auditStatus}
                </span>
              </div>

              <h3 className="font-black text-base text-gray-900 leading-snug">{met.title}</h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3 text-xs">
                <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-200">
                  <span className="text-[10px] text-gray-400 font-bold block uppercase">Statutory Benchmark</span>
                  <span className="font-bold text-gray-800">{met.benchmark}</span>
                </div>
                <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200">
                  <span className="text-[10px] text-emerald-700 font-bold block uppercase">Achieved Score</span>
                  <span className="font-black text-emerald-900">{met.currentScore}</span>
                </div>
                <div className="p-2.5 bg-purple-50 rounded-xl border border-purple-100">
                  <span className="text-[10px] text-purple-700 font-bold block uppercase">Certified Evidence</span>
                  <span className="font-black text-purple-950">{met.documentsCount} Documents Verified</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 md:shrink-0">
              <button
                onClick={() => setUploadModal(met)}
                className="px-3.5 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 font-bold text-xs border border-purple-200 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5 text-purple-700" />
                <span>Upload Exhibit</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {uploadModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-2xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 sm:p-6 border border-purple-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <span className="font-mono text-xs font-black text-purple-900 bg-purple-100 px-2 py-0.5 rounded-md mb-1 inline-block">
                  Metric {uploadModal.metricNo}
                </span>
                <h3 className="font-black text-base text-purple-950">Attach Accreditation Statutory Exhibit</h3>
              </div>
              <button onClick={() => setUploadModal(null)} className="p-1 hover:bg-gray-100 rounded-lg text-gray-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Document Title / Reference Code</label>
                <input
                  type="text"
                  value={docName}
                  onChange={(e) => setDocName(e.target.value)}
                  placeholder="e.g. Syndicate_Approved_Valuation_SOP_2025.pdf"
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl"
                />
              </div>

              <div className="border-2 border-dashed border-purple-300 rounded-xl p-6 text-center bg-purple-50/50">
                <Upload className="w-8 h-8 text-purple-700 mx-auto mb-2" />
                <span className="font-bold text-purple-950 block">Click or Drag PDF Document Here</span>
                <span className="text-[10px] text-gray-500">Max file size 25MB • Digitally Signed PDF</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setUploadModal(null)}
                className="px-4 py-2 border border-gray-200 text-gray-700 font-bold text-xs rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                className="px-4 py-2 bg-gradient-to-r from-purple-800 to-purple-950 text-white font-bold text-xs rounded-xl shadow-md"
              >
                Confirm &amp; Encrypt Document
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
