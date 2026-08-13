import type { ToolName } from '../constants/toolName.constants';
import type { ToolHandler } from '../types/tool.types';

class ToolRegistry {
  private readonly handlers = new Map<ToolName, ToolHandler<unknown>>();

  register(handler: ToolHandler<unknown>): void {
    this.handlers.set(handler.name, handler);
  }

  resolve(name: ToolName): ToolHandler<unknown> {
    const handler = this.handlers.get(name);
    if (!handler) {
      throw new Error(`No handler registered for tool: ${name}`);
    }
    return handler;
  }
}

export const toolRegistry = new ToolRegistry();
