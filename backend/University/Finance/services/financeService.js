import { FinanceModel } from '../models/FinanceModel.js';

export const financeService = {
  getOverview: async () => {
    return {
      module: 'Finance',
      title: 'Consolidated University Treasury & Grant Reconciliations',
      status: 'Operational',
      lastUpdated: new Date().toISOString(),
    };
  },
  getRecords: async () => {
    try {
      const records = await FinanceModel.find().lean();
      if (records?.length) return records;
    } catch {}
    return [
      { id: '1', title: 'Consolidated University Treasury & Grant Reconciliations', status: 'Active', updatedAt: new Date().toLocaleDateString() }
    ];
  },
  createRecord: async (data) => {
    const item = { ...data, referenceId: 'finance-' + Date.now() };
    try { await FinanceModel.create(item); } catch {}
    return item;
  }
};
export default financeService;
