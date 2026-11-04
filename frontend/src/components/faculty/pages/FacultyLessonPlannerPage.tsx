import React, { useState } from 'react';
import {
  Plus,
  CheckCircle2,
  Download,
  X,
} from 'lucide-react';
import { useFaculty } from '../../../context/FacultyContext';

export const FacultyLessonPlannerPage: React.FC = () => {
  const { currentCourse, lessonPlan, addLessonTopic, updateLessonTopic } = useFaculty();

  const [showAddModal, setShowAddModal] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  // New topic form states
  const [topicName, setTopicName] = useState('');
  const [plannedDate, setPlannedDate] = useState('2026-11-10');
  const [hours, setHours] = useState(2);
  const [method, setMethod] = useState<'ICT / PPT' | 'Chalk & Talk' | 'Lab Demonstration' | 'Flipped Classroom'>('Lab Demonstration');
  const [mappedCO, setMappedCO] = useState('CO6');

  const completedCount = lessonPlan.filter((t) => t.status === 'Completed').length;
  const inProgressCount = lessonPlan.filter((t) => t.status === 'In Progress').length;
  const totalHours = lessonPlan.reduce((acc, t) => acc + t.plannedHours, 0);
  const completionPercent = Math.round((completedCount / lessonPlan.length) * 100);

  const handleCreateTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topicName.trim()) return;

    addLessonTopic({
      topic: topicName,
      plannedDate,
      plannedHours: Number(hours),
      teachingMethod: method,
      mappedCO,
      status: 'Pending',
    });

    setTopicName('');
    setShowAddModal(false);
    setToastMsg('New topic added to Proposed Course Plan!');
    setTimeout(() => setToastMsg(''), 3000);
  };

  return (
    <div className="space-y-4">
      {/* Breadcrumb */}
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        HOME &gt; SUBJECT COMMUNITY &gt; {currentCourse.code} - {currentCourse.name} &gt; LESSON PLANNER &gt; PROPOSED COURSE PLAN
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

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-2xs">
          <div className="text-[11px] font-bold text-gray-500 uppercase">Total Planned Topics</div>
          <div className="text-xl font-black text-gray-900 mt-1">{lessonPlan.length} Topics</div>
          <div className="text-[11px] text-gray-400 mt-0.5">{totalHours} Total Hours</div>
        </div>
        <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-2xs">
          <div className="text-[11px] font-bold text-emerald-600 uppercase">Completed Topics</div>
          <div className="text-xl font-black text-emerald-700 mt-1">{completedCount} Topics</div>
          <div className="text-[11px] text-emerald-600 mt-0.5">{completionPercent}% Syllabus Delivered</div>
        </div>
        <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-2xs">
          <div className="text-[11px] font-bold text-amber-600 uppercase">In Progress</div>
          <div className="text-xl font-black text-amber-700 mt-1">{inProgressCount} Topic</div>
          <div className="text-[11px] text-amber-600 mt-0.5">Active Sprint</div>
        </div>
        <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-2xs">
          <div className="text-[11px] font-bold text-purple-600 uppercase">Approval Status</div>
          <div className="text-sm font-black text-purple-800 mt-2 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-purple-700" />
            HOD Approved
          </div>
          <div className="text-[10px] text-gray-400 mt-0.5">Autonomous Academic Cell</div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-2xs p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
          <div>
            <h2 className="text-sm font-bold text-gray-900 uppercase">Proposed Course Plan (Lesson Delivery)</h2>
            <div className="text-xs text-gray-500">
              {currentCourse.code} • Batch: {currentCourse.batch} • Academic Year 2026-27
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAddModal(true)}
              className="px-3.5 py-1.5 bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Topic</span>
            </button>
            <button
              onClick={() => {
                const csv = 'Sl,Topic,PlannedDate,Hours,Method,MappedCO,Status\n' + lessonPlan.map(t => `${t.slNo},"${t.topic}",${t.plannedDate},${t.plannedHours},${t.teachingMethod},${t.mappedCO},${t.status}`).join('\n');
                const blob = new Blob([csv], { type: 'text/csv' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `LessonPlan_${currentCourse.code}.csv`;
                a.click();
              }}
              className="px-3 py-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-gray-500" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Topics Table */}
        <div className="border border-gray-200 rounded-xl overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[700px]">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-bold text-[11px] uppercase">
              <tr>
                <th className="py-2.5 px-3 text-center">#</th>
                <th className="py-2.5 px-3">TEACHING TOPIC</th>
                <th className="py-2.5 px-3">PLANNED DATE</th>
                <th className="py-2.5 px-3 text-center">HOURS</th>
                <th className="py-2.5 px-3">METHODOLOGY</th>
                <th className="py-2.5 px-3 text-center">CO</th>
                <th className="py-2.5 px-3">STATUS</th>
                <th className="py-2.5 px-3 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {lessonPlan.map((t) => (
                <tr key={t.id} className="hover:bg-purple-50/30 transition-colors">
                  <td className="py-2.5 px-3 text-center font-bold text-gray-500">{t.slNo}</td>
                  <td className="py-2.5 px-3 font-semibold text-gray-800 max-w-xs">{t.topic}</td>
                  <td className="py-2.5 px-3 font-mono text-gray-600">{t.plannedDate}</td>
                  <td className="py-2.5 px-3 text-center font-bold text-gray-700">{t.plannedHours}h</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-gray-100 text-gray-700">
                      {t.teachingMethod}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-center font-bold text-purple-700">{t.mappedCO}</td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        t.status === 'Completed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : t.status === 'In Progress'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button
                      onClick={() => {
                        const next = t.status === 'Completed' ? 'In Progress' : 'Completed';
                        updateLessonTopic(t.id, { status: next });
                      }}
                      className="text-[11px] font-bold text-purple-700 hover:text-purple-900 cursor-pointer"
                    >
                      Toggle Status
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Topic Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="bg-gradient-to-r from-purple-800 to-indigo-900 p-4 text-white flex items-center justify-between">
              <h3 className="font-bold text-sm">Add Lesson Plan Topic</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-purple-200 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTopic} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block text-gray-700 font-bold mb-1">Topic Name / Description *</label>
                <textarea
                  required
                  rows={3}
                  value={topicName}
                  onChange={(e) => setTopicName(e.target.value)}
                  placeholder="e.g. Redux Toolkit Middleware and Async Thunks..."
                  className="w-full text-xs p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Planned Date *</label>
                  <input
                    type="date"
                    required
                    value={plannedDate}
                    onChange={(e) => setPlannedDate(e.target.value)}
                    className="w-full text-xs p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Teaching Hours *</label>
                  <input
                    type="number"
                    min={1}
                    max={6}
                    required
                    value={hours}
                    onChange={(e) => setHours(Number(e.target.value))}
                    className="w-full text-xs p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Teaching Methodology</label>
                  <select
                    value={method}
                    onChange={(e: any) => setMethod(e.target.value)}
                    className="w-full text-xs p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  >
                    <option value="Lab Demonstration">Lab Demonstration</option>
                    <option value="ICT / PPT">ICT / PPT</option>
                    <option value="Chalk & Talk">Chalk & Talk</option>
                    <option value="Flipped Classroom">Flipped Classroom</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Course Outcome Mapping</label>
                  <select
                    value={mappedCO}
                    onChange={(e) => setMappedCO(e.target.value)}
                    className="w-full text-xs p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  >
                    <option value="CO1">CO1 - Architecture & Node</option>
                    <option value="CO2">CO2 - Express & APIs</option>
                    <option value="CO3">CO3 - MongoDB & Schemas</option>
                    <option value="CO4">CO4 - React Components</option>
                    <option value="CO5">CO5 - State & Redux</option>
                    <option value="CO6">CO6 - Testing & Cloud Deploy</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-lg shadow-sm"
                >
                  Add to Proposed Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
