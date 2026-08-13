import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { typingIndicatorStyles as styles } from './TypingIndicator.styles';

const PULSE_DURATION_MS = 400;
const DOT_STAGGER_MS = 150;

const TypingDot = ({ staggerIndex }: { staggerIndex: number }) => {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withDelay(
      staggerIndex * DOT_STAGGER_MS,
      withRepeat(
        withSequence(
          withTiming(1, { duration: PULSE_DURATION_MS }),
          withTiming(0.3, { duration: PULSE_DURATION_MS })
        ),
        -1,
        false
      )
    );
  }, [opacity, staggerIndex]);

  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return <Animated.View style={[styles.dot, animatedStyle]} />;
};

export const TypingIndicator = () => {
  return (
    <View style={styles.container}>
      <TypingDot staggerIndex={0} />
      <TypingDot staggerIndex={1} />
      <TypingDot staggerIndex={2} />
    </View>
  );
};
