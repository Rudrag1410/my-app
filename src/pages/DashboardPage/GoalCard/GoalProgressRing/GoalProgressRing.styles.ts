import { StyleSheet } from 'react-native';
import { theme } from '@/shared/theme/theme';

export const goalProgressRingStyles = StyleSheet.create({
  track: {
    position: 'absolute',
    borderColor: theme.colors.bgChip,
  },
  halfMask: {
    position: 'absolute',
    overflow: 'hidden',
  },
  halfFill: {
    position: 'absolute',
    borderColor: 'transparent',
    borderTopColor: theme.colors.brand,
    borderRightColor: theme.colors.brand,
  },
  labelContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
