import React, { useState } from 'react';
import { Users2, ClipboardList, UserCheck, CalendarCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { useUniversityAdmin } from '../../../context/UniversityAdminContext';

export const CoePracticalAllocationWizard: React.FC = () => {
  const { setToast } = useUniversityAdmin();
  const [currentStep, setCurrentStep] = useState(4);

  const steps = [
    { step: 1, label: 'Select Subject & Batch', icon: ClipboardList },
    { step: 2, label: 'Choose Examiners (External / Internal)', icon: UserCheck },
    { step: 3, label: 'Assign Date, Time & Venue', icon: CalendarCheck },
    { step: 4, label: 'Confirm Allocation', icon: CheckCircle2 }
  ];

  return (
    <div className="w-full bg-white rounded-2xl border border-purple-200/90 shadow-2xs overflow-hidden flex flex-col justify-between select-none">
      {/* Header Bar */}
      <div className="bg-gradient-to-r from-[#440d75] to-[#2d0850] text-white px-4 sm:px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users2 className="w-5 h-5 text-amber-300" />
          <h3 className="font-extrabold text-sm sm:text-base tracking-tight text-white">
            Examiner Allocation – Practical Examination
          </h3>
        </div>
        <span className="text-[11px] text-purple-200 font-medium bg-purple-900/60 px-2 py-0.5 rounded-full border border-purple-400/30">
          Step 4 of 4
        </span>
      </div>

      {/* Horizontal Step Sequence */}
      <div className="p-4 sm:p-5 overflow-x-auto">
        <div className="min-w-[500px] flex items-center justify-between gap-1.5">
          {steps.map((st, idx) => {
            const Icon = st.icon;
            const isFinished = currentStep > st.step;
            const isCurrent = currentStep === st.step;

            return (
              <React.Fragment key={st.step}>
                <div
                  onClick={() => {
                    setCurrentStep(st.step);
                    setToast(`Viewing Allocation Step: ${st.label}`);
                  }}
                  className="flex flex-col items-center text-center cursor-pointer group flex-1"
                >
                  <div
                    className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all ${
                      isCurrent
                        ? 'bg-purple-900 text-amber-300 ring-4 ring-purple-200 shadow-md scale-105'
                        : isFinished
                        ? 'bg-purple-100 text-purple-800 border-2 border-purple-300'
                        : 'bg-gray-100 text-gray-400 border border-gray-200'
                    }`}
                  >
                    <Icon className="w-5 h-5 stroke-[2.2]" />
                  </div>

                  <span
                    className={`mt-2 text-[11px] font-bold line-clamp-2 max-w-[110px] ${
                      isCurrent
                        ? 'text-purple-950 font-extrabold'
                        : 'text-gray-600'
                    }`}
                  >
                    {st.label}
                  </span>
                </div>

                {idx < steps.length - 1 && (
                  <div className="flex items-center justify-center text-purple-300 px-1 shrink-0">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

