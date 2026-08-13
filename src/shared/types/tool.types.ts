import type { ToolName } from '../constants/toolName.constants';

export interface ToolHandler<TOutput> {
  readonly name: ToolName;
  execute: (input: unknown) => TOutput;
}

export interface ToolDefinition {
  name: ToolName;
  description: string;
  parameters: Record<string, unknown>;
}
