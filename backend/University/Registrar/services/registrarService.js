import { RegistrarModel } from '../models/RegistrarModel.js';

export const registrarService = {
  getOverview: async () => {
    return {
      module: 'Registrar',
      title: 'Registrar Evaluation & Gazette Administration',
      status: 'Operational',
      lastUpdated: new Date().toISOString(),
    };
  },
  getRecords: async () => {
    try {
      const records = await RegistrarModel.find().lean();
      if (records?.length) return records;
    } catch {}
    return [
      { id: '1', title: 'Registrar Evaluation & Gazette Administration', status: 'Active', updatedAt: new Date().toLocaleDateString() }
    ];
  },
  createRecord: async (data) => {
    const item = { ...data, referenceId: 'registrar-' + Date.now() };
    try { await RegistrarModel.create(item); } catch {}
    return item;
  }
};
export default registrarService;
