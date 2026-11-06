import mongoose from 'mongoose';

// Finance Summary Schema for College ERP
const financeSummarySchema = new mongoose.Schema(
  {
    academicYear: {
      type: String,
      required: true,
      default: '2026 – 2027',
    },
    collegeName: {
      type: String,
      default: 'City College of Engineering',
    },
    totalFeeCollected: {
      type: Number,
      required: true,
      default: 43250000,
    },
    feeCollectedGrowth: {
      type: String,
      default: '+12.5% vs last year',
    },
    pendingFees: {
      type: Number,
      required: true,
      default: 3275000,
    },
    pendingFeesGrowth: {
      type: String,
      default: '-6.8% vs last year',
    },
    totalExpenses: {
      type: Number,
      required: true,
      default: 31020000,
    },
    totalExpensesGrowth: {
      type: String,
      default: '+8.1% vs last year',
    },
    budgetUtilization: {
      type: Number,
      required: true,
      default: 78,
    },
    collectionRate: {
      type: Number,
      default: 93,
    },
  },
  { timestamps: true }
);

// Transaction Schema
const financeTransactionSchema = new mongoose.Schema(
  {
    transactionId: {
      type: String,
      unique: true,
      required: true,
    },
    date: {
      type: String,
      required: true,
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
    academicYear: {
      type: String,
      default: '2026 – 2027',
    },
  },
  { timestamps: true }
);

export const FinanceSummary = mongoose.model('FinanceSummary', financeSummarySchema);
export const FinanceTransaction = mongoose.model('FinanceTransaction', financeTransactionSchema);
