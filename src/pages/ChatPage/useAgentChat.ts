import { AgentPhase } from '@/shared/features/chat/chat.constants';
import { useChatStore } from '@/shared/store/chat.store';

export const useAgentChat = () => {
  const messages = useChatStore((state) => state.messages);
  const agentPhase = useChatStore((state) => state.agentPhase);
  const sendUserMessage = useChatStore((state) => state.sendUserMessage);
  const confirmPendingCard = useChatStore((state) => state.confirmPendingCard);
  const cancelPendingCard = useChatStore((state) => state.cancelPendingCard);
  const retryLastTurn = useChatStore((state) => state.retryLastTurn);
  const startNewChat = useChatStore((state) => state.startNewChat);

  return {
    messages,
    agentPhase,
    isThinking: agentPhase === AgentPhase.Thinking,
    isExecutingTool: agentPhase === AgentPhase.ExecutingTool,
    sendUserMessage,
    confirmPendingCard,
    cancelPendingCard,
    retryLastTurn,
    startNewChat,
  };
};
