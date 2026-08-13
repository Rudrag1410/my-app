import type OpenAI from 'openai';
import { z } from 'zod';
import type { ToolName } from '../chat.constants';
import { CHAT_MODEL, getOpenAIClient } from './openaiClient';
import { buildSystemPrompt } from './systemPrompt';
import { toolDefinitions } from './toolDefinitions';
import { toolRegistry } from './toolRegistry';

type ChatCompletionMessage = OpenAI.Chat.Completions.ChatCompletionMessageParam;

export interface ToolCallRecord {
  name: ToolName;
  args: unknown;
  result: unknown;
}

export interface AgentTurnResult {
  assistantMessage: string;
  toolCalls: ToolCallRecord[];
}

const MAX_TOOL_CALL_STEPS = 4;

interface ToolErrorPayload {
  error: true;
  message: string;
}

const toToolErrorPayload = (error: unknown): ToolErrorPayload => {
  if (error instanceof z.ZodError) {
    return {
      error: true,
      message: `Invalid arguments: ${error.issues.map((issue) => issue.message).join('; ')}`,
    };
  }
  if (error instanceof Error) {
    return { error: true, message: error.message };
  }
  return { error: true, message: 'Unknown error executing tool.' };
};

const runAgentTurn = async (
  history: ChatCompletionMessage[]
): Promise<AgentTurnResult> => {
  const messages: ChatCompletionMessage[] = [
    { role: 'system', content: buildSystemPrompt() },
    ...history,
  ];
  const toolCallLog: ToolCallRecord[] = [];

  for (let step = 0; step < MAX_TOOL_CALL_STEPS; step += 1) {
    const response = await getOpenAIClient().chat.completions.create({
      model: CHAT_MODEL,
      messages,
      tools: toolDefinitions,
    });

    const message = response.choices[0].message;

    if (!message.tool_calls?.length) {
      return {
        assistantMessage: message.content ?? '',
        toolCalls: toolCallLog,
      };
    }

    messages.push(message);

    for (const toolCall of message.tool_calls) {
      if (toolCall.type !== 'function') {
        continue;
      }
      const toolName = toolCall.function.name as ToolName;
      let args: unknown = null;
      let result: unknown;
      try {
        args = JSON.parse(toolCall.function.arguments);
        const handler = toolRegistry.resolve(toolName);
        result = handler.execute(args);
      } catch (error) {
        result = toToolErrorPayload(error);
      }
      toolCallLog.push({ name: toolName, args, result });
      messages.push({
        role: 'tool',
        tool_call_id: toolCall.id,
        content: JSON.stringify(result),
      });
    }
  }

  throw new Error('Agent exceeded max tool-call steps without a final reply.');
};

export const agentOrchestratorService = { runAgentTurn };
