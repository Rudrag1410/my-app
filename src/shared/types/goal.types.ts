import type { GoalStatus } from '../constants/goalStatus.constants';

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
