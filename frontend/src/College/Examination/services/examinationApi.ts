import { API_BASE_URL } from '../../../config/apiConfig';

export interface ExaminationOverview {
  module: string;
  title: string;
  status: string;
  lastUpdated: string;
}

export const examinationApi = {
  getOverview: async (): Promise<ExaminationOverview> => {
    try {
      const res = await fetch(`${API_BASE_URL}/college/examination/overview`);
      const json = await res.json();
      return json.data;
    } catch {
      return {
        module: 'Examination',
        title: 'College Examination Cell & IA Records',
        status: 'Operational',
        lastUpdated: new Date().toISOString(),
      };
    }
  },
};
export default examinationApi;
