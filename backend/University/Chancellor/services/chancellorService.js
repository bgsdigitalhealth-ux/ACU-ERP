import { ChancellorModel } from '../models/ChancellorModel.js';

export const chancellorService = {
  getOverview: async () => {
    return {
      module: 'Chancellor',
      title: 'Chancellor Apex Decrees & Statutory Approvals',
      status: 'Operational',
      lastUpdated: new Date().toISOString(),
    };
  },
  getRecords: async () => {
    try {
      const records = await ChancellorModel.find().lean();
      if (records?.length) return records;
    } catch {}
    return [
      { id: '1', title: 'Chancellor Apex Decrees & Statutory Approvals', status: 'Active', updatedAt: new Date().toLocaleDateString() }
    ];
  },
  createRecord: async (data) => {
    const item = { ...data, referenceId: 'chancellor-' + Date.now() };
    try { await ChancellorModel.create(item); } catch {}
    return item;
  }
};
export default chancellorService;
