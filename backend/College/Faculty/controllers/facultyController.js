import { facultyService } from '../services/facultyService.js';

export const getOverview = async (req, res) => {
  try {
    const data = await facultyService.getOverview();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getRecords = async (req, res) => {
  try {
    const data = await facultyService.getRecords();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createRecord = async (req, res) => {
  try {
    const data = await facultyService.createRecord(req.body);
    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
