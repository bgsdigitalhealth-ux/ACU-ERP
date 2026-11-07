import { PrincipalModel } from '../models/PrincipalModel.js';

export const principalService = {
  getOverview: async () => {
    return {
      module: 'Principal',
      title: 'Principal College Governance & Executive Administration',
      status: 'Operational',
      lastUpdated: new Date().toISOString(),
    };
  },
  getRecords: async () => {
    try {
      const records = await PrincipalModel.find().lean();
      if (records?.length) return records;
    } catch {}
    return [
      { id: '1', title: 'Principal College Governance & Executive Administration', status: 'Active', updatedAt: new Date().toLocaleDateString() }
    ];
  },
  createRecord: async (data) => {
    const item = { ...data, referenceId: 'principal-' + Date.now() };
    try { await PrincipalModel.create(item); } catch {}
    return item;
  }
};
export default principalService;
