import React from 'react';
import { PayrollRecord } from '../services/hrApi';

interface PayrollTableProps {
  records: PayrollRecord[];
}

export const PayrollTable: React.FC<PayrollTableProps> = ({ records }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-xl border border-slate-200 shadow-sm">
      <table className="w-full text-left border-collapse text-sm">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold text-xs uppercase tracking-wider">
            <th className="py-3.5 px-4">Payroll Ref</th>
            <th className="py-3.5 px-4">Employee</th>
            <th className="py-3.5 px-4">Department</th>
            <th className="py-3.5 px-4 text-right">Basic Pay</th>
            <th className="py-3.5 px-4 text-right">Allowances</th>
            <th className="py-3.5 px-4 text-right">Deductions</th>
            <th className="py-3.5 px-4 text-right">Net Payable</th>
            <th className="py-3.5 px-4 text-center">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {records.map((r) => (
            <tr key={r.payrollId} className="hover:bg-slate-50/80 transition-colors">
              <td className="py-3 px-4 font-mono font-medium text-slate-700">{r.payrollId}</td>
              <td className="py-3 px-4">
                <div className="font-semibold text-slate-800">{r.employeeName}</div>
                <div className="text-xs text-slate-500">{r.employeeId}</div>
              </td>
              <td className="py-3 px-4 text-slate-700">{r.department}</td>
              <td className="py-3 px-4 text-right text-slate-700">₹ {r.basicPay.toLocaleString('en-IN')}</td>
              <td className="py-3 px-4 text-right text-emerald-600">+₹ {r.daHra.toLocaleString('en-IN')}</td>
              <td className="py-3 px-4 text-right text-rose-600">-₹ {r.deductions.toLocaleString('en-IN')}</td>
              <td className="py-3 px-4 text-right font-black text-slate-900">₹ {r.netPay.toLocaleString('en-IN')}</td>
              <td className="py-3 px-4 text-center">
                <span className="px-2.5 py-1 text-xs rounded-full font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {r.paymentStatus}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PayrollTable;

