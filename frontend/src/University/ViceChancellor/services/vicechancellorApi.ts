import { API_BASE_URL } from '../../../config/apiConfig';

export interface ViceChancellorOverview {
  module: string;
  title: string;
  status: string;
  lastUpdated: string;
}

export const vicechancellorApi = {
  getOverview: async (): Promise<ViceChancellorOverview> => {
    try {
      const res = await fetch(`${API_BASE_URL}/university/vicechancellor/overview`);
      const json = await res.json();
      return json.data;
    } catch {
      return {
        module: 'ViceChancellor',
        title: 'Vice Chancellor Academic Oversight',
        status: 'Operational',
        lastUpdated: new Date().toISOString(),
      };
    }
  },
};
export default vicechancellorApi;
