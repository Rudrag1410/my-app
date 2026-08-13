import { StyleSheet } from 'react-native';
import { theme } from '@/shared/theme/theme';

export const emptyGoalsStateStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: theme.spacingUnit * 3,
    paddingVertical: theme.spacing.md * 2,
    paddingHorizontal: theme.spacing.sm,
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
  },
  button: {
    marginTop: theme.spacingUnit * 2,
    minWidth: 180,
  },
});
