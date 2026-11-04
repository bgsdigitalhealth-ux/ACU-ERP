import mongoose from 'mongoose';

const AcademicCalendarSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    type: { type: String, required: true },
    status: { type: String, enum: ['present', 'upcoming'], required: true },
    venue: { type: String, default: 'AIMS Medical Campus' },
    targetAudience: { type: String, default: 'Phase 1 MBBS Faculty & Students' },
    badgeColor: { type: String, default: 'bg-purple-100 text-purple-800' },
  },
  { timestamps: true }
);

export const AcademicCalendar = mongoose.model('AcademicCalendar', AcademicCalendarSchema);

