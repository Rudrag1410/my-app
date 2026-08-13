import { z } from 'zod';
import { ToolName } from '../../chat.constants';
import type { ToolHandler } from '../../chat.types';

const inputSchema = z.object({
  options: z.array(z.string().min(1)).min(1).max(4),
});

interface Output {
  options: string[];
}

export const suggestQuickRepliesHandler: ToolHandler<Output> = {
  name: ToolName.SuggestQuickReplies,
  execute: (rawInput) => {
    const input = inputSchema.parse(rawInput);
    return { options: input.options };
  },
};
