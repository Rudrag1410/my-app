import { View } from 'react-native';
import { ErrorState } from '@/shared/components/ErrorState';
import type { ChatMessage } from '@/shared/features/chat/chat.types';
import { ChatBubble } from '../ChatBubble';
import { ChatCardRenderer } from '../ChatCardRenderer';
import { chatPageStyles as styles } from '../ChatPage.styles';

interface ChatMessageItemProps {
  item: ChatMessage;
  isExecutingTool: boolean;
  onConfirmCard: (messageId: string, adjustmentNote?: string) => void;
  onCancelCard: (messageId: string) => void;
  onSelectQuickReply: (option: string) => void;
  onRetry: () => void;
}

export const ChatMessageItem = ({
  item,
  isExecutingTool,
  onConfirmCard,
  onCancelCard,
  onSelectQuickReply,
  onRetry,
}: ChatMessageItemProps) => {
  if (item.isError) {
    return <ErrorState message={item.content} onRetry={onRetry} />;
  }

  return (
    <View style={styles.messageGroup}>
      {item.content.length > 0 ? (
        <ChatBubble role={item.role} content={item.content} />
      ) : null}
      {item.cards.map((card) => (
        <View key={card.type}>
          <ChatCardRenderer
            card={card}
            messageId={item.id}
            isExecutingTool={isExecutingTool}
            onConfirm={onConfirmCard}
            onCancel={onCancelCard}
            onSelectQuickReply={onSelectQuickReply}
          />
        </View>
      ))}
    </View>
  );
};
