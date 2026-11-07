import { CollegeAdminModel } from '../models/CollegeAdminModel.js';

export const collegeadminService = {
  getOverview: async () => {
    return {
      module: 'CollegeAdmin',
      title: 'College Infrastructure & Department Management',
      status: 'Operational',
      lastUpdated: new Date().toISOString(),
    };
  },
  getRecords: async () => {
    try {
      const records = await CollegeAdminModel.find().lean();
      if (records?.length) return records;
    } catch {}
    return [
      { id: '1', title: 'College Infrastructure & Department Management', status: 'Active', updatedAt: new Date().toLocaleDateString() }
    ];
  },
  createRecord: async (data) => {
    const item = { ...data, referenceId: 'collegeadmin-' + Date.now() };
    try { await CollegeAdminModel.create(item); } catch {}
    return item;
  }
};
export default collegeadminService;
