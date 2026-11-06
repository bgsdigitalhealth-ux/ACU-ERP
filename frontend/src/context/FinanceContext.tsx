import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  FinanceDashboardResponse,
  initialFinanceData,
  fetchFinanceDashboard,
  postFinanceTransaction,
  FinanceTransactionItem,
} from '../services/financeApi';

interface FinanceContextType {
  data: FinanceDashboardResponse;
  academicYear: string;
  setAcademicYear: (year: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeNav: string;
  setActiveNav: (nav: string) => void;
  isLoading: boolean;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  quickAction: string | null;
  openQuickAction: (action: string) => void;
  closeQuickAction: () => void;
  recordTransaction: (txn: {
    particulars: string;
    type: 'Income' | 'Expense';
    amount: number;
    category?: string;
  }) => Promise<void>;
  refresh: () => void;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export const FinanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [academicYear, setAcademicYearState] = useState<string>('2026 – 2027');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeNav, setActiveNav] = useState<string>('dashboard');
  const [data, setData] = useState<FinanceDashboardResponse>(initialFinanceData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [quickAction, setQuickAction] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  }, []);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetchFinanceDashboard(academicYear, searchQuery);
      if (res && res.summary) {
        setData(res);
      }
    } catch (e) {
      console.warn('[Finance Context] Load failed, using initial state:', e);
    } finally {
      setIsLoading(false);
    }
  }, [academicYear, searchQuery]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const setAcademicYear = (year: string) => {
    setAcademicYearState(year);
    showToast(`Switched Academic Year to ${year}`);
  };

  const openQuickAction = (action: string) => {
    setQuickAction(action);
  };

  const closeQuickAction = () => {
    setQuickAction(null);
  };

  const recordTransaction = async (txn: {
    particulars: string;
    type: 'Income' | 'Expense';
    amount: number;
    category?: string;
  }) => {
    setIsLoading(true);
    try {
      const res = await postFinanceTransaction({
        ...txn,
        academicYear,
      });

      const newTxn: FinanceTransactionItem = res.transaction || {
        id: `TXN-${Date.now().toString().slice(-4)}`,
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        ...txn,
        academicYear,
      };

      // Dynamically update context state
      setData((prev) => {
        const updatedCollected =
          txn.type === 'Income' ? prev.summary.totalFeeCollected + txn.amount : prev.summary.totalFeeCollected;
        const updatedExpenses =
          txn.type === 'Expense' ? prev.summary.totalExpenses + txn.amount : prev.summary.totalExpenses;
        const updatedPending =
          txn.type === 'Income' && prev.summary.pendingFees > txn.amount * 0.1
            ? prev.summary.pendingFees - Math.round(txn.amount * 0.1)
            : prev.summary.pendingFees;
        const total = updatedCollected + updatedPending;
        const newCollectionRate = Math.round((updatedCollected / total) * 100);

        return {
          ...prev,
          summary: {
            ...prev.summary,
            totalFeeCollected: updatedCollected,
            totalExpenses: updatedExpenses,
            pendingFees: updatedPending,
            collectionRate: newCollectionRate,
          },
          collectionOverview: {
            collected: updatedCollected,
            pending: updatedPending,
            collectionRate: newCollectionRate,
          },
          recentTransactions: [newTxn, ...prev.recentTransactions],
          notifications: [
            {
              id: `notif-${Date.now()}`,
              title: `${txn.type} of ₹${txn.amount.toLocaleString('en-IN')} recorded: ${txn.particulars}`,
              time: 'Just now',
              type: txn.type === 'Income' ? 'success' : 'warning',
            },
            ...prev.notifications,
          ],
        };
      });

      showToast(`Successfully recorded ${txn.type}: ₹${txn.amount.toLocaleString('en-IN')}`);
      closeQuickAction();
    } catch (e: any) {
      showToast(`Error recording transaction: ${e.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FinanceContext.Provider
      value={{
        data,
        academicYear,
        setAcademicYear,
        searchQuery,
        setSearchQuery,
        activeNav,
        setActiveNav,
        isLoading,
        toastMessage,
        showToast,
        quickAction,
        openQuickAction,
        closeQuickAction,
        recordTransaction,
        refresh: loadData,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
};
