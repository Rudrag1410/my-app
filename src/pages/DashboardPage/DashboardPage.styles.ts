import { StyleSheet } from 'react-native';
import { theme } from '@/shared/theme/theme';

export const dashboardPageStyles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  content: {
    padding: theme.spacing.sm,
    gap: theme.spacingUnit * 3,
  },
  header: {
    marginBottom: theme.spacingUnit * 2,
  },
  balanceRow: {
    flexDirection: 'row',
    gap: theme.spacingUnit * 3,
  },
  balanceTile: {
    flex: 1,
    backgroundColor: theme.colors.bgCard,
    borderRadius: theme.radius.card,
    padding: theme.spacing.sm,
    gap: theme.spacingUnit,
  },
  borrowedBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.bgChip,
    borderRadius: theme.radius.card,
    padding: theme.spacing.sm,
  },
  sectionTitle: {
    marginTop: theme.spacingUnit * 2,
    marginBottom: theme.spacingUnit,
  },
});
