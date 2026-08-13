import { StyleSheet } from 'react-native';
import { theme } from '@/shared/theme/theme';

export const growthChartCardStyles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.bgCard,
    borderRadius: theme.radius.card,
    borderWidth: 1,
    borderColor: theme.colors.borderDefault,
    padding: theme.spacing.sm,
    marginBottom: theme.spacingUnit * 2,
    maxWidth: '90%',
    alignSelf: 'flex-start',
  },
  title: {
    marginBottom: theme.spacingUnit * 5,
  },
  chartRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: theme.spacingUnit * 2,
  },
  column: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  valueLabel: {
    marginBottom: theme.spacingUnit,
  },
  bar: {
    width: '100%',
    minHeight: 4,
    borderRadius: theme.radius.button,
    backgroundColor: theme.colors.brand,
  },
  barFinal: {
    backgroundColor: theme.colors.brandDecorative,
  },
  axisLabel: {
    marginTop: theme.spacingUnit * 2,
  },
});
