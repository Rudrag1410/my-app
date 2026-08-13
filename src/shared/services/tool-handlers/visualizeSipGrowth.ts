import { z } from 'zod';
import { ToolName } from '../../constants/toolName.constants';
import { sipMathService, type GrowthSeriesPoint } from '../sipMath';
import type { ToolHandler } from '../../types/tool.types';

const inputSchema = z.object({
  goalName: z.string().min(1),
  monthlyAmount: z.number().positive(),
  durationMonths: z.number().int().positive(),
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
