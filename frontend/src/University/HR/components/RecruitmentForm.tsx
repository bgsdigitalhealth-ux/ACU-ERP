import React, { useState } from 'react';

interface RecruitmentFormProps {
  onSuccess?: () => void;
}

export const RecruitmentForm: React.FC<RecruitmentFormProps> = ({ onSuccess }) => {
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('Physiology');
  const [positions, setPositions] = useState(1);
  const [qualification, setQualification] = useState('');
  const [deadline, setDeadline] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      alert('Requisition posted successfully!');
      setTitle('');
      setQualification('');
      setDeadline('');
      onSuccess?.();
    }, 600);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
      <h3 className="text-base font-bold text-slate-800 border-b pb-3">Create New Job Requisition</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Position Title</label>
          <input
            type="text"
            required
            placeholder="e.g. Associate Professor in Pharmacology"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Department</label>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option>Physiology</option>
            <option>Anatomy</option>
            <option>Biochemistry</option>
            <option>Pathology</option>
            <option>General Medicine</option>
            <option>IT & Engineering</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Number of Vacancies</label>
          <input
            type="number"
            min={1}
            value={positions}
            onChange={(e) => setPositions(Number(e.target.value))}
            className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Application Deadline</label>
          <input
            type="date"
            required
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-slate-600 mb-1">Minimum Qualification Required</label>
          <textarea
            required
            rows={2}
            placeholder="e.g. MD/MS with recognized NMC teaching experience..."
            value={qualification}
            onChange={(e) => setQualification(e.target.value)}
            className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>
      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg transition-colors shadow-sm"
        >
          {submitting ? 'Posting...' : 'Publish Requisition'}
        </button>
      </div>
    </form>
  );
};

export default RecruitmentForm;

