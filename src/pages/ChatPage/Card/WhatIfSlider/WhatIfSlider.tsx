import { useEffect, useRef, useState } from 'react';
import {
  PanResponder,
  View,
  type LayoutChangeEvent,
  type PanResponderInstance,
} from 'react-native';
import { Text, TextVariant } from '@/shared/components/Text';
import { clamp, snapToStep } from './WhatIfSlider.util';
import {
  THUMB_SIZE,
  whatIfSliderStyles as styles,
} from './WhatIfSlider.styles';

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
  const [trackWidth, setTrackWidth] = useState(0);
  const [panResponder, setPanResponder] = useState<PanResponderInstance | null>(
    null
  );

  const trackWidthRef = useRef(0);
  const valueRef = useRef(value);
  const rangeRef = useRef({ minValue, maxValue, step });
  const onChangeRef = useRef(onChange);
  const startValueRef = useRef(value);

  useEffect(() => {
    trackWidthRef.current = trackWidth;
  }, [trackWidth]);

  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  useEffect(() => {
    rangeRef.current = { minValue, maxValue, step };
  }, [minValue, maxValue, step]);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    setPanResponder(
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
          startValueRef.current = valueRef.current;
        },
        onPanResponderMove: (_event, gestureState) => {
          const width = trackWidthRef.current;
          if (width <= 0) {
            return;
          }
          const {
            minValue: min,
            maxValue: max,
            step: stepSize,
          } = rangeRef.current;
          const deltaValue = (gestureState.dx / width) * (max - min);
          const nextValue = clamp(startValueRef.current + deltaValue, min, max);
          onChangeRef.current(snapToStep(nextValue, stepSize, min));
        },
      })
    );
  }, []);

  const handleLayout = (event: LayoutChangeEvent) => {
    setTrackWidth(event.nativeEvent.layout.width);
  };

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
