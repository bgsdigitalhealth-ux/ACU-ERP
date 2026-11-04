import React from 'react';
import { Calendar, Users, MapPin, Armchair, FileCheck, CheckCircle2 } from 'lucide-react';
import { useCollegeAdmin } from '../../../context/CollegeAdminContext';

export const DeanKpis: React.FC = () => {
  const { deanKpis } = useCollegeAdmin();

  const cards = [
    {
      id: 'scheduled',
      value: deanKpis.examsScheduled,
      label: 'Exams Scheduled',
      icon: Calendar,
      bg: 'bg-[#8A2BE2]'
    },
    {
      id: 'invigilators',
      value: deanKpis.invigilatorsAllotted,
      label: 'Invigilators Allotted',
      icon: Users,
      bg: 'bg-[#00B4D8]'
    },
    {
      id: 'halls',
      value: deanKpis.examHalls,
      label: 'Exam Halls',
      icon: MapPin,
      bg: 'bg-[#F59E0B]'
    },
    {
      id: 'seats',
      value: deanKpis.totalSeats.toLocaleString('en-IN'),
      label: 'Total Seats',
      icon: Armchair,
      bg: 'bg-[#EC4899]'
    },
    {
      id: 'allocation',
      value: `${deanKpis.allocationCompletedPercent}%`,
      label: 'Allocation Completed',
      icon: FileCheck,
      bg: 'bg-[#2563EB]'
    },
    {
      id: 'issues',
      value: deanKpis.pendingIssues,
      label: 'Pending Issues',
      icon: CheckCircle2,
      bg: 'bg-[#10B981]'
    }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 select-none">
      {cards.map((c) => {
        const Icon = c.icon;
        return (
          <div
            key={c.id}
            className="bg-white border border-purple-200/90 rounded-2xl p-4 shadow-2xs flex items-center gap-3.5 hover:shadow-md transition-all group"
          >
            <div className={`w-12 h-12 rounded-2xl ${c.bg} text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform`}>
              <Icon className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div className="min-w-0">
              <span className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight leading-none block">
                {c.value}
              </span>
              <p className="text-[11px] font-semibold text-gray-600 mt-1 leading-tight line-clamp-2">
                {c.label}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

