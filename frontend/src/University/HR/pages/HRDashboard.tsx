import React, { useState, useEffect } from 'react';
import { hrApi, Employee, RecruitmentRequisition, PayrollRecord } from '../services/hrApi';
import { EmployeeTable } from '../components/EmployeeTable';

export const HRDashboard: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [requisitions, setRequisitions] = useState<RecruitmentRequisition[]>([]);
  const [payroll, setPayroll] = useState<PayrollRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([hrApi.getEmployees(), hrApi.getRecruitment(), hrApi.getPayroll()]).then(
      ([empData, reqData, payData]) => {
        setEmployees(empData);
        setRequisitions(reqData);
        setPayroll(payData);
        setLoading(false);
      }
    );
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const totalPayroll = payroll.reduce((sum, p) => sum + p.netPay, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">University Human Resources Overview</h1>
        <p className="text-sm text-slate-500 mt-1">Staff roster, vacancy screening, attendance records & monthly payroll</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Staff Headcount</div>
          <div className="text-2xl font-black text-slate-900 mt-2">{employees.length} Active</div>
          <div className="text-xs text-emerald-600 font-semibold mt-1">100% Biometric Enrolled</div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Open Requisitions</div>
          <div className="text-2xl font-black text-blue-600 mt-2">{requisitions.length} Vacancies</div>
          <div className="text-xs text-slate-500 mt-1">Screening in progress</div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Monthly Payroll Disbursed</div>
          <div className="text-2xl font-black text-slate-900 mt-2">₹ {totalPayroll.toLocaleString('en-IN')}</div>
          <div className="text-xs text-emerald-600 font-semibold mt-1">Disbursed on 31 Oct 2026</div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Overall Staff Attendance</div>
          <div className="text-2xl font-black text-emerald-600 mt-2">97.4%</div>
          <div className="text-xs text-slate-500 mt-1">Institutional Biometric Sync</div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold text-slate-800 mb-3">Active Faculty & Staff Roster</h2>
        <EmployeeTable employees={employees} />
      </div>
    </div>
  );
};

export default HRDashboard;

