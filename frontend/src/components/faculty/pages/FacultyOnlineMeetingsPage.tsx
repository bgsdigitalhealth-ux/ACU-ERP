import React, { useState } from 'react';
import {
  Video,
  ExternalLink,
  Users,
  Calendar,
  Clock,
  Copy,
  Plus,
  CheckCircle2,
  X,
  Radio,
} from 'lucide-react';
import { useFaculty } from '../../../context/FacultyContext';
import { OnlineMeetingFaculty } from '../../../types/faculty';

export const FacultyOnlineMeetingsPage: React.FC = () => {
  const { currentCourse, meetings, profile } = useFaculty();

  const [activeTab, setActiveTab] = useState<'Live Now' | 'Upcoming' | 'Past'>('Live Now');
  const [meetingList, setMeetingList] = useState<OnlineMeetingFaculty[]>(meetings);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState('');

  // Schedule modal form state
  const [title, setTitle] = useState('');
  const [platform, setPlatform] = useState<'Google Meet' | 'Zoom' | 'MS Teams'>('Google Meet');
  const [meetingLink, setMeetingLink] = useState('https://meet.google.com/acu-class');
  const [dateStr, setDateStr] = useState('04-11-2026');
  const [timeRange, setTimeRange] = useState('11:45 AM - 12:45 PM');

  const filteredMeetings = meetingList.filter((m) => m.status === activeTab);

  const handleCopyLink = (link: string, id: string) => {
    navigator.clipboard.writeText(link);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newMeet: OnlineMeetingFaculty = {
      id: `meet-${Date.now()}`,
      title,
      courseCode: currentCourse.code,
      courseName: currentCourse.name,
      batch: currentCourse.batch,
      dateStr,
      timeRange,
      platform,
      meetingLink,
      status: 'Upcoming',
      hostName: profile.fullName,
      attendeesCount: 0,
    };

    setMeetingList((prev) => [newMeet, ...prev]);
    setShowScheduleModal(false);
    setTitle('');
    setToastMsg('Online class meeting scheduled and broadcast to students!');
    setTimeout(() => setToastMsg(''), 4000);
  };

  return (
    <div className="space-y-4">
      {/* Breadcrumb matching Page 10 */}
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        HOME &gt; SUBJECT COMMUNITY &gt; {currentCourse.code} - {currentCourse.name} &gt; ONLINE MEETINGS &gt; JOIN MEETING
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
      <div className="bg-white rounded-xl border border-gray-200 shadow-2xs p-5 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
          <div>
            <h1 className="text-sm sm:text-base font-extrabold text-gray-900 uppercase">
              Online Meetings &amp; Virtual Classrooms
            </h1>
            <div className="text-xs text-gray-500 font-medium mt-0.5">
              {currentCourse.code} - {currentCourse.name} • Batch: {currentCourse.batch}
            </div>
          </div>

          <button
            onClick={() => setShowScheduleModal(true)}
            className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold rounded-lg shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Schedule Virtual Class</span>
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
          {(['Live Now', 'Upcoming', 'Past'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === tab
                  ? 'bg-purple-700 text-white shadow-xs'
                  : 'text-gray-600 hover:text-purple-700 hover:bg-purple-50'
              }`}
            >
              {tab === 'Live Now' && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              )}
              <span>{tab}</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20">
                {meetingList.filter((m) => m.status === tab).length}
              </span>
            </button>
          ))}
        </div>

        {/* Meeting Cards List */}
        <div className="space-y-3">
          {filteredMeetings.length === 0 ? (
            <div className="py-12 text-center text-gray-400 space-y-2">
              <Video className="w-10 h-10 mx-auto text-gray-300" />
              <p className="text-xs font-semibold">No {activeTab} meetings found for this course.</p>
            </div>
          ) : (
            filteredMeetings.map((m) => (
              <div
                key={m.id}
                className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 hover:bg-purple-50/30 hover:border-purple-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800">
                      {m.platform}
                    </span>
                    <span className="text-[11px] font-mono font-bold text-gray-500">{m.courseCode}</span>
                    {m.status === 'Live Now' && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                        <Radio className="w-3 h-3 text-emerald-600 animate-pulse" />
                        Live Classroom
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-gray-900">{m.title}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 pt-0.5">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      {m.dateStr}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      {m.timeRange}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-gray-400" />
                      Host: {m.hostName}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start md:self-center">
                  <button
                    onClick={() => handleCopyLink(m.meetingLink, m.id)}
                    className="px-3 py-1.5 border border-gray-300 hover:bg-white text-gray-700 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5 text-gray-400" />
                    <span>{copiedId === m.id ? 'Copied!' : 'Copy Link'}</span>
                  </button>
                  <a
                    href={m.meetingLink}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-1.5 bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold rounded-lg shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Join Meeting</span>
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Schedule Meeting Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="bg-gradient-to-r from-purple-800 to-indigo-900 p-4 text-white flex items-center justify-between">
              <h3 className="font-bold text-sm">Schedule Virtual Classroom / Meeting</h3>
              <button
                onClick={() => setShowScheduleModal(false)}
                className="text-purple-200 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleScheduleSubmit} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block text-gray-700 font-bold mb-1">Meeting Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Cardiac Cycle &amp; ECG Waves Clinical Case Review"
                  className="w-full text-xs p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Platform</label>
                  <select
                    value={platform}
                    onChange={(e: any) => setPlatform(e.target.value)}
                    className="w-full text-xs p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  >
                    <option value="Google Meet">Google Meet</option>
                    <option value="MS Teams">MS Teams</option>
                    <option value="Zoom">Zoom</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={dateStr}
                    onChange={(e) => setDateStr(e.target.value)}
                    className="w-full text-xs p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Time Range</label>
                  <input
                    type="text"
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                    placeholder="10:00 AM - 11:30 AM"
                    className="w-full text-xs p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Meeting URL *</label>
                  <input
                    type="url"
                    required
                    value={meetingLink}
                    onChange={(e) => setMeetingLink(e.target.value)}
                    className="w-full text-xs p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowScheduleModal(false)}
                  className="px-3 py-1.5 border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-lg shadow-sm"
                >
                  Confirm &amp; Broadcast
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

