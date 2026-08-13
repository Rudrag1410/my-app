export interface SliderRange {
  min: number;
  max: number;
  step: number;
}

const RANGE_STEP_COUNT = 10;

export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

export const snapToStep = (
  value: number,
  step: number,
  min: number
): number => {
  return min + Math.round((value - min) / step) * step;
};

export const computeSliderRangeAround = (baseValue: number): SliderRange => {
  const step = Math.max(50, Math.round((baseValue * 0.05) / 50) * 50);
  const min = Math.max(step, baseValue - step * RANGE_STEP_COUNT);
  const max = baseValue + step * RANGE_STEP_COUNT;
  return { min, max, step };
};

export const computeSliderRangeUpTo = (
  baseValue: number,
  maxValue: number
): SliderRange => {
  const step = Math.max(50, Math.round((maxValue * 0.05) / 50) * 50);
  const min = Math.max(step, Math.round((maxValue * 0.1) / step) * step);
  return { min, max: Math.max(min + step, maxValue), step };
};
