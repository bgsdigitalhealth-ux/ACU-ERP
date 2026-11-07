import { AdmissionModel } from '../models/AdmissionModel.js';

export const admissionService = {
  getOverview: async () => {
    return {
      module: 'Admission',
      title: 'College Direct Admission & Document Verification',
      status: 'Operational',
      lastUpdated: new Date().toISOString(),
    };
  },
  getRecords: async () => {
    try {
      const records = await AdmissionModel.find().lean();
      if (records?.length) return records;
    } catch {}
    return [
      { id: '1', title: 'College Direct Admission & Document Verification', status: 'Active', updatedAt: new Date().toLocaleDateString() }
    ];
  },
  createRecord: async (data) => {
    const item = { ...data, referenceId: 'admission-' + Date.now() };
    try { await AdmissionModel.create(item); } catch {}
    return item;
  }
};
export default admissionService;
