export enum AgentPhase {
  Idle = 'idle',
  Thinking = 'thinking',
  AwaitingConfirmation = 'awaiting_confirmation',
  ExecutingTool = 'executing_tool',
  Error = 'error',
}
