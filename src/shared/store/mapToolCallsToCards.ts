import { z } from 'zod';
import { CardStatus } from '../constants/cardStatus.constants';
import { CardType } from '../constants/cardType.constants';
import { ToolName } from '../constants/toolName.constants';
import type { ChatCard } from '../types/card.types';
import type { ToolCallRecord } from '../services/agentOrchestrator';

const sipProjectionArgsSchema = z.object({
  goalName: z.string().min(1),
  durationMonths: z.number().int().positive(),
});

const sipProjectionResultSchema = z.object({
  monthlyAmount: z.number(),
  projectedValue: z.number(),
});

const borrowEligibilityArgsSchema = z.object({
  amountNeeded: z.number().positive(),
});

const borrowEligibilityResultSchema = z.object({
  maxEligible: z.number(),
  ratePercentAnnual: z.number(),
  monthlyRepayEstimate: z.number(),
  lostGrowth10yr: z.number(),
});

const growthChartResultSchema = z.object({
  goalName: z.string().min(1),
  points: z.array(z.object({ monthsElapsed: z.number(), value: z.number() })),
});

const quickRepliesResultSchema = z.object({
  options: z.array(z.string().min(1)).min(1).max(4),
});

const buildPlanCard = (toolCall: ToolCallRecord): ChatCard | null => {
  const args = sipProjectionArgsSchema.safeParse(toolCall.args);
  const result = sipProjectionResultSchema.safeParse(toolCall.result);
  if (!args.success || !result.success) {
    return null;
  }
  return {
    type: CardType.PlanCard,
    status: CardStatus.AwaitingConfirmation,
    goalName: args.data.goalName,
    monthlyAmount: result.data.monthlyAmount,
    durationMonths: args.data.durationMonths,
    projectedValue: result.data.projectedValue,
  };
};

const buildBorrowComparisonCard = (
  toolCall: ToolCallRecord
): ChatCard | null => {
  const args = borrowEligibilityArgsSchema.safeParse(toolCall.args);
  const result = borrowEligibilityResultSchema.safeParse(toolCall.result);
  if (!args.success || !result.success) {
    return null;
  }
  return {
    type: CardType.BorrowComparisonCard,
    status: CardStatus.AwaitingConfirmation,
    amountNeeded: args.data.amountNeeded,
    maxEligible: result.data.maxEligible,
    ratePercentAnnual: result.data.ratePercentAnnual,
    monthlyRepayEstimate: result.data.monthlyRepayEstimate,
    lostGrowth10yr: result.data.lostGrowth10yr,
  };
};

const buildGrowthChartCard = (toolCall: ToolCallRecord): ChatCard | null => {
  const result = growthChartResultSchema.safeParse(toolCall.result);
  if (!result.success) {
    return null;
  }
  return {
    type: CardType.GrowthChartCard,
    goalName: result.data.goalName,
    points: result.data.points,
  };
};

const buildQuickRepliesCard = (toolCall: ToolCallRecord): ChatCard | null => {
  const result = quickRepliesResultSchema.safeParse(toolCall.result);
  if (!result.success) {
    return null;
  }
  return {
    type: CardType.QuickRepliesCard,
    options: result.data.options,
  };
};

const cardBuilderByToolName: Partial<
  Record<ToolName, (toolCall: ToolCallRecord) => ChatCard | null>
> = {
  [ToolName.CalculateSipProjection]: buildPlanCard,
  [ToolName.CalculateBorrowEligibility]: buildBorrowComparisonCard,
  [ToolName.VisualizeSipGrowth]: buildGrowthChartCard,
  [ToolName.SuggestQuickReplies]: buildQuickRepliesCard,
};

export const mapToolCallsToCards = (
  toolCalls: ToolCallRecord[]
): ChatCard[] => {
  const cardByType = new Map<CardType, ChatCard>();
  for (const toolCall of toolCalls) {
    const card = cardBuilderByToolName[toolCall.name]?.(toolCall);
    if (card) {
      cardByType.set(card.type, card);
    }
  }
  return Array.from(cardByType.values());
};
