import { API_BASE_URL } from '../../../config/apiConfig';

export interface AcademicOverview {
  module: string;
  title: string;
  status: string;
  lastUpdated: string;
}

export const academicApi = {
  getOverview: async (): Promise<AcademicOverview> => {
    try {
      const res = await fetch(`${API_BASE_URL}/university/academic/overview`);
      const json = await res.json();
      return json.data;
    } catch {
      return {
        module: 'Academic',
        title: 'University Academic Council & Curriculum Board',
        status: 'Operational',
        lastUpdated: new Date().toISOString(),
      };
    }
  },
};
export default academicApi;
