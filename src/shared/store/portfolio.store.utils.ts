import { GoalStatus } from '../features/portfolio/portfolio.constants';
import type {
  Goal,
  ActiveBorrow,
  ExistingSip,
} from '../features/portfolio/portfolio.types';

export interface AddGoalAndSipInput {
  goalName: string;
  monthlyAmount: number;
  durationMonths: number;
  projectedValue: number;
}

export interface AddBorrowInput {
  amount: number;
  ratePercentAnnual: number;
}

export const createGoal = (input: AddGoalAndSipInput): Goal => {
  return {
    id: `goal_${Date.now()}`,
    name: input.goalName,
    targetAmount: input.projectedValue,
    monthlyAmount: input.monthlyAmount,
    durationMonths: input.durationMonths,
    createdOn: new Date().toISOString(),
    projectedValue: input.projectedValue,
    status: GoalStatus.Active,
  };
};

export const createSip = (input: AddGoalAndSipInput): ExistingSip => {
  return {
    id: `sip_${Date.now()}`,
    goalName: input.goalName,
    monthlyAmount: input.monthlyAmount,
    startedOn: new Date().toISOString(),
    durationMonths: input.durationMonths,
  };
};

export const createBorrow = (input: AddBorrowInput): ActiveBorrow => {
  return {
    id: `borrow_${Date.now()}`,
    amount: input.amount,
    ratePercentAnnual: input.ratePercentAnnual,
    takenOn: new Date().toISOString(),
    outstanding: input.amount,
  };
};
