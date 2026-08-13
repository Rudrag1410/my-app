import { StyleSheet } from 'react-native';
import { theme } from '@/shared/theme/theme';

export const textStyles = StyleSheet.create({
  base: {
    fontFamily: theme.typography.fontSans,
    color: theme.colors.textPrimary,
  },
  display: {
    fontFamily: theme.typography.fontDisplay,
    fontSize: theme.typography.sizeBase * 1.75,
    lineHeight: theme.typography.lineHeightBase * 1.5,
    letterSpacing: theme.typography.trackingTight,
  },
  title: {
    fontFamily: theme.typography.fontSansBold,
    fontSize: theme.typography.sizeBase,
    lineHeight: theme.typography.lineHeightBase,
  },
  body: {
    fontFamily: theme.typography.fontSans,
    fontSize: theme.typography.sizeBase,
    lineHeight: theme.typography.lineHeightBase,
  },
  bodyMedium: {
    fontFamily: theme.typography.fontSansMedium,
    fontSize: theme.typography.sizeBase,
    lineHeight: theme.typography.lineHeightBase,
  },
  label: {
    fontFamily: theme.typography.fontSansSemibold,
    fontSize: theme.typography.sizeSm,
    lineHeight: theme.typography.lineHeightSm,
  },
  caption: {
    fontFamily: theme.typography.fontSans,
    fontSize: theme.typography.sizeXs,
    lineHeight: theme.typography.lineHeightXs,
    color: theme.colors.textSecondary,
  },
});
