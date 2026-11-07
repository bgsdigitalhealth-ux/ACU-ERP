import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema(
  {
    rollNo: { type: String, required: true, unique: true },
    regNo: { type: String, required: true, unique: true },
    admissionNo: { type: String, required: true },
    fullName: { type: String, required: true },
    program: { type: String, default: 'Bachelor of Medicine & Bachelor of Surgery (MBBS)' },
    batch: { type: String, default: '2024MBBS01' },
    department: { type: String, default: 'Department of Physiology, AIMS' },
    currentSemester: { type: String, default: 'Phase 1' },
    attendanceOverall: { type: Number, default: 94.3 },
    email: { type: String, default: 'student@acu.edu.in' },
  },
  { timestamps: true }
);

export const Student = mongoose.models.Student || mongoose.model('Student', StudentSchema);
export default Student;
