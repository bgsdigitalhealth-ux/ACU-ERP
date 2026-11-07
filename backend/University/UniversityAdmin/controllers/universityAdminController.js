import { universityAdminService } from '../services/universityAdminService.js';

export const getDashboard = (req, res) => {
  res.json(universityAdminService.getDashboardData());
};

export const getModules = (req, res) => {
  const { search } = req.query;
  res.json(universityAdminService.getModulesList(search));
};
