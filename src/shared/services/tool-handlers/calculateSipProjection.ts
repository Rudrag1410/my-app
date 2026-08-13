import { z } from 'zod';
import { ToolName } from '../../features/chat/chat.constants';
import { sipMathService } from '../sipMath';
import type { ToolHandler } from '../../features/chat/chat.types';

const inputSchema = z
  .object({
    monthlyAmount: z.number().positive().optional(),
    targetAmount: z.number().positive().optional(),
    durationMonths: z.number().int().positive(),
    expectedAnnualReturnPercent: z.number().positive().default(15),
  })
  .refine(
    (input) =>
      input.monthlyAmount !== undefined || input.targetAmount !== undefined,
    {
      message: 'Provide either monthlyAmount or targetAmount.',
    }
  );

interface Output {
  monthlyAmount: number;
  projectedValue: number;
}

export const calculateSipProjectionHandler: ToolHandler<Output> = {
  name: ToolName.CalculateSipProjection,
  execute: (rawInput) => {
    const input = inputSchema.parse(rawInput);
    const monthlyAmount =
      input.monthlyAmount ??
      sipMathService.requiredMonthlyAmount(
        input.targetAmount as number,
        input.durationMonths,
        input.expectedAnnualReturnPercent
      );
    const projectedValue = sipMathService.projectValue(
      monthlyAmount,
      input.durationMonths,
      input.expectedAnnualReturnPercent
    );
    return { monthlyAmount, projectedValue };
  },
};
