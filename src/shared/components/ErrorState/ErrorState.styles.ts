import { StyleSheet } from 'react-native';
import { theme } from '@/shared/theme/theme';

export const errorStateStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: theme.spacingUnit * 3,
    padding: theme.spacing.sm,
  },
  message: {
    textAlign: 'center',
  },
});
