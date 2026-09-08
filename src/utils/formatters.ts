/**
 * Indian Rupee (INR) and date formatting utilities
 */

export const formatINR = (amount: number): string => {
  return '₹' + amount.toLocaleString('en-IN');
};

export const formatWeight = (kg: number): string => {
  if (kg >= 1000) {
    return `${(kg / 1000).toFixed(1)} Tons (${kg} kg)`;
  }
  return `${kg} kg`;
};

export const formatDate = (dateStr: string): string => {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch {
    return dateStr;
  }
};
