import { formatCurrency } from '@/shared/utils/formatCurrency';

export const buildAdjustmentNote = (
  label: string,
  adjustedAmount: number,
  hasBeenAdjusted: boolean
): string | undefined => {
  if (!hasBeenAdjusted) {
    return undefined;
  }
  return `They adjusted the ${label} to ${formatCurrency(adjustedAmount)} using the slider before confirming — use this amount, not the original.`;
};
