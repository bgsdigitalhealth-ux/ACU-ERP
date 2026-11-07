import { hrService } from '../services/hrService.js';
import { validateRecruitmentInput } from '../validations/hrValidation.js';

export const getRequisitions = async (req, res) => {
  try {
    const requisitions = await hrService.getAllRequisitions();
    res.json({ success: true, count: requisitions.length, data: requisitions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createRequisition = async (req, res) => {
  try {
    const validation = validateRecruitmentInput(req.body);
    if (!validation.isValid) {
      return res.status(400).json({ success: false, errors: validation.errors });
    }
    const requisition = await hrService.createRequisition(req.body);
    res.status(201).json({ success: true, message: 'Requisition posted successfully', data: requisition });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

