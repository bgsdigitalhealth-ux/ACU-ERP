import React from 'react';
import { BarChart3, Check, Users, FileText } from 'lucide-react';

export const DeputyExamStatusTrack: React.FC = () => {
  const steps = [
    { id: 1, label: 'Exam Setup', status: 'completed' },
    { id: 2, label: 'Centre & Hall', status: 'completed' },
    { id: 3, label: 'Invigilator Allocation', status: 'completed' },
    { id: 4, label: 'Conduct (In Progress)', status: 'current' },
    { id: 5, label: 'Report Pending', status: 'pending' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-purple-100 p-4 sm:p-5 flex flex-col justify-between h-full">
      {/* Title bar banner */}
      <div className="bg-gradient-to-r from-[#4B087B] to-[#7900B8] -mx-4 -mt-4 sm:-mx-5 sm:-mt-5 p-3 rounded-t-xl text-white flex items-center justify-between shadow-xs mb-3">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-amber-300" />
          <h2 className="text-xs sm:text-sm font-bold tracking-wide">
            Examination Status
          </h2>
        </div>
      </div>

      {/* Horizontal Progress Timeline */}
      <div className="relative py-4 flex items-center justify-between px-2 sm:px-6">
        {/* Connecting line behind circles */}
        <div className="absolute left-8 right-8 top-1/2 -translate-y-2 h-[3px] bg-gray-200 z-0">
          <div className="h-full bg-green-500 w-[72%] transition-all" />
        </div>

        {steps.map((step) => {
          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center">
              {step.status === 'completed' && (
                <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center shadow-xs">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
              )}

              {step.status === 'current' && (
                <div className="w-9 h-9 rounded-full bg-purple-700 text-white flex items-center justify-center shadow-md ring-4 ring-purple-200 scale-110">
                  <Users className="w-4 h-4" />
                </div>
              )}

              {step.status === 'pending' && (
                <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-gray-300 text-gray-400 flex items-center justify-center">
                  <FileText className="w-3.5 h-3.5" />
                </div>
              )}

              <span
                className={`mt-2 text-[10px] sm:text-xs font-bold text-center leading-tight max-w-[85px] ${
                  step.status === 'current'
                    ? 'text-purple-900 font-extrabold'
                    : step.status === 'completed'
                    ? 'text-gray-800'
                    : 'text-gray-400'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

