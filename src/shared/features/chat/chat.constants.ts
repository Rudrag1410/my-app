export enum AgentPhase {
  Idle = 'idle',
  Thinking = 'thinking',
  AwaitingConfirmation = 'awaiting_confirmation',
  ExecutingTool = 'executing_tool',
  Error = 'error',
}

export enum CardStatus {
  AwaitingConfirmation = 'awaiting_confirmation',
  Confirmed = 'confirmed',
  Cancelled = 'cancelled',
  Error = 'error',
}

export enum CardType {
  PlanCard = 'plan_card',
  BorrowComparisonCard = 'borrow_comparison_card',
  GrowthChartCard = 'growth_chart_card',
  QuickRepliesCard = 'quick_replies_card',
}

export enum ChatRole {
  User = 'user',
  Assistant = 'assistant',
  Tool = 'tool',
  System = 'system',
}

export enum ToolName {
  CalculateSipProjection = 'calculate_sip_projection',
  StartSip = 'start_sip',
  CalculateBorrowEligibility = 'calculate_borrow_eligibility',
  InitiateBorrow = 'initiate_borrow',
  VisualizeSipGrowth = 'visualize_sip_growth',
  SuggestQuickReplies = 'suggest_quick_replies',
}
