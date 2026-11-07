import { VicePrincipalModel } from '../models/VicePrincipalModel.js';

export const viceprincipalService = {
  getOverview: async () => {
    return {
      module: 'VicePrincipal',
      title: 'Vice Principal Academic Operations & Timetable Management',
      status: 'Operational',
      lastUpdated: new Date().toISOString(),
    };
  },
  getRecords: async () => {
    try {
      const records = await VicePrincipalModel.find().lean();
      if (records?.length) return records;
    } catch {}
    return [
      { id: '1', title: 'Vice Principal Academic Operations & Timetable Management', status: 'Active', updatedAt: new Date().toLocaleDateString() }
    ];
  },
  createRecord: async (data) => {
    const item = { ...data, referenceId: 'viceprincipal-' + Date.now() };
    try { await VicePrincipalModel.create(item); } catch {}
    return item;
  }
};
export default viceprincipalService;
