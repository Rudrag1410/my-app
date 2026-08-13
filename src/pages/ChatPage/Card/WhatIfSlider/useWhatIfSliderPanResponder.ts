import { useEffect, useRef, useState } from 'react';
import {
  PanResponder,
  type LayoutChangeEvent,
  type PanResponderInstance,
} from 'react-native';
import { clamp, snapToStep } from './WhatIfSlider.util';

interface UseWhatIfSliderPanResponderParams {
  value: number;
  minValue: number;
  maxValue: number;
  step: number;
  onChange: (value: number) => void;
}

interface UseWhatIfSliderPanResponderResult {
  trackWidth: number;
  panResponder: PanResponderInstance | null;
  handleLayout: (event: LayoutChangeEvent) => void;
}

export const useWhatIfSliderPanResponder = ({
  value,
  minValue,
  maxValue,
  step,
  onChange,
}: UseWhatIfSliderPanResponderParams): UseWhatIfSliderPanResponderResult => {
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

  return { trackWidth, panResponder, handleLayout };
};
