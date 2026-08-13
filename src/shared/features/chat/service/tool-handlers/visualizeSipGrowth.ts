import {
  sipMathService,
  type GrowthSeriesPoint,
} from '@/shared/features/portfolio/service/sipMath';
import { z } from 'zod';
import { ToolName } from '../../chat.constants';
import type { ToolHandler } from '../../chat.types';
import { MAX_SIP_DURATION_MONTHS } from './sipTerms.constants';

const inputSchema = z.object({
  goalName: z.string().min(1),
  monthlyAmount: z.number().positive(),
  durationMonths: z.number().int().positive().max(MAX_SIP_DURATION_MONTHS),
  expectedAnnualReturnPercent: z.number().positive().default(15),
});

interface Output {
  goalName: string;
  points: GrowthSeriesPoint[];
}

export const visualizeSipGrowthHandler: ToolHandler<Output> = {
  name: ToolName.VisualizeSipGrowth,
  execute: (rawInput) => {
    const input = inputSchema.parse(rawInput);
    const points = sipMathService.projectGrowthSeries(
      input.monthlyAmount,
      input.durationMonths,
      input.expectedAnnualReturnPercent
    );
    return { goalName: input.goalName, points };
  },
};
