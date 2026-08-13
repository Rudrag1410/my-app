import { ActivityIndicator, Pressable } from 'react-native';
import * as Haptics from 'expo-haptics';
import { theme } from '@/shared/theme/theme';
import { Text, TextVariant } from '@/shared/components/Text';
import { buttonStyles } from './Button.styles';

export enum ButtonVariant {
  Primary = 'primary',
  Secondary = 'secondary',
  Ghost = 'ghost',
}

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
}

const variantStyleByVariant = {
  [ButtonVariant.Primary]: buttonStyles.primary,
  [ButtonVariant.Secondary]: buttonStyles.secondary,
  [ButtonVariant.Ghost]: buttonStyles.ghost,
};

const labelColorTokenByVariant = {
  [ButtonVariant.Primary]: 'textOnAccent',
  [ButtonVariant.Secondary]: 'textPrimary',
  [ButtonVariant.Ghost]: 'textSecondary',
} as const;

export const Button = ({
  label,
  onPress,
  variant = ButtonVariant.Primary,
  disabled,
  loading,
}: ButtonProps) => {
  const isDisabled = disabled || loading;

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={isDisabled}
      style={({ pressed }) => [
        buttonStyles.base,
        variantStyleByVariant[variant],
        isDisabled ? buttonStyles.disabled : undefined,
        pressed ? buttonStyles.pressed : undefined,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color={theme.colors[labelColorTokenByVariant[variant]]}
        />
      ) : (
        <Text
          variant={TextVariant.Label}
          colorToken={labelColorTokenByVariant[variant]}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
};
