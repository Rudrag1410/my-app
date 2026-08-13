import { ChatRole } from '@/shared/features/chat/chat.constants';
import { Text, View } from 'react-native';
import { chatBubbleStyles as styles } from './ChatBubble.styles';

interface ChatBubbleProps {
  role: ChatRole;
  content: string;
}

export const ChatBubble = ({ role, content }: ChatBubbleProps) => {
  const isUser = role === ChatRole.User;
  return (
    <View style={[styles.container, isUser ? styles.containerUser : undefined]}>
      <Text style={[styles.text, isUser ? styles.textOnAccent : undefined]}>
        {content}
      </Text>
    </View>
  );
};
