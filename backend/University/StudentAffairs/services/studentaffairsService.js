import { StudentAffairsModel } from '../models/StudentAffairsModel.js';

export const studentaffairsService = {
  getOverview: async () => {
    return {
      module: 'StudentAffairs',
      title: 'Student Welfare & Grievance Redressal Board',
      status: 'Operational',
      lastUpdated: new Date().toISOString(),
    };
  },
  getRecords: async () => {
    try {
      const records = await StudentAffairsModel.find().lean();
      if (records?.length) return records;
    } catch {}
    return [
      { id: '1', title: 'Student Welfare & Grievance Redressal Board', status: 'Active', updatedAt: new Date().toLocaleDateString() }
    ];
  },
  createRecord: async (data) => {
    const item = { ...data, referenceId: 'studentaffairs-' + Date.now() };
    try { await StudentAffairsModel.create(item); } catch {}
    return item;
  }
};
export default studentaffairsService;
