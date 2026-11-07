import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
  {
    transactionId: {
      type: String,
      required: true,
      unique: true,
      default: () => 'TXN-' + Date.now(),
    },
    date: {
      type: String,
      required: true,
      default: () =>
        new Date().toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }),
    },
    particulars: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['Income', 'Expense'],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      default: 'General',
    },
    referenceNo: {
      type: String,
      default: '',
    },
    academicYear: {
      type: String,
      default: '2026 – 2027',
    },
  },
  { timestamps: true }
);

const notificationSchema = new mongoose.Schema({
  id: { type: String, required: true },
  type: { type: String, enum: ['success', 'warning', 'info'], default: 'info' },
  message: { type: String, required: true },
  timeAgo: { type: String, default: 'Just now' },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const monthlyStatsSchema = new mongoose.Schema({
  month: { type: String, required: true },
  income: { type: Number, required: true },
  expense: { type: Number, required: true },
});

const financeOverviewSchema = new mongoose.Schema(
  {
    academicYear: {
      type: String,
      required: true,
      unique: true,
      default: '2026 – 2027',
    },
    totalFeeCollected: {
      type: Number,
      default: 43250000,
    },
    feeCollectedGrowth: {
      type: String,
      default: '+12.5% vs last year',
    },
    pendingFees: {
      type: Number,
      default: 3275000,
    },
    pendingFeesGrowth: {
      type: String,
      default: '-6.8% vs last year',
    },
    totalExpenses: {
      type: Number,
      default: 31020000,
    },
    expensesGrowth: {
      type: String,
      default: '+8.1% vs last year',
    },
    budgetUtilization: {
      type: Number,
      default: 78,
    },
    collectionRate: {
      type: Number,
      default: 93,
    },
    monthlyComparison: {
      type: [monthlyStatsSchema],
      default: [
        { month: 'Apr', income: 35, expense: 24 },
        { month: 'May', income: 32, expense: 22 },
        { month: 'Jun', income: 28, expense: 20 },
        { month: 'Jul', income: 40, expense: 26 },
        { month: 'Aug', income: 38, expense: 25 },
        { month: 'Sep', income: 44, expense: 30 },
        { month: 'Oct', income: 52, expense: 32 },
        { month: 'Nov', income: 58, expense: 34 },
        { month: 'Dec', income: 60, expense: 38 },
        { month: 'Jan', income: 64, expense: 40 },
        { month: 'Feb', income: 68, expense: 45 },
        { month: 'Mar', income: 72, expense: 48 },
      ],
    },
  },
  { timestamps: true }
);

export const CollegeFinanceTransaction =
  mongoose.models.CollegeFinanceTransaction ||
  mongoose.model('CollegeFinanceTransaction', transactionSchema);

export const CollegeFinanceNotification =
  mongoose.models.CollegeFinanceNotification ||
  mongoose.model('CollegeFinanceNotification', notificationSchema);

export const CollegeFinanceOverview =
  mongoose.models.CollegeFinanceOverview ||
  mongoose.model('CollegeFinanceOverview', financeOverviewSchema);

