import { HODModel } from '../models/HODModel.js';

export const hodService = {
  getOverview: async () => {
    return {
      module: 'HOD',
      title: 'Department Curriculum Delivery & Clinical Postings',
      status: 'Operational',
      lastUpdated: new Date().toISOString(),
    };
  },
  getRecords: async () => {
    try {
      const records = await HODModel.find().lean();
      if (records?.length) return records;
    } catch {}
    return [
      { id: '1', title: 'Department Curriculum Delivery & Clinical Postings', status: 'Active', updatedAt: new Date().toLocaleDateString() }
    ];
  },
  createRecord: async (data) => {
    const item = { ...data, referenceId: 'hod-' + Date.now() };
    try { await HODModel.create(item); } catch {}
    return item;
  }
};
export default hodService;
