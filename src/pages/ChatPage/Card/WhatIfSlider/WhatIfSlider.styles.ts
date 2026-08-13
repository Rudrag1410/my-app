import { StyleSheet } from 'react-native';
import { theme } from '@/shared/theme/theme';

export const THUMB_SIZE = 24;
const TRACK_HEIGHT = 4;

export const whatIfSliderStyles = StyleSheet.create({
  container: {
    gap: theme.spacingUnit * 2,
    paddingVertical: theme.spacingUnit,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  trackWrapper: {
    justifyContent: 'center',
    height: THUMB_SIZE,
  },
  track: {
    height: TRACK_HEIGHT,
    borderRadius: theme.radius.pill,
    backgroundColor: theme.colors.bgChip,
  },
  fill: {
    position: 'absolute',
    left: 0,
    height: TRACK_HEIGHT,
    borderRadius: theme.radius.pill,
    backgroundColor: theme.colors.brand,
  },
  thumb: {
    position: 'absolute',
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    backgroundColor: theme.colors.brand,
    borderWidth: 2,
    borderColor: theme.colors.bgCard,
  },
});
