import type { GoalStatus } from './portfolio.constants';

export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  monthlyAmount: number;
  durationMonths: number;
  createdOn: string;
  projectedValue: number;
  status: GoalStatus;
}

export interface ExistingSip {
  id: string;
  goalName: string;
  monthlyAmount: number;
  startedOn: string;
  durationMonths: number;
}

export interface ActiveBorrow {
  id: string;
  amount: number;
  ratePercentAnnual: number;
  takenOn: string;
  outstanding: number;
}

export interface PortfolioSnapshot {
  saveBalance: number;
  growBalance: number;
  borrowedAgainstPortfolio: number;
  sips: ExistingSip[];
  borrows: ActiveBorrow[];
}

export interface UserProfile {
  id: string;
  name: string;
  age: number;
  city: string;
  monthlyIncome: number;
}
