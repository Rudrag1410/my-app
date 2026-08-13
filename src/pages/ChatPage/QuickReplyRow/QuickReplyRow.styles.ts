import { StyleSheet } from 'react-native';
import { theme } from '@/shared/theme/theme';

export const quickReplyRowStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacingUnit * 2,
    marginBottom: theme.spacingUnit * 2,
  },
});
