import { CardStatus } from '@/shared/features/chat/chat.constants';
import { Button, ButtonVariant } from '@/shared/components/Button';
import { Text, TextVariant } from '@/shared/components/Text';
import { View } from 'react-native';
import { confirmActionRowStyles as styles } from './ConfirmActionRow.styles';

interface ConfirmActionRowProps {
  status: CardStatus;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

const statusLabelByStatus: Partial<Record<CardStatus, string>> = {
  [CardStatus.Confirmed]: 'Confirmed',
  [CardStatus.Cancelled]: 'Cancelled',
  [CardStatus.Error]: "Couldn't process — try again",
};

export const ConfirmActionRow = ({
  status,
  onConfirm,
  onCancel,
  loading,
}: ConfirmActionRowProps) => {
  if (status === CardStatus.AwaitingConfirmation) {
    return (
      <View style={styles.container}>
        <View style={styles.button}>
          <Button
            label='Cancel'
            onPress={onCancel}
            variant={ButtonVariant.Ghost}
            disabled={loading}
          />
        </View>
        <View style={styles.button}>
          <Button
            label='Confirm'
            onPress={onConfirm}
            variant={ButtonVariant.Primary}
            loading={loading}
          />
        </View>
      </View>
    );
  }

  const label = statusLabelByStatus[status];
  if (!label) {
    return null;
  }

  return (
    <View style={styles.statusRow}>
      <Text
        variant={TextVariant.Label}
        colorToken={status === CardStatus.Error ? 'error' : 'brand'}
      >
        {label}
      </Text>
      {status === CardStatus.Error ? (
        <Button
          label='Retry'
          onPress={onConfirm}
          variant={ButtonVariant.Secondary}
          loading={loading}
        />
      ) : null}
    </View>
  );
};
