import { academicService } from '../services/academicService.js';
import { validateAssessmentInput } from '../validations/academicValidation.js';

export const getAssessments = async (req, res) => {
  try {
    const data = await academicService.getAssessments();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createAssessment = async (req, res) => {
  try {
    const validation = validateAssessmentInput(req.body);
    if (!validation.isValid) {
      return res.status(400).json({ success: false, errors: validation.errors });
    }
    const created = await academicService.createAssessment(req.body);
    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAcademicCalendar = async (req, res) => {
  try {
    const data = await academicService.getCalendar();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const seedDatabase = async (req, res) => {
  try {
    const result = await academicService.seed();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
