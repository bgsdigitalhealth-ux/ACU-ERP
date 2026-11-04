import React, { useState } from 'react';
import {
  Plus,
  Filter,
  CheckCircle2,
  X,
  Calendar,
  Users,
  Eye,
} from 'lucide-react';
import { useFaculty } from '../../../context/FacultyContext';
import { FacultySurveyItem } from '../../../types/faculty';

export const FacultyPollsSurveysPage: React.FC = () => {
  const { currentCourse, surveys, addSurvey } = useFaculty();

  const [statusFilter, setStatusFilter] = useState('ALL');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState<FacultySurveyItem | null>(null);
  const [toastMsg, setToastMsg] = useState('');

  // Form states
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('2026-11-04');
  const [endDate, setEndDate] = useState('2026-11-20');
  const [q1, setQ1] = useState('The instructor explains concepts with practical code examples.');
  const [q2, setQ2] = useState('Assignments and lab tasks helped in understanding full-stack workflows.');

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addSurvey({
      title,
      courseCode: currentCourse.code,
      courseName: currentCourse.name,
      startDate,
      endDate,
      status: 'ACTIVE',
      totalStudents: currentCourse.totalStudents,
      questions: [
        { id: 'q-1', question: q1, type: 'Rating' },
        { id: 'q-2', question: q2, type: 'Rating' },
      ],
    });

    setTitle('');
    setShowCreateModal(false);
    setToastMsg(`Survey "${title}" created and published to students!`);
    setTimeout(() => setToastMsg(''), 4000);
  };

  const filteredSurveys = surveys.filter((s) => {
    if (statusFilter === 'ALL') return true;
    return s.status === statusFilter;
  });

  return (
    <div className="space-y-4">
      {/* Breadcrumb matching Page 26 */}
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        HOME &gt; SUBJECT COMMUNITY &gt; {currentCourse.code} - {currentCourse.name} &gt; POLLS AND SURVEY &gt; MANAGE SURVEYS
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
        {/* Title and Subject Banner matching Screenshot Page 26 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
          <h1 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            POLLS AND SURVEY
          </h1>
          <span className="text-xs font-bold text-purple-900 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
            Subject : {currentCourse.name}-({currentCourse.code})
          </span>
        </div>

        {/* Toolbar row matching Page 26 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 text-xs">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-gray-600 font-bold">Status :</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-2.5 py-1 border border-gray-300 rounded-lg bg-white font-bold text-gray-800 focus:outline-none"
              >
                <option value="ALL">ALL</option>
                <option value="ACTIVE">ACTIVE</option>
                <option value="CLOSED">CLOSED</option>
              </select>
            </div>

            <button
              onClick={() => {}}
              className="px-3 py-1 border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Filter className="w-3.5 h-3.5 text-gray-500" />
              <span>Filters</span>
            </button>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-1.5 bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold rounded-lg shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>+ Create Polls and Survey</span>
          </button>
        </div>

        {/* Surveys List or Empty Prompt matching Screenshot Page 26 */}
        {filteredSurveys.length === 0 ? (
          <div className="py-24 text-center text-gray-400 space-y-2">
            <h3 className="text-sm font-semibold text-gray-600">No Course Survey found!</h3>
          </div>
        ) : (
          <div className="space-y-3 pt-2">
            {filteredSurveys.map((survey) => (
              <div
                key={survey.id}
                className="p-4 rounded-xl border border-gray-200 bg-white hover:border-purple-300 hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800">
                      {survey.courseCode}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {survey.status}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-gray-900">{survey.title}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 pt-0.5">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      Window: {survey.startDate} to {survey.endDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-gray-400" />
                      Responses: {survey.responsesCount} / {survey.totalStudents} (
                      {Math.round((survey.responsesCount / survey.totalStudents) * 100)}%)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start md:self-center">
                  <button
                    onClick={() => setSelectedSurvey(survey)}
                    className="px-3.5 py-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-gray-500" />
                    <span>View Analytics</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Survey Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="bg-gradient-to-r from-purple-800 to-indigo-900 p-4 text-white flex items-center justify-between">
              <h3 className="font-bold text-sm">Create Course Feedback / Poll</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-purple-200 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block text-gray-700 font-bold mb-1">Survey Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. End Semester Curriculum Survey"
                  className="w-full text-xs p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Start Date</label>
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full text-xs p-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-1">End Date</label>
                  <input
                    type="date"
                    required
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full text-xs p-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-gray-700 font-bold">Feedback Questions (1-5 Star Scale):</label>
                <input
                  type="text"
                  value={q1}
                  onChange={(e) => setQ1(e.target.value)}
                  className="w-full text-xs p-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  value={q2}
                  onChange={(e) => setQ2(e.target.value)}
                  className="w-full text-xs p-2 border border-gray-300 rounded-lg"
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
                  Publish Survey
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Survey Analytics Modal */}
      {selectedSurvey && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="bg-gradient-to-r from-purple-800 to-indigo-900 p-4 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-200">
                  Student Feedback Analytics
                </span>
                <h3 className="font-bold text-sm">{selectedSurvey.title}</h3>
              </div>
              <button
                onClick={() => setSelectedSurvey(null)}
                className="text-purple-200 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 bg-purple-50 rounded-xl border border-purple-200">
                <div>
                  <span className="text-gray-500 text-[11px]">Responses Submitted</span>
                  <div className="text-sm font-extrabold text-purple-900">
                    {selectedSurvey.responsesCount} / {selectedSurvey.totalStudents}
                  </div>
                </div>
                <div>
                  <span className="text-gray-500 text-[11px]">Overall Rating</span>
                  <div className="text-sm font-extrabold text-emerald-700">4.8 / 5.0 (96%)</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between font-bold text-gray-800">
                    <span>Q1: Practical code demonstration clarity</span>
                    <span className="text-purple-700">4.9 / 5.0</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-purple-600 h-full rounded-full" style={{ width: '98%' }}></div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between font-bold text-gray-800">
                    <span>Q2: Lab exercises &amp; continuous assessment relevance</span>
                    <span className="text-purple-700">4.7 / 5.0</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-purple-600 h-full rounded-full" style={{ width: '94%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-5 py-3 flex justify-end border-t border-gray-200">
              <button
                onClick={() => setSelectedSurvey(null)}
                className="px-4 py-1.5 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-lg text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
