import { Text, TextVariant } from '@/shared/components/Text';
import { CardStatus } from '@/shared/features/chat/chat.constants';
import type { PlanCard as PlanCardData } from '@/shared/features/chat/chat.types';
import { sipMathService } from '@/shared/features/portfolio/service/sipMath';
import { formatCurrency } from '@/shared/utils/formatCurrency';
import { useState } from 'react';
import { View } from 'react-native';
import { buildAdjustmentNote } from '../adjustmentNote.util';
import { ConfirmActionRow } from '../ConfirmActionRow';
import { computeSliderRangeAround, WhatIfSlider } from '../WhatIfSlider';
import { planCardStyles as styles } from './PlanCard.styles';

interface PlanCardProps {
  card: PlanCardData;
  onConfirm: (adjustmentNote?: string) => void;
  onCancel: () => void;
  loading?: boolean;
}

const ASSUMED_ANNUAL_RETURN_PERCENT = 15;

export const PlanCard = ({
  card,
  onConfirm,
  onCancel,
  loading,
}: PlanCardProps) => {
  const [monthlyAmount, setMonthlyAmount] = useState(card.monthlyAmount);
  const isEditable = card.status === CardStatus.AwaitingConfirmation;
  const hasBeenAdjusted = monthlyAmount !== card.monthlyAmount;

  const projectedValue = hasBeenAdjusted
    ? sipMathService.projectValue(
        monthlyAmount,
        card.durationMonths,
        ASSUMED_ANNUAL_RETURN_PERCENT
      )
    : card.projectedValue;

  const sliderRange = computeSliderRangeAround(card.monthlyAmount);

  const handleConfirm = () => {
    onConfirm(
      buildAdjustmentNote('monthly amount', monthlyAmount, hasBeenAdjusted)
    );
  };

  return (
    <View style={styles.container}>
      <Text variant={TextVariant.Title} style={styles.goalName}>
        {card.goalName}
      </Text>

      {isEditable ? (
        <WhatIfSlider
          label='Monthly SIP'
          value={monthlyAmount}
          minValue={sliderRange.min}
          maxValue={sliderRange.max}
          step={sliderRange.step}
          onChange={setMonthlyAmount}
          formatValue={formatCurrency}
        />
      ) : (
        <View style={styles.row}>
          <Text variant={TextVariant.Body} colorToken='textSecondary'>
            Monthly SIP
          </Text>
          <Text variant={TextVariant.BodyMedium}>
            {formatCurrency(monthlyAmount)}
          </Text>
        </View>
      )}

      <View style={styles.row}>
        <Text variant={TextVariant.Body} colorToken='textSecondary'>
          Duration
        </Text>
        <Text variant={TextVariant.BodyMedium}>
          {card.durationMonths} months
        </Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.row}>
        <Text variant={TextVariant.Body} colorToken='textSecondary'>
          Projected value
        </Text>
        <Text variant={TextVariant.BodyMedium} colorToken='brand'>
          {formatCurrency(projectedValue)}
        </Text>
      </View>

      <ConfirmActionRow
        status={card.status}
        onConfirm={handleConfirm}
        onCancel={onCancel}
        loading={loading}
      />
    </View>
  );
};
