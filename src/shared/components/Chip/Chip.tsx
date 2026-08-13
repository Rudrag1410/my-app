import { Pressable } from 'react-native';
import { Text, TextVariant } from '@/shared/components/Text';
import { chipStyles } from './Chip.styles';

interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
}

export const Chip = ({ label, selected, onPress }: ChipProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={[chipStyles.base, selected ? chipStyles.selected : undefined]}
    >
      <Text
        variant={TextVariant.Label}
        colorToken={selected ? 'textOnAccent' : 'textPrimary'}
      >
        {label}
      </Text>
    </Pressable>
  );
};
