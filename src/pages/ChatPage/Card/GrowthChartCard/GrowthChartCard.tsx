import { View } from 'react-native';
import type { GrowthChartCard as GrowthChartCardData } from '@/shared/features/chat/chat.types';
import { Text, TextVariant } from '@/shared/components/Text';
import { formatCompactCurrency } from '@/shared/utils/formatCurrency';
import { growthChartCardStyles as styles } from './GrowthChartCard.styles';

interface GrowthChartCardProps {
  card: GrowthChartCardData;
}

const MONTHS_PER_YEAR = 12;
const MAX_BAR_HEIGHT = 110;
const MIN_BAR_HEIGHT = 4;

const formatAxisLabel = (monthsElapsed: number): string => {
  if (monthsElapsed === 0) {
    return 'Start';
  }
  if (monthsElapsed % MONTHS_PER_YEAR === 0) {
    return `Yr ${monthsElapsed / MONTHS_PER_YEAR}`;
  }
  return `${monthsElapsed}mo`;
};

export const GrowthChartCard = ({ card }: GrowthChartCardProps) => {
  const maxValue = Math.max(...card.points.map((point) => point.value), 1);

  return (
    <View style={styles.container}>
      <Text variant={TextVariant.Title} style={styles.title}>
        {card.goalName} · growth over time
      </Text>

      <View style={styles.chartRow}>
        {card.points.map((point, index) => {
          const isFinalPoint = index === card.points.length - 1;
          const barHeight = Math.max(
            (point.value / maxValue) * MAX_BAR_HEIGHT,
            MIN_BAR_HEIGHT
          );
          return (
            <View key={point.monthsElapsed} style={styles.column}>
              <Text variant={TextVariant.Caption} style={styles.valueLabel}>
                {formatCompactCurrency(point.value)}
              </Text>
              <View
                style={[
                  styles.bar,
                  { height: barHeight },
                  isFinalPoint && styles.barFinal,
                ]}
              />
              <Text
                variant={TextVariant.Caption}
                colorToken='textSecondary'
                style={styles.axisLabel}
              >
                {formatAxisLabel(point.monthsElapsed)}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};
