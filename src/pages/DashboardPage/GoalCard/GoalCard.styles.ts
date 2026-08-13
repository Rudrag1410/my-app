import { StyleSheet } from 'react-native';
import { theme } from '@/shared/theme/theme';

export const goalCardStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    backgroundColor: theme.colors.bgCard,
    borderRadius: theme.radius.card,
    padding: theme.spacing.sm,
    marginBottom: theme.spacingUnit * 3,
  },
  details: {
    flex: 1,
    gap: theme.spacingUnit,
  },
  skeleton: {
    backgroundColor: theme.colors.bgElevated,
  },
  skeletonRing: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  skeletonLine: {
    height: theme.typography.lineHeightSm,
    borderRadius: theme.radius.button,
  },
  skeletonLineShort: {
    width: '50%',
  },
});
