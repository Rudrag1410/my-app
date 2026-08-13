import {
  colors,
  radius,
  spacing,
  spacingUnit,
  typography,
  easing,
} from './tokens';

export const theme = {
  colors,
  radius,
  spacing,
  spacingUnit,
  typography,
  easing,
} as const;

export type Theme = typeof theme;
