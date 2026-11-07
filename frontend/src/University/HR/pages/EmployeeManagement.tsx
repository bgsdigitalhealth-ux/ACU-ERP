import React, { useState, useEffect } from 'react';
import { hrApi, Employee } from '../services/hrApi';
import { EmployeeTable } from '../components/EmployeeTable';

export const EmployeeManagement: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    hrApi.getEmployees().then(setEmployees);
  }, []);

  const filtered = employees.filter(
    (e) =>
      e.fullName.toLowerCase().includes(search.toLowerCase()) ||
      e.department.toLowerCase().includes(search.toLowerCase()) ||
      e.employeeId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Employee Management</h1>
          <p className="text-sm text-slate-500">Search and administer employee profiles and designations</p>
        </div>
        <div className="w-full sm:w-72">
          <input
            type="text"
            placeholder="Search by name, ID or department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3.5 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
          />
        </div>
      </div>
      <EmployeeTable employees={filtered} />
    </div>
  );
};

export default EmployeeManagement;

