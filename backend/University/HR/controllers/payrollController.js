import { hrService } from '../services/hrService.js';
import { validatePayrollInput } from '../validations/hrValidation.js';

export const getPayroll = async (req, res) => {
  try {
    const { monthYear = 'October 2026' } = req.query;
    const records = await hrService.getPayrollRecords(monthYear);
    res.json({ success: true, count: records.length, data: records });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const processPayroll = async (req, res) => {
  try {
    const validation = validatePayrollInput(req.body);
    if (!validation.isValid) {
      return res.status(400).json({ success: false, errors: validation.errors });
    }
    const record = await hrService.createPayrollRecord(req.body);
    res.status(201).json({ success: true, message: 'Payroll processed successfully', data: record });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

