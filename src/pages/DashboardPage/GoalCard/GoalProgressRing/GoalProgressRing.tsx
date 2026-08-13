import { View } from 'react-native';
import { Text, TextVariant } from '@/shared/components/Text';
import { goalProgressRingStyles as styles } from './GoalProgressRing.styles';

interface GoalProgressRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
}

const DEFAULT_SIZE = 64;
const DEFAULT_STROKE_WIDTH = 6;
const HALF_TURN_DEGREES = 180;
const FULL_TURN_DEGREES = 360;

interface ProgressHalfProps {
  size: number;
  strokeWidth: number;
  rotationDegrees: number;
  side: 'left' | 'right';
}

const ProgressHalf = ({
  size,
  strokeWidth,
  rotationDegrees,
  side,
}: ProgressHalfProps) => {
  const radius = size / 2;
  return (
    <View
      style={[
        styles.halfMask,
        { width: radius, height: size, left: side === 'right' ? radius : 0 },
      ]}
    >
      <View
        style={[
          styles.halfFill,
          {
            width: size,
            height: size,
            borderRadius: radius,
            borderWidth: strokeWidth,
            left: side === 'right' ? -radius : 0,
            transform: [{ rotate: `${rotationDegrees}deg` }],
          },
        ]}
      />
    </View>
  );
};

export const GoalProgressRing = ({
  progress,
  size = DEFAULT_SIZE,
  strokeWidth = DEFAULT_STROKE_WIDTH,
}: GoalProgressRingProps) => {
  const clampedProgress = Math.min(Math.max(progress, 0), 1);
  const angle = clampedProgress * FULL_TURN_DEGREES;
  const radius = size / 2;

  return (
    <View style={{ width: size, height: size }}>
      <View
        style={[
          styles.track,
          {
            width: size,
            height: size,
            borderRadius: radius,
            borderWidth: strokeWidth,
          },
        ]}
      />
      <ProgressHalf
        size={size}
        strokeWidth={strokeWidth}
        rotationDegrees={Math.min(angle, HALF_TURN_DEGREES)}
        side='right'
      />
      {angle > HALF_TURN_DEGREES ? (
        <ProgressHalf
          size={size}
          strokeWidth={strokeWidth}
          rotationDegrees={angle - HALF_TURN_DEGREES}
          side='left'
        />
      ) : null}
      <View style={[styles.labelContainer, { width: size, height: size }]}>
        <Text variant={TextVariant.Caption}>
          {Math.round(clampedProgress * 100)}%
        </Text>
      </View>
    </View>
  );
};
