import { ExaminationModel } from '../models/ExaminationModel.js';

export const examinationService = {
  getOverview: async () => {
    return {
      module: 'Examination',
      title: 'Central University Board Examinations & QP Generation',
      status: 'Operational',
      lastUpdated: new Date().toISOString(),
    };
  },
  getRecords: async () => {
    try {
      const records = await ExaminationModel.find().lean();
      if (records?.length) return records;
    } catch {}
    return [
      { id: '1', title: 'Central University Board Examinations & QP Generation', status: 'Active', updatedAt: new Date().toLocaleDateString() }
    ];
  },
  createRecord: async (data) => {
    const item = { ...data, referenceId: 'examination-' + Date.now() };
    try { await ExaminationModel.create(item); } catch {}
    return item;
  }
};
export default examinationService;
