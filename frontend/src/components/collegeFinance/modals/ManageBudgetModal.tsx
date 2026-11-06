import React, { useState } from 'react';
import { X, CheckCircle2, PieChart } from 'lucide-react';

interface ManageBudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateUtilization: (utilization: number) => void;
}

export const ManageBudgetModal: React.FC<ManageBudgetModalProps> = ({
  isOpen,
  onClose,
  onUpdateUtilization,
}) => {
  const [departments] = useState([
    { name: 'Computer Science (CSE)', allocated: 85, spent: 68 },
    { name: 'Electronics & Comm (ECE)', allocated: 70, spent: 54 },
    { name: 'Mechanical Engineering', allocated: 65, spent: 50 },
    { name: 'Civil Engineering', allocated: 50, spent: 38 },
    { name: 'Central Library & Resources', allocated: 40, spent: 32 },
    { name: 'Campus Infrastructure & IT', allocated: 90, spent: 68 },
  ]);

  if (!isOpen) return null;

  const totalAllocated = departments.reduce((acc, d) => acc + d.allocated, 0);
  const totalSpent = departments.reduce((acc, d) => acc + d.spent, 0);
  const utilization = Math.round((totalSpent / totalAllocated) * 100);

  const handleSave = () => {
    onUpdateUtilization(utilization);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-gradient-to-r from-[#d97706] to-[#f59e0b] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <PieChart className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">College Budget Planning &amp; Allocation</h3>
              <p className="text-xs text-amber-100">Annual department allocation and real-time utilization</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-amber-50 p-3 rounded-2xl border border-amber-200">
              <p className="text-[10px] font-semibold text-amber-800 uppercase">Total Budget</p>
              <p className="text-base font-black text-amber-900">₹ {(totalAllocated * 100000).toLocaleString('en-IN')}</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-2xl border border-blue-200">
              <p className="text-[10px] font-semibold text-blue-800 uppercase">Utilized Amount</p>
              <p className="text-base font-black text-blue-900">₹ {(totalSpent * 100000).toLocaleString('en-IN')}</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-2xl border border-purple-200">
              <p className="text-[10px] font-semibold text-purple-800 uppercase">Overall Utilization</p>
              <p className="text-base font-black text-purple-900">{utilization}%</p>
            </div>
          </div>

          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {departments.map((dept) => {
              const deptPct = Math.round((dept.spent / dept.allocated) * 100);
              return (
                <div key={dept.name} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-gray-800">{dept.name}</span>
                    <span className="font-semibold text-gray-600">
                      ₹ {dept.spent}L / {dept.allocated}L ({deptPct}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        deptPct > 85 ? 'bg-red-500' : deptPct > 70 ? 'bg-amber-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${deptPct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2 flex items-center justify-end gap-3 border-t border-gray-100">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 text-xs font-bold bg-[#d97706] hover:bg-[#b45309] text-white rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Apply &amp; Update Budget Tracking</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
