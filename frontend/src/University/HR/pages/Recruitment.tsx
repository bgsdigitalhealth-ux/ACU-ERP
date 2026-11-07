import React, { useState, useEffect } from 'react';
import { hrApi, RecruitmentRequisition } from '../services/hrApi';
import { RecruitmentForm } from '../components/RecruitmentForm';

export const Recruitment: React.FC = () => {
  const [requisitions, setRequisitions] = useState<RecruitmentRequisition[]>([]);

  const loadData = () => {
    hrApi.getRecruitment().then(setRequisitions);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Talent Acquisition & Recruitment</h1>
        <p className="text-sm text-slate-500">Post university job vacancies and track applicant screening</p>
      </div>

      <RecruitmentForm onSuccess={loadData} />

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <h3 className="text-base font-bold text-slate-800 mb-4">Active University Job Postings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {requisitions.map((req) => (
            <div key={req.requisitionId} className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors bg-slate-50/50">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-slate-900">{req.title}</h4>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">{req.department} • {req.requisitionId}</p>
                </div>
                <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  {req.status}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-2.5 line-clamp-2">{req.qualification}</p>
              <div className="mt-3 pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                <span>Deadline: <strong className="text-slate-700">{req.applicationDeadline}</strong></span>
                <span>Applicants: <strong className="text-blue-600">{req.applicantsCount}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recruitment;

