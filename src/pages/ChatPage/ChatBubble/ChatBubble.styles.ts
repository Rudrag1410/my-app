import { StyleSheet } from 'react-native';
import { theme } from '@/shared/theme/theme';

export const chatBubbleStyles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.bgCard,
    borderRadius: theme.radius.card,
    padding: theme.spacing.sm,
    marginBottom: theme.spacingUnit * 2,
    maxWidth: '80%',
  },
  containerUser: {
    backgroundColor: theme.colors.brand,
    alignSelf: 'flex-end',
  },
  text: {
    fontFamily: theme.typography.fontSans,
    fontSize: theme.typography.sizeBase,
    color: theme.colors.textPrimary,
  },
  textOnAccent: {
    color: theme.colors.textOnAccent,
  },
});
