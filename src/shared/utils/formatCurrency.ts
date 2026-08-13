const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

export const formatCurrency = (amount: number): string => {
  return currencyFormatter.format(amount);
};

const CRORE = 10000000;
const LAKH = 100000;
const THOUSAND = 1000;

const trimTrailingZero = (value: string): string => {
  return value.endsWith('.0') ? value.slice(0, -2) : value;
};

export const formatCompactCurrency = (amount: number): string => {
  const absAmount = Math.abs(amount);
  if (absAmount >= CRORE) {
    return `₹${trimTrailingZero((amount / CRORE).toFixed(1))}Cr`;
  }
  if (absAmount >= LAKH) {
    return `₹${trimTrailingZero((amount / LAKH).toFixed(1))}L`;
  }
  if (absAmount >= THOUSAND) {
    return `₹${trimTrailingZero((amount / THOUSAND).toFixed(1))}K`;
  }
  return `₹${amount}`;
};
