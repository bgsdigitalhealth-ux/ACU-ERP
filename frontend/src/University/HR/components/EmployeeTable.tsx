import React from 'react';
import { Employee } from '../services/hrApi';

interface EmployeeTableProps {
  employees: Employee[];
}

export const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-xl border border-slate-200 shadow-sm">
      <table className="w-full text-left border-collapse text-sm">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold text-xs uppercase tracking-wider">
            <th className="py-3.5 px-4">Emp ID</th>
            <th className="py-3.5 px-4">Employee Name</th>
            <th className="py-3.5 px-4">Department</th>
            <th className="py-3.5 px-4">Designation</th>
            <th className="py-3.5 px-4">Type</th>
            <th className="py-3.5 px-4">Status</th>
            <th className="py-3.5 px-4 text-right">Gross Salary</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {employees.map((emp) => (
            <tr key={emp.employeeId} className="hover:bg-slate-50/80 transition-colors">
              <td className="py-3 px-4 font-mono font-medium text-blue-600">{emp.employeeId}</td>
              <td className="py-3 px-4">
                <div className="font-semibold text-slate-800">{emp.fullName}</div>
                <div className="text-xs text-slate-500">{emp.email}</div>
              </td>
              <td className="py-3 px-4 text-slate-700">{emp.department}</td>
              <td className="py-3 px-4 text-slate-700">{emp.designation}</td>
              <td className="py-3 px-4">
                <span className="px-2 py-0.5 text-xs rounded-full bg-slate-100 text-slate-700 font-medium">
                  {emp.employmentType}
                </span>
              </td>
              <td className="py-3 px-4">
                <span className="px-2.5 py-1 text-xs rounded-full font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {emp.status}
                </span>
              </td>
              <td className="py-3 px-4 text-right font-semibold text-slate-900">
                ₹ {emp.salaryGross.toLocaleString('en-IN')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;

