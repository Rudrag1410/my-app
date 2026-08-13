import { View } from 'react-native';
import { Text, TextVariant } from '@/shared/components/Text';
import { Button, ButtonVariant } from '@/shared/components/Button';
import { errorStateStyles } from './ErrorState.styles';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorState = ({ message, onRetry }: ErrorStateProps) => {
  return (
    <View style={errorStateStyles.container}>
      <Text
        variant={TextVariant.Body}
        colorToken='error'
        style={errorStateStyles.message}
      >
        {message}
      </Text>
      {onRetry ? (
        <Button
          label='Retry'
          onPress={onRetry}
          variant={ButtonVariant.Secondary}
        />
      ) : null}
    </View>
  );
};
