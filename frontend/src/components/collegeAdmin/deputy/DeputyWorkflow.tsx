import React from 'react';
import { Layers, Calendar, Users, ClipboardList, Bell, FileCheck2, ArrowRight } from 'lucide-react';
import { useCollegeAdmin } from '../../../context/CollegeAdminContext';

export const DeputyWorkflow: React.FC = () => {
  const { setActiveDeputyModal } = useCollegeAdmin();

  const stages = [
    {
      id: 'plan',
      label: 'Plan Exam & Centre',
      icon: Calendar,
      status: 'completed',
      active: false,
    },
    {
      id: 'allocate',
      label: 'Allocate Invigilators',
      icon: Users,
      status: 'active',
      active: true,
      action: () => setActiveDeputyModal('allocate'),
    },
    {
      id: 'publish',
      label: 'Publish Duty Roster',
      icon: ClipboardList,
      status: 'upcoming',
      active: false,
      action: () => setActiveDeputyModal('roster'),
    },
    {
      id: 'conduct',
      label: 'Conduct & Monitor',
      icon: Bell,
      status: 'upcoming',
      active: false,
    },
    {
      id: 'attendance',
      label: 'Attendance & Reporting',
      icon: FileCheck2,
      status: 'upcoming',
      active: false,
      action: () => setActiveDeputyModal('attendance'),
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-purple-100 p-4 sm:p-5 flex flex-col justify-between h-full">
      {/* Title bar with purple banner/header */}
      <div className="bg-gradient-to-r from-[#4B087B] to-[#7900B8] -mx-4 -mt-4 sm:-mx-5 sm:-mt-5 p-3 rounded-t-xl text-white flex items-center justify-between shadow-xs mb-4">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-amber-300" />
          <h2 className="text-xs sm:text-sm font-bold tracking-wide">
            Examination Workflow – Deputy Superintendent
          </h2>
        </div>
      </div>

      {/* 5-Step Process Flow with connecting arrows */}
      <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-2 py-2">
        {stages.map((stage, idx) => {
          const Icon = stage.icon;
          return (
            <React.Fragment key={stage.id}>
              <div
                onClick={stage.action}
                className={`flex flex-col items-center text-center p-2 rounded-xl transition-all flex-1 min-w-[100px] ${
                  stage.active
                    ? 'scale-105 cursor-pointer'
                    : stage.action
                    ? 'cursor-pointer hover:bg-purple-50/60'
                    : 'opacity-85'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 shadow-xs transition-all ${
                    stage.active
                      ? 'bg-purple-100 text-purple-700 ring-2 ring-purple-600 ring-offset-2'
                      : 'bg-gray-100 text-gray-600 border border-gray-200'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span
                  className={`text-[11px] sm:text-xs font-bold leading-tight ${
                    stage.active ? 'text-purple-900 font-extrabold' : 'text-gray-700'
                  }`}
                >
                  {stage.label}
                </span>
              </div>

              {idx < stages.length - 1 && (
                <div className="hidden md:flex items-center text-gray-300 shrink-0">
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

