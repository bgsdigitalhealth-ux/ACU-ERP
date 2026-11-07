import React, { useState, useEffect } from 'react';
import { hrApi, PayrollRecord } from '../services/hrApi';
import { PayrollTable } from '../components/PayrollTable';

export const Payroll: React.FC = () => {
  const [records, setRecords] = useState<PayrollRecord[]>([]);
  const [month, setMonth] = useState('October 2026');

  useEffect(() => {
    hrApi.getPayroll(month).then(setRecords);
  }, [month]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">University Payroll & Compensation</h1>
          <p className="text-sm text-slate-500">Monthly salary registers, deductions, DA/HRA & payment authorizations</p>
        </div>
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="px-3.5 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white font-medium"
        >
          <option>October 2026</option>
          <option>September 2026</option>
          <option>August 2026</option>
        </select>
      </div>

      <PayrollTable records={records} />
    </div>
  );
};

export default Payroll;

