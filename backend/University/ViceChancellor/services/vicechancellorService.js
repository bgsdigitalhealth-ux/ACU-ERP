import { ViceChancellorModel } from '../models/ViceChancellorModel.js';

export const vicechancellorService = {
  getOverview: async () => {
    return {
      module: 'ViceChancellor',
      title: 'Vice Chancellor Academic Regulations & Governance',
      status: 'Operational',
      lastUpdated: new Date().toISOString(),
    };
  },
  getRecords: async () => {
    try {
      const records = await ViceChancellorModel.find().lean();
      if (records?.length) return records;
    } catch {}
    return [
      { id: '1', title: 'Vice Chancellor Academic Regulations & Governance', status: 'Active', updatedAt: new Date().toLocaleDateString() }
    ];
  },
  createRecord: async (data) => {
    const item = { ...data, referenceId: 'vicechancellor-' + Date.now() };
    try { await ViceChancellorModel.create(item); } catch {}
    return item;
  }
};
export default vicechancellorService;
