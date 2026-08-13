import { usePortfolioStore } from '@/shared/store/portfolio.store';
import { z } from 'zod';

import { ToolName } from '../../chat.constants';
import type { ToolHandler } from '../../chat.types';
import {
  calculateLostGrowth10yr,
  calculateMonthlyRepayEstimate,
} from './borrowMath';
import {
  BORROW_RATE_PERCENT_ANNUAL,
  LAMF_HAIRCUT_RATIO,
} from './borrowTerms.constants';

const inputSchema = z.object({ amountNeeded: z.number().positive() });

interface Output {
  eligible: boolean;
  maxEligible: number;
  ratePercentAnnual: number;
  monthlyRepayEstimate: number;
  lostGrowth10yr: number;
}

export const calculateBorrowEligibilityHandler: ToolHandler<Output> = {
  name: ToolName.CalculateBorrowEligibility,
  execute: (rawInput) => {
    const input = inputSchema.parse(rawInput);
    const { growBalance } = usePortfolioStore.getState().portfolio;
    const maxEligible = Math.round(growBalance * LAMF_HAIRCUT_RATIO);

    return {
      eligible: input.amountNeeded <= maxEligible,
      maxEligible,
      ratePercentAnnual: BORROW_RATE_PERCENT_ANNUAL,
      monthlyRepayEstimate: calculateMonthlyRepayEstimate(input.amountNeeded),
      lostGrowth10yr: calculateLostGrowth10yr(input.amountNeeded),
    };
  },
};
