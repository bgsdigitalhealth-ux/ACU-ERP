import React, { useState } from 'react';
import { Plus, CheckCircle2, X } from 'lucide-react';
import { useStudent } from '../../../context/StudentContext';

export const StudentAdditionalCreditsPage: React.FC = () => {
  const { additionalCredits, addCreditApp } = useStudent();
  const [showModal, setShowModal] = useState(false);
  const [showEmptyStateMock, setShowEmptyStateMock] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  // Form states
  const [category, setCategory] = useState('Technical Paper Presentation');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [points, setPoints] = useState(20);
  const mentor = 'Dr. ANJANA D';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCreditApp({
      activityCategory: category,
      activityTitle: title,
      description: desc,
      eventDate: eventDate || new Date().toISOString().split('T')[0],
      pointsRequested: points,
      facultyMentor: mentor,
      certificateName: 'Uploaded_Certificate.pdf',
    });
    setShowModal(false);
    setTitle('');
    setDesc('');
    setToastMsg('Activity points application submitted! Faculty advisor will verify your certificate.');
    setTimeout(() => setToastMsg(''), 4000);
  };

  const displayedList = showEmptyStateMock ? [] : additionalCredits;

  return (
    <div className="space-y-4">
      {/* Breadcrumb matching Page 31 */}
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        ADDITIONAL CREDITS/ ACTIVITY POINTS &gt; APPLY
      </div>

      <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
          <p className="text-xs text-gray-600 font-medium">
            <span className="font-bold">Note: </span>
            The student can view the points only after the faculty has approved the application.
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowEmptyStateMock(!showEmptyStateMock)}
              className="text-[11px] font-bold text-purple-700 hover:underline cursor-pointer"
            >
              {showEmptyStateMock ? 'Show Active Points' : 'Toggle Page 31 Empty State'}
            </button>

            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 rounded-lg bg-[#7047eb] hover:bg-[#5b32d6] text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>New Application</span>
            </button>
          </div>
        </div>

        {toastMsg && (
          <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{toastMsg}</span>
          </div>
        )}

        {/* Page 31 Empty State */}
        {displayedList.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[340px] text-center p-8 space-y-2">
            <h3 className="text-sm sm:text-base font-extrabold text-gray-800">
              No applications found
            </h3>
            <p className="text-xs text-gray-500">
              You can create an application by '<span className="font-bold">+ New Application</span>' button
            </p>
          </div>
        ) : (
          /* List of Submitted Activity Point Applications */
          <div className="space-y-3">
            {displayedList.map((app) => (
              <div
                key={app.id}
                className="p-4 rounded-xl border border-gray-200 bg-white hover:border-purple-300 shadow-2xs transition-all space-y-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-700">
                      {app.activityCategory}
                    </span>
                    <span className="text-[11px] text-gray-400">Date: {app.eventDate}</span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                      app.status === 'APPROVED'
                        ? 'bg-emerald-100 text-emerald-800'
                        : app.status === 'REJECTED'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {app.status}
                  </span>
                </div>

                <h4 className="text-xs sm:text-sm font-extrabold text-gray-900">
                  {app.activityTitle}
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {app.description}
                </p>

                <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                  <div className="text-gray-500">
                    <span>Mentor Advisor: </span>
                    <span className="font-bold text-gray-800">{app.facultyMentor}</span>
                  </div>
                  <div className="font-black text-purple-700">
                    Points: {app.pointsApproved || app.pointsRequested} pts
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* New Application Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-gray-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-sm font-extrabold text-gray-900">
                New Activity Points Application
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="w-7 h-7 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Activity Category:*</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded p-2 outline-hidden focus:border-[#7047eb]"
                >
                  <option>Technical Paper Presentation</option>
                  <option>National Level Hackathon</option>
                  <option>MOOC / NPTEL Online Certification</option>
                  <option>Sports &amp; Athletics Inter-University</option>
                  <option>Community Service &amp; NSS Camp</option>
                  <option>Patent / Product Innovation</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Activity Title:*</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Winner at Smart India Hackathon"
                  className="w-full bg-white border border-gray-300 rounded p-2 outline-hidden focus:border-[#7047eb]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Description:*</label>
                <textarea
                  rows={2}
                  required
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Describe your role, contribution and outcome..."
                  className="w-full bg-white border border-gray-300 rounded p-2 outline-hidden focus:border-[#7047eb]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Event Date:</label>
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded p-2 outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Points Requested:</label>
                  <input
                    type="number"
                    min={5}
                    max={50}
                    value={points}
                    onChange={(e) => setPoints(Number(e.target.value))}
                    className="w-full bg-white border border-gray-300 rounded p-2 outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Supporting Certificate (PDF):</label>
                <input
                  type="file"
                  className="w-full bg-gray-50 border border-gray-300 rounded p-1.5 text-xs text-gray-700"
                />
              </div>

              <div className="pt-3 border-t border-gray-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-1.5 rounded-lg border border-gray-300 text-gray-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-1.5 rounded-lg bg-[#7047eb] hover:bg-[#5b32d6] text-white font-bold"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
