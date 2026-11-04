import React from 'react';
import {
  CalendarDays,
  MapPin,
  Clock,
  ChevronRight,
  Users
} from 'lucide-react';

interface VcUpcomingEventsProps {
  onNavigate?: (tab: string) => void;
}

export const VcUpcomingEvents: React.FC<VcUpcomingEventsProps> = ({ onNavigate }) => {
  const events = [
    {
      id: 'event-1',
      date: '12 Mar 2025',
      time: '10:30 AM',
      title: '14th Academic Council Meeting',
      venue: 'Syndicate Hall, Administrative Block',
      category: 'Statutory Governance',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
      participants: 'VC, Deans, Academic Council Members',
      actionTab: 'academic-calendar'
    },
    {
      id: 'event-2',
      date: '18 Mar 2025',
      time: '09:00 AM',
      title: 'MBBS Phase-III Final Year Practical Examinations',
      venue: 'BGS Medical College & Hospital Wards',
      category: 'University Examinations',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      participants: 'External Observers & NMC Inspection Team',
      actionTab: 'univ-exam-status'
    },
    {
      id: 'event-3',
      date: '25 Mar 2025',
      time: '09:30 AM',
      title: 'International Medical Sciences & R&D Summit',
      venue: 'Sri Sri Sri Balagangadharanatha Swamiji Auditorium',
      category: 'Academic Conference',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
      participants: 'National Delegates, ICMR Scientists & Faculty',
      actionTab: 'performance-reports-vc'
    },
    {
      id: 'event-4',
      date: '02 Apr 2025',
      time: '02:00 PM',
      title: 'Board of Governors (BoG) Annual Budget Review',
      venue: 'Apex Council Boardroom',
      category: 'Financial Governance',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
      participants: 'Hon’ble Chancellor, VC, Finance Committee',
      actionTab: 'academic-calendar'
    },
    {
      id: 'event-5',
      date: '10 Apr 2025',
      time: '11:00 AM',
      title: 'Central Valuation Camp Inauguration',
      venue: 'Central Valuation Centre, Examination Bhavan',
      category: 'Confidential Valuation',
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
      participants: 'CoE, Registrar (Evaluation), 120 Chief Examiners',
      actionTab: 'valuation-progress-vc'
    }
  ];

  return (
    <div className="w-full bg-white rounded-2xl border border-purple-200/90 shadow-2xs overflow-hidden flex flex-col justify-between select-none">
      {/* Header Bar */}
      <div className="bg-gradient-to-r from-[#440d75] to-[#2d0850] text-white px-4 sm:px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CalendarDays className="w-5 h-5 text-amber-300" />
          <div>
            <h3 className="font-extrabold text-sm sm:text-base tracking-tight text-white">
              Upcoming University Events
            </h3>
          </div>
        </div>
        <button
          onClick={() => {
            if (onNavigate) onNavigate('academic-calendar');
          }}
          className="text-[11px] text-purple-200 font-bold hover:text-amber-300 cursor-pointer transition-colors"
        >
          View Full Calendar →
        </button>
      </div>

      {/* Events List */}
      <div className="p-3 sm:p-4 divide-y divide-purple-100 space-y-3">
        {events.map((evt) => (
          <div
            key={evt.id}
            className="pt-3 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
          >
            <div className="flex items-start gap-3">
              {/* Date Box */}
              <div className="w-14 h-14 rounded-xl bg-purple-50 border border-purple-200 flex flex-col items-center justify-center shrink-0 group-hover:bg-purple-600 group-hover:text-white transition-all shadow-2xs">
                <span className="text-[10px] font-bold uppercase text-purple-700 group-hover:text-purple-100">
                  {evt.date.split(' ')[1]}
                </span>
                <span className="text-base font-black text-purple-950 group-hover:text-white leading-none">
                  {evt.date.split(' ')[0]}
                </span>
                <span className="text-[9px] font-semibold text-gray-500 group-hover:text-purple-200">
                  {evt.date.split(' ')[2]}
                </span>
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h4 className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-purple-950 transition-colors">
                    {evt.title}
                  </h4>
                  <span
                    className={`text-[9.5px] font-bold px-2 py-0.5 rounded-full border ${evt.badgeColor}`}
                  >
                    {evt.category}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-[11px] text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-purple-600" />
                    {evt.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-rose-500" />
                    {evt.venue}
                  </span>
                  <span className="hidden md:flex items-center gap-1 text-gray-600">
                    <Users className="w-3 h-3 text-blue-500" />
                    {evt.participants}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              <button
                onClick={() => {
                  if (onNavigate) onNavigate(evt.actionTab);
                }}
                className="px-2.5 py-1 text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg flex items-center gap-1 transition-all cursor-pointer"
              >
                <span>Agenda</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
