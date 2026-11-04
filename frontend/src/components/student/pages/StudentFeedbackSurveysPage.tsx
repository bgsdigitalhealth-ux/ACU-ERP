import React, { useState } from 'react';
import {
  CheckCircle2,
  X,
  Star,
} from 'lucide-react';
import { SURVEYS_LIST } from '../../../data/studentMockData';
import { SurveyItem } from '../../../types/student';

export const StudentFeedbackSurveysPage: React.FC = () => {
  const [surveys, setSurveys] = useState<SurveyItem[]>(SURVEYS_LIST);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [activeSurveyModal, setActiveSurveyModal] = useState<SurveyItem | null>(null);
  const [surveyRatings, setSurveyRatings] = useState<{ [qId: string]: number }>({});
  const [submittedToast, setSubmittedToast] = useState(false);

  const filteredSurveys = surveys.filter((s) => {
    if (statusFilter === 'ALL') return true;
    return s.status === statusFilter;
  });

  const handleRate = (qId: string, rating: number) => {
    setSurveyRatings((prev) => ({ ...prev, [qId]: rating }));
  };

  const handleSurveySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeSurveyModal) return;
    setSurveys((prev) =>
      prev.map((s) => (s.id === activeSurveyModal.id ? { ...s, status: 'SUBMITTED' } : s))
    );
    setActiveSurveyModal(null);
    setSubmittedToast(true);
    setTimeout(() => setSubmittedToast(false), 3000);
  };

  return (
    <div className="space-y-4">
      {/* Breadcrumb matching Page 10 */}
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        FEEDBACK AND SURVEYS &gt; COURSE SURVEY
      </div>

      <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
          <h2 className="text-xs sm:text-sm font-extrabold text-gray-900 tracking-wide uppercase">
            COURSE SURVEY
          </h2>

          <div className="flex items-center gap-1.5 text-xs">
            <span className="font-bold text-gray-600">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-gray-50 border border-gray-300 rounded px-2.5 py-1 text-xs text-gray-800 outline-hidden font-medium"
            >
              <option value="ALL">ALL</option>
              <option value="OPEN">Open</option>
              <option value="SUBMITTED">Submitted</option>
              <option value="TIME-EXPIRED">Time-Expired</option>
            </select>
          </div>
        </div>

        {submittedToast && (
          <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Thank you! Your feedback survey responses have been registered.</span>
          </div>
        )}

        {/* Survey Cards matching Page 10 */}
        <div className="space-y-4">
          {filteredSurveys.map((s) => (
            <div
              key={s.id}
              className="p-5 rounded-xl border border-gray-200 bg-white hover:border-purple-300 shadow-2xs transition-all space-y-3"
            >
              <h3 className="text-xs sm:text-sm font-extrabold text-gray-900">
                {s.title}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-1.5 text-xs text-gray-700">
                <div className="flex items-center gap-2">
                  <span className="w-44 text-gray-500 font-semibold">Course Survey Start Date/Time</span>
                  <span>:</span>
                  <span className="font-bold text-gray-800">{s.startTime}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-44 text-gray-500 font-semibold">Course Survey End Date/Time</span>
                  <span>:</span>
                  <span className="font-bold text-gray-800">{s.endTime}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-44 text-gray-500 font-semibold">Time Limit</span>
                  <span>:</span>
                  <span className="font-bold text-gray-800">{s.timeLimitDays} Days</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-44 text-gray-500 font-semibold">Sem</span>
                  <span>:</span>
                  <span className="font-bold text-purple-700">{s.semester}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-44 text-gray-500 font-semibold">Course</span>
                  <span>:</span>
                  <span className="font-bold text-gray-900">{s.course || 'Institution Wide'}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-44 text-gray-500 font-semibold">Maximum Mark</span>
                  <span>:</span>
                  <span className="font-bold text-gray-800">{s.maxMarks}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-44 text-gray-500 font-semibold">Course Survey Status</span>
                  <span>:</span>
                  <span
                    className={`font-black uppercase tracking-wider text-[11px] ${
                      s.status === 'TIME-EXPIRED'
                        ? 'text-rose-600'
                        : s.status === 'SUBMITTED'
                        ? 'text-emerald-600'
                        : 'text-purple-700'
                    }`}
                  >
                    {s.status}
                  </span>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                {s.status === 'OPEN' ? (
                  <button
                    onClick={() => {
                      setActiveSurveyModal(s);
                      setSurveyRatings({});
                    }}
                    className="px-5 py-1.5 rounded-lg bg-[#7047eb] hover:bg-[#5b32d6] text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
                  >
                    Take Survey Now
                  </button>
                ) : s.status === 'SUBMITTED' ? (
                  <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Response Submitted</span>
                  </span>
                ) : (
                  <span className="text-xs font-semibold text-gray-400">
                    Survey window closed
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Survey Modal */}
      {activeSurveyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 border border-gray-200 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-sm font-extrabold text-gray-900">
                  {activeSurveyModal.title}
                </h3>
                <p className="text-xs text-purple-700 font-bold">
                  {activeSurveyModal.course}
                </p>
              </div>
              <button
                onClick={() => setActiveSurveyModal(null)}
                className="w-7 h-7 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSurveySubmit} className="space-y-4 text-xs">
              <p className="text-gray-500">
                Please rate each parameter from 1 (Needs Improvement) to 5 (Excellent).
              </p>

              {activeSurveyModal.questions.map((q, idx) => (
                <div key={q.id} className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
                  <div className="font-bold text-gray-900 leading-snug">
                    {idx + 1}. {q.question}
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => handleRate(q.id, star)}
                        className={`p-1.5 rounded-md border text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                          (surveyRatings[q.id] || 0) >= star
                            ? 'bg-amber-100 border-amber-300 text-amber-800'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-100'
                        }`}
                      >
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{star}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              <div className="pt-3 border-t border-gray-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setActiveSurveyModal(null)}
                  className="px-4 py-1.5 rounded-lg border border-gray-300 text-gray-700 font-bold hover:bg-gray-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-1.5 rounded-lg bg-[#7047eb] hover:bg-[#5b32d6] text-white font-bold cursor-pointer"
                >
                  Submit Survey
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
