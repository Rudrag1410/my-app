import { View } from 'react-native';
import { Text, TextVariant } from '@/shared/components/Text';
import { formatCurrency } from '@/shared/utils/formatCurrency';
import type { Goal } from '@/shared/features/portfolio/portfolio.types';
import { GoalProgressRing } from './GoalProgressRing';
import { goalCardStyles as styles } from './GoalCard.styles';

interface GoalCardProps {
  goal: Goal;
}

const MONTHS_PER_YEAR = 12;

const computeElapsedMonths = (createdOn: string): number => {
  const createdDate = new Date(createdOn);
  const now = new Date();
  const elapsed =
    (now.getFullYear() - createdDate.getFullYear()) * MONTHS_PER_YEAR +
    (now.getMonth() - createdDate.getMonth());
  return Math.max(elapsed, 0);
};

export const GoalCard = ({ goal }: GoalCardProps) => {
  const elapsedMonths = computeElapsedMonths(goal.createdOn);
  const progress =
    goal.durationMonths > 0 ? elapsedMonths / goal.durationMonths : 0;

  return (
    <View style={styles.container}>
      <GoalProgressRing progress={progress} />
      <View style={styles.details}>
        <Text variant={TextVariant.BodyMedium}>{goal.name}</Text>
        <Text variant={TextVariant.Caption} colorToken='textSecondary'>
          {formatCurrency(goal.monthlyAmount)}/mo for {goal.durationMonths}{' '}
          months
        </Text>
        <Text variant={TextVariant.Caption} colorToken='brand'>
          {formatCurrency(goal.projectedValue)} projected
        </Text>
      </View>
    </View>
  );
};

export const GoalCardSkeleton = () => {
  return (
    <View style={styles.container}>
      <View style={[styles.skeleton, styles.skeletonRing]} />
      <View style={styles.details}>
        <View style={[styles.skeleton, styles.skeletonLine]} />
        <View
          style={[
            styles.skeleton,
            styles.skeletonLine,
            styles.skeletonLineShort,
          ]}
        />
      </View>
    </View>
  );
};
