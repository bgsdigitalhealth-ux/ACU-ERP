import { API_BASE_URL } from '../../../config/apiConfig';

export interface StudentSectionOverview {
  module: string;
  title: string;
  status: string;
  lastUpdated: string;
}

export const studentsectionApi = {
  getOverview: async (): Promise<StudentSectionOverview> => {
    try {
      const res = await fetch(`${API_BASE_URL}/college/studentsection/overview`);
      const json = await res.json();
      return json.data;
    } catch {
      return {
        module: 'StudentSection',
        title: 'College Student Affairs & Academic Records',
        status: 'Operational',
        lastUpdated: new Date().toISOString(),
      };
    }
  },
};
export default studentsectionApi;
