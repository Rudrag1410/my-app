import { View } from 'react-native';
import { Chip } from '@/shared/components/Chip';
import { Text, TextVariant } from '@/shared/components/Text';
import { chatPageStyles as styles } from '../ChatPage.styles';

const STARTER_PROMPTS = [
  'I want to start saving',
  'I need cash this month',
  'Help me plan for retirement',
  'I want to borrow against my investments',
  'How much would ₹500/day grow to?',
];

interface ChatEmptyStateProps {
  onSelectPrompt: (prompt: string) => void;
}

export const ChatEmptyState = ({ onSelectPrompt }: ChatEmptyStateProps) => {
  return (
    <View style={styles.emptyState}>
      <Text variant={TextVariant.Title} style={styles.emptyTitle}>
        Ask BlinkMoney anything
      </Text>
      <Text
        variant={TextVariant.Body}
        colorToken='textSecondary'
        style={styles.emptySubtitle}
      >
        Start a savings goal or tell me if you need cash — I&apos;ll find the
        best move.
      </Text>
      <View style={styles.suggestionRow}>
        {STARTER_PROMPTS.map((prompt) => (
          <Chip
            key={prompt}
            label={prompt}
            onPress={() => onSelectPrompt(prompt)}
          />
        ))}
      </View>
    </View>
  );
};
