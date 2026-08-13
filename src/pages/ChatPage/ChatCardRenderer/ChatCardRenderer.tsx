import { CardType } from '@/shared/constants/cardType.constants';
import type { ChatCard } from '@/shared/types/card.types';
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

export const ChatCardRenderer = ({
  card,
  messageId,
  isExecutingTool,
  onConfirm,
  onCancel,
  onSelectQuickReply,
}: ChatCardRendererProps) => {
  switch (card.type) {
    case CardType.PlanCard:
      return (
        <PlanCard
          card={card}
          onConfirm={(adjustmentNote) => onConfirm(messageId, adjustmentNote)}
          onCancel={() => onCancel(messageId)}
          loading={isExecutingTool}
        />
      );
    case CardType.BorrowComparisonCard:
      return (
        <BorrowComparisonCard
          card={card}
          onConfirm={(adjustmentNote) => onConfirm(messageId, adjustmentNote)}
          onCancel={() => onCancel(messageId)}
          loading={isExecutingTool}
        />
      );
    case CardType.GrowthChartCard:
      return <GrowthChartCard card={card} />;
    case CardType.QuickRepliesCard:
      return <QuickReplyRow card={card} onSelect={onSelectQuickReply} />;
    default:
      return null;
  }
};
