import type { ReactElement } from 'react';
import { CardType } from '@/shared/features/chat/chat.constants';
import type {
  BorrowComparisonCard as BorrowComparisonCardData,
  ChatCard,
  GrowthChartCard as GrowthChartCardData,
  PlanCard as PlanCardData,
  QuickRepliesCard as QuickRepliesCardData,
} from '@/shared/features/chat/chat.types';
import { BorrowComparisonCard } from '../Card/BorrowComparisonCard';
import { GrowthChartCard } from '../Card/GrowthChartCard';
import { PlanCard } from '../Card/PlanCard';
import { QuickReplyRow } from '../QuickReplyRow';

interface ChatCardRendererProps {
  card: ChatCard;
  messageId: string;
  isExecutingTool: boolean;
  onConfirm: (messageId: string, adjustmentNote?: string) => void;
  onCancel: (messageId: string) => void;
  onSelectQuickReply: (option: string) => void;
}

type CardRenderer = (props: ChatCardRendererProps) => ReactElement;

const cardRendererByType: Record<CardType, CardRenderer> = {
  [CardType.PlanCard]: ({
    card,
    messageId,
    isExecutingTool,
    onConfirm,
    onCancel,
  }) => (
    <PlanCard
      card={card as PlanCardData}
      onConfirm={(adjustmentNote) => onConfirm(messageId, adjustmentNote)}
      onCancel={() => onCancel(messageId)}
      loading={isExecutingTool}
    />
  ),
  [CardType.BorrowComparisonCard]: ({
    card,
    messageId,
    isExecutingTool,
    onConfirm,
    onCancel,
  }) => (
    <BorrowComparisonCard
      card={card as BorrowComparisonCardData}
      onConfirm={(adjustmentNote) => onConfirm(messageId, adjustmentNote)}
      onCancel={() => onCancel(messageId)}
      loading={isExecutingTool}
    />
  ),
  [CardType.GrowthChartCard]: ({ card }) => (
    <GrowthChartCard card={card as GrowthChartCardData} />
  ),
  [CardType.QuickRepliesCard]: ({ card, onSelectQuickReply }) => (
    <QuickReplyRow
      card={card as QuickRepliesCardData}
      onSelect={onSelectQuickReply}
    />
  ),
};

export const ChatCardRenderer = (props: ChatCardRendererProps) => {
  const renderCard = cardRendererByType[props.card.type];
  return renderCard(props);
};
