import type { ChatRole } from '../constants/chatRole.constants';
import type { ChatCard } from './card.types';

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: number;
  cards: ChatCard[];
  isError: boolean;
}
