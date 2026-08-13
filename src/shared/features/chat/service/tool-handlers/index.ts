import { toolRegistry } from '../toolRegistry';
import { calculateSipProjectionHandler } from './calculateSipProjection';
import { startSipHandler } from './startSip';
import { calculateBorrowEligibilityHandler } from './calculateBorrowEligibility';
import { initiateBorrowHandler } from './initiateBorrow';
import { visualizeSipGrowthHandler } from './visualizeSipGrowth';
import { suggestQuickRepliesHandler } from './suggestQuickReplies';

export const registerToolHandlers = (): void => {
  toolRegistry.register(calculateSipProjectionHandler as never);
  toolRegistry.register(startSipHandler as never);
  toolRegistry.register(calculateBorrowEligibilityHandler as never);
  toolRegistry.register(initiateBorrowHandler as never);
  toolRegistry.register(visualizeSipGrowthHandler as never);
  toolRegistry.register(suggestQuickRepliesHandler as never);
};
