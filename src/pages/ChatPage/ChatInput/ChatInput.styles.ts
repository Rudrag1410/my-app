import { StyleSheet } from 'react-native';
import { theme } from '@/shared/theme/theme';

export const chatInputStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: theme.spacingUnit * 2,
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.bgPage,
    borderTopWidth: 1,
    borderTopColor: theme.colors.borderDefault,
  },
  input: {
    flex: 1,
    fontFamily: theme.typography.fontSans,
    fontSize: theme.typography.sizeBase,
    color: theme.colors.textPrimary,
    backgroundColor: theme.colors.bgCard,
    borderRadius: theme.radius.card,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacingUnit * 3,
    maxHeight: theme.typography.lineHeightBase * 5,
  },
  sendButton: {
    backgroundColor: theme.colors.brand,
    borderRadius: theme.radius.pill,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacingUnit * 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.4,
  },
});
