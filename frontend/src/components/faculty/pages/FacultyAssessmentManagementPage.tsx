import React, { useState } from 'react';
import {
  Plus,
  CheckCircle2,
  Calendar,
  X,
  Users,
  Eye,
} from 'lucide-react';
import { useFaculty } from '../../../context/FacultyContext';

export const FacultyAssessmentManagementPage: React.FC = () => {
  const { currentCourse, assessments, addAssessment } = useFaculty();

  const [activeTab, setActiveTab] = useState<'assessments' | 'shared'>('assessments');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  // Form states
  const [title, setTitle] = useState('');
  const [asmtType, setAsmtType] = useState<'1. CA (Continuous Assessments)' | '2. Mid-Term Exam' | 'End Semester Exam' | 'Lab Experiment'>('1. CA (Continuous Assessments)');
  const [maxMarks, setMaxMarks] = useState(25);
  const [weightage, setWeightage] = useState(15);
  const [deadline, setDeadline] = useState('2026-11-20');

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addAssessment({
      title,
      assessmentType: asmtType,
      courseCode: currentCourse.code,
      courseName: currentCourse.name,
      batch: currentCourse.batch,
      maxMarks: Number(maxMarks),
      weightage: Number(weightage),
      assignedDate: new Date().toISOString().split('T')[0],
      submissionDeadline: deadline,
      status: 'Published',
      totalCount: currentCourse.totalStudents,
    });

    setTitle('');
    setShowCreateModal(false);
    setToastMsg(`Assessment "${title}" created and published!`);
    setTimeout(() => setToastMsg(''), 4000);
  };

  return (
    <div className="space-y-4">
      {/* Breadcrumb matching Page 11 & 12 */}
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        HOME &gt; SUBJECT COMMUNITY &gt; {currentCourse.code} - {currentCourse.name} &gt; ASSESSMENTS &gt; MANAGEMENT
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

      {/* Main Container */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-2xs p-5 space-y-4">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
          <div>
            <h1 className="text-sm sm:text-base font-extrabold text-gray-900 uppercase">
              ASSESSMENT TYPES &amp; MANAGEMENT
            </h1>
            <div className="text-xs text-gray-500 font-medium mt-0.5">
              {currentCourse.code} - {currentCourse.name} • Batch: {currentCourse.batch}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold rounded-lg shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create Assessment</span>
            </button>
          </div>
        </div>

        {/* Section Heading & Sub-tabs matching Page 12 */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-gray-700 uppercase">
            1. CA (CONTINUOUS ASSESSMENTS)
          </div>

          <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
            <button
              onClick={() => setActiveTab('assessments')}
              className={`px-3 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'assessments'
                  ? 'bg-purple-700 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Assessments ({assessments.length})
            </button>
            <button
              onClick={() => setActiveTab('shared')}
              className={`px-3 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'shared'
                  ? 'bg-purple-700 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Shared Assessments (0)
            </button>
          </div>
        </div>

        {/* Assessments List Cards */}
        <div className="space-y-3 pt-1">
          {assessments.map((asmt) => (
            <div
              key={asmt.id}
              className="p-4 rounded-xl border border-gray-200 bg-white hover:border-purple-300 hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800">
                    {asmt.assessmentType}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      asmt.status === 'Evaluated'
                        ? 'bg-emerald-100 text-emerald-800'
                        : asmt.status === 'Published'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {asmt.status}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-gray-900">{asmt.title}</h3>
                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 pt-0.5">
                  <span>Max Marks: <strong className="text-gray-800">{asmt.maxMarks}</strong></span>
                  <span>Weightage: <strong className="text-purple-700">{asmt.weightage}%</strong></span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    Due: {asmt.submissionDeadline}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-gray-400" />
                    Submissions: {asmt.submissionsCount} / {asmt.totalCount}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start md:self-center">
                <button
                  onClick={() => alert(`Reviewing submissions for: ${asmt.title}`)}
                  className="px-3.5 py-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-gray-500" />
                  <span>Submissions</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Assessment Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="bg-gradient-to-r from-purple-800 to-indigo-900 p-4 text-white flex items-center justify-between">
              <h3 className="font-bold text-sm">Create New Assessment Component</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-purple-200 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block text-gray-700 font-bold mb-1">Assessment Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. CA 4 - Full Stack Project Sprint Evaluation"
                  className="w-full text-xs p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Assessment Category</label>
                  <select
                    value={asmtType}
                    onChange={(e: any) => setAsmtType(e.target.value)}
                    className="w-full text-xs p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  >
                    <option value="1. CA (Continuous Assessments)">1. CA (Continuous Assessments)</option>
                    <option value="2. Mid-Term Exam">2. Mid-Term Exam</option>
                    <option value="End Semester Exam">End Semester Exam</option>
                    <option value="Lab Experiment">Lab Experiment</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Submission Deadline</label>
                  <input
                    type="date"
                    required
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full text-xs p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Maximum Marks</label>
                  <input
                    type="number"
                    min={5}
                    max={100}
                    required
                    value={maxMarks}
                    onChange={(e) => setMaxMarks(Number(e.target.value))}
                    className="w-full text-xs p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Weightage (%)</label>
                  <input
                    type="number"
                    min={1}
                    max={50}
                    required
                    value={weightage}
                    onChange={(e) => setWeightage(Number(e.target.value))}
                    className="w-full text-xs p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
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
                  Publish Assessment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
