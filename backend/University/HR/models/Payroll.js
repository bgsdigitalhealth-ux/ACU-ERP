import mongoose from 'mongoose';

const payrollSchema = new mongoose.Schema(
  {
    payrollId: { type: String, required: true, unique: true },
    monthYear: { type: String, required: true },
    employeeId: { type: String, required: true },
    employeeName: { type: String, required: true },
    department: { type: String, required: true },
    basicPay: { type: Number, required: true },
    daHra: { type: Number, default: 0 },
    deductions: { type: Number, default: 0 },
    netPay: { type: Number, required: true },
    paymentStatus: { type: String, enum: ['Paid', 'Pending', 'Processing', 'Hold'], default: 'Pending' },
    disbursementDate: { type: String, default: '' },
  },
  { timestamps: true }
);

export const Payroll = mongoose.models.Payroll || mongoose.model('Payroll', payrollSchema);
export default Payroll;

