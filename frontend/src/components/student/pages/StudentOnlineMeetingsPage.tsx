import React, { useState } from 'react';
import { Video } from 'lucide-react';

export const StudentOnlineMeetingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'live' | 'upcoming' | 'past'>('live');
  const [showDemoMeetings, setShowDemoMeetings] = useState(false);

  return (
    <div className="space-y-4">
      {/* Breadcrumb matching Page 22 */}
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        ONLINE MEETINGS &gt; JOIN MEETING
      </div>

      <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <h2 className="text-xs sm:text-sm font-extrabold text-gray-900 uppercase tracking-wide">
            Join Meeting
          </h2>
          <button
            onClick={() => setShowDemoMeetings(!showDemoMeetings)}
            className="text-xs font-bold text-purple-700 hover:underline cursor-pointer"
          >
            {showDemoMeetings ? 'Show PDF Empty State' : 'Preview Active Meetings'}
          </button>
        </div>

        {/* Tabs matching Page 22 */}
        <div className="flex gap-2 border-b border-gray-200 pb-2">
          <button
            onClick={() => setActiveTab('live')}
            className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'live'
                ? 'bg-[#7047eb] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            LIVE NOW ({showDemoMeetings ? 1 : 0})
          </button>
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'upcoming'
                ? 'bg-[#7047eb] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            UPCOMING ({showDemoMeetings ? 2 : 0})
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'past'
                ? 'bg-[#7047eb] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            PAST MEETINGS ({showDemoMeetings ? 3 : 0})
          </button>
        </div>

        {/* Table matching Page 22 */}
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-700 font-extrabold border-b border-gray-200 text-[11px] uppercase">
                <th className="p-3 w-16">SL. NO</th>
                <th className="p-3">NAME</th>
                <th className="p-3">DESCRIPTION</th>
                <th className="p-3">MEETING DATE</th>
                <th className="p-3">HOST</th>
                <th className="p-3 text-center">JOIN</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {!showDemoMeetings ? (
                /* Page 22 exact empty row */
                <tr>
                  <td colSpan={6} className="p-12 text-center text-xs font-bold text-gray-500">
                    No Live Meetings
                  </td>
                </tr>
              ) : activeTab === 'live' ? (
                <tr className="hover:bg-purple-50/20">
                  <td className="p-3 font-bold text-gray-500">1</td>
                  <td className="p-3 font-extrabold text-gray-900">
                    Major Project Architecture &amp; Live Sprint Review
                  </td>
                  <td className="p-3 text-gray-600">
                    Online consultation with Dr. Anjana D on telemetry pipeline.
                  </td>
                  <td className="p-3 font-bold text-purple-700">Today, 03:00 PM - 04:30 PM</td>
                  <td className="p-3 text-gray-700 font-medium">Dr. ANJANA D</td>
                  <td className="p-3 text-center">
                    <a
                      href="https://meet.google.com"
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs inline-flex items-center gap-1.5 transition-colors"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Join Now</span>
                    </a>
                  </td>
                </tr>
              ) : activeTab === 'upcoming' ? (
                <tr className="hover:bg-purple-50/20">
                  <td className="p-3 font-bold text-gray-500">1</td>
                  <td className="p-3 font-extrabold text-gray-900">
                    Industry Guest Lecture: Zero-Trust Microservice Security
                  </td>
                  <td className="p-3 text-gray-600">
                    Keynote session by Principal Architect, AWS Bangalore.
                  </td>
                  <td className="p-3 font-bold text-purple-700">07-11-2026, 10:00 AM</td>
                  <td className="p-3 text-gray-700 font-medium">Department of Computer Applications</td>
                  <td className="p-3 text-center text-gray-400 font-semibold">
                    Opens 15m before
                  </td>
                </tr>
              ) : (
                <tr className="hover:bg-purple-50/20">
                  <td className="p-3 font-bold text-gray-500">1</td>
                  <td className="p-3 font-extrabold text-gray-900">
                    Pre-Placement Coding &amp; System Design Workshop
                  </td>
                  <td className="p-3 text-gray-600">Conducted on DSA mock problem sets.</td>
                  <td className="p-3 text-gray-500">24-10-2026</td>
                  <td className="p-3 text-gray-700">Prof. KUMARAVEL T</td>
                  <td className="p-3 text-center">
                    <button className="text-purple-700 font-bold hover:underline">
                      Recording
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
