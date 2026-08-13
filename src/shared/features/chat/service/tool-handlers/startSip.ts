import { sipMathService } from '@/shared/features/portfolio/service/sipMath';
import { usePortfolioStore } from '@/shared/store/portfolio.store';
import { z } from 'zod';
import { ToolName } from '../../chat.constants';
import type { ToolHandler } from '../../chat.types';

const inputSchema = z.object({
  goalName: z.string().min(1),
  monthlyAmount: z.number().positive(),
  durationMonths: z.number().int().positive(),
});

interface Output {
  success: boolean;
  projectedValue: number;
}

export const startSipHandler: ToolHandler<Output> = {
  name: ToolName.StartSip,
  execute: (rawInput) => {
    const input = inputSchema.parse(rawInput);
    const projectedValue = sipMathService.projectValue(
      input.monthlyAmount,
      input.durationMonths,
      15
    );
    usePortfolioStore.getState().addGoalAndSip({ ...input, projectedValue });
    return { success: true, projectedValue };
  },
};
