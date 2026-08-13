import { toolRegistry } from '../toolRegistry';
import { calculateSipProjectionHandler } from './calculateSipProjection';
import { startSipHandler } from './startSip';
import { calculateBorrowEligibilityHandler } from './calculateBorrowEligibility';
import { initiateBorrowHandler } from './initiateBorrow';
import { visualizeSipGrowthHandler } from './visualizeSipGrowth';
import { suggestQuickRepliesHandler } from './suggestQuickReplies';

export const registerToolHandlers = (): void => {
  toolRegistry.register(calculateSipProjectionHandler);
  toolRegistry.register(startSipHandler);
  toolRegistry.register(calculateBorrowEligibilityHandler);
  toolRegistry.register(initiateBorrowHandler);
  toolRegistry.register(visualizeSipGrowthHandler);
  toolRegistry.register(suggestQuickRepliesHandler);
};
