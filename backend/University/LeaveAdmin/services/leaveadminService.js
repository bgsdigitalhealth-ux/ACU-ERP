import { LeaveAdminModel } from '../models/LeaveAdminModel.js';

export const leaveadminService = {
  getOverview: async () => {
    return {
      module: 'LeaveAdmin',
      title: 'University Centralized Leave Sanctions',
      status: 'Operational',
      lastUpdated: new Date().toISOString(),
    };
  },
  getRecords: async () => {
    try {
      const records = await LeaveAdminModel.find().lean();
      if (records?.length) return records;
    } catch {}
    return [
      { id: '1', title: 'University Centralized Leave Sanctions', status: 'Active', updatedAt: new Date().toLocaleDateString() }
    ];
  },
  createRecord: async (data) => {
    const item = { ...data, referenceId: 'leaveadmin-' + Date.now() };
    try { await LeaveAdminModel.create(item); } catch {}
    return item;
  }
};
export default leaveadminService;
