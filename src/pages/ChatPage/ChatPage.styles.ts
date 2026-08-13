import { StyleSheet } from 'react-native';
import { theme } from '@/shared/theme/theme';

export const chatPageStyles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacingUnit * 3,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderDefault,
  },
  list: {
    flex: 1,
  },
  listContent: {
    flexGrow: 1,
    padding: theme.spacing.sm,
  },
  messageGroup: {
    marginBottom: theme.spacingUnit,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacingUnit * 3,
    padding: theme.spacing.md,
  },
  emptyTitle: {
    textAlign: 'center',
  },
  emptySubtitle: {
    textAlign: 'center',
  },
  suggestionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacingUnit * 2,
    justifyContent: 'center',
  },
  keyboardAvoiding: {
    flex: 1,
  },
});
