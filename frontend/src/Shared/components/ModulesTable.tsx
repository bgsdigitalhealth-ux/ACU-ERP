import React from 'react';
import { ErpModuleItem } from '../types/erp';

interface ModulesTableProps {
  items: ErpModuleItem[];
}

export const ModulesTable: React.FC<ModulesTableProps> = ({ items }) => {
  const getStatusBadge = (status: ErpModuleItem['status']) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-50 text-emerald-600 border border-emerald-200';
      case 'Active':
        return 'bg-[#e0f9fc] text-[#00b5ad] border border-[#bbf3f8]';
      case 'Pending':
      default:
        return 'bg-[#fdeaf3] text-[#e83e8c] border border-[#f9bedb]';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#edf2f7] shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-[#edf2f7] flex items-center justify-between">
        <h4 className="text-base font-bold text-[#1e293b]">Recent ERP Transactions</h4>
        <span className="text-xs font-medium text-[#7047eb] hover:underline cursor-pointer">View All</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#f8fafc] text-[11px] font-semibold text-[#8a92a6] uppercase tracking-wider border-b border-[#edf2f7]">
              <th className="py-3 px-6">Transaction Code</th>
              <th className="py-3 px-6">Module / Record</th>
              <th className="py-3 px-6">Department</th>
              <th className="py-3 px-6">Amount</th>
              <th className="py-3 px-6">Date</th>
              <th className="py-3 px-6 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#edf2f7] text-xs">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-[#f8fafc]/70 transition-colors">
                <td className="py-3.5 px-6 font-mono font-medium text-[#7047eb]">
                  {item.code}
                </td>
                <td className="py-3.5 px-6 font-medium text-[#1e293b]">
                  {item.name}
                </td>
                <td className="py-3.5 px-6 text-[#64748b]">
                  {item.department}
                </td>
                <td className="py-3.5 px-6 font-bold text-[#1e293b]">
                  {item.amount}
                </td>
                <td className="py-3.5 px-6 text-[#8a92a6]">
                  {item.date}
                </td>
                <td className="py-3.5 px-6 text-center">
                  <span
                    className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold ${getStatusBadge(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

