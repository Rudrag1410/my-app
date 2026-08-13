import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { z } from 'zod';
import type OpenAI from 'openai';
import { AgentPhase } from '../constants/agentPhase.constants';
import { CardStatus } from '../constants/cardStatus.constants';
import { ChatRole } from '../constants/chatRole.constants';
import { ToolName } from '../constants/toolName.constants';
import {
  agentOrchestratorService,
  type ToolCallRecord,
} from '../services/agentOrchestrator';
import { registerToolHandlers } from '../services/tool-handlers';
import { mapToolCallsToCards } from './mapToolCallsToCards';
import type {
  ChatCard,
  PlanCard,
  BorrowComparisonCard,
} from '../types/card.types';
import type { ChatMessage } from '../types/chatMessage.types';

type ChatCompletionMessage = OpenAI.Chat.Completions.ChatCompletionMessageParam;

registerToolHandlers();

const CONFIRMING_TOOL_NAMES = new Set<ToolName>([
  ToolName.StartSip,
  ToolName.InitiateBorrow,
]);
const successResultSchema = z.object({ success: z.literal(true) });
const DEFAULT_ERROR_MESSAGE = 'Something went wrong. Please try again.';
const CHAT_STORAGE_KEY = 'blinkmoney-chat';

interface ChatState {
  messages: ChatMessage[];
  agentPhase: AgentPhase;
  sendUserMessage: (text: string) => Promise<void>;
  confirmPendingCard: (
    messageId: string,
    adjustmentNote?: string
  ) => Promise<void>;
  cancelPendingCard: (messageId: string) => Promise<void>;
  retryLastTurn: () => Promise<void>;
}

type SetChatState = (fn: (state: ChatState) => Partial<ChatState>) => void;
type GetChatState = () => ChatState;

const createMessage = (
  role: ChatRole,
  content: string,
  isError = false
): ChatMessage => {
  return {
    id: `msg_${Date.now()}_${Math.random().toString(36).slice(2)}`,
    role,
    content,
    createdAt: Date.now(),
    cards: [],
    isError,
  };
};

const isConversationalRole = (
  role: ChatRole
): role is ChatRole.User | ChatRole.Assistant => {
  return role === ChatRole.User || role === ChatRole.Assistant;
};

const toHistory = (messages: ChatMessage[]): ChatCompletionMessage[] => {
  return messages
    .filter((message) => isConversationalRole(message.role) && !message.isError)
    .map((message) => ({
      role: message.role,
      content: message.content,
    })) as ChatCompletionMessage[];
};

const isConfirmableCard = (
  card: ChatCard
): card is PlanCard | BorrowComparisonCard => {
  return 'status' in card;
};

const hasAwaitingConfirmationCard = (cards: ChatCard[]): boolean => {
  return cards.some(
    (card) =>
      isConfirmableCard(card) && card.status === CardStatus.AwaitingConfirmation
  );
};

const withCardStatus = (
  message: ChatMessage,
  messageId: string,
  status: CardStatus
): ChatMessage => {
  if (message.id !== messageId || message.cards.length === 0) {
    return message;
  }
  return {
    ...message,
    cards: message.cards.map((card) =>
      isConfirmableCard(card) ? { ...card, status } : card
    ),
  };
};

const didConfirmingToolSucceed = (toolCalls: ToolCallRecord[]): boolean => {
  return toolCalls.some(
    (toolCall) =>
      CONFIRMING_TOOL_NAMES.has(toolCall.name) &&
      successResultSchema.safeParse(toolCall.result).success
  );
};

const RAW_STRUCTURED_MESSAGE_PATTERN = /^\s*[[{]/;
const MAX_DISPLAYABLE_ERROR_LENGTH = 200;

const toDisplayErrorMessage = (error: unknown): string => {
  if (!(error instanceof Error) || !error.message) {
    return DEFAULT_ERROR_MESSAGE;
  }
  const { message } = error;
  if (
    RAW_STRUCTURED_MESSAGE_PATTERN.test(message) ||
    message.length > MAX_DISPLAYABLE_ERROR_LENGTH
  ) {
    return DEFAULT_ERROR_MESSAGE;
  }
  return message;
};

const runChatTurn = async (
  set: SetChatState,
  get: GetChatState
): Promise<void> => {
  set(() => ({ agentPhase: AgentPhase.Thinking }));
  try {
    const result = await agentOrchestratorService.runAgentTurn(
      toHistory(get().messages)
    );
    const assistantMessage = createMessage(
      ChatRole.Assistant,
      result.assistantMessage
    );
    assistantMessage.cards = mapToolCallsToCards(result.toolCalls);
    const nextPhase = hasAwaitingConfirmationCard(assistantMessage.cards)
      ? AgentPhase.AwaitingConfirmation
      : AgentPhase.Idle;
    set((state) => ({
      messages: [...state.messages, assistantMessage],
      agentPhase: nextPhase,
    }));
  } catch (error) {
    const errorMessage = createMessage(
      ChatRole.Assistant,
      toDisplayErrorMessage(error),
      true
    );
    set((state) => ({
      messages: [...state.messages, errorMessage],
      agentPhase: AgentPhase.Error,
    }));
  }
};

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
    }),
    {
      name: CHAT_STORAGE_KEY,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ messages: state.messages }),
    }
  )
);
