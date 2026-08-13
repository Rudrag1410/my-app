import { StyleSheet } from 'react-native';
import { theme } from '@/shared/theme/theme';

export const confirmActionRowStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: theme.spacingUnit * 3,
    marginTop: theme.spacingUnit * 3,
  },
  button: {
    flex: 1,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacingUnit * 2,
    marginTop: theme.spacingUnit * 3,
  },
});
