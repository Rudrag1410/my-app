import { usePortfolioStore } from '@/shared/store/portfolio.store';
import { z } from 'zod';

import { ToolName } from '../../chat.constants';
import type { ToolHandler } from '../../chat.types';
import { calculateMaxEligible } from './borrowMath';
import { BORROW_RATE_PERCENT_ANNUAL } from './borrowTerms.constants';

const inputSchema = z.object({ amount: z.number().positive() });

interface Output {
  success: boolean;
}

export const initiateBorrowHandler: ToolHandler<Output> = {
  name: ToolName.InitiateBorrow,
  execute: (rawInput) => {
    const input = inputSchema.parse(rawInput);
    const { growBalance } = usePortfolioStore.getState().portfolio;
    const maxEligible = calculateMaxEligible(growBalance);
    if (input.amount > maxEligible) {
      throw new Error(
        `Requested amount of ${input.amount} exceeds the eligible maximum of ${maxEligible}. Call calculate_borrow_eligibility again if needed and use an amount at or below the eligible maximum.`
      );
    }
    usePortfolioStore.getState().addBorrow({
      amount: input.amount,
      ratePercentAnnual: BORROW_RATE_PERCENT_ANNUAL,
    });
    return { success: true };
  },
};
