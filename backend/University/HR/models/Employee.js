import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema(
  {
    employeeId: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: '' },
    department: { type: String, required: true },
    designation: { type: String, required: true },
    employmentType: { type: String, enum: ['Permanent', 'Contract', 'Adjunct', 'Visiting'], default: 'Permanent' },
    joiningDate: { type: String, default: () => new Date().toISOString().slice(0, 10) },
    status: { type: String, enum: ['Active', 'On Leave', 'Resigned', 'Retired'], default: 'Active' },
    salaryGross: { type: Number, default: 75000 },
  },
  { timestamps: true }
);

export const Employee = mongoose.models.Employee || mongoose.model('Employee', employeeSchema);
export default Employee;

