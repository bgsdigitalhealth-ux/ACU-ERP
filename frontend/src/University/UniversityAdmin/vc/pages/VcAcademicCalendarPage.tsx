import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Plus,
  X
} from 'lucide-react';
import { useUniversityAdmin } from '../../../../context/UniversityAdminContext';
import { ACADEMIC_CALENDAR_DATA } from '../../../../data/vcSubmodulesData';

export const VcAcademicCalendarPage: React.FC = () => {
  const { setToast } = useUniversityAdmin();
  const [activeView, setActiveView] = useState<'timeline' | 'list'>('timeline');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [newDateModal, setNewDateModal] = useState(false);

  const filteredEvents = ACADEMIC_CALENDAR_DATA.filter((e) => {
    if (selectedFilter === 'All') return true;
    return e.category === selectedFilter;
  });

  return (
    <div className="space-y-5 p-4 sm:p-6 bg-[#f8f9fe] min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#29084e] via-[#3d0a6c] to-[#250646] text-white p-5 sm:p-6 rounded-2xl shadow-lg border border-[#581c87] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-1">
            <CalendarIcon className="w-4 h-4" />
            <span>Master Institutional Schedule</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            University Academic &amp; Examination Calendar (2024–25)
          </h1>
          <p className="text-xs sm:text-sm text-purple-200 mt-1">
            Statutory timeline of theory board examinations, clinical vivas, valuation camps &amp; result publishing milestones.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-purple-900/80 p-1 rounded-xl border border-purple-400/30 flex items-center">
            <button
              onClick={() => setActiveView('timeline')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeView === 'timeline'
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-purple-950 shadow-xs'
                  : 'text-purple-200 hover:text-white'
              }`}
            >
              Timeline View
            </button>
            <button
              onClick={() => setActiveView('list')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeView === 'list'
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-purple-950 shadow-xs'
                  : 'text-purple-200 hover:text-white'
              }`}
            >
              Milestone List
            </button>
          </div>

          <button
            onClick={() => setNewDateModal(true)}
            className="px-3.5 py-2 rounded-xl bg-purple-900/80 hover:bg-purple-800 text-purple-100 border border-purple-400/40 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-amber-300" />
            <span>Add Event</span>
          </button>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="bg-white p-3 sm:p-4 rounded-2xl border border-purple-200/90 shadow-2xs flex items-center gap-2 overflow-x-auto">
        <span className="text-xs font-bold text-gray-500 mr-2 shrink-0">Filter By:</span>
        {['All', 'Examination', 'Internal Assessment', 'Result Declaration', 'Administrative'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedFilter(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedFilter === cat
                ? 'bg-purple-900 text-amber-300 shadow-xs'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Timeline View */}
      {activeView === 'timeline' && (
        <div className="bg-white rounded-2xl border border-purple-200/90 p-5 sm:p-6 shadow-2xs">
          <div className="relative pl-6 sm:pl-8 border-l-2 border-purple-300 space-y-6">
            {filteredEvents.map((evt) => (
              <div key={evt.id} className="relative group">
                {/* Node circle */}
                <div
                  className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 border-white ring-4 ${
                    evt.status === 'Ongoing'
                      ? 'bg-amber-400 ring-amber-100 animate-pulse'
                      : evt.status === 'Completed'
                      ? 'bg-emerald-500 ring-emerald-100'
                      : 'bg-purple-600 ring-purple-100'
                  }`}
                />

                <div className="p-4 rounded-xl border border-purple-100 bg-[#fbf9fe] group-hover:bg-purple-50/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-purple-900 bg-purple-100 px-2 py-0.5 rounded-md">
                        {evt.category}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                          evt.status === 'Ongoing'
                            ? 'bg-amber-100 text-amber-900'
                            : evt.status === 'Completed'
                            ? 'bg-emerald-100 text-emerald-900'
                            : 'bg-blue-100 text-blue-900'
                        }`}
                      >
                        {evt.status}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-sm sm:text-base text-gray-900">{evt.eventName}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Target: <strong className="text-gray-700">{evt.targetCohort}</strong> • Programme: {evt.programme}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 sm:shrink-0">
                    <div className="px-3 py-1.5 bg-white border border-purple-200 rounded-xl text-center shadow-2xs">
                      <span className="text-[10px] text-gray-400 uppercase font-bold block">Session Window</span>
                      <span className="text-xs font-black text-purple-950">
                        {evt.startDate} – {evt.endDate}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* List View */}
      {activeView === 'list' && (
        <div className="bg-white rounded-2xl border border-purple-200/90 shadow-2xs overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#f9f5ff] text-[#4a157c] font-black border-b border-purple-100">
              <tr>
                <th className="py-3 px-4">Milestone / Event Name</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Cohort</th>
                <th className="py-3 px-3">Start Date</th>
                <th className="py-3 px-3">End Date</th>
                <th className="py-3 px-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-100">
              {filteredEvents.map((evt) => (
                <tr key={evt.id} className="hover:bg-purple-50/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-gray-900">{evt.eventName}</td>
                  <td className="py-3 px-3 font-semibold text-purple-900">{evt.category}</td>
                  <td className="py-3 px-3 text-gray-600">{evt.targetCohort}</td>
                  <td className="py-3 px-3 font-semibold text-gray-800">{evt.startDate}</td>
                  <td className="py-3 px-3 font-semibold text-gray-800">{evt.endDate}</td>
                  <td className="py-3 px-3 text-center">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                        evt.status === 'Ongoing'
                          ? 'bg-amber-100 text-amber-900 border-amber-300'
                          : evt.status === 'Completed'
                          ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                          : 'bg-purple-100 text-purple-900 border-purple-300'
                      }`}
                    >
                      {evt.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Date Modal */}
      {newDateModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-2xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 sm:p-6 border border-purple-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-black text-base text-purple-950">Add Calendar Statutory Event</h3>
              <button onClick={() => setNewDateModal(false)} className="p-1 hover:bg-gray-100 rounded-lg text-gray-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Event Title</label>
                <input
                  type="text"
                  placeholder="e.g. Special Practical Board Session"
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Start Date</label>
                  <input type="date" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl" />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">End Date</label>
                  <input type="date" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl" />
                </div>
              </div>
              <div>
                <label className="font-bold text-gray-700 block mb-1">Category</label>
                <select className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl">
                  <option>Examination</option>
                  <option>Internal Assessment</option>
                  <option>Result Declaration</option>
                  <option>Administrative</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setNewDateModal(false)}
                className="px-4 py-2 border border-gray-200 text-gray-700 font-bold text-xs rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setToast('Event successfully gazetted onto Master University Academic Calendar.');
                  setNewDateModal(false);
                }}
                className="px-4 py-2 bg-gradient-to-r from-purple-800 to-purple-950 text-white font-bold text-xs rounded-xl shadow-md"
              >
                Add Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
