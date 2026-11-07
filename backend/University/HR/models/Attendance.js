import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema(
  {
    attendanceId: { type: String, required: true, unique: true },
    date: { type: String, required: true },
    employeeId: { type: String, required: true },
    employeeName: { type: String, required: true },
    department: { type: String, required: true },
    status: { type: String, enum: ['Present', 'Absent', 'On Leave', 'Half Day', 'On Duty'], default: 'Present' },
    checkInTime: { type: String, default: '09:00 AM' },
    checkOutTime: { type: String, default: '05:00 PM' },
    biometricVerified: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Attendance = mongoose.models.Attendance || mongoose.model('Attendance', attendanceSchema);
export default Attendance;

