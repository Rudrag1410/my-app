import { z } from 'zod';
import { MAX_SIP_DURATION_MONTHS } from './service/tool-handlers/sipTerms.constants';

export const sipProjectionArgsSchema = z.object({
  goalName: z.string().min(1),
  durationMonths: z.number().int().positive().max(MAX_SIP_DURATION_MONTHS),
});

export const sipProjectionResultSchema = z.object({
  monthlyAmount: z.number(),
  projectedValue: z.number(),
});

export const borrowEligibilityArgsSchema = z.object({
  amountNeeded: z.number().positive(),
});

export const borrowEligibilityResultSchema = z.object({
  maxEligible: z.number(),
  ratePercentAnnual: z.number(),
  monthlyRepayEstimate: z.number(),
  lostGrowth10yr: z.number(),
});

export const growthChartResultSchema = z.object({
  goalName: z.string().min(1),
  points: z.array(z.object({ monthsElapsed: z.number(), value: z.number() })),
});

export const quickRepliesResultSchema = z.object({
  options: z.array(z.string().min(1)).min(1).max(4),
});
