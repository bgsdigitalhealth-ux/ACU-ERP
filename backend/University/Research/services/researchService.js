import { ResearchModel } from '../models/ResearchModel.js';

export const researchService = {
  getOverview: async () => {
    return {
      module: 'Research',
      title: 'Doctoral Research Grants & Sponsored Projects',
      status: 'Operational',
      lastUpdated: new Date().toISOString(),
    };
  },
  getRecords: async () => {
    try {
      const records = await ResearchModel.find().lean();
      if (records?.length) return records;
    } catch {}
    return [
      { id: '1', title: 'Doctoral Research Grants & Sponsored Projects', status: 'Active', updatedAt: new Date().toLocaleDateString() }
    ];
  },
  createRecord: async (data) => {
    const item = { ...data, referenceId: 'research-' + Date.now() };
    try { await ResearchModel.create(item); } catch {}
    return item;
  }
};
export default researchService;
