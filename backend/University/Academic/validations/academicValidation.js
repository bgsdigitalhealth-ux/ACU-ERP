export const validateAssessmentInput = (data) => {
  const errors = [];
  if (!data?.title?.trim()) errors.push('Assessment title is required');
  if (!data?.dueDate?.trim()) errors.push('Due date is required');
  return { isValid: errors.length === 0, errors };
};
