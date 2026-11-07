import React from 'react';
import {
  Layers,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { useUniversityAdmin } from '../../../../context/UniversityAdminContext';
import { RESULT_PROCESSING_BATCHES } from '../../../../data/vcSubmodulesData';

export const VcResultProcessingPage: React.FC = () => {
  const { setToast } = useUniversityAdmin();

  const stages = [
    { num: 1, name: 'Marks Ingestion', desc: 'OMR, OSM & Practical marks digital sync' },
    { num: 2, name: 'Marks Verification', desc: 'Continuous internal assessment (CIA) lock' },
    { num: 3, name: 'TR Compilation', desc: 'Tabulation register auto-generation' },
    { num: 4, name: 'Moderation Board', desc: 'Statutory grace & board review' },
    { num: 5, name: 'VC Statutory Assent', desc: 'Vice-Chancellor digital authorization' },
    { num: 6, name: 'Result Publication', desc: 'Student web portal publishing & DigiLocker' }
  ];

  return (
    <div className="space-y-5 p-4 sm:p-6 bg-[#f8f9fe] min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#29084e] via-[#3d0a6c] to-[#250646] text-white p-5 sm:p-6 rounded-2xl shadow-lg border border-[#581c87] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-1">
            <Layers className="w-4 h-4" />
            <span>End-to-End Pipeline</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            University Result Processing Workflow
          </h1>
          <p className="text-xs sm:text-sm text-purple-200 mt-1">
            6-stage cryptographic tabulation pipeline: from mark ingestion to Vice-Chancellor assent and portal publication.
          </p>
        </div>

        <div className="px-3.5 py-1.5 rounded-xl bg-purple-900/80 border border-purple-400/30 text-xs font-bold text-amber-300">
          <span>Active Session: 2024–25</span>
        </div>
      </div>

      {/* 6 Pipeline Stage Cards */}
      <div className="bg-white rounded-2xl border border-purple-200/90 p-5 shadow-2xs">
        <h3 className="font-extrabold text-sm text-purple-950 mb-4">
          Statutory 6-Stage Result Processing Sequence
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
          {stages.map((st) => (
            <div
              key={st.num}
              className={`p-3.5 rounded-xl border flex flex-col justify-between ${
                st.num === 5
                  ? 'bg-purple-50 border-purple-300 ring-2 ring-purple-400/40 shadow-xs'
                  : st.num < 5
                  ? 'bg-emerald-50/60 border-emerald-200'
                  : 'bg-gray-50 border-gray-200 opacity-80'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="w-6 h-6 rounded-full bg-purple-900 text-white font-black text-xs flex items-center justify-center">
                    {st.num}
                  </span>
                  {st.num < 5 ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : st.num === 5 ? (
                    <Clock className="w-4 h-4 text-purple-700 animate-spin" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-gray-300" />
                  )}
                </div>
                <h4 className="font-bold text-xs text-gray-900">{st.name}</h4>
                <p className="text-[10px] text-gray-500 mt-0.5 leading-tight">{st.desc}</p>
              </div>

              <div className="mt-2 text-[10px] font-bold">
                {st.num === 5 ? (
                  <span className="text-purple-800">Current Apex Stage</span>
                ) : st.num < 5 ? (
                  <span className="text-emerald-700">Verified</span>
                ) : (
                  <span className="text-gray-400">Scheduled</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Batches Table */}
      <div className="bg-white rounded-2xl border border-purple-200/90 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-extrabold text-sm text-purple-950">Active Programme Batches in Pipeline</h3>
          <span className="text-xs text-gray-500 font-semibold">Live Pipeline Feed</span>
        </div>

        <div className="divide-y divide-gray-100">
          {RESULT_PROCESSING_BATCHES.map((batch) => (
            <div
              key={batch.id}
              className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-purple-50/30 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className="font-mono text-[10px] font-bold text-purple-900 bg-purple-100 px-2 py-0.5 rounded-md">
                    {batch.programme}
                  </span>
                  <span className="text-[10px] font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded-md">
                    {batch.semester}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      batch.status === 'Published'
                        ? 'bg-emerald-100 text-emerald-800'
                        : batch.status === 'Pending VC Assent'
                        ? 'bg-purple-100 text-purple-900 border border-purple-300'
                        : 'bg-amber-100 text-amber-900'
                    }`}
                  >
                    {batch.status}
                  </span>
                </div>

                <h4 className="font-black text-sm text-gray-900">{batch.batchName}</h4>
                <p className="text-xs text-gray-600 mt-0.5">{batch.stageName}</p>
                <p className="text-xs text-purple-900 font-medium mt-1">{batch.pendingTasks}</p>
                <div className="text-[11px] text-gray-400 mt-1">Responsible: {batch.responsibleOfficer}</div>
              </div>

              <div className="flex items-center gap-2 md:shrink-0">
                {batch.currentStage === 5 ? (
                  <button
                    onClick={() => setToast(`Navigating to VC Assent screen for ${batch.batchName}...`)}
                    className="px-4 py-2 bg-gradient-to-r from-purple-800 to-purple-950 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer hover:opacity-95"
                  >
                    Execute Assent
                  </button>
                ) : (
                  <button
                    onClick={() => setToast(`Inspection log opened for ${batch.batchName}`)}
                    className="px-3.5 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                  >
                    View TR Log
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
