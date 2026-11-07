import { API_BASE_URL } from '../../../config/apiConfig';

export interface LibraryOverview {
  module: string;
  title: string;
  status: string;
  lastUpdated: string;
}

export const libraryApi = {
  getOverview: async (): Promise<LibraryOverview> => {
    try {
      const res = await fetch(`${API_BASE_URL}/college/library/overview`);
      const json = await res.json();
      return json.data;
    } catch {
      return {
        module: 'Library',
        title: 'College Central Library & Knowledge Resource',
        status: 'Operational',
        lastUpdated: new Date().toISOString(),
      };
    }
  },
};
export default libraryApi;
