import type { CardType } from '../constants/cardType.constants';
import type { CardStatus } from '../constants/cardStatus.constants';

interface BaseCard {
  status: CardStatus;
}

export interface PlanCard extends BaseCard {
  type: CardType.PlanCard;
  goalName: string;
  monthlyAmount: number;
  durationMonths: number;
  projectedValue: number;
}

export interface BorrowComparisonCard extends BaseCard {
  type: CardType.BorrowComparisonCard;
  amountNeeded: number;
  maxEligible: number;
  lostGrowth10yr: number;
  ratePercentAnnual: number;
  monthlyRepayEstimate: number;
}

export interface GrowthChartPoint {
  monthsElapsed: number;
  value: number;
}

export interface GrowthChartCard {
  type: CardType.GrowthChartCard;
  goalName: string;
  points: GrowthChartPoint[];
}

export interface QuickRepliesCard {
  type: CardType.QuickRepliesCard;
  options: string[];
}

export type ChatCard =
  PlanCard | BorrowComparisonCard | GrowthChartCard | QuickRepliesCard;
