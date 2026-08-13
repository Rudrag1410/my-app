import type OpenAI from 'openai';
import { ToolName } from '../chat.constants';

export const toolDefinitions: OpenAI.Chat.Completions.ChatCompletionTool[] = [
  {
    type: 'function',
    function: {
      name: ToolName.CalculateSipProjection,
      description:
        'Calculates projected SIP value. Always call before stating any projected number. Requires the goal name already gathered from the user so the projection can be presented against a named goal. Provide exactly one of monthlyAmount or targetAmount: use monthlyAmount when the user states a monthly contribution, or targetAmount when the user states a goal amount to reach by the end of durationMonths (the required monthly amount is computed for you).',
      parameters: {
        type: 'object',
        properties: {
          goalName: { type: 'string' },
          monthlyAmount: {
            type: 'number',
            description:
              'The monthly SIP contribution. Omit if targetAmount is provided instead.',
          },
          targetAmount: {
            type: 'number',
            description:
              'The amount the user wants to have by the end of durationMonths. Omit if monthlyAmount is provided instead.',
          },
          durationMonths: { type: 'number' },
          expectedAnnualReturnPercent: {
            type: 'number',
            description: 'Default 15',
          },
        },
        required: ['goalName', 'durationMonths'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: ToolName.StartSip,
      description:
        'Starts a recurring SIP toward a named goal. Only call after explicit in-app confirmation.',
      parameters: {
        type: 'object',
        properties: {
          goalName: { type: 'string' },
          monthlyAmount: { type: 'number' },
          durationMonths: { type: 'number' },
        },
        required: ['goalName', 'monthlyAmount', 'durationMonths'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: ToolName.CalculateBorrowEligibility,
      description:
        'Checks borrow eligibility against the Grow portfolio and compares it to withdrawing. Call whenever the user signals a cash need, before suggesting withdrawal.',
      parameters: {
        type: 'object',
        properties: { amountNeeded: { type: 'number' } },
        required: ['amountNeeded'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: ToolName.InitiateBorrow,
      description:
        'Initiates a borrow against the portfolio. Only call after explicit in-app confirmation.',
      parameters: {
        type: 'object',
        properties: { amount: { type: 'number' } },
        required: ['amount'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: ToolName.VisualizeSipGrowth,
      description:
        'Renders a bar chart of how a SIP grows over time, from zero to the projected final value. Call this together with calculate_sip_projection whenever you present a savings/growth plan, using the same goalName, durationMonths and the resolved monthlyAmount (the one calculate_sip_projection used or returned), so the user sees the trajectory, not just the final number.',
      parameters: {
        type: 'object',
        properties: {
          goalName: { type: 'string' },
          monthlyAmount: { type: 'number' },
          durationMonths: { type: 'number' },
          expectedAnnualReturnPercent: {
            type: 'number',
            description: 'Default 15',
          },
        },
        required: ['goalName', 'monthlyAmount', 'durationMonths'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: ToolName.SuggestQuickReplies,
      description:
        'Attaches up to 4 short tappable quick-reply buttons to your response, so the user can respond with one tap instead of typing. Use this after presenting a plan, a borrow comparison, or asking a question with an obvious small set of likely answers. Each option is sent verbatim as the user\'s next message if tapped, so phrase each one the way the user would say it (e.g. "Yes, confirm", "Change the amount", "Not now").',
      parameters: {
        type: 'object',
        properties: {
          options: {
            type: 'array',
            items: { type: 'string' },
            minItems: 1,
            maxItems: 4,
          },
        },
        required: ['options'],
      },
    },
  },
];
