import { useRef } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  View,
} from 'react-native';
import { Screen } from '@/shared/components/Screen';
import { Text, TextVariant } from '@/shared/components/Text';
import { AgentPhase } from '@/shared/features/chat/chat.constants';
import type { ChatMessage } from '@/shared/features/chat/chat.types';
import { ChatEmptyState } from './ChatEmptyState';
import { ChatInput } from './ChatInput';
import { chatPageStyles as styles } from './ChatPage.styles';
import { ChatMessageItem } from './ChatMessageItem';
import { TypingIndicator } from './TypingIndicator';
import { useAgentChat } from './useAgentChat';

export const ChatPage = () => {
  const {
    messages,
    agentPhase,
    isThinking,
    isExecutingTool,
    sendUserMessage,
    confirmPendingCard,
    cancelPendingCard,
    retryLastTurn,
    startNewChat,
  } = useAgentChat();
  const listRef = useRef<FlatList<ChatMessage>>(null);

  return (
    <Screen>
      <View style={styles.header}>
        <Text variant={TextVariant.Title}>BlinkMoney Agent</Text>
        {messages.length > 0 ? (
          <Pressable onPress={startNewChat} hitSlop={8}>
            <Text variant={TextVariant.Label} colorToken='brand'>
              New chat
            </Text>
          </Pressable>
        ) : null}
      </View>
      <KeyboardAvoidingView
        style={styles.keyboardAvoiding}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <FlatList
          ref={listRef}
          style={styles.list}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ChatMessageItem
              item={item}
              isExecutingTool={isExecutingTool}
              onConfirmCard={confirmPendingCard}
              onCancelCard={cancelPendingCard}
              onSelectQuickReply={sendUserMessage}
              onRetry={retryLastTurn}
            />
          )}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <ChatEmptyState onSelectPrompt={sendUserMessage} />
          }
          ListFooterComponent={isThinking ? <TypingIndicator /> : null}
          onContentSizeChange={() =>
            listRef.current?.scrollToEnd({ animated: true })
          }
        />
        <ChatInput
          onSend={sendUserMessage}
          disabled={
            agentPhase === AgentPhase.Thinking ||
            agentPhase === AgentPhase.ExecutingTool
          }
        />
      </KeyboardAvoidingView>
    </Screen>
  );
};
