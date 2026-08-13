import { Text, TextVariant } from '@/shared/components/Text';
import { CardStatus } from '@/shared/features/chat/chat.constants';
import type { BorrowComparisonCard as BorrowComparisonCardData } from '@/shared/features/chat/chat.types';

import {
  calculateLostGrowth10yr,
  calculateMonthlyRepayEstimate,
} from '@/shared/features/chat/service/tool-handlers/borrowMath';
import { formatCurrency } from '@/shared/utils/formatCurrency';
import { useState } from 'react';
import { View } from 'react-native';
import { buildAdjustmentNote } from '../adjustmentNote.util';
import { ConfirmActionRow } from '../ConfirmActionRow';
import { computeSliderRangeUpTo, WhatIfSlider } from '../WhatIfSlider';
import { borrowComparisonCardStyles as styles } from './BorrowComparisonCard.styles';

interface BorrowComparisonCardProps {
  card: BorrowComparisonCardData;
  onConfirm: (adjustmentNote?: string) => void;
  onCancel: () => void;
  loading?: boolean;
}

export const BorrowComparisonCard = ({
  card,
  onConfirm,
  onCancel,
  loading,
}: BorrowComparisonCardProps) => {
  const initialAmount = Math.min(card.amountNeeded, card.maxEligible);
  const [amount, setAmount] = useState(initialAmount);
  const isEditable = card.status === CardStatus.AwaitingConfirmation;
  const hasBeenAdjusted = amount !== initialAmount;

  const monthlyRepayEstimate = hasBeenAdjusted
    ? calculateMonthlyRepayEstimate(amount)
    : card.monthlyRepayEstimate;
  const lostGrowth10yr = hasBeenAdjusted
    ? calculateLostGrowth10yr(amount)
    : card.lostGrowth10yr;
  const sliderRange = computeSliderRangeUpTo(
    card.amountNeeded,
    card.maxEligible
  );

  const handleConfirm = () => {
    onConfirm(buildAdjustmentNote('borrow amount', amount, hasBeenAdjusted));
  };

  return (
    <View style={styles.container}>
      {isEditable ? (
        <>
          <WhatIfSlider
            label='Amount needed'
            value={amount}
            minValue={sliderRange.min}
            maxValue={sliderRange.max}
            step={sliderRange.step}
            onChange={setAmount}
            formatValue={formatCurrency}
          />
          <Text
            variant={TextVariant.Caption}
            colorToken='textSecondary'
            style={styles.eligibleHint}
          >
            Eligible up to {formatCurrency(card.maxEligible)}
          </Text>
        </>
      ) : (
        <Text variant={TextVariant.Title} style={styles.amountNeeded}>
          {formatCurrency(amount)} needed
        </Text>
      )}

      <View style={styles.columns}>
        <View style={[styles.column, styles.columnRecommended]}>
          <Text variant={TextVariant.Label} colorToken='brand'>
            Borrow against Grow
          </Text>
          <Text variant={TextVariant.Caption}>
            {card.ratePercentAnnual}% per year
          </Text>
          <Text variant={TextVariant.BodyMedium}>
            {formatCurrency(monthlyRepayEstimate)}/mo
          </Text>
          <Text variant={TextVariant.Caption} colorToken='textSecondary'>
            Your investments keep growing
          </Text>
        </View>

        <View style={styles.column}>
          <Text variant={TextVariant.Label} colorToken='textSecondary'>
            Withdraw instead
          </Text>
          <Text variant={TextVariant.Caption}>Breaks your SIP</Text>
          <Text variant={TextVariant.BodyMedium} colorToken='error'>
            -{formatCurrency(lostGrowth10yr)}
          </Text>
          <Text variant={TextVariant.Caption} colorToken='textSecondary'>
            Lost growth over 10 years
          </Text>
        </View>
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
