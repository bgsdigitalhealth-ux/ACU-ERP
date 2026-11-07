export const validateEmployeeInput = (data) => {
  const errors = [];
  if (!data?.fullName?.trim()) errors.push('Employee full name is required');
  if (!data?.email?.trim()) errors.push('Valid institutional email is required');
  if (!data?.department?.trim()) errors.push('Department designation is required');
  return { isValid: errors.length === 0, errors };
};

export const validateRecruitmentInput = (data) => {
  const errors = [];
  if (!data?.title?.trim()) errors.push('Requisition title is required');
  if (!data?.department?.trim()) errors.push('Department is required');
  if (!data?.applicationDeadline) errors.push('Application deadline is required');
  return { isValid: errors.length === 0, errors };
};

export const validatePayrollInput = (data) => {
  const errors = [];
  if (!data?.employeeId) errors.push('Employee ID is required');
  if (data?.basicPay === undefined || Number(data.basicPay) <= 0) errors.push('Basic pay must be greater than 0');
  return { isValid: errors.length === 0, errors };
};

export const validateAttendanceInput = (data) => {
  const errors = [];
  if (!data?.employeeId) errors.push('Employee ID is required');
  if (!data?.date) errors.push('Date is required');
  return { isValid: errors.length === 0, errors };
};

