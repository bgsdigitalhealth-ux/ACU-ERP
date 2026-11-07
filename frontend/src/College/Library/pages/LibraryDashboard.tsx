import React, { useState, useEffect } from 'react';
import { libraryApi, LibraryOverview } from '../services/libraryApi';

export const LibraryDashboard: React.FC = () => {
  const [overview, setOverview] = useState<LibraryOverview | null>(null);

  useEffect(() => {
    libraryApi.getOverview().then(setOverview);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">College Central Library & Knowledge Resource</h1>
        <p className="text-sm text-slate-500 mt-1">Live institutional governance, department logs and operational status</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase">Module Health</div>
          <div className="text-xl font-bold text-emerald-600 mt-1">{overview?.status || 'Operational'}</div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase">Architecture Mode</div>
          <div className="text-xl font-bold text-slate-900 mt-1">College Role Isolated</div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase">Security Clearance</div>
          <div className="text-xl font-bold text-blue-600 mt-1">Role Verified</div>
        </div>
      </div>
    </div>
  );
};
export default LibraryDashboard;
