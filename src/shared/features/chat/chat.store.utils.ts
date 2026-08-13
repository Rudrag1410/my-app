import type OpenAI from 'openai';
import { z } from 'zod';
import {
  AgentPhase,
  CardStatus,
  ChatRole,
  ToolName,
} from '../../features/chat/chat.constants';
import type {
  BorrowComparisonCard,
  ChatCard,
  ChatMessage,
  PlanCard,
} from '../../features/chat/chat.types';
import { mapToolCallsToCards } from './mapToolCallsToCards';
import {
  agentOrchestratorService,
  type ToolCallRecord,
} from './service/agentOrchestrator';

type ChatCompletionMessage = OpenAI.Chat.Completions.ChatCompletionMessageParam;

export interface ChatState {
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

export type SetChatState = (
  fn: (state: ChatState) => Partial<ChatState>
) => void;
export type GetChatState = () => ChatState;

const CONFIRMING_TOOL_NAMES = new Set<ToolName>([
  ToolName.StartSip,
  ToolName.InitiateBorrow,
]);
const successResultSchema = z.object({ success: z.literal(true) });
const DEFAULT_ERROR_MESSAGE = 'Something went wrong. Please try again.';

export const createMessage = (
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

export const toHistory = (messages: ChatMessage[]): ChatCompletionMessage[] => {
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

export const hasAwaitingConfirmationCard = (cards: ChatCard[]): boolean => {
  return cards.some(
    (card) =>
      isConfirmableCard(card) && card.status === CardStatus.AwaitingConfirmation
  );
};

export const withCardStatus = (
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

export const didConfirmingToolSucceed = (
  toolCalls: ToolCallRecord[]
): boolean => {
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

export const runChatTurn = async (
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
