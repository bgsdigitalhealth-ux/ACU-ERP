import React from 'react';
import {
  Layers,
  ClipboardList,
  FileSearch,
  Users,
  UploadCloud,
  CheckCircle2,
  ArrowRight,
  X
} from 'lucide-react';
import { useHod } from '../../context/HodContext';
import { DepartmentWorkflowStage } from '../../types/hod';

export const DepartmentWorkflowSection: React.FC = () => {
  const { workflowStages, selectedStage, setSelectedStage, setActiveQuickModal } = useHod();

  const getStageIcon = (id: string) => {
    switch (id) {
      case 'nominate':
        return ClipboardList;
      case 'review':
        return FileSearch;
      case 'conduct':
        return Users;
      case 'verify':
        return UploadCloud;
      case 'complete':
      default:
        return CheckCircle2;
    }
  };

  const handleStageClick = (stage: DepartmentWorkflowStage) => {
    setSelectedStage(stage);
    if (stage.id === 'nominate') setActiveQuickModal('nominate');
    else if (stage.id === 'review') setActiveQuickModal('review');
    else if (stage.id === 'verify') setActiveQuickModal('upload');
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-purple-200/90 shadow-2xs overflow-hidden flex flex-col justify-between select-none">
      {/* Header Bar */}
      <div className="bg-gradient-to-r from-[#440d75] to-[#2d0850] text-white px-4 sm:px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Layers className="w-5 h-5 text-amber-300" />
          <h3 className="font-extrabold text-sm sm:text-base tracking-tight text-white">
            Department Examination Workflow
          </h3>
        </div>
        <span className="text-[11px] text-purple-200 font-medium bg-purple-900/60 px-2.5 py-0.5 rounded-full border border-purple-400/30">
          Stage 3 Active • Evaluation in Progress
        </span>
      </div>

      {/* Horizontal Flow Container */}
      <div className="p-4 sm:p-6 overflow-x-auto">
        <div className="min-w-[620px] flex items-center justify-between gap-2">
          {workflowStages.map((stage, idx) => {
            const isConduct = stage.id === 'conduct';
            const Icon = getStageIcon(stage.id);
            const isCompleted = stage.status === 'Completed';

            return (
              <React.Fragment key={stage.id}>
                {/* Stage Node */}
                <div
                  onClick={() => handleStageClick(stage)}
                  className="flex flex-col items-center text-center cursor-pointer group flex-1"
                >
                  {/* Icon Container */}
                  <div
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all ${
                      isConduct
                        ? 'bg-gradient-to-br from-[#7e22ce] to-[#581c87] text-white shadow-lg ring-4 ring-purple-200 scale-105'
                        : isCompleted
                        ? 'bg-purple-50 border-2 border-purple-300 text-purple-900 hover:border-purple-500'
                        : 'bg-gray-50 border-2 border-gray-200 text-gray-400 hover:border-purple-300 hover:text-purple-600'
                    }`}
                  >
                    <Icon className="w-7 h-7 stroke-[2]" />
                  </div>

                  {/* Stage Label */}
                  <div className="mt-2.5">
                    <span
                      className={`text-xs font-extrabold block leading-tight ${
                        isConduct ? 'text-purple-950 font-black' : 'text-gray-800'
                      }`}
                    >
                      {stage.label}
                    </span>
                    {stage.subLabel && (
                      <span className="text-[10.5px] font-bold text-purple-700 block">
                        {stage.subLabel}
                      </span>
                    )}
                  </div>
                </div>

                {/* Arrow Connector between stages */}
                {idx < workflowStages.length - 1 && (
                  <div className="text-purple-300 px-1 shrink-0">
                    <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Stage Inspection Modal */}
      {selectedStage && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-2xs animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border-2 border-purple-200">
            <div className="flex items-start justify-between pb-3 border-b border-gray-100">
              <div>
                <span className="text-[10px] font-extrabold text-purple-700 bg-purple-100 px-2 py-0.5 rounded uppercase">
                  Workflow Milestone
                </span>
                <h3 className="text-lg font-extrabold text-[#1e1b4b] mt-1">
                  {selectedStage.label} {selectedStage.subLabel || ''}
                </h3>
              </div>
              <button
                onClick={() => setSelectedStage(null)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="my-4 text-xs space-y-2.5">
              <div className="p-3 bg-purple-50 rounded-xl border border-purple-100 text-purple-950">
                <span className="text-gray-500 font-bold block mb-0.5">Status:</span>
                <span className="font-extrabold text-sm">{selectedStage.status}</span>
              </div>
              {selectedStage.completionDate && (
                <p className="text-gray-600">
                  <strong className="text-gray-800">Timeline:</strong> {selectedStage.completionDate}
                </p>
              )}
              {selectedStage.responsibleFaculty && (
                <p className="text-gray-600">
                  <strong className="text-gray-800">Assigned Authority:</strong> {selectedStage.responsibleFaculty}
                </p>
              )}
              <p className="text-gray-700 bg-gray-50 p-3 rounded-xl border border-gray-200 leading-relaxed">
                {selectedStage.description}
              </p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedStage(null)}
                className="px-4 py-2 bg-[#4a157c] text-white rounded-xl text-xs font-bold"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
