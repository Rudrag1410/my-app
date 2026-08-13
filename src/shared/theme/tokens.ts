export const colors = {
  brand: '#9FE870',
  brandText: '#0C1F00',
  brandSecondary: '#296600',
  brandDecorative: '#3E9900',

  bgPage: '#0C0C0C',
  bgCard: '#1A1A1A',
  bgChip: '#242424',
  bgElevated: '#2A2A2A',

  textPrimary: '#FFFFFF',
  textSecondary: '#808080',
  textTertiary: '#4D4D4D',
  textOnAccent: '#0C1F00',

  error: '#E53935',

  borderDefault: '#1F1F1F',
  borderAccent: '#9FE870',
} as const;

export const radius = {
  button: 8,
  card: 12,
  pill: 99,
} as const;

export const spacingUnit = 4;
export const spacing = {
  xs: 4,
  sm: 16,
  md: 24,
} as const;

export const typography = {
  fontSans: 'Mulish_400Regular',
  fontSansMedium: 'Mulish_500Medium',
  fontSansSemibold: 'Mulish_600SemiBold',
  fontSansBold: 'Mulish_700Bold',
  fontDisplay: 'PlayfairDisplay_700Bold',

  sizeXs: 12,
  sizeSm: 14,
  sizeBase: 16,

  lineHeightXs: 16,
  lineHeightSm: 20,
  lineHeightBase: 24,

  trackingTight: -0.4,
  leadingSnug: 1.375,
  leadingNormal: 1.5,
} as const;

export const easing = {
  in: [0.4, 0, 1, 1] as const,
  out: [0, 0, 0.2, 1] as const,
  inOut: [0.4, 0, 0.2, 1] as const,
};
