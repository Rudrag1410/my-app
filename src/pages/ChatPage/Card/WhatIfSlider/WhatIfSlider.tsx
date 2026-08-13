import { View } from 'react-native';
import { Text, TextVariant } from '@/shared/components/Text';
import { clamp } from './WhatIfSlider.util';
import {
  THUMB_SIZE,
  whatIfSliderStyles as styles,
} from './WhatIfSlider.styles';
import { useWhatIfSliderPanResponder } from './useWhatIfSliderPanResponder';

interface WhatIfSliderProps {
  label: string;
  value: number;
  minValue: number;
  maxValue: number;
  step: number;
  onChange: (value: number) => void;
  formatValue: (value: number) => string;
}

export const WhatIfSlider = ({
  label,
  value,
  minValue,
  maxValue,
  step,
  onChange,
  formatValue,
}: WhatIfSliderProps) => {
  const { trackWidth, panResponder, handleLayout } =
    useWhatIfSliderPanResponder({
      value,
      minValue,
      maxValue,
      step,
      onChange,
    });

  const percent =
    trackWidth > 0
      ? clamp((value - minValue) / (maxValue - minValue), 0, 1)
      : 0;
  const thumbX = percent * trackWidth;

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text variant={TextVariant.Caption} colorToken='textSecondary'>
          {label}
        </Text>
        <Text variant={TextVariant.BodyMedium} colorToken='brand'>
          {formatValue(value)}
        </Text>
      </View>
      <View style={styles.trackWrapper} onLayout={handleLayout}>
        <View style={styles.track} />
        <View style={[styles.fill, { width: thumbX }]} />
        <View
          style={[styles.thumb, { left: thumbX - THUMB_SIZE / 2 }]}
          {...(panResponder ? panResponder.panHandlers : {})}
        />
      </View>
    </View>
  );
};
