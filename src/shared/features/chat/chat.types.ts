import type {
  CardType,
  CardStatus,
  ChatRole,
  ToolName,
} from './chat.constants';

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

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: number;
  cards: ChatCard[];
  isError: boolean;
}

export interface ToolHandler<TOutput> {
  readonly name: ToolName;
  execute: (input: unknown) => TOutput;
}

export interface ToolDefinition {
  name: ToolName;
  description: string;
  parameters: Record<string, unknown>;
}
