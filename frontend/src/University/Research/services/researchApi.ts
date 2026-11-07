import { API_BASE_URL } from '../../../config/apiConfig';

export interface ResearchOverview {
  module: string;
  title: string;
  status: string;
  lastUpdated: string;
}

export const researchApi = {
  getOverview: async (): Promise<ResearchOverview> => {
    try {
      const res = await fetch(`${API_BASE_URL}/university/research/overview`);
      const json = await res.json();
      return json.data;
    } catch {
      return {
        module: 'Research',
        title: 'University Directorate of Research & Patents',
        status: 'Operational',
        lastUpdated: new Date().toISOString(),
      };
    }
  },
};
export default researchApi;
