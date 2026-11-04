import React, { useState } from 'react';
import { FolderX, CheckCircle2, Upload, X } from 'lucide-react';
import { useStudent } from '../../../context/StudentContext';
import { AssessmentItem } from '../../../types/student';

export const StudentAssessmentsPage: React.FC = () => {
  const { assessments } = useStudent();
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [showEmptyStateMock, setShowEmptyStateMock] = useState(false);
  const [activeSubmitModal, setActiveSubmitModal] = useState<AssessmentItem | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const filteredAssessments = showEmptyStateMock
    ? []
    : assessments.filter((a) => {
        if (selectedStatus === 'ALL') return true;
        return a.status.toUpperCase() === selectedStatus.toUpperCase();
      });

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setActiveSubmitModal(null);
    }, 1500);
  };

  return (
    <div className="space-y-4">
      {/* Breadcrumb matching Page 9 */}
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        ASSESSMENTS &gt; ASSESSMENTS
      </div>

      <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
          <h2 className="text-xs sm:text-sm font-extrabold text-gray-900 tracking-wide uppercase">
            ASSESSMENTS
          </h2>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowEmptyStateMock(!showEmptyStateMock)}
              className="text-[11px] font-bold text-purple-700 hover:underline cursor-pointer"
            >
              {showEmptyStateMock ? 'Show Active Assessments' : 'Toggle Page 9 Empty State'}
            </button>

            <div className="flex items-center gap-1.5 text-xs">
              <span className="font-bold text-gray-600">Status:</span>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-gray-50 border border-gray-300 rounded px-2.5 py-1 text-xs text-gray-800 outline-hidden font-medium"
              >
                <option value="ALL">ALL</option>
                <option value="UPCOMING">Upcoming</option>
                <option value="AVAILABLE">Available</option>
                <option value="SUBMITTED">Submitted</option>
                <option value="EVALUATED">Evaluated</option>
                <option value="EXPIRED">Expired</option>
              </select>
            </div>
          </div>
        </div>

        {/* Empty State matching Page 9 */}
        {filteredAssessments.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[360px] text-center p-8 space-y-3">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
              <FolderX className="w-9 h-9" />
            </div>
            <h3 className="text-sm sm:text-base font-extrabold text-gray-700">
              No assessments found!
            </h3>
            <p className="text-xs text-gray-400 max-w-sm">
              There are no assessments available at the moment.
            </p>
          </div>
        ) : (
          /* Active Assessments List */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredAssessments.map((a) => (
              <div
                key={a.id}
                className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 hover:bg-white hover:shadow-md transition-all space-y-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-black bg-purple-100 text-purple-700">
                    {a.type}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      a.status === 'Evaluated'
                        ? 'bg-emerald-100 text-emerald-800'
                        : a.status === 'Available'
                        ? 'bg-blue-100 text-blue-800'
                        : a.status === 'Submitted'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {a.status}
                  </span>
                </div>

                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-gray-900 leading-snug">
                    {a.title}
                  </h4>
                  <p className="text-xs text-gray-500 font-medium">
                    {a.courseName} ({a.courseCode})
                  </p>
                </div>

                <div className="text-xs text-gray-600 flex items-center justify-between pt-2 border-t border-gray-200">
                  <div>
                    <span className="font-bold text-gray-500">Max Marks: </span>
                    <span className="font-extrabold text-gray-900">{a.maxMarks}</span>
                    {a.obtainedMarks !== undefined && (
                      <span className="ml-2 font-bold text-emerald-600">
                        (Scored: {a.obtainedMarks})
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-gray-500">Due: {a.dueDate}</div>
                </div>

                {a.status === 'Available' && (
                  <button
                    onClick={() => setActiveSubmitModal(a)}
                    className="w-full py-1.5 rounded-lg bg-[#7047eb] hover:bg-[#5b32d6] text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    Submit Assignment
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Assignment Submission Modal */}
      {activeSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 border border-gray-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-sm font-extrabold text-gray-900">
                  Submit Assessment Solution
                </h3>
                <p className="text-xs text-purple-700 font-semibold">
                  {activeSubmitModal.title}
                </p>
              </div>
              <button
                onClick={() => setActiveSubmitModal(null)}
                className="w-7 h-7 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {submitSuccess ? (
              <div className="p-6 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-sm font-extrabold text-gray-900">
                  Submission Successful!
                </h4>
                <p className="text-xs text-gray-500">
                  Your work has been uploaded and forwarded to the course faculty for evaluation.
                </p>
              </div>
            ) : (
              <form onSubmit={handleModalSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    Student Comments / Submission Notes:
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Provide Github repo link or project description..."
                    className="w-full bg-white border border-gray-300 rounded-lg p-2.5 outline-hidden focus:border-[#7047eb]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    Attach PDF / ZIP Solution Document:
                  </label>
                  <label className="border-2 border-dashed border-gray-300 hover:border-[#7047eb] rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer bg-gray-50 transition-colors">
                    <Upload className="w-6 h-6 text-purple-600 mb-1" />
                    <span className="font-bold text-gray-700">Choose file or drag here</span>
                    <span className="text-[10px] text-gray-400">PDF, ZIP (Up to 15MB)</span>
                    <input type="file" required className="hidden" />
                  </label>
                </div>

                <div className="pt-3 border-t border-gray-100 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveSubmitModal(null)}
                    className="px-4 py-1.5 rounded-lg border border-gray-300 text-gray-700 font-bold hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-1.5 rounded-lg bg-[#7047eb] hover:bg-[#5b32d6] text-white font-bold"
                  >
                    Confirm Submission
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
