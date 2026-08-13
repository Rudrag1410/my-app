import { StyleSheet } from 'react-native';
import { theme } from '@/shared/theme/theme';

export const typingIndicatorStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacingUnit,
    backgroundColor: theme.colors.bgCard,
    borderRadius: theme.radius.card,
    paddingVertical: theme.spacingUnit * 3,
    paddingHorizontal: theme.spacing.sm,
    alignSelf: 'flex-start',
    marginBottom: theme.spacingUnit * 2,
  },
  dot: {
    width: theme.spacingUnit * 2,
    height: theme.spacingUnit * 2,
    borderRadius: theme.radius.pill,
    backgroundColor: theme.colors.textSecondary,
  },
});
