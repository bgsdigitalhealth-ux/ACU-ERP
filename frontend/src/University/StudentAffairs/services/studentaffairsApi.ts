import { API_BASE_URL } from '../../../config/apiConfig';

export interface StudentAffairsOverview {
  module: string;
  title: string;
  status: string;
  lastUpdated: string;
}

export const studentaffairsApi = {
  getOverview: async (): Promise<StudentAffairsOverview> => {
    try {
      const res = await fetch(`${API_BASE_URL}/university/studentaffairs/overview`);
      const json = await res.json();
      return json.data;
    } catch {
      return {
        module: 'StudentAffairs',
        title: 'Dean of Student Welfare & Redressal',
        status: 'Operational',
        lastUpdated: new Date().toISOString(),
      };
    }
  },
};
export default studentaffairsApi;
