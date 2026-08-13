import { BORROW_RATE_PERCENT_ANNUAL } from './borrowTerms.constants';

const OPPORTUNITY_COST_ANNUAL_RETURN = 0.15;
const OPPORTUNITY_COST_YEARS = 10;

export const calculateMonthlyRepayEstimate = (amount: number): number => {
  return Math.round((amount * (BORROW_RATE_PERCENT_ANNUAL / 100)) / 12);
};

export const calculateLostGrowth10yr = (amount: number): number => {
  return Math.round(
    amount *
      Math.pow(1 + OPPORTUNITY_COST_ANNUAL_RETURN, OPPORTUNITY_COST_YEARS) -
      amount
  );
};
