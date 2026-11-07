import { studentaffairsService } from '../services/studentaffairsService.js';

export const getOverview = async (req, res) => {
  try {
    const data = await studentaffairsService.getOverview();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getRecords = async (req, res) => {
  try {
    const data = await studentaffairsService.getRecords();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createRecord = async (req, res) => {
  try {
    const data = await studentaffairsService.createRecord(req.body);
    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
