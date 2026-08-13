import { StyleSheet } from 'react-native';

import { theme } from '@/shared/theme/theme';

export const styles = StyleSheet.create({
  slot: {
    height: '100%',
  },
  tabListContainer: {
    position: 'absolute',
    width: '100%',
    padding: theme.spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  innerContainer: {
    paddingVertical: theme.spacingUnit * 2,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.radius.pill,
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
    gap: theme.spacingUnit * 2,
    maxWidth: 800,
    backgroundColor: theme.colors.bgElevated,
  },
  brandText: {
    marginRight: 'auto',
  },
  pressed: {
    opacity: 0.7,
  },
  tabButtonView: {
    paddingVertical: theme.spacingUnit,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.radius.pill,
  },
  tabButtonViewFocused: {
    backgroundColor: theme.colors.brand,
  },
});
