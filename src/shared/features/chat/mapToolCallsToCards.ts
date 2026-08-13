import { CardStatus, CardType, ToolName } from './chat.constants';
import type { ChatCard } from './chat.types';
import {
  borrowEligibilityArgsSchema,
  borrowEligibilityResultSchema,
  growthChartResultSchema,
  quickRepliesResultSchema,
  sipProjectionArgsSchema,
  sipProjectionResultSchema,
} from './mapToolCallsToCards.schema';
import type { ToolCallRecord } from './service/agentOrchestrator';

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
