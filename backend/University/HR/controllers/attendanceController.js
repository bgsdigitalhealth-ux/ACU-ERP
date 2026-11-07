import { hrService } from '../services/hrService.js';
import { validateAttendanceInput } from '../validations/hrValidation.js';

export const getAttendance = async (req, res) => {
  try {
    const { date = '06 Nov 2026' } = req.query;
    const records = await hrService.getAttendanceLogs(date);
    res.json({ success: true, count: records.length, data: records });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const markAttendance = async (req, res) => {
  try {
    const validation = validateAttendanceInput(req.body);
    if (!validation.isValid) {
      return res.status(400).json({ success: false, errors: validation.errors });
    }
    const log = await hrService.recordAttendance(req.body);
    res.status(201).json({ success: true, message: 'Attendance recorded successfully', data: log });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

