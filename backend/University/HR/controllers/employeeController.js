import { hrService } from '../services/hrService.js';
import { validateEmployeeInput } from '../validations/hrValidation.js';

export const getEmployees = async (req, res) => {
  try {
    const employees = await hrService.getAllEmployees();
    res.json({ success: true, count: employees.length, data: employees });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createEmployee = async (req, res) => {
  try {
    const validation = validateEmployeeInput(req.body);
    if (!validation.isValid) {
      return res.status(400).json({ success: false, errors: validation.errors });
    }
    const employee = await hrService.createEmployee(req.body);
    res.status(201).json({ success: true, message: 'Employee added successfully', data: employee });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

