import { StyleSheet } from 'react-native';
import { theme } from '@/shared/theme/theme';

export const chipStyles = StyleSheet.create({
  base: {
    backgroundColor: theme.colors.bgChip,
    borderRadius: theme.radius.pill,
    paddingVertical: theme.spacingUnit * 2,
    paddingHorizontal: theme.spacing.sm,
  },
  selected: {
    backgroundColor: theme.colors.brand,
  },
});
