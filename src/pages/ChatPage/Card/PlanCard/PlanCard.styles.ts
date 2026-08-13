import { StyleSheet } from 'react-native';
import { theme } from '@/shared/theme/theme';

export const planCardStyles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.bgCard,
    borderRadius: theme.radius.card,
    borderWidth: 1,
    borderColor: theme.colors.borderAccent,
    padding: theme.spacing.sm,
    marginBottom: theme.spacingUnit * 2,
    maxWidth: '90%',
    alignSelf: 'flex-start',
  },
  goalName: {
    marginBottom: theme.spacingUnit * 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: theme.spacingUnit,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.borderDefault,
    marginVertical: theme.spacingUnit * 2,
  },
});
