import { StyleSheet } from 'react-native';
import { theme } from '@/shared/theme/theme';

export const buttonStyles = StyleSheet.create({
  base: {
    borderRadius: theme.radius.button,
    paddingVertical: theme.spacingUnit * 3,
    paddingHorizontal: theme.spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  primary: {
    backgroundColor: theme.colors.brand,
  },
  secondary: {
    backgroundColor: theme.colors.bgElevated,
    borderWidth: 1,
    borderColor: theme.colors.borderDefault,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.85,
  },
});
