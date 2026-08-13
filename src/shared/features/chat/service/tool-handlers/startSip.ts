import { sipMathService } from '@/shared/features/portfolio/service/sipMath';
import { usePortfolioStore } from '@/shared/store/portfolio.store';
import { z } from 'zod';
import { ToolName } from '../../chat.constants';
import type { ToolHandler } from '../../chat.types';
import { MAX_SIP_DURATION_MONTHS } from './sipTerms.constants';

const inputSchema = z.object({
  goalName: z.string().min(1),
  monthlyAmount: z.number().positive(),
  durationMonths: z.number().int().positive().max(MAX_SIP_DURATION_MONTHS),
});

interface Output {
  success: boolean;
  projectedValue: number;
}

const hasGoalNamed = (goalName: string): boolean => {
  const normalized = goalName.trim().toLowerCase();
  return usePortfolioStore
    .getState()
    .goals.some((goal) => goal.name.trim().toLowerCase() === normalized);
};

export const startSipHandler: ToolHandler<Output> = {
  name: ToolName.StartSip,
  execute: (rawInput) => {
    const input = inputSchema.parse(rawInput);
    if (hasGoalNamed(input.goalName)) {
      throw new Error(
        `A goal named "${input.goalName}" already exists. Ask the user to use a different name for this goal.`
      );
    }
    const projectedValue = sipMathService.projectValue(
      input.monthlyAmount,
      input.durationMonths,
      15
    );
    usePortfolioStore.getState().addGoalAndSip({ ...input, projectedValue });
    return { success: true, projectedValue };
  },
};
