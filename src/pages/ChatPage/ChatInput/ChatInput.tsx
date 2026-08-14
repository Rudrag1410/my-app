import { useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { theme } from '@/shared/theme/theme';
import { Text, TextVariant } from '@/shared/components/Text';
import { chatInputStyles as styles } from './ChatInput.styles';

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
}

export const ChatInput = ({ onSend, disabled }: ChatInputProps) => {
  const [draft, setDraft] = useState('');
  const isSendDisabled = disabled || draft.trim().length === 0;

  const handleSend = () => {
    const trimmed = draft.trim();
    if (trimmed.length === 0) {
      return;
    }
    onSend(trimmed);
    setDraft('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={draft}
        onChangeText={setDraft}
        placeholder='Message AI Agent...'
        placeholderTextColor={theme.colors.textTertiary}
        editable={!disabled}
        multiline
      />
      <Pressable
        onPress={handleSend}
        disabled={isSendDisabled}
        style={[
          styles.sendButton,
          isSendDisabled ? styles.sendButtonDisabled : undefined,
        ]}
      >
        <Text variant={TextVariant.Label} colorToken='textOnAccent'>
          Send
        </Text>
      </Pressable>
    </View>
  );
};
