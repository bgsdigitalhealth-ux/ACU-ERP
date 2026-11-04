import React, { useState } from 'react';
import {
  Plus,
  Copy,
  Edit2,
  Trash2,
  Eye,
  CheckCircle2,
  X,
} from 'lucide-react';
import { useFaculty } from '../../../context/FacultyContext';
import { OBEOutcomeItem } from '../../../types/faculty';

export const FacultyOBECourseOutcomesPage: React.FC = () => {
  const { currentCourse, obeOutcomes, addOBEOutcome } = useFaculty();

  const [activeTab, setActiveTab] = useState<'details' | 'rule'>('details');
  const [selectedCO, setSelectedCO] = useState<OBEOutcomeItem | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  // Form states
  const [coCode, setCoCode] = useState('CO7');
  const [coTitle, setCoTitle] = useState('');
  const [coDesc, setCoDesc] = useState('');
  const [target, setTarget] = useState(75);

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!coDesc.trim()) return;

    addOBEOutcome({
      coNumber: `#${obeOutcomes.length + 1} ${coCode}`,
      coCode,
      shortTitle: coTitle || 'Course Competency',
      description: coDesc,
      targetAttainment: Number(target),
      status: 'Active',
    });

    setCoTitle('');
    setCoDesc('');
    setShowCreateModal(false);
    setToastMsg(`Course Outcome ${coCode} created successfully!`);
    setTimeout(() => setToastMsg(''), 4000);
  };

  return (
    <div className="space-y-4">
      {/* Breadcrumb matching Page 20 */}
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        HOME &gt; SUBJECT COMMUNITY &gt; {currentCourse.code} - {currentCourse.name} &gt; OBE &gt; COURSE OUTCOME
      </div>

      {toastMsg && (
        <div className="bg-emerald-600 text-white px-4 py-2.5 rounded-lg text-xs font-bold flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-200" />
            <span>{toastMsg}</span>
          </div>
          <button onClick={() => setToastMsg('')} className="text-emerald-200 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-2xs p-5 space-y-4">
        {/* Title */}
        <h1 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
          COURSE OUTCOMES
        </h1>

        {/* Tab & Action Toolbar matching Screenshot Page 20 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('details')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'details'
                  ? 'bg-purple-700 text-white shadow-2xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              COURSE OUTCOME DETAILS
            </button>
            <button
              onClick={() => setActiveTab('rule')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'rule'
                  ? 'bg-purple-700 text-white shadow-2xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              COURSE WISE RULE
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setToastMsg('Course outcomes copied from standard curriculum template.');
                setTimeout(() => setToastMsg(''), 3000);
              }}
              className="px-3.5 py-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Copy className="w-3.5 h-3.5 text-gray-500" />
              <span>Copy Course OutCome</span>
            </button>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-1.5 bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold rounded-lg shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>+ Create Course Outcome</span>
            </button>
          </div>
        </div>

        {/* 3-Column Grid of CO Cards matching Screenshot Page 20 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
          {obeOutcomes.map((co, idx) => (
            <div
              key={co.id}
              className="p-4 rounded-xl border border-gray-200 bg-white hover:border-purple-300 hover:shadow-md transition-all space-y-3"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-gray-100 border border-gray-200 font-bold text-xs text-gray-700 flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <div>
                    <h3 className="text-xs font-extrabold text-gray-900">{co.coNumber}</h3>
                    <div className="text-[10px] font-mono text-gray-400 lowercase">{co.coCode}</div>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-gray-400">
                  <button
                    onClick={() => setSelectedCO(co)}
                    title="View Outcome"
                    className="p-1 hover:text-purple-700 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setSelectedCO(co)}
                    title="Edit Outcome"
                    className="p-1 hover:text-purple-700 transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => alert(`Cannot delete mandatory OBE criteria: ${co.coCode}`)}
                    title="Delete Outcome"
                    className="p-1 hover:text-rose-600 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-gray-700 leading-relaxed line-clamp-3">
                {co.description}
              </p>

              <div className="flex items-center justify-between text-[11px] text-gray-500 pt-2 border-t border-gray-100">
                <span>Target Attainment</span>
                <span className="font-extrabold text-purple-700">{co.targetAttainment}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CO Details Modal */}
      {selectedCO && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="bg-gradient-to-r from-purple-800 to-indigo-900 p-4 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-200">
                  Course Outcome Statement
                </span>
                <h3 className="font-bold text-sm uppercase">{selectedCO.coNumber}</h3>
              </div>
              <button
                onClick={() => setSelectedCO(null)}
                className="text-purple-200 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div className="p-4 bg-purple-50/50 rounded-xl border border-purple-200 leading-relaxed text-gray-800">
                {selectedCO.description}
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-500 text-[11px]">Target Attainment Threshold</span>
                  <div className="font-extrabold text-purple-800 text-sm">{selectedCO.targetAttainment}%</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-500 text-[11px]">Accreditation Framework</span>
                  <div className="font-bold text-gray-800">NBA / NAAC Tier 1</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-5 py-3 flex justify-end border-t border-gray-200">
              <button
                onClick={() => setSelectedCO(null)}
                className="px-4 py-1.5 bg-purple-700 hover:bg-purple-800 text-white rounded-lg text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create CO Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="bg-gradient-to-r from-purple-800 to-indigo-900 p-4 text-white flex items-center justify-between">
              <h3 className="font-bold text-sm">Create Course Outcome</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-purple-200 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="p-5 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-bold mb-1">CO Code *</label>
                  <input
                    type="text"
                    required
                    value={coCode}
                    onChange={(e) => setCoCode(e.target.value)}
                    placeholder="CO7"
                    className="w-full text-xs p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Target Attainment (%)</label>
                  <input
                    type="number"
                    min={50}
                    max={100}
                    value={target}
                    onChange={(e) => setTarget(Number(e.target.value))}
                    className="w-full text-xs p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Outcome Short Title</label>
                <input
                  type="text"
                  value={coTitle}
                  onChange={(e) => setCoTitle(e.target.value)}
                  placeholder="e.g. Modern Web Framework Competency"
                  className="w-full text-xs p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Bloom Taxonomy Statement *</label>
                <textarea
                  required
                  rows={4}
                  value={coDesc}
                  onChange={(e) => setCoDesc(e.target.value)}
                  placeholder="Students will be able to design and build..."
                  className="w-full text-xs p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-3 py-1.5 border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-lg shadow-sm"
                >
                  Save Outcome
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
