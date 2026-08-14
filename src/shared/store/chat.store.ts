import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import {
  AgentPhase,
  CardStatus,
  ChatRole,
} from '../features/chat/chat.constants';
import {
  createMessage,
  didConfirmingToolSucceed,
  runChatTurn,
  toHistory,
  withCardStatus,
  type ChatState,
} from '../features/chat/chat.store.utils';
import { agentOrchestratorService } from '../features/chat/service/agentOrchestrator';
import { registerToolHandlers } from '../features/chat/service/tool-handlers';

registerToolHandlers();

const CHAT_STORAGE_KEY = 'ai-agent-chat';

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      messages: [],
      agentPhase: AgentPhase.Idle,

      sendUserMessage: async (text) => {
        const userMessage = createMessage(ChatRole.User, text);
        set((state) => ({ messages: [...state.messages, userMessage] }));
        await runChatTurn(set, get);
      },

      retryLastTurn: async () => {
        set((state) => ({
          messages: state.messages.filter(
            (message, index) =>
              !(message.isError && index === state.messages.length - 1)
          ),
        }));
        await runChatTurn(set, get);
      },

      confirmPendingCard: async (messageId, adjustmentNote) => {
        const confirmationMessage = createMessage(
          ChatRole.User,
          adjustmentNote
            ? `User confirmed the plan in-app. ${adjustmentNote}`
            : 'User confirmed the plan in-app.'
        );
        set((state) => ({
          messages: [...state.messages, confirmationMessage],
          agentPhase: AgentPhase.ExecutingTool,
        }));

        try {
          const result = await agentOrchestratorService.runAgentTurn(
            toHistory(get().messages)
          );
          const confirmedStatus = didConfirmingToolSucceed(result.toolCalls)
            ? CardStatus.Confirmed
            : CardStatus.AwaitingConfirmation;
          const assistantMessage = createMessage(
            ChatRole.Assistant,
            result.assistantMessage
          );
          set((state) => ({
            messages: [
              ...state.messages.map((message) =>
                withCardStatus(message, messageId, confirmedStatus)
              ),
              assistantMessage,
            ],
            agentPhase: AgentPhase.Idle,
          }));
        } catch {
          set((state) => ({
            messages: state.messages.map((message) =>
              withCardStatus(message, messageId, CardStatus.Error)
            ),
            agentPhase: AgentPhase.Error,
          }));
        }
      },

      cancelPendingCard: async (messageId) => {
        const cancellationMessage = createMessage(
          ChatRole.User,
          'User cancelled the plan in-app.'
        );
        set((state) => ({
          messages: [
            ...state.messages.map((message) =>
              withCardStatus(message, messageId, CardStatus.Cancelled)
            ),
            cancellationMessage,
          ],
        }));
        await runChatTurn(set, get);
      },

      startNewChat: () => {
        set({ messages: [], agentPhase: AgentPhase.Idle });
      },
    }),
    {
      name: CHAT_STORAGE_KEY,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ messages: state.messages }),
    }
  )
);
