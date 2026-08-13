import { StyleSheet } from 'react-native';
import { theme } from '@/shared/theme/theme';

export const borrowComparisonCardStyles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.bgCard,
    borderRadius: theme.radius.card,
    borderWidth: 1,
    borderColor: theme.colors.borderAccent,
    padding: theme.spacing.sm,
    marginBottom: theme.spacingUnit * 2,
    width: '90%',
    alignSelf: 'flex-start',
  },
  amountNeeded: {
    marginBottom: theme.spacingUnit * 3,
  },
  eligibleHint: {
    marginTop: -theme.spacingUnit,
    marginBottom: theme.spacingUnit * 3,
  },
  columns: {
    flexDirection: 'row',
    gap: theme.spacingUnit * 3,
  },
  column: {
    flex: 1,
    flexBasis: 0,
    backgroundColor: theme.colors.bgChip,
    borderRadius: theme.radius.card,
    padding: theme.spacing.sm,
    gap: theme.spacingUnit,
  },
  columnRecommended: {
    backgroundColor: theme.colors.bgElevated,
    borderWidth: 1,
    borderColor: theme.colors.borderAccent,
  },
});
