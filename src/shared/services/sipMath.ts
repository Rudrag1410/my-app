const projectValue = (
  monthlyAmount: number,
  durationMonths: number,
  annualReturnPercent: number
): number => {
  const monthlyRate = annualReturnPercent / 100 / 12;
  if (monthlyRate === 0) {
    return monthlyAmount * durationMonths;
  }
  const futureValue =
    monthlyAmount *
    ((Math.pow(1 + monthlyRate, durationMonths) - 1) / monthlyRate) *
    (1 + monthlyRate);
  return Math.round(futureValue);
};

const requiredMonthlyAmount = (
  targetAmount: number,
  durationMonths: number,
  annualReturnPercent: number
): number => {
  const monthlyRate = annualReturnPercent / 100 / 12;
  if (monthlyRate === 0) {
    return Math.ceil(targetAmount / durationMonths);
  }
  const growthFactor =
    ((Math.pow(1 + monthlyRate, durationMonths) - 1) / monthlyRate) *
    (1 + monthlyRate);
  return Math.ceil(targetAmount / growthFactor);
};

const GROWTH_SERIES_INTERVAL_MONTHS = 12;

export interface GrowthSeriesPoint {
  monthsElapsed: number;
  value: number;
}

const projectGrowthSeries = (
  monthlyAmount: number,
  durationMonths: number,
  annualReturnPercent: number
): GrowthSeriesPoint[] => {
  const points: GrowthSeriesPoint[] = [{ monthsElapsed: 0, value: 0 }];
  for (
    let months = GROWTH_SERIES_INTERVAL_MONTHS;
    months < durationMonths;
    months += GROWTH_SERIES_INTERVAL_MONTHS
  ) {
    points.push({
      monthsElapsed: months,
      value: projectValue(monthlyAmount, months, annualReturnPercent),
    });
  }
  points.push({
    monthsElapsed: durationMonths,
    value: projectValue(monthlyAmount, durationMonths, annualReturnPercent),
  });
  return points;
};

export const sipMathService = {
  projectValue,
  requiredMonthlyAmount,
  projectGrowthSeries,
};
