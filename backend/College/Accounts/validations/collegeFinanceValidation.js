export const validateTransactionInput = (data) => {
  const { particulars, type, amount } = data || {};
  const errors = [];
  if (!particulars || typeof particulars !== 'string' || !particulars.trim()) {
    errors.push('Particulars description is required.');
  }
  if (!type || !['Income', 'Expense'].includes(type)) {
    errors.push('Type must be either "Income" or "Expense".');
  }
  if (amount === undefined || isNaN(Number(amount)) || Number(amount) <= 0) {
    errors.push('Amount must be a positive number.');
  }
  return { isValid: errors.length === 0, errors };
};

export const validateFeeCollectionInput = (data) => {
  const { rollNo, amount } = data || {};
  const errors = [];
  if (!rollNo || !rollNo.trim()) errors.push('Student Roll Number is required.');
  if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) errors.push('Valid fee amount is required.');
  return { isValid: errors.length === 0, errors };
};

export const validateExpenseInput = (data) => {
  const { title, amount } = data || {};
  const errors = [];
  if (!title || !title.trim()) errors.push('Expense title is required.');
  if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) errors.push('Valid expense amount is required.');
  return { isValid: errors.length === 0, errors };
};

