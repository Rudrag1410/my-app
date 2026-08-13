import { View } from 'react-native';
import { Chip } from '@/shared/components/Chip';
import type { QuickRepliesCard } from '@/shared/types/card.types';
import { quickReplyRowStyles as styles } from './QuickReplyRow.styles';

interface QuickReplyRowProps {
  card: QuickRepliesCard;
  onSelect: (option: string) => void;
}

export const QuickReplyRow = ({ card, onSelect }: QuickReplyRowProps) => {
  return (
    <View style={styles.container}>
      {card.options.map((option) => (
        <Chip key={option} label={option} onPress={() => onSelect(option)} />
      ))}
    </View>
  );
};
